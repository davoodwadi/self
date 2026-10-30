// Row copy for the BUSI 654 landing. Ten-week teaching sequence from
// technical foundations to functional applications, strategy, and governance.

export type SyllabusEntry = {
  slug: string;
  kind: "week" | "interlude";
  label: string;
  numeral: string;
  title: string;
  description: string;
};

export const SYLLABUS: SyllabusEntry[] = [
  {
    slug: "week1",
    kind: "week",
    label: "Week 1",
    numeral: "1",
    title: "Foundations of AI and Machine Learning in Business",
    description:
      "Framing business decisions as prediction problems, predictive versus generative AI, and deep learning for unstructured data.",
  },
  {
    slug: "week2",
    kind: "week",
    label: "Week 2",
    numeral: "2",
    title: "Large Language Models, Prompting, and Agentic AI",
    description:
      "Foundation models, prompt engineering, retrieval-augmented generation, tool use, and autonomous multi-agent workflows.",
  },
  {
    slug: "week3",
    kind: "week",
    label: "Week 3",
    numeral: "3",
    title: "AI in Marketing and Consumer Behavior",
    description:
      "Demand sensing, dynamic personalization, recommender systems, and AI shopping agents acting on consumers' behalf.",
  },
  {
    slug: "week4",
    kind: "week",
    label: "Week 4",
    numeral: "4",
    title: "AI in Finance",
    description:
      "Credit scoring, algorithmic risk management, financial forecasting, and automated fraud detection.",
  },
  {
    slug: "week5",
    kind: "week",
    label: "Week 5",
    numeral: "5",
    title: "AI in Human Resources",
    description:
      "Talent acquisition, resume screening audits, workforce planning, skill augmentation, and organizational analytics.",
  },
  {
    slug: "week6",
    kind: "week",
    label: "Week 6",
    numeral: "6",
    title: "AI in Operations and Supply Chain",
    description:
      "Demand forecasting, inventory optimization, logistics routing, predictive maintenance, and supply chain visibility.",
  },
  {
    slug: "week7",
    kind: "week",
    label: "Week 7",
    numeral: "7",
    title: "AI in Product Development and Software Engineering",
    description:
      "Rapid prototyping, vibe coding, agentic software engineering workflows, and AI-assisted product discovery.",
  },
  {
    slug: "week8",
    kind: "week",
    label: "Week 8",
    numeral: "8",
    title: "AI in Business Strategy",
    description:
      "Corporate strategy, competitive advantage, data moats, build-versus-buy decisions, and evaluating AI return on investment.",
  },
  {
    slug: "week9",
    kind: "week",
    label: "Week 9",
    numeral: "9",
    title: "EDII, Fairness, and Responsible AI",
    description:
      "Equity, Diversity, Inclusion, and Indigeneity in AI systems, algorithmic bias, behavioral auditing, and governance.",
  },
  {
    slug: "week10",
    kind: "week",
    label: "Week 10",
    numeral: "10",
    title: "Sustainability and the Future of AI",
    description:
      "Environmental footprint of compute, energy and water trade-offs, green AI practices, and long-term organizational readiness.",
  },
];
