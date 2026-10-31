"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Plate,
  P,
  Statement,
  Term,
  Ruled,
  SlideHeading,
  Numbered,
  PartHead,
  Discussion,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  FactorRetention,
  BankMap,
  NewEntrant,
  StandardizeFirst,
  DendrogramCut,
  ClustersFromNothing,
  ChoiceTask,
  ProfileCount,
  PriceRangeImportance,
  MarketSimulator,
  SponsorPartWorths,
  EmbeddingNeighbors,
  TextClusters,
  PersonaTrace,
} from "./visuals";

// ============================================================================
// WEEK 10: SEGMENTATION, POSITIONING, AND PREFERENCE ANALYSIS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx. The interactive ones are built around one action
// each: retain factors, place a brand, standardize, cut a tree, redraw a
// sample, add attributes, widen a price range, reprice a rival, pick a text.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** A sentence set large inside a column. */
const BIG = "type-h2 !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";

/** A closing sentence set as a serif line across the slide. */
const CLOSE = "type-quote w-full !max-w-none !text-[clamp(1.15rem,1.8vw,1.5rem)]";

/** A body sentence inside a ruled cell. */
const CELL = "!max-w-none !leading-snug";

/** One numbered step of a procedure, under a hairline. */
function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <Numbered n={n}>
      <Ruled>
        <P className={CELL}>{children}</P>
      </Ruled>
    </Numbered>
  );
}

export default function Week10() {
  return (
    <SlideDeck label="Week 10">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 10: Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[24ch]">
          Segmentation, Positioning, and Preference Analysis
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[46ch] !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Multivariate analysis provides the evidence on which{" "}
          segmentation, positioning, and product design decisions{" "}
          are based.
        </p>
      </Slide>

      {/* ================================================================
          Multivariate Methods for Marketing Strategy
          ================================================================ */}
      <Slide id="multivariate-methods-for-marketing-strategy" border className="!py-8">
        <SlideHeading>Multivariate Methods for Marketing Strategy</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
            <Term>Segmentation</Term> divides a market into groups of customers with
            similar needs or behavior. <Term>Positioning</Term> determines how a brand
            is perceived relative to competitors in the minds of target customers.
          </Statement>
          <Ruled>
            <p className={BIG}>
              Both decisions depend on data that involve{" "}
              <Term>many variables at once</Term>, such as ratings of brands on numerous
              attributes.
            </p>
          </Ruled>
        </div>
        <div className="mt-10 grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Numbered n={1}>
            <Ruled>
              <p className={BIG}>
                <Term>Factor analysis</Term> reduces a large set of attributes to a
                small number of underlying dimensions, on which perceptual maps are based.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={2}>
            <Ruled>
              <p className={BIG}>
                <Term>Cluster analysis</Term> groups customers into segments.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={3}>
            <Ruled>
              <p className={BIG}>
                <Term>Conjoint analysis</Term> measures how customers trade off
                product attributes against one another and against price.
              </p>
            </Ruled>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Factor Analysis and Perceptual Mapping
          ================================================================ */}
      <Slide id="part-1-factor-analysis-and-perceptual-mapping" border className="!py-8">
        <PartHead n={1} title="Factor Analysis and Perceptual Mapping" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              Consumers are often asked to rate brands on many attributes, many of which are
              correlated with one another.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Factor analysis identifies the <Term>smaller number of dimensions</Term> that
              underlie these ratings.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>Perceptual maps display the positions of brands on these dimensions.</p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Factor Analysis
          ================================================================ */}
      <Slide id="factor-analysis" border className="!py-8" exercise={exercise["factor-analysis"]}>
        <SlideHeading>Factor Analysis</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Factor analysis is an <Term>interdependence technique</Term>: it
                examines the relationships among a set of variables, without distinguishing
                dependent from independent variables.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                It identifies <Term>factors</Term>, which are underlying dimensions that
                account for the correlations among the observed variables.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                For example, ratings of banks on &ldquo;friendly staff,&rdquo; &ldquo;helpful
                advice,&rdquo; and &ldquo;courteous service&rdquo; may reflect a single factor of
                service quality, while ratings on &ldquo;low fees,&rdquo; &ldquo;competitive
                interest rates,&rdquo; and &ldquo;no hidden charges&rdquo; may reflect a factor of
                value.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                A <Term>factor loading</Term> is the correlation between a variable and
                a factor. Each factor is interpreted and named according to the variables that
                load highly on it.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                The number of factors is commonly determined by retaining factors with an{" "}
                <Term>eigenvalue greater than one</Term>, by examining a scree plot, and by the
                interpretability of the solution.
              </P>
            </Ruled>
            <Plate>
              <FactorRetention />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Factor analysis is also used to assess the convergent and discriminant validity of
                multi-item scales, introduced in Week 4.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Perceptual Mapping
          ================================================================ */}
      <Slide id="perceptual-mapping" border className="!py-8">
        <SlideHeading>Perceptual Mapping</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Statement className="!text-[clamp(1.2rem,1.8vw,1.5rem)]">
              A <Term>perceptual map</Term> is a graphical representation of
              consumers&rsquo; perceptions of competing brands on two or more dimensions.
            </Statement>
            <Ruled>
              <P className={CELL}>
                The dimensions may be derived by factor analysis of attribute ratings, or by{" "}
                <Term>multidimensional scaling</Term> of judgments of the similarity
                between brands.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                Brands positioned close together are perceived as similar, and are therefore{" "}
                <Term>likely to compete directly</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                An <Term>ideal point</Term> represents the combination of attributes
                most preferred by a segment of consumers. Brands closer to the ideal point are
                expected to be preferred by that segment.
              </P>
            </Ruled>
          </div>
          <Plate>
            <BankMap />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t border-[var(--rule)] pt-4`}>
          Perceptual maps represent perceptions, which may differ from the objective
          characteristics of the brands.
        </p>
      </Slide>

      {/* ================================================================
          Interpreting a Perceptual Map
          ================================================================ */}
      <Slide
        id="interpreting-a-perceptual-map"
        border
        className="!py-8"
        exercise={exercise["interpreting-a-perceptual-map"]}
      >
        <SlideHeading>Interpreting a Perceptual Map</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                The proximity of two brands indicates the degree of perceived similarity, and
                therefore the intensity of competition between them.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The distance between a brand and a segment&rsquo;s ideal point indicates how well
                the brand&rsquo;s perceived position matches the preferences of that segment.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={`${CELL} !text-[1.1em]`}>
                An unoccupied region of the map may indicate a positioning opportunity, but only
                if a <Term>sufficient number of consumers have an ideal point</Term> in that
                region.
              </P>
            </Ruled>
            <Plate>
              <NewEntrant />
            </Plate>
            <div className="grid gap-6 md:grid-cols-2">
              <Ruled>
                <P className={CELL}>
                  A brand may be repositioned by changing the product itself, or by changing
                  consumers&rsquo; perceptions of it through communication.
                </P>
              </Ruled>
              <Ruled>
                <P className={CELL}>
                  A perceptual map describes perceptions at the time of measurement, and is
                  updated as the market changes.
                </P>
              </Ruled>
            </div>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Cluster Analysis and Segmentation
          ================================================================ */}
      <Slide id="part-2-cluster-analysis-and-segmentation" border className="!py-8">
        <PartHead n={2} title="Cluster Analysis and Segmentation" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Segments can be defined in advance, on the basis of a single variable such as age or
          region, or derived from the data.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Data-driven segmentation groups customers according to their similarity on several
              variables at once, such as needs, attitudes, and purchase behavior.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term>Cluster analysis</Term> is the principal method of data-driven segmentation.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Cluster Analysis
          ================================================================ */}
      <Slide id="cluster-analysis" border className="!py-8">
        <SlideHeading>Cluster Analysis</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
          <Term>Cluster analysis</Term> classifies objects into groups, called clusters,
          so that objects within a cluster are similar to one another and different from objects
          in other clusters.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Similarity is measured by a distance measure, most commonly the{" "}
                <Term>Euclidean distance</Term> between the objects&rsquo; values on the
                clustering variables.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                Variables measured on different scales are <Term>standardized</Term> before
                clustering, so that variables with larger numerical ranges do not dominate the
                distance measure.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                <Term>Hierarchical methods</Term> combine objects into progressively
                larger clusters, and display the result in a tree diagram called a dendrogram.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                <Term>Nonhierarchical methods</Term>, such as k-means clustering,
                assign objects to a number of clusters specified in advance, and are suited to
                large datasets.
              </P>
            </Ruled>
          </div>
          <Plate>
            <StandardizeFirst />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          The Clustering Procedure
          ================================================================ */}
      <Slide
        id="the-clustering-procedure"
        border
        className="!py-8"
        exercise={exercise["the-clustering-procedure"]}
      >
        <SlideHeading>The Clustering Procedure</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Step n={1}>
            The researcher first selects the clustering variables, according to the marketing
            research problem, such as the benefits customers seek from a product.
          </Step>
          <Step n={2}>The researcher then standardizes the variables where necessary.</Step>
          <Step n={3}>The researcher then selects a distance measure and a clustering method.</Step>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <Step n={4}>
            The researcher then determines the number of clusters, according to{" "}
            <Term>statistical criteria and the interpretability</Term> of the solution.
          </Step>
          <Plate>
            <DendrogramCut />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Step n={5}>
            The researcher then profiles each cluster on variables not used in the clustering,
            such as demographics and media use, so that the segment can be identified and
            reached.
          </Step>
          <Step n={6}>
            Finally, the researcher assesses the stability of the solution, for example by
            repeating the analysis on separate halves of the sample.
          </Step>
        </div>
      </Slide>

      {/* ================================================================
          Evaluating Segments
          ================================================================ */}
      <Slide id="evaluating-segments" border className="!py-8" exercise={exercise["evaluating-segments"]}>
        <SlideHeading>Evaluating Segments</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
          Segments produced by cluster analysis are evaluated before they are used in targeting
          decisions.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <dl className="flex min-w-0 flex-col gap-2.5">
            {[
              ["Measurable", "the size and characteristics of the segment can be estimated."],
              ["Substantial", "the segment is large or profitable enough to justify a distinct marketing program."],
              ["Accessible", "the segment can be reached through identifiable channels and media."],
              ["Differentiable", "the segment responds differently from other segments to marketing actions."],
              ["Actionable", "the firm has the resources to design and implement a program for the segment."],
            ].map(([term, def]) => (
              <div key={term} className="border-t border-[var(--rule)] pt-2.5">
                <P className={CELL}>
                  <strong className="font-semibold text-[var(--ink)]">{term}:</strong> {def}
                </P>
              </div>
            ))}
          </dl>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                Cluster analysis <Term>produces clusters even when the data contain no meaningful
                group structure</Term>. A solution that fails these criteria, or is unstable across
                samples, is not used for targeting.
              </P>
            </Ruled>
            <Plate>
              <ClustersFromNothing />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Segmenting Gym Members
          ================================================================ */}
      <Slide id="discussion-segmenting-gym-members" border className="!py-8">
        <SlideHeading>Discussion: Segmenting Gym Members</SlideHeading>
        <Discussion
          scenario={"A fitness chain holds data on the visit frequency, class attendance, time of visits, and survey-reported goals of 50,000 members."}
          question={"Which variables should be used to cluster the members, which should be used to profile the clusters, and how should the resulting segments be evaluated before a targeting decision is taken?"}
        />
      </Slide>

      {/* ================================================================
          Part 3: Conjoint Analysis
          ================================================================ */}
      <Slide id="part-3-conjoint-analysis" border className="!py-8">
        <PartHead n={3} title="Conjoint Analysis" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              Customers rarely find a product that is best on every attribute, and must therefore
              make trade-offs.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Asking customers directly how important each attribute is tends to produce answers
              in which every attribute appears important.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Conjoint analysis <Term>infers the importance of attributes from the choices</Term>{" "}
              customers make among complete products.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Conjoint Analysis
          ================================================================ */}
      <Slide id="conjoint-analysis" border className="!py-8">
        <SlideHeading>Conjoint Analysis</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
            Conjoint analysis treats a product as a bundle of attributes, each with a set of
            levels.
          </Statement>
          <Ruled>
            <P className={CELL}>
              For example, a laptop may be described by brand, with three levels, battery life,
              with levels of 8, 12, and 16 hours, and price, with levels of 900, 1,100, and 1,300
              dollars.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Respondents evaluate a series of <Term>product profiles</Term>, each
                combining one level of every attribute.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                In <Term>choice-based conjoint</Term>, the most widely used form,
                respondents repeatedly choose one profile from a small set, often with the option
                to choose none.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The analysis estimates a <Term>part-worth utility</Term> for each level of each
                attribute, representing its contribution to the overall preference for a product.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ChoiceTask />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Designing a Conjoint Study
          ================================================================ */}
      <Slide id="designing-a-conjoint-study" border className="!py-8">
        <SlideHeading>Designing a Conjoint Study</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Ruled>
            <P className={CELL}>
              Attributes are selected because they are relevant to customers&rsquo; choices and
              actionable for the firm, often on the basis of prior qualitative research.
            </P>
          </Ruled>
          <Ruled>
            <P className={CELL}>
              Levels are realistic, cover the range the firm is considering, and are unambiguous
              to respondents.
            </P>
          </Ruled>
          <Ruled>
            <P className={CELL}>
              The number of attributes is limited, typically to six or fewer, since respondents
              simplify their choices when profiles become too complex.
            </P>
          </Ruled>
        </div>
        <Ruled className="mt-6 w-full">
          <P className={`${CELL} !text-[1.05em]`}>
            Because the number of possible profiles grows rapidly with the number of attributes
            and levels, a <Term>fractional factorial design</Term> presents a subset of profiles
            from which all part-worths can still be estimated.
          </P>
        </Ruled>
        <Plate className="mt-4">
          <ProfileCount />
        </Plate>
      </Slide>

      {/* ================================================================
          Interpreting Part-Worth Utilities
          ================================================================ */}
      <Slide
        id="interpreting-part-worth-utilities"
        border
        className="!py-8"
        exercise={exercise["interpreting-part-worth-utilities"]}
      >
        <SlideHeading>Interpreting Part-Worth Utilities</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Within each attribute, a higher part-worth indicates a more preferred level.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The <Term>relative importance</Term> of an attribute is the range of its
                part-worths divided by the sum of the ranges across all attributes.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                For example, if the ranges of the part-worths are 1.0 for brand, 2.0 for battery
                life, and 3.0 for price, the relative importance of price is 3.0 divided by 6.0,
                or 50 percent. Battery life accounts for 33 percent and brand for 17 percent.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                Relative importance <Term>depends on the levels included</Term> in the study. A
                wider range of prices increases the apparent importance of price.
              </P>
            </Ruled>
            <Plate>
              <PriceRangeImportance />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Part-worths can be estimated for each respondent, which allows segments to be
                formed on the basis of their preferences.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Willingness to Pay and Market Simulation
          ================================================================ */}
      <Slide id="willingness-to-pay-and-market-simulation" border className="!py-8">
        <SlideHeading>Willingness to Pay and Market Simulation</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Because price is included as an attribute, part-worths can be converted into
                monetary values.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The <Term>willingness to pay</Term> for an improvement in an attribute
                is the gain in utility from the improvement divided by the utility of one dollar,
                derived from the price part-worths.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                For example, if an increase in battery life from 8 to 12 hours adds 1.2 units of
                utility, and each dollar of price reduces utility by 0.04 units, the willingness
                to pay for the improvement is 1.2 divided by 0.04, or <Term>30 dollars</Term>.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                <Term>Market simulators</Term> use the estimated part-worths to predict
                the shares of preference for competing products under alternative scenarios, such
                as a new product launch or a competitor&rsquo;s price change.
              </P>
            </Ruled>
            <Plate>
              <MarketSimulator />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Because conjoint choices are hypothetical, they may overstate willingness to pay.
                Estimates are therefore compared with market data where possible.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Conjoint Designs for AI Agents
          ================================================================ */}
      <Slide
        id="conjoint-designs-for-ai-agents"
        border
        className="!py-8"
        exercise={exercise["conjoint-designs-for-ai-agents"]}
      >
        <SlideHeading>Conjoint Designs for AI Agents</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P className={CELL}>
              A conjoint design can be administered to an AI agent in the same form as to a
              consumer: the agent chooses among profiles whose attributes vary according to an
              experimental design.
            </P>
          </Ruled>
          <Ruled>
            <P className={CELL}>
              The part-worths estimated from the agent&rsquo;s choices show how much each attribute
              level contributes to the agent&rsquo;s selection.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                For example, a sponsorship label can be included as an attribute, so that its
                negative part-worth measures the penalty the agent applies to paid listings.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The part-worths can be compared across conditions of the agent&rsquo;s
                instructions. In hotel-booking choice experiments, agents told they served the
                booking platform <Term>penalized sponsored listings less</Term> than agents told
                they served the traveler (Wadi &amp; Ma, 2026c).
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The wording of the label can be varied as an attribute level. The label
                &ldquo;Sponsored&rdquo; reduced choice of the paid listing more than the label
                &ldquo;Promoted&rdquo; (Wadi &amp; Ma, 2026c).
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <SponsorPartWorths />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Because AI agents show position effects, the order of the profiles in each choice
                task is randomized (Wadi &amp; Ma, 2026a).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: AI-Driven Segmentation
          ================================================================ */}
      <Slide id="part-4-ai-driven-segmentation" border className="!py-8">
        <PartHead n={4} title="AI-Driven Segmentation" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              Traditional segmentation relies on structured variables, such as survey ratings and
              purchase records.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Much of the information about customers&rsquo; needs is contained in unstructured
              text, such as open-ended survey responses, reviews, and service conversations.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Language models allow such text to be <Term>represented numerically</Term>, so that
              it can be used as a basis for segmentation.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Embeddings
          ================================================================ */}
      <Slide id="embeddings" border className="!py-8">
        <SlideHeading>Embeddings</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
          An <Term>embedding</Term> is a numerical representation of a piece of text,
          produced by a language model, in which texts with similar meanings receive similar
          values.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                For example, the responses &ldquo;I need something quick before work&rdquo; and
                &ldquo;breakfast has to take five minutes&rdquo; receive embeddings that are{" "}
                <Term>close to each other</Term>, although they share almost no words.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                Embeddings can represent open-ended responses, reviews, product descriptions, and
                sequences of customer behavior.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The individual dimensions of an embedding have no direct interpretation, unlike the
                factors of a factor analysis.
              </P>
            </Ruled>
          </div>
          <Plate>
            <EmbeddingNeighbors />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Clustering Customers With Embeddings
          ================================================================ */}
      <Slide id="clustering-customers-with-embeddings" border className="!py-8">
        <SlideHeading>Clustering Customers With Embeddings</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Customers are clustered on the embeddings of the texts they have written, using
                the clustering methods introduced in this week, such as k-means.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The resulting segments are based on the needs and concerns customers express in
                their own words, rather than on attributes selected in advance by the researcher.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The approach can be applied to very large volumes of text, and can be combined
                with behavioral data in the same analysis.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                Because the dimensions are not interpretable, each cluster is interpreted by{" "}
                <Term>reading a sample of the texts</Term> assigned to it.
              </P>
            </Ruled>
            <Plate>
              <TextClusters />
            </Plate>
            <Ruled>
              <P className={CELL}>
                The results depend on the language model used and on the preparation of the texts,
                and are subject to the same stability tests and segment evaluation criteria as any
                other cluster solution.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          AI-Generated Personas
          ================================================================ */}
      <Slide id="ai-generated-personas" border className="!py-8" exercise={exercise["ai-generated-personas"]}>
        <SlideHeading>AI-Generated Personas</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
          A <Term>persona</Term> is a narrative description of a typical member of a
          segment, with a name, a context, goals, and frustrations, used to communicate the
          segment to managers and designers.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Language models can be used to generate personas from the profile of each cluster,
                and some tools allow managers to converse with a persona as a simulated customer.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                A generated persona may contain details that are not supported by the segment
                data, such as an occupation, a family situation, or a quotation, and these details
                may reflect stereotypes.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                A persona that answers questions in conversation is a synthetic respondent, and is
                subject to the limitations introduced in Week 5.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PersonaTrace />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-6 border-t border-[var(--rule-2)] pt-4`}>
          Every characteristic of a persona is therefore{" "}
          traceable to the data describing the segment, and
          the persona is used to communicate evidence, not as a source of evidence.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: A Persona in the Meeting Room
          ================================================================ */}
      <Slide id="discussion-a-persona-in-the-meeting-room" border className="!py-8">
        <SlideHeading>Discussion: A Persona in the Meeting Room</SlideHeading>
        <Discussion
          scenario={"A product team uses an AI tool to create a conversational persona for each of five customer segments, and begins to test new feature ideas by asking the personas for their reactions."}
          question={"What does this practice offer the team, which risks does it introduce, and which evidence should replace the personas' answers before a feature is built?"}
        />
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Factor analysis reduces many correlated attributes to a few underlying dimensions, and perceptual maps display brands and ideal points on those dimensions.",
            "Cluster analysis groups customers by their similarity on several variables, and the resulting segments are profiled, tested for stability, and evaluated before use.",
            "Conjoint analysis estimates part-worth utilities from choices among product profiles, from which attribute importance and willingness to pay are derived.",
            "Relative importance and willingness to pay depend on the attributes and levels included in the study, and hypothetical choices may overstate willingness to pay.",
            "Embeddings allow customers to be segmented on the needs they express in unstructured text, with each cluster interpreted by reading its texts.",
            "AI-generated personas communicate segment data, and every characteristic they contain must be supported by that data.",
            "Conjoint designs administered to AI agents estimate the part-worths agents assign to attributes such as price and sponsorship, and these part-worths can be compared across the instructions the agents receive.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
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
