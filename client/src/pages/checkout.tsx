import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_live_51NEJBcKS2v0AJOa4XQz7scZvEZCJDMjvwDhi63KQFR6XGZevREXcv8jP5lgLviz2t1XvTDGtgCCRLXTlCrF10u8n00Lu92polR';

if (!stripePublicKey) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(stripePublicKey);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your booking! You'll receive a confirmation email shortly.",
      });
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Complete Payment</h3>
        <p className="text-gray-600 dark:text-gray-300">Dial-an-AI-Expert Session - $500</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          <Button 
            type="submit" 
            disabled={!stripe || isLoading}
            className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Payment'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          amount: 500,
          sessionType: "dial-an-ai-expert",
          firstName: "Client",
          lastName: "Name",
          email: "client@example.com",
          serviceType: "consultation"
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
      }
    };

    createPaymentIntent();
  }, [toast]);

  const goBack = () => {
    setLocation("/");
  };

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button 
            onClick={goBack}
            variant="ghost" 
            className="mb-8 text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Preparing checkout...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          onClick={goBack}
          variant="ghost" 
          className="mb-8 text-gray-600 dark:text-gray-300 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your AI Expert Session
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get immediate access to deep AI expertise with Yuying Chen-Wynn
          </p>
        </div>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}