import {
  BellIcon,
  CheckSquareIcon,
  ChevronRightIcon,
  FileTextIcon,
  MessageSquareIcon,
  UserIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XIcon,
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  ChevronDownIcon,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";
import { Badge } from "../../../../components/ui/badge";

export const DashboardSection = (): JSX.Element => {
  // Handle bell icon click (notifications)
  const handleNotificationsClick = () => {
    console.log("Opening notifications panel");
    // In a real app, this would open a notifications panel or page
  };

  // Handle view all recent activities
  const handleViewAllActivities = () => {
    console.log("Viewing all activities");
    // In a real app, this would navigate to a page showing all activities
  };

  // Handle quick action click
  const handleQuickAction = (actionTitle: string) => {
    console.log(`Starting ${actionTitle} action`);
    // In a real app, this would navigate to the appropriate page or open a modal
    
    // If the action is "AI Interview", navigate to the AI Interview page
    if (actionTitle === "AI Interview") {
      window.location.href = "/ai-interview";
    } else if (actionTitle === "Generate CV") {
      window.location.href = "/generator";
    } else if (actionTitle === "Track Applications") {
      window.location.href = "/job-tracker";
    }
  };

  // Data for applications card
  const applicationStats = [
    { value: "12", label: "Total", color: "text-slate-700", bgColor: "bg-slate-50" },
    { value: "4", label: "Interviews", color: "text-blue-600", bgColor: "bg-blue-50" },
    { value: "3", label: "Rejected", color: "text-rose-500", bgColor: "bg-rose-50" },
    { value: "2", label: "Offers", color: "text-violet-600", bgColor: "bg-violet-50" },
  ];

  // Data for quick actions
  const quickActions = [
    {
      icon: <MessageSquareIcon className="w-7 h-7 text-blue-600" />,
      title: "AI Interview",
      description:
        "Chat with our AI to improve your profile and generate better documents",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
      cardBg: "bg-gradient-to-br from-white to-blue-50/30",
    },
    {
      icon: <FileTextIcon className="w-7 h-7 text-violet-600" />,
      title: "Generate CV",
      description:
        "Create a professional CV tailored to your target job positions",
      buttonColor: "bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700",
      iconBg: "bg-gradient-to-br from-violet-50 to-violet-100",
      cardBg: "bg-gradient-to-br from-white to-violet-50/30",
    },
    {
      icon: <CheckSquareIcon className="w-7 h-7 text-amber-600" />,
      title: "Track Applications",
      description: "Organize your job search and monitor application status",
      buttonColor: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
      iconBg: "bg-gradient-to-br from-amber-50 to-amber-100",
      cardBg: "bg-gradient-to-br from-white to-amber-50/30",
    },
  ];

  // Data for recent activities
  const [recentActivities, setRecentActivities] = useState([
    {
      icon: <FileTextIcon className="w-5 h-5 text-violet-600" />,
      title: "Generated CV for Software Engineer position",
      time: "Today at 10:30 AM",
      iconBg: "bg-gradient-to-br from-violet-50 to-violet-100",
      type: "document",
      timestamp: new Date(new Date().setHours(10, 30, 0, 0)).getTime(),
      details: {
        company: "Google",
        location: "San Francisco, CA",
        description: "Created a tailored CV highlighting your software engineering skills, technical expertise, and relevant project experience.",
        skills: ["React", "TypeScript", "Node.js", "AWS"],
        actions: [
          { label: "View CV", url: "/generator" },
          { label: "Edit CV", url: "/generator" }
        ]
      }
    },
    {
      icon: <MessageSquareIcon className="w-5 h-5 text-blue-600" />,
      title: "Completed AI Interview session",
      time: "Yesterday at 3:45 PM",
      iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
      type: "interview",
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).setHours(15, 45, 0, 0),
      details: {
        duration: "45 minutes",
        questions: 12,
        topics: ["Technical skills", "Work experience", "Problem-solving approach", "Team collaboration"],
        insights: "The AI identified your strong analytical skills and suggested highlighting your experience with cross-functional teams.",
        actions: [
          { label: "View Transcript", url: "/ai-interview" },
          { label: "Start New Interview", url: "/ai-interview" }
        ]
      }
    },
    {
      icon: <CheckSquareIcon className="w-5 h-5 text-amber-600" />,
      title: "Added new application to Job Tracker",
      time: "2 days ago at 11:20 AM",
      iconBg: "bg-gradient-to-br from-amber-50 to-amber-100",
      type: "application",
      timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).setHours(11, 20, 0, 0),
      details: {
        position: "Senior Frontend Developer",
        company: "Microsoft",
        status: "Applied",
        applicationDate: "2 days ago",
        documents: ["CV_Microsoft_Frontend.pdf", "CL_Microsoft_Frontend.pdf"],
        nextSteps: "Wait for initial screening call, expected within 1-2 weeks",
        actions: [
          { label: "View Application", url: "/job-tracker" },
          { label: "Update Status", url: "/job-tracker" }
        ]
      }
    },
  ]);

  // Sorting state
  const [sortField, setSortField] = useState<string>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortedActivities, setSortedActivities] = useState([...recentActivities]);

  // State for expanded activity
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Apply sorting when sort parameters change
  useEffect(() => {
    const sorted = [...recentActivities].sort((a, b) => {
      if (sortField === "timestamp") {
        return sortDirection === "asc" 
          ? a.timestamp - b.timestamp 
          : b.timestamp - a.timestamp;
      } else if (sortField === "title") {
        return sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortField === "type") {
        return sortDirection === "asc"
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      }
      return 0;
    });
    
    setSortedActivities(sorted);
  }, [recentActivities, sortField, sortDirection]);

  // Handle sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort icon based on current sort state
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return (
        <div className="w-4 h-4 opacity-30 flex flex-col items-center justify-center">
          <ArrowUpIcon className="w-3 h-3 -mb-1" />
          <ArrowDownIcon className="w-3 h-3 -mt-1" />
        </div>
      );
    }
    
    return sortDirection === "asc" 
      ? <ArrowUpIcon className="w-4 h-4 text-blue-500" /> 
      : <ArrowDownIcon className="w-4 h-4 text-blue-500" />;
  };

  // Save sort preferences to localStorage
  useEffect(() => {
    localStorage.setItem('activitySortPreferences', JSON.stringify({
      field: sortField,
      direction: sortDirection
    }));
  }, [sortField, sortDirection]);

  // Load sort preferences from localStorage on initial load
  useEffect(() => {
    const savedPreferences = localStorage.getItem('activitySortPreferences');
    if (savedPreferences) {
      try {
        const { field, direction } = JSON.parse(savedPreferences);
        setSortField(field);
        setSortDirection(direction);
      } catch (error) {
        console.error("Error parsing saved sort preferences:", error);
      }
    }
  }, []);

  // Handle activity click to expand/collapse details
  const handleActivityClick = (index: number) => {
    setExpandedActivity(expandedActivity === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExpandedActivity(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivityClick(index);
    } else if (e.key === 'Escape' && expandedActivity !== null) {
      setExpandedActivity(null);
    }
  };

  return (
    <div className="flex flex-col items-start gap-10 p-8 relative flex-1 self-stretch grow bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <header className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto] bg-transparent">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-slate-800 text-3xl leading-tight tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-base font-medium">
            Welcome back! Here's what's happening with your career journey.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            onClick={handleNotificationsClick}
          >
            <BellIcon className="w-5 h-5 text-slate-600" />
          </Button>
        </div>
      </header>

      <section className="flex flex-col items-start gap-6 relative self-stretch w-full">
        <div className="flex items-center gap-3">
          <h2 className="text-slate-800 text-xl font-semibold tracking-tight">
            Your Progress
          </h2>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>

        <div className="flex items-start gap-8 relative self-stretch w-full">
          <Card className="flex-1 rounded-3xl shadow-sm bg-gradient-to-br from-white to-blue-50/30 border-0 ring-1 ring-slate-200/60 hover:shadow-md hover:ring-blue-500/20 transition-all duration-300">
            <CardContent className="flex flex-col h-full gap-5 p-8">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold text-slate-800 text-lg tracking-tight">
                  Profile Completion
                </h3>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              <div className="space-y-3">
                <Progress 
                  value={75} 
                  className="h-3 bg-slate-100 rounded-full overflow-hidden"
                />
                
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-slate-800 text-2xl tracking-tight">
                    75%
                  </span>
                  <Link to="/profile" className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200">
                    Complete your profile →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 rounded-3xl shadow-sm bg-gradient-to-br from-white to-violet-50/30 border-0 ring-1 ring-slate-200/60 hover:shadow-md hover:ring-violet-500/20 transition-all duration-300">
            <CardContent className="flex flex-col h-full gap-5 p-8">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold text-slate-800 text-lg tracking-tight">
                  Applications
                </h3>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 flex items-center justify-center">
                  <FileTextIcon className="w-6 h-6 text-violet-600" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 w-full">
                {applicationStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center space-y-1"
                  >
                    <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <span className={`font-bold text-lg ${stat.color}`}>
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col items-start gap-6 relative self-stretch w-full">
        <div className="flex items-center gap-3">
          <h2 className="text-slate-800 text-xl font-semibold tracking-tight">
            Quick Actions
          </h2>
          <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
        </div>

        <div className="flex items-start gap-8 relative self-stretch w-full">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className={`flex-1 rounded-3xl shadow-sm border-0 ring-1 ring-slate-200/60 hover:shadow-lg hover:ring-blue-500/20 transition-all duration-300 group cursor-pointer ${action.cardBg}`}
              onClick={() => handleQuickAction(action.title)}
            >
              <CardContent className="flex flex-col h-[240px] pt-8 pb-6 px-8">
                <div className="flex flex-col h-full space-y-5">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl ${action.iconBg} group-hover:scale-110 transition-transform duration-200`}
                  >
                    {action.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-slate-800 text-lg font-semibold tracking-tight">
                      {action.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  <Button
                    className={`w-full mt-auto ${action.buttonColor} rounded-2xl text-white font-medium h-12 shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-6 relative self-stretch w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <h2 className="text-slate-800 text-xl font-semibold tracking-tight">
              Recent Activity
            </h2>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="link"
              className="font-medium text-blue-600 text-sm p-0 hover:text-blue-700 transition-colors duration-200"
              onClick={handleViewAllActivities}
            >
              View All →
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-8 px-3 rounded-lg flex items-center gap-1 text-xs font-medium border-slate-200 hover:bg-slate-50 ${sortField === "title" ? "bg-blue-50 border-blue-200" : ""}`}
                onClick={() => handleSort("title")}
              >
                Title {getSortIcon("title")}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-8 px-3 rounded-lg flex items-center gap-1 text-xs font-medium border-slate-200 hover:bg-slate-50 ${sortField === "timestamp" ? "bg-blue-50 border-blue-200" : ""}`}
                onClick={() => handleSort("timestamp")}
              >
                Date {getSortIcon("timestamp")}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-8 px-3 rounded-lg flex items-center gap-1 text-xs font-medium border-slate-200 hover:bg-slate-50 ${sortField === "type" ? "bg-blue-50 border-blue-200" : ""}`}
                onClick={() => handleSort("type")}
              >
                Type {getSortIcon("type")}
              </Button>
            </div>
          </div>
        </div>

        <Card className="w-full rounded-3xl shadow-sm bg-white border-0 ring-1 ring-slate-200/60 hover:shadow-md transition-all duration-300">
          <CardContent className="flex flex-col gap-1 p-6">
            {sortedActivities.map((activity, index) => (
              <div key={index} className="relative">
                <div 
                  className={`flex items-center gap-4 w-full p-4 rounded-2xl ${expandedActivity === index ? 'bg-slate-50/80' : 'hover:bg-slate-50/80'} transition-all duration-200 cursor-pointer group`}
                  onClick={() => handleActivityClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={expandedActivity === index}
                  aria-controls={`activity-details-${index}`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl ${activity.iconBg} group-hover:scale-105 transition-transform duration-200`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex flex-col items-start justify-center flex-1 space-y-1">
                    <h4 className="font-medium text-slate-800 text-sm tracking-tight">
                      {activity.title}
                    </h4>
                    <span className="text-slate-500 text-xs font-medium">
                      {activity.time}
                    </span>
                  </div>
                  {expandedActivity === index ? (
                    <ChevronDownIcon className="w-5 h-5 text-slate-600 transition-all duration-200" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-200" />
                  )}
                </div>
                
                {/* Dropdown Details Panel */}
                {expandedActivity === index && (
                  <div 
                    ref={dropdownRef}
                    id={`activity-details-${index}`}
                    className="mt-1 ml-16 mr-4 mb-4 p-5 bg-white rounded-xl border border-slate-200 shadow-md animate-[fadeIn_0.3s_ease-in-out]"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {activity.type === "document" && "Document Details"}
                        {activity.type === "interview" && "Interview Details"}
                        {activity.type === "application" && "Application Details"}
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full hover:bg-slate-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedActivity(null);
                        }}
                      >
                        <XIcon className="h-4 w-4 text-slate-500" />
                      </Button>
                    </div>
                    
                    {activity.type === "document" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-slate-500">COMPANY</p>
                            <p className="text-sm font-medium text-slate-800">{activity.details.company}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-slate-500">LOCATION</p>
                            <p className="text-sm font-medium text-slate-800">{activity.details.location}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-slate-500">DESCRIPTION</p>
                          <p className="text-sm text-slate-700">{activity.details.description}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-500">HIGHLIGHTED SKILLS</p>
                          <div className="flex flex-wrap gap-2">
                            {activity.details.skills.map((skill, idx) => (
                              <Badge key={idx} className="bg-violet-50 text-violet-700 border-violet-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          {activity.details.actions.map((action, idx) => (
                            <Link key={idx} to={action.url}>
                              <Button 
                                variant={idx === 0 ? "default" : "outline"}
                                size="sm"
                                className={idx === 0 ? "bg-violet-600 hover:bg-violet-700" : ""}
                              >
                                {action.label}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activity.type === "interview" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-slate-500">DURATION</p>
                            <p className="text-sm font-medium text-slate-800">{activity.details.duration}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-slate-500">QUESTIONS</p>
                            <p className="text-sm font-medium text-slate-800">{activity.details.questions}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-500">TOPICS COVERED</p>
                          <div className="flex flex-wrap gap-2">
                            {activity.details.topics.map((topic, idx) => (
                              <Badge key={idx} className="bg-blue-50 text-blue-700 border-blue-200">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-slate-500">KEY INSIGHTS</p>
                          <p className="text-sm text-slate-700">{activity.details.insights}</p>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          {activity.details.actions.map((action, idx) => (
                            <Link key={idx} to={action.url}>
                              <Button 
                                variant={idx === 0 ? "default" : "outline"}
                                size="sm"
                                className={idx === 0 ? "bg-blue-600 hover:bg-blue-700" : ""}
                              >
                                {action.label}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activity.type === "application" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-slate-500">POSITION</p>
                            <p className="text-sm font-medium text-slate-800">{activity.details.position}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-slate-500">COMPANY</p>
                            <p className="text-sm font-medium text-slate-800">{activity.details.company}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-slate-500">STATUS</p>
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                              {activity.details.status}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-slate-500">APPLIED ON</p>
                            <p className="text-sm font-medium text-slate-800">{activity.details.applicationDate}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-500">DOCUMENTS</p>
                          <div className="flex flex-col gap-2">
                            {activity.details.documents.map((doc, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-blue-600">
                                <FileTextIcon className="w-4 h-4" />
                                <span className="hover:underline cursor-pointer">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-slate-500">NEXT STEPS</p>
                          <p className="text-sm text-slate-700">{activity.details.nextSteps}</p>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          {activity.details.actions.map((action, idx) => (
                            <Link key={idx} to={action.url}>
                              <Button 
                                variant={idx === 0 ? "default" : "outline"}
                                size="sm"
                                className={idx === 0 ? "bg-amber-600 hover:bg-amber-700" : ""}
                              >
                                {action.label}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};