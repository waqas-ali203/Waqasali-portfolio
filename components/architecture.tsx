"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
const layers = [
  {
    name: "Interface",
    tools: ["React", "Next.js", "React Native"],
    text: "The part people touch. Clear user flows, responsive layouts, and interface states that help people move forward.",
    code: "UI",
  },
  {
    name: "Application Logic",
    tools: ["Node.js", "Express", "TypeScript"],
    text: "The rules that make it work. Structured application logic and APIs connect user actions to useful behavior.",
    code: "API",
  },
  {
    name: "Data",
    tools: ["MongoDB", "PostgreSQL"],
    text: "The information behind the experience. Purposeful schemas and reliable data handling support the product’s needs.",
    code: "DB",
  },
  {
    name: "Integrations",
    tools: ["External APIs", "AI integrations", "Python"],
    text: "The connections beyond the application. External tools and model APIs with clear inputs, boundaries, and fallbacks.",
    code: "EXT",
  },
];
export function ArchitectureExplorer() {
  const [active, setActive] = useState(0);
  return (
    <div className="architecture-explorer">
      <div className="layer-visual" aria-hidden="true">
        <div className="layer-axis" />
        {layers.map((l, i) => (
          <div
            key={l.name}
            className={`diagram-layer layer-${i} ${active === i ? "active" : ""}`}
          >
            <span className="layer-code">{l.code}</span>
            <span className="layer-nodes">
              <i />
              <i />
              <i />
            </span>
            <span className="layer-number">0{i + 1}</span>
          </div>
        ))}
        <span className="diagram-caption mono">
          One product. Connected layers.
        </span>
      </div>
      <div className="layer-content">
        <div
          role="tablist"
          aria-label="Engineering layers"
          className="layer-tabs"
        >
          {layers.map((l, i) => (
            <button
              key={l.name}
              role="tab"
              id={`layer-tab-${i}`}
              aria-controls={`layer-panel-${i}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (
                  e.key === "ArrowDown" ||
                  e.key === "ArrowRight" ||
                  e.key === "ArrowUp" ||
                  e.key === "ArrowLeft"
                ) {
                  e.preventDefault();
                  const next =
                    (i +
                      (e.key === "ArrowDown" || e.key === "ArrowRight"
                        ? 1
                        : 3)) %
                    4;
                  setActive(next);
                  document.getElementById(`layer-tab-${next}`)?.focus();
                }
                if (e.key === "Home" || e.key === "End") {
                  e.preventDefault();
                  const next = e.key === "Home" ? 0 : 3;
                  setActive(next);
                  document.getElementById(`layer-tab-${next}`)?.focus();
                }
              }}
            >
              <span className="mono">0{i + 1}</span>
              {l.name}
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        {layers.map((l, i) => (
          <div
            role="tabpanel"
            id={`layer-panel-${i}`}
            aria-labelledby={`layer-tab-${i}`}
            hidden={active !== i}
            tabIndex={0}
            key={l.name}
            className="layer-description"
          >
            <p>{l.text}</p>
            <div className="tags">
              {l.tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
        <details className="linear-layers">
          <summary>Read all layers</summary>
          {layers.map((l) => (
            <div key={l.name}>
              <h4>{l.name}</h4>
              <p>{l.text}</p>
            </div>
          ))}
        </details>
      </div>
    </div>
  );
}
