import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ArrowLeft, Clock } from "lucide-react";
import { useLocation } from "wouter";

const packages = [
  { 
    duration: "1 hour", 
    price: 800, 
    displayPrice: "$800", 
    popular: false,
    calendlyUrl: "https://calendly.com/yuyingcwynn/ai-expertise-1hr",
    description: "Focused discussion in one AI domain"
  },
  { 
    duration: "90 minutes", 
    price: 1150, 
    displayPrice: "$1150", 
    popular: true,
    calendlyUrl: "https://calendly.com/yuyingcwynn/ai-expertise-90m",
    description: "AI platform due diligence or AI strategy consultation"
  },
  { 
    duration: "2 hours", 
    price: 1500, 
    displayPrice: "$1500", 
    popular: false,
    calendlyUrl: "https://calendly.com/yuyingcwynn/ai-expertise-2hr",
    description: "Deep dive into AI strategy and implementation focus"
  }
];

export default function Checkout() {
  const [, setLocation] = useLocation();

  const handlePackageSelect = (pkg: any) => {
    // Redirect directly to Calendly for the selected package
    window.open(pkg.calendlyUrl, '_blank');
  };

  const goBack = () => {
    setLocation('/services');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              onClick={goBack}
              variant="ghost" 
              className="mb-8 text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Book Your <span className="gradient-text">AI Expert</span> Session
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Choose your consultation duration and book directly through Calendly with integrated payment processing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              
              <div className="grid md:grid-cols-3 gap-6">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.duration}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="relative"
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <Card 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl h-96 flex flex-col ${
                        pkg.popular ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handlePackageSelect(pkg)}
                    >
                      <CardHeader className="text-center">
                        <Clock className="w-8 h-8 mx-auto mb-4 text-primary" />
                        <CardTitle className="text-xl">{pkg.duration}</CardTitle>
                        <div className="text-3xl font-bold gradient-text">{pkg.displayPrice}</div>
                      </CardHeader>
                      <CardContent className="text-center flex-1 flex flex-col justify-between">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {pkg.description}
                        </p>
                        <Button className="w-full gradient-bg text-white hover:shadow-lg transition-all duration-200 mt-auto">
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Secure Booking & Payment
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Clicking "Book Now" will open Calendly where you can select your preferred time slot and complete payment securely. All sessions include follow-up resources and actionable insights.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}