/* ==========================================================================
   Shared kit: the building blocks every week draws and lays out with —
   colours and type, the plate frame and label helpers, geometry helpers
   and slide layout blocks. See "Shared pieces" in the root CLAUDE.md.
   ========================================================================== */

import React from "react";
import { Slide } from "@/app/(courses-ai)/_components/SlideComponents";
import { type CourseQuiz } from "@/lib/course-quiz";

/** Small-caps label treatment used for every eyebrow, axis tick and numeral. */
export const MICRO = "font-sans text-[10px] font-semibold uppercase tracking-[0.22em]";

/** The same small-caps treatment for SVG <text>. */
export const SVG_LABEL = {
  fontSize: 9,
  letterSpacing: 2.2,
  fontFamily: "var(--font-sans), sans-serif",
  fontWeight: 600,
} as const;

/** Body sentence at the deck's reading size. */
export const BODY =
  "font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]";

/** A sentence promoted to display weight inside a block. */
export const DISPLAY =
  "font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]";

/** A sentence one step below display, used inside rules and frames. */
export const LEAD =
  "font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]";

/** Hairline that opens each later block of a slide. */
export const RULED = "mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8";

/** Mono tag treatment for words lifted out of a sentence. */
export const TAG = "font-mono text-[10px] uppercase tracking-[0.1em]";

export const pad = (n: number) => String(n).padStart(2, "0");

/** Deterministic 0–1 hash, so scattered marks match between server and client. */
export const hash = (n: number) => {
  const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Right-pointing open arrowhead whose tip sits at (x, y). */
export const headRight = (x: number, y: number) => `M${x - 8} ${y - 5}l8 5l-8 5`;

/** Two sentences side by side under one hairline. */
export const PAIR =
  "mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14";

/** The divider a second column takes inside PAIR. */
export const COL_RULE = "md:border-l md:border-[var(--charcoal)]/10 md:pl-14";

/** Sources listed on the closing Sources slide, by their content.md number. */
export const LISTED = new Set([1, 2, 4, 6, 11, 19, 29, 34, 48]);

export const headLeft = (x: number, y: number) => `M${x + 8} ${y - 5}l-8 5l8 5`;

export const headDown = (x: number, y: number) => `M${x - 5} ${y - 8}l5 8l5-8`;

export const headUp = (x: number, y: number) => `M${x - 5} ${y + 8}l5-8l5 8`;

/** A [cite: N] marker from content.md, set as superscript source numbers. */
export function Cite1({ n }: { n: number[] }) {
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

/** A [cite: N] marker from content.md, set as superscript source numbers. */
export function Cite2({ n }: { n: number[] }) {
  return (
    <sup className="ml-1 whitespace-nowrap font-mono text-[0.5em] font-normal not-italic tracking-normal text-[var(--champagne)]">
      {n.join(", ")}
    </sup>
  );
}

/** Discussion prompt, set apart in the deck's one ruled frame. */
export function Discussion1({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
        <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
        <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
          {children}
        </p>
      </aside>
    </div>
  );
}

/**
 * Discussion prompt, set apart in the deck's one ruled frame. `figure` sits
 * under the prompt when the question itself carries something to draw.
 */
export function Discussion2({
  children,
  figure,
}: {
  children: React.ReactNode;
  figure?: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
        <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
        <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
          {children}
        </p>
        {figure && <div className="mt-8">{figure}</div>}
      </aside>
    </div>
  );
}

/** Eyebrow plus slide heading, the masthead every content slide opens with. */
export function Head1({
  eyebrow,
  children,
  signal = false,
}: {
  eyebrow: string;
  children: React.ReactNode;
  signal?: boolean;
}) {
  return (
    <div>
      <div
        className={`${MICRO} ${
          signal ? "text-[var(--crimson)]" : "text-[var(--champagne)]"
        }`}
      >
        {eyebrow}
      </div>
      <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
        {children}
      </h2>
    </div>
  );
}

/**
 * Eyebrow plus slide heading. When a heading opens with a "Label:" prefix, the
 * prefix is set as a crimson italic kicker on its own line, inside the same h2
 * so the heading still reads as one sentence.
 */
export function Head2({
  eyebrow,
  kicker,
  children,
}: {
  eyebrow: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
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
    </div>
  );
}

/** Eyebrow plus slide heading. */
export function Head3({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={`${MICRO} text-[var(--champagne)]`}>{eyebrow}</div>
      <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
        {children}
      </h2>
    </div>
  );
}

/** One numbered measure: numeral, its sentence, and its own small figure. */
export function Measure({
  n,
  figure,
  children,
}: {
  n: number;
  figure: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="block">
      <div className="grid gap-5 border-t border-[var(--charcoal)]/12 py-8 md:grid-cols-[4ch_1fr_17rem] md:items-center md:gap-10">
        <span className={`${MICRO} text-[var(--crimson)] md:self-start md:pt-2`}>
          {pad(n)}
        </span>
        <div>{children}</div>
        <div aria-hidden className="w-full max-w-[17rem]">
          {figure}
        </div>
      </div>
    </li>
  );
}

/** Module divider: display roman numeral against a ruled margin. */
export function ModulePlate1({
  id,
  numeral,
  title,
  lines,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: string[];
}) {
  return (
    <Slide id={id} border align="left">
      <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
          <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
            {numeral}
          </div>
        </div>

        <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
          <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.5rem]">
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
        </div>
      </div>
    </Slide>
  );
}

/** Module divider: display roman numeral against a ruled margin. */
export function ModulePlate2({
  id,
  numeral,
  title,
  lines,
  quizData,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: string[];
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
          <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
            {numeral}
          </div>
        </div>

        <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
          <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.5rem]">
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
        </div>
      </div>
    </Slide>
  );
}

/**
 * Part divider: display numeral against a ruled margin. The visible label and
 * numeral are decorative; the h2 carries the full "Part N: Title" heading for
 * assistive technology.
 */
export function PartPlate1({
  id,
  numeral,
  title,
  lines,
  quizData,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: string[];
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <div>
          <div aria-hidden>
            <div className={`${MICRO} text-[var(--champagne)]`}>Part</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              {numeral}
            </div>
          </div>
        </div>

        <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
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
        </div>
      </div>
    </Slide>
  );
}

/**
 * Part divider: display numeral against a ruled margin, then the part's own
 * discussion prompt. The visible label and numeral are decorative; the h2
 * carries the full "Part N: Title" heading for assistive technology.
 */
export function PartPlate2({
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
        <div>
          <div aria-hidden>
            <div className={`${MICRO} text-[var(--champagne)]`}>Part</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              {numeral}
            </div>
          </div>
        </div>

        <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
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
        </div>
      </div>

      <div className="w-full md:pl-[14rem]">
        <Discussion1>{discussion}</Discussion1>
      </div>
    </Slide>
  );
}

/**
 * Part divider: display numeral against a ruled margin, then the part's own
 * discussion prompt. The visible label and numeral are decorative; the h2
 * carries the full "Part N: Title" heading for assistive technology.
 */
export function PartPlate3({
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
  lines: React.ReactNode[];
  discussion: string;
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <div>
          <div aria-hidden>
            <div className={`${MICRO} text-[var(--champagne)]`}>Part</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              {numeral}
            </div>
          </div>
        </div>

        <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
          <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.5rem]">
            <span className="sr-only">{`Part ${numeral}: `}</span>
            {title}
          </h2>
          <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
          {lines.map((line, i) => (
            <p
              key={i}
              className={`${
                i === 0 ? "mt-8" : "mt-4"
              } max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="w-full md:pl-[14rem]">
        <Discussion1>{discussion}</Discussion1>
      </div>
    </Slide>
  );
}


/** Two labels set against each other across one rule; the right one is marked. */
export function Split1({
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

/** Two labels set against each other across one rule; the right one is marked. */
export function Split2({
  left,
  right,
  strikeLeft = false,
}: {
  left: string;
  right: string;
  strikeLeft?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="grid grid-cols-2 border-b border-[var(--charcoal)]/15 pb-3"
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

/**
 * A number lifted from the sentence under it, set at display size with its
 * unit in small caps. `mark` turns the number crimson.
 */
export function Stat1({
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

/**
 * A number lifted from the sentence under it, set at display size with its
 * unit in small caps. `mark` turns the number crimson.
 */
export function Stat2({
  value,
  unit,
  mark = false,
}: {
  value: string;
  unit: string;
  mark?: boolean;
}) {
  return (
    <div aria-hidden className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <span
        // Headings take their family from globals.css, which Tailwind's
        // font-serif does not match; borrow it so figures echo the h2s.
        style={{ fontFamily: "var(--font-serif), serif" }}
        className={`text-[3.5rem] font-black leading-none tracking-[-0.04em] md:text-[4.75rem] ${
          mark ? "text-[var(--crimson)]" : "text-[var(--charcoal)]"
        }`}
      >
        {value}
      </span>
      <span className={`${MICRO} text-[var(--charcoal-light)]/65`}>{unit}</span>
    </div>
  );
}

/**
 * Numbered cells in a hairline grid. `cols` carries the responsive column
 * classes; `mark` turns one cell crimson.
 */
export function Steps({
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

/** A sentence's own list, set as middot-separated mono words. */
export function Terms({
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

/** Closing statement in display weight. */
export function Verdict({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <p className="mt-14 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
        {children}
      </p>
    </div>
  );
}
