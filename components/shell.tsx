"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Command,
  Menu,
  Search,
  X,
  Copy,
  CornerDownLeft,
} from "lucide-react";
import { routes, site } from "@/content/site";
import { publishedProjects } from "@/content/projects";
import { Monogram, ExternalLink } from "./ui";
import { usePreferences, VisualPreferences, ThemeToggle } from "./preferences";

function useDialog(
  open: boolean,
  ref: React.RefObject<HTMLDialogElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    const previous = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [open, ref]);
  return {
    onCancel: (event: React.SyntheticEvent) => {
      event.preventDefault();
      onClose();
    },
    onClick: (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === ref.current) onClose();
    },
  };
}
export function Navigation() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mac, setMac] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuProps = useDialog(menu, menuRef, () => setMenu(false));
  const previousPath = useRef(path);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    setMenu(false);
    setPalette(false);
    if (previousPath.current !== path) {
      document.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
      previousPath.current = path;
    }
  }, [path]);
  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(tag) ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner container">
          <Link href="/" aria-label="Muhammad Usman home" className="brand">
            <Monogram />
            <span className="brand-dot" />
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {routes.slice(0, 4).map((r) => (
              <Link
                key={r.href}
                href={r.href}
                aria-current={path.startsWith(r.href) ? "page" : undefined}
              >
                {r.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <button
              className="command-trigger"
              onClick={() => setPalette(true)}
              aria-label={`Open command palette (${mac ? "⌘" : "Ctrl"} K)`}
            >
              <Command size={15} />
              <span>{mac ? "⌘" : "Ctrl"} K</span>
            </button>
            <Link className="nav-contact" href="/contact">
              Let’s talk <ArrowUpRight size={16} />
            </Link>
            <button
              className="menu-trigger"
              onClick={() => setMenu(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={menuRef}
        className="mobile-menu"
        aria-labelledby="menu-title"
        {...menuProps}
      >
        <div className="menu-top">
          <Link href="/" onClick={() => setMenu(false)} className="brand">
            <Monogram />
            <span className="sr-only">Home</span>
          </Link>
          <span id="menu-title" className="mono">
            Navigation
          </span>
          <button
            className="icon-button"
            onClick={() => setMenu(false)}
            aria-label="Close navigation menu"
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {routes.map((r, i) => (
            <Link
              style={{ animationDelay: `${i * 40}ms` }}
              key={r.href}
              href={r.href}
              onClick={() => setMenu(false)}
              aria-current={path.startsWith(r.href) ? "page" : undefined}
            >
              <span className="mono">0{i + 1}</span>
              <div>
                <strong>{r.label}</strong>
                <small>{r.description}</small>
              </div>
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <div className="menu-socials">
          <ExternalLink href={site.github}>GitHub</ExternalLink>
          <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
        </div>
      </dialog>
      <CommandPalette open={palette} close={() => setPalette(false)} />
    </>
  );
}
function CommandPalette({ open, close }: { open: boolean; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const props = useDialog(open, ref, close);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");
  const all = [
    { label: "Home", detail: "The orbital studio", href: "/" },
    ...routes.map((r) => ({
      label: r.label,
      detail: r.description,
      href: r.href,
    })),
    ...publishedProjects.map((p) => ({
      label: p.title,
      detail: "Project profile",
      href: `/work/${p.slug}`,
    })),
    { label: "Copy Contact Email", detail: site.email, href: "copy" },
  ];
  const results = all.filter((r) =>
    `${r.label} ${r.detail}`.toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    if (open)
      document
        .getElementById(`command-result-${selected}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [selected, query, open]);
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setMessage("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setMessage("Email copied to clipboard.");
    } catch {
      setMessage(`Clipboard unavailable. Select and copy: ${site.email}`);
    }
  };
  const activate = (index: number) => {
    const item = results[index];
    if (!item) return;
    if (item.href === "copy") {
      void copy();
    } else {
      ref.current
        ?.querySelector<HTMLAnchorElement>(`[data-result="${index}"]`)
        ?.click();
    }
  };
  return (
    <dialog
      ref={ref}
      className="command-dialog"
      aria-labelledby="command-title"
      {...props}
    >
      <div className="command-box">
        <div className="command-heading">
          <span id="command-title" className="mono">
            Studio navigation
          </span>
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close command palette"
          >
            <X size={19} />
          </button>
        </div>
        <div className="command-input">
          <Search size={22} />
          <input
            ref={inputRef}
            placeholder="Where would you like to go?"
            aria-label="Search routes and projects"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-results"
            aria-activedescendant={
              results.length ? `command-result-${selected}` : undefined
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
              setMessage("");
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((s) => (s + 1) % Math.max(results.length, 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected(
                  (s) => (s - 1 + results.length) % Math.max(results.length, 1),
                );
              }
              if (e.key === "Enter") {
                e.preventDefault();
                activate(selected);
              }
            }}
          />
        </div>
        <ul id="command-results" role="listbox" aria-label="Navigation results">
          {results.map((r, i) => (
            <li
              role="option"
              aria-selected={i === selected}
              id={`command-result-${i}`}
              key={r.label}
              onMouseMove={() => setSelected(i)}
            >
              {r.href === "copy" ? (
                <button onClick={() => void copy()}>
                  <Copy size={17} />
                  <span>
                    {r.label}
                    <small>{r.detail}</small>
                  </span>
                  <CornerDownLeft size={15} />
                </button>
              ) : (
                <Link data-result={i} href={r.href} onClick={close}>
                  <ArrowUpRight size={17} />
                  <span>
                    {r.label}
                    <small>{r.detail}</small>
                  </span>
                  <CornerDownLeft size={15} />
                </Link>
              )}
            </li>
          ))}
        </ul>
        {!results.length && (
          <div className="empty-command">
            No results for “{query}”. Try a page or project name.
          </div>
        )}
        <p className="command-status" role="status">
          {message ||
            `${results.length} results · ↑ ↓ to move · Enter to open · Esc to close`}
        </p>
      </div>
    </dialog>
  );
}
export function Footer() {
  const [time, setTime] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const { reduced } = usePreferences();
  useEffect(() => {
    const update = () => {
      setYear(new Date().getFullYear());
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: site.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-invitation">
          <SectionCaption />
          <Link href="/contact">
            Have something
            <br />
            worth building?
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-mid">
          <a href={`mailto:${site.email}`} className="footer-email">
            {site.email}
            <ArrowUpRight size={19} />
          </a>
          <div className="footer-links">
            <ExternalLink href={site.github}>GitHub</ExternalLink>
            <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
            <Link href="/resume">Resume</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <Link href="/" aria-label="Muhammad Usman home">
            <Monogram className="footer-mark" />
          </Link>
          <span>© {year} Muhammad Usman</span>
          <span className="footer-time">
            <span className="signal-dot" />
            Pakistan {time || "PKT"}
          </span>
          <button
            className="back-top"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: reduced ? "instant" : "smooth",
              });
              document.getElementById("main")?.focus({ preventScroll: true });
            }}
          >
            Back to top <ArrowUp size={16} />
          </button>
        </div>
        <VisualPreferences />
      </div>
    </footer>
  );
}
function SectionCaption() {
  return <p className="mono">A good conversation is where it starts.</p>;
}
