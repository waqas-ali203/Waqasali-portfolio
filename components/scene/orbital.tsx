"use client";
import dynamic from "next/dynamic";
import {
  Component,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { Pause, Play, Sparkles } from "lucide-react";
import { usePreferences } from "../preferences";
import { OrbitPoster } from "./orbit-poster";
import { site } from "@/content/site";
const Canvas = dynamic(() => import("./orbital-canvas"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function Orbital({
  lab = false,
  speed = 1,
  layers = [true, true, true],
  paused = false,
}: {
  lab?: boolean;
  speed?: number;
  layers?: boolean[];
  paused?: boolean;
}) {
  const { reduced, simple } = usePreferences();
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [desktop, setDesktop] = useState(false);
  const [optIn, setOptIn] = useState(false);
  const [localPaused, setLocalPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [supported, setSupported] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);
  useEffect(() => {
    const m = matchMedia("(min-width: 900px) and (pointer: fine)");
    const change = () => setDesktop(m.matches);
    change();
    m.addEventListener("change", change);
    const observer = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "100px" },
    );
    if (root.current) observer.observe(root.current);
    const visibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      m.removeEventListener("change", change);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!site.features.live3d || !(desktop || optIn) || simple || reduced)
      return;
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2");
      if (!context) {
        setFailed(true);
        return;
      }
      context.getExtension("WEBGL_lose_context")?.loseContext();
      setSupported(true);
    } catch {
      setFailed(true);
    }
  }, [desktop, optIn, simple, reduced]);
  const live =
    site.features.live3d &&
    !simple &&
    !reduced &&
    !failed &&
    supported &&
    (desktop || optIn);
  const running = live && visible && tabVisible && !paused && !localPaused;
  return (
    <div
      ref={root}
      data-running={running}
      data-live={live}
      className={`orbital ${live && ready ? "live-ready" : ""} ${lab ? "lab-orbital" : ""}`}
      onPointerMove={(e) => {
        if (reduced || e.pointerType === "touch") return;
        const rect = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      <div className="orbit-grid" aria-hidden="true" />
      <div
        className={`poster-wrap ${!live && !paused && !localPaused && !reduced && tabVisible && visible ? (lab ? "poster-spin" : "poster-float") : ""}`}
        style={{ animationDuration: lab ? `${90 / speed}s` : "16s" }}
      >
        <OrbitPoster layers={layers} />
      </div>
      {live && (visible || ready) && (
        <div className="canvas-wrap">
          <SceneBoundary onFailure={handleFailure}>
            <Canvas
              running={running}
              speed={speed}
              layers={layers}
              pointer={pointer}
              onReady={handleReady}
              onFailure={handleFailure}
            />
          </SceneBoundary>
        </div>
      )}
      {!lab && (
        <>
          <div className="orbit-annotation annotation-a">
            <span className="annotation-line" />
            01 / Interface
          </div>
          <div className="orbit-annotation annotation-b">
            02 / Logic
            <span className="annotation-line" />
          </div>
          <div className="orbit-annotation annotation-c">
            <span className="signal-dot" /> Computational core
          </div>
          <div className="orbit-corner corner-a" />
          <div className="orbit-corner corner-b" />
        </>
      )}
      <div className={`orbit-controls ${lab ? "lab-mode-control" : ""}`}>
        {live ? (
          !lab && (
            <button
              onClick={() => setLocalPaused((v) => !v)}
              aria-pressed={localPaused}
            >
              {localPaused ? <Play size={13} /> : <Pause size={13} />}{" "}
              {localPaused ? "Resume" : "Pause"} motion
            </button>
          )
        ) : site.features.live3d && !simple && !reduced && !failed ? (
          <>
            <button onClick={() => setOptIn(true)}>
              <Sparkles size={13} /> Activate 3D
            </button>
            {!lab && (
              <button
                onClick={() => setLocalPaused((v) => !v)}
                aria-pressed={localPaused}
              >
                {localPaused ? <Play size={13} /> : <Pause size={13} />}{" "}
                {localPaused ? "Resume" : "Pause"} motion
              </button>
            )}
          </>
        ) : (
          !lab && (
            <span className="mono">
              {failed ? "Static visual · WebGL unavailable" : "Static visual"}
            </span>
          )
        )}
      </div>
    </div>
  );
}
