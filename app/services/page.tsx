import { PageIntro, SectionLabel, TextLink } from "@/components/ui";
import { services } from "@/content/site";
import { Process } from "@/components/home";
import { FAQ } from "@/components/faq";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Services",
  "Web, mobile, WordPress, and AI integration capabilities with a clear collaboration process.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        cosmos="services"
        index="03"
        eyebrow="Capabilities & collaboration"
        title={
          <>
            From product idea
            <br />
            <span>to working software.</span>
          </>
        }
      >
        A considered approach to building interfaces, systems, and the
        connections between them.
      </PageIntro>
      <div className="container">
        {services.map((s, i) => (
          <section className="service-detail" id={s.id} key={s.id}>
            <span className="mono">0{i + 1}</span>
            <div>
              <h2>{s.name}</h2>
              <p className="service-tagline">{s.tagline}</p>
              <TextLink href={`/contact?service=${s.id}`}>
                Discuss a {s.type.toLowerCase()} project
              </TextLink>
            </div>
            <div>
              <p>{s.description}</p>
              <ul>
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="tags">
                {s.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <p>{s.scope}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="warm-section agency-section">
        <div className="container agency-inner">
          <div>
            <SectionLabel light>For agencies & product teams</SectionLabel>
            <h2>
              Your design thinking.
              <br />A working implementation.
            </h2>
          </div>
          <div>
            <p>
              Turn approved designs into implemented web or mobile experiences.
              I can work through technical details, communicate progress, and
              deliver maintainable code within an agreed scope.
            </p>
            <TextLink href="/contact?service=other">
              Talk about a collaboration
            </TextLink>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <SectionLabel>The way we build</SectionLabel>
            <h2>
              Clear steps.
              <br />
              Thoughtful decisions.
            </h2>
          </div>
        </div>
        <Process expanded />
      </section>
      <section className="section container faq-section">
        <div>
          <SectionLabel>A few useful answers</SectionLabel>
          <h2>
            Before we
            <br />
            get started.
          </h2>
        </div>
        <FAQ />
      </section>
    </>
  );
}
