import { PublicationCard } from "@/components/portfolio/PublicationCard";

export function ResearchPapers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PublicationCard
        venue="EMNLP"
        year="2025"
        title="A Monte-Carlo Sampling Framework For Reliable Evaluation of Large Language Models Using Behavioral Analysis"
        description="Findings of the Association for Computational Linguistics. We propose a Monte-Carlo evaluation framework that provides statistical guarantees for LLM performance estimates, replacing single-sample benchmarks. We find that newer, larger LLMs are more susceptible to cognitive biases, suggesting more human-like but less rational responses."
        authors="Wadi, D., Fredette, M."
        href="https://aclanthology.org/2025.findings-emnlp.500/"
      />
      <PublicationCard
        venue="JECR"
        year="2026"
        title="The interplay of altruism and financial incentives: Maximizing online reviews through effective messaging"
        description="Journal of Electronic Commerce Research, Volume 27, Issue 2. We study what actually gets people to write online reviews: altruistic messaging, financial incentives, or both. We test different message framings in a field experiment and find that the interplay between the two matters more than either alone."
        authors="Wadi, D., Legoux, R., Fredette, M., Senecal, S."
        href="http://www.jecr.org/sites/default/files/2026vol27no2_Paper1.pdf"
      />
      <PublicationCard
        venue="Working Paper"
        year="2026"
        title="Every Token Counts: Isolating Latent Behavior of LLMs via Exact Likert Distributions"
        description="We introduce an analytically exact framework for behavioral evaluation of LLMs operating directly on token-level PMFs, eliminating sampling error. A three-layer pipeline quantifies task adherence, measures ordinal consensus, and applies a novel distributional ANOVA. Applied to consumer ethnocentrism, we find LLMs exhibit ethnocentric tendencies exceeding human baselines with systematic in-group favoritism."
        authors="Wadi, D."
        href="/papers/every-token-counts"
      />
      <PublicationCard
        venue="Working Paper"
        year="2026"
        title="Tool-Lab: Evaluating and Training Large Language Models for Resource Rationality"
        description="We introduce a new methodology that measures the efficiency of tool-calling and problem solving in LLMs..."
        authors="Wadi, D."
        href="/papers/tool-lab"
      />
    </div>
  );
}
