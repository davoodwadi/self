"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Slide,
  SlideDeck,
} from "@/app/(courses-ai)/_components/SlideComponents";
import { ScrollProgress } from "@/app/(courses-ai)/_components/Interactive";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzes from "./quizzes.json";

// ============================================================================
// WEEK 08 — SUSTAINABILITY IN AI
// ============================================================================
// Same deck grammar as Weeks 01–07: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Its [cite: N] markers
// are set as superscript source numbers, linked to the Sources slide when that
// source is listed there. Figures carry only words and numbers that already
// appear on their slide. Where content.md gives the numbers (29 Wh against
// 0.4 Wh, 3x, 40%, 28%, 32-bit to 4-bit) a figure is drawn to them; any other
// shape that suggests a quantity is labelled SCHEMATIC.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. content.md for this
// week carries no [quiz] tags, so twelve topics were chosen to test: the
// opening paradox and two or three per part. Each quiz is attached to the
// slide that FOLLOWS its topic (a part plate where one comes next) and only
// tests material the student has already passed.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

/** Small-caps label treatment used for every eyebrow, axis tick and numeral. */
const MICRO = "font-sans text-[10px] font-semibold uppercase tracking-[0.22em]";

/** The same small-caps treatment for SVG <text>. */
const SVG_LABEL = {
  fontSize: 9,
  letterSpacing: 2.2,
  fontFamily: "var(--font-sans), sans-serif",
  fontWeight: 600,
} as const;

/** Body sentence at the deck's reading size. */
const BODY =
  "font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]";

/** A sentence promoted to display weight inside a block. */
const DISPLAY =
  "font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]";

/** A sentence one step below display, used inside rules and frames. */
const LEAD =
  "font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]";

/** Hairline that opens each later block of a slide. */
const RULED = "mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8";

/** Two sentences side by side under one hairline. */
const PAIR =
  "mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14";

/** The divider a second column takes inside PAIR. */
const COL_RULE = "md:border-l md:border-[var(--charcoal)]/10 md:pl-14";

/** Sources listed on the closing Sources slide, by their content.md number. */
const LISTED = new Set([1, 2, 4, 6, 11, 19, 29, 34, 48]);

const pad = (n: number) => String(n).padStart(2, "0");

/** Deterministic 0–1 hash, so scattered marks match between server and client. */
const hash = (n: number) => {
  const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Open arrowheads whose tip sits at (x, y). */
const headRight = (x: number, y: number) => `M${x - 8} ${y - 5}l8 5l-8 5`;
const headLeft = (x: number, y: number) => `M${x + 8} ${y - 5}l-8 5l8 5`;
const headDown = (x: number, y: number) => `M${x - 5} ${y - 8}l5 8l5-8`;
const headUp = (x: number, y: number) => `M${x - 5} ${y + 8}l5-8l5 8`;

/**
 * Reveal — the deck's single entrance. Opacity plus eight pixels of rise,
 * fired once when the element crosses into view. `delay` staggers siblings.
 */
function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "figure";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(8px)",
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Eyebrow plus slide heading. When a heading opens with a "Label:" prefix, the
 * prefix is set as a crimson italic kicker on its own line, inside the same h2
 * so the heading still reads as one sentence.
 */
function Head({
  eyebrow,
  kicker,
  children,
}: {
  eyebrow: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className={`${MICRO} text-[var(--champagne)]`}>{eyebrow}</div>
      <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
        {kicker && (
          <>
            <span className="mb-2 block font-serif text-[1.25rem] font-normal italic leading-tight tracking-[-0.01em] text-[var(--crimson)] md:text-[1.625rem]">
              {kicker}
            </span>{" "}
          </>
        )}
        {children}
      </h2>
    </Reveal>
  );
}

/** Discussion prompt, set apart in the deck's one ruled frame. */
function Discussion({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="w-full">
      <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
        <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
        <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
          {children}
        </p>
      </aside>
    </Reveal>
  );
}

/** The question each topic closes on: an open hairline, lighter than a frame. */
function Question({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="w-full">
      <div className="mt-14 grid w-full max-w-4xl gap-3 border-t border-[var(--charcoal)]/20 pt-6 md:grid-cols-[7rem_1fr] md:gap-8">
        <div className={`${MICRO} pt-2 text-[var(--champagne)]`}>Question</div>
        <p className="font-serif text-lg italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
          {children}
        </p>
      </div>
    </Reveal>
  );
}

/** A [cite: N] marker from content.md, set as superscript source numbers. */
function Cite({ n }: { n: number[] }) {
  return (
    <sup className="ml-1 whitespace-nowrap font-mono text-[0.5em] font-normal not-italic tracking-normal text-[var(--champagne)]">
      {n.map((k, i) => (
        <React.Fragment key={k}>
          {i > 0 && ", "}
          {LISTED.has(k) ? (
            <a
              href={`#source-${k}`}
              className="underline decoration-[var(--champagne)]/40 underline-offset-2 hover:text-[var(--crimson)]"
            >
              {k}
            </a>
          ) : (
            k
          )}
        </React.Fragment>
      ))}
    </sup>
  );
}

/**
 * A number lifted from the sentence under it, set at display size with its
 * unit in small caps. `mark` turns the number crimson.
 */
function Stat({
  value,
  unit,
  mark = false,
  size = "lg",
}: {
  value: string;
  unit: string;
  mark?: boolean;
  size?: "lg" | "md";
}) {
  return (
    <div aria-hidden className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <span
        // Headings take their family from globals.css, which Tailwind's
        // font-serif does not match; borrow it so figures echo the h2s.
        style={{ fontFamily: "var(--font-serif), serif" }}
        className={`font-black leading-none tracking-[-0.04em] ${
          size === "lg"
            ? "text-[3.5rem] md:text-[4.75rem]"
            : "text-[2.75rem] md:text-[3.5rem]"
        } ${mark ? "text-[var(--crimson)]" : "text-[var(--charcoal)]"}`}
      >
        {value}
      </span>
      <span className={`${MICRO} text-[var(--charcoal-light)]/65`}>{unit}</span>
    </div>
  );
}

/** A sentence's own list, set as middot-separated mono words. */
function Terms({
  items,
  className = "mt-5",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`${className} flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--charcoal-light)]/55`}
    >
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && <span>·</span>}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Numbered cells in a hairline grid. `cols` carries the responsive column
 * classes; `mark` turns one cell crimson.
 */
function Steps({
  items,
  cols,
  mark,
  className = "mt-6",
}: {
  items: string[];
  cols: string;
  mark?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`${className} grid grid-cols-2 gap-px bg-[var(--charcoal)]/10 ${cols}`}
    >
      {items.map((item, i) => (
        <div key={item} className="bg-[var(--background)] px-4 py-4">
          <span
            className={`${MICRO} ${
              i === mark ? "text-[var(--crimson)]" : "text-[var(--champagne)]"
            }`}
          >
            {pad(i + 1)}
          </span>
          <span
            className={`mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] ${
              i === mark
                ? "text-[var(--crimson)]"
                : "text-[var(--charcoal-light)]/70"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Two labels set against each other across one rule; the right one is marked. */
function Split({
  left,
  right,
  strikeLeft = false,
  cols = "grid-cols-2",
}: {
  left: string;
  right: string;
  strikeLeft?: boolean;
  cols?: string;
}) {
  return (
    <div
      aria-hidden
      className={`grid ${cols} border-b border-[var(--charcoal)]/15 pb-3`}
    >
      <span
        className={`${MICRO} pr-4 text-[var(--charcoal-light)]/55 ${
          strikeLeft ? "[text-decoration-line:line-through]" : ""
        }`}
      >
        {left}
      </span>
      <span
        className={`${MICRO} border-l border-[var(--crimson)]/40 pl-6 text-[var(--crimson)]`}
      >
        {right}
      </span>
    </div>
  );
}

/** Caption for any figure whose proportions are illustrative only. */
function Schematic({ className = "mt-1" }: { className?: string }) {
  return (
    <figcaption
      className={`${MICRO} ${className} text-[var(--charcoal-light)]/40`}
    >
      Schematic
    </figcaption>
  );
}

/** One numbered measure: numeral, its sentence, and its own small figure. */
function Measure({
  n,
  delay,
  figure,
  children,
}: {
  n: number;
  delay: number;
  figure: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="li" delay={delay} className="block">
      <div className="grid gap-5 border-t border-[var(--charcoal)]/12 py-8 md:grid-cols-[4ch_1fr_17rem] md:items-center md:gap-10">
        <span className={`${MICRO} text-[var(--crimson)] md:self-start md:pt-2`}>
          {pad(n)}
        </span>
        <div>{children}</div>
        <div aria-hidden className="w-full max-w-[17rem]">
          {figure}
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Part divider: display numeral against a ruled margin, then the part's own
 * discussion prompt. The visible label and numeral are decorative; the h2
 * carries the full "Part N: Title" heading for assistive technology.
 */
function PartPlate({
  id,
  numeral,
  title,
  lines,
  discussion,
  quizData,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: string[];
  discussion: string;
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <Reveal>
          <div aria-hidden>
            <div className={`${MICRO} text-[var(--champagne)]`}>Part</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              {numeral}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16"
        >
          <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.5rem]">
            <span className="sr-only">{`Part ${numeral}: `}</span>
            {title}
          </h2>
          <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
          {lines.map((line, i) => (
            <p
              key={line}
              className={`${
                i === 0 ? "mt-8" : "mt-4"
              } max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl`}
            >
              {line}
            </p>
          ))}
        </Reveal>
      </div>

      <div className="w-full md:pl-[14rem]">
        <Discussion delay={280}>{discussion}</Discussion>
      </div>
    </Slide>
  );
}

/**
 * Title-slide ground: a faint net of nodes, each joined by a soft curve to its
 * nearest neighbours, drifting very slowly. Texture only; nothing to read.
 */
function Mesh() {
  const nodes = Array.from({ length: 42 }, (_, i) => [
    hash(i + 801) * 1000,
    hash(i + 907) * 720,
  ]);
  const seen = new Set<string>();
  const curves: string[] = [];
  nodes.forEach(([ax, ay], i) => {
    nodes
      .map(([bx, by], j) => [j, (ax - bx) ** 2 + (ay - by) ** 2] as const)
      .filter(([j]) => j !== i)
      .sort((p, q) => p[1] - q[1])
      .slice(0, 3)
      .forEach(([j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        const [bx, by] = nodes[j];
        const bend = (hash(i * 53 + j) - 0.5) * 0.6;
        const cx = (ax + bx) / 2 - (by - ay) * bend;
        const cy = (ay + by) / 2 + (bx - ax) * bend;
        curves.push(
          `M${ax.toFixed(1)} ${ay.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`,
        );
      });
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent_15%,black_70%)]"
    >
      <style>
        {
          "@keyframes w8-drift{from{transform:translate3d(0,0,0) rotate(0deg)}to{transform:translate3d(-2.5%,1.5%,0) rotate(1.5deg)}}"
        }
      </style>
      <svg
        viewBox="0 0 1000 720"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full motion-safe:[animation:w8-drift_48s_ease-in-out_infinite_alternate]"
        fill="none"
      >
        <path d={curves.join("")} stroke="var(--charcoal)" strokeOpacity="0.08" />
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x.toFixed(1)}
            cy={y.toFixed(1)}
            r="2"
            fill="var(--charcoal)"
            fillOpacity="0.13"
          />
        ))}
      </svg>
    </div>
  );
}

/** The Sources slide, transcribed from the "## Sources" list in content.md. */
const SOURCES: { n: number; site: string; url: string; label: string }[] =
  [
    {
      n: 1,
      site: "arxiv.org",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGFeuZld44rKJ8kIag_qEqvLxl-166OmPJM3R8fo0P2JyOba8BB6BRg4HWSIUcVNKp4hyPCtAmI5q_6DX0x-n4ByWmeyno8PuQtQ8XOdKEKiGnaOrvJ18G1yA==",
      label: "Inference emissions study",
    },
    {
      n: 2,
      site: "medium.com",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBXnScP9Bvw8nUG6Jj-ctLgZKo0DkxoUtCmLwrpU8XVl0_h8b2WopfQdwXPPlT0Wo5FHoIBy0mExsp0tCNR9ukmoKwOeKIQRTfIUkb7e7B_2xgbSWHU8D8hZ4TgADcJLftUzspnOMcwRdExoUSe7SlEz6Mw3zazqNE9YzqaA_Ik3BdTK3z7xeqmAyihZXL1KbsPNcWWiaHKLcb06lmbRBqenO-rJCLTdG27hN6r6I=",
      label: "Training carbon footprint",
    },
    {
      n: 4,
      site: "carboncredits.com",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEtuYmP0GQWO4Hb2Hf3z8ejT6DAv4OeaiaQA1fNi87ddWsns6C1-rCu4vZUyYg_DHkC8ObU8woi-KgPfBJdqk1d8gwGazAE__TsT0Si2lW6NmqkfLodCVKEkXbTyRhsc4dsQoCf-6U7LXTDWiOw2Bwk6oyJf6DMyaLFo3cO-EqLWX4SuWnjg1lmwA==",
      label: "Google 2025 Report",
    },
    {
      n: 6,
      site: "arxiv.org",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnwMRyudHshooFN9yZAAAjf6n7FWo7UtrlpiCP_TbKvbuwLGhvn2vUUvFdF1B8iBxtcoxxP_LFVeDNq2-bsQ5LBRjY-CL4uWYePfBjFg5FNPBygyImkQ==",
      label: "Making AI Less Thirsty",
    },
    {
      n: 11,
      site: "arxiv.org",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH6biHZzDvV6xG7MAKLjG2v8GqetNztIgqIxFIvM7_s0t0teB2w0_--XbcY2TTfLhbBLXPjZbEkEpPEY76zGU0SKrsoHOKBl_Q6wvpJ0ycDIihL-5rH94Y9dg==",
      label: "Life Cycle Assessment of AI",
    },
    {
      n: 19,
      site: "deepmind.google",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG4GqBECqZaTOMnQpP_NGQ9WjVSQzqvaDmwuAEWahvPa-HrW8ZD_VqyzmMTYdeQPyKuS_9A4cRoJjReRAKLq1_1-KeM1d-KNJxc2YS_zDHjrdTEAhMWkNqrvaYITWDFjoN2e4w2UsidlguHhHprchHQ5-kKCY2N1sd1aEfeR9hDRWaziY5UQLl3X5DDA-bmZ7RxlH-BnzjknlkfJJmVJg==",
      label: "GraphCast weather prediction",
    },
    {
      n: 29,
      site: "researchgate.net",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFLOUGxLrQFpGlCDb-2o6CvBx8sfqan-GOsMA39ac2FTDJKiLWPMd9I537mse_c4e8-5-0UBdGM7qldu7D2QoyLhtWTnOQOkF3G9YpAS7QiLjr1Kjw603EsZsnZDjKr4wHhlHgJJwTolFzGShh1bZ9mJaELOWvWPGyG7x6Bit-2CD3rHOSjHmHQo6wNCjJ7Brclbl-S2Wx7EzTNLMOMAZZHdmExkJt4AaOpnjlnsFjm3VK8t840wRq3Ole_mL5hv5rJuk-xflwdc9dAyKkntSMnqSTRQEbC6iFNJ9X5esxfSB0vjt-gHqDbDISqKIGQxaWVSWuhPZS-BAHQ",
      label: "Red AI vs Green AI",
    },
    {
      n: 34,
      site: "aicerts.ai",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFSiDu1nOee-d1ZEtsYB_GqLpJe1mdcfzHALV41L65_GEbCxw4mR-7Co9Wsx8SAlFZTjpUOKKdlkVJccC2Yl811jie4Bv7Of1Wxq9k8Zde8OuYDNap4RH6PAuxfJYBSvIfizQxOosffhOXXSM01wLEkE_CrvyiOhYf2Vl6D1aueo7L4sw8XWG-u5m929DFr",
      label: "Small is Sufficient",
    },
    {
      n: 48,
      site: "greensoftware.foundation",
      url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQn7PtU2LYNmqLOEHlA-QsxN08WBvI5mL2fMSEKuaBO1v51EoG8p4e_cPusNffD_llk_NjERixzTt36xxiCUiRxUccA29ywMcoOoIoWWT9VIP_fOmU_wye-Z_nTpagiZ5VDPvve5DtqnA7zqZJ2LaUF88G2nlZNvlecyP-76fpi7cQ9XBX7fwyKBD3EmVr2K6jYD4=",
      label: "EU AI Act and Sustainability",
    },
  ];

export default function Week08Sustainability() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 08" />

      {/* ==================================================================
          01 · TITLE — masthead over a faint drifting mesh; carbon
          footprints carried across to climate solutions.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <Mesh />

        <Reveal className="relative">
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 08
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.25rem,6.2vw,4.75rem)] font-black leading-[0.95] tracking-[-0.035em] text-[var(--charcoal)]">
            The Dual Nature of Artificial Intelligence:{" "}
            <span className="mt-5 block text-[0.6em] font-normal italic leading-[1.1] tracking-[-0.02em] text-[var(--crimson)]">
              Environmental Costs and Sustainable Solutions
            </span>
          </h1>
        </Reveal>

        <Reveal delay={240} className="relative w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            Exploring the complex relationship between AI and environmental
            sustainability
          </p>
        </Reveal>

        <Reveal delay={360} className="relative w-full">
          <div className="mt-10 grid max-w-4xl gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="font-serif text-lg leading-relaxed text-[var(--charcoal)] md:text-xl">
                From carbon footprints to climate solutions
              </p>
              <div aria-hidden className="mt-4 flex items-center gap-3">
                <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Carbon footprints
                </span>
                <span className="h-px flex-1 bg-[var(--crimson)]/60" />
                <span className="-ml-4 size-2 rotate-45 border-r border-t border-[var(--crimson)]" />
                <span className={`${MICRO} text-[var(--crimson)]`}>
                  Climate solutions
                </span>
              </div>
            </div>
            <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
              <p className="font-serif text-lg leading-relaxed text-[var(--charcoal)] md:text-xl">
                Strategies for a sustainable AI ecosystem
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={480} className="relative w-full">
          <div className="mt-14 flex w-full flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              Davood Wadi, PhD
            </span>
            <span
              className={`${MICRO} font-normal text-[var(--charcoal-light)]/60`}
            >
              BUSI 654 · Applications of AI in Business
            </span>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          02 · THE AI SUSTAINABILITY PARADOX — AI held between savior and
          burden; grids optimized set against resources consumed; the
          industry's road forking at a pivot point.          [quiz topic]
      ================================================================== */}
      <Slide id="paradox" border align="left">
        <Head eyebrow="Opening">The AI Sustainability Paradox</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            AI acts as both a climate savior and a significant environmental
            burden
            <Cite n={[1, 2]} />
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 92"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <path d="M40 36H385M415 36H760" stroke="var(--charcoal)" strokeOpacity="0.3" />
            <circle cx="40" cy="36" r="5" fill="var(--charcoal)" fillOpacity="0.6" />
            <circle cx="760" cy="36" r="5" fill="var(--charcoal)" fillOpacity="0.6" />
            <circle cx="400" cy="36" r="15" stroke="var(--crimson)" strokeWidth="1.5" />
            <text {...SVG_LABEL} letterSpacing={1} x="400.5" y="39.5" textAnchor="middle" fill="var(--crimson)">
              AI
            </text>
            <text {...SVG_LABEL} x="32" y="80" fill="var(--charcoal)" fillOpacity="0.7">
              CLIMATE SAVIOR
            </text>
            <text {...SVG_LABEL} x="768" y="80" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.7">
              ENVIRONMENTAL BURDEN
            </text>
          </svg>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Advanced models optimize energy grids but consume vast resources
              <Cite n={[23, 24]} />
            </p>
            <div aria-hidden className="mt-6 max-w-3xl">
              <Split
                left="Optimize energy grids"
                right="Consume vast resources"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              The industry faces a critical pivot point between &quot;Red
              AI&quot; and &quot;Green AI&quot;
              <Cite n={[29, 30]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 150"
              className="mt-8 w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="20" y="64" fill="var(--charcoal)" fillOpacity="0.6">
                THE INDUSTRY
              </text>
              <path d="M20 75H362" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
              <circle cx="370" cy="75" r="7" stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="370" y="104" textAnchor="middle" fill="var(--crimson)">
                PIVOT POINT
              </text>
              <path d="M377 72C460 38 520 26 732 26" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <path d={headRight(740, 26)} stroke="var(--charcoal)" strokeOpacity="0.65" />
              <path d="M377 78C460 112 520 124 732 124" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <path d={headRight(740, 124)} stroke="var(--charcoal)" strokeOpacity="0.65" />
              <text {...SVG_LABEL} x="740" y="12" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.75">
                RED AI
              </text>
              <text {...SVG_LABEL} x="740" y="146" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.75">
                GREEN AI
              </text>
            </svg>
          </div>
        </Reveal>

        <Question delay={560}>
          How can we reconcile these opposing forces in the era of Generative
          AI?
        </Question>
      </Slide>

      <PartPlate
        id="part-1"
        numeral="1"
        title="The Environmental Footprint"
        lines={[
          "Analyzing the hidden costs of computational power",
          "Beyond carbon: Water, hardware, and waste",
          "The shift from training to inference impact",
        ]}
        discussion="Which hidden environmental cost of AI do organizations underestimate most when they talk about sustainability?"
        quizData={quiz["part-1"]}
      />

      {/* ==================================================================
          04 · THE HIDDEN COST OF COMPUTE — operational carbon forking into
          training and inference; 550 set large; squares growing by orders
          of magnitude, dashed because "likely".
      ================================================================== */}
      <Slide id="hidden-cost" border align="left">
        <Head eyebrow="Part 1 · 01 / 08">The Hidden Cost of Compute</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Operational carbon splits into training and inference emissions
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 124"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <text {...SVG_LABEL} x="20" y="50" fill="var(--charcoal)" fillOpacity="0.7">
              OPERATIONAL CARBON
            </text>
            <path d="M20 62H320" stroke="var(--charcoal)" strokeOpacity="0.65" strokeWidth="2.5" />
            <path d="M320 62C392 62 410 26 482 26H732" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="1.5" />
            <path d={headRight(740, 26)} stroke="var(--charcoal)" strokeOpacity="0.65" />
            <path d="M320 62C392 62 410 98 482 98H732" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="1.5" />
            <path d={headRight(740, 98)} stroke="var(--charcoal)" strokeOpacity="0.65" />
            <text {...SVG_LABEL} x="492" y="14" fill="var(--charcoal)" fillOpacity="0.7">
              TRAINING EMISSIONS
            </text>
            <text {...SVG_LABEL} x="492" y="118" fill="var(--charcoal)" fillOpacity="0.7">
              INFERENCE EMISSIONS
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <Stat value="550" unit="metric tons of CO2e" />
            <p className={`${BODY} mt-6`}>
              Training a model like GPT-3 emitted over 550 metric tons of CO2e
              <Cite n={[2, 3]} />
            </p>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 400 120" className="w-full" fill="none">
                <rect x="20" y="88" width="8" height="8" fill="var(--charcoal)" fillOpacity="0.7" />
                <rect x="48" y="71" width="25" height="25" stroke="var(--charcoal)" strokeOpacity="0.5" strokeDasharray="3 3" />
                <rect x="93" y="16" width="80" height="80" stroke="var(--crimson)" strokeDasharray="4 4" />
                <text {...SVG_LABEL} x="20" y="114" fill="var(--charcoal)" fillOpacity="0.65">
                  GPT-3
                </text>
                <text {...SVG_LABEL} x="93" y="114" fill="var(--crimson)">
                  NEWER MODELS
                </text>
                <path d="M190 56H222" stroke="var(--charcoal)" strokeOpacity="0.35" />
                <text {...SVG_LABEL} x="232" y="52" fill="var(--charcoal)" fillOpacity="0.65">
                  ORDERS OF
                </text>
                <text {...SVG_LABEL} x="232" y="66" fill="var(--charcoal)" fillOpacity="0.65">
                  MAGNITUDE
                </text>
              </svg>
              <Schematic />
            </figure>
            <p className={`${BODY} mt-5`}>
              Newer models likely exceed these figures by orders of magnitude
            </p>
          </Reveal>
        </div>

        <Question delay={520}>
          Why is transparency regarding training data becoming a rarity?
        </Question>
      </Slide>

      {/* ==================================================================
          05 · INFERENCE: THE SLEEPING GIANT — lifecycle emissions with
          inference taking the majority; 29 Wh against 0.4 Wh drawn to the
          same scale.                                         [quiz topic]
      ================================================================== */}
      <Slide id="inference" border align="left">
        <Head eyebrow="Part 1 · 02 / 08" kicker="Inference:">
          The Sleeping Giant
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Inference constitutes the majority of lifecycle emissions for
            deployed models
            <Cite n={[1, 2]} />
          </p>
          <figure aria-hidden className="mt-8 w-full max-w-5xl">
            <svg viewBox="0 0 800 74" className="w-full" fill="none">
              <text {...SVG_LABEL} x="0" y="12" fill="var(--charcoal)" fillOpacity="0.6">
                LIFECYCLE EMISSIONS
              </text>
              <rect x="0" y="24" width="236" height="24" fill="var(--charcoal)" fillOpacity="0.22" />
              <rect x="240" y="24" width="560" height="24" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="240" y="68" fill="var(--crimson)">
                INFERENCE
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <div className="grid gap-8 md:grid-cols-2 md:gap-14">
              <p className={BODY}>
                Energy-intensive models consume over 29 Wh per long prompt
                <Cite n={[1]} />
              </p>
              <p className={BODY}>
                Efficient models can operate at approximately 0.4 Wh per prompt
                <Cite n={[1]} />
              </p>
            </div>
            <svg
              aria-hidden
              viewBox="0 0 800 124"
              className="mt-9 w-full"
              fill="none"
            >
              {/* 29 Wh → 700 units, so 0.4 Wh → 9.7 units */}
              <text {...SVG_LABEL} x="0" y="12" fill="var(--charcoal)" fillOpacity="0.7">
                ENERGY-INTENSIVE MODELS
              </text>
              <text {...SVG_LABEL} x="700" y="12" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.7">
                29 Wh
              </text>
              <rect x="0" y="22" width="700" height="26" fill="var(--charcoal)" fillOpacity="0.55" />
              <text {...SVG_LABEL} x="0" y="82" fill="var(--crimson)">
                EFFICIENT MODELS
              </text>
              <rect x="0" y="92" width="9.7" height="26" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="22" y="110" fill="var(--crimson)">
                0.4 Wh
              </text>
            </svg>
          </div>
        </Reveal>

        <Question delay={420}>
          How does the aggregate impact of billions of daily queries change our
          sustainability strategy?
        </Question>
      </Slide>

      {/* ==================================================================
          06 · CASE STUDY: GOOGLE'S 2025 REPORT — two figures from the report
          set large; a 60W bulb beside a stopwatch with 14 of its 60 seconds
          marked.                                     [quiz: inference]
      ================================================================== */}
      <Slide
        id="google-report"
        border
        align="left"
        quizData={quiz["google-report"]}
      >
        <Head eyebrow="Part 1 · 03 / 08" kicker="Case Study:">
          Google&apos;s 2025 Report
        </Head>

        <div className="mt-11 grid w-full max-w-5xl gap-10 md:grid-cols-3 md:gap-0">
          <Reveal delay={140} className="md:pr-10">
            <Stat value="0.24" unit="Wh" size="md" />
            <p className={`${BODY} mt-6`}>
              Median Gemini App text prompt consumes 0.24 Wh of energy
              <Cite n={[4, 5]} />
            </p>
          </Reveal>

          <Reveal
            delay={260}
            className="md:border-l md:border-[var(--charcoal)]/10 md:px-10"
          >
            <Stat value="0.03" unit="grams of CO2e" size="md" />
            <p className={`${BODY} mt-6`}>
              Emissions per prompt are roughly 0.03 grams of CO2e
              <Cite n={[4, 5]} />
            </p>
          </Reveal>

          <Reveal
            delay={380}
            className="md:border-l md:border-[var(--charcoal)]/10 md:pl-10"
          >
            <svg
              aria-hidden
              viewBox="0 0 280 132"
              className="w-full max-w-[17rem]"
              fill="none"
            >
              {/* bulb */}
              <circle cx="44" cy="46" r="24" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M34 68V84H54V68" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M34 76H54M38 90H50" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <text {...SVG_LABEL} x="0" y="124" fill="var(--charcoal)" fillOpacity="0.65">
                60W BULB
              </text>
              {/* stopwatch: 14 of 60 seconds */}
              <path d="M194 6H214M204 6V14" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <circle cx="204" cy="62" r="46" stroke="var(--charcoal)" strokeOpacity="0.45" />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
                return (
                  <path
                    key={i}
                    d={`M${(204 + 40 * Math.cos(a)).toFixed(1)} ${(62 + 40 * Math.sin(a)).toFixed(1)}L${(204 + 46 * Math.cos(a)).toFixed(1)} ${(62 + 46 * Math.sin(a)).toFixed(1)}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.35"
                  />
                );
              })}
              <path
                d={`M204 62L204 16A46 46 0 0 1 ${(204 + 46 * Math.cos((84 * Math.PI) / 180 - Math.PI / 2)).toFixed(1)} ${(62 + 46 * Math.sin((84 * Math.PI) / 180 - Math.PI / 2)).toFixed(1)}Z`}
                fill="var(--crimson)"
                fillOpacity="0.85"
              />
              <text {...SVG_LABEL} x="204" y="124" textAnchor="middle" fill="var(--crimson)">
                14 SECONDS
              </text>
            </svg>
            <p className={`${BODY} mt-6`}>
              Comparable to running a 60W light bulb for about 14 seconds
            </p>
          </Reveal>
        </div>

        <Question delay={500}>
          Is per-query efficiency enough to offset the explosive growth in
          total usage?
        </Question>
      </Slide>

      {/* ==================================================================
          07 · WATER CONSUMPTION: A CRITICAL METRIC — a rack inside its
          cooling loop; the GPT-3 estimate and the 2027 demand set large.
      ================================================================== */}
      <Slide id="water" border align="left">
        <Head eyebrow="Part 1 · 04 / 08" kicker="Water Consumption:">
          A Critical Metric
        </Head>

        <Reveal delay={140} className="w-full">
          <div className="mt-10 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_16rem] md:gap-14">
            <p className={LEAD}>
              Data centers require massive cooling systems to maintain
              operation
            </p>
            <svg
              aria-hidden
              viewBox="0 0 256 140"
              className="w-full max-w-[16rem]"
              fill="none"
            >
              <text {...SVG_LABEL} x="128" y="10" textAnchor="middle" fill="var(--crimson)">
                COOLING SYSTEMS
              </text>
              <rect x="52" y="20" width="152" height="96" rx="22" stroke="var(--crimson)" strokeDasharray="4 4" />
              <path d={headRight(136, 20)} stroke="var(--crimson)" />
              <path d={headLeft(120, 116)} stroke="var(--crimson)" />
              <rect x="94" y="38" width="68" height="60" stroke="var(--charcoal)" strokeOpacity="0.6" />
              {[52, 66, 80].map((y) => (
                <g key={y}>
                  <path d={`M102 ${y}H144`} stroke="var(--charcoal)" strokeOpacity="0.35" />
                  <circle cx="152" cy={y} r="2" fill="var(--charcoal)" fillOpacity="0.5" />
                </g>
              ))}
              <text {...SVG_LABEL} x="128" y="136" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                DATA CENTERS
              </text>
            </svg>
          </div>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <Stat value="~700,000" unit="liters" size="md" />
            <p className={`${BODY} mt-6`}>
              Early estimates: GPT-3 training consumed ~700,000 liters of
              freshwater
              <Cite n={[1, 6]} />
            </p>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <Stat value="6.6 billion" unit="cubic meters" size="md" mark />
            <p className={`${BODY} mt-6`}>
              Global AI water demand could reach 6.6 billion cubic meters by
              2027
              <Cite n={[1, 6]} />
            </p>
          </Reveal>
        </div>

        <Question delay={520}>
          What are the ethical implications of data centers in water-scarce
          regions?
        </Question>
      </Slide>

      {/* ==================================================================
          08 · THE "BOTTLES OF WATER" DEBATE — a dashed bottle for the
          debated metric beside five drops for the reported one; efficiency
          and scale pulling against each other.            [quiz: water]
      ================================================================== */}
      <Slide id="bottles" border align="left" quizData={quiz["bottles"]}>
        <Head eyebrow="Part 1 · 05 / 08">
          The &quot;Bottles of Water&quot; Debate
        </Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="w-full max-w-[24rem]"
              fill="none"
            >
              <rect x="186" y="6" width="28" height="12" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <path
                d="M190 18V32C190 42 164 48 164 64V136C164 141 168 145 173 145H227C232 145 236 141 236 136V64C236 48 210 42 210 32V18"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeDasharray="4 4"
              />
              <path d="M164 84H236" stroke="var(--charcoal)" strokeOpacity="0.2" />
            </svg>
            <p className={`${BODY} mt-6`}>
              Studies debate the metric of &quot;bottles of water per
              conversation&quot;
              <Cite n={[7, 8]} />
            </p>
          </Reveal>

          <Reveal delay={260} className={COL_RULE}>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="w-full max-w-[24rem]"
              fill="none"
            >
              <text {...SVG_LABEL} x="200" y="104" textAnchor="middle" fill="var(--crimson)">
                0.26 mL
              </text>
              {[152, 176, 200, 224, 248].map((cx) => (
                <path
                  key={cx}
                  d={`M${cx} 121C${cx} 121 ${cx + 7} 131 ${cx + 7} 137A7 7 0 0 1 ${cx - 7} 137C${cx - 7} 131 ${cx} 121 ${cx} 121Z`}
                  fill="var(--crimson)"
                />
              ))}
            </svg>
            <p className={`${BODY} mt-6`}>
              Google reports 0.26 mL (five drops) per median query due to
              efficiency
              <Cite n={[4, 5]} />
            </p>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 76"
              className="w-full"
              fill="none"
            >
              <path d="M392 30H48" stroke="var(--crimson)" strokeWidth="2" />
              <path d={headLeft(40, 30)} stroke="var(--crimson)" strokeWidth="2" />
              <path d="M408 30H752" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="2" />
              <path d={headRight(760, 30)} stroke="var(--charcoal)" strokeOpacity="0.7" strokeWidth="2" />
              <path d="M400 14V46" stroke="var(--charcoal)" strokeOpacity="0.5" />
              <text {...SVG_LABEL} x="40" y="68" fill="var(--crimson)">
                EFFICIENCY GAINS
              </text>
              <text {...SVG_LABEL} x="760" y="68" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.7">
                SCALE OF DEPLOYMENT
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Efficiency gains fight against the sheer scale of deployment
            </p>
          </div>
        </Reveal>

        <Question delay={540}>
          How do we effectively communicate water impact to end-users?
        </Question>
      </Slide>

      {/* ==================================================================
          09 · HARDWARE LIFECYCLE AND EMBODIED CARBON — the embodied
          footprint bracketed over three stations, manufacturing marked;
          Compute Carbon Intensity cut to a third.
      ================================================================== */}
      <Slide id="hardware" border align="left">
        <Head eyebrow="Part 1 · 06 / 08">
          Hardware Lifecycle and Embodied Carbon
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            &quot;Embodied footprint&quot; includes extraction, manufacturing,
            and disposal
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 112"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <text {...SVG_LABEL} x="400" y="10" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.6">
              EMBODIED FOOTPRINT
            </text>
            <path d="M40 30V22H760V30" stroke="var(--charcoal)" strokeOpacity="0.35" />
            <path d="M48 64H212M228 64H392M408 64H572M588 64H752" stroke="var(--charcoal)" strokeOpacity="0.4" />
            <path d={headRight(220, 64)} stroke="var(--charcoal)" strokeOpacity="0.55" />
            <path d={headRight(580, 64)} stroke="var(--charcoal)" strokeOpacity="0.55" />
            <circle cx="40" cy="64" r="7" stroke="var(--charcoal)" strokeOpacity="0.6" />
            <circle cx="400" cy="64" r="8" fill="var(--crimson)" />
            <circle cx="760" cy="64" r="7" stroke="var(--charcoal)" strokeOpacity="0.6" />
            <text {...SVG_LABEL} x="33" y="100" fill="var(--charcoal)" fillOpacity="0.7">
              EXTRACTION
            </text>
            <text {...SVG_LABEL} x="400" y="100" textAnchor="middle" fill="var(--crimson)">
              MANUFACTURING
            </text>
            <text {...SVG_LABEL} x="767" y="100" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.7">
              DISPOSAL
            </text>
          </svg>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Manufacturing AI accelerators is chemically intensive and
              energy-demanding
              <Cite n={[11, 12]} />
            </p>
            <Terms items={["chemically intensive", "energy-demanding"]} />
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              2025 LCA shows efficiency gains can improve Compute Carbon
              Intensity by 3x
              <Cite n={[11]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 104"
              className="mt-8 w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="12" fill="var(--charcoal)" fillOpacity="0.65">
                COMPUTE CARBON INTENSITY
              </text>
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={i * 202}
                  y="24"
                  width="198"
                  height="24"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                />
              ))}
              <rect x="0" y="64" width="198" height="24" fill="var(--crimson)" />
              <path d="M202 76H598" stroke="var(--charcoal)" strokeOpacity="0.3" strokeDasharray="3 4" />
              <text {...SVG_LABEL} x="612" y="81" fill="var(--crimson)">
                3x · EFFICIENCY GAINS
              </text>
            </svg>
          </div>
        </Reveal>

        <Question delay={560}>
          Should hardware longevity be prioritized over peak performance?
        </Question>
      </Slide>

      {/* ==================================================================
          10 · THE E-WASTE CHALLENGE — two service lives from one start, the
          AI hardware line ending first; 62 million tonnes set large; a chip
          with its hazardous contents named.
      ================================================================== */}
      <Slide id="e-waste" border align="left">
        <Head eyebrow="Part 1 · 07 / 08">The E-Waste Challenge</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            AI hardware becomes obsolete faster than general-purpose servers
            <Cite n={[13, 15]} />
          </p>
          <figure aria-hidden className="mt-8 w-full max-w-5xl">
            <svg viewBox="0 0 800 106" className="w-full" fill="none">
              <path d="M0.5 22V100" stroke="var(--charcoal)" strokeOpacity="0.25" />
              <text {...SVG_LABEL} x="14" y="16" fill="var(--charcoal)" fillOpacity="0.65">
                GENERAL-PURPOSE SERVERS
              </text>
              <path d="M0 34H720" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="2" />
              <path d="M720 24V44" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="2" />
              <text {...SVG_LABEL} x="720" y="16" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.65">
                OBSOLETE
              </text>
              <text {...SVG_LABEL} x="14" y="72" fill="var(--crimson)">
                AI HARDWARE
              </text>
              <path d="M0 88H340" stroke="var(--crimson)" strokeWidth="2" />
              <path d="M340 78V98" stroke="var(--crimson)" strokeWidth="2" />
              <text {...SVG_LABEL} x="340" y="72" textAnchor="end" fill="var(--crimson)">
                OBSOLETE
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <Stat value="62 million" unit="tonnes" size="md" />
            <p className={`${BODY} mt-6`}>
              Global e-waste reached 62 million tonnes in 2022
              <Cite n={[16]} />
            </p>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <svg
              aria-hidden
              viewBox="0 0 400 104"
              className="w-full"
              fill="none"
            >
              <rect x="24" y="16" width="72" height="72" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <rect x="44" y="36" width="32" height="32" fill="var(--crimson)" />
              {[0, 1, 2, 3, 4].map((i) => (
                <path
                  key={i}
                  d={`M${32 + i * 14} 16V6M${32 + i * 14} 88V98M24 ${24 + i * 14}H14M96 ${24 + i * 14}H106`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
              ))}
              <path d="M116 40H136M116 64H136" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <text {...SVG_LABEL} x="146" y="44" fill="var(--charcoal)" fillOpacity="0.7">
                HAZARDOUS MATERIALS
              </text>
              <text {...SVG_LABEL} x="146" y="68" fill="var(--charcoal)" fillOpacity="0.7">
                RARE EARTH ELEMENTS
              </text>
            </svg>
            <p className={`${BODY} mt-6`}>
              Specialized chips contain hazardous materials and rare earth
              elements
              <Cite n={[16, 17]} />
            </p>
          </Reveal>
        </div>

        <Question delay={520}>
          What policy mechanisms could enforce better recycling rates for AI
          hardware?
        </Question>
      </Slide>

      {/* ==================================================================
          11 · DATA CENTER INNOVATION — the two liquid-cooling forms drawn
          side by side; cooling energy with up to 40% cut away, to scale;
          WUE and PUE on one balance.                        [quiz topic]
      ================================================================== */}
      <Slide id="data-center" border align="left">
        <Head eyebrow="Part 1 · 08 / 08">Data Center Innovation</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Shift toward liquid cooling: Direct-to-chip or immersion cooling
            <Cite n={[5]} />
          </p>
          <div
            aria-hidden
            className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14"
          >
            <svg viewBox="0 0 360 136" className="w-full" fill="none">
              <path d="M40 112H320" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <rect x="140" y="88" width="80" height="24" fill="var(--charcoal)" fillOpacity="0.6" />
              <rect x="128" y="70" width="104" height="18" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d="M20 44H150V62" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d={headDown(150, 69)} stroke="var(--crimson)" strokeWidth="1.5" />
              <path d="M210 70V44H332" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d={headRight(340, 44)} stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="180" y="132" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.7">
                DIRECT-TO-CHIP
              </text>
            </svg>
            <svg viewBox="0 0 360 136" className="w-full" fill="none">
              <rect x="90" y="44" width="180" height="68" fill="var(--crimson)" fillOpacity="0.1" />
              <path d="M90 44H270" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d="M90 14V112H270V14" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
              {[132, 172, 212].map((x) => (
                <rect key={x} x={x} y="58" width="16" height="44" fill="var(--charcoal)" fillOpacity="0.6" />
              ))}
              <text {...SVG_LABEL} x="180" y="132" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.7">
                IMMERSION COOLING
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              DeepMind-style optimization reduces cooling energy by up to 40%
              <Cite n={[18]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 84"
              className="mt-8 w-full"
              fill="none"
            >
              {/* the whole bar is cooling energy; 40% of 800 is 320 */}
              <text {...SVG_LABEL} x="0" y="12" fill="var(--charcoal)" fillOpacity="0.65">
                COOLING ENERGY
              </text>
              <rect x="0" y="24" width="476" height="26" fill="var(--charcoal)" fillOpacity="0.5" />
              <rect x="480.5" y="24.5" width="319" height="25" stroke="var(--crimson)" strokeDasharray="4 4" />
              <text {...SVG_LABEL} x="800" y="76" textAnchor="end" fill="var(--crimson)">
                UP TO 40%
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Balancing Water Usage Effectiveness (WUE) against Power Usage
              Effectiveness (PUE)
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 132"
              className="mt-8 w-full"
              fill="none"
            >
              <path d="M160 30H640" stroke="var(--charcoal)" strokeOpacity="0.65" strokeWidth="2" />
              <path d="M400 30L382 62H418Z" fill="var(--crimson)" />
              <path d="M356 62H444" stroke="var(--charcoal)" strokeOpacity="0.35" />
              {[160, 640].map((x) => (
                <g key={x}>
                  <path d={`M${x} 30L${x - 44} 86M${x} 30L${x + 44} 86`} stroke="var(--charcoal)" strokeOpacity="0.35" />
                  <path d={`M${x - 52} 86H${x + 52}`} stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="2" />
                </g>
              ))}
              {[
                { x: 160, short: "WUE", long: "WATER USAGE EFFECTIVENESS" },
                { x: 640, short: "PUE", long: "POWER USAGE EFFECTIVENESS" },
              ].map((p) => (
                <g key={p.short}>
                  <text
                    x={p.x}
                    y="80"
                    textAnchor="middle"
                    fontSize="17"
                    fontFamily="var(--font-serif), serif"
                    fontWeight="700"
                    fill="var(--charcoal)"
                  >
                    {p.short}
                  </text>
                  <text {...SVG_LABEL} x={p.x} y="112" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.6">
                    {p.long}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Reveal>

        <Question delay={560}>
          Can data centers ever become truly &quot;net-positive&quot; for their
          local environments?
        </Question>
      </Slide>

      <PartPlate
        id="part-2"
        numeral="2"
        title="AI for Climate Mitigation"
        lines={[
          "Leveraging pattern recognition for the planet",
          "Weather forecasting and disaster warning",
          "Optimizing renewable energy systems",
        ]}
        discussion="Where do you see the strongest near-term business case for using AI as a climate mitigation tool?"
        quizData={quiz["part-2"]}
      />

      {/* ==================================================================
          13 · REVOLUTIONIZING WEATHER PREDICTION — NWP set against AI; ten
          day cells under one arrow; a 0.25-degree lattice whose nodes are
          joined as a graph.                                 [quiz topic]
      ================================================================== */}
      <Slide id="weather" border align="left">
        <Head eyebrow="Part 2 · 01 / 04">Revolutionizing Weather Prediction</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            AI outperforms traditional Numerical Weather Prediction (NWP) in
            speed and efficiency
          </p>
          <div aria-hidden className="mt-7 max-w-3xl">
            <Split left="Numerical Weather Prediction (NWP)" right="AI" />
          </div>
          <Terms items={["speed", "efficiency"]} />
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              GraphCast: Predicts weather 10 days in advance with high accuracy
              <Cite n={[19]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 96"
              className="mt-7 w-full"
              fill="none"
            >
              <path d="M0 20H388" stroke="var(--crimson)" strokeWidth="2" />
              <path d={headRight(396, 20)} stroke="var(--crimson)" strokeWidth="2" />
              {Array.from({ length: 10 }).map((_, i) => (
                <g key={i}>
                  <rect x={i * 40 + 0.5} y="34.5" width="36" height="30" stroke="var(--charcoal)" strokeOpacity="0.3" />
                  <text {...SVG_LABEL} letterSpacing={1} x={i * 40 + 19} y="53" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.55">
                    {pad(i + 1)}
                  </text>
                </g>
              ))}
              <text {...SVG_LABEL} x="0" y="90" fill="var(--crimson)">
                10 DAYS IN ADVANCE
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Operates at 0.25-degree resolution using Graph Neural Networks
              <Cite n={[19]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="mt-7 w-full"
              fill="none"
            >
              <rect x="164" y="44" width="36" height="30" fill="var(--crimson)" fillOpacity="0.85" />
              {Array.from({ length: 11 }).map((_, c) => (
                <path key={`v${c}`} d={`M${20 + c * 36} 14V104`} stroke="var(--charcoal)" strokeOpacity="0.14" />
              ))}
              {Array.from({ length: 4 }).map((_, r) => (
                <path key={`h${r}`} d={`M20 ${14 + r * 30}H380`} stroke="var(--charcoal)" strokeOpacity="0.14" />
              ))}
              {Array.from({ length: 30 }).map((_, i) => {
                const c = i % 10;
                const r = Math.floor(i / 10);
                if (hash(i + 120) < 0.45) return null;
                const up = hash(i + 170) < 0.5;
                return (
                  <path
                    key={`e${i}`}
                    d={
                      up
                        ? `M${20 + c * 36} ${44 + r * 30}L${56 + c * 36} ${14 + r * 30}`
                        : `M${20 + c * 36} ${14 + r * 30}L${56 + c * 36} ${44 + r * 30}`
                    }
                    stroke="var(--charcoal)"
                    strokeOpacity="0.4"
                  />
                );
              })}
              {Array.from({ length: 44 }).map((_, i) => (
                <circle
                  key={`n${i}`}
                  cx={20 + (i % 11) * 36}
                  cy={14 + Math.floor(i / 11) * 30}
                  r="2.2"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                />
              ))}
              <text {...SVG_LABEL} x="20" y="126" fill="var(--crimson)">
                0.25-DEGREE RESOLUTION
              </text>
              <text {...SVG_LABEL} x="20" y="144" fill="var(--charcoal)" fillOpacity="0.6">
                GRAPH NEURAL NETWORKS
              </text>
            </svg>
          </Reveal>
        </div>

        <Question delay={520}>
          How does faster disaster prediction translate to tangible lives
          saved?
        </Question>
      </Slide>

      {/* ==================================================================
          14 · FOURCASTNET AND GEOMETRIC ML — waves wrapped on a sphere; an
          ensemble of forecast paths, the few that cross into extreme weather
          marked; supercomputers struck for a few GPUs.  [quiz: weather]
      ================================================================== */}
      <Slide
        id="fourcastnet"
        border
        align="left"
        quizData={quiz["fourcastnet"]}
      >
        <Head eyebrow="Part 2 · 02 / 04">FourCastNet and Geometric ML</Head>

        <Reveal delay={140} className="w-full">
          <div className="mt-10 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_12rem] md:gap-14">
            <p className={LEAD}>
              NVIDIA&apos;s FourCastNet v3 uses Spherical Fourier Neural
              Operators
              <Cite n={[20, 21]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 192 150"
              className="w-full max-w-[12rem]"
              fill="none"
            >
              <defs>
                <clipPath id="w8-sphere">
                  <circle cx="96" cy="75" r="66" />
                </clipPath>
              </defs>
              <g clipPath="url(#w8-sphere)">
                {Array.from({ length: 7 }).map((_, k) => {
                  const y0 = 21 + k * 18;
                  const lat = Math.cos(((y0 - 75) / 66) * (Math.PI / 2));
                  const d = Array.from({ length: 40 }, (_, j) => {
                    const x = 26 + j * 3.6;
                    const y = y0 + Math.sin(x / (7 + k * 1.5) + k) * 5 * lat;
                    return `${j ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join("");
                  return (
                    <path
                      key={k}
                      d={d}
                      stroke={k === 3 ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={k === 3 ? 1 : 0.35}
                      strokeWidth={k === 3 ? 1.5 : 1}
                    />
                  );
                })}
              </g>
              <circle cx="96" cy="75" r="66" stroke="var(--charcoal)" strokeOpacity="0.55" />
            </svg>
          </div>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Enables rapid ensemble forecasting to predict extreme weather
              probabilities
              <Cite n={[21]} />
            </p>
            <figure aria-hidden className="mt-8 w-full">
              <svg viewBox="0 0 800 176" className="w-full" fill="none">
                <path d="M20 48H780" stroke="var(--crimson)" strokeOpacity="0.6" strokeDasharray="5 5" />
                <text {...SVG_LABEL} x="20" y="36" fill="var(--crimson)">
                  EXTREME WEATHER
                </text>
                {Array.from({ length: 14 }).map((_, k) => {
                  const end = 20 + k * 11 + (hash(k + 60) - 0.5) * 4;
                  const mid = (128 + end) / 2 + (hash(k + 90) - 0.5) * 16;
                  const hot = k < 3;
                  return (
                    <path
                      key={k}
                      d={`M20 128C300 128 460 ${mid.toFixed(1)} 780 ${end.toFixed(1)}`}
                      stroke={hot ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={hot ? 0.9 : 0.3}
                      strokeWidth={hot ? 1.5 : 1}
                    />
                  );
                })}
                <circle cx="20" cy="128" r="4" fill="var(--charcoal)" />
                <text {...SVG_LABEL} x="20" y="160" fill="var(--charcoal)" fillOpacity="0.65">
                  ENSEMBLE FORECASTING
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <div aria-hidden className="max-w-3xl">
              <Split left="Supercomputers" right="A few GPUs" strikeLeft />
            </div>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Democratizes forecasting: Runs on a few GPUs instead of
              supercomputers
              <Cite n={[22]} />
            </p>
          </div>
        </Reveal>

        <Question delay={560}>
          What new applications emerge when weather forecasting becomes
          accessible to smaller organizations?
        </Question>
      </Slide>

      {/* ==================================================================
          15 · OPTIMIZING RENEWABLE ENERGY — uneven solar and wind lines fed
          into one steady grid line; a forecast tracing the irradiance it
          predicts; one learner managing two unlike stores.  [quiz topic]
      ================================================================== */}
      <Slide id="renewable" border align="left">
        <Head eyebrow="Part 2 · 03 / 04">Optimizing Renewable Energy</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Integrating variable sources like wind and solar into the grid
          </p>
          <figure aria-hidden className="mt-8 w-full max-w-5xl">
            <svg viewBox="0 0 800 150" className="w-full" fill="none">
              <text {...SVG_LABEL} x="20" y="12" fill="var(--charcoal)" fillOpacity="0.65">
                SOLAR
              </text>
              <path
                d={Array.from({ length: 101 }, (_, j) => {
                  const x = 20 + j * 5;
                  const y = 66 - 40 * Math.max(0, Math.sin(((x - 20) / 125) * Math.PI));
                  return `${j ? "L" : "M"}${x} ${y.toFixed(1)}`;
                }).join("")}
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <path
                d={Array.from({ length: 26 }, (_, j) => {
                  const y = 110 + (hash(j + 300) - 0.5) * 34;
                  return `${j ? "L" : "M"}${20 + j * 20} ${y.toFixed(1)}`;
                }).join("")}
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <text {...SVG_LABEL} x="20" y="146" fill="var(--charcoal)" fillOpacity="0.65">
                WIND
              </text>
              <path d="M530 66C574 66 580 88 604 88M530 110C574 110 580 88 604 88" stroke="var(--charcoal)" strokeOpacity="0.4" />
              <path d={headRight(612, 88)} stroke="var(--charcoal)" strokeOpacity="0.55" />
              <path d="M622 88H780" stroke="var(--crimson)" strokeWidth="3" />
              <text {...SVG_LABEL} x="780" y="72" textAnchor="end" fill="var(--crimson)">
                THE GRID
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              AI predicts solar irradiance and wind speeds with high precision
              <Cite n={[23]} />
            </p>
            <figure aria-hidden className="mt-7 w-full">
              <svg viewBox="0 0 400 120" className="w-full" fill="none">
                {[
                  { seed: 500, amp: 14, color: "var(--charcoal)", op: 0.5, dash: undefined },
                  { seed: 540, amp: 5, color: "var(--crimson)", op: 1, dash: "5 4" },
                ].map((s) => (
                  <path
                    key={s.seed}
                    d={Array.from({ length: 21 }, (_, i) => {
                      const y = 74 - 44 * Math.sin((i / 20) * Math.PI) + (hash(i + s.seed) - 0.5) * s.amp;
                      return `${i ? "L" : "M"}${10 + i * 19} ${y.toFixed(1)}`;
                    }).join("")}
                    stroke={s.color}
                    strokeOpacity={s.op}
                    strokeWidth="1.5"
                    strokeDasharray={s.dash}
                  />
                ))}
                <text {...SVG_LABEL} x="10" y="112" fill="var(--charcoal)" fillOpacity="0.6">
                  SOLAR IRRADIANCE
                </text>
                <text {...SVG_LABEL} x="392" y="112" textAnchor="end" fill="var(--crimson)">
                  HIGH PRECISION
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Reinforcement Learning manages Hybrid Energy Storage Systems
              (HESS)
              <Cite n={[23, 24]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 136"
              className="mt-7 w-full"
              fill="none"
            >
              <rect x="80" y="4" width="240" height="30" stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="200" y="23" textAnchor="middle" fill="var(--crimson)">
                REINFORCEMENT LEARNING
              </text>
              <path d="M200 34V52M130 70V52H270V70" stroke="var(--crimson)" strokeOpacity="0.7" />
              <path d={headDown(130, 78)} stroke="var(--crimson)" strokeOpacity="0.8" />
              <path d={headDown(270, 78)} stroke="var(--crimson)" strokeOpacity="0.8" />
              <rect x="96" y="82" width="68" height="30" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <rect x="164" y="91" width="5" height="12" fill="var(--charcoal)" fillOpacity="0.6" />
              <rect x="100" y="86" width="44" height="22" fill="var(--charcoal)" fillOpacity="0.35" />
              <rect x="226" y="82" width="88" height="30" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <rect x="314" y="91" width="5" height="12" fill="var(--charcoal)" fillOpacity="0.6" />
              <rect x="230" y="86" width="22" height="22" fill="var(--charcoal)" fillOpacity="0.35" />
              <text {...SVG_LABEL} x="200" y="132" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                HESS
              </text>
            </svg>
          </Reveal>
        </div>

        <Question delay={520}>
          Can AI be the key factor that allows grids to run on 100% renewable
          energy?
        </Question>
      </Slide>

      {/* ==================================================================
          16 · PRECISION AGRICULTURE — yield up, inputs and water down; a
          satellite over a field whose cells take different rates, sensors
          set in the soil; emitters each giving their own measure.
                                                    [quiz: renewable]
      ================================================================== */}
      <Slide
        id="agriculture"
        border
        align="left"
        quizData={quiz["agriculture"]}
      >
        <Head eyebrow="Part 2 · 04 / 04">Precision Agriculture</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Maximizing yield while minimizing chemical inputs and water usage
          </p>
          <div
            aria-hidden
            className="mt-7 grid max-w-3xl grid-cols-3 border-y border-[var(--charcoal)]/15"
          >
            {[
              { label: "Yield", up: true },
              { label: "Chemical inputs", up: false },
              { label: "Water usage", up: false },
            ].map((m, i) => (
              <div
                key={m.label}
                className={`flex items-center gap-3 py-4 ${
                  i ? "border-l border-[var(--charcoal)]/10 pl-5" : ""
                }`}
              >
                <span
                  className={`font-mono text-xl leading-none ${
                    m.up
                      ? "text-[var(--crimson)]"
                      : "text-[var(--charcoal-light)]/60"
                  }`}
                >
                  {m.up ? "↑" : "↓"}
                </span>
                <span
                  className={`${MICRO} ${
                    m.up
                      ? "text-[var(--crimson)]"
                      : "text-[var(--charcoal-light)]/60"
                  }`}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Analysis of satellite imagery and soil sensors for Variable Rate
              Technology
              <Cite n={[26, 28]} />
            </p>
            <figure aria-hidden className="mt-7 w-full">
              <svg viewBox="0 0 400 176" className="w-full" fill="none">
                <rect x="184" y="6" width="32" height="18" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <rect x="150" y="11" width="30" height="8" fill="var(--charcoal)" fillOpacity="0.3" />
                <rect x="220" y="11" width="30" height="8" fill="var(--charcoal)" fillOpacity="0.3" />
                <path d="M200 26L40 70M200 26L360 70" stroke="var(--charcoal)" strokeOpacity="0.25" strokeDasharray="3 4" />
                {Array.from({ length: 30 }).map((_, i) => (
                  <rect
                    key={i}
                    x={40 + (i % 10) * 32}
                    y={72 + Math.floor(i / 10) * 22}
                    width="30"
                    height="20"
                    fill="var(--crimson)"
                    fillOpacity={(0.1 + hash(i + 640) * 0.7).toFixed(2)}
                  />
                ))}
                {[88, 216, 312].map((x) => (
                  <g key={x}>
                    <path d={`M${x} 136V150`} stroke="var(--charcoal)" strokeOpacity="0.6" />
                    <circle cx={x} cy="152" r="2.5" fill="var(--charcoal)" />
                  </g>
                ))}
                <text {...SVG_LABEL} x="40" y="172" fill="var(--crimson)">
                  VARIABLE RATE TECHNOLOGY
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Smart irrigation systems optimize water delivery in real-time
              <Cite n={[27]} />
            </p>
            <figure aria-hidden className="mt-7 w-full">
              <svg viewBox="0 0 400 130" className="w-full" fill="none">
                <path d="M20 30H380" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="3" />
                {Array.from({ length: 6 }).map((_, i) => {
                  const cx = 50 + i * 60;
                  const r = 2.5 + hash(i + 700) * 5;
                  const top = 48;
                  return (
                    <g key={i}>
                      <rect x={cx - 3} y="30" width="6" height="8" fill="var(--charcoal)" fillOpacity="0.6" />
                      <path
                        d={`M${cx} ${top}C${cx} ${top} ${(cx + r).toFixed(1)} ${(top + 1.4 * r).toFixed(1)} ${(cx + r).toFixed(1)} ${(top + 2.1 * r).toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${(cx - r).toFixed(1)} ${(top + 2.1 * r).toFixed(1)}C${(cx - r).toFixed(1)} ${(top + 1.4 * r).toFixed(1)} ${cx} ${top} ${cx} ${top}Z`}
                        fill="var(--crimson)"
                      />
                    </g>
                  );
                })}
                <path d="M20 100H380" stroke="var(--charcoal)" strokeOpacity="0.2" />
                <text {...SVG_LABEL} x="380" y="124" textAnchor="end" fill="var(--crimson)">
                  REAL-TIME
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>

        <Question delay={520}>
          How can we ensure smallholder farmers have access to these advanced
          tools?
        </Question>
      </Slide>

      <PartPlate
        id="part-3"
        numeral="3"
        title="The Shift to Green AI"
        lines={[
          "Prioritizing efficiency alongside accuracy",
          "Architectural innovations and model compression",
          "The rise of Small Language Models",
        ]}
        discussion="What would need to change inside most organizations for efficiency to matter as much as accuracy in AI selection?"
      />

      {/* ==================================================================
          18 · RED AI VS. GREEN AI — performance bought step by step along a
          flattening cost curve; an evaluation table where carbon efficiency
          is primary; progress and consumption untied.       [quiz topic]
      ================================================================== */}
      <Slide id="red-green" border align="left">
        <Head eyebrow="Part 3 · 01 / 05">Red AI vs. Green AI</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Red AI: Buying performance with massive computational cost
              <Cite n={[29, 30]} />
            </p>
            <figure aria-hidden className="mt-7 w-full">
              <svg viewBox="0 0 400 172" className="w-full" fill="none">
                <path d="M40 14V140H392" stroke="var(--charcoal)" strokeOpacity="0.3" />
                <text {...SVG_LABEL} x="50" y="18" fill="var(--charcoal)" fillOpacity="0.6">
                  PERFORMANCE
                </text>
                <text {...SVG_LABEL} x="392" y="164" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.6">
                  COMPUTATIONAL COST
                </text>
                <path
                  d={Array.from({ length: 35 }, (_, j) => {
                    const x = 40 + j * 10;
                    const y = 140 - 104 * (1 - Math.exp(-(x - 40) / 80));
                    return `${j ? "L" : "M"}${x} ${y.toFixed(1)}`;
                  }).join("")}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
                {[80, 150, 250, 370].map((x, i) => (
                  <circle
                    key={x}
                    cx={x}
                    cy={(140 - 104 * (1 - Math.exp(-(x - 40) / 80))).toFixed(1)}
                    r={i === 3 ? 5 : 3.5}
                    fill={i === 3 ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={i === 3 ? 1 : 0.6}
                  />
                ))}
              </svg>
              <Schematic />
            </figure>
          </Reveal>

          <Reveal delay={260} className={COL_RULE}>
            <p className={BODY}>
              Green AI: Treating carbon efficiency as a primary evaluation
              metric
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 172"
              className="mt-7 w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="34" fill="var(--charcoal)" fillOpacity="0.55">
                EVALUATION METRIC
              </text>
              <text {...SVG_LABEL} x="400" y="34" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.55">
                PRIMARY
              </text>
              <path d="M0 48H400" stroke="var(--charcoal)" strokeOpacity="0.4" />
              <text {...SVG_LABEL} x="0" y="86" fill="var(--charcoal)" fillOpacity="0.75">
                ACCURACY
              </text>
              <path d="M358 80l6 6l12-13" stroke="var(--charcoal)" strokeOpacity="0.7" strokeWidth="2" />
              <path d="M0 108H400" stroke="var(--charcoal)" strokeOpacity="0.12" />
              <text {...SVG_LABEL} x="0" y="140" fill="var(--crimson)">
                CARBON EFFICIENCY
              </text>
              <path d="M358 134l6 6l12-13" stroke="var(--crimson)" strokeWidth="2" />
              <path d="M0 162H400" stroke="var(--charcoal)" strokeOpacity="0.12" />
            </svg>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 112"
              className="w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="14" fill="var(--crimson)">
                AI PROGRESS
              </text>
              <path d="M0 30H792" stroke="var(--crimson)" strokeWidth="2" />
              <path d={headRight(800, 30)} stroke="var(--crimson)" strokeWidth="2" />
              <path d="M0 80H792" stroke="var(--charcoal)" strokeOpacity="0.5" strokeWidth="2" />
              <path d={headRight(800, 80)} stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="2" />
              <text {...SVG_LABEL} x="0" y="106" fill="var(--charcoal)" fillOpacity="0.65">
                EXPONENTIAL RESOURCE CONSUMPTION
              </text>
              {[40, 100, 160, 220, 280].map((x) => (
                <path key={x} d={`M${x} 34V76`} stroke="var(--charcoal)" strokeOpacity="0.45" />
              ))}
              <path d="M336 34V50M336 64V76" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d="M326 60l20-12M326 66l20-12" stroke="var(--crimson)" strokeWidth="1.5" />
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Decoupling AI progress from exponential resource consumption
            </p>
          </div>
        </Reveal>

        <Question delay={540}>
          What cultural shifts in research are needed to value efficiency as
          much as accuracy?
        </Question>
      </Slide>

      {/* ==================================================================
          19 · MODEL COMPRESSION TECHNIQUES — three measures, each with its
          own figure: 32 cells cut to 4; a network thinned to a sparse one;
          a large teacher passing to a small student.
                                                    [quiz: red-green]
      ================================================================== */}
      <Slide
        id="compression"
        border
        align="left"
        quizData={quiz["compression"]}
      >
        <Head eyebrow="Part 3 · 02 / 05">Model Compression Techniques</Head>

        <ol className="mt-10 w-full max-w-5xl">
          <Measure
            n={1}
            delay={140}
            figure={
              <svg viewBox="0 0 280 84" className="w-full" fill="none">
                <text {...SVG_LABEL} x="0" y="10" fill="var(--charcoal)" fillOpacity="0.6">
                  32-BIT
                </text>
                {Array.from({ length: 32 }).map((_, i) => (
                  <rect key={i} x={i * 8.75} y="18" width="7" height="16" fill="var(--charcoal)" fillOpacity="0.45" />
                ))}
                <text {...SVG_LABEL} x="0" y="58" fill="var(--crimson)">
                  4-BIT
                </text>
                {Array.from({ length: 4 }).map((_, i) => (
                  <rect key={i} x={i * 8.75} y="66" width="7" height="16" fill="var(--crimson)" />
                ))}
              </svg>
            }
          >
            <p className={BODY}>
              <span className="font-bold">Quantization:</span> Reducing
              precision (e.g., 32-bit to 4-bit) to save energy
            </p>
          </Measure>

          <Measure
            n={2}
            delay={240}
            figure={
              <svg viewBox="0 0 280 118" className="w-full" fill="none">
                {(() => {
                  const layers = [
                    [20, 50, 80].map((y) => [30, y]),
                    [12, 38, 64, 90].map((y) => [140, y]),
                    [35, 65].map((y) => [250, y]),
                  ];
                  const edges: { d: string; keep: boolean }[] = [];
                  let n = 0;
                  for (let l = 0; l < 2; l++)
                    for (const [x1, y1] of layers[l])
                      for (const [x2, y2] of layers[l + 1])
                        edges.push({
                          d: `M${x1} ${y1}L${x2} ${y2}`,
                          keep: hash(n++ + 900) > 0.5,
                        });
                  return (
                    <g>
                      {edges.map((e) => (
                        <path
                          key={e.d}
                          d={e.d}
                          stroke={e.keep ? "var(--charcoal)" : "var(--crimson)"}
                          strokeOpacity={e.keep ? 0.6 : 0.35}
                          strokeDasharray={e.keep ? undefined : "2 4"}
                        />
                      ))}
                      {layers.flat().map(([x, y]) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="var(--background)" stroke="var(--charcoal)" strokeOpacity="0.7" />
                      ))}
                    </g>
                  );
                })()}
                <text {...SVG_LABEL} x="140" y="110" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                  SPARSE MODELS
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              <span className="font-bold">Pruning:</span> Removing redundant
              weights to create sparse models
            </p>
          </Measure>

          <Measure
            n={3}
            delay={340}
            figure={
              <svg viewBox="0 0 280 110" className="w-full" fill="none">
                <rect x="0.5" y="8.5" width="100" height="76" stroke="var(--charcoal)" strokeOpacity="0.55" />
                {[24, 40, 56, 72].map((y) => (
                  <path key={y} d={`M14 ${y}H86`} stroke="var(--charcoal)" strokeOpacity="0.2" />
                ))}
                <path d="M112 64H176" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d={headRight(184, 64)} stroke="var(--charcoal)" strokeOpacity="0.6" />
                <rect x="192.5" y="44.5" width="40" height="40" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d="M202 58H223M202 70H223" stroke="var(--crimson)" strokeOpacity="0.5" />
                <text {...SVG_LABEL} x="0" y="102" fill="var(--charcoal)" fillOpacity="0.65">
                  TEACHERS
                </text>
                <text {...SVG_LABEL} x="280" y="102" textAnchor="end" fill="var(--crimson)">
                  STUDENT MODELS
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              <span className="font-bold">Knowledge Distillation:</span>{" "}
              Training small student models from large teachers
              <Cite n={[31, 32]} />
            </p>
          </Measure>
        </ol>

        <Question delay={460}>
          Is there a &quot;minimum viable precision&quot; for most business
          applications?
        </Question>
      </Slide>

      {/* ==================================================================
          20 · SMALL LANGUAGE MODELS (SLMS) — the trend set at display size;
          28% of global AI electricity to scale; a simple query routed past
          the massive generalist to a task-specific model.
                                               [quiz: compression]
      ================================================================== */}
      <Slide id="slms" border align="left" quizData={quiz["slms"]}>
        <Head eyebrow="Part 3 · 03 / 05">Small Language Models (SLMs)</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            The &quot;Small is Sufficient&quot; trend: Using task-specific
            models
            <Cite n={[34]} />
          </p>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Adoption could save roughly 28% of global AI electricity by 2025
              <Cite n={[34]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 80"
              className="mt-8 w-full"
              fill="none"
            >
              {/* the whole bar is global AI electricity; 28% of 800 is 224 */}
              <text {...SVG_LABEL} x="0" y="12" fill="var(--charcoal)" fillOpacity="0.65">
                GLOBAL AI ELECTRICITY
              </text>
              <rect x="0" y="24" width="222" height="26" fill="var(--crimson)" />
              <rect x="226" y="24" width="574" height="26" fill="var(--charcoal)" fillOpacity="0.25" />
              <text {...SVG_LABEL} x="0" y="72" fill="var(--crimson)">
                ROUGHLY 28%
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Avoiding the use of massive generalist models for simple queries
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 140"
              className="mt-8 w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="74" fill="var(--charcoal)" fillOpacity="0.7">
                SIMPLE QUERIES
              </text>
              <circle cx="150" cy="70" r="4" fill="var(--charcoal)" />
              <path d="M154 70C260 70 320 38 424 38" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="4 4" />
              <path d="M314 38l16 16M330 38l-16 16" stroke="var(--crimson)" strokeWidth="2" />
              <circle cx="470" cy="38" r="34" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <text {...SVG_LABEL} x="524" y="42" fill="var(--charcoal)" fillOpacity="0.6">
                MASSIVE GENERALIST MODELS
              </text>
              <path d="M154 70C260 70 320 110 444 110" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d={headRight(452, 110)} stroke="var(--crimson)" strokeWidth="1.5" />
              <circle cx="470" cy="110" r="10" stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="524" y="114" fill="var(--crimson)">
                TASK-SPECIFIC MODELS
              </text>
            </svg>
          </div>
        </Reveal>

        <Question delay={560}>
          Why do organizations still default to the largest available models?
        </Question>
      </Slide>

      {/* ==================================================================
          21 · NEUROMORPHIC COMPUTING — brain's architecture carried across
          to hardware; a spike train with energy drawn only under each spike;
          the memory–processor shuttle struck out.           [quiz topic]
      ================================================================== */}
      <Slide id="neuromorphic" border align="left">
        <Head eyebrow="Part 3 · 04 / 05">Neuromorphic Computing</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Hardware inspired by the human brain&apos;s architecture
          </p>
          <div aria-hidden className="mt-5 flex max-w-3xl items-center gap-3">
            <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Human brain&apos;s architecture
            </span>
            <span className="h-px w-24 bg-[var(--crimson)]/60" />
            <span className="-ml-4 size-2 rotate-45 border-r border-t border-[var(--crimson)]" />
            <span className={`${MICRO} text-[var(--crimson)]`}>Hardware</span>
          </div>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Spiking Neural Networks (SNNs): Neurons only consume energy when
              active
              <Cite n={[35, 36]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 132"
              className="mt-8 w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="34" fill="var(--charcoal)" fillOpacity="0.6">
                NEURONS
              </text>
              <path d="M96 52H800" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <text {...SVG_LABEL} x="0" y="110" fill="var(--charcoal)" fillOpacity="0.6">
                ENERGY
              </text>
              <path d="M96 120H800" stroke="var(--charcoal)" strokeOpacity="0.2" />
              {[180, 330, 362, 560, 710].map((x) => (
                <g key={x}>
                  <path d={`M${x} 52V14`} stroke="var(--crimson)" strokeWidth="2" />
                  <rect x={x - 7} y="98" width="14" height="22" fill="var(--crimson)" fillOpacity="0.85" />
                </g>
              ))}
              <text {...SVG_LABEL} x="346" y="9" textAnchor="middle" fill="var(--crimson)">
                ACTIVE
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Eliminates the energy cost of moving data between memory and
              processors
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 110"
              className="mt-8 w-full"
              fill="none"
            >
              <rect x="80.5" y="20.5" width="180" height="70" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <text {...SVG_LABEL} x="170" y="59" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                MEMORY
              </text>
              <rect x="540.5" y="20.5" width="180" height="70" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <text {...SVG_LABEL} x="630" y="59" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                PROCESSORS
              </text>
              <path d="M272 44H520" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <path d={headRight(528, 44)} stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d="M528 68H280" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <path d={headLeft(272, 68)} stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d="M386 42l28 28M414 42l-28 28" stroke="var(--crimson)" strokeWidth="2" />
            </svg>
          </div>
        </Reveal>

        <Question delay={560}>
          How close are we to seeing neuromorphic chips in consumer devices?
        </Question>
      </Slide>

      {/* ==================================================================
          22 · NEUROMORPHIC EFFICIENCY GAINS — the two chips named; one cell
          in a hundred and one in a thousand; edge AI and sensory
          processing listed.                       [quiz: neuromorphic]
      ================================================================== */}
      <Slide
        id="neuromorphic-gains"
        border
        align="left"
        quizData={quiz["neuromorphic-gains"]}
      >
        <Head eyebrow="Part 3 · 05 / 05">Neuromorphic Efficiency Gains</Head>

        <Reveal delay={140} className="w-full">
          <div
            aria-hidden
            className="mt-10 grid max-w-3xl grid-cols-2 gap-px bg-[var(--charcoal)]/10"
          >
            {["Intel Loihi 2", "BrainChip Akida"].map((name) => (
              <div key={name} className="bg-[var(--background)] px-5 py-5">
                <span
                  style={{ fontFamily: "var(--font-serif), serif" }}
                  className="text-[1.5rem] font-bold leading-none tracking-[-0.02em] text-[var(--charcoal)] md:text-[2rem]"
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
          <p className={`${BODY} mt-6 max-w-4xl`}>
            Intel Loihi 2 and BrainChip Akida showing commercial viability
            <Cite n={[36, 37]} />
          </p>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Potential for 100x to 1000x efficiency gains in specific tasks
              <Cite n={[36, 38]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 560 196"
              className="mt-8 w-full max-w-3xl"
              fill="none"
            >
              {Array.from({ length: 100 }).map((_, i) => (
                <rect
                  key={`a${i}`}
                  x={(i % 10) * 8}
                  y={90 + Math.floor(i / 10) * 8}
                  width="6"
                  height="6"
                  fill={i === 0 ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={i === 0 ? 1 : 0.2}
                />
              ))}
              <text {...SVG_LABEL} x="0" y="190" fill="var(--charcoal)" fillOpacity="0.7">
                100x
              </text>
              {Array.from({ length: 1000 }).map((_, i) => (
                <rect
                  key={`b${i}`}
                  x={140 + (i % 50) * 8}
                  y={10 + Math.floor(i / 50) * 8}
                  width="6"
                  height="6"
                  fill={i === 0 ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={i === 0 ? 1 : 0.2}
                />
              ))}
              <text {...SVG_LABEL} x="140" y="190" fill="var(--crimson)">
                1000x
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Ideal for edge AI and sensory processing applications
            </p>
            <Terms items={["edge AI", "sensory processing applications"]} />
          </div>
        </Reveal>

        <Question delay={560}>
          Will neuromorphic computing replace or augment traditional GPU
          architectures?
        </Question>
      </Slide>

      <PartPlate
        id="part-4"
        numeral="4"
        title="Circular Economy & Policy"
        lines={[
          "Closing the loop on waste",
          "Biodiversity monitoring",
          "The emerging regulatory landscape",
        ]}
        discussion="Which policy or governance intervention is most likely to change organizational behavior around sustainable AI in practice?"
      />

      {/* ==================================================================
          24 · AI AND THE CIRCULAR ECONOMY — waste carried round a loop until
          it returns as a resource; mixed items on a belt sorted into three
          bins; a passport tracing recovered materials.
      ================================================================== */}
      <Slide id="circular" border align="left">
        <Head eyebrow="Part 4 · 01 / 08">AI and the Circular Economy</Head>

        <Reveal delay={140} className="w-full">
          <div className="mt-10 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_18rem] md:gap-14">
            <p className={LEAD}>
              Treating waste as a resource through better sorting and logistics
            </p>
            <svg
              aria-hidden
              viewBox="0 0 300 206"
              className="w-full max-w-[18rem]"
              fill="none"
            >
              <defs>
                <marker
                  id="w8-arrow-loop"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M1 1L9 5L1 9" stroke="var(--charcoal)" strokeOpacity="0.7" strokeWidth="1.5" />
                </marker>
              </defs>
              {[0, 1, 2, 3].map((k) => {
                const p = (deg: number) => {
                  const a = (deg * Math.PI) / 180;
                  return `${(150 + 64 * Math.cos(a)).toFixed(1)} ${(103 + 64 * Math.sin(a)).toFixed(1)}`;
                };
                return (
                  <path
                    key={k}
                    d={`M${p(-90 + k * 90 + 16)}A64 64 0 0 1 ${p(-90 + k * 90 + 72)}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.5"
                    markerEnd="url(#w8-arrow-loop)"
                  />
                );
              })}
              <circle cx="150" cy="39" r="4.5" fill="var(--charcoal)" fillOpacity="0.6" />
              <circle cx="214" cy="103" r="4.5" fill="var(--charcoal)" fillOpacity="0.6" />
              <circle cx="150" cy="167" r="4.5" fill="var(--charcoal)" fillOpacity="0.6" />
              <circle cx="86" cy="103" r="5.5" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="150" y="24" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.7">
                WASTE
              </text>
              <text {...SVG_LABEL} x="226" y="106" fill="var(--charcoal)" fillOpacity="0.7">
                SORTING
              </text>
              <text {...SVG_LABEL} x="150" y="192" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.7">
                LOGISTICS
              </text>
              <text {...SVG_LABEL} x="74" y="106" textAnchor="end" fill="var(--crimson)">
                RESOURCE
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI robotics sort waste streams with high speed and accuracy
              <Cite n={[40, 41]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 136"
              className="mt-8 w-full"
              fill="none"
            >
              {(() => {
                const shape = (kind: number, x: number, y: number, fill: string, op: number) =>
                  kind === 0 ? (
                    <circle cx={x} cy={y} r="7" fill={fill} fillOpacity={op} />
                  ) : kind === 1 ? (
                    <rect x={x - 6.5} y={y - 6.5} width="13" height="13" fill={fill} fillOpacity={op} />
                  ) : (
                    <path d={`M${x} ${y - 8}L${x + 8} ${y + 6}H${x - 8}Z`} fill={fill} fillOpacity={op} />
                  );
                return (
                  <g>
                    <text {...SVG_LABEL} x="20" y="12" fill="var(--charcoal)" fillOpacity="0.65">
                      WASTE STREAMS
                    </text>
                    <rect x="20.5" y="70.5" width="400" height="14" rx="7" stroke="var(--charcoal)" strokeOpacity="0.5" />
                    {[0, 2, 1, 1, 0, 2, 0, 1, 2].map((kind, i) => (
                      <g key={i}>{shape(kind, 50 + i * 44, 60, "var(--charcoal)", 0.55)}</g>
                    ))}
                    <path d="M470 12V36L500 54" stroke="var(--crimson)" strokeWidth="2" />
                    <circle cx="470" cy="36" r="3.5" fill="var(--crimson)" />
                    <path d="M494 60l12-2M500 50l8 10" stroke="var(--crimson)" strokeWidth="2" />
                    <text {...SVG_LABEL} x="482" y="10" fill="var(--crimson)">
                      AI ROBOTICS
                    </text>
                    {[0, 1, 2].map((k) => {
                      const bx = 560 + k * 80;
                      return (
                        <g key={k}>
                          <path d={`M512 60C${bx - 10} 60 ${bx + 20} 64 ${bx + 30} 76`} stroke="var(--crimson)" strokeOpacity="0.45" strokeDasharray="3 4" />
                          <path d={`M${bx} 72V122H${bx + 60}V72`} stroke="var(--charcoal)" strokeOpacity="0.6" />
                          {shape(k, bx + 30, 104, "var(--crimson)", 1)}
                        </g>
                      );
                    })}
                  </g>
                );
              })()}
            </svg>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_18rem] md:gap-14">
            <p className={BODY}>
              Digital Waste Passports track recovery of valuable materials
              <Cite n={[42]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 280 136"
              className="w-full max-w-[18rem]"
              fill="none"
            >
              <rect x="10.5" y="8.5" width="96" height="116" rx="3" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M24 28H92M24 42H80M24 56H88" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <rect x="24.5" y="78.5" width="32" height="32" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M30 84h8v8h-8zM44 98h7v7h-7zM30 98h5v7h-5z" fill="var(--charcoal)" fillOpacity="0.6" />
              <path d="M116 64H270" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="3 4" />
              {[160, 205, 250].map((x) => (
                <circle key={x} cx={x} cy="64" r="6" fill="var(--crimson)" />
              ))}
              <text {...SVG_LABEL} x="116" y="98" fill="var(--crimson)">
                VALUABLE
              </text>
              <text {...SVG_LABEL} x="116" y="112" fill="var(--crimson)">
                MATERIALS
              </text>
            </svg>
          </div>
        </Reveal>

        <Question delay={560}>
          How can AI incentivize consumers to participate more effectively in
          recycling?
        </Question>
      </Slide>

      {/* ==================================================================
          25 · BIODIVERSITY MONITORING — a soundscape with the calls marked;
          a camera-trap frame boxing the animal it identifies; the three
          words of the last line listed.
      ================================================================== */}
      <Slide id="biodiversity" border align="left">
        <Head eyebrow="Part 4 · 02 / 08">Biodiversity Monitoring</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Passive Acoustic Monitoring (PAM) tracks species via soundscapes
              <Cite n={[44, 45]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 132"
              className="mt-7 w-full"
              fill="none"
            >
              {Array.from({ length: 100 }).map((_, i) => {
                const call =
                  (i >= 18 && i <= 26) || (i >= 52 && i <= 57) || (i >= 78 && i <= 88);
                const h = call ? 16 + hash(i + 1000) * 34 : 2 + hash(i + 1000) * 8;
                return (
                  <path
                    key={i}
                    d={`M${2 + i * 4} ${(56 - h).toFixed(1)}V${(56 + h).toFixed(1)}`}
                    stroke={call ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={call ? 0.9 : 0.3}
                    strokeWidth="2"
                  />
                );
              })}
              <text {...SVG_LABEL} x="0" y="128" fill="var(--charcoal)" fillOpacity="0.65">
                SOUNDSCAPES
              </text>
            </svg>
          </Reveal>

          <Reveal delay={260} className={COL_RULE}>
            <p className={BODY}>
              Computer vision identifies species in real-time via camera traps
              <Cite n={[44, 46]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 132"
              className="mt-7 w-full"
              fill="none"
            >
              <path
                d="M40 26V8H58M342 8H360V26M360 90V108H342M58 108H40V90"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <circle cx="58" cy="26" r="3.5" fill="var(--crimson)" />
              <g fill="var(--charcoal)" fillOpacity="0.65" stroke="var(--charcoal)" strokeOpacity="0.65" strokeLinecap="round">
                <ellipse cx="196" cy="66" rx="26" ry="10" stroke="none" />
                <path d="M178 72L176 96M187 74V96M205 74L206 96M214 72L217 96" fill="none" strokeWidth="3" />
                <path d="M212 62L225 42" fill="none" strokeWidth="8" />
                <ellipse cx="231" cy="40" rx="9" ry="5.5" transform="rotate(24 231 40)" stroke="none" />
                <path d="M224 35l-3-7M228 34l1-7" fill="none" strokeWidth="2.5" />
                <path d="M171 62l-6-4" fill="none" strokeWidth="3" />
              </g>
              <rect x="156.5" y="22.5" width="92" height="82" stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="156" y="16" fill="var(--crimson)">
                SPECIES
              </text>
              <text {...SVG_LABEL} x="0" y="128" fill="var(--charcoal)" fillOpacity="0.65">
                CAMERA TRAPS
              </text>
              <text {...SVG_LABEL} x="360" y="128" textAnchor="end" fill="var(--crimson)">
                REAL-TIME
              </text>
            </svg>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Non-invasive methods for tracking elusive or endangered species
            </p>
            <Terms items={["non-invasive", "elusive", "endangered species"]} />
          </div>
        </Reveal>

        <Question delay={540}>
          Can global biodiversity data be standardized to drive international
          policy?
        </Question>
      </Slide>

      {/* ==================================================================
          26 · THE EU AI ACT: ARTICLE 40 — the mandate at display size; a
          published page of energy data; models placed on a FLOPs line with
          those past 10^23 inside the rule.                   [quiz topic]
      ================================================================== */}
      <Slide id="eu-ai-act" border align="left">
        <Head eyebrow="Part 4 · 03 / 08" kicker="The EU AI Act:">
          Article 40
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Mandates transparency regarding &quot;AI systems resource
            performance&quot;
            <Cite n={[48, 49]} />
          </p>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_11rem] md:gap-14">
            <p className={BODY}>
              General-Purpose AI providers must publish energy consumption data
              <Cite n={[50, 51]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 176 150"
              className="w-full max-w-[11rem]"
              fill="none"
            >
              <path d="M12.5 6.5H132L164 38V144H12.5Z" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M132 6.5V38H164" stroke="var(--charcoal)" strokeOpacity="0.4" />
              <path d="M28 28H112" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="2" />
              <path d="M28 50H148M28 62H136" stroke="var(--charcoal)" strokeOpacity="0.2" />
              <path d="M28 128H148" stroke="var(--charcoal)" strokeOpacity="0.35" />
              {[18, 30, 24, 40, 34].map((h, i) => (
                <rect key={i} x={36 + i * 22} y={128 - h} width="12" height={h} fill="var(--crimson)" />
              ))}
            </svg>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Applies to models trained with more than 10^23 FLOPs
              <Cite n={[50]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 104"
              className="mt-8 w-full"
              fill="none"
            >
              <rect x="440" y="20" width="352" height="44" fill="var(--crimson)" fillOpacity="0.07" />
              <path d="M0 64H792" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d={headRight(800, 64)} stroke="var(--charcoal)" strokeOpacity="0.55" />
              <path d="M440 12V64" stroke="var(--crimson)" strokeWidth="2" />
              <text {...SVG_LABEL} x="454" y="38" fill="var(--crimson)">
                MORE THAN 10
                <tspan dy="-4" fontSize="7">
                  23
                </tspan>
                <tspan dy="4"> FLOPs</tspan>
              </text>
              {[60, 140, 215, 300, 380, 500, 580, 660, 740].map((x) => (
                <circle
                  key={x}
                  cx={x}
                  cy="64"
                  r="5"
                  fill={x > 440 ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={x > 440 ? 1 : 0.45}
                />
              ))}
              <text {...SVG_LABEL} x="0" y="96" fill="var(--charcoal)" fillOpacity="0.65">
                MODELS
              </text>
              <text {...SVG_LABEL} x="792" y="96" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.65">
                FLOPs
              </text>
            </svg>
          </div>
        </Reveal>

        <Question delay={560}>
          Will the EU&apos;s regulations become the de facto global standard for
          AI sustainability?
        </Question>
      </Slide>

      {/* ==================================================================
          27 · ISO STANDARDS AND FRAMEWORKS — the two standard numbers set
          large over their sentences; greenwashing struck for compliance.
                                                    [quiz: eu-ai-act]
      ================================================================== */}
      <Slide id="iso" border align="left" quizData={quiz["iso"]}>
        <Head eyebrow="Part 4 · 04 / 08">ISO Standards and Frameworks</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <div aria-hidden className="border-t-2 border-[var(--charcoal)] pt-4">
              <div className={`${MICRO} text-[var(--champagne)]`}>ISO/IEC</div>
              <div
                style={{ fontFamily: "var(--font-serif), serif" }}
                className="mt-2 text-[3rem] font-black leading-none tracking-[-0.03em] text-[var(--charcoal)] md:text-[4rem]"
              >
                42001
              </div>
            </div>
            <p className={`${BODY} mt-6`}>
              ISO/IEC 42001: Management system standard including
              sustainability
              <Cite n={[53]} />
            </p>
          </Reveal>

          <Reveal delay={260} className={COL_RULE}>
            <div aria-hidden className="border-t-2 border-[var(--crimson)] pt-4">
              <div className={`${MICRO} text-[var(--champagne)]`}>
                ISO/IEC TR
              </div>
              <div
                style={{ fontFamily: "var(--font-serif), serif" }}
                className="mt-2 text-[3rem] font-black leading-none tracking-[-0.03em] text-[var(--crimson)] md:text-[4rem]"
              >
                20226
              </div>
            </div>
            <p className={`${BODY} mt-6`}>
              ISO/IEC TR 20226: Focuses on energy, water, and e-waste aspects
              <Cite n={[54, 55]} />
            </p>
            <Steps items={["energy", "water", "e-waste"]} cols="md:grid-cols-3" />
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split
              left='Voluntary "greenwashing"'
              right="Rigorous compliance"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Moving from voluntary &quot;greenwashing&quot; to rigorous
              compliance
            </p>
          </div>
        </Reveal>

        <Question delay={540}>
          How can organizations prepare for these upcoming reporting
          requirements?
        </Question>
      </Slide>

      {/* ==================================================================
          28 · MEASUREMENT TOOLS — the two tools named; carbon over a unit of
          work, equal to CCI; an estimate bar short of true usage by the
          overheads it misses.                               [quiz topic]
      ================================================================== */}
      <Slide id="measurement" border align="left">
        <Head eyebrow="Part 4 · 05 / 08">Measurement Tools</Head>

        <Reveal delay={140} className="w-full">
          <div
            aria-hidden
            className="mt-10 grid max-w-3xl grid-cols-2 gap-px bg-[var(--charcoal)]/10"
          >
            {["CodeCarbon", "Green Algorithms"].map((name) => (
              <div key={name} className="bg-[var(--background)] px-5 py-5">
                <span
                  style={{ fontFamily: "var(--font-serif), serif" }}
                  className="text-[1.5rem] font-bold leading-none tracking-[-0.02em] text-[var(--charcoal)] md:text-[2rem]"
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
          <p className={`${BODY} mt-6 max-w-4xl`}>
            Software tools like CodeCarbon and Green Algorithms estimate
            emissions
            <Cite n={[3, 56]} />
          </p>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Compute Carbon Intensity (CCI) quantifies carbon per unit of work
              <Cite n={[11]} />
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 104"
              className="mt-7 w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="130" y="36" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                CARBON
              </text>
              <path d="M40 50H220" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="130" y="74" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                UNIT OF WORK
              </text>
              <text x="256" y="59" fontSize="24" fontFamily="var(--font-serif), serif" fill="var(--charcoal)" fillOpacity="0.55">
                =
              </text>
              <text x="292" y="61" fontSize="28" fontFamily="var(--font-serif), serif" fontWeight="700" fill="var(--crimson)">
                CCI
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Tools may underestimate true usage by missing overheads like
              cooling
              <Cite n={[56]} />
            </p>
            <figure aria-hidden className="mt-7 w-full">
              <svg viewBox="0 0 400 96" className="w-full" fill="none">
                <text {...SVG_LABEL} x="0" y="12" fill="var(--charcoal)" fillOpacity="0.65">
                  TRUE USAGE
                </text>
                <path d="M0.5 28V21.5H399.5V28" stroke="var(--charcoal)" strokeOpacity="0.35" />
                <rect x="0" y="34" width="256" height="26" fill="var(--charcoal)" fillOpacity="0.5" />
                <rect x="260.5" y="34.5" width="139" height="25" stroke="var(--crimson)" strokeDasharray="4 4" />
                <text {...SVG_LABEL} x="0" y="84" fill="var(--charcoal)" fillOpacity="0.65">
                  ESTIMATE
                </text>
                <text {...SVG_LABEL} x="400" y="84" textAnchor="end" fill="var(--crimson)">
                  OVERHEADS LIKE COOLING
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>

        <Question delay={520}>
          What is the margin of error we should accept in carbon accounting
          tools?
        </Question>
      </Slide>

      {/* ==================================================================
          29 · ACTIONABLE INSIGHTS: DEVELOPERS — three measures: a tracking
          stage added to the pipeline; the default arrow pointing at the
          small model; a training run placed in the low-carbon trough.
                                                  [quiz: measurement]
      ================================================================== */}
      <Slide
        id="developers"
        border
        align="left"
        quizData={quiz["developers"]}
      >
        <Head eyebrow="Part 4 · 06 / 08" kicker="Actionable Insights:">
          Developers
        </Head>

        <ol className="mt-10 w-full max-w-5xl">
          <Measure
            n={1}
            delay={140}
            figure={
              <svg viewBox="0 0 280 88" className="w-full" fill="none">
                {[0, 72, 144].map((x) => (
                  <g key={x}>
                    <rect x={x + 0.5} y="16.5" width="52" height="30" stroke="var(--charcoal)" strokeOpacity="0.5" />
                    <path d={`M${x + 54} 31.5H${x + 62}`} stroke="var(--charcoal)" strokeOpacity="0.4" />
                    <path d={headRight(x + 70, 31.5)} stroke="var(--charcoal)" strokeOpacity="0.5" />
                  </g>
                ))}
                <rect x="216.5" y="16.5" width="62" height="30" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d="M233 40A14 14 0 0 1 261 40" stroke="var(--crimson)" />
                <path d="M247 40L255 29" stroke="var(--crimson)" strokeWidth="1.5" />
                <text {...SVG_LABEL} x="0" y="80" fill="var(--charcoal)" fillOpacity="0.65">
                  CI/CD PIPELINES
                </text>
                <text {...SVG_LABEL} x="280" y="80" textAnchor="end" fill="var(--crimson)">
                  CARBON TRACKING
                </text>
              </svg>
            }
          >
            <p className={BODY}>Integrate carbon tracking into CI/CD pipelines</p>
          </Measure>

          <Measure
            n={2}
            delay={240}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                <circle cx="70" cy="44" r="34" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="3 4" />
                <circle cx="206" cy="56" r="12" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d="M206 14V34" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d={headDown(206, 40)} stroke="var(--crimson)" strokeWidth="1.5" />
                <text {...SVG_LABEL} x="206" y="88" textAnchor="middle" fill="var(--crimson)">
                  SLMs
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              Default to Small Language Models (SLMs) where possible
            </p>
          </Measure>

          <Measure
            n={3}
            delay={340}
            figure={
              <svg viewBox="0 0 280 112" className="w-full" fill="none">
                <text {...SVG_LABEL} x="0" y="12" fill="var(--charcoal)" fillOpacity="0.6">
                  GRID CARBON INTENSITY
                </text>
                <path
                  d={Array.from({ length: 57 }, (_, j) => {
                    const x = j * 5;
                    const y = 50 - 22 * Math.cos((2 * Math.PI * x) / 280);
                    return `${j ? "L" : "M"}${x} ${y.toFixed(1)}`;
                  }).join("")}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
                <rect x="108" y="80" width="64" height="8" fill="var(--crimson)" />
                <text {...SVG_LABEL} x="140" y="106" textAnchor="middle" fill="var(--crimson)">
                  TRAINING RUNS
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              Schedule training runs for times with low grid carbon intensity
            </p>
          </Measure>
        </ol>

        <Question delay={460}>
          How can individual developers influence organizational choice of
          models?
        </Question>
      </Slide>

      {/* ==================================================================
          30 · ACTIONABLE INSIGHTS: ORGANIZATIONS — three measures: an LCA
          passed from hardware vendors; water carried round a loop; three
          reports held to one edge.
      ================================================================== */}
      <Slide id="organizations" border align="left">
        <Head eyebrow="Part 4 · 07 / 08" kicker="Actionable Insights:">
          Organizations
        </Head>

        <ol className="mt-10 w-full max-w-5xl">
          <Measure
            n={1}
            delay={140}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                <text {...SVG_LABEL} x="0" y="50" fill="var(--charcoal)" fillOpacity="0.65">
                  HARDWARE VENDORS
                </text>
                <path d="M146 46H186" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d={headRight(194, 46)} stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d="M204.5 6.5H258L272 20V86H204.5Z" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <text x="238" y="54" textAnchor="middle" fontSize="16" fontFamily="var(--font-serif), serif" fontWeight="700" fill="var(--crimson)">
                  LCA
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              Require Life Cycle Assessments (LCA) from hardware vendors
            </p>
          </Measure>

          <Measure
            n={2}
            delay={240}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                <defs>
                  <marker
                    id="w8-arrow-recycle"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto"
                  >
                    <path d="M1 1L9 5L1 9" stroke="var(--charcoal)" strokeOpacity="0.7" strokeWidth="1.5" />
                  </marker>
                </defs>
                <path
                  d="M50 12A34 34 0 1 1 18.1 34.4"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                  markerEnd="url(#w8-arrow-recycle)"
                />
                <path d="M50 30C50 30 59 42 59 48A9 9 0 0 1 41 48C41 42 50 30 50 30Z" fill="var(--crimson)" />
                <text {...SVG_LABEL} x="104" y="32" fill="var(--charcoal)" fillOpacity="0.65">
                  WATER-FREE OR
                </text>
                <text {...SVG_LABEL} x="104" y="48" fill="var(--crimson)">
                  RECYCLED WATER
                </text>
                <text {...SVG_LABEL} x="104" y="64" fill="var(--charcoal)" fillOpacity="0.65">
                  COOLING
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              Prioritize data centers with water-free or recycled water cooling
            </p>
          </Measure>

          <Measure
            n={3}
            delay={340}
            figure={
              <svg viewBox="0 0 280 96" className="w-full" fill="none">
                {[
                  { label: "REPORTING", y: 18 },
                  { label: "EU AI ACT", y: 48 },
                  { label: "ISO STANDARDS", y: 78 },
                ].map((row) => (
                  <g key={row.label}>
                    <text {...SVG_LABEL} x="0" y={row.y + 3.5} fill="var(--charcoal)" fillOpacity="0.65">
                      {row.label}
                    </text>
                    <rect x="134" y={row.y - 5} width="140" height="10" fill="var(--charcoal)" fillOpacity="0.3" />
                  </g>
                ))}
                <path d="M131 4V92" stroke="var(--crimson)" strokeWidth="2" />
              </svg>
            }
          >
            <p className={BODY}>
              Align reporting with EU AI Act and ISO standards immediately
            </p>
          </Measure>
        </ol>

        <Question delay={460}>
          What are the risks of ignoring the environmental component of ESG
          goals?
        </Question>
      </Slide>

      {/* ==================================================================
          31 · FUTURE DIRECTIONS — water washing struck for water reporting;
          hardware and software cut to fit one another; efficiency and total
          consumption both climbing.                         [quiz topic]
      ================================================================== */}
      <Slide id="future" border align="left">
        <Head eyebrow="Part 4 · 08 / 08">Future Directions</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Standardizing water reporting to prevent &quot;water washing&quot;
            </p>
            <div aria-hidden className="mt-7">
              <Split
                left='"Water washing"'
                right="Water reporting"
                strikeLeft
              />
            </div>
          </Reveal>

          <Reveal delay={260} className={COL_RULE}>
            <p className={BODY}>
              Hardware-software co-design for neuromorphic architectures
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 84"
              className="mt-7 w-full"
              fill="none"
            >
              {/* two blocks sharing one puzzle-cut edge, the cut marked */}
              <path d="M0.5 14.5H200V32A10 10 0 0 1 200 52V69.5H0.5Z" fill="var(--charcoal)" fillOpacity="0.05" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M200 14.5H399.5V69.5H200V52A10 10 0 0 0 200 32Z" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M200 14.5V32A10 10 0 0 1 200 52V69.5" stroke="var(--crimson)" strokeWidth="2" />
              <text {...SVG_LABEL} x="98" y="45" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                HARDWARE
              </text>
              <text {...SVG_LABEL} x="304" y="45" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                SOFTWARE
              </text>
            </svg>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              Mitigating Jevons Paradox: Efficiency leading to increased total
              consumption
            </p>
            <figure aria-hidden className="mt-8 w-full">
              <svg viewBox="0 0 800 176" className="w-full" fill="none">
                <path d="M20 160H780" stroke="var(--charcoal)" strokeOpacity="0.3" />
                <path d="M20 132C300 116 520 96 780 72" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="1.5" />
                <path d="M20 146C320 142 560 104 780 20" stroke="var(--crimson)" strokeWidth="2" />
                <text {...SVG_LABEL} x="780" y="96" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.7">
                  EFFICIENCY
                </text>
                <text {...SVG_LABEL} x="660" y="16" textAnchor="end" fill="var(--crimson)">
                  TOTAL CONSUMPTION
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </Reveal>

        <Question delay={540}>
          Can we innovate fast enough to outpace the environmental damage of
          scaling?
        </Question>
      </Slide>

      {/* ==================================================================
          32 · CONCLUSION — the three findings numbered; the fourth set at
          display weight with its last words marked.            [quiz: future]
      ================================================================== */}
      <Slide
        id="conclusion"
        border
        align="left"
        quizData={quiz["conclusion"]}
      >
        <Head eyebrow="Closing">Conclusion</Head>

        <ol className="mt-10 w-full max-w-5xl">
          {[
            "AI is a powerful tool with a heavy environmental price tag",
            "The shift to inference dominance demands new efficiency strategies",
            "Regulation and standards are transforming the industry",
          ].map((line, i) => (
            <Reveal key={line} as="li" delay={140 + i * 110} className="block">
              <div className="grid grid-cols-[4ch_1fr] items-baseline gap-6 border-t border-[var(--charcoal)]/12 py-6">
                <span className={`${MICRO} text-[var(--champagne)]`}>
                  {pad(i + 1)}
                </span>
                <p className={LEAD}>{line}</p>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={480} className="block">
            <div className="grid grid-cols-[4ch_1fr] items-baseline gap-6 border-y border-[var(--charcoal)]/30 py-9">
              <span className={`${MICRO} text-[var(--crimson)]`}>04</span>
              <p className={DISPLAY}>
                Sustainable AI is not just an option, it is a{" "}
                <span className="text-[var(--crimson)]">
                  license to operate.
                </span>
              </p>
            </div>
          </Reveal>
        </ol>

        <Discussion delay={600}>
          Which sustainability trade-off in AI deployment do you think business
          leaders underestimate most today?
        </Discussion>
      </Slide>

      {/* ==================================================================
          33 · SOURCES — the numbered list from content.md, each site linked;
          superscript citations across the deck jump here.
      ================================================================== */}
      <Slide id="sources" border align="left">
        <Head eyebrow="References">Sources</Head>

        <Reveal delay={140} className="w-full">
          <ol className="mt-10 w-full max-w-5xl border-t border-[var(--charcoal)]/15">
            {SOURCES.map((s) => (
              <li
                key={s.n}
                id={`source-${s.n}`}
                className="grid scroll-mt-24 grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-[var(--charcoal)]/10 py-4 md:grid-cols-[3rem_15rem_1fr]"
              >
                <span className={`${MICRO} text-[var(--champagne)]`}>
                  {s.n}.
                </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] text-[var(--charcoal)] underline decoration-[var(--charcoal)]/25 underline-offset-4 hover:text-[var(--crimson)]"
                >
                  {s.site}
                </a>
                <span className="col-start-2 font-serif text-lg text-[var(--charcoal-light)] md:col-start-auto">
                  <span className="text-[var(--charcoal)]/30">-</span>{" "}
                  {s.label}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Discussion delay={280}>
          Which source or framework would you prioritize if you had to build a
          sustainable AI policy for your organization this quarter?
        </Discussion>
      </Slide>
    </SlideDeck>
  );
}
