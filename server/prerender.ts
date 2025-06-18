import { Request, Response, NextFunction } from 'express';

// Bot user agents that need prerendered content
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot'
];

// Generate dynamic HTML for each page
function generatePageHTML(path: string, title: string, description: string, keywords: string, structuredData?: any): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://wittinglyventures.com${path}">
  <meta property="og:image" content="https://wittinglyventures.com/og-image.svg?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="en_US">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://wittinglyventures.com/og-image.svg?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}">
  <meta name="twitter:creator" content="@yuyingcwynn">
  <meta name="twitter:site" content="@wittinglyventures">
  
  <link rel="canonical" href="https://wittinglyventures.com${path}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  ${structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>` : ''}
</head>
<body>
  <div id="ssr-content">
    <!-- This content will be replaced by React hydration -->
    <noscript>
      <p>This site requires JavaScript to function properly. Please enable JavaScript in your browser.</p>
    </noscript>
  </div>
  <script>
    // Indicate this is a prerendered page
    window.__PRERENDERED__ = true;
  </script>
</body>
</html>`;
}

// Page configurations
const PAGE_CONFIGS: { [key: string]: { title: string; description: string; keywords: string; structuredData?: any } } = {
  '/': {
    title: "Wittingly Ventures - AI Consulting & Strategy | Fractional Chief AI Officer",
    description: "Transform your business with proven AI frameworks that deliver results. Expert AI consulting with 87% adoption rates and $6M+ first-year savings. Fractional Chief AI Officer services by Yuying Chen Wynn.",
    keywords: "AI consulting, fractional Chief AI Officer, enterprise AI strategy, AI implementation, business transformation, AI adoption, machine learning consulting, AI governance",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Wittingly Ventures",
        "description": "AI consulting and strategy firm providing fractional Chief AI Officer services",
        "url": "https://wittinglyventures.com",
        "founder": {
          "@type": "Person",
          "name": "Yuying Chen Wynn",
          "jobTitle": "Chief AI Officer"
        },
        "serviceType": ["AI Consulting", "Enterprise AI Strategy", "AI Implementation", "Fractional Chief AI Officer"],
        "areaServed": "Global",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "url": "https://wittinglyventures.com/contact"
        },
        "sameAs": [
          "https://www.linkedin.com/company/wittingly-ventures"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Fractional Chief AI Officer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Fractional Chief AI Officer provides executive-level AI leadership and strategy on a part-time basis, helping organizations implement AI initiatives without the cost of a full-time C-suite executive."
            }
          },
          {
            "@type": "Question", 
            "name": "How quickly can we see results from AI implementation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most organizations see initial results within 30-90 days of implementation, with significant impact typically achieved within 6 months. Our proven frameworks have delivered 87% adoption rates and $6M+ first-year savings."
            }
          },
          {
            "@type": "Question",
            "name": "What industries does Wittingly Ventures serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We serve enterprises across all industries, with particular expertise in financial services, education technology, and regulated industries requiring comprehensive AI governance frameworks."
            }
          }
        ]
      }
    ]
  },
  '/about': {
    title: "About Yuying Chen Wynn - AI Strategy Expert | Wittingly Ventures", 
    description: "Meet Yuying Chen Wynn, expert AI strategist and fractional Chief AI Officer. 15+ years experience in enterprise AI transformation, featured thought leader with proven track record.",
    keywords: "Yuying Chen Wynn, AI expert, Chief AI Officer, AI strategy consultant, enterprise AI leader, AI thought leadership",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Yuying Chen Wynn",
      "jobTitle": "Chief AI Officer & Founder",
      "worksFor": {
        "@type": "Organization",
        "name": "Wittingly Ventures"
      },
      "description": "Expert AI strategist and fractional Chief AI Officer with 15+ years of experience in enterprise AI transformation",
      "url": "https://wittinglyventures.com/about"
    }
  },
  '/services': {
    title: "AI Consulting Services - Fractional Chief AI Officer | Wittingly Ventures",
    description: "Comprehensive AI consulting services including fractional Chief AI Officer, enterprise AI enablement, strategic AI implementation, and AI governance frameworks.",
    keywords: "AI consulting services, fractional Chief AI Officer, enterprise AI enablement, AI strategy implementation, AI governance, business AI transformation",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Consulting Services",
      "provider": {
        "@type": "Organization",
        "name": "Wittingly Ventures"
      },
      "serviceType": [
        "Fractional Chief AI Officer",
        "Enterprise AI Enablement", 
        "AI Strategy Implementation",
        "AI Governance Frameworks"
      ],
      "areaServed": "Global"
    }
  },
  '/contact': {
    title: "Contact Wittingly Ventures - AI Consulting Inquiries",
    description: "Get in touch with Wittingly Ventures for AI consulting services. Schedule a consultation to discuss your enterprise AI strategy and transformation needs.",
    keywords: "contact AI consultant, AI consulting inquiry, enterprise AI consultation, schedule AI strategy meeting"
  },
  '/thought-leadership': {
    title: "AI Thought Leadership - Insights & Content Hub | Wittingly Ventures",
    description: "Latest insights on enterprise AI strategy, implementation best practices, and industry trends from AI expert Yuying Chen Wynn. Articles, videos, and podcasts.",
    keywords: "AI thought leadership, enterprise AI insights, AI strategy content, AI implementation best practices, AI industry trends"
  },
  '/ai-readiness': {
    title: "AI Readiness Assessment - Evaluate Your Enterprise AI Maturity",
    description: "Take our comprehensive AI readiness assessment to evaluate your organization's AI maturity level and receive personalized recommendations for AI implementation.",
    keywords: "AI readiness assessment, enterprise AI maturity, AI implementation evaluation, organizational AI capability",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AI Readiness Assessment",
      "description": "Comprehensive assessment tool to evaluate organizational AI readiness and maturity",
      "url": "https://wittinglyventures.com/ai-readiness",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser"
    }
  }
};

export function prerenderMiddleware(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.get('User-Agent')?.toLowerCase() || '';
  const isBot = BOT_USER_AGENTS.some(bot => userAgent.includes(bot));
  
  // Check if request is from a search engine bot
  if (isBot) {
    const path = req.path;
    const pageConfig = PAGE_CONFIGS[path];
    
    if (pageConfig) {
      const html = generatePageHTML(
        path,
        pageConfig.title,
        pageConfig.description,
        pageConfig.keywords,
        pageConfig.structuredData
      );
      
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('X-Prerendered', 'true');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      return res.send(html);
    }
  }
  
  next();
}