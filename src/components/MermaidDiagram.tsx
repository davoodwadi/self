"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useId } from "react";
import { div } from "three/tsl";

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
    // noteBkgColor: "#8B0000",
    // background: "#8B0000",
    // fontFamily: "'Open Sans', sans-serif",
    // fontSize: "16px",
  },
  securityLevel: "loose",
  // fontFamily: "'Open Sans', sans-serif",
  flowchart: {
    htmlLabels: false, // Forces SVG text instead of HTML wrapped text
  },
});
interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  // Strongly type the ref as an HTMLDivElement
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current || !chart) return;

      // 1. Wait for all web fonts to load before Mermaid calculates widths
      await document.fonts.ready;

      try {
        containerRef.current.innerHTML = "";
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

        // 2. Use a tiny delay to ensure React has fully committed the DOM layout
        setTimeout(async () => {
          if (!containerRef.current) return;

          const { svg, bindFunctions } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;

          if (bindFunctions) bindFunctions(containerRef.current);
        }, 10); // 10ms is enough for the browser to catch up
      } catch (error) {
        console.error("Failed to render Mermaid diagram:", error);
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="mermaid-container [&>svg]:w-full [&>svg]:max-w-full [&>svg]:h-auto"
      />
    </div>
  );
};

export default Mermaid;
