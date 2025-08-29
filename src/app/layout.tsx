import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Modern dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global error handler for unhandled promise rejections
              window.addEventListener('unhandledrejection', function(event) {
                console.warn('Unhandled promise rejection:', event.reason);
                event.preventDefault();
              });
              
              window.addEventListener('load', function() {
                setTimeout(function() {
                  try {
                    if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
                      console.log('Initializing UnicornStudio from layout');
                      window.UnicornStudio.init();
                    }
                  } catch (error) {
                    console.warn('UnicornStudio initialization failed:', error);
                  }
                }, 1000);
              });
            `
          }}
        />
        <style>
          {`
            @keyframes slowFloat {
              0%, 100% { transform: scale(1.05) translateY(0px); }
              50% { transform: scale(1.05) translateY(-10px); }
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
