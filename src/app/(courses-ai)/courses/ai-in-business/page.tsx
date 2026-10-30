import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SYLLABUS, type SyllabusEntry } from "./_landing/syllabus";
import s from "./_landing/landing.module.css";

// ============================================================================
// BUSI 654: COURSE LANDING
// ============================================================================
// The course masthead stays in view on the left while the curriculum scrolls
// on the right, the same layout as the other course landings.
//
// Deck status is read from this folder when the page is built. A week links out
// only once its page.tsx exists. Titles and one-line descriptions live in
// _landing/syllabus.ts.
// ============================================================================

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Applications of AI in Business | BUSI 654",
  description:
    "Course index and lecture decks for BUSI 654, Applications of AI in Business, with Davood Wadi, PhD.",
};

const COURSE_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "src/app/(courses-ai)/courses/ai-in-business",
);

type Row = SyllabusEntry & {
  href: string;
  open: boolean;
};

function readRow(entry: SyllabusEntry): Row {
  const dir = path.join(COURSE_DIR, entry.slug);

  return {
    ...entry,
    href: `/courses/ai-in-business/${entry.slug}`,
    open: existsSync(path.join(dir, "page.tsx")),
  };
}

export default function CourseLanding() {
  const rows = SYLLABUS.map(readRow);
  const weeks = rows.filter((row) => row.kind === "week").length;

  return (
    <div className={`${s.page} min-h-screen`}>
      <BackLink />
      <div className="mx-auto grid w-full max-w-7xl gap-x-16 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-12">
        {/* Masthead: stays in view beside the curriculum on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-16">
          <p className={s.courseMeta}>BUSI 654</p>

          <h1 className={s.title}>Applications of AI in Business</h1>

          <p className={`${s.standfirst} mt-4 max-w-[42ch]`}>
            Understanding how modern intelligent systems create value, change
            decisions, and require human leadership
          </p>

          <p
            className={`${s.credit} mt-6 border-t border-[var(--ink)]/15 pt-4`}
          >
            Davood Wadi, PhD
          </p>
        </header>

        {/* Curriculum */}
        <nav aria-label="Course weeks" className="pb-10 lg:py-20">
          <div className="mb-3">
            <h2 className={s.sectionHeading}>Curriculum</h2>
          </div>

          <ol className="border-t border-[var(--ink)]/20">
            {rows.map((row) => (
              <li
                key={row.slug}
                className="border-b border-[var(--ink)]/12"
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
      className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 transition-colors duration-200 text-[var(--ink-2)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5"
      aria-label="Back to all courses"
    >
      <ArrowLeft className="w-5 h-5" />
    </Link>
  );
}

/** Number, title, and description: the same row whether it links or not. */
function CurriculumRow({ row }: { row: Row }) {
  const body = (
    <div
      className={`${s.row} grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-4 py-5 md:gap-x-5`}
    >
      <span aria-hidden className={s.numeral}>
        {row.kind === "week" ? row.numeral : null}
      </span>

      <div className="min-w-0">
        {row.kind === "interlude" && (
          <p className={`${s.interludeLabel} mb-1`}>{row.label}</p>
        )}
        <h3 className={s.rowTitle}>{row.title}</h3>
        <p className={`${s.rowText} mt-1 max-w-2xl`}>{row.description}</p>

        {!row.open && <p className={`${s.statusNote} mt-2`}>In preparation</p>}
      </div>

      {row.open ? (
        <ArrowRight aria-hidden className={`${s.arrow} mt-1 size-4`} />
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
