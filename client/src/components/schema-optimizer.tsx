import { useEffect } from 'react';

// Advanced schema markup for different page types
export const schemaTypes = {
  consultingService: (serviceName: string, description: string, price?: string) => ({
    "@context": "https://schema.org",
    "@type": "ConsultingService",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Wittingly Ventures",
      "founder": {
        "@type": "Person",
        "name": "Yuying Chen Wynn"
      }
    },
    "areaServed": "Global",
    "serviceType": "AI Consulting",
    ...(price && { "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD"
    }})
  }),

  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yuying Chen Wynn",
    "jobTitle": "Chief AI Officer & Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Wittingly Ventures"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "MIT Sloan School of Management"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Northwestern Kellogg School of Management"
      }
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Enterprise AI Strategy",
      "AI Governance",
      "Digital Transformation"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "AI Strategy Consultant",
      "occupationLocation": {
        "@type": "Place",
        "name": "Global"
      }
    }
  },

  webPage: (title: string, description: string, url: string) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Wittingly Ventures",
      "url": "https://wittinglyventures.com"
    },
    "about": {
      "@type": "Thing",
      "name": "AI Consulting",
      "description": "Professional AI consulting and strategy services"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Wittingly Ventures"
    }
  }),

  howTo: (title: string, steps: string[], description: string) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step
    })),
    "totalTime": "PT30M"
  })
};

interface SchemaOptimizerProps {
  schemas: any[];
}

export function SchemaOptimizer({ schemas }: SchemaOptimizerProps) {
  useEffect(() => {
    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => {
      if (script.id.startsWith('schema-')) {
        script.remove();
      }
    });

    // Add new schema scripts
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `schema-${index}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup on unmount
      const schemaScripts = document.querySelectorAll('script[id^="schema-"]');
      schemaScripts.forEach(script => script.remove());
    };
  }, [schemas]);

  return null;
}