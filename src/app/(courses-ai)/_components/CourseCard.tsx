"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  href?: string;
  label: string; // e.g. "Week 1" or "New Paradigm"
  title: string;
  description: string;
  isLocked?: boolean;
  variant?: "accent" | "muted";
}

export function CourseCard({
  href,
  label,
  title,
  description,
  isLocked = false,
  variant = "accent",
}: CourseCardProps) {
  if (isLocked) {
    return (
      <div className="block opacity-50">
        <div className="flex flex-col justify-between relative bg-[var(--background)] border-t-[4px] border-t-[var(--ink-2)] p-8 h-full grayscale">
          <div>
            <span className="text-[var(--ink-2)] font-bold tracking-widest uppercase text-xs mb-3 block">
              {label}
            </span>
            <h3 className="text-xl font-black text-[var(--ink-2)] mb-4">
              {title}
            </h3>
            <p className="text-[var(--ink-2)] font-light text-sm leading-relaxed mb-8">
              {description}
            </p>
          </div>
          <div className="inline-block text-center px-8 py-3 bg-transparent text-[var(--ink-2)] font-semibold text-sm tracking-wide uppercase border border-[var(--ink-2)]">
            Locked
          </div>
        </div>
      </div>
    );
  }

  const borderColorClass =
    variant === "muted" ? "border-t-[var(--ink-3)]" : "border-t-[var(--accent)]";
  const labelColorClass =
    variant === "muted" ? "text-[var(--ink-3)]" : "text-[var(--accent)]";
  const buttonBgClass =
    variant === "muted" ? "bg-[var(--ink-3)]" : "bg-[var(--accent)]";
  const buttonBorderClass =
    variant === "muted" ? "border-[var(--ink-3)]" : "border-[var(--accent)]";
  const buttonTextClass =
    variant === "muted" ? "text-[var(--ink)]" : "text-[var(--surface)]";

  return (
    <Link href={href || "#"} className="block group">
      <div
        className={cn(
          "flex flex-col justify-between relative bg-[var(--background)] border-t-[4px] p-8 h-full transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden",
          borderColorClass,
        )}
      >
        <div>
          <span
            className={cn(
              "font-bold tracking-widest uppercase text-xs mb-3 block",
              labelColorClass,
            )}
          >
            {label}
          </span>
          <h3 className="text-2xl font-black text-[var(--ink)] mb-4">
            {title}
          </h3>
          <p className="text-[var(--ink-2)] font-light text-sm leading-relaxed mb-8">
            {description}
          </p>
        </div>
        <div
          className={cn(
            "inline-block text-center px-8 py-3 font-semibold text-sm tracking-wide uppercase border transition-all duration-300 group-hover:bg-[var(--ink)] group-hover:text-[var(--surface)] group-hover:border-[var(--ink)] group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]",
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
