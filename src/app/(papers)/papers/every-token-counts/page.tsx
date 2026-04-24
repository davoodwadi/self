import { Fragment } from "react";
import type { Metadata } from "next";
import MathContent from "../../_components/MathContent";

export const metadata: Metadata = {
  title: "Every Token Counts | Davood Wadi",
  description:
    "Every Token Counts: Isolating Latent Behavior of LLMs via Exact Likert Distributions — Davood Wadi, EMNLP 2026",
};

/* ── Paper metadata ───────────────────────────────────────── */

const TAGS = [
  { label: "NLP", color: "tag-violet" },
  { label: "LLM Evaluation", color: "tag-cyan" },
  { label: "Psychometrics", color: "tag-amber" },
  { label: "AI Fairness", color: "tag-violet" },
  { label: "Behavioral AI", color: "tag-cyan" },
  { label: "Consumer Behavior", color: "tag-amber" },
];

const LAYERS = [
  {
    number: "01",
    title: "Constraint Layer",
    accent: "layer-card-violet",
    accentColor: "var(--violet-light)",
    metric: "Failure Rate  M",
    description:
      "Measures task adherence by computing the probability mass allocated to valid ordinal tokens. Detects when a model fails to constrain its output to the requested Likert digits — a prerequisite for reliable measurement.",
    formula: "M = 1 − Σ P(t | x)   for t ∈ V_val",
  },
  {
    number: "02",
    title: "Consensus Layer",
    accent: "layer-card-cyan",
    accentColor: "var(--cyan-light)",
    metric: "Consensus Score  Cns",
    description:
      "Maps valid tokens onto the ordinal scale and computes a multivariate consensus/dissension score. Unlike entropy, this measure respects the distance between response categories, capturing true ordinal certainty.",
    formula: "Cns(Y_λ) = 1 + Σ P(y) log₂(1 − ‖y − μ‖ / d_max)",
  },
  {
    number: "03",
    title: "Construct Layer",
    accent: "layer-card-amber",
    accentColor: "var(--amber-light)",
    metric: "Distributional ANOVA",
    description:
      "Applies a novel distributional ANOVA directly on exact PMFs to isolate main effects (Model, Target) and interaction effects (Model × Target Country). Derives Hoeffding effect sizes with statistical certainty — no sampling required.",
    formula: "SS_effect = Σ n_g · D_H(P_g ‖ P̄)²",
  },
];

const MODELS = [
  { name: "Llama 3.3 70B", org: "Meta", origin: "USA", flag: "🇺🇸" },
  { name: "Gemma 3 27B", org: "Google", origin: "USA", flag: "🇺🇸" },
  { name: "Qwen3 80B", org: "Alibaba", origin: "China", flag: "🇨🇳" },
  { name: "Aya Expanse 32B", org: "Cohere", origin: "Canada", flag: "🇨🇦" },
  { name: "Ministral 14B", org: "Mistral", origin: "France", flag: "🇫🇷" },
];

const TARGETS = ["USA 🇺🇸", "China 🇨🇳", "Canada 🇨🇦", "France 🇫🇷"];

const FINDINGS = [
  {
    style: "finding-amber",
    headColor: "var(--amber-light)",
    label: "Core Finding",
    headline: "LLMs Exceed Human Ethnocentrism Baselines",
    body: "Across all five evaluated models, exact PMF-derived CETSCALE scores systematically exceed established human baseline ranges. The exact framework reveals a consistent positive bias that sampling-based methods obscure through noise.",
  },
  {
    style: "finding-cyan",
    headColor: "var(--cyan-light)",
    label: "Interaction Effect",
    headline: "Systematic In-Group Favoritism",
    body: "North American models (Llama 3.3, Gemma 3) assign significantly higher ethnocentrism scores when the target is their country of origin. The Model × Target interaction isolates this in-group bias with statistical certainty.",
  },
  {
    style: "finding-violet",
    headColor: "var(--violet-light)",
    label: "Main Effect",
    headline: "Geographic Origin Shapes Latent Distributions",
    body: "The main effect of Model origin accounts for substantial variance in PMF distributions. A model's training geography is a primary driver of its latent behavioral state — independent of the target country being evaluated.",
  },
];

const BIBTEX = `@inproceedings{wadi2026every,
  title     = {Every Token Counts: Isolating Latent Behavior
               of {LLMs} via Exact {Likert} Distributions},
  author    = {Wadi, Davood},
  year      = {2026},
  publisher = {Association for Computational Linguistics},
}`;

/* ── Page component ───────────────────────────────────────── */

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>

      {/* ── NAVIGATION ──────────────────────────────────────── */}
      <nav className="p-nav">
        <div
          style={{
            maxWidth: "76rem",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "56px",
          }}
        >
          {/* Brand */}
          <span
            className="p-mono"
            style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
          >
            research
            <span style={{ color: "var(--violet-light)" }}>{" "}papers</span>
          </span>

          {/* Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {[
              ["Abstract", "#abstract"],
              ["Framework", "#framework"],
              ["Findings", "#findings"],
              ["Cite", "#cite"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="p-nav-link">
                {label}
              </a>
            ))}
          </div>

          {/* Paper badge */}
          <span className="tag tag-violet" style={{ display: "none" }}>
            EMNLP 2026
          </span>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="dot-grid"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "9rem 2rem 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glows */}
        <div
          className="ambient-glow"
          style={{
            top: "15%",
            left: "20%",
            width: "500px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="ambient-glow"
          style={{
            bottom: "20%",
            right: "10%",
            width: "400px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)",
          }}
        />

        <div style={{ maxWidth: "76rem", margin: "0 auto", width: "100%", position: "relative" }}>

          {/* Pre-title */}
          <div
            className="fade-up"
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}
          >
            <span className="tag tag-violet">Research Paper</span>
            <span className="tag tag-amber">ACL 2025</span>
            <span className="tag tag-muted">NLP · LLM Evaluation · Psychometrics</span>
          </div>

          {/* Main title */}
          <h1
            className="p-display fade-up delay-100"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", marginBottom: "1rem" }}
          >
            Every {" "}
            <span className="grad-violet-cyan">Token</span>
            {" "}Counts
          </h1>

          {/* Subtitle */}
          <p
            className="p-display-italic fade-up delay-200"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.65rem)",
              maxWidth: "52rem",
              marginBottom: "2.5rem",
            }}
          >
            Isolating Latent Behavior of LLMs via Exact Likert Distributions
          </p>

          {/* Authors */}
          <div
            className="fade-up delay-300"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)" }}>
              Davood Wadi
            </span>
            <span style={{ color: "var(--border-mid)" }}>·</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)" }}>
              Second Author
            </span>
            <span
              style={{
                width: "1px",
                height: "14px",
                background: "var(--border-mid)",
                display: "inline-block",
              }}
            />
            <span className="p-small">HEC Montréal &nbsp;·&nbsp; 2026</span>
          </div>

          {/* Tags */}
          <div
            className="fade-up delay-400"
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}
          >
            {TAGS.map(({ label, color }) => (
              <span key={label} className={`tag ${color}`}>
                {label}
              </span>
            ))}
          </div>

          {/* Abstract teaser */}
          <blockquote
            className="fade-up delay-500"
            style={{
              borderLeft: "2px solid var(--violet)",
              paddingLeft: "1.5rem",
              maxWidth: "58rem",
              marginBottom: "3.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontStyle: "italic",
                lineHeight: "1.85",
                color: "var(--text-dim)",
              }}
            >
              "We introduce an analytically exact framework for behavioral evaluation of LLMs
              that operates directly on token-level PMFs, eliminating sampling error and
              providing statistical certainty over latent model behavior."
            </p>
          </blockquote>

          {/* CTAs */}
          <div
            className="fade-up delay-600"
            style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}
          >
            <a href="#abstract" className="btn-p btn-p-primary">
              Read Abstract
            </a>
            <a href="#framework" className="btn-p btn-p-ghost">
              Explore Framework
            </a>
            <a href="#cite" className="btn-p btn-p-ghost">
              Cite Paper
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-faint)",
          }}
        >
          <span
            className="p-mono"
            style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "linear-gradient(to bottom, var(--border-mid), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── ABSTRACT ────────────────────────────────────────── */}
      <section
        id="abstract"
        style={{ padding: "7rem 2rem", position: "relative" }}
      >
        <hr className="rule-accent" />

        <div
          style={{
            maxWidth: "76rem",
            margin: "0 auto",
            paddingTop: "5rem",
            display: "grid",
            gridTemplateColumns: "1fr 2.5fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left: label + number */}
          <div style={{ position: "sticky", top: "7rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              <span>Abstract</span>
            </div>
            <div
              className="p-mono"
              style={{
                fontSize: "clamp(4rem, 10vw, 7rem)",
                color: "var(--text-faint)",
                lineHeight: "1",
                userSelect: "none",
              }}
            >
              §
            </div>
            <p
              className="p-small"
              style={{ marginTop: "1.5rem", maxWidth: "16rem", lineHeight: "1.6" }}
            >
              Core statement of the paper's scope, methodology, and principal findings.
            </p>
          </div>

          {/* Right: abstract text */}
          <div>
            <p
              className="abstract-drop-cap"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.0625rem",
                lineHeight: "1.9",
                color: "var(--text-dim)",
                maxWidth: "64ch",
              }}
            >
              As Large Language Models (LLMs) are increasingly deployed in sociotechnical
              systems, understanding their latent biases and cultural alignment is critical
              for AI fairness. Researchers frequently measure such behaviors by adapting
              human psychometric instruments — such as Likert-scale questionnaires — via
              prompt-based sampling. However, sampling is costly, introduces stochastic
              variance, and obscures the model's true internal state, while standard
              uncertainty metrics like entropy ignore ordinal scale distances.
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.0625rem",
                lineHeight: "1.9",
                color: "var(--text-dim)",
                maxWidth: "64ch",
                marginTop: "1.5rem",
              }}
            >
              We introduce an analytically <em>exact</em> framework for the behavioral evaluation
              of LLMs that operates directly on token-level Probability Mass Functions (PMFs),
              eliminating sampling error. Our three-layer pipeline quantifies task adherence,
              measures ordinal consensus, and applies a novel distributional ANOVA to isolate
              main effects and factor interactions with statistical certainty.
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.0625rem",
                lineHeight: "1.9",
                color: "var(--text-dim)",
                maxWidth: "64ch",
                marginTop: "1.5rem",
              }}
            >
              We validate the framework through a case study on consumer ethnocentrism
              and country-of-origin bias, evaluating five LLMs from four geographic
              origins. Our exact-PMF approach reveals that LLMs exhibit ethnocentric
              tendencies exceeding human baselines and display systematic in-group
              favoritism — with North American models favoring North American products.
              We mathematically isolate these nationality-driven biases, with implications
              for LLM alignment, cross-cultural fairness, and the global deployment of
              foundation models.
            </p>

            {/* Key stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginTop: "3rem",
              }}
            >
              {[
                { value: "5", label: "LLMs Evaluated" },
                { value: "340", label: "Exact PMF Measurements" },
                { value: "4", label: "Geographic Origins" },
              ].map(({ value, label }) => (
                <div key={label} className="stat-box">
                  <span
                    className="p-heading grad-violet-cyan"
                    style={{ fontSize: "2rem" }}
                  >
                    {value}
                  </span>
                  <span className="p-small" style={{ lineHeight: "1.4" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE ───────────────────────────────────── */}
      <section
        style={{
          padding: "7rem 2rem",
          backgroundColor: "var(--surface)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="ambient-glow"
          style={{
            top: "-100px",
            right: "5%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)",
          }}
        />

        <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            <span>The Challenge</span>
          </div>

          <h2
            className="p-heading"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              maxWidth: "42rem",
              marginBottom: "1rem",
            }}
          >
            Why Sampling-Based LLM Evaluation{" "}
            <span className="grad-amber">Breaks Down</span>
          </h2>

          <p
            className="p-body"
            style={{ maxWidth: "54ch", marginBottom: "3.5rem", fontSize: "1.0625rem" }}
          >
            Current NLP practice borrows sampling paradigms from human behavioral research —
            but an LLM is not a human population. It has a fully observable, static internal
            distribution. Treating it otherwise injects unnecessary error.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                number: "01",
                color: "var(--violet-light)",
                title: "Sampling Error",
                body: "Monte Carlo sampling from a static distribution injects stochastic variance into each measurement. Dozens of inference calls are required just to approximate what the model's own probability table already contains exactly.",
              },
              {
                number: "02",
                color: "var(--cyan-light)",
                title: "Ordinality Blindness",
                body: 'Standard metrics like entropy treat "Strongly Agree" and "Strongly Disagree" as equally distant from all other responses. On a Likert scale, a model polarized between 1 and 5 is fundamentally different from one centered on 3 — entropy cannot capture this.',
              },
              {
                number: "03",
                color: "var(--amber-light)",
                title: "Behavioral Opacity",
                body: "Scenario-based prompting conflates the target construct with scenario-specific confounders. An ethnocentric model may recommend a foreign product simply because no domestic equivalent exists in its training data, masking its true latent bias.",
              },
            ].map(({ number, color, title, body }) => (
              <div key={number} className="p-card-hover" style={{ padding: "2rem" }}>
                <div
                  className="p-mono"
                  style={{ fontSize: "0.7rem", color, marginBottom: "1rem", letterSpacing: "0.1em" }}
                >
                  {number}
                </div>
                <h3
                  className="p-heading"
                  style={{ fontSize: "1.1rem", marginBottom: "0.875rem", color }}
                >
                  {title}
                </h3>
                <p className="p-body" style={{ fontSize: "0.9375rem" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK ───────────────────────────────────────── */}
      <section
        id="framework"
        style={{ padding: "7rem 2rem", position: "relative" }}
      >
        <hr className="rule-accent" />

        <div style={{ maxWidth: "76rem", margin: "0 auto", paddingTop: "5rem" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            <span>Methodology</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "3.5rem",
            }}
          >
            <div>
              <h2
                className="p-heading"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "36rem" }}
              >
                A Three-Layer{" "}
                <span className="grad-violet-cyan">Exact-PMF Pipeline</span>
              </h2>
            </div>
            <p
              className="p-body"
              style={{
                maxWidth: "40ch",
                fontSize: "0.9375rem",
                alignSelf: "flex-end",
              }}
            >
              Rather than generating text, the framework evaluates LLMs through their
              next-token probability distributions — once per condition, with zero
              sampling variance.
            </p>
          </div>

          {/* Arrow connector line */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "calc(33.33% - 0px)",
                right: "calc(33.33% - 0px)",
                height: "1px",
                background: "linear-gradient(90deg, var(--violet), var(--cyan))",
                opacity: 0.3,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            {LAYERS.map(({ number, title, accent, accentColor, metric, description, formula }) => (
              <div key={number} className={`layer-card ${accent}`} style={{ zIndex: 1 }}>
                {/* Number */}
                <div
                  className="p-mono"
                  style={{ fontSize: "0.7rem", color: accentColor, marginBottom: "0.5rem", letterSpacing: "0.1em" }}
                >
                  {number}
                </div>

                {/* Title */}
                <h3
                  className="p-heading"
                  style={{ fontSize: "1.15rem", color: accentColor, marginBottom: "0.75rem" }}
                >
                  {title}
                </h3>

                {/* Metric */}
                <span
                  className="tag"
                  style={{
                    marginBottom: "1.25rem",
                    display: "inline-block",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-mid)",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    textTransform: "none",
                  }}
                >
                  {metric}
                </span>

                {/* Description */}
                <p className="p-body" style={{ fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  {description}
                </p>

                {/* Formula */}
                <div
                  className="p-mono"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    padding: "0.75rem 1rem",
                    fontSize: "0.72rem",
                    color: accentColor,
                    opacity: 0.8,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {formula}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIMENT DESIGN ───────────────────────────────── */}
      <section
        style={{
          padding: "7rem 2rem",
          backgroundColor: "var(--surface)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="line-grid"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "76rem", margin: "0 auto", position: "relative" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            <span>Case Study</span>
          </div>

          <h2
            className="p-heading"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              marginBottom: "1rem",
            }}
          >
            Consumer Ethnocentrism —{" "}
            <span className="grad-amber">5 × 4 Factorial Design</span>
          </h2>

          <p
            className="p-body"
            style={{ maxWidth: "58ch", marginBottom: "3.5rem", fontSize: "1.0625rem" }}
          >
            We apply the 17-item CETSCALE (Likert 1–7) across a fully crossed design.
            Each cell in the matrix represents a single deterministic forward pass, yielding
            an exact PMF — 340 measurements total.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Models column */}
            <div>
              <p
                className="p-mono"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Model Factor (5 levels)
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {MODELS.map(({ name, org, origin, flag }) => (
                  <div key={name} className="model-badge" style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      <span
                        className="p-mono"
                        style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}
                      >
                        {name}
                      </span>
                      <span
                        className="p-mono"
                        style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}
                      >
                        {org}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span style={{ fontSize: "1rem" }}>{flag}</span>
                      <span
                        className="tag tag-muted"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {origin}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix */}
            <div>
              <p
                className="p-mono"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                5 × 4 Interaction Matrix
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `auto repeat(4, 1fr)`,
                  gap: "0.375rem",
                }}
              >
                {/* Header row */}
                <div />
                {TARGETS.map((t) => (
                  <div key={t} className="matrix-cell-header" style={{ fontSize: "0.65rem" }}>
                    {t}
                  </div>
                ))}

                {/* Data rows */}
                {MODELS.map(({ name, flag }, mi) => (
                  <Fragment key={name}>
                    <div
                      className="matrix-cell-header"
                      style={{ textAlign: "left", whiteSpace: "nowrap", fontSize: "0.65rem" }}
                    >
                      {flag} {name.split(" ").slice(0, 2).join(" ")}
                    </div>
                    {TARGETS.map((_, ti) => (
                      <div
                        key={`${mi}-${ti}`}
                        className={`matrix-cell ${mi === ti ? "matrix-cell-active" : ""}`}
                        title="17 PMF measurements"
                      >
                        <span style={{ opacity: mi === ti ? 1 : 0.5 }}>17</span>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>

              <p
                className="p-small"
                style={{ marginTop: "1rem", fontStyle: "italic" }}
              >
                Diagonal cells (highlighted) represent same-origin conditions —
                the key in-group bias test.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY FINDINGS ────────────────────────────────────── */}
      <section
        id="findings"
        style={{ padding: "7rem 2rem" }}
      >
        <hr className="rule-accent" />

        <div style={{ maxWidth: "76rem", margin: "0 auto", paddingTop: "5rem" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            <span>Key Findings</span>
          </div>

          <h2
            className="p-heading"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              maxWidth: "42rem",
              marginBottom: "3.5rem",
            }}
          >
            What Exact PMFs Reveal That{" "}
            <span className="grad-violet-cyan">Sampling Cannot</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {FINDINGS.map(({ style, headColor, label, headline, body }) => (
              <div key={headline} className={`finding-callout ${style}`}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    className="p-mono"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    {label}
                  </span>
                </div>
                <h3
                  className="p-heading"
                  style={{ fontSize: "1.2rem", color: headColor, marginBottom: "0.75rem" }}
                >
                  {headline}
                </h3>
                <p className="p-body" style={{ fontSize: "0.9375rem", maxWidth: "72ch" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTRIBUTIONS ───────────────────────────────────── */}
      <section
        style={{
          padding: "7rem 2rem",
          backgroundColor: "var(--surface)",
        }}
      >
        <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            <span>Contributions</span>
          </div>

          <h2
            className="p-heading"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              marginBottom: "3.5rem",
            }}
          >
            What This Paper{" "}
            <span className="grad-amber">Adds to the Field</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div className="contrib-card contrib-card-method">
              <div
                className="p-mono"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--violet-light)",
                  marginBottom: "1rem",
                }}
              >
                Methodological
              </div>
              <h3
                className="p-heading"
                style={{ fontSize: "1.25rem", color: "var(--violet-light)", marginBottom: "1rem" }}
              >
                Exact Behavioral Evaluation Framework
              </h3>
              <p className="p-body" style={{ fontSize: "0.9375rem" }}>
                A new scientific methodology that bridges human psychometric theory with
                the exact mathematical probabilities of LLMs. By utilizing exact PMFs
                instead of noisy text generation, this framework provides the statistical
                rigor required for behavioral evaluation in the next chapter of NLP
                research. The framework is instrument-agnostic and generalizes beyond
                Likert scales.
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <span className="tag tag-violet">Zero Sampling Error</span>
                <span className="tag tag-violet">Ordinal Consensus</span>
                <span className="tag tag-violet">Distributional ANOVA</span>
              </div>
            </div>

            <div className="contrib-card contrib-card-empirical">
              <div
                className="p-mono"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--cyan-light)",
                  marginBottom: "1rem",
                }}
              >
                Empirical
              </div>
              <h3
                className="p-heading"
                style={{ fontSize: "1.25rem", color: "var(--cyan-light)", marginBottom: "1rem" }}
              >
                LLM Ethnocentrism Analysis
              </h3>
              <p className="p-body" style={{ fontSize: "0.9375rem" }}>
                A detailed behavioral analysis of ethnocentrism in five modern foundation
                models, revealing how models' countries of origin inherently shape their
                latent behavioral distributions. Results have direct implications for LLM
                alignment, cross-cultural AI fairness, and the governance of global
                foundation model deployment.
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <span className="tag tag-cyan">Country-of-Origin Bias</span>
                <span className="tag tag-cyan">AI Fairness</span>
                <span className="tag tag-cyan">Cross-Cultural NLP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CITATION ────────────────────────────────────────── */}
      <section
        id="cite"
        style={{ padding: "7rem 2rem" }}
      >
        <hr className="rule-accent" />

        <div style={{ maxWidth: "76rem", margin: "0 auto", paddingTop: "5rem" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            <span>Citation</span>
          </div>

          <h2
            className="p-heading"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", marginBottom: "0.875rem" }}
          >
            Cite This Work
          </h2>

          <p
            className="p-body"
            style={{ maxWidth: "50ch", marginBottom: "2.5rem", fontSize: "0.9375rem" }}
          >
            If this framework or findings are useful in your research, please consider
            citing the paper.
          </p>

          <pre className="code-block">{BIBTEX}</pre>

          {/* Paper info row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginTop: "2.5rem",
            }}
          >
            {[
              { label: "Venue", value: "EMNLP 2026" },
              { label: "Year", value: "2026" },
              { label: "Instrument", value: "CETSCALE (17 items)" },
              { label: "Models", value: "5 LLMs" },
              { label: "Countries", value: "4 (USA, China, Canada, France)" },
              { label: "Measurements", value: "340 exact PMFs" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  padding: "1rem 1.25rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              >
                <p
                  className="p-mono"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "var(--text-dim)",
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2.5rem 2rem",
          backgroundColor: "var(--surface)",
        }}
      >
        <div
          style={{
            maxWidth: "76rem",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            className="p-mono"
            style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
          >
            wadi<span style={{ color: "var(--violet-light)" }}>.research</span>
            {" "}·{" "}
            <span style={{ color: "var(--text-faint)" }}>Inside the Black Box</span>
          </span>
          <span className="p-small" style={{ fontSize: "0.75rem" }}>
            Davood Wadi, PhD &nbsp;·&nbsp; HEC Montréal &nbsp;·&nbsp; 2026
          </span>
        </div>
      </footer>

    </div>
  );
}
