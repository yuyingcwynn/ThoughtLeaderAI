import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useLocation } from "wouter";

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function BookingSuccess() {
  const [, setLocation] = useLocation();
  const [packageInfo, setPackageInfo] = useState<any>(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Get package info from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const packageHours = urlParams.get('package');
    const email = urlParams.get('email');
    
    if (packageHours) {
      const packages = [
        { hours: "0.5", duration: "30 minutes", price: "$250" },
        { hours: "1", duration: "1 hour", price: "$500" },
        { hours: "5", duration: "5 hours", price: "$2,400" },
        { hours: "10", duration: "10 hours", price: "$4,500" }
      ];
      
      const selectedPackage = packages.find(pkg => pkg.hours === packageHours);
      setPackageInfo(selectedPackage);
    }
    
    if (email) {
      setUserEmail(email);
    }

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const handleScheduleClick = () => {
    console.log('Schedule button clicked');
    console.log('Calendly available:', !!window.Calendly);
    console.log('User email:', userEmail);
    console.log('Package info:', packageInfo);
    
    // Try Calendly popup first
    if (window.Calendly && window.Calendly.initPopupWidget) {
      try {
        window.Calendly.initPopupWidget({
          url: 'https://calendly.com/yuyingcwynn',
          prefill: {
            email: userEmail,
            customAnswers: {
              a1: packageInfo ? `Package: ${packageInfo.duration} (${packageInfo.price})` : '',
            }
          }
        });
        console.log('Calendly popup initiated');
        return;
      } catch (error) {
        console.error('Calendly popup error:', error);
      }
    }
    
    // Fallback: open in new tab
    console.log('Using fallback - opening in new tab');
    const calendlyUrl = `https://calendly.com/yuyingcwynn${userEmail ? `?prefill_email=${encodeURIComponent(userEmail)}` : ''}`;
    window.open(calendlyUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Payment <span className="gradient-text">Successful!</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Your AI Expert session package has been purchased. Now let's schedule your consultation.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Package Summary */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Your Package
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {packageInfo ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                          <span className="font-semibold">{packageInfo.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Price:</span>
                          <span className="font-semibold text-primary">{packageInfo.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Email:</span>
                          <span className="font-semibold">{userEmail}</span>
                        </div>
                        <div className="pt-4 border-t">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Your consultation hours are now available for scheduling. 
                            Book individual sessions using the hours from your package.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p>Loading package information...</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Schedule Your Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Click below to open the scheduling calendar and book your first AI expert consultation.
                    </p>
                    
                    <Button 
                      onClick={handleScheduleClick}
                      className="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Now
                    </Button>

                    <div className="pt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-start">
                        <Mail className="mr-2 h-4 w-4 mt-0.5 text-primary" />
                        <span>You'll receive a confirmation email with meeting details</span>
                      </div>
                      <div className="flex items-start">
                        <Clock className="mr-2 h-4 w-4 mt-0.5 text-primary" />
                        <span>Sessions can be scheduled based on your purchased package hours</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button 
                        variant="outline"
                        onClick={() => setLocation("/")}
                        className="w-full"
                      >
                        Return to Home
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Additional Information */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">What to Expect</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Preparation</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Prepare your questions and specific AI challenges beforehand
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Expert Guidance</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Get strategic insights from 15+ years of AI/ML experience
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Follow-up</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Receive action items and recommendations via email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}