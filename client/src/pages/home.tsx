import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ContentHubSection from "@/components/content-hub-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ContentHubSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
