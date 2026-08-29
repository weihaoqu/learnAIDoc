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
  subtitle?: string;
  labels: string[];
  evidence: string;
  objective: string;
  notes: string;
  visual: string;
};

const slides: Slide[] = [
  {
    file: "01-slide-cover",
    stage: "test-time scaling",
    title: ["More Inference Compute", "Creates Options, Not Guarantees"],
    subtitle: "Stanford CS329A Part 2 - generation, allocation, and verification under a fixed model",
    labels: ["Generate", "Allocate", "Verify", "Stop"],
    evidence: "01:11-15:34",
    objective: "State why extra inference compute is not itself a reliability guarantee.",
    notes: "More attempts can expose a good candidate that one-shot decoding misses. The deployed system must still allocate its budget and identify success. Ask Q: If one of 100 candidates is correct but a wrong answer is returned, what improved and what did not?",
    visual: "A fixed model fans into candidates, a budget router controls the branches, and a narrow verifier gate returns one answer.",
  },
  {
    file: "02-slide-compute-frontiers",
    stage: "where compute lives",
    title: ["Test-Time Scaling Searches", "Without Changing the Weights"],
    subtitle: "Training changes the model; inference spends a recurring per-request budget.",
    labels: ["Pretraining", "Post-training", "Test time"],
    evidence: "00:05-01:11 + arXiv:2408.03314",
    objective: "Distinguish pretraining, post-training, and test-time compute.",
    notes: "Pretraining builds broad capability. Post-training shapes behavior. Test-time scaling keeps the weights fixed and spends compute on the current task. Training cost can be amortized; inference cost recurs per request.",
    visual: "Three connected compute stages with the test-time model visibly locked.",
  },
  {
    file: "03-slide-repeated-sampling",
    stage: "candidate production",
    title: ["Repeated Sampling", "Buys More Chances"],
    subtitle: "One fixed model produces many candidates; a verifier determines whether the gain is usable.",
    labels: ["Fixed model", "k candidates", "Oracle coverage", "Deployable selector"],
    evidence: "01:29-03:36 + arXiv:2407.21787",
    objective: "Explain repeated sampling and the role of a verifier.",
    notes: "Repeated sampling is the simplest test-time strategy. An oracle verifier can measure whether any candidate is correct, but a deployable selector may not know which candidate is right. Ask which tasks provide executable verification.",
    visual: "A model fans into eight candidates, then passes through separate oracle and deployable gates.",
  },
  {
    file: "04-slide-coverage-reliability",
    stage: "metric boundary",
    title: ["A Correct Candidate Can Exist", "and Still Never Reach the User"],
    subtitle: "Coverage belongs to the candidate set; reliability belongs to the whole pipeline.",
    labels: ["coverage / pass@k", "returned answer", "selector error"],
    evidence: "01:29-03:36 / 12:20-26:55",
    objective: "Separate candidate coverage from returned-answer reliability.",
    notes: "A green candidate in the set improves coverage. If the selector returns a red candidate, deployed reliability did not improve. This is the key benchmark-to-product distinction.",
    visual: "A candidate grid contains a correct answer while a separate wrong answer is selected.",
  },
  {
    file: "05-slide-per-problem-law",
    stage: "per-problem scaling",
    title: ["One Problem Has an", "Exponential Failure Curve"],
    subtitle: "The familiar pass@k formula is an idealized model with visible assumptions.",
    labels: ["pass@k = 1 - (1-p)^k", "constant p", "independent attempts"],
    evidence: "05:27-07:33 + arXiv:2502.17578",
    objective: "Derive the per-problem pass@k intuition and name its assumptions.",
    notes: "Under independent attempts with constant success probability p, failure after k attempts is (1-p)^k. Samples from one model can fail in correlated ways, so the formula is an intuition, not a deployment guarantee.",
    visual: "A formula card and a sequence of shrinking failure bars across attempts.",
  },
  {
    file: "06-slide-heavy-tail",
    stage: "aggregate scaling",
    title: ["A Few Extremely Hard Problems", "Bend the Benchmark Curve"],
    subtitle: "Per-problem exponential scaling and aggregate power laws can coexist.",
    labels: ["many easy", "some medium", "rare extreme tail", "aggregate curve"],
    evidence: "07:33-11:20 + arXiv:2502.17578",
    objective: "Explain why a benchmark average can look power-law scaled.",
    notes: "Easy problems leave the failure pool quickly. A long tail of tasks with tiny single-attempt success probabilities dominates what remains. The power-law observation is aggregate, not a claim that each problem follows a power law.",
    visual: "A heavy-tailed distribution of problem difficulty feeding an aggregate scaling curve.",
  },
  {
    file: "07-slide-verification-gap",
    stage: "verification bottleneck",
    title: ["Generation Scales Only as Far", "as Verification Can Follow"],
    subtitle: "More candidates help when evidence can distinguish success from polished error.",
    labels: ["Code tests", "Proof checker", "Exact answers", "Expert judgment"],
    evidence: "12:20-26:55 + arXiv:2407.21787",
    objective: "Compare verification cost and completeness across domains.",
    notes: "Executable tests can cheaply reject candidates that violate specified checks; they do not prove general correctness. Proof assistants can check formalized proofs. Writing, policy, and science depend on incomplete evaluators or expensive experts. Learned selectors can plateau even while coverage rises.",
    visual: "A verification ladder from executable checks to open-ended expert judgment beside a widening gap.",
  },
  {
    file: "08-slide-parallel-sequential",
    stage: "budget allocation",
    title: ["The Same Budget Can Explore", "Breadth or Refine Depth"],
    subtitle: "Parallel samples diversify; sequential revisions use feedback to repair a path.",
    labels: ["Parallel", "Sequential", "same token budget"],
    evidence: "26:55-30:30",
    objective: "Compare parallel sampling with sequential revision.",
    notes: "Parallel sampling spreads compute across multiple stochastic candidates, whose failures can remain correlated. Sequential revision follows one or more paths and uses feedback. Neither dominates universally; correlation, feedback quality, and difficulty determine the useful mix.",
    visual: "Equal budget meters feed a broad candidate fan and a deep revision chain.",
  },
  {
    file: "09-slide-orm-prm",
    stage: "learned evaluation",
    title: ["Outcome Scores Choose Finishes;", "Process Scores Shape the Route"],
    subtitle: "Reward models guide search, but neither becomes ground truth by definition.",
    labels: ["ORM: final answer", "PRM: each step", "beam search"],
    evidence: "30:30-34:40 + arXiv:2408.03314",
    objective: "Distinguish outcome and process reward models.",
    notes: "An ORM scores the final answer. A PRM scores intermediate steps and can guide beam search. Both are learned evaluators that can be wrong or fail outside their training distribution.",
    visual: "A final-only scorecard beside a tree whose intermediate nodes receive scores and pruning marks.",
  },
  {
    file: "10-slide-difficulty-routing",
    stage: "compute-optimal routing",
    title: ["Compute Allocation Should Change", "With Estimated Difficulty"],
    subtitle: "A uniform best-of-N policy can waste budget on tasks with different marginal returns.",
    labels: ["Easy", "Medium", "Hard", "setup-specific"],
    evidence: "34:40-45:47 + arXiv:2408.03314",
    objective: "Explain difficulty-aware allocation without universalizing the experiment.",
    notes: "The studied setup routes difficulty bands to different search mixes. Extremely hard tasks may gain little from more search if the base model rarely reaches a promising path. Compute optimal means optimal under a chosen model, verifier, methods, and budget.",
    visual: "A difficulty router sends tasks into different parallel-versus-sequential mixes.",
  },
  {
    file: "11-slide-archon",
    stage: "inference architectures",
    title: ["Archon Searches Over", "Inference Architectures, Not Just Answers"],
    subtitle: "Models and inference operators become components in a budgeted architecture search.",
    labels: ["Generators", "Fusers", "Critics", "Rankers", "Verifiers"],
    evidence: "45:47-61:22 + arXiv:2409.15254",
    objective: "Describe Archon's inputs, operators, and architecture-search output.",
    notes: "Archon takes a benchmark, budget, available models, and operator library, then searches for a composition. Results are benchmark, version, operator-set, and budget specific; do not treat a headline percentage as universal superiority.",
    visual: "An operator library enters a search controller that outputs a multi-stage inference graph.",
  },
  {
    file: "12-slide-diagnostic",
    stage: "deck diagnostic",
    title: ["Before Buying More Inference,", "Find the Bottleneck"],
    subtitle: "Use four questions to audit any test-time scaling proposal.",
    labels: ["Diversity", "Allocation", "Verification", "Stopping"],
    evidence: "whole-lecture synthesis",
    objective: "Apply a four-question diagnostic to a new system.",
    notes: "Ask what creates diverse candidates, how the finite budget is allocated, what verifies success, and when the system stops. Bridge to Part 3: robust verification makes generation gains usable.",
    visual: "Four diagnostic cards around a bounded compute meter with a bridge to robust verification.",
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

function txt(x: number, y: number, lines: string[], size: number, color = C.ink, weight = 700, lh = Math.round(size * 1.18), anchor: "start" | "middle" = "start", mono = false) {
  return lines.map((line, i) => `<text class="${mono ? "mono" : "ui"}" x="${x}" y="${y + i * lh}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(line)}</text>`).join("");
}

function card(x: number, y: number, w: number, h: number, stroke = C.line, fill = C.paper, rx = 8) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, color = C.teal, width = 4, dash = "") {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#arrow)"/>`;
}

function pill(x: number, y: number, w: number, label: string, color = C.teal, fill = C.paper) {
  return `<g>${card(x, y, w, 58, color, fill)}${txt(x + w / 2, y + 37, [label], 20, color, 850, 24, "middle", true)}</g>`;
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
  const label = `PART 2  ${s.evidence}`;
  const w = Math.max(260, measure(label) * 10.5 + 40);
  return `${card(1516 - w, 68, w, 43, C.line, C.paper)}${txt(1516 - w / 2, 97, [label], 16, C.muted, 780, 20, "middle", true)}`;
}

function header(s: Slide) {
  return `${badge(s)}${evidence(s)}${txt(86, 188, s.title, 52, C.ink, 920, 59)}${s.subtitle ? txt(90, 188 + s.title.length * 59 + 20, wrap(s.subtitle, 84), 24, C.muted, 560, 30) : ""}`;
}

function caveat(x: number, y: number, w: number, label: string) {
  const lines = wrap(label, Math.floor(w / 13));
  return `${card(x, y, w, 42 + lines.length * 27, C.red, C.redBg)}${txt(x + 20, y + 28, ["CAVEAT"], 15, C.red, 900, 19, "start", true)}${txt(x + 20, y + 57, lines, 20, C.ink, 640, 27)}`;
}

function render1(s: Slide) {
  const candidates = [[930, 335], [1120, 280], [1325, 345], [980, 590], [1190, 660], [1390, 580]];
  const dots = candidates.map(([x, y], i) => `${arrow(805, 485, x - 58, y, C.cobalt, 3)}<circle cx="${x}" cy="${y}" r="39" fill="${i === 4 ? C.tealBg : C.blueBg}" stroke="${i === 4 ? C.green : C.cobalt}" stroke-width="3"/>${txt(x, y + 7, [i === 4 ? "OK" : String(i + 1)], 18, i === 4 ? C.green : C.cobalt, 900, 22, "middle", true)}`).join("");
  return shell(`${badge(s)}${evidence(s)}${txt(90, 245, s.title, 66, C.ink, 930, 76)}${txt(94, 450, wrap(s.subtitle ?? "", 43), 26, C.muted, 560, 34)}${pill(95, 650, 170, "Generate", C.cobalt, C.blueBg)}${pill(280, 650, 170, "Allocate", C.brown, C.amberBg)}${pill(465, 650, 155, "Verify", C.teal, C.tealBg)}${pill(635, 650, 125, "Stop", C.maroon, C.redBg)}${card(650, 410, 155, 150, C.cobalt, C.blueBg)}${txt(727, 465, ["FIXED"], 22, C.cobalt, 900, 26, "middle", true)}${txt(727, 502, ["MODEL"], 25, C.ink, 900, 29, "middle", true)}${txt(727, 535, ["weights locked"], 16, C.muted, 650, 20, "middle")}${candidates}${candidates.map(([x, y]) => arrow(x + 42, y, 1460, 490, C.teal, 2)).join("")}${card(1445, 425, 75, 130, C.maroon, C.redBg)}${txt(1482, 482, ["VERIFY"], 14, C.maroon, 900, 17, "middle", true)}${txt(1482, 518, ["RETURN"], 13, C.ink, 850, 16, "middle", true)}`);
}

function render2(s: Slide) {
  const stages = [
    [90, "PRETRAINING", "broad capability", "changes weights", C.cobalt, C.blueBg],
    [580, "POST-TRAINING", "assistant behavior", "changes weights", C.brown, C.amberBg],
    [1070, "TEST TIME", "search this task", "weights locked", C.teal, C.tealBg],
  ] as const;
  const body = stages.map(([x, a, b, c, color, fill], i) => `${card(x, 425, 420, 260, color, fill)}${txt(x + 34, 478, [`0${i + 1}`], 18, color, 900, 22, "start", true)}${txt(x + 34, 535, [a], 24, color, 900, 29, "start", true)}${txt(x + 34, 588, [b], 25, C.ink, 760, 30)}${pill(x + 34, 615, 205, c, color, C.paper)}${i < 2 ? arrow(x + 420, 555, x + 475, 555, C.teal) : ""}`).join("");
  return shell(`${header(s)}${body}${txt(800, 770, ["TRAIN ONCE  ->  AMORTIZE     |     INFER PER REQUEST  ->  PAY AGAIN"], 20, C.maroon, 850, 24, "middle", true)}`);
}

function render3(s: Slide) {
  const ys = [410, 475, 540, 605, 670];
  const fan = ys.map((y, i) => `${arrow(385, 540, 610, y, C.cobalt, 3)}${card(610, y - 25, 210, 50, i === 2 ? C.green : C.line, i === 2 ? C.tealBg : C.paper)}${txt(715, y + 7, [`candidate ${i + 1}`], 17, i === 2 ? C.green : C.ink, 750, 20, "middle", true)}`).join("");
  return shell(`${header(s)}${card(90, 455, 295, 170, C.cobalt, C.blueBg)}${txt(237, 510, ["FIXED MODEL"], 24, C.cobalt, 900, 28, "middle", true)}${txt(237, 557, ["sample k times"], 22, C.ink, 700, 26, "middle")}${fan}${arrow(820, 540, 1010, 540, C.teal)}${card(1010, 420, 215, 120, C.green, C.tealBg)}${txt(1117, 466, ["ORACLE"], 20, C.green, 900, 24, "middle", true)}${txt(1117, 505, ["measure coverage"], 17, C.ink, 670, 21, "middle")}${card(1010, 585, 215, 120, C.maroon, C.redBg)}${txt(1117, 631, ["SELECTOR"], 20, C.maroon, 900, 24, "middle", true)}${txt(1117, 670, ["choose to return"], 17, C.ink, 670, 21, "middle")}${arrow(1225, 480, 1430, 480, C.green)}${arrow(1225, 645, 1430, 645, C.maroon)}${pill(1430, 451, 90, "any?", C.green)}${pill(1430, 616, 90, "one", C.maroon)}${caveat(360, 760, 880, "Oracle coverage can rise even when a deployable selector cannot find the correct candidate.")}`);
}

function render4(s: Slide) {
  const dots = Array.from({ length: 24 }, (_, i) => {
    const x = 860 + (i % 8) * 76;
    const y = 455 + Math.floor(i / 8) * 78;
    const correct = i === 10;
    const selected = i === 21;
    const fill = correct ? C.green : selected ? C.red : C.line;
    return `<circle cx="${x}" cy="${y}" r="24" fill="${fill}" opacity="${correct || selected ? 1 : 0.72}"/>${correct ? txt(x, y + 6, ["OK"], 13, "#FFFFFF", 900, 16, "middle", true) : selected ? txt(x, y + 6, ["SEL"], 11, "#FFFFFF", 900, 14, "middle", true) : ""}`;
  }).join("");
  return shell(`${header(s)}${card(90, 425, 610, 280, C.cobalt, C.blueBg)}${txt(130, 485, ["COVERAGE / PASS@K"], 22, C.cobalt, 900, 26, "start", true)}${txt(130, 550, wrap("Does any candidate contain the correct answer?", 34), 28, C.ink, 780, 36)}${txt(130, 650, ["candidate-set metric"], 21, C.muted, 700, 25)}${card(770, 405, 745, 320, C.maroon, C.paper)}${txt(810, 455, ["RETURNED RELIABILITY"], 22, C.maroon, 900, 26, "start", true)}${dots}${txt(1142, 705, ["green exists  !=  red selected"], 18, C.red, 850, 22, "middle", true)}${caveat(335, 765, 930, "A benchmark-to-product claim must name both the candidate metric and the selection mechanism.")}`);
}

function render5(s: Slide) {
  const bars = [0.75, 0.56, 0.42, 0.32, 0.24, 0.18].map((p, i) => `<g>${txt(850, 445 + i * 52, [`k=${i + 1}`], 17, C.muted, 760, 20, "start", true)}<rect x="930" y="427" width="0" height="0"/><rect x="930" y="${428 + i * 52}" width="430" height="25" rx="5" fill="${C.line}"/><rect x="930" y="${428 + i * 52}" width="${430 * p}" height="25" rx="5" fill="${C.cobalt}"/></g>`).join("");
  return shell(`${header(s)}${card(90, 420, 620, 290, C.cobalt, C.blueBg)}${txt(400, 505, ["pass@k"], 28, C.cobalt, 900, 34, "middle", true)}${txt(400, 585, ["1 - (1 - p)^k"], 46, C.ink, 900, 54, "middle", true)}${txt(400, 650, ["failure after k = (1 - p)^k"], 21, C.muted, 700, 25, "middle", true)}${card(780, 400, 735, 330, C.teal, C.paper)}${txt(825, 445, ["FAILURE MASS SHRINKS WITH k"], 19, C.teal, 900, 23, "start", true)}${bars}${pill(825, 660, 230, "constant p", C.maroon, C.redBg)}${pill(1075, 660, 270, "independent attempts", C.maroon, C.redBg)}${caveat(350, 770, 900, "Samples from one model can be correlated, so effective diversity may be much lower than k.")}`);
}

function render6(s: Slide) {
  const columns = [360, 300, 240, 175, 120, 80, 50, 32, 20, 12].map((h, i) => `<rect x="110" y="${720 - h}" width="75" height="${h}" rx="5" fill="${i < 5 ? C.cobalt : C.maroon}" opacity="${0.95 - i * 0.055}" transform="translate(${i * 88} 0)"/>`).join("");
  const curve = `<path d="M1070 695 C1140 650 1170 550 1230 520 C1300 485 1360 465 1490 445" fill="none" stroke="${C.teal}" stroke-width="7"/><path d="M1070 695 C1140 610 1210 525 1490 430" fill="none" stroke="${C.line}" stroke-width="3" stroke-dasharray="10 8"/>`;
  return shell(`${header(s)}${card(80, 405, 900, 350, C.cobalt, C.blueBg)}${txt(120, 450, ["DISTRIBUTION OF SINGLE-ATTEMPT DIFFICULTY"], 18, C.cobalt, 900, 22, "start", true)}${columns}${txt(150, 745, ["many easier tasks"], 18, C.cobalt, 760, 22)}${txt(790, 745, ["rare, extremely hard tail"], 18, C.maroon, 760, 22)}${card(1030, 405, 485, 350, C.teal, C.paper)}${txt(1070, 450, ["AGGREGATE FAILURE"], 18, C.teal, 900, 22, "start", true)}${curve}${txt(1280, 625, wrap("hard tail dominates what remains", 24), 22, C.ink, 750, 29, "middle")}${caveat(345, 780, 910, "The aggregate curve can look power-law scaled even though each fixed problem decays exponentially.")}`);
}

function render7(s: Slide) {
  const domains = [
    [100, "CODE", "execute tests", C.green, 0.92],
    [455, "FORMAL PROOFS", "proof checker", C.teal, 0.82],
    [810, "MATH", "rules / exact answer", C.cobalt, 0.62],
    [1165, "WRITING + SCIENCE", "expert judgment", C.maroon, 0.25],
  ] as const;
  const cards = domains.map(([x, name, desc, color, p]) => `${card(x, 455, 300, 235, color, C.paper)}${txt(x + 30, 505, wrap(name, 20), 20, color, 900, 24)}${txt(x + 30, 575, wrap(desc, 20), 22, C.ink, 720, 28)}<rect x="${x + 30}" y="625" width="240" height="23" rx="5" fill="${C.line}"/><rect x="${x + 30}" y="625" width="${240 * p}" height="23" rx="5" fill="${color}"/>${txt(x + 30, 673, ["verification leverage"], 16, C.muted, 650, 20, "start", true)}`).join("");
  return shell(`${header(s)}${cards}${arrow(250, 730, 1320, 730, C.red, 4)}${txt(790, 778, ["more judgment, weaker automation, higher feedback cost"], 20, C.red, 850, 24, "middle", true)}`);
}

function render8(s: Slide) {
  const fan = [440, 500, 560, 620, 680].map((y, i) => `${arrow(240, 560, 410, y, C.cobalt, 3)}${pill(410, y - 27, 150, `sample ${i + 1}`, C.cobalt, C.paper)}`).join("");
  const chain = [870, 1050, 1230, 1410].map((x, i) => `${pill(x, 530, 135, ["draft", "feedback", "revise", "check"][i], i % 2 ? C.maroon : C.teal, C.paper)}${i < 3 ? arrow(x + 135, 559, x + 175, 559, C.teal, 3) : ""}`).join("");
  return shell(`${header(s)}${card(80, 405, 650, 340, C.cobalt, C.blueBg)}${txt(125, 455, ["PARALLEL: BREADTH"], 21, C.cobalt, 900, 25, "start", true)}${pill(105, 530, 135, "model", C.cobalt, C.paper)}${fan}${txt(405, 710, ["diversity across paths"], 19, C.muted, 700, 23, "middle")}${card(790, 405, 730, 340, C.teal, C.tealBg)}${txt(835, 455, ["SEQUENTIAL: DEPTH"], 21, C.teal, 900, 25, "start", true)}${chain}${txt(1155, 660, ["feedback repairs one path"], 19, C.muted, 700, 23, "middle")}${pill(520, 785, 560, "SAME TOTAL BUDGET - DIFFERENT ALLOCATION", C.brown, C.amberBg)}`);
}

function render9(s: Slide) {
  const tree = `<circle cx="1110" cy="455" r="25" fill="${C.cobalt}"/>${[[980, 545], [1110, 545], [1240, 545]].map(([x, y], i) => `${arrow(1110, 480, x, y - 25, C.cobalt, 3)}<circle cx="${x}" cy="${y}" r="25" fill="${i === 1 ? C.green : C.paper}" stroke="${i === 1 ? C.green : C.cobalt}" stroke-width="3"/>${txt(x, y + 6, [String([0.2, 0.8, 0.4][i])], 13, i === 1 ? "#FFFFFF" : C.cobalt, 900, 16, "middle", true)}`).join("")}${[[1045, 655], [1145, 655], [1245, 655]].map(([x, y], i) => `${arrow(1110, 570, x, y - 25, C.teal, 3)}<circle cx="${x}" cy="${y}" r="25" fill="${i === 2 ? C.green : C.paper}" stroke="${C.teal}" stroke-width="3"/>${txt(x, y + 6, [String([0.6, 0.7, 0.9][i])], 13, i === 2 ? "#FFFFFF" : C.teal, 900, 16, "middle", true)}`).join("")}`;
  return shell(`${header(s)}${card(90, 420, 570, 315, C.maroon, C.redBg)}${txt(375, 475, ["OUTCOME REWARD MODEL"], 21, C.maroon, 900, 25, "middle", true)}${pill(160, 560, 150, "draft", C.cobalt, C.paper)}${arrow(310, 589, 430, 589, C.maroon)}${card(430, 535, 160, 108, C.maroon, C.paper)}${txt(510, 575, ["FINAL"], 18, C.maroon, 900, 22, "middle", true)}${txt(510, 614, ["score 0.74"], 22, C.ink, 760, 26, "middle", true)}${txt(375, 695, ["scores the finish"], 19, C.muted, 700, 23, "middle")}${card(750, 400, 765, 355, C.teal, C.tealBg)}${txt(1132, 450, ["PROCESS REWARD MODEL"], 21, C.teal, 900, 25, "middle", true)}${tree}${txt(1375, 695, ["score and prune each step"], 19, C.muted, 700, 23, "middle")}${caveat(390, 785, 820, "Learned reward models can be confidently wrong or fail outside their training distribution.")}`);
}

function render10(s: Slide) {
  const rows = [
    [440, "EASY", "short revision", "high marginal gain", C.green],
    [535, "MEDIUM", "mixed search", "route by estimate", C.cobalt],
    [630, "HARD", "stronger base / verify", "search may saturate", C.maroon],
  ] as const;
  const matrix = rows.map(([y, level, route, gain, color]) => `${pill(110, y, 190, level, color, C.paper)}${arrow(300, y + 29, 485, y + 29, color)}${card(485, y - 5, 420, 70, color, C.paper)}${txt(695, y + 37, [route], 21, C.ink, 750, 25, "middle")}${arrow(905, y + 29, 1060, y + 29, color)}${pill(1060, y, 360, gain, color, C.paper)}`).join("");
  return shell(`${header(s)}${card(80, 395, 1440, 350, C.brown, C.amberBg)}${txt(120, 440, ["ESTIMATED DIFFICULTY"], 18, C.brown, 900, 22, "start", true)}${txt(610, 440, ["BUDGET ROUTE"], 18, C.brown, 900, 22, "middle", true)}${txt(1240, 440, ["EXPECTED RETURN"], 18, C.brown, 900, 22, "middle", true)}${matrix}${caveat(285, 780, 1030, "Compute-optimal means optimal for the chosen model, verifier, methods, difficulty estimate, and budget.")}`);
}

function render11(s: Slide) {
  const ops = ["GENERATOR", "FUSER", "CRITIC", "RANKER", "VERIFIER"].map((label, i) => pill(80, 415 + i * 66, 235, label, [C.cobalt, C.brown, C.maroon, C.teal, C.green][i], C.paper)).join("");
  const graph = `${pill(995, 430, 180, "generate", C.cobalt, C.paper)}${arrow(1175, 459, 1270, 459, C.teal)}${pill(1270, 430, 180, "rank", C.teal, C.paper)}${arrow(1360, 488, 1360, 555, C.teal)}${pill(1270, 555, 180, "fuse", C.brown, C.paper)}${arrow(1270, 584, 1175, 584, C.teal)}${pill(995, 555, 180, "critic", C.maroon, C.paper)}${arrow(1085, 613, 1085, 680, C.teal)}${pill(995, 680, 180, "verify", C.green, C.paper)}`;
  return shell(`${header(s)}${card(60, 385, 290, 390, C.cobalt, C.blueBg)}${txt(205, 420, ["OPERATOR LIBRARY"], 17, C.cobalt, 900, 21, "middle", true)}${ops}${arrow(350, 580, 560, 580, C.teal, 5)}${card(560, 430, 330, 300, C.brown, C.amberBg)}${txt(725, 480, ["ARCHITECTURE"], 21, C.brown, 900, 25, "middle", true)}${txt(725, 515, ["SEARCH"], 26, C.ink, 900, 31, "middle", true)}${pill(625, 565, 200, "benchmark", C.brown, C.paper)}${pill(625, 640, 200, "budget", C.brown, C.paper)}${arrow(890, 580, 965, 580, C.teal, 5)}${card(965, 385, 550, 390, C.teal, C.tealBg)}${txt(1240, 420, ["SELECTED INFERENCE GRAPH"], 17, C.teal, 900, 21, "middle", true)}${graph}${caveat(470, 795, 660, "Results are benchmark-, version-, operator-set-, and budget-specific.")}`);
}

function render12(s: Slide) {
  const qs = [
    [265, 500, "01", "What creates diversity?", C.cobalt],
    [625, 500, "02", "How is budget allocated?", C.brown],
    [985, 500, "03", "What verifies success?", C.teal],
    [1345, 500, "04", "When does it stop?", C.maroon],
  ] as const;
  const cards = qs.map(([x, y, n, q, color]) => `${card(x - 155, y - 105, 310, 210, color, C.paper)}${txt(x, y - 52, [n], 18, color, 900, 22, "middle", true)}${txt(x, y + 12, wrap(q, 22), 25, C.ink, 830, 32, "middle")}`).join("");
  return shell(`${header(s)}${cards}${arrow(420, 500, 465, 500, C.teal)}${arrow(780, 500, 825, 500, C.teal)}${arrow(1140, 500, 1185, 500, C.teal)}${card(460, 700, 680, 78, C.cobalt, C.blueBg)}${txt(800, 748, ["NEXT: PART 3 - ROBUST VERIFICATION"], 22, C.cobalt, 900, 26, "middle", true)}${txt(800, 825, ["The bottleneck moves when generation, selection, cost, or latency saturates."], 20, C.muted, 740, 24, "middle")}`);
}

const renderers = [render1, render2, render3, render4, render5, render6, render7, render8, render9, render10, render11, render12];

function prompt(slide: Slide, index: number) {
  return `# Slide ${index + 1}: ${slide.title.join(" ")}\n\n## Production method\nRendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames or logos.\n\n## Style\nAged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, teal verification, cobalt generation, warm-brown budget, maroon constraints, 8px card corners, no gradients, no decorative imagery.\n\n## On-slide content\n- Stage: ${slide.stage}\n- Headline: ${slide.title.join(" ")}\n- Subtitle: ${slide.subtitle ?? ""}\n- Supporting labels: ${slide.labels.join("; ")}\n- Evidence: CS329A Part 2, ${slide.evidence}\n\n## Visual direction\n${slide.visual}\n\n## Teaching objective\n${slide.objective}\n\n## Speaker notes\n${slide.notes}\n`;
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
