import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = import.meta.dir;
const SVG_DIR = join(DIR, "svgs");
const PROMPT_DIR = join(DIR, "prompts");
const W = 1600;
const H = 900;

const C = {
  bg: "#F5F0E6",
  paper: "#FFFCF4",
  ink: "#171717",
  muted: "#5E6670",
  line: "#D8D0C0",
  teal: "#2F7373",
  maroon: "#722F37",
  brown: "#8B7355",
  cobalt: "#2563EB",
  red: "#B42318",
  green: "#16803C",
  amber: "#B7791F",
  blueBg: "#F3F7FF",
  tealBg: "#F2FBF8",
  redBg: "#FFF5F3",
  amberBg: "#FFF9E8",
};

type Slide = {
  file: string;
  stage: string;
  title: string[];
  subtitle: string;
  labels: string[];
  evidence: string;
  objective: string;
  notes: string;
  visual: string;
};

const slides: Slide[] = [
  {
    file: "01-slide-cover",
    stage: "feedback contracts",
    title: ["Feedback Changes What", "an Agent Can Learn"],
    subtitle: "Stanford CS329A Part 4 - tools, executable tests, and constitutional preferences",
    labels: ["Tool observation", "Execution test", "AI preference"],
    evidence: "00:07-01:48 / 60:28-63:20",
    objective: "Distinguish three feedback sources before comparing their algorithms.",
    notes: "ReAct, RLEF, and Constitutional AI all create feedback loops, but their signals mean different things. A search observation adds information, a test reports covered executable behavior, and a constitutional preference expresses a normative judgment. This three-contract taxonomy is a teaching synthesis.",
    visual: "One agent update loop connected to three distinct feedback ports, each with a visible signal boundary.",
  },
  {
    file: "02-slide-react-loop",
    stage: "react loop",
    title: ["ReAct Lets Evidence Change", "the Next Decision"],
    subtitle: "Thought selects an action; the environment returns an observation; the state updates.",
    labels: ["Thought", "Action", "Observation", "Updated state"],
    evidence: "01:48-12:03 + arXiv:2210.03629",
    objective: "Explain the interleaved Thought-Action-Observation control loop.",
    notes: "The important design move is that an observation can alter the next decision. Reasoning without tools can remain ungrounded; acting without deliberation can be myopic. Interleaving does not guarantee either the reasoning or the action is correct.",
    visual: "Circular Thought-Action-Observation loop surrounding a state register whose revision is visible.",
  },
  {
    file: "03-slide-observations-not-truth",
    stage: "evidence boundary",
    title: ["A Tool Observation Is Evidence,", "Not Truth"],
    subtitle: "Retrieval can be relevant or misleading; interpretation still determines the state update.",
    labels: ["Provenance", "Relevance", "Interpretation", "State update"],
    evidence: "09:07-12:54 / 18:37-20:04",
    objective: "Prevent the misconception that adding a tool automatically grounds an answer.",
    notes: "A tool can return true but irrelevant information, stale information, or evidence the model misreads. Grounding requires provenance, relevance, and interpretation checks.",
    visual: "Evidence packets pass through provenance and relevance gates before interpretation updates state; one packet is rejected.",
  },
  {
    file: "04-slide-action-contract",
    stage: "tool boundary",
    title: ["Tool Use Needs an Explicit", "Action Contract"],
    subtitle: "The operating boundary must define schemas, observations, budgets, recovery, and permissions.",
    labels: ["Valid actions", "Schemas", "Budgets", "Recovery", "Permissions", "Logs"],
    evidence: "12:54-17:39 / TEACHING SYNTHESIS",
    objective: "Identify the interface contract required around a tool-using agent.",
    notes: "The ReAct benchmarks use small action spaces such as search, lookup, and finish. The six-part deployable action contract shown here is an explicit teaching synthesis grounded in the lecture discussion; it is not a named ReAct result.",
    visual: "Six contract clauses surround a typed tool socket; an invalid action is blocked outside the boundary.",
  },
  {
    file: "05-slide-trajectory-risk",
    stage: "trajectory risk",
    title: ["One Early Error Can Contaminate", "the Whole Trajectory"],
    subtitle: "Longer loops create more chances to recover and more chances to compound a mistake.",
    labels: ["Bad observation", "Wrong state", "Risky action", "Backtrack"],
    evidence: "18:37-27:32 + arXiv:2210.03629",
    objective: "Show how retrieval and reasoning failures propagate across a trajectory.",
    notes: "ReAct reduces some hallucination failures in the reported tasks, but it adds search and reasoning-over-observation failures. An early bad observation can contaminate later state and action. Backtracking only helps when the system can identify a state worth restoring.",
    visual: "A six-step trajectory turns red after a misleading observation; a dashed recovery branch restores an earlier state.",
  },
  {
    file: "06-slide-rlef-loop",
    stage: "execution feedback",
    title: ["RLEF Teaches Code Models", "to Repair, Not Just Resample"],
    subtitle: "A new attempt is conditioned on execution evidence from the previous attempt.",
    labels: ["Code attempt", "Execute", "Failure evidence", "Targeted repair"],
    evidence: "27:32-37:47 + arXiv:2410.02089",
    objective: "Explain iterative code repair under execution feedback.",
    notes: "RLEF generates code, runs public tests, exposes failures, and conditions the next turn on that feedback. The reported solve-rate gains are tied to competitive-programming tasks, specific models, tests, and budgets; the slide intentionally omits a universal percentage.",
    visual: "A code-attempt/test/failure/repair cycle reaches pass; a faded independent-resample path is crossed out.",
  },
  {
    file: "07-slide-public-private-tests",
    stage: "test visibility",
    title: ["Public Tests Teach the Repair;", "Private Tests Guard the Reward"],
    subtitle: "RLEF separates in-trajectory feedback from the terminal correctness signal.",
    labels: ["Public feedback", "Turn limit", "Private tests", "Terminal reward"],
    evidence: "30:02-34:36 + RLEF Sections 2.1-2.2",
    objective: "Distinguish visible repair feedback from held-out terminal evaluation.",
    notes: "Public-test output enters the conversation. An episode ends when public tests pass or a turn limit is reached. The terminal scalar reward records whether all public and private tests pass. Separation reduces direct exposure; it does not prove absence of contamination or complete specification coverage.",
    visual: "A public feedback lane reaches the agent while a firewall hides private tests until a terminal reward gate.",
  },
  {
    file: "08-slide-two-timescale-rl",
    stage: "credit assignment",
    title: ["Credit Assignment Spans", "Tokens and Turns"],
    subtitle: "Code is emitted token by token; execution feedback arrives after a complete attempt.",
    labels: ["Token policy", "Turn boundary", "Execution", "Delayed reward"],
    evidence: "31:57-34:36 + arXiv:2410.02089",
    objective: "Explain RLEF's nested token-level and turn-level time scales.",
    notes: "A response contains many token decisions, but execution feedback appears only after an attempt. The learner must propagate delayed evidence across the trajectory. A passing terminal reward remains weak process supervision because it does not identify every necessary implementation choice.",
    visual: "Three token ribbons sit inside turn cards; execution pulses arrive between turns and a delayed reward closes the episode.",
  },
  {
    file: "09-slide-executable-not-complete",
    stage: "specification gap",
    title: ["Executable Feedback Is Objective,", "but Narrow"],
    subtitle: "Passing tests proves covered behavior, not complete correctness, security, or intent.",
    labels: ["Tested behavior", "Uncovered cases", "Security", "Specification"],
    evidence: "33:40-46:30 + arXiv:2410.02089",
    objective: "Separate machine-objective evidence from complete task correctness.",
    notes: "Execution feedback is objective relative to a test suite. RLEF requires runnable code, useful tests, and a secure sandbox. Repository-scale engineering adds retrieval, dependencies, context management, security, and specification coverage.",
    visual: "A small tested window covers only part of a larger specification field; uncovered risk zones remain visible.",
  },
  {
    file: "10-slide-constitution-spec",
    stage: "normative feedback",
    title: ["A Constitution Makes Normative", "Feedback Inspectable"],
    subtitle: "Human-written principles guide an AI critic, but they do not remove human judgment.",
    labels: ["Human authors", "Principles", "AI critic", "Value gaps"],
    evidence: "46:30-50:42 / 53:20-57:14",
    objective: "Explain a constitution as an explicit but incomplete feedback specification.",
    notes: "Constitutional AI uses natural-language principles for critique, revision, and preference labeling. Section 4.3 reports using 16 prewritten principles for preference labels. Humans still select the principles, supply helpfulness data, and define evaluation.",
    visual: "Human-authored cards labeled as illustrative principle topics feed an AI critic while a visible open slot represents omitted or conflicting values; no paper figure is reproduced.",
  },
  {
    file: "11-slide-cai-two-phases",
    stage: "constitutional training",
    title: ["Constitutional AI Trains Through", "Revision and Preference"],
    subtitle: "Supervised critique revises responses; RLAIF turns AI comparisons into a learned reward.",
    labels: ["Critique", "Revision", "AI preference", "Preference model"],
    evidence: "47:49-60:28 + arXiv:2212.08073",
    objective: "Distinguish the supervised and reinforcement-learning phases of Constitutional AI.",
    notes: "The supervised lane creates critique-and-revision data. The RLAIF lane uses AI comparisons to train a preference model and optimize a policy. Human helpfulness labels remain, and measured harmlessness can trade off against helpfulness or produce over-refusal.",
    visual: "An original split-path teaching abstraction shows supervised revision and RLAIF preference learning, joined by a human-specification bracket; it does not recreate the paper's Figure 1.",
  },
  {
    file: "12-slide-feedback-contract-audit",
    stage: "feedback audit",
    title: ["Audit the Feedback Contract,", "Not Just the Model"],
    subtitle: "Source, observability, coverage, corruption, incentives, and guardrails bound self-improvement.",
    labels: ["Source", "Observability", "Coverage", "Corruption", "Incentives", "Guardrails"],
    evidence: "whole-lecture teaching synthesis",
    objective: "Apply a six-question feedback audit to any self-improving agent.",
    notes: "The six-part audit is a teaching synthesis grounded in the three papers' limitations. Ask who produces the signal, what failure detail is visible, what remains uncovered, how the signal can be corrupted, what proxy is optimized, and which guardrails remain.",
    visual: "A six-port diagnostic ring surrounds a feedback loop inside a guardrail boundary.",
  },
];

function ensure(path: string) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
}

function measure(s: string) {
  return [...s].reduce((n, ch) => n + (/[^\x00-\x7F]/.test(ch) ? 1.7 : 1), 0);
}

function wrap(s: string, max: number) {
  const words = s.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (measure(next) > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function txt(x: number, y: number, lines: string[], size: number, color = C.ink, weight = 700, lh = Math.round(size * 1.18), anchor: "start" | "middle" = "start", mono = false) {
  return lines.map((line, i) => `<text class="${mono ? "mono" : "ui"}" x="${x}" y="${y + i * lh}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(line)}</text>`).join("");
}

function card(x: number, y: number, w: number, h: number, stroke = C.line, fill = C.paper, rx = 8, sw = 2) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, color = C.teal, width = 4, dash = "") {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#arrow)"/>`;
}

function pathArrow(d: string, color = C.teal, width = 4, dash = "") {
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#arrow)"/>`;
}

function pill(x: number, y: number, w: number, label: string, color = C.teal, fill = C.paper, h = 54) {
  return `<g>${card(x, y, w, h, color, fill)}${txt(x + w / 2, y + h / 2 + 7, [label], 18, color, 850, 22, "middle", true)}</g>`;
}

function shell(inner: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M46 0 L0 0 0 46" fill="none" stroke="${C.line}" stroke-width="1" opacity="0.38"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke"/></marker></defs>
  <style>.ui{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Arial,sans-serif;letter-spacing:0}.mono{font-family:"SFMono-Regular","SF Mono",Consolas,monospace;letter-spacing:0}</style>
  <rect width="${W}" height="${H}" fill="${C.bg}"/><rect width="${W}" height="${H}" fill="url(#grid)"/><rect x="42" y="42" width="1516" height="816" rx="8" fill="${C.paper}" opacity="0.9"/>${inner}</svg>`;
}

function badge(s: Slide) {
  const w = Math.max(210, measure(s.stage) * 12 + 54);
  return `${card(84, 68, w, 43, C.teal, C.tealBg)}${txt(108, 97, [s.stage.toUpperCase()], 17, C.teal, 900, 21, "start", true)}`;
}

function evidence(s: Slide) {
  const label = `PART 4  ${s.evidence}`;
  const w = Math.max(300, Math.min(590, measure(label) * 9.5 + 40));
  return `${card(1516 - w, 68, w, 43, C.line, C.paper)}${txt(1516 - w / 2, 97, [label], 15, C.muted, 780, 19, "middle", true)}`;
}

function header(s: Slide) {
  return `${badge(s)}${evidence(s)}${txt(86, 188, s.title, 52, C.ink, 920, 59)}${txt(90, 188 + s.title.length * 59 + 20, wrap(s.subtitle, 88), 23, C.muted, 560, 29)}`;
}

function caveat(x: number, y: number, w: number, label: string) {
  const lines = wrap(label, Math.floor(w / 13));
  return `${card(x, y, w, 40 + lines.length * 25, C.red, C.redBg)}${txt(x + 18, y + 26, ["CAVEAT"], 14, C.red, 900, 18, "start", true)}${txt(x + 18, y + 52, lines, 18, C.ink, 640, 25)}`;
}

function node(x: number, y: number, w: number, h: number, title: string, detail: string, color: string, fill = C.paper) {
  return `${card(x, y, w, h, color, fill)}${txt(x + w / 2, y + 42, [title], 20, color, 900, 24, "middle", true)}${txt(x + w / 2, y + 78, wrap(detail, Math.floor(w / 14)), 18, C.ink, 650, 24, "middle")}`;
}

function render1(s: Slide) {
  const ports = [
    [980, 250, "TOOL", "observation", C.teal, C.tealBg],
    [1270, 430, "CODE", "test result", C.cobalt, C.blueBg],
    [980, 610, "VALUES", "preference", C.brown, C.amberBg],
  ] as const;
  const blocks = ports.map(([x, y, a, b, color, fill]) => `${node(x, y, 230, 118, a, b, color, fill)}${arrow(x, y + 59, 855, 480, color, 3)}`).join("");
  return shell(`${badge(s)}${evidence(s)}${txt(90, 245, s.title, 66, C.ink, 930, 76)}${txt(94, 450, wrap(s.subtitle, 48), 25, C.muted, 560, 33)}${pill(95, 650, 225, "OBSERVATION", C.teal, C.tealBg)}${pill(335, 650, 190, "TEST", C.cobalt, C.blueBg)}${pill(540, 650, 230, "PREFERENCE", C.brown, C.amberBg)}${card(650, 380, 205, 200, C.maroon, C.redBg)}${txt(752, 438, ["AGENT"], 25, C.maroon, 900, 30, "middle", true)}${txt(752, 480, ["act"], 20, C.ink, 700, 24, "middle")}${pathArrow("M690 520 C625 595 865 650 855 520", C.maroon, 4)}${txt(752, 555, ["update"], 18, C.muted, 700, 22, "middle")}${blocks}${txt(1245, 785, ["three signals  !=  one meaning"], 20, C.maroon, 850, 24, "middle", true)}`);
}

function render2(s: Slide) {
  return shell(`${header(s)}${node(130, 470, 320, 150, "THOUGHT", "what evidence or operation is needed?", C.cobalt, C.blueBg)}${node(640, 470, 320, 150, "ACTION", "call a valid environment tool", C.maroon, C.redBg)}${node(1150, 470, 320, 150, "OBSERVATION", "external result enters context", C.teal, C.tealBg)}${arrow(450, 545, 640, 545, C.cobalt, 5)}${arrow(960, 545, 1150, 545, C.maroon, 5)}${pathArrow("M1310 620 C1320 765 290 765 290 620", C.teal, 5)}${card(570, 685, 460, 92, C.brown, C.amberBg)}${txt(800, 724, ["UPDATED STATE"], 20, C.brown, 900, 24, "middle", true)}${txt(800, 757, ["evidence changes the next decision"], 18, C.ink, 680, 22, "middle")}`);
}

function render3(s: Slide) {
  const packets = [
    [100, 425, "A", "current + relevant", C.green],
    [100, 535, "B", "true + irrelevant", C.red],
    [100, 645, "C", "stale + plausible", C.maroon],
  ] as const;
  const left = packets.map(([x, y, id, d, color]) => `${card(x, y, 300, 76, color, C.paper)}${txt(x + 30, y + 31, [`PACKET ${id}`], 16, color, 900, 20, "start", true)}${txt(x + 30, y + 60, [d], 17, C.ink, 650, 21)}`).join("");
  return shell(`${header(s)}${left}${arrow(400, 463, 530, 463, C.green)}${arrow(400, 573, 530, 573, C.red)}${arrow(400, 683, 530, 683, C.maroon)}${node(530, 430, 270, 250, "PROVENANCE", "source, recency, identity", C.brown, C.amberBg)}${arrow(800, 555, 910, 555, C.brown, 5)}${node(910, 430, 270, 250, "RELEVANCE", "does this answer the current need?", C.teal, C.tealBg)}${arrow(1180, 555, 1290, 555, C.teal, 5)}${node(1290, 430, 220, 250, "INTERPRET", "update state with uncertainty", C.cobalt, C.blueBg)}${pathArrow("M530 573 C475 573 475 740 650 740", C.red, 3, "9 7")}${pill(650, 713, 275, "REJECT / ESCALATE", C.red, C.redBg)}${caveat(925, 735, 585, "A correct retrieval can still produce a wrong state update.")}`);
}

function render4(s: Slide) {
  const clauses = [
    [100, 420, "VALID ACTIONS", "allowlist", C.cobalt],
    [100, 545, "ARGUMENT SCHEMA", "typed inputs", C.teal],
    [100, 670, "BUDGET + STOP", "cost boundary", C.brown],
    [1190, 420, "OBSERVATIONS", "typed outputs", C.teal],
    [1190, 545, "RECOVERY", "retry / backtrack", C.maroon],
    [1190, 670, "PERMISSIONS + LOGS", "authority / audit", C.brown],
  ] as const;
  const items = clauses.map(([x, y, a, b, color]) => node(x, y, 310, 92, a, b, color, C.paper)).join("");
  return shell(`${header(s)}${items}${card(585, 430, 430, 330, C.maroon, C.redBg)}${txt(800, 480, ["ACTION CONTRACT"], 21, C.maroon, 900, 25, "middle", true)}${card(690, 535, 220, 120, C.teal, C.tealBg)}${txt(800, 580, ["TOOL SOCKET"], 21, C.teal, 900, 25, "middle", true)}${txt(800, 620, ["search(query: string)"], 17, C.ink, 700, 21, "middle", true)}${arrow(410, 466, 585, 500, C.cobalt, 3)}${arrow(410, 591, 585, 575, C.teal, 3)}${arrow(410, 716, 585, 650, C.brown, 3)}${arrow(1190, 466, 1015, 500, C.teal, 3)}${arrow(1190, 591, 1015, 575, C.maroon, 3)}${arrow(1190, 716, 1015, 650, C.brown, 3)}${pill(610, 790, 380, "BLOCK: delete_all(*)", C.red, C.redBg)}`);
}

function render5(s: Slide) {
  const xs = [115, 355, 595, 835, 1075, 1315];
  const names = ["THINK", "SEARCH", "OBSERVE", "UPDATE", "ACT", "ANSWER"];
  const steps = xs.map((x, i) => {
    const bad = i >= 2;
    const color = bad ? C.red : C.cobalt;
    return `${card(x, 485, 170, 100, color, bad ? C.redBg : C.blueBg)}${txt(x + 85, 528, [`0${i + 1}`], 15, color, 900, 18, "middle", true)}${txt(x + 85, 562, [names[i]], 18, color, 900, 22, "middle", true)}${i < xs.length - 1 ? arrow(x + 170, 535, xs[i + 1], 535, color, 3) : ""}`;
  }).join("");
  return shell(`${header(s)}${steps}${txt(680, 450, ["misleading observation enters state"], 19, C.red, 850, 23, "middle")}${pathArrow("M1130 585 C1130 760 430 760 430 585", C.teal, 4, "10 8")}${pill(620, 700, 330, "BACKTRACK + RECHECK", C.teal, C.tealBg)}${caveat(430, 790, 740, "Longer trajectories add both recovery opportunities and failure surface.")}`);
}

function render6(s: Slide) {
  return shell(`${header(s)}${node(95, 485, 260, 135, "CODE v1", "initial attempt", C.cobalt, C.blueBg)}${arrow(355, 552, 500, 552, C.cobalt, 5)}${node(500, 485, 260, 135, "EXECUTE", "public tests", C.teal, C.tealBg)}${arrow(760, 552, 905, 552, C.teal, 5)}${node(905, 465, 260, 175, "FAILURE", "timeout + failing cases", C.red, C.redBg)}${arrow(1165, 552, 1310, 552, C.red, 5)}${node(1310, 485, 210, 135, "CODE v2", "targeted repair", C.green, C.tealBg)}${pathArrow("M1415 620 C1415 745 225 745 225 620", C.brown, 4, "10 8")}${pill(605, 695, 390, "NEXT TURN USES FAILURE EVIDENCE", C.brown, C.amberBg)}${txt(280, 785, ["independent resample"], 18, C.muted, 700, 22, "middle", true)}${arrow(120, 785, 440, 785, C.line, 3)}${pathArrow("M180 755 L380 815", C.red, 6)}`);
}

function render7(s: Slide) {
  return shell(`${header(s)}${card(85, 420, 825, 340, C.teal, C.tealBg)}${txt(125, 462, ["VISIBLE DURING TRAJECTORY"], 18, C.teal, 900, 22, "start", true)}${node(130, 515, 230, 135, "CODE", "attempt t", C.cobalt, C.paper)}${arrow(360, 582, 455, 582, C.teal)}${node(455, 515, 250, 135, "PUBLIC TESTS", "pass / fail + errors", C.teal, C.paper)}${pathArrow("M580 650 C580 720 245 720 245 650", C.teal, 3, "9 7")}${pill(715, 550, 150, "REPAIR", C.maroon, C.paper)}${card(950, 405, 70, 370, C.maroon, C.redBg)}${txt(985, 460, ["H", "I", "D", "D", "E", "N"], 16, C.maroon, 900, 34, "middle", true)}${card(1060, 420, 455, 340, C.brown, C.amberBg)}${txt(1100, 462, ["TERMINAL SIGNAL"], 18, C.brown, 900, 22, "start", true)}${node(1110, 520, 210, 130, "PRIVATE TESTS", "held out from dialog", C.brown, C.paper)}${arrow(1320, 585, 1385, 585, C.brown)}${pill(1385, 558, 95, "R", C.green, C.tealBg)}${caveat(345, 785, 910, "Hidden tests reduce direct exposure; they do not make the specification complete.")}`);
}

function render8(s: Slide) {
  const turns = [105, 555, 1005].map((x, i) => {
    const tokens = Array.from({ length: 8 }, (_, j) => `<rect x="${x + 30 + j * 37}" y="${515 + (j % 2) * 8}" width="28" height="42" rx="4" fill="${i === 2 && j > 4 ? C.green : C.cobalt}" opacity="${0.45 + j * 0.06}"/>`).join("");
    return `${card(x, 430, 390, 230, i === 2 ? C.green : C.cobalt, i === 2 ? C.tealBg : C.blueBg)}${txt(x + 28, 470, [`TURN ${i + 1}`], 17, i === 2 ? C.green : C.cobalt, 900, 21, "start", true)}${tokens}${txt(x + 195, 620, [i === 0 ? "code attempt" : i === 1 ? "repair attempt" : "passing attempt"], 18, C.ink, 700, 22, "middle")}`;
  }).join("");
  return shell(`${header(s)}${turns}${arrow(495, 545, 555, 545, C.teal, 5)}${txt(525, 518, ["EXECUTE"], 14, C.teal, 900, 18, "middle", true)}${arrow(945, 545, 1005, 545, C.teal, 5)}${txt(975, 518, ["EXECUTE"], 14, C.teal, 900, 18, "middle", true)}${pathArrow("M1200 660 C1200 750 1080 770 970 727", C.green, 5)}${pill(630, 700, 340, "DELAYED TERMINAL REWARD", C.green, C.tealBg)}${caveat(380, 790, 840, "One terminal result must assign credit across many token decisions.")}`);
}

function render9(s: Slide) {
  return shell(`${header(s)}${card(90, 405, 1040, 360, C.brown, C.amberBg)}${txt(130, 450, ["INTENDED SPECIFICATION"], 19, C.brown, 900, 23, "start", true)}${card(160, 500, 465, 200, C.green, C.tealBg, 8, 4)}${txt(392, 555, ["TESTED WINDOW"], 22, C.green, 900, 27, "middle", true)}${txt(392, 600, ["covered inputs + checks"], 20, C.ink, 680, 24, "middle")}${pill(250, 640, 285, "ALL TESTS PASS", C.green, C.paper)}${card(690, 500, 360, 88, C.red, C.redBg)}${txt(870, 553, ["UNCOVERED EDGE CASES"], 18, C.red, 900, 22, "middle", true)}${card(690, 612, 170, 88, C.maroon, C.redBg)}${txt(775, 665, ["SECURITY"], 18, C.maroon, 900, 22, "middle", true)}${card(880, 612, 170, 88, C.maroon, C.redBg)}${txt(965, 665, ["INTENT"], 18, C.maroon, 900, 22, "middle", true)}${arrow(1130, 585, 1260, 585, C.brown, 5)}${node(1260, 465, 255, 240, "EXECUTION", "objective relative to covered tests", C.teal, C.tealBg)}${caveat(380, 790, 840, "Passing tests is evidence of covered behavior, not proof of complete correctness.")}`);
}

function render10(s: Slide) {
  const principles = [
    [105, 435, "TOPIC 1", "harm"],
    [105, 545, "TOPIC 2", "social bias"],
    [105, 655, "TOPIC 3", "age context"],
  ] as const;
  const ps = principles.map(([x, y, n, d]) => `${card(x, y, 380, 82, C.brown, C.amberBg)}${txt(x + 25, y + 32, [n], 16, C.brown, 900, 20, "start", true)}${txt(x + 82, y + 51, [d], 18, C.ink, 680, 22)}`).join("");
  return shell(`${header(s)}${ps}${txt(295, 405, ["ILLUSTRATIVE PRINCIPLE TOPICS"], 17, C.brown, 900, 21, "middle", true)}${arrow(485, 585, 650, 585, C.brown, 5)}${node(650, 475, 300, 220, "AI CRITIC", "critique or compare responses under a selected principle", C.teal, C.tealBg)}${arrow(950, 585, 1110, 585, C.teal, 5)}${node(1110, 465, 300, 110, "PREFERENCE", "which response better follows the principle?", C.cobalt, C.blueBg)}${card(1110, 615, 300, 110, C.red, C.redBg, 8, 3)}${txt(1260, 655, ["OPEN VALUE SLOT"], 18, C.red, 900, 22, "middle", true)}${txt(1260, 692, ["omitted / conflicting"], 17, C.ink, 650, 21, "middle")}${caveat(470, 785, 660, "Topic labels are illustrative paraphrases; principles remain human choices.")}`);
}

function render11(s: Slide) {
  const topY = 470;
  const botY = 650;
  return shell(`${header(s)}${pill(85, topY, 165, "RESPONSE", C.cobalt, C.paper)}${arrow(250, topY + 27, 335, topY + 27, C.brown)}${pill(335, topY, 165, "CRITIQUE", C.brown, C.amberBg)}${arrow(500, topY + 27, 585, topY + 27, C.brown)}${pill(585, topY, 165, "REVISION", C.green, C.tealBg)}${arrow(750, topY + 27, 835, topY + 27, C.green)}${pill(835, topY, 260, "SUPERVISED DATA", C.green, C.paper)}${txt(1190, topY + 35, ["SL PHASE"], 18, C.green, 900, 22, "start", true)}${pill(85, botY, 205, "RESPONSE PAIR", C.cobalt, C.paper)}${arrow(290, botY + 27, 365, botY + 27, C.brown)}${pill(365, botY, 205, "AI PREFERENCE", C.brown, C.amberBg)}${arrow(570, botY + 27, 645, botY + 27, C.brown)}${pill(645, botY, 230, "PREFERENCE MODEL", C.teal, C.tealBg)}${arrow(875, botY + 27, 950, botY + 27, C.teal)}${pill(950, botY, 170, "RL POLICY", C.maroon, C.redBg)}${txt(1190, botY + 35, ["RLAIF PHASE"], 18, C.maroon, 900, 22, "start", true)}${pathArrow("M1365 438 L1365 740", C.brown, 4)}${txt(1415, 500, ["HUMAN"], 16, C.brown, 900, 20, "start", true)}${txt(1415, 530, ["constitution"], 17, C.ink, 650, 21)}${txt(1415, 675, ["helpfulness"], 17, C.ink, 650, 21)}${txt(1415, 705, ["labels"], 17, C.ink, 650, 21)}${caveat(375, 785, 850, "AI feedback scales labeling; it does not remove humans or evaluator blind spots.")}`);
}

function render12(s: Slide) {
  const items = [
    [220, 470, "01", "SOURCE", "who produces it?", C.cobalt],
    [520, 470, "02", "OBSERVABILITY", "what failure is visible?", C.teal],
    [1080, 470, "03", "COVERAGE", "what is missing?", C.green],
    [1380, 470, "04", "CORRUPTION", "how can it mislead?", C.red],
    [1170, 710, "05", "INCENTIVES", "which proxy wins?", C.maroon],
    [430, 710, "06", "GUARDRAILS", "what contains failure?", C.brown],
  ] as const;
  const nodes = items.map(([x, y, n, a, b, color]) => `${card(x - 135, y - 60, 270, 120, color, C.paper)}${txt(x - 105, y - 20, [n], 15, color, 900, 18, "start", true)}${txt(x, y + 4, [a], 18, color, 900, 22, "middle", true)}${txt(x, y + 36, [b], 16, C.ink, 650, 20, "middle")}`).join("");
  const connectors = [
    arrow(355, 470, 620, 560, C.cobalt, 2),
    arrow(655, 470, 680, 500, C.teal, 2),
    arrow(945, 470, 920, 500, C.green, 2),
    arrow(1245, 470, 980, 560, C.red, 2),
    arrow(1035, 710, 950, 650, C.maroon, 2),
    arrow(565, 710, 650, 650, C.brown, 2),
  ].join("");
  return shell(`${header(s)}${card(70, 390, 1460, 420, C.maroon, "none", 18, 4)}${connectors}${card(620, 500, 360, 200, C.teal, C.tealBg, 100, 4)}${txt(800, 550, ["FEEDBACK"], 22, C.teal, 900, 26, "middle", true)}${txt(800, 590, ["act -> observe"], 19, C.ink, 700, 23, "middle", true)}${pathArrow("M720 625 C710 680 890 680 880 625", C.maroon, 4)}${txt(800, 665, ["update"], 17, C.muted, 700, 21, "middle", true)}${nodes}${txt(800, 835, ["SELF-IMPROVEMENT IS BOUNDED BY THE FEEDBACK CONTRACT"], 19, C.maroon, 900, 23, "middle", true)}`);
}

const renderers = [render1, render2, render3, render4, render5, render6, render7, render8, render9, render10, render11, render12];

function prompt(slide: Slide, index: number) {
  return `# Slide ${index + 1}: ${slide.title.join(" ")}\n\n## Production method\nRendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or assigned-paper figures.\n\n## Style\nAged-cream academic technical briefing matched to the CS329A Part 2 deck: faint engineering grid, crisp 2px vector diagrams, near-black type, teal observations, cobalt reasoning/code, warm-brown human specification, maroon constraints, 8px card corners, no gradients or decorative imagery.\n\n## On-slide content\n- Stage: ${slide.stage}\n- Headline: ${slide.title.join(" ")}\n- Subtitle: ${slide.subtitle}\n- Supporting labels: ${slide.labels.join("; ")}\n- Evidence: CS329A Part 4, ${slide.evidence}\n\n## Visual direction\n${slide.visual}\n\n## Teaching objective\n${slide.objective}\n\n## Speaker notes\n${slide.notes}\n`;
}

function contactSheet() {
  const thumbW = 480;
  const thumbH = 270;
  const gap = 26;
  const margin = 34;
  const cols = 3;
  const rows = Math.ceil(slides.length / cols);
  const cw = margin * 2 + cols * thumbW + (cols - 1) * gap;
  const ch = margin * 2 + rows * (thumbH + 42) + (rows - 1) * gap;
  const images = slides.map((slide, i) => {
    const x = margin + (i % cols) * (thumbW + gap);
    const y = margin + Math.floor(i / cols) * (thumbH + 42 + gap);
    const data = readFileSync(join(DIR, `${slide.file}.png`)).toString("base64");
    return `<image href="data:image/png;base64,${data}" x="${x}" y="${y}" width="${thumbW}" height="${thumbH}"/><text class="ui" x="${x}" y="${y + thumbH + 28}" font-size="17" font-weight="750" fill="${C.ink}">${String(i + 1).padStart(2, "0")}  ${esc(slide.title.join(" "))}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}" viewBox="0 0 ${cw} ${ch}"><style>.ui{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}</style><rect width="100%" height="100%" fill="#E8E2D7"/>${images}</svg>`;
}

ensure(SVG_DIR);
ensure(PROMPT_DIR);

slides.forEach((slide, i) => {
  const svg = renderers[i](slide);
  const svgPath = join(SVG_DIR, `${slide.file}.svg`);
  const pngPath = join(DIR, `${slide.file}.png`);
  writeFileSync(svgPath, svg);
  writeFileSync(join(PROMPT_DIR, `${slide.file}.md`), prompt(slide, i));
  const result = Bun.spawnSync(["sips", "-s", "format", "png", svgPath, "--out", pngPath], { stdout: "pipe", stderr: "pipe" });
  if (result.exitCode !== 0) throw new Error(`sips failed for ${slide.file}: ${result.stderr.toString()}`);
});

const sheetSvg = join(DIR, "contact-sheet.svg");
writeFileSync(sheetSvg, contactSheet());
const sheet = Bun.spawnSync(["sips", "-s", "format", "png", sheetSvg, "--out", join(DIR, "contact-sheet.png")], { stdout: "pipe", stderr: "pipe" });
if (sheet.exitCode !== 0) throw new Error(`sips failed for contact sheet: ${sheet.stderr.toString()}`);

console.log(`Rendered ${slides.length} slides and prompts in ${DIR}`);
