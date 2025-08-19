# Wittingly Ventures - AI Consulting Platform

## Overview

Wittingly Ventures is a professional AI consulting website for Yuying Chen-Wynn, an AI strategy expert and former Head of AI at PEAK6. The platform showcases her expertise in enterprise AI transformation, offers various consulting services, and serves as a thought leadership hub. The site features service booking capabilities, AI readiness assessments, and comprehensive content showcasing proven AI implementation frameworks with documented results including 87% adoption rates and $6M+ first-year savings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing with SEO-optimized page transitions
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Server**: Express.js with TypeScript for RESTful API endpoints
- **Authentication**: Passport.js with Google OAuth strategy and session management
- **Payment Processing**: Stripe integration for consultation booking and payment handling
- **Email Service**: SendGrid for contact form notifications and automated responses
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations

### SEO and Performance Optimization
- **Pre-rendering**: Custom SSR middleware for search engine bots with dynamic HTML generation
- **SEO Features**: Dynamic meta tags, Open Graph optimization, XML sitemap generation, robots.txt management
- **Structured Data**: JSON-LD schema markup for enhanced search engine understanding
- **Analytics**: Google Analytics 4 and Google Tag Manager integration for conversion tracking
- **Security**: Custom security headers middleware for improved trust signals

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon with connection pooling
- **Schema Management**: Drizzle migrations for version-controlled database changes
- **Data Models**: Users, consultations, contact inquiries, and user sessions with referential integrity
- **Session Storage**: Express session with configurable storage backends

## External Dependencies

### Third-Party Services
- **Database**: Neon PostgreSQL for cloud-hosted database with serverless scaling
- **Payment Processing**: Stripe for secure payment handling and subscription management
- **Email Service**: SendGrid for reliable email delivery and templates
- **Analytics**: Google Analytics 4 for user behavior tracking and conversion measurement
- **Booking System**: Calendly integration for consultation scheduling

### External APIs and Integrations
- **Google Services**: OAuth authentication, Analytics, Search Console, Tag Manager
- **Social Media**: LinkedIn, YouTube, and Substack content integration
- **SEO Tools**: Dynamic sitemap generation, robots.txt management, structured data validation

### Development and Deployment
- **Build System**: Vite for fast development and optimized production builds
- **Deployment**: Configured for cloud deployment with environment variable management
- **Monitoring**: Built-in SEO health checks and performance monitoring endpoints
- **Content Management**: Direct integration with external content platforms for thought leadership showcase