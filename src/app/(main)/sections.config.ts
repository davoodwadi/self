import type { ComponentType } from "react";
import { AboutSection } from "@/components/portfolio/sections/AboutSection";
import { ContactSection } from "@/components/portfolio/sections/ContactSection";
import { ExpertiseSection } from "@/components/portfolio/sections/ExpertiseSection";
import { HeroSection } from "@/components/portfolio/sections/HeroSection";
import { PublicationsSection } from "@/components/portfolio/sections/PublicationsSection";
import type { portfolioData } from "./sections.data";

type SectionDataKeys = keyof typeof portfolioData;

export type LandingSectionConfig = {
  key: SectionDataKeys;
  enabled: boolean;
  Component: ComponentType<{ data: any }>;
};

// Toggle `enabled` or reorder this array to control the landing page layout.
export const landingSections: LandingSectionConfig[] = [
  { key: "hero", enabled: true, Component: HeroSection },
  { key: "about", enabled: true, Component: AboutSection },
  { key: "expertise", enabled: true, Component: ExpertiseSection },
  { key: "publications", enabled: true, Component: PublicationsSection },
  { key: "contact", enabled: true, Component: ContactSection },
];
