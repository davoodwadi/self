"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Plate,
  P,
  Lead,
  Statement,
  Term,
  Ruled,
  SlideHeading,
  Numbered,
  PartHead,
  Prompt,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { PilotSamples, AssociationNotCause, SwitchingPanel, ControlledEffect, DesignSequence, InquiriesToPurchases, DefinitionShift, InternalCoverage, DataRelationships, AuditLog, ListingExperiment } from "./visuals";

// ============================================================================
// WEEK 02 — RESEARCH DESIGN AND SECONDARY DATA
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx; the interactive ones are built around one action
// each (draw a sample, hold a variable fixed, add switchers, move what
// happens anyway, widen a definition).
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** A sentence set large inside a column. */
const BIG = "type-h2 !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";

/** A closing sentence set as a serif line across the slide. */
const CLOSE = "type-quote w-full !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]";

export default function Week2() {
  return (
    <SlideDeck label="Week 02">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 02 · Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[18ch]">
          Research Design and <span className="text-[var(--signal)]">Secondary Data</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[40ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          The research design specifies the{" "}
          <span className="text-[var(--signal)]">procedures</span> by which the
          information required for a decision is obtained.
        </p>
      </Slide>

      {/* ================================================================
          The Research Design
          ================================================================ */}
      <Slide id="the-research-design" border className="!py-8">
        <SlideHeading>The Research Design</SlideHeading>
        <Statement className="!max-w-[48ch] !text-[clamp(1.5rem,2.6vw,2.2rem)]">
          A <Term>research design</Term> is the plan that specifies the
          procedures for collecting and analyzing the information needed to
          address the marketing research problem.
        </Statement>
        <div className="mt-10 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              It follows directly from the problem definition and the research
              questions established in the first step of the research process.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              It specifies the type of study, the information required, the
              measurement procedures, the sample, and the plan for analysis.
            </p>
          </Ruled>
        </div>
        <p className="type-quote mt-9 w-full border-l-2 border-[var(--signal)] bg-[var(--signal-tint)] px-7 py-5 !max-w-none !text-[clamp(1.25rem,2vw,1.7rem)]">
          The choice of design determines which{" "}
          <span className="text-[var(--signal)]">conclusions</span> the findings
          can support.
        </p>
      </Slide>

      {/* ================================================================
          Part 1: Types of Research Design
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Types of Research Design" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Research designs are classified by their purpose into three types:{" "}
          <Term tone="counter">exploratory</Term>, <Term tone="ink">descriptive</Term>, and{" "}
          <Term>causal</Term>.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>Each type answers a different kind of question.</p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The type is selected according to what is already known about the
              problem and what the decision requires.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Exploratory Research
          ================================================================ */}
      <Slide id="exploratory-research" border className="!py-8">
        <SlideHeading>Exploratory Research</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="counter">
              <p className={BIG}>
                <span className="text-[var(--counter)]">Exploratory research</span>{" "}
                is conducted when the problem is not yet well understood.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Its purpose is to define the problem more precisely, to identify
                relevant variables, and to develop hypotheses.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Its methods include expert interviews, reviews of secondary
                data, pilot studies, and qualitative research.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <p className={BIG}>
                Its procedures are flexible, and its samples are small and not
                representative of the population.
              </p>
            </Ruled>
            <Plate>
              <PilotSamples />
            </Plate>
          </div>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--ink)] pt-5`}>
          Its findings are therefore treated as tentative. They inform further
          research rather than support final decisions.
        </p>
      </Slide>

      {/* ================================================================
          Descriptive Research
          ================================================================ */}
      <Slide id="descriptive-research" border className="!py-8">
        <SlideHeading>Descriptive Research</SlideHeading>
        <Lead className="!max-w-none">
          <Term tone="ink">Descriptive research</Term> is conducted to describe
          the characteristics of a market or a group, such as the profile of
          customers, their usage behavior, or their perceptions of a brand.
        </Lead>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              It requires a clear statement of the problem and specific
              hypotheses before data collection begins.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              The design specifies who is studied, what information is
              obtained, when and where the data are collected, and how.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>Its methods include surveys, panels, and the analysis of existing records.</P>
          </Ruled>
        </div>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Ruled tone="counter">
            <p className={BIG}>
              Descriptive research can establish that two variables are{" "}
              <span className="text-[var(--signal)]">associated</span>, but it
              cannot establish that one{" "}
              <span className="text-[var(--counter)]">causes</span> the other.
            </p>
          </Ruled>
          <Plate>
            <AssociationNotCause />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Cross-Sectional and Longitudinal Designs
          ================================================================ */}
      <Slide
        id="cross-sectional-and-longitudinal-designs"
        border
        className="!py-8"
        exercise={exercise["cross-sectional-and-longitudinal-designs"]}
      >
        <SlideHeading>Cross-Sectional and Longitudinal Designs</SlideHeading>
        <Lead className="!max-w-none">Descriptive designs differ in how they treat time.</Lead>
        <div className="mt-5 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-4">
            <P className="!max-w-none">
              A <Term tone="ink">cross-sectional design</Term> collects data
              from a sample of the population once.
            </P>
            <P className="!max-w-none">
              A single cross-sectional design draws one sample. A multiple
              cross-sectional design draws two or more samples, each measured
              once.
            </P>
          </div>
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--signal)] pt-4">
            <P className="!max-w-none">
              A <Term>longitudinal design</Term> measures the same sample
              repeatedly over time.
            </P>
            <P className="!max-w-none">
              Longitudinal designs are typically implemented through panels, in
              which the same households or individuals report their purchases
              or media use at regular intervals.
            </P>
          </div>
        </div>
        <p className={`${CLOSE} mt-6`}>
          Cross-sectional designs describe a population at one point in time.
          Longitudinal designs reveal how individual behavior changes over time,
          such as <span className="text-[var(--signal)]">switching between brands</span>.
        </p>
        <Plate className="mt-4">
          <SwitchingPanel />
        </Plate>
      </Slide>

      {/* ================================================================
          Causal Research
          ================================================================ */}
      <Slide id="causal-research" border className="!py-8">
        <SlideHeading>Causal Research</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              <span className="text-[var(--signal)]">Causal research</span> is
              conducted to determine whether a change in one variable produces a
              change in another.
            </p>
          </Ruled>
          <Ruled weight="thin">
            <p className={BIG}>
              It addresses questions such as whether a price reduction increases
              sales, or whether a new package design increases purchase
              intention.
            </p>
          </Ruled>
        </div>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <p className={BIG}>
              Its principal method is the <Term tone="ink">experiment</Term>, in
              which the researcher manipulates one or more independent variables
              and measures their effect on a dependent variable.
            </p>
            <Ruled tone="signal">
              <p className={BIG}>
                The researcher controls other variables that could influence the
                outcome, so that the observed effect can be attributed to the
                manipulation.
              </p>
            </Ruled>
          </div>
          <Plate>
            <ControlledEffect />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--ink)] pt-5`}>
          Causal research requires the greatest prior knowledge of the problem
          and the greatest control over the research setting.
        </p>
      </Slide>

      {/* ================================================================
          Selecting a Research Design
          ================================================================ */}
      <Slide
        id="selecting-a-research-design"
        border
        className="!py-8"
        exercise={exercise["selecting-a-research-design"]}
      >
        <SlideHeading>Selecting a Research Design</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          <Ruled>
            <P>
              <Term tone="ink">Exploratory research</Term> is appropriate
              when the problem is ambiguous and little is known about it.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Descriptive research</Term> is appropriate when
              the problem is defined and the decision requires an accurate
              description of a market or a group.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Causal research</Term> is appropriate when the decision
              depends on the effect of a specific marketing action.
            </P>
          </Ruled>
        </div>
        <p className={`${CLOSE} mt-8`}>
          The three designs are frequently combined in sequence: exploratory
          research generates hypotheses, descriptive research estimates the
          magnitude of a phenomenon, and causal research tests the effect of a
          proposed action.
        </p>
        <p className="type-body mt-3 w-full !max-w-none">
          The sequence is not fixed. A{" "}
          <span className="text-[var(--counter)]">well-defined problem</span>{" "}
          may begin with descriptive or causal research.
        </p>
        <Plate className="mt-5">
          <DesignSequence />
        </Plate>
      </Slide>

      {/* ================================================================
          Discussion: Designing the Study
          ================================================================ */}
      <Slide id="discussion-designing-the-study" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          Designing the Study
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Prompt>
            A manufacturer of electric bicycles observes that inquiries from its
            website rarely result in purchases. Management has no explanation
            for this pattern. Which research design is appropriate at this
            stage, and how might the design change as the problem becomes
            better understood?
          </Prompt>
          <Plate>
            <InquiriesToPurchases />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Secondary Data
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Secondary Data" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Data are classified as <Term tone="ink">primary</Term> or{" "}
          <Term>secondary</Term> according to the purpose for which they were
          collected.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              Secondary data are examined{" "}
              <span className="text-[var(--signal)]">before</span> any primary
              data are collected.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The analysis of secondary data is often called{" "}
              <Term tone="ink">desk research</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Primary and Secondary Data
          ================================================================ */}
      <Slide id="primary-and-secondary-data" border className="!py-8">
        <SlideHeading>Primary and Secondary Data</SlideHeading>
        <div className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              <Term tone="ink">Primary data</Term> are collected by the
              researcher for the specific purpose of the current research
              problem.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              <Term>Secondary data</Term> were collected previously, for a
              purpose other than the current problem.
            </p>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          <Numbered n={1} tone="signal">
            <Ruled weight="thin">
              <P>
                Secondary data can be obtained more quickly and at lower cost
                than primary data.
              </P>
            </Ruled>
          </Numbered>
          <Numbered n={2} tone="signal">
            <Ruled weight="thin">
              <P>
                Secondary data can clarify the problem, suggest hypotheses,
                inform the research design, and in some cases answer the
                research question without further data collection.
              </P>
            </Ruled>
          </Numbered>
          <Numbered n={3} tone="counter">
            <Ruled weight="thin" tone="counter">
              <P>
                Because secondary data were collected for another purpose, they
                may be incomplete, outdated, or defined in ways that do not
                correspond to the current problem.
              </P>
            </Ruled>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Evaluating Secondary Data
          ================================================================ */}
      <Slide
        id="evaluating-secondary-data"
        border
        className="!py-8"
        exercise={exercise["evaluating-secondary-data"]}
      >
        <SlideHeading>Evaluating Secondary Data</SlideHeading>
        <Lead className="!max-w-none">Secondary data are evaluated before they are used.</Lead>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-4">
            {[
              ["Methodology", "how the data were collected, including the sample, the response rate, and the questionnaire."],
              ["Accuracy", "the extent of error in the data, which is assessed by comparing several sources."],
              ["Currency", "when the data were collected and whether conditions have changed since then."],
              ["Purpose", "why the data were collected, since data collected to support a particular position may be biased."],
            ].map(([term, rest], i) => (
              <li key={term}>
                <Numbered n={i + 1}>
                  <Ruled weight="thin">
                    <p className={BIG}>
                      <Term tone="ink">{term}</Term>: {rest}
                    </p>
                  </Ruled>
                </Numbered>
              </li>
            ))}
          </ol>
          <ol start={5} className="flex min-w-0 flex-col gap-4">
            <li>
              <Numbered n={5} tone="signal">
                <Ruled weight="thin" tone="signal">
                  <p className={BIG}>
                    <Term>Definitions</Term>: how key variables were defined and
                    measured, such as the age groups used or the definition of a
                    household.
                  </p>
                </Ruled>
              </Numbered>
              <Plate className="mt-4">
                <DefinitionShift />
              </Plate>
            </li>
            <li>
              <Numbered n={6}>
                <Ruled weight="thin">
                  <p className={BIG}>
                    <Term tone="ink">Dependability</Term>: the expertise,
                    credibility, and reputation of the source.
                  </p>
                </Ruled>
              </Numbered>
            </li>
          </ol>
        </div>
      </Slide>

      {/* ================================================================
          Internal Secondary Data
          ================================================================ */}
      <Slide id="internal-secondary-data" border className="!py-8">
        <SlideHeading>Internal Secondary Data</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          <Term>Internal secondary data</Term> are generated within the firm in
          the course of its operations.
        </Statement>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P className="!max-w-none">
              Sources include sales records, customer relationship management
              systems, loyalty program records, website and application
              analytics, and customer service logs.
            </P>
          </Ruled>
          <Ruled weight="thin" tone="signal">
            <P className="!max-w-none">
              Internal data are readily available, inexpensive, and specific to
              the firm&apos;s own customers.
            </P>
          </Ruled>
        </div>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Ruled tone="counter">
            <p className={BIG}>
              Internal data describe only the firm&apos;s own customers, and
              therefore provide no information about{" "}
              <span className="text-[var(--counter)]">competitors&apos; customers</span>{" "}
              or about people who have{" "}
              <span className="text-[var(--counter)]">never purchased</span>.
            </p>
          </Ruled>
          <Plate>
            <InternalCoverage />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          External Secondary Data: Published Sources
          ================================================================ */}
      <Slide id="external-secondary-data-published-sources" border className="!py-8">
        <SlideHeading>External Secondary Data: Published Sources</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          Published external data are made available by organizations outside
          the firm.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              <Term tone="ink">Government sources</Term> include censuses, labor
              statistics, and trade statistics.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term tone="ink">Nongovernment sources</Term> include trade
              associations, industry reports, academic journals, and the
              financial reports of publicly listed companies.
            </p>
          </Ruled>
        </div>
        <p className="type-quote mt-9 w-full border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Many government sources are available free of charge and are based on
          large samples, although they are often published with a{" "}
          <span className="text-[var(--counter)]">delay</span>.
        </p>
      </Slide>

      {/* ================================================================
          External Secondary Data: Syndicated Services
          ================================================================ */}
      <Slide
        id="external-secondary-data-syndicated-services"
        border
        className="!py-8"
        exercise={exercise["external-secondary-data-syndicated-services"]}
      >
        <SlideHeading>External Secondary Data: Syndicated Services</SlideHeading>
        <Lead className="!max-w-none">
          <Term>Syndicated data</Term> are collected by commercial research
          firms according to a standard procedure and sold to multiple clients.
        </Lead>
        <ol className="mt-7 grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          {[
            ["Consumer panels", "record the purchases or media use of the same households over time."],
            ["Retail tracking services", "record the sales of products through retail outlets, often from scanner data at the point of sale."],
            ["Media audience measurement services", "estimate the size and composition of the audience for television, radio, and digital media."],
          ].map(([term, rest], i) => (
            <li key={term} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <p className={BIG}>
                    <Term tone="ink">{term}</Term> {rest}
                  </p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal" weight="thin">
            <P className="!max-w-none">
              Syndicated data allow a firm to compare its performance with that
              of competitors, at a lower cost than collecting the same data
              independently.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P className="!max-w-none">
              Because the data are standardized, they cannot be adapted to the
              specific needs of a single client.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: First-, Second-, and Third-Party Data
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="First-, Second-, and Third-Party Data" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.5rem,2.4vw,2.1rem)]">
            Customer data are also classified by their{" "}
            <span className="text-[var(--signal)]">relationship</span> to the
            firm that uses them.
          </Statement>
          <Ruled>
            <p className={BIG}>
              The classification determines how reliable the data are, how
              specific they are to the firm&apos;s customers, and which legal
              obligations apply to their use.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Types of Customer Data
          ================================================================ */}
      <Slide
        id="types-of-customer-data"
        border
        className="!py-8"
        exercise={exercise["types-of-customer-data"]}
      >
        <SlideHeading>Types of Customer Data</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2">
          <Ruled tone="signal">
            <P className="!max-w-none">
              <Term>First-party data</Term> are collected by the firm directly
              from its own customers, such as purchase histories, account
              information, and interactions with its website.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thin">
            <P className="!max-w-none">
              <Term>Zero-party data</Term> are a subset of first-party data that
              customers provide intentionally, such as stated preferences in a
              profile or answers to a product quiz.
            </P>
          </Ruled>
          <Ruled>
            <P className="!max-w-none">
              <Term tone="ink">Second-party data</Term> are another
              organization&apos;s first-party data, obtained directly from that
              organization through a partnership, such as data shared between an
              airline and a hotel group.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P className="!max-w-none">
              <Term tone="counter">Third-party data</Term> are collected by
              organizations that have no direct relationship with the consumers
              concerned, and are aggregated from many sources and sold to
              multiple buyers.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <DataRelationships />
        </Plate>
        <p className={`${CLOSE} mt-6`}>
          First-party data are generally the most accurate and specific to the
          firm. Third-party data offer the greatest scale but the least
          transparency about how they were collected.
        </p>
      </Slide>

      {/* ================================================================
          The Decline of Third-Party Data
          ================================================================ */}
      <Slide id="the-decline-of-third-party-data" border className="!py-8">
        <SlideHeading>The Decline of Third-Party Data</SlideHeading>
        <div className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2">
          <Numbered n={1} tone="counter">
            <Ruled tone="counter" weight="thin">
              <p className={BIG}>
                Privacy regulation now restricts the collection and use of
                personal data, as in the European Union&apos;s General Data
                Protection Regulation.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={2} tone="counter">
            <Ruled tone="counter" weight="thin">
              <p className={BIG}>
                Several web browsers block third-party cookies by default, and
                mobile operating systems require user permission for tracking
                across applications.
              </p>
            </Ruled>
          </Numbered>
        </div>
        <Statement className="mt-9 !max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          As a result, the availability and reliability of{" "}
          <span className="text-[var(--counter)]">third-party data</span> have
          declined.
        </Statement>
        <Ruled tone="signal" className="mt-8 w-full">
          <p className={`${BIG} !max-w-none`}>
            Firms have responded by investing in{" "}
            <span className="text-[var(--signal)]">first-party data</span>, for
            example through loyalty programs, customer accounts, and direct
            relationships with customers.
          </p>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 4: AI-Assisted Desk Research
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="AI-Assisted Desk Research" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          AI tools are now widely used to locate, summarize, and compare
          secondary sources.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>They reduce the time required for desk research considerably.</p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              They also introduce errors that are difficult to detect, because
              their output is fluent and appears authoritative.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Applications of AI in Desk Research
          ================================================================ */}
      <Slide id="applications-of-ai-in-desk-research" border className="!py-8">
        <SlideHeading>Applications of AI in Desk Research</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2">
          {[
            "search for relevant reports, articles, and statistics.",
            "summarize long documents, such as industry reports and annual reports.",
            "extract figures and tables from documents and to compare them across sources.",
            "translate sources published in other languages.",
          ].map((rest, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled weight="thin">
                  <p className={BIG}>AI can be used to {rest}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
        <p className="type-quote mt-9 w-full border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Tools that retrieve sources from the web and cite them in their
          answers make verification easier, but they do not ensure that the
          cited source{" "}
          <span className="text-[var(--counter)]">supports the claim</span>.
        </p>
      </Slide>

      {/* ================================================================
          Fabricated References and Figures
          ================================================================ */}
      <Slide id="fabricated-references-and-figures" border className="!py-8">
        <SlideHeading>Fabricated References and Figures</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          <Ruled tone="counter">
            <P>
              Language models can generate references to reports and articles
              that do not exist, with plausible titles, authors, and publication
              years.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              They can generate statistics that are not reported in any source,
              or attribute a real statistic to the wrong source, year, or
              population.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              A summary can omit qualifications that the original source stated,
              such as the sample size or the definition of the market.
            </P>
          </Ruled>
        </div>
        <p className="type-quote mt-9 w-full border-t-2 border-[var(--ink)] pt-5 !max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          Such errors are most frequent for{" "}
          <span className="text-[var(--counter)]">specialized topics</span>,{" "}
          <span className="text-[var(--counter)]">recent events</span>, and{" "}
          <span className="text-[var(--counter)]">precise numerical values</span>.
        </p>
      </Slide>

      {/* ================================================================
          Verifying AI-Assisted Desk Research
          ================================================================ */}
      <Slide
        id="verifying-ai-assisted-desk-research"
        border
        className="!py-8"
        exercise={exercise["verifying-ai-assisted-desk-research"]}
      >
        <SlideHeading>Verifying AI-Assisted Desk Research</SlideHeading>
        <ol className="grid w-full gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-5">
          {[
            "The researcher first locates the original source for each reference, independently of the AI tool.",
            "The researcher then confirms that the source exists and that its authors, publisher, and date are as stated.",
            "The researcher then confirms that the cited figure or claim appears in the source.",
            "The researcher then examines the context of the figure, including its definitions, sample, and date.",
            "Finally, the researcher evaluates the source against the criteria for secondary data: methodology, accuracy, currency, purpose, definitions, and dependability.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone="signal">
                <Ruled weight="thin">
                  <P className="!leading-snug">{s}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
        <Ruled tone="counter" className="mt-9 w-full">
          <p className={`${BIG} !max-w-none`}>
            Internal secondary data are uploaded to an external AI tool only
            when the firm&apos;s data policies and the terms of the tool permit
            it.
          </p>
        </Ruled>
      </Slide>

      {/* ================================================================
          Discussion: Desk Research With AI
          ================================================================ */}
      <Slide id="discussion-desk-research-with-ai" border className="!py-8">
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="type-h1">
            <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Desk Research With AI
          </h2>
          <div className="mt-10 w-full max-w-5xl border-y-2 border-[var(--counter)] px-4 py-9 md:px-12">
            <p className="type-quote mx-auto !max-w-[46ch] !text-[clamp(1.4rem,2.4vw,2.1rem)]">
              <span className="type-label mb-5 block !text-[0.8rem] !leading-none !text-[var(--counter)]">
                Discussion:
              </span>{" "}
              An analyst preparing a market entry report asks an AI tool for the
              size of the plant-based dairy market in three countries. The tool
              returns three precise figures, each with a citation. Which steps
              should the analyst take before the figures are included in the
              report, and what should the report disclose about their origin?
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Research Designs for Studying AI Agents
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Research Designs for Studying AI Agents" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          The research designs introduced in Part 1 also apply when the subject of research is an AI agent rather
          than a consumer.
        </Statement>
        <div className="mt-9 w-full">
          <Ruled tone="signal">
            <p className={BIG}>
              Two designs predominate: <Term tone="ink">descriptive audits</Term> of agent outputs and{" "}
              <Term tone="ink">causal experiments</Term> on agent choice.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Descriptive Audits of AI Agents
          ================================================================ */}
      <Slide id="descriptive-audits-of-ai-agents" border className="!py-8">
        <SlideHeading>Descriptive Audits of AI Agents</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <p className={BIG}>
                An <Term>audit</Term> systematically records the outputs of an AI agent across a large set of
                queries, such as the brands an assistant recommends in response to 500 product questions.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <P>Audits describe what agents do: which brands appear, how often, and in which position.</P>
            </Ruled>
          </div>
          <Plate>
            <AuditLog />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal" weight="thin">
            <P>
              Audits of AI shopping agents have documented position effects, in which an alternative&apos;s place
              in a list influences whether the agent selects it (Wadi &amp; Ma, 2026a).
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P>
              An audit observes only the final output. Because the queries differ in many respects at once, an
              audit cannot attribute a pattern in the outputs to a particular cause.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Causal Experiments on AI Agents
          ================================================================ */}
      <Slide
        id="causal-experiments-on-ai-agents"
        border
        className="!py-8"
        exercise={exercise["causal-experiments-on-ai-agents"]}
      >
        <SlideHeading>Causal Experiments on AI Agents</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.1vw,1.8rem)]">
          A causal experiment manipulates one factor while all other elements of the prompt, the products, and
          the environment are held constant.
        </Statement>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <p className={BIG}>
                For example, the same hotel listing is presented with and without a sponsorship label, and the
                agent&apos;s choices are compared across the two conditions.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <P>The order of alternatives and attributes is randomized across sessions, to control for position effects.</P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Each condition can be repeated many times at low cost, and each session can be run independently
                of the others, so that no carryover occurs between conditions.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ListingExperiment />
          </Plate>
        </div>
        <p className="type-quote mt-7 w-full border-t-2 border-[var(--ink)] pt-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          A descriptive audit identifies a pattern in agent behavior; a causal experiment tests whether a specific
          factor produces it.
        </p>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "The research design specifies how the information required by the marketing research problem is obtained and analyzed.",
            "Exploratory research clarifies the problem, descriptive research describes a market or a group, and causal research tests the effect of a marketing action.",
            "Descriptive designs are cross-sectional or longitudinal, depending on whether the same respondents are measured once or repeatedly.",
            "Secondary data are examined before primary data are collected, and are evaluated for methodology, accuracy, currency, purpose, definitions, and dependability.",
            "Secondary data are internal or external, and external data are published or syndicated.",
            "Customer data are classified as first-, second-, or third-party, and the decline of third-party data has increased the value of first-party data.",
            "AI tools accelerate desk research, but every reference and figure they provide must be verified against the original source.",
            "Descriptive audits record what AI agents recommend and select, while causal experiments manipulate one factor at a time to establish why they do so.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone="signal">
                <Ruled weight="thin">
                  <P className="!leading-snug">{s}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
