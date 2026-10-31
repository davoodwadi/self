"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import {
  createExerciseLookup,
  type ExerciseInput,
} from "@/lib/course-exercise";
import {
  TIGHT,
  P,
  Lead,
  Statement,
  Big,
  Term,
  Tint,
  Ruled,
  Plate,
  SlideHeading,
  PartHead,
  Numbered,
  Prompt,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import * as V from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week10() {
  return (
    <SlideDeck label="Week 10">
      {/* ================================================================
          1. Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 10
          </p>
          <p className="type-caption mt-2">
            Consumer Behavior | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Social Influences, Reference Groups, and Word of Mouth
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Consumer choices are shaped by{" "}
              <Tint>
                reference groups, social power, interpersonal word of mouth,
                social media influencers, and the perceived expertise of AI
                assistants
              </Tint>
              .
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          2. The Social Context of Consumer Choice
          ================================================================ */}
      <Slide className={TIGHT} id="social-context-consumer-choice" border>
        <SlideHeading>The Social Context of Consumer Choice</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Humans are social actors who look to other people for{" "}
              <Tint>
                diagnostic product information, normative approval, and
                validation of their social identity
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                Even when a shopper completes an online checkout alone in a
                private room, anticipated reactions from peers, family members,
                and colleagues influence which brand is selected.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.AdmiredSneakers />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Social influence operates through both direct face-to-face
              interactions and mediated digital signals such as star ratings,
              review summaries, and influencer endorsements.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The strength of social influence varies systematically across
              product categories and consumption settings.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Effective marketing strategy identifies which reference groups and
              opinion leaders govern a target segment and how social proof is
              transmitted in that market.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          3. Public Versus Private Consumption and Conspicuousness
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="public-vs-private-consumption"
        border
        exercise={exercise["public-vs-private-consumption"]}
      >
        <SlideHeading>
          Public Versus Private Consumption and Conspicuousness
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.9fr_1.9fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Reference group influence is not uniform across all goods. It
              depends on{" "}
              <Tint>
                whether the item is a luxury or a necessity and whether it is
                consumed in public or in private
              </Tint>{" "}
              (Bourne, 1957, and Bearden &amp; Etzel, 1982).
            </Lead>
          </div>
          <Plate wide>
            <V.SeenOrNot />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              <Term>Public luxuries</Term> (such as golf clubs, designer
              watches, or ski equipment) are visible to others and exclusive,
              attracting strong social influence on both product ownership and
              brand choice.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Public necessities</Term> (such as wristwatches, everyday
              outerwear, or automobiles) are owned by almost everyone in the
              group, so social influence focuses primarily on which brand is
              chosen.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Private luxuries</Term> (such as high-end home espresso
              machines or whirlpool baths) are used out of public view, making
              ownership socially influenced among peers who discuss them while
              brand choice depends more on functional traits.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Private necessities</Term> (such as mattresses, socks, or
              canned vegetables) are neither visible nor exclusive, resulting in
              weak reference-group pressure on both product and brand selection.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          4. Part 1: Reference Groups, Influence Mechanisms, and Conformity
          ================================================================ */}
      <Slide id="part-1-reference-groups" border>
        <PartHead
          n={1}
          title="Reference Groups, Influence Mechanisms, and Conformity"
        />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            A <Term>reference group</Term> is any actual or imaginary individual
            or group conceived of having{" "}
            <Tint>
              significant relevance upon an individual&apos;s evaluations,
              aspirations, or behavior
            </Tint>{" "}
            (Park &amp; Lessig, 1977).
          </Statement>
          <Ruled>
            <Lead>
              Reference groups shape consumption according to whether the
              consumer belongs to them, aspires to join them, or seeks to avoid
              them.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          5. Membership, Aspirational, and Dissociative Reference Groups
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="membership-aspirational-dissociative"
        border
        exercise={exercise["membership-aspirational-dissociative"]}
      >
        <SlideHeading>
          Membership, Aspirational, and Dissociative Reference Groups
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Membership (or associative) reference groups</Term> consist
              of people the consumer actually knows and interacts with
              regularly, such as family members, close friends, coworkers, and
              local clubs.
            </Lead>
            <Ruled>
              <P>
                Because membership groups hold frequent, direct contact with the
                consumer, their normative expectations exert strong day-to-day
                influence over consumption habits.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.LookingUp />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Aspirational reference groups</Term> consist of idealized
              figures or social strata the consumer does not currently belong to
              but admires and wishes to emulate, such as professional athletes,
              executives, or creative pioneers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Dissociative (or avoidance) reference groups</Term> consist
              of groups whose identity, values, or image the consumer actively
              rejects.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumers{" "}
              <Tint>
                systematically avoid purchasing brands, styles, or venues that
                have become associated with a dissociative group
              </Tint>
              , lest observers misclassify them as members (White &amp; Dahl,
              2006).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          6. Informational, Utilitarian, and Value-Expressive Influence
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="informational-utilitarian-value-expressive"
        border
        exercise={exercise["informational-utilitarian-value-expressive"]}
      >
        <SlideHeading>
          Informational, Utilitarian, and Value-Expressive Influence
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Park and Lessig (1977) identified{" "}
              <Tint>
                three distinct psychological mechanisms through which reference
                groups alter consumer behavior
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                <Term>Informational influence</Term> occurs when a consumer
                accepts information from others as credible evidence about
                reality, such as consulting an experienced mechanic friend or
                reading expert forum threads before buying tires.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.DressForTheOffice />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Utilitarian (or normative) influence</Term> occurs when a
              consumer conforms to the expectations of a group to obtain social
              rewards or avoid social sanction, such as wearing formal business
              attire to satisfy workplace supervisors.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Value-expressive influence</Term> occurs when a consumer
              adopts a group&apos;s consumption patterns to enhance their own
              self-concept and express shared values internally, even without
              external enforcement.
            </P>
          </Ruled>
          <Ruled>
            <P>
              High-risk technical purchases heighten informational influence,
              whereas socially visible purchases in cohesive peer groups
              heighten utilitarian and value-expressive influence.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          7. Group Norms, Social Proof, and Conformity
          ================================================================ */}
      <Slide className={TIGHT} id="group-norms-social-proof-conformity" border>
        <SlideHeading>Group Norms, Social Proof, and Conformity</SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.88fr_1.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <P>
              <Term>Conformity</Term> is a change in beliefs or actions as a
              reaction to real or imagined group pressure (Asch, 1956).
            </P>
            <Ruled>
              <P>
                Every cohesive social group establishes <Term>norms</Term>,
                which are informal, shared rules specifying what behaviors,
                dress codes, and gifts are appropriate or inappropriate.
              </P>
            </Ruled>
            <Ruled>
              <P>
                In Solomon Asch&apos;s (1956) line-judgment experiments, a
                substantial share of participants{" "}
                <Tint>
                  publicly agreed with an unambiguously wrong group consensus
                  rather than risk standing out as a lone dissenter
                </Tint>
                .
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.AschRoom />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              In retail settings, descriptive social norms (often called{" "}
              <Term>social proof</Term>) inform uncertain shoppers about what
              most peers choose, as through &quot;Bestseller&quot; badges or
              &quot;Most Popular Plan&quot; labels (Cialdini, 2001).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conformity increases when the choice is ambiguous, the consumer
              lacks prior category confidence, the reference group is highly
              cohesive, and the final purchase is publicly observable.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          8. Part 2: Bases of Social Power and AI Assistants
          ================================================================ */}
      <Slide id="part-2-social-power" border>
        <PartHead n={2} title="Bases of Social Power and AI Assistants" />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Why do certain individuals, institutions, or algorithms{" "}
            <Tint>possess the capacity to alter a consumer&apos;s choices</Tint>
            ?
          </Statement>
          <Ruled>
            <Lead>
              French and Raven&apos;s taxonomy of social power explains both
              interpersonal influence and the authority consumers attribute to
              conversational AI assistants.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          9. French and Raven's Five Bases of Social Power
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="five-bases-of-social-power"
        border
        exercise={exercise["five-bases-of-social-power"]}
      >
        <SlideHeading>
          French and Raven&apos;s Five Bases of Social Power
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_0.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              <Term>Social power</Term> is the{" "}
              <Tint>
                potential ability of one agent to influence the attitudes or
                behavior of another person
              </Tint>{" "}
              (French &amp; Raven, 1959).
            </Statement>
            <Ruled>
              <P>
                <Term>Referent power</Term> derives from emotional
                identification and admiration for the source, motivating
                consumers to copy the clothing or lifestyle of admired peers and
                cultural icons.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.CopyTheAthlete />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Information and expert power</Term> derive from the
              source&apos;s perceived possession of specialized knowledge,
              training, or access to facts, as when a pharmacist recommends an
              allergy medication.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Legitimate power</Term> derives from a socially recognized
              role, contract, or institutional mandate, such as a university
              syllabus requiring a textbook or a municipal code requiring winter
              tires.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Reward power</Term> derives from the capacity to provide
              tangible or social benefits (such as loyalty rebates or group
              praise), whereas <Term>coercive power</Term> derives from the
              capacity to inflict punishment, fines, or social ostracism.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          10. Attributed Expert Power in Conversational AI Assistants
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="attributed-expert-power-ai"
        border
        exercise={exercise["attributed-expert-power-ai"]}
      >
        <SlideHeading>
          Attributed Expert Power in Conversational AI Assistants
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Consumers increasingly consult conversational AI assistants for
              product recommendations in the same way they previously consulted
              knowledgeable friends or specialist sales staff.
            </Lead>
            <Ruled>
              <P>
                Many users attribute high <Term>expert power</Term> to these
                assistants because language models respond instantaneously,
                cover technical specifications fluently, and synthesize
                comparisons in an authoritative register.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Attributed expert power grants the AI assistant{" "}
                <Tint>
                  substantial influence over which brands enter the buyer&apos;s
                  consideration set and which option is ultimately chosen
                </Tint>
                .
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.AskTheAssistant />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Unlike a human category specialist whose credentials can be
              inspected directly, a general-purpose AI assistant presents
              uniform fluency across domains where its underlying evidence
              varies widely in quality.
            </P>
          </Ruled>
          <Ruled>
            <Big className="">
              Consumers who rely on fluency as a cue for expertise may therefore
              defer to an AI recommendation without verifying the underlying
              product facts.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          11. Epistemic Limits and Independence of AI Expert Sources
          ================================================================ */}
      <Slide className={TIGHT} id="epistemic-limits-ai-independence" border>
        <SlideHeading>
          Epistemic Limits and Independence of AI Expert Sources
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Genuine expert power in a marketplace advisor rests on two
              conditions:{" "}
              <Tint>
                accurate domain knowledge and independence from undisclosed
                commercial bias
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                First, language models can generate plausible-sounding but
                factually incorrect product specifications, discontinued model
                names, or fabricated compatibility claims when not grounded in
                verified catalog databases.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.WhoPaysTheExpert />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Second, in interpersonal influence, consumers discount an
              expert&apos;s advice immediately when they learn the expert
              receives a hidden commission from the manufacturer.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The same independence question applies to AI shopping assistants
              operated by retail platforms or ad-supported search providers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Evaluating an AI assistant as an information source requires
              knowing both how its product facts are verified and whether
              commercial sponsorship shapes its rankings.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          12. Discussion: Reference Group Influence Across Product Visibility
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-product-visibility" border>
        <SlideHeading kicker="Discussion:">
          Reference Group Influence Across Product Visibility
        </SlideHeading>
        <Prompt>
          <Term>Discussion:</Term> A sporting goods manufacturer sells both
          carbon-fiber road bicycles (used in weekend group rides and amateur
          races) and under-desk home pedal exercisers (used privately in home
          offices). Using Bearden and Etzel&apos;s (1982) public-private matrix,
          Park and Lessig&apos;s (1977) three influence types, and French and
          Raven&apos;s (1959) bases of social power, compare how reference
          groups shape brand choice in these two categories and design the
          social-proof strategy for each product.
        </Prompt>
      </Slide>

      {/* ================================================================
          13. Part 3: Word of Mouth and Opinion Leadership
          ================================================================ */}
      <Slide id="part-3-word-of-mouth" border>
        <PartHead n={3} title="Word of Mouth and Opinion Leadership" />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            <Term>Word-of-mouth (WOM) communication</Term> is the{" "}
            <Tint>
              informal transmission of product information from one consumer to
              another
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Because interpersonal sources are generally perceived as having no
              financial stake in selling the item, word of mouth is far more
              persuasive than paid advertising.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          14. Interpersonal Word of Mouth and Negativity Bias
          ================================================================ */}
      <Slide className={TIGHT} id="interpersonal-wom-negativity-bias" border>
        <SlideHeading>
          Interpersonal Word of Mouth and Negativity Bias
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Word-of-mouth communication</Term> encompasses face-to-face
              conversations, personal recommendations, and informal warnings
              shared among consumers (Arndt, 1967).
            </Lead>
            <Ruled>
              <P>
                According to the{" "}
                <Term>two-step flow of communication model</Term>, mass media
                messages often reach influential individuals first, who then
                interpret and pass them along to their broader social circles
                (Katz &amp; Lazarsfeld, 1955).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.OneComplaint />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Word of mouth exhibits a{" "}
              <Tint>strong negativity bias</Tint>: dissatisfied consumers tell
              more people about a negative product experience than satisfied
              consumers tell about a positive one.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In addition, prospective buyers assign greater diagnostic weight
              to negative word of mouth than to positive word of mouth when
              evaluating an unfamiliar brand.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Trying to suppress legitimate negative feedback rarely succeeds,
              whereas resolving the underlying product defect and encouraging
              organic advocacy builds durable credibility.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          15. Opinion Leaders, Market Mavens, and Surrogate Buyers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="opinion-leaders-market-mavens-surrogates"
        border
        exercise={exercise["opinion-leaders-market-mavens-surrogates"]}
      >
        <SlideHeading>
          Opinion Leaders, Market Mavens, and Surrogate Buyers
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.88fr_1.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Interpersonal influence is concentrated among{" "}
              <Tint>three distinct types of marketplace informers</Tint>:
              opinion leaders, market mavens, and surrogate consumers.
            </Statement>
            <Ruled>
              <P>
                An <Term>opinion leader</Term> is an individual who is highly
                involved and knowledgeable in a specific product category (such
                as photography or running footwear) and frequently advises peers
                within that domain (Rogers, 1962).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.WhoAsksWhom />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Opinion leadership is typically <Term>monomorphic</Term>{" "}
              (domain-specific): an opinion leader in audio equipment is rarely
              an opinion leader in skincare.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>market maven</Term>, by contrast, possesses broad general
              marketplace knowledge across many categories, tracks retail
              pricing, store openings, and coupon policies, and enjoys
              initiating discussions with other shoppers (Feick &amp; Price,
              1987).
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>surrogate consumer</Term>, unlike both opinion leaders and
              market mavens, is formally retained or delegated to execute search
              and purchase decisions on the buyer&apos;s behalf.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          16. Electronic Word of Mouth and Network Tie Strength
          ================================================================ */}
      <Slide className={TIGHT} id="ewom-network-tie-strength" border>
        <SlideHeading>
          Electronic Word of Mouth and Network Tie Strength
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Electronic word of mouth (eWOM)</Term> extends interpersonal
              communication to digital product reviews, discussion forums,
              unboxing videos, and social media threads.
            </Lead>
            <Ruled>
              <P>
                Unlike ephemeral spoken conversations, eWOM is persistent,
                searchable across time, and visible to millions of strangers as
                well as to AI web crawlers.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.EWomForms />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Social network analysis distinguishes <Term>strong ties</Term>{" "}
              (close family and friends within a tight-knit cluster) from{" "}
              <Term>weak ties</Term> (acquaintances and distant forum
              participants bridging separate social groups) (Granovetter, 1973).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Strong ties provide high trust and emotional reassurance for
              high-risk decisions, whereas{" "}
              <Tint>
                weak ties serve as bridges that introduce novel product
                innovations across otherwise disconnected groups
              </Tint>
              .
            </P>
          </Ruled>
          <Ruled>
            <P>
              Viral marketing and referral programs succeed when they combine
              the high trust of strong-tie invitations with the broad reach of
              weak-tie digital sharing.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          17. Part 4: AI-Generated Review Summaries and Synthetic Reviews
          ================================================================ */}
      <Slide id="part-4-review-summaries" border>
        <PartHead
          n={4}
          title="AI-Generated Review Summaries and Synthetic Reviews"
        />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Shoppers facing hundreds of individual online reviews increasingly
            rely on{" "}
            <Tint>
              AI-generated review summaries at the top of product pages
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              At the same time, generative AI has lowered the cost of producing
              fake synthetic reviews, creating new challenges for trust and
              regulation.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          18. AI-Generated Review Summaries as Mediated Word of Mouth
          ================================================================ */}
      <Slide className={TIGHT} id="ai-review-summaries-mediated-wom" border>
        <SlideHeading>
          AI-Generated Review Summaries as Mediated Word of Mouth
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.88fr_1.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <P>
              Major e-commerce platforms now display a single paragraph at the
              top of the review section synthesized by a large language model
              from hundreds of individual customer posts.
            </P>
            <Ruled>
              <P>
                Many time-pressed shoppers read only this AI-generated summary
                and the aggregate star rating rather than scrolling through
                individual reviews.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.FakeReviews />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              The summarization model therefore acts as an{" "}
              <Tint>algorithmic gatekeeper of electronic word of mouth</Tint>,
              deciding which product strengths and complaints are highlighted.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Minor phrasing choices in the summary, such as whether a
              durability complaint is framed as a rare exception or a recurring
              flaw, can shift conversion rates substantially.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consequently, the quality of mediated word of mouth depends on
              both the summarization algorithm and the integrity of the
              underlying review pool.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          19. Propagation of Incentivized Review Bias in AI Summaries
          ================================================================ */}
      <Slide className={TIGHT} id="incentivized-review-bias-ai-summaries" border>
        <SlideHeading>
          Propagation of Incentivized Review Bias in AI Summaries
        </SlideHeading>
        <Statement className="">
          An AI review summary can only be{" "}
          <Tint>as unbiased as the corpus of reviews it summarizes</Tint>.
        </Statement>
        <div className="mt-8 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              As examined in Weeks 4 and 9, firms frequently solicit reviews
              using financial incentives and reciprocal message frames that
              alter who submits a review and how much detail they write (Wadi et
              al., 2026a, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              If a product&apos;s review pool is heavily populated by
              incentivized five-star reviews written under a company-focused
              appeal, an AI summary will distill and amplify that skewed
              sentiment as an apparent consensus.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Meanwhile, stripping away individual reviewer metadata (such as
              verified-purchase badges, incentivized-review disclosures, or
              reviewer history) inside a unified summary paragraph hides
              important credibility cues from the shopper.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Preserving transparency in AI review summaries requires weighting
              verified organic feedback appropriately and disclosing when
              underlying reviews were incentivized.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          20. Synthetic Reviews, Credibility Erosion, and Regulatory Bans
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="synthetic-reviews-regulatory-bans"
        border
        exercise={exercise["synthetic-reviews-regulatory-bans"]}
      >
        <SlideHeading>
          Synthetic Reviews, Credibility Erosion, and Regulatory Bans
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Generative language models make it trivial for bad actors to
              produce thousands of fluent, varied fake reviews that mimic
              authentic customer experiences, known as{" "}
              <Term>synthetic reviews</Term>.
            </Lead>
            <Ruled>
              <P>
                Unlike older template-based spam, synthetic reviews vary
                sentence structure and mention specific product attributes,
                making them difficult for human readers to detect by inspection.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.FakeReviewBan />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Widespread synthetic reviews create a{" "}
              <Term>&quot;lemons market&quot; problem</Term> in eWOM: if buyers
              cannot distinguish genuine customer feedback from fabricated
              praise or competitor sabotage, the informational value of all
              reviews collapses.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In 2024, the United States Federal Trade Commission issued a final
              rule explicitly prohibiting the creation, sale, or dissemination
              of fake consumer reviews and testimonials, including AI-generated
              reviews attributed to non-existent individuals.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because AI shopping agents also ingest customer reviews to score
              candidate products,{" "}
              <Tint>
                synthetic reviews simultaneously deceive human buyers and
                corrupt autonomous agent decisions
              </Tint>
              .
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          21. Part 5: Influencer Marketing, Virtual Influencers, and Brand Communities
          ================================================================ */}
      <Slide id="part-5-influencers-communities" border>
        <PartHead
          n={5}
          title="Influencer Marketing, Virtual Influencers, and Brand Communities"
        />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Brands increasingly allocate promotional budgets to{" "}
            <Tint>
              social media creators and online brand communities that blend
              interpersonal norms with commercial messaging
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Evaluating influencer campaigns requires distinguishing audience
              scale from parasocial trust and examining the rise of
              computer-generated virtual influencers.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          22. Macro-Influencers, Micro-Influencers, and Parasocial Relationships
          ================================================================ */}
      <Slide className={TIGHT} id="macro-micro-influencers-parasocial" border>
        <SlideHeading>
          Macro-Influencers, Micro-Influencers, and Parasocial Relationships
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.9fr_1.9fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <P>
              <Term>Social media influencers</Term> are content creators who
              have cultivated a dedicated following in a niche or lifestyle
              domain and monetize that audience through brand partnerships.
            </P>
            <Ruled>
              <P>
                <Term>Macro-influencers</Term> and celebrity creators command
                hundreds of thousands or millions of followers, providing broad
                awareness reach at the top of the marketing funnel.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.MacroMicro />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Micro-influencers</Term> and <Term>nano-influencers</Term>{" "}
              have smaller, specialized audiences (often 5,000 to 50,000
              followers) but typically achieve{" "}
              <Tint>
                higher engagement rates and stronger perceived category
                authenticity
              </Tint>
              .
            </P>
          </Ruled>
          <Ruled>
            <P>
              Repeated exposure to a creator&apos;s daily videos fosters a{" "}
              <Term>parasocial relationship</Term>: an asymmetric, one-sided
              psychological bond in which the follower feels as though the
              creator is a familiar personal friend (Horton &amp; Richard Wohl,
              1956).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Parasocial trust makes an influencer recommendation feel like
              referent and expert peer advice rather than traditional
              advertising.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          23. Virtual Influencers and Perceived Authenticity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="virtual-influencers-authenticity"
        border
        exercise={exercise["virtual-influencers-authenticity"]}
      >
        <SlideHeading>
          Virtual Influencers and Perceived Authenticity
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              A <Term>virtual influencer</Term> is a computer-generated, often
              AI-driven fictional character that maintains social media
              accounts, posts lifestyle imagery, and endorses commercial brands
              (such as Lil Miquela or Imma).
            </Lead>
            <Ruled>
              <P>
                For brand managers, virtual influencers offer complete creative
                control, freedom from human personal scandals, and the ability
                to appear in any global market instantaneously.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.VirtualInfluencer />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              However, virtual influencers suffer from a{" "}
              <Tint>
                fundamental authenticity deficit in experiential categories
              </Tint>
              : a digital avatar has no skin to test a moisturizer and no taste
              buds to experience a beverage.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumer research indicates that virtual influencers can be
              effective for symbolic, fashion, or technology-oriented campaigns
              when their artificial nature is transparent, but trigger
              skepticism when making sensory or health claims (Lou et al.,
              2023).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Blurring the boundary between human lived experience and synthetic
              endorsement without clear disclosure erodes brand trust.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          24. Brand Communities and Sponsorship Disclosure Mandates
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-communities-disclosure-mandates"
        border
      >
        <SlideHeading>
          Brand Communities and Sponsorship Disclosure Mandates
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              A <Term>brand community</Term> is a specialized,
              non-geographically bound community based on a{" "}
              <Tint>
                structured set of social relationships among admirers of a brand
              </Tint>{" "}
              (Muniz &amp; O&apos;Guinn, 2001).
            </Statement>
            <Ruled>
              <P>
                Classic brand communities, such as Harley Owners Group, Lego
                user forums, or running club communities, share three markers:
                consciousness of kind (a shared &quot;we-ness&quot;), shared
                rituals and traditions, and a sense of moral responsibility to
                assist fellow members.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.BrandForum />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Brand communities generate high-value social proof and peer
              troubleshooting while strengthening barriers to brand switching.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When brands pay influencers or community members to promote
              products, consumer protection laws (such as FTC endorsement
              guidelines) require clear, conspicuous disclosure (such as{" "}
              <Term>#ad</Term> or <Term>Paid partnership</Term>) at the start of
              the post.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Clear sponsorship disclosure activates the consumer&apos;s{" "}
              <Term>persuasion knowledge</Term> (Friestad &amp; Wright, 1994),
              allowing the audience to recognize commercial intent and weigh the
              recommendation fairly.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          25. Discussion: Auditing Social Proof and AI Review Summaries
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-social-proof-ai-reviews" border>
        <SlideHeading kicker="Discussion:">
          Auditing Social Proof and AI Review Summaries
        </SlideHeading>
        <Prompt>
          <Term>Discussion:</Term> A skincare brand launching a 65-dollar
          vitamin-C serum proposes three tactics: (1) hiring a
          computer-generated virtual influencer to post a &quot;30-day glowing
          skin transformation&quot; diary, (2) offering a 15-dollar rebate to
          buyers who leave a five-star review so that retail AI review summaries
          highlight unanimous praise, and (3) seeding free samples with
          credentialed dermatologists on short-form video platforms. Evaluate
          each tactic using French and Raven&apos;s (1959) bases of social
          power, word-of-mouth credibility, and the 2024 FTC regulations on
          reviews and endorsements, and recommend an ethical launch plan.
        </Prompt>
      </Slide>

      {/* ================================================================
          26. Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          {[
            "Social influence is strongest for publicly consumed goods and luxuries (Bearden & Etzel, 1982) and operates through membership, aspirational, and dissociative reference groups.",
            "Reference groups shape behavior via informational, utilitarian, and value-expressive influence, while group norms and social proof drive conformity under uncertainty.",
            "French and Raven's five bases of social power (referent, expert, legitimate, reward, coercive) explain interpersonal influence, and consumers frequently attribute high expert power to conversational AI assistants based on linguistic fluency.",
            "Word of mouth is more credible than paid advertising, exhibits a negativity bias, and flows through category-specific opinion leaders, broad market mavens, and weak-tie digital networks.",
            "AI-generated review summaries compress eWOM but can propagate biases from incentivized reviews, while synthetic fake reviews erode market trust and violate regulatory prohibitions such as the 2024 FTC rule.",
            "Influencer marketing leverages parasocial relationships across macro- and micro-creators, whereas virtual influencers lack lived product experience and require careful category matching and transparent sponsorship disclosure.",
          ].map((item, i) => (
            <Numbered key={i} n={i + 1}>
              <P>{item}</P>
            </Numbered>
          ))}
        </div>
      </Slide>
    </SlideDeck>
  );
}
