export type Week = {
  slug: string;
  title: string;
  blurb: string;
};

export const COURSE_WEEKS: Week[] = [
  {
    slug: "week1",
    title: "Research for Marketing Decisions",
    blurb:
      "The role of marketing research in managerial decision-making. Students translate management decision problems into research problems, examine the stages of the research process, and consider the ethical obligations of the researcher and the place of AI within the research workflow.",
  },
  {
    slug: "week2",
    title: "Research Design & Secondary Data",
    blurb:
      "Exploratory, descriptive, and causal research designs and the questions each can answer. The session evaluates internal, syndicated, and public data sources, distinguishes first-, second-, and third-party data, and assesses the reliability of AI-assisted desk research.",
  },
  {
    slug: "week3",
    title: "Qualitative Research",
    blurb:
      "Depth interviews, focus groups, projective techniques, and ethnographic methods. Students code qualitative data into themes, assess saturation, and compare AI-moderated interviewing and AI-assisted coding with human analysis.",
  },
  {
    slug: "week4",
    title: "Measurement & Questionnaire Design",
    blurb:
      "Levels of measurement, scaling techniques, and the reliability and validity of measures. The session addresses question wording, order effects, and response bias, and examines the use of AI in drafting and pretesting survey instruments.",
  },
  {
    slug: "week5",
    title: "Sampling & Data Collection",
    blurb:
      "Populations, sampling frames, and sampling error; probability and non-probability designs; and the determination of sample size. The session considers data quality in online panels and the validity of AI-generated synthetic respondents.",
  },
  {
    slug: "week6",
    title: "Data Preparation & Descriptive Analysis",
    blurb:
      "Data cleaning, coding, and the treatment of missing values, followed by descriptive statistics, cross-tabulation, and visualization for decision makers. Students also evaluate the accuracy of analyses produced by AI data assistants.",
  },
  {
    slug: "week7",
    title: "Hypothesis Testing & Group Differences",
    blurb:
      "The logic of statistical inference and tests of group differences, including t-tests, analysis of variance, and chi-square tests. The session distinguishes statistical from practical significance and addresses p-hacking, multiple comparisons, and reproducibility.",
  },
  {
    slug: "week8",
    title: "Experiments & A/B Testing",
    blurb:
      "The conditions for causal inference and the design of laboratory, field, and online experiments. Students assess internal and external validity, consider quasi-experimental alternatives, and examine simulated AI subjects and adaptive testing methods.",
  },
  {
    slug: "week9",
    title: "Regression & Marketing Response Models",
    blurb:
      "Linear and logistic regression as models of marketing response, with attention to interpretation, model fit, and multicollinearity. The session introduces marketing mix modeling and attribution and contrasts explanatory models with machine-learning prediction.",
  },
  {
    slug: "week10",
    title: "Segmentation, Positioning & Preference",
    blurb:
      "Factor analysis, perceptual mapping, cluster analysis, and conjoint analysis as tools for segmentation, positioning, and the measurement of willingness to pay. The session also examines embedding-based segmentation and the construction of personas with AI.",
  },
  {
    slug: "week11",
    title: "Customer Analytics & Predictive Modeling",
    blurb:
      "Customer lifetime value, RFM analysis, and the prediction of churn and response with tree-based and ensemble models. Students evaluate predictive performance and consider personalization, algorithmic bias, fairness, and model explainability.",
  },
  {
    slug: "week12",
    title: "Text Analytics, AI-Driven Insights & Reporting",
    blurb:
      "Online reviews and social media as sources of research data, analyzed through sentiment analysis, topic modeling, and classification with large language models. The course concludes with privacy and data protection, the communication of findings, and the future of the insights function.",
  },
];
