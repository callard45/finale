import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const NavigationSection = (): JSX.Element => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("home");

  // Navigation menu items data
  const navItems = [
    { label: "Home", isActive: activeSection === "home", path: "/" },
    { label: "How It Works", isActive: activeSection === "how_it_works", path: "#how_it_works" },
    { label: "For Schools", isActive: activeSection === "for-schools", path: "#for-schools" },
    { label: "Contact", isActive: activeSection === "contact", path: "#contact" },
  ];

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const howItWorksSection = document.getElementById("how_it_works");
      const forSchoolsSection = document.getElementById("for-schools");
      const contactSection = document.getElementById("contact");

      // Default to home
      let currentSection = "home";

      // Check if sections are in view, starting from the bottom
      if (contactSection && scrollPosition >= contactSection.offsetTop - 100) {
        currentSection = "contact";
      } else if (forSchoolsSection && scrollPosition >= forSchoolsSection.offsetTop - 100) {
        currentSection = "for-schools";
      } else if (howItWorksSection && scrollPosition >= howItWorksSection.offsetTop - 100) {
        currentSection = "how_it_works";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, section: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section);
      }
    }
  };

  const handleLoginClick = () => {
    console.log("User clicked Log In");
    // In a real app, this would be handled by the Link component's navigation
  };

  const handleSignUpClick = () => {
    console.log("User clicked Sign Up");
    // In a real app, this would be handled by the Link component's navigation
  };

  return (
    <header className="flex h-20 items-center justify-between px-6 w-full bg-transparent sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-2">
        <img
          className="w-[59px] h-[59px] object-contain"
          alt="GenKreer Logo"
          src="/logo.png"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/59x59/blue/white?text=GK";
          }}
        />
        <div className="font-bold text-slate-800 text-lg tracking-[0] leading-[21.6px] font-['Montserrat',Helvetica]">
          GenKreer
        </div>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="flex items-center gap-10">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <a 
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path, item.path.replace('#', ''))}
                className={`w-fit font-['Inter',Helvetica] text-sm tracking-[0] leading-[16.8px] whitespace-nowrap ${
                  item.isActive
                    ? "text-blue-500 font-normal"
                    : "text-slate-800 font-medium hover:text-blue-400 transition-colors"
                }`}
              >
                {item.label}
              </a>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Authentication */}
      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button
            variant="ghost"
            className="font-['Inter',Helvetica] font-medium text-slate-800 text-sm hover:text-blue-500"
            onClick={handleLoginClick}
          >
            Log In
          </Button>
        </Link>
        <Link to="/login">
          <Button 
            className="w-[120px] h-10 rounded-[20px] font-['Inter',Helvetica] font-medium text-white text-sm bg-gradient-to-b from-blue-500 to-blue-600"
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
};