"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function DynamicFooter() {
  const pathname = usePathname();
  const isCoursesMainPage = pathname === "/courses";

  if (isCoursesMainPage) return null;

  return <Footer />;
}
