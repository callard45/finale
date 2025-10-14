import {
  BriefcaseIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
  WandSparklesIcon,
  MessageSquareIcon,
  LogOutIcon
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { LogoutButton } from "../../../../components/LogoutButton";
import { useAuth } from "../../../../lib/auth";

// Navigation menu items data
const navigationItems = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    label: "Home",
    path: "/dashboard"
  },
  {
    icon: <MessageSquareIcon className="w-5 h-5" />,
    label: "AI Interview",
    path: "/ai-interview"
  },
  {
    icon: <UserIcon className="w-5 h-5" />,
    label: "My Profile",
    path: "/profile"
  },
  {
    icon: <UsersIcon className="w-5 h-5" />,
    label: "Network",
    path: "/network"
  },
  {
    icon: <WandSparklesIcon className="w-5 h-5" />,
    label: "Generator",
    path: "/generator"
  },
  {
    icon: <BriefcaseIcon className="w-5 h-5" />,
    label: "Job Tracker",
    path: "/job-tracker"
  },
];

export const NavigationSection = (): JSX.Element => {
  const location = useLocation();
  const { user } = useAuth();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <nav className="flex flex-col w-60 min-h-screen items-start gap-8 px-6 py-8 bg-white/95 backdrop-blur-sm shadow-sm border-r border-slate-200/60 fixed">
      {/* Logo and Brand Name */}
      <Link to="/" className="flex items-center w-full group">
        <img
          className="w-12 h-12 object-cover rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-200"
          alt="GenKreer Logo"
          src="/logo.png"
        />
        <h1 className="ml-3 font-bold text-slate-800 text-xl tracking-tight">
          GenKreer
        </h1>
      </Link>

      {/* Navigation Menu */}
      <div className="flex flex-col items-start gap-2 w-full">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              className={`flex h-12 items-center gap-3 px-4 py-0 w-full rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? "bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 shadow-sm ring-1 ring-blue-200/60" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
              to={item.path || "#"}
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
        
      {/* User Profile */}
      <div className="flex items-center gap-3 p-4 w-full bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl mt-auto ring-1 ring-slate-200/60 hover:shadow-sm transition-all duration-200">
        <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
          <AvatarFallback className="font-semibold text-white text-base">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'JS'}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start justify-center">
          <div className="font-semibold text-slate-800 text-sm tracking-tight">
            {user?.name || 'John Smith'}
          </div>
          <div className="font-medium text-slate-500 text-xs">
            {user?.role === 'student' ? 'Computer Science' : 'Career Coach'}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <LogoutButton 
        variant="ghost" 
        className="w-full justify-start px-4 h-12 rounded-2xl"
        checkUnsavedChanges={true}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </nav>
  );
};