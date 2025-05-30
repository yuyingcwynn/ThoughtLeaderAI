import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ContentHubSection from "@/components/content-hub-section";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
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
      title: "PEAK6 Transformation",
      challenge: "Deploy AI across 6 companies in highly regulated financial services",
      solution: "Proprietary GenAI platform + risk framework",
      results: "87% adoption, $6M+ savings, 200M+ potential investments"
    },
    {
      title: "ABCmouse International Expansion",
      challenge: "Scale AI-native product for Chinese market",
      solution: "Custom speech models + content automation",
      results: "$65M revenue, 7X growth, 30% faster development"
    },
    {
      title: "Barnes & Noble Education",
      challenge: "Transform traditional education provider with AI",
      solution: "Data-driven transformation + AI capability building",
      results: "24% registration increase, 83% fraud reduction"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Not Sure Where to Start?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/checkout'}
                  className="gradient-bg text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Book Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/ai-readiness'}
                  className="border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                >
                  Download AI Readiness Guide
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
