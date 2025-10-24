import Redis from "ioredis";
import config from "@/config/server";

let redis: Redis | null = null;

export function getRedis() {
  if (!config.REDIS_URL) return null;
  if (redis) return redis;
  redis = new Redis(config.REDIS_URL);
  return redis;
}


