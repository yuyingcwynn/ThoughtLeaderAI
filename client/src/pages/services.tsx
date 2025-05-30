import Navigation from "@/components/navigation";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
}