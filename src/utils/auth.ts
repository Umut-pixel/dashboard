import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "./mongoose";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import config from "@/config/server";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID!,
      clientSecret: config.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await dbConnect();
        
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
      }
      if (account?.provider === "google") {
        // Google ile giriş yapan kullanıcıyı veritabanına kaydet/güncelle
        await dbConnect();
        const existingUser = await User.findOne({ email: token.email });
        
        if (!existingUser) {
          await User.create({
            email: token.email,
            name: token.name,
            image: token.picture,
            emailVerified: new Date(),
          });
        } else {
          // Mevcut kullanıcıyı güncelle
          await User.findByIdAndUpdate(existingUser._id, {
            name: token.name,
            image: token.picture,
            emailVerified: new Date(),
          });
        }
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: config.NEXTAUTH_SECRET,
};
