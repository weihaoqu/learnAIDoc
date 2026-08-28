import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DECK_DIR = import.meta.dir;
const SVG_DIR = join(DECK_DIR, "svgs");
const PROMPTS_DIR = join(DECK_DIR, "prompts");
const W = 1600;
const H = 900;

const colors = {
  bg: "#F5F0E6",
  paper: "#FFFCF4",
  ink: "#171717",
  muted: "#5E6670",
  line: "#D8D0C0",
  teal: "#2F7373",
  maroon: "#722F37",
  brown: "#8B7355",
  cobalt: "#2563EB",
  amber: "#B7791F",
  red: "#B42318",
  green: "#16803C",
  violet: "#6D28D9",
};

type Slide = {
  filename: string;
  stage: string;
  title: string[];
  subtitle?: string | string[];
  bullets?: string[];
  visual: string;
};

const slides: Slide[] = [
  {
    filename: "01-slide-cover",
    stage: "agent ai survey",
    title: ["Agent AI Is Not", "Just a Chatbot"],
    subtitle: 'A grill-based reading of "Agent AI: Surveying the Horizons of Multimodal Interaction"',
    bullets: ["perception", "environment", "action", "feedback"],
    visual: "Three linked cards arranged around an environment.",
  },
  {
    filename: "02-slide-paper-map",
    stage: "paper map",
    title: ["The Paper Gives a Map,", "Not a Finished Machine"],
    subtitle: "Use it as a conceptual vocabulary, not a 2026 state-of-the-art catalog.",
    bullets: [
      "January 2024 survey",
      'Moves beyond "LLM + tools + memory"',
      "Centers multimodal perception, grounded environments, action, and feedback",
    ],
    visual: "Paper-to-classroom vocabulary map.",
  },
  {
    filename: "03-slide-multimodal-vs-agentic",
    stage: "grill correction",
    title: ["Multimodal Is Not", "Automatically Agentic"],
    subtitle: "The difference is the task loop, not just the media type.",
    bullets: [
      "Multimodal: understands text, image, video, audio, signals",
      "Agentic: chooses actions from perception, state, goal, feedback",
      "A caption is not yet an agent",
    ],
    visual: "Two-column comparison between multimodal ability and agentic ability.",
  },
  {
    filename: "04-slide-classroom-video-test",
    stage: "classroom test",
    title: ["The Classroom", "Video Test"],
    subtitle: 'Saying "three students look confused" is perception, not the full agent loop.',
    bullets: [
      "Describe confusion: multimodal perception",
      "Reteach + quiz + observe: agentic loop",
      "Description alone is not enough",
    ],
    visual: "Scenario branch from observation to action loop.",
  },
  {
    filename: "05-slide-agent-loop",
    stage: "agent loop",
    title: ["The Agent Loop", "Has Six Questions"],
    subtitle: "This is the reusable reading checklist for multimodal agents.",
    bullets: ["Perception", "Environment", "Action", "Feedback", "Evaluation", "Ethical risk"],
    visual: "Circular six-question loop.",
  },
  {
    filename: "06-slide-education-stakes",
    stage: "ethics stakes",
    title: ["When Perception Becomes Action,", "Ethics Gets Harder"],
    subtitle: "Wrong perception can become a classroom consequence.",
    bullets: [
      "Privacy: screens, faces, grades, voice, teacher material",
      "Fairness: posture, accent, disability, lighting, camera quality",
      "Accountability: who authorized the action and who corrects it?",
    ],
    visual: "Risk flow from sensitive signal to AI interpretation to consequence.",
  },
  {
    filename: "07-slide-helps-vs-replaces",
    stage: "learning boundary",
    title: ["AI Helps Learning When", "Students Still Own Thinking"],
    subtitle: "The boundary is observable student understanding.",
    bullets: [
      "Help: explain, question, plan, revise, verify",
      "Replace: generate final answer without understanding",
      "Test: explain, verify, adapt, defend",
    ],
    visual: "Forked learning path.",
  },
  {
    filename: "08-slide-policy-not-allow-ban",
    stage: "policy",
    title: ['"AI Allowed" and "AI Banned"', "Are Both Too Weak"],
    subtitle: "Agentic systems need operational boundaries, not slogans.",
    bullets: [
      "Approved tools",
      "Allowed and forbidden uses",
      "Privacy-safe disclosure",
      "Explicit exam and authorship boundaries",
    ],
    visual: "Binary policy replaced by policy matrix.",
  },
  {
    filename: "09-slide-governance-checklist",
    stage: "governance",
    title: ["Classroom Agents Need", "Boundaries Before Deployment"],
    subtitle: "Consent, audit, authority, and material protection must be explicit.",
    bullets: [
      "Consent before recording or analyzing people",
      "Logs and audits for recommendations and actions",
      "Human authority for grading, discipline, accommodations, appeals",
      "No unauthorized upload of course or peer material",
    ],
    visual: "Practical governance checklist.",
  },
  {
    filename: "10-slide-closing",
    stage: "takeaway",
    title: ["From Advice", "to Task Loop"],
    subtitle: "The upgrade is AI participating in perception, action, and feedback.",
    bullets: [
      "Chatbot: tells humans what to do",
      "Agent AI: participates in the task loop",
      "Governance: who authorized, who checks, who is accountable?",
    ],
    visual: "Advice box transforms into accountable task loop.",
  },
];

function ensure(path: string) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
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
  for (const token of tokens) {
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

function asLines(input?: string | string[]) {
  if (!input) return [];
  return Array.isArray(input) ? input : [input];
}

function text(x: number, y: number, lines: string[], size: number, color = colors.ink, weight = 700, lh = Math.round(size * 1.2), anchor: "start" | "middle" = "start", cls = "ui") {
  return lines
    .map((line, i) => `<text class="${cls}" x="${x}" y="${y + i * lh}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(line)}</text>`)
    .join("");
}

function card(x: number, y: number, w: number, h: number, stroke = colors.line, fill = colors.paper) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

function badge(label: string) {
  return `<g>
    <rect x="88" y="74" width="${Math.max(170, measure(label) * 12 + 44)}" height="44" rx="8" fill="${colors.teal}" opacity="0.13" stroke="${colors.teal}" stroke-width="1.5"/>
    <text class="mono" x="110" y="103" fill="${colors.teal}" font-size="19" font-weight="850">${esc(label.toUpperCase())}</text>
  </g>`;
}

function bulletList(x: number, y: number, bullets: string[], maxUnits = 42, color = colors.ink) {
  let out = "";
  let cy = y;
  for (const item of bullets) {
    const lines = wrap(item, maxUnits);
    out += `<circle cx="${x}" cy="${cy - 8}" r="6" fill="${colors.teal}"/>`;
    out += text(x + 25, cy, lines, 25, color, 610, 32);
    cy += lines.length * 32 + 18;
  }
  return out;
}

function defs() {
  return `<defs>
    <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M46 0 L0 0 0 46" fill="none" stroke="${colors.line}" stroke-width="1" opacity="0.42"/>
    </pattern>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${colors.teal}"/>
    </marker>
  </defs>`;
}

function shell(inner: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${defs()}
  <style>
    .ui { font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, sans-serif; letter-spacing: 0; }
    .mono { font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace; letter-spacing: 0; }
  </style>
  <rect width="${W}" height="${H}" fill="${colors.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect x="42" y="42" width="1516" height="816" rx="8" fill="#FFFCF4" opacity="0.82"/>
  <path d="M42 150 H1558" stroke="${colors.line}" stroke-width="2"/>
  ${inner}
</svg>`;
}

function header(slide: Slide, maxUnits = 30) {
  const sub = asLines(slide.subtitle).flatMap((line) => wrap(line, 62));
  return `${badge(slide.stage)}
    ${text(86, 212, slide.title, 58, colors.ink, 880, 68)}
    ${sub.length ? text(90, 212 + slide.title.length * 68 + 24, sub, 27, colors.muted, 520, 34) : ""}`;
}

function pill(x: number, y: number, label: string, color: string) {
  return `<g>
    <rect x="${x}" y="${y}" width="220" height="70" rx="8" fill="${color}" opacity="0.13" stroke="${color}" stroke-width="2"/>
    <text class="ui" x="${x + 110}" y="${y + 44}" fill="${color}" font-size="28" font-weight="850" text-anchor="middle">${esc(label)}</text>
  </g>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, color = colors.teal) {
  return `<path d="M${x1} ${y1} C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="4" marker-end="url(#arrow)"/>`;
}

function renderCover(slide: Slide) {
  const loop = `<g transform="translate(875 250)">
    ${card(0, 0, 520, 360, colors.teal, "#F6FFFB")}
    <text class="ui" x="260" y="72" fill="${colors.teal}" font-size="32" font-weight="900" text-anchor="middle">TASK LOOP</text>
    ${pill(60, 120, "Perception", colors.cobalt)}
    ${pill(60, 235, "Feedback", colors.green)}
    ${pill(300, 235, "Action", colors.maroon)}
    ${arrow(280, 155, 342, 235)}
    ${arrow(300, 270, 285, 270, colors.green)}
    ${arrow(170, 235, 170, 190, colors.cobalt)}
  </g>`;
  return shell(`${badge(slide.stage)}${text(90, 300, slide.title, 76, colors.ink, 900, 88)}${text(94, 520, wrap(String(slide.subtitle), 48), 30, colors.muted, 540, 40)}${bulletList(135, 685, slide.bullets ?? [], 24)}${loop}`);
}

function renderMap(slide: Slide) {
  const formula = `<g transform="translate(780 250)">
    ${card(0, 0, 650, 410, colors.brown, colors.paper)}
    <text class="mono" x="44" y="68" fill="${colors.maroon}" font-size="26" font-weight="850">READING HEURISTIC</text>
    ${["foundation model", "+ multimodal perception", "+ grounded environment", "+ action prediction", "+ feedback loop", "+ evaluation in context"].map((line, i) => text(62, 126 + i * 44, [line], 30, i === 0 ? colors.ink : colors.teal, 760)).join("")}
  </g>`;
  return shell(`${header(slide)}${bulletList(104, 535, slide.bullets ?? [], 38)}${formula}`);
}

function renderCompare(slide: Slide) {
  const left = `<g transform="translate(650 250)">
    ${card(0, 0, 360, 380, colors.cobalt, "#F7FAFF")}
    <text class="ui" x="180" y="65" fill="${colors.cobalt}" font-size="33" font-weight="900" text-anchor="middle">Multimodal</text>
    ${text(44, 130, wrap("Understands different sources of information: text, image, video, audio, screen state.", 27), 25, colors.ink, 600, 34)}
  </g>`;
  const right = `<g transform="translate(1070 250)">
    ${card(0, 0, 360, 380, colors.teal, "#F5FFFC")}
    <text class="ui" x="180" y="65" fill="${colors.teal}" font-size="33" font-weight="900" text-anchor="middle">Agentic</text>
    ${text(44, 130, wrap("Uses perception plus state, goal, action, and feedback to decide what happens next.", 27), 25, colors.ink, 600, 34)}
  </g>`;
  const warning = `<rect x="835" y="690" width="410" height="58" rx="8" fill="${colors.amber}" opacity="0.13" stroke="${colors.amber}" stroke-width="2"/>
  <text class="ui" x="1040" y="728" fill="${colors.amber}" font-size="25" font-weight="850" text-anchor="middle">More media is not the same as agency</text>`;
  return shell(`${header(slide, 28)}${bulletList(104, 560, slide.bullets ?? [], 35)}${left}${right}${warning}`);
}

function renderClassroom(slide: Slide) {
  const observation = `<g transform="translate(690 255)">
    ${card(0, 0, 300, 155, colors.cobalt, "#F7FAFF")}
    <text class="ui" x="150" y="62" fill="${colors.cobalt}" font-size="29" font-weight="900" text-anchor="middle">Video input</text>
    <text class="ui" x="150" y="108" fill="${colors.ink}" font-size="23" font-weight="650" text-anchor="middle">students look confused</text>
  </g>`;
  const describe = `<g transform="translate(1090 210)">
    ${card(0, 0, 340, 142, colors.brown, colors.paper)}
    <text class="ui" x="170" y="58" fill="${colors.brown}" font-size="27" font-weight="900" text-anchor="middle">Describe only</text>
    <text class="ui" x="170" y="104" fill="${colors.ink}" font-size="22" font-weight="650" text-anchor="middle">multimodal model</text>
  </g>`;
  const loop = `<g transform="translate(1090 435)">
    ${card(0, 0, 340, 210, colors.teal, "#F5FFFC")}
    <text class="ui" x="170" y="52" fill="${colors.teal}" font-size="27" font-weight="900" text-anchor="middle">Act + adapt</text>
    ${text(54, 100, ["reteach", "quiz", "observe", "adjust"], 24, colors.ink, 690, 34)}
    <text class="ui" x="170" y="190" fill="${colors.teal}" font-size="22" font-weight="850" text-anchor="middle">agentic loop</text>
  </g>`;
  return shell(`${header(slide)}${bulletList(104, 560, slide.bullets ?? [], 36)}${observation}${arrow(995, 315, 1075, 280, colors.brown)}${arrow(995, 335, 1075, 520)}${describe}${loop}`);
}

function renderLoop(slide: Slide) {
  const items = [
    ["Perception", 1020, 250, colors.cobalt],
    ["Environment", 1260, 365, colors.brown],
    ["Action", 1205, 620, colors.maroon],
    ["Feedback", 835, 620, colors.green],
    ["Evaluation", 780, 365, colors.teal],
    ["Ethical risk", 1020, 485, colors.red],
  ];
  const nodes = items.map(([label, x, y, color]) => `<g>
    <circle cx="${x}" cy="${y}" r="78" fill="${color}" opacity="0.13" stroke="${color}" stroke-width="3"/>
    <text class="ui" x="${x}" y="${Number(y) + 9}" fill="${color}" font-size="24" font-weight="900" text-anchor="middle">${label}</text>
  </g>`).join("");
  const lines = `<path d="M1090 285 L1190 335 L1220 548 L900 590 L820 435 L940 292 Z" fill="none" stroke="${colors.line}" stroke-width="5"/>`;
  return shell(`${header(slide, 29)}${bulletList(104, 560, slide.bullets ?? [], 28)}${lines}${nodes}`);
}

function renderRisk(slide: Slide) {
  const flow = [
    ["Sensitive signal", "screen / face / voice / grades", colors.cobalt],
    ["AI interpretation", "confused / disengaged / suspicious", colors.amber],
    ["Classroom consequence", "reteach / flag / grade / report", colors.red],
  ].map(([title, body, color], i) => {
    const x = 650 + i * 300;
    return `<g>
      ${card(x, 305, 260, 185, color, colors.paper)}
      <text class="ui" x="${x + 130}" y="365" fill="${color}" font-size="26" font-weight="900" text-anchor="middle">${title}</text>
      ${text(x + 130, 420, wrap(body, 19), 22, colors.ink, 600, 29, "middle")}
      ${i < 2 ? arrow(x + 270, 397, x + 292, 397, color) : ""}
    </g>`;
  }).join("");
  const callout = `<rect x="745" y="650" width="650" height="74" rx="8" fill="${colors.red}" opacity="0.11" stroke="${colors.red}" stroke-width="2"/>
    <text class="ui" x="1070" y="696" fill="${colors.red}" font-size="27" font-weight="900" text-anchor="middle">Wrong perception can become wrong action</text>`;
  return shell(`${header(slide, 32)}${bulletList(104, 545, slide.bullets ?? [], 39)}${flow}${callout}`);
}

function renderLearning(slide: Slide) {
  const left = `<g transform="translate(640 250)">
    ${card(0, 0, 370, 370, colors.green, "#F6FFF8")}
    <text class="ui" x="185" y="62" fill="${colors.green}" font-size="31" font-weight="900" text-anchor="middle">Helps learning</text>
    ${text(45, 122, ["explain", "question", "plan", "revise", "verify"], 28, colors.ink, 700, 43)}
    <text class="ui" x="185" y="330" fill="${colors.green}" font-size="22" font-weight="850" text-anchor="middle">student can defend</text>
  </g>`;
  const right = `<g transform="translate(1060 250)">
    ${card(0, 0, 370, 370, colors.red, "#FFF7F7")}
    <text class="ui" x="185" y="62" fill="${colors.red}" font-size="31" font-weight="900" text-anchor="middle">Replaces learning</text>
    ${text(45, 122, wrap("AI generates the main answer; student submits without understanding.", 26), 28, colors.ink, 700, 39)}
    <text class="ui" x="185" y="330" fill="${colors.red}" font-size="22" font-weight="850" text-anchor="middle">student cannot defend</text>
  </g>`;
  const test = `<rect x="730" y="700" width="610" height="58" rx="8" fill="${colors.teal}" opacity="0.12" stroke="${colors.teal}" stroke-width="2"/>
    <text class="ui" x="1035" y="738" fill="${colors.teal}" font-size="25" font-weight="900" text-anchor="middle">Can they explain, verify, adapt, and defend?</text>`;
  return shell(`${header(slide, 32)}${bulletList(104, 555, slide.bullets ?? [], 38)}${left}${right}${test}`);
}

function renderPolicy(slide: Slide) {
  const weak = `<g transform="translate(650 260)">
    ${card(0, 0, 300, 290, colors.red, "#FFF7F7")}
    <text class="ui" x="150" y="90" fill="${colors.red}" font-size="36" font-weight="900" text-anchor="middle">ALLOW</text>
    <line x1="70" y1="145" x2="230" y2="145" stroke="${colors.line}" stroke-width="4"/>
    <text class="ui" x="150" y="210" fill="${colors.red}" font-size="36" font-weight="900" text-anchor="middle">BAN</text>
  </g>`;
  const matrix = `<g transform="translate(1030 230)">
    ${card(0, 0, 400, 375, colors.teal, "#F5FFFC")}
    <text class="ui" x="200" y="55" fill="${colors.teal}" font-size="30" font-weight="900" text-anchor="middle">Policy matrix</text>
    ${["Approved tools", "Allowed uses", "Forbidden uses", "Disclosure", "Exam boundary"].map((t, i) => `<g><rect x="42" y="${92 + i * 50}" width="26" height="26" rx="5" fill="${colors.teal}" opacity="0.15" stroke="${colors.teal}" stroke-width="2"/><text class="ui" x="82" y="${114 + i * 50}" fill="${colors.ink}" font-size="24" font-weight="700">${t}</text></g>`).join("")}
  </g>`;
  return shell(`${header(slide, 29)}${bulletList(104, 560, slide.bullets ?? [], 36)}${weak}${arrow(958, 405, 1015, 405)}${matrix}`);
}

function renderChecklist(slide: Slide) {
  const checks = (slide.bullets ?? []).map((item, i) => {
    const color = [colors.cobalt, colors.teal, colors.maroon, colors.red][i] ?? colors.teal;
    const y = 235 + i * 112;
    return `<g>
      ${card(650, y, 780, 86, color, colors.paper)}
      <rect x="682" y="${y + 25}" width="34" height="34" rx="6" fill="${color}" opacity="0.13" stroke="${color}" stroke-width="2"/>
      <path d="M690 ${y + 43} l9 10 l20 -24" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
      ${text(742, y + 56, wrap(item, 48), 24, colors.ink, 680, 31)}
    </g>`;
  }).join("");
  return shell(`${header(slide, 30)}${checks}`);
}

function renderClosing(slide: Slide) {
  const before = `<g transform="translate(220 575)">
    ${card(0, 0, 420, 120, colors.brown, colors.paper)}
    <text class="ui" x="210" y="51" fill="${colors.brown}" font-size="30" font-weight="900" text-anchor="middle">Chatbot</text>
    <text class="ui" x="210" y="91" fill="${colors.ink}" font-size="24" font-weight="650" text-anchor="middle">gives advice</text>
  </g>`;
  const after = `<g transform="translate(950 510)">
    ${card(0, 0, 420, 250, colors.teal, "#F5FFFC")}
    <text class="ui" x="210" y="55" fill="${colors.teal}" font-size="30" font-weight="900" text-anchor="middle">Agent AI</text>
    ${text(72, 112, ["perceives", "acts", "gets feedback"], 28, colors.ink, 720, 42)}
    <text class="ui" x="210" y="225" fill="${colors.red}" font-size="22" font-weight="850" text-anchor="middle">needs accountability</text>
  </g>`;
  return shell(`${badge(slide.stage)}${text(110, 270, slide.title, 76, colors.ink, 900, 88)}${text(116, 488, wrap(String(slide.subtitle), 50), 31, colors.muted, 540, 39)}${before}${arrow(655, 635, 930, 635)}${after}`);
}

function render(slide: Slide) {
  switch (slide.filename) {
    case "01-slide-cover":
      return renderCover(slide);
    case "02-slide-paper-map":
      return renderMap(slide);
    case "03-slide-multimodal-vs-agentic":
      return renderCompare(slide);
    case "04-slide-classroom-video-test":
      return renderClassroom(slide);
    case "05-slide-agent-loop":
      return renderLoop(slide);
    case "06-slide-education-stakes":
      return renderRisk(slide);
    case "07-slide-helps-vs-replaces":
      return renderLearning(slide);
    case "08-slide-policy-not-allow-ban":
      return renderPolicy(slide);
    case "09-slide-governance-checklist":
      return renderChecklist(slide);
    case "10-slide-closing":
      return renderClosing(slide);
    default:
      return shell(`${header(slide)}${bulletList(104, 560, slide.bullets ?? [], 42)}`);
  }
}

function prompt(slide: Slide) {
  return `# ${slide.filename}

Use case: LearnAI teaching deck about Agent AI survey and Q's grill-learning path.
Asset type: 16:9 presentation slide.
Style: intuition-machine; aged cream background; clear technical cards; teal, maroon, cobalt, brown accents; no logos; no photorealistic people; no decorative gradients.
Headline:
${slide.title.map((line) => `- ${line}`).join("\n")}
Subtitle:
${asLines(slide.subtitle).map((line) => `- ${line}`).join("\n")}
Body:
${(slide.bullets ?? []).map((line) => `- ${line}`).join("\n")}
Visual direction: ${slide.visual}
Execution note: This deck renders locally from SVG for exact text fidelity; this prompt records the intended visual spec.`;
}

function contactSheetSvg() {
  const cols = 5;
  const thumbW = 280;
  const thumbH = 157.5;
  const gap = 28;
  const labelH = 44;
  const rows = 2;
  const sheetW = cols * thumbW + (cols + 1) * gap;
  const sheetH = rows * (thumbH + labelH) + (rows + 1) * gap;
  const cells = slides.map((slide, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = gap + col * (thumbW + gap);
    const y = gap + row * (thumbH + labelH + gap);
    const imageData = readFileSync(join(DECK_DIR, `${slide.filename}.png`)).toString("base64");
    return `<g>
      <image href="data:image/png;base64,${imageData}" x="${x}" y="${y}" width="${thumbW}" height="${thumbH}" preserveAspectRatio="xMidYMid slice"/>
      <text class="ui" x="${x}" y="${y + thumbH + 30}" fill="${colors.ink}" font-size="18" font-weight="800">${String(i + 1).padStart(2, "0")} ${esc(slide.stage)}</text>
    </g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${sheetW}" height="${sheetH}" viewBox="0 0 ${sheetW} ${sheetH}">
    <style>.ui{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Arial,sans-serif;letter-spacing:0}</style>
    <rect width="${sheetW}" height="${sheetH}" fill="${colors.bg}"/>
    ${cells}
  </svg>`;
}

function runSips(input: string, output: string) {
  const result = Bun.spawnSync(["sips", "-s", "format", "png", input, "--out", output]);
  if (!result.success) {
    throw new Error(`sips failed for ${input}: ${result.stderr.toString()}`);
  }
}

ensure(SVG_DIR);
ensure(PROMPTS_DIR);

for (const slide of slides) {
  const svgPath = join(SVG_DIR, `${slide.filename}.svg`);
  const pngPath = join(DECK_DIR, `${slide.filename}.png`);
  writeFileSync(svgPath, render(slide), "utf8");
  writeFileSync(join(PROMPTS_DIR, `${slide.filename}.md`), prompt(slide), "utf8");
  runSips(svgPath, pngPath);
  console.log(`Rendered ${slide.filename}.png`);
}

const sheetSvgPath = join(DECK_DIR, "contact-sheet.svg");
writeFileSync(sheetSvgPath, contactSheetSvg(), "utf8");
runSips(sheetSvgPath, join(DECK_DIR, "contact-sheet.png"));
console.log("Rendered contact-sheet.png");
