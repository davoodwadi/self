import path from "node:path";
import { isDeckBuilt } from "@/lib/course-status";
import { IM_DIR, readCurriculum } from "@/lib/curriculum";
import CourseIndex from "./_landing/CourseIndex";

// Every word on this page comes from curriculum.md. A week links out only once
// its deck has been built. The rest are listed in the contents but marked in
// preparation and left unclickable.

export const dynamic = "force-static";

const COURSE_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), IM_DIR);

export default function IntroMarketingLanding() {
  const { weeks, ...course } = readCurriculum(IM_DIR);
  const rows = weeks.map((week) => ({
    ...week,
    href: `/courses/intro-marketing/${week.slug}`,
    available: isDeckBuilt(COURSE_DIR, week.slug),
  }));

  return <CourseIndex course={course} weeks={rows} />;
}
