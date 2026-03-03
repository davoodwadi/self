import { ProjectCard } from "@/components/portfolio/ProjectCard";

export function GrantsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      <ProjectCard
        type="grant"
        title="UCW Explore Grant"
        description='Developed "AILSS: AI-Powered Learning Support System." This project addresses the challenge of providing timely, personalized support to students with disabilities by utilizing Large Language Models for formative assessment.'
      />
      <ProjectCard
        type="award"
        title="Google Gemini Academic Program Award"
        description="Recognized for excellence and innovation in academic research and applications involving Google's Gemini models."
      />
    </div>
  );
}
