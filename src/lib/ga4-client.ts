import { google } from "googleapis";

export function createGA4Client() {
  const json = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!json) throw new Error("GOOGLE_APPLICATION_CREDENTIALS_JSON is not set");
  const credentials = JSON.parse(json);
  const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];
  const auth = new google.auth.GoogleAuth({ credentials, scopes });
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });
  return analyticsData;
}


