"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// INTERACTIVE SLIDE COMPONENTS
// ============================================================================
// Companion library to SlideComponents.tsx.
//
// Three rules hold the deck together:
//
// 1. LAYOUT NEVER SHIFTS. Anything that swaps content does it through `Stage`:
//    every variant is rendered into one shared CSS grid cell, so the container
//    is sized by its tallest variant from first paint and interaction only
//    changes opacity. No height animations anywhere in this file.
//
// 2. MOTION IS OPACITY AND A FEW PIXELS. No blur, no scale, no spring, no
//    bounce. Transitions are 400-700ms and ease-out. The deck's entrances are
//    handled once by SlideDeck's masked-type reveal.
//
// 3. THE PALETTE IS MOSTLY INK ON CREAM. Hairlines rather than boxes, crimson
//    reserved for the single active thing on screen, champagne for small caps
//    labels and numerals. No shadows, no dashes, no fills.
//
// Content strings are passed in verbatim from the week's content.md; these
// components decide only how a sentence appears, never what it says.

const CORRECT = "#3d5c2a";

/** Two-digit index label used across the deck ("01", "02", ...). */
function ordinal(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** Shared small-caps label styling. */
const MICRO =
  "font-sans text-[10px] font-semibold uppercase tracking-[0.22em]";

/**
 * Stage - Cross-fades between variants without ever changing height.
 *
 * All children are laid into the same grid cell, so the element is always as
 * tall as its tallest variant and switching `active` moves nothing.
 */
function Stage({
  active,
  children,
  className = "",
}: {
  active: number;
  children: React.ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("grid", className)}>
      {children.map((child, index) => (
        <div
          key={index}
          aria-hidden={index !== active}
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-150 ease-out",
            index === active ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/**
 * Toggle - Minimal open/closed mark: a fixed cross whose vertical stroke
 * retracts. No rotation, no icon font.
 */
function Toggle({ open }: { open: boolean }) {
  return (
    <span className="relative block h-2.5 w-2.5" aria-hidden>
      <span className="absolute left-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-current" />
      <span
        className={cn(
          "absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-current",
          open ? "scale-y-0" : "scale-y-100",
        )}
      />
    </span>
  );
}

// ============================================================================
// DECK CHROME
// ============================================================================

/**
 * ScrollProgress - One hairline of reading progress across the top of the deck.
 */
export function ScrollProgress({ label }: { label?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="h-px w-full bg-[var(--charcoal)]/8">
        <div
          className="h-px origin-left bg-[var(--crimson)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      {label && (
        <span
          className={cn(
            MICRO,
            "absolute right-8 top-7 hidden text-[var(--charcoal-light)]/70 md:block",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * SlideHead - The editorial masthead every content slide opens with:
 * the heading, then a short crimson rule that draws itself in.
 *
 * Pass the Heading component as `children`.
 */
export function SlideHead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("w-full", className)}>
      {children}
      <span className="mt-5 block h-px w-20 origin-left bg-[var(--crimson)]" />
    </header>
  );
}

/**
 * ModuleMark - Oversized roman numeral for module dividers.
 */
export function ModuleMark({
  label,
  numeral,
  className = "",
}: {
  /** Kept visible so the divider still reads as the section it names. */
  label: string;
  numeral: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className={cn(MICRO, "text-[var(--champagne)]")}>{label}</span>
      <span className="mt-3 font-serif text-[3.5rem] font-black leading-none tracking-[-0.04em] text-[var(--champagne)]/80 md:text-[5rem]">
        {numeral}
      </span>
      <span className="mt-5 block h-px w-16 origin-left bg-[var(--gold)]/60" />
    </div>
  );
}

/**
 * Eyebrow - Small-caps label with a leading rule.
 */
export function Eyebrow({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      <span className="h-px w-8 flex-shrink-0 bg-[var(--gold)]/70" />
      <span className={cn(MICRO, "text-[var(--champagne)]")}>{children}</span>
    </div>
  );
}

/**
 * Lead - Opening line beneath a masthead. Larger and lighter than body copy.
 */
export function Lead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-3xl text-left text-lg font-light leading-[1.55] text-[var(--charcoal-light)] md:text-[1.35rem]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * BigStatement - A single sentence given the full width of the slide.
 */
export function BigStatement({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <span className="block h-px w-full origin-left bg-[var(--charcoal)]/12" />
      <p className="py-7 text-left font-serif text-[1.5rem] font-light leading-[1.25] tracking-[-0.015em] text-[var(--charcoal)] md:py-9 md:text-[2.25rem]">
        {children}
      </p>
      <span className="block h-px w-full origin-left bg-[var(--charcoal)]/12" />
    </div>
  );
}

// ============================================================================
// REVEAL GRID
// ============================================================================

/**
 * RevealGrid - Column of tiles whose body copy is revealed on click.
 *
 * The body text is always in the layout — it is only made transparent — so a
 * tile is at full height from first paint and opening one never nudges its
 * neighbours or the slides below. Tiles in a row are equal height by default.
 */
export function RevealGrid({
  items,
  columns = 3,
  openFirst = false,
  className = "",
}: {
  items: { label: string; text: React.ReactNode }[];
  columns?: 2 | 3 | 4;
  openFirst?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState<number[]>(openFirst ? [0] : []);

  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const toggle = (index: number) =>
    setOpen((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index],
    );

  return (
    <div
      className={cn(
        "grid w-full gap-x-8 gap-y-6",
        gridClass,
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => toggle(index)}
            aria-expanded={isOpen}
            className={cn(
              "group flex h-full cursor-pointer flex-col border-t pt-5 text-left transition-colors duration-150",
              isOpen
                ? "border-t-[var(--crimson)]"
                : "border-t-[var(--charcoal)]/15 hover:border-t-[var(--charcoal)]/40",
            )}
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-serif text-[11px] tracking-[0.18em] text-[var(--champagne)]">
                {ordinal(index)}
              </span>
              <span
                className={cn(
                  "transition-colors duration-150",
                  isOpen
                    ? "text-[var(--crimson)]"
                    : "text-[var(--charcoal-light)]/70 group-hover:text-[var(--charcoal)]",
                )}
              >
                <Toggle open={isOpen} />
              </span>
            </div>

            <h3 className="mt-5 font-serif text-[1.25rem] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--charcoal)] md:text-[1.4rem]">
              {item.label}
            </h3>

            {/* Always in the layout; only its opacity changes. */}
            <p
              aria-hidden={!isOpen}
              className={cn(
                "mt-3 flex-1 text-[0.9375rem] font-light leading-[1.5] text-[var(--charcoal-light)] transition-opacity duration-150 ease-out",
                isOpen ? "opacity-100" : "opacity-0",
              )}
            >
              {item.text}
            </p>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// SPLIT COMPARE
// ============================================================================

/**
 * SplitCompare - Two positions set against each other, separated by a hairline.
 *
 * Clicking a side holds it and recedes the other. Both remain readable.
 */
export function SplitCompare({
  left,
  right,
  className = "",
}: {
  left: { label: string; points: React.ReactNode[] };
  right: { label: string; points: React.ReactNode[] };
  className?: string;
}) {
  const [focus, setFocus] = useState<"left" | "right" | null>(null);

  const panel = (
    side: "left" | "right",
    data: { label: string; points: React.ReactNode[] },
  ) => {
    const isFocused = focus === side;
    const isReceded = focus !== null && !isFocused;

    return (
      <button
        type="button"
        onClick={() => setFocus(isFocused ? null : side)}
        aria-pressed={isFocused}
        className={cn(
          "flex-1 cursor-pointer border-t pt-5 text-left transition-[opacity,border-color] duration-150 ease-out",
          isFocused
            ? "border-t-[var(--crimson)]"
            : "border-t-[var(--charcoal)]/15",
          isReceded ? "opacity-40" : "opacity-100",
        )}
      >
        <h3
          className={cn(
            MICRO,
            "mb-5 transition-colors duration-150",
            isFocused ? "text-[var(--crimson)]" : "text-[var(--champagne)]",
          )}
        >
          {data.label}
        </h3>
        <ul className="space-y-4">
          {data.points.map((point, index) => (
            <li
              key={index}
              className="text-base font-light leading-[1.55] text-[var(--charcoal)] md:text-lg"
            >
              {point}
            </li>
          ))}
        </ul>
      </button>
    );
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col items-stretch gap-8 md:flex-row md:gap-0",
        className,
      )}
    >
      {panel("left", left)}
      <div className="mx-10 hidden w-px flex-shrink-0 bg-[var(--charcoal)]/10 md:block" />
      {panel("right", right)}
    </div>
  );
}

// ============================================================================
// STEP TIMELINE
// ============================================================================

/**
 * StepTimeline - A progression read one stop at a time.
 *
 * The rail fills to the selected stop; the detail beneath cross-fades in a
 * fixed-height Stage.
 */
export function StepTimeline({
  steps,
  className = "",
}: {
  steps: { label: string; text: React.ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const progress = steps.length > 1 ? active / (steps.length - 1) : 1;

  return (
    <div className={cn("w-full", className)}>
      {/*
        Rail. Horizontal on desktop; on a phone four multi-word labels cannot
        share a row, so it becomes a vertical list instead of being squeezed.
      */}
      <div className="relative">
        <span className="absolute inset-x-0 top-[3px] hidden h-px bg-[var(--charcoal)]/12 md:block" />
        <span
          className="absolute left-0 top-[3px] hidden h-px w-full origin-left bg-[var(--crimson)] md:block"
          style={{ transform: `scaleX(${progress})` }}
        />
        <span className="absolute bottom-0 left-[3px] top-0 w-px bg-[var(--charcoal)]/12 md:hidden" />
        <span
          className="absolute left-[3px] top-0 h-full w-px origin-top bg-[var(--crimson)] md:hidden"
          style={{ transform: `scaleY(${progress})` }}
        />

        <ol className="relative flex flex-col gap-5 md:flex-row md:gap-0">
          {steps.map((step, index) => {
            const reached = index <= active;
            const isActive = index === active;
            return (
              <li
                key={step.label}
                className={cn(
                  "flex md:flex-1",
                  index === 0
                    ? "md:justify-start"
                    : index === steps.length - 1
                      ? "md:justify-end"
                      : "md:justify-center",
                )}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={isActive}
                  className="group flex cursor-pointer items-center gap-4 md:flex-col md:items-start md:gap-4"
                >
                  <span
                    className={cn(
                      "h-[7px] w-[7px] flex-shrink-0 transition-colors duration-150",
                      isActive
                        ? "bg-[var(--crimson)]"
                        : reached
                          ? "bg-[var(--crimson)]/45"
                          : "bg-[var(--charcoal)]/25 group-hover:bg-[var(--charcoal)]/50",
                    )}
                  />
                  <span
                    className={cn(
                      MICRO,
                      "text-left transition-colors duration-150 md:whitespace-nowrap",
                      isActive
                        ? "text-[var(--crimson)]"
                        : "text-[var(--charcoal-light)]/70 group-hover:text-[var(--charcoal)]",
                    )}
                  >
                    {step.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Detail */}
      <Stage active={active} className="mt-10">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-8">
            <span className="mt-2 font-serif text-[11px] tracking-[0.18em] text-[var(--champagne)]">
              {ordinal(index)}
            </span>
            <p className="max-w-3xl font-serif text-[1.35rem] font-light leading-[1.3] text-[var(--charcoal)] md:text-[1.75rem]">
              {step.text}
            </p>
          </div>
        ))}
      </Stage>
    </div>
  );
}

// ============================================================================
// CONCEPT RINGS
// ============================================================================

/**
 * ConceptRings - Nested circles for a containment relationship.
 *
 * Built for AI > machine learning > deep learning: selecting a ring prints its
 * definition alongside, so the nesting is read as structure.
 */
export function ConceptRings({
  layers,
  className = "",
}: {
  layers: { label: string; text: React.ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const sizes = useMemo(
    () => layers.map((_, index) => 100 - index * (56 / layers.length)),
    [layers],
  );

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center gap-10 lg:flex-row lg:gap-16",
        className,
      )}
    >
      {/* Diagram */}
      <div className="relative aspect-square w-full max-w-[260px] flex-shrink-0">
        {layers.map((layer, index) => {
          const isActive = index === active;
          const isInnermost = index === layers.length - 1;
          return (
            <button
              key={layer.label}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              style={{ width: `${sizes[index]}%`, height: `${sizes[index]}%` }}
              className={cn(
                "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer justify-center rounded-full border transition-colors duration-150",
                isInnermost ? "items-center" : "items-start",
                isActive
                  ? "border-[var(--crimson)] bg-[var(--crimson)]/[0.035]"
                  : "border-[var(--charcoal)]/15 hover:border-[var(--charcoal)]/35",
              )}
            >
              <span
                className={cn(
                  MICRO,
                  "px-4 text-center leading-tight transition-colors duration-150",
                  isInnermost ? "" : "mt-[5%]",
                  isActive
                    ? "text-[var(--crimson)]"
                    : "text-[var(--charcoal-light)]/70",
                )}
              >
                {layer.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Definition */}
      <Stage active={active} className="w-full flex-1">
        {layers.map((layer, index) => (
          <p
            key={index}
            className="text-left font-serif text-[1.35rem] font-light leading-[1.3] text-[var(--charcoal)] md:text-[1.75rem]"
          >
            {layer.text}
          </p>
        ))}
      </Stage>
    </div>
  );
}

// ============================================================================
// STAKES DIAL
// ============================================================================

/**
 * StakesDial - Drag the cost of error and the governance rule changes.
 *
 * Turns the automation guidance into something the student operates rather
 * than something they read.
 */
export function StakesDial({
  axis,
  low,
  high,
  className = "",
}: {
  axis: { low: string; high: string };
  low: { label: string; text: React.ReactNode };
  high: { label: string; text: React.ReactNode };
  className?: string;
}) {
  const [value, setValue] = useState(18);
  const isHigh = value >= 50;
  const zones = [low, high];

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4 flex items-baseline justify-between">
        <span className={cn(MICRO, "text-[var(--charcoal-light)]/70")}>
          {axis.low}
        </span>
        <span className={cn(MICRO, "text-[var(--charcoal-light)]/70")}>
          {axis.high}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-8">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[var(--charcoal)]/15" />
        <span
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-[var(--crimson)]"
          style={{ width: `${value}%` }}
        />
        <span
          className="absolute top-1/2 h-4 w-px -translate-y-1/2 bg-[var(--charcoal)]/20"
          style={{ left: "50%" }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute top-1/2 h-5 w-[3px] -translate-x-1/2 -translate-y-1/2 bg-[var(--crimson)]"
          style={{ left: `${value}%` }}
          aria-hidden
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-label={`${axis.low} to ${axis.high}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      {/* Recommendation */}
      <Stage active={isHigh ? 1 : 0} className="mt-8">
        {zones.map((zone, index) => (
          <div key={index} className="border-l border-[var(--crimson)] pl-8">
            <span className={cn(MICRO, "mb-3 block text-[var(--crimson)]")}>
              {zone.label}
            </span>
            <p className="max-w-3xl text-lg font-light leading-[1.5] text-[var(--charcoal)] md:text-[1.35rem]">
              {zone.text}
            </p>
          </div>
        ))}
      </Stage>
    </div>
  );
}

// ============================================================================
// FLYWHEEL
// ============================================================================

/**
 * Flywheel - A loop that keeps turning until the student holds a stage.
 *
 * The rotation is a CSS keyframe on the SVG rather than a per-frame JS
 * animation, so a long deck is not paying for it on the main thread.
 */
export function Flywheel({
  stages,
  className = "",
}: {
  stages: { label: string; text: React.ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);

  const positions = useMemo(
    () =>
      stages.map((_, index) => {
        const angle = (-90 + (360 / stages.length) * index) * (Math.PI / 180);
        return {
          left: `${(50 + 40 * Math.cos(angle)).toFixed(4)}%`,
          top: `${(50 + 40 * Math.sin(angle)).toFixed(4)}%`,
        };
      }),
    [stages],
  );

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center gap-10 lg:flex-row lg:gap-16",
        className,
      )}
    >
      {/* Wheel. The inset leaves room for labels that sit outside the ring. */}
      <div className="relative mx-auto aspect-square w-[calc(100%-3rem)] max-w-[260px] flex-shrink-0">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--charcoal)"
            strokeOpacity="0.12"
            strokeWidth="0.4"
          />
        </svg>

        {stages.map((stage, index) => {
          const isActive = index === active;
          return (
            <button
              key={stage.label}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              style={positions[index]}
              className="absolute flex w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center md:w-28"
            >
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border bg-[var(--background)] font-serif text-[11px] tracking-[0.14em] transition-colors duration-150 md:h-14 md:w-14",
                  isActive
                    ? "border-[var(--crimson)] text-[var(--crimson)]"
                    : "border-[var(--charcoal)]/15 text-[var(--charcoal-light)]/70",
                )}
              >
                {ordinal(index)}
              </span>
              <span
                className={cn(
                  MICRO,
                  "mt-3 block w-full text-center leading-tight transition-colors duration-150",
                  isActive
                    ? "text-[var(--crimson)]"
                    : "text-[var(--charcoal-light)]/70",
                )}
              >
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage detail */}
      <Stage active={active} className="w-full flex-1">
        {stages.map((stage, index) => (
          <p
            key={index}
            className="text-left font-serif text-[1.35rem] font-light leading-[1.3] text-[var(--charcoal)] md:text-[1.75rem]"
          >
            {stage.text}
          </p>
        ))}
      </Stage>
    </div>
  );
}

// ============================================================================
// SORTING BOARD
// ============================================================================

/**
 * SortingBoard - Select an example, then place it in a category.
 *
 * A hands-on check on material presented directly above it. Correct placements
 * stick; an incorrect one is refused with a change of colour only, so the board
 * never moves under the cursor.
 */
export function SortingBoard({
  bins,
  items,
  className = "",
}: {
  /** `description` lets the category carry its own definition, so the
      board doubles as the definition pair instead of repeating it above. */
  bins: [
    { key: string; label: string; description?: React.ReactNode },
    { key: string; label: string; description?: React.ReactNode },
  ];
  items: { text: string; bin: string }[];
  className?: string;
}) {
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [refused, setRefused] = useState<string | null>(null);

  const placedCount = Object.keys(placed).length;

  const drop = (binKey: string) => {
    if (selected === null) return;

    if (items[selected].bin === binKey) {
      setPlaced((current) => ({ ...current, [selected]: binKey }));
      setSelected(null);
      setRefused(null);
      return;
    }

    setRefused(binKey);
    window.setTimeout(() => setRefused(null), 700);
  };

  const reset = () => {
    setPlaced({});
    setSelected(null);
    setRefused(null);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between border-b border-[var(--charcoal)]/12 pb-4">
        <span className={cn(MICRO, "text-[var(--champagne)]")}>
          Place each example
        </span>
        <div className="flex items-baseline gap-8">
          <span className="font-serif text-[11px] tracking-[0.18em] text-[var(--charcoal-light)]/70">
            {placedCount} / {items.length}
          </span>
          <button
            type="button"
            onClick={reset}
            disabled={placedCount === 0}
            className={cn(
              MICRO,
              "transition-colors duration-150 disabled:cursor-default disabled:text-[var(--charcoal-light)]/70",
              placedCount > 0
                ? "cursor-pointer text-[var(--charcoal-light)]/70 hover:text-[var(--crimson)]"
                : "",
            )}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Pool. Placed chips stay in the flow at zero opacity so the row of
          examples keeps its height as the board is worked through. */}
      <div className="flex min-h-[3rem] flex-wrap items-start gap-x-2.5 gap-y-2.5 py-5">
        {items.map((item, index) => {
          const isPlaced = Boolean(placed[index]);
          const isSelected = selected === index;
          return (
            <button
              key={item.text}
              type="button"
              disabled={isPlaced}
              aria-hidden={isPlaced}
              onClick={() =>
                setSelected((current) => (current === index ? null : index))
              }
              aria-pressed={isSelected}
              className={cn(
                "border px-4 py-2 font-sans text-[0.9rem] transition-[opacity,border-color,color] duration-150",
                isPlaced
                  ? "pointer-events-none border-transparent opacity-0"
                  : isSelected
                    ? "cursor-pointer border-[var(--crimson)] text-[var(--crimson)]"
                    : "cursor-pointer border-[var(--charcoal)]/18 text-[var(--charcoal-light)] hover:border-[var(--charcoal)]/45",
              )}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      {/* Bins */}
      <div className="grid gap-8 md:grid-cols-2">
        {bins.map((bin) => {
          const contents = items
            .map((item, index) => ({ item, index }))
            .filter(({ index }) => placed[index] === bin.key);
          const isRefused = refused === bin.key;
          const armed = selected !== null;

          return (
            <button
              key={bin.key}
              type="button"
              onClick={() => drop(bin.key)}
              className={cn(
                "min-h-[9rem] border-t pt-5 text-left transition-colors duration-150",
                isRefused
                  ? "border-t-[var(--crimson)]"
                  : armed
                    ? "cursor-pointer border-t-[var(--champagne)]"
                    : "border-t-[var(--charcoal)]/15",
              )}
            >
              <h4
                className={cn(
                  MICRO,
                  "mb-4 transition-colors duration-150",
                  isRefused
                    ? "text-[var(--crimson)]"
                    : "text-[var(--charcoal)]",
                )}
              >
                {bin.label}
              </h4>

              {bin.description && (
                <p className="mb-5 max-w-prose text-[0.9375rem] font-light leading-[1.55] text-[var(--charcoal-light)]">
                  {bin.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2.5">
                {contents.map(({ item, index }) => (
                  <span
                    key={index}
                    className="border px-4 py-2 font-sans text-[0.9rem]"
                    style={{ borderColor: `${CORRECT}40`, color: CORRECT }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// ROADMAP RAIL
// ============================================================================

/**
 * RoadmapRail - Numbered stops read one at a time.
 */
export function RoadmapRail({
  stops,
  className = "",
}: {
  stops: { id: string; text: React.ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex gap-10 overflow-x-auto border-b border-[var(--charcoal)]/12 pb-5">
        {stops.map((stop, index) => {
          const isActive = index === active;
          return (
            <button
              key={stop.id}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              className={cn(
                "flex-shrink-0 cursor-pointer font-serif text-xl tracking-[-0.01em] transition-colors duration-150 md:text-[1.6rem]",
                isActive
                  ? "text-[var(--crimson)]"
                  : "text-[var(--charcoal-light)]/70 hover:text-[var(--charcoal)]",
              )}
            >
              {stop.id}
            </button>
          );
        })}
      </div>

      <Stage active={active} className="mt-10">
        {stops.map((stop, index) => (
          <p
            key={index}
            className="max-w-4xl text-left font-serif text-[1.4rem] font-light leading-[1.3] text-[var(--charcoal)] md:text-[2rem]"
          >
            {stop.text}
          </p>
        ))}
      </Stage>
    </div>
  );
}

// ============================================================================
// NUMBERED PRINCIPLES
// ============================================================================

/**
 * NumberedCards - Closing statements as a ranked set rather than a list.
 */
export function NumberedCards({
  items,
  className = "",
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-baseline gap-6 border-t border-[var(--charcoal)]/12 py-5 md:gap-10"
        >
          <span className="flex-shrink-0 font-serif text-[11px] tracking-[0.18em] text-[var(--champagne)]">
            {ordinal(index)}
          </span>
          <p className="max-w-3xl text-left text-base font-light leading-[1.5] text-[var(--charcoal)] md:text-[1.25rem]">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
