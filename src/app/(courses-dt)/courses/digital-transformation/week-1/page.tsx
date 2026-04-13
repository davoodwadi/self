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

import dddImg from "./ddd.jpeg"
import dtImg from "./dt.png"
import dtPyramidImg from "./dt_pyramid.png"
import Image from "next/image"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "Foundations" },
  { id: "ch2", label: "Evolution" },
  { id: "ch3", label: "The Pyramid" },
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek1() {
  return (
    <main className="theme-obsidian-gold relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
      <ProgressBar />
      <FloatingNav sections={SECTIONS} />

      <Hero
        category="WEEK 01 — DIGITAL TRANSFORMATION"
        title="Introduction to Digital Transformation"
        subtitle="Fundamentally changing how businesses operate and deliver value to customers by integrating digital technology into all areas."
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="Foundations"
        description="Understanding the core principles and key components that drive successful digital transformation in modern organizations."
        altBg={true}
      />

      <ZigzagContent
        label="CORE PRINCIPLE"
        title="More Than Just Technology"
        startRight={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Digital transformation is the integration of digital technology into all areas of a business. It fundamentally changes how businesses operate and deliver value to customers.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: dtImg
          },
          {
            type: "text",
            content: (
              <p>
                It requires a cultural shift that challenges the status quo. Technology is a key enabler, but people and processes are equally important.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                Data-driven decision-making is essential for successful transformation, ensuring that strategies are aligned with actual market demands and operational realities.
              </p>
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { title: "Technology Integration", description: "Adoption of cloud computing, AI, big data analytics, IoT, and automation to streamline processes." },
          { title: "Cultural Change", description: "Encouraging a mindset of innovation, agility, and collaboration among employees at all levels." },
          { title: "Customer-Centric", description: "Leveraging data to understand and meet customer needs, delivering personalized experiences." },
          { title: "Process Optimization", description: "Reengineering business processes to eliminate inefficiencies and enhance productivity." },
          { title: "Data-Driven Decisions", description: "Harnessing the power of data to inform strategies, operations, and drive growth." },
          { title: "Agility & Flexibility", description: "Quickly adapting to new technologies, market trends, and changing customer demands." }
        ]}
        altBg={true}
      />

      <CinematicQuote
        quote="Which company exemplifies Digital Transformation?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Evolution"
        description="Distinguishing between digitization, digitalization, and true digital transformation."
        altBg={true}
      />

      <ZigzagContent
        label="THEORY"
        title="Digitization vs. Digitalization"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                <strong>Digitization</strong> refers to converting analog information into digital format. It involves the use of technology to improve efficiency and accuracy.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: dddImg
          },
          {
            type: "insight",
            label: "KEY INSIGHT",
            content: "Digital transformation goes beyond digitization by rethinking business models and processes, focusing on enhancing customer experiences and creating new value propositions."
          },
          {
            type: "text",
            content: (
              <p>
                <strong>Digitalization</strong> is the use of digital technologies to change a business model and provide new revenue and value-producing opportunities. It is the process of moving to a digital business.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                Successful digital transformation requires a strategic vision and leadership commitment, connecting all digital initiatives into a cohesive strategy.
              </p>
            )
          }
        ]}
      />

      <CinematicQuote
        quote="How can organizations ensure that their digitization efforts align with their overall digital transformation strategy?"
        author="Class Discussion"
        altBg={true}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="The Transformation Pyramid"
        description="A structural framework for implementing digital transformation across the organization."
        altBg={false}
      />

      <DataBlock label="FRAMEWORK" title="The 6 Layers of Transformation" altBg={true}>
        <div className="flex justify-center mb-12">
          <Image src={dtPyramidImg} alt="Digital Transformation Pyramid" className="max-w-full h-auto rounded-xl object-contain max-h-[60vh]" />
        </div>
      </DataBlock>

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "1", title: "Foundation Layer", description: "Essential technology infrastructure (hardware, software, networks, cybersecurity)." },
          { number: "2", title: "Data Layer", description: "Data collection, management, and analytics to drive insights and decision-making." },
          { number: "3", title: "Process Layer", description: "Re-engineering business processes for automation, efficiency, and agility." },
          { number: "4", title: "Customer Experience", description: "Enhancing the customer experience through CRM, digital marketing, and UX design." },
          { number: "5", title: "Culture & Leadership", description: "Change management, training, and fostering a culture of innovation and collaboration." },
          { number: "6", title: "Innovation Layer", description: "Continuous exploration of new technologies, R&D, experimentation, and partnerships." }
        ]}
        altBg={false}
      />

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Digital transformation is a comprehensive journey that goes far beyond simply adopting new technologies. It requires rethinking business models, re-engineering processes, and cultivating a culture that embraces change and data-driven decision making."
        takeaways={[
          "Transformation requires a cultural shift, not just technological upgrades.",
          "Digitization is the conversion of data, while transformation is the reinvention of the business.",
          "A structured approach, like the Transformation Pyramid, is essential for strategic alignment."
        ]}
      />
    </main>
  )
}
