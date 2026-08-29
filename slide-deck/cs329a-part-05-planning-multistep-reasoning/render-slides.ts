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
  paper: string;
  objective: string;
  notes: string;
  visual: string;
};

const slides: Slide[] = [
  {
    file: "01-slide-cover",
    stage: "planning as trajectory",
    title: ["Planning Is Choosing a Trajectory,", "Not Writing a List"],
    subtitle: "Stanford CS329A Part 5 - search, dependency-aware execution, and step-wise learning",
    labels: ["state", "action", "observation", "consequence"],
    evidence: "00:37-03:39",
    paper: "LATS, arXiv:2310.04406",
    objective: "Define planning as repeated action choice under feedback and downstream consequences.",
    notes: "Lecture 00:37-03:39; LATS, arXiv:2310.04406. A checklist is fixed before execution. An agent trajectory changes after each observation, so planning must account for feedback and consequences. Ask: What changes after the first tool call fails?",
    visual: "A closed state-action-observation loop advances across a consequence trail toward a goal.",
  },
  {
    file: "02-slide-three-levers",
    stage: "three intervention layers",
    title: ["Three Levers Improve", "Three Different Bottlenecks"],
    subtitle: "Search the trajectory, expose independent work, or improve the next-action policy.",
    labels: ["LATS: search", "SPRINT: schedule", "SWiRL: learn"],
    evidence: "00:05-00:37 / 23:29-25:57 / 50:29-54:34",
    paper: "arXiv:2310.04406 / 2506.05745 / 2504.04736",
    objective: "Separate search, dependency scheduling, and step-policy learning.",
    notes: "Lecture 00:05-00:37, 23:29-25:57, and 50:29-54:34; LATS, SPRINT, and SWiRL primary papers. These methods intervene at different layers and are not interchangeable.",
    visual: "One agent trajectory passes through three distinct intervention layers with separate outputs.",
  },
  {
    file: "03-slide-lats-loop",
    stage: "LATS search loop",
    title: ["LATS Searches Over", "Agent Behavior"],
    subtitle: "Six search operations combine model reasoning, environment feedback, and reflection.",
    labels: ["select", "expand", "evaluate", "simulate", "backprop", "reflect"],
    evidence: "07:11-16:07",
    paper: "LATS, arXiv:2310.04406",
    objective: "Explain the six LATS operations and where environment feedback enters.",
    notes: "Lecture 07:11-16:07; LATS, arXiv:2310.04406. Selection, expansion, evaluation, simulation, backpropagation, and reflection allocate search across possible trajectories. Reflection carries failure information forward.",
    visual: "A branching trajectory tree sits inside a six-stage circular search loop with a reflection memory card.",
  },
  {
    file: "04-slide-value-estimate",
    stage: "heuristic value",
    title: ["Value Is Estimated,", "Not Known"],
    subtitle: "UCT organizes exploration around heuristic signals; it does not turn them into truth.",
    labels: ["LM judgment", "self-consistency", "UCT router", "estimated value"],
    evidence: "10:00-16:07",
    paper: "LATS, arXiv:2310.04406",
    objective: "Distinguish UCT search allocation from correctness verification.",
    notes: "Lecture 10:00-16:07; LATS, arXiv:2310.04406. UCT is a search-selection rule. LM judgment and self-consistency provide heuristic value estimates. UCT cannot repair a systematically wrong judge, and agreement can reflect a shared misconception.",
    visual: "Two warning-tagged heuristic gauges feed a UCT router; a red boundary separates estimate from correctness.",
  },
  {
    file: "05-slide-search-boundary",
    stage: "search feasibility",
    title: ["Search Stops at Cost,", "Safety, and Reversibility"],
    subtitle: "A branch is useful only when it can be evaluated without unacceptable consequences.",
    labels: ["sandbox", "bounded budget", "approval gate", "irreversible action"],
    evidence: "17:14-23:29",
    paper: "LATS, arXiv:2310.04406",
    objective: "Identify when trajectory search requires sandboxing or human approval.",
    notes: "Lecture 17:14-23:29; LATS, arXiv:2310.04406. Search is expensive and assumes candidate actions can be explored. Email, purchases, deletions, and physical actions require a simulator, rollback, or approval gate.",
    visual: "A reversible sandbox contains branching trials while an external-action path stops at a human approval gate.",
  },
  {
    file: "06-slide-trace-dag",
    stage: "dependency discovery",
    title: ["A Sequential Trace Can Hide", "a Dependency DAG"],
    subtitle: "Token order is not always dependency order; independent work can execute concurrently.",
    labels: ["linear trace", "dependency edges", "parallel width", "join"],
    evidence: "23:29-29:20",
    paper: "SPRINT, arXiv:2506.05745",
    objective: "Transform a sequential trace into a dependency graph and identify the critical path.",
    notes: "Lecture 23:29-29:20; SPRINT, arXiv:2506.05745. A written trace is sequential, but some subproblems are independent. Parallel execution is valid only after true dependencies are explicit.",
    visual: "A six-step linear chain unfolds into two independent branches that rejoin before the answer.",
  },
  {
    file: "07-slide-sprint-compiler",
    stage: "SPRINT data compiler",
    title: ["SPRINT Compiles Demonstrations", "Into Parallel Stages"],
    subtitle: "Decomposition and dependency labeling convert a trace into staged planner-executor training data.",
    labels: ["decompose", "label", "infer DAG", "pack stages", "SFT"],
    evidence: "27:13-31:03",
    paper: "SPRINT, arXiv:2506.05745",
    objective: "Explain SPRINT's synthetic training-data transformation.",
    notes: "Lecture 27:13-31:03; SPRINT, arXiv:2506.05745. The pipeline decomposes a trace, labels planning versus execution, infers dependencies, packs independent work into stages, and fine-tunes. Dependency-label errors can teach invalid concurrency.",
    visual: "A five-stage compiler pipeline with the dependency-inference stage highlighted as load-bearing.",
  },
  {
    file: "08-slide-orchestrator",
    stage: "parallel runtime",
    title: ["Parallel Execution Needs", "an Orchestrator"],
    subtitle: "The model emits tagged branches; a runtime launches, synchronizes, and rejoins them.",
    labels: ["planner tags", "executors", "barrier", "replan"],
    evidence: "31:03-36:30",
    paper: "SPRINT, arXiv:2506.05745",
    objective: "Locate concurrency in the external runtime rather than the autoregressive decoder.",
    notes: "Lecture 31:03-36:30; SPRINT, arXiv:2506.05745. The decoder remains autoregressive. An external orchestrator interprets tags, launches independent executors, waits at barriers, merges results, and returns context for replanning.",
    visual: "A planner fans into three executor lanes, converges at a synchronization barrier, and loops back for replanning.",
  },
  {
    file: "09-slide-critical-path",
    stage: "parallelism accounting",
    title: ["Critical Path Is Not", "Total Work"],
    subtitle: "Sequential depth can fall while total tokens, overhead, and straggler latency remain.",
    labels: ["critical path", "total work", "overhead", "straggler"],
    evidence: "33:00-49:46",
    paper: "SPRINT, arXiv:2506.05745",
    objective: "Separate sequential-token savings from total compute and measured wall-clock latency.",
    notes: "Lecture 33:00-49:46; SPRINT, arXiv:2506.05745. SPRINT targets the dependency-constrained critical path. Total generated work need not fall. Scheduling, narrow graphs, synchronization, and stragglers can erase gains; short tasks can regress.",
    visual: "The same task blocks appear in a total-work ledger and a DAG with only the critical chain highlighted.",
  },
  {
    file: "10-slide-swirl-loop",
    stage: "SWiRL step learning",
    title: ["SWiRL Learns", "at the Step Level"],
    subtitle: "Offline tool trajectories supply intermediate feedback without a live call in every rollout.",
    labels: ["synthetic trajectory", "stored observation", "process judge", "step-wise RL"],
    evidence: "50:29-63:21",
    paper: "SWiRL, arXiv:2504.04736",
    objective: "Explain SWiRL's two-stage offline collection and step-wise RL pipeline.",
    notes: "Lecture 50:29-63:21; SWiRL, arXiv:2504.04736. Stage 1 builds and filters offline tool-use trajectories. Stage 2 proposes and judges the next action while reusing stored observations. This avoids live-tool instability but introduces stale or off-policy feedback risk.",
    visual: "An offline collection lane feeds a step-wise RL loop through a stored-observation buffer.",
  },
  {
    file: "11-slide-signal-matrix",
    stage: "feedback semantics",
    title: ["Process and Outcome Signals", "Fail Differently"],
    subtitle: "A correct answer can hide bad steps; a plausible step can still fail in the live environment.",
    labels: ["sound step", "correct outcome", "lucky answer", "live-tool failure"],
    evidence: "54:34-63:21 / 66:16-73:47",
    paper: "SWiRL, arXiv:2504.04736",
    objective: "Compare what process and outcome feedback certify and miss.",
    notes: "Lecture 54:34-63:21 and 66:16-73:47; SWiRL, arXiv:2504.04736. Outcome feedback can accept lucky answers reached through bad steps. Process feedback can approve a plausible query that a live tool rejects or executes unsafely. The verifier defines what is learned.",
    visual: "A process-by-outcome 2x2 matrix highlights lucky-answer and plausible-but-nonexecuting false positives.",
  },
  {
    file: "12-slide-bottleneck-diagnostic",
    stage: "method diagnostic",
    title: ["Choose the Bottleneck", "Before You Choose the Method"],
    subtitle: "Search, parallelize, learn, or stop: evaluator quality and reversibility gate every route.",
    labels: ["uncertain path", "independent work", "weak policy", "unsafe / unverifiable"],
    evidence: "whole-lecture synthesis",
    paper: "LATS + SPRINT + SWiRL teaching synthesis",
    objective: "Apply an integrated diagnostic without introducing assigned-only readings as taught content.",
    notes: "Whole-lecture synthesis grounded only in the three taught methods: LATS, SPRINT, and SWiRL. Choose search for uncertain trajectories, parallelism for independent work, step learning for a weak policy, or no added autonomy when verification or reversibility is inadequate. ADaPT and AB-MCTS are not taught on this slide.",
    visual: "A diagnostic router sends four bottleneck types to search, parallelism, policy learning, or no added autonomy.",
  },
];

function ensure(path: string) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function txt(x: number, y: number, lines: string[], size: number, color = C.ink, weight = 700, lh = Math.round(size * 1.18), anchor: "start" | "middle" = "start", mono = false) {
  return lines.map((line, i) => `<text class="${mono ? "mono" : "ui"}" x="${x}" y="${y + i * lh}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(line)}</text>`).join("");
}

function card(x: number, y: number, w: number, h: number, stroke = C.line, fill = C.paper, rx = 8) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, color = C.teal, width = 4, dash = "") {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#arrow)"/>`;
}

function curve(d: string, color = C.teal, width = 4, dash = "") {
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#arrow)"/>`;
}

function pill(x: number, y: number, w: number, label: string, color = C.teal, fill = C.paper) {
  return `<g>${card(x, y, w, 54, color, fill)}${txt(x + w / 2, y + 35, [label], 18, color, 850, 22, "middle", true)}</g>`;
}

function shell(inner: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M46 0 L0 0 0 46" fill="none" stroke="${C.line}" stroke-width="1" opacity="0.38"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke"/></marker></defs>
  <style>.ui{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Arial,sans-serif;letter-spacing:0}.mono{font-family:"SFMono-Regular","SF Mono",Consolas,monospace;letter-spacing:0}</style>
  <rect width="${W}" height="${H}" fill="${C.bg}"/><rect width="${W}" height="${H}" fill="url(#grid)"/><rect x="42" y="42" width="1516" height="816" rx="8" fill="${C.paper}" opacity="0.92"/>${inner}</svg>`;
}

function badge(s: Slide) {
  const w = Math.max(235, measure(s.stage) * 12 + 54);
  return `${card(84, 68, w, 43, C.teal, C.tealBg)}${txt(108, 97, [s.stage.toUpperCase()], 17, C.teal, 900, 21, "start", true)}`;
}

function evidence(s: Slide) {
  const label = `PART 5  ${s.evidence}`;
  const w = Math.max(285, measure(label) * 10.3 + 40);
  return `${card(1516 - w, 68, w, 43, C.line, C.paper)}${txt(1516 - w / 2, 97, [label], 15, C.muted, 780, 19, "middle", true)}`;
}

function header(s: Slide) {
  return `${badge(s)}${evidence(s)}${txt(86, 188, s.title, 52, C.ink, 920, 59)}${txt(90, 188 + s.title.length * 59 + 20, wrap(s.subtitle, 88), 23, C.muted, 560, 29)}`;
}

function caveat(x: number, y: number, w: number, label: string) {
  const lines = wrap(label, Math.floor(w / 13));
  return `${card(x, y, w, 42 + lines.length * 26, C.red, C.redBg)}${txt(x + 20, y + 27, ["CAVEAT"], 14, C.red, 900, 18, "start", true)}${txt(x + 20, y + 55, lines, 19, C.ink, 640, 26)}`;
}

function render1(s: Slide) {
  const states = [
    [870, 350, "S0", "goal"],
    [1100, 350, "S1", "observe"],
    [1330, 350, "S2", "adapt"],
    [1330, 625, "S3", "consequence"],
    [1100, 625, "S4", "replan"],
    [870, 625, "S5", "next action"],
  ] as const;
  const nodes = states.map(([x, y, a, b]) => `${card(x - 70, y - 48, 140, 96, C.teal, C.tealBg)}${txt(x, y - 7, [a], 19, C.teal, 900, 23, "middle", true)}${txt(x, y + 25, [b], 16, C.ink, 700, 20, "middle")}`).join("");
  const links = `${arrow(940, 350, 1030, 350, C.cobalt)}${arrow(1170, 350, 1260, 350, C.cobalt)}${arrow(1330, 398, 1330, 577, C.brown)}${arrow(1260, 625, 1170, 625, C.teal)}${arrow(1030, 625, 940, 625, C.teal)}${curve("M870 577 C730 535 730 440 870 398", C.maroon, 4)}`;
  return shell(`${badge(s)}${evidence(s)}${txt(90, 245, s.title, 64, C.ink, 930, 74)}${txt(94, 455, wrap(s.subtitle, 44), 25, C.muted, 560, 33)}${pill(95, 665, 145, "STATE", C.teal, C.tealBg)}${pill(255, 665, 145, "ACTION", C.cobalt, C.blueBg)}${pill(415, 665, 190, "OBSERVATION", C.brown, C.amberBg)}${pill(620, 665, 175, "CONSEQUENCE", C.maroon, C.redBg)}${nodes}${links}${txt(1100, 495, ["TRAJECTORY"], 20, C.maroon, 900, 24, "middle", true)}`);
}

function render2(s: Slide) {
  const cols = [
    [90, "01", "LATS", "search paths", "inference", C.cobalt, C.blueBg],
    [585, "02", "SPRINT", "expose width", "runtime", C.teal, C.tealBg],
    [1080, "03", "SWiRL", "learn steps", "training", C.brown, C.amberBg],
  ] as const;
  const body = cols.map(([x, n, name, action, layer, color, fill]) => `${card(x, 410, 430, 320, color, fill)}${txt(x + 35, 458, [n], 17, color, 900, 21, "start", true)}${txt(x + 35, 520, [name], 30, color, 920, 36)}${txt(x + 35, 580, [action], 27, C.ink, 800, 33)}${pill(x + 35, 635, 190, layer, color, C.paper)}${txt(x + 250, 672, [name === "LATS" ? "uncertain choice" : name === "SPRINT" ? "independent work" : "weak policy"], 18, C.muted, 700, 22)}`).join("");
  return shell(`${header(s)}${body}${txt(800, 790, ["DIAGNOSE THE BOTTLENECK BEFORE COMBINING THE METHODS"], 20, C.maroon, 900, 24, "middle", true)}`);
}

function render3(s: Slide) {
  const ops = [
    [800, 390, "SELECT"], [1035, 330, "EXPAND"], [1275, 415, "EVALUATE"],
    [1275, 630, "SIMULATE"], [1035, 715, "BACKPROP"], [800, 650, "REFLECT"],
  ] as const;
  const pills = ops.map(([x, y, label], i) => pill(x, y, 175, label, i < 3 ? C.cobalt : i < 5 ? C.teal : C.maroon, C.paper)).join("");
  const links = ops.map(([x, y], i) => {
    const [nx, ny] = ops[(i + 1) % ops.length];
    return arrow(x + 87, y + 54, nx + 87, ny, i < 3 ? C.cobalt : C.teal, 3);
  }).join("");
  const tree = `${card(100, 425, 570, 315, C.cobalt, C.blueBg)}${txt(385, 468, ["TRAJECTORY TREE"], 18, C.cobalt, 900, 22, "middle", true)}<circle cx="210" cy="560" r="26" fill="${C.cobalt}"/>${arrow(236, 560, 350, 505, C.cobalt, 3)}${arrow(236, 560, 350, 615, C.cobalt, 3)}<circle cx="375" cy="493" r="24" fill="${C.paper}" stroke="${C.cobalt}" stroke-width="3"/><circle cx="375" cy="627" r="24" fill="${C.green}"/>${arrow(399, 493, 520, 455, C.teal, 3)}${arrow(399, 493, 520, 535, C.teal, 3)}${arrow(399, 627, 520, 665, C.teal, 3)}<circle cx="545" cy="447" r="22" fill="${C.paper}" stroke="${C.teal}" stroke-width="3"/><circle cx="545" cy="543" r="22" fill="${C.paper}" stroke="${C.teal}" stroke-width="3"/><circle cx="545" cy="673" r="22" fill="${C.paper}" stroke="${C.teal}" stroke-width="3"/>${pill(250, 690, 280, "ENVIRONMENT FEEDBACK", C.green, C.tealBg)}`;
  return shell(`${header(s)}${tree}${pills}${links}${caveat(720, 785, 750, "Reflection can inform another attempt; it does not prove the reflected diagnosis is correct.")}`);
}

function render4(s: Slide) {
  return shell(`${header(s)}${card(90, 405, 450, 300, C.cobalt, C.blueBg)}${txt(315, 455, ["HEURISTIC INPUTS"], 19, C.cobalt, 900, 23, "middle", true)}${pill(145, 525, 330, "LM JUDGMENT", C.cobalt, C.paper)}${pill(145, 610, 330, "SELF-CONSISTENCY", C.cobalt, C.paper)}${arrow(540, 555, 700, 555, C.cobalt)}${arrow(540, 640, 700, 640, C.cobalt)}${card(700, 475, 320, 205, C.brown, C.amberBg)}${txt(860, 530, ["UCT"], 28, C.brown, 920, 34, "middle", true)}${txt(860, 575, ["explore / exploit"], 22, C.ink, 750, 27, "middle")}${txt(860, 625, ["allocates search"], 18, C.muted, 700, 22, "middle")}${arrow(1020, 578, 1170, 578, C.teal)}${card(1170, 460, 350, 235, C.teal, C.tealBg)}${txt(1345, 515, ["ESTIMATED"], 22, C.teal, 900, 27, "middle", true)}${txt(1345, 560, ["BRANCH VALUE"], 27, C.ink, 900, 32, "middle", true)}${txt(1345, 625, ["useful for routing"], 18, C.muted, 700, 22, "middle")}${card(590, 735, 860, 88, C.red, C.redBg)}${txt(1020, 772, ["HEURISTIC ONLY  !=  CORRECTNESS GUARANTEE"], 22, C.red, 920, 27, "middle", true)}${txt(1020, 806, ["UCT cannot repair a systematically wrong judge"], 18, C.ink, 700, 22, "middle")}`);
}

function render5(s: Slide) {
  const sandboxBranches = [460, 535, 610].map((y, i) => `${arrow(260, 535, 430, y, C.cobalt, 3)}${pill(430, y - 27, 170, `trial ${i + 1}`, C.cobalt, C.paper)}`).join("");
  return shell(`${header(s)}${card(70, 400, 690, 350, C.green, C.tealBg)}${txt(110, 450, ["REVERSIBLE SANDBOX"], 20, C.green, 900, 24, "start", true)}${pill(105, 508, 155, "SIMULATE", C.green, C.paper)}${sandboxBranches}${txt(415, 705, ["branch, inspect, rollback"], 19, C.muted, 700, 23, "middle")}${card(830, 400, 690, 350, C.maroon, C.redBg)}${txt(870, 450, ["EXTERNAL CONSEQUENCE"], 20, C.maroon, 900, 24, "start", true)}${pill(880, 540, 170, "PROPOSE", C.brown, C.paper)}${arrow(1050, 567, 1160, 567, C.maroon)}${card(1160, 490, 170, 155, C.maroon, C.paper)}${txt(1245, 540, ["HUMAN"], 18, C.maroon, 900, 22, "middle", true)}${txt(1245, 575, ["APPROVAL"], 22, C.ink, 900, 27, "middle", true)}${arrow(1330, 567, 1420, 567, C.maroon)}${pill(1420, 540, 70, "ACT", C.red, C.redBg)}${txt(1170, 705, ["email / buy / delete / move"], 19, C.muted, 700, 23, "middle")}${pill(430, 785, 740, "BOUNDED BUDGET + EVALUATOR + SAFE ACTION MODEL", C.brown, C.amberBg)}`);
}

function render6(s: Slide) {
  const chain = [130, 255, 380, 505, 630, 755].map((x, i) => `${pill(x, 460, 95, `s${i + 1}`, C.cobalt, C.paper)}${i < 5 ? arrow(x + 95, 487, x + 120, 487, C.cobalt, 3) : ""}`).join("");
  const dag = `${pill(980, 420, 100, "s1", C.teal, C.paper)}${pill(1130, 335, 100, "s2", C.teal, C.paper)}${pill(1130, 505, 100, "s3", C.teal, C.paper)}${pill(1300, 335, 100, "s4", C.teal, C.paper)}${pill(1300, 505, 100, "s5", C.teal, C.paper)}${pill(1450, 420, 100, "s6", C.green, C.tealBg)}${arrow(1080, 447, 1130, 362, C.teal, 3)}${arrow(1080, 447, 1130, 532, C.teal, 3)}${arrow(1230, 362, 1300, 362, C.teal, 3)}${arrow(1230, 532, 1300, 532, C.teal, 3)}${arrow(1400, 362, 1450, 447, C.teal, 3)}${arrow(1400, 532, 1450, 447, C.teal, 3)}`;
  return shell(`${header(s)}${card(80, 395, 760, 310, C.cobalt, C.blueBg)}${txt(120, 440, ["TOKEN ORDER"], 18, C.cobalt, 900, 22, "start", true)}${chain}${txt(460, 630, ["six sequential positions"], 19, C.muted, 700, 23, "middle")}${arrow(840, 550, 920, 550, C.brown, 5)}${card(920, 395, 640, 310, C.teal, C.tealBg)}${txt(960, 440, ["DEPENDENCY ORDER"], 18, C.teal, 900, 22, "start", true)}${dag}${txt(1240, 650, ["two independent branches, one join"], 19, C.muted, 700, 23, "middle")}${caveat(355, 765, 890, "Parallelism is valid only when the inferred dependency edges are correct.")}`);
}

function render7(s: Slide) {
  const steps = [
    [75, "01", "TRACE", "raw reasoning", C.cobalt, C.blueBg],
    [370, "02", "DECOMPOSE", "atomic steps", C.cobalt, C.blueBg],
    [665, "03", "INFER DAG", "dependencies", C.red, C.redBg],
    [960, "04", "PACK", "parallel stages", C.teal, C.tealBg],
    [1255, "05", "SFT", "staged behavior", C.brown, C.amberBg],
  ] as const;
  const pipeline = steps.map(([x, n, a, b, color, fill], i) => `${card(x, 435, 245, 230, color, fill)}${txt(x + 30, 478, [n], 16, color, 900, 20, "start", true)}${txt(x + 30, 535, [a], 21, color, 900, 25, "start", true)}${txt(x + 30, 590, [b], 21, C.ink, 730, 26)}${i < 4 ? arrow(x + 245, 550, x + 285, 550, C.teal, 3) : ""}`).join("");
  return shell(`${header(s)}${pipeline}${caveat(510, 735, 580, "Dependency inference is load-bearing: a false independence label teaches an invalid schedule.")}`);
}

function render8(s: Slide) {
  const lanes = [410, 520, 630].map((y, i) => `${arrow(390, 535, 550, y, C.cobalt, 3)}${card(550, y - 42, 270, 84, C.cobalt, C.blueBg)}${txt(685, y - 5, [`EXECUTOR ${i + 1}`], 18, C.cobalt, 900, 22, "middle", true)}${txt(685, y + 25, [`tag <e${i + 1}>`], 15, C.muted, 700, 18, "middle", true)}${arrow(820, y, 1050, y, C.teal, 3)}`).join("");
  return shell(`${header(s)}${card(90, 455, 300, 160, C.brown, C.amberBg)}${txt(240, 505, ["PLANNER"], 24, C.brown, 920, 29, "middle", true)}${txt(240, 550, ["emit tagged branches"], 18, C.ink, 700, 22, "middle")}${lanes}${card(1050, 365, 170, 350, C.teal, C.tealBg)}${txt(1135, 490, ["SYNC"], 22, C.teal, 920, 27, "middle", true)}${txt(1135, 535, ["BARRIER"], 22, C.ink, 900, 27, "middle", true)}${txt(1135, 610, ["wait + join"], 17, C.muted, 700, 21, "middle")}${arrow(1220, 540, 1390, 540, C.teal)}${card(1390, 455, 130, 170, C.green, C.tealBg)}${txt(1455, 515, ["MERGED"], 16, C.green, 900, 20, "middle", true)}${txt(1455, 552, ["RESULT"], 20, C.ink, 900, 24, "middle", true)}${curve("M1455 625 C1435 790 300 790 240 615", C.maroon, 4, "10 8")}${txt(820, 785, ["REPLAN WITH MERGED CONTEXT"], 18, C.maroon, 900, 22, "middle", true)}`);
}

function render9(s: Slide) {
  const work = [
    [120, 470, 180, C.cobalt], [320, 470, 120, C.teal], [460, 470, 230, C.brown], [710, 470, 100, C.maroon], [830, 470, 170, C.cobalt], [1020, 470, 80, C.teal],
  ] as const;
  const bars = work.map(([x, y, w, color]) => `<rect x="${x}" y="${y}" width="${w}" height="62" rx="7" fill="${color}" opacity="0.88"/>`).join("");
  const dag = `${pill(170, 650, 120, "A", C.cobalt, C.paper)}${pill(390, 595, 120, "B", C.teal, C.paper)}${pill(390, 705, 120, "C", C.brown, C.paper)}${pill(650, 595, 120, "D", C.maroon, C.paper)}${pill(650, 705, 120, "E", C.cobalt, C.paper)}${pill(910, 650, 120, "F", C.green, C.tealBg)}${arrow(290, 677, 390, 622, C.teal, 3)}${arrow(290, 677, 390, 732, C.line, 3)}${arrow(510, 622, 650, 622, C.teal, 5)}${arrow(510, 732, 650, 732, C.line, 3)}${arrow(770, 622, 910, 677, C.teal, 5)}${arrow(770, 732, 910, 677, C.line, 3)}`;
  return shell(`${header(s)}${card(80, 405, 1060, 155, C.brown, C.amberBg)}${txt(120, 450, ["TOTAL WORK"], 18, C.brown, 900, 22, "start", true)}${txt(1110, 450, ["sum of all blocks"], 17, C.muted, 700, 21, "end")}${bars}${card(80, 585, 1060, 220, C.teal, C.tealBg)}${txt(120, 625, ["DEPENDENCY DAG"], 18, C.teal, 900, 22, "start", true)}${dag}${txt(1110, 760, ["teal = critical path"], 17, C.teal, 800, 21, "end")}${card(1190, 405, 330, 400, C.red, C.redBg)}${txt(1355, 455, ["WHAT REMAINS"], 18, C.red, 900, 22, "middle", true)}${pill(1235, 510, 240, "scheduling", C.red, C.paper)}${pill(1235, 590, 240, "stragglers", C.red, C.paper)}${pill(1235, 670, 240, "short-task overhead", C.red, C.paper)}${txt(1355, 765, ["latency must be measured"], 16, C.muted, 700, 20, "middle")}`);
}

function render10(s: Slide) {
  return shell(`${header(s)}${card(70, 400, 660, 350, C.cobalt, C.blueBg)}${txt(110, 448, ["STAGE 1  OFFLINE COLLECTION"], 19, C.cobalt, 900, 23, "start", true)}${pill(120, 510, 190, "tool trajectory", C.cobalt, C.paper)}${arrow(310, 537, 395, 537, C.cobalt)}${pill(395, 510, 190, "process labels", C.cobalt, C.paper)}${arrow(490, 564, 490, 635, C.cobalt)}${pill(330, 635, 320, "STORED OBSERVATIONS", C.brown, C.amberBg)}${card(850, 400, 670, 350, C.teal, C.tealBg)}${txt(890, 448, ["STAGE 2  STEP-WISE RL"], 19, C.teal, 900, 23, "start", true)}${pill(900, 510, 180, "state + context", C.teal, C.paper)}${arrow(1080, 537, 1170, 537, C.teal)}${pill(1170, 510, 180, "propose action", C.teal, C.paper)}${arrow(1260, 564, 1260, 635, C.teal)}${pill(1080, 635, 360, "judge step -> update policy", C.green, C.paper)}${arrow(730, 675, 850, 675, C.brown, 5)}${caveat(390, 780, 820, "Stored feedback avoids live-tool instability but can become stale or off-policy.")}`);
}

function render11(s: Slide) {
  const matrix = [
    [390, 465, "SOUND + CORRECT", "strong evidence", C.green, C.tealBg],
    [850, 465, "BAD STEP + CORRECT", "lucky outcome", C.red, C.redBg],
    [390, 640, "SOUND + WRONG", "later failure", C.brown, C.amberBg],
    [850, 640, "PLAUSIBLE + FAILS LIVE", "process false positive", C.maroon, C.redBg],
  ] as const;
  const cells = matrix.map(([x, y, a, b, color, fill]) => `${card(x, y, 400, 145, color, fill)}${txt(x + 30, y + 48, [a], 18, color, 900, 22, "start", true)}${txt(x + 30, y + 95, [b], 22, C.ink, 760, 27)}`).join("");
  return shell(`${header(s)}${txt(210, 560, ["PROCESS"], 20, C.cobalt, 900, 24, "middle", true)}${txt(210, 594, ["QUALITY"], 20, C.cobalt, 900, 24, "middle", true)}${txt(820, 410, ["OUTCOME QUALITY"], 20, C.teal, 900, 24, "middle", true)}${cells}${arrow(300, 720, 300, 465, C.cobalt, 3)}${arrow(390, 430, 1250, 430, C.teal, 3)}${caveat(415, 790, 810, "The verifier defines what the policy learns; neither axis certifies live execution by itself.")}`);
}

function render12(s: Slide) {
  const routes = [
    [90, "UNCERTAIN PATH", "SEARCH", C.cobalt, C.blueBg],
    [460, "INDEPENDENT WORK", "PARALLELIZE", C.teal, C.tealBg],
    [830, "WEAK STEP POLICY", "LEARN", C.brown, C.amberBg],
    [1200, "UNSAFE / UNVERIFIABLE", "STOP", C.maroon, C.redBg],
  ] as const;
  const cards = routes.map(([x, input, output, color, fill], i) => `${card(x, 440, 310, 250, color, fill)}${txt(x + 155, 492, [`0${i + 1}`], 17, color, 900, 21, "middle", true)}${txt(x + 155, 545, wrap(input, 23), 20, C.ink, 850, 25, "middle")}${pill(x + 55, 610, 200, output, color, C.paper)}`).join("");
  return shell(`${header(s)}${cards}${arrow(400, 565, 450, 565, C.teal)}${arrow(770, 565, 820, 565, C.teal)}${arrow(1140, 565, 1190, 565, C.teal)}${card(350, 750, 900, 80, C.red, C.paper)}${txt(800, 785, ["GATE EVERY ROUTE: EVALUATOR QUALITY + REVERSIBILITY"], 20, C.red, 920, 24, "middle", true)}${txt(800, 817, ["No added autonomy is a valid engineering choice."], 17, C.muted, 700, 21, "middle")}`);
}

const renderers = [render1, render2, render3, render4, render5, render6, render7, render8, render9, render10, render11, render12];

function prompt(slide: Slide, index: number) {
  return `# Slide ${index + 1}: ${slide.title.join(" ")}\n\n## Production method\nRendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.\n\n## Style\nAged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt search/generation, teal verified or dependency-safe flow, warm-brown runtime/budget, maroon constraints, 8px card corners, no gradients, no decorative imagery.\n\n## On-slide content\n- Stage: ${slide.stage}\n- Headline: ${slide.title.join(" ")}\n- Subtitle: ${slide.subtitle}\n- Supporting labels: ${slide.labels.join("; ")}\n- Lecture evidence: CS329A Part 5, ${slide.evidence}\n- Primary-paper basis: ${slide.paper}\n\n## Visual direction\n${slide.visual}\n\n## Teaching objective\n${slide.objective}\n\n## Speaker notes\n${slide.notes}\n`;
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
