import { Schema, models, model } from "mongoose";

const AggregateSchema = new Schema({
  siteId: { type: String, index: true, required: true },
  dateHour: { type: Date, index: true, required: true },
  pageviews: Number,
  sessions: Number,
  users: Number,
  bounceRate: Number,
  avgSessionDuration: Number,
}, { timestamps: true });

AggregateSchema.index({ siteId: 1, dateHour: 1 }, { unique: true });

export const Aggregate = models.Aggregate || model("Aggregate", AggregateSchema);


