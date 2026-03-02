// All portfolio content in one place for easy editing
import publications from "./publications.json";
import courses from "./courses.json";
import service from "./service.json";

export const portfolioData = {
  hero: {
    badge: "Academic & Technologist",
    name: "Davood Wadi",
    description: [
      { type: "text", text: "Bridging " },
      { type: "highlight", text: "Academic Rigor", color: "white" },
      { type: "text", text: ", " },
      { type: "highlight", text: "AI Innovation", color: "accent" },
      { type: "text", text: ", and " },
      { type: "highlight", text: "Market Strategy", color: "white" },
      { type: "text", text: "." },
    ],
    buttons: [
      {
        label: "Explore Work",
        href: "#expertise",
        variant: "primary" as const,
      },
      {
        label: "Let's Connect",
        href: "#contact",
        variant: "secondary" as const,
      },
    ],
  },

  about: {
    heading: "The Intersection of",
    headingAccent: "Thought & Action",
    paragraphs: [
      "I am an academic and technologist specializing in the intersection of artificial intelligence, machine learning, and quantitative marketing. My academic journey culminated in a Ph.D. in Marketing with a specialization in Artificial Intelligence from HEC Montreal, where my research received honors including the IVADO PhD Excellence Scholarship and a finalist position for the Best Thesis Award.",
      "By demystifying AI capabilities, I help organizations craft future-proof strategies while contributing to the foundational science through rigorous peer-reviewed research.",
    ],
    portrait: {
      src: "/portrait.png",
      alt: "Davood Wadi",
    },
  },

  expertise: {
    title: "Domains of Expertise",
    description:
      "A trifecta of skills driving innovation and strategic growth in academic and commercial environments.",
    domains: [
      {
        title: "Academic Researcher",
        description:
          "Executing rigorous, peer-reviewed research analyzing LLM behavioral traits and applying quantitative methodologies to marketing strategy.",
        items: [
          "Conference Proceedings (EMNLP)",
          "Scientific Peer Reviewer",
          "Curriculum Development",
        ],
        iconType: "graduation-cap" as const,
      },
      {
        title: "AI Scientist",
        description:
          "Developing robust models encompassing Generative frameworks, Monte-Carlo sampling, and deep evaluation techniques of foundational language architectures.",
        items: [
          "LLM Evaluation",
          "Monte-Carlo Sampling",
          "Gradient Descent Optimization",
        ],
        iconType: "monitor" as const,
      },
      {
        title: "Marketing Strategist",
        description:
          "Translating complex capabilities into real-world business advantages. Architecting data-driven consumer behavior strategies leveraging neural inputs.",
        items: [
          "AI Adoption Strategies",
          "Predictive Analytics",
          "Consumer Modeling",
        ],
        iconType: "pie-chart" as const,
      },
    ],
  },

  publications: {
    researchTitle: "Selected Research",
    researchDescription: "Recent papers and journal articles.",
    papers: publications,
    courses,
    service,
  },

  contact: {
    heading: "Let's Connect",
    description:
      "Whether you are interested in academic collaboration, consulting insights tailored to market nuances, or speaking engagements, I am continuously open to exploring new frontiers.",
    email: {
      address: "davood.wadi@hec.ca",
      label: "Email",
    },
    social: [
      {
        href: "https://ca.linkedin.com/in/davoodwadi",
        label: "LinkedIn",
        svgPath:
          "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
      },
      {
        href: "https://scholar.google.com/citations?hl=en&user=6Djq9PYAAAAJ",
        label: "Google Scholar",
        svgPath:
          "M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 2.735c.152.086.331.135.516.135h1.293l-1.5 8.183h13.7l-1.5-8.183h1.293c.185 0 .364-.049.516-.135L24 9.5 12 0z",
      },
    ],
  },
};
