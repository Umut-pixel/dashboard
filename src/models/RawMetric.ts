import { Schema, models, model } from "mongoose";

const RawMetricSchema = new Schema({
  integrationId: { type: Schema.Types.ObjectId, ref: "Integration", index: true },
  provider: { type: String, required: true },
  fetchedAt: { type: Date, default: () => new Date() },
  payload: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export const RawMetric = models.RawMetric || model("RawMetric", RawMetricSchema);


