import React from "react"
import {
  ProgressBar,
  FloatingNav,
  Hero,
  ChapterHeader,
  ZigzagContent,
  ConceptCardsZigzag,
  CinematicQuote,
  Conclusion
} from "@/components/presentation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import dataTypesImg from "./structured_vs_unstructured_data_gramener.png"
import igneosImg from "./structuredVsUnstructuredIgneos.png"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "Data Structures" },
  { id: "ch2", label: "Historical Focus" },
  { id: "ch3", label: "Big Data" },
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek2() {
  return (
    <main className="theme-midnight-sapphire relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
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
        category="WEEK 02 — DIGITAL TRANSFORMATION"
        title="Big Data, Porter's Value Chain, and Socio-Technical Systems"
        subtitle="Exploring data structures, Big Data concepts, and organizational frameworks."
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="Data Structures"
        description="Structured and unstructured data are two primary categories of data that differ in their organization, format, and ease of analysis."
        altBg={true}
      />

      <ZigzagContent
        label="CORE CONCEPT"
        title="Structured vs. Unstructured Data"
        startRight={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                <strong>Structured data</strong> refers to information that is organized in a predefined manner, typically in rows and columns, making it easily searchable and analyzable.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: dataTypesImg
          },
          {
            type: "text",
            content: (
              <p>
                <strong>Unstructured data</strong> refers to information that does not have a predefined format or structure, such as social media posts, emails, and raw sensor data.
              </p>
            )
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { title: "Customer Databases", description: "Structured data example: names, addresses, phone numbers organized in a database." },
          { title: "Transaction Records", description: "Structured data example: sales data and inventory lists." },
          { title: "Social Media", description: "Unstructured data example: posts, comments, and interactions across platforms." },
          { title: "Multimedia", description: "Unstructured data example: images, videos, web pages, and blogs." }
        ]}
        altBg={true}
      />

      <CinematicQuote
        quote="Why is it important to distinguish between Structured and Unstructured Data?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Historical Focus on Data Types"
        description="Analyzing why organizations historically prioritized certain types of data over others."
        altBg={true}
      />

      <CinematicQuote
        quote="How do we distinguish between Structured and Unstructured Data in practical applications?"
        author="Class Discussion"
        altBg={true}
      />

      <ZigzagContent
        label="ANALYSIS"
        title="The Focus on Structured Data"
        startRight={false}
        altBg={false}
        segments={[
          {
            type: "image",
            imageUrl: igneosImg
          },
          {
            type: "text",
            content: (
              <p>
                Historically, companies focused more on structured data because it fit neatly into relational databases and was much easier to process, query, and analyze with traditional business intelligence tools.
              </p>
            )
          }
        ]}
      />

      <CinematicQuote
        quote="Why did companies focus more on Structured data vs. Unstructured data?"
        author="Class Discussion"
        altBg={true}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="Big Data"
        description="Understanding the characteristics and impact of Big Data in modern digital transformation."
        altBg={false}
      />

      <ZigzagContent
        label="DEFINITION"
        title="What is Big Data?"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                <strong>Big Data</strong> refers to the vast volumes of structured and unstructured data that are generated at high velocity from various sources, including social media, sensors, devices, transactions, and more.
              </p>
            )
          },
          {
            type: "insight",
            label: "KEY COMPONENT",
            content: "The true value of Big Data lies not just in its volume, but in the ability to process and analyze it to uncover hidden patterns, unknown correlations, and valuable insights."
          }
        ]}
      />

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Understanding the differences between structured and unstructured data is fundamental to navigating the Big Data landscape. Organizations must harness both data types to fully leverage their digital transformation efforts."
        takeaways={[
          "Structured data is easily searchable, while unstructured data lacks a predefined format.",
          "Historically, structured data was prioritized due to technological limitations.",
          "Big Data encompasses vast volumes of both structured and unstructured data generated at high velocity."
        ]}
      />
    </main>
  )
}
