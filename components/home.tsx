import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { site, services, processSteps } from "@/content/site";
import { featuredProjects, publishedProjects } from "@/content/projects";
import { Orbital } from "./scene/orbital";
import { ArchitectureExplorer } from "./architecture";
import { ProjectCard } from "./project-card";
import { ButtonLink, TextLink, SectionLabel } from "./ui";
import { Portrait } from "./portrait";
import { HeroCosmos } from "./hero-cosmos";
export function Process({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className={`process-grid ${expanded ? "expanded" : ""}`}>
      {processSteps.map((s, i) => (
        <article key={s.name}>
          <span className="process-index mono">
            0{i + 1}
            <span />
          </span>
          <h3>{s.name}</h3>
          <p>{expanded ? s.detail : s.description}</p>
          <span className="process-deliverable mono">{s.deliverable}</span>
        </article>
      ))}
    </div>
  );
}
export function LabTeaser() {
  return (
    <div className="lab-preview-grid">
      {[
        {
          id: "orbital",
          name: "Orbital Systems",
          hint: "Explore form in motion.",
          class: "mini-orbit",
        },
        {
          id: "architecture",
          name: "Architecture Explorer",
          hint: "Follow a request through the stack.",
          class: "mini-architecture",
        },
        {
          id: "interface",
          name: "Interface Playground",
          hint: "Tune the feel of an interface.",
          class: "mini-interface",
        },
      ].map((x, i) => (
        <Link href={`/lab#${x.id}`} className="lab-preview" key={x.id}>
          <div className={`lab-preview-visual ${x.class}`} aria-hidden="true">
            {i === 0 ? (
              <>
                <i />
                <i />
                <i />
                <b />
              </>
            ) : i === 1 ? (
              <>
                <span>UI</span>
                <em>→</em>
                <span>API</span>
                <em>→</em>
                <span>DB</span>
              </>
            ) : (
              <>
                <div>
                  <i />
                  <i />
                  <i />
                </div>
                <span />
                <span />
                <b className="preview-decorative-button">Continue ↗</b>
              </>
            )}
          </div>
          <div className="lab-preview-title">
            <span className="mono">EXP / 0{i + 1}</span>
            <ArrowUpRight size={20} />
            <h3>{x.name}</h3>
            <p>{x.hint}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function Home() {
  return (
    <>
      <section className="home-hero cosmic-host">
        <HeroCosmos scene="home" />
        <div className="hero container">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="signal-square" />
              <span>
                {site.name.toUpperCase()} / {site.title.toUpperCase()}
              </span>
            </div>
            <h1 tabIndex={-1}>
              <span>I engineer</span>
              <span>
                what’s <em>next.</em>
              </span>
            </h1>
            <p className="hero-summary">
              Full stack web applications, mobile experiences, and AI
              integrations built with care from interface to infrastructure.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/work">Explore my work</ButtonLink>
              <ButtonLink href="/contact" secondary>
                Let’s build something
              </ButtonLink>
            </div>
            <div className="hero-capabilities mono">
              <span>Web</span>
              <i>/</i>
              <span>Mobile</span>
              <i>/</i>
              <span>AI integrations</span>
            </div>
          </div>
          <div className="hero-art" data-parallax>
            <Starfield />
            <Orbital />
          </div>
          <div className="hero-bottom">
            <a href="#selected-work" className="scroll-cue">
              <ArrowDown size={15} /> Scroll to explore
            </a>
            <span className="mono">
              Independent thinking. Connected systems.
            </span>
            <span className="hero-coordinate mono" aria-hidden="true">
              PK / PLANET EARTH
            </span>
          </div>
        </div>
      </section>
      <div className="capability-ribbon">
        <div className="container">
          {[
            "Full Stack Development",
            "React Native",
            "WordPress Engineering",
            "AI Integrations",
          ].map((s, i) => (
            <span key={s}>
              {s}
              <span aria-hidden="true">{i < 3 ? "✳" : "↗"}</span>
            </span>
          ))}
        </div>
      </div>
      <section className="section container selected-work" id="selected-work">
        <div className="section-heading">
          <div>
            <SectionLabel number="01">Selected work</SectionLabel>
            <h2>
              Built with purpose.
              <br />
              <span className="muted">Engineered with care.</span>
            </h2>
          </div>
          <TextLink href="/work">
            All projects{" "}
            <span className="count">0{publishedProjects.length}</span>
          </TextLink>
        </div>
        <div className="featured-work-grid">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="engineering-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <SectionLabel number="02">Behind the interface</SectionLabel>
              <h2>
                Good software runs
                <br />
                deeper than the surface.
              </h2>
            </div>
            <p>
              From what people see to what makes it work. Explore the layers I
              bring together.
            </p>
          </div>
          <ArchitectureExplorer />
        </div>
      </section>
      <section className="section container services-preview">
        <div className="section-heading">
          <div>
            <SectionLabel number="03">Capabilities</SectionLabel>
            <h2>
              The right build.
              <br />
              <span className="muted">For your next move.</span>
            </h2>
          </div>
          <TextLink href="/services">Explore services</TextLink>
        </div>
        <div className="service-rows">
          {services.map((s, i) => (
            <Link key={s.id} href={`/services#${s.id}`} className="service-row">
              <span className="mono">0{i + 1}</span>
              <h3>{s.name}</h3>
              <div>
                <p>{s.tagline}</p>
                <span>{s.tools.slice(0, 3).join(" / ")}</span>
              </div>
              <ArrowUpRight size={25} />
            </Link>
          ))}
        </div>
      </section>
      <section className="process-section section container">
        <SectionLabel number="04">From idea to implementation</SectionLabel>
        <div className="section-heading">
          <h2>Thoughtful at every step.</h2>
          <p>A clear process makes room for better decisions.</p>
        </div>
        <Process />
      </section>
      <section className="about-teaser warm-section">
        <div className="container about-teaser-inner">
          <Portrait linked />
          <div>
            <SectionLabel number="05" light>
              The person behind the builds
            </SectionLabel>
            <h2>
              Curiosity in the mind.
              <br />
              Care in the craft.
            </h2>
            <p>{site.intro}</p>
            <p className="space-interest">{site.personalInterest}</p>
            <div className="button-row">
              <ButtonLink href="/about">A little about me</ButtonLink>
              <ButtonLink href="/resume" secondary>
                View resume
              </ButtonLink>
            </div>
            <span className="studio-note">
              Founder & CEO at{" "}
              <a
                href={site.studio.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Relnov ↗
              </a>
            </span>
          </div>
        </div>
      </section>
      <section className="section container lab-teaser">
        <div className="section-heading">
          <div>
            <SectionLabel number="06">The experimental corner</SectionLabel>
            <h2>A little space to play.</h2>
          </div>
          <TextLink href="/lab">Enter the lab</TextLink>
        </div>
        <LabTeaser />
      </section>
      <section className="closing-contact container">
        <div className="mono">
          <span className="signal-square" /> Your next chapter starts here
        </div>
        <h2>
          Let’s build
          <br />
          your next <span>chapter.</span>
          <MoveUpRight aria-hidden="true" />
        </h2>
        <div className="closing-actions">
          <ButtonLink href="/contact">Start a conversation</ButtonLink>
          <a href={`mailto:${site.email}`} className="text-link">
            {site.email}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

function Starfield() {
  return (
    <svg className="starfield" viewBox="0 0 700 700" aria-hidden="true">
      <g fill="#dce2da">
        {Array.from({ length: 48 }, (_, i) => (
          <circle
            key={i}
            cx={((i * 137.5) % 680) + 10}
            cy={((i * i * 17.3) % 660) + 20}
            r={i % 9 === 0 ? 1.4 : 0.65}
            opacity={0.15 + (i % 5) * 0.09}
          />
        ))}
      </g>
      <g fill="none" stroke="#b8cca0" strokeWidth=".5" opacity=".15">
        <circle cx="350" cy="350" r="322" strokeDasharray="2 15" />
        <path d="M76 80L131 141L210 121M527 79L560 129L625 148" />
      </g>
      <g stroke="#c5ff67" strokeWidth="1" opacity=".6">
        <path d="M522 78h10m-5 -5v10" />
        <path d="M619 147h12m-6 -6v12" />
      </g>
    </svg>
  );
}
