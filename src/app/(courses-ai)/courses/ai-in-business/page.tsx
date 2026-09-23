import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Merriweather } from "next/font/google";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SYLLABUS, type SyllabusEntry } from "./_landing/syllabus";
import s from "./_landing/landing.module.css";

// ============================================================================
// BUSI 654 — COURSE LANDING
// ============================================================================
// The course masthead stays in view on the left while the curriculum scrolls
// on the right, the same layout as the other course landings.
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
  const weeks = rows.filter((row) => row.kind === "week").length;

  return (
    <div className={`${display.variable} ${s.page} min-h-screen`}>
      <BackLink />
      <div className="mx-auto grid w-full max-w-7xl gap-x-16 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-12">
        {/* Masthead: stays in view beside the curriculum on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-16">
          <p
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" aria-hidden />
            BUSI 654 · {weeks} weeks
          </p>

          <h1 className={s.title}>
            <span className={`block ${s.titleLead}`}>Applications of</span>
            <span className={`block ${s.titleMain}`}>AI in Business</span>
          </h1>

          <p className={`${s.standfirst} mt-7 max-w-[34ch]`}>
            Understanding how modern intelligent systems create value, change
            decisions, and require human leadership
          </p>

          <p
            className={`${s.credit} mt-8 border-t border-[var(--charcoal)]/15 pt-5`}
          >
            Davood Wadi, PhD
          </p>

        </header>

        {/* Curriculum */}
        <nav aria-label="Course weeks" className="pb-10 lg:py-20">
          <div className="mb-4">
            <h2 className={`${MICRO} text-[var(--charcoal)]`}>Curriculum</h2>
          </div>

          <ol className="border-t-2 border-[var(--charcoal)]">
            {rows.map((row) => (
              <li
                key={row.slug}
                className="border-b border-[var(--charcoal)]/12"
              >
                <CurriculumRow row={row} />
              </li>
            ))}
          </ol>

        </nav>
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/courses"
      className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 transition-colors duration-300 text-[var(--charcoal-light)] hover:text-[var(--crimson)] hover:bg-[var(--crimson)]/5"
      aria-label="Back to all courses"
    >
      <ArrowLeft className="w-5 h-5" />
    </Link>
  );
}

/** Number, title, description and modules: the same row whether it links or not. */
function CurriculumRow({ row }: { row: Row }) {
  const body = (
    <div
      className={`${s.row} grid grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-x-4 py-6 md:gap-x-6`}
    >
      <span aria-hidden className={s.numeral}>
        {row.kind === "week" ? row.numeral : null}
      </span>

      <div className="min-w-0">
        {row.kind === "interlude" && (
          <p className={`${MICRO} mb-1.5 text-[var(--champagne)]`}>
            {row.label}
          </p>
        )}
        <h3 className={s.rowTitle}>{row.title}</h3>
        <p className={`${s.rowText} mt-1.5 max-w-2xl`}>{row.description}</p>

        {row.modules.length > 0 && (
          <ol
            aria-label={row.moduleNoun}
            className="mt-3 flex flex-wrap gap-x-5 gap-y-1"
          >
            {row.modules.map((module) => (
              <li key={module.n} className={s.moduleName}>
                <span className={s.moduleNumber}>{module.n}</span>
                {module.name}
              </li>
            ))}
          </ol>
        )}

        {!row.open && (
          <p
            className={`${MICRO} mt-3 !text-[9.5px] text-[var(--charcoal-light)]/70`}
          >
            In preparation
          </p>
        )}
      </div>

      {row.open ? (
        <ArrowRight aria-hidden className={`${s.arrow} mt-1.5 size-4`} />
      ) : (
        <span aria-hidden />
      )}
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
    <div aria-disabled="true" className={s.rowMuted}>
      {body}
    </div>
  );
}
