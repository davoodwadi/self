"use client";

import React from "react";

// The main slide deck title
export function HeroHeader({
  tag,
  title,
  highlight,
  subtitle,
}: {
  tag?: string;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <>
      {tag && (
        <div className="gsap-reveal inline-block px-3 py-1 mb-6 border border-[var(--charcoal)]/20 text-[var(--charcoal)] text-xs sm:text-sm font-bold tracking-widest uppercase bg-[var(--surface)] shadow-sm">
          {tag}
        </div>
      )}
      <h1 className="gsap-reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-6 text-[var(--charcoal)] font-serif">
        {title}{" "}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--crimson)] to-[var(--crimson-light)]">
            {highlight}
          </span>
        )}
      </h1>
      {subtitle && (
        <p className="gsap-reveal text-xl md:text-3xl text-[var(--charcoal-light)] font-light max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </>
  );
}

// Section Header for normal slides
export function SectionHeader({
  title,
  subtitle,
  highlight,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  highlight?: React.ReactNode;
}) {
  return (
    <div className="gsap-reveal mb-12">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--charcoal)] font-serif">
        {title}{" "}
        {highlight && (
          <>
            <br />
            <span className="text-[var(--crimson)]">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="text-xl md:text-2xl text-[var(--charcoal-light)] mt-4 font-light leading-relaxed max-w-4xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// A standard content card with an optional number
export function ContentCard({
  title,
  description,
  number,
  className = "",
}: {
  title: string;
  description: React.ReactNode;
  number?: string;
  className?: string;
}) {
  return (
    <div
      className={`gsap-reveal p-8 bg-[var(--background)] border-t-[4px] border-t-[var(--crimson)] shadow-[0_10px_30px_rgba(0,0,0,0.02)] ${className}`}
    >
      {number && (
        <div className="text-3xl font-black text-[var(--crimson)]/20 mb-4 font-serif">
          {number}
        </div>
      )}
      <h3 className="text-2xl font-bold mb-3 text-[var(--charcoal)]">
        {title}
      </h3>
      <div className="text-[var(--charcoal-light)] font-light leading-relaxed text-lg">
        {description}
      </div>
    </div>
  );
}

// A highlighted card for discussion/strategy
export function DiscussionCard({
  title = "Discussion Prompt",
  prompt,
  className = "",
}: {
  title?: string;
  prompt: React.ReactNode;
  className?: string;
}) {
  const [isRevealed, setIsRevealed] = React.useState(false);

  return (
    <div
      onClick={() => setIsRevealed(!isRevealed)}
      className={`gsap-reveal relative p-8 bg-[var(--surface)] border shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer transition-colors duration-500 hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 ${isRevealed ? "border-[var(--gold)]/50" : "border-[var(--charcoal)]/10"} ${className}`}
    >
      {/* Default State Content (Overlay) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 z-10 bg-[var(--surface)] ${isRevealed ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}
      >
        <div className="w-12 h-12 rounded-full border border-[var(--gold)]/30 flex items-center justify-center mb-4 text-[var(--gold)] animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
        </div>
        <h3 className="text-[var(--gold)] font-semibold tracking-widest uppercase text-lg mb-2">
          {title}
        </h3>
        <p className="text-[var(--charcoal-light)]/50 text-sm mt-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
            />
          </svg>
          Tap to reveal
        </p>
      </div>

      {/* Hover Reveal Content (Maintains Height) */}
      <div
        className={`transition-all duration-700 ease-out ${isRevealed ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-95 filter blur-md"}`}
      >
        <h3 className="text-[var(--gold)] font-semibold mb-4 tracking-wider uppercase text-sm">
          {title}
        </h3>
        <div className="text-xl md:text-2xl font-medium leading-snug text-[var(--charcoal)]">
          {prompt}
        </div>
      </div>
    </div>
  );
}

// A horizontal strategy row often used for lists
export function StrategyRow({
  number,
  title,
  description,
}: {
  number: string | number;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="gsap-reveal flex items-start gap-6 p-6 transition-colors border-b border-[var(--charcoal)]/10 hover:bg-[var(--surface)]">
      <div className="text-[var(--crimson)] font-black text-2xl md:text-4xl font-serif">
        {number}
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[var(--charcoal)] mb-2">
          {title}
        </h3>
        <p className="text-[var(--charcoal-light)] font-light text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
