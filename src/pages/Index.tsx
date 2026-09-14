
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedSections from "@/components/FeaturedSections";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedSections />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
