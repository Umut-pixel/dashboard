import { NextResponse } from "next/server";
import { getDailyAggregates } from "@/server/services/analytics";

export async function GET() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) return NextResponse.json({ error: "GA4_PROPERTY_ID not set" }, { status: 400 });
  const siteId = `ga4:${propertyId}`;
  const end = new Date();
  const start = new Date(end.getTime() - 7*24*60*60*1000);
  const data = await getDailyAggregates(siteId, { start, end });
  return NextResponse.json({ data });
}


