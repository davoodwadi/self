"use client";

/* Section markers on a cream tab with an ink rule, so they stay visible over
   the ink chapter bands. The active section is a red diamond. */

import React, { useEffect, useState } from "react";

export function DeckNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= y) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <nav
      aria-label="Sections"
      className="hidden md:flex fixed right-3 top-1/2 -translate-y-1/2 z-50 flex-col gap-1 bg-[var(--dt-cream)] border-2 border-[var(--dt-ink)] p-1.5"
    >
      {sections.map((s) => {
        const on = s.id === active;
        return (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="group relative w-6 h-6 flex items-center justify-center"
            aria-label={s.label}
            aria-current={on ? "true" : undefined}
          >
            <span
              className={`rotate-45 transition-all duration-300 ${
                on ? "w-2.5 h-2.5 bg-[var(--dt-signal)]" : "w-1.5 h-1.5 bg-[var(--dt-ink)]"
              }`}
            />
            <span className="pointer-events-none absolute right-8 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--dt-ink)] text-[var(--dt-cream)] font-accent font-bold uppercase tracking-[0.2em] text-[0.65rem] px-2 py-1">
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
