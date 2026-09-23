export type Week = {
  slug: string;
  title: string;
  topics: string[];
};

export const COURSE_WEEKS: Week[] = [
  {
    slug: "week1",
    title: "Introduction to Marketing & The Marketing Process",
    topics: [
      "Definition and evolution of marketing.",
      "Needs, wants, and demands.",
      "The marketing process and creating customer value.",
    ],
  },
  {
    slug: "week2",
    title: "The Marketing Environment and Ethics",
    topics: [
      "Micro and macro-environmental factors (PESTLE).",
      "Corporate Social Responsibility (CSR).",
      "Ethical considerations in marketing practices.",
    ],
  },
  {
    slug: "week3",
    title: "Consumer Behavior",
    topics: [
      "The consumer decision-making process.",
      "Psychological, social, and cultural influences on buying behavior.",
      "B2C vs B2B purchasing differences.",
    ],
  },
  {
    slug: "week4",
    title: "Business-to-Business (B2B) Marketing",
    topics: [
      "Characteristics of B2B markets.",
      "The organizational buying center.",
      "Relationship marketing and key account management.",
    ],
  },
  {
    slug: "week5",
    title: "Marketing Research and Data Analytics",
    topics: [
      "The marketing research process.",
      "Primary vs. secondary data.",
      "The role of data analytics and customer insights in decision making.",
    ],
  },
  {
    slug: "week6",
    title: "Segmentation, Targeting, and Positioning (STP)",
    topics: [
      "Bases for segmenting consumer and business markets.",
      "Evaluating and selecting target markets.",
      "Developing a compelling value proposition and positioning strategy.",
    ],
  },
  {
    slug: "week7",
    title: "Product and Service Strategies (The First P)",
    topics: [
      "Product classifications and the product life cycle (PLC).",
      "New product development process.",
      "Branding, packaging, and the unique characteristics of services.",
    ],
  },
  {
    slug: "week8",
    title: "Pricing Strategies (The Second P)",
    topics: [
      "Factors affecting pricing decisions.",
      "Cost-based, value-based, and competition-based pricing.",
      "Pricing strategies for new products and product mixes.",
    ],
  },
  {
    slug: "week9",
    title: "Supply Chain and Distribution Channels (The Third P)",
    topics: [
      "The nature and importance of marketing channels.",
      "Channel behavior and organization.",
      "Retailing, wholesaling, and logistics management.",
    ],
  },
  {
    slug: "week10",
    title: "Integrated Marketing Communications (The Fourth P)",
    topics: [
      "The promotion mix: Advertising, PR, Sales Promotion, Personal Selling.",
      "Designing an integrated marketing communications (IMC) strategy.",
      "Setting the promotional budget and measuring effectiveness.",
    ],
  },
  {
    slug: "week11",
    title: "Digital and Social Media Marketing",
    topics: [
      "The shift from traditional to digital marketing.",
      "SEO, SEM, content marketing, and email marketing.",
      "Leveraging social media platforms for customer engagement.",
    ],
  },
  {
    slug: "week12",
    title: "Global Marketing and the Future of Marketing",
    topics: [
      "Deciding whether to go global and market entry strategies.",
      "Standardized vs. adapted global marketing mixes.",
      "Emerging trends: AI in marketing, sustainability, and immersive experiences.",
    ],
  },
];
