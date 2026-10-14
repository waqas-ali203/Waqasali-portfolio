import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { ArrowCircle } from "./ui";
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className={`project-card project-${index}`}>
      <Link
        href={`/work/${project.slug}`}
        className="project-media"
        aria-label={`View ${project.title} case study. 0${index + 1} / ${project.category}.`}
      >
        <Image
          src={project.cover}
          alt={project.coverAlt}
          width={project.coverWidth}
          height={project.coverHeight}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 60vw"
        />
        <span className="project-media-top">
          <span className="mono">
            0{index + 1} / {project.category}
          </span>
          <span className="project-cover-label">
            {project.category === "Mobile" ? "App store" : "Live website"}
          </span>
        </span>
        <ArrowCircle />
      </Link>
      <div className="project-info">
        <div>
          <span className="mono project-role">{project.role}</span>
          <h3>
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
          <p>{project.shortDescription}</p>
        </div>
        <Link className="text-link case-link" href={`/work/${project.slug}`}>
          View case study <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="tags">
        {project.stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </article>
  );
}
