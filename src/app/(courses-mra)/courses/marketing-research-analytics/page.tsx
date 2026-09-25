import path from "node:path";
import { isDeckBuilt } from "@/lib/course-status";
import CourseIndex from "./_landing/CourseIndex";
import { COURSE_WEEKS } from "./_landing/weeks";

// A week links out only once its deck has been built; the rest are listed in
// the index but marked in preparation and left unclickable.

export const dynamic = "force-static";

const COURSE_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "src/app/(courses-mra)/courses/marketing-research-analytics",
);

export default function MarketingResearchLanding() {
  const weeks = COURSE_WEEKS.map((week) => ({
    ...week,
    href: `/courses/marketing-research-analytics/${week.slug}`,
    available: isDeckBuilt(COURSE_DIR, week.slug),
  }));

  return <CourseIndex weeks={weeks} />;
}
