import type { Metadata } from "next";
import "./tool-lab.css";
import PaperNav from "./_components/PaperNav";
import ThemeSwitcher from "./_components/ThemeSwitcher";
import HeroSlide from "./_components/HeroSlide";
import EvaluationGapSlide from "./_components/EvaluationGapSlide";
import EfficiencyMotivationSlide from "./_components/EfficiencyMotivationSlide";
import DualPuzzlesSlide from "./_components/DualPuzzlesSlide";
import BiasPuzzleSlide from "./_components/BiasPuzzleSlide";
import CognitionTimelineSlide from "./_components/CognitionTimelineSlide";
import ResourceRationalitySlide from "./_components/ResourceRationalitySlide";
import ToolLabInterfaceSlide from "./_components/ToolLabInterfaceSlide";
import TraceSlide from "./_components/TraceSlide";
import MDPSlide from "./_components/MDPSlide";
import ControlledTestbedSlide from "./_components/ControlledTestbedSlide";
import PriceBiasSlide from "./_components/PriceBiasSlide";
import PriceToolLabDesignSlide from "./_components/PriceToolLabDesignSlide";
import PriceToolLabResultsSlide from "./_components/PriceToolLabResultsSlide";
import MechanismSlide from "./_components/MechanismSlide";
import DiscountBiasSlide from "./_components/DiscountBiasSlide";
import DiscountToolLabDesignSlide from "./_components/DiscountToolLabDesignSlide";
import DiscountToolLabResultsSlide from "./_components/DiscountToolLabResultsSlide";
import FailureModesSlide from "./_components/FailureModesSlide";
import MetricsSlide from "./_components/MetricsSlide";
import TrainingSlide from "./_components/TrainingSlide";
import GeneralizationSlide from "./_components/GeneralizationSlide";
import OpenQuestionsSlide from "./_components/OpenQuestionsSlide";
import ClosingSlide from "./_components/ClosingSlide";
import PaperFooter from "./_components/PaperFooter";

export const metadata: Metadata = {
  title: "Tool-Lab | Davood Wadi",
  description:
    "Tool-Lab: Evaluating LLM Tool Use as Resource-Rational Planning.",
};

export default function Page() {
  return (
    <div className="tl-root">
      <PaperNav />
      <HeroSlide />
      <EvaluationGapSlide />
      <EfficiencyMotivationSlide />
      {/* <DualPuzzlesSlide /> */}
      <BiasPuzzleSlide />
      <CognitionTimelineSlide />
      <ResourceRationalitySlide />
      <ToolLabInterfaceSlide />
      <TraceSlide />
      <MDPSlide />
      <ControlledTestbedSlide />
      <PriceBiasSlide />
      <PriceToolLabDesignSlide />
      <PriceToolLabResultsSlide />
      <MechanismSlide />
      <DiscountBiasSlide />
      <DiscountToolLabDesignSlide />
      <DiscountToolLabResultsSlide />
      <FailureModesSlide />
      <MetricsSlide />
      <TrainingSlide />
      <GeneralizationSlide />
      <OpenQuestionsSlide />
      <ClosingSlide />
      <PaperFooter />
      <ThemeSwitcher />
    </div>
  );
}
