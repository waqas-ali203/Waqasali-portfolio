import { Suspense } from "react";
import { PageIntro, ExternalLink } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contact",
  "Tell Muhammad Usman what you are building. Prepare an inquiry or reach out through the professional studio contact.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        cosmos="contact"
        index="05"
        eyebrow="A conversation, then a plan"
        title={
          <>
            Tell me what
            <br />
            <span>you’re building.</span>
          </>
        }
      >
        A product idea, an existing application, or a design ready to come to
        life. Let’s find the right next step.
      </PageIntro>
      <section className="container contact-layout">
        <div className="contact-info">
          <h2>
            Good work starts
            <br />
            with a clear brief.
          </h2>
          <p>
            Share the problem, the people it’s for, and what you want to
            achieve. We can explore scope and a useful way forward.
          </p>
          <a href={`mailto:${site.email}`} className="contact-email">
            {site.email} ↗
          </a>
          <p className="mono">
            {site.emailLabel} / {site.studio.name}
          </p>
          <div className="contact-socials">
            <ExternalLink href={site.github}>GitHub</ExternalLink>
            <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
          </div>
          <div className="contact-note">
            <p>
              Based in Pakistan, working across web, mobile, WordPress, and
              integrations. You can write directly or use the form to organize
              your inquiry.
            </p>
          </div>
        </div>
        <Suspense
          fallback={
            <div
              className="inquiry-form inquiry-loading"
              role="status"
              aria-busy="true"
            >
              <p>Preparing inquiry form…</p>
              <div className="skeleton small" style={{ marginTop: 32 }} />
              <div className="skeleton" />
              <div className="skeleton media" />
            </div>
          }
        >
          <InquiryForm />
        </Suspense>
      </section>
    </>
  );
}
