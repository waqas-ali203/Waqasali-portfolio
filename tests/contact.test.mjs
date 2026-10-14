import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, draftUrl, inquiryText } from "../lib/contact.mjs";
const valid = {
  name: "Example Visitor",
  email: "visitor@example.com",
  service: "Web Application",
  budget: "Not decided yet",
  timeline: "Flexible",
  details: "An accessible web application for a small community.",
};
test("invalid required fields return clear independent errors", () => {
  const errors = validateInquiry({
    ...valid,
    name: " ",
    email: "broken",
    details: "short",
  });
  assert.deepEqual(Object.keys(errors), ["name", "email", "details"]);
});
test("length limits reject an excessive inquiry without losing the original values", () => {
  const v = { ...valid, details: "x".repeat(5001) };
  assert.ok(validateInquiry(v).details);
  assert.equal(v.details.length, 5001);
});
test("draft encodes punctuation and Unicode without introducing mail headers", () => {
  const values = {
    ...valid,
    name: "Usman & team",
    details: "A product with symbols & # ? and Unicode: خلا.",
  };
  const url = draftUrl("build@relnov.com", values);
  const parsed = new URL(url);
  assert.equal(parsed.protocol, "mailto:");
  assert.equal(parsed.searchParams.get("body"), inquiryText(values));
  assert.equal(
    parsed.searchParams.get("subject"),
    "Web Application inquiry from Usman & team",
  );
  assert.deepEqual(validateInquiry(values), {});
});
