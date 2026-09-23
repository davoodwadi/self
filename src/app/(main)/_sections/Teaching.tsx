import { Section } from "./Section";

const ROLES = [
  {
    period: "2021 – present",
    institution: "GreatLearning",
    role: "Instructor",
    description:
      "Developed and taught courses in AI and data science. Managed diverse classroom settings.",
  },
  {
    period: "2025",
    institution: "University Canada West",
    role: "Lecturer, MBA Program",
    courses: [
      "BUSI 654 Application of AI in Business",
      "CMPT 641 Digital Transformation",
      "BUSI 653 Cloud Computing Technologies",
    ],
  },
  {
    period: "2023",
    institution: "HEC Montreal",
    role: "Lecturer, Master's and PhD course",
    courses: [
      "MATH 60629A Machine Learning I: Large-Scale Data Analysis and Decision Making",
    ],
  },
];

const SITES = [
  {
    title: "Introduction to Marketing",
    href: "/courses/intro-marketing",
    description:
      "What is Marketing? How do we define a consumer? What strategies firms adopt to influence consumption decisions?",
  },
  {
    title: "Applications of AI in Business",
    href: "/courses/ai-in-business",
    description:
      "Hands-on course covering LLMs, prompt engineering, deep learning for NLP and computer vision, and how to evaluate AI tools for real business problems. Designed for MBA and graduate students.",
  },
  {
    title: "Digital Transformation",
    href: "/courses/digital-transformation",
    description:
      "Covers how organizations adopt new technologies, manage the transition, and measure outcomes. Topics include platform business models, data-driven decision-making, and technology adoption frameworks.",
  },
  {
    title: "Consumer Behavior",
    href: "/courses/consumer-behavior",
    description:
      "Why people buy, use, and discard products. Perception, learning and memory, motivation, attitudes, decision-making, and the heuristics behind everyday choices.",
  },
];

export function Teaching() {
  return (
    <Section id="teaching" title="Teaching">
      <ol className="divide-y divide-rule">
        {ROLES.map((r) => (
          <li
            key={r.institution}
            className="grid gap-1 py-6 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
          >
            <p className="meta pt-1">{r.period}</p>
            <div>
              <h3 className="text-lg md:text-xl">{r.institution}</h3>
              <p className="text-sm text-ink-3">{r.role}</p>
              {r.courses && (
                <ul className="mt-3 space-y-1">
                  {r.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              )}
              {r.description && <p className="mt-3">{r.description}</p>}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 bg-paper-2 p-6 md:p-8">
        <p className="meta mb-5">Course websites</p>
        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-x-10">
          {SITES.map((s) => (
            <li key={s.href}>
              <h3 className="text-lg leading-snug">
                <a href={s.href} className="link">
                  {s.title}
                </a>
              </h3>
              <p className="mt-2 text-sm">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
