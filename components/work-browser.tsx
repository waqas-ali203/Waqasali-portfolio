"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Grid2X2, List, ArrowUpRight } from "lucide-react";
import { publishedProjects } from "@/content/projects";
import { ProjectCard } from "./project-card";
const categories = [
  { id: "all", label: "All", category: "" },
  { id: "web", label: "Web Applications", category: "Web Applications" },
  { id: "mobile", label: "Mobile", category: "Mobile" },
  { id: "wordpress", label: "WordPress", category: "WordPress" },
  { id: "ai", label: "AI Integrations", category: "AI Integrations" },
];
export function WorkBrowser() {
  const router = useRouter();
  const search = useSearchParams();
  const raw = search.get("category") || "all";
  const category = categories.find((c) => c.id === raw) || categories[0];
  const [view, setView] = useState<"grid" | "list">("grid");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mu-work-view");
      if (stored === "list") setView(stored);
    } catch {}
  }, []);
  useEffect(() => {
    if (!categories.some((c) => c.id === raw)) {
      const q = new URLSearchParams(search.toString());
      q.delete("category");
      router.replace(`/work${q.size ? "?" + q : ""}`, { scroll: false });
    }
  }, [raw, router, search]);
  const projects = publishedProjects.filter(
    (p) => !category.category || p.category === category.category,
  );
  const change = (id: string) => {
    const q = new URLSearchParams(search.toString());
    if (id === "all") q.delete("category");
    else q.set("category", id);
    router.push(`/work${q.size ? "?" + q : ""}`, { scroll: false });
  };
  const changeView = (v: "grid" | "list") => {
    setView(v);
    try {
      localStorage.setItem("mu-work-view", v);
    } catch {}
  };
  return (
    <section className="section container">
      <div className="work-controls">
        <div className="filters" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              className="filter"
              key={c.id}
              aria-pressed={category.id === c.id}
              onClick={() => change(c.id)}
            >
              {category.id === c.id && <span aria-hidden="true">✓ </span>}
              {c.label}
              <span>
                {
                  publishedProjects.filter(
                    (p) => !c.category || p.category === c.category,
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <div className="view-toggle" aria-label="Project view">
          <button
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => changeView("grid")}
          >
            <Grid2X2 size={17} />
          </button>
          <button
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => changeView("list")}
          >
            <List size={19} />
          </button>
        </div>
      </div>
      <div className="results-meta">
        <span role="status" className="mono">
          {projects.length} {projects.length === 1 ? "project" : "projects"} /{" "}
          {category.label}
        </span>
        <span className="mono">Purpose, process, and implementation</span>
      </div>
      {!projects.length ? (
        <div className="work-empty">
          <h2>No published projects here yet.</h2>
          <p>
            This capability is available as a service. Project profiles appear
            when their details are verified.
          </p>
          <button
            className="button button-primary"
            onClick={() => change("all")}
          >
            Reset filters <ArrowUpRight size={17} />
          </button>
        </div>
      ) : view === "grid" ? (
        <div className="work-grid">
          {projects.map((p, i) => (
            <ProjectCard project={p} index={i} key={p.slug} />
          ))}
        </div>
      ) : (
        <div className="work-list">
          {projects.map((p, i) => (
            <article key={p.slug}>
              <span className="mono">0{i + 1}</span>
              <div>
                <h3>
                  <Link href={`/work/${p.slug}`}>{p.title}</Link>
                </h3>
                <span className="mono">{p.category}</span>
              </div>
              <p>{p.shortDescription}</p>
              <Link className="text-link" href={`/work/${p.slug}`}>
                View case study <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      )}
      <p className="work-note">
        Real projects from my personal work and Relnov. Screenshots show the
        published websites and app listings. Looking for a different kind of
        build? <Link href="/services">Explore capabilities.</Link>
      </p>
    </section>
  );
}
