// Local SEO and Business Schema Data
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Wittingly Ventures",
  "description": "AI consulting and strategy firm providing fractional Chief AI Officer services",
  "url": "https://wittinglyventures.com",
  "telephone": "+1-XXX-XXX-XXXX", // Add your phone number
  "email": "contact@wittinglyventures.com",
  "founder": {
    "@type": "Person",
    "name": "Yuying Chen Wynn",
    "jobTitle": "Chief AI Officer & Founder",
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "MIT Sloan School of Management"
      },
      {
        "@type": "Organization", 
        "name": "Northwestern Kellogg School of Management"
      }
    ]
  },
  "serviceType": [
    "AI Consulting",
    "Fractional Chief AI Officer",
    "Enterprise AI Strategy",
    "AI Implementation",
    "AI Governance"
  ],
  "areaServed": {
    "@type": "Place",
    "name": "Global"
  },
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
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Product Bootcamp",
          "description": "Accelerated AI product development training"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "25",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Organization",
        "name": "PEAK6 Portfolio Company"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "87% adoption rate and $6M+ first-year savings through Yuying's AI platform implementation."
    }
  ]
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Fractional Chief AI Officer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Fractional Chief AI Officer provides executive-level AI leadership and strategy on a part-time or project basis, helping organizations develop and implement comprehensive AI strategies without the cost of a full-time executive."
      }
    },
    {
      "@type": "Question", 
      "name": "How can AI consulting help my business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI consulting helps businesses identify AI opportunities, develop implementation strategies, build organizational capabilities, and achieve measurable results. Our clients typically see 87% adoption rates and millions in efficiency savings."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Wittingly Ventures serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve enterprises across financial services, education technology, healthcare, manufacturing, and other regulated industries requiring expert AI governance and implementation."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Yuying Chen Wynn's AI consulting approach unique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With 15+ years of AI/ML experience and proven track record of 87% platform adoption rates, our approach combines technical expertise with business strategy, focusing on measurable outcomes and organizational transformation."
      }
    }
  ]
};

export const breadcrumbSchema = (items: Array<{name: string; url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});