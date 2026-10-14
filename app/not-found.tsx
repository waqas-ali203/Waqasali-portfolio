import { ButtonLink } from "@/components/ui";
import { HeroCosmos } from "@/components/hero-cosmos";
export const metadata = {
  title: "Signal not found",
  robots: { index: false, follow: true },
};
export default function NotFound() {
  return (
    <section className="not-found cosmic-host">
      <HeroCosmos scene="lost" />
      <div className="container cosmic-content">
        <div className="fractured-orbit" aria-hidden="true" />
        <span className="mono">404 / Out of orbit</span>
        <h1 tabIndex={-1}>Signal not found.</h1>
        <p>
          This page is outside the mapped system. Let’s get you back to a useful
          place.
        </p>
        <div className="button-row">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/work" secondary>
            Explore work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
