import React, { useState, useRef, useEffect } from "react";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  CalendarIcon,
  BuildingIcon,
  ExternalLinkIcon,
  EditIcon,
  TrashIcon,
  EyeIcon
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { NavigationSection } from "../Dashboard/sections/NavigationSection";

// Initial job applications data
const initialJobData = [
  {
    id: "applied",
    title: "Applied",
    count: 8,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    jobs: [
      {
        id: "1",
        title: "Frontend Developer",
        company: "Google",
        location: "Paris, France",
        salary: "€65,000 - €80,000",
        appliedDate: "2 days ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/google.com",
        description: "Join our team to build the next generation of web applications...",
        requirements: ["React", "TypeScript", "Node.js"],
        status: "Under Review"
      },
      {
        id: "2",
        title: "UX Designer",
        company: "Airbnb",
        location: "Remote",
        salary: "€55,000 - €70,000",
        appliedDate: "5 days ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/airbnb.com",
        description: "Design beautiful and intuitive user experiences...",
        requirements: ["Figma", "User Research", "Prototyping"],
        status: "Application Sent"
      },
      {
        id: "3",
        title: "Product Manager",
        company: "Spotify",
        location: "Stockholm, Sweden",
        salary: "€70,000 - €90,000",
        appliedDate: "1 week ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/spotify.com",
        description: "Lead product strategy and development...",
        requirements: ["Product Strategy", "Analytics", "Leadership"],
        status: "Application Sent"
      }
    ]
  },
  {
    id: "interview",
    title: "Interview",
    count: 4,
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    jobs: [
      {
        id: "4",
        title: "Full Stack Developer",
        company: "Microsoft",
        location: "Paris, France",
        salary: "€75,000 - €95,000",
        appliedDate: "2 weeks ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/microsoft.com",
        description: "Build scalable web applications using modern technologies...",
        requirements: ["React", "C#", ".NET", "Azure"],
        status: "Technical Interview",
        interviewDate: "Tomorrow at 2:00 PM"
      },
      {
        id: "5",
        title: "Data Scientist",
        company: "Netflix",
        location: "Amsterdam, Netherlands",
        salary: "€80,000 - €100,000",
        appliedDate: "3 weeks ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/netflix.com",
        description: "Analyze data to drive business decisions...",
        requirements: ["Python", "Machine Learning", "SQL"],
        status: "Final Interview",
        interviewDate: "Friday at 10:00 AM"
      }
    ]
  },
  {
    id: "offer",
    title: "Offer",
    count: 2,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    jobs: [
      {
        id: "6",
        title: "Software Engineer",
        company: "Apple",
        location: "London, UK",
        salary: "€85,000 - €110,000",
        appliedDate: "1 month ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/apple.com",
        description: "Develop innovative software solutions...",
        requirements: ["Swift", "iOS", "Objective-C"],
        status: "Offer Received",
        offerDeadline: "Respond by Dec 15, 2024"
      }
    ]
  },
  {
    id: "rejected",
    title: "Rejected",
    count: 3,
    color: "bg-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    jobs: [
      {
        id: "7",
        title: "Backend Developer",
        company: "Amazon",
        location: "Berlin, Germany",
        salary: "€70,000 - €85,000",
        appliedDate: "1 month ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/amazon.com",
        description: "Build robust backend systems...",
        requirements: ["Java", "AWS", "Microservices"],
        status: "Position Filled",
        rejectionReason: "Position filled with another candidate"
      }
    ]
  }
];

export const JobTracker = (): JSX.Element => {
  const [jobData, setJobData] = useState(initialJobData);
  const [draggedJob, setDraggedJob] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag start
  const handleDragStart = (e, job, columnId) => {
    setDraggedJob({ job, fromColumn: columnId });
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    
    // Ensure the dragged element has high z-index
    e.target.style.zIndex = "9999";
    e.target.style.opacity = "1";
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    setDraggedJob(null);
    setDragOverColumn(null);
    setIsDragging(false);
    
    // Reset z-index and opacity
    e.target.style.zIndex = "";
    e.target.style.opacity = "";
  };

  // Handle drag over
  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnId);
  };

  // Handle drop
  const handleDrop = (e, toColumnId) => {
    e.preventDefault();
    
    if (!draggedJob || draggedJob.fromColumn === toColumnId) {
      setDragOverColumn(null);
      setDraggedJob(null);
      return;
    }

    const newJobData = [...jobData];
    
    // Find source and target columns
    const fromColumnIndex = newJobData.findIndex(col => col.id === draggedJob.fromColumn);
    const toColumnIndex = newJobData.findIndex(col => col.id === toColumnId);
    
    // Remove job from source column
    const jobIndex = newJobData[fromColumnIndex].jobs.findIndex(job => job.id === draggedJob.job.id);
    const [movedJob] = newJobData[fromColumnIndex].jobs.splice(jobIndex, 1);
    
    // Add job to target column
    newJobData[toColumnIndex].jobs.push(movedJob);
    
    // Update counts
    newJobData[fromColumnIndex].count = newJobData[fromColumnIndex].jobs.length;
    newJobData[toColumnIndex].count = newJobData[toColumnIndex].jobs.length;
    
    setJobData(newJobData);
    setDragOverColumn(null);
    setDraggedJob(null);
  };

  // Handle add new job
  const handleAddJob = () => {
    console.log("Add new job");
    // In a real app, this would open a modal to add a new job
  };

  // Handle job click
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  // Handle job actions
  const handleJobAction = (action, job, e) => {
    e.stopPropagation();
    console.log(`${action} job:`, job.title);
    
    switch(action) {
      case 'edit':
        // Open edit modal
        break;
      case 'delete':
        // Delete job
        break;
      case 'view':
        handleJobClick(job);
        break;
    }
  };

  // Filter jobs based on search
  const filteredJobData = jobData.map(column => ({
    ...column,
    jobs: column.jobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
      <aside className="h-full w-60">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Job Tracker</h1>
            <p className="text-slate-600">Track your job applications and manage your career journey</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 h-11 bg-white border-slate-200 focus:border-blue-500"
              />
            </div>
            
            {/* Filter */}
            <Button variant="outline" className="h-11 gap-2 border-slate-200">
              <FilterIcon className="w-4 h-4" />
              Filter
            </Button>
            
            {/* Add Job */}
            <Button onClick={handleAddJob} className="h-11 gap-2 bg-blue-600 hover:bg-blue-700">
              <PlusIcon className="w-4 h-4" />
              Add Job
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {jobData.map((column) => (
            <Card key={column.id} className="p-6 border-l-4" style={{ borderLeftColor: column.color.replace('bg-', '') }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">{column.title}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{column.count}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${column.bgColor} flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-400px)]">
          {filteredJobData.map((column) => (
            <div
              key={column.id}
              className={`flex flex-col bg-white rounded-xl border-2 ${
                dragOverColumn === column.id ? 'border-blue-400 bg-blue-50' : 'border-slate-200'
              } transition-all duration-200`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
              onDragLeave={() => setDragOverColumn(null)}
            >
              {/* Column Header */}
              <div className={`p-4 border-b border-slate-200 ${column.bgColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                    <h3 className="font-semibold text-slate-800">{column.title}</h3>
                  </div>
                </div>
              </div>

              {/* Jobs List */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {column.jobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`cursor-move hover:shadow-md transition-all duration-200 border border-slate-200 hover:border-blue-300 ${
                      draggedJob?.job.id === job.id ? 'z-50 opacity-100' : ''
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job, column.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleJobClick(job)}
                    style={{
                      zIndex: draggedJob?.job.id === job.id ? 9999 : 'auto'
                    }}
                  >
                    <CardContent className="p-4">
                      {/* Job Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img 
                              src={job.logo} 
                              alt={job.company}
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=3b82f6&color=fff&size=24`;
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-sm leading-tight">{job.title}</h4>
                            <p className="text-xs text-slate-600">{job.company}</p>
                          </div>
                        </div>
                        
                        <div className="relative group">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontalIcon className="w-4 h-4" />
                          </Button>
                          
                          {/* Dropdown menu would go here */}
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <BuildingIcon className="w-3 h-3" />
                          <span>{job.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <CalendarIcon className="w-3 h-3" />
                          <span>Applied {job.appliedDate}</span>
                        </div>
                        
                        {job.salary && (
                          <div className="text-xs font-medium text-green-600">
                            {job.salary}
                          </div>
                        )}
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            column.id === 'applied' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            column.id === 'interview' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            column.id === 'offer' ? 'bg-green-50 text-green-700 border-green-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {job.status}
                        </Badge>
                        
                        <div className="flex items-center gap-1">
                          {job.requirements.slice(0, 2).map((req, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                              {req}
                            </Badge>
                          ))}
                          {job.requirements.length > 2 && (
                            <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                              +{job.requirements.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Special Info */}
                      {job.interviewDate && (
                        <div className="mt-3 p-2 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-xs text-orange-700 font-medium">
                            📅 {job.interviewDate}
                          </p>
                        </div>
                      )}
                      
                      {job.offerDeadline && (
                        <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-xs text-green-700 font-medium">
                            ⏰ {job.offerDeadline}
                          </p>
                        </div>
                      )}
                      
                      {job.rejectionReason && (
                        <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-xs text-red-700">
                            {job.rejectionReason}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {/* Empty State */}
                {column.jobs.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                      <PlusIcon className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500">No jobs in {column.title.toLowerCase()}</p>
                    <p className="text-xs text-slate-400 mt-1">Drag jobs here or add new ones</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Drag Instructions */}
        {draggedJob && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            <p className="text-sm font-medium">
              💡 Drag to move "{draggedJob.job.title}" to a different status
            </p>
          </div>
        )}
      </div>
    </main>
  );
};