"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  href?: string;
  label: string; // e.g. "Week 01" or "New Paradigm"
  title: string;
  description: string;
  isLocked?: boolean;
  variant?: "crimson" | "gold";
}

export function CourseCard({
  href,
  label,
  title,
  description,
  isLocked = false,
  variant = "crimson",
}: CourseCardProps) {
  if (isLocked) {
    return (
      <div className="course-card block opacity-50">
        <div className="relative bg-[var(--background)] border-t-[4px] border-t-[var(--charcoal-light)] p-8 h-full grayscale">
          <span className="text-[var(--charcoal-light)] font-bold tracking-widest uppercase text-xs mb-3 block">
            {label}
          </span>
          <h3 className="text-xl font-black text-[var(--charcoal-light)] mb-4">
            {title}
          </h3>
          <p className="text-[var(--charcoal-light)] font-light text-sm leading-relaxed mb-8">
            {description}
          </p>
          <div className="inline-block px-8 py-3 bg-transparent text-[var(--charcoal-light)] font-semibold text-sm tracking-wide uppercase border border-[var(--charcoal-light)]">
            Locked
          </div>
        </div>
      </div>
    );
  }

  const borderColorClass =
    variant === "gold" ? "border-t-[var(--gold)]" : "border-t-[var(--crimson)]";
  const labelColorClass =
    variant === "gold" ? "text-[var(--gold)]" : "text-[var(--crimson)]";
  const buttonBgClass =
    variant === "gold" ? "bg-[var(--gold)]" : "bg-[var(--crimson)]";
  const buttonBorderClass =
    variant === "gold" ? "border-[var(--gold)]" : "border-[var(--crimson)]";
  const buttonTextClass =
    variant === "gold" ? "text-[var(--charcoal)]" : "text-[var(--surface)]";

  return (
    <Link href={href || "#"} className="course-card block group">
      <div
        className={cn(
          "relative bg-[var(--background)] border-t-[4px] p-8 h-full transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden",
          borderColorClass,
        )}
      >
        <span
          className={cn(
            "font-bold tracking-widest uppercase text-xs mb-3 block",
            labelColorClass,
          )}
        >
          {label}
        </span>
        <h3 className="text-2xl font-black text-[var(--charcoal)] mb-4">
          {title}
        </h3>
        <p className="text-[var(--charcoal-light)] font-light text-sm leading-relaxed mb-8">
          {description}
        </p>
        <div
          className={cn(
            "inline-block px-8 py-3 font-semibold text-sm tracking-wide uppercase border transition-all duration-300 group-hover:bg-[var(--charcoal)] group-hover:text-[var(--surface)] group-hover:border-[var(--charcoal)] group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]",
            buttonBgClass,
            buttonTextClass,
            buttonBorderClass,
          )}
        >
          View Deck
        </div>
      </div>
    </Link>
  );
}
