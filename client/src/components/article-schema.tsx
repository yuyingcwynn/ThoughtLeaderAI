import { useEffect } from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
  keywords?: string[];
}

export function ArticleSchema({ 
  title, 
  description, 
  author, 
  datePublished, 
  dateModified, 
  url, 
  imageUrl, 
  keywords 
}: ArticleSchemaProps) {
  useEffect(() => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Wittingly Ventures",
        "logo": {
          "@type": "ImageObject",
          "url": "https://wittinglyventures.com/favicon.jpg"
        }
      },
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "url": url,
      ...(imageUrl && {
        "image": {
          "@type": "ImageObject",
          "url": imageUrl
        }
      }),
      ...(keywords && {
        "keywords": keywords.join(", ")
      }),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    };

    let articleScript = document.querySelector('#article-schema') as HTMLScriptElement;
    if (!articleScript) {
      articleScript = document.createElement('script');
      articleScript.setAttribute('id', 'article-schema');
      articleScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(articleScript);
    }
    articleScript.textContent = JSON.stringify(articleSchema);

    return () => {
      if (articleScript && articleScript.parentNode) {
        articleScript.parentNode.removeChild(articleScript);
      }
    };
  }, [title, description, author, datePublished, dateModified, url, imageUrl, keywords]);

  return null;
}