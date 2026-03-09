"use client";

import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Highlight,
  Tag,
  AnimatedList,
  ListItem,
  DiscussionCard,
  Citation,
  CitationProvider,
} from "@/app/(courses)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";
import FlowRenderer from "@/app/(courses)/_components/FlowRenderer";
import {
  transformativeShiftsFlow,
  divergentConvergentFlow,
  pinnsFlow,
  digitalTwinFlow,
  generativeLoopFlow,
} from "./flowcharts";
import {
  getCitation,
  getCitations,
  getCitationUrls,
} from "./deepResearchCitations";

import { useState } from "react";
import quizzesData from "./quizzes.json";

export default function ProductDevelopmentCourse() {
  const [bgReady, setBgReady] = useState(false);

  return (
    <div style={{ backgroundColor: "#c2c2c2", minHeight: "100vh" }}>
      <CitationProvider value={{ getCitation, getCitations, getCitationUrls }}>
        <SlideDeck
          background={
            <BackgroundManager
              type="product-development"
              onReady={() => setBgReady(true)}
            />
          }
        >
          <div
            style={{
              opacity: bgReady ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {/* Slide 1: Title */}
            <Slide>
              <Title>The Evolution of Product Development</Title>
              <Subtitle variant="hero">
                From Computer-Aided Design to Computer-Augmented Invention
              </Subtitle>
            </Slide>

            {/* Slide 2: The Paradigm Shift */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "the-paradigm-shift",
              )}
            >
              <Tag>Introduction</Tag>
              <Heading>The Paradigm Shift</Heading>
              <AnimatedList>
                <ListItem>
                  Product development is undergoing a{" "}
                  <Highlight>fundamental transformation</Highlight>.
                </ListItem>
                <ListItem>
                  Moving from isolated tasks to a reshaped lifecycle.
                </ListItem>
                <ListItem>
                  Covers the "fuzzy front end" of ideation to regulatory
                  compliance.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How does "augmented invention" differ from traditional "aided
                  design" in your view?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Slide 3: Three Transformative Shifts */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "three-transformative-shifts",
              )}
            >
              <Tag>Overview</Tag>
              <Heading>Three Transformative Shifts</Heading>
              <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl my-4">
                <FlowRenderer {...transformativeShiftsFlow} />
              </div>
              <AnimatedList>
                <ListItem>
                  From <Highlight>Simulation to Emulation</Highlight>: Dynamic,
                  self-learning models.
                </ListItem>
                <ListItem>
                  From Additive to Mainstream Generative Engineering: Beyond 3D
                  printing.
                </ListItem>
                <ListItem>
                  The Rise of Autonomous Compliance: Automated, code-level
                  governance.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Which of these three shifts poses the greatest challenge to
                  legacy organizations?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Part 1: AI-Driven Ideation */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "ai-driven-ideation",
              )}
            >
              <Tag>Part 1: Ideation</Tag>
              <Heading>AI-Driven Ideation</Heading>
              <AnimatedList>
                <ListItem>
                  Focusing on the "divergent" phase of design.
                </ListItem>
                <ListItem>
                  Large Language Models (LLMs) as{" "}
                  <Highlight>"ideation engines"</Highlight>.
                </ListItem>
                <ListItem>
                  Generating novel combinations rather than just retrieving
                  information.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Can LLMs truly be creative, or are they just recombining
                  existing concepts?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Divergent vs. Convergent Thinking */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "divergent-vs-convergent-thinking",
              )}
            >
              <Tag>Part 1: Ideation</Tag>
              <Heading>Divergent vs. Convergent Thinking</Heading>
              <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl my-4">
                <FlowRenderer {...divergentConvergentFlow} />
              </div>
              <AnimatedList>
                <ListItem>
                  LLMs excel at expanding the solution space ("persistence" and
                  "flexibility") <Citation ids={[1, 2]} />.
                </ListItem>
                <ListItem>
                  Better at "small ideas" (incremental) than "big ideas"
                  (paradigm shifts) <Citation ids={[2]} />.
                </ListItem>
                <ListItem>
                  Acting as co-creators to disrupt habitual thought patterns.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Where should human designers intervene in the LLM ideation
                  process?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Persona Simulation */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "persona-simulation",
              )}
            >
              <Tag>Part 1: Ideation</Tag>
              <Heading>Persona Simulation</Heading>
              <AnimatedList>
                <ListItem>
                  Simulating diverse user personas to stress-test concepts
                  (e.g., "skeptical CTO").
                </ListItem>
                <ListItem>
                  Tools like Figr parse live web apps to build context-aware
                  memory <Citation ids={[3, 4]} />.
                </ListItem>
                <ListItem>
                  Suggesting UX improvements grounded in specific design
                  systems.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  What are the risks of relying on simulated personas instead of
                  real users?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Predictive Market Trends */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "predictive-market-trends",
              )}
            >
              <Tag>Part 1: Ideation</Tag>
              <Heading>Predictive Market Trends</Heading>
              <AnimatedList>
                <ListItem>
                  Moving from reactive analytics to{" "}
                  <Highlight>predictive forecasting</Highlight>.
                </ListItem>
                <ListItem>
                  Identifying "white space" opportunities through unstructured
                  data analysis.
                </ListItem>
                <ListItem>
                  Tools like Glimpse track trends up to 12 months in advance{" "}
                  <Citation ids={[5]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How can companies distinguish between a temporary fad and a
                  sustainable trend using AI?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Uncovering Latent Needs */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "uncovering-latent-needs",
              )}
            >
              <Tag>Part 1: Ideation</Tag>
              <Heading>Uncovering Latent Needs</Heading>
              <AnimatedList>
                <ListItem>
                  Sentiment analysis on millions of conversations (Brandwatch,
                  Sprinklr) <Citation ids={[6]} />.
                </ListItem>
                <ListItem>
                  Detecting shifts in consumer preference missed by focus
                  groups.
                </ListItem>
                <ListItem>
                  Validating "product-market fit" using synthetic data{" "}
                  <Citation ids={[7]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Is synthetic data a valid substitute for real-world consumer
                  behavior?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Automated Competitor Analysis */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "automated-competitor-analysis",
              )}
            >
              <Tag>Part 1: Ideation</Tag>
              <Heading>Automated Competitor Analysis</Heading>
              <AnimatedList>
                <ListItem>
                  Autonomous agents replacing manual "battlecards".
                </ListItem>
                <ListItem>
                  Real-time scraping of documentation, pricing, and release
                  notes (Crayon, Klue) <Citation ids={[8, 9]} />.
                </ListItem>
                <ListItem>
                  Synthesizing fragmented data into actionable intelligence.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How does real-time competitive intelligence change strategic
                  planning cycles?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Part 2: Generative Design & Engineering */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "generative-design-engineering",
              )}
            >
              <Tag>Part 2: Engineering</Tag>
              <Heading>Generative Design & Engineering</Heading>
              <AnimatedList>
                <ListItem>
                  Transitioning from passive tools to active participants in
                  physics.
                </ListItem>
                <ListItem>
                  AI-driven Topology Optimization (TO) solving computational
                  hurdles.
                </ListItem>
                <ListItem>
                  Reducing optimization time from days to minutes (Diabatix
                  ColdStream) <Citation ids={[11, 12]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  What happens to the role of the engineer when AI optimizes the
                  geometry?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Mainstream Manufacturability */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "mainstream-manufacturability",
              )}
            >
              <Tag>Part 2: Engineering</Tag>
              <Heading>Mainstream Manufacturability</Heading>
              <AnimatedList>
                <ListItem>
                  Shifting from "design for additive" to{" "}
                  <Highlight>"design for all"</Highlight>.
                </ListItem>
                <ListItem>
                  Optimizing for traditional processes: casting, molding,
                  machining <Citation ids={[13, 14]} />.
                </ListItem>
                <ListItem>
                  Platforms like InfinitForm ensuring physical producibility.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Why has generative design historically been limited to 3D
                  printing?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Physics-Informed Neural Networks (PINNs) */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "physics-informed-neural-networks",
              )}
            >
              <Tag>Part 2: Engineering</Tag>
              <Heading>Physics-Informed Neural Networks</Heading>
              <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl my-4">
                <FlowRenderer {...pinnsFlow} />
              </div>
              <AnimatedList>
                <ListItem>
                  Embedding physical laws (Navier-Stokes) into neural networks{" "}
                  <Citation ids={[15, 16]} />.
                </ListItem>
                <ListItem>
                  Constraining AI to "obey physics" for accurate predictions
                  with sparse data <Citation ids={[17]} />.
                </ListItem>
                <ListItem>
                  Enabling "real-time simulation" without waiting for FEA
                  solvers <Citation ids={[18]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How do PINNs bridge the gap between data science and
                  mechanical engineering?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Synthetic Data for Engineering */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "synthetic-data-for-engineering",
              )}
            >
              <Tag>Part 2: Engineering</Tag>
              <Heading>Synthetic Data for Engineering</Heading>
              <AnimatedList>
                <ListItem>
                  Generating data when real-world collection is expensive or
                  dangerous.
                </ListItem>
                <ListItem>
                  Using GANs and VAEs for statistically accurate datasets{" "}
                  <Citation ids={[19, 20]} />.
                </ListItem>
                <ListItem>
                  Training computer vision and simulating edge cases.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  In what scenarios is synthetic data superior to real-world
                  data?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Data Privacy and Speed */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "data-privacy-and-speed",
              )}
            >
              <Tag>Part 2: Engineering</Tag>
              <Heading>Data Privacy and Speed</Heading>
              <AnimatedList>
                <ListItem>
                  Sharing datasets across borders without exposing IP.
                </ListItem>
                <ListItem>
                  Compliant with privacy regulations like GDPR{" "}
                  <Citation ids={[21]} />.
                </ListItem>
                <ListItem>
                  Accelerating development cycles through easier data access.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How does synthetic data mitigate privacy risks in global
                  engineering teams?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Part 3: Prototyping & Digital Twins */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "prototyping-digital-twins",
              )}
            >
              <Tag>Part 3: Prototyping</Tag>
              <Heading>Prototyping & Digital Twins</Heading>
              <AnimatedList>
                <ListItem>Bridging the physical-digital gap.</ListItem>
                <ListItem>
                  AI-guided rapid prototyping in Additive Manufacturing.
                </ListItem>
                <ListItem>
                  In-process correction using computer vision to reduce waste{" "}
                  <Citation ids={[22, 23]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  What is the economic impact of self-correcting 3D printers?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Parameter Optimization */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "parameter-optimization",
              )}
            >
              <Tag>Part 3: Prototyping</Tag>
              <Heading>Parameter Optimization</Heading>
              <AnimatedList>
                <ListItem>
                  Analyzing historical print data to suggest optimal slicing
                  parameters <Citation ids={[24]} />.
                </ListItem>
                <ListItem>
                  Removing "trial and error" from complex part printing.
                </ListItem>
                <ListItem>
                  Ensuring consistent quality across distributed manufacturing.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How does this capability enable decentralized manufacturing?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Cognitive Digital Twins */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "cognitive-digital-twins",
              )}
            >
              <Tag>Part 3: Prototyping</Tag>
              <Heading>Cognitive Digital Twins</Heading>
              <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl my-4">
                <FlowRenderer {...digitalTwinFlow} />
              </div>
              <AnimatedList>
                <ListItem>
                  Beyond static virtual replicas to semantic, reasoning models{" "}
                  <Citation ids={[25, 26]} />.
                </ListItem>
                <ListItem>
                  Using reinforcement learning to evolve over time.
                </ListItem>
                <ListItem>
                  Predicting failure modes and autonomously suggesting
                  maintenance <Citation ids={[25]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  At what point does a "twin" become an autonomous operator?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* VR and AI-Assisted UX */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "vr-and-ai-assisted-ux",
              )}
            >
              <Tag>Part 3: Prototyping</Tag>
              <Heading>VR and AI-Assisted UX</Heading>
              <AnimatedList>
                <ListItem>
                  Simulating user interactions in VR without human subjects.
                </ListItem>
                <ListItem>
                  Analyzing gaze patterns and biometrics to predict cognitive
                  load <Citation ids={[27]} />.
                </ListItem>
                <ListItem>
                  Testing ergonomics and UI flows before physical prototyping.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Can VR testing completely replace physical ergonomic testing?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Part 4: DfM & Supply Chain Integration */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "dfm-supply-chain-integration",
              )}
            >
              <Tag>Part 4: Supply Chain</Tag>
              <Heading>DfM & Supply Chain Integration</Heading>
              <AnimatedList>
                <ListItem>
                  Moving DfM from a final checkpoint to a continuous process.
                </ListItem>
                <ListItem>
                  AI-automated DfM checks (CoLab, DFMPro) flagging risks{" "}
                  <Citation ids={[28, 29]} />.
                </ListItem>
                <ListItem>
                  Learning from historical data to prevent recurring failures{" "}
                  <Citation ids={[30]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How does "continuous DfM" alter the engineering workflow?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Sustainable Material Selection */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "sustainable-material-selection",
              )}
            >
              <Tag>Part 4: Supply Chain</Tag>
              <Heading>Sustainable Material Selection</Heading>
              <AnimatedList>
                <ListItem>
                  AI discovery of new materials (Materials Nexus){" "}
                  <Citation ids={[31, 32]} />.
                </ListItem>
                <ListItem>
                  Identifying rare-earth-free or carbon-negative compositions.
                </ListItem>
                <ListItem>
                  Integrating with LCA databases for lower carbon footprints{" "}
                  <Citation ids={[33]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How critical is AI in achieving aggressive sustainability
                  targets?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Supply Chain Resilience */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "supply-chain-resilience",
              )}
            >
              <Tag>Part 4: Supply Chain</Tag>
              <Heading>Supply Chain Resilience</Heading>
              <AnimatedList>
                <ListItem>
                  Mapping multi-tier supply chains with AI (SCM Globe, Resilinc){" "}
                  <Citation ids={[34, 35]} />.
                </ListItem>
                <ListItem>
                  Alerting on obsolescence risks and geopolitical instability.
                </ListItem>
                <ListItem>
                  Predicting lead times and price fluctuations{" "}
                  <Citation ids={[36]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How should design teams weigh technical performance against
                  supply chain risk?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Part 5: Personalization & User-Centricity */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "personalization-user-centricity",
              )}
            >
              <Tag>Part 5: Personalization</Tag>
              <Heading>Personalization & User-Centricity</Heading>
              <AnimatedList>
                <ListItem>Achieving "mass customization" at scale.</ListItem>
                <ListItem>
                  Autonomous configuration for{" "}
                  <Highlight>"Lot Size 1"</Highlight> manufacturing{" "}
                  <Citation ids={[37, 38]} />.
                </ListItem>
                <ListItem>
                  Adjusting tooling and assembly for individual units.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Is "Lot Size 1" a realistic goal for all industries?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Generative Customization */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "generative-customization",
              )}
            >
              <Tag>Part 5: Personalization</Tag>
              <Heading>Generative Customization</Heading>
              <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl my-4">
                <FlowRenderer {...generativeLoopFlow} />
              </div>
              <AnimatedList>
                <ListItem>
                  Co-designing products with customers (e.g., custom shoe soles){" "}
                  <Citation ids={[39]} />.
                </ListItem>
                <ListItem>
                  AI ensuring user designs remain within manufacturable bounds.
                </ListItem>
                <ListItem>Democratizing the design process.</ListItem>
                <DiscussionCard title="Group Discussion">
                  What are the brand implications of allowing customers to
                  co-design?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* IoT Feedback Loops (Version 2.0) */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "iot-feedback-loops-version-2-0",
              )}
            >
              <Tag>Part 5: Personalization</Tag>
              <Heading>IoT Feedback Loops (Version 2.0)</Heading>
              <AnimatedList>
                <ListItem>
                  Closing the loop from usage telemetry to R&D.
                </ListItem>
                <ListItem>
                  Evidence-based iteration analyzing real-world patterns{" "}
                  <Citation ids={[40, 41]} />.
                </ListItem>
                <ListItem>
                  Autonomously addressing friction points in software or
                  hardware.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How do we balance data-driven design with user privacy?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Part 6: Ethics, Compliance & Standards */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "ethics-compliance-standards",
              )}
            >
              <Tag>Part 6: Ethics</Tag>
              <Heading>Ethics, Compliance & Standards</Heading>
              <AnimatedList>
                <ListItem>
                  Safety and ethics as paramount in physical AI.
                </ListItem>
                <ListItem>
                  Addressing ergonomic bias in historical datasets{" "}
                  <Citation ids={[27, 42]} />.
                </ListItem>
                <ListItem>
                  Using diverse virtual mannequins for inclusive design.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Who is responsible when a biased dataset leads to a physical
                  product failure?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Mitigation Tools */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "mitigation-tools",
              )}
            >
              <Tag>Part 6: Ethics</Tag>
              <Heading>Mitigation Tools</Heading>
              <AnimatedList>
                <ListItem>
                  Identifying bias in training datasets (Credo AI, IBM){" "}
                  <Citation ids={[43, 44]} />.
                </ListItem>
                <ListItem>
                  Ensuring equitable outcomes in generative design.
                </ListItem>
                <ListItem>
                  Algorithmic fairness as a core quality metric.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Should AI fairness be a standard engineering requirement?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Compliance Automation */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "compliance-automation",
              )}
            >
              <Tag>Part 6: Ethics</Tag>
              <Heading>Compliance Automation</Heading>
              <AnimatedList>
                <ListItem>
                  Navigating the EU AI Act for "high-risk" systems.
                </ListItem>
                <ListItem>
                  Automating documentation: model cards, risk assessments
                  (Vanta, Monitaur) <Citation ids={[45, 46]} />.
                </ListItem>
                <ListItem>
                  Tracing lineage for ISO/IEC 42001 compliance{" "}
                  <Citation ids={[47]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  How will regulation impact the speed of AI adoption in product
                  development?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Summary of Findings */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "summary-of-findings",
              )}
            >
              <Tag>Summary</Tag>
              <Heading>Summary of Findings</Heading>
              <AnimatedList>
                <ListItem>
                  AI maturing from experimental creativity to industrial
                  reliability.
                </ListItem>
                <ListItem>
                  Integration embedding into CAD physics and PLM logic.
                </ListItem>
                <ListItem>
                  Manufacturing awareness preventing unbuildable generative
                  designs.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Which of these maturation signs is most visible in your
                  industry?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Speed + Safety */}
            <Slide
              quizData={quizzesData.find((q) => q.slide_id === "speed-safety")}
            >
              <Tag>Summary</Tag>
              <Heading>Speed + Safety</Heading>
              <AnimatedList>
                <ListItem>
                  Convergence of rapid simulation and automated compliance.
                </ListItem>
                <ListItem>Regulatory checks occurring in real-time.</ListItem>
                <ListItem>Products developed faster AND safer.</ListItem>
                <DiscussionCard title="Group Discussion">
                  Can we truly have both speed and safety, or is there always a
                  trade-off?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Future Directions */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "future-directions",
              )}
            >
              <Tag>Future</Tag>
              <Heading>Future Directions</Heading>
              <AnimatedList>
                <ListItem>
                  The "Self-Healing" Design Loop: Autonomous detection and
                  fixing.
                </ListItem>
                <ListItem>
                  Interoperable AI Standards: Standardized data formats{" "}
                  <Citation ids={[48]} />.
                </ListItem>
                <ListItem>
                  Small Data Engineering: Robust models from sparse failure data{" "}
                  <Citation ids={[19]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  What are the barriers to achieving the "Self-Healing" Design
                  Loop?
                </DiscussionCard>
              </AnimatedList>
            </Slide>

            {/* Actionable Insights */}
            <Slide
              quizData={quizzesData.find(
                (q) => q.slide_id === "actionable-insights",
              )}
            >
              <Tag>Action</Tag>
              <Heading>Actionable Insights</Heading>
              <AnimatedList>
                <ListItem>
                  Adopt "AI-Augmented" Reviews (CoLab) <Citation ids={[28]} />.
                </ListItem>
                <ListItem>
                  Integrate Compliance Early (Credo AI) <Citation ids={[47]} />.
                </ListItem>
                <ListItem>
                  Invest in "Physical AI" Skills (PINNs context){" "}
                  <Citation ids={[15, 42]} />.
                </ListItem>
                <DiscussionCard title="Group Discussion">
                  Which insight will you prioritize for your organization?
                </DiscussionCard>
              </AnimatedList>
            </Slide>
          </div>
        </SlideDeck>
      </CitationProvider>
    </div>
  );
}
