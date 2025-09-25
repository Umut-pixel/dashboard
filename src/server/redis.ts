import Redis from "ioredis";

let redis: Redis | null = null;

export function getRedis() {
  if (!process.env.REDIS_URL) return null;
  if (redis) return redis;
  redis = new Redis(process.env.REDIS_URL);
  return redis;
}


