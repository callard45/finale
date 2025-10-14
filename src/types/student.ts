export interface StudentProfile {
  id: string;
  name: string;
  phone: string;
  birthdate: string;
  linkedin: string;
  portfolio: string;
  program: string;
  status: {
    label: string;
    color: string;
  };
  cvsGenerated: number;
  applications: number;
  lastActive: string;
  avatarGradient: string;
  projects: Array<{
    name: string;
    organization: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
  }>;
  extraCourses: Array<{
    course: string;
    provider: string;
    date: string;
  }>;
  workExperience: Array<{
    position: string;
    company: string;
    status: string;
  }>;
}