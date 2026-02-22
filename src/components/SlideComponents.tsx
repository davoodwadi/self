"use client";

import React from "react";

// The main slide deck title
export function HeroHeader({ tag, title, highlight, subtitle }: { tag?: string; title: React.ReactNode; highlight?: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <>
      {tag && (
        <div className="gsap-reveal inline-block px-3 py-1 mb-6 border border-indigo-500/30 rounded-full text-indigo-400 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm bg-indigo-500/10">
          {tag}
        </div>
      )}
      <h1 className="gsap-reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-6">
        {title} {highlight && <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">{highlight}</span>}
      </h1>
      {subtitle && (
        <p className="gsap-reveal text-xl md:text-3xl text-neutral-400 font-light max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </>
  );
}

// Section Header for normal slides
export function SectionHeader({ title, subtitle, highlight }: { title: React.ReactNode; subtitle?: React.ReactNode; highlight?: React.ReactNode }) {
  return (
    <div className="gsap-reveal mb-12">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
        {title} {highlight && <><br/><span className="text-neutral-500">{highlight}</span></>}
      </h2>
      {subtitle && <p className="text-xl md:text-2xl text-neutral-400 mt-4 font-light leading-relaxed max-w-4xl">{subtitle}</p>}
    </div>
  );
}

// A standard content card with an optional number
export function ContentCard({ title, description, number, className = "" }: { title: string; description: React.ReactNode; number?: string; className?: string }) {
  return (
    <div className={`gsap-reveal p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm ${className}`}>
      {number && <div className="text-3xl font-black text-indigo-500/20 mb-4">{number}</div>}
      <h3 className="text-2xl font-bold mb-3 text-neutral-100">{title}</h3>
      <div className="text-neutral-400 font-light leading-relaxed text-lg">{description}</div>
    </div>
  );
}

// A highlighted card for discussion/strategy
export function DiscussionCard({ title = "Discussion Prompt", prompt, className = "" }: { title?: string; prompt: React.ReactNode; className?: string }) {
  return (
    <div className={`gsap-reveal group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(79,70,229,0.1)] overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/[0.05] hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(79,70,229,0.2)] ${className}`}>
      
      {/* Default State Content (Overlay) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:scale-95 z-10 bg-neutral-900/80 backdrop-blur-md">
        <div className="w-12 h-12 rounded-full border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
          </svg>
        </div>
        <h3 className="text-indigo-400 font-semibold tracking-widest uppercase text-lg mb-2">{title}</h3>
        {/* <span className="text-neutral-500 text-sm tracking-wide">Hover to Reveal</span> */}
      </div>

      {/* Hover Reveal Content (Maintains Height) */}
      <div className="opacity-0 scale-95 filter blur-md transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:blur-none">
        <h3 className="text-indigo-400 font-semibold mb-4 tracking-wider uppercase text-sm">{title}</h3>
        <div className="text-xl md:text-2xl font-medium leading-snug">{prompt}</div>
      </div>
    </div>
  );
}

// A horizontal strategy row often used for lists
export function StrategyRow({ number, title, description }: { number: string | number; title: string; description: React.ReactNode }) {
  return (
    <div className="gsap-reveal flex items-start gap-6 p-6 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
      <div className="text-indigo-500 font-black text-2xl md:text-4xl">{number}</div>
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 font-light text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
}