import FlowRenderer from "../../_components/FlowRenderer";

import {
  aiTopDownData,
  aiCascadingData,
  aiCircularData,
} from "../../_components/examples";

export default function DiagramsPage() {
  return (
    <main className="p-8 max-w-5xl mx-auto space-y-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          React Flow Modular Diagrams
        </h1>
        <p className="text-gray-600 mt-2">
          Rendered from decoupled, math-free configuration files.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-2">1. AI Top-Down Flow</h2>
        <div className="h-[450px] w-full border-2 border-slate-200 rounded-xl">
          <FlowRenderer
            aiGeneratedNodes={aiTopDownData.nodes}
            aiGeneratedEdges={aiTopDownData.edges}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">
          2. AI Cascading & Feedback Loop
        </h2>
        <div className="h-[450px] w-full border-2 border-slate-200 rounded-xl">
          <FlowRenderer
            aiGeneratedNodes={aiCascadingData.nodes}
            aiGeneratedEdges={aiCascadingData.edges}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">3. AI Circular Diagram</h2>
        <div className="h-[550px] w-full border-2 border-slate-200 rounded-xl">
          <FlowRenderer
            aiGeneratedNodes={aiCircularData.nodes}
            aiGeneratedEdges={aiCircularData.edges}
          />
        </div>
      </section>
    </main>
  );
}
