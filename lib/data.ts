// Mock data for the Sproutly design prototype.
// Everything here is placeholder content from the design handoff —
// swap for real entities when Yu wires this up to a backend.

export type PlantKind =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 // growth stages
  | "wilted"
  | "regrowth";

export type Founder = { name: string; initial: string; gradient: string };

export type LinkKind = "website" | "x" | "github" | "discord" | "youtube";

export type ProjectLink = { kind: LinkKind; label: string; url: string };

export type Project = {
  slug: string;
  name: string;
  logoInitial: string;
  logoGradient: string;
  /** 22px squircle or full circle — mixed radii per the spec */
  logoRadius: string;
  plantTileBg: string;
  founders: Founder[];
  founderNames: string;
  founderHandle: string;
  planted: string;
  stageName: string;
  badgeTone: "amber" | "emerald";
  plant: PlantKind;
  health: number;
  waters: number;
  streakDays: number;
  level: number;
  quote: string;
  keeper: string;
  isNew?: boolean;
  links: ProjectLink[];
};

// Avatar ring / founder gradients from the canvas
export const G = {
  purpleTeal: "linear-gradient(135deg,#6c5ce7,#00cec9)",
  amberPurple: "linear-gradient(135deg,#fbbf24,#6c5ce7)",
  tealGreen: "linear-gradient(135deg,#00cec9,#2eb872)",
  indigoPurple: "linear-gradient(135deg,#4834d4,#6c5ce7)",
};

export const projects: Project[] = [
  {
    slug: "rankkit",
    name: "RankKit",
    logoInitial: "R",
    logoGradient: "linear-gradient(135deg,#6c5ce7,#4834d4)",
    logoRadius: "22px",
    plantTileBg: "#f4f2ff",
    founders: [
      { name: "Maya Chen", initial: "M", gradient: G.purpleTeal },
      { name: "Leo Marsh", initial: "L", gradient: G.amberPurple },
    ],
    founderNames: "Maya Chen & Leo Marsh",
    founderHandle: "@maya",
    planted: "Planted Mar 12",
    stageName: "Flowering",
    badgeTone: "amber",
    plant: 5,
    health: 80,
    waters: 248,
    streakDays: 12,
    level: 5,
    quote: "Helping indie makers climb the charts.",
    keeper: "Approved · Ines",
    isNew: true,
    links: [
      { kind: "website", label: "rankkit.dev", url: "https://rankkit.dev" },
      { kind: "x", label: "@rankkit", url: "https://x.com/rankkit" },
      { kind: "github", label: "rankkit/rankkit", url: "https://github.com/rankkit" },
      { kind: "discord", label: "Community server", url: "https://discord.gg/rankkit" },
    ],
  },
  {
    slug: "pixelpay",
    name: "PixelPay",
    logoInitial: "P",
    logoGradient: "linear-gradient(135deg,#00cec9,#0a86a8)",
    logoRadius: "999px",
    plantTileBg: "#f4f2ff",
    founders: [
      { name: "Ana Reyes", initial: "A", gradient: G.tealGreen },
      { name: "Sam Ortiz", initial: "S", gradient: G.indigoPurple },
      { name: "Priya Nair", initial: "P", gradient: G.amberPurple },
    ],
    founderNames: "Ana, Sam & Priya",
    founderHandle: "@ana",
    planted: "Planted Jan 8",
    stageName: "Thriving",
    badgeTone: "emerald",
    plant: 7,
    health: 92,
    waters: 512,
    streakDays: 31,
    level: 8,
    quote: "Tiny payments for tiny teams.",
    keeper: "Approved · Tom",
    links: [
      { kind: "website", label: "pixelpay.app", url: "https://pixelpay.app" },
      { kind: "x", label: "@pixelpay", url: "https://x.com/pixelpay" },
      { kind: "github", label: "pixelpay/core", url: "https://github.com/pixelpay" },
    ],
  },
  {
    slug: "looply",
    name: "Looply",
    logoInitial: "L",
    logoGradient: "linear-gradient(135deg,#fbbf24,#f2762e)",
    logoRadius: "22px",
    plantTileBg: "#f4f2ff",
    founders: [{ name: "Theo Lang", initial: "T", gradient: G.amberPurple }],
    founderNames: "Theo Lang",
    founderHandle: "@leo",
    planted: "Planted Apr 2",
    stageName: "Budding",
    badgeTone: "amber",
    plant: 4,
    health: 64,
    waters: 131,
    streakDays: 6,
    level: 4,
    quote: "Habit loops that actually stick.",
    keeper: "Approved · Ines",
    isNew: true,
    links: [
      { kind: "website", label: "looply.so", url: "https://looply.so" },
      { kind: "youtube", label: "Demo videos", url: "https://youtube.com/@looply" },
    ],
  },
  {
    slug: "fernbase",
    name: "Fernbase",
    logoInitial: "F",
    logoGradient: "linear-gradient(135deg,#2eb872,#0f8f57)",
    logoRadius: "999px",
    plantTileBg: "#f8f1e7",
    founders: [
      { name: "Kai Tanaka", initial: "K", gradient: G.indigoPurple },
      { name: "Jun Ito", initial: "J", gradient: G.tealGreen },
    ],
    founderNames: "Kai Tanaka & Jun Ito",
    founderHandle: "@kai",
    planted: "Planted Feb 19",
    stageName: "Wilting",
    badgeTone: "amber",
    plant: "wilted",
    health: 18,
    waters: 64,
    streakDays: 0,
    level: 2,
    quote: "An open-source home for plant lovers.",
    keeper: "Approved · Tom",
    links: [
      { kind: "website", label: "fernbase.org", url: "https://fernbase.org" },
      { kind: "github", label: "fernbase/fernbase", url: "https://github.com/fernbase" },
    ],
  },
  {
    slug: "quilljar",
    name: "Quilljar",
    logoInitial: "Q",
    logoGradient: "linear-gradient(135deg,#4834d4,#2c1e9e)",
    logoRadius: "22px",
    plantTileBg: "#f1eff8",
    founders: [{ name: "Noor Salem", initial: "N", gradient: G.purpleTeal }],
    founderNames: "Noor Salem",
    founderHandle: "@noor",
    planted: "Planted Nov 30",
    stageName: "Regrowth",
    badgeTone: "emerald",
    plant: "regrowth",
    health: 37,
    waters: 89,
    streakDays: 3,
    level: 3,
    quote: "A cozy journal that writes back.",
    keeper: "Approved · Ines",
    links: [
      { kind: "website", label: "quilljar.ink", url: "https://quilljar.ink" },
      { kind: "x", label: "@quilljar", url: "https://x.com/quilljar" },
    ],
  },
  {
    slug: "bloomdesk",
    name: "Bloomdesk",
    logoInitial: "B",
    logoGradient: "linear-gradient(135deg,#e84393,#6c5ce7)",
    logoRadius: "999px",
    plantTileBg: "#f4f2ff",
    founders: [
      { name: "Ivy Park", initial: "I", gradient: G.tealGreen },
      { name: "Rio Vega", initial: "R", gradient: G.purpleTeal },
    ],
    founderNames: "Ivy Park & Rio Vega",
    founderHandle: "@ivy",
    planted: "Planted Oct 14",
    stageName: "Full Bloom",
    badgeTone: "emerald",
    plant: 8,
    health: 96,
    waters: 730,
    streakDays: 44,
    level: 9,
    quote: "A support inbox with a heartbeat.",
    keeper: "Approved · Tom",
    links: [
      { kind: "website", label: "bloomdesk.com", url: "https://bloomdesk.com" },
      { kind: "x", label: "@bloomdesk", url: "https://x.com/bloomdesk" },
      { kind: "discord", label: "Support garden", url: "https://discord.gg/bloomdesk" },
    ],
  },
];

export const pendingProject = {
  name: "Orbit Notes",
  logoInitial: "O",
  founders: "Jules Kim & Dana Fox",
  meta: "· submitted 2h ago — “Notes that orbit around your ideas.”",
};

export const milestoneLabels = [
  "Seed",
  "Sprout",
  "First Leaf",
  "Budding",
  "Flowering",
  "Pollinate",
  "Full Bloom",
];

export const activityFeed = [
  { name: "Maya", action: "watered RankKit", time: "2m", gradient: G.purpleTeal, initial: "M" },
  { name: "Leo", action: "hit Budding on Looply", time: "8m", gradient: G.amberPurple, initial: "L" },
  { name: "Ana", action: "boosted PixelPay", time: "14m", gradient: G.tealGreen, initial: "A" },
  { name: "Sam", action: "joined the garden", time: "21m", gradient: G.indigoPurple, initial: "S" },
  { name: "Rio", action: "watered Nestly", time: "33m", gradient: G.purpleTeal, initial: "R" },
  { name: "Priya", action: "commented on RankKit", time: "1h", gradient: G.amberPurple, initial: "P" },
];

export type SubmissionStatus = "considering" | "planned" | "shipped";

export type Submission = {
  id: number;
  author: string;
  initial: string;
  gradient: string;
  time: string;
  text: string;
  upvotes: number;
  viewerUpvoted: boolean;
  /** Founder-set; fresh submissions have no status chip yet */
  status?: SubmissionStatus;
  founderReply?: string;
};

export const submissions: Submission[] = [
  {
    id: 1,
    author: "Priya Nair",
    initial: "P",
    gradient: G.amberPurple,
    time: "2 days ago",
    text: "I would like to see keyboard shortcuts for moving rows in the ranking table.",
    upvotes: 12,
    viewerUpvoted: true,
    status: "considering",
    founderReply: "Maya (founder): “On the list — pairing it with the next table update.”",
  },
  {
    id: 2,
    author: "Rio Vega",
    initial: "R",
    gradient: G.tealGreen,
    time: "3 days ago",
    text: "Dark mode for the dashboard — I check ranks at night.",
    upvotes: 23,
    viewerUpvoted: true,
    status: "shipped",
    founderReply: "Leo (founder): “Shipped last Tuesday — enjoy!”",
  },
  {
    id: 3,
    author: "Sam Ortiz",
    initial: "S",
    gradient: G.indigoPurple,
    time: "4 days ago",
    text: "I recommend you add a weekly email digest of rank changes.",
    upvotes: 8,
    viewerUpvoted: false,
    status: "planned",
  },
  {
    id: 4,
    author: "Ana Reyes",
    initial: "A",
    gradient: "linear-gradient(135deg,#00cec9,#0a86a8)",
    time: "5 days ago",
    text: "Let us export the ranking table as CSV.",
    upvotes: 6,
    viewerUpvoted: false,
  },
  {
    id: 5,
    author: "Noor Salem",
    initial: "N",
    gradient: G.purpleTeal,
    time: "last week",
    text: "Show a tiny sparkline of each app's rank history next to its name.",
    upvotes: 15,
    viewerUpvoted: false,
    status: "considering",
  },
  {
    id: 6,
    author: "Tam Vu",
    initial: "T",
    gradient: "linear-gradient(135deg,#2eb872,#0f8f57)",
    time: "last week",
    text: "I would like to see a public API for pulling my app's rank.",
    upvotes: 4,
    viewerUpvoted: false,
  },
];

export type QuestState = "done" | "active" | "locked";

export const quests: {
  order: number;
  title: string;
  description: string;
  courseMinutes: number;
  pdfName: string;
  xp: number;
  state: QuestState;
}[] = [
  {
    order: 1,
    title: "Launch a simple website",
    description: "A one-pager is enough — the course walks you through building it in an afternoon.",
    courseMinutes: 12,
    pdfName: "one-pager-template.pdf",
    xp: 40,
    state: "done",
  },
  {
    order: 2,
    title: "Claim your domain name",
    description: "Pick a name people can spell out loud — the checklist keeps you from common traps.",
    courseMinutes: 8,
    pdfName: "domain-checklist.pdf",
    xp: 40,
    state: "active",
  },
  {
    order: 3,
    title: "Run your first marketing push",
    description: "Explain what you're building, where it helps, and invite the garden to try it.",
    courseMinutes: 15,
    pdfName: "launch-post-guide.pdf",
    xp: 60,
    state: "locked",
  },
];

export const lineup = [
  {
    time: "7:05",
    project: "PixelPay",
    initial: "P",
    gradient: "linear-gradient(135deg,#00cec9,#0a86a8)",
    radius: "999px",
    subtitle: "Ana Reyes · 5 min",
    status: "confirmed" as const,
  },
  {
    time: "7:20",
    project: "Looply",
    initial: "L",
    gradient: "linear-gradient(135deg,#fbbf24,#f2762e)",
    radius: "10px",
    subtitle: "Theo Lang · 3 min",
    status: "confirmed" as const,
  },
  {
    time: "7:35",
    project: "Quilljar",
    initial: "Q",
    gradient: "linear-gradient(135deg,#4834d4,#2c1e9e)",
    radius: "10px",
    subtitle: "Noor Salem · 5 min",
    status: "waitlist" as const,
  },
  {
    time: "7:50",
    project: "RankKit",
    initial: "R",
    gradient: "linear-gradient(135deg,#6c5ce7,#4834d4)",
    radius: "10px",
    subtitle: "Your request · 3 min",
    status: "pending" as const,
    mine: true,
  },
];

export const keepers = [
  { name: "Ines", initial: "I", gradient: G.indigoPurple, approvals: "34 approvals this season" },
  { name: "Tom", initial: "T", gradient: G.tealGreen, approvals: "21 approvals this season" },
];
