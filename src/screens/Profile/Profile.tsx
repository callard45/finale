import React, { useState, useRef, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { NavigationSection } from "../Dashboard/sections/NavigationSection";
import { EditableBio } from "../../components/EditableBio";
import { ProfileContactCard } from "../../components/ProfileContactCard";
import { ProfileImageUpload } from "../../components/ProfileImageUpload/ProfileImageUpload";
import { ProfileBannerUpload } from "../../components/ProfileBannerUpload/ProfileBannerUpload";
import { 
  EditIcon, 
  DownloadIcon, 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon, 
  CalendarIcon,
  LinkedinIcon,
  GlobeIcon,
  PlusIcon,
  BookOpenIcon,
  BriefcaseIcon,
  AwardIcon,
  FolderIcon,
  StarIcon,
  TrendingUpIcon,
  ChevronRightIcon,
  UserIcon,
  GraduationCapIcon,
} from "lucide-react";

// Profile data
const profileData = {
  name: "Alex Smith",
  id: "10105518",
  email: "alex.smith@essec.edu",
  phone: "07551 541758",
  birthdate: "05/06/2005",
  location: "Paris, France",
  linkedin: "https://www.linkedin.com/in/alexsmith2005",
  portfolio: "https://Alex.portfolio.com",
  bio: "Passionate business student with a focus on international markets and digital transformation. Currently pursuing a Bachelor's degree at ESSEC Business School with hands-on experience in strategic analysis and project management.",
  profileCompletion: 85,
  initials: "AS"
};

// Skills data
const skills = [
  { name: "Strategic Analysis", level: 90 },
  { name: "Project Management", level: 85 },
  { name: "International Business", level: 88 },
  { name: "Digital Marketing", level: 75 },
  { name: "Data Analysis", level: 70 },
  { name: "Public Speaking", level: 80 }
];

// Languages data
const languages = [
  { name: "French", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Intermediate" },
  { name: "German", level: "Basic" }
];

// Education data
const educationData = [
  {
    institution: "ESSEC Business School",
    degree: "Bachelor in Management",
    period: "Sep 2023 - Jun 2026",
    location: "Paris, France",
    gpa: "3.8/4.0",
    status: "Current",
    modules: ["International Business", "Markets and consumption", "Interpreting Management", "Foundation in digital enterprise"]
  },
  {
    institution: "Saint Nicolas Paris",
    degree: "Baccalauréat Général",
    period: "Sep 2020 - Jun 2023",
    location: "Paris, France",
    gpa: "17.2/20",
    status: "Completed",
    modules: []
  }
];

// Projects data
const projectsData = [
  {
    name: "International Market Entry Strategy",
    organization: "ESSEC Business School",
    period: "Jan 2024 - May 2024",
    description: "Led a team of 5 students to develop a comprehensive market entry strategy for a French company expanding to Asian markets.",
    skills: ["Strategic Planning", "Market Research", "Team Leadership"],
    status: "Completed"
  },
  {
    name: "Chess Tournament Organization",
    organization: "Personal Project",
    period: "2015 - Present",
    description: "Organized and managed local chess tournaments, developing leadership and event management skills.",
    skills: ["Event Management", "Leadership", "Organization"],
    status: "Ongoing"
  }
];

// Work experience data
const workExperienceData = [
  {
    position: "Business Analyst Intern",
    company: "Deloitte",
    period: "Jun 2024 - Aug 2024",
    location: "Paris, France",
    description: "Conducted market research and competitive analysis for client projects in the retail sector.",
    achievements: ["Improved data analysis efficiency by 25%", "Presented findings to senior management"],
    status: "Completed"
  },
  {
    position: "Marketing Assistant",
    company: "Local Startup",
    period: "Sep 2023 - Dec 2023",
    location: "Paris, France",
    description: "Assisted in digital marketing campaigns and social media management.",
    achievements: ["Increased social media engagement by 40%", "Created content for 3 major campaigns"],
    status: "Completed"
  }
];

// Certifications data
const certificationsData = [
  {
    name: "Google Analytics Certified",
    provider: "Google",
    date: "March 2024",
    credentialId: "GA-123456789"
  },
  {
    name: "Project Management Fundamentals",
    provider: "LinkedIn Learning",
    date: "January 2024",
    credentialId: "LL-987654321"
  }
];

// Navigation tabs data
const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: <UserIcon className="w-4 h-4" />
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCapIcon className="w-4 h-4" />
  },
  {
    id: "experience",
    label: "Experience",
    icon: <BriefcaseIcon className="w-4 h-4" />
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderIcon className="w-4 h-4" />
  },
  {
    id: "skills",
    label: "Skills",
    icon: <TrendingUpIcon className="w-4 h-4" />
  }
];

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
  "Saint Nicolas Paris": {
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
  }
};

export const Profile = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<any | null>(null);
  const [bioContent, setBioContent] = useState(profileData.bio);
  const [contactInfo, setContactInfo] = useState({
    email: profileData.email,
    phone: profileData.phone,
    location: profileData.location,
    linkedin: profileData.linkedin,
    portfolio: profileData.portfolio,
    university: "ESSEC Business School",
    graduation: "Class of 2026"
  });
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    console.log("Toggle edit mode");
  };

  const handleExport = () => {
    console.log("Exporting profile");
  };

  const handleSaveBio = async (newBio: string) => {
    console.log("Saving bio:", newBio);
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setBioContent(newBio);
    return Promise.resolve();
  };

  const handleSaveContactField = async (field: keyof typeof contactInfo, value: string) => {
    console.log(`Saving ${field}:`, value);
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleClick = (module: string, education: any) => {
    console.log(`Selected module: ${module}`);
    setSelectedModule(module);
    setSelectedEducation(education);
  };

  const handleExperienceClick = (experience: any) => {
    console.log(`Selected experience: ${experience.position}`);
    setSelectedExperience(experience);
  };

  const handleBackToProfile = () => {
    setSelectedModule(null);
    setSelectedExperience(null);
    setSelectedEducation(null);
  };
  
  // Handle profile image upload
  const handleProfileImageUpload = async (file: File): Promise<string> => {
    console.log("Uploading profile image:", file.name);
    
    // In a real app, this would upload to a server
    // For demo purposes, we'll just create an object URL
    return new Promise((resolve) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        resolve(imageUrl);
      }, 1500);
    });
  };
  
  // Handle banner image upload
  const handleBannerImageUpload = async (file: File): Promise<string> => {
    console.log("Uploading banner image:", file.name);
    
    // In a real app, this would upload to a server
    // For demo purposes, we'll just create an object URL
    return new Promise((resolve) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setBannerImage(imageUrl);
        resolve(imageUrl);
      }, 1500);
    });
  };

  // If a module is selected, show the module detail view
  if (selectedModule && selectedEducation) {
    const moduleDetails = schoolModules[selectedEducation.institution]?.[selectedModule];
    
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <aside className="h-screen w-60 fixed">
          <NavigationSection />
        </aside>
        
        <div className="flex-1 ml-60 p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedModule}</h1>
              <p className="text-slate-600">{selectedEducation.institution} • {selectedEducation.degree}</p>
            </div>
          </div>

          {moduleDetails ? (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 text-lg mb-3">Module Overview</h3>
                <p className="text-slate-700 leading-relaxed">{moduleDetails.description}</p>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium text-slate-800 text-base mb-4">Key Learning Outcomes & Experiences</h4>
                <div className="space-y-4">
                  {moduleDetails.keyLearning.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-slate-600">No detailed information available for this module.</p>
            </Card>
          )}
        </div>
      </main>
    );
  }

  // If an experience is selected, show the experience detail view
  if (selectedExperience) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <aside className="h-screen w-60 fixed">
          <NavigationSection />
        </aside>
        
        <div className="flex-1 ml-60 p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedExperience.position}</h1>
              <p className="text-slate-600">{selectedExperience.company} • {selectedExperience.location}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Experience Overview */}
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <BriefcaseIcon className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{selectedExperience.position}</h3>
                  <p className="text-slate-600 mb-2">{selectedExperience.company}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span>{selectedExperience.period}</span>
                    <span>•</span>
                    <span>{selectedExperience.location}</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {selectedExperience.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Role Description</h4>
                  <p className="text-slate-700 leading-relaxed">{selectedExperience.description}</p>
                </div>
              </div>
            </Card>

            {/* Key Achievements */}
            <Card className="p-6">
              <h4 className="font-medium text-slate-800 text-base mb-4">Key Achievements & Impact</h4>
              <div className="space-y-3">
                {selectedExperience.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200/60">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-medium text-sm">
                      ✓
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills Developed */}
            <Card className="p-6">
              <h4 className="font-medium text-slate-800 text-base mb-4">Skills Developed</h4>
              <div className="flex flex-wrap gap-2">
                {["Leadership", "Project Management", "Data Analysis", "Client Relations", "Strategic Thinking", "Problem Solving"].map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <aside className="h-screen w-60 fixed">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 ml-60 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">My Profile</h1>
            <p className="text-slate-600">Manage your personal information and career details</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleExport}
            >
              <DownloadIcon className="w-4 h-4" />
              Export Profile
            </Button>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 relative">
            <ProfileBannerUpload
              currentImage={bannerImage}
              onImageUpload={handleBannerImageUpload}
            />
            
            {/* Edit overlay for the entire header */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-center"
              onClick={handleEdit}
            >
              <div className="bg-white/90 rounded-full p-3 shadow-lg transform translate-y-8">
                <EditIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <CardContent className="relative pt-0 pb-6">
            <div className="flex items-start gap-6 -mt-12">
              <ProfileImageUpload
                name={profileData.name}
                initials={profileData.initials}
                currentImage={profileImage}
                onImageUpload={handleProfileImageUpload}
              />
              
              <div className="flex-1 mt-16">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 group cursor-pointer" onClick={handleEdit}>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors duration-200 flex items-center gap-2">
                      {profileData.name}
                      <EditIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-lg text-blue-600 font-medium">Full Stack Developer</span>
                    </div>
                    
                    <EditableBio 
                      content={bioContent}
                      onSave={handleSaveBio}
                      isEditing={isEditing}
                      className="text-slate-700 max-w-3xl leading-relaxed text-base mb-6"
                    />
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-slate-600 mb-1">Profile Completion</div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${profileData.profileCompletion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-800">{profileData.profileCompletion}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information Grid */}
                <ProfileContactCard 
                  contactInfo={contactInfo}
                  isEditing={isEditing}
                  onFieldSave={handleSaveContactField}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-white p-1 rounded-lg shadow-sm border">
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
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-800">{educationData.length}</div>
                      <div className="text-sm text-blue-600">Education</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <BriefcaseIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-800">{workExperienceData.length}</div>
                      <div className="text-sm text-green-600">Experience</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <FolderIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-800">{projectsData.length}</div>
                      <div className="text-sm text-purple-600">Projects</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                      <AwardIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-800">{certificationsData.length}</div>
                      <div className="text-sm text-orange-600">Certificates</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Skills */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5" />
                    Skills & Competencies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800">{skill.name}</span>
                        <span className="text-sm text-slate-600">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {languages.map((language, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{language.name}</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {language.level}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-6">
              {educationData.map((education, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{education.degree}</h3>
                          <p className="text-blue-600 font-medium mb-2">{education.institution}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{education.period}</span>
                            <span>•</span>
                            <span>{education.location}</span>
                            <span>•</span>
                            <span>GPA: {education.gpa}</span>
                          </div>
                          <Badge variant="outline" className={education.status === "Current" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}>
                            {education.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {education.modules.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-slate-800 mb-3">Key Modules</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {education.modules.map((module, idx) => (
                            <div
                              key={idx} 
                              className="group relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                              onClick={() => handleModuleClick(module, education)}
                            >
                              {/* Animated Border Glow */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-0 transition-opacity duration-300 blur-sm"></div>
                              
                              <div className="relative p-6">
                                <div className="flex items-center justify-between">
                                  {/* Module Icon */}
                                  <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                                      <BookOpenIcon className="w-6 h-6 text-white" />
                                    </div>
                                    
                                    {/* Module Title */}
                                    <h5 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                                      {module}
                                    </h5>
                                  </div>
                                  
                                  {/* Action Button */}
                                  <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:shadow-md transition-all duration-300">
                                    <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6">
              {workExperienceData.map((experience, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleExperienceClick(experience)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <BriefcaseIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{experience.position}</h3>
                          <p className="text-green-600 font-medium mb-2">{experience.company}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{experience.period}</span>
                            <span>•</span>
                            <span>{experience.location}</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {experience.status}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    
                    <p className="text-slate-700 mb-4">{experience.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Key Achievements</h4>
                      <ul className="space-y-1">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              {projectsData.map((project, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FolderIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{project.name}</h3>
                          <p className="text-purple-600 font-medium mb-2">{project.organization}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{project.period}</span>
                          </div>
                          <Badge variant="outline" className={project.status === "Ongoing" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-green-50 text-green-700 border-green-200"}>
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-700 mb-4">{project.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Skills Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800">{skill.name}</span>
                        <span className="text-sm text-slate-600">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AwardIcon className="w-5 h-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certificationsData.map((cert, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <h4 className="font-medium text-slate-800">{cert.name}</h4>
                      <p className="text-sm text-slate-600">{cert.provider}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">{cert.date}</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};