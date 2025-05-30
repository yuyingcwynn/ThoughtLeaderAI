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
      description: "Get immediate access to deep AI expertise. Perfect for strategic decisions, technical deep-dives, or AI transformation guidance.",
      price: "$500/hour",
      buttonText: "Book Session",
      buttonAction: handleBookSession,
      gradient: true
    },
    {
      icon: UserCheck,
      title: "Fractional Chief AI Officer",
      description: "Strategic AI leadership without the full-time commitment. Drive AI vision, governance, and execution across your organization.",
      price: "Custom Pricing",
      buttonText: "Learn More",
      buttonAction: () => setLocation("/contact"),
      gradient: false
    },
    {
      icon: Rocket,
      title: "GenAI Hackathon",
      description: "3-day intensive hackathon to jumpstart your team's AI capabilities. Hands-on learning with real business use cases.",
      price: "Enterprise Package",
      buttonText: "Schedule Event",
      buttonAction: () => setLocation("/contact"),
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
            >
              <Card className="h-full bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="text-3xl font-bold gradient-text mb-6">{service.price}</div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={service.buttonAction}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                      service.gradient 
                        ? 'gradient-bg text-white hover:shadow-lg transform hover:scale-105 border-0' 
                        : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                    variant={service.gradient ? "default" : "outline"}
                  >
                    {service.buttonText === "Book Session" && <Calendar className="mr-2 h-5 w-5" />}
                    {service.buttonText === "Learn More" && <Info className="mr-2 h-5 w-5" />}
                    {service.buttonText === "Schedule Event" && <Plus className="mr-2 h-5 w-5" />}
                    {service.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
