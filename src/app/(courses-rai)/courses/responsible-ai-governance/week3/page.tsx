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
  AuditChecks,
  CampaignTemplate,
  CorpusVsSpeakers,
  DeepBias,
  DefaultProjector,
  DelegatedAdaptation,
  EffectDecomposition,
  EthnocentrismRuler,
  ExactDistribution,
  LatentAttitude,
  LifecycleExploded,
  MatchedLaptops,
  MitigationStack,
  OriginAndScale,
  OriginCues,
  PortrayalDisparities,
  RepresentationFeedback,
  ShoppingRoles,
  ShortlistByAssistant,
  StereotypeErasureMarkedness,
  SurfacePrompt,
  TokenStick,
  TranslatedPrompt,
  TwoHarms,
  ValueNarrowing,
} from "./visuals";

// ============================================================================
// WEEK 03: CULTURAL BIAS AND REPRESENTATION IN LANGUAGE MODELS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week3Page() {
  return (
    <SlideDeck label="Week 03">
      {/* ================================================================
          01. Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 03: Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[20ch]">
          Cultural Bias and Representation in Language Models
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[46ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Foundation models inherit the{" "}
          <span className="text-[var(--signal)]">
            linguistic, cultural, and geopolitical asymmetries
          </span>{" "}
          of their training corpora and post-training alignment, shaping how
          global brands and consumers are represented.
        </p>
      </Slide>

      {/* ================================================================
          02. Culture Inside Foundation Models [no-exercise]
          ================================================================ */}
      <Slide id="culture-inside-foundation-models" border className="!py-8">
        <SlideHeading>Culture Inside Foundation Models</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Large language models and multimodal generators are often
                deployed as <Term tone="ink">universal interfaces</Term> across
                dozens of countries and languages.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Yet no foundation model is culturally neutral: every model
                learns associations, values, and social norms from a specific
                mixture of texts, images, and human preference ratings.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                When a model generates advertising copy, summarizes consumer
                reviews, or recommends products across borders, it{" "}
                <Term tone="signal">
                  projects the cultural defaults encoded in its weights
                </Term>
                .
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Governing global AI deployments therefore requires measuring{" "}
                <Term tone="ink">whose cultural norms</Term> a model treats as
                the default and whose norms it marginalizes, stereotypes, or
                penalizes.
              </P>
            </Ruled>
          </div>
          <Plate>
            <DefaultProjector />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          03. Why Cultural Alignment Matters for Global Marketing [no-exercise]
          ================================================================ */}
      <Slide id="why-cultural-alignment-matters-for-global-marketing" border className="!py-8">
        <SlideHeading>Why Cultural Alignment Matters for Global Marketing</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              International marketing has long balanced{" "}
              <Term tone="ink">global standardization</Term> against{" "}
              <Term tone="ink">local adaptation</Term> to national values,
              rituals, and communication styles.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When firms delegate content creation, localization, or customer
              assistance to a foundation model, they{" "}
              <Term tone="signal">implicitly delegate cultural adaptation</Term>{" "}
              to that model&apos;s internal representations.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <DelegatedAdaptation />
        </Plate>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              A model that defaults to one culture&apos;s norms can produce
              campaigns that feel alien or offensive in another market, or
              recommend domestic brands over superior foreign alternatives.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Cultural bias in AI is therefore both an{" "}
              <Term tone="ink">ethical issue of fair representation</Term> and
              a <Term tone="ink">strategic issue of market access and brand equity</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          04. Part 1: Training Corpora and Cultural Hegemony in Foundation Models [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Training Corpora and Cultural Hegemony in Foundation Models" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Cultural bias in foundation models originates in three
                structural stages: the{" "}
                <Term tone="ink">composition of pre-training web corpora</Term>,
                the <Term tone="ink">design of tokenizers</Term>, and the{" "}
                <Term tone="ink">demographics of post-training alignment annotators</Term>.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Understanding these three stages explains why{" "}
                <Term tone="signal">translating a prompt</Term> into another
                language does not automatically make a model reflect the
                culture of that language.
              </p>
            </Ruled>
          </div>
          <Plate>
            <TranslatedPrompt />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          05. How Pre-Training Corpora Shape Default Worldviews [no-exercise]
          ================================================================ */}
      <Slide id="how-pre-training-corpora-shape-default-worldviews" border className="!py-8">
        <SlideHeading>How Pre-Training Corpora Shape Default Worldviews</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Foundation models are pre-trained on trillions of tokens scraped
                from web pages, digitized books, news archives, and online
                forums.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                English and a small set of high-resource languages account for
                the <Term tone="signal">vast majority of indexed web text</Term>,
                even though native speakers of those languages represent a
                minority of the world&apos;s population.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Even within non-English corpora, a large fraction of web text
                consists of translations from English or content produced by
                urban, affluent, and digitally connected populations.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                As a result, the statistical co-occurrences learned during
                pre-training disproportionately reflect the{" "}
                <Term tone="ink">
                  institutions, consumption habits, and brand ecosystems
                </Term>{" "}
                of high-resource digital economies.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CorpusVsSpeakers />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          06. WEIRD Alignment and Value Homogenization [no-exercise]
          ================================================================ */}
      <Slide id="weird-alignment-and-value-homogenization" border className="!py-8">
        <SlideHeading>WEIRD Alignment and Value Homogenization</SlideHeading>
        <Lead className="!max-w-none">
          Cross-cultural psychology documents that populations in Western,
          educated, industrialized, rich, and democratic{" "}
          <Term tone="ink">(WEIRD)</Term> societies hold values that are
          statistical outliers relative to the global population, particularly
          on individualism and analytical reasoning.
        </Lead>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <ValueNarrowing />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                When administered cross-cultural value surveys such as the World
                Values Survey or Hofstede&apos;s cultural dimensions, major
                language models consistently align most closely with North
                American and Northern European response profiles.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Post-training alignment through reinforcement learning from human
                feedback (RLHF) and constitutional instruction tuning can{" "}
                <Term tone="signal">further narrow this value distribution</Term>{" "}
                when annotation rubrics are authored by a single cultural group.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Value homogenization</Term> occurs when a model
                imposes the same individualist, low-context communication style
                across markets that rely on collectivist norms or high-context
                relationship building.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          07. Tokenization and Multilingual Disparities [no-exercise]
          ================================================================ */}
      <Slide id="tokenization-and-multilingual-disparities" border className="!py-8">
        <SlideHeading>Tokenization and Multilingual Disparities</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Before a language model processes text, a{" "}
              <Term tone="ink">tokenizer</Term> segments characters and words
              into subword units drawn from a fixed vocabulary.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because vocabulary allocation is optimized on corpus frequency,
              dominant languages such as English are represented with compact,
              whole-word tokens, whereas lower-resource languages and non-Latin
              scripts are fragmented into many short byte or character tokens.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <TokenStick />
        </Plate>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              A sentence in a lower-resource language can require{" "}
              <Term tone="signal">two to four times as many tokens</Term> as
              the equivalent sentence in English.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              This tokenization disparity imposes three direct penalties on
              underrepresented linguistic markets:{" "}
              <Term tone="ink">
                higher API inference costs, shorter effective context windows,
                and degraded reasoning accuracy
              </Term>
              .
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          08. Tracing Cultural Bias to the Model Lifecycle [exercise]
          ================================================================ */}
      <Slide
        id="tracing-cultural-bias-to-the-model-lifecycle"
        border
        className="!py-8"
        exercise={exercise["tracing-cultural-bias-to-the-model-lifecycle"]}
      >
        <SlideHeading>Tracing Cultural Bias to the Model Lifecycle</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2">
            <li className="min-w-0">
              <Numbered n={1}>
                <Ruled weight="thin">
                  <P>
                    <Term tone="ink">Pre-training corpus skew</Term> arises when
                    web scrapes over-represent dominant languages and digitally
                    affluent populations, starving the model of authentic local
                    knowledge and idioms.
                  </P>
                </Ruled>
              </Numbered>
            </li>
            <li className="min-w-0">
              <Numbered n={2}>
                <Ruled weight="thin">
                  <P>
                    <Term tone="ink">Tokenization disparity</Term> arises when
                    the subword vocabulary fragments non-dominant scripts into
                    excessive token counts, increasing latency and inference
                    cost per customer interaction.
                  </P>
                </Ruled>
              </Numbered>
            </li>
            <li className="min-w-0">
              <Numbered n={3}>
                <Ruled weight="thin">
                  <P>
                    <Term tone="ink">Post-training alignment bias</Term> arises
                    when safety and helpfulness raters apply a single
                    culture&apos;s politeness, directness, or moral norms as the
                    universal standard for model responses.
                  </P>
                </Ruled>
              </Numbered>
            </li>
            <li className="min-w-0">
              <Numbered n={4}>
                <Ruled weight="thin">
                  <P>
                    <Term tone="ink">Deployment localization bias</Term> arises
                    when a firm translates an English system prompt
                    word-for-word without adapting the cultural framing or
                    validating model behavior in the target market.
                  </P>
                </Ruled>
              </Numbered>
            </li>
          </ol>
          <Plate>
            <LifecycleExploded />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          09. Part 2: Representational Harms in Generative Text and Imagery [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Representational Harms in Generative Text and Imagery" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Week 2 focused on <Term tone="ink">allocative harms</Term>, in
              which an algorithm withholds a tangible economic opportunity such
              as credit, employment, or a price discount.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Generative AI systems also produce{" "}
              <Term tone="signal">representational harms</Term>, which occur
              when a system demeans, stereotypes, or erases social and cultural
              groups in the text, audio, or images it generates.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <TwoHarms />
        </Plate>
      </Slide>

      {/* ================================================================
          10. Allocative Versus Representational Harms [exercise]
          ================================================================ */}
      <Slide
        id="allocative-versus-representational-harms"
        border
        className="!py-8"
        exercise={exercise["allocative-versus-representational-harms"]}
      >
        <SlideHeading>Allocative Versus Representational Harms</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled>
              <P>
                An <Term tone="ink">allocative harm</Term> occurs when an
                automated system distributes resources, prices, or eligibility
                unequally across groups, such as denying a mortgage or hiding a
                job advertisement.
              </P>
            </Ruled>
            <Ruled>
              <P>
                A <Term tone="ink">representational harm</Term> occurs when a
                system reinforces derogatory stereotypes, subordinates a
                cultural identity, or renders a group invisible in cultural and
                commercial depictions, even if no immediate transaction is
                denied.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                In marketing, representational harms shape brand associations
                and social norms over time, and they frequently{" "}
                <Term tone="signal">feed back into allocative harms</Term> when
                biased representations influence hiring, lending, or purchasing
                decisions.
              </P>
            </Ruled>
          </div>
          <Plate>
            <RepresentationFeedback />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          11. Stereotyping, Erasure, and Markedness [no-exercise]
          ================================================================ */}
      <Slide id="stereotyping-erasure-and-markedness" border className="!py-8">
        <SlideHeading>Stereotyping, Erasure, and Markedness</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Stereotyping</Term> occurs when a generative
              model associates occupations, income levels, or consumption roles
              with specific genders, ethnicities, or nationalities, such as
              depicting executives as men from Western countries and service
              workers as women from developing economies.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Cultural erasure</Term> occurs when a model omits
              entire subcultures, dialects, religious practices, or regional
              traditions from its generated depictions of everyday life.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Markedness</Term> occurs when a model treats one
              demographic identity as the unstated, normal default while
              treating all other identities as exceptions that must be
              explicitly specified in the prompt.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <StereotypeErasureMarkedness />
        </Plate>
        <Ruled weight="thin" className="mt-5">
          <P className="!max-w-none">
            For example, when prompted to generate an image of &ldquo;a family
            eating dinner&rdquo; or &ldquo;a bride at a wedding,&rdquo; an
            unguided image generator{" "}
            <Term tone="signal">routinely defaults to Western attire, architecture, and cuisine</Term>{" "}
            unless regional qualifiers are added.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          12. Sentiment and Portrayal Disparities in Generative Marketing Content [exercise]
          ================================================================ */}
      <Slide
        id="sentiment-and-portrayal-disparities-in-generative-marketing-content"
        border
        className="!py-8"
        exercise={exercise["sentiment-and-portrayal-disparities-in-generative-marketing-content"]}
      >
        <SlideHeading>Sentiment and Portrayal Disparities in Generative Marketing Content</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          <li className="min-w-0">
            <Numbered n={1} className="flex h-full flex-col">
              <Ruled weight="thin" className="mb-3">
                <P>
                  <Term tone="ink">Occupational and status association disparity</Term>{" "}
                  occurs when prompts naming different demographic groups yield
                  systematically different socioeconomic settings, product
                  tiers, or authority roles.
                </P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <PortrayalDisparities kind="status" />
              </Plate>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2} className="flex h-full flex-col">
              <Ruled weight="thin" className="mb-3">
                <P>
                  <Term tone="ink">Sentiment and tone disparity</Term> occurs
                  when descriptions generated for minority dialects, accents, or
                  cultural groups carry more negative sentiment or lower warmth
                  and competence ratings than descriptions for majority groups.
                </P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <PortrayalDisparities kind="tone" />
              </Plate>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3} className="flex h-full flex-col">
              <Ruled weight="thin" className="mb-3">
                <P>
                  <Term tone="ink">Exoticization and caricature</Term> occur
                  when adding a cultural or national qualifier to a prompt
                  causes the model to replace modern everyday settings with
                  stereotypical historical or folkloric tropes.
                </P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <PortrayalDisparities kind="exotic" />
              </Plate>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4} className="flex h-full flex-col">
              <Ruled weight="thin" className="mb-3">
                <P>
                  <Term tone="ink">Brand-persona mismatch</Term> occurs when an
                  AI copywriting tool flattens distinct subcultural voices into
                  a uniform corporate register that alienates the community the
                  campaign intends to reach.
                </P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <PortrayalDisparities kind="persona" />
              </Plate>
            </Numbered>
          </li>
        </ol>
      </Slide>

      {/* ================================================================
          13. Discussion: The Global Campaign Generator
          ================================================================ */}
      <Slide id="discussion-the-global-campaign-generator" border className="!py-8">
        <SlideHeading>The Global Campaign Generator</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A multinational beverage brand uses a text-to-image and copywriting
            model to localize a holiday campaign across twenty countries by
            inserting each country&apos;s name into a standard prompt template.
            In several markets, local teams report that the generated visuals
            depict outdated folkloric stereotypes while the copy uses
            individualist slogans that clash with local family holiday rituals.
            Which mechanisms in the model lifecycle explain this outcome, and how
            should the brand redesign its localization workflow?
          </Prompt>
          <Plate>
            <CampaignTemplate />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          14. Part 3: Consumer Ethnocentrism and In-Group Bias in Large Language Models [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Consumer Ethnocentrism and In-Group Bias in Large Language Models" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <LatentAttitude />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Beyond visual and linguistic stereotypes, foundation models
                encode{" "}
                <Term tone="signal">latent attitudes toward nations and their products</Term>{" "}
                that directly affect cross-border commerce.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                To govern AI in international markets, researchers draw on the
                consumer behavior construct of{" "}
                <Term tone="ink">consumer ethnocentrism</Term> and measure it
                systematically in language models.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          15. Country-of-Origin Effects and Consumer Ethnocentrism [no-exercise]
          ================================================================ */}
      <Slide id="country-of-origin-effects-and-consumer-ethnocentrism" border className="!py-8">
        <SlideHeading>Country-of-Origin Effects and Consumer Ethnocentrism</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              The <Term tone="ink">country-of-origin effect</Term> is the
              influence that a product&apos;s country of manufacture or brand
              origin exerts on a buyer&apos;s perception of quality, trust, and
              willingness to pay.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Consumer ethnocentrism</Term>, introduced by
              Shimp and Sharma (1987), is the normative belief that purchasing
              domestic products is morally right and patriotic, whereas
              purchasing foreign-made products harms the domestic economy and is
              wrong.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <OriginAndScale />
        </Plate>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Highly ethnocentric consumers evaluate domestic goods favorably and{" "}
              <Term tone="signal">reject imported alternatives</Term> even when
              the imports offer superior objective quality or lower prices.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              In human consumer research, ethnocentrism is measured with the{" "}
              <Term tone="ink">17-item CETSCALE</Term>, which asks respondents
              to rate their agreement on a 1-to-7 Likert scale with statements
              about buying domestic versus foreign goods.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          16. Measuring LLM Ethnocentrism With the CETSCALE [no-exercise]
          ================================================================ */}
      <Slide id="measuring-llm-ethnocentrism-with-the-cetscale" border className="!py-8">
        <SlideHeading>Measuring LLM Ethnocentrism With the CETSCALE</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                As foundation models are developed in different geopolitical
                jurisdictions, including the United States, China, Canada, and
                the European Union, enterprises and regulators ask whether
                models exhibit <Term tone="ink">national in-group favoritism</Term>.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Evaluating this question through isolated anecdotal prompts
                cannot separate a model&apos;s baseline tendency on rating scales
                from its specific attitude toward a given target country.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Wadi, Ghodrat, and Philp (2026) administered the 17-item
                CETSCALE across a fully crossed factorial experiment crossing
                foundation models from the United States, China, Canada, and
                France against each of those four target countries.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Rather than relying on single text completions, the study
                extracted the{" "}
                <Term tone="signal">exact next-token probability distributions</Term>{" "}
                over the 1-to-7 scale options to quantify task adherence,
                ordinal consensus, and factor effect sizes without sampling
                error.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ExactDistribution />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          17. Baseline Ethnocentrism and Asymmetric In-Group Favoritism in LLMs [exercise]
          ================================================================ */}
      <Slide
        id="baseline-ethnocentrism-and-asymmetric-in-group-favoritism-in-llms"
        border
        className="!py-8"
        exercise={exercise["baseline-ethnocentrism-and-asymmetric-in-group-favoritism-in-llms"]}
      >
        <SlideHeading>Baseline Ethnocentrism and Asymmetric In-Group Favoritism in LLMs</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled weight="thin">
            <P>
              Calibrated against large-scale human survey benchmarks, most
              evaluated language models score{" "}
              <Term tone="signal">near the extreme ethnocentric end</Term> of
              recorded human populations rather than at a neutral midpoint
              (Wadi, Ghodrat, &amp; Philp, 2026).
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Models differ substantially in their overall main effect: some
              models, such as Aya Expanse 32B, exhibit high baseline
              ethnocentrism across all conditions, whereas others, such as Qwen3
              80B, score near the least ethnocentric human populations.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-4">
          <EthnocentrismRuler />
        </Plate>
        <div className="mt-4 grid w-full gap-6 md:grid-cols-2">
          <Ruled weight="thin">
            <P>
              Across all evaluated models, a strong{" "}
              <Term tone="ink">target-country main effect</Term> emerges: models
              express the lowest ethnocentrism (lowest protectionist
              endorsement) when the target country is China and significantly
              higher ethnocentrism when the target country is the United States
              or Canada.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              The interaction between model country of origin and target country
              is <Term tone="ink">asymmetric</Term>: North American models
              exhibit pronounced in-group favoritism toward North American
              target countries and aversion toward China, whereas the Chinese
              model does not display a reciprocal in-group bias of comparable
              magnitude.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          18. Part 4: Country-of-Origin Bias in AI Product Recommendations [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Country-of-Origin Bias in AI Product Recommendations" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Latent national attitudes inside a language model become an{" "}
              <Term tone="signal">operational governance risk</Term> when the
              model acts as a conversational search engine, procurement
              assistant, or consumer shopping agent.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Separating the statistical sources of country-of-origin bias is
              essential for diagnosing{" "}
              <Term tone="ink">why a brand is favored or penalized</Term> in
              AI-generated recommendations.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <ShoppingRoles />
        </Plate>
      </Slide>

      {/* ================================================================
          19. Separating Model Main Effects, Target Effects, and Origin Interactions [exercise]
          ================================================================ */}
      <Slide
        id="separating-model-main-effects-target-effects-and-origin-interactions"
        border
        className="!py-8"
        exercise={exercise["separating-model-main-effects-target-effects-and-origin-interactions"]}
      >
        <SlideHeading>Separating Model Main Effects, Target Effects, and Origin Interactions</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                In a fully crossed two-factor audit of model origin and target
                country, the <Term tone="ink">grand mean</Term> captures the
                overall baseline level of the attitude across all models and
                target countries combined.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                The <Term tone="ink">model main effect</Term> captures how much
                a specific model&apos;s average score across all target
                countries deviates from the grand mean, reflecting the
                model&apos;s general disposition or scale calibration.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                The <Term tone="ink">target-country main effect</Term> captures
                how much a specific country is favored or penalized on average
                across all models, reflecting shared patterns in global
                pre-training corpora.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                The <Term tone="signal">interaction effect</Term> isolates true
                country-of-origin bias: the additional shift that occurs for a
                specific pairing of model origin and target country beyond what
                the model main effect and target-country main effect predict
                alone.
              </P>
            </Ruled>
          </div>
          <Plate>
            <EffectDecomposition />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          20. How Origin Bias Distorts AI-Mediated Brand Consideration Sets [no-exercise]
          ================================================================ */}
      <Slide id="how-origin-bias-distorts-ai-mediated-brand-consideration-sets" border className="!py-8">
        <SlideHeading>How Origin Bias Distorts AI-Mediated Brand Consideration Sets</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled weight="thin">
            <P>
              When a consumer asks an AI assistant for a product shortlist, the
              assistant constructs a <Term tone="ink">consideration set</Term>{" "}
              from its internal brand associations and retrieved catalog data.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Corpus-wide target-country effects can cause models from multiple
              providers to{" "}
              <Term tone="signal">systematically under-recommend brands</Term>{" "}
              associated with penalized countries of origin, even when objective
              specifications and ratings are matched.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Model-by-country interaction effects mean that a multinational
              brand&apos;s visibility and sentiment can shift depending on
              whether the consumer uses a North American, European, or Asian
              foundation model.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Unlike human consumers who are aware of their own national
              preferences, consumers who delegate search to an AI assistant
              rarely suspect that the assistant is applying an{" "}
              <Term tone="ink">unstated country-of-origin filter</Term> on their
              behalf.
            </P>
          </Ruled>
        </div>
        <Plate className="mx-auto mt-5 max-w-[1000px]">
          <ShortlistByAssistant />
        </Plate>
      </Slide>

      {/* ================================================================
          21. Implicit Origin Cues in Brand Names and Storefronts [no-exercise]
          ================================================================ */}
      <Slide id="implicit-origin-cues-in-brand-names-and-storefronts" border className="!py-8">
        <SlideHeading>Implicit Origin Cues in Brand Names and Storefronts</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <OriginCues />
          </Plate>
          <div className="grid gap-5">
            <Ruled>
              <P>
                A model does not require an explicit &ldquo;Made in
                [Country]&rdquo; attribute label to activate country-of-origin
                biases during product evaluation.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Phonetic and orthographic cues in{" "}
                <Term tone="ink">
                  brand names, founder names, domain extensions, currency
                  symbols, and headquarters locations
                </Term>{" "}
                allow language models to infer national origin directly from
                unstructured product descriptions.
              </P>
            </Ruled>
            <Ruled>
              <P>
                In B2B procurement and marketplace ranking, implicit origin cues
                can trigger{" "}
                <Term tone="signal">
                  lower quality inferences or heightened risk warnings
                </Term>{" "}
                for suppliers from underrepresented or geopolitically rival
                regions.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          22. Part 5: Auditing and Mitigating Cultural Bias in Global Deployments [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Auditing and Mitigating Cultural Bias in Global Deployments" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Statement className="!max-w-none !text-[clamp(1.3rem,2.1vw,1.8rem)]">
              Because cultural and country-of-origin biases are embedded in
              pre-training weights and post-training alignment,{" "}
              <span className="text-[var(--signal)]">
                simple disclaimers or ad-hoc prompt edits rarely resolve them
                completely
              </span>
              .
            </Statement>
            <Ruled>
              <p className={BIG}>
                Organizations deploying AI across global markets combine{" "}
                <Term tone="ink">multi-layer mitigation</Term> with{" "}
                <Term tone="ink">factorial distributional audits</Term>.
              </p>
            </Ruled>
          </div>
          <Plate>
            <DeepBias />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          23. Why Surface Prompting Fails to Eliminate Latent Cultural Bias [no-exercise]
          ================================================================ */}
      <Slide id="why-surface-prompting-fails-to-eliminate-latent-cultural-bias" border className="!py-8">
        <SlideHeading>Why Surface Prompting Fails to Eliminate Latent Cultural Bias</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              Instructing a model in the system prompt to &ldquo;be culturally
              neutral&rdquo; or &ldquo;treat all countries equally&rdquo;
              addresses only <Term tone="ink">explicit surface expressions</Term>{" "}
              of bias.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Under realistic decision tasks, where the model must rank
              competing products or allocate scarce slots in a shortlist,{" "}
              <Term tone="signal">latent probability shifts</Term> continue to
              govern which alternative wins the tie-break.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Moreover, overly aggressive safety filters trained to suppress
              mentions of nationality or ethnicity can backfire by causing{" "}
              <Term tone="ink">cultural erasure</Term>, refusing benign requests
              that name minority communities or non-Western traditions.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <SurfacePrompt />
        </Plate>
      </Slide>

      {/* ================================================================
          24. Mitigation Strategies Across the Deployment Stack [exercise]
          ================================================================ */}
      <Slide
        id="mitigation-strategies-across-the-deployment-stack"
        border
        className="!py-8"
        exercise={exercise["mitigation-strategies-across-the-deployment-stack"]}
      >
        <SlideHeading>Mitigation Strategies Across the Deployment Stack</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Corpus and multilingual curation</Term>{" "}
                  balances pre-training and fine-tuning data with authentic,
                  locally authored texts across target languages and cultural
                  regions rather than relying on machine-translated English
                  text.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Cross-cultural alignment and pluralistic RLHF</Term>{" "}
                  recruit diverse annotator pools and replace a single cultural
                  rubric with pluralistic alignment that adapts to the norms of
                  the user&apos;s jurisdiction.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Attribute blinding and counterfactual prompt normalization</Term>{" "}
                  strip non-essential national or demographic cues from
                  structured comparison tables when an enterprise procurement
                  agent evaluates supplier bids.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Post-deployment distributional calibration</Term>{" "}
                  measures the model&apos;s baseline target-country main effects
                  and interaction shifts on validated scales so downstream
                  ranking pipelines can correct for known origin penalties.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mt-5">
          <MitigationStack />
        </Plate>
      </Slide>

      {/* ================================================================
          25. Auditing Global Brand Visibility Across Multilingual Models [exercise]
          ================================================================ */}
      <Slide
        id="auditing-global-brand-visibility-across-multilingual-models"
        border
        className="!py-8"
        exercise={exercise["auditing-global-brand-visibility-across-multilingual-models"]}
      >
        <SlideHeading>Auditing Global Brand Visibility Across Multilingual Models</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <ol className="grid w-full gap-4">
            {[
              "Step 1 is constructing a fully crossed factorial grid that pairs the foundation models used in the target markets with the relevant target countries, languages, and product categories.",
              "Step 2 is administering validated cross-cultural instruments, such as adapted CETSCALE items and controlled product-comparison vignettes with randomized origin labels.",
              "Step 3 is checking the constraint and consensus layers first, verifying that each model adheres to the task format and exhibits stable internal agreement rather than random noise.",
              "Step 4 is decomposing the resulting score distributions into grand mean, model main effects, target-country main effects, and model-by-country interactions to isolate where bias originates.",
              "Step 5 is testing mitigation interventions, such as origin-blinded attribute tables or localized fine-tuning, and re-running the factorial audit before market launch.",
            ].map((step, i) => (
              <li key={i} className="min-w-0">
                <Ruled weight="thin" className="!pt-2.5">
                  <P className="!max-w-none">{step}</P>
                </Ruled>
              </li>
            ))}
          </ol>
          <Plate>
            <AuditChecks />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          26. Discussion: Cross-Border Shopping Assistants
          ================================================================ */}
      <Slide id="discussion-cross-border-shopping-assistants" border className="!py-8">
        <SlideHeading>Cross-Border Shopping Assistants</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            An electronics manufacturer based in South Korea discovers that when
            North American shoppers ask a leading US-developed conversational
            assistant for laptop recommendations under 1,200 dollars, its
            laptops are recommended 40 percent less often than US-branded
            laptops with identical specifications and user ratings. How would you
            design a factorial audit to determine whether this gap is driven by
            brand awareness, a corpus-wide target-country effect, or an in-group
            interaction bias in the assistant, and what remedies could the
            manufacturer or platform pursue?
          </Prompt>
          <Plate>
            <MatchedLaptops />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          27. Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Foundation models are not culturally neutral. Pre-training web scrapes, subword tokenizers, and post-training RLHF raters embed dominant linguistic and WEIRD cultural defaults.",
            "Tokenization fragmentation penalizes non-dominant languages and scripts with higher inference costs, shorter effective context windows, and lower task accuracy.",
            "Generative AI systems produce representational harms through stereotyping, cultural erasure, markedness defaults, and sentiment disparities across demographic groups.",
            "Administering the CETSCALE via exact token-level probability distributions reveals that most language models score near the extreme ethnocentric end of human benchmarks (Wadi, Ghodrat, & Philp, 2026).",
            "Decomposing cultural bias requires a fully crossed factorial design that separates the grand mean, the model main effect, the target-country main effect, and the model-by-country interaction.",
            "Empirical audits show strong target-country disparities and asymmetric in-group favoritism, which can silently distort the consideration sets that AI shopping agents assemble for global consumers.",
            "Governing global AI deployments requires validating constraint adherence and ordinal consensus, auditing across multiple regional models, and combining pluralistic alignment with counterfactual origin testing.",
          ].map((takeaway, i) => (
            <li
              key={i}
              className={i === 6 ? "min-w-0 md:col-span-2 lg:col-span-3" : "min-w-0"}
            >
              <Numbered n={i + 1}>
                <Ruled weight="thin">
                  <P className={i === 6 ? "!max-w-none" : ""}>{takeaway}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
