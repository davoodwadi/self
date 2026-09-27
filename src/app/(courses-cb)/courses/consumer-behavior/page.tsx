import path from "node:path";
import { isDeckBuilt } from "@/lib/course-status";
import { CB_DIR, readCurriculum } from "@/lib/curriculum";
import CourseIndex from "./_landing/CourseIndex";

// Every word on this page comes from curriculum.md. A week links out only once
// its deck has been built; the rest are listed in the index but marked in
// preparation and left unclickable.

export const dynamic = "force-static";

const COURSE_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), CB_DIR);

export default function ConsumerBehaviorLanding() {
  const { weeks, ...course } = readCurriculum(CB_DIR);
  const rows = weeks.map((week) => ({
    ...week,
    href: `/courses/consumer-behavior/${week.slug}`,
    available: isDeckBuilt(COURSE_DIR, week.slug),
  }));

  return <CourseIndex course={course} weeks={rows} />;
}
