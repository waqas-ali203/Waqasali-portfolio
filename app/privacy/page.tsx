import { PageIntro } from "@/components/ui";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Privacy",
  "Plain-language privacy details matching this portfolio’s local preferences and email-draft contact flow.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        cosmos="privacy"
        index="07"
        eyebrow="Privacy & local preferences"
        title={
          <>
            A clear view
            <br />
            <span>of your data.</span>
          </>
        }
      >
        This portfolio keeps its behavior straightforward. Here is what happens
        when you browse, change preferences, or prepare an inquiry.
      </PageIntro>
      <article className="container privacy-content">
        <section>
          <h2>Browsing this portfolio</h2>
          <p>
            This portfolio does not include analytics, advertising trackers, or
            an account system. The site does not collect inquiry data through a
            server endpoint.
          </p>
          <p>
            The hosting provider may process basic request information, such as
            an IP address and requested page, to deliver the website. This
            application does not expose or use that information for visitor
            profiling.
          </p>
        </section>
        <section>
          <h2>Contact and inquiry details</h2>
          <p>
            The contact form keeps the fields in the current page’s memory.
            Preparing a draft creates an email link with the details you
            entered. Your email application handles the draft, and you decide
            whether to send it. The website does not confirm delivery or save
            the inquiry.
          </p>
          <p>
            Copy inquiry writes your details to your clipboard only when you
            press that control. If clipboard access is denied, the site shows
            text you can select and copy manually.
          </p>
          <p>
            If you send an email to the professional studio contact, that email
            is processed by the sender’s and recipient’s email services as
            ordinary correspondence. Avoid including sensitive personal
            information in an initial inquiry.
          </p>
        </section>
        <section>
          <h2>Preferences on your device</h2>
          <p>
            Local storage saves your project Grid/List view, Reduce motion
            choice, Simplified visuals choice, and Dark/Light/System theme
            choice. These values stay in your browser and are not sent to a
            portfolio server. You can change them with the site’s controls or
            clear them in your browser’s site-data settings.
          </p>
          <p>
            The site also reads the browser’s reduced-motion preference. It
            takes priority over decorative motion.
          </p>
        </section>
        <section>
          <h2>External links</h2>
          <p>
            GitHub, LinkedIn, Relnov, and your email application are separate
            services. Their own privacy practices apply when you open them.
          </p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>
            For questions about this portfolio, contact the professional studio
            address: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
      </article>
    </>
  );
}
