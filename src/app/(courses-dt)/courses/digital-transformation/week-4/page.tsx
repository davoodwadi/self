import React from "react"
import {
  ProgressBar,
  FloatingNav,
  Hero,
  ChapterHeader,
  ZigzagContent,
  ConceptCardsZigzag,
  CinematicQuote,
  Conclusion,
  DataBlock
} from "@/components/presentation"

import tamImage from "./1200px-Technology_Acceptance_Model.png"
import utautImage from "./UTAUT-model-Adapted-from-Venkatesh-et-al-2003.png"
import iotImage from "./iota-iot_system.png"
import cloudComputingImage from "./Cloud_computing.svg.png"
import Image from "next/image"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "TAM" },
  { id: "ch2", label: "TAM Applications" },
  { id: "ch3", label: "UTAUT Model" },
  { id: "ch4", label: "Emerging Paradigms" },
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek4() {
  return (
    <main className="theme-emerald-academy relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
      <ProgressBar />
      <FloatingNav sections={SECTIONS} />
      {/* Navigation */}
      <Link
        href="/courses/digital-transformation"
        className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 text-[var(--charcoal-light)] hover:text-[var(--crimson)] hover:border-[var(--crimson)] hover:bg-[var(--crimson)]/5 transition-colors duration-300 group "
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <Hero
        category="WEEK 04 — DIGITAL TRANSFORMATION"
        title="Technology Acceptance Models & Emerging Paradigms"
        subtitle="Understanding TAM, UTAUT, IoT, Cloud, Edge, and Fog Computing"
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="Technology Acceptance Model (TAM)"
        description="A theoretical framework that explains and predicts how users come to accept and use a technology."
        altBg={true}
      />

      <ZigzagContent
        label="THEORETICAL FRAMEWORK"
        title="What drives adoption?"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Developed by Fred Davis in 1986, the Technology Acceptance Model (TAM) is widely used in information systems research to understand user behavior regarding technology adoption.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: tamImage
          },
          {
            type: "insight",
            label: "REFLECTION QUESTION",
            content: "Think of a time you adopted a new app or tool. What specific factors convinced you to use it? Did you care more about how intuitive it was or how much value it added?"
          },
          {
            type: "text",
            content: (
              <p>
                External variables such as System Features, User Characteristics, Social Influence, and Training influence Perceived Usefulness (PU) and Perceived Ease of Use (PEOU).
              </p>
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "01", title: "Perceived Usefulness (PU)", description: "The degree to which a person believes that using a particular technology will enhance their job performance or productivity." },
          { number: "02", title: "Perceived Ease of Use (PEOU)", description: "The degree to which a person believes that using a technology will be free of effort." },
          { number: "03", title: "Attitude Toward Use", description: "Determined by perceived usefulness and perceived ease of use. A positive attitude can lead to higher technology adoption." },
          { number: "04", title: "Behavioral Intention", description: "The attitude toward use affects the behavioral intention to use the technology." }
        ]}
        altBg={true}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Applications of TAM"
        description="Real-world case studies of applying TAM to analyze technology adoption in various industries."
        altBg={false}
      />

      <ZigzagContent
        label="CASE STUDY"
        title="E-Commerce & Healthcare"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                When BestBuy introduces a new AI-powered virtual shopping assistant, TAM helps analyze how external variables like personalized recommendations and online reviews influence perceived usefulness and ease of use.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                Similarly, a hospital adopting an AI-powered chatbot for patient triage can evaluate acceptance. Patients appreciate the simple interface (ease of use), while staff value the reduction in waiting times and filtering of non-urgent cases (usefulness).
              </p>
            )
          },
          {
            type: "insight",
            label: "IKEA'S SELF-RETURN KIOSK",
            content: "Customers find the kiosk intuitive due to clear instructions (PEOU), and useful because it eliminates waiting in line (PU). This drives behavioral intention and actual system use."
          }
        ]}
      />

      <CinematicQuote
        quote="When forced to use a new technology in public, what types of apprehensions do you face? How can these apprehensions be alleviated?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="The UTAUT Model"
        description="The Unified Theory of Acceptance and Use of Technology integrates elements from several existing models."
        altBg={true}
      />

      <ZigzagContent
        label="THEORETICAL FRAMEWORK"
        title="Beyond Usefulness & Ease"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Introduced by Venkatesh et al. in 2003, UTAUT integrates elements from TAM, the Theory of Planned Behavior, and the Motivational Model to provide a comprehensive view of technology acceptance.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: utautImage
          },
          {
            type: "text",
            content: (
              <p>
                UTAUT identifies four primary constructs that significantly influence technology acceptance: Performance Expectancy, Effort Expectancy, Social Influence, and Facilitating Conditions.
              </p>
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "1", title: "Performance Expectancy", description: "How much the technology is perceived to enhance job performance." },
          { number: "2", title: "Effort Expectancy", description: "Reflects the ease of use associated with the technology." },
          { number: "3", title: "Social Influence", description: "How much individuals perceive that important others believe they should use the new technology." },
          { number: "4", title: "Facilitating Conditions", description: "The resources and support available to individuals, such as infrastructure and training." }
        ]}
        altBg={true}
      />

      <ZigzagContent
        label="MODERATING VARIABLES"
        title="Factors Influencing Adoption"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Unlike simpler models, UTAUT introduces moderating variables—Age, Gender, Experience, and Voluntariness of Use—that affect how strongly the primary constructs influence acceptance.
              </p>
            )
          },
          {
            type: "insight",
            label: "KEY INSIGHT",
            content: "For example, younger customers may adopt technology more quickly, while experienced users adapt faster. Whether usage is mandatory or voluntary also significantly impacts adoption rates."
          }
        ]}
      />

      {/* CHAPTER 4 */}
      <ChapterHeader
        id="ch4"
        number="04"
        title="Emerging Computing Paradigms"
        description="Understanding the infrastructure that powers modern digital transformation: IoT, Cloud, Edge, and Fog Computing."
        altBg={false}
      />

      <ZigzagContent
        label="INTERNET OF THINGS"
        title="Connecting the Physical World"
        startRight={false}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                The Internet of Things (IoT) refers to a network of interconnected devices that collect, share, and act on data. From smart thermostats to connected cars, these devices constantly gather information.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: iotImage
          },
          {
            type: "text",
            content: (
              <p>
                The Industrial Internet of Things (IIoT) brings these concepts to manufacturing, improving efficiency. However, managing these devices introduces significant privacy and security challenges.
              </p>
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={true}
        cards={[
          { title: "Cloud Computing", description: "Delivers computing resources (storage, processing, software) over the internet. Offers scalability and centralized remote access (e.g., AWS, Google Drive)." },
          { title: "Edge Computing", description: "Processes data near its source (e.g., on IoT devices or local servers). Reduces latency and bandwidth usage, critical for real-time tasks like autonomous vehicles." },
          { title: "Fog Computing", description: "Acts as a bridge between cloud and edge. Distributes processing tasks across local networks, analyzing data locally before sending summaries to the cloud." }
        ]}
        altBg={false}
      />

      <DataBlock label="ARCHITECTURE" title="Cloud Computing Overview" altBg={false}>
        <div className="flex justify-center mb-12">
          <Image src={cloudComputingImage} alt="Cloud Computing Architecture" className="max-w-full h-auto rounded-xl object-contain max-h-[60vh]" />
        </div>
      </DataBlock>

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Technology adoption depends on perceived usefulness, ease of use, social influence, and facilitating conditions. Meanwhile, the infrastructure supporting these technologies has evolved from centralized cloud computing to distributed edge and fog architectures, enabling real-time IoT applications."
        takeaways={[
          "TAM relies on Perceived Usefulness and Perceived Ease of Use.",
          "UTAUT adds Social Influence, Facilitating Conditions, and moderating variables.",
          "IoT connects devices to collect and share data.",
          "Cloud provides centralized processing, while Edge and Fog bring computation closer to the data source."
        ]}
      />
    </main>
  )
}
