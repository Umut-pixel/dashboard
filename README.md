# Dashboard Project

A modern React + Next.js dashboard application with Tailwind CSS, featuring analytics, authentication, and a clean modular architecture.

## 🏗️ Project Structure

```
/src
  /components          # Reusable UI components
  /pages              # Next.js pages and API routes
  /hooks              # Custom React hooks
  /context            # React context providers
  /assets             # Static assets (images, icons, etc.)
  /utils              # Utility functions and helpers
  /models             # Database models (Mongoose)
  /types              # TypeScript type definitions
  /server             # Server-side utilities
/public               # Public static files (Next.js)
/config               # Configuration files
.env                  # Environment variables
README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

All environment variables are centralized in the `.env` file. Key variables include:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/saas-website-builder
MONGODB_DB=saas-website-builder

# Redis Configuration (optional)
REDIS_URL=redis://localhost:6379

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Google Analytics
GA4_PROPERTY_ID=your-ga4-property-id
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Server Configuration

The project uses a centralized configuration system located in `/config/server.ts`:

```typescript
import config from '@/config/server';

// Access configuration values
const mongoUri = config.MONGODB_URI;
const isDevelopment = config.IS_DEVELOPMENT;
```

This file provides:
- Centralized environment variable management
- Type-safe configuration access
- Default fallback values
- Environment validation

## 🔧 Development

### Available Scripts

- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run vite:dev` - Start Vite development server
- `npm run vite:build` - Build with Vite
- `npm run vite:preview` - Preview Vite build

### Changing Backend URL

To change the backend URL for local development:

1. **Update environment variables** in `.env`:
   ```env
   VITE_SERVER_URL=http://localhost:3001
   VITE_API_URL=http://localhost:3001/api
   ```

2. **Or modify the config file** at `/config/server.ts`:
   ```typescript
   SERVER_URL: process.env.VITE_SERVER_URL || 'http://localhost:3001',
   API_URL: process.env.VITE_API_URL || 'http://localhost:3001/api',
   ```

### Port Configuration

The default port is defined in multiple places:

- **Next.js**: Port 3000 (default)
- **Vite**: Port 5173 (development), 4173 (preview)
- **Environment**: Set `PORT=3001` in `.env` to override

## 🎨 Styling

The project uses **Tailwind CSS v4** with a custom configuration. Key features:

- **Theme colors**: Custom color palette defined in the theme
- **Font**: Alata font family
- **Dark mode**: Support with custom background colors
- **Responsive design**: Mobile-first approach

### Tailwind Configuration

- `postcss.config.mjs` - PostCSS configuration
- Tailwind CSS v4 with Vite plugin
- Custom utilities and components

## 🗄️ Database

### MongoDB Setup

1. **Install MongoDB** locally or use MongoDB Atlas
2. **Update connection string** in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database
   ```

### Models

Database models are located in `/src/models/`:
- `User.ts` - User authentication and profile
- `Event.ts` - Analytics events
- `Aggregate.ts` - Aggregated analytics data
- `RawMetric.ts` - Raw metrics from external sources
- `Theme.ts` - Theme configurations
- `Integration.ts` - Third-party integrations

## 🔐 Authentication

The project uses **NextAuth.js** with multiple providers:

- **Google OAuth** - Primary authentication method
- **Credentials** - Email/password authentication

### Setup Google OAuth

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add credentials to `.env`:
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

## 📊 Analytics

### Google Analytics 4 Integration

The project includes GA4 integration for analytics:

1. **Set up GA4 property** in Google Analytics
2. **Create service account** in Google Cloud Console
3. **Add credentials** to `.env`:
   ```env
   GA4_PROPERTY_ID=your-property-id
   GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}
   ```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Setup

Ensure all production environment variables are set:
- Database connection strings
- Authentication secrets
- API keys and credentials
- Domain URLs

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MongoDB is running
   - Check connection string in `.env`
   - Ensure database exists

2. **Authentication Issues**
   - Verify Google OAuth credentials
   - Check `NEXTAUTH_SECRET` is set
   - Ensure callback URLs are configured

3. **Build Errors**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run lint`

### Development Tips

- Use `npm run dev` for Next.js development
- Use `npm run vite:dev` for Vite-based development
- Check browser console for client-side errors
- Monitor server logs for API issues

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

For more detailed information, check the individual component documentation in the `/src/components` directory.