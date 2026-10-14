"use client";
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Monitor,
  Server,
  Database,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Orbital } from "./scene/orbital";
import { usePreferences } from "./preferences";
function Notes({ children }: { children: React.ReactNode }) {
  return (
    <details className="experiment-notes">
      <summary>Implementation notes</summary>
      <p>{children}</p>
    </details>
  );
}
export function OrbitalExperiment() {
  const [speed, setSpeed] = useState(1);
  const [layers, setLayers] = useState([true, true, true]);
  const [paused, setPaused] = useState(false);
  const { reduced, simple } = usePreferences();
  const reset = () => {
    setSpeed(1);
    setLayers([true, true, true]);
    setPaused(false);
  };
  return (
    <section className="experiment" id="orbital">
      <div className="experiment-heading">
        <div>
          <p className="mono">Experiment / 01</p>
          <h2>Orbital Systems</h2>
        </div>
        <p>
          Explore how a few connected forms become a system. Adjust the pace,
          isolate a band, or hold a moment still.
        </p>
      </div>
      <div className="experiment-shell">
        <div className="experiment-stage">
          <Orbital lab speed={speed} layers={layers} paused={paused} />
          <p className="experiment-text-status" role="status">
            {reduced
              ? "Static, respecting reduced motion."
              : paused
                ? "Rotation paused."
                : simple
                  ? "Simplified orbital illustration."
                  : "Three incomplete bands around a titanium core."}{" "}
            {layers.filter(Boolean).length} bands visible.
          </p>
        </div>
        <div className="experiment-controls">
          <label htmlFor="orbit-speed">
            Rotation speed <span>{speed.toFixed(1)}×</span>
            <input
              id="orbit-speed"
              type="range"
              min="0.2"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </label>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 12, marginBottom: 8 }}>
              Visible bands
            </legend>
            {["Outer / Interface", "Middle / Logic", "Inner / Data"].map(
              (l, i) => (
                <label className="control-check" key={l}>
                  <input
                    type="checkbox"
                    checked={layers[i]}
                    onChange={() =>
                      setLayers((current) =>
                        current.map((v, j) => (j === i ? !v : v)),
                      )
                    }
                  />
                  {l}
                </label>
              ),
            )}
          </fieldset>
          <div className="control-buttons">
            <button onClick={() => setPaused((v) => !v)} aria-pressed={paused}>
              {paused ? <Play size={15} /> : <Pause size={15} />}{" "}
              {paused ? "Resume" : "Pause"}
            </button>
            <button onClick={reset}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>
      <Notes>
        A procedural React Three Fiber scene with incomplete toroidal bands, a
        ribbed core, and a generated room environment. Mobile begins with an
        original SVG version. Offscreen and hidden-tab scenes pause. Reduced
        motion uses a static visual. The diagram is illustrative, with all
        controls and descriptions in HTML.
      </Notes>
    </section>
  );
}
const architectures = [
  {
    name: "Web application",
    tools: ["React / Next.js", "Node.js API", "PostgreSQL"],
    details: [
      "Renders the interface and gathers the action a person wants to take.",
      "Checks inputs and permissions, then translates the request into application logic.",
      "Reads or writes structured records and returns the requested information.",
    ],
  },
  {
    name: "Mobile application",
    tools: ["React Native", "Express API", "MongoDB"],
    details: [
      "Presents platform-aware screens and starts a request from a user interaction.",
      "Validates the request and provides the shared application behavior.",
      "Stores and retrieves documents that support the application.",
    ],
  },
  {
    name: "WordPress website",
    tools: ["Theme interface", "WordPress / Plugin", "Content database"],
    details: [
      "Shows content through the theme and captures a visitor’s action.",
      "Uses WordPress and plugin logic to handle the request.",
      "Holds pages, settings, and the content used by the website.",
    ],
  },
];
export function ArchitectureExperiment() {
  const [architecture, setArchitecture] = useState(0);
  const [node, setNode] = useState(0);
  const [stage, setStage] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const a = architectures[architecture];
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  };
  const reset = () => {
    stop();
    setStage(-1);
    setNode(0);
  };
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  const play = () => {
    stop();
    setPlaying(true);
    setStage(0);
    setNode(0);
    let step = 0;
    timer.current = setInterval(() => {
      step++;
      setStage(step);
      setNode(step < 3 ? step : step === 3 ? 1 : 0);
      if (step >= 4) {
        stop();
      }
    }, 850);
  };
  const messages = [
    "1 / Interface sends a request.",
    "2 / API checks the request and runs the logic.",
    "3 / Database returns the relevant information.",
    "4 / API formats the response.",
    "5 / Interface displays the result.",
  ];
  return (
    <section className="experiment" id="architecture">
      <div className="experiment-heading">
        <div>
          <p className="mono">Experiment / 02</p>
          <h2>Architecture Explorer</h2>
        </div>
        <p>
          A request, from interface to data and back. Choose a sample stack,
          inspect a node, then play the sequence.
        </p>
      </div>
      <div className="experiment-shell">
        <div className="experiment-stage">
          <div className="request-diagram">
            {a.tools.map((tool, i) => (
              <div key={i} style={{ display: "contents" }}>
                {i > 0 && (
                  <ArrowRight
                    aria-hidden="true"
                    className={`request-connector ${playing && node === i ? "active" : ""}`}
                    size={30}
                  />
                )}
                <button
                  className={`request-node ${node === i ? "active" : ""}`}
                  aria-pressed={node === i}
                  onClick={() => setNode(i)}
                  aria-label={`Inspect ${tool}`}
                >
                  {i === 0 ? (
                    <Monitor size={28} />
                  ) : i === 1 ? (
                    <Server size={28} />
                  ) : (
                    <Database size={28} />
                  )}
                  <span>{["Interface", "API", "Data"][i]}</span>
                </button>
              </div>
            ))}
          </div>
          <div className="node-description">
            <h3>{a.tools[node]}</h3>
            <p>{a.details[node]}</p>
          </div>
          <p className="experiment-text-status" role="status">
            {stage < 0
              ? "Educational example. Select a node or play a request."
              : messages[stage]}
          </p>
        </div>
        <div className="experiment-controls">
          <label htmlFor="sample-architecture">
            Sample architecture
            <select
              id="sample-architecture"
              value={architecture}
              onChange={(e) => {
                reset();
                setArchitecture(Number(e.target.value));
              }}
            >
              {architectures.map((x, i) => (
                <option key={x.name} value={i}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>
          <p style={{ fontSize: 12 }}>
            This is an educational model of a typical request, not a live
            production system.
          </p>
          <div className="control-buttons">
            <button onClick={play} disabled={playing}>
              {playing ? (
                <span>Playing…</span>
              ) : (
                <>
                  <Play size={15} /> Play request
                </>
              )}
            </button>
            <button onClick={reset}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>
      <Notes>
        Local React state drives node selection and a five-step request
        sequence. The timer is cleaned up on reset, stack changes, and unmount.
        No network request is made. Real applications vary in structure.
      </Notes>
    </section>
  );
}
const accents = [
  { name: "Signal lime", color: "#c5ff67", ink: "#355c18" },
  { name: "Glacier blue", color: "#9cd9ee", ink: "#205d72" },
  { name: "Solar amber", color: "#f7c78b", ink: "#794817" },
];
export function InterfaceExperiment() {
  const [accent, setAccent] = useState(0);
  const [density, setDensity] = useState("comfortable");
  const [motion, setMotion] = useState(true);
  const [selected, setSelected] = useState("Prototype");
  const [saved, setSaved] = useState(false);
  const { reduced } = usePreferences();
  const reset = () => {
    setAccent(0);
    setDensity("comfortable");
    setMotion(true);
    setSelected("Prototype");
    setSaved(false);
  };
  return (
    <section className="experiment" id="interface">
      <div className="experiment-heading">
        <div>
          <p className="mono">Experiment / 03</p>
          <h2>Interface Playground</h2>
        </div>
        <p>
          Small choices change how an interface feels. Tune color, spacing, and
          motion on a working component.
        </p>
      </div>
      <div className="experiment-shell">
        <div className="experiment-stage interface-stage">
          <div
            className="component-preview"
            style={
              {
                "--preview-accent": accents[accent].color,
                "--preview-ink": accents[accent].ink,
                "--preview-gap": density === "compact" ? "12px" : "24px",
                "--preview-motion": motion && !reduced ? "180ms" : "0ms",
              } as React.CSSProperties
            }
          >
            <div className="preview-header">
              <span className="mono">Demo / New mission</span>
              <Monitor size={19} />
            </div>
            <h3>What’s the next move?</h3>
            <p>Select a starting point for this local interface demo.</p>
            <div className="preview-options">
              {["Prototype", "Application"].map((o) => (
                <button
                  key={o}
                  aria-pressed={selected === o}
                  onClick={() => {
                    setSelected(o);
                    setSaved(false);
                  }}
                >
                  {selected === o && <span aria-hidden="true">✓ </span>}
                  {o}
                </button>
              ))}
            </div>
            <button className="preview-submit" onClick={() => setSaved(true)}>
              {saved ? "Selection confirmed" : "Confirm selection"}
              {saved ? <Check size={16} /> : <ArrowUpRight size={16} />}
            </button>
            {saved && (
              <p className="preview-status" role="status">
                {selected} selected in this demo. Reset to start again.
              </p>
            )}
          </div>
        </div>
        <div className="experiment-controls">
          <div>
            <span style={{ fontSize: 12 }}>Accent color</span>
            <div className="accent-options" aria-label="Accent color">
              {accents.map((a, i) => (
                <button
                  key={a.name}
                  aria-label={a.name}
                  aria-pressed={accent === i}
                  style={{ background: a.color }}
                  onClick={() => setAccent(i)}
                >
                  {accent === i ? "✓" : ""}
                </button>
              ))}
            </div>
          </div>
          <label htmlFor="interface-density">
            Density
            <select
              id="interface-density"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </label>
          <label className="control-check">
            <input
              type="checkbox"
              checked={motion && !reduced}
              disabled={reduced}
              onChange={(e) => setMotion(e.target.checked)}
            />{" "}
            Component motion {reduced ? "(system reduced)" : ""}
          </label>
          <div className="control-buttons">
            <button onClick={reset}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>
      <Notes>
        CSS custom properties control the actual preview’s accent, density, and
        transition duration. Selection and confirmation are local demo state.
        The global or system reduced-motion preference takes priority over the
        component toggle.
      </Notes>
    </section>
  );
}
