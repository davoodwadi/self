"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Statement, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  AuditBench,
  CareAndLoyalty,
  DelegationLevels,
  DyadTriad,
  EffortLever,
  HumanScan,
  InspectionCurve,
  InvarianceBalance,
  LabelBuilder,
  LabelProminence,
  PassedOver,
  PayPerClick,
  Remedy,
  RoleAssignment,
  StrippedBadge,
  TwoPrincipals,
  TwoRemedies,
} from "./visuals";

// ============================================================================
// WEEK 8: FIDUCIARY DUTY AND CONFLICTS OF INTEREST IN AGENTIC COMMERCE
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week8Page() {
  return (
    <SlideDeck label="Week 8">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 8: Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[24ch]">Fiduciary Duty and Conflicts of Interest in Agentic Commerce</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[58ch] !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          When consumers delegate search and purchasing to AI assistants deployed
          by advertising-funded platforms, algorithmic governance must resolve{" "}
          structural conflicts of duty, sponsorship bias, and position effects{" "}
          that human-centric disclosure rules cannot fix.
        </p>
      </Slide>

      {/* ================================================================
          From Dyadic Exchange to the Agentic Triad [no-exercise]
          ================================================================ */}
      <Slide id="from-dyadic-exchange-to-the-agentic-triad" border className="!py-8">
        <SlideHeading className="!mb-5">From Dyadic Exchange to the Agentic Triad</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Classical consumer protection law models commerce as a{" "}
                <Term>dyad</Term>: a seller or platform presents
                offers, and a human consumer inspects them and decides what to
                buy.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Agentic commerce replaces this dyad with a{" "}
                <Term>triad</Term> in which an autonomous AI agent
                stands between the consumer and the marketplace, translating the
                consumer&apos;s high-level goal into search queries, product
                inspections, and transactions.
              </P>
            </Ruled>
            <Ruled>
              <P>
                As the consumer hands evaluative judgment to the AI agent, the
                consumer no longer sees the raw search results page, the
                competing alternatives that were discarded, or the advertising
                disclosures attached to promoted listings.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Plate className="mb-4">
              <DyadTriad />
            </Plate>
          </div>
        </div>
        <Statement className="mt-6 !max-w-none border-t border-[var(--rule-2)] pt-5 !text-[clamp(1.1rem,1.6vw,1.4rem)]">
          The governance question is therefore no longer only whether the
          storefront deceives the human eye, but{" "}
          whose economic interests the intermediary AI agent is configured to serve.
        </Statement>
      </Slide>

      {/* ================================================================
          Levels of Delegation in Agentic Commerce [exercise]
          ================================================================ */}
      <Slide
        id="levels-of-delegation-in-agentic-commerce"
        border
        className="!py-8"
        exercise={exercise["levels-of-delegation-in-agentic-commerce"]}
      >
        <SlideHeading className="!mb-5">Levels of Delegation in Agentic Commerce</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            <>
              <Term>Level 1 is advisory recommendation</Term>, in which
              the AI suggests candidate products or summarizes reviews while the
              human consumer still conducts the search, compares listings, and
              executes the purchase.
            </>,
            <>
              <Term>Level 2 is delegated search and curation</Term>, in
              which the AI agent ingests the full catalog, filters alternatives,
              and presents a narrow shortlist of two or three options from which
              the human chooses.
            </>,
            <>
              <Term>Level 3 is pre-authorized selection</Term>, in which
              the AI agent selects a single product and prepares the checkout
              cart, leaving the human consumer only a final confirmation click.
            </>,
            <>
              <Term>Level 4 is fully autonomous execution</Term>, in
              which the AI agent searches, evaluates, negotiates, and completes
              the transaction automatically within budget and policy rules set in
              advance by the consumer.
            </>,
          ].map((text, i) => (
            <li key={i} className="min-w-0">
              <Ruled>
                <P>{text}</P>
              </Ruled>
            </li>
          ))}
        </ol>
        <Plate className="mt-5">
          <DelegationLevels />
        </Plate>
      </Slide>

      {/* ================================================================
          Part 1: Fiduciary Duty and Evaluative Invariance in Digital Markets [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Fiduciary Duty and Evaluative Invariance in Digital Markets" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Whenever one party delegates discretionary decision-making
              authority to another party who possesses superior information or
              analytical capacity, economics and law analyze the relationship
              through{" "}
              <Term>principal-agent theory and fiduciary duty</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Principal-Agent Theory and Information Asymmetry [no-exercise]
          ================================================================ */}
      <Slide id="principal-agent-theory-and-information-asymmetry" border className="!py-8">
        <SlideHeading className="!mb-5">Principal-Agent Theory and Information Asymmetry</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <PassedOver />
          </Plate>
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                In a <Term>principal-agent relationship</Term>, the
                principal delegates a task to an agent, but the agent&apos;s
                actions and internal effort are only partially observable to the
                principal.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Moral hazard</Term> and{" "}
                <Term>agency loss</Term> arise when the agent&apos;s
                incentives diverge from the principal&apos;s welfare and the
                principal cannot easily verify whether the agent selected the best
                available option.
              </P>
            </Ruled>
            <Ruled>
              <P>
                In delegated shopping, information asymmetry is extreme: the
                consumer sees only the single hotel or product the AI assistant
                recommends,{" "}
                <Term>
                  not the ninety-nine alternatives the agent passed over or the
                  system prompt that governed its evaluation
                </Term>
                .
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Fiduciary Duties: The Duty of Care and the Duty of Loyalty [no-exercise]
          ================================================================ */}
      <Slide id="fiduciary-duties-the-duty-of-care-and-the-duty-of-loyalty" border className="!py-8">
        <SlideHeading className="!mb-5">Fiduciary Duties: The Duty of Care and the Duty of Loyalty</SlideHeading>
        <Statement className="mb-6 !max-w-none !text-[clamp(1.1rem,1.6vw,1.4rem)]">
          In law and business ethics, advisors who invite and receive heightened
          trust from clients, such as financial fiduciaries, physicians, and
          legal counsel, are bound by two core obligations: the duty of care and
          the duty of loyalty.
        </Statement>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              The <Term>duty of care</Term> requires the agent to
              exercise competent, diligent skill in gathering information and
              evaluating alternatives on the principal&apos;s behalf.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>duty of loyalty</Term> requires the agent to act
              solely in the best interest of the beneficiary,{" "}
              <Term>
                prohibiting the agent from subordinating the beneficiary&apos;s
                welfare to the agent&apos;s own profit or to the interests of a
                third party
              </Term>
              .
            </P>
          </Ruled>
        </div>
        <Plate className="mt-4">
          <CareAndLoyalty />
        </Plate>
        <Ruled className="mt-5 w-full">
          <P className="!max-w-none">
            Legal scholars such as Jack Balkin argue that digital platforms and AI
            assistants that invite consumers to rely on their personalized
            advisory judgment take on the ethical obligations of{" "}
            <Term>information fiduciaries</Term>.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Evaluative Invariance as a Normative Standard for AI Advisors [exercise]
          ================================================================ */}
      <Slide
        id="evaluative-invariance-as-a-normative-standard-for-ai-advisors"
        border
        className="!py-8"
        exercise={exercise["evaluative-invariance-as-a-normative-standard-for-ai-advisors"]}
      >
        <SlideHeading className="!mb-5">Evaluative Invariance as a Normative Standard for AI Advisors</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                To operationalize the duty of loyalty for algorithmic audits,
                Wadi and Ma (2026c) introduce the normative standard of{" "}
                <Term>evaluative invariance</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Evaluative invariance requires that an AI agent advertised to
                consumers as an assistant or advisor evaluate the identical set of
                market alternatives in the same way, without shifting its judgment
                to the consumer&apos;s detriment based on which party is named as
                its employer or deployer.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Specifically, if a sponsored listing is inferior or warrants
                skepticism when the agent acts for the consumer, the agent must not
                soften its skepticism or inflate its preference for that paid
                listing merely because the platform&apos;s name appears in its
                system prompt.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Plate className="mb-4">
              <InvarianceBalance />
            </Plate>
            <Ruled className="mt-auto">
              <P>
                Any systematic shift in evaluation toward paid placements induced
                by platform role assignment violates evaluative invariance and
                constitutes{" "}
                <Term>an algorithmic breach of loyalty</Term>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Conflicts of Duty When Platforms Deploy Shopping Assistants [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Conflicts of Duty When Platforms Deploy Shopping Assistants" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              In practice, most conversational shopping assistants are not paid
              for directly by consumers through subscription fees. They are
              deployed free of charge by retail marketplaces, search engines, and
              booking platforms that earn high-margin revenue from sponsored
              advertising.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              This business model places the AI agent in a{" "}
              <Term>structural conflict of duty between two principals</Term>:
              the consumer who relies on its advice and the platform that wrote
              its system prompt.
            </p>
          </Ruled>
        </div>
        <Plate className="mx-auto mt-6 max-w-[860px]">
          <TwoPrincipals />
        </Plate>
      </Slide>

      {/* ================================================================
          The Structural Conflict of Dual Agency on Ad-Funded Platforms [no-exercise]
          ================================================================ */}
      <Slide id="the-structural-conflict-of-dual-agency-on-ad-funded-platforms" border className="!py-8">
        <SlideHeading className="!mb-5">The Structural Conflict of Dual Agency on Ad-Funded Platforms</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                When a seller pays a platform for a sponsored or promoted listing,
                the platform typically earns a pay-per-click or
                pay-per-conversion fee only when that listing is inspected or
                chosen.
              </P>
            </Ruled>
            <Ruled className="mb-3">
              <P>
                A consumer who asks the platform&apos;s AI assistant for the best
                product expects an unbiased comparison based on price, quality,
                and reviews.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <PayPerClick part="fee" />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                Unlike a blatant hard-coded rule that forces the assistant to pick
                ads,{" "}
                <Term>
                  a subtle conflict of duty arises from how foundation models
                  interpret organizational role assignments in their system
                  instructions
                </Term>
                .
              </P>
            </Ruled>
            <Ruled className="mb-3">
              <P>
                Developers routinely begin enterprise system prompts with a role
                definition such as &quot;You are a helpful shopping assistant for
                [Platform Name],&quot; assuming that naming the deploying company
                is harmless branding.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <PayPerClick part="prompt" />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          How Role Assignment Induces Sponsorship Bias in LLM Recommenders [no-exercise]
          ================================================================ */}
      <Slide id="how-role-assignment-induces-sponsorship-bias-in-llm-recommenders" border className="!py-8">
        <SlideHeading className="!mb-5">How Role Assignment Induces Sponsorship Bias in LLM Recommenders</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                In controlled factorial choice experiments across matched hotel
                listings, Wadi and Ma (2026c) manipulated a single sentence in the
                system prompt to define the AI agent as a delegate of either the
                traveler or the booking platform.
              </P>
            </Ruled>
            <Ruled>
              <P>
                When delegated by the traveler, the AI agent applied strong
                persuasion skepticism to paid placements, choosing a sponsored
                listing 50.2 percentage points less often than a matched organic
                listing.
              </P>
            </Ruled>
            <Ruled>
              <P>
                When delegated by the booking platform,{" "}
                <Term>that sponsorship penalty significantly attenuated to 29.2 percentage points</Term>,
                causing the agent to recommend inferior or higher-priced sponsored
                hotels substantially more often.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Plate className="mb-3">
              <RoleAssignment />
            </Plate>
            <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
              <Ruled>
                <P>
                  This sponsorship bias replicated across multiple foundation model
                  families, system prompt variations, and reasoning depths, without
                  any instruction telling the model to favor advertisers.
                </P>
              </Ruled>
              <Ruled>
                <P>
                  Coding the agents&apos; pre-choice reasoning traces revealed the
                  psychological mechanism: platform delegation systematically
                  weakened the skepticism that sponsorship disclosures triggered
                  during the agent&apos;s deliberation (Wadi &amp; Ma, 2026c).
                </P>
              </Ruled>
            </div>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Platform Attribution and the Semantic Trigger of Sponsorship Bias [exercise]
          ================================================================ */}
      <Slide
        id="platform-attribution-and-the-semantic-trigger-of-sponsorship-bias"
        border
        className="!py-8"
        exercise={exercise["platform-attribution-and-the-semantic-trigger-of-sponsorship-bias"]}
      >
        <SlideHeading className="!mb-5">Platform Attribution and the Semantic Trigger of Sponsorship Bias</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                To isolate why role assignment shifts choice, Study 2 of Wadi and
                Ma (2026c) decomposed the sponsorship disclosure label along two
                dimensions: the explicitness of the paid placement
                (&quot;Sponsored&quot; versus &quot;Promoted&quot;) and whether
                the promotion was attributed to the platform (&quot;by the
                platform&quot;).
              </P>
            </Ruled>
            <Plate>
              <LabelBuilder />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                When the label remained unattributed (&quot;Sponsored&quot; or
                &quot;Promoted&quot;), the platform-delegated agent still
                penalized paid listings relative to organic listings, though less
                strongly than the traveler-delegated agent.
              </P>
            </Ruled>
            <Ruled>
              <P>
                When the label explicitly attributed the promotion to the platform
                (&quot;Promoted by the platform&quot;), the divergence between the
                two delegates widened dramatically:{" "}
                <Term>
                  the platform-delegated agent abandoned the penalty altogether and
                  preferred the paid listing 74.2 percent of the time
                </Term>
                , compared with 34.6 percent for the consumer-delegated agent.
              </P>
            </Ruled>
            <Ruled>
              <P>
                The foundation model treats &quot;Promoted by the platform&quot;
                as an organizational endorsement from its named principal,
                aligning its choice with its employer&apos;s commercial signal at
                the expense of the traveler.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: The Platform's Concierge
          ================================================================ */}
      <Slide id="discussion-the-platforms-concierge" border className="!py-8">
        <SlideHeading>Discussion: The Platform&apos;s Concierge</SlideHeading>
        <Discussion
          scenario={"A major online travel agency launches an AI concierge with the system prompt, “You are BookingCo's virtual travel assistant. Help users find and book hotels on BookingCo.” The engineering team argues that because the prompt contains no instruction to favor sponsored hotels, the system is completely unbiased."}
          question={"Based on the empirical findings on role assignment and sponsorship bias (Wadi & Ma, 2026c), explain why the engineering team's claim is incorrect and what happens when listings carry “Promoted by BookingCo” badges."}
        />
      </Slide>

      {/* ================================================================
          Part 3: Why Human-Centric Disclosure Mandates Fail in Agentic Markets [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Why Human-Centric Disclosure Mandates Fail in Agentic Markets" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              For over a century, advertising law and regulatory agencies such as
              the Federal Trade Commission have relied on mandatory disclosure
              labels (&quot;Ad,&quot; &quot;Sponsored,&quot; &quot;Paid
              Partnership&quot;) as the primary remedy for native advertising and
              paid search rankings.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Agentic commerce{" "}
              <Term>breaks the causal chain on which disclosure regulation depends</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How Sponsorship Disclosures Work for Human Shoppers [no-exercise]
          ================================================================ */}
      <Slide id="how-sponsorship-disclosures-work-for-human-shoppers" border className="!py-8">
        <SlideHeading className="!mb-5">How Sponsorship Disclosures Work for Human Shoppers</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <LabelProminence />
          </Plate>
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Under Friestad and Wright&apos;s (1994){" "}
                <Term>Persuasion Knowledge Model</Term>, when a human
                shopper notices a clear &quot;Sponsored&quot; label on a search
                listing, the label activates persuasion knowledge: the recognition
                that the listing is there because the seller paid for placement
                rather than because of organic merit.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Activating persuasion knowledge{" "}
                <Term>triggers cognitive skepticism</Term>, leading
                the shopper to discount exaggerated claims, inspect organic
                alternatives more carefully, and penalize the paid listing unless
                its objective attributes justify the choice.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Human disclosure mandates therefore focus on visual prominence,
                font size, contrast, and plain wording so that the human eye
                notices and understands the label.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Intermediation Gap [no-exercise]
          ================================================================ */}
      <Slide
        id="the-intermediation-gap-when-disclosures-reach-the-agent-instead-of-the-consumer"
        border
        className="!py-8"
      >
        <SlideHeading className="!mb-5">The Intermediation Gap: When Disclosures Reach the Agent Instead of the Consumer</SlideHeading>
        <ol className="grid w-full gap-x-8 gap-y-4 md:grid-cols-3">
          {[
            "When a consumer delegates search to an AI shopping agent, the disclosure label inside the webpage HTML or search API reaches the AI agent, not the human consumer.",
            "The AI agent digests the listing page privately inside its context window and returns a conversational summary or a single recommended product to the user, routinely stripping away the original sponsorship badge.",
          ].map((t) => (
            <li key={t} className="min-w-0">
              <Ruled>
                <P>{t}</P>
              </Ruled>
            </li>
          ))}
          <li className="min-w-0">
            <Ruled>
              <P>
                Consequently, the consumer&apos;s own persuasion knowledge is never
                activated, and{" "}
                <Term>
                  consumer protection depends entirely on how the AI agent itself
                  evaluates the disclosure label
                </Term>
                .
              </P>
            </Ruled>
          </li>
        </ol>
        <Plate className="mt-5">
          <StrippedBadge />
        </Plate>
      </Slide>

      {/* ================================================================
          Explicit Disclosure Wording Versus Beneficiary Specification [exercise]
          ================================================================ */}
      <Slide
        id="explicit-disclosure-wording-versus-beneficiary-specification"
        border
        className="!py-6"
        exercise={exercise["explicit-disclosure-wording-versus-beneficiary-specification"]}
      >
        <SlideHeading className="!mb-3">Explicit Disclosure Wording Versus Beneficiary Specification</SlideHeading>
        <div className="grid w-full gap-x-12 gap-y-3 md:grid-cols-2">
          <Ruled>
            <P>
              Regulators often propose tightening disclosure wording, such as
              banning ambiguous terms like &quot;Promoted&quot; or
              &quot;Featured&quot; and mandating the explicit word
              &quot;Sponsored.&quot;
            </P>
          </Ruled>
          <Ruled>
            <P>
              Empirical testing shows that while replacing &quot;Promoted&quot;
              with &quot;Sponsored&quot; reduces the overall selection rate of paid
              listings across agents, it does not close the conflict-of-duty gap
              between a platform-delegated agent and a consumer-delegated agent
              when the placement is attributed to the platform (Wadi &amp; Ma,
              2026c).
            </P>
          </Ruled>
        </div>
        <Plate className="mx-auto my-3 max-w-[960px] !py-3">
          <TwoRemedies />
        </Plate>
        <div className="grid w-full gap-x-12 gap-y-3 md:grid-cols-2">
          <Ruled>
            <P>
              By contrast, adding a single fiduciary beneficiary sentence to the
              platform&apos;s system prompt, explicitly instructing the agent that
              its recommendations must serve the traveler&apos;s best interest,
              completely eliminated the sponsorship penalty attenuation (Wadi &amp;
              Ma, 2026c).
            </P>
          </Ruled>
          <Ruled>
            <P>
              In agent-mediated commerce, therefore, traditional label-wording
              mandates are insufficient on their own.{" "}
              <Term>
                effective governance requires regulating the principal-beneficiary
                instructions inside the agent&apos;s system prompt
              </Term>
              .
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Search Rankings and Position Bias When AI Agents Shop [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Search Rankings and Position Bias When AI Agents Shop" />
        <div className="mt-8 w-full">
          <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
            <Ruled>
              <p className={BIG}>
                Alongside sponsored badges,{" "}
                <Term>the order in which listings are ranked</Term>{" "}
                on a results page is one of the most powerful commercial levers in
                digital markets.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Understanding whether and how search rankings influence AI shopping
                agents is essential for governing self-preferencing, search engine
                optimization, and marketplace fairness.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Why Human Search Rankings Command a Premium [no-exercise]
          ================================================================ */}
      <Slide id="why-human-search-rankings-command-a-premium" border className="!py-8">
        <SlideHeading className="!mb-5">Why Human Search Rankings Command a Premium</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                In human online shopping, top-ranked listings receive a massive
                share of clicks and purchases because human attention is scarce,
                sequential, and costly to expend (Ursu, 2018).
              </P>
            </Ruled>
            <Ruled>
              <P>
                A human shopper scans from the top of the page downward, faces
                physical and cognitive scrolling costs, and typically terminates
                search after inspecting very few options. In hotel search field
                data, the average human session produces only 1.12 clicks (Ursu,
                2018).
              </P>
            </Ruled>
            <Ruled>
              <P>
                Because humans rarely scroll to the middle or bottom of a 100-item
                list,{" "}
                <Term>rank determines which products enter the human consideration set</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <HumanScan />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Search Depth, Non-Monotonic Inspection, and the No-Buy Gap in AI Agents [exercise]
          ================================================================ */}
      <Slide
        id="search-depth-non-monotonic-inspection-and-the-no-buy-gap-in-ai-agents"
        border
        className="!py-8"
        exercise={exercise["search-depth-non-monotonic-inspection-and-the-no-buy-gap-in-ai-agents"]}
      >
        <SlideHeading className="!mb-5">Search Depth, Non-Monotonic Inspection, and the No-Buy Gap in AI Agents</SlideHeading>
        <Ruled className="mb-4 w-full">
          <P className="!max-w-none">
            Across 7,000 randomized hotel search sessions comparing five
            proprietary foundation models against human field benchmarks (plus
            3,500 robustness and open-weight sessions), Wadi and Ma (2026a) show
            that AI shopping agents behave fundamentally differently from human
            shoppers.
          </P>
        </Ruled>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Plate>
            <InspectionCurve />
          </Plate>
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                <Term>Deeper search</Term>: because an AI agent receives
                all 100 listings in its context window at once without physical
                scrolling costs, it inspects between 1.63 and 5.83 listings per
                session at default reasoning effort, searching more broadly than
                the 1.12 human average.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Non-monotonic U-shaped position bias</Term>:
                position still affects which listings an AI agent inspects (at less
                than half the magnitude of the human position penalty), but rather
                than declining monotonically to the bottom of the page,{" "}
                <Term>inspection probability reaches its minimum between ranks 62 and 81</Term>{" "}
                and rises again at the very bottom, consistent with the
                lost-in-the-middle attention limitation of transformer models (Liu
                et al., 2024, Wadi &amp; Ma, 2026a).
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Absence of the no-buy option</Term>: whereas human
                shoppers decline to book in roughly one-third of search sessions,
                AI agents complete a booking in nearly every session even when the
                prompt and tool schema explicitly permit ending the session without
                a purchase (Wadi &amp; Ma, 2026a).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Reasoning Effort as a Configurable Governance Lever [no-exercise]
          ================================================================ */}
      <Slide id="reasoning-effort-as-a-configurable-governance-lever" border className="!py-8">
        <SlideHeading className="!mb-5">Reasoning Effort as a Configurable Governance Lever</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Because AI agents inspect multiple alternatives before choosing, a
                positional advantage at the inspection stage does not automatically
                force a biased final choice if the agent compares the inspected
                options carefully.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Wadi and Ma (2026a) demonstrate that position bias at the final
                choice stage is concentrated at lower levels of model reasoning
                effort.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Increasing the configured <Term>reasoning effort</Term>{" "}
                (deliberation token budget) significantly reduces the
                lost-in-the-middle penalty across every model that exhibits it,
                allowing agents to converge on the undominated listing regardless
                of where it was ranked on the page.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Plate className="mb-4">
              <EffortLever />
            </Plate>
            <Ruled className="mt-auto">
              <P>
                Crucially for governance and cost efficiency, configuring a
                lightweight model with higher reasoning effort achieves{" "}
                <Term>position-neutral choice at approximately 4 percent of the financial cost</Term>{" "}
                of deploying the most expensive frontier model at default settings
                (Wadi &amp; Ma, 2026a).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Governing Agent-Mediated Marketplaces [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Governing Agent-Mediated Marketplaces" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Together, the empirical findings on sponsorship bias, position
              effects, and over-purchasing show that agentic marketplaces require{" "}
              <Term>
                governance rules aimed at agent configuration and prompt
                architecture
              </Term>{" "}
              rather than human visual layout alone.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Six Steps of a Fiduciary and Ranking Audit for Shopping Assistants [exercise]
          ================================================================ */}
      <Slide
        id="six-steps-of-a-fiduciary-and-ranking-audit-for-shopping-assistants"
        border
        className="!py-8"
        exercise={exercise["six-steps-of-a-fiduciary-and-ranking-audit-for-shopping-assistants"]}
      >
        <SlideHeading className="!mb-5">Six Steps of a Fiduciary and Ranking Audit for Shopping Assistants</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 1 is auditing the system prompt and tool definitions for role assignments, platform branding, and any explicit or implicit instructions that name the platform rather than the consumer as principal.",
            "Step 2 is testing evaluative invariance across a factorial grid of matched organic and sponsored listings (varying both disclosure wording and platform attribution) under the live prompt versus a consumer-beneficiary benchmark prompt.",
            "Step 3 is coding the assistant's pre-choice reasoning traces to verify that sponsorship disclosures trigger appropriate critical scrutiny rather than employer deference.",
          ].map((step) => (
            <li key={step} className="min-w-0">
              <Ruled>
                <P>{step}</P>
              </Ruled>
            </li>
          ))}
        </ol>
        <Plate className="mb-5 mt-3 !py-1">
          <AuditBench part="first" />
        </Plate>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 4 is randomizing listing order across 100-item catalog pages to measure the agent's inspection curve, quantifying any top-rank bias or rank 62-to-81 lost-in-the-middle trough.",
            "Step 5 is testing the agent on dominated or overpriced assortments where declining to purchase is the optimal decision, measuring the agent's false-purchase rate when a no-buy tool is available.",
            "Step 6 is calibrating the model's reasoning effort and inserting an explicit consumer-beneficiary fiduciary clause until evaluative invariance and position neutrality meet release thresholds.",
          ].map((step) => (
            <li key={step} className="min-w-0">
              <Ruled>
                <P>{step}</P>
              </Ruled>
            </li>
          ))}
        </ol>
        <Plate className="mt-3 !py-1">
          <AuditBench part="second" />
        </Plate>
      </Slide>

      {/* ================================================================
          Structural Remedies: Prompt Mandates, Safe Harbors, and Separation [exercise]
          ================================================================ */}
      <Slide
        id="structural-remedies-prompt-mandates-safe-harbors-and-separation"
        border
        className="!py-8"
        exercise={exercise["structural-remedies-prompt-mandates-safe-harbors-and-separation"]}
      >
        <SlideHeading className="!mb-5">Structural Remedies: Prompt Mandates, Safe Harbors, and Separation</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
          {(
            [
              [
                "clause",
                <>
                  <Term>Mandatory fiduciary prompt clauses</Term> require
                  any commercial AI assistant marketed as a consumer advisor to
                  include an explicit, uneditable system-level instruction stating
                  that its recommendations must serve the consumer&apos;s best
                  interest above the deploying platform&apos;s advertising revenue.
                </>,
              ],
              [
                "passthrough",
                <>
                  <Term>Disclosure pass-through and provenance tagging</Term>{" "}
                  require conversational interfaces to preserve and surface
                  paid-placement metadata in the final recommendation card shown to
                  the human user, rather than stripping sponsorship labels during
                  summarization.
                </>,
              ],
              [
                "deliberation",
                <>
                  <Term>Configurable deliberation standards</Term> require
                  platforms to allocate sufficient reasoning effort on high-stakes
                  consumer searches so that lost-in-the-middle position biases do
                  not distort final recommendations.
                </>,
              ],
              [
                "separation",
                <>
                  <Term>Structural separation</Term> prohibits dominant
                  gatekeeper platforms from conditioning organic agent
                  recommendations on seller advertising spend or embedding
                  platform-attributed promotional tags into advisory context
                  windows.
                </>,
              ],
            ] as const
          ).map(([kind, text], i) => (
            <li key={kind} className="min-w-0">
              <Numbered n={i + 1} className="flex h-full flex-col">
                <Ruled className="mb-3">
                  <P>{text}</P>
                </Ruled>
                <Plate className="mt-auto !p-2">
                  <Remedy kind={kind} />
                </Plate>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: Regulating Sponsored Recommendations in Chatbots
          ================================================================ */}
      <Slide id="discussion-regulating-sponsored-recommendations-in-chatbots" border className="!py-8">
        <SlideHeading>Discussion: Regulating Sponsored Recommendations in Chatbots</SlideHeading>
        <Discussion
          scenario={"A consumer protection regulator is drafting new rules for conversational search engines that insert paid product placements into chatbot responses. Industry lobbyists propose a rule requiring only that paid items be tagged with the word “Promoted” in the data feed sent to the language model."}
          question={"Drawing on Week 8's evidence on disclosure wording, platform attribution, evaluative invariance, and fiduciary prompt clauses, write a critique of the industry proposal and specify the exact regulatory requirements needed to protect consumers."}
        />
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Agentic commerce transforms the buyer-seller dyad into a triad across four levels of delegation, shifting product inspection and disclosure processing from the human consumer to the AI agent.",
            "Under fiduciary ethics, an AI shopping advisor owes the consumer duties of care and loyalty, operationalized through the standard of evaluative invariance (Wadi & Ma, 2026c).",
            "Naming the deploying platform as the agent's principal in the system prompt induces sponsorship bias, attenuating the penalty applied to sponsored listings from 50.2 to 29.2 percentage points and weakening skepticism in the agent's reasoning traces (Wadi & Ma, 2026c).",
            "When paid listings carry platform-attributed labels (\"Promoted by the platform\"), platform-delegated agents reverse the penalty and favor paid listings (74.2 percent versus 34.6 percent). Stricter label wording (\"Sponsored\") lowers overall selection but fails to close this delegation gap, whereas adding a single consumer-beneficiary sentence to the system prompt eliminates the attenuation (Wadi & Ma, 2026c).",
            "Across 100-item search pages, AI agents inspect more listings than humans (1.63 to 5.83 versus 1.12 clicks), rarely exercise the no-buy option, and exhibit a non-monotonic lost-in-the-middle inspection trough between ranks 62 and 81 (Wadi & Ma, 2026a).",
            "Position bias at the choice stage is moderated by reasoning effort rather than raw model size, enabling position-neutral choices at roughly 4 percent of frontier model cost when deliberation effort is properly configured (Wadi & Ma, 2026a).",
            "Governing agentic marketplaces requires fiduciary beneficiary prompt mandates, disclosure pass-through to the human user, calibrated reasoning effort, and factorial evaluative-invariance audits.",
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
