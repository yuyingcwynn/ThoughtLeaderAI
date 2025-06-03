// SEO metadata for each page
export const seoData = {
  home: {
    title: "Wittingly Ventures - AI Consulting & Strategy | Fractional Chief AI Officer",
    description: "Transform your business with proven AI frameworks that deliver results. Expert AI consulting with 87% adoption rates and $6M+ first-year savings. Fractional Chief AI Officer services by Yuying Chen Wynn.",
    keywords: "AI consulting, fractional Chief AI Officer, enterprise AI strategy, AI implementation, business transformation, AI adoption, machine learning consulting, AI governance",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Wittingly Ventures",
      "description": "AI consulting and strategy firm providing fractional Chief AI Officer services",
      "url": "https://wittingly.ventures",
      "founder": {
        "@type": "Person",
        "name": "Yuying Chen Wynn",
        "jobTitle": "Chief AI Officer"
      },
      "serviceType": ["AI Consulting", "Enterprise AI Strategy", "AI Implementation", "Fractional Chief AI Officer"],
      "areaServed": "Global"
    }
  },
  about: {
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
      "url": "https://wittingly.ventures/about"
    }
  },
  services: {
    title: "AI Consulting Services - Fractional Chief AI Officer | Wittingly Ventures",
    description: "Comprehensive AI consulting services including fractional Chief AI Officer, enterprise AI enablement, strategic AI implementation, and AI governance frameworks.",
    keywords: "AI consulting services, fractional Chief AI Officer, enterprise AI enablement, AI strategy implementation, AI governance, business AI transformation",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "AI Consulting",
      "provider": {
        "@type": "Organization",
        "name": "Wittingly Ventures"
      },
      "description": "Comprehensive AI consulting services for enterprise transformation",
      "areaServed": "Global",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Consulting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fractional Chief AI Officer",
              "description": "Executive-level AI leadership and strategy guidance"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Enterprise AI Enablement",
              "description": "Comprehensive AI transformation programs"
            }
          }
        ]
      }
    }
  },
  thoughtLeadership: {
    title: "AI Thought Leadership - Insights & Content Hub | Wittingly Ventures",
    description: "Latest insights on enterprise AI strategy, implementation best practices, and industry trends from AI expert Yuying Chen Wynn. Articles, videos, and podcasts.",
    keywords: "AI thought leadership, enterprise AI insights, AI strategy content, AI implementation best practices, AI industry trends",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Wittingly Ventures Thought Leadership",
      "description": "Insights and content on enterprise AI strategy and implementation",
      "author": {
        "@type": "Person",
        "name": "Yuying Chen Wynn"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Wittingly Ventures"
      }
    }
  },
  contact: {
    title: "Contact Wittingly Ventures - AI Consulting Inquiries",
    description: "Get in touch with Wittingly Ventures for AI consulting services. Schedule a consultation to discuss your enterprise AI strategy and transformation needs.",
    keywords: "contact AI consultant, AI consulting inquiry, enterprise AI consultation, schedule AI strategy meeting",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Wittingly Ventures",
      "description": "Contact page for AI consulting inquiries and consultations",
      "mainEntity": {
        "@type": "Organization",
        "name": "Wittingly Ventures",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Business Inquiries",
          "availableLanguage": "English"
        }
      }
    }
  },
  aiReadiness: {
    title: "AI Readiness Assessment - Evaluate Your Enterprise AI Maturity",
    description: "Take our comprehensive AI readiness assessment to evaluate your organization's AI maturity level and receive personalized recommendations for AI implementation.",
    keywords: "AI readiness assessment, enterprise AI maturity, AI implementation evaluation, organizational AI capability",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AI Readiness Assessment",
      "description": "Interactive assessment tool to evaluate organizational AI readiness",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser"
    }
  }
};

export const defaultSEO = {
  title: "Wittingly Ventures - AI Consulting & Strategy",
  description: "Transform your business with AI consulting expertise. Fractional Chief AI Officer services, enterprise AI enablement, and strategic AI implementation guidance.",
  keywords: "AI consulting, enterprise AI strategy, fractional Chief AI Officer, business transformation"
};