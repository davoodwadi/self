import React from "react";
import type { Metadata } from "next";
import { Slide } from "@/components/slide-components/SlideComponents";
import "./apa.css";
import { Ruled } from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";
import DeckKeys, { type DeckSection } from "./_components/DeckKeys";
import {
  PartyPlate,
  PositionCurvePlate,
  SponsorDesign,
  ToolLabBoard,
  TriadPlate,
} from "./_components/Plates";
import {
  DebiasBars,
  MediationPlate,
  SponsorBars,
  ToolLabBars,
} from "./_components/Bars";
import { CoffeeShelf } from "./_components/Coffee";
import { NutritionPlate } from "./_components/NutritionPlate";
import {
  ExactPlate,
  PassAtOnePlate /* , PeoplePlate */,
} from "./_components/Methods";

// The brief deck in a plain APA style: every word comes verbatim from
// slides.md. The detailed slides live at /talks/guelph and serve as backup
// for questions.

export const metadata: Metadata = {
  title: "Decision-Making in AI-Mediated Marketplaces (Plain) | Davood Wadi",
  description:
    "Interview presentation, brief version in plain APA style, Department of Marketing and Consumer Studies, University of Guelph.",
  robots: { index: false, follow: false },
};

const KEY = "text-[var(--signal)]";
const LINK =
  "underline decoration-[var(--rule-2)] underline-offset-4 hover:text-[var(--signal)]";
const BODY =
  "text-[1.25rem] leading-relaxed text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)]";
const CITE = "text-[1rem] leading-relaxed text-[var(--ink-3)]";

/** The navigator's dots: one per section, so a paper's method and results slides share a dot. */
const SECTIONS: DeckSection[] = [
  { label: "Title", ids: ["title"] },
  { label: "Prosocial behavior in digital markets", ids: ["foundation"] },
  { label: "AI mediated digital markets", ids: ["shift"] },
  {
    label: "Methods: LLMs as subjects of analysis",
    ids: [
      "methods-standard",
      // "methods-subjects",
      "methods-emnlp",
      "methods-etc",
    ],
  },
  {
    label: "Shopping by Algorithm",
    ids: ["shopping-question", "tool-lab", "pricing"],
  },
  {
    label: "Whom Do AI Agents Serve?",
    ids: [
      "sponsorship-question",
      "sponsorship-method",
      "sponsorship",
      "sponsorship-process",
      "sponsorship-fix",
    ],
  },
  { label: "Does Rank Still Matter?", ids: ["rank-method", "rank"] },
  {
    label: "Can Decision Models Sample Human Behavior?",
    ids: ["silicon-sampling-method", "silicon-sampling"],
  },
  { label: "Future research", ids: ["future"] },
  { label: "Teaching", ids: ["teaching-evaluations", "teaching"] },
  { label: "Thank you", ids: ["thanks"] },
  // { label: "Backup", ids: ["backup"] },
];

/** Numbers each slide's folio, as the full deck does. */
function Deck({ children }: { children: React.ReactNode }) {
  const slides = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<React.ComponentProps<typeof Slide>>[];
  return (
    <div className="apa relative min-h-screen bg-[var(--paper)] text-[var(--ink-2)]">
      <DeckKeys sections={SECTIONS} />
      {slides.map((s, i) =>
        React.cloneElement(s, { __index: i + 1, __total: slides.length }),
      )}
    </div>
  );
}

/** The small line above a heading. */
function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[1.1rem] text-[var(--ink-3)]">{children}</p>;
}

/** The slide's claim in bold. */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="type-h1 mb-8 max-w-[42ch] !text-[clamp(2rem,3.4vw,2.9rem)] !leading-[1.15]">
      {children}
    </h2>
  );
}

/** A tool name from the code, set as a quiet chip. */
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.9em] text-[var(--ink)]">{children}</code>
  );
}

/** Text column beside a plate. */
function Split({
  children,
  plate,
}: {
  children: React.ReactNode;
  plate: React.ReactNode;
}) {
  return (
    <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
      <div className="flex min-w-0 flex-col gap-5">{children}</div>
      <div className="min-w-0">{plate}</div>
    </div>
  );
}

const FULL = "/talks/guelph";

export default function Page() {
  return (
    <Deck>
      {/* 1. Title */}
      <Slide id="title" align="center">
        <div className="mx-auto w-full max-w-[64rem]">
          <p className="mb-10 text-[1.05rem] text-[var(--ink-2)]">
            Interview for the position of Assistant Professor in AI and
            Business, Lang School of Business and Economics
          </p>
          <h1 className="type-display mx-auto max-w-[24ch] !text-[clamp(2.6rem,4.6vw,4rem)] !leading-[1.15]">
            Decision-Making in Digital and{" "}
            <span className={KEY}>AI-Mediated</span> Marketplaces
          </h1>
          <div className="mt-12 flex flex-col items-center gap-3">
            <p className="text-[1.25rem] text-[var(--ink-2)]">
              <strong className="font-semibold text-[var(--ink)]">
                Davood Wadi, PhD
              </strong>{" "}
              (Marketing, AI specialization, HEC Montréal)
            </p>
            <ul className="mt-4 space-y-1 text-[1.05rem] text-[var(--ink-2)]">
              <li>
                Researcher, McGill Centre for the Convergence of Health and
                Economics
              </li>
              <li>Research Collaborator, General Motors R&amp;D</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 2. Research stream 1: prosocial behavior */}
      <Slide id="foundation" border>
        <Kicker>Research stream 1</Kicker>
        <Heading>Prosocial behavior in digital markets</Heading>
        <div className="grid w-full max-w-[72rem] gap-10 md:grid-cols-2">
          {[
            {
              finding: (
                <>
                  Asking reviewers &ldquo;help the company&rdquo; backfires when
                  paired with financial incentives, while &ldquo;help other
                  customers&rdquo; does not.
                </>
              ),
              title:
                "The interplay of altruism and financial incentives: Maximizing online reviews through effective messaging",
              journal: "Journal of Electronic Commerce Research",
            },
            {
              finding: (
                <>
                  Performance-contingent incentives motivate first-time (vs.
                  experienced) reviewers more strongly to write a review and to
                  exert more effort.
                </>
              ),
              title:
                "Be careful what you pay for: The effect of performance-contingent incentives on online product reviews",
              journal: "Journal of Research in Interactive Marketing",
            },
          ].map((p) => (
            <Ruled key={p.journal}>
              <p className="type-quote !text-[clamp(1.25rem,1.9vw,1.6rem)]">
                {p.finding}
              </p>
              <p className="mt-6 text-[1.05rem] leading-snug text-[var(--ink)]">
                {p.title}, <em>{p.journal}</em>, 2026
              </p>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* 3. AI mediated digital markets: the shift and the pipeline */}
      <Slide id="shift" border>
        <Kicker>Research stream 2</Kicker>
        <Heading>
          <span className={KEY}>AI mediated</span> digital markets
        </Heading>
        <div className="mx-auto w-full max-w-[34rem]">
          <TriadPlate />
        </div>
        <div className="mt-8 grid w-full grid-cols-2 gap-x-8 gap-y-4 border-t-2 border-[var(--ink)] pt-4 lg:grid-cols-4">
          {[
            [
              "Pricing Cues and Information Search",
              <>
                (<em>JAMS</em>, major revision).
              </>,
            ],
            [
              "Principal-Agent Conflicts",
              <>
                (<em>JBR</em>, in preparation).
              </>,
            ],
            [
              "Ranking and Consideration Sets",
              <>
                (<em>Marketing Letters</em>, under review).
              </>,
            ],
            [
              "Methods and Distributional Models",
              <>
                (<em>EMNLP</em> 2025, <em>ACL</em>, <em>Marketing Science</em>)
              </>,
            ],
          ].map(([t, v], i) => (
            <div key={i}>
              <p className="type-h2 !text-[1.3rem]">
                <span className="mr-2 text-[var(--ink-3)]">{i + 1}.</span>
                {t}
              </p>
              <p className={`${CITE} mt-1`}>{v}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* Methods 1: the standard single-response test */}
      <Slide id="methods-standard" border>
        <Kicker>
          Methods: A Monte-Carlo Sampling Framework For Reliable Evaluation of
          Large Language Models Using Behavioral Analysis (EMNLP 2025)
        </Kicker>
        <Heading>
          <span className={KEY}>Behavioral evaluation</span> of Large Language
          Models
        </Heading>
        <Split plate={<PassAtOnePlate />}>
          <ul className="flex flex-col gap-4">
            <li
              className={`${BODY} border-t border-[var(--ink)] pt-3 !text-[1.1rem]`}
            >
              <strong>The standard practice:</strong> LLMs are evaluated by
              pass@1, a single response per prompt, as in the GPT, Gemini, and
              Claude reports.
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-3 !text-[1.1rem]`}
            >
              <strong>LLM behavior research:</strong> Studies of LLM behavior
              typically evaluate one response per prompt (e.g., Jones &amp;
              Steinhardt, 2022).
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-3 !text-[1.1rem]`}
            >
              One response per condition, obscures the true behavior of the LLM.
            </li>
          </ul>
        </Split>
      </Slide>

      {/* Methods 3: the EMNLP framework */}
      <Slide id="methods-emnlp" border>
        <Kicker>Findings of EMNLP 2025</Kicker>
        <Heading>
          A <span className={KEY}>Monte-Carlo framework</span> for behavioral
          evaluation of LLMs
        </Heading>
        <Split plate={<PassAtOnePlate sampling />}>
          <ul className="flex flex-col gap-2">
            {[
              {
                t: "Estimand",
                d: (
                  <>
                    the model&apos;s behavior is the expected score of its
                    response to a prompt, over its response distribution.
                  </>
                ),
              },
              {
                t: "Theorem 1",
                d: (
                  <>
                    the Monte-Carlo mean of K independent responses is an
                    unbiased estimator of the model&apos;s behavior.
                  </>
                ),
              },
              {
                t: "Theorem 2",
                d: <>its variance decays to zero as K grows.</>,
              },
              {
                t: "Corollary",
                d: (
                  <>
                    the Monte-Carlo mean is asymptotically normal, which yields
                    confidence intervals for model behavior.
                  </>
                ),
              },
              {
                t: "Choosing K",
                d: (
                  <>
                    the smallest K with the power to detect small effects
                    (Cohen&apos;s <em>f</em> ≤ 0.10) across conditions.
                  </>
                ),
              },
              {
                t: "Application in marketing research",
                d: (
                  <>
                    applies to LLM evaluation in general, as well as to the
                    social sciences and business research on LLM behavior.
                  </>
                ),
              },
            ].map((c, i) => (
              <li
                key={c.t}
                className={`${BODY} border-t pt-2 !text-[1rem] ${i === 0 ? "border-[var(--ink)]" : "border-[var(--rule-2)]"}`}
              >
                <strong>{c.t}:</strong> {c.d}
              </li>
            ))}
          </ul>
        </Split>
      </Slide>

      {/* Methods 4: Every Token Counts */}
      <Slide id="methods-etc" border>
        <Kicker>
          Every Token Counts (<em>ACL</em> 2027, with Mohsen Ghodrat &amp;
          Matthew Philp)
        </Kicker>
        <Heading>
          <span className={KEY}>Exact</span> Likert-scale distributions from a
          single forward pass
        </Heading>
        <Split plate={<ExactPlate />}>
          <ul className="flex flex-col gap-2.5">
            <li
              className={`${BODY} border-t border-[var(--ink)] pt-2.5 !text-[1.02rem]`}
            >
              <strong>The limit of sampling:</strong> for a given prompt, an
              LLM&apos;s response distribution is fixed and observable.
              Monte-Carlo sampling takes repeated noisy draws from it, so finite
              K leaves sampling error.
            </li>
            <li
              className={`${BODY} border-t-2 border-[var(--signal)] pt-2.5 !text-[1.02rem] !text-[var(--ink)]`}
            >
              Token log-probabilities give the exact response distribution, with
              zero sampling error.
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-2.5 !text-[1.02rem]`}
            >
              <strong>Constraint:</strong> the failure rate is the probability
              mass outside the valid answers.
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-2.5 !text-[1.02rem]`}
            >
              <strong>Consensus:</strong> an ordinal consensus metric separates
              polarized answers (1 and 7) from concentrated ones (4), which
              entropy cannot.
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-2.5 !text-[1.02rem]`}
            >
              <strong>Construct:</strong> convolving item distributions gives
              the exact distribution of the scale score, and a distributional
              ANOVA isolates main and interaction effects.
            </li>
          </ul>
        </Split>
      </Slide>

      {/* 4. Paper 1, the research question */}
      <Slide id="shopping-question" border>
        <Kicker>
          Shopping by Algorithm (<em>JAMS</em>, major revision)
        </Kicker>
        <Heading>
          Do pricing cues built for human bounded rationality{" "}
          <span className={KEY}>still</span> work when the buyer is an{" "}
          <span className={KEY}>AI agent</span>?
        </Heading>
        <Split plate={<CoffeeShelf />}>
          <ul className="flex flex-col gap-3">
            <li
              className={`${BODY} border-t border-[var(--ink)] pt-2.5 !text-[1.1rem]`}
            >
              <strong>Pricing cues:</strong> just-below pricing and promotional
              framing were engineered to exploit human bounded rationality.
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-2.5 !text-[1.1rem]`}
            >
              <strong>Prior work:</strong> LLMs behave both rationally and
              heuristically, and heuristic-like behavior is treated as a static
              defect learned in training.
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-2.5 !text-[1.1rem]`}
            >
              <strong>Our proposal:</strong> heuristic-like choice depends on
              the information the AI agent holds when it chooses, shaped by
              retailers (the cost of retrieving product attributes) and by
              consumers (the goal prompt).
            </li>
          </ul>
        </Split>
      </Slide>

      {/* 4. Paper 1, the method */}
      <Slide id="tool-lab" border>
        <Kicker>
          Shopping by Algorithm (<em>JAMS</em>, major revision)
        </Kicker>
        <Heading>
          <span className={KEY}>Tool-Lab</span>: information-board process
          tracing for AI shopping agents
        </Heading>
        <Split plate={<ToolLabBoard />}>
          <p className={BODY}>
            Product attributes are placed behind costly tool calls (
            <Code>inspect_cell</Code>) until the agent calls{" "}
            <Code>submit_choice</Code>.
          </p>
          <p className={BODY}>
            2 (Acquisition cost: $0 vs. $10) × 2 (Goal prompt: specific vs.
            vague), across 8 LLMs
          </p>
        </Split>
      </Slide>

      {/* 5. Paper 1, the result */}
      <Slide id="pricing" border>
        <Kicker>
          Shopping by Algorithm (<em>JAMS</em>, major revision)
        </Kicker>
        <Heading>
          Under acquisition costs and a vague goal prompt, AI agents{" "}
          <span className={KEY}>fall for</span> just-below pricing and
          promotional framing
        </Heading>
        <Split plate={<ToolLabBars />}>
          <p className={BODY}>
            <strong>For firms:</strong> price cues are still effective for AI as
            shoppers.
          </p>
          <p className={BODY}>
            <strong>For consumers:</strong> a specific goal prompt preserves
            diagnostic acquisition and choice optimality.
          </p>
          <p className={BODY}>
            <strong>For retailer:</strong> the information architecture of
            online marketplaces should be designed in a way that reduces
            friction in information acquisition.
          </p>
        </Split>
      </Slide>

      {/* Paper 2, research question and problem setup */}
      <Slide id="sponsorship-question" border>
        <Kicker>
          Whom Do AI Agents Serve? (<em>JBR</em>, in preparation)
        </Kicker>
        <Heading>
          Does the <span className={KEY}>delegating principal</span> change how
          AI agents evaluate sponsored listings?
        </Heading>
        <Split plate={<SponsorDesign />}>
          <ul className="flex flex-col gap-3">
            <li
              className={`${BODY} border-t border-[var(--ink)] pt-2.5 !text-[1.1rem]`}
            >
              <strong>Persuasion knowledge:</strong> consumers recognize a
              sponsored tag as paid placement, become skeptical of the
              listing&apos;s value, and penalize it.
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-2.5 !text-[1.1rem]`}
            >
              <strong>Context-dependent role adoption:</strong> conditioning an
              LLM on a principal shifts its perspective toward that party&apos;s
              interest in training corpora (a warning for the traveler vs.
              retail media revenue for the platform).
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-2.5 !text-[1.1rem]`}
            >
              <strong>Hypotheses:</strong> platform delegation weakens
              pre-choice skepticism toward sponsored listings and attenuates the
              sponsorship penalty.
            </li>
          </ul>
        </Split>
      </Slide>

      {/* Paper 2, experimental design, measures, and conceptual model */}
      <Slide id="sponsorship-method" border>
        <Kicker>
          Whom Do AI Agents Serve? (<em>JBR</em>, in preparation)
        </Kicker>
        <Heading>
          Manipulating sponsorship and the delegating principal with{" "}
          <span className={KEY}>no instruction</span> to favor advertisers
        </Heading>
        <Split plate={<MediationPlate results={false} />}>
          <p className={BODY}>
            2 (Sponsorship: organic vs. sponsored) × 2 (Principal: consumer vs.
            platform delegation)
          </p>
          <ul className="flex flex-col gap-3">
            <li
              className={`${BODY} border-t border-[var(--ink)] pt-2.5 !text-[1.05rem]`}
            >
              <strong>Target choice:</strong> binary choice between the target
              listing and an objectively matched organic competitor.
            </li>
            <li
              className={`${BODY} border-t border-[var(--rule-2)] pt-2.5 !text-[1.05rem]`}
            >
              <strong>Pre-choice skepticism:</strong> a judge model (Kev 9B)
              scores each pre-choice reasoning trace on one item: &ldquo;The
              sponsorship status of the target made the agent skeptical of its
              true value to the traveler.&rdquo; (ICC(2,1) = .959 against human
              ratings)
            </li>
          </ul>
        </Split>
      </Slide>

      {/* Paper 2, results */}
      <Slide id="sponsorship" border>
        <Kicker>
          Whom Do AI Agents Serve? (<em>JBR</em>, in preparation)
        </Kicker>
        <Heading>
          Platform delegation <span className={KEY}>attenuates</span> the
          sponsorship penalty
        </Heading>
        <Split plate={<SponsorBars />}>
          <p className={BODY}>Principal × Sponsorship: β = 3.99, p &lt; .001</p>

          <p className={BODY}>
            <strong>Beneficiary mitigation:</strong> adding &ldquo;Act in the
            traveler&apos;s best interest&rdquo; to the platform prompt restores
            the sponsorship penalty to 48.2 pp (3.2% sponsored target choice).
          </p>
        </Split>
      </Slide>

      {/* Paper 2, principal-invariance context distillation (preliminary) */}
      <Slide id="sponsorship-fix" border>
        <Kicker>Principal-invariance context distillation (preliminary)</Kicker>
        <Heading>
          Context distillation <span className={KEY}>removes</span> the
          Principal × Sponsorship interaction on held-out stimuli
        </Heading>
        <Split plate={<DebiasBars />}>
          <p className={BODY}>
            <strong>Study 2 (6 non-generative decision models):</strong> the
            Principal × Sponsorship interaction replicates in a single forward
            pass across 360 Latin-square hotel stimuli.
          </p>
          <p className={BODY}>
            Kev 9B, distilled on retail categories only. Tested on the 360 Study
            2 hotel stimuli
          </p>
          <p className={BODY}>
            The sponsorship penalty under consumer delegation is preserved.
          </p>
        </Split>
      </Slide>

      {/* Paper 3, research question and method */}
      <Slide id="rank-method" border>
        <Kicker>
          Does Rank Still Matter? (<em>Marketing Letters</em>, under review)
        </Kicker>
        <Heading>
          When shopping is delegated to AI agents, does the{" "}
          <span className={KEY}>ranking advantage</span> documented for humans
          persist?
        </Heading>
        <div className="grid w-full gap-8 md:grid-cols-3">
          {[
            {
              t: "Simulated hotel search",
              d: (
                <>
                  A results page of 100 hotel listings in randomized order,
                  comparable to human field data (Ursu 2018)
                </>
              ),
            },
            {
              t: "Tool calls",
              d: (
                <>
                  <Code>inspect</Code> (analogous to a click) and{" "}
                  <Code>submit_choice</Code> (booking)
                </>
              ),
            },
            {
              t: "7,000 sessions",
              d: (
                <>
                  5 LLMs × 2 to 4 levels of reasoning effort. 500 Monte Carlo
                  sessions per cell
                </>
              ),
            },
          ].map((c, i) => (
            <Ruled key={c.t} tone={i === 0 ? "signal" : undefined}>
              <p className="type-h2 !text-[1.5rem]">
                <strong className="font-semibold">{c.t}:</strong>
              </p>
              <p className={`${BODY} mt-2`}>{c.d}</p>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* Paper 3, results */}
      <Slide id="rank" border>
        <Kicker>
          Does Rank Still Matter? (<em>Marketing Letters</em>, under review)
        </Kicker>
        <Heading>
          Unlike humans, AI agents show a{" "}
          <span className={KEY}>lost-in-the-middle</span> effect
        </Heading>
        <Split plate={<PositionCurvePlate />}>
          <ul className="flex flex-col gap-4">
            <li className={`${BODY} border-t border-[var(--ink)] pt-3`}>
              Middle listings have the lowest probability of inspection
            </li>
            <li className={`${BODY} border-t border-[var(--rule-2)] pt-3`}>
              At the choice stage, higher reasoning effort reduces the middle
              penalty for every LLM that exhibits it
            </li>
            <li className={`${BODY} border-t-2 border-[var(--signal)] pt-3`}>
              <strong>For platforms and consumers:</strong> position-neutral
              choice costs less with a less capable LLM at high reasoning effort
              (Flash Lite, $0.011 per session, 4% of the cost of Pro).
            </li>
          </ul>
        </Split>
      </Slide>

      {/* Paper 4, positioning */}
      <Slide id="silicon-sampling-method" border>
        <Kicker>
          Can Decision Models Sample Human Behavior? (<em>Marketing Science</em>
          , in preparation)
        </Kicker>
        <Heading>
          Can decision models approximate empirical human{" "}
          <span className={KEY}>response distributions</span> across demographic
          subpopulations?
        </Heading>
        <div className="grid w-full gap-8 md:grid-cols-3">
          {[
            {
              t: "Silicon sampling",
              d: "Simulating survey responses with LLMs relies on generative text sampling, resulting in mode collapse and distorted population variance",
            },
            {
              t: "Decision models",
              d: "Single-pass architectures that map a context state and typed questions directly to a calibrated probability distribution over answer options",
            },
            {
              t: "Fine-tuning on human respondents",
              d: "Kev decision models trained to minimize KL divergence on ISSP 2015 to 2024 (14,356 respondents, 16 demographic attributes)",
            },
          ].map((c, i) => (
            <Ruled key={c.t} tone={i === 2 ? "signal" : undefined}>
              <p className="type-h2 !text-[1.5rem]">
                <strong className="font-semibold">{c.t}:</strong>
              </p>
              <p className={`${BODY} mt-2`}>{c.d}</p>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* Paper 4, results on unseen data */}
      <Slide id="silicon-sampling" border>
        <Kicker>
          Can Decision Models Sample Human Behavior? (<em>Marketing Science</em>
          , in preparation)
        </Kicker>
        <Heading>
          Fine-tuned decision models approximate human subpopulation response
          distributions on <span className={KEY}>unseen data</span>
        </Heading>
        <div className="grid w-full gap-10 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <p className={BODY}>
              <strong>Political party, unseen SubPOP questions:</strong> Kev
              0.8B fine-tuned (KL = 0.33) outperforms off-the-shelf Kev 0.8B (KL
              = 0.54) and Kev 4B (KL = 0.52)
            </p>
            <PartyPlate />
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <p className={BODY}>
              <strong>
                Nutrition label RCT (Grummon et al. 2025), unseen domain:
              </strong>{" "}
              fine-tuning lowers KL at every model size, including for persona
              attributes absent from training
            </p>
            <NutritionPlate />
          </div>
        </div>
      </Slide>

      {/* 9. Future research */}
      <Slide id="future" border>
        <Kicker>Future research</Kicker>
        <Heading>
          Human and AI consumers on the{" "}
          <span className={KEY}>same storefronts</span>
        </Heading>
        <div className="grid w-full gap-8 md:grid-cols-3">
          {[
            {
              t: "Human vs. Surrogate Consumers",
              d: "Parallel human Mouselab and LLM Tool-Lab experiments (Consumer Behaviour Laboratory, Marketing Analytics Centre)",
            },
            {
              t: "Distributional Decision Models",
              d: "Fine-tuning decision models to replicate consumer survey distributions and treatment effects (Advanced Computing Laboratory)",
            },
            {
              t: "Algorithmic Audits",
              d: "Process-level audits of principal-agent conflicts and disclosure remedies in retail media",
            },
          ].map((c, i) => (
            <Ruled key={c.t} tone={i === 0 ? "signal" : undefined}>
              <p className="type-h2 !text-[1.5rem]">
                <strong className="font-semibold">{c.t}:</strong>
              </p>
              <p className={`${BODY} mt-2`}>{c.d}</p>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* 10. Teaching: courses taught and evaluations */}
      <Slide id="teaching-evaluations" border>
        <Kicker>Teaching, 2025 to 2026</Kicker>
        <Heading>
          Courses taught and <span className={KEY}>student evaluations</span>
        </Heading>
        <div className="w-full">
          <table className="w-full table-fixed border-collapse text-left text-[0.95rem] leading-snug text-[var(--ink-2)] md:text-[1.08rem]">
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[44%]" />
              <col className="w-[14%]" />
              <col className="w-[10%]" />
              <col className="w-[8%]" />
              <col className="w-[6%]" />
            </colgroup>
            <thead>
              <tr className="border-y-2 border-[var(--ink)] text-[var(--ink)]">
                <th className="py-2.5 pr-4 font-semibold">Institution</th>
                <th className="py-2.5 pr-4 font-semibold">Courses</th>
                <th className="py-2.5 pr-4 font-semibold">Period</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Units</th>
                <th className="py-2.5 pr-4 text-right font-semibold">
                  Responses
                </th>
                <th className="py-2.5 text-right font-semibold">Mean</th>
              </tr>
            </thead>
            <tbody className="border-b-2 border-[var(--ink)]">
              {[
                {
                  institution: "Johns Hopkins University",
                  courses: (
                    <>
                      <a
                        className={LINK}
                        href="https://online.lifelonglearning.jhu.edu/jhu-certificate-program-applied-generative-ai"
                      >
                        Certificate Program in Applied Generative AI
                      </a>
                      ,{" "}
                      <a
                        className={LINK}
                        href="https://online.lifelonglearning.jhu.edu/jhu-certificate-program-agentic-ai"
                      >
                        Certificate Program in Agentic AI
                      </a>
                    </>
                  ),
                  period: "Jan 2025 to Sep 2026",
                  units: "194 sessions",
                  responses: "2,970",
                  mean: "4.76",
                },
                {
                  institution: "UT Austin",
                  courses: (
                    <>
                      <a
                        className={LINK}
                        href="https://onlineexeced.mccombs.utexas.edu/ai-agents-for-business-applications-online-course"
                      >
                        Post Graduate Program in AI Agents for Business
                        Applications
                      </a>
                      ,{" "}
                      <a
                        className={LINK}
                        href="https://onlineexeced.mccombs.utexas.edu/post-graduate-program-in-ai-agents-and-generative-ai-for-business-applications"
                      >
                        Post Graduate Program in AI Agents and Generative AI for
                        Business Applications
                      </a>
                    </>
                  ),
                  period: "Feb 2026 to Aug 2026",
                  units: "15 sessions",
                  responses: "318",
                  mean: "4.60",
                },
                {
                  institution: "Microsoft",
                  courses: (
                    <>
                      <a
                        className={LINK}
                        href="https://www.mygreatlearning.com/gen-ai-microsoft-azure-open-ai-online"
                      >
                        Generative AI for Business with Microsoft Azure OpenAI
                      </a>
                      , Microsoft AI Professional Program (AI to OpenAI)
                    </>
                  ),
                  period: "Jan 2025 to Sep 2025",
                  units: "48 sessions",
                  responses: "546",
                  mean: "4.80",
                },
                {
                  institution: "Great Learning",
                  courses: (
                    <>
                      Data Science on Cloud, Advanced Python, Generative AI and
                      NLP, Generative AI on AWS,{" "}
                      <a
                        className={LINK}
                        href="https://www.mygreatlearning.com/generative-ai-for-practitioners-online"
                      >
                        Generative AI for Practitioners
                      </a>
                      ,{" "}
                      <a
                        className={LINK}
                        href="https://www.mygreatlearning.com/ai-native-professional"
                      >
                        AI-Native Professional: Workflows &amp; Agents for
                        Productivity
                      </a>
                    </>
                  ),
                  period: "Jan 2025 to Sep 2026",
                  units: "101 sessions",
                  responses: "895",
                  mean: "4.84",
                },
                {
                  institution: "University Canada West",
                  courses: (
                    <>
                      Cloud Computing Technologies (BUSI 653),{" "}
                      <a
                        className={LINK}
                        href="/courses/digital-transformation"
                      >
                        Digital Transformation
                      </a>{" "}
                      (CMPT 641),{" "}
                      <a className={LINK} href="/courses/ai-in-business">
                        Application of AI in Business
                      </a>{" "}
                      (BUSI 654)
                    </>
                  ),
                  period: "Jan 2025 to Mar 2026",
                  units: "9 MBA sections",
                  responses: "n/a",
                  mean: "4.16",
                },
              ].map((row) => (
                <tr
                  key={row.institution}
                  className="border-b border-[var(--rule)] align-baseline last:border-b-0"
                >
                  <td className="py-3.5 pr-4 font-semibold text-[var(--ink)]">
                    {row.institution}
                  </td>
                  <td className="py-3.5 pr-4">{row.courses}</td>
                  <td className="py-3.5 pr-4">{row.period}</td>
                  <td className="py-3.5 pr-4 text-right tabular-nums">
                    {row.units}
                  </td>
                  <td className="py-3.5 pr-4 text-right tabular-nums">
                    {row.responses}
                  </td>
                  <td className="py-3.5 text-right font-semibold tabular-nums text-[var(--ink)]">
                    {row.mean}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`${CITE} mt-4`}>
          <em>Note.</em> Ratings are on a 5-point scale (unweighted mean across
          units). Across 4,729 responses in executive programs, 80.5% were 5
          stars and 15.4% were 4 stars. For University Canada West, values are
          the mean score across all 16 evaluation questions (83.1% overall
          across 9 MBA sections) normalized to a 5-point scale.
        </p>
      </Slide>

      {/* 11. Teaching: interactive course sites */}
      <Slide id="teaching" border>
        <Kicker>Teaching</Kicker>
        <Heading>
          Open-access course repositories for{" "}
          <span className={KEY}>experiential learning</span>
        </Heading>
        <ul className="grid w-full max-w-[64rem] gap-x-10 md:grid-cols-2">
          {[
            ["Applications of AI in Business", "/courses/ai-in-business"],
            [
              "Responsible AI & Algorithmic Governance",
              "/courses/responsible-ai-governance",
            ],
            [
              "Marketing Research and Analytics",
              "/courses/marketing-research-analytics",
            ],
            ["Digital Transformation", "/courses/digital-transformation"],
            ["Consumer Behaviour", "/courses/consumer-behavior"],
            ["Introduction to Marketing", "/courses/intro-marketing"],
            [
              "Digital Marketing and E-commerce",
              "/courses/digital-marketing-ecommerce",
            ],
          ].map(([name, href]) => (
            <li key={name} className="border-b border-[var(--rule)] py-4">
              <a className={`type-h2 !text-[1.35rem] ${LINK}`} href={href}>
                {name}
              </a>
            </li>
          ))}
        </ul>
        <p className={`${CITE} mt-6`}>
          Interactive course sites at{" "}
          <a className={LINK} href="/courses">
            davoodwadi.com/courses
          </a>
        </p>
      </Slide>

      {/* 11. Thank you */}
      <Slide id="thanks" border>
        <div className="grid w-full items-end gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <h2 className="type-display !text-[clamp(3.6rem,8vw,7.2rem)] !leading-[0.95]">
            Thank you.
          </h2>
          <div className="min-w-0">
            <div className="border-t-2 border-[var(--ink)] pt-5">
              <p className="text-[1.25rem] text-[var(--ink-2)]">
                <strong className="font-semibold text-[var(--ink)]">
                  Davood Wadi
                </strong>
              </p>
              <dl className="mt-5">
                {[
                  ["Email", "davood.wadi@hec.ca", "mailto:davood.wadi@hec.ca"],
                  ["Website", "davoodwadi.com", "https://davoodwadi.com"],
                  ["Courses", "davoodwadi.com/courses", "/courses"],
                ].map(([k, v, href]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-x-6 border-b border-[var(--rule)] py-3"
                  >
                    <dt className="text-[1rem] text-[var(--ink-3)]">{k}:</dt>
                    <dd className="min-w-0 truncate">
                      <a
                        className={`text-[clamp(1.15rem,1.6vw,1.45rem)] text-[var(--ink)] ${LINK}`}
                        style={{ fontFamily: "var(--font-heading)" }}
                        href={href}
                      >
                        {v}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Slide>

      {/* 12. Backup */}
      {/* <Slide id="backup" border>
        <Kicker>Backup</Kicker>
        <Heading>Detailed results</Heading>
        <p className={`${BODY} max-w-[60rem]`}>
          Links to each slide of /talks/guelph:{" "}
          {[
            ["Tool-Lab study", "study-1"],
            ["sponsorship study", "study-2"],
            ["search-rank study", "study-3"],
            ["methods", "methodology"],
            ["decision models", "study-4"],
            ["future research", "future"],
            ["teaching", "teaching"],
          ].map(([name, id], i, all) => (
            <React.Fragment key={id}>
              <a className={LINK} href={`${FULL}#${id}`}>
                {name}
              </a>
              {i < all.length - 1 ? ", " : "."}
            </React.Fragment>
          ))}
        </p>
      </Slide> */}
    </Deck>
  );
}
