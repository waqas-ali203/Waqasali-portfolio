"use client";
import Link from "next/link";
import { HeroCosmos } from "@/components/hero-cosmos";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="route-error container cosmic-host">
      <HeroCosmos scene="lost" />
      <h1 tabIndex={-1}>A temporary interruption.</h1>
      <p>
        Something prevented this page from loading. Try again, or return to the
        homepage.
      </p>
      <div className="button-row">
        <button className="button button-primary" onClick={reset}>
          Retry
        </button>
        <Link className="button button-secondary" href="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
