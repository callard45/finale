import { BarChart2Icon, HomeIcon, SettingsIcon, LogOutIcon, TrendingUpIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { LogoutButton } from "../../../../components/LogoutButton";
import { useAuth } from "../../../../lib/auth";

// Navigation items data
const navigationItems = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    label: "Home",
    path: "/coach"
  },
  {
    icon: <BarChart2Icon className="w-5 h-5" />,
    label: "Analytics",
    path: "/analytics"
  },
  {
    icon: <TrendingUpIcon className="w-5 h-5" />,
    label: "Analytics (New)",
    path: "/analytics-optimized"
  },
  {
    icon: <SettingsIcon className="w-5 h-5" />,
    label: "Settings",
    path: "/coach-settings"
  },
];

export const NavigationSection = (): JSX.Element => {
  const location = useLocation();
  const { user } = useAuth();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <nav className="flex flex-col h-screen w-60 px-6 py-8 bg-white/95 backdrop-blur-sm shadow-sm border-r border-slate-200/60 fixed left-0 top-0 z-50">
      {/* Enhanced Logo and Brand */}
      <Link to="/" className="flex items-center gap-3 mb-10 flex-shrink-0 group">
        <img
          className="w-12 h-12 object-cover rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-200"
          alt="GenKreer Logo"
          src="/logo.png"
        />
        <h1 className="font-bold text-slate-800 text-xl tracking-tight">
          GenKreer
        </h1>
      </Link>

      {/* Enhanced Navigation Links */}
      <div className="flex flex-col items-start gap-2 w-full flex-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path === "/coach" && location.pathname.startsWith("/coach") && location.pathname !== "/coach-settings");
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex h-12 items-center gap-3 px-4 py-0 w-full rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? "bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 shadow-sm ring-1 ring-blue-200/60" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}>
                {item.icon}
              </div>
              <span className={`font-medium text-sm tracking-tight ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Enhanced User Profile */}
      <div className="flex items-center gap-3 p-4 w-full bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl flex-shrink-0 ring-1 ring-slate-200/60 hover:shadow-sm transition-all duration-200">
        <Avatar className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 shadow-sm">
          <AvatarFallback className="font-semibold text-white text-base">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'SJ'}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm text-slate-800 font-semibold tracking-tight">
            {user?.name || 'Sarah Johnson'}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Career Coach
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <LogoutButton 
          variant="ghost" 
          className="w-full justify-start px-4 h-12 rounded-2xl"
          checkUnsavedChanges={true}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </div>
    </nav>
  );
};