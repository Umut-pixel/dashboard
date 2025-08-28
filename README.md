# Web Dashboard

A comprehensive website management dashboard built with Next.js, React, and shadcn/ui components. Monitor your website performance, manage components, track analytics, and view business insights all in one place.

## Features

### 🚀 Website Monitoring
- **Performance Tracking**: Monitor page load times, Core Web Vitals, and performance metrics
- **Uptime Monitoring**: Real-time uptime status and historical data
- **SEO Analysis**: Track SEO scores, mobile friendliness, and accessibility
- **Alert System**: Get notified of performance issues and downtime

### 🧩 Component Management
- **Component Library**: Create, edit, and manage website components
- **Template System**: Use pre-built templates for common layouts
- **Code Editor**: Built-in code editor for component development
- **Version Control**: Track component changes and versions

### 📊 Analytics & Insights
- **Traffic Analysis**: Detailed visitor and pageview analytics
- **User Behavior**: Track user engagement and interaction patterns
- **Device Analytics**: Monitor traffic by device type and browser
- **Geographic Data**: View traffic distribution by location

### 💼 Business Analytics
- **Revenue Tracking**: Monitor sales, revenue, and growth metrics
- **Customer Analytics**: Track customer acquisition and retention
- **Product Performance**: Analyze top-performing products and categories
- **Business Intelligence**: Comprehensive business insights and reporting

### 🔍 Activity Monitoring
- **System Logs**: Real-time system logs and error tracking
- **User Actions**: Monitor user activities and sessions
- **Security Events**: Track security alerts and authentication events
- **Activity Timeline**: Complete audit trail of system activities

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Tabler Icons
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard1
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dashboard1/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx              # Main dashboard
│   │   │   ├── monitor/page.tsx      # Website monitoring
│   │   │   ├── components/page.tsx   # Component management
│   │   │   ├── analytics/page.tsx    # Analytics dashboard
│   │   │   ├── business/page.tsx     # Business analytics
│   │   │   └── activity/page.tsx     # Activity monitoring
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── app-sidebar.tsx           # Main navigation
│   │   ├── site-header.tsx           # Header component
│   │   └── ...
│   └── lib/
└── public/
```

## Dashboard Sections

### Main Dashboard (`/dashboard`)
- Overview of all key metrics
- Quick access to all sections
- Recent alerts and notifications
- Performance charts

### Website Monitor (`/dashboard/monitor`)
- Performance metrics and trends
- Uptime monitoring
- SEO analysis
- Real-time alerts

### Components (`/dashboard/components`)
- Component library management
- Template system
- Code editor
- Component versioning

### Analytics (`/dashboard/analytics`)
- Traffic analysis
- User behavior tracking
- Device analytics
- Geographic distribution

### Business (`/dashboard/business`)
- Revenue tracking
- Customer analytics
- Product performance
- Business intelligence

### Activity (`/dashboard/activity`)
- System logs
- User actions
- Security events
- Activity timeline

## Customization

### Adding New Components

1. Create new components in `src/components/`
2. Use shadcn/ui components for consistency
3. Follow the existing component patterns

### Adding New Pages

1. Create new page files in `src/app/dashboard/`
2. Update the sidebar navigation in `src/components/app-sidebar.tsx`
3. Follow the existing page structure and styling

### Styling

The dashboard uses Tailwind CSS with a custom design system. All components follow the shadcn/ui design patterns for consistency.

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
