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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import Image from "next/image"

import netflixImg from "./netflix_timeline.png"
import changeMgmtImg from "./images.png"
import kotterImg from "./john-kotter-model-of-change.png"
import adkarImg from "./ADKAR elements@2x.png"
import agileVsTradImg from "./infographic-traditional-pm-vs-agile-pm.png"
import rugbyImg from "./ST_vs_Gloucester_-_Match_-_23.jpeg"
import scrumMethImg from "./scrum-methodology.png"
import scrumCycleImg from "./scrum-cycle-resized.png"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "Data Analytics" },
  { id: "ch2", label: "Change Management" },
  { id: "ch3", label: "Agile PM" },
  { id: "ch4", label: "Scrum" },
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek3() {
  return (
    <main className="theme-crimson-noir relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
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
        category="WEEK 03 — DIGITAL TRANSFORMATION"
        title="Change Management & Agile Methodologies"
        subtitle="Exploring data-driven strategies, frameworks for organizational change, and iterative agile processes like Scrum."
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="Data Analytics & Strategy"
        description="How prescriptive analytics and data-driven insights form the foundation of strategic decision-making in business, exemplified by the Netflix transformation."
        altBg={true}
      />

      <ZigzagContent
        label="CASE STUDY"
        title="The Transformation of Netflix"
        startRight={false}
        segments={[
          {
            type: "text",
            content: (
              <div className="space-y-4">
                <p>
                  Netflix shifted from a traditional movie rental business model to streaming on demand, fundamentally changing the movie industry. This required adapting to cloud infrastructure, video encoding, and navigating competition and piracy.
                </p>
              </div>
            )
          },
          {
            type: "image",
            imageUrl: netflixImg
          },
          {
            type: "insight",
            label: "PRESCRIPTIVE ANALYTICS",
            content: "Using data to determine an optimal course of action, yielding recommendations for next steps to drive consumer engagement and loyalty."
          },
          {
            type: "text",
            content: (
              <ul className="list-disc pl-4 space-y-2">
                <li><strong>Descriptive:</strong> What happened?</li>
                <li><strong>Diagnostic:</strong> Why did this happen?</li>
                <li><strong>Predictive:</strong> What might happen in the future?</li>
                <li><strong>Prescriptive:</strong> What should we do next?</li>
              </ul>
            )
          }
        ]}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Change Management"
        description="Change management ensures that organizations smoothly transition to digital transformation by aligning people, processes, and technology."
        altBg={false}
      />

      <ZigzagContent
        label="FRAMEWORK"
        title="Navigating Organizational Change"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <div className="space-y-4">
                <p>
                  Transformation goes beyond technology. It requires structured change management to overcome resistance, foster support, and ensure that new processes are integrated deeply into the corporate culture.
                </p>
              </div>
            )
          },
          {
            type: "image",
            imageUrl: kotterImg
          },
          {
            type: "insight",
            label: "KOTTER'S 8-STEP MODEL",
            content: "Developed by Dr. John Kotter, this framework provides a step-by-step process for leading change, effectively utilized by leaders like Satya Nadella at Microsoft."
          },
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { title: "Create Urgency", description: "Highlight the importance of change and the risks of staying the same." },
          { title: "Build Coalition", description: "Form a group of influential people to lead and drive the change effort." },
          { title: "Strategic Vision", description: "Develop a clear vision and outline initiatives to achieve it." },
          { title: "Communicate", description: "Share the vision and strategy constantly with all stakeholders." },
          { title: "Empower Action", description: "Remove obstacles and provide training to help employees act." },
          { title: "Short-Term Wins", description: "Create and celebrate early successes to build momentum." },
          { title: "Consolidate Gains", description: "Use credibility from early wins to tackle larger initiatives." },
          { title: "Anchor in Culture", description: "Ensure the changes become permanent practices and behaviors." }
        ]}
        altBg={true}
      />

      <CinematicQuote
        quote="How can leaders effectively create urgency without causing panic or resistance?"
        author="Class Discussion"
        altBg={false}
      />

      <DataBlock label="INDIVIDUAL FOCUS" title="Prosci ADKAR Model" altBg={false}>
        <div className="flex justify-center mb-12">
          <Image src={adkarImg} alt="ADKAR Elements" className="max-w-full h-auto rounded-xl object-contain max-h-[50vh]" />
        </div>
        <div className="prose prose-invert max-w-4xl mx-auto text-text-secondary text-center">
          <p>The ADKAR Model focuses on the individual aspects of change. To achieve successful change, individuals must reach five key outcomes: <strong>Awareness</strong> of the need, <strong>Desire</strong> to support it, <strong>Knowledge</strong> of how to change, <strong>Ability</strong> to implement, and <strong>Reinforcement</strong> to sustain it.</p>
        </div>
      </DataBlock>

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="Agile Project Management"
        description="A flexible and iterative approach that accommodates change and delivers value efficiently."
        altBg={true}
      />

      <ZigzagContent
        label="COMPARISON"
        title="Traditional vs. Agile"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <div className="space-y-4">
                <p>
                  <strong>Traditional PM</strong> relies on detailed upfront planning, assuming stability and clear end goals. Changes require formal processes, and success is measured by adherence to the original plan and budget.
                </p>
              </div>
            )
          },
          {
            type: "image",
            imageUrl: agileVsTradImg
          },
          {
            type: "text",
            content: (
              <div className="space-y-4">
                <p>
                  <strong>Agile PM</strong> emphasizes a flexible vision, learning, and continuous adaptation through small, manageable iterations. Success is measured by delivering incremental value, even if the end goal shifts.
                </p>
              </div>
            )
          }
        ]}
      />

      <CinematicQuote
        quote="Why do traditional project management methods often struggle to adapt to rapidly changing requirements?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 4 */}
      <ChapterHeader
        id="ch4"
        number="04"
        title="Scrum Methodology"
        description="An Agile framework for iterative and incremental development, popularized in software engineering."
        altBg={true}
      />

      <ZigzagContent
        label="ORIGINS & PILLARS"
        title="The Foundations of Scrum"
        startRight={true}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <div className="space-y-4">
                <p>
                  The term "Scrum" originates from rugby, where players pack closely together to restart play. It reflects the importance of teamwork, collaboration, and collective responsibility.
                </p>
              </div>
            )
          },
          {
            type: "image",
            imageUrl: rugbyImg
          },
          {
            type: "insight",
            label: "EMPIRICAL PROCESS CONTROL",
            content: "Scrum is built on Transparency, Inspection, and Adaptation. It empowers cross-functional, self-organizing teams to deliver value iteratively."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { title: "Empirical Process", description: "Making decisions based on what is known, supported by transparency, inspection, and adaptation." },
          { title: "Self-Organization", description: "Cross-functional teams manage their own work, fostering accountability and ownership." },
          { title: "Collaboration", description: "Regular ceremonies (Daily Scrums, Reviews) promote communication among stakeholders." },
          { title: "Value-Based Priority", description: "Focusing on delivering the most important features first to maximize ROI." },
          { title: "Time Boxing", description: "Fixed time limits for activities (like Sprints) create urgency and maintain focus." },
          { title: "Iterative Development", description: "Small, incremental cycles allow for regular feedback, learning, and continuous adjustment." }
        ]}
        altBg={false}
      />

      <DataBlock label="METHODOLOGY" title="Roles, Events, and Artifacts" altBg={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <Image src={scrumMethImg} alt="Scrum Methodology" className="w-full h-auto rounded-xl object-contain max-h-[40vh]" />
            <p className="text-center text-sm text-text-muted mt-4">Overview of the Scrum Process</p>
          </div>
          <div>
            <Image src={scrumCycleImg} alt="Scrum Cycle" className="w-full h-auto rounded-xl object-contain max-h-[40vh]" />
            <p className="text-center text-sm text-text-muted mt-4">The Sprint Cycle and Events</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-text-secondary text-sm">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Roles</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Product Owner:</strong> Represents stakeholders, manages the product backlog and vision.</li>
              <li><strong>Scrum Master:</strong> Facilitates the process, removes impediments, shields the team from distractions.</li>
              <li><strong>Development Team:</strong> Cross-functional group of professionals that delivers the product increment.</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Events</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Sprint:</strong> A time-boxed iteration (1-4 weeks).</li>
              <li><strong>Planning:</strong> Deciding what work from the backlog to include in the sprint.</li>
              <li><strong>Daily Scrum:</strong> Short 15-minute synchronization meeting to identify impediments.</li>
              <li><strong>Review:</strong> Demonstrating completed work to stakeholders for feedback.</li>
              <li><strong>Retrospective:</strong> Reflecting on the sprint process for continuous improvement.</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Artifacts</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Product Backlog:</strong> Ordered list of all desired work, features, and fixes for the product.</li>
              <li><strong>Sprint Backlog:</strong> Subset of items selected from the product backlog for the current sprint.</li>
              <li><strong>Increment:</strong> Sum of all completed backlog items that meet the "done" criteria.</li>
            </ul>
          </div>
        </div>
      </DataBlock>

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Digital transformation demands both effective change management and adaptable project execution. Frameworks like Kotter's 8-Step and ADKAR guide organizational transition, while Agile and Scrum empower teams to deliver continuous value in complex environments."
        takeaways={[
          "Change management aligns people and culture, crucial for adopting new technologies.",
          "Agile project management embraces uncertainty by valuing iterative development over rigid upfront planning.",
          "Scrum provides a structured yet flexible framework to foster collaboration, self-organization, and rapid delivery."
        ]}
      />
    </main>
  )
}
