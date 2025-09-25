import { Schema, models, model } from "mongoose";

const IntegrationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  provider: { type: String, enum: ["ga4"], required: true },
  propertyId: { type: String, required: true },
  encryptedCredentials: { type: String, required: true },
  scopes: [{ type: String }],
  lastSyncedAt: { type: Date, default: null },
}, { timestamps: true });

IntegrationSchema.index({ userId: 1, provider: 1, propertyId: 1 }, { unique: true });

export const Integration = models.Integration || model("Integration", IntegrationSchema);


