import { useEffect } from 'react';

interface SEOEnhancementsProps {
  schemaData?: any;
  breadcrumbs?: Array<{name: string; url: string}>;
}

export function SEOEnhancements({ schemaData, breadcrumbs }: SEOEnhancementsProps) {
  useEffect(() => {
    // Add additional schema markup
    if (schemaData) {
      let schemaScript = document.querySelector('#additional-schema') as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('id', 'additional-schema');
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaData);
    }

    // Add breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 1) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };

      let breadcrumbScript = document.querySelector('#breadcrumb-schema') as HTMLScriptElement;
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.setAttribute('id', 'breadcrumb-schema');
        breadcrumbScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    }

    // Add performance optimization meta tags
    const addMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Add technical SEO meta tags
    addMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    addMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    addMetaTag('theme-color', '#0079F2');
    addMetaTag('msapplication-TileColor', '#0079F2');
    
    // Add preconnect links for performance
    const addPreconnect = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        document.head.appendChild(link);
      }
    };

    addPreconnect('https://fonts.googleapis.com');
    addPreconnect('https://fonts.gstatic.com');
    addPreconnect('https://www.google-analytics.com');
    addPreconnect('https://www.googletagmanager.com');

  }, [schemaData, breadcrumbs]);

  return null;
}