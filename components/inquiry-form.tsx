"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Copy, Mail, Check } from "lucide-react";
import { site, services } from "@/content/site";
import { draftUrl, inquiryText, validateInquiry } from "@/lib/contact.mjs";
type Values = {
  name: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
};
export function InquiryForm() {
  const search = useSearchParams();
  const requested =
    services.find((s) => s.id === search.get("service"))?.type || "Other";
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    service: requested,
    budget: "Not decided yet",
    timeline: "Flexible",
    details: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "draft" | "copied" | "failed">(
    "idle",
  );
  const [fallback, setFallback] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    setValues((v) => ({ ...v, service: requested }));
  }, [requested]);
  const update = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    setState("idle");
    setFallback(false);
  };
  const validate = () => {
    const next = validateInquiry(values);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setState("idle");
      return false;
    }
    return true;
  };
  const copy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(inquiryText(values));
      setState("copied");
      setFallback(false);
    } catch {
      setState("failed");
      setFallback(true);
      requestAnimationFrame(() => {
        const area = document.getElementById(
          "copy-inquiry-fallback",
        ) as HTMLTextAreaElement;
        area?.focus();
        area?.select();
      });
    }
  };
  return (
    <form
      ref={form}
      className="inquiry-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) setState("draft");
      }}
    >
      <div className="form-grid">
        <Field label="Name" name="name" required errors={errors}>
          <input
            name="name"
            id="name"
            autoComplete="name"
            required
            maxLength={80}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" name="email" required errors={errors}>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            maxLength={254}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Project type" name="service" errors={errors}>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
          >
            {[...services.map((s) => s.type), "Other"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget range" name="budget" errors={errors} optional>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            {site.budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" name="timeline" errors={errors} optional full>
          <select
            id="timeline"
            name="timeline"
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
          >
            {site.timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field
          label="What are you building?"
          name="details"
          required
          errors={errors}
          full
        >
          <textarea
            id="details"
            name="details"
            required
            maxLength={5000}
            minLength={20}
            value={values.details}
            onChange={(e) => update("details", e.target.value)}
            aria-invalid={!!errors.details}
            aria-describedby={`details-hint${errors.details ? " details-error" : ""}`}
            placeholder="The problem you want to solve, who it’s for, and what you have in mind…"
          />
          <p className="field-hint" id="details-hint">
            A goal, an audience, and any existing designs are a helpful start.{" "}
            {values.details.length}/5,000
          </p>
        </Field>
      </div>
      <div className="form-actions">
        <button type="submit" className="button button-primary">
          Prepare email draft <ArrowUpRight size={17} />
        </button>
        <button
          type="button"
          onClick={() => void copy()}
          className="button button-secondary"
        >
          {state === "copied" ? "Copied" : "Copy inquiry"}
          {state === "copied" ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
      <p className="form-disclosure">
        This form prepares a draft in your email application. You review and
        send it yourself. No inquiry is submitted or stored on this website.{" "}
        <a href="/privacy">Privacy details.</a>
      </p>
      {state === "draft" && (
        <div className="form-status" role="status">
          <p>
            Your draft is ready. Open it in your email application, then review
            and send it.
          </p>
          <a
            className="text-link"
            style={{ marginTop: 12 }}
            href={draftUrl(site.email, values)}
          >
            <Mail size={16} /> Open email draft <ArrowUpRight size={15} />
          </a>
          <p style={{ fontSize: 11, marginTop: 10 }}>
            No email app configured? Use Copy inquiry and send it to{" "}
            {site.email}.
          </p>
        </div>
      )}
      {state === "copied" && (
        <p className="form-status" role="status">
          Inquiry copied. Paste it into an email to {site.email}, then send it
          from your email application.
        </p>
      )}
      {state === "failed" && (
        <p className="form-status error" role="status">
          Clipboard access is unavailable. The inquiry is selected below so you
          can copy it manually, or prepare an email draft.
        </p>
      )}
      {fallback && (
        <textarea
          id="copy-inquiry-fallback"
          className="copy-fallback"
          aria-label="Inquiry text for manual copying"
          readOnly
          value={inquiryText(values)}
        />
      )}
    </form>
  );
}
function Field({
  label,
  name,
  required,
  optional,
  full,
  errors,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  optional?: boolean;
  full?: boolean;
  errors: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <div className={`form-field ${full ? "full" : ""}`}>
      <label htmlFor={name}>
        {label}
        {required && <span>Required</span>}
        {optional && <span>Optional</span>}
      </label>
      {children}
      {errors[name] && (
        <p className="field-error" id={`${name}-error`} role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  );
}
