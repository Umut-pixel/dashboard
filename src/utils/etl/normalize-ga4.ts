/* eslint-disable @typescript-eslint/no-explicit-any */
export function normalizeGa4Rows(siteId: string, rows: any[]) {
  return rows.map((r: any) => {
    const [date, pagePath] = r.dimensionValues.map((d: any) => d.value);
    const [pageviews, sessions, users, bounceRate, avgSessionDuration] = r.metricValues.map((m: any) => Number(m.value || 0));
    return {
      siteId,
      timestamp: new Date(`${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}T00:00:00Z`),
      pagePath,
      eventName: "page_view",
      sessionId: undefined,
      userIdAnon: undefined,
      device: undefined,
      geo: undefined,
      metrics: { pageviews, sessions, users, bounceRate, avgSessionDuration },
    };
  });
}


