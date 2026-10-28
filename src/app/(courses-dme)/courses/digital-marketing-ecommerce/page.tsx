import path from "node:path";
import { isDeckBuilt } from "@/lib/course-status";
import { DME_DIR, readCurriculum } from "@/lib/curriculum";
import CourseIndex from "./_landing/CourseIndex";

// Every word on this page comes from curriculum.md. A week links out only once
// its deck has been built. The rest are listed in the index but marked in
// preparation and left unclickable.

export const dynamic = "force-static";

const COURSE_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), DME_DIR);

export default function DigitalMarketingEcommerceLanding() {
  const { weeks, ...course } = readCurriculum(DME_DIR);
  const rows = weeks.map((week) => ({
    ...week,
    href: `/courses/digital-marketing-ecommerce/${week.slug}`,
    available: isDeckBuilt(COURSE_DIR, week.slug),
  }));

  return <CourseIndex course={course} weeks={rows} />;
}
