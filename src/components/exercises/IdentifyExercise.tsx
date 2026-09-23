"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import type { IdentifyExercise as IdentifyData } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import { ExerciseHeader, PrimaryButton, Status, TextButton } from "./parts";

/**
 * Which one is it? One case at a time; the student names the concept it shows
 * from a fixed set of buttons. A wrong concept is marked and disabled, without
 * giving the answer away; the right one is ticked, its explanation appears and
 * Next case opens. Nothing moves between cases: the case card and the
 * explanation area are each sized by invisible copies of every case and every
 * explanation, and the Next button is always in place.
 */
export default function IdentifyExercise({
  data,
  art,
}: {
  data: IdentifyData;
  /** Optional drawings from the course, keyed by case id; shown on the case card. */
  art?: Record<string, React.ReactNode>;
}) {
  const [index, setIndex] = useState(0);
  /** option ids tried wrongly on the current case */
  const [tried, setTried] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  /** cases named wrongly at least once */
  const [missed, setMissed] = useState<Record<string, true>>({});
  const [finished, setFinished] = useState(false);

  const n = data.cases.length;
  const current = data.cases[index];
  const label = (id: string) => data.options.find((o) => o.id === id)?.label ?? id;
  const firstTry = data.cases.filter((c) => !missed[c.id]).length;
  const lastTried = tried[tried.length - 1];

  const choose = (id: string) => {
    if (solved || tried.includes(id)) return;
    if (id === current.answer) setSolved(true);
    else {
      setTried((t) => [...t, id]);
      setMissed((m) => ({ ...m, [current.id]: true }));
    }
  };

  const next = () => {
    if (index + 1 < n) {
      setIndex(index + 1);
      setTried([]);
      setSolved(false);
    } else setFinished(true);
  };

  const reset = () => {
    setIndex(0);
    setTried([]);
    setSolved(false);
    setMissed({});
    setFinished(false);
  };

  const caseBody = (c: IdentifyData["cases"][number]) => (
    <>
      {art?.[c.id] ? <span className="mb-3 block">{art[c.id]}</span> : null}
      <span className="type-lead block">{c.text}</span>
    </>
  );

  return (
    <div className="w-full">
      <ExerciseHeader kind="Which one is it?" prompt={data.prompt} />

      {/* progress: one mark per case */}
      <ol className="mb-4 flex flex-wrap items-center gap-2" aria-label={`Case ${index + 1} of ${n}`}>
        {data.cases.map((c, i) => {
          const done = i < index || (i === index && (solved || finished));
          return (
            <li
              key={c.id}
              aria-hidden
              className={cn(
                "h-1.5 w-8",
                done ? "bg-[var(--affirm)]" : i === index ? "bg-[var(--signal)]" : "bg-[var(--rule-2)]",
              )}
            />
          );
        })}
        <li className="type-caption ml-2 tabular-nums" aria-hidden>
          {Math.min(index + 1, n)} / {n}
        </li>
      </ol>

      {/* the case: every case stacked invisibly underneath, so the card keeps one height */}
      <div className="grid border border-[var(--rule-2)] bg-[var(--paper)] px-5 py-5 md:px-7 md:py-6" aria-live="polite">
        {data.cases.map((c) => (
          <div key={c.id} className="invisible [grid-area:1/1]" aria-hidden>
            {caseBody(c)}
          </div>
        ))}
        <div className="[grid-area:1/1]">{caseBody(current)}</div>
      </div>

      {/* the concepts */}
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Which concept does this case show?">
        {data.options.map((o) => {
          const wrong = tried.includes(o.id);
          const right = solved && o.id === current.answer;
          return (
            <li key={o.id} className="min-w-0">
              <button
                type="button"
                onClick={() => choose(o.id)}
                disabled={wrong || solved || finished}
                className={cn(
                  "flex w-full items-center gap-3 border px-4 py-3 text-left transition-colors duration-150",
                  right && "border-[var(--affirm)] bg-[var(--affirm-tint)]",
                  wrong && "border-[var(--signal)] bg-[var(--signal-tint)]",
                  !right && !wrong && "border-[var(--rule-2)] bg-[var(--paper)]",
                  !right && !wrong && !solved && !finished && "cursor-pointer hover:border-[var(--ink)]",
                  (solved || finished) && !right && "opacity-60",
                )}
              >
                <span className="flex w-4 shrink-0 justify-center" aria-hidden>
                  {right ? (
                    <Check className="h-4 w-4 text-[var(--affirm)]" strokeWidth={2.5} />
                  ) : wrong ? (
                    <X className="h-4 w-4 text-[var(--signal)]" strokeWidth={2.5} />
                  ) : null}
                </span>
                <span className="type-body !text-[1rem] font-semibold !leading-snug">{o.label}</span>
                {right || wrong ? <span className="sr-only">{right ? "Correct." : "Not quite."}</span> : null}
              </button>
            </li>
          );
        })}
      </ul>

      {/* feedback: every explanation stacked invisibly, so the area keeps one height */}
      <div className="mt-5 grid">
        {data.cases.map((c) => (
          <p key={c.id} className="type-body invisible border-l-2 pl-4 !text-[0.95rem] [grid-area:1/1]" aria-hidden>
            {c.explanation ?? ""}
          </p>
        ))}
        <p
          className={cn(
            "type-body border-l-2 pl-4 !text-[0.95rem] [grid-area:1/1]",
            solved && current.explanation ? "border-[var(--affirm)]" : "border-transparent",
          )}
        >
          {solved ? current.explanation : ""}
        </p>
      </div>

      <Status>
        {finished
          ? `All done. ${firstTry} of ${n} right on the first try.`
          : solved
            ? `Yes, ${label(current.answer)}.`
            : lastTried
              ? `Not ${label(lastTried)}. Try another.`
              : "Which concept does this case show?"}
      </Status>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <PrimaryButton disabled={!solved || finished} onClick={next}>
          {index + 1 < n ? "Next case" : "Finish"}
        </PrimaryButton>
        <TextButton onClick={reset}>Start over</TextButton>
      </div>
    </div>
  );
}
