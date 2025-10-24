// Server Configuration
// This file centralizes all server-related configuration

// Environment variables with fallbacks
const config = {
  // Server URLs
  SERVER_URL: process.env.VITE_SERVER_URL || 'http://localhost:3000',
  API_URL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/saas-website-builder',
  MONGODB_DB: process.env.MONGODB_DB || 'saas-website-builder',
  
  // Redis Configuration
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // Authentication Configuration
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // Google OAuth Configuration
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  
  // Google Analytics Configuration
  GA4_PROPERTY_ID: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
  GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  
  // Development flags
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

// Validation function to check required environment variables
export function validateConfig() {
  const required = [
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'MONGODB_URI'
  ];
  
  const missing = required.filter(key => !config[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return true;
}

// Export configuration
export default config;
