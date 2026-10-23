import React from "react";
import { ProgressBar } from "@/components/presentation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import exercisesData from "./exercises.json";

import {
  DECK_THEME,
  DeckNav,
  PosterHero,
  ChapterBand,
  Slide,
  Row,
  PlateWell,
  DiscussionList,
  DiscussionSlide,
  Summary,
} from "../_visuals/kit";
import { Conversation } from "../_visuals/objects";
import {
  HeroAcceptance,
  TamFlowDiagram,
  ExternalVariablesInteractive,
  TamBeliefsInteractive,
  BestBuyAssistantPlate,
  BestBuyFeatureTradeoff,
  BestBuyCatalogBridgePlate,
  HospitalTriageFlow,
  HospitalPeakSimulator,
  HospitalEhrIntegrationPlate,
  IkeaKioskReturn,
  IkeaKioskStepsPlate,
  UtautSynthesisPlate,
  UtautModelInteractive,
  IkeaUtautDriversPlate,
  IkeaModeratorsInteractive,
  IotLoopInteractive,
  IotSecurityPractices,
  IotDeviceLifecycle,
  CloudComputingHub,
  EdgeFogCloudInteractive,
  ArchitectureStackInteractive,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "TAM" },
  { id: "ch2", label: "Applications of TAM" },
  { id: "ch3", label: "UTAUT" },
  { id: "ch4", label: "IoT, Cloud, Edge & Fog" },
  { id: "conclusion", label: "Conclusion" },
];

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/* Body copy: the reading serif; terms set bold in the display serif. */
const BODY = "font-body text-base md:text-[1.06rem] leading-[1.6] [&_strong]:font-heading [&_strong]:font-bold";
const SMALL = "font-body text-[0.95rem] leading-[1.5] [&_strong]:font-heading [&_strong]:font-bold";
const LIST =
  "list-none flex flex-col gap-1 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rotate-45 [&>li]:before:shrink-0 [&>li]:before:bg-[var(--dt-ink)]";
const SUB = "font-accent font-bold uppercase tracking-[0.2em] text-[0.68rem]";

function Bullets({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`${LIST} ${className}`}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Step({ n, name, children }: { n: number; name: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
      <p className="font-heading font-bold text-lg leading-tight mb-2 flex items-baseline gap-2.5">
        <span className="font-accent text-base">{n}.</span>
        <span>{name}</span>
      </p>
      {children}
    </div>
  );
}

export default function DigitalTransformationWeek4() {
  return (
    <main className="relative w-full overflow-x-hidden min-h-screen font-body" style={DECK_THEME}>
      <ProgressBar />
      <DeckNav sections={SECTIONS} />
      <Link
        href="/courses/digital-transformation"
        className="fixed top-3 left-3 z-50 flex items-center justify-center w-10 h-10 text-[var(--ink-3)] hover:text-[var(--dt-signal)] transition-colors duration-300"
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <PosterHero
        category="WEEK 04 — DIGITAL TRANSFORMATION"
        title="TAM, UTAUT, IoT, Cloud, Edge, Fog"
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "Discuss technology acceptance models: TAM, UTAUT",
          "Difference between IoT, Cloud, Edge, and Fog Computing",
          "Conclusion",
          "Q&A",
        ]}
        plate={<HeroAcceptance />}
      />

      {/* ================================================================
          CHAPTER 1 — TECHNOLOGY ACCEPTANCE MODEL (TAM)
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="Technology Acceptance Model (TAM)" />

      <DiscussionList
        id="question-opening"
        questions={[
          "Think of a time you adopted a new app or tool (e.g., TikTok, Zoom, ChatGPT, a fitness tracker). What specific factors convinced you to use it? Was it because it solved a problem quickly, was easy to learn, or because peers recommended it? If you avoided a tool (e.g., Twitter/X, a new software update), what turned you off?",
          "Did you care more about how intuitive it was or how much value it added? For example, did you stick with Instagram Reels because it felt familiar, or switch to TikTok for better features?",
        ]}
        plate={<Conversation left={1} right={6} />}
      />

      <Slide id="technology-acceptance-model-tam" label="THEORETICAL FRAMEWORK" title="Technology Acceptance Model (TAM)">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-6 md:gap-10`}>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
            The Technology Acceptance Model (TAM) is a theoretical framework that helps to <em>explain</em> and{" "}
            <em>predict</em> how users come to <strong className="text-[var(--dt-signal)]">accept and use</strong> a
            technology.
          </p>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
            Developed by Fred Davis in 1986, TAM is widely used in <em>information systems</em> research to understand
            user behavior regarding technology adoption.
          </p>
        </div>
        <PlateWell>
          <TamFlowDiagram />
        </PlateWell>
      </Slide>

      <Slide
        id="components-of-tam-external-variables"
        label="COMPONENTS OF TAM"
        title="Components of TAM: External Variables"
      >
        <Row cols="lg:grid-cols-[1.35fr_1fr]" className="!items-start">
          <div className="flex flex-col gap-4">
            <div className={`${BODY} text-lg border-l-[5px] border-[var(--dt-signal)] pl-4`}>
              <p>
                <strong>External variables</strong>: Factors outside the model that influence{" "}
                <strong>perceived usefulness (U)</strong> and <strong>perceived ease of use (E)</strong>.
              </p>
            </div>
            <ol className={`${BODY} flex flex-col divide-y-2 divide-[var(--dt-ink)] border-y-[4px] border-[var(--dt-ink)]`}>
              {[
                {
                  n: 1,
                  name: "System Features:",
                  body: (
                    <>
                      The <strong>functionality</strong>, <strong>design</strong>, and <strong>interface</strong> of the
                      technology.
                    </>
                  ),
                },
                {
                  n: 2,
                  name: "User Characteristics:",
                  body: (
                    <>
                      <strong>Age</strong>, <strong>education</strong>, <strong>prior experience</strong>, or{" "}
                      <strong>computer self-efficacy</strong>.
                    </>
                  ),
                },
                {
                  n: 3,
                  name: "Social Influence:",
                  body: (
                    <>
                      <strong>Peer pressure</strong>, <strong>organizational culture</strong>, or{" "}
                      <strong>support from leadership</strong>.
                    </>
                  ),
                },
                {
                  n: 4,
                  name: "Training and Support:",
                  body: (
                    <>
                      Availability of <strong>resources to help</strong> users understand the system.
                    </>
                  ),
                },
                {
                  n: 5,
                  name: "Task Characteristics:",
                  body: (
                    <>
                      <strong>Complexity</strong> and <strong>relevance</strong> of the tasks the technology is designed
                      to support.
                    </>
                  ),
                },
              ].map((item) => (
                <li key={item.n} className="grid sm:grid-cols-[13.5rem_1fr] gap-x-4 gap-y-1 py-2.5 items-baseline">
                  <p className="font-heading font-bold text-lg flex items-baseline gap-2.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[var(--dt-ink)] text-[var(--dt-cream)] font-accent text-xs shrink-0">
                      {item.n}
                    </span>
                    <span>{item.name}</span>
                  </p>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <PlateWell>
            <ExternalVariablesInteractive />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="components-of-tam-beliefs-attitude-and-intention"
        label="COMPONENTS OF TAM"
        title="Components of TAM: Beliefs, Attitude, and Intention"
        exercise={exercise["components-of-tam-beliefs-attitude-and-intention"]}
      >
        <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
          <Step n={1} name="Perceived Usefulness (PU):">
            <Bullets
              items={[
                <>
                  The degree to which a person believes that using a particular technology will enhance their{" "}
                  <strong>job performance or productivity</strong>.
                </>,
                <>
                  If users perceive a technology as useful, they are <strong>more likely</strong> to adopt it.
                </>,
              ]}
            />
          </Step>
          <Step n={2} name="Perceived Ease of Use (PEOU):">
            <Bullets
              items={[
                <>
                  This is the degree to which a person believes that using a technology will be{" "}
                  <strong>free of effort</strong>.
                </>,
                <>
                  If a technology is easy to use, users are <strong>more likely</strong> to accept and utilize it.
                </>,
              ]}
            />
          </Step>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <p className="font-heading font-bold text-lg leading-tight mb-2">
              <strong>Attitude Toward Use</strong>:
            </p>
            <Bullets
              items={[
                <>
                  <strong>Determined by</strong> perceived usefulness and perceived ease of use
                </>,
                <>
                  A positive attitude can lead to a higher likelihood of <strong>technology adoption</strong>.
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <p className="font-heading font-bold text-lg leading-tight mb-2">
              <strong>Behavioral Intention to Use</strong>:
            </p>
            <p>The attitude toward use affects the behavioral intention to use the technology.</p>
          </div>
        </div>
        <PlateWell>
          <TamBeliefsInteractive />
        </PlateWell>
      </Slide>

      {/* ================================================================
          CHAPTER 2 — APPLICATIONS OF TAM
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Applications of TAM" />

      <Slide
        id="example-application-of-tam-in-e-commerce"
        label="CASE STUDY 01 — E-COMMERCE"
        title="Example: Application of TAM in E-Commerce"
      >
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-6 border-b-[4px] border-[var(--dt-ink)] pb-4`}>
          <p>
            <strong>BestBuy</strong> is introducing a new <em>AI-powered virtual shopping assistant</em> to improve the
            online shopping experience.
          </p>
          <p>
            The <strong>Technology Acceptance Model (TAM)</strong> can be applied to analyze how customers adopt this
            technology.
          </p>
        </div>
        <Row cols="lg:grid-cols-[1fr_1.35fr]" className="!items-center">
          <PlateWell>
            <BestBuyAssistantPlate />
          </PlateWell>
          <div>
            <p className={`${SUB} mb-3 text-[var(--dt-signal)]`}>External Variables</p>
            <div className={`${BODY} grid sm:grid-cols-2 gap-5`}>
              <Step n={1} name="System Features:">
                <p>
                  The virtual assistant provides <strong>personalized product recommendations</strong> and fast
                  responses.
                </p>
              </Step>
              <Step n={2} name="User Characteristics:">
                <p>
                  Target audience includes <strong>tech-savvy millennials</strong> who are comfortable using AI-based
                  tools.
                </p>
              </Step>
              <Step n={3} name="Social Influence:">
                <p>
                  <strong>Online reviews</strong> and <strong>endorsements</strong> by influencers promote the virtual
                  assistant.
                </p>
              </Step>
              <Step n={4} name="Training and Support:">
                <p>
                  <strong>Tutorials</strong> and <strong>FAQs</strong> are provided to educate users on how to use the
                  assistant.
                </p>
              </Step>
            </div>
          </div>
        </Row>
      </Slide>

      <Slide
        id="tam-for-bestbuy-adoption-and-benefits"
        label="TAM FOR BESTBUY"
        title="TAM for BestBuy: Adoption and Benefits"
        exercise={exercise["tam-for-bestbuy-adoption-and-benefits"]}
      >
        <div className={`${SMALL} grid md:grid-cols-3 gap-6`}>
          <div className="flex flex-col gap-4">
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <p className="font-heading font-bold text-lg mb-1.5">Perceived Ease of Use (U)</p>
              <Bullets
                items={[
                  <>
                    Do users believe the assistant is <strong>easy to interact with</strong> due to its intuitive chat
                    interface?
                  </>,
                  <>Should we add voice commands?</>,
                  <>How is adding more features reducing the ease of use?</>,
                ]}
              />
            </div>
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <p className="font-heading font-bold text-lg mb-1.5">Perceived Usefulness (E)</p>
              <Bullets
                items={[
                  <>
                    Do customers find the assistant helpful because it <strong>saves time</strong> by suggesting
                    relevant products and streamlining the shopping process?
                  </>,
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <p className="font-heading font-bold text-lg mb-1.5">Attitude Toward Using (A)</p>
              <p>
                Do positive perceptions of usefulness and ease of use lead customers to{" "}
                <strong>feel favorable</strong> toward using the virtual assistant?
              </p>
            </div>
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <p className="font-heading font-bold text-lg mb-1.5">Behavioral Intention to Use (B)</p>
              <p>
                Because of their positive attitude, do customers <strong>intend</strong> to use the assistant in their
                future shopping activities?
              </p>
            </div>
            <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <p className="font-heading font-bold text-lg mb-1.5">Actual System Use</p>
              <p>
                Over time, do users actively use the virtual assistant to explore and purchase products on the
                e-commerce platform?
              </p>
            </div>
          </div>

          <div className="border-t-[4px] border-[var(--dt-signal)] pt-3">
            <p className="font-heading font-bold text-lg mb-3 text-[var(--dt-signal)]">
              Measuring Benefits of Technology
            </p>
            <ol className="flex flex-col gap-3">
              {[
                <>
                  Increased <strong>customer satisfaction</strong> due to a smoother shopping experience?
                </>,
                <>
                  Higher <strong>conversion rates</strong> as customers are more likely to complete purchases?
                </>,
                <>
                  Enhanced <strong>brand loyalty</strong> as users find the platform innovative and user-friendly?
                </>,
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-heading font-bold text-xl text-[var(--dt-signal)] shrink-0">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <PlateWell>
          <BestBuyFeatureTradeoff />
        </PlateWell>
      </Slide>

      <Slide
        id="bestbuy-discussion-and-research-questions"
        label="CLASS DISCUSSION — BESTBUY"
        title="Discussion & Research Questions"
      >
        <Row cols="lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-6">
            <div>
              <p className={`${SUB} mb-2`}>Discussion Questions</p>
              <ol className="flex flex-col">
                {[
                  <>
                    How can perceived ease of use be improved for users who are <strong>less tech-savvy</strong>?
                    (Minority group)
                  </>,
                  <>
                    What <strong>additional features</strong> could make the virtual shopping assistant more useful?
                  </>,
                  <>
                    How can social influence, such as <strong>peer reviews</strong>, be leveraged to encourage adoption?
                  </>,
                ].map((q, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 py-4 border-t-[3px] border-[var(--dt-ink)] first:border-t-0"
                  >
                    <span className="font-heading font-bold text-3xl leading-none w-7 shrink-0">{i + 1}</span>
                    <span className="font-heading font-bold text-xl leading-snug">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t-[4px] border-[var(--dt-signal)] pt-4">
              <p className={`${SUB} text-[var(--dt-signal)] mb-2`}>Research Questions</p>
              <div className="flex items-start gap-5">
                <span className="font-heading font-bold text-3xl leading-none text-[var(--dt-signal)] w-7 shrink-0">
                  4
                </span>
                <p className="font-heading font-bold text-xl leading-snug">
                  What AI tool can be incorporated to give the chatbot access to BestBuy&apos;s product catalog and
                  manuals?
                </p>
              </div>
            </div>
          </div>
          <PlateWell>
            <BestBuyCatalogBridgePlate />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="example-tam-for-ai-chatbots-in-a-hospital"
        label="CASE STUDY 02 — HEALTHCARE"
        title="Example: TAM for AI Chatbots in a Hospital"
      >
        <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
          {[
            <>
              A hospital adopts an AI-powered chatbot to assist patients in <strong>triage</strong>,
            </>,
            <>
              offering <strong>preliminary medical advice</strong>
            </>,
            <>
              determining whether they need <strong>urgent care</strong> or can manage their symptoms{" "}
              <strong>at home</strong>.
            </>,
            <>
              TAM can help evaluate how <em>staff</em> and <em>patients</em> accept this technology.
            </>,
          ].map((line, i) => (
            <p key={i} className="border-t-[3px] border-[var(--dt-ink)] pt-2.5">
              {line}
            </p>
          ))}
        </div>
        <div>
          <p className={`${SUB} mb-2 text-[var(--dt-signal)]`}>External Variables</p>
          <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
            <Step n={1} name="System Features:">
              <p>
                The chatbot uses natural language processing (NLP) to understand <strong>patient queries</strong> and
                provides <strong>accurate recommendations</strong> based on <em>medical databases</em>.
              </p>
            </Step>
            <Step n={2} name="User Characteristics:">
              <Bullets
                items={[
                  <>
                    <strong>Patients</strong> may range from <em>tech-savvy individuals</em> to{" "}
                    <em>older adults with limited technology experience</em>.
                  </>,
                  <>
                    <strong>Nurses</strong> may initially feel skeptical about its reliability.
                  </>,
                  <>
                    <strong>Medical doctors</strong> who feel threatened.
                  </>,
                ]}
              />
            </Step>
            <Step n={3} name="Social Influence:">
              <p>
                <strong>Healthcare professionals</strong> and <strong>community leaders</strong> endorse the chatbot,
                increasing <strong>trust</strong> among patients.
              </p>
            </Step>
            <Step n={4} name="Training and Support:">
              <p>
                Hospitals offer <strong>tutorials</strong> and <strong>demos</strong> to help <em>patients</em> and{" "}
                <em>staff</em> navigate the chatbot.
              </p>
            </Step>
          </div>
        </div>
        <PlateWell>
          <HospitalTriageFlow />
        </PlateWell>
      </Slide>

      <Slide
        id="tam-for-ai-chatbots-in-a-hospital-adoption-and-benefits"
        label="TAM FOR AI CHATBOTS IN A HOSPITAL"
        title="TAM for AI Chatbots in a Hospital: Adoption and Benefits"
        exercise={exercise["tam-for-ai-chatbots-in-a-hospital-adoption-and-benefits"]}
      >
        <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-5 gap-4`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1">Perceived Ease of Use (E)</p>
            <p>
              Patients find the chatbot user-friendly because of its <strong>simple interface</strong>,{" "}
              <strong>quick responses</strong>, and ability to handle <strong>non-technical language</strong>.
            </p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1">Perceived Usefulness (U)</p>
            <Bullets
              items={[
                <>
                  The chatbot <strong>reduces waiting times</strong> and improves patient outcomes by streamlining the
                  triage process.
                </>,
                <>
                  Medical staff find it useful as it filters <strong>non-urgent cases</strong>, allowing them to focus
                  on <strong>critical</strong> patients.
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1">Attitude Toward Using (A)</p>
            <p>
              Both patients and staff develop a <em>positive attitude</em> toward the chatbot, appreciating its
              efficiency and time-saving benefits.
            </p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1">Behavioral Intention to Use (BI)</p>
            <p>
              Due to their favorable attitude, patients and staff <em>intend to use</em> the chatbot regularly. Patients
              plan to consult it for initial assessments, while staff use its data to prioritize cases.
            </p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-signal)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1 text-[var(--dt-signal)]">Actual System Use</p>
            <p>
              The chatbot becomes widely used in the hospital, helping patients and supporting staff during{" "}
              <strong>peak hours</strong> or <strong>emergencies</strong>.
            </p>
          </div>
        </div>
        <Row cols="lg:grid-cols-[1fr_1.35fr]" className="!items-center">
          <PlateWell>
            <HospitalPeakSimulator />
          </PlateWell>
          <div className="border-[4px] border-[var(--dt-ink)] p-4 sm:p-5">
            <p className="font-heading font-bold text-lg mb-3 text-[var(--dt-signal)]">Benefits for the Hospital</p>
            <div className={`${SMALL} grid sm:grid-cols-3 gap-4`}>
              <Step n={1} name="Improved Patient Experience:">
                <p>Patients receive quicker responses and guidance for their symptoms.</p>
              </Step>
              <Step n={2} name="Optimized Staff Workload:">
                <p>Staff focus on urgent cases, improving care quality.</p>
              </Step>
              <Step n={3} name="Operational Efficiency:">
                <p>
                  Triage times are reduced, leading to better <em>resource allocation</em>.
                </p>
              </Step>
            </div>
          </div>
        </Row>
      </Slide>

      <Slide
        id="hospital-discussion-and-research-questions"
        label="CLASS DISCUSSION — HOSPITAL CHATBOT"
        title="Discussion & Research Questions"
      >
        <Row cols="lg:grid-cols-[1fr_1.4fr]">
          <PlateWell>
            <HospitalEhrIntegrationPlate />
          </PlateWell>
          <div className="flex flex-col gap-6">
            <div>
              <p className={`${SUB} mb-2`}>Discussion Questions</p>
              <ol className="flex flex-col">
                {[
                  "How can hospitals ensure the chatbot's ease of use for elderly patients or those with limited digital literacy?",
                  "What measures can be taken to build trust in the chatbot's reliability among medical staff?",
                  "How might the chatbot’s usefulness increase if integrated with electronic health records (EHRs)?",
                ].map((q, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 py-4 border-t-[3px] border-[var(--dt-ink)] first:border-t-0"
                  >
                    <span className="font-heading font-bold text-3xl leading-none w-7 shrink-0">{i + 1}</span>
                    <span className="font-heading font-bold text-xl leading-snug">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t-[4px] border-[var(--dt-signal)] pt-4">
              <p className={`${SUB} text-[var(--dt-signal)] mb-2`}>Research Question</p>
              <div className="flex items-start gap-5">
                <span className="font-heading font-bold text-3xl leading-none text-[var(--dt-signal)] w-7 shrink-0">
                  4
                </span>
                <p className="font-heading font-bold text-xl leading-snug">
                  What AI tool can help integrate electronic health records (EHRs) into the chatbot?
                </p>
              </div>
            </div>
          </div>
        </Row>
      </Slide>

      <Slide
        id="example-tam-for-ikeas-self-return-kiosk"
        label="CASE STUDY 03 — RETAIL SELF-SERVICE"
        title="Example: TAM for IKEA’s Self-Return Kiosk"
      >
        <div className={`${BODY} grid md:grid-cols-3 gap-5`}>
          <p className="border-t-[3px] border-[var(--dt-ink)] pt-3">
            IKEA has introduced a self-return kiosk at its stores
          </p>
          <p className="border-t-[3px] border-[var(--dt-ink)] pt-3">
            Customers <strong>should</strong> process product returns without staff assistance.
          </p>
          <p className="border-t-[3px] border-[var(--dt-ink)] pt-3">
            Let&apos;s apply TAM to understand how customers would accept this technology.
          </p>
        </div>
        <div>
          <p className={`${SUB} mb-2 text-[var(--dt-signal)]`}>External Variables</p>
          <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
            <Step n={1} name="System Features:">
              <p className="mb-1">The kiosk features</p>
              <Bullets items={["a touch screen,", "clear instructions,", "barcode scanner."]} />
            </Step>
            <Step n={2} name="User Characteristics:">
              <Bullets
                items={[
                  "Customers vary in their familiarity with self-service technologies,",
                  <>
                    from <em>tech-savvy individuals</em> to those who <em>prefer in-person interaction</em>.
                  </>,
                ]}
              />
            </Step>
            <Step n={3} name="Social Influence:">
              <p>
                <em>Other customers</em> using the kiosk successfully <em>influence</em> hesitant users to try it.
              </p>
            </Step>
            <Step n={4} name="Training and Support:">
              <p>
                <strong>On-screen guidance</strong> and <strong>staff nearby</strong> to assist reduce apprehension
                among first-time users.
              </p>
            </Step>
          </div>
        </div>
        <PlateWell>
          <IkeaKioskReturn />
        </PlateWell>
      </Slide>

      <Slide
        id="tam-for-ikeas-self-return-kiosk-adoption-and-benefits"
        label="TAM FOR IKEA’S SELF-RETURN KIOSK"
        title="TAM for IKEA’s Self-Return Kiosk: Adoption and Benefits"
        exercise={exercise["tam-for-ikeas-self-return-kiosk-adoption-and-benefits"]}
      >
        <Row cols="lg:grid-cols-[1.35fr_1fr]" className="!items-center">
          <div className={`${SMALL} flex flex-col gap-4`}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
                <p className="font-heading font-bold text-base mb-1">Perceived Ease of Use (E)</p>
                <p>
                  Customers find the kiosk intuitive due to its <strong>step-by-step instructions</strong>,{" "}
                  <strong>visual aids</strong>, and <strong>quick processing time</strong>.
                </p>
              </div>
              <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
                <p className="font-heading font-bold text-base mb-1">Perceived Usefulness (U)</p>
                <Bullets
                  items={[
                    <>
                      The kiosk eliminates <strong>waiting in line</strong>
                    </>,
                    <>
                      This is particularly beneficial during <strong>peak hours</strong>.
                    </>,
                  ]}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="border-t-[3px] border-[var(--dt-ink)] pt-2">
                <p className="font-heading font-bold text-base mb-1">Attitude Toward Using (A)</p>
                <p>
                  Customers to <strong>view</strong> the kiosk as an effective solution.
                </p>
              </div>
              <div className="border-t-[3px] border-[var(--dt-ink)] pt-2">
                <p className="font-heading font-bold text-base mb-1">Behavioral Intention to Use (BI)</p>
                <p>
                  Customers <strong>intend</strong> to use the kiosk for future returns and may{" "}
                  <strong>recommend</strong> it to others.
                </p>
              </div>
              <div className="border-t-[3px] border-[var(--dt-ink)] pt-2">
                <p className="font-heading font-bold text-base mb-1">Actual System Use</p>
                <p>
                  Over time, the kiosk sees increased adoption, with customers actively using it for returns, leading to
                  faster service times and reduced staff workload.
                </p>
              </div>
            </div>

            <div className="border-t-[4px] border-[var(--dt-signal)] pt-3">
              <p className="font-heading font-bold text-base mb-2 text-[var(--dt-signal)]">Benefits for IKEA</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <Step n={1} name="Enhanced Customer Experience:">
                  <p>
                    <strong>Faster returns</strong> process improves overall satisfaction.
                  </p>
                </Step>
                <Step n={2} name="Operational Efficiency:">
                  <p>
                    Staff focus on <strong>complex issues</strong> while routine returns are handled by the kiosk.
                  </p>
                </Step>
                <Step n={3} name="Cost Savings:">
                  <p>
                    Lower dependency on staff for <strong>simple returns</strong> reduces operational costs.
                  </p>
                </Step>
              </div>
            </div>
          </div>
          <PlateWell>
            <IkeaKioskStepsPlate />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="ikea-apprehension-and-discussion-questions"
        label="CLASS DISCUSSION — IKEA SELF-RETURN KIOSK"
        title="Apprehensions & Discussion Questions"
      >
        <Row cols="lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            <div className="border-l-[5px] border-[var(--dt-signal)] pl-4">
              <p className={`${SUB} text-[var(--dt-signal)] mb-1`}>Question</p>
              <p className="font-heading font-bold text-xl leading-snug">
                Think about your own experience: when forced to use a new technology in public what types of
                apprehensions do you face? How can these apprehensions be alleviated?
              </p>
            </div>
            <div>
              <p className={`${SUB} mb-2`}>Discussion Questions</p>
              <ol className="flex flex-col">
                {[
                  <>
                    What <strong>design elements</strong> can IKEA add to make the kiosk more accessible to older
                    customers?
                  </>,
                  <>
                    How can IKEA promote the kiosk to customers <strong>hesitant</strong> about using technology?
                  </>,
                  <>
                    What features could make the kiosk even more useful (e.g., integrating loyalty rewards during
                    returns)?
                  </>,
                ].map((q, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 py-3.5 border-t-[3px] border-[var(--dt-ink)] first:border-t-0"
                  >
                    <span className="font-heading font-bold text-3xl leading-none w-7 shrink-0">{i + 1}</span>
                    <span className="font-heading font-bold text-lg leading-snug">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <PlateWell>
            <Conversation left={3} right={9} />
          </PlateWell>
        </Row>
      </Slide>

      {/* ================================================================
          CHAPTER 3 — THE UNIFIED THEORY OF ACCEPTANCE AND USE OF TECHNOLOGY (UTAUT)
          ================================================================ */}
      <ChapterBand
        id="ch3"
        number="03"
        title="The Unified Theory of Acceptance and Use of Technology (UTAUT)"
      />

      <DiscussionSlide
        quote="Your company recently rolled out a new collaboration platform (e.g., Slack, Asana, or a mandatory AI tool). While TAM focuses on perceived usefulness and ease of use, what one factor outside of these two do you think most influenced adoption or resistance? For example, was it pressure from leadership, lack of training, or compatibility with existing workflows? Use a real-world case to argue why this factor mattered more than pure ‘usefulness’ or ‘ease of use’."
        author="Question"
        plate={<Conversation left={5} right={2} />}
      />

      <Slide
        id="the-unified-theory-of-acceptance-and-use-of-technology-utaut"
        label="THEORETICAL FRAMEWORK"
        title="The Unified Theory of Acceptance and Use of Technology (UTAUT)"
        exercise={exercise["the-unified-theory-of-acceptance-and-use-of-technology-utaut"]}
      >
        <div className={`${SMALL} grid md:grid-cols-3 gap-5 border-b-[4px] border-[var(--dt-ink)] pb-4`}>
          <p>
            The Unified Theory of Acceptance and Use of Technology (UTAUT) is a theoretical framework developed to
            understand the factors that influence individuals&apos; <strong>acceptance and use</strong> of technology.
          </p>
          <p>
            It was introduced by Venkatesh et al. in <strong>2003</strong>
          </p>
          <p>
            integrates elements from several existing models of technology acceptance: Technology Acceptance Model
            (TAM), Theory of Planned Behavior (TPB), Motivational Model.
          </p>
        </div>
        <Row cols="lg:grid-cols-[1fr_1.35fr]" className="!items-center">
          <PlateWell>
            <UtautSynthesisPlate />
          </PlateWell>
          <div>
            <p className="font-heading font-bold text-lg mb-3">
              <strong>Four</strong> primary constructs that significantly influence technology acceptance and usage:
            </p>
            <div className={`${SMALL} grid sm:grid-cols-2 gap-4`}>
              <Step n={1} name="Performance Expectancy:">
                <p>
                  How much the technology is perceived to <strong>enhance job performance</strong>.
                </p>
              </Step>
              <Step n={2} name="Effort Expectancy:">
                <p>
                  This construct reflects the <strong>ease of use</strong> associated with the technology.
                </p>
              </Step>
              <Step n={3} name="Social Influence:">
                <p>
                  How much individuals perceive that{" "}
                  <strong>important others (e.g., peers, family, or colleagues)</strong> believe they should use the new
                  technology.
                </p>
              </Step>
              <Step n={4} name="Facilitating Conditions:">
                <p>
                  The <strong>resources and support</strong> available to individuals for using the technology:
                  infrastructure, training, technical support.
                </p>
              </Step>
            </div>
          </div>
        </Row>
      </Slide>

      <Slide id="moderating-variables" label="UTAUT MODEL" title="Moderating Variables">
        <p className="font-heading font-bold text-xl text-[var(--dt-signal)]">
          What are <strong>moderators</strong> in a theoretical framework?
        </p>
        <div className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <p className="font-heading font-bold text-xl mb-1">Age:</p>
            <p>Different age groups may have varying levels of technology acceptance.</p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <p className="font-heading font-bold text-xl mb-1">Gender:</p>
            <p>Men and women may have different perceptions and attitudes toward technology.</p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <p className="font-heading font-bold text-xl mb-1">Experience:</p>
            <p>Prior experience with similar technologies can influence acceptance.</p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <p className="font-heading font-bold text-xl mb-1">Voluntariness of Use:</p>
            <p>Whether the use of the technology is mandatory or voluntary can affect acceptance.</p>
          </div>
        </div>
        <PlateWell>
          <UtautModelInteractive />
        </PlateWell>
      </Slide>

      <Slide id="utaut-for-ikeas-self-return-kiosk" label="CASE STUDY — UTAUT" title="UTAUT for IKEA's Self-Return Kiosk">
        <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1.5">Performance Expectancy</p>
            <p>
              Do customers believe the kiosk enhances efficiency by <strong>saving time</strong> and{" "}
              <strong>reducing waiting lines</strong>, especially during <strong>peak hours</strong>?
            </p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1.5">Effort Expectancy</p>
            <p>
              Is kiosk is perceived as <strong>easy to use</strong> due to its{" "}
              <strong>intuitive touch screen</strong>, <strong>step-by-step instructions</strong>, and{" "}
              <strong>visual aids</strong>?
            </p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1.5">Social Influence</p>
            <Bullets
              items={[
                <>
                  Observing <strong>other customers</strong> successfully using the kiosk encourages{" "}
                  <strong>hesitant users</strong> to try it.
                </>,
                <>
                  Positive <strong>word-of-mouth</strong> promotes trust in the system.
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1.5">Facilitating Conditions</p>
            <Bullets
              items={[
                <>
                  <strong>On-site support staff</strong> and <strong>clear guidance</strong> help users overcome
                  technical or usability challenges.
                </>,
                <>
                  <strong>Accessible design</strong> ensures inclusion for diverse user groups, such as those with
                  limited technology familiarity.
                </>,
              ]}
            />
          </div>
        </div>
        <PlateWell>
          <IkeaUtautDriversPlate />
        </PlateWell>
        <div className={`${SMALL} grid md:grid-cols-2 gap-6`}>
          <div className="border-t-[4px] border-[var(--dt-signal)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1 text-[var(--dt-signal)]">Behavioral Intention</p>
            <p>
              Customers show an <strong>intention to use</strong> the kiosk in the future and to{" "}
              <strong>recommend</strong> it to others based on their experience.
            </p>
          </div>
          <div className="border-t-[4px] border-[var(--dt-signal)] pt-2.5">
            <p className="font-heading font-bold text-base mb-1 text-[var(--dt-signal)]">Actual Use</p>
            <p>
              Over time, increased confidence and trust lead to <strong>higher adoption rates</strong>, resulting in{" "}
              <strong>streamlined operations</strong> and <strong>reduced staff workload</strong>.
            </p>
          </div>
        </div>
      </Slide>

      <Slide
        id="utaut-for-ikeas-self-return-kiosk-moderating-variables"
        label="UTAUT FOR IKEA'S SELF-RETURN KIOSK"
        title="Moderating Variables"
        exercise={exercise["utaut-for-ikeas-self-return-kiosk-moderating-variables"]}
      >
        <Row cols="lg:grid-cols-[1.35fr_1fr]" className="!items-center">
          <ol className={`${BODY} flex flex-col divide-y-2 divide-[var(--dt-ink)] border-y-[4px] border-[var(--dt-ink)]`}>
            {[
              {
                n: 1,
                name: "Age:",
                body: "Younger customers may adopt the kiosk more quickly due to greater familiarity with technology.",
              },
              {
                n: 2,
                name: "Gender:",
                body: "Gender may moderate attitudes, as studies show varying adoption rates across demographic groups.",
              },
              {
                n: 3,
                name: "Experience:",
                body: "Experienced users adapt to the kiosk faster, while first-time users may rely more on guidance and staff support.",
              },
              {
                n: 4,
                name: "Voluntariness of Use:",
                body: (
                  <>
                    If customers feel <strong>forced</strong> to use the kiosk (e.g., no alternative for returns),
                    satisfaction and adoption rates may be impacted.
                  </>
                ),
              },
              {
                n: 5,
                name: "Cultural Context:",
                body: (
                  <>
                    Acceptance may vary based on regional or cultural familiarity with{" "}
                    <strong>self-service technology</strong>.
                  </>
                ),
              },
            ].map((item) => (
              <li key={item.n} className="grid sm:grid-cols-[13.5rem_1fr] gap-x-4 gap-y-1 py-3 items-baseline">
                <p className="font-heading font-bold text-lg flex items-baseline gap-2.5">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[var(--dt-ink)] text-[var(--dt-cream)] font-accent text-xs shrink-0">
                    {item.n}
                  </span>
                  <span>{item.name}</span>
                </p>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
          <PlateWell>
            <IkeaModeratorsInteractive />
          </PlateWell>
        </Row>
      </Slide>

      {/* ================================================================
          CHAPTER 4 — INTRODUCTION TO IOT, CLOUD, EDGE, AND FOG COMPUTING
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Introduction to IoT, Cloud, Edge, and Fog Computing" />

      <Slide id="what-is-iot" label="INTERNET OF THINGS" title="What is IoT?">
        <div className={`${BODY} text-lg grid md:grid-cols-3 gap-6`}>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <strong>Internet of Things (IoT)</strong> refers to a network of <em>interconnected devices</em> that{" "}
            <strong className="text-[var(--dt-signal)]">collect, share, and act</strong> on data.
          </p>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            smart thermostats, wearable fitness trackers, and connected cars.
          </p>
          <div className="border-t-[4px] border-[var(--dt-signal)] pt-3">
            <p className={`${SUB} text-[var(--dt-signal)] mb-1`}>Discussion Question</p>
            <p className="font-heading font-bold text-lg leading-snug">
              How does IoT influence the way businesses interact with customers?{" "}
              <strong>Troubleshooting your fridge</strong>
            </p>
          </div>
        </div>
        <PlateWell>
          <IotLoopInteractive />
        </PlateWell>
      </Slide>

      <Slide
        id="iot-privacy-and-security"
        label="IOT PRIVACY AND SECURITY"
        title="IoT Privacy and Security"
        exercise={exercise["iot-privacy-and-security"]}
      >
        <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-5 gap-5`}>
          <Step n={1} name="Implement strong device authentication:">
            <p>
              Use robust authentication methods like two-factor authentication, biometrics, or digital certificates, and
              avoid default or weak passwords.
            </p>
          </Step>
          <Step n={2} name="Secure network communications:">
            <p>
              Encrypt data transmitted between IoT devices and back-end systems using secure protocols (e.g., TLS/SSL)
              and segment IoT devices on separate networks.
            </p>
          </Step>
          <Step n={3} name="Keep software and firmware updated:">
            <p>
              Regularly update IoT devices with the latest security patches and enable automatic updates when possible
              to protect against known vulnerabilities.
            </p>
          </Step>
          <Step n={4} name="Limit data collection and storage:">
            <p>
              Collect and store only the minimum necessary data for the IoT device to function, and anonymize or
              pseudonymize sensitive data to reduce the impact of potential breaches.
            </p>
          </Step>
          <Step n={5} name="Educate users on IoT security:">
            <p>
              Provide clear guidelines and training to users on securely setting up, configuring, and using IoT devices,
              and encourage them to report suspicious activities or potential vulnerabilities.
            </p>
          </Step>
        </div>
        <PlateWell>
          <IotSecurityPractices />
        </PlateWell>
      </Slide>

      <Slide
        id="iiot-and-iot-device-management-process"
        label="IIoT (Industrial Internet of Things)"
        title="IoT Device Management Process"
        exercise={exercise["iiot-and-iot-device-management-process"]}
      >
        <ol className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-5 gap-5`}>
          {[
            "Provisioning and Authentication",
            "Configuration and Control",
            "Monitoring and Diagnostics",
            "Software Updates and Maintenance",
            "Decommissioning",
          ].map((stage, i) => (
            <li key={stage} className="border-t-[4px] border-[var(--dt-ink)] pt-3">
              <p className="font-heading font-bold text-lg leading-snug">
                <span className="font-accent text-base mr-2 text-[var(--dt-signal)]">{i + 1}.</span>
                <strong>{stage}</strong>
              </p>
            </li>
          ))}
        </ol>
        <PlateWell>
          <IotDeviceLifecycle />
        </PlateWell>
      </Slide>

      <Slide id="what-is-cloud-computing" label="CLOUD COMPUTING" title="What is Cloud Computing?">
        <div className={`${BODY} text-lg grid md:grid-cols-3 gap-6`}>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <strong>Cloud computing</strong> delivers <strong>computing resources</strong> (storage, processing, and
            software) over the <strong>internet</strong>.
          </p>
          <div className="border-t-[4px] border-[var(--dt-ink)] pt-3">
            <p className="mb-2">Google Drive, Amazon Web Services (AWS).</p>
            <Bullets
              items={[
                <>
                  <strong>scalability</strong>
                </>,
                <>
                  <strong>remote access</strong>
                </>,
                <>
                  <strong>central data center</strong>.
                </>,
              ]}
            />
          </div>
          <div className="border-t-[4px] border-[var(--dt-signal)] pt-3">
            <p className={`${SUB} text-[var(--dt-signal)] mb-1`}>Discussion Question</p>
            <p className="font-heading font-bold text-xl leading-snug">
              What are the benefits and challenges of cloud computing for businesses?
            </p>
          </div>
        </div>
        <PlateWell>
          <CloudComputingHub />
        </PlateWell>
      </Slide>

      <Slide id="what-is-edge-and-fog-computing" label="DISTRIBUTED COMPUTING" title="What is Edge & Fog Computing?">
        <div className={`${BODY} grid md:grid-cols-2 gap-8`}>
          <div className="border-t-[5px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <h4 className="font-heading font-bold text-2xl">What is Edge Computing?</h4>
            <Bullets
              items={[
                <>
                  <strong>Edge computing</strong> processes data near its <strong>source</strong> (e.g., on{" "}
                  <em>IoT devices</em> or <em>local servers</em>).
                </>,
                <>
                  Reduces <strong>latency</strong> and <strong>bandwidth usage</strong>,
                </>,
                <>
                  critical for <strong>real-time tasks</strong> like autonomous vehicles.
                </>,
              ]}
            />
            <div className="mt-2 pt-3 border-t border-[var(--rule-2)]">
              <p className={`${SUB} text-[var(--dt-signal)] mb-1`}>Discussion Question</p>
              <p className="font-heading font-bold text-lg">
                In what scenarios is edge computing preferred over cloud computing?
              </p>
            </div>
          </div>

          <div className="border-t-[5px] border-[var(--dt-ink)] pt-4 flex flex-col gap-3">
            <h4 className="font-heading font-bold text-2xl">What is Fog Computing?</h4>
            <Bullets
              items={[
                <>
                  <strong>Fog computing</strong> acts as a <strong>bridge</strong> between cloud and edge computing.
                </>,
                <>
                  It distributes processing tasks across <strong>local networks</strong> (closer than cloud but farther
                  than edge).
                </>,
                <>
                  A factory uses fog to analyze <strong>machine data</strong> locally and send summaries to the cloud.
                </>,
              ]}
            />
            <div className="mt-2 pt-3 border-t border-[var(--rule-2)]">
              <p className={`${SUB} text-[var(--dt-signal)] mb-1`}>Discussion Question</p>
              <p className="font-heading font-bold text-lg">
                How does fog computing <strong>complement</strong> both cloud and edge computing?
              </p>
            </div>
          </div>
        </div>
        <PlateWell>
          <EdgeFogCloudInteractive />
        </PlateWell>
      </Slide>

      <Slide
        id="disambiguating-the-terms"
        label="ARCHITECTURE COMPARISON"
        title="Disambiguating the Terms"
        exercise={exercise["disambiguating-the-terms"]}
      >
        <Row cols="lg:grid-cols-[1.35fr_1fr]" className="!items-center">
          <div className="overflow-x-auto border-[4px] border-[var(--dt-ink)]">
            <table className="w-full text-left border-collapse font-body">
              <thead>
                <tr className="bg-[var(--dt-ink)] text-[var(--dt-cream)] font-heading text-lg">
                  <th className="py-3 px-4">Concept</th>
                  <th className="py-3 px-4">Definition</th>
                  <th className="py-3 px-4">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[var(--dt-ink)] text-base">
                <tr>
                  <td className="py-3 px-4 font-heading font-bold">IoT</td>
                  <td className="py-3 px-4">Devices connected to the internet that collect and transmit data.</td>
                  <td className="py-3 px-4">Smart home appliances</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-heading font-bold">Cloud</td>
                  <td className="py-3 px-4">Centralized data storage and processing over the internet.</td>
                  <td className="py-3 px-4">Data analytics for e-commerce</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-heading font-bold">Edge</td>
                  <td className="py-3 px-4">Localized data processing at or near the source.</td>
                  <td className="py-3 px-4">Autonomous vehicles</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-heading font-bold">Fog</td>
                  <td className="py-3 px-4">
                    Distributed processing between cloud and edge, closer to the local network.
                  </td>
                  <td className="py-3 px-4">Industrial IoT for manufacturing</td>
                </tr>
              </tbody>
            </table>
          </div>
          <PlateWell>
            <ArchitectureStackInteractive />
          </PlateWell>
        </Row>
      </Slide>

      <Summary
        id="conclusion"
        title="Conclusion"
        takeaways={[
          "Two models for technology acceptance (TAM, UTAUT)",
          "IoT",
          "Cloud, Fog, and Edge Computing",
        ]}
      />
    </main>
  );
}
