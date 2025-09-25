import { dbConnect } from "@/lib/mongoose";
import { Aggregate } from "@/models/Aggregate";
import { getRedis } from "@/server/redis";

type Range = { start: Date; end: Date };

export async function getDailyAggregates(siteId: string, range: Range) {
  await dbConnect();
  const redis = getRedis();
  const key = redis ? `analytics:daily:${siteId}:${range.start.toISOString().slice(0,10)}:${range.end.toISOString().slice(0,10)}` : null;

  if (redis && key) {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
  }

  const data = await Aggregate.find({ siteId, dateHour: { $gte: range.start, $lte: range.end } })
    .sort({ dateHour: 1 })
    .lean();

  if (redis && key) {
    await redis.set(key, JSON.stringify(data), "EX", 60 * 5); // 5 minutes TTL
  }

  return data;
}


