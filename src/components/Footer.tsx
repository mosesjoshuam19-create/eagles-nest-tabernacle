
import { Link } from "react-router-dom";
import { Facebook, Youtube, Mail, Phone } from "lucide-react";
import Sitemap from "./Sitemap";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/uploads/etmlogo.png"
                alt="Eagle's Nest Tabernacle logo"
                className="h-10 w-10 rounded-full border border-blue-200 bg-white/80 object-contain"
              />
              <span className="font-bold">Eagle's Nest Tabernacle</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Bible-believing Christians following the End Time Message through 
              Prophet{" "}
              <a 
                href="https://branham.org/en/williambranham" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                William Marrion Branham
              </a>.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61562067476220" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@endtimemessageministry-bwa5344"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
                aria-label="YouTube channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a href="mailto:info@etmministry.org" className="text-gray-300 hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about/our-church" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/services/live" className="text-gray-300 hover:text-white">Live Services</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white">Events</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ministries</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/music" className="text-gray-300 hover:text-white">Music Ministry</Link></li>
              <li><Link to="/witnessing/missions" className="text-gray-300 hover:text-white">Missions</Link></li>
              <li><Link to="/witnessing/satellite" className="text-gray-300 hover:text-white">Satellite Churches</Link></li>
              <li><Link to="/about/leadership" className="text-gray-300 hover:text-white">Leadership</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <div className="text-gray-300">
                  <div>+265 994 02 25 25</div>
                  <div>+265 993 87 91 21</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-gray-300">info@etmministry.org</span>
              </div>
              <p className="text-gray-300">
                Lilongwe, Malawi<br />
                Central Region
              </p>
            </div>
          </div>
        </div>

        {/* Sitemap Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <Sitemap />
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 Eagle's Nest Tabernacle. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
