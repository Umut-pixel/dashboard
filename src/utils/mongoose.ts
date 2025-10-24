import mongoose from "mongoose";
import config from "@/config/server";

const MONGODB_URI = config.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI eksik.");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose as { 
  conn: typeof mongoose | null; 
  promise: Promise<typeof mongoose> | null 
} | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached!.conn) return cached!.conn;
  
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, { 
      dbName: config.MONGODB_DB
    }).then((m) => m);
  }
  
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
