"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
const items = [
  [
    "How does a collaboration start?",
    "Share the problem, your audience, and any existing material. We can clarify the scope, responsibilities, and a useful first release before committing to implementation.",
  ],
  [
    "Can you work from existing designs?",
    "Yes. Approved designs, wireframes, or an existing design system can become the starting point. We will check responsive behavior, missing states, and integration requirements together.",
  ],
  [
    "What about maintenance and handoff?",
    "Maintenance responsibilities are agreed as part of the scope. A handoff can include the codebase, setup instructions, and documentation of important flows and configuration.",
  ],
  [
    "How are scope and timelines decided?",
    "They depend on the product requirements, dependencies, and review process. Scope and milestones should be agreed after understanding the work, rather than promising a fixed deadline in advance.",
  ],
  [
    "How do we communicate during the build?",
    "We agree on a communication channel and review rhythm. Clear updates, reviewable increments, and documented decisions help keep the work understandable.",
  ],
];
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map(([q, a], i) => (
        <div className="faq-item" key={q}>
          <button
            aria-expanded={open === i}
            aria-controls={`faq-${i}`}
            id={`faq-button-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {q}
            {open === i ? <Minus size={18} /> : <Plus size={18} />}
          </button>
          <div
            className={`faq-answer ${open === i ? "open" : ""}`}
            id={`faq-${i}`}
            role="region"
            aria-labelledby={`faq-button-${i}`}
            inert={open !== i}
          >
            <div>
              <p>{a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
