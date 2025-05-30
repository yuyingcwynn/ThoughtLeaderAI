import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function Login() {
  const [returnUrl, setReturnUrl] = useState("");

  useEffect(() => {
    // Get return URL from query params
    const urlParams = new URLSearchParams(window.location.search);
    const return_url = urlParams.get('return');
    if (return_url) {
      setReturnUrl(return_url);
    }
  }, []);

  const handleGoogleLogin = () => {
    // Include return URL in the auth flow
    let authUrl = '/auth/google';
    if (returnUrl) {
      authUrl += `?returnTo=${encodeURIComponent(returnUrl)}`;
    }
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  Sign in to your <span className="gradient-text">AI Expert</span> account
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Access your consultation dashboard and manage your hours
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  onClick={handleGoogleLogin}
                  className="w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  variant="outline"
                >
                  <Mail className="mr-3 h-5 w-5 text-red-500" />
                  Continue with Google
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    By signing in, you agree to our terms of service and privacy policy.
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      Don't have any consultation hours yet?
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/checkout'}
                      className="w-full gradient-bg text-white"
                    >
                      Book AI Expert Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}