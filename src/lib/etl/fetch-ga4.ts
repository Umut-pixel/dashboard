import { createGA4Client } from "../ga4-client";

type GaRange = { startDate: string; endDate: string };

export async function fetchGa4Metrics(propertyId: string, range: GaRange) {
  const client = createGA4Client();
  const res = await client.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
      dimensions: [{ name: "date" }, { name: "pagePath" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
      limit: "100000",
    },
  });
  return res.data;
}


