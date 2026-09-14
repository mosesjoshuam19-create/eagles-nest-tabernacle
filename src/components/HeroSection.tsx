
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img
              src="/uploads/etmlogo.png"
              alt="Eagle's Nest Tabernacle logo"
              className="h-32 w-32 rounded-full border-4 border-white/80 bg-white/5 object-contain shadow-2xl md:h-40 md:w-40"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Eagle's Nest Tabernacle
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
            Bible-believing Christians following the teachings of the Bible based upon the foundation of the apostles and prophets, Jesus Christ himself being the chief cornerstone
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Following the Message of Prophet{" "}
            <a 
              href="https://branham.org/en/williambranham" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline"
            >
              William Marrion Branham
            </a>{" "}
            - Malachi 4:5,6 and Revelations 10:7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/live">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                Watch Live Service
              </Button>
            </Link>
            <Link to="/about/our-church">
              <Button size="lg" variant="outline" className="border-white text-black px-8 py-3">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
