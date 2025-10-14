import React, { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { 
  ArrowLeftIcon,
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
  TrendingUpIcon
} from "lucide-react";
import { NetworkProfile } from "../../data/networkProfiles";

interface ProfileDetailViewProps {
  profile: NetworkProfile;
  onBack: () => void;
}

export const ProfileDetailView = ({ profile, onBack }: ProfileDetailViewProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(prev => !prev);
    console.log("Toggle edit mode");
  };

  const handleExport = () => {
    console.log("Exporting profile");
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving profile changes");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <StarIcon className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <BookOpenIcon className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <BriefcaseIcon className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderIcon className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <AwardIcon className="w-4 h-4" /> }
  ];

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-x-hidden">
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Profile Details</h1>
              <p className="text-slate-600">View {profile.name.split(' ')[0]}'s professional information and career details</p>
            </div>
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
            <Button
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={isEditing ? handleSave : handleEdit}
            >
              <EditIcon className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-3xl shadow-sm">
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
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 flex-shrink-0">
                <AvatarImage 
                  src={profile.profilePhoto} 
                  alt={profile.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl font-bold text-white">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 mt-16">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{profile.name}</h2>
                    <div className="flex items-center gap-2 mb-3">
                      <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-lg text-blue-600 font-medium">{profile.role}</span>
                    </div>
                    <p className="text-slate-700 max-w-3xl leading-relaxed text-base mb-4">{profile.bio}</p>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `95%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-800">95% Complete</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Email */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <MailIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">EMAIL</div>
                      <div className="text-sm font-medium text-slate-800">{profile.email}</div>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <PhoneIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">PHONE</div>
                      <div className="text-sm font-medium text-slate-800">{profile.phone || "Not provided"}</div>
                    </div>
                  </div>
                  
                  {/* LinkedIn */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <LinkedinIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">LINKEDIN</div>
                      <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">View Profile</div>
                    </div>
                  </div>
                  
                  {/* Portfolio */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <GlobeIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">PORTFOLIO</div>
                      <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">Visit Site</div>
                    </div>
                  </div>
                  
                  {/* University */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">UNIVERSITY</div>
                      <div className="text-sm font-medium text-slate-800">{profile.university}</div>
                    </div>
                  </div>
                  
                  {/* Graduation */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">GRADUATION</div>
                      <div className="text-sm font-medium text-slate-800">Class of {profile.graduationYear}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-white p-1 rounded-lg shadow-sm border-0 ring-1 ring-slate-200/60">
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
              {/* Quick Stats - Matching Profile.tsx style */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-0 ring-1 ring-blue-200/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-800">{profile.education.length}</div>
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
                      <div className="text-2xl font-bold text-green-800">{profile.workExperience.length}</div>
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
                      <div className="text-2xl font-bold text-purple-800">{profile.projects.length}</div>
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
                      <div className="text-2xl font-bold text-orange-800">{profile.certifications.length}</div>
                      <div className="text-sm text-orange-600">Certificates</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Skills */}
              <Card className="lg:col-span-2 border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5" />
                    Skills & Competencies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800">{skill}</span>
                        <span className="text-sm text-slate-600">{Math.floor(Math.random() * 20) + 80}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className="border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {profile.languages.map((language, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{language}</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {language.includes("Native") ? "Native" : language.includes("Fluent") ? "Fluent" : "Intermediate"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-6">
              {profile.education.map((education, index) => (
                <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{education.institution}</h3>
                          <p className="text-slate-600 mb-2">{education.degree}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>{education.period}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Completed
                      </Badge>
                    </div>
                    
                    {education.modules && education.modules.length > 0 && (
                      <div>
                        <h4 className="font-medium text-slate-800 mb-3">Key Modules</h4>
                        <div className="flex flex-wrap gap-2">
                          {education.modules.map((module, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {module}
                            </Badge>
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
              {profile.workExperience.map((work, index) => (
                <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <BriefcaseIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{work.position}</h3>
                          <p className="text-slate-600 mb-2">{work.company}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{work.period}</span>
                          </div>
                          <p className="text-slate-700 mb-3">{work.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-slate-50 text-slate-700">
                        Completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              {profile.projects.map((project, index) => (
                <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FolderIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{project.name}</h3>
                          <p className="text-slate-600 mb-2">{project.organization}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{project.period}</span>
                          </div>
                          <p className="text-slate-700 mb-3">{project.description}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technical Skills - Matching Profile.tsx style */}
              <Card className="border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800">{skill}</span>
                        <span className="text-sm text-slate-600">{Math.floor(Math.random() * 20) + 80}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AwardIcon className="w-5 h-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.certifications.map((cert, index) => (
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