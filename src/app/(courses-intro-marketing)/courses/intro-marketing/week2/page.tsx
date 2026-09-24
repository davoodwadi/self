"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Tag,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import { glyphProps, Plate } from "../_visuals/kit";
import { Gear1, Person1 } from "../_visuals/objects";
import exercisesData from "./exercises.json";
import {
  EnvironmentRings,
  MicroActors,
  PestleHub,
  PoliticalCorridor,
  EconomicThreshold,
  SocialStrata,
  TechnologyBranches,
  LegislationCanopy,
  ResourceExchange,
  CsrWeave,
  GreenwashingGap,
  AbsorbOrPass,
  PhonyPriceTag,
  MisrepresentedChecklist,
  PressureOverTime,
  ObsolescenceLifespans,
  GenerationsBand,
} from "./visuals";

// ============================================================================
// WEEK 02 — THE MARKETING ENVIRONMENT AND ETHICS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that slide
// and the ones before it.
//
// Sentences split across list items (the policy areas, the obsolescence
// strategies) keep a leading space inside each item and print their numerals
// from CSS, so the sentence survives intact in the page text.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const SERIF = { fontFamily: "var(--font-heading)", fontWeight: 600 } as const;

/** Slide headings run one line where they can, leaving the screen to content. */
const HEAD = "md:!mb-8 [&_h2]:!max-w-[34ch]";

/** Text beside a 400-wide column plate. */
const BESIDE = "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-12";

/** One verbatim sentence at reading size. */
function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "type-body max-w-[var(--measure)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** A sentence promoted to lead size. */
function Lead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-lead max-w-[46ch]", className)}>
      {children}
    </p>
  );
}

/** A sentence set as a serif statement — the line a slide lands on. */
function Statement({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-quote max-w-[30ch]", className)}>
      {children}
    </p>
  );
}

/** Coloured term inside a sentence, without the Highlight underline. */
function Term({
  children,
  tone = "signal",
}: {
  children: React.ReactNode;
  tone?: "signal" | "counter" | "ink";
}) {
  const color = {
    signal: "text-[var(--signal)]",
    counter: "text-[var(--counter)]",
    ink: "text-[var(--ink)]",
  }[tone];
  return <strong className={cn("font-semibold", color)}>{children}</strong>;
}

/** Hairline-topped block with a small key and a verbatim sentence. */
function Ruled({
  keyLabel,
  tone = "ink",
  weight = "thin",
  children,
  className = "",
}: {
  keyLabel?: string;
  tone?: "signal" | "counter" | "ink";
  weight?: "thin" | "thick";
  children: React.ReactNode;
  className?: string;
}) {
  const border = {
    signal: "border-[var(--signal)]",
    counter: "border-[var(--counter)]",
    ink: "border-[var(--ink)]",
  }[tone];
  const text = {
    signal: "!text-[var(--signal)]",
    counter: "!text-[var(--counter)]",
    ink: "!text-[var(--ink-3)]",
  }[tone];
  return (
    <div
      className={cn(
        "pt-5",
        weight === "thick" ? "border-t-2" : "border-t",
        border,
        className,
      )}
    >
      {keyLabel ? (
        <div aria-hidden className={cn("type-label mb-3", text)}>
          {keyLabel}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/**
 * A heading with a "Label:" prefix ("Part 1:", "Discussion:", "PESTLE
 * Analysis:"). The prefix is set as a small tracked kicker inside the same
 * h2, so the heading text stays exactly as written.
 */
function KickerHeading({
  kicker,
  children,
  tone = "signal",
}: {
  kicker: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
}) {
  return (
    <div className="w-full mb-8">
      <h2 className="type-h1 max-w-[34ch]">
        <span
          className={cn(
            "type-label block mb-4 !text-[0.8rem]",
            tone === "counter" && "!text-[var(--counter)]",
          )}
        >
          {kicker}
        </span>{" "}
        {children}
      </h2>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Part plate: an oversized numeral beside the part heading. */
function PartPlate({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border>
      <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,15rem)_1fr] xl:gap-16">
        <div
          aria-hidden
          className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[7rem] xl:text-[13rem]"
          style={{
            ...SERIF,
            fontVariationSettings: '"opsz" 144, "WONK" 1',
          }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <h2 className="type-display !text-[clamp(2.4rem,5.4vw,4.5rem)] max-w-[22ch]">
            <span className="type-label block mb-6 !text-[0.8rem]">
              {`Part ${n}:`}
            </span>{" "}
            {title}
          </h2>
          <div className="mt-8 h-px w-full bg-[var(--rule)]" />
          {children}
        </div>
      </div>
    </Slide>
  );
}

/** Discussion prompt. "Discussion:" stays in the sentence as a kicker. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-8 md:px-12 md:py-10">
      <p className="type-quote !text-[clamp(1.45rem,2.7vw,2.3rem)] max-w-[40ch]">
        {children}
      </p>
    </div>
  );
}

function PromptKicker() {
  return (
    <span className="type-label !text-[var(--counter)] block mb-6 !text-[0.8rem] !leading-none">
      Discussion:
    </span>
  );
}

/* --------------------------------------------------------------------------
   PESTLE wayfinding
   -------------------------------------------------------------------------- */

const FORCES = [
  "Political",
  "Economic",
  "Social",
  "Technological",
  "Legal",
  "Environmental",
];

/** The six letters as a strip; the pair on this slide is lit. */
function PestleStrip({ active }: { active: number[] }) {
  return (
    <div aria-hidden className="w-full mb-8">
      <ol className="grid grid-cols-6 border-t border-[var(--rule-2)]">
        {FORCES.map((name, i) => {
          const on = active.includes(i);
          return (
            <li
              key={name}
              className={cn(
                "-mt-px flex items-baseline gap-2.5 border-t-2 pt-2.5 pr-1.5",
                on ? "border-[var(--signal)]" : "border-transparent",
              )}
            >
              <span
                className={cn(
                  "block leading-none text-[1.75rem] md:text-[2.1rem]",
                  on ? "text-[var(--signal)]" : "text-[var(--ink-3)]/30",
                )}
                style={SERIF}
              >
                {name[0]}
              </span>
              <span
                className={cn(
                  "hidden lg:block text-[0.85rem] leading-tight [overflow-wrap:anywhere]",
                  on
                    ? "font-semibold text-[var(--ink)]"
                    : "text-[var(--ink-3)]/55",
                )}
              >
                {name}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * One force of a PESTLE pair: its definition, then its plate. The strip
 * above already names the letter, so the column does not repeat it.
 * `beside` sets the plate to the right of the sentence instead of under it.
 */
function Force({
  tone,
  plate,
  beside = false,
  children,
}: {
  tone: "signal" | "counter";
  plate: React.ReactNode;
  beside?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Ruled
      tone={tone}
      weight="thick"
      className={cn(
        "min-w-0",
        beside
          ? "grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:gap-8"
          : "flex flex-col",
      )}
    >
      <P className={beside ? "" : "mb-5"}>{children}</P>
      <Plate className={beside ? "" : "mt-auto max-w-[24rem]"}>{plate}</Plate>
    </Ruled>
  );
}

/**
 * The three PESTLE pairs share a heading and the letter strip, and each
 * sets its two forces and closing line in its own arrangement:
 *  · "columns": the forces side by side, the closing line underneath;
 *  · "rows": the forces stacked, each with its plate beside it, the closing
 *    line in a column at the right;
 *  · "triple": the two forces and the closing line as three columns.
 */
function PestlePair({
  id,
  title,
  active,
  layout,
  children,
  closing,
}: {
  id: string;
  title: string;
  active: number[];
  layout: "columns" | "rows" | "triple";
  children: React.ReactNode;
  closing: React.ReactNode;
}) {
  return (
    <Slide id={id} border>
      <KickerHeading kicker="PESTLE Analysis:">{title}</KickerHeading>
      <PestleStrip active={active} />
      {layout === "columns" ? (
        <>
          <div className="grid w-full gap-10 lg:grid-cols-2 lg:gap-14">
            {children}
          </div>
          <Statement className="mt-10 !max-w-[44ch]">{closing}</Statement>
        </>
      ) : layout === "rows" ? (
        <div className="grid w-full items-center gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] xl:gap-14">
          <div className="space-y-6">{children}</div>
          <Statement className="!text-[clamp(1.6rem,2.3vw,2.1rem)]">{closing}</Statement>
        </div>
      ) : (
        <div className="grid w-full gap-10 lg:grid-cols-3 lg:gap-10">
          {children}
          <Statement className="self-center !text-[clamp(1.6rem,2.4vw,2.2rem)]">{closing}</Statement>
        </div>
      )}
    </Slide>
  );
}

/* --------------------------------------------------------------------------
   CSR
   -------------------------------------------------------------------------- */

/** The four responsibilities as a temple: pediment, four shafts, a base. */
function CsrTemple() {
  const pillars = [
    { name: "Economic", rest: "To be profitable and economically viable." },
    { name: "Legal", rest: "To obey the law and play by the rules." },
    { name: "Ethical", rest: "To do what is right, just, and fair." },
    {
      name: "Philanthropic",
      rest: "To contribute resources to the community and improve quality of life.",
    },
  ];
  return (
    // The side padding is room for the base steps, which widen past the
    // shafts; without it they poke out of the slide on a phone.
    <div className="w-full px-6">
      <div aria-hidden className="relative">
        <svg
          viewBox="0 0 1000 110"
          preserveAspectRatio="none"
          className="block h-16 w-full md:h-24"
        >
          <path
            d="M6 108 L500 6 L994 108 Z"
            fill="var(--signal-tint)"
            stroke="var(--signal)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="type-label absolute inset-x-0 bottom-3 text-center md:bottom-5">
          CSR
        </span>
      </div>
      <div aria-hidden className="h-2.5 bg-[var(--ink)]" />
      <ol className="grid gap-y-6 px-3 py-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:px-6">
        {pillars.map((p, i) => (
          <li
            key={p.name}
            className="flex min-w-0 flex-col border-x-2 border-[var(--ink)] bg-[var(--paper)]"
          >
            <div aria-hidden className="-mx-[6px] h-2 bg-[var(--ink)]" />
            <p className="type-body flex-1 px-4 pb-8 pt-6 text-[var(--ink-2)] md:px-5">
              <span className="mb-4 block">
                <span
                  aria-hidden
                  className="type-caption mb-2 block !text-[var(--signal)] tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="block text-[1.7rem] leading-none text-[var(--ink)] [overflow-wrap:anywhere] md:text-[1.9rem]"
                  style={SERIF}
                >
                  {p.name}
                </span>{" "}
                <span className="type-label mt-2 block !text-[var(--ink-3)]">
                  responsibility:
                </span>
              </span>{" "}
              {p.rest}
            </p>
            <div aria-hidden className="-mx-[6px] h-2 bg-[var(--ink)]" />
          </li>
        ))}
      </ol>
      <div aria-hidden>
        <div className="h-2.5 bg-[var(--ink)]" />
        <div className="mx-[-0.75rem] mt-1.5 h-px bg-[var(--ink)]" />
        <div className="mx-[-1.5rem] mt-1.5 h-px bg-[var(--rule-2)]" />
      </div>
    </div>
  );
}

function Arrow({ dir }: { dir: "up" | "down" }) {
  return (
    <svg
      aria-hidden
      width="14"
      height="16"
      viewBox="0 0 14 16"
      className="shrink-0 text-[var(--counter)]"
    >
      {dir === "up" ? (
        <path d="M7 15 V2 M2 7 L7 2 L12 7" fill="none" stroke="currentColor" strokeWidth="2" />
      ) : (
        <path d="M7 1 V14 M2 9 L7 14 L12 9" fill="none" stroke="currentColor" strokeWidth="2" />
      )}
    </svg>
  );
}

/** Three rows: who is affected, the verbatim sentence, which way it moves. */
function BusinessCase() {
  const rows = [
    {
      key: "Consumers",
      glyph: (
        <>
          <path d="M10 18 H38 L35 44 H13 Z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M17 18 V13 A7 7 0 0 1 31 13 V18" fill="none" stroke="currentColor" strokeWidth="1.75" />
        </>
      ),
      text: "Consumers increasingly prefer to buy from companies that share their values.",
      moves: [["Preference", "up"]],
    },
    {
      key: "Employees",
      glyph: (
        <>
          <Person1 x={15} y={44} s={1.2} tone="var(--ink)" />
          <Person1 x={34} y={44} s={1} tone="var(--ink)" />
        </>
      ),
      text: "CSR programs can improve employee morale, recruitment, and retention.",
      moves: [
        ["Morale", "up"],
        ["Recruitment", "up"],
        ["Retention", "up"],
      ],
    },
    {
      key: "Operations",
      glyph: <Gear1 x={24} y={26} r={14} stroke="var(--ink)" width={1.75} />,
      text: "It also helps mitigate risks and can even reduce operational costs through sustainable practices.",
      moves: [
        ["Risks", "down"],
        ["Operational costs", "down"],
      ],
    },
  ] as const;

  return (
    <ol className="w-full">
      {rows.map((r) => (
        <li
          key={r.key}
          className="grid gap-5 border-t-2 border-[var(--ink)] py-7 md:grid-cols-[9rem_1fr] lg:grid-cols-[9rem_1fr_15rem] lg:gap-10"
        >
          <div aria-hidden className="flex items-center gap-3 text-[var(--ink)] md:flex-col md:items-start">
            <svg width="48" height="48" viewBox="0 0 48 48">
              {r.glyph}
            </svg>
            <span className="type-label !text-[var(--ink-3)]">{r.key}</span>
          </div>
          <p className="type-h2 !font-normal max-w-[34ch]">{r.text}</p>
          <ul aria-hidden className="flex flex-wrap content-start gap-x-5 gap-y-2 md:col-start-2 lg:col-start-auto lg:flex-col">
            {r.moves.map(([label, dir]) => (
              <li key={label} className="flex items-center gap-2.5">
                <Arrow dir={dir} />
                <span className="type-label !text-[var(--counter)]">{label}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------------------------
   Ethics
   -------------------------------------------------------------------------- */

/** Glyphs for the three obsolescence strategies. */
function StrategyGlyph({ kind }: { kind: "break" | "styles" | "delay" }) {
  return (
    <svg aria-hidden width="76" height="44" viewBox="0 0 76 44" className="block shrink-0">
      {kind === "break" ? (
        <>
          <path d="M4 12 H34 L30 20 L36 26 L32 34 H4 Z" fill="var(--signal-tint)" stroke="var(--signal)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M42 10 H72 V32 H40 L44 24 L38 18 Z" fill="var(--signal-tint)" stroke="var(--signal)" strokeWidth="1.5" strokeLinejoin="round" transform="rotate(8 56 22)" />
        </>
      ) : kind === "styles" ? (
        <>
          <circle cx="12" cy="22" r="9" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
          <rect x="29" y="13" width="18" height="18" rx="4" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
          <path d="M64 12 L74 32 H54 Z" fill="var(--signal-tint)" stroke="var(--signal)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 40 H66 M60 36 L66 40 L60 44" fill="none" stroke="var(--ink-3)" strokeWidth="1.25" />
        </>
      ) : (
        <>
          <rect x="3" y="6" width="30" height="30" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
          <circle cx="12" cy="21" r="3" fill="var(--ink-3)" />
          <circle cx="24" cy="21" r="3" fill="var(--ink-3)" />
          <path d="M37 21 H41 M38 18 L41 21 L38 24" fill="none" stroke="var(--ink-3)" strokeWidth="1.25" />
          <rect x="44" y="6" width="30" height="30" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx="51" cy="21" r="3" fill="var(--ink)" />
          <circle cx="59" cy="21" r="3" fill="var(--ink)" />
          <circle cx="67" cy="21" r="3" fill="var(--signal)" />
        </>
      )}
    </svg>
  );
}

/** The five philosophies from Week 01, reduced to the step this slide names. */
function ConceptStep() {
  return (
    <div aria-hidden className="grid w-full grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-6">
      <div className="border-t-2 border-[var(--rule-2)] pt-4">
        <span className="type-caption block tabular-nums !text-[var(--ink-3)]/70">04</span>
        <span className="mt-1 block text-[1.15rem] leading-tight text-[var(--ink-3)] md:text-[1.45rem]" style={SERIF}>
          The Marketing Concept
        </span>
      </div>
      <svg width="48" height="20" viewBox="0 0 48 20" className="self-center text-[var(--signal)]">
        <line x1="0" y1="10" x2="44" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M36 4 L45 10 L36 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="border-t-2 border-[var(--signal)] pt-4">
        <span className="type-caption block tabular-nums !text-[var(--signal)]">05</span>
        <span className="mt-1 block text-[1.15rem] leading-tight text-[var(--ink)] md:text-[1.45rem]" style={SERIF}>
          The Societal Marketing Concept
        </span>
      </div>
    </div>
  );
}

/* Tiny callback glyphs for the conclusion — each echoes a plate already seen. */
function GlyphRings() {
  return (
    <svg {...glyphProps}>
      <ellipse cx="32" cy="20" rx="30" ry="18" stroke="var(--counter)" strokeWidth="1.25" />
      <ellipse cx="32" cy="20" rx="19" ry="11" stroke="var(--ink)" strokeWidth="1.25" />
      <rect x="26" y="16" width="12" height="8" fill="var(--signal)" />
    </svg>
  );
}

function GlyphHub() {
  const pts = [-150, -90, -30, 30, 90, 150].map((d) => {
    const t = (d * Math.PI) / 180;
    return [+(32 + 26 * Math.cos(t)).toFixed(2), +(20 + 16 * Math.sin(t)).toFixed(2)];
  });
  return (
    <svg {...glyphProps}>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2="32" y2="20" stroke="var(--counter)" strokeWidth="1.25" />
          <circle cx={x} cy={y} r="3.5" fill="var(--paper)" stroke="var(--signal)" strokeWidth="1.5" />
        </g>
      ))}
      <circle cx="32" cy="20" r="6" fill="var(--ink)" />
    </svg>
  );
}

function GlyphTemple() {
  return (
    <svg {...glyphProps}>
      <path d="M4 12 L32 2 L60 12 Z" fill="var(--signal-tint)" stroke="var(--signal)" strokeWidth="1.25" strokeLinejoin="round" />
      <rect x="4" y="13" width="56" height="3" fill="var(--ink)" />
      {[10, 23, 36, 49].map((x) => (
        <rect key={x} x={x} y="17" width="5" height="17" stroke="var(--ink)" strokeWidth="1.25" />
      ))}
      <rect x="2" y="35" width="60" height="3" fill="var(--ink)" />
    </svg>
  );
}

export default function Week2() {
  return (
    <SlideDeck
      label="Week 02"
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 02 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[15ch]">
          The Marketing Environment{" "}
          <span className="text-[var(--signal)]">and</span> Ethics
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 2 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we will explore the forces that shape a company&apos;s
            marketing environment.
          </p>
        </div>

        <p className="type-body mt-14 max-w-3xl border-t border-[var(--rule)] pt-8 text-center [&_a]:whitespace-nowrap">
          We will cover{" "}
          <a href="#part-1" data-n="01" className="toc-link">
            micro and macro-environmental factors
          </a>
          ,{" "}
          <a href="#part-2" data-n="02" className="toc-link">
            CSR
          </a>
          , and{" "}
          <a href="#part-3" data-n="03" className="toc-link">
            marketing ethics
          </a>
          .
        </p>
        <style>{`
          .toc-link {
            color: var(--ink);
            font-weight: 550;
            text-decoration: underline;
            text-decoration-color: var(--signal-line);
            text-decoration-thickness: 0.08em;
            text-underline-offset: 0.2em;
            transition: color 200ms;
          }
          .toc-link::before,
          .num-item::before {
            content: attr(data-n);
            font-family: var(--font-label);
            font-weight: 600;
            letter-spacing: 0.12em;
            color: var(--signal);
            font-variant-numeric: tabular-nums;
          }
          .toc-link::before {
            font-size: 0.62em;
            vertical-align: 0.55em;
            margin-right: 0.3em;
          }
          .num-item::before {
            display: block;
            font-size: 0.75rem;
            margin-bottom: 0.6rem;
          }
          .toc-link:hover { color: var(--signal); }
        `}</style>
      </Slide>

      {/* ================================================================
          Part 1
          ================================================================ */}
      <PartPlate id="part-1" n={1} title="The Marketing Environment">
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-12">
          <div className="space-y-7">
            <Lead className="!max-w-[52ch]">
              A company&apos;s marketing environment consists of the{" "}
              <Term tone="counter">actors and forces outside marketing</Term>{" "}
              that affect marketing management&apos;s ability to build and
              maintain successful relationships with{" "}
              <Term>target customers</Term>.
            </Lead>
            <Ruled weight="thick">
              <P>
                It is made up of a <Term tone="ink">microenvironment</Term> and
                a <Term tone="counter">macroenvironment</Term>.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thick">
              <p className="type-h2 !font-normal">
                Marketers must be environmental trend trackers and opportunity
                seekers.
              </p>
            </Ruled>
          </div>
          <Plate>
            <EnvironmentRings />
          </Plate>
        </div>
      </PartPlate>

      <Slide id="microenvironment" border exercise={exercise["microenvironment"]}>
        <Tag>Six actors</Tag>
        <Heading className={HEAD}>The Microenvironment</Heading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.5rem,2.4vw,2.1rem)]">
          The microenvironment consists of the{" "}
          <span className="text-[var(--signal)]">
            actors close to the company
          </span>{" "}
          that affect its ability to serve its customers.
        </Statement>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
          <Plate>
            <MicroActors />
          </Plate>
          <div className="space-y-8">
            <Ruled weight="thick">
              <P>
                These actors include the company itself, suppliers, marketing
                intermediaries, customer markets, competitors, and publics.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thick">
              <P>
                Success depends on building relationships with{" "}
                <Term>other company departments</Term> and these{" "}
                <Term tone="counter">external partners</Term>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="macroenvironment" border exercise={exercise["macroenvironment"]}>
        <Tag>Larger societal forces</Tag>
        <Heading className={HEAD}>The Macroenvironment</Heading>
        <div className="grid w-full items-center gap-8 xl:grid-cols-[minmax(0,19rem)_1fr] xl:gap-12">
          <div className="space-y-8">
            <Lead>
              The macroenvironment consists of the larger societal forces that
              affect the microenvironment.
            </Lead>
            <P>
              It shapes <Term tone="counter">opportunities</Term> and poses{" "}
              <Term>threats</Term> to the company.
            </P>
            <Ruled tone="signal" weight="thick">
              <P>
                We often use the <Term tone="ink">PESTLE framework</Term> to
                analyze these broad forces.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PestleHub />
          </Plate>
        </div>
      </Slide>

      <PestlePair
        id="pestle-political-economic"
        title="Political and Economic"
        active={[0, 1]}
        layout="columns"
        closing={
          <>
            These forces dictate{" "}
            <span className="text-[var(--signal)]">
              how a business can operate
            </span>{" "}
            and{" "}
            <span className="text-[var(--counter)]">
              whether consumers can afford their products
            </span>
            .
          </>
        }
      >
        <Force tone="signal" plate={<PoliticalCorridor />}>
          <Term tone="ink">Political:</Term> Laws, government agencies, and
          pressure groups that influence or limit organizations and individuals.
        </Force>
        <Force tone="counter" plate={<EconomicThreshold />}>
          <Term tone="ink">Economic:</Term> Factors that affect consumer
          purchasing power and spending patterns, such as inflation and interest
          rates.
        </Force>
      </PestlePair>

      <PestlePair
        id="pestle-social-technological"
        title="Social and Technological"
        active={[2, 3]}
        layout="rows"
        closing={
          <>
            Marketers must{" "}
            <span className="text-[var(--signal)]">track cultural trends</span>{" "}
            and{" "}
            <span className="text-[var(--counter)]">
              adopt relevant technologies
            </span>{" "}
            to stay competitive.
          </>
        }
      >
        <Force tone="signal" plate={<SocialStrata />} beside>
          <Term tone="ink">Social:</Term> Institutions and other forces that
          affect a society&apos;s basic values, perceptions, preferences, and
          behaviors.
        </Force>
        <Force tone="counter" plate={<TechnologyBranches />} beside>
          <Term tone="ink">Technological:</Term> Forces that create new
          technologies, creating new product and market opportunities.
        </Force>
      </PestlePair>

      <PestlePair
        id="pestle-legal-environmental"
        title="Legal and Environmental"
        active={[4, 5]}
        layout="triple"
        closing={
          <>
            <span className="text-[var(--signal)]">Compliance</span> and{" "}
            <span className="text-[var(--counter)]">
              environmental sustainability
            </span>{" "}
            are now baseline expectations for modern businesses.
          </>
        }
      >
        <Force tone="signal" plate={<LegislationCanopy />}>
          <Term tone="ink">Legal:</Term> Specific legislation protecting
          companies from each other, protecting consumers, and protecting the
          interests of society.
        </Force>
        <Force tone="counter" plate={<ResourceExchange />}>
          <Term tone="ink">Environmental:</Term> Natural resources that are
          needed as inputs by marketers or that are affected by marketing
          activities.
        </Force>
      </PestlePair>

      <Slide id="discussion-environmental-forces" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Environmental Forces
        </KickerHeading>
        <Prompt>
          <PromptKicker /> If a global coffee chain wants to enter a new
          emerging market,{" "}
          <span className="text-[var(--signal)]">which PESTLE factor</span>{" "}
          might pose the most immediate and unpredictable challenge to their
          launch strategy, and why?
        </Prompt>
        <ol
          aria-hidden
          className="mt-8 grid w-full max-w-5xl grid-cols-3 border-l border-t border-[var(--counter-line)] md:grid-cols-6"
        >
          {FORCES.map((name) => (
            <li
              key={name}
              className="border-b border-r border-[var(--counter-line)] px-3 py-4 md:px-4"
            >
              <span
                className="block text-[2.25rem] leading-none text-[var(--counter)]"
                style={SERIF}
              >
                {name[0]}
              </span>
              <span className="mt-2 block text-[0.72rem] leading-tight text-[var(--ink-2)] sm:text-[0.8rem] [overflow-wrap:anywhere]">
                {name}
              </span>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Part 2
          ================================================================ */}
      <PartPlate id="part-2" n={2} title="Corporate Social Responsibility (CSR)">
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
          <Lead>
            Beyond analyzing the environment, companies must respond to
            societal expectations.
          </Lead>
          <P>
            Corporate Social Responsibility involves{" "}
            <Term tone="counter">self-regulating business models</Term> that
            help a company be socially accountable.
          </P>
        </div>
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10">
          <Statement className="!text-[clamp(1.5rem,2.3vw,2rem)]">
            CSR is not just philanthropy, it is{" "}
            <span className="text-[var(--signal)]">
              deeply integrated into the business strategy
            </span>
            .
          </Statement>
          <Plate>
            <CsrWeave />
          </Plate>
        </div>
      </PartPlate>

      <Slide id="pillars-of-csr" border exercise={exercise["pillars-of-csr"]}>
        <Tag>Four responsibilities</Tag>
        <Heading className={HEAD}>The Pillars of CSR</Heading>
        <CsrTemple />
      </Slide>

      <Slide id="business-case-for-csr" border>
        <Tag>Why it pays</Tag>
        <Heading className={HEAD}>The Business Case for CSR</Heading>
        <BusinessCase />
      </Slide>

      <Slide id="greenwashing" border>
        <Tag>Claims against action</Tag>
        <Heading className={HEAD}>Greenwashing: A Marketing Trap</Heading>
        <div className={BESIDE}>
          <Lead className="!max-w-[40ch]">
            Greenwashing occurs when a company spends more time and money{" "}
            <Term tone="counter">claiming to be &quot;green&quot;</Term> than{" "}
            <Term tone="ink">actually implementing</Term> business practices
            that minimize environmental impact.
          </Lead>
          <Plate>
            <GreenwashingGap />
          </Plate>
        </div>
        <div className="mt-10 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal" weight="thick">
            <P>
              It damages <Term>brand trust</Term> and can lead to{" "}
              <Term>legal penalties</Term>.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thick">
            <p className="type-h2 !font-normal">
              Transparency and authentic action are the only cures for
              greenwashing.
            </p>
          </Ruled>
        </div>
      </Slide>

      <Slide id="discussion-cost-of-csr" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          The Cost of CSR
        </KickerHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-12">
          <Prompt>
            <PromptKicker /> When a retail brand publicly commits to sourcing
            100% fair-trade materials, prices inevitably rise. Should the brand{" "}
            <span className="text-[var(--signal)]">absorb the cost</span>, or{" "}
            <span className="text-[var(--counter)]">
              pass it on to consumers
            </span>
            , and how does this affect their competitive positioning?
          </Prompt>
          <Plate>
            <AbsorbOrPass />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 3
          ================================================================ */}
      <PartPlate id="part-3" n={3} title="Ethical Considerations in Marketing">
        <Lead className="mt-8 !max-w-[52ch]">
          Marketing ethics are the broad guidelines that{" "}
          <Term tone="ink">everyone in the organization</Term> must follow.
        </Lead>
        <div className="mt-8">
          <p className="type-label !text-[var(--ink-3)]">
            These policies cover
          </p>
          <ol className="mt-4 grid w-full gap-x-10 border-t-2 border-[var(--ink)] sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "distributor relations,"],
              ["02", "advertising standards,"],
              ["03", "customer service,"],
              ["04", "pricing,"],
              ["05", "product development,"],
              ["06", "and general ethical standards."],
            ].map(([n, item]) => (
              <li
                key={n}
                data-n={n}
                className="num-item border-b border-[var(--rule)] py-4 type-h2 !font-normal"
              >
                {" "}
                {item}
              </li>
            ))}
          </ol>
        </div>
        <Statement className="mt-8 !text-[clamp(1.8rem,3.2vw,2.8rem)]">
          Good <span className="text-[var(--counter)]">ethics</span> is good{" "}
          <span className="text-[var(--signal)]">business</span>.
        </Statement>
      </PartPlate>

      <Slide id="deceptive-practices" border exercise={exercise["deceptive-practices"]}>
        <Tag>Pricing and promotion</Tag>
        <Heading className={HEAD}>Deceptive Practices</Heading>
        <div className="grid w-full gap-12 lg:grid-cols-2">
          {(
            [
              [
                "Deceptive pricing",
                <P key="p">
                  Deceptive pricing includes falsely advertising
                  &quot;factory&quot; or &quot;wholesale&quot; prices or a large
                  price reduction from a <Term>phony high retail price</Term>.
                </P>,
                <PhonyPriceTag key="v" />,
              ],
              [
                "Deceptive promotion",
                <P key="p">
                  Deceptive promotion includes{" "}
                  <Term>
                    misrepresenting the product&apos;s features or performance
                  </Term>
                  .
                </P>,
                <MisrepresentedChecklist key="v" />,
              ],
            ] as const
          ).map(([key, text, plate]) => (
            <div key={key} className="flex min-w-0 flex-col">
              <div aria-hidden className="type-label mb-4 border-t-2 border-[var(--signal)] pt-4">
                {key}
              </div>
              <div className="mb-5 min-h-[3.4em]">{text}</div>
              <Plate className="mt-auto max-w-[25rem]">{plate}</Plate>
            </div>
          ))}
        </div>
        <Statement className="mt-10 !max-w-[40ch] !text-[clamp(1.5rem,2.4vw,2.1rem)]">
          These practices harm consumers and ultimately destroy{" "}
          <span className="text-[var(--signal)]">brand equity</span>.
        </Statement>
      </Slide>

      <Slide id="high-pressure-selling" border>
        <Tag>Short term, long term</Tag>
        <Heading className={HEAD}>High-Pressure Selling</Heading>
        <Statement className="!max-w-[36ch]">
          Involves persuading people to buy goods they had no thought of
          buying.
        </Statement>
        <div className="mt-10 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,27rem)] lg:gap-12">
          <Ruled>
            <P>
              It is often used for <Term tone="ink">unsought goods</Term> or in{" "}
              <Term tone="ink">aggressive B2B environments</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thick">
            <p className="type-h2 !font-normal">
              High-pressure selling yields{" "}
              <span className="text-[var(--signal)]">short-term gains</span> but
              damages{" "}
              <span className="text-[var(--counter)]">
                long-term relationships and reputation
              </span>
              .
            </p>
          </Ruled>
          <Plate>
            <PressureOverTime />
          </Plate>
        </div>
      </Slide>

      <Slide id="planned-obsolescence" border>
        <Tag>Before it needs replacement</Tag>
        <Heading className={HEAD}>Planned Obsolescence</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-14">
          <div>
            <Lead className="!max-w-[40ch]">
              Causing products to become obsolete{" "}
              <Term>before they actually need replacement</Term>.
            </Lead>
            <p className="type-label mt-8 !text-[var(--ink-3)]">
              Strategies include
            </p>
            <ol className="mt-3 w-full border-t-2 border-[var(--ink)]">
              {(
                [
                  ["break", "using materials that break easily,"],
                  ["styles", "continuous changing of styles,"],
                  ["delay", "or delaying functional features until later models."],
                ] as const
              ).map(([kind, item]) => (
                <li
                  key={kind}
                  className="flex items-center gap-5 border-b border-[var(--rule)] py-3.5 type-h2 !font-normal"
                >
                  {" "}
                  <StrategyGlyph kind={kind} />
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Plate>
              <ObsolescenceLifespans />
            </Plate>
            <Ruled tone="signal" weight="thick" className="mt-6">
              <P>
                While it drives{" "}
                <Term tone="ink">frequent replacement sales</Term>, it raises
                significant <Term>environmental and ethical concerns</Term>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="sustainable-marketing" border>
        <Tag>Now and later</Tag>
        <Heading className={HEAD}>Sustainable Marketing</Heading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-14">
          <Lead>
            Socially and environmentally responsible marketing that meets the{" "}
            <Term tone="ink">present needs</Term> of consumers and businesses.
          </Lead>
          <Lead>
            It also preserves or enhances the ability of{" "}
            <Term tone="counter">future generations</Term> to meet their needs.
          </Lead>
        </div>
        <div className="mt-10 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14">
          <Plate>
            <GenerationsBand />
          </Plate>
          <div className="space-y-8">
            <p className="type-h2 !font-normal max-w-[30ch]">
              It goes beyond the marketing concept to adopt a{" "}
              <span className="text-[var(--signal)]">
                societal marketing concept
              </span>
              .
            </p>
            <ConceptStep />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <KickerHeading kicker="Conclusion:">Adapting Responsibly</KickerHeading>
        <ol className="grid w-full gap-x-12 gap-y-12 md:grid-cols-3">
          {[
            {
              glyph: <GlyphRings />,
              text: "The marketing environment is dynamic and constantly evolving.",
            },
            {
              glyph: <GlyphHub />,
              text: "Companies must actively monitor micro and macro forces to seize opportunities and mitigate threats.",
            },
            {
              glyph: <GlyphTemple />,
              text: "Ultimately, long-term success requires a commitment to ethical practices and genuine corporate social responsibility.",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="flex flex-col gap-6 border-t-2 border-[var(--ink)] pt-6"
            >
              <div aria-hidden className="flex items-center justify-between">
                <span
                  className="text-[2.6rem] leading-none text-[var(--signal)]"
                  style={SERIF}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.glyph}
              </div>
              <p className="type-h2 !font-normal">{item.text}</p>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
