import type { Metadata } from "next";
import PaperNav from "./_components/PaperNav";
import ThemeSwitcher from "./_components/ThemeSwitcher";
import HeroSlide from "./_components/HeroSlide";
import ContextSlide from "./_components/ContextSlide";
import InstrumentSlide from "./_components/InstrumentSlide";
import PriorWorkSlide from "./_components/PriorWorkSlide";
import BarriersSlide from "./_components/BarriersSlide";
import BarrierDesignSlide from "./_components/BarrierDesignSlide";
import BarrierOrdinalSlide from "./_components/BarrierOrdinalSlide";
import BarrierSamplingSlide from "./_components/BarrierSamplingSlide";
import FrameworkSlide from "./_components/FrameworkSlide";
import ConstraintSlide from "./_components/ConstraintSlide";
import ConsensusIssueSlide from "./_components/ConsensusIssueSlide";
import ConsensusSlide from "./_components/ConsensusSlide";
import ConstructSlide from "./_components/ConstructSlide";
import ExperimentSlide from "./_components/ExperimentSlide";
import LLMvsHumansSlide from "./_components/LLMvsHumansSlide";
import MainEffectsSlide from "./_components/MainEffectsSlide";
import InteractionSlide from "./_components/InteractionSlide";
import ClosingSlide from "./_components/ClosingSlide";
import PaperFooter from "./_components/PaperFooter";

export const metadata: Metadata = {
  title: "Every Token Counts | Davood Wadi",
  description:
    "Every Token Counts: Isolating Latent Behavior of LLMs via Exact Likert Distributions — Davood Wadi, ACL 2025",
};

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      <PaperNav />
      <HeroSlide />
      <ContextSlide />
      <InstrumentSlide />
      <PriorWorkSlide /> 
      <BarriersSlide />
      <BarrierDesignSlide />
      <BarrierOrdinalSlide />
      <BarrierSamplingSlide />
      <FrameworkSlide />
      <ConstraintSlide />
      <ConsensusIssueSlide />
      <ConsensusSlide />
      <ConstructSlide />
      <ExperimentSlide />
      <LLMvsHumansSlide />
      <MainEffectsSlide />
      <InteractionSlide />
      <ClosingSlide />
      <PaperFooter />
      <ThemeSwitcher />
    </div>
  );
}
