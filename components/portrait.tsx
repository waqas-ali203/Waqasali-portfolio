import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
export function Portrait({ linked = false }: { linked?: boolean }) {
  const inside = (
    <>
      <div className="portrait-halo" aria-hidden="true" />
      <div className="portrait-cross cross-one" aria-hidden="true">
        +
      </div>
      <div className="portrait-cross cross-two" aria-hidden="true">
        +
      </div>
      <span className="portrait-watermark" aria-hidden="true">
        MU
      </span>
      <div className="portrait-photo">
        <Image
          src={site.portrait.src}
          alt={site.portrait.alt}
          width={site.portrait.width}
          height={site.portrait.height}
          sizes="(max-width:550px) 176px, 200px"
        />
        <span className="portrait-photo-edge" />
      </div>
      <div className="portrait-label">
        <span className="signal-dot" />
        <span className="mono">{site.name}</span>
        <span className="mono">Engineer / Founder</span>
      </div>
      <span className="portrait-footer mono">From curiosity to creation.</span>
    </>
  );
  return linked ? (
    <Link
      href="/about"
      aria-label={`About ${site.name}`}
      className="portrait-visual portrait-link"
      data-parallax
    >
      {inside}
    </Link>
  ) : (
    <div className="portrait-visual" data-parallax>
      {inside}
    </div>
  );
}
