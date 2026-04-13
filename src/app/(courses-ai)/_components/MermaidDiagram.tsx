"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#FFFFFF",
    primaryTextColor: "#1A1A1D",
    primaryBorderColor: "#8B0000",
    lineColor: "#8B0000",
    secondaryColor: "#F9F7F5",
    tertiaryColor: "#F9F7F5",
    nodeBorder: "#8B0000",
    clusterBkg: "#FFFFFF",
    clusterBorder: "#A52A2A",
    defaultLinkColor: "#A52A2A",
    edgeLabelBackground: "#ffffff00",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "18px",
  },
  securityLevel: "loose",
  fontFamily: "'Open Sans', sans-serif",
  flowchart: {
    htmlLabels: true,
    useMaxWidth: true,
    curve: "basis",
    padding: 20,
    nodeSpacing: 60,
    rankSpacing: 70,
    wrappingWidth: 200,
  },
});

interface MermaidProps {
  /** Mermaid diagram syntax. Supports flowcharts, sequence, state, ER, Gantt, mindmap, etc. */
  chart: string;
  /** Optional caption below the diagram */
  caption?: string;
  /** Additional CSS classes for the outer container */
  className?: string;
}

const Mermaid: React.FC<MermaidProps> = ({
  chart,
  caption,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const renderChart = async () => {
      if (!containerRef.current || !chart) return;

      await document.fonts.ready;

      try {
        setError(null);
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

        // Use rAF to ensure React has committed DOM layout before rendering
        requestAnimationFrame(async () => {
          if (cancelled || !containerRef.current) return;

          try {
            const { svg, bindFunctions } = await mermaid.render(id, chart);
            if (cancelled || !containerRef.current) return;
            containerRef.current.innerHTML = svg;

            // Force the SVG to fill the container width.
            // Mermaid sets inline style="max-width: Npx" which constrains it.
            const svgEl = containerRef.current.querySelector("svg");
            if (svgEl) {
              svgEl.removeAttribute("width");
              svgEl.removeAttribute("height");
              svgEl.style.width = "100%";
              svgEl.style.maxWidth = "100%";
              svgEl.style.height = "auto";
            }

            if (bindFunctions) bindFunctions(containerRef.current);
          } catch (renderError) {
            if (!cancelled) {
              setError("Diagram could not be rendered.");
              console.error("Mermaid render error:", renderError);
            }
          }
        });
      } catch (err) {
        if (!cancelled) {
          setError("Diagram could not be rendered.");
          console.error("Mermaid setup error:", err);
        }
      }
    };

    renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div
      className={`gsap-reveal w-full flex flex-col items-center overflow-hidden ${className}`}
    >
      {error ? (
        <div className="w-full rounded-lg border border-[var(--crimson)]/20 bg-[var(--surface)]/60 px-6 py-4 text-center">
          <p className="text-sm text-[var(--charcoal-light)]/70 italic font-sans">
            {error}
          </p>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="mermaid-container w-full [&>svg]:!w-full [&>svg]:!max-w-full [&>svg]:h-auto"
        />
      )}
      {caption && (
        <p className="mt-4 text-sm text-[var(--charcoal-light)]/70 italic text-center max-w-2xl font-serif">
          {caption}
        </p>
      )}
    </div>
  );
};

export default Mermaid;
