import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Curriculum, CurriculumWeek } from "@/lib/curriculum";
import s from "./landing.module.css";

type Row = CurriculumWeek & { href: string; available: boolean };

/** The masthead text, all of it read from curriculum.md. */
type Masthead = Omit<Curriculum, "weeks">;

/** Week number, title and blurb: the same row whether it links or not. */
function RowBody({ week, n }: { week: Row; n: number }) {
  return (
    <div className="grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-4 py-5 md:gap-x-5">
      <span aria-hidden className={s.numeral}>
        {n}
      </span>
      <div className="min-w-0">
        <h3 className={s.rowTitle}>{week.title}</h3>
        <p className={`${s.rowText} mt-1 max-w-2xl`}>{week.summary}</p>
        {!week.available && (
          <p className={`${s.statusNote} mt-2`}>In preparation</p>
        )}
      </div>
      {week.available ? (
        <ArrowRight aria-hidden className={`${s.arrow} mt-1 size-4`} />
      ) : (
        <span aria-hidden />
      )}
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/courses"
      className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 transition-colors duration-200 text-[var(--ink-2)] hover:text-[var(--signal)] hover:bg-[var(--signal-tint)]"
      aria-label="Back to all courses"
    >
      <ArrowLeft className="w-5 h-5" />
    </Link>
  );
}

export default function CourseIndex({
  course,
  weeks,
}: {
  course: Masthead;
  weeks: Row[];
}) {
  const meta = [course.level, course.program]
    .filter((item): item is string => Boolean(item))
    .join(" | ");

  return (
    <div className={`${s.page} min-h-screen`}>
      <BackLink />
      <div className="mx-auto grid w-full max-w-7xl gap-x-16 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-12">
        {/* Masthead: stays in view beside the curriculum on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-16">
          <p className={s.courseMeta}>{meta}</p>

          <h1 className={s.title}>{course.title}</h1>

          <p className={`${s.standfirst} mt-4 max-w-[42ch]`}>
            {course.subtitle}
          </p>

          <p className={`${s.credit} mt-6 border-t border-[var(--rule)] pt-4`}>
            {course.instructor}
          </p>
        </header>

        {/* Curriculum */}
        <nav aria-label="Course weeks" className="pb-10 lg:py-20">
          <div className="mb-3">
            <h2 className={s.sectionHeading}>Curriculum</h2>
          </div>

          <ol className="border-t border-[var(--rule-2)]">
            {weeks.map((week, idx) => (
              <li key={week.slug} className="border-b border-[var(--rule)]">
                {week.available ? (
                  <Link
                    href={week.href}
                    aria-label={`Open deck: Week ${idx + 1}, ${week.title}`}
                    className={`${s.rowLink} block`}
                  >
                    <RowBody week={week} n={idx + 1} />
                  </Link>
                ) : (
                  <div aria-disabled="true" className={s.rowMuted}>
                    <RowBody week={week} n={idx + 1} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
