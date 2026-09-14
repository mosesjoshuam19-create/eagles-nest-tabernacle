
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const MobileNavigation = ({ isMenuOpen, setIsMenuOpen }: MobileNavigationProps) => {
  const { user, signOut, userRoles } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const hasRole = (role: string) => userRoles.includes(role);
  const isStaff = hasRole('admin') || hasRole('pastor') || hasRole('trustee') || hasRole('deacon') || hasRole('music_director') || hasRole('media_director');

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-black"
        >
          ☰
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200">
          <div className="space-y-2">
            <Link to="/" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">Home</Link>
            <Link to="/about/our-church" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">About Us</Link>
            <Link to="/services/live" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">Services</Link>
            <Link to="/media/pictures" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">Media</Link>
            <Link to="/witnessing/missions" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">Witnessing</Link>
            <Link to="/events" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">Events</Link>
            <Link to="/music" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">Music</Link>
            <Link to="/contact" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">Contact</Link>
            
            {user ? (
              <>
                {isStaff && (
                  <Link to="/dashboard" className="block px-4 py-2 text-black hover:bg-blue-50 rounded">Dashboard</Link>
                )}
                <button onClick={handleSignOut} className="block px-4 py-2 text-black hover:bg-blue-50 rounded w-full text-left">Sign Out</button>
              </>
            ) : (
              <Link to="/login" className="block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
