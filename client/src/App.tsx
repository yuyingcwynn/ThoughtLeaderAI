import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleTagManager } from "@/components/google-tag-manager";
import { useEffect } from "react";
import { initGA, trackPageView } from "@/lib/google-analytics";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import ThoughtLeadership from "@/pages/thought-leadership";
import Checkout from "@/pages/checkout";
import BookingSuccess from "@/pages/booking-success";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import AIReadiness from "@/pages/ai-readiness-simple";
import AIBootcamp from "@/pages/ai-bootcamp";
import SEOAdmin from "@/pages/seo-admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/thought-leadership" component={ThoughtLeadership} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/booking-success" component={BookingSuccess} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/ai-readiness" component={AIReadiness} />
      <Route path="/ai-bootcamp" component={AIBootcamp} />
      <Route path="/seo-admin" component={SEOAdmin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    
    // Track initial page view
    trackPageView(window.location.pathname);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GoogleTagManager gtmId={import.meta.env.VITE_GTM_ID} />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
