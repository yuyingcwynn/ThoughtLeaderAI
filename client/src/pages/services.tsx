import Navigation from "@/components/navigation";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Services() {
  const [, setLocation] = useLocation();

  const goBack = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              onClick={goBack}
              variant="ghost" 
              className="mb-8 text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </section>
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
}