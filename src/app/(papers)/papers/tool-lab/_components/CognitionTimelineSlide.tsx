import { SlideShell } from "./SlidePrimitives";

export default function CognitionTimelineSlide() {
  return (
    <SlideShell
      number="05"
      eyebrow="Evolution of Rationality"
      title={
        <>
          From <span className="grad-violet-cyan">Classical</span> to{" "}
          <span className="grad-violet-cyan">Resource</span> Rationality
        </>
      }
      message="How our understanding of human cognition has evolved to account for computational and informational limits."
    >
      <div
        className="tl-panel"
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        {/* 1944: Pure Rationality */}
        <div
          style={{
            position: "relative",
            paddingLeft: "2rem",
            borderLeft: "2px solid var(--border)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-7px",
              top: "0",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "var(--violet)",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              className="p-mono"
              style={{ color: "var(--violet)", fontWeight: "bold" }}
            >
              ~1944
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>
              Pure Rationality
            </span>
          </div>
          <p className="p-body tl-message" style={{ marginBottom: "0.5rem" }}>
            Expected Utility Theory (von Neumann & Morgenstern). Assumes agents
            have infinite cognitive resources to find the objectively optimal
            choice.
          </p>
          <span className="tag tag-muted">Homo Economicus</span>
        </div>

        {/* 1955: Bounded Rationality */}
        <div
          style={{
            position: "relative",
            paddingLeft: "2rem",
            borderLeft: "2px solid var(--border)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-7px",
              top: "0",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "var(--cyan)",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              className="p-mono"
              style={{ color: "var(--cyan)", fontWeight: "bold" }}
            >
              ~1955
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>
              Bounded Rationality
            </span>
          </div>
          <p className="p-body tl-message" style={{ marginBottom: "0.5rem" }}>
            Herbert Simon introduces limits to cognition. Instead of maximizing,
            humans use heuristics and &ldquo;satisfice&rdquo; (accepting a
            good-enough solution).
          </p>
          <span className="tag tag-muted">Satisficing</span>
        </div>

        {/* 2020: Resource Rationality */}
        <div
          style={{
            position: "relative",
            paddingLeft: "2rem",
            borderLeft: "2px solid var(--amber-light)",
            borderBottom: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-7px",
              top: "0",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "var(--amber-light)",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              className="p-mono"
              style={{ color: "var(--amber-light)", fontWeight: "bold" }}
            >
              ~2020
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>
              Resource Rationality
            </span>
          </div>
          <p className="p-body tl-message" style={{ marginBottom: "0.5rem" }}>
            Lieder & Griffiths formalize cognition as an optimization problem:
            maximizing expected utility <em>net of</em> computational and time
            costs.
          </p>
          <span className="tag tag-amber">Optimal Heuristics</span>
        </div>
      </div>
    </SlideShell>
  );
}
