export const site = {
  name: "Muhammad Usman",
  title: "Software Engineer",
  socialImage: "/social-card.png",
  positioning: "Full Stack, Mobile, and AI Applications",
  country: "Pakistan",
  personalInterest:
    "My interest in outer space inspired this portfolio’s orbital visual language: quiet depth, precise geometry, and connected systems.",
  timezone: "Asia/Karachi",
  email: "build@relnov.com",
  emailLabel: "Professional studio contact",
  github: "https://github.com/UsmanMERN",
  linkedin: "https://www.linkedin.com/in/mernstack-developers/",
  previousPortfolio: "https://devusman.vercel.app",
  portrait: {
    src: "/media/portrait.jpeg",
    alt: "Muhammad Usman in a dark suit, professional Relnov studio portrait",
    width: 200,
    height: 200,
  },
  studio: {
    name: "Relnov",
    url: "https://relnov.com",
    enabled: true,
    role: "Founder & CEO",
    description:
      "I lead product strategy, technical direction, system architecture, and solution design at Relnov.",
  },
  education: {
    subject: "Bachelor of Software Engineering",
    dates: "2021–2025",
    institution: "Government College University Faisalabad",
  },
  resumePdf: null as string | null,
  canonical:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://muhammad-usman-orbital-studio.woodsylark256.chatgpt.site",
  description:
    "Muhammad Usman is a software engineer based in Pakistan, building full stack web applications, mobile experiences, WordPress, and AI integrations.",
  intro:
    "I'm Muhammad Usman, a software engineer based in Pakistan. I’m the founder of Relnov, building across web, mobile, and integrations. From live football apps to commerce platforms, I connect thoughtful interfaces with the systems behind them.",
  features: { live3d: true, analytics: false },
  budgets: [
    "Not decided yet",
    "Under $1,000",
    "$1,000–$3,000",
    "$3,000–$5,000",
    "$5,000+",
  ],
  timelines: ["Flexible", "Within a month", "1–3 months", "3+ months"],
};
export const routes = [
  {
    href: "/work",
    label: "Work",
    description: "Selected projects & engineering notes",
  },
  {
    href: "/about",
    label: "About",
    description: "The person behind the builds",
  },
  {
    href: "/services",
    label: "Services",
    description: "From requirements to working software",
  },
  {
    href: "/lab",
    label: "Lab",
    description: "Small experiments, useful ideas",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Tell me what you're building",
  },
  {
    href: "/resume",
    label: "Resume",
    description: "A clear view of my capabilities",
  },
  {
    href: "/privacy",
    label: "Privacy",
    description: "Contact data and local preferences",
  },
];
export const skillGroups = [
  {
    name: "Frontend",
    detail:
      "Interfaces that translate product requirements into clear, responsive flows.",
    tools: ["JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    name: "Backend & Data",
    detail: "Application logic, APIs, and purposeful data structures.",
    tools: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    name: "Mobile",
    detail: "Platform-aware experiences with a shared application foundation.",
    tools: ["React Native", "Expo"],
  },
  {
    name: "WordPress",
    detail: "Custom foundations with content teams in mind.",
    tools: ["Custom themes", "Custom plugins", "WordPress"],
  },
  {
    name: "AI & Integrations",
    detail:
      "Practical interfaces and connections to external tools and model APIs.",
    tools: ["Python", "AI integrations", "External APIs"],
  },
];
export const services = [
  {
    id: "web",
    name: "Web Applications",
    type: "Web Application",
    tagline: "From the first interaction to the last API call.",
    description:
      "Responsive interfaces and application flows built around how people use your product.",
    deliverables: [
      "Responsive web interfaces",
      "Dashboards & application flows",
      "APIs, authentication & data connections",
    ],
    tools: ["React", "Next.js", "TypeScript", "Node.js"],
    scope:
      "We define user journeys, data needs, permissions, and the first useful release before implementation.",
  },
  {
    id: "mobile",
    name: "Mobile Applications",
    type: "Mobile Application",
    tagline: "A product that feels at home in your hand.",
    description:
      "React Native and Expo experiences with thoughtful navigation and platform-aware interface work.",
    deliverables: [
      "iOS & Android interface work",
      "Navigation & state management",
      "API integration & release preparation",
    ],
    tools: ["React Native", "Expo", "TypeScript"],
    scope:
      "Device targets, offline needs, platform behavior, and release responsibilities shape the scope.",
  },
  {
    id: "wordpress",
    name: "WordPress Development",
    type: "WordPress",
    tagline: "Custom on the outside. Editable on the inside.",
    description:
      "Purpose-built themes, plugins, and content structures that give your team room to work.",
    deliverables: [
      "Custom themes & plugins",
      "Editable page structures",
      "Content migration & integrations",
    ],
    tools: ["WordPress", "Custom themes", "Elementor"],
    scope:
      "We agree on templates, editing needs, content ownership, and any existing plugin constraints.",
  },
  {
    id: "ai",
    name: "AI Integrations",
    type: "AI Integration",
    tagline: "Useful intelligence, with clear boundaries.",
    description:
      "Practical assistant interfaces and model API connections with explicitly defined behavior.",
    deliverables: [
      "Assistant & chat interfaces",
      "Model/API connections",
      "Fallbacks & human review flows",
    ],
    tools: ["Python", "Node.js", "Model APIs"],
    scope:
      "We define inputs, acceptable behavior, data handling, and failure paths before choosing a model.",
  },
];
export const processSteps = [
  {
    name: "Understand",
    description: "Get the problem right before building the solution.",
    deliverable: "Scope & user flows",
    detail:
      "Clarify the audience, the constraints, and the outcome. Turn a broad idea into agreed requirements and usable flows.",
  },
  {
    name: "Architect",
    description: "Give the product a dependable foundation.",
    deliverable: "Application structure",
    detail:
      "Map the interface, application logic, data, and external connections. Choose tools to fit the requirements.",
  },
  {
    name: "Build",
    description: "Turn decisions into working software.",
    deliverable: "Working implementation",
    detail:
      "Implement in reviewable increments with readable code, responsive interfaces, and clear communication.",
  },
  {
    name: "Refine",
    description: "Make the details work as well as the idea.",
    deliverable: "Verification & handoff",
    detail:
      "Check important flows, keyboard behavior, screen sizes, and build output. Document the structure and hand over clearly.",
  },
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "Voltic Inc. — Teacher & Mentor",
    dates: "Jan 2025 – Jun 2025",
    responsibility:
      "Delivered structured training in advanced web development and guided students through project-based learning architectures.",
    source: "https://devusman.vercel.app/about",
  },
  {
    role: "MERN Stack Instructor",
    company: "Saylani Welfare Trust",
    dates: "Jan 2024 – Jan 2025",
    responsibility:
      "Taught full-stack development concepts and mentored beginner and intermediate developers in industry practices.",
    source: "https://devusman.vercel.app/about",
  },
  {
    role: "Full Stack Developer",
    company: "Codevpk",
    dates: "Jul 2023 – Jan 2025",
    responsibility:
      "Developed full-stack web applications, APIs, and frontend systems for global clients.",
    source: "https://devusman.vercel.app/about",
  },
];
