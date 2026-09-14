
import { Link } from "react-router-dom";

const Sitemap = () => {
  const sitemapLinks = [
    { name: "Home", path: "/" },
    { name: "About Our Church", path: "/about/our-church" },
    { name: "Mission", path: "/about/mission" },
    { name: "Leadership", path: "/about/leadership" },
    { name: "Values", path: "/about/values" },
    { name: "Beliefs", path: "/about/beliefs" },
    { name: "History", path: "/about/history" },
    { name: "Live Services", path: "/services/live" },
    { name: "Archives", path: "/services/archives" },
    { name: "Pictures", path: "/media/pictures" },
    { name: "Videos", path: "/media/videos" },
    { name: "Interviews", path: "/media/interviews" },
    { name: "Missions", path: "/witnessing/missions" },
    { name: "Satellite Churches", path: "/witnessing/satellite" },
    { name: "Affiliations", path: "/witnessing/affiliations" },
    { name: "Events", path: "/events" },
    { name: "Music", path: "/music" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Sitemap</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-sm">
        {sitemapLinks.map((link, index) => (
          <Link 
            key={index}
            to={link.path} 
            className="text-gray-300 hover:text-white py-1 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sitemap;
