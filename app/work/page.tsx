import { Suspense } from "react";
import { PageIntro } from "@/components/ui";
import { WorkBrowser } from "@/components/work-browser";
import { publishedProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Work",
  "Selected project profiles, implementation choices, and development context.",
  "/work",
);
export default function WorkPage() {
  return (
    <>
      <PageIntro
        cosmos="work"
        index="01"
        eyebrow={`${publishedProjects.length.toString().padStart(2, "0")} published projects`}
        title={
          <>
            Selected work,
            <br />
            <span>real engineering.</span>
          </>
        }
      >
        A closer look at the requirements, technical foundations, and thinking
        behind the builds.
      </PageIntro>
      <Suspense
        fallback={
          <section className="section container">
            <p role="status" style={{ minHeight: 140 }}>
              Loading project filters…
            </p>
            <div className="work-grid">
              {publishedProjects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </section>
        }
      >
        <WorkBrowser />
      </Suspense>
    </>
  );
}
