"use client";
import { useEffect, useState } from "react";
const sections = [
  ["challenge", "The challenge"],
  ["contribution", "Development context"],
  ["decisions", "Engineering decisions"],
  ["walkthrough", "Visual walkthrough"],
  ["outcomes", "Documented outcomes"],
];
export function CaseTOC() {
  const [active, setActive] = useState("challenge");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="case-toc" aria-label="On this project page">
      {sections.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
        >
          {active === id ? "↗ " : ""}
          {label}
        </a>
      ))}
    </nav>
  );
}
