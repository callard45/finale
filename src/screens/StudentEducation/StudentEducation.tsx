import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  BellIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
  UserIcon,
  BookOpenIcon,
  BriefcaseIcon,
  FolderIcon,
  GraduationCapIcon,
  PhoneIcon,
  CalendarIcon,
  LinkedinIcon,
  GlobeIcon,
  StarIcon,
  AwardIcon,
  TrendingUpIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { NavigationSection } from "../CoachDashboard/sections/NavigationSection/NavigationSection";
import { studentProfiles } from "../../data/studentProfiles";

// Module details mapping for each school
const schoolModules = {
  "ESSEC Business School": {
    "International Business": {
      description: "International Business focuses on the complexities of global markets, emphasizing strategic decision-making, cross-cultural management, and international trade regulations.",
      keyLearning: [
        "During this course, I collaborated on a group project focused on developing a market entry strategy for a mid-sized company targeting international expansion.",
        "Our team conducted a full SWOT analysis, evaluated cultural and economic factors, and recommended an optimal entry model based on risk assessment and financial flexibility.",
        "I personally analyzed the competitive landscape and addressed regulatory challenges, sharpening my strategic thinking, problem-solving, and analytical skills.",
        "We presented our findings to a panel of professors, an experience that strengthened my public speaking, teamwork, and adaptability under pressure.",
        "Through case study evaluations, I developed a better understanding of how multinational firms navigate international markets, learning to critically assess strategic choices and apply academic theory to practical business scenarios.",
        "The final exam and team presentations tested not only our technical understanding of global business dynamics, but also our ability to work collaboratively, think critically, and communicate ideas clearly in a professional setting."
      ]
    },
    "Markets and consumption": {
      description: "This module explores consumer behavior, market dynamics, and consumption patterns across different demographics and cultures.",
      keyLearning: [
        "Analyzed market trends and consumer decision-making processes",
        "Conducted research on purchasing behaviors in digital environments",
        "Developed marketing strategies based on consumption analysis"
      ]
    },
    "Interpreting Management": {
      description: "Focuses on critical approaches to management theory and practice across various organizational contexts.",
      keyLearning: [
        "Studied various management philosophies and leadership styles",
        "Analyzed case studies of successful and failed management approaches",
        "Developed frameworks for decision-making in complex organizational scenarios"
      ]
    },
    "Foundation in digital enterprise": {
      description: "Covers digital transformation, e-commerce fundamentals, and technology integration in modern business operations.",
      keyLearning: [
        "Explored digital business models and platform economics",
        "Analyzed digital disruption across traditional industries",
        "Developed digital transformation strategies for established businesses"
      ]
    }
  },
  "London Business School": {
    "Financial Markets": {
      description: "A comprehensive study of financial markets, instruments, and institutions with emphasis on market mechanisms and efficiency.",
      keyLearning: [
        "Analyzed complex financial instruments and their role in modern markets",
        "Developed trading strategies using technical and fundamental analysis",
        "Created portfolio management models incorporating risk assessment",
        "Conducted market research on emerging financial technologies",
        "Participated in trading simulations with real-time market data",
        "Completed a group project on cryptocurrency market analysis"
      ]
    },
    "Corporate Finance": {
      description: "Advanced study of corporate financial decisions, capital structure, and valuation methods.",
      keyLearning: [
        "Mastered DCF valuation techniques and company analysis",
        "Conducted M&A case studies and deal structuring exercises",
        "Developed financial models for capital budgeting decisions",
        "Analyzed real-world corporate restructuring cases"
      ]
    },
    "Investment Management": {
      description: "Comprehensive coverage of investment principles, portfolio theory, and risk management.",
      keyLearning: [
        "Applied modern portfolio theory to construct optimal portfolios",
        "Implemented various investment strategies across asset classes",
        "Conducted performance attribution analysis",
        "Developed risk management frameworks"
      ]
    }
  },
  "Westminster School": {
    "Advanced Mathematics": {
      description: "A-Level mathematics covering pure mathematics, statistics, and mechanics.",
      keyLearning: [
        "Mastered calculus and advanced algebraic concepts",
        "Applied statistical methods to real-world problems",
        "Studied mechanical systems and physical applications",
        "Achieved top grades in coursework and examinations"
      ]
    },
    "Economics": {
      description: "A-Level economics covering micro and macroeconomic principles.",
      keyLearning: [
        "Analyzed market structures and business behavior",
        "Studied national and international economic policies",
        "Conducted economic research projects",
        "Applied economic theories to current events"
      ]
    }
  },
  "Imperial College London": {
    "International Business": {
      description: "A comprehensive study of international business strategies, global markets, and cross-cultural management.",
      keyLearning: [
        "Developed global market entry strategies for multinational corporations",
        "Analyzed international trade policies and their impact on business operations",
        "Conducted cross-cultural management case studies",
        "Created international business development plans",
        "Studied global supply chain management and logistics",
        "Participated in international business simulations"
      ]
    },
    "Markets and consumption": {
      description: "Advanced analysis of market dynamics, consumer behavior, and global consumption trends.",
      keyLearning: [
        "Analyzed global consumer trends and market segmentation",
        "Studied behavioral economics and decision-making processes",
        "Conducted market research and data analysis",
        "Developed consumer insight frameworks",
        "Created market entry strategies based on consumer analysis",
        "Evaluated digital transformation impact on consumer behavior"
      ]
    },
    "Quantitative Methods": {
      description: "Advanced statistical and mathematical methods for business analysis and decision-making.",
      keyLearning: [
        "Applied statistical methods to business problems",
        "Developed predictive models using advanced analytics",
        "Conducted data analysis using statistical software",
        "Created business forecasting models",
        "Implemented optimization techniques for business decisions",
        "Analyzed big data sets for business insights"
      ]
    }
  }
};

export const StudentEducation = (): JSX.Element => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("education");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("year1");

  // Find student data
  const student = studentProfiles.find(s => s.id === studentId);
  
  // Define tabs for navigation
  const tabs = [
    { id: "overview", label: "Overview", icon: <StarIcon className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <BookOpenIcon className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderIcon className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <BriefcaseIcon className="w-4 h-4" /> },
    { id: "courses", label: "Extra Courses", icon: <AwardIcon className="w-4 h-4" /> }
  ];
  
  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Student Not Found</h2>
        <p className="text-slate-600 mb-6">No student found with ID: {studentId}</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  // Get current education institution
  const currentEducation = student.education[0];
  const modules = currentEducation ? Object.keys(schoolModules[currentEducation.institution] || {}) : [];
  const moduleDetails = currentEducation ? schoolModules[currentEducation.institution] : {};

  // Handle back button click
  const handleBack = () => {
    navigate(`/coach`, { state: { studentId } });
  };

  // Handle module click
  const handleModuleClick = (module: string) => {
    console.log(`Selected module: ${module}`);
    setSelectedModule(module);
  };

  // Handle year selection change
  const handleYearChange = (year: string) => {
    console.log(`Changed to ${year}`);
    setSelectedYear(year);
    // In a real app, this would fetch modules for the selected year
  };

  // Handle notification icon click
  const handleNotificationsClick = () => {
    console.log("Opening notifications panel");
    // In a real app, this would open a notifications panel
  };

  // Handle export button click
  const handleExportClick = () => {
    console.log("Exporting student education data");
    // In a real app, this would trigger a data export process
  };

  // Handle filter button click
  const handleFilterClick = () => {
    console.log("Opening filter options");
    // In a real app, this would open a filter modal/panel
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <NavigationSection />
      <div className="flex flex-col h-full items-start gap-8 p-8 relative ml-60">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 w-full">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Student Profile</h1>
              <p className="text-slate-600">Viewing {student.name}'s academic and professional information</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex items-center gap-2 px-4 py-0 bg-white/80 backdrop-blur-sm rounded-2xl border-0 ring-1 ring-slate-200/60 h-12">
              <SearchIcon className="w-5 h-5 text-slate-400" />
              <Input
                className="border-0 h-full p-0 text-sm text-slate-700 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent font-medium" 
                defaultValue={studentId || "10105518"}
                readOnly
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
              onClick={handleNotificationsClick}
            >
              <BellIcon className="w-5 h-5 text-slate-600" />
            </Button>

            <Button
              variant="outline"
              className="h-12 gap-2 px-6 py-0 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
              onClick={handleExportClick}
            >
              <DownloadIcon className="w-5 h-5 text-slate-600" />
              <span className="font-semibold text-slate-700 text-sm">Export</span>
            </Button>

            <Button
              variant="outline"
              className="h-12 gap-2 px-6 py-0 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
              onClick={handleFilterClick}
            >
              <FilterIcon className="w-5 h-5 text-slate-600" />
              <span className="font-semibold text-slate-700 text-sm">Filter</span>
            </Button>
          </div>
        </div>

        {/* Profile Header Card - Matching Profile.tsx style */}
        <Card className="w-full mb-8 overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-3xl shadow-sm">
          <div className="h-32 relative">
            <img 
              src="/image copy copy.png" 
              alt="University Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex items-start gap-6 -mt-12">
              <div className={`w-32 h-32 rounded-full border-4 border-white shadow-lg ${student.avatarGradient} flex items-center justify-center`}>
                <span className="text-white text-3xl font-bold">
                  {student.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              
              <div className="flex-1 mt-16">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{student.name}</h2>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCapIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-lg text-blue-600 font-medium">{student.program}</span>
                    </div>
                    <p className="text-slate-700 max-w-3xl leading-relaxed text-base mb-4">
                      Student at {student.education[0].institution} with a focus on {student.program}. 
                      Currently pursuing {student.education[0].degree}.
                    </p>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${student.status.label === "Complete" ? "100" : student.status.label === "In Progress" ? "75" : "50"}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-800">
                        {student.status.label === "Complete" ? "100" : student.status.label === "In Progress" ? "75" : "50"}% Complete
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information Grid - Matching Profile.tsx style */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Phone */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <PhoneIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">PHONE</div>
                      <div className="text-sm font-medium text-slate-800">{student.phone}</div>
                    </div>
                  </div>
                  
                  {/* Birthdate */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">BIRTHDATE</div>
                      <div className="text-sm font-medium text-slate-800">{student.birthdate}</div>
                    </div>
                  </div>
                  
                  {/* LinkedIn */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <LinkedinIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">LINKEDIN</div>
                      <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:underline">
                        View Profile
                      </a>
                    </div>
                  </div>
                  
                  {/* Portfolio */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <GlobeIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">PORTFOLIO</div>
                      <a href={student.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:underline">
                        Visit Site
                      </a>
                    </div>
                  </div>
                  
                  {/* University */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">UNIVERSITY</div>
                      <div className="text-sm font-medium text-slate-800">{student.education[0].institution}</div>
                    </div>
                  </div>
                  
                  {/* Graduation */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <GraduationCapIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">GRADUATION</div>
                      <div className="text-sm font-medium text-slate-800">{student.education[0].period.split('-')[1]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs - Matching Profile.tsx style */}
        <div className="flex gap-1 mb-8 bg-white p-1 rounded-lg shadow-sm border-0 ring-1 ring-slate-200/60 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6 w-full">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-0 ring-1 ring-blue-200/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-800">{student.education.length}</div>
                      <div className="text-sm text-blue-600">Education</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-0 ring-1 ring-green-200/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <BriefcaseIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-800">{student.workExperience.length}</div>
                      <div className="text-sm text-green-600">Experience</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-0 ring-1 ring-purple-200/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <FolderIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-800">{student.projects.length}</div>
                      <div className="text-sm text-purple-600">Projects</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-0 ring-1 ring-orange-200/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                      <AwardIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-800">{student.extraCourses.length}</div>
                      <div className="text-sm text-orange-600">Courses</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Skills & Applications */}
              <Card className="lg:col-span-2 border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5" />
                    Profile Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-800">Profile Completion</span>
                      <span className="text-sm text-slate-600">
                        {student.status.label === "Complete" ? "100" : student.status.label === "In Progress" ? "75" : "50"}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                        style={{ width: `${student.status.label === "Complete" ? "100" : student.status.label === "In Progress" ? "75" : "50"}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-800">CVs Generated</span>
                      <span className="text-sm text-slate-600">{student.cvsGenerated}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${(student.cvsGenerated / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-800">Applications</span>
                      <span className="text-sm text-slate-600">{student.applications}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${(student.applications / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Status */}
              <Card className="border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle>Activity Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-800">Last Active</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {student.lastActive}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-800">Profile Status</span>
                    <Badge 
                      className={`px-3 py-1 rounded-2xl font-semibold text-xs border ${
                        student.status.color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        student.status.color === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {student.status.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-800">Program</span>
                    <span className="text-sm text-slate-600">{student.program}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-6">
              {/* Education Overview */}
              {!selectedModule && student.education.map((education, index) => (
                <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{education.institution}</h3>
                          <p className="text-blue-600 font-medium mb-2">{education.degree}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{education.period}</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {index === 0 ? "Current" : "Completed"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Modules Section */}
                    {index === 0 && (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-slate-800">Modules</h4>
                          <Select 
                            value={selectedYear}
                            onValueChange={handleYearChange}
                          >
                            <SelectTrigger className="h-8 px-3 py-0 bg-slate-50 rounded-md border border-solid border-slate-300 w-auto">
                              <SelectValue placeholder="Year 1">Year 1</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="year1">Year 1</SelectItem>
                              <SelectItem value="year2">Year 2</SelectItem>
                              <SelectItem value="year3">Year 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {modules.map((module, idx) => (
                            <Badge
                              key={idx}
                              className="h-8 px-3 py-0 rounded-2xl border border-solid cursor-pointer bg-white border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                              onClick={() => handleModuleClick(module)}
                            >
                              {module}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Selected Module Details */}
              {selectedModule && moduleDetails[selectedModule] && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSelectedModule(null)}
                      className="w-10 h-10 rounded-xl bg-white/80 shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
                    >
                      <ArrowLeftIcon className="w-4 h-4 text-slate-600" />
                    </Button>
                    <h3 className="text-xl font-bold text-slate-800">{selectedModule}</h3>
                  </div>

                  <Card className="p-6 border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-slate-900 text-lg mb-3">Module Overview</h3>
                    <p className="text-slate-700 leading-relaxed">{moduleDetails[selectedModule].description}</p>
                  </Card>

                  <Card className="p-6 border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
                    <h4 className="font-medium text-slate-800 text-base mb-4">Key Learning Outcomes</h4>
                    <div className="space-y-4">
                      {moduleDetails[selectedModule].keyLearning.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                            {idx + 1}
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {student.projects.map((project, index) => (
                <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FolderIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{project.name}</h3>
                          <p className="text-purple-600 font-medium mb-2">{project.organization}</p>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Project
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              {student.workExperience.map((work, index) => (
                <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <BriefcaseIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{work.position}</h3>
                          <p className="text-green-600 font-medium mb-2">{work.company}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{work.status}</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {work.status.includes("Interview") ? "Interview" : "Application"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Extra Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              {student.extraCourses.map((course, index) => (
                <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <AwardIcon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{course.course}</h3>
                          <p className="text-amber-600 font-medium mb-2">{course.provider}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{course.date}</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Course
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};