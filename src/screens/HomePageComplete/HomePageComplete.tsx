import React from "react";
import { ContactSection } from "./sections/ContactSection";
import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { HeroBannerSection } from "./sections/HeroBannerSection";
import { NavigationSection } from "./sections/NavigationSection";

export const HomePageComplete = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full min-h-screen bg-white">
      <NavigationSection />
      <HeroBannerSection />
      <FeaturesSection />
      <ContactSection />
    </main>
  );
};
