import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { ServiceList } from "./ServiceList";

export function ServicesSection() {
  return (
    <SectionContainer id="services" contentClassName="max-w-4xl">
      <SectionHeader align="center">
        <div>
          <h2 className="section-title">Academic Service</h2>
          <p className="section-subtitle">
            Peer review, ethics oversight, and curriculum design.
          </p>
        </div>
      </SectionHeader>

      <FadeUp delayMs={100}>
        <div className="glass-card p-8 md:p-10 rounded-xl">
          <ServiceList />
        </div>
      </FadeUp>
    </SectionContainer>
  );
}
