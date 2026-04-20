"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function DynamicFooter() {
  const pathname = usePathname();
  const isCoursesMainPage = pathname === "/courses";

  // Hide on /courses
  if (isCoursesMainPage) return null;

  // Hide on slide pages (paths deeper than /courses/[course-name])
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length >= 3 && parts[0] === "courses") {
    return null;
  }

  return <Footer />;
}
