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
import {
  QualQuantData,
  FocusGroupAirtime,
  Laddering,
  SayDoGap,
  CodedTranscript,
  CodesToThemes,
  SaturationCurve,
  Triangulation,
  AgreementCheck,
  CommunityVoices,
} from "./visuals";

// ============================================================================
// WEEK 03 — QUALITATIVE RESEARCH
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx; the interactive ones are built around one action
// each (seat more participants, conduct the next interview, add a data
// source).
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** A sentence set large inside a column. */
const BIG = "type-h2 !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";

/** A closing sentence set as a serif line across the slide. */
const CLOSE = "type-quote w-full !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]";

export default function Week3() {
  return (
    <SlideDeck label="Week 03">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 03 · Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[18ch]">
          <span className="text-[var(--signal)]">Qualitative</span> Research
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[40ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Qualitative research examines the{" "}
          <span className="text-[var(--signal)]">reasons, meanings, and motives</span>{" "}
          that underlie consumer behavior.
        </p>
      </Slide>

      {/* ================================================================
          Qualitative and Quantitative Research
          ================================================================ */}
      <Slide
        id="qualitative-and-quantitative-research"
        border
        className="!py-8"
        exercise={exercise["qualitative-and-quantitative-research"]}
      >
        <SlideHeading>Qualitative and Quantitative Research</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--signal)] pt-4">
            <P className="!max-w-none">
              <Term>Qualitative research</Term> is unstructured and exploratory,
              and is based on small samples. It provides insight into the reasons
              for behavior.
            </P>
            <P className="!max-w-none">
              Qualitative data consist of words, images, and observations.
            </P>
          </div>
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-4">
            <P className="!max-w-none">
              <Term tone="ink">Quantitative research</Term> is structured, and is
              based on larger samples, typically chosen to represent a
              population. It measures how often and to what extent a behavior or
              attitude occurs.
            </P>
            <P className="!max-w-none">
              Quantitative data consist of numbers that can be analyzed
              statistically.
            </P>
          </div>
        </div>
        <Plate className="mt-5">
          <QualQuantData />
        </Plate>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="counter" weight="thin">
            <P className="!max-w-none">
              Qualitative findings cannot be generalized to a population, because
              the samples are small and are not selected to be representative.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thin">
            <P className="!max-w-none">
              The two approaches are complementary. Qualitative research
              frequently precedes quantitative research, and is also used
              afterward to interpret quantitative findings.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Uses of Qualitative Research
          ================================================================ */}
      <Slide id="uses-of-qualitative-research" border className="!py-8">
        <SlideHeading>Uses of Qualitative Research</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Qualitative research is the principal method of the{" "}
          <Term>exploratory designs</Term> introduced in Week 2.
        </Statement>
        <ol className="mt-10 grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          {[
            "It is used to define a problem more precisely and to develop hypotheses for later testing.",
            "It is used to identify the attributes, language, and categories that consumers use, so that later questionnaires reflect them.",
            "It is used to examine topics that consumers are unable or unwilling to report accurately in a structured questionnaire, such as emotional, habitual, or socially sensitive behavior.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone="signal">
                <Ruled>
                  <p className={BIG}>{s}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Direct and Indirect Approaches
          ================================================================ */}
      <Slide id="direct-and-indirect-approaches" border className="!py-8">
        <SlideHeading>Direct and Indirect Approaches</SlideHeading>
        <Lead className="!max-w-none">
          Qualitative methods are classified as direct or indirect.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              In a <Term tone="ink">direct approach</Term>, the purpose of the
              research is disclosed to participants, or is evident from the
              questions asked. Focus groups and depth interviews are direct
              approaches.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              In an <Term tone="counter">indirect approach</Term>, the purpose of
              the research is disguised. Projective techniques are indirect
              approaches.
            </p>
          </Ruled>
        </div>
        <p className="type-quote mt-10 w-full border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-5 !max-w-none !text-[clamp(1.25rem,2vw,1.7rem)]">
          Indirect approaches are used when participants are unlikely to express
          their <span className="text-[var(--counter)]">true motives</span> in
          response to direct questions.
        </p>
      </Slide>

      {/* ================================================================
          Part 1: Interview-Based Methods
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Interview-Based Methods" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          <Term tone="ink">Focus groups</Term>, <Term tone="ink">depth interviews</Term>, and{" "}
          <Term tone="counter">projective techniques</Term> obtain data by
          questioning participants.
        </Statement>
        <Ruled className="mt-9 w-full">
          <p className={`${BIG} !max-w-none`}>
            They differ in the number of participants, the degree of structure,
            and the extent to which the purpose of the research is disclosed.
          </p>
        </Ruled>
      </Slide>

      {/* ================================================================
          Focus Groups
          ================================================================ */}
      <Slide id="focus-groups" border className="!py-8">
        <SlideHeading>Focus Groups</SlideHeading>
        <Lead className="!max-w-none">
          A <Term>focus group</Term> is a discussion among a small group of
          participants, typically six to ten, led by a trained moderator.
        </Lead>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P>
                A session typically lasts between one and two hours and follows a
                discussion guide that lists the topics to be covered.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Participants are usually selected to be similar in relevant
                characteristics, such as product usage or life stage, so that
                differences in background do not inhibit discussion.
              </P>
            </Ruled>
            <Ruled weight="thin" tone="signal">
              <P>
                The interaction among participants can produce ideas and
                reactions that would not emerge in individual interviews.
              </P>
            </Ruled>
            <Ruled weight="thin" tone="counter">
              <P>
                The group setting also has limitations: some participants may
                dominate the discussion, others may conform to the majority view,
                and the moderator&apos;s behavior may influence the responses.
              </P>
            </Ruled>
          </div>
          <Plate>
            <FocusGroupAirtime />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--ink)] pt-5`}>
          Focus groups are increasingly conducted online, which reduces cost and
          allows participants in different locations to take part.
        </p>
      </Slide>

      {/* ================================================================
          Depth Interviews
          ================================================================ */}
      <Slide
        id="depth-interviews"
        border
        className="!py-8"
        exercise={exercise["depth-interviews"]}
      >
        <SlideHeading>Depth Interviews</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-5 md:grid-cols-3">
          <Ruled>
            <P>
              A <Term>depth interview</Term> is an unstructured or
              semi-structured interview conducted with a single participant,
              typically lasting between thirty minutes and more than an hour.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              The interviewer asks follow-up questions, known as{" "}
              <Term tone="ink">probes</Term>, to uncover underlying
              motivations, beliefs, and feelings.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Depth interviews are appropriate for sensitive topics, for complex
              decisions, and for participants such as senior professionals, who
              are difficult to assemble in a group.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5 lg:order-2">
            <Ruled tone="signal">
              <p className={BIG}>
                <Term>Laddering</Term> is a depth interviewing technique that
                moves from a product attribute to its consequences and finally to
                the personal value it serves.
              </p>
            </Ruled>
            <P>
              For example, a participant may state that a running shoe is
              lightweight, that a lightweight shoe allows faster running, that
              faster running produces a sense of achievement, and that
              achievement supports self-esteem.
            </P>
          </div>
          <Plate className="lg:order-1">
            <Laddering />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--ink)] pt-5`}>
          Laddering reveals the connections between product attributes and
          personal values, which can inform positioning and advertising.
        </p>
      </Slide>

      {/* ================================================================
          Projective Techniques
          ================================================================ */}
      <Slide
        id="projective-techniques"
        border
        className="!py-8"
        exercise={exercise["projective-techniques"]}
      >
        <SlideHeading>Projective Techniques</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.4rem,2.2vw,1.9rem)]">
            <Term tone="counter">Projective techniques</Term> present
            participants with ambiguous stimuli and ask them to interpret them.
          </Statement>
          <Ruled tone="counter">
            <p className={BIG}>
              Participants are expected to project their own motives, beliefs,
              and feelings into their interpretation.
            </p>
          </Ruled>
        </div>
        <ol className="mt-9 grid w-full gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "association techniques",
              "In ",
              ", participants respond to a word or an image with the first word or idea that occurs to them.",
            ],
            [
              "completion techniques",
              "In ",
              ", participants complete an incomplete sentence or story, such as “People who shop at discount stores are …”",
            ],
            [
              "construction techniques",
              "In ",
              ", participants construct a response to a picture or a cartoon, such as the words spoken by a person in a drawing.",
            ],
            [
              "expressive techniques",
              "In ",
              ", participants describe the feelings or behavior of another person, a method known as the third-person technique, or act out a role.",
            ],
          ].map(([term, pre, rest], i) => (
            <li key={term} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled weight="thin">
                  <P className="!leading-snug">
                    {pre}
                    <Term tone="ink">{term}</Term>
                    {rest}
                  </P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
        <p className="type-quote mt-9 w-full border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          The interpretation of projective responses requires trained analysts,
          and different analysts may interpret the{" "}
          <span className="text-[var(--counter)]">same response</span>{" "}
          differently.
        </p>
      </Slide>

      {/* ================================================================
          Part 2: Observation-Based Methods
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Observation-Based Methods" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.5rem,2.4vw,2.1rem)]">
            Observation-based methods{" "}
            <span className="text-[var(--signal)]">record behavior</span> rather
            than asking participants to report it.
          </Statement>
          <Ruled>
            <p className={BIG}>
              They are used when participants cannot accurately recall or
              describe their own behavior.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Observation
          ================================================================ */}
      <Slide id="observation" border className="!py-8">
        <SlideHeading>Observation</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          <Term>Observation</Term> is the systematic recording of the behavior
          of people, objects, and events.
        </Statement>
        <div className="mt-8 grid w-full gap-x-12 gap-y-6 md:grid-cols-2">
          <Ruled weight="thin">
            <P className="!max-w-none">
              Observation can be <Term tone="ink">structured</Term>, with a
              predefined list of behaviors to record, or{" "}
              <Term tone="ink">unstructured</Term>, with the observer recording
              all relevant aspects of the situation.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none">
              Observation can be <Term tone="ink">disguised</Term>, when
              participants are unaware that they are being observed, or{" "}
              <Term tone="ink">undisguised</Term>.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none">
              Observation can be conducted in a <Term tone="ink">natural</Term>{" "}
              setting, such as a store, or in a{" "}
              <Term tone="ink">contrived</Term> setting, such as a test kitchen.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none">
              Observation can be <Term tone="ink">personal</Term>, conducted by a
              human observer, or <Term tone="ink">mechanical</Term>, conducted
              with devices such as eye-tracking equipment or in-store cameras.
            </P>
          </Ruled>
        </div>
        <p className={`${CLOSE} mt-9 border-t-2 border-[var(--counter)] pt-5`}>
          Observation records what people{" "}
          <span className="text-[var(--signal)]">do</span>, but not{" "}
          <span className="text-[var(--counter)]">why</span> they do it.
        </p>
      </Slide>

      {/* ================================================================
          Ethnography
          ================================================================ */}
      <Slide id="ethnography" border className="!py-8">
        <SlideHeading>Ethnography</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,1.95rem)]">
              <Term>Ethnography</Term> is the study of people in their natural
              environment over an extended period, through observation combined
              with interviews.
            </Statement>
            <P className="!max-w-none">
              The researcher seeks to understand behavior from the perspective of
              the people being studied.
            </P>
          </div>
          <Ruled>
            <p className={BIG}>
              In marketing research, ethnography takes the form of in-home
              visits, accompanied shopping trips, and diaries that participants
              complete on their mobile phones.
            </p>
          </Ruled>
        </div>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              Ethnography can reveal needs that consumers do not articulate, such
              as the <span className="text-[var(--signal)]">workarounds</span>{" "}
              they use when a product does not meet their requirements.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              It requires considerable time and expertise, and its findings
              depend on the interpretation of the researcher.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Netnography
          ================================================================ */}
      <Slide id="netnography" border className="!py-8">
        <SlideHeading>Netnography</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          <Term>Netnography</Term> is ethnography adapted to the study of online
          communities.
        </Statement>
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              The researcher examines the interactions of consumers in forums,
              social media groups, and review platforms.
            </P>
          </Ruled>
          <Ruled weight="thin" tone="signal">
            <P>
              Netnography is unobtrusive, since the conversations occur without
              the involvement of the researcher.
            </P>
          </Ruled>
          <Ruled weight="thin" tone="counter">
            <P>
              It is limited to consumers who participate in online communities,
              who may differ from the broader population of customers.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <CommunityVoices />
        </Plate>
        <Ruled tone="counter" className="mt-7 w-full">
          <p className={`${BIG} !max-w-none`}>
            It raises ethical questions concerning the distinction between{" "}
            <span className="text-[var(--counter)]">public and private spaces</span>,
            the need for <span className="text-[var(--counter)]">consent</span>,
            and the <span className="text-[var(--counter)]">quotation of posts</span>{" "}
            that can identify their authors.
          </p>
        </Ruled>
      </Slide>

      {/* ================================================================
          Selecting a Qualitative Method
          ================================================================ */}
      <Slide
        id="selecting-a-qualitative-method"
        border
        className="!py-8"
        exercise={exercise["selecting-a-qualitative-method"]}
      >
        <SlideHeading>Selecting a Qualitative Method</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Focus groups", "are appropriate when interaction among participants is expected to generate ideas, as in the early evaluation of product concepts."],
            ["Depth interviews", "are appropriate for sensitive topics, complex decisions, and participants who are difficult to assemble in a group."],
            ["Projective techniques", "are appropriate when participants are unlikely to state their true motives directly."],
            ["Observation", "is appropriate when the behavior itself is the object of study and participants cannot accurately report it."],
            ["Ethnography", "is appropriate when the research requires an understanding of behavior in its everyday context."],
            ["Netnography", "is appropriate when the relevant consumers discuss the topic in online communities."],
          ].map(([term, rest], i) => (
            <li key={term} className="min-w-0">
              <Ruled tone={i < 3 ? "ink" : "signal"}>
                <p className={BIG}>
                  <Term tone={i < 3 ? "ink" : "signal"}>{term}</Term> {rest}
                </p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: Choosing the Method
          ================================================================ */}
      <Slide id="discussion-choosing-the-method" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          Choosing the Method
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Prompt>
            A manufacturer of home cleaning products seeks to understand why
            consumers who state a preference for environmentally friendly
            products continue to purchase conventional products. Which
            qualitative methods are appropriate for this problem, and what are
            the limitations of each?
          </Prompt>
          <Plate>
            <SayDoGap />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: Analyzing Qualitative Data
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Analyzing Qualitative Data" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          Qualitative research produces large volumes of unstructured data, such
          as interview transcripts, field notes, images, and online posts.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              Analysis reduces these data to a set of{" "}
              <span className="text-[var(--signal)]">themes</span> that address
              the research questions.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The analysis must be systematic, so that others can follow the path
              from the data to the conclusions.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Coding
          ================================================================ */}
      <Slide id="coding" border className="!py-8" exercise={exercise["coding"]}>
        <SlideHeading>Coding</SlideHeading>
        <Lead className="!max-w-none">
          <Term>Coding</Term> is the assignment of labels, known as codes, to
          segments of qualitative data that express a particular idea.
        </Lead>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P>
                In <Term tone="ink">deductive coding</Term>, the codes are
                defined in advance, often on the basis of theory or previous
                research, and are listed in a codebook.
              </P>
            </Ruled>
            <Ruled weight="thin" tone="signal">
              <P>
                In <Term>inductive coding</Term>, the codes are developed from
                the data during analysis.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                A <Term tone="ink">codebook</Term> defines each code and provides
                examples of segments to which the code applies and segments to
                which it does not.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CodedTranscript />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--ink)] pt-5`}>
          Many projects combine the two approaches, beginning with a codebook
          and adding codes as new ideas emerge from the data.
        </p>
      </Slide>

      {/* ================================================================
          From Codes to Themes
          ================================================================ */}
      <Slide id="from-codes-to-themes" border className="!py-8">
        <SlideHeading>From Codes to Themes</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.35rem,2.1vw,1.8rem)]">
            Related codes are grouped into categories, and categories are
            developed into themes.
          </Statement>
          <Ruled tone="signal">
            <p className={BIG}>
              A <Term>theme</Term> is a pattern of meaning across the data that
              addresses a research question.
            </p>
          </Ruled>
        </div>
        <P className="mt-7 !max-w-none">
          For example, codes such as &ldquo;compares prices online,&rdquo;
          &ldquo;waits for promotions,&rdquo; and &ldquo;buys store
          brands&rdquo; may be grouped into a theme of price vigilance.
        </P>
        <Plate className="mt-4">
          <CodesToThemes />
        </Plate>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin" tone="signal">
            <P className="!max-w-none">
              Themes are supported by representative quotations from
              participants.
            </P>
          </Ruled>
          <Ruled weight="thin" tone="counter">
            <P className="!max-w-none">
              The analyst also reports cases that do not fit the themes, since
              they may indicate limits to the findings.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Saturation
          ================================================================ */}
      <Slide id="saturation" border className="!py-8" exercise={exercise["saturation"]}>
        <SlideHeading>Saturation</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <p className={BIG}>
              Qualitative samples are not determined by statistical calculation.
            </p>
            <p className={BIG}>Data collection continues until saturation is reached.</p>
            <Ruled tone="signal">
              <p className={BIG}>
                <Term>Saturation</Term> is the point at which additional
                interviews or observations no longer produce new codes or themes.
              </p>
            </Ruled>
            <Ruled weight="thin" tone="counter">
              <P>
                The number of interviews required for saturation depends on the
                diversity of the participants and the breadth of the research
                question.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SaturationCurve />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--ink)] pt-5`}>
          The researcher reports how saturation was assessed, for example by
          recording the number of new codes that each additional interview
          produced.
        </p>
      </Slide>

      {/* ================================================================
          Trustworthiness of Qualitative Findings
          ================================================================ */}
      <Slide id="trustworthiness-of-qualitative-findings" border className="!py-8">
        <SlideHeading>Trustworthiness of Qualitative Findings</SlideHeading>
        <Lead className="!max-w-none">
          Qualitative findings are evaluated for{" "}
          <Term>trustworthiness</Term> rather than for statistical significance.
        </Lead>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-4">
            <li>
              <Numbered n={1}>
                <Ruled weight="thin">
                  <P>
                    <Term tone="ink">Intercoder reliability</Term> is the extent
                    to which two or more coders, working independently, assign
                    the same codes to the same data.
                  </P>
                </Ruled>
              </Numbered>
            </li>
            <li>
              <Numbered n={2} tone="signal">
                <Ruled weight="thin" tone="signal">
                  <P>
                    <Term>Triangulation</Term> is the use of several data
                    sources, methods, or analysts to examine the same question.
                  </P>
                </Ruled>
              </Numbered>
            </li>
            <li>
              <Numbered n={3}>
                <Ruled weight="thin">
                  <P>
                    <Term tone="ink">Member checking</Term> is the practice of
                    presenting preliminary findings to participants to confirm
                    that they reflect their views.
                  </P>
                </Ruled>
              </Numbered>
            </li>
            <li>
              <Numbered n={4}>
                <Ruled weight="thin">
                  <P>
                    An <Term tone="ink">audit trail</Term> documents the decisions
                    taken during the analysis, so that others can evaluate them.
                  </P>
                </Ruled>
              </Numbered>
            </li>
          </ol>
          <Plate>
            <Triangulation />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: AI in Qualitative Research
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="AI in Qualitative Research" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          AI tools are now used both to collect and to analyze qualitative data.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              They allow qualitative research to be conducted at a larger scale
              and at lower cost.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The standards of trustworthiness introduced in this week apply to
              AI-assisted research in the same way as to research conducted
              entirely by people.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          AI-Moderated Interviews
          ================================================================ */}
      <Slide id="ai-moderated-interviews" border className="!py-8">
        <SlideHeading>AI-Moderated Interviews</SlideHeading>
        <Lead className="!max-w-none">
          In an <Term>AI-moderated interview</Term>, a conversational AI system
          asks the questions, generates follow-up probes in response to the
          participant&apos;s answers, and records the conversation.
        </Lead>
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          <Ruled tone="signal" weight="thin">
            <P>
              Such interviews can be conducted with many participants
              simultaneously, at any time of day, and in several languages.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Some participants may disclose more to an AI interviewer on
              sensitive topics, while others may disclose less.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P>
              An AI interviewer cannot observe nonverbal cues in text-based
              interviews, may fail to pursue an unexpected but relevant answer,
              and may probe in ways that lead the participant.
            </P>
          </Ruled>
        </div>
        <p className="type-quote mt-9 w-full border-l-2 border-[var(--signal)] bg-[var(--signal-tint)] px-7 py-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Participants are informed that the interviewer is an AI system, and
          their consent covers the processing of their responses by that system.
        </p>
      </Slide>

      {/* ================================================================
          AI-Assisted Coding
          ================================================================ */}
      <Slide id="ai-assisted-coding" border className="!py-8">
        <SlideHeading>AI-Assisted Coding</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              Large language models can be used to apply a codebook to
              transcripts, to propose inductive codes, and to summarize themes
              across many interviews.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              They reduce the time required to code large volumes of text
              considerably.
            </p>
          </Ruled>
        </div>
        <Statement className="mt-9 !max-w-none !text-[clamp(1.4rem,2.3vw,1.95rem)]">
          They can also assign codes that the text{" "}
          <span className="text-[var(--counter)]">does not support</span>,
          overlook views expressed by{" "}
          <span className="text-[var(--counter)]">only a few participants</span>,
          and produce{" "}
          <span className="text-[var(--counter)]">different results</span> when
          the instructions are worded differently.
        </Statement>
        <Ruled tone="counter" className="mt-9 w-full">
          <p className={`${BIG} !max-w-none`}>
            The quotations that an AI tool presents as evidence for a theme are
            verified against the original transcripts, since they may be altered
            or fabricated.
          </p>
        </Ruled>
      </Slide>

      {/* ================================================================
          Validating AI Coding Against Human Coders
          ================================================================ */}
      <Slide
        id="validating-ai-coding-against-human-coders"
        border
        className="!py-8"
        exercise={exercise["validating-ai-coding-against-human-coders"]}
      >
        <SlideHeading>Validating AI Coding Against Human Coders</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-3">
            {[
              "The researcher first develops a codebook with clear definitions and examples.",
              "Two or more human coders then code a sample of the data independently, using the codebook.",
              "The AI tool then codes the same sample, using the same codebook.",
              "The researcher then measures the agreement between the AI coding and the human coding, and compares it with the agreement between the human coders.",
              "The researcher then examines the segments on which the AI and the human coders disagree, and revises the codebook or the instructions to the AI tool.",
            ].map((s, i) => (
              <li key={i} className="min-w-0">
                <Numbered n={i + 1} tone="signal">
                  <Ruled weight="thin">
                    <P className="!max-w-none !leading-snug">{s}</P>
                  </Ruled>
                </Numbered>
              </li>
            ))}
          </ol>
          <Plate>
            <AgreementCheck />
          </Plate>
        </div>
        <Ruled tone="signal" className="mt-7 w-full">
          <p className={`${BIG} !max-w-none`}>
            The AI tool is used for the full dataset only when its agreement with
            the human coders is comparable to the agreement among the human
            coders themselves, and the level of agreement is reported.
          </p>
        </Ruled>
      </Slide>

      {/* ================================================================
          Discussion: AI in the Interview Room
          ================================================================ */}
      <Slide id="discussion-ai-in-the-interview-room" border className="!py-8">
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="type-h1">
            <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            AI in the Interview Room
          </h2>
          <div className="mt-10 w-full max-w-5xl border-y-2 border-[var(--counter)] px-4 py-9 md:px-12">
            <p className="type-quote mx-auto !max-w-[46ch] !text-[clamp(1.4rem,2.4vw,2.1rem)]">
              <span className="type-label mb-5 block !text-[0.8rem] !leading-none !text-[var(--counter)]">
                Discussion:
              </span>{" "}
              A research agency proposes to replace twenty depth interviews
              conducted by experienced interviewers with two hundred AI-moderated
              interviews, coded by a large language model. What would the client
              gain and lose in terms of depth, scale, and trustworthiness, and
              which validation procedures should the agency be required to
              report?
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Qualitative research examines the reasons for behavior through small, nonrepresentative samples, and complements quantitative research.",
            "Focus groups and depth interviews are direct approaches; projective techniques are indirect approaches used when participants are unlikely to state their true motives.",
            "Observation, ethnography, and netnography record behavior in its context rather than relying on participants' reports.",
            "Qualitative analysis proceeds from codes to themes, and data collection continues until saturation is reached.",
            "Qualitative findings are evaluated for trustworthiness, through intercoder reliability, triangulation, member checking, and an audit trail.",
            "AI tools allow qualitative research to be conducted at scale, but AI coding must be validated against human coders before it is relied upon.",
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
