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
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContentHubSection />
      
      {/* Thought Leadership & Recognition Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Thought Leadership & <span className="gradient-text">Recognition</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Speaking at 12 prestigious institutions including MIT Sloan and Stanford, featured on industry podcasts, and sharing insights through weekly content
            </p>
          </motion.div>
          
          <div className="relative overflow-hidden">
            <div className="flex space-x-6 animate-scroll">
              {/* First set of cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">SPEAKING</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">MIT Sloan School of Management</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Presenting AI strategy frameworks and implementation best practices at one of the world's top business schools</p>
                    <div className="text-blue-600 dark:text-blue-400 font-medium text-sm">Academic Institution</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-2">PODCAST</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technocratic Podcast</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">From designing LEGO Mindstorm's second-generation CPU at MIT to leading AI initiatives at PEAK6</p>
                    <div className="text-purple-600 dark:text-purple-400 font-medium text-sm">Industry Media</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">SPEAKING</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Stanford Continuing Studies</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Expert presentation on AI transformation and strategic implementation for continuing education programs</p>
                    <div className="text-blue-600 dark:text-blue-400 font-medium text-sm">Academic Institution</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-2">PODCAST</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Product Talk</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Leveraging AI to scale product businesses with insights from Microsoft and PEAK6 experience</p>
                    <div className="text-purple-600 dark:text-purple-400 font-medium text-sm">Industry Media</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">SPEAKING</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Northwestern Kellogg</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">AI strategy and implementation frameworks presented at Kellogg School of Management</p>
                    <div className="text-blue-600 dark:text-blue-400 font-medium text-sm">Academic Institution</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">CONFERENCE</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Women in Tech Global Conference</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Presenter on AI leadership and technology innovation in the industry</p>
                    <div className="text-green-600 dark:text-green-400 font-medium text-sm">Industry Event</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">SPEAKING</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">UCLA Anderson</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">AI transformation strategies and business applications at UCLA Anderson School of Management</p>
                    <div className="text-blue-600 dark:text-blue-400 font-medium text-sm">Academic Institution</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-2">EXECUTIVE</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Chief Executive Network</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Leadership insights and AI strategy discussions within the Chief executive community</p>
                    <div className="text-orange-600 dark:text-orange-400 font-medium text-sm">Executive Network</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={() => window.location.href = '/thought-leadership'}
              className="gradient-bg text-white font-semibold px-8 py-3 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View All Speaking & Media
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

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
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Not Ready for Consulting?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Get personalized AI readiness insights first</p>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/ai-readiness'}
                    className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
                  >
                    Free AI Assessment
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-2 border-green-200 dark:border-green-700">
                  <div className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    MOST POPULAR
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ready to Get Started?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">30-min strategy session - Risk-free</p>
                  <Button 
                    onClick={() => window.location.href = '/checkout'}
                    className="w-full gradient-bg text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Book Strategy Call
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
      
      <Footer />
    </div>
  );
}
