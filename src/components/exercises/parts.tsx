"use client";

/*
 * Shared pieces for every exercise type. Styling comes only from the theme
 * tokens each course defines (--ink, --signal, --affirm, --rule, the tints),
 * so an exercise looks native in whichever deck it sits in. Feedback is always
 * carried by a mark and a word as well as by colour.
 */

import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** The exercise heading: a kicker naming the activity, then the prompt. */
export function ExerciseHeader({ kind, prompt }: { kind: string; prompt: string }) {
  return (
    <div className="mb-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-7 bg-[var(--signal)]" aria-hidden />
        <span className="type-label">Exercise · {kind}</span>
      </div>
      <p className="type-h2 max-w-[40ch] !text-[1.35rem] md:!text-[1.7rem]">{prompt}</p>
    </div>
  );
}

/** The main action (Check), filled when it can be used and outlined when it cannot. */
export function PrimaryButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "type-label border px-7 py-3 transition-colors duration-200",
        disabled
          ? "cursor-not-allowed border-[var(--rule-2)] !text-[var(--ink-3)]"
          : "cursor-pointer border-[var(--ink)] bg-[var(--ink)] !text-[var(--paper)] hover:border-[var(--signal)] hover:bg-[var(--signal)]",
      )}
    >
      {children}
    </button>
  );
}

/** A quiet text action (Try again, Start over). */
export function TextButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="type-caption cursor-pointer underline decoration-[var(--rule-2)] underline-offset-4 transition-colors hover:text-[var(--signal)]"
    >
      {children}
    </button>
  );
}

export type CardState = "idle" | "selected" | "right" | "wrong";

/** One tappable card: a term, an example or an item to sort. */
export function Card({
  children,
  state = "idle",
  badge,
  disabled,
  onClick,
  label,
  pressed,
}: {
  children: React.ReactNode;
  state?: CardState;
  /** A pair number or other small marker shown at the start of the card. */
  badge?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  /** Accessible name when the visible text needs context. */
  label?: string;
  /** Still the current choice while showing a mark (a missed card waiting for another try). */
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed ?? state === "selected"}
      aria-label={label}
      className={cn(
        "flex w-full min-w-0 items-start gap-3 border px-4 py-3 text-left transition-colors duration-150",
        state === "idle" && "border-[var(--rule-2)] bg-[var(--paper)]",
        state === "idle" && !disabled && "cursor-pointer hover:border-[var(--ink)]",
        state === "selected" && "cursor-pointer border-[var(--signal)] bg-[var(--signal-tint)] ring-1 ring-[var(--signal)]",
        state === "right" && "border-[var(--affirm)] bg-[var(--affirm-tint)]",
        state === "wrong" && "border-[var(--signal)] bg-[var(--signal-tint)]",
        state === "wrong" && pressed && "cursor-pointer ring-1 ring-[var(--signal)]",
        disabled && "cursor-default",
      )}
    >
      {state === "right" ? (
        <span className="mt-0.5 flex shrink-0 items-center gap-1" aria-hidden>
          <Check className="h-4 w-4 text-[var(--affirm)]" strokeWidth={2.5} />
          {badge ? <span className="type-caption tabular-nums !text-[var(--affirm)]">{badge}</span> : null}
        </span>
      ) : state === "wrong" ? (
        <X className="mt-1 h-4 w-4 shrink-0 text-[var(--signal)]" strokeWidth={2.5} aria-hidden />
      ) : badge !== undefined ? (
        <span className="type-caption mt-0.5 w-4 shrink-0 tabular-nums !text-[var(--signal)]" aria-hidden>
          {badge}
        </span>
      ) : null}
      <span className="type-body min-w-0 flex-1 !text-[1rem] !leading-snug">{children}</span>
      {state === "right" || state === "wrong" ? (
        <span className="sr-only">{state === "right" ? "Correct." : "Not quite."}</span>
      ) : null}
    </button>
  );
}

/** Why an answer is right, under a card that was checked. */
export function Explanation({ right, children }: { right: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("mt-2 border-l-2 pl-4", right ? "border-[var(--affirm)]" : "border-[var(--signal)]")}>
      <p className="type-body !text-[0.95rem]">{children}</p>
    </div>
  );
}

/** A polite live line that tells the student what to do next, or the score. */
export function Status({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-caption mt-6" aria-live="polite">
      {children}
    </p>
  );
}
