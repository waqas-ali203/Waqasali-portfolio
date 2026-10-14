"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play, Orbit } from "lucide-react";
import { cosmicArt, cosmicScenes, type CosmicScene } from "@/content/cosmos";
import { usePreferences } from "./preferences";

// A shared, composited sky. No extra WebGL context, video, or animation library.
export function HeroCosmos({
  scene = "home",
  sector = 0,
}: {
  scene?: CosmicScene;
  sector?: number;
}) {
  const art = cosmicScenes[scene];
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const { reduced, simple } = usePreferences();
  const running = visible && tabVisible && !paused && !reduced && !simple;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    if (root.current) observer.observe(root.current);
    const visibility = () => setTabVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    const sky = root.current;
    const host = sky?.closest<HTMLElement>(".cosmic-host");
    if (!sky || !host || !running) {
      sky?.style.removeProperty("--sky-x");
      sky?.style.removeProperty("--sky-y");
      return;
    }
    const fine = matchMedia("(pointer: fine) and (min-width: 801px)");
    let frame = 0;
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;
    const paint = () => {
      frame = 0;
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      sky.style.setProperty("--sky-x", `${x.toFixed(2)}px`);
      sky.style.setProperty("--sky-y", `${y.toFixed(2)}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.08)
        frame = requestAnimationFrame(paint);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType === "touch") return;
      const box = host.getBoundingClientRect();
      targetX = Math.max(
        -12,
        Math.min(
          12,
          ((event.clientX - box.left - box.width / 2) / box.width) * 24,
        ),
      );
      targetY = Math.max(
        -8,
        Math.min(
          8,
          ((event.clientY - box.top - box.height / 2) / box.height) * 16,
        ),
      );
      schedule();
    };
    const reset = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", reset);
    fine.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", reset);
      fine.removeEventListener("change", reset);
      sky.style.removeProperty("--sky-x");
      sky.style.removeProperty("--sky-y");
    };
  }, [running]);

  const starSeed = Object.keys(cosmicScenes).indexOf(scene) + sector;
  const constellation =
    scene === "services"
      ? [
          [80, 410],
          [230, 320],
          [340, 345],
          [415, 245],
          [560, 190],
          [630, 75],
        ]
      : [
          [105, 375],
          [200, 260],
          [320, 295],
          [390, 165],
          [525, 200],
          [605, 95],
        ];
  const style = {
    "--galaxy-angle": `${art.angle + sector * 3}deg`,
    "--galaxy-position": art.position,
    "--galaxy-image": `url("${cosmicArt.desktop}")`,
    "--galaxy-mobile-image": `url("${cosmicArt.mobile}")`,
  } as CSSProperties;

  return (
    <>
      <div
        ref={root}
        className={`hero-cosmos cosmos-${scene}`}
        data-running={running}
        data-reduced={reduced}
        data-simple={simple}
        data-scene={scene}
        style={style}
        aria-hidden="true"
      >
        <div className="cosmos-depth">
          <div className="cosmos-galaxy sky-animation" />
          <div className="cosmos-haze sky-animation" />
        </div>
        <svg
          className="cosmos-stars"
          viewBox="0 0 1400 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <g fill="#e5ebdc">
            {Array.from({ length: 54 }, (_, i) => {
              const bright = i % 9 === 0;
              return (
                <circle
                  key={i}
                  cx={((i * 197.3 + starSeed * 59) % 1380) + 10}
                  cy={((i * i * 31.7 + starSeed * 41) % 670) + 15}
                  r={bright ? 1.5 : 0.65}
                  opacity={bright ? 0.7 : 0.18 + (i % 5) * 0.06}
                />
              );
            })}
          </g>
        </svg>
        <div className="cosmos-sparkles">
          {[
            [67, 24],
            [88, 62],
            [49, 72],
            [79, 44],
            [30, 20],
          ].map(([left, top], i) => (
            <i
              key={i}
              className="cosmos-sparkle sky-animation"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${-i * 1.7}s`,
              }}
            />
          ))}
        </div>
        <svg className="cosmos-chart" viewBox="0 0 700 500" fill="none">
          <g stroke="#b9d4a0" strokeWidth="0.7">
            <path
              className="cosmos-chart-line"
              d={constellation
                .map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`)
                .join("")}
            />
            <path
              d="M340 45V80M322.5 62.5H357.5M595 340V365M582.5 352.5H607.5"
              opacity=".4"
            />
            <circle
              cx="390"
              cy="165"
              r="120"
              strokeDasharray="1 12"
              opacity=".28"
            />
          </g>
          {constellation.map(([cx, cy], i) => (
            <g key={i} className="cosmos-chart-point">
              <circle
                cx={cx}
                cy={cy}
                r="8"
                stroke="#c5ff67"
                strokeWidth=".5"
                opacity=".35"
              />
              <circle cx={cx} cy={cy} r={i === 3 ? 2.7 : 1.6} fill="#d6ff9c" />
            </g>
          ))}
          <text
            x={constellation[3][0] + 18}
            y={constellation[3][1] - 10}
            className="cosmos-coordinate"
          >
            {sector ? `FIELD / 0${sector}` : "CONNECTED SYSTEMS"}
          </text>
        </svg>
        <div className={`cosmos-motif cosmos-motif-${art.motif}`}>
          <i className="cosmos-ring ring-one sky-animation" />
          <i className="cosmos-ring ring-two sky-animation" />
          <i className="cosmos-ring ring-three sky-animation" />
          <span className="cosmos-core" />
          <b className="cosmos-satellite sky-animation" />
        </div>
        <div className="cosmos-meteors">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`cosmos-meteor meteor-${i + 1}`}>
              <span className="cosmos-comet sky-animation">
                <i />
                <b />
              </span>
            </div>
          ))}
        </div>
        <div className="cosmos-vignette" />
        <div className="cosmos-field-note">
          <span />
          <span>
            {art.label}
            {sector ? ` / 0${sector}` : ""}
          </span>
          <i>✦</i>
        </div>
      </div>
      <button
        className="cosmos-control"
        type="button"
        disabled={reduced || simple}
        aria-pressed={paused}
        aria-label={
          paused
            ? "Resume cosmic background animation"
            : "Pause cosmic background animation"
        }
        onClick={() => setPaused((p) => !p)}
        title={
          reduced || simple
            ? "Static sky follows your visual preferences"
            : undefined
        }
      >
        {reduced || simple ? (
          <Orbit size={13} />
        ) : paused ? (
          <Play size={13} />
        ) : (
          <Pause size={13} />
        )}
        <span>
          {reduced || simple
            ? "Still sky"
            : paused
              ? "Resume sky"
              : "Pause sky"}
        </span>
      </button>
    </>
  );
}
