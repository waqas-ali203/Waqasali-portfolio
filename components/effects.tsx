"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { usePreferences } from "./preferences";

export function StudioEffects() {
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const m = matchMedia("(pointer: fine) and (min-width: 801px)");
    const update = () => setFinePointer(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  const cursor = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const { reduced } = usePreferences();
  useEffect(() => {
    if (reduced || !finePointer) return;
    let frame: number | null = null,
      scrollFrame: number | null = null;
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      visible = false;
    const touched = new Set<HTMLElement>();
    const paint = () => {
      frame = null;
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (cursor.current)
        cursor.current.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      if (dot.current)
        dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (visible && Math.abs(x - cx) + Math.abs(y - cy) > 0.2)
        frame = requestAnimationFrame(paint);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        cx = x;
        cy = y;
      }
      visible = true;
      document.documentElement.dataset.cursor = "ready";
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        ".project-media,.lab-preview,.portrait-link,.button",
      );
      const native = (e.target as HTMLElement).closest(
        "form,dialog,input,textarea,select",
      );
      const mode =
        target && !native
          ? target.classList.contains("button")
            ? "action"
            : "view"
          : "default";
      if (cursor.current) {
        cursor.current.dataset.mode = mode;
        cursor.current.style.opacity = native ? "0" : "1";
      }
      if (dot.current) dot.current.style.opacity = native ? "0" : "1";
      if (target && !native) {
        const r = target.getBoundingClientRect();
        const nx = Math.max(
          -1,
          Math.min(1, (x - r.left - r.width / 2) / (r.width / 2)),
        );
        const ny = Math.max(
          -1,
          Math.min(1, (y - r.top - r.height / 2) / (r.height / 2)),
        );
        touched.add(target);
        target.classList.add("studio-hover");
        target.style.setProperty("--pointer-x", `${((nx + 1) / 2) * 100}%`);
        target.style.setProperty("--pointer-y", `${((ny + 1) / 2) * 100}%`);
        if (target.classList.contains("button")) {
          target.classList.add("magnetic");
          target.style.setProperty("--mag-x", `${nx * 4}px`);
          target.style.setProperty("--mag-y", `${ny * 4}px`);
        } else {
          target.classList.add("tilt-media");
          target.style.setProperty("--tilt-x", `${-ny * 2}deg`);
          target.style.setProperty("--tilt-y", `${nx * 2}deg`);
        }
      }
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leaveTarget = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        ".studio-hover",
      );
      if (
        el &&
        (!(e.relatedTarget instanceof Node) || !el.contains(e.relatedTarget))
      ) {
        el.style.setProperty("--mag-x", "0px");
        el.style.setProperty("--mag-y", "0px");
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
        el.classList.remove("studio-hover");
      }
    };
    const hide = () => {
      visible = false;
      delete document.documentElement.dataset.cursor;
      if (cursor.current) cursor.current.style.opacity = "0";
      if (dot.current) dot.current.style.opacity = "0";
      if (frame) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };
    const onVisibility = () => {
      if (document.hidden) hide();
    };
    const parallax = () => {
      scrollFrame = null;
      if (document.hidden) return;
      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          const amount = Math.max(
            -32,
            Math.min(32, (innerHeight / 2 - r.top - r.height / 2) * 0.06),
          );
          el.style.setProperty("--scroll-shift", `${amount}px`);
          touched.add(el);
        });
    };
    const scroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(parallax);
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leaveTarget, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      hide();
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leaveTarget);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", scroll);
      touched.forEach((el) => {
        el.classList.remove("studio-hover", "magnetic", "tilt-media");
        [
          "--mag-x",
          "--mag-y",
          "--tilt-x",
          "--tilt-y",
          "--scroll-shift",
        ].forEach((v) => el.style.removeProperty(v));
      });
    };
  }, [path, reduced, finePointer]);
  useEffect(() => {
    if (reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("section-enter");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        "main .section,main .about-teaser,main .experiment,main .closing-contact",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path, reduced]);
  return (
    <>
      <div className="custom-cursor" ref={cursor} aria-hidden="true">
        <span>VIEW ↗</span>
        <i />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
