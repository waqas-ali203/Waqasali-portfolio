import Link from "next/link";
import { site, skillGroups, experience } from "@/content/site";
import { publishedProjects } from "@/content/projects";
import { PrintButton } from "@/components/print-button";
import { HeroCosmos } from "@/components/hero-cosmos";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Resume",
  "An accessible web resume for Muhammad Usman with verified skills, project context, education, and contact links.",
  "/resume",
);
export default function ResumePage() {
  return (
    <article className="resume">
      <header className="resume-header cosmic-host">
        <HeroCosmos scene="resume" />
        <div>
          <span className="mono">Resume / {site.country}</span>
          <h1 tabIndex={-1}>{site.name}</h1>
          <h2>{site.title}</h2>
          <div className="resume-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <PrintButton />
          {site.resumePdf && (
            <a className="text-link" href={site.resumePdf} download>
              Download resume
            </a>
          )}
        </div>
      </header>
      <section className="resume-section">
        <h2>Profile</h2>
        <div>
          <p>{site.intro}</p>
          <p style={{ marginTop: 16 }}>
            Focus: {site.positioning}. Priorities include readable structure,
            responsive interfaces, reliable data handling, and clear handoff.
          </p>
        </div>
      </section>
      <section className="resume-section">
        <h2>Capabilities</h2>
        <div className="resume-skills">
          {skillGroups.map((g) => (
            <div key={g.name}>
              <h3>{g.name}</h3>
              <p>{g.tools.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>Experience</h2>
        <div>
          {experience.map((e) => (
            <article className="resume-project" key={e.company}>
              <span className="mono">{e.dates}</span>
              <h3>
                {e.role} · {e.company}
              </h3>
              <p>{e.responsibility}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>Project context</h2>
        <div>
          {publishedProjects.map((p) => (
            <article className="resume-project" key={p.slug}>
              <h3>
                <Link href={`/work/${p.slug}`}>{p.title} ↗</Link>
              </h3>
              <p>{p.shortDescription}</p>
              <span className="mono">{p.stack.join(" / ")}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>Education</h2>
        <div className="resume-education">
          <h3>{site.education.subject}</h3>
          <p>{site.education.institution}</p>
          <p>{site.education.dates}</p>
        </div>
      </section>
      {site.studio.enabled && (
        <section className="resume-section">
          <h2>Studio</h2>
          <div>
            <p>
              {site.studio.role}:{" "}
              <a
                href={site.studio.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.studio.name} ↗
              </a>
            </p>
            <p>
              {site.emailLabel}:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </section>
      )}
    </article>
  );
}
