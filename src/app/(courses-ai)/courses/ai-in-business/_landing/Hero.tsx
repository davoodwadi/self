"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ContourField } from "./ContourField";
import s from "./landing.module.css";

const MICRO = "font-sans text-[10px] font-semibold uppercase tracking-[0.24em]";

/** Start time for a step of the opening sequence, read by the CSS as `--d`. */
const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const pad = (n: number) => String(n).padStart(2, "0");

export type NowShowing = { href: string; label: string; title: string };

/**
 * Hero — a title sequence. Fade up from black inside a letterbox frame, the
 * title rises out of its masks, then the credits settle. On scroll the card
 * lifts away and the contour field behind it sinks and dims.
 */
export function Hero({
  weeks,
  interludes,
  open,
  total,
  nowShowing,
}: {
  weeks: number;
  interludes: number;
  open: number;
  total: number;
  nowShowing: NowShowing | null;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(
        Math.max(window.scrollY / hero.offsetHeight, 0),
        1,
      );
      hero.style.setProperty("--hero-p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="course-title"
      className={`${s.hero} relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--ink)] text-[var(--paper)]`}
    >
      <div aria-hidden className={s.field}>
        <ContourField className={s.fieldIn} />
      </div>
      <div aria-hidden className={s.shade} />

      {/* Letterbox, top: the slate. */}
      <div className={`${s.bar} ${s.barTop}`}>
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-6 px-6 lg:px-12">
          <span
            className={`${s.fade} ${MICRO} whitespace-nowrap text-[var(--paper)]/70`}
            style={at(1100)}
          >
            BUSI 654<span className="hidden sm:inline"> · Course Index</span>
          </span>
          <span
            className={`${s.fade} ${MICRO} whitespace-nowrap tabular-nums text-[var(--paper)]/70`}
            style={at(1200)}
          >
            Decks open {pad(open)} / {pad(total)}
          </span>
        </div>
      </div>

      {/* The title card. */}
      <div className="relative z-10 flex flex-1 items-end">
        <div
          className={`${s.drift} mx-auto w-full max-w-7xl px-6 pb-14 pt-20 md:pb-20 lg:px-12`}
        >
          <p
            className={`${s.fade} ${MICRO} flex items-center gap-4 text-[var(--brass)]`}
            style={at(300)}
          >
            <span
              className={`${s.draw} h-px w-10 bg-[var(--brass)]`}
              style={at(300)}
            />
            Lecture series · {weeks} weeks
          </p>

          <h1 id="course-title" className={`${s.title} mt-8`}>
            <span className={`${s.mask} ${s.titleLead}`}>
              <span className={s.rise} style={at(450)}>
                Applications of
              </span>
            </span>
            <span className={`${s.mask} ${s.titleMain}`}>
              <span className={s.rise} style={at(600)}>
                AI in Business
              </span>
            </span>
          </h1>

          <div
            className={`${s.draw} mt-10 h-px w-full bg-[var(--paper)]/20`}
            style={at(850)}
          />

          <p
            className={`${s.fade} ${s.standfirst} mt-7 max-w-3xl`}
            style={at(1000)}
          >
            Understanding how modern intelligent systems create value, change
            decisions, and require human leadership
          </p>

          <dl className="mt-10 grid grid-cols-1 border-t border-[var(--paper)]/10 md:mt-12 md:flex md:flex-wrap md:items-end md:gap-x-14 md:gap-y-7 md:border-0">
            <Credit label="Lecturer" delay={1150}>
              Davood Wadi, PhD
            </Credit>
            <Credit label="Course" delay={1230}>
              BUSI 654
            </Credit>
            <Credit label="Syllabus" delay={1310}>
              {weeks} weeks · {interludes} interlude
              {interludes === 1 ? "" : "s"}
            </Credit>
            {nowShowing && (
              <Credit
                label="Next session"
                delay={1420}
                stacked
                className="md:ml-auto"
              >
                <Link
                  href={nowShowing.href}
                  className={`${s.nowShowing} group`}
                >
                  <span>
                    <span className="text-[var(--paper)]/60">
                      {nowShowing.label} ·{" "}
                    </span>
                    {nowShowing.title}
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </Credit>
            )}
          </dl>
        </div>
      </div>

      {/* Letterbox, bottom: the way on to the syllabus. */}
      <div className={`${s.bar} ${s.barBottom}`}>
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-center px-6 lg:px-12">
          <a
            href="#syllabus"
            className={`${s.fade} ${MICRO} group flex shrink-0 items-center gap-2 text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)]`}
            style={at(1600)}
          >
            Syllabus
            <ArrowDown
              aria-hidden
              className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>

      <div aria-hidden className={s.curtain} />
    </section>
  );
}

/**
 * One credit. On phones the short ones run as a ruled credits list, label left
 * and value right; from md up every credit stacks its label over its value.
 */
function Credit({
  label,
  delay,
  stacked = false,
  className = "",
  children,
}: {
  label: string;
  delay: number;
  stacked?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const layout = stacked
    ? "pt-6 md:pt-0"
    : "flex items-baseline justify-between gap-6 border-b border-[var(--paper)]/10 py-3.5 md:block md:border-0 md:py-0";

  return (
    <div className={`${s.fade} ${layout} ${className}`} style={at(delay)}>
      <dt className={`${MICRO} text-[var(--paper)]/55`}>{label}</dt>
      <dd
        className={`${s.creditValue} ${stacked ? "mt-2" : "text-right md:mt-2 md:text-left"}`}
      >
        {children}
      </dd>
    </div>
  );
}
