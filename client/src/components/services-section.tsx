import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, UserCheck, Rocket, Calendar, Info, Plus } from "lucide-react";
import { useLocation } from "wouter";

export default function ServicesSection() {
  const [, setLocation] = useLocation();

  const handleBookSession = () => {
    setLocation("/checkout");
  };

  const services = [
    {
      icon: Brain,
      title: "Dial-an-AI-Expert",
      description: "Need answers now? Book me for $500/hr. Get immediate access to AI strategy expertise with calendar integration and payment processing.",
      price: "$500/hr",
      buttonText: "Book Session",
      buttonAction: handleBookSession,
      gradient: true
    },
    {
      icon: UserCheck,
      title: "Fractional Chief AI Officer",
      description: "Part-time AI leadership for full-time results. From strategy to implementation with C-level expertise without the C-level price tag.",
      price: "Custom Pricing",
      buttonText: "Learn More",
      buttonAction: () => setLocation("/contact?service=fractional-ai-officer"),
      gradient: false
    },
    {
      icon: Rocket,
      title: "Enterprise AI Enablement",
      description: "Hackathons, strategy offsites, and culture transformation. 3-day hackathons and 2-day strategy intensives for organizational AI adoption.",
      price: "Enterprise Package",
      buttonText: "Schedule Event",
      buttonAction: () => setLocation("/contact?service=enterprise-ai-enablement"),
      gradient: false
    },
    {
      icon: Plus,
      title: "AI Product Intensive Bootcamp",
      description: "4-6 weeks from concept to launch. Build and launch your AI product with expert guidance and comprehensive support.",
      price: "Program Package",
      buttonText: "Apply Now",
      buttonAction: () => setLocation("/contact?service=ai-product-bootcamp"),
      gradient: true
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 fade-in"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transform Your Enterprise with <span className="gradient-text">AI</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive AI consulting services tailored to accelerate your digital transformation
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group"
            >
              <Card className="h-full bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden relative">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <service.icon className="text-white h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <motion.div 
                    className="text-3xl font-bold gradient-text mb-6 group-hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {service.price}
                  </motion.div>
                </CardContent>
                
                <CardFooter>
                  <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={service.buttonAction}
                      className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg ${
                        service.gradient 
                          ? 'gradient-bg text-white hover:shadow-xl border-0 group-hover:brightness-110' 
                          : 'border-2 border-primary text-primary hover:bg-primary hover:text-white group-hover:border-primary/80'
                      }`}
                      variant={service.gradient ? "default" : "outline"}
                    >
                      <motion.span 
                        className="flex items-center justify-center"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.buttonText === "Book Session" && <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />}
                        {service.buttonText === "Learn More" && <Info className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />}
                        {service.buttonText === "Schedule Event" && <Plus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />}
                        {service.buttonText}
                      </motion.span>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
