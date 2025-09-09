import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ContentHubSection from "@/components/content-hub-section";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { seoData } from "@/lib/seo-data";
import { SEOEnhancements } from "@/components/seo-enhancements";
import { businessSchema, faqSchema } from "@/lib/local-seo";
import { RelatedContent } from "@/components/internal-linking";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import productTalkImage from "@assets/image_1748589862049.png";

export default function Home() {
  useSEO({
    title: seoData.home.title,
    description: seoData.home.description,
    keywords: seoData.home.keywords,
    canonicalUrl: "https://wittinglyventures.com/",
    structuredData: seoData.home.structuredData
  });

  useEffect(() => {
    // Fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const caseStudies = [
    {
      title: "Financial Services AI Platform",
      challenge: "Deploy AI across 6 companies in highly regulated financial services",
      solution: "Built proprietary GenAI platform with integrated risk framework and compliance automation",
      results: "87% adoption rate, $6M+ first-year savings, $200M+ AI investment portfolio",
      methodology: "12-month build cycle with phased rollout and continuous risk assessment"
    },
    {
      title: "EdTech AI-Native Product Launch",
      challenge: "Scale adaptive learning product for international market expansion",
      solution: "Custom speech recognition models with automated content generation pipeline",
      results: "$65M annual revenue achieved, 7X revenue growth in Year 2, 75% faster development cycles",
      methodology: "Partnership-driven approach with Tencent AI team and iterative product development"
    },
    {
      title: "Traditional Education Digital Transformation",
      challenge: "Transform billion-dollar traditional education provider with AI and data capabilities",
      solution: "Complete data infrastructure rebuild with AI/ML team establishment and experimentation framework",
      results: "24% registration rate increase, 83% fraud cost reduction, new B2B revenue streams",
      methodology: "Outcome-driven transformation with evidence-based prioritization and investment framework"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOEnhancements schemaData={[businessSchema, faqSchema]} />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContentHubSection />
      
      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16 fade-in"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Proven <span className="gradient-text">Results</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Real transformations with measurable impact across industries
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{study.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">Challenge: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{study.challenge}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Solution: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{study.solution}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">Results: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{study.results}</span>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Methodology: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{study.methodology}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Section */}
          <motion.div 
            className="text-center fade-in"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Don't Let Your Competition Beat You to AI
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-semibold text-red-600 dark:text-red-400">85% of AI projects fail.</span> Mine don't.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Start with a free assessment to see exactly where your organization stands
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Not Ready for Consulting?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">Get personalized AI readiness insights first</p>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/ai-readiness'}
                    className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
                  >
                    Free AI Assessment
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-2 border-green-200 dark:border-green-700 flex flex-col">
                  <div className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-3 py-1 rounded-full mb-2 self-start">
                    MOST POPULAR
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ready to Get Started?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">30-min strategy session - Risk-free</p>
                  <Button 
                    onClick={() => window.open('https://calendly.com/yuyingcwynn/ai-discovery-call-30', '_blank')}
                    className="w-full gradient-bg text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Book Discovery Call - Get Alternatives & Referrals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Join executives from PEAK6, Barnes & Noble Education, and ABCmouse who've already transformed their businesses with AI
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedContent />
      
      <Footer />
    </div>
  );
}
