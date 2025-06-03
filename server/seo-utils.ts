import { Request, Response } from 'express';

// Generate dynamic sitemap based on actual content
export function generateDynamicSitemap(req: Request, res: Response) {
  const baseUrl = req.get('host')?.includes('localhost') 
    ? `http://${req.get('host')}`
    : 'https://wittinglyventures.com';
  
  const currentDate = new Date().toISOString();
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
    { url: '/about', priority: '0.9', changefreq: 'monthly', lastmod: currentDate },
    { url: '/services', priority: '0.9', changefreq: 'monthly', lastmod: currentDate },
    { url: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
    { url: '/thought-leadership', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/ai-readiness', priority: '0.7', changefreq: 'monthly', lastmod: currentDate }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.set({
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
  });
  res.send(sitemap);
}

// Generate robots.txt dynamically
export function generateRobotsTxt(req: Request, res: Response) {
  const baseUrl = req.get('host')?.includes('localhost') 
    ? `http://${req.get('host')}`
    : 'https://wittinglyventures.com';

  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /dashboard/
Disallow: /login/
Disallow: /checkout/
Disallow: /booking-success/

# Allow important pages
Allow: /
Allow: /about
Allow: /services
Allow: /contact
Allow: /thought-leadership
Allow: /ai-readiness

# Block specific file types that aren't useful for SEO
Disallow: *.json$
Disallow: *.xml$
Disallow: /api/

# Allow social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /`;

  res.set({
    'Content-Type': 'text/plain',
    'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
  });
  res.send(robotsTxt);
}

// Security headers for SEO and security
export function addSecurityHeaders(req: Request, res: Response, next: any) {
  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // CSP for better security and SEO trust signals
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' https://api.stripe.com https://www.google-analytics.com; " +
    "frame-src 'self' https://calendly.com https://js.stripe.com;"
  );
  
  next();
}