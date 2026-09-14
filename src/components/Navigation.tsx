
import { useState } from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Logo from "./navigation/Logo";
import DesktopNavigation from "./navigation/DesktopNavigation";
import UserActions from "./navigation/UserActions";
import MobileNavigation from "./navigation/MobileNavigation";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <DesktopNavigation />
            <NavigationMenu>
              <UserActions />
            </NavigationMenu>
          </div>

          <MobileNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
