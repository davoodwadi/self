"use client";

import { useEffect, useState } from "react";

/** A navigator entry that groups consecutive slides (e.g. a paper's method and results) under one dot. */
export type DeckSection = { label: string; ids: string[] };

/**
 * Arrow keys, Page Up/Down and Space step slide by slide. A hairline rail
 * shows progress, and a column of dots on the right jumps to any slide, or
 * to any section when `sections` is given.
 */
export default function DeckKeys({ sections }: { sections?: DeckSection[] }) {
  const [progress, setProgress] = useState(0);
  const [titles, setTitles] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slides = () => [...document.querySelectorAll<HTMLElement>("[data-slide]")];
    const index = () => {
      const mid = window.innerHeight / 2;
      const at = slides().findIndex((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      });
      return at === -1 ? 0 : at;
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setCurrent(index());
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (target?.tagName === "BUTTON" && e.key === " ") return;
      const next = ["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key);
      const prev = ["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key);
      if (!next && !prev) return;
      e.preventDefault();
      const list = slides();
      const to = Math.max(0, Math.min(list.length - 1, index() + (next ? 1 : -1)));
      list[to].scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // A timer, not an animation frame: hidden tabs pause animation frames, which left the dots empty there.
    const timer = setTimeout(() => {
      setTitles(slides().map((s) => s.querySelector("h1, h2")?.textContent?.trim() ?? ""));
      setIds(slides().map((s) => s.id));
      onScroll();
    }, 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (i: number) =>
    document.querySelectorAll<HTMLElement>("[data-slide]")[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  // One dot per section when sections are given, otherwise one per slide.
  const dots = sections
    ? sections.map((s) => ({
        label: s.label,
        first: ids.indexOf(s.ids[0]),
        on: s.ids.includes(ids[current]),
      }))
    : titles.map((t, i) => ({ label: t, first: i, on: i === current }));

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-px bg-[var(--rule)]">
        <div className="h-full bg-[var(--signal)]" style={{ width: `${progress * 100}%` }} />
      </div>
      {titles.length > 1 ? (
        <nav
          aria-label="Slides"
          className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-0.5 md:flex"
        >
          {dots.map((d, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(d.first)}
              aria-label={`${sections ? "Section" : "Slide"} ${i + 1}: ${d.label}`}
              aria-current={d.on ? "step" : undefined}
              className="group relative flex h-5 w-5 items-center justify-center"
            >
              <span className="pointer-events-none absolute right-full mr-2 w-max max-w-[22rem] truncate bg-[var(--paper)] px-2 py-0.5 text-[12px] text-[var(--ink-2)] opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {`${i + 1}. ${d.label}`}
              </span>
              <span
                className={
                  "block rounded-full transition-all " +
                  (d.on
                    ? "h-2.5 w-2.5 bg-[var(--signal)]"
                    : "h-1.5 w-1.5 bg-[var(--rule-2)] group-hover:bg-[var(--ink-3)]")
                }
              />
            </button>
          ))}
        </nav>
      ) : null}
    </>
  );
}
