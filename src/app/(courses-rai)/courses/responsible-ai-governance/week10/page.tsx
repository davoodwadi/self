"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Statement, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { AlertFatigue, AverageUser, Complementarity, CurbCut, ForcingScreen, Ladder, SocialModel, TimingGap } from "./visuals";

// ============================================================================
// WEEK 10: ACCESSIBILITY, INCLUSION, AND HUMAN-CENTERED AI DESIGN
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week10Page() {
  return (
    <SlideDeck label="Week 10">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 10: Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[24ch]">Accessibility, Inclusion, and Human-Centered AI Design</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[58ch] !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Human-centered algorithmic governance designs systems around diverse
          physical, sensory, cognitive, and linguistic needs, prevents
          deskilling and alert fatigue in human operators, and engages affected
          communities as co-designers rather than passive data sources.
        </p>
      </Slide>

      {/* ================================================================
          Who Is the "Average User" in Algorithmic Design? [no-exercise]
          ================================================================ */}
      <Slide id="who-is-the-average-user-in-algorithmic-design" border className="!py-8">
        <SlideHeading className="!mb-5">Who Is the &quot;Average User&quot; in Algorithmic Design?</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Commercial software and machine learning systems are routinely
                optimized for <Term>an unstated default user</Term>: an
                individual with standard vision, hearing, motor control,
                neurotypical information processing, high digital literacy, and
                fluent proficiency in a dominant language.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Because statistical models minimize average loss across the
                majority of observations in a dataset, users whose speech
                patterns, facial movements, reading speeds, or interaction styles
                sit in the statistical tails are frequently treated by algorithms
                as <Term>noise or anomalies</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AverageUser />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-8 border-t border-[var(--rule)] pt-5 md:grid-cols-2 md:gap-12">
          <P>
            Over one billion people worldwide live with a physical, sensory, or
            cognitive disability, and billions more interact with digital markets
            in a second language or under situational constraints.
          </P>
          <P>
            Governing AI for inclusion requires shifting from designing for a
            mythical average user to{" "}
            <Term>designing systems that adapt to human variability from the start</Term>.
          </P>
        </div>
      </Slide>

      {/* ================================================================
          The Medical Versus Social Model of Disability in Technology [exercise]
          ================================================================ */}
      <Slide
        id="the-medical-versus-social-model-of-disability-in-technology"
        border
        className="!py-8"
        exercise={exercise["the-medical-versus-social-model-of-disability-in-technology"]}
      >
        <SlideHeading className="!mb-5">The Medical Versus Social Model of Disability in Technology</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              The <Term>medical model of disability</Term> views disability as an
              individual biological deficit residing inside the person that must
              be fixed, cured, or accommodated through specialized exceptions.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>social and relational model of disability</Term> views
              disability as a mismatch between an individual&apos;s functional
              characteristics and the design of the surrounding physical,
              digital, and institutional environment.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <SocialModel />
          </Plate>
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Under the social model, a voice-only banking interface disables a
                deaf customer or a customer with a speech impairment by choice of
                architecture, whereas a multimodal interface that supports text,
                voice, and visual interaction removes the barrier by design.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Algorithmic governance adopts the social model: when an automated
                system excludes or misclassifies users with disabilities,{" "}
                <Term>
                  the defect lies in the system&apos;s design and evaluation
                  scope, not in the user
                </Term>
                .
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Universal Design and Digital Accessibility Standards [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Universal Design and Digital Accessibility Standards" />
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              <Term>Universal design</Term> is the design of products,
              interfaces, and environments to be usable by all people, to the
              greatest extent possible, without the need for adaptation or
              specialized retrofitting.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              In digital and AI-mediated services, universal design benefits both
              users with permanent disabilities and the broader market.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Universal Design and the Curb-Cut Effect [no-exercise]
          ================================================================ */}
      <Slide id="universal-design-and-the-curb-cut-effect" border className="!py-8">
        <SlideHeading className="!mb-5">Universal Design and the Curb-Cut Effect</SlideHeading>
        <Ruled className="mb-4 w-full">
          <P className="!max-w-none">
            The <Term>curb-cut effect</Term> takes its name from sidewalk ramps
            originally advocated for by wheelchair users, which subsequently
            proved indispensable for parents pushing strollers, travelers pulling
            luggage, and delivery workers rolling carts.
          </P>
        </Ruled>
        <Plate className="mx-auto w-full max-w-[880px]">
          <CurbCut />
        </Plate>
        <div className="mt-5 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Every major assistive technology in computing has followed the
              curb-cut pattern: closed captions built for deaf viewers are used by
              commuters in noisy transit, screen-reader semantic markup enables
              search engines and AI shopping agents to parse webpages, and voice
              dictation built for users with motor impairments powers hands-free
              mobile interfaces.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Designing AI systems for edge-case accessibility therefore{" "}
              <Term>improves robustness, clarity, and usability across the entire customer base</Term>{" "}
              under situational constraints such as glare, noise, multitasking, or
              cognitive fatigue.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Four POUR Principles of Digital Accessibility [exercise]
          ================================================================ */}
      <Slide
        id="the-four-pour-principles-of-digital-accessibility"
        border
        className="!py-8"
        exercise={exercise["the-four-pour-principles-of-digital-accessibility"]}
      >
        <SlideHeading className="!mb-5">The Four POUR Principles of Digital Accessibility</SlideHeading>
        <Statement className="mb-6 !max-w-none !text-[clamp(1.1rem,1.6vw,1.4rem)]">
          Codified in the Web Content Accessibility Guidelines (WCAG), digital
          accessibility rests on four foundational requirements known by the
          acronym POUR: Perceivable, Operable, Understandable, and Robust.
        </Statement>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2">
          {(
            [
              [
                "perceivable",
                <>
                  <Term>Perceivable</Term> requires that information and
                  interface components be presented in ways users can perceive
                  across sensory channels, such as providing accurate alt-text
                  descriptions for visual charts and captions for generated audio
                  or video.
                </>,
              ],
              [
                "operable",
                <>
                  <Term>Operable</Term> requires that all interface controls,
                  including interactive AI sliders, chat widgets, and verification
                  prompts, function fully via keyboard navigation, switch devices,
                  and voice commands without punitive time limits.
                </>,
              ],
              [
                "understandable",
                <>
                  <Term>Understandable</Term> requires that language, navigation,
                  and model explanations be clear, predictable, and adjustable in
                  reading complexity, avoiding opaque jargon or disorienting layout
                  shifts.
                </>,
              ],
              [
                "robust",
                <>
                  <Term>Robust</Term> requires that content and conversational
                  outputs follow standardized semantic schemas so that current and
                  future assistive technologies, such as screen readers and braille
                  displays, can parse them reliably.
                </>,
              ],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="min-w-0">
              <Ruled>
                <p className={BIG}>{text}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Algorithmic Bias Against People With Disabilities [no-exercise]
          ================================================================ */}
      <Slide id="algorithmic-bias-against-people-with-disabilities" border className="!py-8">
        <SlideHeading className="!mb-5">Algorithmic Bias Against People With Disabilities</SlideHeading>
        <Statement className="mb-6 !max-w-none !text-[clamp(1.1rem,1.6vw,1.4rem)]">
          Even when an interface meets surface WCAG markup rules, the underlying
          machine learning models can systematically penalize people with
          disabilities.
        </Statement>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {(
            [
              [
                "interview",
                <>
                  Automated video-interview and emotion-recognition tools trained
                  on neurotypical benchmarks routinely assign{" "}
                  <Term>lower employability or trustworthiness scores</Term> to
                  candidates with autism, facial palsy, blindness, or speech
                  differences because their eye contact, prosody, or facial
                  expressions deviate from the training mean.
                </>,
              ],
              [
                "proctoring",
                <>
                  Automated online exam-proctoring systems flag students with
                  Tourette syndrome, screen-reader hardware, or mobility
                  accommodations for <Term>suspected cheating</Term> at
                  disproportionately high rates.
                </>,
              ],
              [
                "speech",
                <>
                  Speech recognition and voice-authentication systems exhibit{" "}
                  <Term>elevated word error rates</Term> on dysarthric speech,
                  stuttered speech, and non-native accents, locking affected
                  consumers out of automated telephone banking and support queues.
                </>,
              ],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="min-w-0">
              <Ruled>
                <p className={BIG}>{text}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Part 2: Assistive AI for Diverse Cognitive and Physical Needs [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Assistive AI for Diverse Cognitive and Physical Needs" />
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              While poorly governed algorithms create severe barriers,
              thoughtfully designed foundation models offer{" "}
              <Term>unprecedented capabilities for individualized accessibility and learning support</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Realizing this potential requires pairing multimodal generation with
              pedagogical and privacy guardrails.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Multimodal AI as an Accessibility Bridge [no-exercise]
          ================================================================ */}
      <Slide id="multimodal-ai-as-an-accessibility-bridge" border className="!py-8">
        <SlideHeading className="!mb-5">Multimodal AI as an Accessibility Bridge</SlideHeading>
        <Ruled className="mb-6 w-full">
          <p className={`${BIG} max-w-none`}>
            <Term>Multimodal foundation models translate fluidly between sensory modalities</Term>{" "}
            in real time: converting complex visual scenes and diagrams into
            structured spoken narratives for blind users, transcribing and
            summarizing overlapping speech for deaf and hard-of-hearing users, and
            expanding brief telegraphic inputs into full written messages for users
            with motor impairments.
          </p>
        </Ruled>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              For users with dyslexia, attention-deficit/hyperactivity disorder
              (ADHD), or cognitive processing differences, language models can
              restructure dense legal contracts, medical instructions, or financial
              disclosures into chunked summaries, progressive disclosures, or
              interactive question-and-answer dialogues.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Unlike static accommodations that provide a single fixed alternative
              format, generative systems allow the user to{" "}
              <Term>ask follow-up questions at their own pace and preferred level of detail</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Personalized Formative Support and Cognitive Scaffolding: The AILSS Architecture [no-exercise]
          ================================================================ */}
      <Slide id="personalized-formative-support-and-cognitive-scaffolding-the-ailss-architecture" border className="!py-8">
        <SlideHeading className="!mb-5">Personalized Formative Support and Cognitive Scaffolding: The AILSS Architecture</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                In educational and consumer decision-support settings, learners and
                buyers with disabilities often face <Term>a timing gap</Term>:
                traditional accommodations require formal diagnosis disclosures and
                delayed human scheduling, arriving after the decision or assessment
                moment has passed.
              </P>
            </Ruled>
            <Ruled>
              <P>
                The <Term>AI-Powered Learning Support System (AILSS)</Term>{" "}
                architecture addresses this gap by using large language models to
                deliver immediate, low-stakes formative assessment and personalized
                cognitive scaffolding.
              </P>
            </Ruled>
          </div>
          <Plate className="self-center">
            <TimingGap />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-8 border-t border-[var(--rule)] pt-5 md:grid-cols-2 md:gap-12">
          <P>
            Rather than handing the user a finished answer (which undermines
            learning and agency), a formative support system diagnoses the
            specific step where comprehension broke down, re-represents the
            concept using an alternative modality or analogy, and adapts pacing
            without time pressure.
          </P>
          <P>
            Because the interaction is private and non-punitive, users can
            request repeated clarifications without stigma or social anxiety.
          </P>
        </div>
      </Slide>

      {/* ================================================================
          Privacy and Autonomy Risks in Assistive AI Systems [exercise]
          ================================================================ */}
      <Slide
        id="privacy-and-autonomy-risks-in-assistive-ai-systems"
        border
        className="!py-8"
        exercise={exercise["privacy-and-autonomy-risks-in-assistive-ai-systems"]}
      >
        <SlideHeading className="!mb-5">Privacy and Autonomy Risks in Assistive AI Systems</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          {(
            [
              [
                "profiling",
                <>
                  <Term>Inferred disability profiling</Term> occurs when a platform
                  observes a user enabling accessibility features, requesting
                  simplified text, or using assistive hardware and silently logs an
                  inferred disability attribute that leaks into advertising, credit,
                  or insurance scoring models.
                </>,
              ],
              [
                "creep",
                <>
                  <Term>Assistive surveillance creep</Term> occurs when tools
                  deployed to support students or employees with disabilities
                  collect continuous biometric, eye-tracking, or keystroke telemetry
                  that management repurposes for productivity surveillance.
                </>,
              ],
              [
                "override",
                <>
                  <Term>Paternalistic override</Term> occurs when an assistive AI
                  system makes assumptions about what a disabled user can or should
                  buy, read, or decide, restricting options instead of supporting the
                  user&apos;s self-directed choice.
                </>,
              ],
              [
                "hallucination",
                <>
                  <Term>Hallucination vulnerability in sensory translation</Term>{" "}
                  occurs when a vision-to-speech model confidently fabricates details
                  on a medication label, currency note, or product warning that a
                  blind user cannot independently cross-check visually.
                </>,
              ],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="min-w-0">
              <Ruled>
                <p className={BIG}>{text}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: Automated Video Interview Screening
          ================================================================ */}
      <Slide id="discussion-automated-video-interview-screening" border className="!py-8">
        <SlideHeading>Discussion: Automated Video Interview Screening</SlideHeading>
        <Discussion
          scenario={"A national retail chain adopts an AI video-screening platform to evaluate 50,000 entry-level job applicants per year. Applicants record three-minute video answers, and the model scores their vocal tone, speaking pace, eye contact, and facial micro-expressions to filter out the bottom 70 percent of candidates."}
          question={"Analyze this system using the social model of disability, measurement bias (Week 2), and accessibility governance, and explain why simply offering an \"accommodation request form\" fails to make the pipeline equitable."}
        />
      </Slide>

      {/* ================================================================
          Part 3: Language, Literacy, and the Three Levels of the Digital Divide [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Language, Literacy, and the Three Levels of the Digital Divide" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Inclusion in AI-mediated markets extends beyond physical and
              cognitive accessibility to the socioeconomic, linguistic, and
              cultural divides that determine{" "}
              <Term>who benefits from algorithmic systems and who bears their costs</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Three Levels of the AI Digital Divide [exercise]
          ================================================================ */}
      <Slide
        id="the-three-levels-of-the-ai-digital-divide"
        border
        className="!py-8"
        exercise={exercise["the-three-levels-of-the-ai-digital-divide"]}
      >
        <SlideHeading className="!mb-5">The Three Levels of the AI Digital Divide</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {(
            [
              [
                "access",
                <>
                  The <Term>first-level divide is the access divide</Term>:
                  inequalities in broadband connectivity, computing hardware, and
                  the ability to pay subscription fees for frontier AI models versus
                  relying on ad-funded or lower-capability free tiers.
                </>,
              ],
              [
                "capability",
                <>
                  The{" "}
                  <Term>second-level divide is the capability and epistemic literacy divide</Term>:
                  differences in users&apos; ability to formulate effective prompts,
                  configure reasoning effort, recognize hallucinations, and
                  critically verify sycophantic or biased model outputs.
                </>,
              ],
              [
                "outcome",
                <>
                  The <Term>third-level divide is the outcome and agency divide</Term>:
                  even when basic access is widespread, users and firms with advanced
                  AI agents capture disproportionate market surplus (securing better
                  prices, faster dispute resolution, and position-neutral search,
                  Wadi &amp; Ma, 2026a, 2026b), while less equipped consumers pay
                  higher all-in prices and absorb algorithmic sludges.
                </>,
              ],
            ] as const
          ).map(([kind, text], i) => (
            <li key={kind} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <p className={BIG}>{text}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Linguistic, Register, and Health/Financial Literacy Barriers [no-exercise]
          ================================================================ */}
      <Slide id="linguistic-register-and-health-financial-literacy-barriers" border className="!py-8">
        <SlideHeading className="!mb-5">Linguistic, Register, and Health/Financial Literacy Barriers</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              Customer-service, healthcare, and banking chatbots frequently perform
              best when addressed in formal, standard metropolitan dialects and{" "}
              <Term>degrade when users write in regional dialects</Term>, African
              American Vernacular English, Indigenous languages, or code-switched
              multilingual text.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              As examined in Week 2&apos;s discussion of claim narratives, models
              that equate non-native grammar or informal register with low
              credibility or elevated fraud risk{" "}
              <Term>systematically penalize linguistic minorities</Term> in access
              to financial and public services.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Similarly, when an AI financial or health advisor explains terms
              using technical vocabulary without checking user comprehension, it{" "}
              <Term>reproduces literacy barriers under the guise of automated self-service</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Indigenous Data Sovereignty and OCAP Principles [no-exercise]
          ================================================================ */}
      <Slide id="indigenous-data-sovereignty-and-ocap-principles" border className="!py-8">
        <SlideHeading className="!mb-5">Indigenous Data Sovereignty and OCAP Principles</SlideHeading>
        <Statement className="mb-6 !max-w-none !text-[clamp(1.1rem,1.6vw,1.4rem)]">
          Inclusive data governance recognizes that not all communities view
          knowledge and language as public-domain raw material for commercial web
          scraping.
        </Statement>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              <Term>Data colonialism</Term> occurs when technology firms extract
              linguistic, cultural, ecological, or health data from Indigenous and
              marginalized communities without consent, governance authority, or
              reciprocal benefit.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Established by First Nations in Canada, the{" "}
              <Term>OCAP principles (Ownership, Control, Access, and Possession)</Term>{" "}
              affirm that Indigenous communities hold collective ownership and
              jurisdiction over how their community data and cultural heritage are
              collected, stored, interpreted, and used in algorithmic systems.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Respecting Indigenous data sovereignty requires{" "}
              <Term>formal community governance agreements</Term> rather than
              relying on individual clickwrap notices or public-web scraping
              exceptions.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Human-Centered AI Teaming, Deskilling, and Cognitive Ergonomics [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Human-Centered AI Teaming, Deskilling, and Cognitive Ergonomics" />
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              Accessibility and human-centered design also apply inside the
              organization, to the employees, loan officers, clinicians, and
              moderators tasked with working alongside or overseeing AI systems.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              As introduced in Week 1,{" "}
              <Term>placing a human in the loop fails if the interface ignores human cognitive ergonomics</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Complementarity Versus Substitution in Human-AI Teams [no-exercise]
          ================================================================ */}
      <Slide id="complementarity-versus-substitution-in-human-ai-teams" border className="!py-8">
        <SlideHeading className="!mb-5">Complementarity Versus Substitution in Human-AI Teams</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                True <Term>human-AI complementarity</Term> occurs when the combined
                performance of the human-plus-AI team exceeds both the human working
                alone and the AI model operating alone.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Empirical studies of human-AI decision making show that{" "}
                <Term>naive teaming often fails to achieve complementarity</Term>:
                humans either defer to the AI when the AI is wrong (automation bias)
                or override the AI when the AI is right (algorithm aversion).
              </P>
            </Ruled>
            <Ruled>
              <P>
                Achieving complementarity requires designing the workflow around
                asymmetric strengths: algorithms excel at consistent aggregation
                across high-dimensional historical records, whereas humans excel at
                detecting unmodeled context shifts, rare causal exceptions, and
                normative edge cases.
              </P>
            </Ruled>
          </div>
          <Plate className="self-center">
            <Complementarity />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Deskilling, Alert Fatigue, and Cognitive Offloading [exercise]
          ================================================================ */}
      <Slide
        id="deskilling-alert-fatigue-and-cognitive-offloading"
        border
        className="!py-8"
        exercise={exercise["deskilling-alert-fatigue-and-cognitive-offloading"]}
      >
        <SlideHeading className="!mb-5">Deskilling, Alert Fatigue, and Cognitive Offloading</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-4 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Cognitive offloading and deskilling</Term> occur when workers
              rely on automated recommendations for routine cases over months or
              years, causing their independent diagnostic, analytical, or domain
              judgment skills to atrophy.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Paradox of automation</Term>: as an automated system becomes
              more reliable on routine cases, the human operator becomes less
              practiced and less attentive, yet the rare cases where the automation
              fails and hands control back to the human are precisely the hardest,
              most ambiguous edge cases.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                <Term>Alert fatigue</Term> occurs in human-on-the-loop monitoring
                when a safety filter or fraud detector generates a high volume of
                false-positive alarms, conditioning operators to click
                &quot;dismiss&quot; or &quot;approve&quot; habitually without
                inspecting the underlying evidence.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Moral crumple zone</Term> exposure occurs when frontline
                employees are held personally liable for overriding or failing to
                override an opaque model whose inputs and error bounds they cannot
                inspect.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AlertFatigue />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Designing Cognitive Forcing Functions for Effective Oversight [exercise]
          ================================================================ */}
      <Slide
        id="designing-cognitive-forcing-functions-for-effective-oversight"
        border
        className="!py-8"
        exercise={exercise["designing-cognitive-forcing-functions-for-effective-oversight"]}
      >
        <SlideHeading className="!mb-5">Designing Cognitive Forcing Functions for Effective Oversight</SlideHeading>
        <Ruled className="mb-5 w-full">
          <P className="!max-w-none">
            <Term>Cognitive forcing functions</Term> are deliberate interface
            patterns that interrupt automatic System 1 deference and prompt
            analytical System 2 evaluation during high-stakes human-in-the-loop
            reviews (Buçinca, Malaya, &amp; Gajos, 2021).
          </P>
        </Ruled>
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                <Term>Delayed recommendation (human-first judgment)</Term> requires
                the reviewer to inspect the core case facts and record an initial
                provisional assessment before the interface reveals the AI
                model&apos;s score and rationale.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Calibrated uncertainty and disagreement highlights</Term>{" "}
                display the model&apos;s predictive dispersion or ordinal dissension
                alongside the point score, visually flagging low-consensus cases
                where human scrutiny is most needed.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>On-demand contrastive explanations</Term> present both the
                strongest evidence supporting Approval and the strongest evidence
                supporting Rejection, rather than a one-sided persuasive summary
                that induces confirmation bias.
              </P>
            </Ruled>
          </div>
          <Plate className="self-start">
            <ForcingScreen />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Participatory Design and Inclusive Governance [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Participatory Design and Inclusive Governance" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Designing accessible, culturally respectful, and ergonomically sound
              AI systems requires{" "}
              <Term>involving affected users and frontline workers throughout the governance lifecycle</Term>{" "}
              rather than consulting them only after harm occurs.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Arnstein's Ladder and Participatory AI Design [exercise]
          ================================================================ */}
      <Slide
        id="arnsteins-ladder-and-participatory-ai-design"
        border
        className="!py-8"
        exercise={exercise["arnsteins-ladder-and-participatory-ai-design"]}
      >
        <SlideHeading className="!mb-5">Arnstein&apos;s Ladder and Participatory AI Design</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Adapted from Sherry Arnstein&apos;s (1969) ladder of citizen
                participation, participatory AI governance distinguishes{" "}
                <Term>tokenistic consultation from genuine shared power</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Non-participation and extraction</Term> occur when firms
                scrape community data or substitute synthetic LLM personas (Week 6)
                in place of speaking with real disabled or marginalized stakeholders.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Tokenism and surface consultation</Term> occur when an
                organization holds a one-off focus group after the model
                architecture and objective function are already locked in, offering
                participants no authority to alter the system.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Partnership and co-design</Term> (&quot;Nothing About Us
                Without Us&quot;) include disabled users, minority communities, and
                frontline operators from problem scoping through dataset curation,
                interface prototyping, and pre-launch red-teaming, with compensated
                roles and veto authority over harmful deployments.
              </P>
            </Ruled>
          </div>
          <Plate className="self-center">
            <Ladder />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Six Steps of an Accessibility and Human-Factors AI Audit [no-exercise]
          ================================================================ */}
      <Slide id="six-steps-of-an-accessibility-and-human-factors-ai-audit" border className="!py-8">
        <SlideHeading className="!mb-5">Six Steps of an Accessibility and Human-Factors AI Audit</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 1 is auditing the user interface against WCAG POUR standards across keyboard-only navigation, screen readers, high-contrast modes, and voice control.",
            "Step 2 is disaggregating model accuracy and false-positive rates across disability, accent, dialect, and age subgroups, specifically testing biometric, speech, and behavioral classifiers on atypical profiles.",
            "Step 3 is verifying that accessibility preferences and assistive interactions are sandboxed from commercial profiling, dynamic pricing, and credit or insurance risk scoring.",
          ].map((step) => (
            <li key={step} className="min-w-0">
              <Ruled>
                <p className={BIG}>{step}</p>
              </Ruled>
            </li>
          ))}
        </ol>
        <ol className="mt-4 grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 4 is testing high-stakes assistive outputs (such as visual descriptions for blind users or medical summaries) for hallucination rates and pairing uncertain outputs with explicit verification warnings.",
            "Step 5 is evaluating human-in-the-loop operator workflows in controlled user studies to measure automation bias, alert fatigue, and the effectiveness of cognitive forcing functions.",
            "Step 6 is conducting compensated participatory usability and red-team sessions with users with disabilities and frontline workers before launch sign-off.",
          ].map((step) => (
            <li key={step} className="min-w-0">
              <Ruled>
                <p className={BIG}>{step}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: Designing an Accessible Municipal Benefits Assistant
          ================================================================ */}
      <Slide id="discussion-designing-an-accessible-municipal-benefits-assistant" border className="!py-8">
        <SlideHeading>Discussion: Designing an Accessible Municipal Benefits Assistant</SlideHeading>
        <Discussion
          scenario={"A provincial government agency plans to deploy a conversational AI assistant to help residents apply for disability and low-income housing benefits, replacing several paper forms and telephone intake lines."}
          question={"Using the social model of disability, the three levels of the digital divide, privacy safeguards for inferred disability data, and cognitive forcing functions for caseworkers, design a governance charter for this system that ensures equitable access without turning the assistant into a barrier or surveillance tool."}
        />
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "The social model of disability locates accessibility barriers in the design of digital and algorithmic environments rather than in individual deficits. Universal design and the curb-cut effect improve robustness for all users.",
            "Accessible AI interfaces satisfy the four WCAG POUR principles (Perceivable, Operable, Understandable, Robust) while auditing underlying biometric, speech, and video models against outlier bias toward atypical bodies, voices, and neurotypes.",
            "Multimodal AI and formative support architectures such as AILSS provide immediate, stigma-free cognitive scaffolding for learners and consumers with disabilities, provided assistive telemetry is strictly walled off from commercial profiling and paternalistic overrides.",
            "The AI digital divide operates across three levels: hardware and frontier-model access (Level 1), prompt and epistemic verification literacy (Level 2), and unequal market outcomes in agent-mediated exchange (Level 3).",
            "Respecting linguistic diversity and Indigenous data sovereignty (OCAP: Ownership, Control, Access, Possession) prevents dialect discrimination and data colonialism.",
            "Effective human-in-the-loop oversight guards against deskilling, the paradox of automation, and alert fatigue by deploying cognitive forcing functions such as human-first provisional judgment and contrastive explanations.",
            "Genuine participatory design (\"Nothing About Us Without Us\") involves compensated disabled and marginalized stakeholders with real authority from initial problem scoping through pre-deployment auditing.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <P>{takeaway}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
