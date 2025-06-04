import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Brain, Target, Users, Clock, CheckCircle, ArrowRight, Star, TrendingUp, Zap, Award, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";

export default function AIBootcamp() {
  useSEO({
    title: "100K Product Launch AI Bootcamp - Turn Your What If Into Reality | Wittingly Ventures",
    description: "Transform your breakthrough product idea into a revenue-generating business in just 8-10 weeks using cutting-edge AI tools and proven methodologies.",
    keywords: "AI bootcamp, product launch, AI tools, business transformation, product development, AI strategy",
    canonicalUrl: "https://wittinglyventures.com/ai-bootcamp"
  });

  const [, setLocation] = useLocation();

  const phases = [
    {
      phase: "Phase 1",
      title: "Idea Accelerator Sprint",
      duration: "2 Weeks",
      subtitle: "From Concept to Market-Ready Strategy",
      description: "Transform your raw concept into a professionally validated, investor-ready business opportunity using AI-powered market intelligence.",
      features: [
        "Complete market sizing and competitive analysis",
        "Minimum 10 customer validation interviews",
        "Clear positioning and differentiation strategy",
        "Business model and revenue projections",
        "Present to real investors for feedback",
        "Professional pitch deck and product dossier"
      ],
      outcomes: [
        "Complete Product Dossier",
        "Professional Pitch Deck", 
        "Investor Feedback Report"
      ],
      cta: "Apply for Idea Accelerator",
      standalone: true
    },
    {
      phase: "Phase 2", 
      title: "Product Studio Intensive",
      duration: "6 Weeks",
      subtitle: "From Validated Concept to Live Product",
      description: "Transform your validated idea into a deployed, user-ready product using AI tools and proven methodologies—no coding required.",
      features: [
        "AI tool selection and technical architecture",
        "Daily demos showcasing progress",
        "Sprint planning to maintain momentum", 
        "Hands-on training with AI code generation",
        "AI-powered design and UX creation",
        "Real-time problem-solving support",
        "Product optimization and testing"
      ],
      outcomes: [
        "Fully functional product",
        "Live deployment",
        "Technical documentation",
        "User testing results"
      ],
      cta: "Learn About Intensive",
      byApplication: true
    },
    {
      phase: "Phase 3",
      title: "Marketing Launch Accelerator", 
      duration: "2 Weeks",
      subtitle: "Market Strategy & Campaign Launch",
      description: "Execute go-to-market strategies with AI-powered marketing asset creation and campaign setup.",
      features: [
        "Live product demo to marketing experts",
        "AI-powered marketing asset creation",
        "Landing page development and optimization",
        "Social media strategy and content plan",
        "Sales process development",
        "Campaign launch and execution"
      ],
      outcomes: [
        "Complete marketing strategy",
        "Live marketing campaigns",
        "Sales process documentation",
        "Go-to-market playbook"
      ],
      cta: "Explore Marketing Phase",
      optional: true
    }
  ];

  const whyNow = [
    {
      icon: Zap,
      title: "AI Advantage Window is Open",
      description: "AI tools are powerful enough to build real products while early movers have massive competitive advantages."
    },
    {
      icon: TrendingUp,
      title: "Lowered Barriers to Entry", 
      description: "Significantly reduced costs make niche markets profitable for the first time in history."
    },
    {
      icon: Clock,
      title: "Speed to Market",
      description: "Build sophisticated products in weeks, not years, without technical co-founders or expensive development teams."
    },
    {
      icon: Target,
      title: "Problem Solvers Can Build",
      description: "For the first time, people who understand problems can build solutions directly using AI tools."
    }
  ];

  const successMetrics = [
    "Fully functional, market-ready product",
    "Validated customer demand and early sales", 
    "Clear path to $100K+ annual revenue",
    "Mastery of AI tools for continued innovation",
    "Scalable business model and growth strategy"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Large 100K Badge */}
              <motion.div 
                className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-8 shadow-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white font-bold text-3xl">100K</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                <span className="gradient-text block mb-2">Product Launch</span>
                <span className="text-4xl lg:text-6xl text-primary">AI Bootcamp</span>
              </h1>
              
              <div className="text-2xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8 tracking-wide">
                Turn Your "What If" Into Reality
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Transform your breakthrough product idea into a revenue-generating business in just 8-10 weeks using cutting-edge AI tools and proven methodologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setLocation('/contact?service=ai-bootcamp-idea-accelerator')}
                  className="gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start with Idea Accelerator
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('phases')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-full font-semibold"
                >
                  Learn About All Phases
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Challenge We Solve */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The Challenge We Solve
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Traditional product launches require massive capital, long development cycles, and technical teams. We've eliminated those barriers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Traditional Path Requires:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-gray-600 dark:text-gray-300">
                    <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">✗</span>
                    $50K-$500K+ in development costs
                  </li>
                  <li className="flex items-start text-gray-600 dark:text-gray-300">
                    <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">✗</span>
                    12-24 months of development time
                  </li>
                  <li className="flex items-start text-gray-600 dark:text-gray-300">
                    <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">✗</span>
                    Technical co-founders or expensive teams
                  </li>
                  <li className="flex items-start text-gray-600 dark:text-gray-300">
                    <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">✗</span>
                    Massive infrastructure and market risks
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our AI-Powered Approach:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    8-10 weeks from idea to market-ready product
                  </li>
                  <li className="flex items-start text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    Fraction of traditional development costs
                  </li>
                  <li className="flex items-start text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    No coding required - AI tools handle technical complexity
                  </li>
                  <li className="flex items-start text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    Validated market demand before building
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Program Phases */}
        <section id="phases" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-6 shadow-xl">
                <span className="text-white font-bold text-xl">100K</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="gradient-text">Three Distinct Pathways</span> to Success
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                The 100K Product Launch AI Bootcamp offers flexible entry points based on where you are in your journey
              </p>
            </motion.div>

            <div className="space-y-8">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white dark:bg-gray-800 shadow-xl">
                    <CardHeader className="pb-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div className="flex items-center mb-4 lg:mb-0">
                          <Badge className="mr-4 bg-primary text-white">{phase.phase}</Badge>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{phase.title}</h3>
                            <p className="text-primary font-semibold">{phase.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-sm">
                            <Clock className="mr-1 h-4 w-4" />
                            {phase.duration}
                          </Badge>
                          {phase.standalone && <Badge className="bg-green-100 text-green-800">Standalone</Badge>}
                          {phase.byApplication && <Badge className="bg-blue-100 text-blue-800">By Application</Badge>}
                          {phase.optional && <Badge className="bg-purple-100 text-purple-800">Optional</Badge>}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        {phase.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">What You'll Accomplish:</h4>
                          <ul className="space-y-2">
                            {phase.features.map((feature, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Key Deliverables:</h4>
                          <ul className="space-y-2 mb-6">
                            {phase.outcomes.map((outcome, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <Star className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm font-medium">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <Button 
                            onClick={() => setLocation('/contact?service=ai-bootcamp')}
                            className="w-full gradient-bg text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            {phase.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Now */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-6 shadow-xl">
                <span className="text-white font-bold text-xl">100K</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why <span className="gradient-text">Now</span>?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                The 100K Product Launch AI Bootcamp leverages this unprecedented opportunity window in the generative AI revolution
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyNow.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <reason.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">{reason.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{reason.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Success Metrics & Expectations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                By program completion, you will have achieved measurable business outcomes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">By Program Completion, You Will Have:</h3>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {successMetrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300 font-medium">{metric}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-8 shadow-xl">
                <span className="text-white font-bold text-2xl">100K</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Ready to Transform Your Future?
              </h2>
              <p className="text-2xl text-white/90 mb-4 leading-relaxed font-semibold">
                Join the 100K Product Launch AI Bootcamp
              </p>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                Stop wondering "what if" and start building "what is." Your breakthrough idea deserves to become reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setLocation('/contact?service=ai-bootcamp-idea-accelerator')}
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Apply for Idea Accelerator
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setLocation('/contact?service=ai-bootcamp-consultation')}
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold"
                >
                  Schedule Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}