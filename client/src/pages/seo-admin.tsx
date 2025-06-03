import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { SEODashboard } from "@/components/seo-dashboard";
import { useSEO } from "@/hooks/use-seo";

export default function SEOAdmin() {
  useSEO({
    title: "SEO Dashboard - Wittingly Ventures",
    description: "Monitor and optimize SEO performance for Wittingly Ventures AI consulting website",
    keywords: "SEO dashboard, website optimization, search engine optimization",
    canonicalUrl: "https://wittinglyventures.com/seo-admin"
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SEODashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}