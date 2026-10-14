/** @param {{name:string,email:string,service:string,budget:string,timeline:string,details:string}} values */
export function validateInquiry(values) {
  /** @type {Record<string,string>} */
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 80)
    errors.name = "Please keep your name under 80 characters.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ||
    values.email.length > 254
  )
    errors.email = "Enter a valid email address.";
  if (values.details.trim().length < 20)
    errors.details =
      "Add at least 20 characters so I can understand your project.";
  else if (values.details.length > 5000)
    errors.details = "Keep project details under 5,000 characters.";
  return errors;
}
/** @param {{name:string,email:string,service:string,budget:string,timeline:string,details:string}} values */
export function inquiryText(values) {
  return `Project inquiry\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nProject type: ${values.service}\nBudget: ${values.budget || "Not decided yet"}\nTimeline: ${values.timeline || "Flexible"}\n\nProject details:\n${values.details.trim()}`;
}
/** @param {string} email @param {{name:string,email:string,service:string,budget:string,timeline:string,details:string}} values */
export function draftUrl(email, values) {
  return `mailto:${email}?subject=${encodeURIComponent(`${values.service} inquiry from ${values.name.trim()}`)}&body=${encodeURIComponent(inquiryText(values))}`;
}
