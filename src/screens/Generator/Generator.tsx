import React, { useState, useEffect, useRef } from "react";
import { NavigationSection } from "../Dashboard/sections/NavigationSection";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ArrowLeftIcon, ArrowRightIcon, FileIcon, FileTextIcon, SendIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { DocumentView } from "./DocumentView";
import { Card, CardContent } from "../../components/ui/card";

// Create arrays for dropdown options
const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 21 }, (_, i) => 2010 + i);

const experienceTypes = [
  "Full-time", "Part-time", "Internship", "Freelance", 
  "Contract", "Volunteer", "Student Project"
];

// Sample initial messages for the motivation interview
const initialMessages = [
  {
    sender: "ai",
    content: "Justify your motivation for this role and this enterprise"
  }
];

// Sample responses for the motivation interview
const aiResponses = [
  "That is interesting, now please justify your motivation for the role",
  "Great! Now tell me about a time you demonstrated leadership in a challenging situation.",
  "Thank you for sharing that. What specific skills do you have that make you a good fit for this role?",
  "Interesting. How do you stay updated with industry trends relevant to this position?",
  "That's impressive. How would you handle disagreements with team members?",
  "You can continue justifying your motivation or click here to continue"
];

export const Generator = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize state from localStorage to maintain state between page refreshes
  const [jobInfoSubmitted, setJobInfoSubmitted] = useState<boolean>(false);
  
  const [interviewCompleted, setInterviewCompleted] = useState<boolean>(false);

  // Step management
  const [currentStep, setCurrentStep] = useState<string>(() => {
    return "job-form";
  });

  // Form data for job information
  const [formData, setFormData] = useState({
    company: localStorage.getItem("jobCompany") || "",
    location: localStorage.getItem("jobLocation") || "",
    position: localStorage.getItem("jobPosition") || "",
    experienceType: localStorage.getItem("jobExperienceType") || "",
    startMonth: localStorage.getItem("jobStartMonth") || "",
    startYear: localStorage.getItem("jobStartYear") || "",
    description: localStorage.getItem("jobDescription") || ""
  });

  const [activeTab, setActiveTab] = useState<string>(jobInfoSubmitted && interviewCompleted ? "cv-generator" : "job-form");
  
  const [generatedFiles, setGeneratedFiles] = useState({
    cv: { 
      name: `CV${formData.company ? "Alex" + formData.company : ""}.docx`, 
      generated: false 
    },
    coverLetter: { 
      name: `CoverLetter${formData.company ? "Alex" + formData.company : ""}.docx`, 
      generated: false 
    }
  });

  // AI Interview state
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if coming from interview with completion flag
  useEffect(() => {
    const interviewCompleted = location.state?.interviewCompleted;
    if (interviewCompleted) {
      // Save interview completion to localStorage
      localStorage.setItem("interviewCompleted", "true");
      setInterviewCompleted(true);
      setCurrentStep("document-generation");
    }
  }, [location.state]);
  
  // Auto-scroll to bottom when messages update in AI interview
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Job form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job information submitted:", formData);
    setJobInfoSubmitted(true);
    setCurrentStep("ai-interview");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Your changes will not be saved.")) {
      navigate("/dashboard");
    }
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to start over? This will clear all your job information and interview progress.")) {
      // Reset state
      setJobInfoSubmitted(false);
      setInterviewCompleted(false);
      setFormData({
        company: "",
        location: "",
        position: "",
        experienceType: "",
        startMonth: "",
        startYear: "",
        description: ""
      });
      setGeneratedFiles({
        cv: { name: "CV.docx", generated: false },
        coverLetter: { name: "CoverLetter.docx", generated: false }
      });
      
      // Reset messages for AI interview
      setMessages(initialMessages);
      setInputText("");
      setIsTyping(false);
      setIsComplete(false);
      
      // Switch to job form step
      setCurrentStep("job-form");
      setActiveTab("job-form");
    }
  };

  // AI Interview handlers
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      sender: "user",
      content: inputText
    }]);
    setInputText("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Get the next response based on conversation progress
      const responseIndex = Math.min(messages.filter(m => m.sender === "user").length, aiResponses.length - 1);
      const response = aiResponses[responseIndex];
      
      setMessages(prev => [...prev, {
        sender: "ai",
        content: response
      }]);
      
      // Check if this is the last response to show the continue button
      if (responseIndex === aiResponses.length - 1) {
        setIsComplete(true);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear this chat and start over?")) {
      setMessages(initialMessages);
      setIsComplete(false);
    }
  };
  
  const handleSaveTranscript = () => {
    // Create a text version of the chat
    const transcript = messages
      .map(msg => `${msg.sender === 'ai' ? 'AI' : 'You'}: ${msg.content}`)
      .join('\n\n');
    
    // Create a blob and download link
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'motivation-interview-transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleCompleteInterview = () => {
    setInterviewCompleted(true);
    setCurrentStep("document-generation");
  };

  // Document generation handlers
  const handleGenerate = (type: string) => {
    if (!jobInfoSubmitted || !interviewCompleted) {
      alert("Please complete the job information form and motivation interview first.");
      return;
    }
    
    console.log(`Generating ${type}`);
    
    // In a real app, this would call an API to generate the document
    // For now, we'll just simulate a successful generation
    if (type === "cv") {
      setGeneratedFiles(prev => ({
        ...prev,
        cv: { 
          name: `CVAlex${formData.company || "Google"}.docx`, 
          generated: true 
        }
      }));
    } else {
      setGeneratedFiles(prev => ({
        ...prev,
        coverLetter: { 
          name: `CoverLetterAlex${formData.company || "Google"}.docx`, 
          generated: true 
        }
      }));
    }
  };

  const handleDownload = (type: string) => {
    console.log(`Downloading ${type} file`);
    
    // Create a dummy file and trigger download
    const content = type === "cv" 
      ? "This is a CV placeholder content" 
      : "This is a Cover Letter placeholder content";
    
    const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = type === "cv" ? generatedFiles.cv.name : generatedFiles.coverLetter.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render the job information form
  const renderJobForm = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 ring-1 ring-slate-200/60 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-50 to-white p-8 border-b border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <FileTextIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Job Information</h2>
                  <p className="text-slate-600 font-medium">Tell us about the position you're applying for</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Company & Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="company" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Company
                  </label>
                  <Input 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g., Google, Microsoft, Apple"
                    className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="location" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Location
                  </label>
                  <Input 
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, CA"
                    className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Position & Experience Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="position" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Position Title
                  </label>
                  <Input 
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer, Product Manager"
                    className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="experienceType" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Experience Type
                  </label>
                  <Select 
                    value={formData.experienceType}
                    onValueChange={(value) => handleSelectChange("experienceType", value)}
                    required
                  >
                    <SelectTrigger className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200">
                      <SelectValue placeholder="Select experience type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl shadow-lg">
                      {experienceTypes.map((type) => (
                        <SelectItem 
                          key={type} 
                          value={type}
                          className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 text-slate-700"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="startMonth" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Start Month
                  </label>
                  <Select 
                    value={formData.startMonth}
                    onValueChange={(value) => handleSelectChange("startMonth", value)}
                    required
                  >
                    <SelectTrigger className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl shadow-lg">
                      {months.map((month) => (
                        <SelectItem 
                          key={month} 
                          value={month}
                          className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 text-slate-700"
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label htmlFor="startYear" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Start Year
                  </label>
                  <Select 
                    value={formData.startYear}
                    onValueChange={(value) => handleSelectChange("startYear", value)}
                    required
                  >
                    <SelectTrigger className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl shadow-lg">
                      {years.map((year) => (
                        <SelectItem 
                          key={year} 
                          value={year.toString()}
                          className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 text-slate-700"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <label htmlFor="description" className="block text-slate-700 font-semibold text-sm tracking-tight">
                  Job Description
                </label>
                <textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Paste the complete job description here. Include responsibilities, requirements, and any specific skills mentioned..."
                  className="w-full h-40 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl p-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full sm:w-40 h-12 rounded-2xl border-0 ring-1 ring-slate-200/60 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all duration-200"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="w-full sm:w-40 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Continue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* AI Assistant Tip */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100/50 border-0 ring-1 ring-blue-200/60 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <img 
                    src="/logo.png" 
                    alt="AI" 
                    className="w-6 h-6"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/24x24/white/blue?text=AI";
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-blue-800 font-semibold tracking-tight">AI Assistant Tip</p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Adding detailed job descriptions helps me generate more tailored content for your application. Include key responsibilities, required skills, and company culture details for the best results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Render the AI Interview
  const renderAIInterview = () => {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto flex-1 p-8 bg-slate-50">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Motivation Interview</h1>
          <p className="text-slate-500 mt-2">
            Let's discuss your motivation for this position and understand why you're interested in joining this company.
          </p>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 overflow-auto mb-6 p-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex mb-6 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <img 
                        src="/logo.png" 
                        alt="AI" 
                        className="w-6 h-6"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/24x24/blue/white?text=AI";
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {message.sender === 'ai' && isComplete && message.content.includes("click here") ? (
                      <p>
                        You can continue justifying your motivation or{' '}
                        <button 
                          onClick={handleCompleteInterview}
                          className="text-blue-600 underline font-medium"
                        >
                          click here to continue
                        </button>
                      </p>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 ml-4 order-2">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                      AS
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex mb-6 justify-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="AI" 
                      className="w-6 h-6"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/24x24/blue/white?text=AI";
                      }}
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-slate-100 text-slate-800 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef}></div>
        </div>

        {/* Input area - Fixed at bottom */}
        <div className="fixed bottom-0 left-[195px] right-0 p-4">
          <div className="max-w-4xl mx-auto flex">
            <Input
              className="flex-1 h-12 rounded-full bg-slate-100 border-slate-200 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your response..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button 
              className="h-12 w-12 ml-2 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <SendIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Render the document generator UI
  const renderDocumentGenerator = () => {
    // If job info isn't submitted yet, direct user to complete that step first
    if (!jobInfoSubmitted) {
      return (
        <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-xl shadow-sm">
          <FileTextIcon className="h-16 w-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Job Information Required</h2>
          <p className="text-slate-600 mb-6">
            Please provide information about the job you're applying for before generating documents.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setCurrentStep("job-form")}
          >
            Add Job Information
          </Button>
        </div>
      );
    }
    
    // If interview isn't completed yet, prompt user to complete the interview
    if (!interviewCompleted) {
      return (
        <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-xl shadow-sm">
          <FileTextIcon className="h-16 w-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Motivation Interview Required</h2>
          <p className="text-slate-600 mb-6">
            Please complete the motivation interview to help us personalize your CV and cover letter.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setCurrentStep("ai-interview")}
          >
            Start Interview
          </Button>
        </div>
      );
    }
    
    // If both steps are completed, show the document generator tabs
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Generator</h1>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="text-red-500 border-red-200"
              onClick={resetProgress}
            >
              Start Over
            </Button>
          </div>
        </div>
        
        <p className="text-slate-600 mb-8">
          Generate personalized CV and cover letter for your application to {formData.position || "this position"} at {formData.company || "the company"}.
        </p>
        
        <Tabs defaultValue="cv-generator" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="cv-generator" className="flex-1">CV Generator</TabsTrigger>
            <TabsTrigger value="cl-generator" className="flex-1">Cover Letter Generator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cv-generator" className="mt-0">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-6 rounded-xl mr-6">
                    <FileIcon className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">CV Generator</h2>
                    <p className="text-slate-600 mt-1">Generate a personalized CV for {formData.company || "your target company"}</p>
                    
                    <Button 
                      className="bg-blue-600 mt-4 px-8"
                      onClick={() => handleGenerate("cv")}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
                
                {generatedFiles.cv.generated && (
                  <div className="mt-6 p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                    <span className="text-slate-700">{generatedFiles.cv.name}</span>
                    <Button 
                      variant="outline"
                      onClick={() => handleDownload("cv")}
                      className="text-blue-600"
                    >
                      Download
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {generatedFiles.cv.generated && (
              <DocumentView
                type="cv"
                data={{
                  name: "Alex Smith",
                  position: formData.position || "Software Engineer",
                  company: formData.company || "Google"
                }}
                onDownload={() => handleDownload("cv")}
              />
            )}
          </TabsContent>
          
          <TabsContent value="cl-generator" className="mt-0">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-6 rounded-xl mr-6">
                    <FileTextIcon className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Cover Letter Generator</h2>
                    <p className="text-slate-600 mt-1">Generate a personalized cover letter for {formData.company || "your target company"}</p>
                    
                    <Button 
                      className="bg-blue-600 mt-4 px-8"
                      onClick={() => handleGenerate("coverLetter")}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
                
                {generatedFiles.coverLetter.generated && (
                  <div className="mt-6 p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                    <span className="text-slate-700">{generatedFiles.coverLetter.name}</span>
                    <Button 
                      variant="outline"
                      onClick={() => handleDownload("coverLetter")}
                      className="text-blue-600"
                    >
                      Download
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {generatedFiles.coverLetter.generated && (
              <DocumentView
                type="coverLetter"
                data={{
                  name: "Alex Smith",
                  position: formData.position || "Internal Communication Manager",
                  company: formData.company || "Google",
                  date: "07/03/2025"
                }}
                onDownload={() => handleDownload("coverLetter")}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <aside className="h-full w-60">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 p-8">
        {/* Header with back button for job form */}
        {currentStep === "job-form" && (
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              className="rounded-2xl p-3 h-12 w-12 hover:bg-slate-100 transition-all duration-200"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Enter Job Information</h1>
              <p className="text-slate-600 font-medium">Let's start by gathering details about your target position</p>
            </div>
          </div>
        )}
        
        {/* Render the appropriate content based on the current step */}
        {currentStep === "job-form" && renderJobForm()}
        {currentStep === "ai-interview" && renderAIInterview()}
        {currentStep === "document-generation" && renderDocumentGenerator()}
      </div>
    </main>
  );
};