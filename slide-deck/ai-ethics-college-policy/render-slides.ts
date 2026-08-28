import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import sharp from "sharp";

const DECK_DIR = import.meta.dir;
const SVG_DIR = join(DECK_DIR, "svgs");
const PROMPTS_DIR = join(DECK_DIR, "prompts");
const BACKUP_DIR = join(DECK_DIR, "backups");
const W = 1600;
const H = 900;

const colors = {
  bg: "#F6F4EE",
  paper: "#FFFFFF",
  ink: "#1B1B1F",
  muted: "#666A73",
  line: "#DAD7CF",
  lineDark: "#BDB7AC",
  teal: "#0F766E",
  cobalt: "#2563EB",
  amber: "#B7791F",
  red: "#B91C1C",
  green: "#15803D",
  violet: "#6D28D9",
};

type Slide = {
  filename: string;
  type: "Cover" | "Content" | "Back Cover";
  stage: string;
  title: string[];
  subtitle?: string | string[];
  bullets?: string[];
  layout: string;
  visual: string;
};

const slides: Slide[] = [
  {
    filename: "01-slide-cover",
    type: "Cover",
    stage: "college ai ethics",
    title: ["AI Ethics in", "College Assignments"],
    subtitle: ['Stop asking "Did students use AI?" Ask whether they learned.'],
    bullets: [],
    layout: "title-board",
    visual: "Classroom policy board with a case-to-principles-to-policy-to-assessment flow.",
  },
  {
    filename: "02-slide-opening-case",
    type: "Content",
    stage: "opening case",
    title: ["One vague rule creates", "three different classrooms"],
    subtitle: ['"Use AI responsibly" is not enough guidance.'],
    bullets: [
      "Paid-model advantage",
      "No-AI student faces time/access tradeoff",
      "Unauthorized material upload",
      "Polished work, uncertain learning",
    ],
    layout: "case-cards",
    visual: "Three student cards and one professor grading card.",
  },
  {
    filename: "03-slide-wrong-question",
    type: "Content",
    stage: "reframe",
    title: ['"Did they use AI?"', "is the wrong endpoint"],
    subtitle: "The ethical target is accountable learning.",
    bullets: [
      "Did the student learn?",
      "Can they defend the work?",
      "Was assistance disclosed?",
      "Was private material protected?",
    ],
    layout: "question-transform",
    visual: "A crossed-out detection question turns into learning evidence.",
  },
  {
    filename: "04-slide-four-paper-map",
    type: "Content",
    stage: "evidence base",
    title: ["Four papers give", "the policy map"],
    subtitle: "Principles -> governance -> concerns -> lived reality and power.",
    bullets: [
      "Jobin: shared principles",
      "Corrêa: governance documents",
      "Giarmoleo: rules plus formation",
      "Groen: principles, lived realities, power",
    ],
    layout: "four-paper-map",
    visual: "Four connected research cards moving from principles to power.",
  },
  {
    filename: "05-slide-principles-not-policy",
    type: "Content",
    stage: "jobin et al.",
    title: ["A principle", "is not a policy"],
    subtitle: "Shared ethics vocabulary still needs local implementation.",
    bullets: [
      "Transparency: what must be disclosed?",
      "Fairness: who gets access?",
      "Privacy: what cannot be uploaded?",
      "Responsibility: who owns the failure?",
    ],
    layout: "principle-converter",
    visual: "Principle labels enter a converter and become obligation questions.",
  },
  {
    filename: "06-slide-governance-needs-teeth",
    type: "Content",
    stage: "correa et al.",
    title: ["Governance", "needs teeth"],
    subtitle: "Rules without implementation are soft promises.",
    bullets: [
      "Course policy must define duties",
      "Approved tools and access matter",
      "Privacy rules must be explicit",
      "Appeals and enforcement cannot be vague",
    ],
    layout: "policy-checklist",
    visual: "A soft memo hardens into a course policy checklist.",
  },
  {
    filename: "07-slide-rules-plus-judgment",
    type: "Content",
    stage: "giarmoleo et al.",
    title: ["Clear rules are necessary;", "trained judgment is necessary too"],
    subtitle: "Act-centered and agent-centered responses belong together.",
    bullets: [
      "Act-centered: policies, standards, procedures",
      "Agent-centered: habits, education, judgment",
      "Colleges need both to avoid policing-only policy",
    ],
    layout: "act-agent-balance",
    visual: "Two columns connected by a classroom bridge.",
  },
  {
    filename: "08-slide-three-lenses",
    type: "Content",
    stage: "groen et al.",
    title: ["Test every policy", "through three lenses"],
    subtitle: "Principles alone miss lived reality and institutional power.",
    bullets: [
      "Principles: what value is at stake?",
      "Lived realities: what changes in class?",
      "Power: who benefits and who is punished?",
    ],
    layout: "three-lenses",
    visual: "Three inspection lenses over the same assignment.",
  },
  {
    filename: "09-slide-use-boundary",
    type: "Content",
    stage: "student boundary",
    title: ["The boundary", "is learning labor"],
    subtitle: "The question is whether the student can explain, verify, adapt, and defend.",
    bullets: [
      "Allowed: discuss, plan, revise, verify",
      "Borderline: AI proposes; student owns",
      "Prohibited: AI completes; student cannot explain",
    ],
    layout: "traffic-lanes",
    visual: "Allowed, borderline, and prohibited lanes.",
  },
  {
    filename: "10-slide-four-part-policy",
    type: "Content",
    stage: "policy model",
    title: ["A fair course policy", "has four verbs"],
    subtitle: "Allow. Disclose. Protect. Assess.",
    bullets: [
      "Allow learning support",
      "Disclose meaningful assistance",
      "Protect private material",
      "Assess understanding",
    ],
    layout: "four-quadrant-policy",
    visual: "Four-quadrant policy board.",
  },
  {
    filename: "11-slide-assessment-redesign",
    type: "Content",
    stage: "assessment",
    title: ["Grade evidence,", "not polish alone"],
    subtitle: "AI-resistant assessment is evidence-rich assessment.",
    bullets: [
      "Final report",
      "AI disclosure and selected prompts",
      "Source verification checklist",
      "Presentation, Q&A, quiz, or demo",
    ],
    layout: "evidence-stack",
    visual: "An evidence stack beside a grading scale.",
  },
  {
    filename: "12-slide-fairness-and-power",
    type: "Content",
    stage: "fairness and power",
    title: ["Ambiguity", "reallocates advantage"],
    subtitle: "Unequal access becomes invisible when policy stays vague.",
    bullets: [
      "Paid models and AI fluency compound",
      "Students carry punishment risk",
      "Vendors gain data and dependency",
      "Universities must define access and appeals",
    ],
    layout: "power-map",
    visual: "Power map across student, teacher, university, and vendor.",
  },
  {
    filename: "13-slide-homework",
    type: "Content",
    stage: "homework design",
    title: ["Homework: use AI", "as a thinking partner"],
    subtitle: "The final product must still prove student understanding.",
    bullets: [
      "900-1200 word report",
      "Disclosure appendix",
      "Three prompt excerpts or summaries",
      "Verification checklist",
      "Five-minute presentation",
    ],
    layout: "assignment-packet",
    visual: "Assignment packet with deliverables and in-class defense.",
  },
  {
    filename: "14-slide-closing",
    type: "Back Cover",
    stage: "takeaway",
    title: ["Use AI to think better,", "not to stop thinking"],
    subtitle: "Allow. Disclose. Protect. Assess.",
    bullets: [
      "Universities define fair rules",
      "Teachers guide AI-supported learning",
      "Students build judgment and disclose help",
      "Assessment proves understanding",
    ],
    layout: "closing-policy",
    visual: "Four verbs form an accountability loop around learning.",
  },
];

function ensureDir(path: string) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function stamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "");
}

function backupIfExists(path: string) {
  if (!existsSync(path)) return;
  const backupRoot = join(BACKUP_DIR, basename(dirname(path)));
  ensureDir(backupRoot);
  const extIndex = path.lastIndexOf(".");
  const ext = extIndex === -1 ? "" : path.slice(extIndex);
  const stem = extIndex === -1 ? basename(path) : basename(path, ext);
  renameSync(path, join(backupRoot, `${stem}-backup-${stamp()}${ext}`));
}

function esc(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function measure(input: string) {
  let total = 0;
  for (const ch of input) total += /[\u3400-\u9FFF]/.test(ch) ? 1.8 : 1;
  return total;
}

function wrap(input: string, maxUnits: number) {
  const tokens = input.split(/(\s+)/);
  const lines: string[] = [];
  let line = "";
  const addChars = (token: string) => {
    for (const ch of token) {
      const next = `${line}${ch}`;
      if (measure(next) > maxUnits && line.trim()) {
        lines.push(line.trim());
        line = ch;
      } else {
        line = next;
      }
    }
  };
  for (const token of tokens) {
    if (measure(token) > maxUnits) {
      addChars(token);
      continue;
    }
    const next = `${line}${token}`;
    if (measure(next) > maxUnits && line.trim()) {
      lines.push(line.trim());
      line = token.trimStart();
    } else {
      line = next;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function linesOf(input?: string | string[]) {
  if (!input) return [];
  return Array.isArray(input) ? input : [input];
}

function textBlock(
  x: number,
  y: number,
  lines: string[],
  size: number,
  color = colors.ink,
  weight = 700,
  lineHeight = Math.round(size * 1.18),
  anchor: "start" | "middle" = "start",
  family = "ui",
) {
  const cls = family === "mono" ? "mono" : "ui";
  return lines
    .map((line, i) => {
      return `<text class="${cls}" x="${x}" y="${y + i * lineHeight}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(line)}</text>`;
    })
    .join("");
}

function card(x: number, y: number, w: number, h: number, stroke = colors.line, fill = colors.paper) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

function badge(x: number, y: number, label: string, color = colors.teal) {
  const width = Math.max(128, measure(label) * 12 + 38);
  return `<g>
    <rect x="${x}" y="${y - 28}" width="${width}" height="42" rx="8" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="1.5"/>
    <text class="mono" x="${x + 18}" y="${y}" fill="${color}" font-size="19" font-weight="800">${esc(label.toUpperCase())}</text>
  </g>`;
}

function bulletList(x: number, y: number, bullets: string[], width = 560, color = colors.ink) {
  let out = "";
  let cy = y;
  for (const bullet of bullets) {
    const wrapped = wrap(bullet, width / 17);
    out += `<circle cx="${x}" cy="${cy - 8}" r="6" fill="${colors.teal}"/>`;
    out += textBlock(x + 24, cy, wrapped, 24, color, 560, 31);
    cy += wrapped.length * 31 + 16;
  }
  return out;
}

function arrow(x1: number, y1: number, x2: number, y2: number, color = colors.teal) {
  return `<path d="M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" marker-end="url(#arrow)"/>`;
}

function baseDefs() {
  return `<defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${colors.line}" stroke-width="1" opacity="0.45"/>
    </pattern>
    <marker id="arrow" markerWidth="11" markerHeight="11" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,7 L10,3.5 z" fill="${colors.teal}"/>
    </marker>
  </defs>`;
}

function shell(inner: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${baseDefs()}
  <style>
    .ui { font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, sans-serif; letter-spacing: 0; }
    .mono { font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace; letter-spacing: 0; }
  </style>
  <rect width="${W}" height="${H}" fill="${colors.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect x="42" y="42" width="1516" height="816" rx="8" fill="#FFFFFF" opacity="0.74"/>
  <path d="M42 168 H1558" stroke="${colors.lineDark}" stroke-width="2"/>
  ${inner}
</svg>`;
}

function header(slide: Slide, maxTitleWidth = 920) {
  const subtitle = linesOf(slide.subtitle);
  const subtitleLines = subtitle.flatMap((line) => wrap(line, maxTitleWidth / 18));
  return `${badge(86, 94, slide.stage)}
    ${textBlock(86, 185, slide.title, 56, colors.ink, 850, 66)}
    ${subtitleLines.length ? textBlock(90, 185 + slide.title.length * 66 + 30, subtitleLines, 27, colors.muted, 520, 35) : ""}`;
}

function miniDoc(x: number, y: number, w: number, h: number, title: string, color: string, lines: string[]) {
  const wrapped = lines.flatMap((line) => wrap(line, w / 14));
  return `<g>
    ${card(x, y, w, h, color, colors.paper)}
    <rect x="${x}" y="${y}" width="${w}" height="54" rx="8" fill="${color}" opacity="0.11"/>
    <text class="ui" x="${x + 24}" y="${y + 36}" fill="${color}" font-size="24" font-weight="800">${esc(title)}</text>
    ${textBlock(x + 24, y + 95, wrapped.slice(0, 6), 21, colors.ink, 540, 30)}
  </g>`;
}

function renderCover(slide: Slide) {
  const pipeline = ["case", "principles", "policy", "assessment"]
    .map((label, i) => {
      const x = 132 + i * 295;
      return `<g>
        <rect x="${x}" y="690" width="230" height="68" rx="8" fill="${i % 2 ? "#F8FBFF" : "#F7FCFA"}" stroke="${i % 2 ? colors.cobalt : colors.teal}" stroke-width="2"/>
        <text class="mono" x="${x + 115}" y="733" fill="${i % 2 ? colors.cobalt : colors.teal}" font-size="24" font-weight="800" text-anchor="middle">${label}</text>
        ${i < 3 ? `<path d="M${x + 246} 724 L${x + 282} 724" stroke="${colors.teal}" stroke-width="4" marker-end="url(#arrow)"/>` : ""}
      </g>`;
    })
    .join("");

  const board = `<g transform="translate(1110 230)">
    ${card(0, 0, 300, 330, colors.ink, "#FBFAF7")}
    <text class="ui" x="38" y="58" fill="${colors.ink}" font-size="28" font-weight="850">Course AI Policy</text>
    ${["Allow", "Disclose", "Protect", "Assess"].map((t, i) => `<g><rect x="42" y="${102 + i * 52}" width="216" height="34" rx="8" fill="${[colors.green, colors.cobalt, colors.red, colors.teal][i]}" opacity="0.12"/><text class="mono" x="60" y="${126 + i * 52}" fill="${[colors.green, colors.cobalt, colors.red, colors.teal][i]}" font-size="20" font-weight="800">${t}</text></g>`).join("")}
  </g>`;

  return shell(`${badge(112, 110, slide.stage)}${textBlock(112, 285, slide.title, 76, colors.ink, 900, 88)}${textBlock(116, 508, linesOf(slide.subtitle), 34, colors.muted, 540, 44)}${pipeline}${board}`);
}

function renderCase(slide: Slide) {
  const cards = [
    ["Student A", "Paid model; polished report; weak defense", colors.cobalt],
    ["Student B", "No AI; slower work; possible disadvantage", colors.amber],
    ["Student C", "Uploads course notes, feedback, peer comments", colors.red],
  ]
    .map(([title, body, color], i) => miniDoc(760 + (i % 2) * 360, 238 + Math.floor(i / 2) * 210, 320, 160, title, color, [body]))
    .join("");
  const professor = miniDoc(1120, 448, 320, 160, "Professor", colors.teal, ["Good writing, vague disclosure, uncertain learning"]);
  return shell(`${header(slide)}${bulletList(112, 545, slide.bullets ?? [], 560)}${cards}${professor}`);
}

function renderWrongQuestion(slide: Slide) {
  const wrong = `<g transform="translate(730 250)">
    ${card(0, 0, 360, 250, colors.red, "#FFF8F6")}
    <text class="ui" x="180" y="92" fill="${colors.red}" font-size="30" font-weight="850" text-anchor="middle">Did they use AI?</text>
    <path d="M72 150 L288 150" stroke="${colors.red}" stroke-width="10" stroke-linecap="round"/>
    <text class="ui" x="180" y="204" fill="${colors.muted}" font-size="23" text-anchor="middle">detection endpoint</text>
  </g>`;
  const right = `<g transform="translate(1130 250)">
    ${card(0, 0, 360, 250, colors.green, "#F6FFF8")}
    <text class="ui" x="180" y="82" fill="${colors.green}" font-size="30" font-weight="850" text-anchor="middle">Did they learn?</text>
    <text class="ui" x="180" y="139" fill="${colors.ink}" font-size="24" font-weight="750" text-anchor="middle">explain</text>
    <text class="ui" x="180" y="181" fill="${colors.ink}" font-size="24" font-weight="750" text-anchor="middle">verify</text>
    <text class="ui" x="180" y="223" fill="${colors.ink}" font-size="24" font-weight="750" text-anchor="middle">defend</text>
  </g>`;
  return shell(`${header(slide)}${bulletList(112, 545, slide.bullets ?? [], 560)}${wrong}${arrow(1096, 375, 1122, 375)}${right}`);
}

function renderFourPaperMap(slide: Slide) {
  const items = [
    ["Jobin 2019", "recurring principles", colors.teal],
    ["Corrêa 2023", "governance documents", colors.cobalt],
    ["Giarmoleo 2024", "rules + formation", colors.amber],
    ["Groen 2026", "lived realities + power", colors.violet],
  ];
  const visuals = items
    .map(([name, note, color], i) => {
      const x = 650 + (i % 2) * 380;
      const y = 250 + Math.floor(i / 2) * 200;
      return `<g>
        ${card(x, y, 330, 145, color, colors.paper)}
        <text class="mono" x="${x + 26}" y="${y + 50}" fill="${color}" font-size="25" font-weight="850">${name}</text>
        <text class="ui" x="${x + 26}" y="${y + 96}" fill="${colors.ink}" font-size="23" font-weight="650">${note}</text>
      </g>`;
    })
    .join("");
  const flow = `<path d="M820 402 L820 438 M1010 322 L1010 438 M820 595 L1010 595" stroke="${colors.lineDark}" stroke-width="4" fill="none"/>`;
  return shell(`${header(slide, 740)}${bulletList(112, 555, slide.bullets ?? [], 480)}${visuals}${flow}`);
}

function renderPrinciples(slide: Slide) {
  const principles = ["transparency", "fairness", "privacy", "responsibility"]
    .map((p, i) => {
      const color = [colors.teal, colors.cobalt, colors.red, colors.amber][i];
      return `<rect x="700" y="${250 + i * 86}" width="265" height="56" rx="8" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="2"/><text class="mono" x="833" y="${286 + i * 86}" fill="${color}" font-size="21" font-weight="850" text-anchor="middle">${p}</text>`;
    })
    .join("");
  const questions = ["what disclose?", "who gets access?", "what protect?", "who is accountable?"]
    .map((q, i) => `<rect x="1080" y="${250 + i * 86}" width="330" height="56" rx="8" fill="#FBFAF7" stroke="${colors.lineDark}" stroke-width="2"/><text class="ui" x="1245" y="${287 + i * 86}" fill="${colors.ink}" font-size="23" font-weight="750" text-anchor="middle">${q}</text>`)
    .join("");
  const arrows = [0, 1, 2, 3].map((i) => `<path d="M982 ${278 + i * 86} L1060 ${278 + i * 86}" stroke="${colors.teal}" stroke-width="4" marker-end="url(#arrow)"/>`).join("");
  return shell(`${header(slide)}${bulletList(112, 545, slide.bullets ?? [], 540)}${principles}${questions}${arrows}`);
}

function renderGovernance(slide: Slide) {
  const memo = miniDoc(700, 255, 300, 330, "Soft promise", colors.amber, ["Use AI responsibly", "Disclose assistance", "Avoid misuse"]);
  const checklist = `<g transform="translate(1090 235)">
    ${card(0, 0, 350, 390, colors.teal, "#F7FCFA")}
    <text class="ui" x="28" y="52" fill="${colors.teal}" font-size="27" font-weight="850">Operational policy</text>
    ${["Allowed uses", "Approved tools", "Privacy boundary", "Evidence required", "Appeal path"].map((t, i) => `<g><rect x="34" y="${92 + i * 54}" width="26" height="26" rx="5" fill="${colors.green}" opacity="0.16" stroke="${colors.green}" stroke-width="2"/><path d="M40 ${106 + i * 54} l7 8 l16 -19" fill="none" stroke="${colors.green}" stroke-width="4" stroke-linecap="round"/><text class="ui" x="78" y="${113 + i * 54}" fill="${colors.ink}" font-size="23" font-weight="700">${t}</text></g>`).join("")}
  </g>`;
  return shell(`${header(slide)}${bulletList(112, 545, slide.bullets ?? [], 540)}${memo}${arrow(1015, 420, 1070, 420)}${checklist}`);
}

function renderRulesJudgment(slide: Slide) {
  const left = miniDoc(650, 250, 340, 300, "Act-centered", colors.cobalt, ["rules", "standards", "procedures", "audits", "privacy policy"]);
  const right = miniDoc(1090, 250, 340, 300, "Agent-centered", colors.green, ["education", "habits", "case judgment", "verification", "disclosure culture"]);
  const bridge = `<g>
    <path d="M992 405 L1082 405" stroke="${colors.teal}" stroke-width="5" marker-end="url(#arrow)"/>
    <rect x="910" y="610" width="330" height="70" rx="8" fill="${colors.teal}" opacity="0.12" stroke="${colors.teal}" stroke-width="2"/>
    <text class="ui" x="1075" y="655" fill="${colors.teal}" font-size="27" font-weight="850" text-anchor="middle">college needs both</text>
  </g>`;
  return shell(`${header(slide, 720)}${bulletList(112, 565, slide.bullets ?? [], 500)}${left}${right}${bridge}`);
}

function renderThreeLenses(slide: Slide) {
  const lenses = [
    ["Principles", "What value is at stake?", colors.teal],
    ["Lived realities", "What changes in class?", colors.cobalt],
    ["Power", "Who gains or is punished?", colors.red],
  ];
  const body = lenses
    .map(([name, note, color], i) => {
      const x = 615 + i * 300;
      return `<g>
        <circle cx="${x + 118}" cy="345" r="96" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="4"/>
        <line x1="${x + 190}" y1="415" x2="${x + 250}" y2="475" stroke="${color}" stroke-width="10" stroke-linecap="round"/>
        <text class="ui" x="${x + 118}" y="570" fill="${color}" font-size="27" font-weight="850" text-anchor="middle">${name}</text>
        ${textBlock(x + 118, 612, wrap(note, 18), 21, colors.ink, 620, 28, "middle")}
      </g>`;
    })
    .join("");
  const doc = miniDoc(875, 310, 260, 120, "Assignment", colors.lineDark, ["AI disclosure report"]);
  return shell(`${header(slide, 700)}${bulletList(112, 565, slide.bullets ?? [], 470)}${body}${doc}`);
}

function renderBoundary(slide: Slide) {
  const lanes = [
    ["Allowed", "AI helps discuss, plan, revise, verify", colors.green],
    ["Borderline", "AI proposes; student owns and defends", colors.amber],
    ["Prohibited", "AI completes; student cannot explain", colors.red],
  ];
  const visual = lanes
    .map(([label, note, color], i) => `<g>
      ${card(650, 235 + i * 150, 760, 104, color, i === 0 ? "#F6FFF8" : i === 1 ? "#FFFBEB" : "#FFF7F7")}
      <text class="mono" x="690" y="${292 + i * 150}" fill="${color}" font-size="28" font-weight="850">${label}</text>
      <text class="ui" x="910" y="${292 + i * 150}" fill="${colors.ink}" font-size="25" font-weight="650">${note}</text>
    </g>`)
    .join("");
  const test = `<rect x="765" y="720" width="530" height="58" rx="8" fill="${colors.teal}" opacity="0.12" stroke="${colors.teal}" stroke-width="2"/><text class="ui" x="1030" y="758" fill="${colors.teal}" font-size="24" font-weight="850" text-anchor="middle">Can the student explain, verify, adapt, and defend?</text>`;
  return shell(`${header(slide, 720)}${bulletList(112, 555, slide.bullets ?? [], 500)}${visual}${test}`);
}

function renderFourPolicy(slide: Slide) {
  const items = [
    ["Allow", "learning support", colors.green],
    ["Disclose", "meaningful assistance", colors.cobalt],
    ["Protect", "private material", colors.red],
    ["Assess", "understanding", colors.teal],
  ];
  const quads = items
    .map(([verb, note, color], i) => {
      const x = 700 + (i % 2) * 365;
      const y = 250 + Math.floor(i / 2) * 195;
      return `<g>
        ${card(x, y, 320, 145, color, colors.paper)}
        <text class="ui" x="${x + 28}" y="${y + 58}" fill="${color}" font-size="34" font-weight="900">${verb}</text>
        <text class="ui" x="${x + 28}" y="${y + 104}" fill="${colors.ink}" font-size="24" font-weight="650">${note}</text>
      </g>`;
    })
    .join("");
  return shell(`${header(slide)}${bulletList(112, 555, slide.bullets ?? [], 520)}${quads}`);
}

function renderAssessment(slide: Slide) {
  const stack = ["report", "disclosure", "prompts/categories", "source checks", "presentation + Q&A", "quiz / demo"]
    .map((t, i) => `<g>
      <rect x="${760 + i * 22}" y="${605 - i * 62}" width="560" height="50" rx="8" fill="${i % 2 ? "#F8FBFF" : "#F7FCFA"}" stroke="${i % 2 ? colors.cobalt : colors.teal}" stroke-width="2"/>
      <text class="mono" x="${790 + i * 22}" y="${637 - i * 62}" fill="${i % 2 ? colors.cobalt : colors.teal}" font-size="20" font-weight="850">${esc(t)}</text>
    </g>`)
    .join("");
  const scale = `<g transform="translate(1360 250)">
    <line x1="0" y1="0" x2="0" y2="430" stroke="${colors.lineDark}" stroke-width="5"/>
    <circle cx="0" cy="70" r="15" fill="${colors.green}"/>
    <circle cx="0" cy="220" r="15" fill="${colors.amber}"/>
    <circle cx="0" cy="370" r="15" fill="${colors.red}"/>
    <text class="ui" x="34" y="78" fill="${colors.green}" font-size="22" font-weight="800">understands</text>
    <text class="ui" x="34" y="228" fill="${colors.amber}" font-size="22" font-weight="800">unclear</text>
    <text class="ui" x="34" y="378" fill="${colors.red}" font-size="22" font-weight="800">outsourced</text>
  </g>`;
  return shell(`${header(slide)}${bulletList(112, 555, slide.bullets ?? [], 520)}${stack}${scale}`);
}

function renderPower(slide: Slide) {
  const nodes = [
    ["Student", 1010, 295, colors.green],
    ["Teacher", 780, 470, colors.cobalt],
    ["University", 1240, 470, colors.teal],
    ["Vendor", 1010, 650, colors.red],
  ];
  const edges = `<path d="M1010 325 L790 445 M1010 325 L1230 445 M790 500 L990 630 M1230 500 L1030 630 M790 470 L1240 470" stroke="${colors.lineDark}" stroke-width="4" fill="none"/>`;
  const visual = nodes
    .map(([name, x, y, color]) => `<g>
      <circle cx="${x}" cy="${y}" r="72" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="3"/>
      <text class="ui" x="${x}" y="${Number(y) + 8}" fill="${color}" font-size="25" font-weight="900" text-anchor="middle">${name}</text>
    </g>`)
    .join("");
  const note = `<rect x="790" y="735" width="450" height="54" rx="8" fill="${colors.red}" opacity="0.10" stroke="${colors.red}" stroke-width="2"/><text class="ui" x="1015" y="770" fill="${colors.red}" font-size="23" font-weight="850" text-anchor="middle">Ambiguity shifts risk downward</text>`;
  return shell(`${header(slide)}${bulletList(112, 555, slide.bullets ?? [], 530)}${edges}${visual}${note}`);
}

function renderHomework(slide: Slide) {
  const packet = `<g transform="translate(720 235)">
    ${card(0, 0, 570, 470, colors.ink, colors.paper)}
    <text class="ui" x="34" y="62" fill="${colors.ink}" font-size="32" font-weight="900">Assignment packet</text>
    ${["Final report", "AI disclosure appendix", "3 prompt excerpts / summaries", "Source verification checklist", "Reflection on learning", "5-minute presentation"].map((t, i) => `<g><rect x="40" y="${108 + i * 55}" width="24" height="24" rx="5" fill="${colors.teal}" opacity="0.14" stroke="${colors.teal}" stroke-width="2"/><text class="ui" x="82" y="${128 + i * 55}" fill="${colors.ink}" font-size="24" font-weight="700">${t}</text></g>`).join("")}
  </g>`;
  return shell(`${header(slide)}${bulletList(112, 560, slide.bullets ?? [], 520)}${packet}`);
}

function renderClosing(slide: Slide) {
  const verbs = ["Allow", "Disclose", "Protect", "Assess"]
    .map((verb, i) => {
      const x = 185 + i * 310;
      const color = [colors.green, colors.cobalt, colors.red, colors.teal][i];
      return `<g>
        <rect x="${x}" y="580" width="250" height="88" rx="8" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="2"/>
        <text class="ui" x="${x + 125}" y="636" fill="${color}" font-size="34" font-weight="900" text-anchor="middle">${verb}</text>
      </g>`;
    })
    .join("");
  return shell(`${badge(112, 110, slide.stage)}${textBlock(112, 288, slide.title, 72, colors.ink, 900, 84)}${textBlock(118, 492, linesOf(slide.subtitle), 34, colors.muted, 620, 44)}${verbs}${bulletList(220, 700, slide.bullets ?? [], 1120)}`);
}

function renderGeneric(slide: Slide) {
  switch (slide.filename) {
    case "01-slide-cover":
      return renderCover(slide);
    case "02-slide-opening-case":
      return renderCase(slide);
    case "03-slide-wrong-question":
      return renderWrongQuestion(slide);
    case "04-slide-four-paper-map":
      return renderFourPaperMap(slide);
    case "05-slide-principles-not-policy":
      return renderPrinciples(slide);
    case "06-slide-governance-needs-teeth":
      return renderGovernance(slide);
    case "07-slide-rules-plus-judgment":
      return renderRulesJudgment(slide);
    case "08-slide-three-lenses":
      return renderThreeLenses(slide);
    case "09-slide-use-boundary":
      return renderBoundary(slide);
    case "10-slide-four-part-policy":
      return renderFourPolicy(slide);
    case "11-slide-assessment-redesign":
      return renderAssessment(slide);
    case "12-slide-fairness-and-power":
      return renderPower(slide);
    case "13-slide-homework":
      return renderHomework(slide);
    case "14-slide-closing":
      return renderClosing(slide);
    default:
      return shell(`${header(slide)}${bulletList(112, 555, slide.bullets ?? [], 600)}`);
  }
}

function promptFor(slide: Slide) {
  return `# ${slide.filename}

Use case: higher-education AI ethics teaching deck
Asset type: 16:9 presentation slide
Primary request: Render a clean academic-policy slide in English.
Style: warm white paper background, high-contrast black text, teal/cobalt/amber/red/green accents, structured cards, decision diagrams, no logos, no decorative blobs, no stock AI imagery.
Slide type: ${slide.type}
Layout: ${slide.layout}
Headline:
${slide.title.map((line) => `- ${line}`).join("\n")}
Subtitle:
${linesOf(slide.subtitle).map((line) => `- ${line}`).join("\n")}
Body:
${(slide.bullets ?? []).map((line) => `- ${line}`).join("\n")}
Visual direction: ${slide.visual}
Execution note: This deck renders locally from SVG for exact text fidelity; this prompt records the intended image-generation spec for reproducibility.`;
}

async function createContactSheet() {
  const cols = 4;
  const thumbW = 320;
  const thumbH = 180;
  const labelH = 46;
  const gap = 24;
  const rows = Math.ceil(slides.length / cols);
  const sheetW = cols * thumbW + (cols + 1) * gap;
  const sheetH = rows * (thumbH + labelH) + (rows + 1) * gap;
  const composites: sharp.OverlayOptions[] = [];

  for (const [i, slide] of slides.entries()) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const left = gap + col * (thumbW + gap);
    const top = gap + row * (thumbH + labelH + gap);
    const pngPath = join(DECK_DIR, `${slide.filename}.png`);
    const thumb = await sharp(pngPath).resize(thumbW, thumbH, { fit: "cover" }).png().toBuffer();
    const label = `0${i + 1}`.slice(-2) + " " + slide.stage;
    const labelSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${thumbW}" height="${labelH}">
      <style>.ui{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Arial,sans-serif;letter-spacing:0}</style>
      <rect width="${thumbW}" height="${labelH}" fill="#FFFFFF"/>
      <text class="ui" x="0" y="30" fill="${colors.ink}" font-size="18" font-weight="800">${esc(label)}</text>
    </svg>`;
    composites.push({ input: thumb, left, top });
    composites.push({ input: Buffer.from(labelSvg), left, top: top + thumbH + 8 });
  }

  await sharp({
    create: {
      width: sheetW,
      height: sheetH,
      channels: 4,
      background: colors.bg,
    },
  })
    .composite(composites)
    .png()
    .toFile(join(DECK_DIR, "contact-sheet.png"));
}

async function renderAll() {
  ensureDir(SVG_DIR);
  ensureDir(PROMPTS_DIR);
  ensureDir(BACKUP_DIR);

  for (const slide of slides) {
    const svgPath = join(SVG_DIR, `${slide.filename}.svg`);
    const pngPath = join(DECK_DIR, `${slide.filename}.png`);
    const promptPath = join(PROMPTS_DIR, `${slide.filename}.md`);
    const svg = renderGeneric(slide);

    backupIfExists(svgPath);
    backupIfExists(pngPath);
    backupIfExists(promptPath);

    writeFileSync(svgPath, svg, "utf8");
    writeFileSync(promptPath, promptFor(slide), "utf8");

    const result = Bun.spawnSync([
      "sips",
      "-s",
      "format",
      "png",
      svgPath,
      "--out",
      pngPath,
    ]);

    if (!result.success) {
      throw new Error(`sips failed for ${slide.filename}: ${result.stderr.toString()}`);
    }
    console.log(`Rendered ${slide.filename}.png`);
  }

  backupIfExists(join(DECK_DIR, "contact-sheet.png"));
  await createContactSheet();
  console.log("Rendered contact-sheet.png");
}

renderAll().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
