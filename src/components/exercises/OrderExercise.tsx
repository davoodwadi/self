"use client";

import React, { useMemo, useState } from "react";
import { seededDerangement, type OrderExercise as OrderData } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import { Card, Explanation, ExerciseHeader, Status, TextButton } from "./parts";

/**
 * Put it in order, with feedback on every move. Tap a step, then the numbered
 * slot it belongs in: the right slot locks it in with a tick; a wrong slot
 * marks the step and leaves it selected in its place, without giving the
 * answer away. Nothing moves while students work: the pile keeps a slot for
 * every step, and every numbered slot is as tall as the tallest step, so no
 * slot's size hints at its answer. Explanations show in the status line, then
 * under each step once the sequence is complete.
 */
export default function OrderExercise({
  data,
  art,
}: {
  data: OrderData;
  /** Optional drawings from the course, keyed by step id. */
  art?: Record<string, React.ReactNode>;
}) {
  // Deal in a stable, shuffled order with nothing opposite its own answer.
  const deck = useMemo(() => seededDerangement(data.steps, data.slide_id), [data]);

  /** step id → true once it sits in its own slot (a slot only ever holds its right step) */
  const [placed, setPlaced] = useState<Record<string, true>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [last, setLast] = useState<{ step: string; slot: number; right: boolean } | null>(null);
  const [missed, setMissed] = useState<Record<string, true>>({});

  const n = data.steps.length;
  const done = data.steps.every((s) => placed[s.id]);
  const firstTry = data.steps.filter((s) => !missed[s.id]).length;
  const selectedText = data.steps.find((s) => s.id === selected)?.text;
  const missedNow = (id: string) => !!last && !last.right && last.step === id;

  const pick = (id: string) => {
    const retrying = missedNow(id) && selected === id;
    setSelected((s) => (s === id && !retrying ? null : id));
    setLast(null);
  };

  const put = (slot: number) => {
    if (!selected) return;
    if (data.steps[slot].id === selected) {
      setPlaced((p) => ({ ...p, [selected]: true }));
      setSelected(null);
      setLast({ step: selected, slot, right: true });
    } else {
      setMissed((m) => ({ ...m, [selected]: true }));
      setLast({ step: selected, slot, right: false });
    }
  };

  const reset = () => {
    setPlaced({});
    setSelected(null);
    setLast(null);
    setMissed({});
  };

  const body = (s: OrderData["steps"][number]) => (
    <>
      {art?.[s.id] ? <span className="mb-2 block">{art[s.id]}</span> : null}
      {s.text}
    </>
  );

  return (
    <div className="w-full">
      <ExerciseHeader kind="Put it in order" prompt={data.prompt} />

      {/* the pile: every step keeps its slot, so taking one out never reflows the rest */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Steps to put in order">
        {deck.map((s) =>
          placed[s.id] ? (
            <li key={s.id} className="relative min-w-0" aria-hidden>
              <div className="invisible">
                <Card>{body(s)}</Card>
              </div>
              <div className="absolute inset-0 border border-dashed border-[var(--rule-2)]" />
            </li>
          ) : (
            <li key={s.id} className="min-w-0">
              <Card
                state={missedNow(s.id) ? "wrong" : selected === s.id ? "selected" : "idle"}
                pressed={selected === s.id}
                onClick={() => pick(s.id)}
                label={missedNow(s.id) && last ? `${s.text} (not step ${last.slot + 1}; still selected, try another slot)` : undefined}
              >
                {body(s)}
              </Card>
            </li>
          ),
        )}
      </ul>

      {/* the sequence: numbered slots, each as tall as the tallest step */}
      <ol className="mt-8 grid gap-3 border-t-2 border-[var(--ink)] pt-5" aria-label="The sequence">
        {data.steps.map((s, i) => (
          <li key={s.id} className="flex min-w-0 items-start gap-4">
            <span
              aria-hidden
              className={cn(
                "w-7 shrink-0 pt-3 text-right text-[1.4rem] leading-none tabular-nums",
                selected && !placed[s.id] ? "text-[var(--signal)]" : "text-[var(--ink-3)]",
              )}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="grid">
                {/* sizers: every step, invisible and drawn as a placed card (tick
                    included), so all slots share one height and a card
                    landing in its slot never changes it */}
                {data.steps.map((x) => (
                  <div key={x.id} className="invisible [grid-area:1/1]" aria-hidden>
                    <Card state="right" disabled>
                      {body(x)}
                    </Card>
                  </div>
                ))}
                <div className="[grid-area:1/1]">
                  {placed[s.id] ? (
                    <Card state="right" disabled>
                      {body(s)}
                    </Card>
                  ) : (
                    <button
                      type="button"
                      disabled={!selected}
                      onClick={() => put(i)}
                      aria-label={selected ? `Put “${selectedText}” at step ${i + 1}` : `Step ${i + 1}, empty`}
                      className={cn(
                        "h-full w-full border border-dashed transition-colors",
                        selected
                          ? "cursor-pointer border-[var(--signal)] bg-[var(--signal-tint)]/40 hover:bg-[var(--signal-tint)]"
                          : "border-[var(--rule-2)]",
                        last && !last.right && last.slot === i && "border-[var(--signal)] bg-[var(--signal-tint)]",
                      )}
                    />
                  )}
                </div>
              </div>
              {done && s.explanation ? <Explanation right>{s.explanation}</Explanation> : null}
            </div>
          </li>
        ))}
      </ol>

      <Status>
        {done
          ? `In order. ${firstTry} of ${n} right on the first try.`
          : last && !last.right
            ? `Not step ${last.slot + 1}. Try another slot.`
            : last?.right
              ? `Yes, step ${last.slot + 1}. ${data.steps[last.slot].explanation ?? ""}`.trim()
              : selected
                ? "Now tap the step number where it belongs."
                : "Tap a step, then the number where it belongs."}
      </Status>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <TextButton onClick={reset}>Start over</TextButton>
      </div>
    </div>
  );
}
