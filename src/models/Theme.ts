import { Schema, models, model } from "mongoose";

const ThemeSettingsSchema = new Schema({
  // Hero Section
  hero: {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    button1Text: { type: String, default: "" },
    button2Text: { type: String, default: "" },
    backgroundImage: { type: String, default: "" },
  },
  // Services Section
  services: {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    items: [{
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      features: [{ type: String, default: "" }],
    }],
  },
  // Contact Section
  contact: {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  // Footer Section
  footer: {
    logo: { type: String, default: "" },
    description: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  // Custom CSS/JS
  custom: {
    css: { type: String, default: "" },
    js: { type: String, default: "" },
  },
}, { _id: false });

const ThemeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  themeId: {
    type: String,
    required: true,
    enum: ['theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5'],
  },
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedUrl: {
    type: String,
    default: "",
  },
  settings: {
    type: ThemeSettingsSchema,
    default: () => ({}),
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: Number,
    default: 1,
  },
  // Analytics için
  views: {
    type: Number,
    default: 0,
  },
  lastViewed: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Compound index for user and theme
ThemeSchema.index({ userId: 1, themeId: 1 }, { unique: true });

// Active theme index
ThemeSchema.index({ userId: 1, isActive: 1 });

export const Theme = models.Theme || model("Theme", ThemeSchema);
