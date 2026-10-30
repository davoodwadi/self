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
  Kicker,
  Term,
  Summary,
} from "../_visuals/kit";
import {
  HeroDataToValue,
  StructuredTable,
  UnstructuredHeap,
  Volume,
  Velocity,
  Variety,
  DataLake,
  DataWarehouse,
  BatchProcessing,
  StreamProcessing,
  AnalyticsTimeline,
  ValueChain,
  DataChain,
  PeopleAndTechnology,
  SocialNetwork,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "Data Structures" },
  { id: "ch2", label: "Big Data" },
  { id: "ch3", label: "Analytics Technology" },
  { id: "ch4", label: "Porter's Value Chain" },
  { id: "ch5", label: "Data Value Chain" },
  { id: "ch6", label: "Socio-Technical Systems" },
  { id: "conclusion", label: "Summary" },
];

// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic in content.md carries one exercise of the
// type that fits it, and it only tests what the slide has just taught.
const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/* Body copy in upright sans-serif. */
const BODY =
  "font-sans text-base md:text-[1.0625rem] leading-[1.6] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--dt-ink)]";
const LIST =
  "list-none flex flex-col gap-1 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rounded-full [&>li]:before:shrink-0 [&>li]:before:bg-[var(--ink-3)]";

export default function DigitalTransformationWeek2() {
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
        category="Week 2: Digital Transformation"
        title="Big Data, Porter's Value Chain, and Socio-Technical Systems"
        subtitle="Exploring data structures, Big Data concepts, and organizational frameworks."
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        plate={<HeroDataToValue />}
      />

      {/* ================================================================
          CHAPTER 1: DATA STRUCTURES
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="Data Structures" />

      <Slide
        id="structured-and-unstructured-data"
        title="Structured and Unstructured Data"
        exercise={exercise["structured-and-unstructured-data"]}
      >
        <p className="font-sans text-xl md:text-2xl leading-[1.4] text-[var(--dt-ink)] max-w-4xl">
          Structured and unstructured data are two primary categories of data that differ in their{" "}
          organization, format, and ease of analysis.
        </p>
        <Row className="!items-start">
          <div className={`${BODY} flex flex-col gap-4`}>
            <p className="md:min-h-[4.8em]">
              <strong>Structured data</strong> refers to information that is organized in a predefined manner,
              typically in rows and columns, making it easily searchable and analyzable.
            </p>
            <PlateWell>
              <StructuredTable />
            </PlateWell>
            <div>
              <p className="font-sans font-semibold text-sm text-[var(--ink-3)] mb-2">Examples:</p>
              <ul className={`${LIST} sm:grid sm:grid-cols-2 sm:gap-x-6`}>
                <li>Customer databases (e.g., names, addresses, phone numbers)</li>
                <li>Transaction records (e.g., sales data)</li>
                <li>Inventory lists</li>
                <li>Sensor data in a structured format</li>
              </ul>
            </div>
          </div>
          <div className={`${BODY} flex flex-col gap-4`}>
            <p className="md:min-h-[4.8em]">
              <strong>Unstructured data</strong> refers to information that does not have a predefined format or
              structure.
            </p>
            <PlateWell>
              <UnstructuredHeap />
            </PlateWell>
            <div>
              <p className="font-sans font-semibold text-sm text-[var(--ink-3)] mb-2">Examples:</p>
              <ul className={`${LIST} sm:grid sm:grid-cols-2 sm:gap-x-6`}>
                <li>Social media posts and comments</li>
                <li>Emails and text messages</li>
                <li>Images and videos</li>
                <li>Web pages and blogs</li>
                <li>Sensor data in raw format</li>
              </ul>
            </div>
          </div>
        </Row>
      </Slide>

      <DiscussionList
        questions={[
          "Why is it important to distinguish between Structured and Unstructured Data?",
          "How to distinguish between Structured and Unstructured Data?",
          "Why did companies focus more on Structured data vs. Unstructured data?",
        ]}
      />

      {/* ================================================================
          CHAPTER 2: BIG DATA
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Big Data" />

      <Slide
        id="big-data-and-the-three-vs"
        title="Big Data and the Three Vs"
        exercise={exercise["big-data-and-the-three-vs"]}
      >
        <p className="font-sans text-xl md:text-2xl leading-[1.4] text-[var(--dt-ink)] max-w-5xl">
          <strong className="font-semibold">Big Data</strong> refers to the vast volumes of structured and unstructured data that are
          generated at high velocity from various sources, including social media, sensors, devices,
          transactions, and more.
        </p>
        <p className={BODY}>
          Big Data is often characterized by the{" "}
          <strong className="font-semibold">&ldquo;Three Vs&rdquo;</strong>:
        </p>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: "Volume",
              text: "The amount of data generated is enormous, often measured in terabytes or petabytes.",
              plate: <Volume />,
            },
            {
              name: "Velocity",
              text: "Data is generated and processed at an unprecedented speed (e.g., Real-time).",
              plate: <Velocity />,
            },
            {
              name: "Variety",
              text: "Data comes in various formats, including structured data (like databases), and unstructured data (like text, images, and videos).",
              plate: <Variety />,
            },
          ].map((v, i) => (
            <div key={v.name} className={`${BODY} flex flex-col gap-3 border-t border-[var(--dt-ink)]/15 pt-4`}>
              <p className="font-sans font-semibold text-xl leading-snug text-[var(--dt-ink)] flex items-baseline gap-3">
                <span className="text-sm font-medium text-[var(--ink-3)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {v.name}
              </p>
              <p className="md:min-h-[6.4em]">{v.text}</p>
              <PlateWell>{v.plate}</PlateWell>
            </div>
          ))}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 3: BIG DATA ANALYTICS TECHNOLOGY
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="Big Data Analytics Technology" />

      <Slide id="data-storage" title="Data Storage" exercise={exercise["data-storage"]}>
        <Row className="!items-start">
          <div className={`${BODY} flex flex-col gap-4`}>
            <Term name="Data Lakes">
              Repositories that store vast amounts of raw data in its native format until it is needed for
              analysis.
            </Term>
            <PlateWell>
              <DataLake />
            </PlateWell>
          </div>
          <div className={`${BODY} flex flex-col gap-4`}>
            <Term name="Data Warehouses">
              Centralized repositories that store structured data from multiple sources, optimized for query and
              analysis.
            </Term>
            <PlateWell>
              <DataWarehouse />
            </PlateWell>
          </div>
        </Row>
      </Slide>

      <Slide id="data-processing-frameworks" title="Data Processing Frameworks">
        {[
          {
            name: "Batch Processing",
            text: "Techniques that process large volumes of data at once, such as Apache Hadoop.",
            plate: <BatchProcessing />,
          },
          {
            name: "Stream Processing",
            text: "Techniques that analyze data in real-time as it is generated, such as Apache Kafka and Apache Flink.",
            plate: <StreamProcessing />,
          },
        ].map((p) => (
          <Row key={p.name} cols="md:grid-cols-[1fr_1.6fr]">
            <div className={BODY}>
              <Term name={p.name}>{p.text}</Term>
            </div>
            <PlateWell>{p.plate}</PlateWell>
          </Row>
        ))}
      </Slide>

      <Slide id="analytics-tools" title="Analytics Tools" exercise={exercise["analytics-tools"]}>
        <div className={`${BODY} grid md:grid-cols-3 gap-6 md:gap-8`}>
          <Term name="Descriptive Analytics">
            Tools that summarize historical data to understand what has happened (e.g., dashboards, reporting
            tools).
          </Term>
          <Term name="Predictive Analytics">
            Techniques that use statistical models and machine learning to forecast future outcomes based on
            historical data.
          </Term>
          <Term name="Prescriptive Analytics">
            Advanced analytics that{" "}
            recommends actions based on data
            analysis, often using optimization algorithms.
          </Term>
        </div>
        <PlateWell>
          <AnalyticsTimeline />
        </PlateWell>
      </Slide>

      {/* ================================================================
          CHAPTER 4: PORTER'S VALUE CHAIN
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Porter's Value Chain" />

      <Slide id="porters-value-chain" title="Porter's Value Chain">
        <ol className="flex flex-col max-w-4xl">
          {[
            <>The Porter Value Chain is a concept developed by Michael E. Porter in his 1985 book.</>,
            <>
              It is a framework that helps businesses analyze their internal activities to identify areas where
              they can create value and gain a{" "}
              competitive advantage.
            </>,
            <>The value chain breaks down a company&apos;s activities into primary and support activities.</>,
            <>
              allowing organizations to understand how each contributes to the overall value delivered to
              customers.
            </>,
          ].map((s, i) => (
            <li
              key={i}
              className="font-sans text-lg md:text-xl leading-[1.55] text-[var(--dt-ink)] py-4 border-t border-[var(--dt-ink)]/12 first:border-t-0 first:pt-0"
            >
              {s}
            </li>
          ))}
        </ol>
      </Slide>

      <Slide
        id="primary-and-support-activities"
        title="Primary and Support Activities"
        exercise={exercise["primary-and-support-activities"]}
      >
        <div className={`${BODY} grid md:grid-cols-2 gap-6 md:gap-10`}>
          <div>
            <p className="font-sans font-semibold text-lg text-[var(--dt-ink)] mb-2">Primary Activities</p>
            <ul className={LIST}>
              <li><Term name="Inbound Logistics">Receiving, warehousing, and inventory management of raw materials.</Term></li>
              <li><Term name="Operations">Processes that transform inputs into the final product or service.</Term></li>
              <li><Term name="Outbound Logistics">Activities required to get the finished product to the customer, including storage and order fulfillment.</Term></li>
              <li><Term name="Marketing and Sales">Strategies and activities to promote and sell the product or service.</Term></li>
              <li><Term name="Service">Activities related to maintaining and enhancing the product&apos;s value after purchase.</Term></li>
            </ul>
          </div>
          <div>
            <p className="font-sans font-semibold text-lg text-[var(--dt-ink)] mb-2">Support Activities</p>
            <ul className={LIST}>
              <li><Term name="Procurement">The process of acquiring the goods and services a company needs to carry out its operations.</Term></li>
              <li><Term name="Technology Development">Activities related to managing and developing technology, including research and development, process automation, and product design.</Term></li>
              <li><Term name="Human Resource Management">Activities related to recruiting, hiring, training, and developing the workforce.</Term></li>
              <li><Term name="Firm Infrastructure">Organizational structure, management, planning, finance, and quality control systems that support the entire value chain.</Term></li>
            </ul>
          </div>
        </div>
        <div className="hidden sm:block">
          <PlateWell>
            <ValueChain />
          </PlateWell>
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 5: DATA VALUE CHAIN
          ================================================================ */}
      <ChapterBand id="ch5" number="05" title="Data Value Chain" />

      {[
        {
          id: "data-value-chain-generation-to-storage",
          title: "Data Value Chain: Generation to Storage",
          lead: "The Data Value Chain is a conceptual framework that outlines the various stages involved in transforming raw data into valuable insights and actionable outcomes.",
          from: 0,
          stages: [
            ["Data Generation", "This is the initial stage where data is created or collected. Data can come from various sources, including sensors, transactions, social media, surveys, etc."],
            ["Data Collection", "In this stage, the generated data is gathered and stored. This may involve data entry (manual), data scraping, or automated data collection methods."],
            ["Data Storage", "Once collected, data needs to be stored in a way that allows for easy access and retrieval. This can involve databases, data lakes, or cloud storage solutions."],
          ],
        },
        {
          id: "data-value-chain-processing-to-visualization",
          title: "Data Value Chain: Processing to Visualization",
          from: 3,
          stages: [
            ["Data Processing", "This stage involves cleaning, transforming, and organizing the data to make it suitable for analysis. Data processing may include removing duplicates, handling missing values, and converting data into a standardized format."],
            ["Data Analysis", "In this phase, analytical techniques are applied to the processed data to extract insights. This can involve statistical analysis, machine learning, data mining, and other analytical methods to identify patterns, trends, and correlations."],
            ["Data Visualization", "The insights gained from data analysis are often presented through visualizations, such as charts, graphs, and dashboards. This helps stakeholders understand the findings and make informed decisions."],
          ],
        },
        {
          id: "data-value-chain-interpretation-to-feedback",
          title: "Data Value Chain: Interpretation to Feedback",
          from: 6,
          stages: [
            ["Data Interpretation", "This stage involves interpreting the visualized data and insights to derive meaningful conclusions. It requires domain knowledge and expertise to understand the implications of the data."],
            ["Data Utilization", "Finally, the insights are used to inform decision-making, drive strategy, improve processes, or create new products and services. This stage emphasizes the practical application of data insights to achieve business objectives."],
            ["Feedback and Iteration", "The Data Value Chain is often iterative, meaning that feedback from the utilization stage can lead to new data generation, collection, and analysis efforts. This continuous cycle helps organizations adapt and improve their data strategies over time."],
          ],
        },
      ].map((s) => (
        <Slide key={s.id} id={s.id} title={s.title} exercise={exercise[s.id]}>
          {s.lead && <p className="font-sans text-lg md:text-xl leading-[1.5] text-[var(--dt-ink)] max-w-4xl">{s.lead}</p>}
          <PlateWell>
            <DataChain active={s.from} />
          </PlateWell>
          <ol className={`${BODY} grid md:grid-cols-3 gap-6 md:gap-8`}>
            {s.stages.map(([name, text], i) => (
              <li key={name} className="border-t border-[var(--dt-ink)]/15 pt-3">
                <p className="font-sans font-semibold text-lg text-[var(--dt-ink)] mb-1 flex items-baseline gap-3">
                  <span className="font-sans font-medium text-sm text-[var(--ink-3)] tabular-nums">
                    {String(s.from + i + 1).padStart(2, "0")}
                  </span>
                  {name}
                </p>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </Slide>
      ))}

      {/* ================================================================
          CHAPTER 6: SOCIO-TECHNICAL SYSTEMS
          ================================================================ */}
      <ChapterBand id="ch6" number="06" title="Socio-Technical Systems" />

      <Slide id="socio-technical-systems" title="Socio-Technical Systems">
        <Row cols="lg:grid-cols-[1fr_1.1fr]">
          <div className={`${BODY} text-lg flex flex-col gap-5`}>
            <p>
              <strong>Socio-Technical Systems (STS)</strong> refer to an approach to complex organizational work
              design that recognizes the interaction between people (the social system) and technology (the
              technical system).
            </p>
            <p>
              The concept emphasizes that both social and technical elements must be{" "}
              considered together to optimize
              performance, enhance productivity, and improve overall system effectiveness.
            </p>
          </div>
          <PlateWell>
            <PeopleAndTechnology />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="social-system" title="Social System">
        <Row cols="lg:grid-cols-[1.3fr_1fr]">
          <div className={`${BODY} text-lg flex flex-col gap-4`}>
            <p>
              A <strong>social system</strong> refers to the network of relationships, interactions, and structures
              that exist among individuals and groups within a society or organization.
            </p>
            <p>
              It encompasses the social dynamics, norms, values, roles, and behaviors that shape how people relate
              to one another and work together.
            </p>
          </div>
          <PlateWell>
            <SocialNetwork />
          </PlateWell>
        </Row>
        <div>
          <p className="font-sans font-semibold text-lg text-[var(--dt-ink)] mb-3">Characteristics of a Social System</p>
          <div className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
            <p className="border-t border-[var(--dt-ink)]/15 pt-3">
              <strong>Interdependence</strong>: The members of a social system are interdependent, meaning that the
              actions of one individual or group can impact others.
            </p>
            <p className="border-t border-[var(--dt-ink)]/15 pt-3">
              <strong>Adaptability</strong>: Social systems can adapt to changes in their environment, including
              shifts in technology, market conditions, or social norms.
            </p>
            <p className="border-t border-[var(--dt-ink)]/15 pt-3">
              <strong>Complexity</strong>: Social systems are complex and dynamic, with multiple interacting
              elements. This complexity can lead to emergent behaviors that are not easily predictable based on the
              individual components.
            </p>
            <p className="border-t border-[var(--dt-ink)]/15 pt-3">
              <strong>Stability and Change</strong>: While social systems strive for stability and cohesion, they
              are also subject to change. Factors such as leadership changes, organizational restructuring, or
              shifts in external conditions can disrupt the status quo.
            </p>
          </div>
        </div>
      </Slide>

      <Slide
        id="technical-system"
        title="Technical System"
        exercise={exercise["technical-system"]}
      >
        <p className="font-sans text-lg md:text-xl leading-[1.5] text-[var(--dt-ink)] max-w-4xl">
          A <strong className="font-semibold">technical system</strong> refers to the collection of tools, technologies, processes, and
          structures that are used to perform tasks and achieve objectives within an organization or a specific
          context.
        </p>
        <div>
          <p className="font-sans font-semibold text-lg text-[var(--dt-ink)] mb-3">Components of a Technical System</p>
          <ol className={`${BODY} grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5`}>
            {[
              ["Hardware", "This includes the physical devices and equipment used in the system, such as computers, servers, machinery, and other tools."],
              ["Software", "Software encompasses the programs and applications that run on hardware. This includes operating systems, productivity software, specialized applications, and databases that support various functions within the organization."],
              ["Processes", "Technical systems involve specific processes and workflows that dictate how tasks are performed. standard operating procedures, algorithms, and methodologies that guide the use of technology."],
              ["Data", "It includes the information that is processed, stored, and analyzed by the system."],
              ["Networks", "local area networks (LANs), wide area networks (WANs), the internet"],
              ["User Interfaces", "The design of user interfaces (UIs) is crucial for ensuring that users can effectively interact with the technical system. Good UI design enhances usability and user experience, making it easier for individuals to perform their tasks."],
              ["Support and Maintenance", "troubleshooting, updates, training for users to keep the system running smoothly."],
            ].map(([name, text], i) => (
              <li key={name} className="border-t border-[var(--dt-ink)]/15 pt-3">
                <p className="font-sans font-semibold text-base text-[var(--dt-ink)] mb-1 flex items-baseline gap-2">
                  <span className="font-sans font-medium text-xs text-[var(--ink-3)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {name}
                </p>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Slide>

      <Summary
        id="conclusion"
        title="Summary"
        summary="Structured data is organized in rows and columns. Unstructured data has no predefined format or structure."
        takeaways={[
          "Big Data is characterized by Volume, Velocity, and Variety.",
          "Big data analytics technology stores, processes, and analyzes data to describe what has happened, forecast what will happen, and recommend actions.",
          "Porter's Value Chain breaks a company's activities into primary and support activities.",
          "The Data Value Chain transforms raw data into valuable insights and actionable outcomes.",
          "Socio-Technical Systems consider people and technology together.",
        ]}
      />
    </main>
  );
}
