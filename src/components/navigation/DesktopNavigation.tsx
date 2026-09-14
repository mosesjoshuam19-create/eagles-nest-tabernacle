
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { navigationItems } from "./navigationData";

const DesktopNavigation = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem className="relative">
            <Link to="/">
              <Button variant="ghost" className="text-black hover:bg-blue-600 hover:text-white">Home</Button>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-black hover:bg-blue-600 hover:text-white">About Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-80 p-4 bg-white border border-gray-200">
                <div className="grid gap-2">
                  {navigationItems.aboutUs.map((item) => (
                    <Link key={item.to} to={item.to} className="block p-2 rounded hover:bg-blue-50">
                      <div className="font-medium text-black">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-black hover:bg-blue-600 hover:text-white">Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-60 p-4 bg-white border border-gray-200">
                <div className="grid gap-2">
                  {navigationItems.services.map((item) => (
                    <Link key={item.to} to={item.to} className="block p-2 rounded hover:bg-blue-50">
                      <div className="font-medium text-black">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-black hover:bg-blue-600 hover:text-white">Media</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-60 p-4 bg-white border border-gray-200">
                <div className="grid gap-2">
                  {navigationItems.media.map((item) => (
                    <Link key={item.to} to={item.to} className="block p-2 rounded hover:bg-blue-50">
                      <div className="font-medium text-black">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-black hover:bg-blue-600 hover:text-white">Witnessing</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-60 p-4 bg-white border border-gray-200">
                <div className="grid gap-2">
                  {navigationItems.witnessing.map((item) => (
                    <Link key={item.to} to={item.to} className="block p-2 rounded hover:bg-blue-50">
                      <div className="font-medium text-black">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/events">
              <Button variant="ghost" className="text-black hover:bg-blue-600 hover:text-white">Events</Button>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/music">
              <Button variant="ghost" className="text-black hover:bg-blue-600 hover:text-white">Music</Button>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/contact">
              <Button variant="ghost" className="text-black hover:bg-blue-600 hover:text-white">Contact</Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
