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
  amber: "#B7791F",
  red: "#B42318",
  green: "#16803C",
  blueBg: "#F3F7FF",
  tealBg: "#F2FBF8",
  redBg: "#FFF5F3",
};

type Slide = {
  file: string;
  stage: string;
  title: string[];
  subtitle?: string;
  bullets: string[];
  evidence: string;
  objective: string;
  notes: string;
  visual: string;
};

const slides: Slide[] = [
  {
    file: "01-slide-cover",
    stage: "course overview",
    title: ["A Reliable Agent Needs", "More Than a Strong Model"],
    subtitle: "Stanford CS329A Lecture 1 - from scaling laws to feedback-driven agent loops",
    bullets: ["Generate", "Verify", "Act", "Correct"],
    evidence: "42:28-53:56",
    objective: "State why a strong generator is not yet a reliable agent.",
    notes: "Generation and reliability are different system properties. A model may contain useful capability but expose it inconsistently. An agent needs a loop that tests actions, observes consequences, and recovers. Ask Q: What part of the loop turns a plausible answer into a trustworthy action?",
    visual: "A four-stage feedback loop around a central goal, with verification shown as the narrow reliability gate.",
  },
  {
    file: "02-slide-four-frontiers",
    stage: "deck synthesis",
    title: ["One Way to Organize AI Progress:", "Four Compute Frontiers"],
    subtitle: "Each frontier improves a different part of the system.",
    bullets: ["Pretraining", "Post-training", "Test-time compute", "Agent orchestration"],
    evidence: "02:23-19:38 / 40:49-47:55",
    objective: "Distinguish pretraining, post-training, test-time computation, and agent orchestration.",
    notes: "Walk left to right. Pretraining builds broad capability. Post-training shapes useful behavior. Test-time compute searches possible solutions. Orchestration closes the action-feedback loop. These layers complement rather than replace one another.",
    visual: "Four connected stages, each paired with the question it answers.",
  },
  {
    file: "03-slide-scaling-capability",
    stage: "scaling",
    title: ["Scaling Expanded Capability,", "but Emergence Is Not a Free Pass"],
    subtitle: "Historical evidence supports capability gains, not an unrestricted law of emergence.",
    bullets: ["More compute", "More data", "More parameters"],
    evidence: "02:23-10:49 / 58:12-60:32",
    objective: "Describe what scaling evidence supports and what it does not establish.",
    notes: "Scaling was associated with lower test loss and stronger few-shot and chain-of-thought benchmark behavior. Modern reasoning is also deliberately shaped by data and reinforcement. Challenge Q: If a behavior appears only in a larger model, does that prove it was absent from the training data?",
    visual: "Three scaling dials feed a capability meter beside an observation-versus-interpretation boundary.",
  },
  {
    file: "04-slide-post-training",
    stage: "behavior shaping",
    title: ["Post-Training Turns Capability", "into Assistant Behavior"],
    subtitle: "Capability and behavioral alignment are related, but they are not the same layer.",
    bullets: ["Fine-tune", "Instruction tune", "Preference optimize"],
    evidence: "11:20-19:25",
    objective: "Explain the role of fine-tuning, instruction tuning, and preference optimization.",
    notes: "Pretraining develops broad capability. Fine-tuning sharpens it on selected data. Instruction tuning teaches request-response patterns. Preference optimization rewards selected evaluator criteria. A preference model is not automatically a truth detector.",
    visual: "A four-stage pipeline from pretrained capability to assistant behavior.",
  },
  {
    file: "05-slide-test-time-scaling",
    stage: "inference search",
    title: ["Test-Time Scaling", "Searches a Fixed Model"],
    subtitle: "Spend more inference compute without changing the model weights.",
    bullets: ["Sample", "Search", "Use tools", "Select"],
    evidence: "19:38-31:18",
    objective: "Recognize repeated sampling as one test-time strategy among several.",
    notes: "The weights remain unchanged during the task. The system can sample repeatedly, reason longer, search, or use tools. A verifier or selector then decides what reaches the user. Do not collapse all of these methods into repeated sampling.",
    visual: "One locked model fans into candidate paths and then narrows through a verification gate.",
  },
  {
    file: "06-slide-coverage-reliability",
    stage: "metrics",
    title: ["Coverage Is Not", "Deployed Reliability"],
    subtitle: "Finding a correct candidate does not guarantee returning it.",
    bullets: ["Coverage: any candidate is correct", "Reliability: returned answer is correct"],
    evidence: "20:50-27:16 / 36:33-37:04",
    objective: "Separate candidate coverage from deployed reliability.",
    notes: "The probability formula is intuition under independent identical attempts. Real samples are correlated, and selectors are imperfect. Ask Q: If 100 candidates contain one correct answer but the selector misses it, which metric improved?",
    visual: "Two metric cards and a candidate field where the correct candidate exists but is not selected.",
  },
  {
    file: "07-slide-verifier-gap",
    stage: "bottleneck",
    title: ["Reliable Verification Often", "Scales More Slowly"],
    subtitle: "The cost of checking an answer depends on the domain.",
    bullets: ["Code: executable tests", "Math: rules or known answers", "Writing and science: expert judgment"],
    evidence: "47:09-51:16",
    objective: "Explain why verification difficulty changes by domain.",
    notes: "Code and mathematics often provide executable or rule-based checks. Open-ended writing, science, medicine, and policy rely on incomplete evaluators or expensive experts. Weak verification can select a polished mistake. Ask Q which tasks in their work have cheap verifiers.",
    visual: "A broad generator feeds a narrow verifier, with domain cards showing increasing feedback cost.",
  },
  {
    file: "08-slide-reasoning-loop",
    stage: "reasoning",
    title: ["Reasoning Models Turn", "One Answer into a Search Process"],
    subtitle: "A useful operational view is iterative search with feedback and backtracking.",
    bullets: ["Analyze", "Try", "Inspect", "Correct or backtrack"],
    evidence: "31:22-40:43",
    objective: "Identify the feedback operations inside a reasoning model.",
    notes: "Reasoning can be viewed as analysis, decomposition, action, feedback, correction, and alternative proposal. The visible reasoning trace is not proof that the process is correct; evaluation still matters.",
    visual: "A circular reasoning loop with a clearly visible backtrack branch.",
  },
  {
    file: "09-slide-two-improvements",
    stage: "persistence",
    title: ["Self-Improvement Has", "Two Different Meanings"],
    subtitle: "The key test is whether useful change survives beyond one task.",
    bullets: ["Within-run correction", "Across-run learning"],
    evidence: "28:53-30:12 + deck interpretation",
    objective: "Determine whether an improvement survives beyond one task.",
    notes: "Within-run correction includes retrying, searching, and revising during one task. Across-run learning persists change in weights, memory, tools, policies, data, or artifacts. Ask Q: If the agent fixes a mistake and forgets it next session, in what sense did it improve?",
    visual: "Two side-by-side loops separated by a persistence boundary.",
  },
  {
    file: "10-slide-chatbot-agent",
    stage: "agency",
    title: ["An Agent Owns a", "Goal-Directed Task Loop"],
    subtitle: "Agency begins when feedback changes the next action.",
    bullets: ["State", "Tools", "Feedback", "Stopping rule"],
    evidence: "40:49-43:26",
    objective: "Distinguish a chatbot response from an agent task loop.",
    notes: "A chatbot mainly returns information. An agent manages task state, acts through tools, observes consequences, and decides whether to continue, stop, or escalate. Autonomy can still be bounded by approval gates.",
    visual: "Request-response on the left versus a goal-plan-act-observe-correct-stop loop on the right.",
  },
  {
    file: "11-slide-loop-vs-graph",
    stage: "orchestration",
    title: ["Workflow Graphs Trade", "Flexibility for Control"],
    subtitle: "The task's risk and uncertainty should determine the orchestration design.",
    bullets: ["Open loop: adaptive", "Workflow graph: observable", "Neither is universally better"],
    evidence: "43:30-47:55",
    objective: "Compare flexibility, control, observability, and reliability.",
    notes: "Open loops adapt to unexpected states but are harder to audit. Workflow graphs constrain routes and checks, improving observability while reducing flexibility. Connect this to Q's harness and graph engineering work.",
    visual: "Two equal-weight system diagrams linked by a flexibility-control tradeoff beam.",
  },
  {
    file: "12-slide-closing",
    stage: "deck diagnostic",
    title: ["A Useful Course Lens:", "Feedback Quality"],
    subtitle: "Use three questions before accepting any self-improving-agent claim.",
    bullets: ["What generates alternatives?", "What verifies success?", "What persists after the task?"],
    evidence: "47:09-58:04",
    objective: "Apply the framework to a new system before accepting the self-improvement label.",
    notes: "Close with the three-question diagnostic. Apply it to coding, support, research synthesis, or AI-scientist-style assistance. Assistance and automation do not remove the need for external validation. Bridge to Lecture 2 on test-time compute scaling.",
    visual: "Three diagnostic questions arranged around a feedback signal, with a bridge to Lecture 2.",
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
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function text(x: number, y: number, lines: string[], size: number, color = C.ink, weight = 700, lh = Math.round(size * 1.18), anchor: "start" | "middle" = "start", mono = false) {
  return lines.map((line, i) => `<text class="${mono ? "mono" : "ui"}" x="${x}" y="${y + i * lh}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(line)}</text>`).join("");
}

function card(x: number, y: number, w: number, h: number, stroke = C.line, fill = C.paper, rx = 8) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

function line(x1: number, y1: number, x2: number, y2: number, color = C.teal, width = 4, marker = true, dash = "") {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""} ${marker ? 'marker-end="url(#arrow)"' : ""}/>`;
}

function pill(x: number, y: number, w: number, label: string, color = C.teal, fill = C.paper) {
  return `<g>${card(x, y, w, 64, color, fill)}${text(x + w / 2, y + 41, [label], 25, color, 850, 30, "middle")}</g>`;
}

function defs() {
  return `<defs>
    <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M46 0 L0 0 0 46" fill="none" stroke="${C.line}" stroke-width="1" opacity="0.38"/></pattern>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke"/></marker>
  </defs>`;
}

function shell(inner: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs()}
  <style>.ui{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Arial,sans-serif;letter-spacing:0}.mono{font-family:"SFMono-Regular","SF Mono",Consolas,monospace;letter-spacing:0}</style>
  <rect width="${W}" height="${H}" fill="${C.bg}"/><rect width="${W}" height="${H}" fill="url(#grid)"/><rect x="42" y="42" width="1516" height="816" rx="8" fill="${C.paper}" opacity="0.88"/>
  ${inner}</svg>`;
}

function badge(slide: Slide) {
  const w = Math.max(190, measure(slide.stage) * 12 + 52);
  return `<g>${card(84, 68, w, 43, C.teal, C.tealBg)}${text(108, 97, [slide.stage.toUpperCase()], 18, C.teal, 850, 22, "start", true)}</g>`;
}

function evidence(slide: Slide) {
  const label = `LECTURE 1  ${slide.evidence}`;
  const w = Math.max(250, measure(label) * 11 + 38);
  return `<g>${card(1516 - w, 68, w, 43, C.line, C.paper)}${text(1516 - w / 2, 97, [label], 17, C.muted, 760, 22, "middle", true)}</g>`;
}

function header(slide: Slide) {
  return `${badge(slide)}${evidence(slide)}${text(86, 188, slide.title, 54, C.ink, 900, 62)}${slide.subtitle ? text(90, 188 + slide.title.length * 62 + 20, wrap(slide.subtitle, 78), 25, C.muted, 540, 31) : ""}`;
}

function caveat(x: number, y: number, w: number, label: string) {
  const lines = wrap(label, Math.floor(w / 13));
  return `<g>${card(x, y, w, 44 + lines.length * 28, C.red, C.redBg)}${text(x + 20, y + 29, ["CAVEAT"], 16, C.red, 900, 20, "start", true)}${text(x + 20, y + 61, lines, 21, C.ink, 620, 28)}</g>`;
}

function render1(s: Slide) {
  const nodes = [
    [1120, 280, "Generate", C.cobalt],
    [1360, 470, "Verify", C.maroon],
    [1120, 660, "Act", C.brown],
    [880, 470, "Correct", C.teal],
  ] as const;
  const loop = nodes.map(([x, y, label, color]) => `${card(x - 105, y - 38, 210, 76, color, C.paper)}${text(x, y + 10, [label], 27, color, 900, 30, "middle")}`).join("");
  return shell(`${badge(s)}${evidence(s)}${text(88, 260, s.title, 70, C.ink, 920, 82)}${text(92, 470, wrap(s.subtitle ?? "", 42), 27, C.muted, 540, 36)}${pill(90, 660, 190, "Generate", C.cobalt, C.blueBg)}${pill(295, 660, 175, "Verify", C.maroon, C.redBg)}${pill(485, 660, 145, "Act", C.brown)}${pill(645, 660, 175, "Correct", C.teal, C.tealBg)}${line(1200, 312, 1325, 430, C.cobalt)}${line(1325, 510, 1200, 625, C.maroon)}${line(1040, 625, 915, 510, C.brown)}${line(915, 430, 1040, 312, C.teal)}${loop}${card(1065, 430, 110, 80, C.ink, C.paper)}${text(1120, 465, ["GOAL"], 20, C.ink, 900, 24, "middle", true)}${text(1120, 492, ["state"], 17, C.muted, 650, 20, "middle", true)}${text(1120, 796, ["Verification is the narrow gate between possibility and reliability."], 22, C.maroon, 800, 28, "middle")}`);
}

function render2(s: Slide) {
  const stages = [
    [105, "01", "Pretraining", "What can it know?", C.cobalt],
    [470, "02", "Post-training", "How should it behave?", C.brown],
    [835, "03", "Test-time", "Which answer should it choose?", C.maroon],
    [1200, "04", "Orchestration", "What should it do next?", C.teal],
  ] as const;
  const visual = stages.map(([x, n, title, q, color], i) => `<g>${card(x, 465, 285, 220, color, C.paper)}${text(x + 28, 510, [n], 20, color, 900, 24, "start", true)}${text(x + 28, 560, [title], 28, color, 900)}${text(x + 28, 615, wrap(q, 20), 22, C.ink, 650, 29)}${i < 3 ? line(x + 285, 575, x + 345, 575, C.teal) : ""}</g>`).join("");
  return shell(`${header(s)}${visual}${text(800, 752, ["CAPABILITY  ->  BEHAVIOR  ->  SEARCH  ->  ACTION"], 22, C.muted, 800, 28, "middle", true)}`);
}

function render3(s: Slide) {
  const dials = [["COMPUTE", 0.78], ["DATA", 0.66], ["PARAMETERS", 0.86]] as const;
  const left = `<g transform="translate(90 435)">${card(0, 0, 650, 295, C.cobalt, C.blueBg)}${text(34, 48, ["OBSERVED ASSOCIATION"], 18, C.cobalt, 900, 22, "start", true)}${dials.map(([label, p], i) => `<g><text class="mono" x="36" y="${103 + i * 65}" fill="${C.ink}" font-size="19" font-weight="750">${label}</text><rect x="210" y="${82 + i * 65}" width="360" height="24" rx="8" fill="${C.line}"/><rect x="210" y="${82 + i * 65}" width="${360 * p}" height="24" rx="8" fill="${C.cobalt}"/></g>`).join("")}${text(355, 273, ["lower test loss + broader benchmark capability"], 21, C.ink, 720, 25, "middle")}</g>`;
  const right = `<g transform="translate(815 435)">${card(0, 0, 690, 295, C.maroon, C.paper)}${text(34, 48, ["INTERPRETATION BOUNDARY"], 18, C.maroon, 900, 22, "start", true)}${text(42, 106, wrap("Larger models showed stronger few-shot and chain-of-thought behavior on selected benchmarks.", 46), 24, C.ink, 650, 32)}${caveat(36, 182, 618, "That observation does not prove a universal law, nor that the behavior was absent from training data.")}</g>`;
  return shell(`${header(s)}${left}${right}`);
}

function render4(s: Slide) {
  const stages = [
    [95, "PRETRAIN", "broad capability", C.cobalt],
    [430, "FINE-TUNE", "selected quality", C.brown],
    [765, "INSTRUCT", "request-response", C.teal],
    [1100, "PREFERENCE", "chosen criteria", C.maroon],
  ] as const;
  const visual = stages.map(([x, name, desc, color], i) => `<g>${card(x, 450, 285, 155, color, C.paper)}${text(x + 142, 505, [name], 20, color, 900, 24, "middle", true)}${text(x + 142, 557, [desc], 22, C.ink, 680, 27, "middle")}${i < 3 ? line(x + 285, 528, x + 330, 528, C.teal) : ""}</g>`).join("");
  return shell(`${header(s)}${visual}${caveat(470, 665, 660, "Preference optimization approximates evaluator preferences; it is not automatically a truth detector.")}`);
}

function render5(s: Slide) {
  const candidateYs = [415, 485, 555, 625];
  const model = `${card(90, 455, 280, 180, C.cobalt, C.blueBg)}${text(230, 508, ["FIXED MODEL"], 24, C.cobalt, 900, 28, "middle", true)}${text(230, 558, ["weights locked"], 22, C.ink, 680, 27, "middle")}${text(230, 597, ["more inference compute"], 19, C.muted, 650, 24, "middle")}`;
  const candidates = candidateYs.map((y, i) => `${line(370, 540, 610, y, C.cobalt)}${card(610, y - 30, 230, 60, i === 2 ? C.green : C.line, i === 2 ? C.tealBg : C.paper)}${text(725, y + 8, [`candidate ${i + 1}`], 20, i === 2 ? C.green : C.ink, 750, 24, "middle", true)}`).join("");
  const verifier = `${candidateYs.map((y) => line(840, y, 1030, 525, C.teal, 3)).join("")}${card(1030, 445, 220, 160, C.maroon, C.redBg)}${text(1140, 505, ["VERIFY"], 24, C.maroon, 900, 28, "middle", true)}${text(1140, 550, ["select / reject"], 20, C.ink, 680, 24, "middle")}${line(1250, 525, 1360, 525, C.teal)}${card(1360, 480, 145, 90, C.green, C.tealBg)}${text(1432, 535, ["RETURN"], 20, C.green, 900, 24, "middle", true)}`;
  return shell(`${header(s)}${model}${candidates}${verifier}${text(800, 735, ["Repeated sampling is one strategy; search, longer reasoning, and tools are distinct."], 22, C.muted, 720, 27, "middle")}`);
}

function render6(s: Slide) {
  const dots = Array.from({ length: 18 }, (_, i) => {
    const x = 830 + (i % 6) * 88;
    const y = 525 + Math.floor(i / 6) * 72;
    const correct = i === 8;
    const selected = i === 15;
    return `<g><circle cx="${x}" cy="${y}" r="24" fill="${correct ? C.green : selected ? C.red : C.line}" opacity="${correct || selected ? 1 : 0.7}"/>${correct ? text(x, y + 7, ["OK"], 14, "#FFFFFF", 900, 16, "middle", true) : selected ? text(x, y + 7, ["SEL"], 12, "#FFFFFF", 900, 14, "middle", true) : ""}</g>`;
  }).join("");
  return shell(`${header(s)}${card(90, 425, 610, 275, C.cobalt, C.blueBg)}${text(130, 480, ["COVERAGE"], 22, C.cobalt, 900, 26, "start", true)}${text(130, 540, wrap("Did any sampled candidate contain the correct answer?", 36), 27, C.ink, 750, 35)}${text(130, 642, ["1 - (1 - p)^k"], 34, C.cobalt, 850, 40, "start", true)}${card(760, 405, 745, 315, C.maroon, C.paper)}${text(802, 455, ["RELIABILITY"], 22, C.maroon, 900, 26, "start", true)}${text(1290, 455, ["green = correct   red = selected"], 16, C.muted, 760, 20, "middle", true)}${dots}${caveat(310, 758, 980, "Formula assumes independent, identical attempts. Real samples correlate, and selectors make errors.")}`);
}

function render7(s: Slide) {
  const domains = [
    [875, "CODE", "unit tests", C.green],
    [1075, "MATH", "rules / answers", C.cobalt],
    [1275, "WRITING + SCIENCE", "expert judgment", C.maroon],
  ] as const;
  return shell(`${header(s)}${card(90, 455, 470, 190, C.cobalt, C.blueBg)}${text(325, 520, ["GENERATOR"], 28, C.cobalt, 900, 32, "middle", true)}${text(325, 570, ["many fast candidates"], 23, C.ink, 680, 28, "middle")}${line(560, 550, 760, 550, C.cobalt, 18)}${card(760, 420, 70, 260, C.maroon, C.redBg)}${text(795, 555, ["GATE"], 18, C.maroon, 900, 20, "middle", true)}${domains.map(([x, name, desc, color]) => `${line(830, 550, x, 550, C.teal, 3)}${card(x, 445, 180, 210, color, C.paper)}${text(x + 90, 495, wrap(name, 14), 20, color, 900, 24, "middle", true)}${text(x + 90, 570, wrap(desc, 14), 21, C.ink, 680, 27, "middle")}`).join("")}${text(800, 735, ["Weak verification can select a polished mistake."], 25, C.red, 850, 30, "middle")}`);
}

function render8(s: Slide) {
  const nodes = [
    [980, 420, "Analyze", C.cobalt],
    [1250, 530, "Try", C.brown],
    [1120, 700, "Inspect", C.teal],
    [820, 650, "Correct", C.maroon],
  ] as const;
  const ring = nodes.map(([x, y, label, color]) => `${card(x - 105, y - 35, 210, 70, color, C.paper)}${text(x, y + 9, [label], 24, color, 900, 28, "middle")}`).join("");
  return shell(`${header(s)}${text(105, 495, wrap("Reasoning is useful when feedback changes the next attempt.", 34), 32, C.ink, 800, 42)}${caveat(100, 635, 500, "A visible reasoning trace is not proof that the reasoning is correct.")}${line(1085, 442, 1190, 495, C.cobalt)}${line(1220, 565, 1160, 660, C.brown)}${line(1015, 685, 915, 670, C.teal)}${line(820, 615, 930, 445, C.maroon)}${ring}${line(820, 650, 735, 540, C.red, 3, true, "10 8")}${card(620, 470, 170, 70, C.red, C.redBg)}${text(705, 513, ["BACKTRACK"], 17, C.red, 900, 20, "middle", true)}`);
}

function render9(s: Slide) {
  const left = `<g transform="translate(90 425)">${card(0, 0, 650, 300, C.cobalt, C.blueBg)}${text(40, 55, ["WITHIN-RUN"], 22, C.cobalt, 900, 26, "start", true)}${text(40, 110, ["retry -> inspect -> revise"], 27, C.ink, 780, 32)}${line(120, 190, 520, 190, C.cobalt)}${line(520, 220, 120, 220, C.cobalt)}${text(325, 270, ["change disappears when the task ends"], 21, C.muted, 650, 25, "middle")}</g>`;
  const right = `<g transform="translate(865 425)">${card(0, 0, 650, 300, C.teal, C.tealBg)}${text(40, 55, ["ACROSS-RUN"], 22, C.teal, 900, 26, "start", true)}${text(40, 110, ["learn -> persist -> reuse"], 27, C.ink, 780, 32)}${["weights", "memory", "tools", "policies", "data"].map((label, i) => pill(40 + (i % 3) * 195, 150 + Math.floor(i / 3) * 75, 175, label, C.teal, C.paper)).join("")}</g>`;
  return shell(`${header(s)}${left}${right}${text(800, 785, ["PERSISTENCE BOUNDARY"], 20, C.maroon, 900, 24, "middle", true)}${line(800, 410, 800, 755, C.maroon, 3, false, "10 8")}`);
}

function render10(s: Slide) {
  const left = `<g transform="translate(90 425)">${card(0, 0, 560, 300, C.brown, C.paper)}${text(280, 60, ["CHATBOT"], 23, C.brown, 900, 27, "middle", true)}${pill(55, 120, 180, "Request", C.brown)}${line(235, 152, 325, 152, C.brown)}${pill(325, 120, 180, "Response", C.brown)}${text(280, 245, ["human owns the task loop"], 22, C.muted, 700, 27, "middle")}</g>`;
  const steps = [["Goal", C.cobalt], ["Plan", C.brown], ["Act", C.maroon], ["Observe", C.teal], ["Correct", C.green], ["Stop", C.ink]] as const;
  const right = `<g transform="translate(735 425)">${card(0, 0, 780, 300, C.teal, C.tealBg)}${text(390, 60, ["AGENT"], 23, C.teal, 900, 27, "middle", true)}${steps.map(([label, color], i) => `${pill(35 + i * 122, 125, 104, label, color, C.paper)}${i < 5 ? line(139 + i * 122, 157, 153 + i * 122, 157, C.teal, 3) : ""}`).join("")}${text(390, 245, ["system owns a bounded goal-directed loop"], 22, C.ink, 750, 27, "middle")}</g>`;
  return shell(`${header(s)}${left}${right}`);
}

function render11(s: Slide) {
  const open = `<g transform="translate(90 420)">${card(0, 0, 650, 315, C.cobalt, C.blueBg)}${text(325, 55, ["OPEN LOOP"], 22, C.cobalt, 900, 26, "middle", true)}${text(325, 105, ["adaptive / less predictable"], 22, C.ink, 680, 27, "middle")}${[0, 1, 2, 3, 4].map((i) => `<circle cx="${110 + i * 105}" cy="${205 + (i % 2) * 50}" r="24" fill="${i === 0 ? C.cobalt : C.paper}" stroke="${C.cobalt}" stroke-width="3"/>${i < 4 ? line(134 + i * 105, 210 + (i % 2) * 50, 190 + i * 105, 245 - (i % 2) * 50, C.cobalt, 3) : ""}`).join("")}</g>`;
  const graph = `<g transform="translate(865 420)">${card(0, 0, 650, 315, C.teal, C.tealBg)}${text(325, 55, ["WORKFLOW GRAPH"], 22, C.teal, 900, 26, "middle", true)}${text(325, 105, ["observable / less flexible"], 22, C.ink, 680, 27, "middle")}${[80, 230, 380, 530].map((x, i) => `${card(x, 175, 90, 70, i === 2 ? C.maroon : C.teal, C.paper)}${text(x + 45, 218, [i === 2 ? "CHECK" : `${i + 1}`], i === 2 ? 14 : 20, i === 2 ? C.maroon : C.teal, 900, 22, "middle", true)}${i < 3 ? line(x + 90, 210, x + 145, 210, C.teal, 3) : ""}`).join("")}</g>`;
  return shell(`${header(s)}${open}${graph}${text(800, 790, ["Choose by task risk, uncertainty, and audit requirements."], 24, C.maroon, 830, 29, "middle")}`);
}

function render12(s: Slide) {
  const qs = [
    [250, 490, "01", "What generates alternatives?", C.cobalt],
    [800, 490, "02", "What verifies success?", C.maroon],
    [1350, 490, "03", "What persists after the task?", C.teal],
  ] as const;
  const visual = qs.map(([x, y, n, q, color]) => `${card(x - 220, y - 100, 440, 200, color, C.paper)}${text(x, y - 42, [n], 20, color, 900, 24, "middle", true)}${text(x, y + 14, wrap(q, 26), 28, C.ink, 820, 35, "middle")}`).join("");
  return shell(`${header(s)}${visual}${line(470, 490, 575, 490, C.teal)}${line(1020, 490, 1125, 490, C.teal)}${card(525, 690, 550, 76, C.cobalt, C.blueBg)}${text(800, 738, ["NEXT: test-time compute scaling"], 22, C.cobalt, 900, 26, "middle", true)}${text(800, 820, ["External validation still matters."], 21, C.muted, 750, 25, "middle")}`);
}

const renderers = [render1, render2, render3, render4, render5, render6, render7, render8, render9, render10, render11, render12];

function prompt(slide: Slide, index: number) {
  return `# Slide ${index + 1}: ${slide.title.join(" ")}\n\n## Production method\nRendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames or logos.\n\n## Style\nAged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, teal feedback paths, cobalt generation, maroon constraints, 8px card corners, no gradients, no decorative imagery.\n\n## On-slide content\n- Stage: ${slide.stage}\n- Headline: ${slide.title.join(" ")}\n- Subtitle: ${slide.subtitle ?? ""}\n- Supporting labels: ${slide.bullets.join("; ")}\n- Evidence: Lecture 1, ${slide.evidence}\n\n## Visual direction\n${slide.visual}\n\n## Teaching objective\n${slide.objective}\n\n## Speaker notes\n${slide.notes}\n`;
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
    return `<image href="data:image/png;base64,${data}" x="${x}" y="${y}" width="${thumbW}" height="${thumbH}"/><text class="ui" x="${x}" y="${y + thumbH + 28}" font-size="18" font-weight="750" fill="${C.ink}">${String(i + 1).padStart(2, "0")}  ${esc(slide.title.join(" "))}</text>`;
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
