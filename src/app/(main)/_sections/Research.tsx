import { Section } from "./Section";

type Paper = {
  year: string;
  venue?: string;
  title: string;
  authors: string[];
  abstract?: string;
  links: { label: string; href: string }[];
};

const PUBLISHED: Paper[] = [
  {
    year: "2026",
    venue: "Journal of Research in Interactive Marketing",
    title:
      "Be careful what you pay for: the effect of performance contingent incentives on online product reviews",
    authors: ["Wadi, D.", "Fredette, M.", "Senecal, S.", "Legoux, R."],
    abstract:
      "This research investigates how performance-contingent incentivization schemes affect online review contributions. It explores the interplay between financial incentives, prosocial reinforcement (social versus reciprocal exchange) and reviewer experience. The research conducts a field study in collaboration with a major North American online retailer to evaluate customer review behavior. Reviewer experience moderates the effect of performance-contingent incentives on review decisions and length. First-time (vs experienced) reviewers see significant improvements in both review decisions and length with performance-contingent incentives. Additionally, because performance-contingent incentives reinforce reciprocal exchange, introducing reciprocal exchange reinforcement through messaging increases the level of effort but reduces review decisions. The optimal strategy depends on the platform's proportion of first-time reviewers and the retailer's specific review outcomes. This work identifies reviewer experience and prosocial framing as critical boundary conditions for the effectiveness of performance-contingent incentives.",
    links: [
      { label: "DOI", href: "https://doi.org/10.1108/JRIM-04-2026-0253" },
    ],
  },
  {
    year: "2026",
    venue: "Journal of Electronic Commerce Research 27(2)",
    title:
      "The interplay of altruism and financial incentives: Maximizing online reviews through effective messaging",
    authors: ["Wadi, D.", "Legoux, R.", "Fredette, M.", "Senecal, S."],
    abstract:
      "We study what actually gets people to write online reviews: altruistic messaging, financial incentives, or both. We test different message framings in a field experiment and find that the interplay between the two matters more than either alone.",
    links: [
      {
        label: "PDF",
        href: "http://www.jecr.org/sites/default/files/2026vol27no2_Paper1.pdf",
      },
    ],
  },
  {
    year: "2025",
    venue: "Findings of EMNLP",
    title:
      "A Monte-Carlo Sampling Framework For Reliable Evaluation of Large Language Models Using Behavioral Analysis",
    authors: ["Wadi, D.", "Fredette, M."],
    abstract:
      "We propose a Monte-Carlo evaluation framework that provides statistical guarantees for LLM performance estimates, replacing single-sample benchmarks. We find that newer, larger LLMs are more susceptible to cognitive biases, suggesting more human-like but less rational responses.",
    links: [
      {
        label: "ACL Anthology",
        href: "https://aclanthology.org/2025.findings-emnlp.500/",
      },
    ],
  },
];

const PREPRINTS: Paper[] = [
  {
    year: "2026",
    venue: "arXiv preprint",
    title:
      "Whom Do AI Agents Work For? Role Assignment Induces Sponsorship Bias in LLM Recommenders",
    authors: ["Wadi, D.", "Ma, Y."],
    abstract:
      "Large language models (LLMs) now serve as conversational shopping assistants on platforms that also sell advertising. These AI agents face a conflict of duty. They advise consumers who rely on their judgment, yet are deployed by platforms that benefit when sponsored listings are chosen. Sponsorship disclosures, designed to allow consumers to penalize paid placements, now reach the AI agent rather than the consumer, and the agent's evaluation of them is hidden from the consumer. Drawing on the fiduciary concept of conflict of duty, we argue that an agent's evaluation of a sponsored listing should not depend on which party deployed it. In controlled choice experiments, we manipulate assigned roles in the system prompt to name either a traveler or a booking platform as the agent's principal. Platform delegation significantly attenuates the penalty that agents apply to sponsored listings and weakens the skepticism that disclosure triggers in their reasoning traces. We replicate out findings across LLMs and reasoning depths. A second study decomposes the disclosure label and shows that the divergence between the two delegates widens significantly when the paid placement is attributed to the platform. Stricter terminology (“Sponsored” instead of “Promoted”) lowers choice of paid listings but does not close this gap when the platform is named. The findings show that disclosure mandates designed for human consumers cannot by themselves protect consumers in AI-mediated commerce.",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2609.17989" }],
  },
  {
    year: "2026",
    venue: "arXiv preprint",
    title:
      "Does Rank Still Matter? Position Bias When AI Agents Shop on Our Behalf",
    authors: ["Wadi, D.", "Ma, Y."],
    abstract:
      "Search rankings are valuable because human attention is scarce and sequential. Higher-placed alternatives are easier to find, so they are examined and bought more often. Consumers are now delegating search to AI agents that can ingest an entire results page at once. Randomizing the order of one hundred hotel listings across 5,000 AI agent sessions, we compare four large language models against human field data. AI agents search more deeply than humans and never decline to buy. Position still predicts which listings are inspected, but weakly and non-monotonically: the middle of a results page has the lowest probability of inspection, not the bottom. Position reaches the choice stage for some models and not others, a heterogeneity that tracks neither provider nor capability. All models nonetheless converge on the same undominated listing. For agentic search, the attributes displayed on a results page matter more than placement within it.",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2608.22697" }],
  },
  {
    year: "2026",
    venue: "arXiv preprint",
    title:
      "Every Token Counts: Exact Likert-Scale Distributions for Measuring LLM Attitudes and Biases",
    authors: ["Wadi, D.", "Ghodrat, M.", "Philp, M."],
    abstract:
      "We introduce an analytically exact framework for behavioral evaluation of LLMs operating directly on token-level PMFs, eliminating sampling error. A three-layer pipeline quantifies task adherence, measures ordinal consensus, and applies a novel distributional ANOVA. Applied to consumer ethnocentrism, we find LLMs exhibit ethnocentric tendencies exceeding human baselines with systematic in-group favoritism.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2608.10503" },
      { label: "Paper page", href: "/papers/every-token-counts" },
    ],
  },
  {
    year: "2026",
    venue: "Working paper",
    title:
      "Shopping By Algorithm: How Agentic AI Deploys Human Heuristics as a Surrogate Consumer",
    authors: ["Wadi, D.", "Ma, Y."],
    links: [],
  },
  {
    year: "2026",
    venue: "Working paper",
    title:
      "Tool-Lab: Evaluating and Training Large Language Models for Resource Rationality",
    authors: ["Wadi, D."],
    abstract:
      "We introduce a new methodology that measures the efficiency of tool-calling and problem solving in LLMs...",
    links: [{ label: "Paper page", href: "/papers/tool-lab" }],
  },
  {
    year: "2023",
    venue: "arXiv preprint",
    title:
      "Read the Signs: Towards Invariance to Gradient Descent's Hyperparameter Initialization",
    authors: ["Wadi, D.", "Fredette, M.", "Senecal, S."],
    abstract:
      "We propose ActiveLR, an optimization meta algorithm that localizes the learning rate, α, and adapts them at each epoch according to whether the gradient at each epoch changes sign or not. This sign-conscious algorithm is aware of whether from the previous step to the current one the update of each parameter has been too large or too small and adjusts the α accordingly. We implement the Active version (ours) of widely used and recently published gradient descent optimizers, namely SGD with momentum, AdamW, RAdam, and AdaBelief. Our experiments on ImageNet, CIFAR-10, WikiText-103, WikiText-2, and PASCAL VOC using different model architectures, such as ResNet and Transformers, show an increase in generalizability and training set fit, and decrease in training time for the Active variants of the tested optimizers. The results also show robustness of the Active variant of these optimizers to different values of the initial learning rate. Furthermore, the detrimental effects of using large mini-batch sizes are mitigated. ActiveLR, thus, alleviates the need for hyper-parameter search for two of the most commonly tuned hyper-parameters that require heavy time and computational costs to pick. We encourage AI researchers and practitioners to use the Active variant of their optimizer of choice for faster training, better generalizability, and reducing carbon footprint of training deep neural networks.",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2301.10133" }],
  },
];

const DISSERTATION: Paper[] = [
  {
    year: "2023",
    venue: "Ph.D. dissertation, HEC Montréal",
    title:
      "The Influence of Altruistic Reinforcement and Performance-Contingent Incentives on Online Product Reviews",
    authors: ["Wadi, D."],
    links: [],
  },
];

const GROUPS = [
  { label: "Published", papers: PUBLISHED },
  { label: "Preprints & working papers", papers: PREPRINTS },
  { label: "Dissertation", papers: DISSERTATION },
];

function Authors({ names }: { names: string[] }) {
  return (
    <>
      {names.map((n, i) => (
        <span key={n}>
          {i > 0 && ", "}
          {n === "Wadi, D." ? (
            <span className="font-semibold text-ink">{n}</span>
          ) : (
            n
          )}
        </span>
      ))}
    </>
  );
}

function Entry({ p }: { p: Paper }) {
  const main = p.links[0];
  return (
    <li className="grid gap-1 py-6 first:pt-0 sm:grid-cols-[4rem_1fr] sm:gap-6">
      <p className="meta pt-1">{p.year}</p>
      <div>
        <h3 className="text-lg leading-snug md:text-xl">
          {main ? (
            <a href={main.href} className="hover:text-signal transition-colors">
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </h3>
        <p className="mt-1.5 text-sm">
          <Authors names={p.authors} />
          {p.venue && (
            <>
              <span className="text-ink-3"> · </span>
              <em className="text-ink-3">{p.venue}</em>
            </>
          )}
          {p.links.map((l) => (
            <span key={l.href}>
              <span className="text-ink-3"> · </span>
              <a href={l.href} className="link">
                {l.label}
              </a>
            </span>
          ))}
        </p>
        {p.abstract && (
          <details className="mt-2 text-sm">
            <summary className="inline-block text-ink-3 hover:text-ink transition-colors">
              <span className="chev" aria-hidden>
                ›
              </span>{" "}
              Abstract
            </summary>
            <p className="mt-2 max-w-[64ch] text-ink-2">{p.abstract}</p>
          </details>
        )}
      </div>
    </li>
  );
}

export function Research() {
  return (
    <Section id="research" title="Research">
      <div className="space-y-12">
        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="meta mb-6 border-b border-rule pb-2">{g.label}</p>
            <ol className="divide-y divide-rule">
              {g.papers.map((p) => (
                <Entry key={p.title} p={p} />
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}
