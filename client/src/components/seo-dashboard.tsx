import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, ExternalLink, Search, TrendingUp } from "lucide-react";

interface SEOMetrics {
  pageTitle: string;
  metaDescription: string;
  hasStructuredData: boolean;
  internalLinks: number;
  imageOptimization: number;
  loadTime: number;
}

export function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    const analyzeCurrentPage = () => {
      const title = document.title;
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]').length > 0;
      const internalLinks = document.querySelectorAll('a[href^="/"]').length;
      const images = document.querySelectorAll('img');
      const optimizedImages = Array.from(images).filter(img => img.hasAttribute('alt')).length;
      
      setMetrics({
        pageTitle: title,
        metaDescription: metaDesc,
        hasStructuredData: structuredData,
        internalLinks,
        imageOptimization: images.length > 0 ? (optimizedImages / images.length) * 100 : 100,
        loadTime: performance.now()
      });
    };

    analyzeCurrentPage();
    
    // Re-analyze when page changes
    const interval = setInterval(analyzeCurrentPage, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const seoScore = metrics ? Math.round(
    (metrics.pageTitle.length > 0 ? 20 : 0) +
    (metrics.metaDescription.length > 0 ? 20 : 0) +
    (metrics.hasStructuredData ? 20 : 0) +
    (metrics.internalLinks > 0 ? 20 : 0) +
    (metrics.imageOptimization === 100 ? 20 : metrics.imageOptimization / 5)
  ) : 0;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "success";
    if (score >= 70) return "warning";
    return "destructive";
  };

  const targetKeywords = [
    "fractional chief AI officer",
    "AI consulting services", 
    "enterprise AI strategy",
    "AI implementation consultant",
    "AI governance framework",
    "fractional AI executive"
  ];

  const quickWins = [
    {
      title: "Add Alt Text to Images",
      description: "Improve accessibility and image SEO",
      completed: metrics?.imageOptimization === 100,
      priority: "High"
    },
    {
      title: "Optimize Meta Description Length",
      description: "Keep between 150-160 characters",
      completed: metrics?.metaDescription.length >= 150 && metrics?.metaDescription.length <= 160,
      priority: "Medium"
    },
    {
      title: "Add More Internal Links",
      description: "Target 3-5 internal links per page",
      completed: (metrics?.internalLinks || 0) >= 3,
      priority: "Medium"
    },
    {
      title: "Implement FAQ Schema",
      description: "Add FAQ structured data for rich snippets",
      completed: false,
      priority: "High"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Dashboard</h2>
        <Badge variant={getScoreBadge(seoScore) as any} className="text-lg px-3 py-1">
          SEO Score: {seoScore}/100
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Page Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Page Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">Title Length</p>
              <p className={`text-sm ${metrics?.pageTitle.length && metrics.pageTitle.length <= 60 ? 'text-green-600' : 'text-yellow-600'}`}>
                {metrics?.pageTitle.length || 0} characters
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Meta Description</p>
              <p className={`text-sm ${metrics?.metaDescription.length && metrics.metaDescription.length >= 150 && metrics.metaDescription.length <= 160 ? 'text-green-600' : 'text-yellow-600'}`}>
                {metrics?.metaDescription.length || 0} characters
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Structured Data</p>
              <div className="flex items-center gap-2">
                {metrics?.hasStructuredData ? 
                  <CheckCircle className="h-4 w-4 text-green-600" /> : 
                  <AlertCircle className="h-4 w-4 text-red-600" />
                }
                <span className="text-sm">
                  {metrics?.hasStructuredData ? 'Present' : 'Missing'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Target Keywords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {targetKeywords.slice(0, 4).map((keyword, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{keyword}</span>
                  <Badge variant="outline" className="text-xs">
                    Tracking
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Wins */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Wins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickWins.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {item.completed ? 
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> : 
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  }
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Tools & Resources */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Tools & Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => window.open('https://search.google.com/search-console', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Search Console
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => window.open('https://pagespeed.web.dev/', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              PageSpeed Insights
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => window.open('https://schema.org/docs/schemas.html', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Schema Markup
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => window.open('/sitemap.xml', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Sitemap
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Implementation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dynamic meta tags</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span>XML sitemap</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span>Structured data</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span>Robots.txt</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span>Internal linking strategy</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span>Google Analytics setup</span>
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}