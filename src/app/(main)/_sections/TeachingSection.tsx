import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { GraduationCap } from "lucide-react";

const institutions = [
  {
    role: "Lecturer",
    institution: "University Canada West",
    period: "2025 (MBA Program)",
    courses: [
      "BUSI 654 Application of AI in Business",
      "CMPT 641 Digital Transformation",
      "BUSI 653 Cloud Computing Technologies",
    ],
  },
  {
    role: "Lecturer",
    institution: "HEC Montreal",
    period: "2023",
    courses: [
      "MATH 60629A Machine Learning I: Large-Scale Data Analysis and Decision Making",
    ],
    note: "Master's and PhD course",
  },
  {
    role: "Instructor",
    institution: "GreatLearning",
    period: "2021 - Present",
    description:
      "Developed and taught courses in AI and data science. Managed diverse classroom settings.",
  },
];

export function TeachingSection() {
  return (
    <SectionContainer id="teaching" contentClassName="max-w-6xl">
      <SectionHeader align="center">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Teaching
          </h2>
          <p className="text-gray-400 font-light">
            Courses and instruction across institutions.
          </p>
        </div>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {institutions.map((inst, i) => (
          <FadeUp key={inst.institution} delayMs={i * 100}>
            <div className="glass-card p-8 rounded-xl relative overflow-hidden group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent-500">
                    {inst.role}
                  </span>
                  {/* <GraduationCap size={20} className="text-accent-400" /> */}
                </div>

                <h3 className="text-xl font-serif font-bold tracking-tight mb-1 text-white">
                  {inst.institution}
                </h3>
                <p className="text-sm text-gray-500 font-light mb-4">
                  {inst.period}
                </p>

                {inst.note && (
                  <p className="text-xs text-accent-400/80 font-medium uppercase tracking-wider mb-4">
                    {inst.note}
                  </p>
                )}

                {inst.courses && (
                  <ul className="space-y-2">
                    {inst.courses.map((course) => (
                      <li
                        key={course}
                        className="text-sm text-gray-400 font-light border-l-2 border-accent-500/30 pl-3"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                )}

                {inst.description && (
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {inst.description}
                  </p>
                )}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionContainer>
  );
}
