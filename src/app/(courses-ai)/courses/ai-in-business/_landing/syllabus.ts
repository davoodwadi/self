// Row copy for the BUSI 654 landing. Order matches the teaching sequence,
// including the Agentic AI interlude after Week 03.
//
// Descriptions for Weeks 02–06, 08 and 09 are the "Semester Roadmap" lines in
// 01-introduction/content.md with their leading "Week NN" dropped, since each
// row already carries its week. Week 01 uses its opening slide heading; Week 07
// uses its own title-slide subtitle so Indigeneity is not lost from "EDII".

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
    slug: "01-introduction",
    kind: "week",
    label: "Week 01",
    numeral: "01",
    title: "Course Overview and Foundations",
    description: "Why business leaders must understand AI.",
  },
  {
    slug: "02-ai-in-marketing",
    kind: "week",
    label: "Week 02",
    numeral: "02",
    title: "AI in Marketing and Consumer Behavior",
    description:
      "Explores marketing, demand sensing, dynamic personalization, and consumer behavior.",
  },
  {
    slug: "03-ai-in-finance",
    kind: "week",
    label: "Week 03",
    numeral: "03",
    title: "AI in Finance",
    description:
      "Covers finance, credit scoring, algorithmic risk management, and fraud prevention.",
  },
  {
    slug: "agentic-ai",
    kind: "interlude",
    label: "New Paradigm",
    numeral: "",
    title: "Agentic AI and Vibe Coding",
    description:
      "Moving away from manual coding to autonomous agents and orchestration.",
  },
  {
    slug: "04-ai-in-human-resources",
    kind: "week",
    label: "Week 04",
    numeral: "04",
    title: "AI in Human Resources",
    description:
      "Examines human resources, talent acquisition, workforce planning, and organizational analytics.",
  },
  {
    slug: "05-ai-in-operations-supply-chain",
    kind: "week",
    label: "Week 05",
    numeral: "05",
    title: "AI in Operations and Supply Chain",
    description:
      "Focuses on operations, logistics, demand forecasting, and supply chain visibility.",
  },
  {
    slug: "06-ai-in-business-strategy",
    kind: "week",
    label: "Week 06",
    numeral: "06",
    title: "AI in Business Strategy",
    description:
      "Analyzes corporate strategy, competitive advantage, and data moats.",
  },
  {
    slug: "07-edii",
    kind: "week",
    label: "Week 07",
    numeral: "07",
    title: "EDII in AI",
    description: "Equity, Diversity, Inclusion, and Indigeneity in AI systems.",
  },
  {
    slug: "08-sustainability",
    kind: "week",
    label: "Week 08",
    numeral: "08",
    title: "Sustainability in AI",
    description:
      "Covers sustainability and the environmental footprint of computing.",
  },
  {
    slug: "09-product-development",
    kind: "week",
    label: "Week 09",
    numeral: "09",
    title: "AI in Product Development",
    description:
      "Examines product development and modern agentic engineering workflows.",
  },
];
