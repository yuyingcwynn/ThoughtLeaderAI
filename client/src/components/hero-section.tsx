import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Yuying <span className="gradient-text">Chen-Wynn</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              AI Technology Executive & Strategic Advisor
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-lg">
              Driving generative AI transformation with 15+ years of expertise in AI/ML products, platforms, and governance. Former Head of AI at PEAK6, delivering $10M+ in efficiency gains and $500M in value creation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToBooking}
                className="gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book AI Expert Session
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToServices}
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-200"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:flex justify-center items-center fade-in"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-circle w-80 h-80 lg:w-96 lg:h-96 mx-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
                alt="Yuying Chen-Wynn Professional Portrait" 
                className="w-full h-full object-cover rounded-full shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
}
