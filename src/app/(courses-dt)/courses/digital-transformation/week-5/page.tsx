import React from "react";
import { ProgressBar } from "@/components/presentation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import exercisesData from "./exercises.json";

import { DECK_THEME, DeckNav, PosterHero, ChapterBand, Slide, Row, PlateWell, Summary } from "../_visuals/kit";
import {
  HeroTiers,
  TenStoresOneServer,
  OwnVsRent,
  CapacityPlanner,
  SeasonalServers,
  ServiceStackIaaS,
  MigrateIndustries,
  FocusOnApp,
  ServiceStackPaaS,
  ServiceStack,
  AnyDevice,
  GlobalStreaming,
  LateAlert,
  AlertDelay,
  EdgeProximity,
  EdgeLatency,
  EdgeBandwidth,
  EdgeReliability,
  StoreEdge,
  FactoryFloor,
  FogBridge,
  FogLoad,
  CityFog,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "Cloud Computing" },
  { id: "ch2", label: "Cloud Service Models" },
  { id: "ch3", label: "Edge Computing" },
  { id: "ch4", label: "Fog Computing" },
  { id: "conclusion", label: "Conclusion" },
];

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/* Body copy in upright sans-serif. */
const BODY_BASE =
  "font-sans leading-[1.6] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]";
const BODY = `${BODY_BASE} text-base md:text-[1.08rem]`;
const LIST =
  "list-none flex flex-col gap-1 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rounded-full [&>li]:before:shrink-0 [&>li]:before:bg-[var(--ink-3)]";
const SUBLIST =
  "list-none flex flex-col gap-0.5 mt-1 [&>li]:flex [&>li]:gap-2.5 [&>li]:before:content-['-'] [&>li]:before:shrink-0";
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

function Dashes({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={SUBLIST}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* A numbered item: rule on top, number and name, then its lines. */
function Item({
  n,
  name,
  big,
  children,
}: {
  n: number;
  name: React.ReactNode;
  /** a larger name, for slides of text alone */
  big?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--dt-ink)]/15 pt-3">
      <p
        className={`font-sans font-semibold text-[var(--dt-ink)] leading-snug flex items-baseline gap-2.5 ${big ? "text-xl mb-3" : "text-lg mb-2"}`}
      >
        <span className="font-sans font-medium text-sm text-[var(--ink-3)] tabular-nums">
          {String(n).padStart(2, "0")}
        </span>
        <span>{name}</span>
      </p>
      {children}
    </div>
  );
}

/* A Scenario or Solution block: a rule on its left. */
function Lead({ children }: { children: React.ReactNode }) {
  return <div className="border-l-2 border-[var(--dt-ink)]/25 pl-4">{children}</div>;
}

export default function DigitalTransformationWeek5() {
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
        category="Week 5: Digital Transformation"
        title="Cloud/Fog/Edge Computing"
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "Introduce Cloud, Fog, and Edge computing",
          "Explain various cloud service models",
          "Case study involving the choice of service models",
          "Edge computing",
          "Why choose Edge over Cloud",
          "How Fog computing can bridge Edge and Cloud",
          "Conclusion",
          "Q&A",
        ]}
        plate={<HeroTiers />}
      />

      {/* ================================================================
          CHAPTER 1: CLOUD COMPUTING
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="Cloud Computing" />

      <Slide
        id="the-growing-pains-of-freshbake-bakery"
        label="CASE STUDY"
        title="The Growing Pains of FreshBake Bakery"
      >
        <Row cols="lg:grid-cols-[1.25fr_1fr]">
          <Bullets
            className={BODY}
            items={[
              <>
                FreshBake Bakery is a small but rapidly expanding business with 10 physical stores in
                Vancouver.
              </>,
              <>
                They currently host their website, inventory system, and customer loyalty program on an
                aging on-premise server.
              </>,
              <>
                During peak holiday seasons, their website crashes due to traffic spikes, inventory
                updates lag, and IT maintenance costs are eating into profits.
              </>,
              <>
                The owner wants to scale operations, improve customer experience, and{" "}
                reduce IT headaches but lacks technical expertise.
              </>,
              <>Your group is a tech advisory team hired by FreshBake.</>,
              <>Analyze their challenges and propose solutions.</>,
            ]}
          />
          <PlateWell>
            <TenStoresOneServer />
          </PlateWell>
        </Row>
        <div className="border-t border-[var(--dt-ink)]/15 pt-4">
          <p className="font-sans font-bold text-xl mb-3">Questions</p>
          <ol className="grid md:grid-cols-2 gap-x-10 gap-y-3">
            <li className="flex gap-4 items-baseline">
              <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums w-6 shrink-0">1</span>
              <span className="font-sans font-bold text-[1.2rem] leading-snug">
                What are the key business outcomes negatively affected by the current digital infrastucture of
                the company?
              </span>
            </li>
            <li className="flex gap-4 items-baseline">
              <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums w-6 shrink-0">2</span>
              <div>
                <p className="font-sans font-bold text-[1.2rem] leading-snug">
                  Propose a solution for the company outlining:
                </p>
                <ol className="mt-1.5 flex flex-wrap gap-x-6 gap-y-1 font-sans text-[1.02rem]">
                  {["First steps", "Transformation", "Expected improvements in outcomes"].map((t, i) => (
                    <li key={t} className="flex gap-2">
                      <span className="font-sans font-bold">{i + 1}.</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          </ol>
        </div>
      </Slide>

      <Slide id="what-is-cloud-computing" label="DEFINITION" title="What is Cloud Computing?">
        <Row cols="lg:grid-cols-[1fr_0.85fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.4rem] flex flex-col gap-6`}>
            <div>
              <p>
                Cloud computing delivers <strong>on-demand computing services</strong>:
              </p>
              <Dashes items={["storage,", "software,", "processing power"]} />
              <p className="mt-1">over the internet.</p>
            </div>
            <p className="border-l-2 border-[var(--dt-ink)]/25 pl-4">
              Instead of owning physical servers, companies{" "}
              rent resources from cloud providers like AWS,
              Microsoft Azure, or Google Cloud.
            </p>
          </div>
          <PlateWell>
            <OwnVsRent />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="key-characteristics-of-cloud-computing"
        label="CLOUD COMPUTING"
        title="Key Characteristics of Cloud Computing"
        exercise={exercise["key-characteristics-of-cloud-computing"]}
      >
        <div className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4`}>
          <Item n={1} name="Scalability">
            <Bullets
              items={[
                <>
                  Resources can be scaled up or down based on demand.
                </>,
                <>
                  E-commerce platforms handle traffic spikes during sales.
                </>,
              ]}
            />
          </Item>
          <Item n={2} name="Cost-Effectiveness">
            <Bullets
              items={[
                <>
                  Reduces capital expenses by eliminating the need for in-house hardware.
                </>,
                <>
                  Pay only for what you use (&ldquo;pay-as-you-go&rdquo; model)
                </>,
              ]}
            />
          </Item>
          <Item n={3} name="Accessibility">
            <Bullets
              items={[
                <>
                  Services are accessible from anywhere with an internet connection.
                </>,
              ]}
            />
          </Item>
          <Item n={4} name="Flexibility and Innovation">
            <Bullets
              items={[
                <>
                  Supports rapid deployment of applications and services, fostering{" "}
                  innovation.
                </>,
              ]}
            />
          </Item>
        </div>
        <PlateWell>
          <CapacityPlanner />
        </PlateWell>
      </Slide>

      {/* ================================================================
          CHAPTER 2: CLOUD SERVICE MODELS
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Cloud Service Models" />

      <Slide id="airbnb" label="CASE STUDY" title="Airbnb">
        <p className={`${BODY_BASE} text-lg md:text-[1.25rem] border-b border-[var(--dt-ink)]/15 pb-5`}>
          <strong>Scenario:</strong> Airbnb hosts millions of listings worldwide, requiring scalable infrastructure to
          handle fluctuating demand.
        </p>
        <Row cols="lg:grid-cols-[1fr_1fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.25rem]`}>
            <p>
              <strong>Solution:</strong> Airbnb uses AWS EC2 to:
            </p>
            <Bullets
              className="mt-3 gap-2"
              items={[
                <>
                  Scale server capacity during peak travel seasons.
                </>,
                <>
                  Reduce infrastructure costs by only paying for what they use.
                </>,
                <>
                  Ensure high availability for its global user base.
                </>,
              ]}
            />
          </div>
          <PlateWell>
            <SeasonalServers />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="cloud-service-models-iaas" label="SERVICE MODEL 1" title="Cloud Service Models">
        <Row cols="lg:grid-cols-[1fr_1fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.25rem] flex flex-col gap-6`}>
            <Item n={1} name="Infrastructure as a Service (IaaS):">
              <Bullets
                items={[
                  <>Provides virtualized computing resources (e.g., servers, storage).</>,
                  <>Example: AWS EC2.</>,
                ]}
              />
            </Item>
            <div className="bg-[var(--paper-2)] p-5">
              <p className="font-sans font-bold text-lg mb-2">Amazon Web Services (AWS) EC2</p>
              <p>
                Amazon Elastic Compute Cloud (EC2) is a prominent IaaS offering that allows businesses
                to rent virtual servers for their computing needs.
              </p>
            </div>
          </div>
          <PlateWell>
            <ServiceStackIaaS />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="discussion-question-iaas" label="CLASS DISCUSSION" title="Discussion Question">
        <Row cols="lg:grid-cols-[1.6fr_1fr]" className="!items-start">
          <div className={`${BODY} flex flex-col gap-4`}>
            <div>
              <p>
                Imagine your group is advising a company considering migrating its on-premise IT infrastructure to an
                IaaS provider (e.g., AWS, Azure, Google Cloud). Each group will be assigned a specific industry:
              </p>
              <p className="mt-2 flex flex-wrap gap-x-5 font-sans font-bold">
                {["healthcare,", "e-commerce,", "government,", "education."].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            </div>
            <ol className="flex flex-col border-t border-[var(--dt-ink)]/15">
              {[
                <>
                  What are the top 3 factors (e.g., cost, scalability, security, compliance, latency) your assigned
                  industry should prioritize when selecting an IaaS provider? Justify your choices.
                </>,
                <>
                  What unique challenges might this industry face in adopting IaaS, and how could they mitigate them?
                </>,
                <>
                  <span>
                    Draft a shortlist of best practices for ensuring a smooth transition to IaaS, tailored to your
                    industry’s needs.
                  </span>
                  <Dashes
                    items={[
                      "Each group will present their recommendations.",
                      <>
                        The class will then discuss:
                        <span className="block font-sans font-bold mt-0.5">
                          Are there universal IaaS adoption principles across industries, or do priorities fundamentally
                          differ?
                        </span>
                      </>,
                    ]}
                  />
                </>,
              ].map((q, i) => (
                <li key={i} className="flex gap-4 py-3 border-b border-[var(--dt-ink)]/15 last:border-b-0">
                  <span className="font-sans font-bold text-2xl leading-none w-5 shrink-0 pt-0.5">{i + 1}</span>
                  <div>{q}</div>
                </li>
              ))}
            </ol>
          </div>
          <PlateWell>
            <MigrateIndustries />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="snapchat" label="CASE STUDY" title="Snapchat">
        <Row cols="lg:grid-cols-[0.9fr_1.1fr]">
          <PlateWell>
            <FocusOnApp />
          </PlateWell>
          <div className={`${BODY_BASE} text-lg md:text-[1.25rem] flex flex-col gap-5`}>
            <Lead>
              <p>
                <strong>Scenario:</strong> Snapchat needed a platform to support rapid user growth and enable its
                engineers to focus on app development (company&apos;s main focus) rather than server
                management.
              </p>
            </Lead>
            <Lead>
              <p>
                <strong>Solution:</strong> Snapchat used Google App Engine to:
              </p>
              <Bullets
                className="mt-2"
                items={[
                  <>
                    Deploy its app quickly without worrying about server provisioning.
                  </>,
                  <>
                    Automatically scale resources as its user base expanded.
                  </>,
                  <>
                    Simplify backend management with integrated tools and APIs.
                  </>,
                ]}
              />
            </Lead>
          </div>
        </Row>
      </Slide>

      <Slide id="cloud-service-models-paas" label="SERVICE MODEL 2" title="Cloud Service Models">
        <Row cols="lg:grid-cols-[1fr_1fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.25rem] flex flex-col gap-6`}>
            <Item n={2} name="Platform as a Service (PaaS):">
              <Bullets
                items={[<>Offers tools and platforms for developers to build applications.</>, <>Google App Engine.</>]}
              />
            </Item>
            <div className="bg-[var(--paper-2)] p-5">
              <p className="font-sans font-bold text-lg mb-2">Google App Engine (GAE)</p>
              <p>
                Google App Engine (GAE) is a PaaS that enables developers to{" "}
                build, deploy, and scale applications without managing the{" "}
                underlying infrastructure.
              </p>
            </div>
          </div>
          <PlateWell>
            <ServiceStackPaaS />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="cloud-service-models-saas"
        label="SERVICE MODEL 3"
        title="Cloud Service Models"
        exercise={exercise["cloud-service-models-saas"]}
      >
        <Row cols="lg:grid-cols-[1fr_1fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.25rem] flex flex-col gap-6`}>
            <Item n={3} name="Software as a Service (SaaS):">
              <Bullets
                items={[
                  <>
                    <span>
                      Delivers fully functional applications over the internet.
                    </span>
                    <Dashes items={["Salesforce,", "Microsoft Office 365."]} />
                  </>,
                ]}
              />
            </Item>
            <div className="bg-[var(--paper-2)] p-5">
              <p className="font-sans font-bold text-lg mb-2">Salesforce CRM</p>
              <p>
                Salesforce is a leading SaaS platform offering Customer Relationship Management (CRM)
                tools that help businesses manage customer interactions, sales, and{" "}
                marketing activities.
              </p>
            </div>
          </div>
          <PlateWell>
            <ServiceStack />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="use-case-coca-cola-enterprises" label="USE CASE" title="Use Case: Coca-Cola Enterprises">
        <Row cols="lg:grid-cols-[1.15fr_0.85fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.25rem] flex flex-col gap-5`}>
            <Lead>
              <p>
                <strong>Scenario:</strong> Coca-Cola Enterprises needed a centralized solution to{" "}
                <strong>manage sales</strong> processes across its global workforce.
              </p>
            </Lead>
            <Lead>
              <p>
                <strong>Solution:</strong> By adopting Salesforce CRM, Coca-Cola was able to:
              </p>
              <Bullets
                className="mt-2 gap-2"
                items={[
                  <>
                    Provide sales teams with real-time access to customer data from any
                    device.
                  </>,
                  <>
                    Streamline customer engagement and improve collaboration across departments.
                  </>,
                  <>
                    Analyze customer behavior and generate insights to{" "}
                    optimize marketing strategies.
                  </>,
                ]}
              />
            </Lead>
          </div>
          <PlateWell>
            <AnyDevice />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="benefits-of-cloud-computing" label="CLOUD COMPUTING" title="Benefits of Cloud Computing">
        <div className={`${BODY_BASE} text-lg md:text-[1.4rem] grid md:grid-cols-2 gap-x-14 gap-y-10`}>
          <Item big n={1} name="Agility and Speed">
            <Bullets
              items={[
                <>
                  Companies can quickly adapt to changes and deploy solutions faster.
                </>,
              ]}
            />
          </Item>
          <Item big n={2} name="Reduced IT Overhead">
            <Bullets
              items={[
                <>
                  Outsourcing infrastructure management to cloud providers.
                </>,
              ]}
            />
          </Item>
          <p className={`${SUB} md:col-span-2 -mb-6`}>Business Benefits of Cloud Computing</p>
          <Item big n={3} name="Enhanced Collaboration">
            <Bullets
              items={[
                <>Everything is on the web</>,
                <>Teams can work together using shared tools and resources.</>,
                <>Develop using various devices and places</>,
              ]}
            />
          </Item>
          <Item big n={4} name="Global Reach">
            <Bullets
              items={[
                <>
                  Cloud data centers allow companies to operate globally with low latency.
                </>,
              ]}
            />
          </Item>
        </div>
      </Slide>

      <Slide
        id="risks-and-challenges"
        label="CLOUD COMPUTING"
        title="Risks and Challenges"
        exercise={exercise["risks-and-challenges"]}
      >
        <ol className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: "Security Concerns:",
              body: (
                <>
                  Data breaches and unauthorized access can occur if not managed
                  properly.
                </>
              ),
            },
            {
              name: "Dependence on Providers:",
              body: (
                <>
                  Outages from providers can disrupt operations.
                </>
              ),
            },
            {
              name: "Cost Management:",
              body: (
                <>
                  Poorly managed usage can lead to unexpected expenses.
                </>
              ),
            },
          ].map((r, i) => (
            <li key={r.name} className="border-t border-[var(--dt-ink)]/15 pt-5">
              <p aria-hidden className="font-sans font-bold text-[6rem] leading-[0.85] mb-4">
                {i + 1}
              </p>
              <p className="font-sans font-bold text-[1.9rem] leading-tight mb-3">{r.name}</p>
              <p className={`${BODY_BASE} text-lg md:text-[1.25rem]`}>{r.body}</p>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide id="discussion-question-netflix" label="CLASS DISCUSSION" title="Discussion Question">
        <Row cols="lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-6">
            <p className="font-sans font-bold text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.25]">
              How has Netflix leveraged cloud computing to transform its global streaming service?
            </p>
            <p className={`${BODY_BASE} text-xl border-l-2 border-[var(--dt-ink)]/25 pl-4`}>
              Consider scalability, content delivery, and{" "}
              customer experience in your answer.
            </p>
          </div>
          <PlateWell>
            <GlobalStreaming />
          </PlateWell>
        </Row>
      </Slide>

      {/* ================================================================
          CHAPTER 3: EDGE COMPUTING
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="Edge Computing" />

      <Slide
        id="the-real-time-dilemma-at-healthguard-hospital"
        label="CASE STUDY"
        title="The Real-Time Dilemma at HealthGuard Hospital"
      >
        <Row cols="lg:grid-cols-[1.3fr_1fr]">
          <Bullets
            className={`${BODY_BASE} text-lg md:text-[1.2rem] gap-2`}
            items={[
              <>
                HealthGuard Hospital uses IoT-enabled wearable devices to monitor patients’ vital signs (e.g., heart
                rate, oxygen levels) in real time.
              </>,
              <>Currently, all data from these devices is sent to a centralized cloud server for processing.</>,
              <>
                However, during emergencies, doctors experience delays in alerts, and network
                congestion during peak hours causes critical data to arrive too late.
              </>,
              <>
                The hospital also struggles with sky-high bandwidth costs and security concerns due to
                transmitting vast amounts of sensitive patient data.
              </>,
              <>
                They want to improve response times, reduce costs, and ensure reliable care without compromising patient
                privacy.
              </>,
            ]}
          />
          <PlateWell>
            <LateAlert />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="discussion-question-group-activity"
        label="CLASS DISCUSSION"
        title="Discussion Question (Group Activity)"
      >
        <div className={`${BODY} flex flex-col gap-4 max-w-4xl`}>
          <Bullets
            items={[
              <>Your group is a tech innovation team tasked with advising HealthGuard.</>,
              <>Analyze their challenges and propose a solution to transform their operations.</>,
            ]}
          />
          <ol className="flex flex-col border-t border-[var(--dt-ink)]/15">
            {[
              <>
                What are the key drawbacks of relying solely on a centralized cloud for real-time
                patient monitoring?
              </>,
              <>
                Which 3 core benefits of edge computing (e.g., reduced latency, bandwidth
                optimization, data privacy, offline operation) would most directly address the hospital’s needs?
                Justify your choices.
              </>,
              <>
                What practical steps should the hospital take to implement edge computing? Consider
                hardware/software needs, hybrid cloud-edge integration, and staff training.
              </>,
            ].map((q, i) => (
              <li key={i} className="flex items-baseline gap-4 py-3 border-b border-[var(--dt-ink)]/15 last:border-b-0">
                <span className="font-sans text-sm font-semibold text-[var(--ink-3)] tabular-nums w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[1.1rem]">{q}</p>
              </li>
            ))}
          </ol>
        </div>
      </Slide>

      <Slide id="what-is-edge-computing" label="DEFINITION" title="What is Edge Computing?">
        <div className={`${BODY_BASE} text-lg md:text-[1.25rem] grid md:grid-cols-[1.3fr_1fr] gap-x-10 gap-y-3`}>
          <div>
            <p>
              <strong>Edge computing</strong> processes data close to its source,
            </p>
            <Dashes items={["IoT devices", "local servers"]} />
            <p className="mt-1">
              instead of relying on centralized cloud data centers.
            </p>
          </div>
          <Bullets
            className="md:border-l-2 md:border-[var(--dt-ink)] md:pl-6"
            items={[
              <>
                reduces latency,
              </>,
              <>
                minimizes bandwidth usage,
              </>,
              <>
                enables faster decision-making
              </>,
              <>
                for time-sensitive applications.
              </>,
            ]}
          />
        </div>
        <PlateWell>
          <AlertDelay />
        </PlateWell>
      </Slide>

      <Slide id="edge-computing" label="EDGE COMPUTING" title="Edge Computing" exercise={exercise["edge-computing"]}>
        <div className={`${BODY_BASE} text-base md:text-[1.2rem] grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6`}>
          {[
            {
              name: "Proximity to Data Source",
              body: (
                <Bullets
                  items={[
                    <>
                      Data is processed at or near the device generating it, reducing delays.
                    </>,
                  ]}
                />
              ),
              plate: <EdgeProximity />,
            },
            {
              name: "Low Latency",
              body: (
                <Bullets
                  items={[
                    <>
                      <span>
                        Critical for real-time operations
                      </span>
                      <Dashes items={["autonomous vehicles", "industrial automation."]} />
                    </>,
                  ]}
                />
              ),
              plate: <EdgeLatency />,
            },
            {
              name: "Bandwidth Optimization",
              body: (
                <Bullets
                  items={[
                    <>
                      Less data is sent to the cloud,
                    </>,
                    <>
                      saving costs
                    </>,
                    <>
                      reducing internet congestion.
                    </>,
                  ]}
                />
              ),
              plate: <EdgeBandwidth />,
            },
            {
              name: "Reliability",
              body: (
                <Bullets
                  items={[
                    <>
                      Systems can continue to function even with limited or{" "}
                      no internet connectivity.
                    </>,
                  ]}
                />
              ),
              plate: <EdgeReliability />,
            },
          ].map((t, i) => (
            <div key={t.name} className="flex flex-col">
              <Item n={i + 1} name={t.name}>
                {t.body}
              </Item>
              <div className="mt-auto pt-4">{t.plate}</div>
            </div>
          ))}
        </div>
      </Slide>

      <Slide id="edge-computing-in-retail" label="USE CASE" title="Edge Computing in Retail">
        <Row cols="lg:grid-cols-[1.2fr_0.8fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.25rem] flex flex-col gap-4`}>
            <p>
              <strong>Company:</strong> Walmart
            </p>
            <div>
              <p>
                <strong>Scenario:</strong> Walmart uses IoT sensors and edge computing in its stores to:
              </p>
              <Bullets
                className="mt-3 gap-2"
                items={[
                  <>
                    Monitor inventory in real-time.
                  </>,
                  <>
                    Optimize energy usage for refrigeration and lighting systems.
                  </>,
                  <>
                    Process customer data locally for personalized shopping experiences.
                  </>,
                ]}
              />
            </div>
          </div>
          <PlateWell>
            <StoreEdge />
          </PlateWell>
        </Row>
      </Slide>

      {/* ================================================================
          CHAPTER 4: FOG COMPUTING
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Fog Computing" />

      <Slide id="running-a-factory" label="CLASS DISCUSSION" title="Running a Factory">
        <Row cols="lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-5">
            <Bullets
              className={`${BODY_BASE} text-lg md:text-[1.25rem]`}
              items={[
                <>Imagine you are managing a factory.</>,
                <>It has dozens of machines operating simultaneously.</>,
                <>Each machine produces sensor data about its speed, components, and production</>,
                <>The data needs to be analyzed in real time to derive key business insights.</>,
              ]}
            />
            <div className="border-t border-[var(--dt-ink)]/15 pt-4 flex flex-col gap-2 font-sans font-bold text-[1.35rem] leading-snug">
              <p>Propose a computing model for the factory.</p>
              <p>Discuss the pros and cons of your model.</p>
            </div>
          </div>
          <PlateWell>
            <FactoryFloor />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="fog-computing" label="DEFINITION" title="Fog Computing">
        <Row cols="lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.35rem] flex flex-col gap-6`}>
            <p>
              Fog computing is a decentralized computing model that extends cloud
              computing by bringing data processing closer to the network&apos;s edge.
            </p>
            <p className="border-l-2 border-[var(--dt-ink)]/25 pl-4">
              It bridges the gap between cloud computing (centralized) and{" "}
              edge computing (localized), enabling more efficient and scalable data processing across
              distributed systems.
            </p>
          </div>
          <PlateWell>
            <FogBridge />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="key-characteristics-of-fog-computing"
        label="FOG COMPUTING"
        title="Key Characteristics of Fog Computing"
        exercise={exercise["key-characteristics-of-fog-computing"]}
      >
        <div className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4`}>
          <Item n={1} name="Intermediate Layer">
            <Bullets
              items={[
                <>
                  Sits between edge devices and the cloud, handling data locally but still connecting
                  to the cloud for large-scale analysis.
                </>,
              ]}
            />
          </Item>
          <Item n={2} name="Distributed Processing">
            <Bullets
              items={[
                <>
                  Data is processed across multiple fog nodes (e.g., routers,
                  gateways) within the network (i.e. local network).
                </>,
              ]}
            />
          </Item>
          <Item n={3} name="Scalability">
            <Bullets
              items={[
                <>
                  Can handle large volumes of data from multiple IoT devices without{" "}
                  overwhelming the cloud.
                </>,
              ]}
            />
          </Item>
          <Item n={4} name="Supports Real-Time Applications">
            <Bullets
              items={[
                <>
                  Offers low-latency processing for applications like smart cities and{" "}
                  industrial IoT.
                </>,
              ]}
            />
          </Item>
        </div>
        <PlateWell>
          <FogLoad />
        </PlateWell>
      </Slide>

      <Slide
        id="fog-computing-in-smart-cities"
        label="USE CASE"
        title="Fog Computing in Smart Cities"
        exercise={exercise["fog-computing-in-smart-cities"]}
      >
        <Row cols="lg:grid-cols-[1.2fr_0.8fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.25rem] flex flex-col gap-4`}>
            <p>
              <strong>Company:</strong> Cisco
            </p>
            <div>
              <p>
                <strong>Scenario:</strong> Cisco enables smart cities to use fog computing for applications like:
              </p>
              <Bullets
                className="mt-3 gap-2"
                items={[
                  <>
                    Managing traffic lights based on real-time traffic conditions.
                  </>,
                  <>
                    Processing surveillance camera data locally for faster threat detection.
                  </>,
                  <>
                    Enhancing energy efficiency through real-time monitoring of utilities.
                  </>,
                ]}
              />
            </div>
          </div>
          <PlateWell>
            <CityFog />
          </PlateWell>
        </Row>
      </Slide>

      <Summary
        id="conclusion"
        title="Conclusion"
        takeaways={[
          "Introduction to Cloud, Fog, and Edge computing",
          "Cloud service models (IaaS, PaaS, SaaS)",
          "IaaS in different industries",
          "Edge, Fog, and Cloud, and how to combine them effectively",
        ]}
      />
    </main>
  );
}
