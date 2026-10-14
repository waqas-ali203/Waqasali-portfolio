export type Project = {
  slug: string;
  title: string;
  category: "WordPress" | "Web Applications" | "Mobile" | "AI Integrations";
  shortDescription: string;
  role: string;
  credit: string;
  stack: string[];
  cover: string;
  coverAlt: string;
  coverType: string;
  coverWidth: number;
  coverHeight: number;
  screenshots: { src: string; caption: string }[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  publicationStatus: "published" | "draft";
  verifiedFacts: string[];
  challenge: string;
  contribution: string;
  decisions: { title: string; reason: string }[];
  outcomes: string[];
  scope: string;
  color: string;
  sources: string[];
};
// Public facts checked against the owner’s previous portfolio and Relnov case studies.
// Current product branding is retained in screenshot descriptions. No performance metrics are invented.
export const projects: Project[] = [
  {
    slug: "yacine-shoot",
    title: "Yacine Shoot",
    category: "Mobile",
    shortDescription:
      "Live football match updates, streaming, and notifications.",
    role: "Full Stack Mobile Engineer",
    credit: "Personal portfolio / Relnov project",
    stack: [
      "Android",
      "React Native",
      "Real-time APIs",
      "Supabase",
      "Vercel",
      "AWS",
    ],
    cover: "/projects/yacine-shoot.webp",
    coverAlt: "Shoot 11 football app listing on Google Play",
    coverType: "Google Play listing screenshot",
    coverWidth: 1280,
    coverHeight: 720,
    screenshots: [
      {
        src: "/projects/yacine-shoot.webp",
        caption:
          "Shoot 11 football app listing on Google Play. Actual published google play listing screenshot.",
      },
    ],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.anonymous.yacineshoot",
    featured: true,
    publicationStatus: "published",
    verifiedFacts: [
      "Live football match updates, streaming, and notifications.",
      "Full Stack Mobile Engineer",
      "Local caching for match data",
      "Real-time subscriptions for database updates",
      "Separate streaming and edge API services",
    ],
    challenge:
      "Coordinate live match updates, notifications, and streaming during traffic spikes.",
    contribution:
      "Built a React Native application with local and remote API synchronization and cached match data.",
    decisions: [
      {
        title: "Local caching for match data",
        reason:
          "Cached match data gives the interface a useful local foundation while remote updates are synchronized.",
      },
      {
        title: "Real-time subscriptions for database updates",
        reason:
          "Subscriptions keep live match information connected to the application without tying every update to manual refresh.",
      },
      {
        title: "Separate streaming and edge API services",
        reason:
          "Streaming and edge API services have different responsibilities; separate boundaries make that structure explicit.",
      },
    ],
    outcomes: [
      "A publicly listed Android football application with match tracking and notification features.",
    ],
    scope: "Mobile application",
    color: "#c5ff67",
    sources: [
      "https://devusman.vercel.app/projects",
      "https://www.relnov.com/work/yacine-shoot",
    ],
  },
  {
    slug: "ypro-viewer",
    title: "YPRO Viewer",
    category: "Mobile",
    shortDescription:
      "Consume HLS streams and mobile videos with custom playback controls.",
    role: "Lead Developer",
    credit: "Personal portfolio / Relnov project",
    stack: ["React Native", "Android", "HLS Streaming", "Video Player API"],
    cover: "/projects/ypro-viewer.webp",
    coverAlt: "Y Pro media player listing on Google Play",
    coverType: "Google Play listing screenshot",
    coverWidth: 1280,
    coverHeight: 720,
    screenshots: [
      {
        src: "/projects/ypro-viewer.webp",
        caption:
          "Y Pro media player listing on Google Play. Actual published google play listing screenshot.",
      },
    ],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.yproviewer.ypro",
    featured: false,
    publicationStatus: "published",
    verifiedFacts: [
      "Consume HLS streams and mobile videos with custom playback controls.",
      "Lead Developer",
      "Custom playback controls",
      "HLS support",
      "Direct link parsing",
    ],
    challenge:
      "Make stream playback usable across different mobile network conditions while supporting direct links and playback speed controls.",
    contribution:
      "Built a React Native media player with HLS consumption, direct link parsing, and custom playback controls.",
    decisions: [
      {
        title: "Custom playback controls",
        reason:
          "Playback speed and stream controls are designed into the player interface rather than left outside the main flow.",
      },
      {
        title: "HLS support",
        reason:
          "HLS support gives the player a defined streaming format to consume.",
      },
      {
        title: "Direct link parsing",
        reason:
          "Direct link parsing connects a supplied media URL to the playback experience.",
      },
    ],
    outcomes: [
      "A publicly listed Android player with an ongoing development cycle documented by Relnov.",
    ],
    scope: "Mobile media player",
    color: "#c5ff67",
    sources: [
      "https://devusman.vercel.app/projects",
      "https://www.relnov.com/work/ypro-viewer",
    ],
  },
  {
    slug: "barkopets",
    title: "BarkoPets",
    category: "Web Applications",
    shortDescription:
      "Connect pet owners with specialist services through a marketplace and booking flow.",
    role: "System Architect",
    credit: "Personal portfolio / Relnov project",
    stack: [
      "PrestaShop",
      "PHP/MySQL",
      "SEO Architecture",
      "Next.js",
      "Supabase",
    ],
    cover: "/projects/barkopets.webp",
    coverAlt: "Paw Walks pet services website at barkopets.com",
    coverType: "Website screenshot",
    coverWidth: 1280,
    coverHeight: 720,
    screenshots: [
      {
        src: "/projects/barkopets.webp",
        caption:
          "Paw Walks pet services website at barkopets.com. Actual published website screenshot.",
      },
    ],
    liveUrl: "https://www.barkopets.com/",
    featured: true,
    publicationStatus: "published",
    verifiedFacts: [
      "Connect pet owners with specialist services through a marketplace and booking flow.",
      "System Architect",
      "Commerce logic in PrestaShop",
      "Next.js frontend",
      "Supabase authentication and booking states",
    ],
    challenge:
      "Help owners find and book relevant pet services while giving providers clear marketplace visibility.",
    contribution:
      "Designed a structured service marketplace with listings, onboarding, and booking states.",
    decisions: [
      {
        title: "Commerce logic in PrestaShop",
        reason:
          "PrestaShop provides the documented commerce foundation for the marketplace.",
      },
      {
        title: "Next.js frontend",
        reason:
          "A Next.js frontend shapes the listings, provider discovery, and user-facing marketplace flows.",
      },
      {
        title: "Supabase authentication and booking states",
        reason:
          "Authentication and booking states have a shared data foundation in Supabase.",
      },
    ],
    outcomes: [
      "Live pet-care marketplace at barkopets.com. Current homepage presents the Paw Walks brand and shows owner/walker onboarding, booking, profiles, and messaging features.",
    ],
    scope: "Pet services marketplace",
    color: "#c5ff67",
    sources: [
      "https://devusman.vercel.app/projects",
      "https://www.relnov.com/work/barkopets",
      "https://www.barkopets.com/",
    ],
  },
  {
    slug: "nubambu",
    title: "Nubambu",
    category: "Web Applications",
    shortDescription:
      "Present sustainable bamboo products with commerce, order orchestration, and messaging tools.",
    role: "Full Stack Lead",
    credit: "Personal portfolio / Relnov project",
    stack: ["React", "Node.js", "MongoDB", "Twilio", "Resend"],
    cover: "/projects/nubambu.webp",
    coverAlt: "NUMAT bamboo product website at nubambu.com",
    coverType: "Website screenshot",
    coverWidth: 1280,
    coverHeight: 720,
    screenshots: [
      {
        src: "/projects/nubambu.webp",
        caption:
          "NUMAT bamboo product website at nubambu.com. Actual published website screenshot.",
      },
    ],
    liveUrl: "https://www.nubambu.com/",
    featured: true,
    publicationStatus: "published",
    verifiedFacts: [
      "Present sustainable bamboo products with commerce, order orchestration, and messaging tools.",
      "Full Stack Lead",
      "Node.js and MongoDB backend",
      "React frontend",
      "Twilio for WhatsApp communication",
      "Resend for transactional email",
    ],
    challenge:
      "Coordinate international orders and automated communication while keeping product browsing clear.",
    contribution:
      "Built the frontend, backend, administrative dashboard, WhatsApp notifications, and transactional email integration described by the case study.",
    decisions: [
      {
        title: "Node.js and MongoDB backend",
        reason:
          "The Node.js and MongoDB foundation connects product, order, and administrative workflows.",
      },
      {
        title: "React frontend",
        reason:
          "React shapes the browsing and commerce interface around the catalog.",
      },
      {
        title: "Twilio for WhatsApp communication",
        reason: "Twilio connects order communication to WhatsApp.",
      },
      {
        title: "Resend for transactional email",
        reason: "Resend gives transactional email a dedicated integration.",
      },
    ],
    outcomes: [
      "Live bamboo-product catalog and quote flow at nubambu.com. Current branding is NUMAT, and product categories, cart, and quote options are visible on the live homepage.",
    ],
    scope: "Sustainable commerce",
    color: "#c5ff67",
    sources: [
      "https://devusman.vercel.app/projects",
      "https://www.relnov.com/work/nubambu",
      "https://www.nubambu.com/",
    ],
  },
  {
    slug: "beauty-crown-dubai",
    title: "Beauty Crown Dubai",
    category: "WordPress",
    shortDescription:
      "A salon website with service management, appointment booking, and branch information.",
    role: "WordPress Developer",
    credit: "Relnov studio project",
    stack: ["WordPress", "Elementor", "Custom Theme", "PHP", "UI/UX Design"],
    cover: "/projects/beauty-crown.webp",
    coverAlt: "Beauty Crown salon website with booking and service navigation",
    coverType: "Website screenshot",
    coverWidth: 1920,
    coverHeight: 1080,
    screenshots: [
      {
        src: "/projects/beauty-crown.webp",
        caption:
          "Beauty Crown salon website with booking and service navigation. Actual published website screenshot.",
      },
      {
        src: "/covers/beauty-system.svg",
        caption:
          "Original illustrative diagram of the project’s content and technical foundation; not a product screenshot.",
      },
    ],
    liveUrl: "https://beautycrown.ae/",
    featured: true,
    publicationStatus: "published",
    verifiedFacts: [
      "A salon website with service management, appointment booking, and branch information.",
      "WordPress Developer",
      "Elementor-compatible theme for content editing",
      "Booking integration",
      "Branch-aware service presentation",
    ],
    challenge:
      "Give the salon an editable website that supports appointments across multiple branches and a polished brand presentation.",
    contribution:
      "At Relnov, our studio developed a custom WordPress theme optimized for Elementor and integrated the documented booking flow.",
    decisions: [
      {
        title: "Elementor-compatible theme for content editing",
        reason:
          "An Elementor-compatible custom theme lets the salon edit content inside an intentional page structure.",
      },
      {
        title: "Booking integration",
        reason:
          "Booking information and appointment actions belong within the service journey.",
      },
      {
        title: "Branch-aware service presentation",
        reason:
          "Branch-aware content helps visitors find the service and location that fit their needs.",
      },
    ],
    outcomes: [
      "Live salon website with a pink brand-led homepage and booking calls to action.",
    ],
    scope: "Salon website",
    color: "#c5ff67",
    sources: ["https://www.relnov.com/work/beauty-crown"],
  },
  {
    slug: "six-link-solutions",
    title: "Six Link Solutions",
    category: "WordPress",
    shortDescription:
      "Present a veteran-owned professional services and consulting firm's capabilities.",
    role: "Web Developer",
    credit: "Relnov studio project",
    stack: ["WordPress", "Custom Theme", "Hostinger", "UI/UX Design"],
    cover: "/projects/six-link-solutions.webp",
    coverAlt: "Six Link Solutions consulting website homepage",
    coverType: "Website screenshot",
    coverWidth: 1920,
    coverHeight: 1080,
    screenshots: [
      {
        src: "/projects/six-link-solutions.webp",
        caption:
          "Six Link Solutions consulting website homepage. Actual published website screenshot.",
      },
      {
        src: "/covers/six-system.svg",
        caption:
          "Original illustrative diagram of the project’s content and technical foundation; not a product screenshot.",
      },
    ],
    liveUrl: "https://sixlinksolutions.com/",
    featured: false,
    publicationStatus: "published",
    verifiedFacts: [
      "Present a veteran-owned professional services and consulting firm's capabilities.",
      "Web Developer",
      "Custom WordPress theme",
      "Clear service messaging",
      "Hostinger deployment",
    ],
    challenge:
      "Communicate strategic advisory and cybersecurity services to government and enterprise audiences with clear, credible navigation.",
    contribution:
      "At Relnov, our studio designed and built the customized WordPress theme and deployed it on Hostinger as documented in the studio case study.",
    decisions: [
      {
        title: "Custom WordPress theme",
        reason:
          "A custom WordPress theme supports the specific presentation and content needs of the consulting firm.",
      },
      {
        title: "Clear service messaging",
        reason:
          "Service messaging brings strategic advisory and cybersecurity capabilities into clear navigation.",
      },
      {
        title: "Hostinger deployment",
        reason:
          "Hostinger is the documented deployment environment for the studio’s WordPress implementation.",
      },
    ],
    outcomes: [
      "Live consulting website with service navigation and project enquiry calls to action.",
    ],
    scope: "Professional services website",
    color: "#c5ff67",
    sources: ["https://www.relnov.com/work/six-link-solutions"],
  },
];
export const publishedProjects = projects.filter(
  (p) => p.publicationStatus === "published",
);
export const featuredProjects = publishedProjects.filter((p) => p.featured);
export const projectBySlug = (slug: string) =>
  publishedProjects.find((p) => p.slug === slug);
