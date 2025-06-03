import { Link } from "wouter";

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function InternalLink({ href, children, className, title }: InternalLinkProps) {
  return (
    <Link href={href}>
      <a 
        className={className}
        title={title}
        // Add tracking for internal link clicks
        onClick={() => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'click', {
              event_category: 'internal_link',
              event_label: href,
            });
          }
        }}
      >
        {children}
      </a>
    </Link>
  );
}

// Pre-defined internal links for consistent SEO
export const SEOLinks = {
  home: { href: "/", text: "AI Consulting Services", title: "Wittingly Ventures - AI Consulting & Strategy" },
  about: { href: "/about", text: "About Yuying Chen Wynn", title: "Meet AI Expert Yuying Chen Wynn" },
  services: { href: "/services", text: "Our AI Services", title: "Fractional Chief AI Officer & Enterprise AI Services" },
  contact: { href: "/contact", text: "Contact Us", title: "Get in Touch for AI Consulting" },
  thoughtLeadership: { href: "/thought-leadership", text: "AI Insights", title: "Latest AI Thought Leadership" },
  aiReadiness: { href: "/ai-readiness", text: "AI Assessment", title: "Evaluate Your AI Readiness" }
};

export function RelatedContent() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Explore Our AI Expertise
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              <InternalLink 
                href={SEOLinks.services.href} 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                title={SEOLinks.services.title}
              >
                Fractional Chief AI Officer
              </InternalLink>
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Executive-level AI leadership for strategic transformation
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              <InternalLink 
                href={SEOLinks.aiReadiness.href}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                title={SEOLinks.aiReadiness.title}
              >
                AI Readiness Assessment
              </InternalLink>
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Evaluate your organization's AI maturity level
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              <InternalLink 
                href={SEOLinks.thoughtLeadership.href}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                title={SEOLinks.thoughtLeadership.title}
              >
                AI Thought Leadership
              </InternalLink>
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Latest insights on enterprise AI strategy and implementation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}