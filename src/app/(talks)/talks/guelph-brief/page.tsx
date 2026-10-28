import React from "react";
import type { Metadata } from "next";
import { Slide } from "@/components/slide-components/SlideComponents";
import { Ruled } from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";
import DeckKeys, { type DeckSection } from "../guelph/_components/DeckKeys";
import {
  LikertPlate,
  PartyPlate,
  PositionCurvePlate,
  SponsorDesign,
  ToolLabBoard,
  TriadPlate,
} from "../guelph/_components/Plates";
import { DebiasBars, SponsorBars, ToolLabBars } from "./_components/Bars";
import { NutritionPlate } from "./_components/NutritionPlate";

// The brief deck: every word comes verbatim from slides.md. The detailed
// slides live at /talks/guelph and serve as backup for questions.

export const metadata: Metadata = {
  title: "Decision-Making in AI-Mediated Marketplaces (Brief) | Davood Wadi",
  description:
    "Interview presentation, brief version, Department of Marketing and Consumer Studies, University of Guelph.",
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
  { label: "Where I come from", ids: ["foundation"] },
  { label: "Why AI agents", ids: ["shift"] },
  { label: "Paper 1: Shopping by Algorithm", ids: ["tool-lab", "pricing"] },
  {
    label: "Paper 2: Whom Do AI Agents Serve?",
    ids: ["sponsorship-method", "sponsorship", "sponsorship-fix"],
  },
  { label: "Paper 3: Does Rank Still Matter?", ids: ["rank-method", "rank"] },
  { label: "Methods", ids: ["methods"] },
  {
    label: "Paper 4: Can Decision Models Sample Human Behavior?",
    ids: ["silicon-sampling-method", "silicon-sampling"],
  },
  { label: "Future research", ids: ["future"] },
  { label: "Teaching", ids: ["teaching"] },
  { label: "Thank you", ids: ["thanks"] },
  { label: "Backup", ids: ["backup"] },
];

/** Numbers each slide's folio, as the full deck does. */
function Deck({ children }: { children: React.ReactNode }) {
  const slides = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<React.ComponentProps<typeof Slide>>[];
  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink-2)]">
      <DeckKeys sections={SECTIONS} />
      {slides.map((s, i) =>
        React.cloneElement(s, { __index: i + 1, __total: slides.length }),
      )}
    </div>
  );
}

/** The small line above a heading, in the serif. */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-[1.1rem] italic text-[var(--ink-3)]"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </p>
  );
}

/** The slide's claim, set large in the serif over a hairline. */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 w-full">
      <h2 className="type-h1 max-w-[30ch] !text-[clamp(2.1rem,3.6vw,3.1rem)] !leading-[1.1]">
        {children}
      </h2>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** A figure set in the serif inside a sentence. */
function Fig({ children }: { children: React.ReactNode }) {
  return (
    <strong
      className="!font-medium !text-[var(--ink)] text-[1.6em] leading-none"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </strong>
  );
}

/** A tool name from the code, set as a quiet chip. */
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-[var(--paper-3)] px-1.5 py-0.5 text-[0.85em] text-[var(--ink)]">
      {children}
    </code>
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
      <Slide id="title">
        <div className="w-full">
          <Kicker>
            Candidate for Assistant Professor in AI and Business, Lang School
          </Kicker>
          <h1 className="type-display max-w-[20ch] !text-[clamp(2.8rem,5.4vw,4.8rem)]">
            Decision-Making in Digital and{" "}
            <span className={KEY}>AI-Mediated</span> Marketplaces
          </h1>
          <p
            className="mt-6 max-w-[50ch] text-[clamp(1.25rem,2vw,1.7rem)] italic leading-snug text-[var(--ink-2)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            From human e-commerce behavior to large language models as surrogate
            consumers
          </p>
          <div className="mt-12 grid max-w-[64rem] gap-6 border-t border-[var(--ink)] pt-5 md:grid-cols-2">
            <p className="text-[1.15rem] text-[var(--ink-2)]">
              <strong className="font-semibold text-[var(--ink)]">
                Davood Wadi, PhD
              </strong>{" "}
              (Marketing, AI specialization, HEC Montréal)
            </p>
            <ul className="space-y-1 text-[1rem] text-[var(--ink-3)]">
              <li>
                Researcher, McGill Centre for the Convergence of Health and
                Economics
              </li>
              <li>AI Research Scientist, General Motors R&amp;D</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 2. Where I come from */}
      <Slide id="foundation" border>
        <Kicker>Where I come from</Kicker>
        <Heading>
          Prosocial behavior and financial incentives in digital markets
        </Heading>
        <div className="grid w-full max-w-[72rem] gap-10 md:grid-cols-2">
          {[
            {
              finding: (
                <>
                  Asking for reviews &ldquo;to help the company&rdquo; backfires
                  when paired with payment. &ldquo;to help other
                  customers&rdquo; does not.
                </>
              ),
              title:
                "The interplay of altruism and financial incentives: Maximizing online reviews through effective messaging",
              venue: "Journal of Electronic Commerce Research, 2026",
            },
            {
              finding: (
                <>
                  Performance-contingent incentives motivate first-time (vs.
                  experienced) reviewers more strongly to write a review and to
                  put more effort.
                </>
              ),
              title:
                "Be careful what you pay for: The effect of performance-contingent incentives on online product reviews",
              venue: "Journal of Research in Interactive Marketing, 2026",
            },
          ].map((p) => (
            <Ruled key={p.venue}>
              <p className="type-quote !text-[clamp(1.25rem,1.9vw,1.6rem)]">
                {p.finding}
              </p>
              <p className="mt-6 text-[1.05rem] font-semibold leading-snug text-[var(--ink)]">
                {p.title}
              </p>
              <p className={`${CITE} mt-1`}>
                <em>{p.venue}</em>
              </p>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* 3. Why AI agents: the shift and the pipeline */}
      <Slide id="shift" border>
        <Kicker>Why AI agents</Kicker>
        <Heading>
          Storefronts were built for humans.{" "}
          <span className={KEY}>AI agents now act as surrogate consumers.</span>
        </Heading>
        <Split plate={<TriadPlate />}>
          <ul className="flex flex-col gap-4">
            <li className={`${BODY} border-t border-[var(--ink)] pt-3`}>
              <Fig>38%</Fig> of U.S. consumers have shopped with generative AI
            </li>
            <li className={`${BODY} border-t border-[var(--rule-2)] pt-3`}>
              AI referral traffic to retailers grew <Fig>10x</Fig> in one year
              (Pandya 2025)
            </li>
          </ul>
        </Split>
        <div className="mt-8 grid w-full grid-cols-2 gap-x-8 gap-y-4 border-t-2 border-[var(--ink)] pt-4 lg:grid-cols-4">
          {[
            [
              "Bounded Rationality & Search",
              <>
                <em>JAMS</em>, major revision
              </>,
            ],
            [
              "Principal-Agent Conflicts",
              <>
                <em>JBR</em>, in preparation
              </>,
            ],
            [
              "Position Bias & Consideration",
              <>
                <em>Marketing Letters</em>, under review
              </>,
            ],
            [
              "Methods & Distributional Models",
              <>
                <em>EMNLP</em> 2025, <em>ACL</em>, <em>Marketing Science</em>
              </>,
            ],
          ].map(([t, v], i) => (
            <div key={i}>
              <p className="type-h2 !text-[1.3rem]">
                <span className="mr-2 text-[var(--ink-3)]">{i + 1}</span>
                {t}
              </p>
              <p className={`${CITE} mt-1`}>{v}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 4. Paper 1, the method */}
      <Slide id="tool-lab" border>
        <Kicker>
          Paper 1: <em>Shopping by Algorithm</em> (<em>JAMS</em>, major
          revision)
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
          <ul className="flex flex-col gap-3">
            <li className={`${BODY} border-t border-[var(--rule-2)] pt-3`}>
              <strong>Coffee A:</strong> $4.99 for 10 oz (just-below price)
            </li>
            <li className={`${BODY} border-t-2 border-[var(--signal)] pt-3`}>
              <strong>Coffee B:</strong> $5.00 for 11 oz{" "}
              <span className={KEY}>(normatively optimal choice)</span>
            </li>
          </ul>
        </Split>
      </Slide>

      {/* 5. Paper 1, the result */}
      <Slide id="pricing" border>
        <Kicker>
          Paper 1: <em>Shopping by Algorithm</em> (<em>JAMS</em>, major
          revision)
        </Kicker>
        <Heading>
          Under acquisition costs and a vague goal prompt, AI agents{" "}
          <span className={KEY}>
            fall for just-below pricing and promotional framing
          </span>
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
        </Split>
      </Slide>

      {/* Paper 2, research question and method */}
      <Slide id="sponsorship-method" border>
        <Kicker>
          Paper 2: <em>Whom Do AI Agents Serve?</em> (<em>JBR</em>, in
          preparation)
        </Kicker>
        <Heading>
          Does the <span className={KEY}>delegating principal</span> change how
          an AI agent evaluates sponsored listings?
        </Heading>
        <Split plate={<SponsorDesign />}>
          <p className={BODY}>
            2 (Sponsorship: organic vs. sponsored) × 2 (Principal: consumer vs.
            platform delegation)
          </p>
          <p className={BODY}>
            <strong>DV:</strong> target choice. <strong>Mediator:</strong>{" "}
            pre-choice skepticism (Kev 9B judge, ICC(2,1) = .959)
          </p>
        </Split>
      </Slide>

      {/* Paper 2, results */}
      <Slide id="sponsorship" border>
        <Kicker>
          Paper 2: <em>Whom Do AI Agents Serve?</em> (<em>JBR</em>, in
          preparation)
        </Kicker>
        <Heading>
          Platform delegation{" "}
          <span className={KEY}>attenuates the sponsorship penalty</span>
        </Heading>
        <Split plate={<SponsorBars />}>
          <p className={BODY}>
            Principal × Sponsorship: <em>β</em> = 3.99, <em>p</em> &lt; .001
          </p>
          <p className={BODY}>
            Index of moderated mediation via pre-choice skepticism = 2.27, 95%
            CI [1.92, 3.14]
          </p>
          <p className={BODY}>
            Replicates across 5 additional LLMs and 6 decision models
          </p>
        </Split>
      </Slide>

      {/* Paper 2, principal-invariance context distillation (preliminary) */}
      <Slide id="sponsorship-fix" border>
        <Kicker>
          Paper 2: Principal-invariance context distillation (preliminary)
        </Kicker>
        <Heading>
          Context distillation{" "}
          <span className={KEY}>
            removes the Principal × Sponsorship interaction
          </span>{" "}
          on held-out stimuli
        </Heading>
        <Split plate={<DebiasBars />}>
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
          Paper 3: <em>Does Rank Still Matter?</em> (<em>Marketing Letters</em>,
          under review)
        </Kicker>
        <Heading>
          When shopping is delegated to AI agents, does the{" "}
          <span className={KEY}>ranking advantage documented for humans</span>{" "}
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
              <p className="type-h2 !text-[1.5rem]">{c.t}</p>
              <p className={`${BODY} mt-2`}>{c.d}</p>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* Paper 3, results */}
      <Slide id="rank" border>
        <Kicker>
          Paper 3: <em>Does Rank Still Matter?</em> (<em>Marketing Letters</em>,
          under review)
        </Kicker>
        <Heading>
          Unlike humans, AI agents show a{" "}
          <span className={KEY}>lost-in-the-middle effect</span>
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

      {/* 7. Methods */}
      <Slide id="methods" border>
        <Kicker>Methods</Kicker>
        <Heading>
          A single LLM response is{" "}
          <span className={KEY}>one draw from a probability distribution</span>
        </Heading>
        <Split plate={<LikertPlate />}>
          <ul className="flex flex-col gap-4">
            <li className={`${BODY} border-t border-[var(--ink)] pt-3`}>
              Monte-Carlo behavioral evaluation of LLMs (
              <em>Findings of EMNLP</em> 2025)
            </li>
            <li className={`${BODY} border-t border-[var(--rule-2)] pt-3`}>
              Exact token-level Likert distributions (<em>ACL</em> 2027
              submission)
            </li>
          </ul>
        </Split>
      </Slide>

      {/* Paper 4, positioning */}
      <Slide id="silicon-sampling-method" border>
        <Kicker>
          Paper 4: <em>Can Decision Models Sample Human Behavior?</em> (
          <em>Marketing Science</em>, in preparation)
        </Kicker>
        <Heading>
          Can decision models approximate{" "}
          <span className={KEY}>empirical human response distributions</span>{" "}
          across demographic subpopulations?
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
              <p className="type-h2 !text-[1.5rem]">{c.t}</p>
              <p className={`${BODY} mt-2`}>{c.d}</p>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* Paper 4, results on unseen data */}
      <Slide id="silicon-sampling" border>
        <Kicker>
          Paper 4: <em>Can Decision Models Sample Human Behavior?</em> (
          <em>Marketing Science</em>, in preparation)
        </Kicker>
        <Heading>
          Fine-tuned decision models approximate human subpopulation response
          distributions <span className={KEY}>on unseen data</span>
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
          <span className={KEY}>Human and AI consumers</span> on the same
          storefronts
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
              <p className="type-h2 !text-[1.5rem]">{c.t}</p>
              <p className={`${BODY} mt-2`}>{c.d}</p>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* 10. Teaching */}
      <Slide id="teaching" border>
        <Kicker>Teaching</Kicker>
        <Heading>
          Students learn AI by{" "}
          <span className={KEY}>testing models and data in class</span>
        </Heading>
        <ul className="grid w-full max-w-[64rem] gap-x-10 md:grid-cols-2">
          {[
            ["AI Applications in Business", "/courses/ai-in-business"],
            [
              "Responsible AI & Algorithmic Governance",
              "/courses/responsible-ai-governance",
            ],
            [
              "Marketing Research & Analytics",
              "/courses/marketing-research-analytics",
            ],
            ["Digital Transformation", "/courses/digital-transformation"],
            ["Consumer Behaviour", "/courses/consumer-behavior"],
            ["Intro Marketing", "/courses/intro-marketing"],
            [
              "Digital Marketing & E-commerce",
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
            <strong className="font-medium">
              Thank you<span className={KEY}>.</span>
            </strong>
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
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-3)]">
                      {k}
                    </dt>
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
      <Slide id="backup" border>
        <Kicker>Backup</Kicker>
        <Heading>Detailed results</Heading>
        <ul className="grid w-full max-w-[64rem] gap-x-10 md:grid-cols-2">
          {[
            ["Tool-Lab study", "study-1"],
            ["Sponsorship study", "study-2"],
            ["Search-rank study", "study-3"],
            ["Methods", "methodology"],
            ["Decision models", "study-4"],
            ["Future research", "future"],
            ["Teaching", "teaching"],
          ].map(([name, id]) => (
            <li key={id} className="border-b border-[var(--rule)] py-3">
              <a className={`text-[1.15rem] ${LINK}`} href={`${FULL}#${id}`}>
                {name}
              </a>
            </li>
          ))}
        </ul>
      </Slide>
    </Deck>
  );
}
