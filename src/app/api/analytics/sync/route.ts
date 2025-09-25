/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { fetchGa4Metrics } from "@/lib/etl/fetch-ga4";
import { normalizeGa4Rows } from "@/lib/etl/normalize-ga4";
import { RawMetric } from "@/models/RawMetric";
import { Event } from "@/models/Event";
import { Aggregate } from "@/models/Aggregate";

export async function POST() {
  await dbConnect();
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) return NextResponse.json({ error: "GA4_PROPERTY_ID not set" }, { status: 400 });

  const siteId = `ga4:${propertyId}`;
  const now = new Date();
  const start = new Date(now.getTime() - 24*60*60*1000);
  const range = {
    startDate: start.toISOString().slice(0,10),
    endDate: now.toISOString().slice(0,10),
  };

  const raw = await fetchGa4Metrics(propertyId, range);
  await RawMetric.create({ integrationId: null, provider: "ga4", payload: raw });

  const rows = (raw as any).rows || [];
  const events = normalizeGa4Rows(siteId, rows);
  if (events.length) {
    await Event.bulkWrite(events.map((e) => ({ insertOne: { document: e } })));
  }

  // daily aggregate simple upsert
  const grouped = new Map<string, { pageviews: number; sessions: number; users: number; bounceRate: number; avgSessionDuration: number; count: number }>();
  for (const e of events) {
    const dayKey = e.timestamp.toISOString().slice(0,10);
    const g = grouped.get(dayKey) || { pageviews: 0, sessions: 0, users: 0, bounceRate: 0, avgSessionDuration: 0, count: 0 };
    g.pageviews += e.metrics.pageviews || 0;
    g.sessions += e.metrics.sessions || 0;
    g.users += e.metrics.users || 0;
    g.bounceRate += e.metrics.bounceRate || 0;
    g.avgSessionDuration += e.metrics.avgSessionDuration || 0;
    g.count += 1;
    grouped.set(dayKey, g);
  }

  const upserts: Array<{ updateOne: { filter: Record<string, unknown>; update: Record<string, unknown>; upsert: boolean } }> = [];
  for (const [day, g] of grouped) {
    const dateHour = new Date(`${day}T00:00:00Z`);
    upserts.push({
      updateOne: {
        filter: { siteId, dateHour },
        update: {
          $set: {
            siteId, dateHour,
            pageviews: g.pageviews,
            sessions: g.sessions,
            users: g.users,
            bounceRate: g.count ? g.bounceRate / g.count : 0,
            avgSessionDuration: g.count ? g.avgSessionDuration / g.count : 0,
          }
        },
        upsert: true,
      }
    });
  }
  if (upserts.length) await Aggregate.bulkWrite(upserts);

  return NextResponse.json({ ok: true, inserted: events.length, aggregated: upserts.length });
}


