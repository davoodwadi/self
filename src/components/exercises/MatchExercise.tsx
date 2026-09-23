"use client";

import React, { useMemo, useState } from "react";
import { seededDerangement, type MatchExercise as MatchData } from "@/lib/course-exercise";
import { Card, Explanation, ExerciseHeader, Status, TextButton } from "./parts";

/**
 * Match-up, with feedback on every pair. Tap a term, then the example it goes
 * with (either order works). A right pair locks both cards with a tick and the
 * same number, and its explanation shows in the status line (all of them sit
 * under their terms once every pair is done, so nothing moves mid-exercise);
 * a wrong pair marks both cards and
 * leaves the first one selected, without giving the answer away, so the
 * student only has to tap a different partner.
 */
export default function MatchExercise({
  data,
  art,
}: {
  data: MatchData;
  /** Optional drawings from the course, keyed by pair id; shown with the term. */
  art?: Record<string, React.ReactNode>;
}) {
  // Deal in a stable, shuffled order with nothing opposite its own answer.
  const matches = useMemo(() => seededDerangement(data.pairs, data.slide_id), [data]);

  /** pair ids matched correctly (a term and its example share the pair id) */
  const [matched, setMatched] = useState<Record<string, true>>({});
  const [term, setTerm] = useState<string | null>(null);
  const [match, setMatch] = useState<string | null>(null);
  /** the last attempt, for the status line and the marks on a missed pair */
  const [last, setLast] = useState<{ term: string; match: string; right: boolean; keep: "term" | "match" } | null>(null);
  /** terms that were paired wrongly at least once */
  const [missed, setMissed] = useState<Record<string, true>>({});

  const n = data.pairs.length;
  const number = (id: string) => data.pairs.findIndex((p) => p.id === id) + 1;
  const done = data.pairs.every((p) => matched[p.id]);
  const firstTry = data.pairs.filter((p) => !missed[p.id]).length;
  const missTerm = (t: string) => !!last && !last.right && last.term === t;
  const missMatch = (m: string) => !!last && !last.right && last.match === m;

  const attempt = (t: string, m: string, keep: "term" | "match") => {
    if (t === m) {
      setMatched((x) => ({ ...x, [t]: true }));
      setTerm(null);
      setMatch(null);
      setLast({ term: t, match: m, right: true, keep });
    } else {
      setMissed((x) => ({ ...x, [t]: true }));
      if (keep === "term") setMatch(null);
      else setTerm(null);
      setLast({ term: t, match: m, right: false, keep });
    }
  };

  const tapTerm = (t: string) => {
    if (matched[t]) return;
    if (match) return attempt(t, match, "match");
    const retrying = missTerm(t) && term === t;
    setTerm((s) => (s === t && !retrying ? null : t));
    setLast(null);
  };

  const tapMatch = (m: string) => {
    if (matched[m]) return;
    if (term) return attempt(term, m, "term");
    const retrying = missMatch(m) && match === m;
    setMatch((s) => (s === m && !retrying ? null : m));
    setLast(null);
  };

  const reset = () => {
    setMatched({});
    setTerm(null);
    setMatch(null);
    setLast(null);
    setMissed({});
  };

  return (
    <div className="w-full">
      <ExerciseHeader kind="Match up" prompt={data.prompt} />

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="min-w-0">
          {data.term_label ? <p className="type-label mb-3 !text-[var(--ink)]">{data.term_label}</p> : null}
          <ul className="grid content-start gap-3">
            {data.pairs.map((p) => (
              <li key={p.id} className="min-w-0">
                <Card
                  state={matched[p.id] ? "right" : missTerm(p.id) ? "wrong" : term === p.id ? "selected" : "idle"}
                  pressed={term === p.id}
                  badge={matched[p.id] ? number(p.id) : ""}
                  disabled={!!matched[p.id]}
                  onClick={() => tapTerm(p.id)}
                >
                  {art?.[p.id] ? <span className="mb-2 block">{art[p.id]}</span> : null}
                  <span className="font-semibold">{p.term}</span>
                </Card>
                {done && p.explanation ? <Explanation right>{p.explanation}</Explanation> : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          {data.match_label ? <p className="type-label mb-3 !text-[var(--ink)]">{data.match_label}</p> : null}
          <ul className="grid content-start gap-3">
            {matches.map((p) => (
              <li key={p.id} className="min-w-0">
                <Card
                  state={matched[p.id] ? "right" : missMatch(p.id) ? "wrong" : match === p.id ? "selected" : "idle"}
                  pressed={match === p.id}
                  badge={matched[p.id] ? number(p.id) : ""}
                  disabled={!!matched[p.id]}
                  onClick={() => tapMatch(p.id)}
                >
                  {p.match}
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Status>
        {done
          ? `All matched. ${firstTry} of ${n} right on the first try.`
          : last && !last.right
            ? `Not a match. Try another ${last.keep === "term" ? "example" : "term"}.`
            : last?.right
              ? `Yes, a match. ${data.pairs.find((p) => p.id === last.term)?.explanation ?? ""}`.trim()
              : term || match
                ? "Now tap what it goes with."
                : "Tap a term, then the example it goes with."}
      </Status>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <TextButton onClick={reset}>Start over</TextButton>
      </div>
    </div>
  );
}
