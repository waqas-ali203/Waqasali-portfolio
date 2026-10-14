import { Portrait } from "@/components/portrait";
import {
  PageIntro,
  SectionLabel,
  ButtonLink,
  ExternalLink,
} from "@/components/ui";
import { site, skillGroups, experience } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About",
  "The person, approach, capabilities, and education behind the builds.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        cosmos="about"
        index="02"
        eyebrow="Engineer / Builder / Curious mind"
        title={
          <>
            The person
            <br />
            <span>behind the builds.</span>
          </>
        }
      >
        Thoughtful software begins with understanding people, their needs, and
        the details that matter.
      </PageIntro>
      <section className="container about-hero">
        <Portrait />
        <div>
          <SectionLabel>A little introduction</SectionLabel>
          <h2>
            Turning requirements
            <br />
            into something useful.
          </h2>
          <p>{site.intro}</p>
          <p>
            I approach a build by connecting the user experience to the
            application underneath it. Clear structure, responsive interfaces,
            and dependable data handling guide those decisions.
          </p>
          <p className="space-interest">{site.personalInterest}</p>
          <div className="button-row">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
            <ButtonLink href="/resume" secondary>
              View resume
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="warm-section principles">
        <div className="container">
          <SectionLabel light>Engineering priorities</SectionLabel>
          <h2>The details are the work.</h2>
          <div className="principles-grid">
            {[
              {
                name: "Readable structure",
                text: "Code organized so the next change has a clear place to go.",
              },
              {
                name: "Responsive interfaces",
                text: "Layouts and interactions designed for the screen in front of you.",
              },
              {
                name: "Reliable data handling",
                text: "Thoughtful validation, purposeful schemas, and explicit failure states.",
              },
              {
                name: "Clear handoff",
                text: "An understandable codebase and useful documentation for what follows.",
              },
            ].map((p, i) => (
              <article key={p.name}>
                <span className="mono">0{i + 1}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="skills-header">
          <div>
            <SectionLabel>Tools & capabilities</SectionLabel>
            <h2>
              Different tools.
              <br />
              Connected thinking.
            </h2>
          </div>
          <p>
            A practical toolkit across interfaces, application logic, mobile,
            and integrations.
          </p>
        </div>
        <div className="skill-groups">
          {skillGroups.map((g) => (
            <article className="skill-group" key={g.name}>
              <h3>{g.name}</h3>
              <p>{g.detail}</p>
              <div className="tags">
                {g.tools.map((t) => (
                  <span key={t} tabIndex={0} title={g.detail}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section container experience-section">
        <SectionLabel>Experience & mentorship</SectionLabel>
        <div className="section-heading">
          <h2>
            Build. Teach.
            <br />
            <span className="muted">Keep moving forward.</span>
          </h2>
          <p>
            Product engineering and mentoring developers have shaped how I think
            about clear, useful software.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((e, i) => (
            <article key={e.company}>
              <span className="mono">0{i + 1}</span>
              <div>
                <span className="mono experience-date">{e.dates}</span>
                <h3>{e.role}</h3>
                <span className="experience-company">{e.company}</span>
              </div>
              <p>{e.responsibility}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="education-section container">
        <div>
          <SectionLabel>Learning & collaboration</SectionLabel>
          <h2>
            Keep building.
            <br />
            Keep learning.
          </h2>
        </div>
        <div>
          <span className="mono">Education</span>
          <h3>{site.education.subject}</h3>
          <p>{site.education.institution}</p>
          <span className="mono">{site.education.dates}</span>
          {site.studio.enabled && (
            <div className="studio-block">
              <span className="section-label">{site.studio.role}</span>
              <ExternalLink href={site.studio.url}>
                {site.studio.name}
              </ExternalLink>
              <p>{site.studio.description}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
