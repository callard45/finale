export interface NetworkProfile {
  id: number;
  name: string;
  initials: string;
  role: string;
  program: string;
  university: string;
  graduationYear: string;
  email: string;
  linkedin: string;
  portfolio?: string;
  phone?: string;
  birthdate?: string;
  color: string;
  profilePhoto: string;
  skills: string[];
  languages: string[];
  projects: Array<{
    name: string;
    organization: string;
    description: string;
    period: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
    modules?: string[];
  }>;
  workExperience: Array<{
    position: string;
    company: string;
    period: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    provider: string;
    date: string;
  }>;
  bio: string;
}

export const networkProfiles: NetworkProfile[] = [
  {
    id: 1,
    name: "John Smith",
    initials: "JS",
    role: "Full Stack Developer",
    program: "Computer Science",
    university: "ESSEC Business School",
    graduationYear: "2024",
    email: "john.smith@essec.edu",
    linkedin: "https://www.linkedin.com/in/johnsmith2024",
    portfolio: "https://johnsmith.dev",
    phone: "07551 123456",
    birthdate: "15/03/2002",
    color: "from-blue-500 to-blue-700",
    profilePhoto: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Passionate full-stack developer with experience in React, Node.js, and cloud technologies. Currently seeking opportunities in fintech and e-commerce.",
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "MongoDB"],
    languages: ["French (Native)", "English (Fluent)", "Spanish (Intermediate)"],
    projects: [
      {
        name: "E-commerce Platform",
        organization: "Personal Project",
        description: "Built a full-stack e-commerce platform using React and Node.js with payment integration",
        period: "2023-2024"
      },
      {
        name: "Student Management System",
        organization: "ESSEC Business School",
        description: "Developed a web application for managing student records and course enrollment",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "ESSEC Business School",
        degree: "Master in Management & Technology",
        period: "2022-2024",
        modules: ["Software Engineering", "Data Structures", "Web Development", "Database Systems"]
      },
      {
        institution: "Lycée Henri IV",
        degree: "Baccalauréat Scientifique",
        period: "2019-2022"
      }
    ],
    workExperience: [
      {
        position: "Software Development Intern",
        company: "Société Générale",
        period: "Jun 2023 - Aug 2023",
        description: "Developed internal tools using React and Python, improved system performance by 25%"
      },
      {
        position: "Web Developer",
        company: "Freelance",
        period: "2022-2023",
        description: "Created websites for local businesses using modern web technologies"
      }
    ],
    certifications: [
      {
        name: "AWS Cloud Practitioner",
        provider: "Amazon Web Services",
        date: "2023"
      },
      {
        name: "React Developer Certification",
        provider: "Meta",
        date: "2023"
      }
    ]
  },
  {
    id: 2,
    name: "Emma Miller",
    initials: "EM",
    role: "UX/UI Designer",
    program: "Digital Design",
    university: "École Supérieure d'Art et Design",
    graduationYear: "2024",
    email: "emma.miller@esad.fr",
    linkedin: "https://www.linkedin.com/in/emmamiller",
    portfolio: "https://emmamiller.design",
    color: "from-purple-500 to-purple-700",
    profilePhoto: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Creative UX/UI designer passionate about creating intuitive and beautiful digital experiences. Specialized in mobile app design and user research.",
    skills: ["Figma", "Adobe Creative Suite", "Sketch", "Prototyping", "User Research", "Wireframing"],
    languages: ["French (Native)", "English (Fluent)", "German (Basic)"],
    projects: [
      {
        name: "Banking Mobile App",
        organization: "BNP Paribas",
        description: "Redesigned mobile banking app interface, improving user satisfaction by 40%",
        period: "2023-2024"
      },
      {
        name: "E-learning Platform",
        organization: "OpenClassrooms",
        description: "Designed user interface for online learning platform with focus on accessibility",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "École Supérieure d'Art et Design",
        degree: "Master in Digital Design",
        period: "2022-2024",
        modules: ["User Experience Design", "Interface Design", "Design Thinking", "Digital Marketing"]
      }
    ],
    workExperience: [
      {
        position: "UX Design Intern",
        company: "BNP Paribas",
        period: "Mar 2023 - Aug 2023",
        description: "Led redesign of mobile banking app, conducted user research and usability testing"
      },
      {
        position: "Graphic Designer",
        company: "Creative Agency",
        period: "2022-2023",
        description: "Created visual identities and marketing materials for various clients"
      }
    ],
    certifications: [
      {
        name: "Google UX Design Certificate",
        provider: "Google",
        date: "2023"
      },
      {
        name: "Adobe Certified Expert",
        provider: "Adobe",
        date: "2022"
      }
    ]
  },
  {
    id: 3,
    name: "Michael Chen",
    initials: "MC",
    role: "Data Scientist",
    program: "Data Science & AI",
    university: "École Polytechnique",
    graduationYear: "2024",
    email: "michael.chen@polytechnique.edu",
    linkedin: "https://www.linkedin.com/in/michaelchen",
    color: "from-green-500 to-green-700",
    profilePhoto: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Data scientist with expertise in machine learning and statistical analysis. Passionate about using data to solve complex business problems.",
    skills: ["Python", "R", "SQL", "Machine Learning", "TensorFlow", "Tableau", "Statistics"],
    languages: ["English (Native)", "French (Fluent)", "Mandarin (Native)"],
    projects: [
      {
        name: "Predictive Analytics Platform",
        organization: "Capgemini",
        description: "Built ML models for customer churn prediction with 85% accuracy",
        period: "2023-2024"
      },
      {
        name: "Financial Risk Assessment",
        organization: "Academic Project",
        description: "Developed risk assessment model for loan default prediction",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "École Polytechnique",
        degree: "Master in Data Science & AI",
        period: "2022-2024",
        modules: ["Machine Learning", "Deep Learning", "Statistics", "Data Mining", "Big Data"]
      }
    ],
    workExperience: [
      {
        position: "Data Science Intern",
        company: "Capgemini",
        period: "Apr 2023 - Sep 2023",
        description: "Developed predictive models and data visualization dashboards for clients"
      },
      {
        position: "Research Assistant",
        company: "École Polytechnique",
        period: "2022-2023",
        description: "Assisted in AI research projects and published 2 academic papers"
      }
    ],
    certifications: [
      {
        name: "TensorFlow Developer Certificate",
        provider: "Google",
        date: "2023"
      },
      {
        name: "Data Science Professional Certificate",
        provider: "IBM",
        date: "2022"
      }
    ]
  },
  {
    id: 4,
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Marketing Manager",
    program: "Digital Marketing",
    university: "HEC Paris",
    graduationYear: "2024",
    email: "sarah.johnson@hec.fr",
    linkedin: "https://www.linkedin.com/in/sarahjohnson",
    color: "from-pink-500 to-pink-700",
    profilePhoto: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Digital marketing specialist with experience in social media, content marketing, and growth hacking. Passionate about brand storytelling.",
    skills: ["Digital Marketing", "Social Media", "Content Strategy", "SEO/SEM", "Analytics", "Brand Management"],
    languages: ["English (Native)", "French (Fluent)", "Italian (Intermediate)"],
    projects: [
      {
        name: "Brand Awareness Campaign",
        organization: "L'Oréal",
        description: "Led digital campaign that increased brand awareness by 60% among target demographic",
        period: "2023-2024"
      },
      {
        name: "Social Media Strategy",
        organization: "Startup Incubator",
        description: "Developed social media strategy for 5 startups, growing their combined following by 200%",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "HEC Paris",
        degree: "Master in Digital Marketing",
        period: "2022-2024",
        modules: ["Digital Strategy", "Consumer Behavior", "Brand Management", "Data Analytics"]
      }
    ],
    workExperience: [
      {
        position: "Marketing Intern",
        company: "L'Oréal",
        period: "Jun 2023 - Dec 2023",
        description: "Managed social media campaigns and analyzed consumer behavior data"
      },
      {
        position: "Content Creator",
        company: "Freelance",
        period: "2022-2023",
        description: "Created content for various brands and managed their social media presence"
      }
    ],
    certifications: [
      {
        name: "Google Ads Certification",
        provider: "Google",
        date: "2023"
      },
      {
        name: "Facebook Marketing Certification",
        provider: "Meta",
        date: "2023"
      }
    ]
  },
  {
    id: 5,
    name: "David Wilson",
    initials: "DW",
    role: "Financial Analyst",
    program: "Finance",
    university: "ESCP Business School",
    graduationYear: "2024",
    email: "david.wilson@escp.eu",
    linkedin: "https://www.linkedin.com/in/davidwilson",
    color: "from-indigo-500 to-indigo-700",
    profilePhoto: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Finance professional with strong analytical skills and experience in investment banking. Interested in sustainable finance and ESG investing.",
    skills: ["Financial Modeling", "Excel", "Bloomberg Terminal", "Risk Management", "Valuation", "Python"],
    languages: ["English (Native)", "French (Fluent)", "Spanish (Intermediate)"],
    projects: [
      {
        name: "ESG Investment Analysis",
        organization: "BNP Paribas",
        description: "Analyzed ESG factors in investment decisions and created sustainability scoring model",
        period: "2023-2024"
      },
      {
        name: "Portfolio Optimization",
        organization: "Academic Project",
        description: "Developed portfolio optimization algorithm using modern portfolio theory",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "ESCP Business School",
        degree: "Master in Finance",
        period: "2022-2024",
        modules: ["Corporate Finance", "Investment Banking", "Risk Management", "Financial Markets"]
      }
    ],
    workExperience: [
      {
        position: "Investment Banking Intern",
        company: "BNP Paribas",
        period: "Jun 2023 - Aug 2023",
        description: "Assisted in M&A transactions and performed financial due diligence"
      },
      {
        position: "Financial Analyst Intern",
        company: "Société Générale",
        period: "2022",
        description: "Conducted market research and prepared investment reports"
      }
    ],
    certifications: [
      {
        name: "CFA Level I",
        provider: "CFA Institute",
        date: "2023"
      },
      {
        name: "Bloomberg Market Concepts",
        provider: "Bloomberg",
        date: "2022"
      }
    ]
  },
  {
    id: 6,
    name: "Lisa Taylor",
    initials: "LT",
    role: "Product Manager",
    program: "Business & Technology",
    university: "INSEAD",
    graduationYear: "2024",
    email: "lisa.taylor@insead.edu",
    linkedin: "https://www.linkedin.com/in/lisataylor",
    color: "from-teal-500 to-teal-700",
    profilePhoto: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Product manager with experience in tech startups and enterprise software. Passionate about building products that solve real user problems.",
    skills: ["Product Strategy", "Agile/Scrum", "User Research", "Data Analysis", "Roadmapping", "Stakeholder Management"],
    languages: ["English (Native)", "French (Fluent)", "Japanese (Basic)"],
    projects: [
      {
        name: "SaaS Platform Launch",
        organization: "Criteo",
        description: "Led product launch that acquired 10,000+ users in first 6 months",
        period: "2023-2024"
      },
      {
        name: "Mobile App Redesign",
        organization: "Startup",
        description: "Redesigned mobile app resulting in 50% increase in user engagement",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "INSEAD",
        degree: "MBA",
        period: "2022-2024",
        modules: ["Product Management", "Strategy", "Innovation", "Leadership"]
      }
    ],
    workExperience: [
      {
        position: "Product Management Intern",
        company: "Criteo",
        period: "May 2023 - Oct 2023",
        description: "Managed product roadmap and coordinated with engineering and design teams"
      },
      {
        position: "Business Analyst",
        company: "McKinsey & Company",
        period: "2020-2022",
        description: "Consulted for Fortune 500 companies on digital transformation initiatives"
      }
    ],
    certifications: [
      {
        name: "Certified Scrum Product Owner",
        provider: "Scrum Alliance",
        date: "2023"
      },
      {
        name: "Google Analytics Certification",
        provider: "Google",
        date: "2022"
      }
    ]
  },
  {
    id: 7,
    name: "Robert Garcia",
    initials: "RG",
    role: "Cybersecurity Specialist",
    program: "Cybersecurity",
    university: "Télécom Paris",
    graduationYear: "2024",
    email: "robert.garcia@telecom-paris.fr",
    linkedin: "https://www.linkedin.com/in/robertgarcia",
    color: "from-red-500 to-red-700",
    profilePhoto: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Cybersecurity expert specializing in network security and ethical hacking. Passionate about protecting digital infrastructure.",
    skills: ["Network Security", "Penetration Testing", "Python", "Linux", "Cryptography", "Incident Response"],
    languages: ["Spanish (Native)", "French (Fluent)", "English (Fluent)"],
    projects: [
      {
        name: "Security Audit Platform",
        organization: "Thales",
        description: "Developed automated security audit tool that reduced assessment time by 70%",
        period: "2023-2024"
      },
      {
        name: "Vulnerability Scanner",
        organization: "Personal Project",
        description: "Created network vulnerability scanner using Python and Nmap",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "Télécom Paris",
        degree: "Master in Cybersecurity",
        period: "2022-2024",
        modules: ["Network Security", "Cryptography", "Ethical Hacking", "Digital Forensics"]
      }
    ],
    workExperience: [
      {
        position: "Cybersecurity Intern",
        company: "Thales",
        period: "Apr 2023 - Sep 2023",
        description: "Conducted security assessments and developed security protocols"
      },
      {
        position: "IT Security Analyst",
        company: "Orange",
        period: "2022",
        description: "Monitored network security and responded to security incidents"
      }
    ],
    certifications: [
      {
        name: "Certified Ethical Hacker (CEH)",
        provider: "EC-Council",
        date: "2023"
      },
      {
        name: "CompTIA Security+",
        provider: "CompTIA",
        date: "2022"
      }
    ]
  },
  {
    id: 8,
    name: "Anna Davis",
    initials: "AD",
    role: "HR Business Partner",
    program: "Human Resources",
    university: "EDHEC Business School",
    graduationYear: "2024",
    email: "anna.davis@edhec.edu",
    linkedin: "https://www.linkedin.com/in/annadavis",
    color: "from-yellow-500 to-yellow-700",
    profilePhoto: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "HR professional focused on talent acquisition and employee development. Passionate about creating inclusive workplace cultures.",
    skills: ["Talent Acquisition", "Employee Relations", "Performance Management", "Training & Development", "HRIS", "Labor Law"],
    languages: ["English (Native)", "French (Fluent)", "German (Intermediate)"],
    projects: [
      {
        name: "Diversity & Inclusion Program",
        organization: "Accenture",
        description: "Implemented D&I program that improved workplace diversity by 35%",
        period: "2023-2024"
      },
      {
        name: "Employee Engagement Survey",
        organization: "Academic Project",
        description: "Designed and conducted employee engagement survey for local company",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "EDHEC Business School",
        degree: "Master in Human Resources",
        period: "2022-2024",
        modules: ["Talent Management", "Organizational Behavior", "Labor Relations", "HR Analytics"]
      }
    ],
    workExperience: [
      {
        position: "HR Intern",
        company: "Accenture",
        period: "Jun 2023 - Dec 2023",
        description: "Supported recruitment processes and employee onboarding programs"
      },
      {
        position: "HR Assistant",
        company: "Local SME",
        period: "2022",
        description: "Assisted with payroll processing and employee record management"
      }
    ],
    certifications: [
      {
        name: "SHRM-CP",
        provider: "SHRM",
        date: "2023"
      },
      {
        name: "Workday HCM Certification",
        provider: "Workday",
        date: "2023"
      }
    ]
  },
  {
    id: 9,
    name: "Thomas Martin",
    initials: "TM",
    role: "Consultant",
    program: "Strategy & Management",
    university: "Sciences Po",
    graduationYear: "2024",
    email: "thomas.martin@sciencespo.fr",
    linkedin: "https://www.linkedin.com/in/thomasmartin",
    color: "from-gray-500 to-gray-700",
    profilePhoto: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Management consultant with experience in strategy and operations. Interested in digital transformation and sustainability consulting.",
    skills: ["Strategy Consulting", "Business Analysis", "Project Management", "PowerPoint", "Excel", "Process Improvement"],
    languages: ["French (Native)", "English (Fluent)", "Spanish (Intermediate)"],
    projects: [
      {
        name: "Digital Transformation Strategy",
        organization: "Deloitte",
        description: "Developed digital transformation roadmap for retail client, projected 20% cost savings",
        period: "2023-2024"
      },
      {
        name: "Market Entry Analysis",
        organization: "Academic Project",
        description: "Analyzed market entry strategy for French company expanding to Asia",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "Sciences Po",
        degree: "Master in Strategy & Management",
        period: "2022-2024",
        modules: ["Strategic Management", "Operations", "Finance", "International Business"]
      }
    ],
    workExperience: [
      {
        position: "Strategy Consultant Intern",
        company: "Deloitte",
        period: "May 2023 - Oct 2023",
        description: "Supported client engagements in retail and manufacturing sectors"
      },
      {
        position: "Business Analyst",
        company: "BCG",
        period: "Summer 2022",
        description: "Conducted market research and competitive analysis for various clients"
      }
    ],
    certifications: [
      {
        name: "PMP Certification",
        provider: "PMI",
        date: "2023"
      },
      {
        name: "Lean Six Sigma Green Belt",
        provider: "ASQ",
        date: "2022"
      }
    ]
  },
  {
    id: 10,
    name: "Sophie Dubois",
    initials: "SD",
    role: "Software Engineer",
    program: "Computer Engineering",
    university: "CentraleSupélec",
    graduationYear: "2024",
    email: "sophie.dubois@centralesupelec.fr",
    linkedin: "https://www.linkedin.com/in/sophiedubois",
    portfolio: "https://sophiedubois.tech",
    color: "from-violet-500 to-violet-700",
    profilePhoto: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Software engineer passionate about backend development and distributed systems. Interested in fintech and blockchain technologies.",
    skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    languages: ["French (Native)", "English (Fluent)", "German (Basic)"],
    projects: [
      {
        name: "Payment Processing System",
        organization: "Worldline",
        description: "Built scalable payment processing microservices handling 1M+ transactions daily",
        period: "2023-2024"
      },
      {
        name: "Blockchain Voting System",
        organization: "Academic Project",
        description: "Developed secure voting system using blockchain technology",
        period: "2023"
      }
    ],
    education: [
      {
        institution: "CentraleSupélec",
        degree: "Master in Computer Engineering",
        period: "2022-2024",
        modules: ["Software Architecture", "Distributed Systems", "Algorithms", "Database Systems"]
      }
    ],
    workExperience: [
      {
        position: "Backend Developer Intern",
        company: "Worldline",
        period: "Apr 2023 - Sep 2023",
        description: "Developed and maintained payment processing microservices"
      },
      {
        position: "Software Developer",
        company: "Tech Startup",
        period: "2022",
        description: "Built web applications using Java Spring Boot and React"
      }
    ],
    certifications: [
      {
        name: "Oracle Certified Java Developer",
        provider: "Oracle",
        date: "2023"
      },
      {
        name: "Kubernetes Administrator",
        provider: "CNCF",
        date: "2023"
      }
    ]
  }
];