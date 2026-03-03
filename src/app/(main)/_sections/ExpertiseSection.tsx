import { GraduationCap, Monitor, PieChart } from "lucide-react";
import { ExpertiseCard } from "@/components/portfolio/ExpertiseCard";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

export function ExpertiseSection() {
  return (
    <SectionContainer id="expertise" contentClassName="max-w-6xl">
      <SectionHeader align="center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
          Domains of Expertise
        </h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto">
          Research, engineering, and teaching across marketing science and AI.
        </p>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ExpertiseCard
          icon={
            <GraduationCap
              className="w-6 h-6 text-accent-400"
              strokeWidth={1.5}
            />
          }
          title="Academic Researcher"
          description="Published at EMNLP and JECR. My research focuses on evaluating LLM behavior under cognitive biases and understanding what drives consumer actions in digital markets."
          items={[
            "LLM Behavioral Analysis (EMNLP 2025)",
            "Online Review Incentives (JECR 2026)",
            "Peer Reviewer: NeurIPS, ICML, AISTATS",
          ]}
        />
        <ExpertiseCard
          icon={
            <Monitor className="w-6 h-6 text-accent-400" strokeWidth={1.5} />
          }
          title="AI Scientist"
          description="Building Monte-Carlo sampling frameworks for LLM evaluation, studying gradient descent hyperparameter invariance, and working with generative and deep learning models."
          items={[
            "Monte-Carlo LLM Evaluation",
            "Non-Convex Optimization",
            "Deep Learning (NLP & Vision)",
          ]}
        />
        <ExpertiseCard
          icon={
            <PieChart className="w-6 h-6 text-accent-400" strokeWidth={1.5} />
          }
          title="Marketing Strategist"
          description="Teaching how businesses can actually use AI. I design courses on AI applications and study consumer behavior, including how altruism and incentives shape online reviews."
          items={[
            "AI in Business (Course Design)",
            "Consumer Behavior & Prosocial Motivation",
            "Digital Marketing Analytics",
          ]}
        />
      </div>
    </SectionContainer>
  );
}
