
import { Button } from "@/components/ui/button";
import { 
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";

const UserActions = () => {
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
    <NavigationMenuList className="space-x-2">
      {user ? (
        <>
          {isStaff && (
            <NavigationMenuItem>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-black hover:bg-blue-600 hover:text-white">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="text-black border-gray-300 hover:bg-blue-600 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </NavigationMenuItem>
        </>
      ) : (
        <NavigationMenuItem>
          <Link to="/login">
            <Button variant="outline" className="text-black border-gray-300 hover:bg-blue-600 hover:text-white">Sign In</Button>
          </Link>
        </NavigationMenuItem>
      )}
    </NavigationMenuList>
  );
};

export default UserActions;
