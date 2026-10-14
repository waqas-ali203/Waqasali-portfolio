import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { publishedProjects, projectBySlug } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { Gallery } from "@/components/gallery";
import { CaseTOC } from "@/components/case-toc";
import { ButtonLink, ExternalLink } from "@/components/ui";
import { HeroCosmos } from "@/components/hero-cosmos";
export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  return p
    ? pageMetadata(p.title, p.shortDescription, `/work/${slug}`)
    : { title: "Project not found" };
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const index = publishedProjects.findIndex((x) => x.slug === slug);
  const next = publishedProjects[(index + 1) % publishedProjects.length];
  return (
    <div className="container">
      <header className="case-hero">
        <div className="case-heading cosmic-host">
          <HeroCosmos scene="case" sector={index + 1} />
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/work">Work</Link>
            <span>/</span>
            <span aria-current="page">{p.title}</span>
          </nav>
          <h1 tabIndex={-1}>{p.title}</h1>
          <div className="case-hero-summary">
            <p>{p.shortDescription}</p>
            <span className="mono">
              {p.category} / {p.role}
            </span>
          </div>
        </div>
        <Image
          className="case-cover"
          src={p.cover}
          alt={p.coverAlt}
          width={p.coverWidth}
          height={p.coverHeight}
          priority
          sizes="100vw"
        />
        <p className="case-caption">
          {p.coverAlt}. {p.coverType}.
        </p>
        <div className="case-overview">
          <div>
            <span className="mono">Project scope</span>
            <p>{p.scope}</p>
          </div>
          <div>
            <span className="mono">Development context</span>
            <p>{p.role}</p>
            <p className="case-credit">{p.credit}</p>
          </div>
          <div>
            <span className="mono">Technical foundation</span>
            <div className="tags">
              {p.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {p.liveUrl && (
              <ExternalLink href={p.liveUrl}>
                {p.category === "Mobile"
                  ? "View on Google Play"
                  : "Visit live site"}
              </ExternalLink>
            )}
            {p.repoUrl && (
              <ExternalLink href={p.repoUrl}>Repository</ExternalLink>
            )}
          </div>
        </div>
      </header>
      <div className="case-body">
        <CaseTOC />
        <div className="case-content">
          <section id="challenge">
            <span className="section-label">01 / The challenge</span>
            <h2>Purpose before pixels.</h2>
            <p>{p.challenge}</p>
          </section>
          <section id="contribution">
            <span className="section-label">02 / Development context</span>
            <h2>A foundation for the experience.</h2>
            <p>{p.contribution}</p>
          </section>
          <section id="decisions">
            <span className="section-label">03 / Engineering decisions</span>
            <h2>Choices with a reason.</h2>
            {p.decisions.map((d, i) => (
              <article className="decision" key={d.title}>
                <span className="mono">0{i + 1}</span>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.reason}</p>
                </div>
              </article>
            ))}
          </section>
          <section id="walkthrough">
            <span className="section-label">04 / Visual walkthrough</span>
            <h2>The project, in perspective.</h2>
            <Gallery title={p.title} images={p.screenshots} />
          </section>
          <section id="outcomes">
            <span className="section-label">05 / Documented outcomes</span>
            <h2>What the context tells us.</h2>
            <ul className="outcome-list">
              {p.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
          <div className="case-invitation">
            <h3>Have a related project in mind?</h3>
            <ButtonLink
              href={`/contact?service=${p.category === "Mobile" ? "mobile" : p.category === "WordPress" ? "wordpress" : "web"}`}
            >
              Let’s discuss it
            </ButtonLink>
          </div>
        </div>
      </div>
      <nav className="case-navigation" aria-label="Project navigation">
        <div>
          <p className="mono">
            Next project / 0{((index + 1) % publishedProjects.length) + 1}
          </p>
          <h3>
            <Link href={`/work/${next.slug}`}>
              {next.title} <ArrowUpRight size={27} />
            </Link>
          </h3>
        </div>
        <Link href="/work" className="text-link">
          Back to all work <ArrowUpRight size={17} />
        </Link>
      </nav>
    </div>
  );
}
