import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, UserCheck, Rocket, Plus, Calendar, ArrowRight, CheckCircle } from "lucide-react";

// Type definitions for service data
interface Phase {
  phase: string;
  title: string;
  duration: string;
  subtitle: string;
  description: string;
  features: string[];
  outcomes: string[];
  standalone?: boolean;
  byApplication?: boolean;
  optional?: boolean;
}

interface Offering {
  name: string;
  details: string[];
}

interface ServiceData {
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  useCases?: string[];
  bookingFlow?: string[];
  engagementModels?: string[];
  offerings?: Offering[];
  phases?: Phase[];
  whyNow?: string[];
  successMetrics?: string[];
  structure?: string[];
  deliverables?: string[];
  idealFor?: string[];
  cta: string;
  ctaAction: () => void;
}
import { useLocation } from "wouter";
import { useEffect } from "react";
import { useSEO } from "@/hooks/use-seo";
import { seoData } from "@/lib/seo-data";

export default function Services() {
  useSEO({
    title: seoData.services.title,
    description: seoData.services.description,
    keywords: seoData.services.keywords,
    canonicalUrl: "https://wittinglyventures.com/services",
    structuredData: seoData.services.structuredData
  });

  const [, setLocation] = useLocation();

  // Handle anchor scrolling on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  const services: ServiceData[] = [
    {
      icon: Brain,
      title: "Dial-an-AI-Expert",
      subtitle: "Get Expert AI Answers in Real-Time",
      description: "Immediate access to AI strategy expertise. $800/hour for focused problem-solving with calendar booking and instant confirmation.",
      price: "$800/hr",
      useCases: [
        "AI vendor evaluation",
        "Technical architecture review", 
        "Risk assessment",
        "Quick decision support"
      ],
      bookingFlow: [
        "Select time slot (Calendly integration)",
        "Brief problem description",
        "Payment processing (Stripe)",
        "Confirmation with prep materials"
      ],
      cta: "Book Session",
      ctaAction: () => setLocation('/checkout')
    },
    {
      icon: UserCheck,
      title: "Fractional Chief AI Officer",
      subtitle: "Get C-Level AI Leadership Without the C-Level Price Tag",
      description: "Part-time AI leadership for full-time results. Strategic AI roadmap development with hands-on implementation guidance.",
      price: "Custom Pricing",
      useCases: [
        "Strategic AI roadmap development",
        "Risk and governance framework",
        "Team training and capability building",
        "Vendor management and evaluation",
        "Board-level reporting and communication"
      ],
      engagementModels: [
        "2 days/month (Minimum engagement)",
        "1 week/month (Standard)",
        "2 weeks/month (Intensive)"
      ],
      cta: "Learn More",
      ctaAction: () => setLocation('/contact')
    },
    {
      icon: Rocket,
      title: "Enterprise AI Enablement",
      subtitle: "Hackathons, Strategy Offsites, and Culture Transformation",
      description: "Three core offerings to accelerate your organization's AI adoption with proven methodologies and frameworks.",
      price: "Enterprise Package",
      offerings: [
        {
          name: "GenAI Hackathon (3 days)",
          details: [
            "Day 1: AI literacy and ideation",
            "Day 2: Prototype development", 
            "Day 3: Pitch and implementation planning",
            "Deliverable: 5+ validated AI use cases"
          ]
        },
        {
          name: "AI Strategy Offsite (2 days)",
          details: [
            "Current state assessment",
            "Vision and roadmap creation",
            "Risk framework development",
            "Implementation timeline",
            "Deliverable: Complete AI strategy document"
          ]
        },
        {
          name: "Culture Transformation Program",
          details: [
            "AI ambassador training",
            "Change management",
            "Adoption metrics and tracking"
          ]
        }
      ],
      cta: "Schedule Event",
      ctaAction: () => setLocation('/contact')
    },
    {
      icon: Plus,
      title: "100K Product Launch AI Bootcamp",
      subtitle: "Turn Your 'What If' Into Reality - From AI Idea to Market in 8-10 Weeks",
      description: "Transform your breakthrough product idea into a revenue-generating business using cutting-edge AI tools and proven methodologies.",
      price: "Program Package",
      phases: [
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
          optional: true
        }
      ],
      whyNow: [
        "AI Advantage Window is Open - powerful tools while early movers have competitive advantages",
        "Lowered Barriers to Entry - reduced costs make niche markets profitable for first time",
        "Speed to Market - build sophisticated products in weeks, not years",
        "Problem Solvers Can Build - people who understand problems can build solutions directly"
      ],
      successMetrics: [
        "Fully functional, market-ready product",
        "Validated customer demand and early sales", 
        "Clear path to $100K+ annual revenue",
        "Mastery of AI tools for continued innovation",
        "Scalable business model and growth strategy"
      ],
      cta: "Learn More",
      ctaAction: () => setLocation('/ai-bootcamp')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Header */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                AI Services That <span className="gradient-text">Actually Work</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From immediate expert consultation to comprehensive transformation programs - 
                choose the right level of AI leadership for your business
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {services.map((service, index) => {
              // Create section ID based on service title
              const sectionId = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

              
              return (
                <motion.div
                  key={service.title}
                  id={sectionId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white dark:bg-gray-800 shadow-xl">
                  <CardHeader className="text-center py-12">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h2>
                    <h3 className="text-xl text-primary font-semibold mb-4">{service.subtitle}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                      {service.description}
                    </p>
                    <div className="text-2xl font-bold text-primary mt-6">{service.price}</div>
                  </CardHeader>
                  
                  <CardContent className="px-12 pb-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {service.useCases && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Use Cases</h4>
                          <ul className="space-y-2">
                            {service.useCases.map((useCase, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{useCase}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.bookingFlow && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Booking Flow</h4>
                          <ul className="space-y-2">
                            {service.bookingFlow.map((step, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                                  {i + 1}
                                </span>
                                <span className="text-sm">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.engagementModels && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Engagement Models</h4>
                          <ul className="space-y-2">
                            {service.engagementModels.map((model, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{model}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.offerings && (
                        <div className="lg:col-span-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Core Offerings</h4>
                          <div className="grid md:grid-cols-3 gap-6">
                            {service.offerings.map((offering, i) => (
                              <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h5 className="font-medium text-gray-900 dark:text-white mb-3">{offering.name}</h5>
                                <ul className="space-y-1">
                                  {offering.details.map((detail, j) => (
                                    <li key={j} className="text-sm text-gray-600 dark:text-gray-300">• {detail}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {service.phases && (
                        <div className="lg:col-span-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Program Phases</h4>
                          <div className="grid md:grid-cols-3 gap-6">
                            {service.phases.map((phase, i) => (
                              <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                    {i + 1}
                                  </span>
                                  <div>
                                    <h5 className="font-bold text-gray-900 dark:text-white">{phase.title}</h5>
                                    <p className="text-sm text-primary font-medium">{phase.duration}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{phase.description}</p>
                                
                                <div className="mb-4">
                                  <h6 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Key Features:</h6>
                                  <ul className="space-y-1">
                                    {phase.features.slice(0, 3).map((feature, j) => (
                                      <li key={j} className="text-xs text-gray-600 dark:text-gray-300">• {feature}</li>
                                    ))}
                                    {phase.features.length > 3 && (
                                      <li className="text-xs text-primary">+ {phase.features.length - 3} more features</li>
                                    )}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h6 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Outcomes:</h6>
                                  <ul className="space-y-1">
                                    {phase.outcomes.map((outcome, j) => (
                                      <li key={j} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                                        <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                                        {outcome}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {phase.standalone && (
                                  <div className="mt-3 px-2 py-1 bg-green-100 dark:bg-green-900 rounded text-xs text-green-800 dark:text-green-200 text-center">
                                    Available Standalone
                                  </div>
                                )}
                                {phase.byApplication && (
                                  <div className="mt-3 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-xs text-blue-800 dark:text-blue-200 text-center">
                                    By Application Only
                                  </div>
                                )}
                                {phase.optional && (
                                  <div className="mt-3 px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded text-xs text-purple-800 dark:text-purple-200 text-center">
                                    Optional Extension
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {service.whyNow && (
                        <div className="lg:col-span-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Why Now?</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {service.whyNow.map((reason, i) => (
                              <div key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {service.successMetrics && (
                        <div className="lg:col-span-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Success Metrics</h4>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.successMetrics.map((metric, i) => (
                              <div key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {(service as any).structure && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Program Structure</h4>
                          <ul className="space-y-2">
                            {(service as any).structure.map((phase: string, i: number) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                                  {i + 1}
                                </span>
                                <span className="text-sm">{phase}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {(service as any).deliverables && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">What You Get</h4>
                          <ul className="space-y-2">
                            {(service as any).deliverables.map((deliverable: string, i: number) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {(service as any).idealFor && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Ideal For</h4>
                          <ul className="space-y-2">
                            {(service as any).idealFor.map((target: string, i: number) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{target}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center mt-8">
                      <Button 
                        onClick={service.ctaAction}
                        className="gradient-bg text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        {service.title === "Dial-an-AI-Expert" && <Calendar className="mr-2 h-5 w-5" />}
                        {service.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              );
            })}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}