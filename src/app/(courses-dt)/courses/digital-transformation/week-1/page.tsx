import React from "react";
import { ProgressBar } from "@/components/presentation";
import { DeckNav } from "./deck-nav";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import dtPyramidImg from "./dt_pyramid.png";

import {
  DECK_THEME,
  PosterHero,
  ChapterBand,
  Slide,
  Row,
  Cell,
  Insight,
  CardGrid,
  LayerPyramid,
  DiscussionSlide,
  Summary,
  PlateWell,
  ImageWell,
} from "./deck";
import {
  HeroShopTwin,
  EqualFooting,
  DataDecision,
  Digitize,
  Digitalize,
  OneStrategy,
  Discussion,
  TransformationSteps,
  TransformationStepsTall,
  ThreeStages,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "Foundations" },
  { id: "ch2", label: "Evolution" },
  { id: "ch3", label: "The Pyramid" },
  { id: "conclusion", label: "Summary" },
];

export default function DigitalTransformationWeek1() {
  return (
    <main
      className="relative w-full overflow-x-hidden min-h-screen font-body"
      style={DECK_THEME}
    >
      <ProgressBar />
      <DeckNav sections={SECTIONS} />
      {/* Navigation */}
      <Link
        href="/courses/digital-transformation"
        className="fixed top-3 left-3 z-50 flex items-center justify-center w-10 h-10 bg-[var(--dt-cream)] border-[3px] border-[var(--dt-ink)] text-[var(--dt-ink)] hover:bg-[var(--dt-ink)] hover:text-[var(--dt-cream)] transition-colors duration-300"
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <PosterHero
        category="WEEK 01 — DIGITAL TRANSFORMATION"
        title="Introduction to Digital Transformation"
        subtitle="Fundamentally changing how businesses operate and deliver value to customers by integrating digital technology into all areas."
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
        plate={<HeroShopTwin />}
      />

      {/* CHAPTER 1 */}
      <ChapterBand
        id="ch1"
        number="01"
        title="Foundations"
        description="Understanding the core principles and key components that drive successful digital transformation in modern organizations."
      />

      <Slide label="CORE PRINCIPLE" title="More Than Just Technology">
        <Row cols="lg:grid-cols-[1fr_2fr]">
          <div className="font-body text-lg md:text-xl leading-[1.65]">
            <p>
              Digital transformation is the integration of digital technology
              into all areas of a business. It fundamentally changes how
              businesses operate and deliver value to customers.
            </p>
          </div>
          <PlateWell>
            <div className="hidden sm:block">
              <TransformationSteps />
            </div>
            <div className="sm:hidden">
              <TransformationStepsTall />
            </div>
          </PlateWell>
        </Row>
        <Row>
          <Cell
            side
            text={
              <p>
                It requires a cultural shift that challenges the status quo.
                Technology is a key enabler, but people and processes are
                equally important.
              </p>
            }
            figure={
              <PlateWell>
                <EqualFooting />
              </PlateWell>
            }
          />
          <Cell
            side
            text={
              <p>
                Data-driven decision-making is essential for successful
                transformation, ensuring that strategies are aligned with actual
                market demands and operational realities.
              </p>
            }
            figure={
              <PlateWell>
                <DataDecision />
              </PlateWell>
            }
          />
        </Row>
      </Slide>

      <Slide>
        <CardGrid
          cards={[
            {
              title: "Technology Integration",
              description:
                "Adoption of cloud computing, AI, big data analytics, IoT, and automation to streamline processes.",
            },
            {
              title: "Cultural Change",
              description:
                "Encouraging a mindset of innovation, agility, and collaboration among employees at all levels.",
            },
            {
              title: "Customer-Centric",
              description:
                "Leveraging data to understand and meet customer needs, delivering personalized experiences.",
            },
            {
              title: "Process Optimization",
              description:
                "Reengineering business processes to eliminate inefficiencies and enhance productivity.",
            },
            {
              title: "Data-Driven Decisions",
              description:
                "Harnessing the power of data to inform strategies, operations, and drive growth.",
            },
            {
              title: "Agility & Flexibility",
              description:
                "Quickly adapting to new technologies, market trends, and changing customer demands.",
            },
          ]}
        />
      </Slide>

      <DiscussionSlide
        quote="Which company exemplifies Digital Transformation?"
        author="Class Discussion"
        plate={<Discussion />}
      />

      {/* CHAPTER 2 */}
      <ChapterBand
        id="ch2"
        number="02"
        title="Evolution"
        description="Distinguishing between digitization, digitalization, and true digital transformation."
      />

      <Slide label="THEORY" title="Digitization vs. Digitalization">
        <Row className="items-start">
          <Cell
            side
            text={
              <p>
                <strong>Digitization</strong> refers to converting analog
                information into digital format. It involves the use of
                technology to improve efficiency and accuracy.
              </p>
            }
            figure={
              <PlateWell>
                <Digitize />
              </PlateWell>
            }
          />
          <Cell
            side
            text={
              <p>
                <strong>Digitalization</strong> is the use of digital
                technologies to change a business model and provide new revenue
                and value-producing opportunities. It is the process of moving
                to a digital business.
              </p>
            }
            figure={
              <PlateWell>
                <Digitalize />
              </PlateWell>
            }
          />
        </Row>
        <Row className="items-start">
          <Cell
            text={
              <Insight label="KEY INSIGHT">
                Digital transformation goes beyond digitization by rethinking
                business models and processes, focusing on enhancing customer
                experiences and creating new value propositions.
              </Insight>
            }
            figure={
              <PlateWell>
                <ThreeStages />
              </PlateWell>
            }
          />
          <Cell
            side
            text={
              <p>
                Successful digital transformation requires a strategic vision
                and leadership commitment, connecting all digital initiatives
                into a cohesive strategy.
              </p>
            }
            figure={
              <PlateWell>
                <OneStrategy />
              </PlateWell>
            }
          />
        </Row>
      </Slide>

      <DiscussionSlide
        quote="How can organizations ensure that their digitization efforts align with their overall digital transformation strategy?"
        author="Class Discussion"
        plate={<Discussion />}
      />

      {/* CHAPTER 3 */}
      <ChapterBand
        id="ch3"
        number="03"
        title="The Transformation Pyramid"
        description="A structural framework for implementing digital transformation across the organization."
      />

      <Slide label="FRAMEWORK" title="The 6 Layers of Transformation">
        <Row className="items-start">
          <ImageWell src={dtPyramidImg} alt="Digital Transformation Pyramid" />
          <LayerPyramid
            layers={[
              {
                number: "1",
                title: "Foundation Layer",
                description:
                  "Essential technology infrastructure (hardware, software, networks, cybersecurity).",
              },
              {
                number: "2",
                title: "Data Layer",
                description:
                  "Data collection, management, and analytics to drive insights and decision-making.",
              },
              {
                number: "3",
                title: "Process Layer",
                description:
                  "Re-engineering business processes for automation, efficiency, and agility.",
              },
              {
                number: "4",
                title: "Customer Experience",
                description:
                  "Enhancing the customer experience through CRM, digital marketing, and UX design.",
              },
              {
                number: "5",
                title: "Culture & Leadership",
                description:
                  "Change management, training, and fostering a culture of innovation and collaboration.",
              },
              {
                number: "6",
                title: "Innovation Layer",
                description:
                  "Continuous exploration of new technologies, R&D, experimentation, and partnerships.",
              },
            ]}
          />
        </Row>
      </Slide>

      {/* CONCLUSION */}
      <Summary
        id="conclusion"
        title="Summary"
        summary="Digital transformation is a comprehensive journey that goes far beyond simply adopting new technologies. It requires rethinking business models, re-engineering processes, and cultivating a culture that embraces change and data-driven decision making."
        takeaways={[
          "Transformation requires a cultural shift, not just technological upgrades.",
          "Digitization is the conversion of data, while transformation is the reinvention of the business.",
          "A structured approach, like the Transformation Pyramid, is essential for strategic alignment.",
        ]}
      />
    </main>
  );
}
