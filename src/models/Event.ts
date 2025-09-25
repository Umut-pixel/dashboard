import { Schema, models, model } from "mongoose";

const EventSchema = new Schema({
  siteId: { type: String, index: true, required: true },
  timestamp: { type: Date, index: true, required: true },
  pagePath: { type: String, index: true },
  eventName: { type: String, index: true },
  sessionId: String,
  userIdAnon: String,
  device: Schema.Types.Mixed,
  geo: Schema.Types.Mixed,
  metrics: Schema.Types.Mixed,
}, { timestamps: true });

EventSchema.index({ siteId: 1, pagePath: 1, timestamp: -1 });

export const Event = models.Event || model("Event", EventSchema);


