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

/* Body copy in upright sans-serif. */
const BODY =
  "font-sans text-base md:text-[1.0625rem] leading-[1.6] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]";
const SMALL =
  "font-sans text-[0.95rem] leading-[1.55] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]";
const LIST =
  "list-none flex flex-col gap-1 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rounded-full [&>li]:before:shrink-0 [&>li]:before:bg-[var(--ink-3)]";
const SUB = "font-sans font-semibold text-sm tracking-normal text-[var(--ink-3)]";

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
    <div className="border-t border-[var(--dt-ink)]/15 pt-3">
      <p className="font-sans font-semibold text-base text-[var(--dt-ink)] leading-snug mb-2 flex items-baseline gap-2.5">
        <span className="font-sans font-medium text-xs text-[var(--ink-3)] tabular-nums">
          {String(n).padStart(2, "0")}
        </span>
        <span>{name}</span>
      </p>
      {children}
    </div>
  );
}

export default function DigitalTransformationWeek4() {
  return (
    <main className="relative w-full overflow-x-hidden min-h-screen font-sans" style={DECK_THEME}>
      <ProgressBar />
      <DeckNav sections={SECTIONS} />
      <Link
        href="/courses/digital-transformation"
        className="fixed top-3 left-3 z-50 flex items-center justify-center w-10 h-10 text-[var(--ink-3)] hover:text-[var(--dt-signal)] transition-colors duration-200"
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <PosterHero
        category="Week 4: Digital Transformation"
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
          CHAPTER 1: TECHNOLOGY ACCEPTANCE MODEL (TAM)
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="Technology Acceptance Model (TAM)" />

      <DiscussionList
        id="question-opening"
        questions={[
          "Think of a time you adopted a new app or tool (e.g., TikTok, Zoom, ChatGPT, a fitness tracker). What specific factors convinced you to use it? Was it because it solved a problem quickly, was easy to learn, or because peers recommended it? If you avoided a tool (e.g., Twitter/X, a new software update), what turned you off?",
          "Did you care more about how intuitive it was or how much value it added? For example, did you stick with Instagram Reels because it felt familiar, or switch to TikTok for better features?",
        ]}
      />

      <Slide id="technology-acceptance-model-tam" label="THEORETICAL FRAMEWORK" title="Technology Acceptance Model (TAM)">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-6 md:gap-10`}>
          <p className="border-t border-[var(--dt-ink)]/15 pt-4">
            The Technology Acceptance Model (TAM) is a theoretical framework that helps to explain and{" "}
            predict how users come to accept and use a
            technology.
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-4">
            Developed by Fred Davis in 1986, TAM is widely used in information systems research to understand
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
            <div className={`${BODY} text-lg border-l-2 border-[var(--dt-ink)]/25 pl-4`}>
              <p>
                <strong>External variables</strong>: Factors outside the model that influence{" "}
                perceived usefulness (U) and perceived ease of use (E).
              </p>
            </div>
            <ol className={`${BODY} flex flex-col divide-y divide-[var(--dt-ink)]/12 border-y border-[var(--dt-ink)]/15`}>
              {[
                {
                  n: 1,
                  name: "System Features:",
                  body: (
                    <>
                      The functionality, design, and interface of the
                      technology.
                    </>
                  ),
                },
                {
                  n: 2,
                  name: "User Characteristics:",
                  body: (
                    <>
                      Age, education, prior experience, or{" "}
                      computer self-efficacy.
                    </>
                  ),
                },
                {
                  n: 3,
                  name: "Social Influence:",
                  body: (
                    <>
                      Peer pressure, organizational culture, or{" "}
                      support from leadership.
                    </>
                  ),
                },
                {
                  n: 4,
                  name: "Training and Support:",
                  body: (
                    <>
                      Availability of resources to help users understand the system.
                    </>
                  ),
                },
                {
                  n: 5,
                  name: "Task Characteristics:",
                  body: (
                    <>
                      Complexity and relevance of the tasks the technology is designed
                      to support.
                    </>
                  ),
                },
              ].map((item) => (
                <li key={item.n} className="grid sm:grid-cols-[13.5rem_1fr] gap-x-4 gap-y-1 py-2.5 items-baseline">
                  <p className="font-sans font-bold text-lg flex items-baseline gap-2.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[var(--dt-ink)] text-[var(--dt-white)] font-sans text-xs shrink-0">
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
                  job performance or productivity.
                </>,
                <>
                  If users perceive a technology as useful, they are more likely to adopt it.
                </>,
              ]}
            />
          </Step>
          <Step n={2} name="Perceived Ease of Use (PEOU):">
            <Bullets
              items={[
                <>
                  This is the degree to which a person believes that using a technology will be{" "}
                  free of effort.
                </>,
                <>
                  If a technology is easy to use, users are more likely to accept and utilize it.
                </>,
              ]}
            />
          </Step>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className="font-sans font-bold text-lg leading-tight mb-2">
              <strong>Attitude Toward Use</strong>:
            </p>
            <Bullets
              items={[
                <>
                  Determined by perceived usefulness and perceived ease of use
                </>,
                <>
                  A positive attitude can lead to a higher likelihood of technology adoption.
                </>,
              ]}
            />
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className="font-sans font-bold text-lg leading-tight mb-2">
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
          CHAPTER 2: APPLICATIONS OF TAM
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Applications of TAM" />

      <Slide
        id="example-application-of-tam-in-e-commerce"
        label="CASE STUDY 01: E-COMMERCE"
        title="Example: Application of TAM in E-Commerce"
      >
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-6 border-b border-[var(--dt-ink)]/15 pb-4`}>
          <p>
            BestBuy is introducing a new AI-powered virtual shopping assistant to improve the
            online shopping experience.
          </p>
          <p>
            The Technology Acceptance Model (TAM) can be applied to analyze how customers adopt this
            technology.
          </p>
        </div>
        <Row cols="lg:grid-cols-[1fr_1.35fr]" className="!items-center">
          <PlateWell>
            <BestBuyAssistantPlate />
          </PlateWell>
          <div>
            <p className={`${SUB} mb-3`}>External Variables</p>
            <div className={`${BODY} grid sm:grid-cols-2 gap-5`}>
              <Step n={1} name="System Features:">
                <p>
                  The virtual assistant provides personalized product recommendations and fast
                  responses.
                </p>
              </Step>
              <Step n={2} name="User Characteristics:">
                <p>
                  Target audience includes tech-savvy millennials who are comfortable using AI-based
                  tools.
                </p>
              </Step>
              <Step n={3} name="Social Influence:">
                <p>
                  Online reviews and endorsements by influencers promote the virtual
                  assistant.
                </p>
              </Step>
              <Step n={4} name="Training and Support:">
                <p>
                  Tutorials and FAQs are provided to educate users on how to use the
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
            <div className="border-t border-[var(--dt-ink)]/15 pt-3">
              <p className="font-sans font-bold text-lg mb-1.5">Perceived Ease of Use (U)</p>
              <Bullets
                items={[
                  <>
                    Do users believe the assistant is easy to interact with due to its intuitive chat
                    interface?
                  </>,
                  <>Should we add voice commands?</>,
                  <>How is adding more features reducing the ease of use?</>,
                ]}
              />
            </div>
            <div className="border-t border-[var(--dt-ink)]/15 pt-3">
              <p className="font-sans font-bold text-lg mb-1.5">Perceived Usefulness (E)</p>
              <Bullets
                items={[
                  <>
                    Do customers find the assistant helpful because it saves time by suggesting
                    relevant products and streamlining the shopping process?
                  </>,
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border-t border-[var(--dt-ink)]/15 pt-3">
              <p className="font-sans font-bold text-lg mb-1.5">Attitude Toward Using (A)</p>
              <p>
                Do positive perceptions of usefulness and ease of use lead customers to{" "}
                feel favorable toward using the virtual assistant?
              </p>
            </div>
            <div className="border-t border-[var(--dt-ink)]/15 pt-3">
              <p className="font-sans font-bold text-lg mb-1.5">Behavioral Intention to Use (B)</p>
              <p>
                Because of their positive attitude, do customers intend to use the assistant in their
                future shopping activities?
              </p>
            </div>
            <div className="border-t border-[var(--dt-ink)]/15 pt-3">
              <p className="font-sans font-bold text-lg mb-1.5">Actual System Use</p>
              <p>
                Over time, do users actively use the virtual assistant to explore and purchase products on the
                e-commerce platform?
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className="font-sans font-semibold text-lg mb-3 text-[var(--dt-ink)]">
              Measuring Benefits of Technology
            </p>
            <ol className="flex flex-col gap-3">
              {[
                <>
                  Increased customer satisfaction due to a smoother shopping experience?
                </>,
                <>
                  Higher conversion rates as customers are more likely to complete purchases?
                </>,
                <>
                  Enhanced brand loyalty as users find the platform innovative and user-friendly?
                </>,
              ].map((item, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="font-sans font-medium text-xs text-[var(--ink-3)] tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
        label="CLASS DISCUSSION: BESTBUY"
        title="Discussion & Research Questions"
      >
        <Row cols="lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-6">
            <div>
              <p className={`${SUB} mb-2`}>Discussion Questions</p>
              <ol className="flex flex-col">
                {[
                  <>
                    How can perceived ease of use be improved for users who are less tech-savvy?
                    (Minority group)
                  </>,
                  <>
                    What additional features could make the virtual shopping assistant more useful?
                  </>,
                  <>
                    How can social influence, such as peer reviews, be leveraged to encourage adoption?
                  </>,
                ].map((q, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 py-4 border-t border-[var(--dt-ink)]/15 first:border-t-0"
                  >
                    <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums w-6 shrink-0">{i + 1}</span>
                    <span className="font-sans font-bold text-xl leading-snug">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t border-[var(--dt-ink)]/15 pt-4">
              <p className={`${SUB} mb-2`}>Research Questions</p>
              <div className="flex items-baseline gap-4">
                <span className="font-sans font-semibold text-sm text-[var(--ink-3)] tabular-nums w-6 shrink-0">
                  04
                </span>
                <p className="font-sans font-medium text-lg leading-snug text-[var(--dt-ink)]">
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
        label="CASE STUDY 02: HEALTHCARE"
        title="Example: TAM for AI Chatbots in a Hospital"
      >
        <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
          {[
            <>
              A hospital adopts an AI-powered chatbot to assist patients in triage,
            </>,
            <>
              offering preliminary medical advice
            </>,
            <>
              determining whether they need urgent care or can manage their symptoms{" "}
              at home.
            </>,
            <>
              TAM can help evaluate how staff and patients accept this technology.
            </>,
          ].map((line, i) => (
            <p key={i} className="border-t border-[var(--dt-ink)]/15 pt-2.5">
              {line}
            </p>
          ))}
        </div>
        <div>
          <p className={`${SUB} mb-2`}>External Variables</p>
          <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
            <Step n={1} name="System Features:">
              <p>
                The chatbot uses natural language processing (NLP) to understand patient queries and
                provides accurate recommendations based on medical databases.
              </p>
            </Step>
            <Step n={2} name="User Characteristics:">
              <Bullets
                items={[
                  <>
                    Patients may range from tech-savvy individuals to{" "}
                    older adults with limited technology experience.
                  </>,
                  <>
                    Nurses may initially feel skeptical about its reliability.
                  </>,
                  <>
                    Medical doctors who feel threatened.
                  </>,
                ]}
              />
            </Step>
            <Step n={3} name="Social Influence:">
              <p>
                Healthcare professionals and community leaders endorse the chatbot,
                increasing trust among patients.
              </p>
            </Step>
            <Step n={4} name="Training and Support:">
              <p>
                Hospitals offer tutorials and demos to help patients and{" "}
                staff navigate the chatbot.
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
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-bold text-base mb-1">Perceived Ease of Use (E)</p>
            <p>
              Patients find the chatbot user-friendly because of its simple interface,{" "}
              quick responses, and ability to handle non-technical language.
            </p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-bold text-base mb-1">Perceived Usefulness (U)</p>
            <Bullets
              items={[
                <>
                  The chatbot reduces waiting times and improves patient outcomes by streamlining the
                  triage process.
                </>,
                <>
                  Medical staff find it useful as it filters non-urgent cases, allowing them to focus
                  on critical patients.
                </>,
              ]}
            />
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-bold text-base mb-1">Attitude Toward Using (A)</p>
            <p>
              Both patients and staff develop a positive attitude toward the chatbot, appreciating its
              efficiency and time-saving benefits.
            </p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-bold text-base mb-1">Behavioral Intention to Use (BI)</p>
            <p>
              Due to their favorable attitude, patients and staff intend to use the chatbot regularly. Patients
              plan to consult it for initial assessments, while staff use its data to prioritize cases.
            </p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-semibold text-base mb-1 text-[var(--dt-ink)]">Actual System Use</p>
            <p>
              The chatbot becomes widely used in the hospital, helping patients and supporting staff during{" "}
              peak hours or emergencies.
            </p>
          </div>
        </div>
        <Row cols="lg:grid-cols-[1fr_1.35fr]" className="!items-center">
          <PlateWell>
            <HospitalPeakSimulator />
          </PlateWell>
          <div className="border border-[var(--dt-ink)]/15 p-4 sm:p-5">
            <p className="font-sans font-semibold text-lg mb-3 text-[var(--dt-ink)]">Benefits for the Hospital</p>
            <div className={`${SMALL} grid sm:grid-cols-3 gap-4`}>
              <Step n={1} name="Improved Patient Experience:">
                <p>Patients receive quicker responses and guidance for their symptoms.</p>
              </Step>
              <Step n={2} name="Optimized Staff Workload:">
                <p>Staff focus on urgent cases, improving care quality.</p>
              </Step>
              <Step n={3} name="Operational Efficiency:">
                <p>
                  Triage times are reduced, leading to better resource allocation.
                </p>
              </Step>
            </div>
          </div>
        </Row>
      </Slide>

      <Slide
        id="hospital-discussion-and-research-questions"
        label="CLASS DISCUSSION: HOSPITAL CHATBOT"
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
                    className="flex items-start gap-5 py-4 border-t border-[var(--dt-ink)]/15 first:border-t-0"
                  >
                    <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums w-6 shrink-0">{i + 1}</span>
                    <span className="font-sans font-bold text-xl leading-snug">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t border-[var(--dt-ink)]/15 pt-4">
              <p className={`${SUB} mb-2`}>Research Question</p>
              <div className="flex items-baseline gap-4">
                <span className="font-sans font-semibold text-sm text-[var(--ink-3)] tabular-nums w-6 shrink-0">
                  04
                </span>
                <p className="font-sans font-medium text-lg leading-snug text-[var(--dt-ink)]">
                  What AI tool can help integrate electronic health records (EHRs) into the chatbot?
                </p>
              </div>
            </div>
          </div>
        </Row>
      </Slide>

      <Slide
        id="example-tam-for-ikeas-self-return-kiosk"
        label="CASE STUDY 03: RETAIL SELF-SERVICE"
        title="Example: TAM for IKEA’s Self-Return Kiosk"
      >
        <div className={`${BODY} grid md:grid-cols-3 gap-5`}>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            IKEA has introduced a self-return kiosk at its stores
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            Customers should process product returns without staff assistance.
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            Let&apos;s apply TAM to understand how customers would accept this technology.
          </p>
        </div>
        <div>
          <p className={`${SUB} mb-2`}>External Variables</p>
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
                    from tech-savvy individuals to those who prefer in-person interaction.
                  </>,
                ]}
              />
            </Step>
            <Step n={3} name="Social Influence:">
              <p>
                Other customers using the kiosk successfully influence hesitant users to try it.
              </p>
            </Step>
            <Step n={4} name="Training and Support:">
              <p>
                On-screen guidance and staff nearby to assist reduce apprehension
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
              <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
                <p className="font-sans font-bold text-base mb-1">Perceived Ease of Use (E)</p>
                <p>
                  Customers find the kiosk intuitive due to its step-by-step instructions,{" "}
                  visual aids, and quick processing time.
                </p>
              </div>
              <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
                <p className="font-sans font-bold text-base mb-1">Perceived Usefulness (U)</p>
                <Bullets
                  items={[
                    <>
                      The kiosk eliminates waiting in line
                    </>,
                    <>
                      This is particularly beneficial during peak hours.
                    </>,
                  ]}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="border-t border-[var(--dt-ink)]/15 pt-2">
                <p className="font-sans font-bold text-base mb-1">Attitude Toward Using (A)</p>
                <p>
                  Customers to view the kiosk as an effective solution.
                </p>
              </div>
              <div className="border-t border-[var(--dt-ink)]/15 pt-2">
                <p className="font-sans font-bold text-base mb-1">Behavioral Intention to Use (BI)</p>
                <p>
                  Customers intend to use the kiosk for future returns and may{" "}
                  recommend it to others.
                </p>
              </div>
              <div className="border-t border-[var(--dt-ink)]/15 pt-2">
                <p className="font-sans font-bold text-base mb-1">Actual System Use</p>
                <p>
                  Over time, the kiosk sees increased adoption, with customers actively using it for returns, leading to
                  faster service times and reduced staff workload.
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--dt-ink)]/15 pt-3">
              <p className="font-sans font-semibold text-base mb-2 text-[var(--dt-ink)]">Benefits for IKEA</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <Step n={1} name="Enhanced Customer Experience:">
                  <p>
                    Faster returns process improves overall satisfaction.
                  </p>
                </Step>
                <Step n={2} name="Operational Efficiency:">
                  <p>
                    Staff focus on complex issues while routine returns are handled by the kiosk.
                  </p>
                </Step>
                <Step n={3} name="Cost Savings:">
                  <p>
                    Lower dependency on staff for simple returns reduces operational costs.
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
        label="CLASS DISCUSSION: IKEA SELF-RETURN KIOSK"
        title="Apprehensions & Discussion Questions"
      >
        <div className="flex flex-col gap-5 max-w-4xl">
          <div className="border-l-2 border-[var(--dt-ink)]/25 pl-4">
            <p className={`${SUB} mb-1`}>Question</p>
            <p className="font-sans font-medium text-lg leading-snug text-[var(--dt-ink)]">
              Think about your own experience: when forced to use a new technology in public what types of
              apprehensions do you face? How can these apprehensions be alleviated?
            </p>
          </div>
          <div>
            <p className={`${SUB} mb-2`}>Discussion Questions</p>
            <ol className="flex flex-col">
              {[
                <>
                  What design elements can IKEA add to make the kiosk more accessible to older
                  customers?
                </>,
                <>
                  How can IKEA promote the kiosk to customers hesitant about using technology?
                </>,
                <>
                  What features could make the kiosk even more useful (e.g., integrating loyalty rewards during
                  returns)?
                </>,
              ].map((q, i) => (
                <li
                  key={i}
                  className="flex items-start gap-5 py-3.5 border-t border-[var(--dt-ink)]/15 first:border-t-0"
                >
                  <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums w-6 shrink-0">{i + 1}</span>
                  <span className="font-sans font-bold text-lg leading-snug">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 3: THE UNIFIED THEORY OF ACCEPTANCE AND USE OF TECHNOLOGY (UTAUT)
          ================================================================ */}
      <ChapterBand
        id="ch3"
        number="03"
        title="The Unified Theory of Acceptance and Use of Technology (UTAUT)"
      />

      <DiscussionSlide
        quote="Your company recently rolled out a new collaboration platform (e.g., Slack, Asana, or a mandatory AI tool). While TAM focuses on perceived usefulness and ease of use, what one factor outside of these two do you think most influenced adoption or resistance? For example, was it pressure from leadership, lack of training, or compatibility with existing workflows? Use a real-world case to argue why this factor mattered more than pure ‘usefulness’ or ‘ease of use’."
        author="Question"
      />

      <Slide
        id="the-unified-theory-of-acceptance-and-use-of-technology-utaut"
        label="THEORETICAL FRAMEWORK"
        title="The Unified Theory of Acceptance and Use of Technology (UTAUT)"
        exercise={exercise["the-unified-theory-of-acceptance-and-use-of-technology-utaut"]}
      >
        <div className={`${SMALL} grid md:grid-cols-3 gap-5 border-b border-[var(--dt-ink)]/15 pb-4`}>
          <p>
            The Unified Theory of Acceptance and Use of Technology (UTAUT) is a theoretical framework developed to
            understand the factors that influence individuals&apos; acceptance and use of technology.
          </p>
          <p>
            It was introduced by Venkatesh et al. in 2003
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
            <p className="font-sans font-bold text-lg mb-3">
              Four primary constructs that significantly influence technology acceptance and usage:
            </p>
            <div className={`${SMALL} grid sm:grid-cols-2 gap-4`}>
              <Step n={1} name="Performance Expectancy:">
                <p>
                  How much the technology is perceived to enhance job performance.
                </p>
              </Step>
              <Step n={2} name="Effort Expectancy:">
                <p>
                  This construct reflects the ease of use associated with the technology.
                </p>
              </Step>
              <Step n={3} name="Social Influence:">
                <p>
                  How much individuals perceive that{" "}
                  important others (e.g., peers, family, or colleagues) believe they should use the new
                  technology.
                </p>
              </Step>
              <Step n={4} name="Facilitating Conditions:">
                <p>
                  The resources and support available to individuals for using the technology:
                  infrastructure, training, technical support.
                </p>
              </Step>
            </div>
          </div>
        </Row>
      </Slide>

      <Slide id="moderating-variables" label="UTAUT MODEL" title="Moderating Variables">
        <p className="font-sans font-semibold text-lg text-[var(--dt-ink)]">
          What are moderators in a theoretical framework?
        </p>
        <div className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className="font-sans font-bold text-xl mb-1">Age:</p>
            <p>Different age groups may have varying levels of technology acceptance.</p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className="font-sans font-bold text-xl mb-1">Gender:</p>
            <p>Men and women may have different perceptions and attitudes toward technology.</p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className="font-sans font-bold text-xl mb-1">Experience:</p>
            <p>Prior experience with similar technologies can influence acceptance.</p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className="font-sans font-bold text-xl mb-1">Voluntariness of Use:</p>
            <p>Whether the use of the technology is mandatory or voluntary can affect acceptance.</p>
          </div>
        </div>
        <PlateWell>
          <UtautModelInteractive />
        </PlateWell>
      </Slide>

      <Slide id="utaut-for-ikeas-self-return-kiosk" label="CASE STUDY: UTAUT" title="UTAUT for IKEA's Self-Return Kiosk">
        <div className={`${SMALL} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-bold text-base mb-1.5">Performance Expectancy</p>
            <p>
              Do customers believe the kiosk enhances efficiency by saving time and{" "}
              reducing waiting lines, especially during peak hours?
            </p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-bold text-base mb-1.5">Effort Expectancy</p>
            <p>
              Is kiosk is perceived as easy to use due to its{" "}
              intuitive touch screen, step-by-step instructions, and{" "}
              visual aids?
            </p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-bold text-base mb-1.5">Social Influence</p>
            <Bullets
              items={[
                <>
                  Observing other customers successfully using the kiosk encourages{" "}
                  hesitant users to try it.
                </>,
                <>
                  Positive word-of-mouth promotes trust in the system.
                </>,
              ]}
            />
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-bold text-base mb-1.5">Facilitating Conditions</p>
            <Bullets
              items={[
                <>
                  On-site support staff and clear guidance help users overcome
                  technical or usability challenges.
                </>,
                <>
                  Accessible design ensures inclusion for diverse user groups, such as those with
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
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-semibold text-base mb-1 text-[var(--dt-ink)]">Behavioral Intention</p>
            <p>
              Customers show an intention to use the kiosk in the future and to{" "}
              recommend it to others based on their experience.
            </p>
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-2.5">
            <p className="font-sans font-semibold text-base mb-1 text-[var(--dt-ink)]">Actual Use</p>
            <p>
              Over time, increased confidence and trust lead to higher adoption rates, resulting in{" "}
              streamlined operations and reduced staff workload.
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
          <ol className={`${BODY} flex flex-col divide-y divide-[var(--dt-ink)]/12 border-y border-[var(--dt-ink)]/15`}>
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
                    If customers feel forced to use the kiosk (e.g., no alternative for returns),
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
                    self-service technology.
                  </>
                ),
              },
            ].map((item) => (
              <li key={item.n} className="grid sm:grid-cols-[13.5rem_1fr] gap-x-4 gap-y-1 py-3 items-baseline">
                <p className="font-sans font-bold text-lg flex items-baseline gap-2.5">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[var(--dt-ink)] text-[var(--dt-white)] font-sans text-xs shrink-0">
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
          CHAPTER 4: INTRODUCTION TO IOT, CLOUD, EDGE, AND FOG COMPUTING
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Introduction to IoT, Cloud, Edge, and Fog Computing" />

      <Slide id="what-is-iot" label="INTERNET OF THINGS" title="What is IoT?">
        <div className={`${BODY} text-lg grid md:grid-cols-3 gap-6`}>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            <strong>Internet of Things (IoT)</strong> refers to a network of interconnected devices that{" "}
            collect, share, and act on data.
          </p>
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            smart thermostats, wearable fitness trackers, and connected cars.
          </p>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className={`${SUB} mb-1`}>Discussion Question</p>
            <p className="font-sans font-medium text-base leading-snug text-[var(--dt-ink)]">
              How does IoT influence the way businesses interact with customers?{" "}
              Troubleshooting your fridge
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
            <li key={stage} className="border-t border-[var(--dt-ink)]/15 pt-3">
              <p className="font-sans font-semibold text-base text-[var(--dt-ink)] leading-snug">
                <span className="font-sans font-medium text-xs mr-2 text-[var(--ink-3)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
          <p className="border-t border-[var(--dt-ink)]/15 pt-3">
            <strong>Cloud computing</strong> delivers computing resources (storage, processing, and
            software) over the internet.
          </p>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className="mb-2">Google Drive, Amazon Web Services (AWS).</p>
            <Bullets
              items={[
                <>
                  scalability
                </>,
                <>
                  remote access
                </>,
                <>
                  central data center.
                </>,
              ]}
            />
          </div>
          <div className="border-t border-[var(--dt-ink)]/15 pt-3">
            <p className={`${SUB} mb-1`}>Discussion Question</p>
            <p className="font-sans font-medium text-base leading-snug text-[var(--dt-ink)]">
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
          <div className="border-t border-[var(--dt-ink)]/15 pt-4 flex flex-col gap-3">
            <h4 className="font-sans font-semibold text-xl text-[var(--dt-ink)]">What is Edge Computing?</h4>
            <Bullets
              items={[
                <>
                  <strong>Edge computing</strong> processes data near its source (e.g., on{" "}
                  IoT devices or local servers).
                </>,
                <>
                  Reduces latency and bandwidth usage,
                </>,
                <>
                  critical for real-time tasks like autonomous vehicles.
                </>,
              ]}
            />
            <div className="mt-2 pt-3 border-t border-[var(--dt-ink)]/12">
              <p className={`${SUB} mb-1`}>Discussion Question</p>
              <p className="font-sans font-medium text-base text-[var(--dt-ink)]">
                In what scenarios is edge computing preferred over cloud computing?
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--dt-ink)]/15 pt-4 flex flex-col gap-3">
            <h4 className="font-sans font-semibold text-xl text-[var(--dt-ink)]">What is Fog Computing?</h4>
            <Bullets
              items={[
                <>
                  <strong>Fog computing</strong> acts as a bridge between cloud and edge computing.
                </>,
                <>
                  It distributes processing tasks across local networks (closer than cloud but farther
                  than edge).
                </>,
                <>
                  A factory uses fog to analyze machine data locally and send summaries to the cloud.
                </>,
              ]}
            />
            <div className="mt-2 pt-3 border-t border-[var(--dt-ink)]/12">
              <p className={`${SUB} mb-1`}>Discussion Question</p>
              <p className="font-sans font-medium text-base text-[var(--dt-ink)]">
                How does fog computing complement both cloud and edge computing?
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
          <div className="overflow-x-auto border border-[var(--dt-ink)]/15">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-[var(--dt-ink)] text-[var(--dt-white)] font-sans text-lg">
                  <th className="py-3 px-4">Concept</th>
                  <th className="py-3 px-4">Definition</th>
                  <th className="py-3 px-4">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--dt-ink)]/12 text-base">
                <tr>
                  <td className="py-3 px-4 font-sans font-bold">IoT</td>
                  <td className="py-3 px-4">Devices connected to the internet that collect and transmit data.</td>
                  <td className="py-3 px-4">Smart home appliances</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold">Cloud</td>
                  <td className="py-3 px-4">Centralized data storage and processing over the internet.</td>
                  <td className="py-3 px-4">Data analytics for e-commerce</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold">Edge</td>
                  <td className="py-3 px-4">Localized data processing at or near the source.</td>
                  <td className="py-3 px-4">Autonomous vehicles</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold">Fog</td>
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
