"use client";

import { useEffect, useState } from "react";

/**
 * Arrow keys, Page Up/Down and Space step slide by slide; a hairline rail
 * shows progress, and a column of dots on the right jumps to any slide.
 */
export default function DeckKeys() {
  const [progress, setProgress] = useState(0);
  const [titles, setTitles] = useState<string[]>([]);
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

    const frame = requestAnimationFrame(() => {
      setTitles(slides().map((s) => s.querySelector("h1, h2")?.textContent?.trim() ?? ""));
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (i: number) =>
    document.querySelectorAll<HTMLElement>("[data-slide]")[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

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
          {titles.map((t, i) => {
            const on = i === current;
            return (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}: ${t}`}
                aria-current={on ? "step" : undefined}
                className="group relative flex h-5 w-5 items-center justify-center"
              >
                <span className="pointer-events-none absolute right-full mr-2 w-max max-w-[22rem] truncate bg-[var(--paper)] px-2 py-0.5 text-[12px] text-[var(--ink-2)] opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {`${i + 1}. ${t}`}
                </span>
                <span
                  className={
                    "block rounded-full transition-all " +
                    (on
                      ? "h-2.5 w-2.5 bg-[var(--signal)]"
                      : "h-1.5 w-1.5 bg-[var(--rule-2)] group-hover:bg-[var(--ink-3)]")
                  }
                />
              </button>
            );
          })}
        </nav>
      ) : null}
    </>
  );
}
