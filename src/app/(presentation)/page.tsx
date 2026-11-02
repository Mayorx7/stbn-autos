
import HeroSection from "@/components/homepage/hero-section";
import { FeaturesSection } from "@/components/homepage/features-section";
import LastestArrival from "@/components/homepage/lastest-arrival";
import OurBrandSection from "@/components/homepage/our-brands-section";
import { PosterCTA } from "@/components/homepage/poster-cta";
import { CustomerTestimonials } from "@/components/homepage/customer-testimonials";
import { FaqSection } from "@/components/homepage/faq-section";
import { PromotionalBanner } from "@/components/homepage/promotional-banner";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-background">
      <HeroSection />
      <PromotionalBanner />
      <FeaturesSection />
      <PosterCTA />
      <LastestArrival />
      <OurBrandSection />
      <CustomerTestimonials />
      <FaqSection />
    </div>
  );
}
