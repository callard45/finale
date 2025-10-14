import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

// Feature data for mapping
const features = [
  {
    title: "Answer AI Interview",
    iconType: 1
  },
  {
    title: "Generate CV & Cover Letter",
    iconType: 2
  },
  {
    title: "Track Applications",
    iconType: 3
  },
  {
    title: "Get Feedback",
    iconType: 4
  },
];

export const HeroBannerSection = (): JSX.Element => {
  // Function to render different icons based on type
  const renderIcon = (type) => {
    switch (type) {
      case 1:
        return (
          <svg width="40" height="40" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 24.5H32C29.8 24.5 28.02 26.3 28.02 28.5L28 56.5L36 48.5H48C50.2 48.5 52 46.7 52 44.5V28.5C52 26.3 50.2 24.5 48 24.5ZM44 40.5H36V36.5H44V40.5ZM48 32.5H32V28.5H48V32.5Z" fill="#3B82F6"/>
          </svg>
        );
      case 2:
        return (
          <svg width="40" height="40" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 22.5C30.1 22.5 22 30.6 22 40.5C22 50.4 30.1 58.5 40 58.5C49.9 58.5 58 50.4 58 40.5C58 30.6 49.9 22.5 40 22.5ZM40 54.5C32.3 54.5 26 48.2 26 40.5C26 32.8 32.3 26.5 40 26.5C47.7 26.5 54 32.8 54 40.5C54 48.2 47.7 54.5 40 54.5ZM38 32.5H42V44.5H38V32.5ZM38 28.5H42V32.5H38V28.5Z" fill="#3B82F6"/>
          </svg>
        );
      case 3:
        return (
          <svg width="40" height="40" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56 24.5H46L40 18.5H24C21.8 18.5 20.02 20.3 20.02 22.5L20 58.5C20 60.7 21.8 62.5 24 62.5H56C58.2 62.5 60 60.7 60 58.5V30.5C60 28.3 58.2 24.5 56 24.5ZM56 58.5H24V22.5H38L44 28.5H56V58.5ZM36 36.5V50.5L48 43.5L36 36.5Z" fill="#3B82F6"/>
          </svg>
        );
      case 4:
        return (
          <svg width="40" height="40" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 42.5C31.32 42.5 34 39.82 34 36.5C34 33.18 31.32 30.5 28 30.5C24.68 30.5 22 33.18 22 36.5C22 39.82 24.68 42.5 28 42.5ZM52 42.5C55.32 42.5 58 39.82 58 36.5C58 33.18 55.32 30.5 52 30.5C48.68 30.5 46 33.18 46 36.5C46 39.82 48.68 42.5 52 42.5ZM56 46.5H48C46.4 46.5 44.96 47.08 43.84 48.04C46.44 49.8 48.2 52.72 48.6 56.08C48.64 56.56 49.04 56.5 49.04 56.5H60C61.1 56.5 62 55.6 62 54.5C62 50.08 58.42 46.5 56 46.5ZM40 46.5C45.52 46.5 50 42.02 50 36.5C50 30.98 45.52 26.5 40 26.5C34.48 26.5 30 30.98 30 36.5C30 42.02 34.48 46.5 40 46.5ZM44.4 50.5H35.6C31.6 50.5 28.4 53.7 28.4 57.7C28.4 59.02 29.48 60.5 30.8 60.5H49.2C50.52 60.5 51.6 59.02 51.6 57.7C51.6 53.7 48.4 50.5 44.4 50.5ZM36.16 48.04C35.04 47.08 33.6 46.5 32 46.5H24C21.58 46.5 18 50.08 18 54.5C18 55.6 18.9 56.5 20 56.5H30.96C30.96 56.5 31.36 56.56 31.4 56.08C31.8 52.72 33.56 49.8 36.16 48.04Z" fill="#3B82F6"/>
          </svg>
        );
      default:
        return null;
    }
  };

  // Handle get started button click
  const handleGetStarted = () => {
    console.log("User clicked Create Your Profile");
    // In a real app, this would be handled by the Link component's navigation
  };

  // Handle how it works button click
  const handleHowItWorks = () => {
    console.log("User clicked How It Works");
    // In a real app, this would scroll to the how it works section
    const element = document.getElementById("how_it_works");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-20 py-[60px] px-6 md:px-[120px] bg-white w-full">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1000px] gap-8">
        <div className="flex flex-col items-start justify-center gap-6 w-full md:w-1/2 max-w-[500px]">
          <h1 className="font-bold text-4xl md:text-5xl text-slate-800 leading-[57.6px] font-['Montserrat',Helvetica]">
            Your AI-Powered Career Assistant
          </h1>

          <p className="font-normal text-lg text-slate-500 leading-[28.8px] font-['Inter',Helvetica]">
            GenKreer helps students create professional CVs, ace interviews, and
            track job applications with AI-powered tools.
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full">
            <Link to="/login">
              <Button 
                className="h-14 px-6 rounded-[28px] text-base font-normal font-['Inter',Helvetica] bg-gradient-to-b from-blue-500 to-blue-600 shadow-[0px_8px_24px_#3b82f640]"
                onClick={handleGetStarted}
              >
                Create Your Profile
              </Button>
            </Link>

            <a href="#how_it_works" onClick={(e) => {
              e.preventDefault();
              handleHowItWorks();
            }}>
              <Button
                variant="outline"
                className="h-14 px-6 rounded-[28px] text-base font-normal text-slate-500 font-['Inter',Helvetica] border-slate-200 bg-white"
              >
                How It Works
              </Button>
            </a>
          </div>
        </div>

        <div className="w-full md:w-[400px] h-[360px] flex items-center justify-center">
          <Card className="w-full h-full bg-slate-50 rounded-3xl shadow-[0px_16px_60px_#0000000f] border-none">
            <CardContent className="p-0 h-full relative">
              <img
                className="absolute w-[357px] h-[357px] top-[3px] left-[30px] object-cover rounded-3xl"
                alt="AI assistant interface"
                src="/ChatGPT Image 13 mai 2025, 22_17_02 1.png"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/357x357/gray/white?text=AI+Assistant";
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-[1000px]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col w-[180px] h-60 items-center gap-5"
          >
            <div className="flex w-20 h-20 items-center justify-center bg-[#3b82f610] rounded-[40px]">
              {renderIcon(feature.iconType)}
            </div>
            <p className="font-['Inter',Helvetica] font-normal text-lg text-center text-slate-800 leading-[21.6px] w-full">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};