/* ==========================================================================
   Week 1 — deck layout (Flat Silhouette)
   --------------------------------------------------------------------------
   Poster-like page pieces: warm cream ground, heavy ink rules with a thin
   inner rule, small ink diamonds as the only ornament, SIGNAL red for the
   kicker and numerals. Flat colour only: no gradients, glows or shadows.
   ========================================================================== */

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { CREAM, INK, SIGNAL } from "./visuals";

/* Theme tokens for the shared ProgressBar / FloatingNav, scoped to the deck. */
export const DECK_THEME = {
  "--background": CREAM,
  "--background-alt": CREAM,
  "--card": CREAM,
  "--border": INK,
  "--text-primary": INK,
  "--text-secondary": INK,
  "--text-muted": INK,
  "--accent1": SIGNAL,
  "--accent2": SIGNAL,
  "--highlight": SIGNAL,
  "--glow": "transparent",
  "--dt-cream": CREAM,
  "--dt-ink": INK,
  "--dt-signal": SIGNAL,
  background: CREAM,
  color: INK,
} as React.CSSProperties;

/* -- small marks ---------------------------------------------------------- */

export function Diamond({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block w-2 h-2 rotate-45 shrink-0 bg-[var(--dt-ink)] ${className}`}
    />
  );
}

export function Kicker({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-start gap-3 font-accent font-bold uppercase tracking-[0.25em] text-[0.7rem] ${
        light ? "text-[var(--dt-cream)]" : "text-[var(--dt-signal)]"
      }`}
    >
      <span aria-hidden className="inline-block w-2 h-2 mt-[0.2em] rotate-45 shrink-0 bg-[var(--dt-signal)]" />
      {children}
    </p>
  );
}

/* -- frame: heavy ink rule, thin inner rule, corner diamonds -------------- */

export function Frame({
  children,
  className = "",
  inner = "bg-[var(--dt-cream)]",
}: {
  children: React.ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <div className={`relative border-[5px] border-[var(--dt-ink)] p-[6px] ${className}`}>
      <div className={`border border-[var(--dt-ink)] ${inner}`}>{children}</div>
      {["-top-[7px] -left-[7px]", "-top-[7px] -right-[7px]", "-bottom-[7px] -left-[7px]", "-bottom-[7px] -right-[7px]"].map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute ${pos} w-[9px] h-[9px] rotate-45 bg-[var(--dt-cream)] border-2 border-[var(--dt-ink)]`}
          />
        ),
      )}
    </div>
  );
}

export function PlateWell({ children }: { children: React.ReactNode }) {
  return (
    <Frame>
      <div className="p-3 sm:p-4">{children}</div>
    </Frame>
  );
}

export function ImageWell({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <Frame inner="bg-white">
      <div className="p-2 sm:p-3">
        <Image src={src} alt={alt} className="w-full h-auto max-h-[70vh] object-contain" />
      </div>
    </Frame>
  );
}

/* -- hero ----------------------------------------------------------------- */

export function PosterHero({
  category,
  title,
  subtitle,
  author,
  date,
  institution,
  plate,
}: {
  category: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  institution: string;
  plate: React.ReactNode;
}) {
  return (
    <section id="hero" className="min-h-svh flex items-center px-4 sm:px-8 md:px-16 py-24">
      <Frame className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center p-6 sm:p-10 md:p-14">
          <div>
            <Kicker>{category}</Kicker>
            <h1 className="font-heading font-bold text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.02em] mt-6 mb-8">
              {title}
            </h1>
            <div className="h-[5px] w-24 bg-[var(--dt-signal)] mb-8" />
            <p className="font-body text-lg md:text-xl leading-relaxed max-w-xl">{subtitle}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-accent text-sm">
              <span className="font-bold">{author}</span>
              <span className="flex items-center gap-4">
                <Diamond />
                {date}
              </span>
              <span className="flex items-center gap-4">
                <Diamond />
                {institution}
              </span>
            </div>
          </div>
          <div className="border-t-[5px] lg:border-t-0 border-[var(--dt-ink)] pt-10 lg:pt-0">
            <div className="max-w-xl mx-auto">{plate}</div>
          </div>
        </div>
      </Frame>
    </section>
  );
}

/* -- chapter band --------------------------------------------------------- */

export function ChapterBand({
  id,
  number,
  title,
  description,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <section
      id={id}
      className="bg-[var(--dt-ink)] text-[var(--dt-cream)] px-4 sm:px-8 md:px-16 py-28 md:py-36 min-h-svh flex items-center"
    >
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-end">
        <p
          aria-hidden
          className="font-heading font-bold leading-[0.8] text-[clamp(6rem,18vw,13rem)] text-[var(--dt-signal)]"
        >
          {number}
        </p>
        <div>
          <Kicker light>CHAPTER {number}</Kicker>
          <div className="h-px w-full bg-[var(--dt-cream)] opacity-40 my-6" />
          <h2 className="font-heading font-bold text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] mb-6">{title}</h2>
          <p className="font-body text-lg md:text-xl leading-relaxed max-w-2xl opacity-90">{description}</p>
        </div>
      </div>
    </section>
  );
}

/* -- slide and beats ------------------------------------------------------ */

export function Slide({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="min-h-svh flex flex-col justify-center px-4 sm:px-8 md:px-16 py-10 md:py-12 border-b-[5px] border-[var(--dt-ink)]"
    >
      <div className="max-w-6xl w-full mx-auto">
        {(label || title) && (
          <header className="mb-6 md:mb-8">
            {label && <Kicker>{label}</Kicker>}
            {title && (
              <h3 className="font-heading font-bold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] mt-3">{title}</h3>
            )}
            <div className="h-[4px] w-full bg-[var(--dt-ink)] mt-5" />
            <div className="h-px w-full bg-[var(--dt-ink)] mt-[4px]" />
          </header>
        )}
        <div className="flex flex-col gap-6 md:gap-8">{children}</div>
      </div>
    </section>
  );
}

/* A row of cells; `cols` sets the wide-screen split. Phones stack in order. */
export function Row({
  children,
  cols = "lg:grid-cols-2",
  className = "",
}: {
  children: React.ReactNode;
  cols?: string;
  className?: string;
}) {
  return <div className={`grid gap-6 md:gap-8 items-center ${cols} ${className}`}>{children}</div>;
}

/* Text leads its figure: beside it (`side`, on wide screens) or above it. */
export function Cell({
  text,
  figure,
  side,
  large,
}: {
  text: React.ReactNode;
  figure: React.ReactNode;
  side?: boolean;
  large?: boolean;
}) {
  return (
    <div className={`grid gap-3 md:gap-4 items-center ${side ? "sm:grid-cols-[1fr_1.15fr]" : ""}`}>
      <div
        className={`font-body leading-[1.65] [&_strong]:font-heading [&_strong]:font-bold ${
          large ? "text-lg md:text-xl" : "text-base md:text-[1.08rem]"
        }`}
      >
        {text}
      </div>
      <div>{figure}</div>
    </div>
  );
}

export function Insight({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--dt-ink)] text-[var(--dt-cream)] px-5 py-4 md:px-6 md:py-5 border-l-[8px] border-[var(--dt-signal)]">
      <Kicker light>{label}</Kicker>
      <div className="mt-2 font-heading text-lg md:text-xl leading-snug">{children}</div>
    </div>
  );
}

/* -- concept cards -------------------------------------------------------- */

export function CardGrid({
  cards,
}: {
  cards: { number?: string; title: string; description: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((c, i) => (
        <article
          key={c.title}
          className="group border-[3px] border-[var(--dt-ink)] p-6 flex flex-col transition-colors duration-300 hover:border-[var(--dt-signal)]"
        >
          <p className="font-heading font-bold text-4xl leading-none text-[var(--dt-signal)]">
            {c.number || i + 1}
          </p>
          <div className="h-[3px] w-10 bg-[var(--dt-ink)] my-4" />
          <h4 className="font-heading font-bold text-xl mb-3">{c.title}</h4>
          <p className="font-body leading-relaxed">{c.description}</p>
        </article>
      ))}
    </div>
  );
}

/* -- the six layers as a stepped pyramid (foundation at the bottom) ------- */

const STEP_WIDTH = ["md:w-full", "md:w-[95%]", "md:w-[90%]", "md:w-[85%]", "md:w-[80%]", "md:w-[75%]"];

export function LayerPyramid({
  layers,
}: {
  layers: { number: string; title: string; description: string }[];
}) {
  return (
    <ol className="flex flex-col-reverse items-center gap-[6px]">
      {layers.map((l, i) => (
        <li
          key={l.number}
          className={`w-full ${STEP_WIDTH[i]} bg-[var(--dt-ink)] text-[var(--dt-cream)] px-4 py-3 md:px-5 flex items-start gap-4`}
        >
          <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-[var(--dt-signal)] font-heading font-bold">
            {l.number}
          </span>
          <div>
            <h4 className="font-heading font-bold text-base md:text-lg leading-tight">{l.title}</h4>
            <p className="font-body text-sm opacity-90 leading-snug mt-1">{l.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* -- class discussion ----------------------------------------------------- */

export function DiscussionSlide({
  quote,
  author,
  plate,
}: {
  quote: string;
  author: string;
  plate: React.ReactNode;
}) {
  return (
    <section className="px-4 sm:px-8 md:px-16 py-24 md:py-32 border-b-[5px] border-[var(--dt-ink)] min-h-svh flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-heading font-bold text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.25]">{quote}</p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className="h-[3px] w-12 bg-[var(--dt-ink)]" />
          <Kicker>{author}</Kicker>
          <span className="h-[3px] w-12 bg-[var(--dt-ink)]" />
        </div>
        <div className="max-w-sm mx-auto mt-12">{plate}</div>
      </div>
    </section>
  );
}

/* -- summary -------------------------------------------------------------- */

export function Summary({
  id,
  title,
  summary,
  takeaways,
}: {
  id: string;
  title: string;
  summary: string;
  takeaways: string[];
}) {
  return (
    <section id={id} className="min-h-svh flex flex-col justify-center px-4 sm:px-8 md:px-16 py-12 md:py-14">
      <Frame className="w-full max-w-5xl mx-auto">
        <div className="p-6 sm:p-8 md:p-10">
          <Kicker>CONCLUSION</Kicker>
          <h2 className="font-heading font-bold text-[clamp(2.2rem,4.5vw,3.4rem)] leading-none mt-4 mb-6">{title}</h2>
          <p className="font-body text-lg leading-[1.7] max-w-3xl">{summary}</p>
          <div className="mt-8 bg-[var(--dt-ink)] text-[var(--dt-cream)] p-6 sm:p-7 md:p-8">
            <h4 className="font-accent font-bold uppercase tracking-[0.25em] text-[0.7rem] text-[var(--dt-cream)]">
              KEY TAKEAWAYS
            </h4>
            <ol className="mt-4">
              {takeaways.map((t, i) => (
                <li
                  key={t}
                  className="flex items-start gap-5 py-4 border-t border-[var(--dt-cream)]/30 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <span className="font-heading font-bold text-3xl leading-none text-[var(--dt-signal)] w-8 shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-body text-lg leading-relaxed">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Frame>
    </section>
  );
}
