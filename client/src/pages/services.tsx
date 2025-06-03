import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, UserCheck, Rocket, Plus, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Services() {
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

  const services = [
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
      title: "AI Product Intensive Bootcamp",
      subtitle: "From AI Idea to Market in 4-6 Weeks",
      description: "Comprehensive program to build and launch your AI product with expert guidance and full technical support.",
      price: "Program Package",
      structure: [
        "Weeks 1-2: Product definition and AI architecture",
        "Weeks 3-4: Development and testing",
        "Weeks 5-6: Launch preparation and go-to-market (optional extension)"
      ],
      deliverables: [
        "Fully functional AI product",
        "Technical documentation",
        "Go-to-market strategy",
        "Launch support"
      ],
      idealFor: [
        "Startups with AI product ideas",
        "Enterprise innovation teams",
        "Companies pivoting to AI"
      ],
      cta: "Apply Now",
      ctaAction: () => setLocation('/contact')
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
                      
                      {service.structure && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Program Structure</h4>
                          <ul className="space-y-2">
                            {service.structure.map((phase, i) => (
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
                      
                      {service.deliverables && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">What You Get</h4>
                          <ul className="space-y-2">
                            {service.deliverables.map((deliverable, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.idealFor && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Ideal For</h4>
                          <ul className="space-y-2">
                            {service.idealFor.map((target, i) => (
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