import {
  BellIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  TrendingUpIcon,
  UsersIcon,
  FileTextIcon,
  BarChart3Icon,
  GraduationCapIcon,
  StarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ChevronDownIcon,
  InfoIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { studentProfiles } from "../../../../data/studentProfiles";

interface StudentsActivitySectionProps {
  onStudentSearch: (query: string) => void;
}

// Enhanced stats cards data with better visual hierarchy
const statsCards = [
  {
    title: "Total Students",
    value: "9,978",
    trend: "+12 this month",
    trendIcon: <ArrowUpIcon className="w-4 h-4" />,
    trendColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100/50",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    icon: <UsersIcon className="w-6 h-6 text-white" />,
    valueColor: "text-blue-800",
  },
  {
    title: "Active Users",
    value: "7,587",
    trend: "76% of total",
    trendColor: "text-slate-600",
    bgGradient: "bg-gradient-to-br from-violet-50 to-violet-100/50",
    iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
    icon: <StarIcon className="w-6 h-6 text-white" />,
    valueColor: "text-violet-800",
  },
  {
    title: "CVs Generated",
    value: "14,654",
    trend: "+28% vs last month",
    trendIcon: <ArrowUpIcon className="w-4 h-4" />,
    trendColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    icon: <FileTextIcon className="w-6 h-6 text-white" />,
    valueColor: "text-emerald-800",
  },
];

// Enhanced status colors with better contrast
const statusColors = {
  emerald: "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200/60",
  blue: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200/60",
  amber: "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-amber-200/60",
};

// Chart data for student activity
const chartData = {
  jobApplications: [
    { date: "Apr 1", value: 12 },
    { date: "Apr 5", value: 18 },
    { date: "Apr 10", value: 15 },
    { date: "Apr 15", value: 25 },
    { date: "Apr 20", value: 20 },
    { date: "Apr 25", value: 22 },
    { date: "Apr 30", value: 18 },
  ],
  jobOffers: [
    { date: "Apr 1", value: 5 },
    { date: "Apr 5", value: 7 },
    { date: "Apr 10", value: 4 },
    { date: "Apr 15", value: 9 },
    { date: "Apr 20", value: 11 },
    { date: "Apr 25", value: 10 },
    { date: "Apr 30", value: 8 },
  ]
};

export const StudentsActivitySection = ({ onStudentSearch }: StudentsActivitySectionProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [timeRange, setTimeRange] = useState<string>("30days");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState(studentProfiles);
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{series: string, index: number} | null>(null);
  
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const timeRangeDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (timeRangeDropdownRef.current && !timeRangeDropdownRef.current.contains(event.target as Node)) {
        setShowTimeRangeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
      setFilteredStudents([]);
      setShowDropdown(false);
    } else {
      const filtered = studentProfiles.filter(student => 
        student.id.toLowerCase().includes(query) || 
        student.name.toLowerCase().includes(query) ||
        student.program.toLowerCase().includes(query)
      );
      setFilteredStudents(filtered);
      setShowDropdown(true);
    }
  };

  const handleStudentClick = (studentId: string) => {
    onStudentSearch(studentId);
  };

  const handleNotificationsClick = () => {
    console.log("Opening notifications panel");
  };

  const handleExportClick = () => {
    console.log("Exporting student data");
  };

  const handleFilterClick = () => {
    console.log("Opening filter options");
  };

  const handleTimeRangeChange = (range: string) => {
    console.log("Changing time range to:", range);
    setTimeRange(range);
    setShowTimeRangeDropdown(false);
  };

  const handleViewAllStudents = () => {
    console.log("Viewing all students");
  };

  // Function to calculate chart point positions
  const calculateChartPosition = (value: number, maxValue: number, height: number, topPadding: number) => {
    const maxHeight = height - topPadding * 2;
    return topPadding + maxHeight - (value / maxValue) * maxHeight;
  };

  // Get max value for scaling
  const maxApplicationValue = Math.max(...chartData.jobApplications.map(d => d.value));
  const maxOfferValue = Math.max(...chartData.jobOffers.map(d => d.value));
  const maxValue = Math.max(maxApplicationValue, maxOfferValue);

  // Chart dimensions
  const chartHeight = 280;
  const chartTopPadding = 40;
  const chartWidth = 600;
  const pointRadius = 4;

  // Calculate positions for the chart
  const applicationPoints = chartData.jobApplications.map((point, index) => {
    const x = (index / (chartData.jobApplications.length - 1)) * chartWidth;
    const y = calculateChartPosition(point.value, maxValue, chartHeight, chartTopPadding);
    return { x, y, ...point };
  });

  const offerPoints = chartData.jobOffers.map((point, index) => {
    const x = (index / (chartData.jobOffers.length - 1)) * chartWidth;
    const y = calculateChartPosition(point.value, maxValue, chartHeight, chartTopPadding);
    return { x, y, ...point };
  });

  // Generate SVG path for lines
  const generateLinePath = (points: { x: number, y: number }[]) => {
    return points.map((point, i) => 
      (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`)
    ).join(' ');
  };

  const applicationLinePath = generateLinePath(applicationPoints);
  const offerLinePath = generateLinePath(offerPoints);

  // Time range options
  const timeRangeOptions = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "thisMonth", label: "This Month" },
    { value: "lastMonth", label: "Last Month" },
    { value: "custom", label: "Custom Range" },
  ];

  return (
    <section className="flex flex-col gap-8 p-8 w-full bg-gradient-to-br from-slate-50 to-white min-h-screen">
      {/* Enhanced Header */}
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <BarChart3Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-3xl tracking-tight">Coach Dashboard</h1>
              <p className="text-slate-600 text-base font-medium">Monitor student progress and engagement</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              className="w-80 h-12 pl-12 pr-4 py-0 bg-white/80 backdrop-blur-sm rounded-2xl border-0 ring-1 ring-slate-200/60 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
              placeholder="Search by ID, name, or program..."
              value={searchInput}
              onChange={handleSearchChange}
            />
            {showDropdown && filteredStudents.length > 0 && (
              <div 
                ref={dropdownRef}
                className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-0 ring-1 ring-slate-200/60 max-h-[300px] overflow-y-auto"
              >
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center gap-3 p-4 hover:bg-blue-50/50 cursor-pointer transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                    onClick={() => {
                      handleStudentClick(student.id);
                      setShowDropdown(false);
                      setSearchInput("");
                    }}
                  >
                    <Avatar
                      className={`w-10 h-10 rounded-2xl ${student.avatarGradient} shadow-sm`}
                    >
                      <AvatarFallback className="text-white text-sm font-semibold">
                        {student.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-sm tracking-tight">
                        {student.name}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {student.id} • {student.program}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
      </header>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-3 gap-6 w-full">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className={`rounded-3xl shadow-sm border-0 ring-1 ring-slate-200/60 hover:shadow-md hover:ring-blue-500/20 transition-all duration-300 ${card.bgGradient}`}
          >
            <CardContent className="flex flex-col h-[140px] justify-between p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-600 text-sm tracking-tight uppercase">{card.title}</p>
                  <p className={`font-bold text-3xl tracking-tight ${card.valueColor}`}>
                    {card.value}
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm`}>
                  {card.icon}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {card.trendIcon && (
                  <span className={card.trendColor}>{card.trendIcon}</span>
                )}
                <p className={`font-semibold text-sm tracking-tight ${card.trendColor}`}>
                  {card.trend}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Student Activity Chart */}
      <Card className="h-[400px] rounded-3xl shadow-sm border-0 ring-1 ring-slate-200/60 hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-slate-800 text-xl font-semibold tracking-tight">
                Student Activity Overview
              </CardTitle>
              <div 
                className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors duration-200"
                title="Shows the trend of student job applications and offers over time"
              >
                <InfoIcon className="w-3 h-3 text-slate-500" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative" ref={timeRangeDropdownRef}>
                <Button
                  variant="secondary"
                  className="h-10 px-4 py-0 rounded-2xl bg-white border-0 ring-1 ring-slate-200/60 hover:ring-blue-500/20 transition-all duration-200 flex items-center gap-2"
                  onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                >
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-slate-700 text-sm">
                    {timeRangeOptions.find(option => option.value === timeRange)?.label || "Last 30 Days"}
                  </span>
                  <ChevronDownIcon className="w-4 h-4 text-slate-500" />
                </Button>
                
                {showTimeRangeDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-0 ring-1 ring-slate-200/60 z-10">
                    {timeRangeOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`px-4 py-3 cursor-pointer hover:bg-blue-50/50 transition-colors duration-200 ${
                          option.value === timeRange ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700"
                        } ${option.value === timeRangeOptions[0].value ? "rounded-t-2xl" : ""} ${
                          option.value === timeRangeOptions[timeRangeOptions.length - 1].value ? "rounded-b-2xl" : ""
                        }`}
                        onClick={() => handleTimeRangeChange(option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button
                variant="secondary"
                size="icon"
                className="w-10 h-10 rounded-2xl bg-white border-0 ring-1 ring-slate-200/60 hover:ring-blue-500/20 transition-all duration-200"
                onClick={handleExportClick}
              >
                <DownloadIcon className="w-4 h-4 text-blue-600" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="h-full pb-6">
          <div className="relative flex-1 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 h-[280px] overflow-hidden">
            {/* Chart Grid */}
            <div className="absolute inset-0 p-6">
              {/* Horizontal grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="absolute w-full h-px bg-slate-200/60" 
                  style={{ top: `${chartTopPadding + i * (chartHeight - chartTopPadding * 2) / 4}px` }}
                />
              ))}
              
              {/* Vertical grid lines */}
              {chartData.jobApplications.map((_, index) => (
                <div 
                  key={index} 
                  className="absolute h-full w-px bg-slate-200/60" 
                  style={{ 
                    left: `${(index / (chartData.jobApplications.length - 1)) * chartWidth + 12}px`,
                    display: index === 0 || index === chartData.jobApplications.length - 1 ? 'none' : 'block'
                  }}
                />
              ))}
              
              {/* X-axis labels */}
              {chartData.jobApplications.map((point, index) => (
                <div 
                  key={index} 
                  className="absolute text-xs font-medium text-slate-500"
                  style={{ 
                    left: `${(index / (chartData.jobApplications.length - 1)) * chartWidth + 12}px`,
                    bottom: '0px',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {point.date}
                </div>
              ))}
              
              {/* Y-axis labels */}
              {[0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue].map((value, i) => (
                <div 
                  key={i} 
                  className="absolute text-xs font-medium text-slate-500"
                  style={{ 
                    left: '0px',
                    top: `${chartTopPadding + i * (chartHeight - chartTopPadding * 2) / 4}px`,
                    transform: 'translateY(-50%)'
                  }}
                >
                  {Math.round(maxValue - value)}
                </div>
              ))}
            </div>

            {/* Enhanced Chart Legend */}
            <div className="absolute top-0 left-12 flex items-center gap-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-b-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-sm" />
                <span className="font-semibold text-slate-700 text-sm">Job Applications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-violet-500 to-violet-600 rounded-md shadow-sm" />
                <span className="font-semibold text-slate-700 text-sm">Job Offers</span>
              </div>
            </div>

            {/* SVG Chart */}
            <svg width={chartWidth + 24} height={chartHeight} className="relative z-10">
              {/* Application line */}
              <path
                d={applicationLinePath}
                fill="none"
                stroke="url(#blueGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />
              
              {/* Offer line */}
              <path
                d={offerLinePath}
                fill="none"
                stroke="url(#violetGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />
              
              {/* Application points */}
              {applicationPoints.map((point, index) => (
                <g key={`app-${index}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={pointRadius}
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="drop-shadow-sm cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPoint({ series: 'applications', index })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint && hoveredPoint.series === 'applications' && hoveredPoint.index === index && (
                    <g>
                      <rect
                        x={point.x - 50}
                        y={point.y - 45}
                        width="100"
                        height="35"
                        rx="6"
                        fill="white"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        className="drop-shadow-md"
                      />
                      <text
                        x={point.x}
                        y={point.y - 25}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="500"
                        fill="#1e40af"
                      >
                        {point.date}: {point.value} apps
                      </text>
                    </g>
                  )}
                </g>
              ))}
              
              {/* Offer points */}
              {offerPoints.map((point, index) => (
                <g key={`offer-${index}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={pointRadius}
                    fill="white"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    className="drop-shadow-sm cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPoint({ series: 'offers', index })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint && hoveredPoint.series === 'offers' && hoveredPoint.index === index && (
                    <g>
                      <rect
                        x={point.x - 50}
                        y={point.y - 45}
                        width="100"
                        height="35"
                        rx="6"
                        fill="white"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        className="drop-shadow-md"
                      />
                      <text
                        x={point.x}
                        y={point.y - 25}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="500"
                        fill="#7c3aed"
                      >
                        {point.date}: {point.value} offers
                      </text>
                    </g>
                  )}
                </g>
              ))}
              
              {/* Gradients */}
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="violetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recent Students Table */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-slate-800 text-xl tracking-tight">
              Recent Students
            </h2>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <Button
            variant="link"
            className="font-semibold text-blue-600 text-sm p-0 hover:text-blue-700 transition-colors duration-200"
            onClick={handleViewAllStudents}
          >
            View All →
          </Button>
        </div>

        <Card className="rounded-3xl shadow-sm border-0 ring-1 ring-slate-200/60 hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gradient-to-r from-slate-50 to-slate-100/50">
              <TableRow className="h-14 border-0">
                <TableHead className="w-[200px] font-semibold text-slate-700 text-sm tracking-tight">
                  Student
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-slate-700 text-sm tracking-tight">
                  Program
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-slate-700 text-sm tracking-tight">
                  Profile Status
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-slate-700 text-sm tracking-tight">
                  CVs Generated
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-slate-700 text-sm tracking-tight">
                  Applications
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-slate-700 text-sm tracking-tight">
                  Last Active
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentProfiles.map((student) => (
                <TableRow
                  key={student.id}
                  className="h-16 border-0 cursor-pointer hover:bg-blue-50/30 transition-all duration-200 group"
                  onClick={() => handleStudentClick(student.id)}
                >
                  <TableCell className="py-0">
                    <div className="flex items-center gap-4">
                      <Avatar
                        className={`w-10 h-10 rounded-2xl ${student.avatarGradient} shadow-sm group-hover:shadow-md transition-shadow duration-200`}
                      >
                        <AvatarFallback className="text-white text-sm font-semibold">
                          {student.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-slate-800 text-sm tracking-tight group-hover:text-blue-700 transition-colors duration-200">
                        {student.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-600 text-sm py-0">
                    {student.program}
                  </TableCell>
                  <TableCell className="py-0">
                    <Badge
                      className={`px-3 py-1 rounded-2xl font-semibold text-xs border ${statusColors[student.status.color]} shadow-sm`}
                    >
                      {student.status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-800 text-sm py-0">
                    {student.cvsGenerated}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-800 text-sm py-0">
                    {student.applications}
                  </TableCell>
                  <TableCell className="font-medium text-slate-500 text-sm py-0">
                    {student.lastActive}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
};