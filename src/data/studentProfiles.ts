import { StudentProfile } from "../types/student";

export const studentProfiles: StudentProfile[] = [
  {
    id: "10105518",
    name: "Alex Smith",
    phone: "07551 541758",
    birthdate: "05/06/2005",
    linkedin: "https://www.linkedin.com/in/alexsmith2005",
    portfolio: "https://Alex.portfolio.com",
    program: "Computer Science",
    status: { label: "Complete", color: "emerald" },
    cvsGenerated: 5,
    applications: 12,
    lastActive: "Today",
    avatarGradient: "bg-gradient-to-br from-blue-500 to-blue-700",
    projects: [
      { name: "Chess", organization: "2015-2025" },
      { name: "Badminton", organization: "Spotify" }
    ],
    education: [
      {
        institution: "ESSEC Business School",
        degree: "Bachelor Bsc Management",
        period: "Sep 2023-Jun 2026"
      },
      {
        institution: "Saint Nicolas Paris",
        degree: "Bac Général",
        period: "Sep 2020-Jun 2023"
      }
    ],
    extraCourses: [
      { course: "Data Scientist", provider: "AWS", date: "09/08/25" },
      { course: "UX Designer", provider: "LinkedIn", date: "10/08/25" }
    ],
    workExperience: [
      {
        position: "Software Engineer",
        company: "Facebook",
        status: "Interview on May 15"
      },
      {
        position: "Product Manager",
        company: "Slack",
        status: "Interview on May 18"
      },
      {
        position: "Frontend Developer",
        company: "Twitter",
        status: "Interview on May 20"
      }
    ]
  },
  {
    id: "10105519",
    name: "Emma Johnson",
    phone: "07551 987654",
    birthdate: "15/08/2004",
    linkedin: "https://www.linkedin.com/in/emmajohnson",
    portfolio: "https://emma.portfolio.com",
    program: "Business Administration",
    status: { label: "In Progress", color: "blue" },
    cvsGenerated: 3,
    applications: 8,
    lastActive: "Yesterday",
    avatarGradient: "bg-gradient-to-br from-purple-500 to-purple-700",
    projects: [
      { name: "Student Council", organization: "2022-2024" },
      { name: "Marketing Intern", organization: "Apple" }
    ],
    education: [
      {
        institution: "London Business School",
        degree: "Bachelor of Business Administration",
        period: "Sep 2022-Jun 2025"
      },
      {
        institution: "Westminster School",
        degree: "A-Levels",
        period: "Sep 2019-Jun 2022"
      }
    ],
    extraCourses: [
      { course: "Digital Marketing", provider: "Google", date: "12/07/25" },
      { course: "Business Analytics", provider: "Coursera", date: "15/09/25" }
    ],
    workExperience: [
      {
        position: "Marketing Intern",
        company: "Apple",
        status: "Completed May 2024"
      },
      {
        position: "Business Analyst",
        company: "Deloitte",
        status: "Interview on June 1"
      }
    ]
  },
  {
    id: "10105520",
    name: "Michael Chen",
    phone: "07551 123456",
    birthdate: "23/03/2005",
    linkedin: "https://www.linkedin.com/in/michaelchen",
    portfolio: "https://michael.portfolio.com",
    program: "Data Science",
    status: { label: "Complete", color: "emerald" },
    cvsGenerated: 7,
    applications: 15,
    lastActive: "2 days ago",
    avatarGradient: "bg-gradient-to-br from-red-500 to-red-700",
    projects: [
      { name: "AI Research", organization: "2023-2024" },
      { name: "Data Analysis", organization: "Microsoft" }
    ],
    education: [
      {
        institution: "Imperial College London",
        degree: "BSc Data Science",
        period: "Sep 2023-Jun 2026"
      },
      {
        institution: "Singapore International School",
        degree: "IB Diploma",
        period: "Sep 2020-Jun 2023"
      }
    ],
    extraCourses: [
      { course: "Machine Learning", provider: "Stanford Online", date: "20/06/25" },
      { course: "Big Data Analytics", provider: "IBM", date: "25/08/25" }
    ],
    workExperience: [
      {
        position: "Data Scientist Intern",
        company: "Microsoft",
        status: "Completed March 2024"
      },
      {
        position: "ML Engineer",
        company: "Google",
        status: "Interview on May 25"
      }
    ]
  }
];