import React from "react";
import type { Metadata } from "next";
import { Slide } from "@/components/slide-components/SlideComponents";
import { Ruled } from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";
import DeckKeys from "./_components/DeckKeys";
import {
  PartyPlate,
  PositionCurvePlate,
  LikertPlate,
  SponsorStudy,
  ToolLabStudy,
  TriadPlate,
} from "./_components/Plates";

// Every word on these slides comes verbatim from slides.md.

export const metadata: Metadata = {
  title: "When AI Agents Shop for Us | Davood Wadi",
  description:
    "Interview presentation, Department of Marketing and Consumer Studies, University of Guelph.",
  robots: { index: false, follow: false },
};

const KEY = "text-[var(--signal)]";
const LINK =
  "underline decoration-[var(--rule-2)] underline-offset-4 hover:text-[var(--signal)]";
const BODY =
  "text-[1.02rem] leading-relaxed text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)]";
const CITE = "text-[0.85rem] leading-relaxed text-[var(--ink-3)] tabular-nums";
const TH =
  "border-b border-[var(--ink)] pb-2 pr-5 text-left align-bottom text-[13px] font-semibold text-[var(--ink)]";
const TD =
  "border-b border-[var(--rule)] py-2.5 pr-5 align-top text-[15px] leading-snug tabular-nums";

/** Numbers each slide's folio, as the course decks do. */
function Deck({ children }: { children: React.ReactNode }) {
  const slides = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<React.ComponentProps<typeof Slide>>[];
  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink-2)]">
      <DeckKeys />
      {slides.map((s, i) =>
        React.cloneElement(s, { __index: i + 1, __total: slides.length }),
      )}
    </div>
  );
}

/** The small line above a heading, in the serif, sentence case as written. */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-[1.05rem] italic text-[var(--ink-3)]"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </p>
  );
}

/** The slide's claim, set large in the serif over a hairline. */
function Heading({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="mb-6 w-full">
      <h2
        className={`type-h1 !text-[clamp(1.8rem,3.1vw,2.6rem)] !leading-[1.12] ${wide ? "max-w-[44ch]" : "max-w-[34ch]"}`}
      >
        {children}
      </h2>
      <div className="mt-5 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** A figure set in the serif inside a sentence. */
function Fig({ children }: { children: React.ReactNode }) {
  return (
    <strong
      className="!font-medium !text-[var(--ink)] text-[1.55em] leading-none"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </strong>
  );
}

/** A tool name from the code, set as a quiet chip. */
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-[var(--paper-3)] px-1.5 py-0.5 text-[0.9em] text-[var(--ink)]">
      {children}
    </code>
  );
}

export default function Page() {
  return (
    <Deck>
      {/* 1. Title */}
      <Slide id="title">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="min-w-0">
            <Kicker>
              Candidate for Assistant Professor in AI and Business, Department of Marketing and Consumer Studies, Lang
              School
            </Kicker>
            <h1 className="type-display !text-[clamp(2.8rem,5.6vw,4.9rem)]">
              When <span className={KEY}>AI Agents</span> Shop for Us
            </h1>
            <p
              className="mt-6 max-w-[40ch] text-[clamp(1.2rem,1.8vw,1.5rem)] italic leading-snug text-[var(--ink-2)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Large language models and agentic AI as surrogate consumers
            </p>
            <div className="mt-10 max-w-[52ch] border-t border-[var(--ink)] pt-5">
              <p className="text-[1.1rem] text-[var(--ink-2)]">
                <strong className="font-semibold text-[var(--ink)]">Davood Wadi, PhD</strong> (Marketing &amp; AI, HEC
                Montréal)
              </p>
              <ul className="mt-2 space-y-1 text-[1rem] text-[var(--ink-3)]">
                <li>Researcher, McGill Centre for the Convergence of Health and Economics</li>
                <li>AI Research Scientist, General Motors R&amp;D</li>
              </ul>
            </div>
          </div>
          <TriadPlate />
        </div>
      </Slide>

      {/* 2. Research program */}
      <Slide id="program" border className="!py-8">
        <Kicker>Research Program</Kicker>
        <Heading>How do AI agents make purchasing decisions as surrogate consumers?</Heading>
        <ul className="grid w-full gap-6 md:grid-cols-4 md:gap-8">
          <li className="border-t border-[var(--ink)] pt-3 text-[1.02rem] leading-relaxed">
            <Fig>38%</Fig> of U.S. consumers have used generative AI for online shopping
          </li>
          <li className="border-t border-[var(--ink)] pt-3 text-[1.02rem] leading-relaxed">
            AI referral traffic to retail sites grew <Fig>10x</Fig> from mid-2024 to mid-2025
          </li>
          <li className="border-t border-[var(--rule-2)] pt-3 text-[1.02rem] leading-relaxed">
            Marketing theory assumes a human consumer processes price cues, search rankings, and sponsorship
            disclosures
          </li>
          <li className="border-t-2 border-[var(--signal)] pt-3 text-[1.02rem] leading-relaxed">
            Increasingly, an autonomous AI agent acts as a{" "}
            <strong className={`font-semibold ${KEY}`}>surrogate consumer</strong>
          </li>
        </ul>
        <div className="mt-9 w-full">
          <div className="grid grid-cols-[3rem_minmax(0,4fr)_minmax(0,6fr)_minmax(0,4fr)] gap-x-5 border-b border-[var(--ink)] pb-2 text-[13px] font-semibold text-[var(--ink)]">
            <span />
            <span>Research Stream</span>
            <span>Core Question</span>
            <span>Manuscript</span>
          </div>
          {[
            {
              stream: "Bounded Rationality & Search",
              q: "How do acquisition costs and prompt specificity affect susceptibility to pricing cues?",
              title: "Shopping by Algorithm",
              venue: "JAMS",
              status: "(Major Revision)",
            },
            {
              stream: "Principal-Agent Conflicts",
              q: "Does an AI agent's evaluation of sponsored listings depend on who deploys the AI agent?",
              title: "Whom Do AI Agents Serve?",
              venue: "JBR",
              status: "(In Preparation)",
            },
            {
              stream: "Position Bias & Consideration",
              q: "Does search rank affect choice when search is delegated to AI agents?",
              title: "Does Rank Still Matter?",
              venue: "Marketing Letters",
              status: "(Under Review)",
            },
          ].map((r, i) => (
            <div
              key={r.stream}
              className="grid grid-cols-[3rem_minmax(0,4fr)_minmax(0,6fr)_minmax(0,4fr)] items-baseline gap-x-5 border-b border-[var(--rule)] py-4"
            >
              <span
                aria-hidden
                className="text-[2rem] leading-none text-transparent [-webkit-text-stroke:1.2px_var(--ink-3)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {i + 1}
              </span>
              <span className="type-h2 !text-[1.3rem]">{r.stream}</span>
              <span className="text-[1rem] leading-relaxed">{r.q}</span>
              <span className="text-[1rem] leading-relaxed">
                <em>{r.title}</em>, <strong className="font-semibold text-[var(--ink)]">{r.venue}</strong> {r.status}
              </span>
            </div>
          ))}
        </div>
      </Slide>

      {/* 3. Paper 1 */}
      <Slide id="study-1" border className="!py-8">
        <Kicker>
          Paper 1: <em>Shopping by Algorithm</em> (<em>JAMS</em>, Major Revision)
        </Kicker>
        <Heading wide>
          Under acquisition costs and a vague goal prompt, LLMs truncate search and rely on pricing cues
        </Heading>
        <ToolLabStudy
          intro={
            <>
              <p className={BODY}>
                <strong>Tool-Lab</strong> adapts Mouselab information-board process tracing to multi-turn LLM
                interactions (<Code>inspect_cell</Code> vs. <Code>submit_choice</Code>)
              </p>
              <ul className="grid gap-5 sm:grid-cols-2">
                <li>
                  <Ruled weight="thin">
                    <p className={BODY}>
                      <strong>Coffee A:</strong> $4.99, 10 oz ($0.499/oz, just-below price cue)
                    </p>
                  </Ruled>
                </li>
                <li>
                  <Ruled tone="signal" weight="thin">
                    <p className={BODY}>
                      <strong>Coffee B:</strong> $5.00, 11 oz (
                      <strong className={`font-semibold ${KEY}`}>$0.455/oz, normatively optimal choice</strong>)
                    </p>
                  </Ruled>
                </li>
              </ul>
            </>
          }
        />
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <p className={`${BODY} !text-[0.97rem]`}>
              <strong>Study 2 (Promotional Discount Framing, $0 vs. $50 cost, 3 alternatives):</strong> Under a vague
              goal prompt and $50 cost, diagnostic acquisition drops from 9.00 to 4.82 (of 9) and choice optimality
              drops from 0.86 to 0.48 (vs. 0.88 under a specific goal prompt)
            </p>
          </Ruled>
          <Ruled weight="thin">
            <p className={`${BODY} !text-[0.97rem]`}>
              <strong>Multilevel Moderated Mediation:</strong> Acquisition cost × vague goal prompt reduces choice
              optimality via diagnostic acquisition truncation (Index = -0.451* in Study 1; -0.228* in Study 2)
            </p>
          </Ruled>
        </div>
        <p className={`${CITE} mt-3`}>
          Wadi &amp; Ma (2026), <em>N</em> = 33,704 trials across 8 commercial LLMs (Google, OpenAI, Anthropic)
        </p>
      </Slide>

      {/* 4. Paper 2 */}
      <Slide id="study-2" border className="!py-8">
        <Kicker>
          Paper 2: <em>Whom Do AI Agents Serve?</em> (<em>JBR</em>, In Preparation)
        </Kicker>
        <Heading wide>Platform delegation attenuates the sponsorship penalty by weakening pre-choice skepticism</Heading>
        <p className={`${BODY} mb-5`}>
          2 (Delegating Principal: <strong>Consumer</strong> vs. <strong>Platform</strong>) × 2 (Target Listing:{" "}
          <strong>Organic</strong> vs. <strong>Sponsored</strong>) choice design with no instruction to favor
          advertisers
        </p>
        <SponsorStudy />
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled tone="signal" weight="thin">
            <p className={`${BODY} !text-[0.95rem]`}>
              <strong>Moderated Mediation (PROCESS Model 8):</strong> Platform delegation reduces pre-choice
              skepticism toward sponsored listings (<em>M</em> = 4.80 vs. 6.19 on a 1–7 scale), attenuating the
              sponsorship penalty (interaction <em>b</em> = 3.99, <em>p</em> &lt; .001)
            </p>
          </Ruled>
          <Ruled weight="thin">
            <p className={`${BODY} !text-[0.95rem]`}>
              <strong>Study 2 (System-One Decision Models):</strong> Replicates on exact log-odds across{" "}
              <strong>6 non-generative decision models</strong> in a single forward pass (<em>N</em> = 8,640; 360
              position-balanced Latin-square stimuli)
            </p>
          </Ruled>
          <Ruled weight="thin">
            <p className={`${BODY} !text-[0.95rem]`}>
              <strong>Study 3 (Disclosure Decomposition):</strong> Attributing the placement to the platform (
              <em>&quot;by the platform&quot;</em>), rather than disclosure wording (<em>&quot;Sponsored&quot;</em> vs.{" "}
              <em>&quot;Promoted&quot;</em>), drives the divergence between principals
            </p>
          </Ruled>
        </div>
        <p className={`${CITE} mt-4`}>
          Wadi &amp; Ma (2026), replicated across Claude Sonnet 5, GPT 5.6 Terra, Gemini 3.1 Pro / Flash series, and 6
          System-One decision models
        </p>
      </Slide>

      {/* 5. Paper 3 */}
      <Slide id="study-3" border className="!py-8">
        <Kicker>
          Paper 3: <em>Does Rank Still Matter?</em> (<em>Marketing Letters</em>, Under Review)
        </Kicker>
        <Heading wide>AI agents search deeper than humans but exhibit a lost-in-the-middle position effect</Heading>
        <p className={`${BODY} mb-5 max-w-[110ch]`}>
          100-listing Expedia hotel results page in randomized order: <strong>7,000 main experiment sessions</strong> (5
          proprietary LLMs across 2 to 4 reasoning-effort levels) + <strong>2,000 open-weight LLM sessions</strong> +{" "}
          <strong>1,500 robustness sessions</strong> vs. <strong>166,036 human impressions</strong> (Ursu 2018)
        </p>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Behavioral Metric</th>
                <th className={TH}>Human Benchmark (Ursu 2018)</th>
                <th className={TH}>AI Shopping Agents (5 LLMs, Default Effort)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Conversion rate", "66.0%", <>100.0%</>],
                ["Outside option selected", "34.0%", <>0.0%</>],
                ["Inspections per session (Mean)", "1.12", <>1.63 to 5.83</>],
                ["Sessions with one inspection", "93.0%", <>0.2% to 37.4%</>],
                [
                  "Linear position penalty (per rank)",
                  "-0.0019",
                  <>
                    At most -0.0008 <span className="font-normal text-[var(--ink-2)]">(less than half of human slope)</span>
                  </>,
                ],
                [
                  "Shape of inspection curve",
                  "Monotonic decline",
                  <>
                    U-shaped middle penalty{" "}
                    <span className="font-normal text-[var(--ink-2)]">
                      (minimum at <strong className="font-semibold text-[var(--ink)]">ranks 62 to 81</strong>,
                      significant in 12 of 14 conditions)
                    </span>
                  </>,
                ],
              ].map(([m, h, a]) => (
                <tr key={m as string}>
                  <td className={`${TD} font-semibold text-[var(--ink)]`}>{m}</td>
                  <td className={`${TD} text-[var(--counter)]`}>{h}</td>
                  <td className={`${TD} font-semibold text-[var(--ink)]`}>{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
            <Ruled tone="signal" weight="thin">
              <p className={`${BODY} !text-[0.95rem]`}>
                <strong>Choice &amp; Reasoning Effort:</strong> Higher reasoning effort{" "}
                <span className={KEY}>reduces the quadratic middle penalty on choice</span> for every LLM that
                exhibits it (Flash Lite at high effort reaches position-neutral choice at $0.011/session, or{" "}
                <strong>4% of the cost</strong> of Pro at $0.28/session)
              </p>
            </Ruled>
          </div>
          <PositionCurvePlate />
        </div>
        <p className={`${CITE} mt-4`}>
          Wadi &amp; Ma (2026), <em>N</em> = 10,500 total agent sessions vs. <em>N</em> = 166,036 human sessions
        </p>
      </Slide>

      {/* 5b. Paper 4 */}
      <Slide id="study-4" border className="!py-8">
        <Kicker>
          Paper 4: <em>Can Decision Models Sample Human Behavior?</em> (<em>Marketing Science</em>, In Preparation)
        </Kicker>
        <Heading wide>
          Fine-tuning decision models on human respondent data aligns their predictions with human subpopulations
        </Heading>
        <p className={`${BODY} mb-4 max-w-[110ch]`}>
          Off-the-shelf LLMs and System-One decision models are trained for single-label accuracy, causing{" "}
          <strong>mode collapse</strong>, <strong>ordinal scale compression</strong>, and{" "}
          <strong>persona blindness</strong> in silicon sampling.
        </p>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled weight="thin">
              <h3 className="type-h2 !text-[1.05rem]">Dynamic Respondent-Level Training Pipeline (US ISSP 2015 to 2024):</h3>
              <ul className="mt-2 space-y-1.5">
                <li className={`${BODY} !text-[0.93rem]`}>
                  <em>14,356 respondents</em>, <em>767,484 responses</em>, <em>616 questions</em> across{" "}
                  <em>16 demographic attributes</em>
                </li>
                <li className={`${BODY} !text-[0.93rem]`}>
                  Dynamically samples multi-attribute persona (&quot;Female democrat&quot;) combinations on the fly and
                  fine-tunes pointer-head decision models (<Code>Kev 0.8B, 4B, 9B</Code>) via{" "}
                  <strong>soft cross-entropy</strong> (minimizing KL divergence{" "}
                  <span className="whitespace-nowrap">
                    <em>D</em>
                    <sub>KL</sub>(<em>P</em>
                    <sub>human</sub> ∥ <em>P</em>
                    <sub>model</sub>)
                  </span>
                  )
                </li>
              </ul>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <h3 className="type-h2 !text-[1.05rem]">
                Out-of-Distribution Evaluation (SubPOP / US General Social Survey, 2,926 subpopulation targets):
              </h3>
              <ul className="mt-2 space-y-1.5">
                <li className={`${BODY} !text-[0.93rem]`}>
                  Evaluated via <em>KL / JS divergence</em>,{" "}
                  <em>
                    ordinal 1-Wasserstein transport distance (<em>W</em>
                    <sub>1</sub>)
                  </em>
                  , <em>ordinal consensus (ΔCns)</em>, and <em>inter-group Wasserstein contrast gaps</em>
                </li>
                <li className={`${BODY} !text-[0.93rem]`}>
                  On unseen political party subpopulations (Democrat vs. Republican),{" "}
                  <span className={KEY}>
                    a fine-tuned <strong className="!text-[var(--signal)]">Kev 0.8B FT</strong> (KL = 0.3254)
                    outperforms
                  </span>{" "}
                  both untuned <strong>Kev 0.8B</strong> (KL = 0.5433) and 5x larger untuned <strong>Kev 4B</strong>{" "}
                  (KL = 0.5168)
                </li>
              </ul>
            </Ruled>
          </div>
          <PartyPlate />
        </div>
        <Ruled weight="thin" className="mt-4 w-full">
          <h3 className="type-h2 !text-[1.05rem]">
            Marketing Generalization (Grummon et al. 2025 Front-of-Package Nutrition RCT, <em>N</em> = 5,636 shoppers,
            114,899 responses):
          </h3>
          <ul className="mt-2 grid gap-x-10 gap-y-1.5 md:grid-cols-2">
            <li className={`${BODY} !text-[0.93rem]`}>
              <em>Unseen nutrition-specific human data</em> (6 labeling arms × 21 product-choice and Likert items; 5,060
              subpopulation targets): fine-tuning on general ISSP data lowers KL at every scale.
            </li>
            <li className={`${BODY} !text-[0.93rem]`}>
              <em>6 unseen persona attributes</em> absent from ISSP training (e.g., SNAP, Nutrition Facts usage, Online
              grocery share, Nutrition literacy)
            </li>
          </ul>
        </Ruled>
        <p className={`${CITE} mt-2`}>
          Wadi &amp; Ma (2026), 767,484 ISSP responses, 2,926 SubPOP GSS targets, and 5,060 Grummon (2025) nutrition RCT
          subpopulation targets
        </p>
      </Slide>

      {/* 6. Methods */}
      <Slide id="methods" border className="!py-8">
        <Kicker>Methodological Foundations</Kicker>
        <Heading>Measuring LLM decisions as probability distributions rather than single outputs</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <p className="type-quote !text-[clamp(1.3rem,2.1vw,1.8rem)]">
            A single LLM response is one draw from a probability distribution. Valid behavioral inference requires{" "}
            <span className={KEY}>estimating the underlying distribution</span> across controlled experimental designs.
          </p>
          <LikertPlate />
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          {[
            {
              head: <>Monte-Carlo Behavioral Sampling</>,
              items: [
                <>Repeated independent sampling across factorial stimulus designs for non-parametric confidence intervals</>,
                <>
                  <em>Findings of EMNLP 2025</em> (Wadi &amp; Fredette)
                </>,
              ],
            },
            {
              head: (
                <>
                  Exact Likert-Scale Distributions (<em>Every Token Counts</em>)
                </>
              ),
              items: [
                <>
                  Extracts exact discrete probability distributions directly from single-pass token log-probabilities
                  with <strong>zero sampling error</strong>
                </>,
                <>
                  Demonstrated on consumer ethnocentrism and country-of-origin bias (<em>arXiv:2608.10503</em>, in
                  preparation for <em>ACL 2027</em>, with Ghodrat &amp; Philp)
                </>,
              ],
            },
            {
              head: <>Information-Board Process Tracing &amp; Human Digital-Market Studies</>,
              items: [
                <>
                  <strong>Tool-Lab</strong> stateful attribute-acquisition tracing (<em>JAMS</em>)
                </>,
                <>
                  Altruistic messaging and performance-contingent financial incentives in online product reviews:{" "}
                  <strong>
                    <em>JRIM</em> (2026)
                  </strong>{" "}
                  and{" "}
                  <strong>
                    <em>JECR</em> (2026)
                  </strong>{" "}
                  (with Sénécal, Fredette &amp; Legoux)
                </>,
              ],
            },
          ].map((m, i) => (
            <Ruled key={i} weight="thin">
              <h3 className="type-h2 !text-[1.2rem]">{m.head}</h3>
              <ul className="mt-2 space-y-1.5">
                {m.items.map((it, k) => (
                  <li
                    key={k}
                    className={`${BODY} !text-[0.93rem] ${k === m.items.length - 1 ? "!text-[var(--ink-3)]" : ""}`}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </Ruled>
          ))}
        </div>
      </Slide>

      {/* 7. Future research */}
      <Slide id="future" border className="!py-8">
        <Kicker>Future Research</Kicker>
        <Heading wide>
          Comparing <span className={KEY}>human and AI consumers</span> on the
          same storefronts
        </Heading>
        <div className="w-full">
          <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,7fr)_minmax(0,4fr)] gap-x-8 border-b border-[var(--ink)] pb-2 text-[13px] font-semibold text-[var(--ink)]">
            <span>Research Area</span>
            <span>Empirical Design</span>
            <span>Departmental Fit</span>
          </div>
          {[
            {
              area: "Human vs. Surrogate Consumers",
              design: (
                <>
                  Parallel human Mouselab and LLM <em>Tool-Lab</em> experiments
                  on delegation trust, objective specification, and choice
                  optimality
                </>
              ),
              fit: (
                <>
                  <strong>Consumer Behaviour Laboratory</strong> &amp;{" "}
                  <strong>Marketing Analytics Centre</strong>
                </>
              ),
            },
            {
              area: "Distributional Decision Models",
              design: (
                <>
                  Fine-tuning open-weight pointer-head decision models (Kev 0.8B to 9B) to replicate consumer survey
                  distributions and treatment effects
                </>
              ),
              fit: (
                <>
                  <strong>Advanced Computing Laboratory</strong> &amp; <strong>Marketing Analytics Centre</strong>
                </>
              ),
            },
            {
              area: "Algorithmic Audits",
              design: (
                <>
                  Process-level audits of principal-agent conflicts and
                  disclosure remedies in retail media
                </>
              ),
              fit: <>Ethical consumption and consumer-protection policy</>,
            },
            {
              area: "AI in Organizational Decisions",
              design: (
                <>
                  Field and experimental studies on generative AI in enterprise
                  decision-making
                </>
              ),
              fit: (
                <>
                  R&amp;D collaboration with <strong>General Motors</strong>
                </>
              ),
            },
          ].map((r, i) => (
            <div
              key={r.area}
              className={`grid grid-cols-[minmax(0,4fr)_minmax(0,7fr)_minmax(0,4fr)] items-baseline gap-x-8 border-b border-[var(--rule)] py-4 ${
                i === 0 ? "shadow-[inset_3px_0_0_var(--signal)] pl-4" : "pl-4"
              }`}
            >
              <span className="type-h2 !text-[1.3rem]">{r.area}</span>
              <span className={BODY}>{r.design}</span>
              <span className={BODY}>{r.fit}</span>
            </div>
          ))}
        </div>
        <div className="mt-7 w-full bg-[var(--paper-2)] px-6 py-5">
          <p className={`${BODY} !text-[0.98rem]`}>
            <strong>Research Funding:</strong> SSHRC Insight Development Grant (Collaborator, with Prof. Yu Ma),
            Google Gemini Academic Program Award ($10K), IVADO PhD Excellence Scholarship ($100K), NSERC Alliance
            collaboration with GM R&amp;D
          </p>
        </div>
      </Slide>

      {/* 8. Teaching */}
      <Slide id="teaching" border className="!py-8">
        <Kicker>Teaching</Kicker>
        <Heading wide>
          Students learn AI by{" "}
          <span className={KEY}>testing models and data in class</span>
        </Heading>
        {(() => {
          const teach = [
            {
              area: "AI Applications in Business",
              sites: ["/courses/ai-in-business"],
              prior: (
                <>
                  MBA <em>BUSI 654</em> (University Canada West)
                </>
              ),
            },
            {
              area: "Impact of AI on Business & Society",
              sites: ["/courses/responsible-ai-governance"],
              prior: (
                <>
                  Lead course developer, <em>Responsible AI</em> curriculum
                </>
              ),
            },
            {
              area: "Business & Marketing Analytics",
              sites: ["/courses/marketing-research-analytics"],
              prior: (
                <>
                  Graduate <em>Machine Learning I</em> (HEC Montréal)
                </>
              ),
            },
            {
              area: "Digital Transformation & Core Marketing",
              sites: [
                "/courses/digital-transformation",
                "/courses/consumer-behavior",
                "/courses/intro-marketing",
              ],
              prior: (
                <>
                  <span className="block">
                    <em>MIT Applied AI and Data Science Program</em>;
                  </span>
                  <span className="mt-1 block">
                    Johns Hopkins <em>Advanced Agentic AI</em> &amp;{" "}
                    <em>Designing and Building Agentic Systems</em>;
                  </span>
                  <span className="mt-1 block">
                    UT Austin <em>Advanced Agentic AI Solutions</em> &amp;{" "}
                    <em>Business Applications with Agentic AI</em>
                  </span>
                </>
              ),
            },
          ];
          const COL = "grid grid-cols-[9rem_repeat(4,minmax(0,1fr))] gap-x-8";
          const LABEL = "pt-1 text-[13px] font-semibold text-[var(--ink)]";
          return (
            <div className="w-full">
              <div
                className={`${COL} items-end border-b-2 border-[var(--ink)] pb-3`}
              >
                <span className={LABEL}>Teaching Area</span>
                {teach.map((t) => (
                  <h3
                    key={t.area}
                    className="type-h2 !text-[1.3rem] !leading-snug"
                  >
                    {t.area}
                  </h3>
                ))}
              </div>
              <div className={`${COL} border-b border-[var(--rule)] py-4`}>
                <span className={LABEL}>Course Website</span>
                {teach.map((t) => (
                  <div
                    key={t.area}
                    className="flex flex-col gap-1 text-[0.92rem]"
                  >
                    {t.sites.map((s, k) => (
                      <span key={s}>
                        <a className={LINK} href={s}>
                          {s}
                        </a>
                        {k < t.sites.length - 1 ? "," : null}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className={`${COL} border-b border-[var(--rule)] py-4`}>
                <span className={LABEL}>Prior Teaching</span>
                {teach.map((t) => (
                  <p key={t.area} className={BODY}>
                    {t.prior}
                  </p>
                ))}
              </div>
            </div>
          );
        })()}
        <div className="mt-7 w-full border-l-2 border-[var(--ink)] pl-6">
          <p className={`${BODY} !text-[0.98rem]`}>
            <strong>Software Built for Students:</strong>{" "}
            <strong>
              <a className={LINK} href="https://anchor.davoodwadi.com/">
                Anchor
              </a>
            </strong>{" "}
            (formative quizzing), <strong>AILSS</strong>{" "}
            (accessible learning support for students with disabilities, UCW
            Explore Grant), <strong>Behavioral-LLM</strong> &amp;{" "}
            <strong>Spreed.dev</strong> (no-code classroom LLM experiments), BC
            DQAB program review board
          </p>
        </div>
      </Slide>

      {/* 9. Conclusion */}
      <Slide id="conclusion" border className="!py-8">
        <Kicker>Conclusion</Kicker>
        <Heading>
          Studying AI as a <span className={KEY}>surrogate consumer</span>
        </Heading>
        <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {[
            {
              label: "Research Program:",
              text: (
                <>
                  <em>JAMS</em> (Major Revision), <em>Marketing Letters</em>{" "}
                  (Under Review), <em>Marketing Science</em> (In Preparation), <em>JBR</em> (In Preparation),{" "}
                  <em>JRIM</em>{" "}
                  (2026), <em>JECR</em> (2026), <em>Findings of EMNLP</em>{" "}
                  (2025), <em>ACL</em> (2027 submission)
                </>
              ),
            },
            {
              label: "Experimental Methods:",
              text: (
                <>
                  <em>Tool-Lab</em>, <em>Behavioral-LLM</em>, fine-tuned System-One decision models, and exact
                  token-probability measurement
                </>
              ),
            },
            {
              label: "Teaching:",
              text: (
                <>
                  Interactive courses across AI in business, AI governance, and
                  marketing analytics (B.Comm., M.Sc., MBA, and PhD)
                </>
              ),
            },
            {
              label: "Collaborations:",
              text: <>McGill University, Toronto Metropolitan University, HEC Montreal, IVADO, and General Motors R&amp;D</>,
            },
          ].map((c) => (
            <Ruled key={c.label}>
              <p className="type-h2 !text-[1.3rem]">
                <strong className="font-medium">{c.label}</strong>
              </p>
              <p className={`${BODY} mt-2`}>{c.text}</p>
            </Ruled>
          ))}
        </div>
        <div className="mt-14 flex w-full flex-wrap items-baseline justify-between gap-6 border-t border-[var(--ink)] pt-8">
          <p className="type-display !text-[clamp(2.4rem,4.4vw,3.6rem)]">
            <strong className="font-medium">Thank you.</strong>
          </p>
          <p className="text-[1.15rem] text-[var(--ink-2)]">
            <a className={LINK} href="mailto:davood.wadi@hec.ca">
              davood.wadi@hec.ca
            </a>{" "}
            <span className="px-2 text-[var(--rule-2)]">|</span>{" "}
            <a className={LINK} href="https://davoodwadi.com">
              davoodwadi.com
            </a>
          </p>
        </div>
      </Slide>
    </Deck>
  );
}
