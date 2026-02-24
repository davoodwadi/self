"use client";

import React, { useState } from "react";
import Mermaid from "@/components/courses/MermaidDiagram"; // Adjust path as needed

export default function App() {
  // Strongly type the state as a string
  const [diagram, setDiagram] = useState<string>(`
    graph TD;
      React-->Mermaid;
      Mermaid-->SVG;
      SVG-->Browser;
  `);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Mermaid Diagram</h1>

      {/* Render the TS Component */}
      <Mermaid chart={diagram} />

      {/* Example: Dynamically updating the chart */}
      <button
        onClick={() =>
          setDiagram('pie title Pets \n "Dogs" : 386 \n "Cats" : 85')
        }
        style={{ marginTop: "20px", padding: "10px 15px", cursor: "pointer" }}
      >
        Change to Pie Chart
      </button>
    </div>
  );
}
