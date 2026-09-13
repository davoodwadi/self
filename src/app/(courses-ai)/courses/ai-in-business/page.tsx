import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Merriweather } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { Hero } from "./_landing/Hero";
import { Reveal } from "./_landing/Reveal";
import { SYLLABUS, type SyllabusEntry } from "./_landing/syllabus";
import s from "./_landing/landing.module.css";

// ============================================================================
// BUSI 654 — COURSE LANDING
// ============================================================================
// Two movements: a dark title sequence (Hero), then a cut to paper for the
// Semester Roadmap.
//
// Deck status and module lists are read from this folder when the page is
// built. A week links out only once its page.tsx exists, and its modules are
// the "## Module …" or "## Part …" headings of its content.md. Titles and the
// one-line descriptions live in _landing/syllabus.ts.
// ============================================================================

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Applications of AI in Business · BUSI 654",
  description:
    "Course index and lecture decks for BUSI 654, Applications of AI in Business, with Davood Wadi, PhD.",
};

// Merriweather's variable cut, for its optical-size and width axes. The
// layout's static weights stay in use everywhere else.
const display = Merriweather({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
});

const COURSE_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "src/app/(courses-ai)/courses/ai-in-business",
);

const MODULE_HEADING =
  /^## (?:Module ([IVX]+)|Part (\d+)): (.+?)(?:\s+\[[^\]]*\])?\s*$/;

const MICRO = "font-sans text-[10px] font-semibold uppercase tracking-[0.24em]";

const pad = (n: number) => String(n).padStart(2, "0");

type Module = { n: string; name: string };

type Row = SyllabusEntry & {
  href: string;
  open: boolean;
  modules: Module[];
  moduleNoun: "Modules" | "Parts";
};

function readRow(entry: SyllabusEntry): Row {
  const dir = path.join(COURSE_DIR, entry.slug);
  const contentPath = path.join(dir, "content.md");
  const modules: Module[] = [];
  let parts = false;

  if (existsSync(contentPath)) {
    for (const line of readFileSync(contentPath, "utf8").split(/\r?\n/)) {
      const match = MODULE_HEADING.exec(line);
      if (!match) continue;
      if (match[2]) parts = true;
      modules.push({ n: match[1] ?? match[2], name: match[3] });
    }
  }

  return {
    ...entry,
    href: `/courses/ai-in-business/${entry.slug}`,
    open: existsSync(path.join(dir, "page.tsx")),
    modules,
    moduleNoun: parts ? "Parts" : "Modules",
  };
}

export default function CourseLanding() {
  const rows = SYLLABUS.map(readRow);
  const weeks = rows.filter((row) => row.kind === "week");
  const open = rows.filter((row) => row.open).length;
  const latest = [...weeks].reverse().find((row) => row.open);

  return (
    <div className={`${display.variable} ${s.page}`}>
      <Hero
        weeks={weeks.length}
        interludes={rows.length - weeks.length}
        open={open}
        total={rows.length}
        nowShowing={
          latest
            ? { href: latest.href, label: latest.label, title: latest.title }
            : null
        }
      />
      <Roadmap rows={rows} open={open} />
    </div>
  );
}

/* ==========================================================================
   SEMESTER ROADMAP — a contents page. Open decks link out; the rest are
   listed with their modules and marked in preparation.
   ========================================================================== */

function Roadmap({ rows, open }: { rows: Row[]; open: number }) {
  return (
    <section
      id="syllabus"
      aria-labelledby="syllabus-title"
      className="relative bg-[var(--background)] text-[var(--charcoal)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-12">
        <div className="grid gap-10 border-b-2 border-[var(--charcoal)] pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p
              className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
            >
              <span className="h-px w-10 bg-[var(--crimson)]" />
              Syllabus · BUSI 654
            </p>
            <h2 id="syllabus-title" className={s.h2Paper}>
              Semester Roadmap
            </h2>
            <p className={`${s.lede} mt-6 max-w-2xl`}>
              We will explore how AI applies across each major business
              discipline.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="flex gap-12">
              <Tally label="Decks open" value={open} filled />
              <Tally label="In preparation" value={rows.length - open} />
            </dl>
          </Reveal>
        </div>

        <ol>
          {rows.map((row) => (
            <Reveal
              as="li"
              key={row.slug}
              className="border-b border-[var(--charcoal)]/12"
            >
              <RoadmapRow row={row} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Tally({
  label,
  value,
  filled = false,
}: {
  label: string;
  value: number;
  filled?: boolean;
}) {
  return (
    <div>
      <dt
        className={`${MICRO} flex items-center gap-2 text-[var(--charcoal-light)]/70`}
      >
        <Dot filled={filled} />
        {label}
      </dt>
      <dd className={s.count}>{pad(value)}</dd>
    </div>
  );
}

function Dot({ filled }: { filled: boolean }) {
  return (
    <span
      aria-hidden
      className={
        filled
          ? "size-1.5 shrink-0 rounded-full bg-[var(--crimson)]"
          : "size-1.5 shrink-0 rounded-full border border-current"
      }
    />
  );
}

function RoadmapRow({ row }: { row: Row }) {
  const body = (
    <div
      className={`${s.row} grid grid-cols-[3.25rem_1fr] gap-x-5 py-9 md:grid-cols-[7.5rem_1fr_11rem] md:gap-x-10 md:py-11`}
    >
      {row.kind === "week" ? (
        <span aria-hidden className={s.numeral}>
          {row.numeral}
        </span>
      ) : (
        <span className={s.interlude}>Interlude</span>
      )}

      <div className="min-w-0">
        <p className={`${MICRO} text-[var(--champagne)]`}>{row.label}</p>
        <h3 className={s.rowTitle}>{row.title}</h3>
        <p className={`${s.rowText} mt-3 max-w-2xl`}>{row.description}</p>

        {row.modules.length > 0 && (
          <div className="mt-6 max-w-4xl">
            <p className={`${MICRO} text-[var(--charcoal-light)]/70`}>
              {row.moduleNoun}
            </p>
            <ol className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
              {row.modules.map((module) => (
                <li key={module.n} className={s.moduleName}>
                  <span className={s.moduleNumber}>{module.n}</span>
                  {module.name}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="col-start-2 mt-7 md:col-start-auto md:mt-0 md:justify-self-end md:pt-7">
        {row.open ? (
          <span className={s.status}>
            <Dot filled />
            Open deck
            <ArrowRight aria-hidden className="size-3.5" />
          </span>
        ) : (
          <span className={`${s.status} ${s.statusDraft}`}>
            <Dot filled={false} />
            In preparation
          </span>
        )}
      </div>
    </div>
  );

  return row.open ? (
    <Link
      href={row.href}
      aria-label={`Open deck: ${row.label}, ${row.title}`}
      className={`${s.rowLink} block`}
    >
      {body}
    </Link>
  ) : (
    body
  );
}
