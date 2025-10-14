import React from "react";
import { Button } from "../../components/ui/button";
import { DownloadIcon } from "lucide-react";

// Document preview content types
interface DocumentPreviewProps {
  type: "cv" | "coverLetter";
  data: {
    name: string;
    position: string;
    company: string;
    date?: string;
  };
  onDownload: () => void;
}

export const DocumentView = ({ type, data, onDownload }: DocumentPreviewProps) => {
  if (type === "cv") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">CV Preview</h2>
          <Button 
            className="flex items-center gap-2" 
            onClick={onDownload}
          >
            <DownloadIcon className="h-4 w-4" />
            Download CV
          </Button>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow border">
          {/* CV Header */}
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold uppercase mb-1">SMITH Alex</h1>
            <div className="text-sm text-slate-600">
              <p>6 Egham Street, TW20 9BP, Egham, UK</p>
              <p><a href="mailto:alexsmith@gmail.com" className="text-blue-600">alexsmith@gmail.com</a> +4454347645</p>
            </div>
          </div>
          
          {/* Education Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">EDUCATION</h2>
            <div className="mb-4">
              <div className="flex">
                <div className="w-24 font-semibold">2020-2021</div>
                <div className="flex-1">
                  <p className="font-semibold">ESSEC Business School</p>
                  <p className="italic">Candidate for MSc in Finance, Ranked by the Financial Times as #4 Global Master in Finance in 2020</p>
                  <p>Relevant Coursework: Firm Valuation, M&A, Private Equity, Project Finance</p>
                  <p>GMAT 710</p>
                </div>
                <div className="text-right">Paris, France</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex">
                <div className="w-24 font-semibold">2015-2020</div>
                <div className="flex-1">
                  <p className="font-semibold">ESILV – Léonard de Vinci Graduate School of Engineering</p>
                  <p className="italic">Engineering degree in Financial Engineering – Major in Financial Markets</p>
                  <p>Relevant Coursework: Market Risk, VBA Programming, Statistics, Stochastic Calculus</p>
                  <p>Top 10% of the Class</p>
                </div>
                <div className="text-right">Paris, France</div>
              </div>
            </div>
          </div>
          
          {/* Professional Experience Section */}
          <div>
            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">PROFESSIONAL EXPERIENCE</h2>
            <div className="mb-4">
              <div className="flex">
                <div className="w-24 font-semibold">Jun 21-Aug 21</div>
                <div className="flex-1">
                  <p className="font-semibold">MORGAN STANLEY</p>
                  <p className="italic">Incoming Investment Banking Summer Intern</p>
                </div>
                <div className="text-right">London, UK</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex">
                <div className="w-24 font-semibold">Mar 20-Aug 20<br/>(6 months)</div>
                <div className="flex-1">
                  <p className="font-semibold">MICHELIN CHINA</p>
                  <p className="italic">Strategy Analyst Intern, Corporate Development Department</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Performed analysis for top management on Chinese firms to identify acquisitions and partnerships</li>
                    <li>Assured communication and led meetings with each Work stream leaders and Strategy consultants</li>
                    <li>Realized competitor analysis from tier 1 to tier 3 competitors to identify trends in China mainland</li>
                  </ul>
                </div>
                <div className="text-right">Shanghai, China</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Cover Letter view
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Cover Letter Preview</h2>
        <Button 
          className="flex items-center gap-2" 
          onClick={onDownload}
        >
          <DownloadIcon className="h-4 w-4" />
          Download Cover Letter
        </Button>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow border font-serif">
        {/* Header with contact info */}
        <div className="mb-8">
          <p className="font-bold">SMITH Alex</p>
          <p>6 Egham Street, TW20 9BP, Egham, UK</p>
          <p><a href="mailto:alexsmith@gmail.com" className="text-blue-600">alexsmith@gmail.com</a> +4454347645</p>
          <p>07/03/2025</p>
        </div>
        
        {/* Recipient */}
        <div className="mb-8">
          <p>Hiring Manager</p>
          <p>Google</p>
          <p>21 London Street, London, UK</p>
        </div>
        
        {/* Subject */}
        <p className="font-bold mb-4">Subject: Application for Internal Communication Manager Position</p>
        
        {/* Salutation */}
        <p className="mb-4">Dear Hiring Manager,</p>
        
        {/* Body paragraphs */}
        <div className="space-y-4">
          <p>
            I am excited to apply for the Internal Communication Manager role at Google. With a strong 
            background in strategic communication, stakeholder engagement, and data-driven messaging, I am 
            eager to contribute to Google's culture of transparency, collaboration, and innovation.
          </p>
          
          <p>
            During my experience as an Internal Communication Intern at Coca-Cola, I helped design and 
            implement campaigns that reached 1,000+ employees across five departments, increasing 
            engagement scores by 15%. I also contributed to the coordination of corporate town halls and 
            leadership Q&A sessions, ensuring direct interaction between C-suite executives and 500+ 
            employees. Through data-driven analysis, I evaluated 250+ employee feedback responses, leading to 
            key recommendations that enhanced internal messaging effectiveness.
          </p>
          
          <p>
            My academic background in International Business and Corporate Communications has further 
            strengthened my ability to develop compelling internal narratives. I have worked on strategic 
            communication projects, including a 30-minute corporate messaging presentation delivered to a 
            panel of professors as part of a team of five. Additionally, I am proficient in Google Analytics, Tableau, 
            and workflow automation tools like N8N, allowing me to assess communication impact and optimize 
            engagement strategies.
          </p>
          
          <p>
            I am particularly drawn to this role because it offers the opportunity to shape internal narratives, 
            enhance employee engagement, and drive strategic alignment across global teams. Google's 
            commitment to innovation, inclusivity, and data-driven decision-making resonates with my passion 
            for impactful corporate communication.
          </p>
          
          <p>
            I would welcome the opportunity to discuss how my skills and experience align with this position. 
            Thank you for your time and consideration. I look forward to your response.
          </p>
        </div>
        
        {/* Closing */}
        <div className="mt-8">
          <p>Best regards,</p>
          <p className="font-bold">SMITH Alex</p>
        </div>
      </div>
    </div>
  );
};