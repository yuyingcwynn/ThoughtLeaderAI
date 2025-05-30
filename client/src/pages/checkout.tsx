import { useState } from "react";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Clock, CheckCircle, ArrowLeft } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useLocation } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const packages = [
  { duration: "30 minutes", price: 25000, hours: 0.5, displayPrice: "$250", popular: false },
  { duration: "1 hour", price: 50000, hours: 1, displayPrice: "$500", popular: true },
  { duration: "5 hours", price: 240000, hours: 5, displayPrice: "$2,400", savings: "$100", popular: false },
  { duration: "10 hours", price: 450000, hours: 10, displayPrice: "$4,500", savings: "$500", popular: false }
];

// Test mode check
const isTestMode = new URLSearchParams(window.location.search).get('test') === 'true';

const CheckoutForm = ({ selectedPackage, bookingData }: { selectedPackage: any, bookingData: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-success?package=${selectedPackage.hours}&email=${bookingData.email}`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe}
        className="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
      >
        Complete Payment - {selectedPackage.displayPrice}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [step, setStep] = useState(1); // 1: Package Selection, 2: Booking Details, 3: Payment
  const [selectedPackage, setSelectedPackage] = useState(packages[1]); // Default to 1 hour
  const [clientSecret, setClientSecret] = useState("");
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    serviceType: "AI Strategy Consultation",
    notes: ""
  });
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
    setStep(2);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isTestMode) {
      // Skip payment in test mode and go directly to success
      const params = new URLSearchParams({
        package: selectedPackage.hours.toString(),
        email: bookingData.email
      });
      setLocation(`/booking-success?${params.toString()}`);
      return;
    }
    
    try {
      // Create consultation record and payment intent
      const response = await apiRequest("POST", "/api/create-consultation", {
        ...bookingData,
        sessionType: "dial-an-ai-expert",
        packageHours: selectedPackage.hours.toString(),
        amount: selectedPackage.price
      });
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setStep(3);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setLocation("/services");
    }
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
                Choose your package and get direct access to AI expertise for strategic decisions and transformation guidance.
              </p>
            </motion.div>

            {/* Progress Indicator */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNum 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                    </div>
                    {stepNum < 3 && (
                      <div className={`w-12 h-1 mx-2 ${
                        step > stepNum ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Package Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Choose Your Package
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                          pkg.popular ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handlePackageSelect(pkg)}
                      >
                        <CardHeader className="text-center">
                          <Clock className="w-8 h-8 mx-auto mb-4 text-primary" />
                          <CardTitle className="text-xl">{pkg.duration}</CardTitle>
                          <div className="text-3xl font-bold gradient-text">{pkg.displayPrice}</div>
                          {pkg.savings && (
                            <div className="text-sm text-green-600 dark:text-green-400">
                              Save {pkg.savings}
                            </div>
                          )}
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                            Select Package
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Booking Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">
                      Booking Details - {selectedPackage.duration}
                    </CardTitle>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      Package: {selectedPackage.displayPrice} for {selectedPackage.duration}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={bookingData.firstName}
                            onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={bookingData.lastName}
                            onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={bookingData.company}
                          onChange={(e) => setBookingData({...bookingData, company: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="serviceType">Consultation Focus</Label>
                        <Select value={bookingData.serviceType} onValueChange={(value) => setBookingData({...bookingData, serviceType: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AI Strategy Consultation">AI Strategy Consultation</SelectItem>
                            <SelectItem value="Technical Deep-dive">Technical Deep-dive</SelectItem>
                            <SelectItem value="AI Transformation Guidance">AI Transformation Guidance</SelectItem>
                            <SelectItem value="GenAI Implementation">GenAI Implementation</SelectItem>
                            <SelectItem value="AI Risk & Governance">AI Risk & Governance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={bookingData.notes}
                          onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                          placeholder="Please describe your specific needs or questions..."
                        />
                      </div>
                      
                      <Button type="submit" className="w-full gradient-bg text-white py-3 rounded-xl font-semibold">
                        Proceed to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && clientSecret && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">Complete Your Payment</CardTitle>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      {selectedPackage.duration} - {selectedPackage.displayPrice}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm selectedPackage={selectedPackage} bookingData={bookingData} />
                    </Elements>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && !clientSecret && (
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="mt-4 text-gray-600 dark:text-gray-300">Preparing payment...</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}