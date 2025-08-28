import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "İsim gereklidir"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email gereklidir"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Şifre gereklidir"],
    minlength: [6, "Şifre en az 6 karakter olmalıdır"],
  },
  image: {
    type: String,
    default: "",
  },
  // Genişletilmiş profil bilgileri
  phone: {
    type: String,
    default: "",
    trim: true,
  },
  position: {
    type: String,
    default: "",
    trim: true,
  },
  company: {
    type: String,
    default: "",
    trim: true,
  },
  location: {
    type: String,
    default: "",
    trim: true,
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Kullanıcının sahip olduğu temalar
  themes: [{
    themeId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    lastEdited: {
      type: Date,
      default: Date.now,
    },
    settings: {
      type: Schema.Types.Mixed,
      default: {},
    },
  }],
  // Abonelik bilgileri (gelecekte kullanım için)
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'pro', 'enterprise'],
      default: 'free',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active',
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
}, {
  timestamps: true,
});

// Email için index
UserSchema.index({ email: 1 });

// Virtual field for active theme
UserSchema.virtual('activeTheme').get(function() {
  return this.themes.find(theme => theme.isActive);
});

export const User = models.User || model("User", UserSchema);
