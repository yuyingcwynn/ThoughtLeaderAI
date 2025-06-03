import { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: any;
}

export function useSEO(metadata: SEOMetadata) {
  useEffect(() => {
    // Update document title
    document.title = metadata.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty?: boolean) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', metadata.description);
    if (metadata.keywords) {
      updateMetaTag('keywords', metadata.keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', metadata.title, true);
    updateMetaTag('og:description', metadata.description, true);
    updateMetaTag('og:type', metadata.ogType || 'website', true);
    updateMetaTag('og:url', window.location.href, true);
    
    if (metadata.ogImage) {
      updateMetaTag('og:image', metadata.ogImage, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', metadata.title, true);
    updateMetaTag('twitter:description', metadata.description, true);
    if (metadata.ogImage) {
      updateMetaTag('twitter:image', metadata.ogImage, true);
    }

    // Canonical URL
    if (metadata.canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', metadata.canonicalUrl);
    }

    // Structured data
    if (metadata.structuredData) {
      let structuredDataScript = document.querySelector('#structured-data') as HTMLScriptElement;
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('id', 'structured-data');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(metadata.structuredData);
    }
  }, [metadata]);
}