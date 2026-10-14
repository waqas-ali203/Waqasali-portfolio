import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { HeroCosmos } from "./hero-cosmos";
import type { CosmicScene } from "@/content/cosmos";

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 52 38"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 32V6L14 22L25 6V32M31 6V25C31 34 49 34 49 25V6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="miter"
      />
      <path d="M3 35H25" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`text-link ${className}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function SectionLabel({
  number,
  children,
  light = false,
}: {
  number?: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-label ${light ? "on-light" : ""}`}>
      <span className="signal-square" />
      {number && <span>{number} /</span>}
      {children}
    </div>
  );
}
export function PageIntro({
  index,
  eyebrow,
  title,
  children,
  cosmos = "work",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  cosmos?: CosmicScene;
}) {
  return (
    <header className="page-intro cosmic-host">
      <HeroCosmos scene={cosmos} />
      <div className="container cosmic-content">
        <SectionLabel number={index}>{eyebrow}</SectionLabel>
        <h1 tabIndex={-1}>{title}</h1>
        {children && (
          <div className="intro-bottom">
            <p>{children}</p>
            <span className="crosshair" aria-hidden="true">
              +
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`text-link ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
export function ArrowCircle({ size = 22 }: { size?: number }) {
  return (
    <span className="arrow-circle">
      <ArrowUpRight size={size} />
    </span>
  );
}
export function NextArrow() {
  return <ArrowRight size={20} />;
}
