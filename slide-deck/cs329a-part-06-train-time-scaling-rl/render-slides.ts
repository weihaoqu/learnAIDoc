import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = import.meta.dir;
const SVG_DIR = join(DIR, "svgs");
const PROMPT_DIR = join(DIR, "prompts");
const W = 1600;
const H = 900;

const C = {
  bg: "#F5F0E6", paper: "#FFFCF4", ink: "#171717", muted: "#5E6670", line: "#D8D0C0",
  teal: "#2F7373", maroon: "#722F37", brown: "#8B7355", cobalt: "#2563EB",
  red: "#B42318", green: "#16803C", amber: "#B7791F", blueBg: "#F3F7FF",
  tealBg: "#F2FBF8", redBg: "#FFF5F3", amberBg: "#FFF9E8",
};

type Slide = {
  file: string; stage: string; title: string[]; subtitle: string; labels: string[];
  evidence: string; paper: string; objective: string; notes: string; visual: string;
};

const slides: Slide[] = [
  {
    file: "01-slide-cover", stage: "train-time feedback loop",
    title: ["Train-Time Scaling", "Closes the Feedback Loop"],
    subtitle: "Stanford CS329A Part 6 - generated data becomes useful only through verification and parameter updates",
    labels: ["sample", "verify", "learning signal", "update"], evidence: "00:00-05:43",
    paper: "STaR, DeepSeekMath, and DAPO",
    objective: "Define train-time self-improvement as a closed loop that changes model weights.",
    notes: "Lecture 00:00-05:43; STaR, DeepSeekMath, and DAPO. Generation alone is not learning. The loop requires candidate generation, a verifier, a usable learning signal, and an update to model parameters.",
    visual: "A four-stage circular feedback loop wraps around a model-weight core.",
  },
  {
    file: "02-slide-compute-regimes", stage: "compute regimes",
    title: ["Keep Four Compute", "Regimes Separate"],
    subtitle: "They spend compute at different moments, expose different supervision, and do not all change the weights.",
    labels: ["pretraining", "SFT", "test-time search", "train-time improvement"], evidence: "03:07-07:40 / 11:31-16:08",
    paper: "Lecture taxonomy; STaR and DeepSeekMath examples",
    objective: "Distinguish pretraining, supervised fine-tuning, test-time search, and train-time self-improvement.",
    notes: "Lecture 03:07-07:40 and 11:31-16:08. Pretraining and SFT update parameters from external corpora or demonstrations. Test-time search spends inference compute while weights stay locked. Train-time self-improvement uses generated experience to update parameters.",
    visual: "Four lifecycle cards mark when compute is spent and whether weights are open or locked.",
  },
  {
    file: "03-slide-verifiability", stage: "feedback bottleneck",
    title: ["Verifiability Is", "the Feedback Bottleneck"],
    subtitle: "A correct final answer can create scalable signal without validating the rationale, behavior, or tool path.",
    labels: ["answer checker", "opaque rationale", "outcome signal", "uncertified process"], evidence: "05:43-11:31",
    paper: "STaR; DeepSeekMath; DAPO",
    objective: "Separate outcome verifiability from process validity.",
    notes: "Lecture 05:43-11:31; all three primary readings. Exact-answer tasks make outcome verification cheap. That checker does not establish that the chain of thought is faithful, safe, or causally responsible for the answer.",
    visual: "An outcome checker accepts a final answer while an opaque reasoning channel remains outside its certification boundary.",
  },
  {
    file: "04-slide-star-loop", stage: "STaR bootstrapping",
    title: ["STaR Bootstraps", "Rationales"],
    subtitle: "Keep correct-answer rationales, rationalize failures with an answer hint, fine-tune, and repeat.",
    labels: ["generate", "filter", "rationalize", "fine-tune"], evidence: "16:08-27:17",
    paper: "STaR: Bootstrapping Reasoning With Reasoning, arXiv:2203.14465",
    objective: "Explain the two paths through the STaR data-generation loop.",
    notes: "Lecture 16:08-27:17; STaR, arXiv:2203.14465. Correct-answer rationales enter the training set directly. Failed examples get another attempt conditioned on the known answer; successful rationalizations are added before fine-tuning and iteration.",
    visual: "An outer training loop branches at a correctness filter into direct retention and answer-hint rationalization paths.",
  },
  {
    file: "05-slide-rationalization", stage: "answer-hint caveat",
    title: ["Rationalization Helps", "and Can Mislead"],
    subtitle: "The answer hint may reveal a usable path or invite a plausible post-hoc story that the verifier never checked.",
    labels: ["failed attempt", "answer hint", "new rationale", "evidence gap"], evidence: "17:53-25:13 / 30:49-33:54",
    paper: "STaR, arXiv:2203.14465",
    objective: "Identify both the coverage benefit and the faithfulness risk of rationalization.",
    notes: "Lecture 17:53-25:13 and 30:49-33:54; STaR, arXiv:2203.14465. Conditioning on the answer can recover training examples that sampling missed. Yet answer correctness alone does not validate the generated explanation as faithful reasoning.",
    visual: "An answer-hint bridge connects failure to a new rationale, while a red broken-evidence boundary blocks an unwarranted faithfulness claim.",
  },
  {
    file: "06-slide-capability-ceiling", stage: "support boundary",
    title: ["Self-Training Amplifies", "Reachable Behavior"],
    subtitle: "It can make supported strategies more reliable; it is not guaranteed to invent a genuinely absent or OOD strategy.",
    labels: ["base support", "higher density", "unknown region", "no guarantee"], evidence: "37:34-40:53 / 63:12-67:58",
    paper: "Lecture hypothesis and teaching synthesis",
    objective: "Frame a capability ceiling without overstating it as a theorem.",
    notes: "Lecture 37:34-40:53 and 63:12-67:58. This is a lecture hypothesis and diagnostic synthesis, not a universal impossibility theorem. Self-training reliably exploits discoverable behavior; absent strategies may require new data, tools, curricula, or search.",
    visual: "Before-and-after support distributions become denser in a reachable region while an out-of-distribution zone stays unclaimed.",
  },
  {
    file: "07-slide-deepseek-stack", stage: "DeepSeekMath stack",
    title: ["DeepSeekMath Is", "a Full Training Stack"],
    subtitle: "Code initialization, 120B math-related tokens, SFT, and GRPO jointly precede the reported result.",
    labels: ["code base", "120B math tokens", "SFT", "GRPO"], evidence: "40:53-46:25",
    paper: "DeepSeekMath, arXiv:2402.03300",
    objective: "Attribute the result to the complete stack and correct the lecture-slide benchmark label.",
    notes: "Lecture 40:53-46:25; DeepSeekMath, arXiv:2402.03300. Primary-source correction: the paper reports 51.7% on MATH and 60.9% MATH self-consistency@64. The lecture slide's AIME label is incorrect; never cite 51.7% as an AIME result.",
    visual: "A four-layer training stack terminates in a primary-source correction card with the two MATH metrics.",
  },
  {
    file: "08-slide-grpo", stage: "relative group feedback",
    title: ["GRPO Uses Relative", "Group Feedback"],
    subtitle: "Sample a group, normalize rewards within it, and update the policy without a separately learned critic.",
    labels: ["prompt", "group samples", "relative advantage", "policy update"], evidence: "43:49-47:46",
    paper: "DeepSeekMath, arXiv:2402.03300",
    objective: "Explain the operational distinction between GRPO and a critic-based PPO stack.",
    notes: "Lecture 43:49-47:46; DeepSeekMath, arXiv:2402.03300. GRPO estimates a relative baseline from rewards within a sampled group, reducing the need for a separate value model. The signal depends on useful reward variation inside the group.",
    visual: "A compact GRPO lane contrasts group-normalized rewards with a crossed-out standalone critic lane.",
  },
  {
    file: "09-slide-reward-variation", stage: "signal geometry",
    title: ["No Reward Variation Means", "No Relative Signal"],
    subtitle: "All-wrong and all-correct groups collapse the within-group advantage; mixed groups carry the update signal.",
    labels: ["all wrong", "mixed", "all correct", "dynamic sampling"], evidence: "47:46-52:17 / 55:21-57:32",
    paper: "DeepSeekMath; DAPO, arXiv:2503.14476",
    objective: "Show why reward diversity is load-bearing for group-relative optimization.",
    notes: "Lecture 47:46-52:17 and 55:21-57:32; DeepSeekMath, arXiv:2402.03300, and DAPO, arXiv:2503.14476. If every sample receives the same reward, normalized relative advantages collapse. DAPO's dynamic sampling filters prompts without useful variation, which changes the effective training distribution and should not be treated as a neutral preprocessing step.",
    visual: "Three reward groups show zero, nonzero, and zero centered advantages; only the mixed group emits a learning signal.",
  },
  {
    file: "10-slide-majority-pass", stage: "evaluation semantics",
    title: ["Majority@k and Pass@k", "Measure Different Things"],
    subtitle: "One rewards consensus around the modal answer; the other asks whether any sampled candidate succeeds.",
    labels: ["consensus", "coverage", "aggregation", "oracle selection"], evidence: "52:17-53:05 / 63:12-65:11",
    paper: "Lecture metric comparison; DeepSeekMath context",
    objective: "Prevent interchangeable use of majority@k and pass@k.",
    notes: "Lecture 52:17-53:05 and 63:12-65:11; DeepSeekMath, arXiv:2402.03300, provides the surrounding RL context. Majority@k aggregates samples by vote and can fail when a correct answer is rare. Pass@k measures whether at least one sampled candidate succeeds and assumes an oracle-like checker can identify it. They answer different evaluation questions.",
    visual: "The same candidate set feeds a voting box and an any-success oracle, producing different outcomes.",
  },
  {
    file: "11-slide-dapo-controls", stage: "DAPO stabilization",
    title: ["DAPO Stabilizes RL", "With Four Coupled Controls"],
    subtitle: "Clip-Higher, dynamic sampling, token-level loss, and overlong reward shaping form one cumulative recipe.",
    labels: ["Clip-Higher", "dynamic sampling", "token loss", "overlong shaping"], evidence: "53:05-61:49",
    paper: "DAPO, arXiv:2503.14476",
    objective: "Explain DAPO as a coupled recipe and bound its reported gain to the paper's setup.",
    notes: "Lecture 53:05-61:49; DAPO, arXiv:2503.14476. The paper's cumulative ablation moves from about 30 to 50 AIME 2024 average@32 using a Qwen2.5-32B base model. This is setup-specific and does not establish a universal threshold or isolated effect for any single control.",
    visual: "Four control modules stabilize a training loop beside a bounded setup-specific 30 -> 50 result card.",
  },
  {
    file: "12-slide-signal-diagnostic", stage: "method diagnostic",
    title: ["Diagnose the Signal", "Before Scaling the Loop"],
    subtitle: "Generated data helps only when the verifier, exploration support, reward variation, and update path are adequate.",
    labels: ["verifier", "support", "variation", "update"], evidence: "61:49-72:34",
    paper: "STaR + DeepSeekMath + DAPO teaching synthesis",
    objective: "Apply a four-gate diagnostic to a proposed self-improvement loop.",
    notes: "Lecture 61:49-72:34; teaching synthesis grounded in STaR, DeepSeekMath, and DAPO. Ask four questions: Is the target verifiable? Can the current policy discover useful candidates? Do samples produce informative reward variation? Can the update improve behavior without destabilizing training? Stop or redesign when a gate fails.",
    visual: "A four-gate diagnostic routes a proposed loop to scale, redesign, add supervision, or stop.",
  },
];

function ensure(path: string) { if (!existsSync(path)) mkdirSync(path, { recursive: true }); }
function esc(s: string) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;"); }
function measure(s: string) { return [...s].reduce((n, ch) => n + (/[^\x00-\x7F]/.test(ch) ? 1.7 : 1), 0); }
function wrap(s: string, max: number) {
  const lines: string[] = []; let line = "";
  for (const word of s.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (measure(next) > max && line) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line); return lines;
}
function txt(x: number, y: number, lines: string[], size: number, color = C.ink, weight = 700, lh = Math.round(size * 1.18), anchor: "start" | "middle" | "end" = "start", mono = false) {
  return lines.map((line, i) => `<text class="${mono ? "mono" : "ui"}" x="${x}" y="${y + i * lh}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(line)}</text>`).join("");
}
function card(x: number, y: number, w: number, h: number, stroke = C.line, fill = C.paper, rx = 8) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`; }
function arrow(x1: number, y1: number, x2: number, y2: number, color = C.teal, width = 4, dash = "") { return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#arrow)"/>`; }
function curve(d: string, color = C.teal, width = 4, dash = "") { return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#arrow)"/>`; }
function pill(x: number, y: number, w: number, label: string, color = C.teal, fill = C.paper) { return `<g>${card(x, y, w, 54, color, fill)}${txt(x + w / 2, y + 35, [label], 17, color, 850, 21, "middle", true)}</g>`; }
function shell(inner: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M46 0 L0 0 0 46" fill="none" stroke="${C.line}" stroke-width="1" opacity="0.38"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke"/></marker></defs><style>.ui{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Arial,sans-serif;letter-spacing:0}.mono{font-family:"SFMono-Regular","SF Mono",Consolas,monospace;letter-spacing:0}</style><rect width="${W}" height="${H}" fill="${C.bg}"/><rect width="${W}" height="${H}" fill="url(#grid)"/><rect x="42" y="42" width="1516" height="816" rx="8" fill="${C.paper}" opacity="0.92"/>${inner}</svg>`;
}
function badge(s: Slide) { const w = Math.max(235, measure(s.stage) * 12 + 54); return `${card(84, 68, w, 43, C.teal, C.tealBg)}${txt(108, 97, [s.stage.toUpperCase()], 17, C.teal, 900, 21, "start", true)}`; }
function evidence(s: Slide) { const label = `PART 6  ${s.evidence}`; const w = Math.max(285, measure(label) * 10.3 + 40); return `${card(1516 - w, 68, w, 43, C.line, C.paper)}${txt(1516 - w / 2, 97, [label], 15, C.muted, 780, 19, "middle", true)}`; }
function header(s: Slide) { return `${badge(s)}${evidence(s)}${txt(86, 188, s.title, 52, C.ink, 920, 59)}${txt(90, 188 + s.title.length * 59 + 20, wrap(s.subtitle, 88), 23, C.muted, 560, 29)}`; }
function caveat(x: number, y: number, w: number, label: string) { const lines = wrap(label, Math.floor(w / 13)); return `${card(x, y, w, 42 + lines.length * 25, C.red, C.redBg)}${txt(x + 20, y + 27, ["CAVEAT"], 14, C.red, 900, 18, "start", true)}${txt(x + 20, y + 54, lines, 18, C.ink, 640, 25)}`; }
function node(x: number, y: number, w: number, a: string, b: string, color: string, fill: string) { return `${card(x, y, w, 112, color, fill)}${txt(x + w / 2, y + 42, [a], 18, color, 900, 22, "middle", true)}${txt(x + w / 2, y + 78, wrap(b, Math.floor(w / 12)), 17, C.ink, 700, 21, "middle")}`; }

function render1(s: Slide) {
  const steps = [[845, 315, "01", "SAMPLE", C.cobalt, C.blueBg], [1190, 315, "02", "VERIFY", C.teal, C.tealBg], [1190, 610, "03", "LEARN", C.brown, C.amberBg], [845, 610, "04", "UPDATE", C.maroon, C.redBg]] as const;
  const boxes = steps.map(([x, y, n, a, c, f]) => `${card(x, y, 250, 120, c, f)}${txt(x + 28, y + 35, [n], 15, c, 900, 19, "start", true)}${txt(x + 125, y + 78, [a], 23, c, 920, 28, "middle", true)}`).join("");
  return shell(`${badge(s)}${evidence(s)}${txt(90, 245, s.title, 65, C.ink, 930, 76)}${txt(94, 465, wrap(s.subtitle, 43), 25, C.muted, 560, 33)}${pill(95, 690, 155, "GENERATE", C.cobalt, C.blueBg)}${pill(270, 690, 155, "CHECK", C.teal, C.tealBg)}${pill(445, 690, 155, "LEARN", C.brown, C.amberBg)}${pill(620, 690, 155, "CHANGE", C.maroon, C.redBg)}${boxes}${arrow(1095, 375, 1190, 375, C.cobalt)}${arrow(1315, 435, 1315, 610, C.teal)}${arrow(1190, 670, 1095, 670, C.brown)}${arrow(970, 610, 970, 435, C.maroon)}${card(995, 465, 295, 105, C.ink, C.paper)}${txt(1142, 508, ["MODEL WEIGHTS"], 20, C.ink, 920, 24, "middle", true)}${txt(1142, 542, ["theta -> theta'"], 18, C.maroon, 800, 22, "middle", true)}`);
}

function render2(s: Slide) {
  const cols = [[75, "01", "PRETRAIN", "before deployment", "OPEN", C.cobalt, C.blueBg], [450, "02", "SFT", "demonstrations", "OPEN", C.brown, C.amberBg], [825, "03", "TEST-TIME", "search / sample", "LOCKED", C.teal, C.tealBg], [1200, "04", "TRAIN-TIME", "generated experience", "OPEN", C.maroon, C.redBg]] as const;
  const body = cols.map(([x, n, a, b, w, c, f]) => `${card(x, 415, 325, 330, c, f)}${txt(x + 30, 457, [n], 16, c, 900, 20, "start", true)}${txt(x + 30, 515, [a], 25, c, 920, 30, "start", true)}${txt(x + 30, 570, [b], 20, C.ink, 720, 25)}${pill(x + 30, 640, 150, `WEIGHTS ${w}`, c, C.paper)}${txt(x + 30, 716, [w === "LOCKED" ? "changes outputs" : "changes policy"], 17, C.muted, 700, 21)}`).join("");
  return shell(`${header(s)}${body}${txt(800, 810, ["COMPUTE LOCATION  !=  LEARNING MECHANISM"], 20, C.maroon, 900, 24, "middle", true)}`);
}

function render3(s: Slide) {
  return shell(`${header(s)}${card(80, 420, 575, 300, C.cobalt, C.blueBg)}${txt(367, 465, ["MODEL TRAJECTORY"], 19, C.cobalt, 900, 23, "middle", true)}${pill(125, 530, 170, "RATIONALE", C.cobalt, C.paper)}${arrow(295, 557, 410, 557, C.cobalt)}${pill(410, 530, 170, "ANSWER", C.cobalt, C.paper)}${txt(367, 665, ["reasoning remains opaque"], 18, C.muted, 700, 22, "middle")}${arrow(655, 570, 790, 570, C.teal, 5)}${card(790, 440, 320, 260, C.teal, C.tealBg)}${txt(950, 488, ["OUTCOME CHECKER"], 18, C.teal, 900, 22, "middle", true)}${txt(950, 560, ["answer == key"], 25, C.ink, 900, 30, "middle", true)}${pill(850, 615, 200, "SCALABLE SIGNAL", C.green, C.paper)}${arrow(1110, 570, 1220, 570, C.teal)}${card(1220, 420, 300, 300, C.red, C.redBg)}${txt(1370, 470, ["NOT CERTIFIED"], 18, C.red, 900, 22, "middle", true)}${txt(1260, 530, ["faithful rationale", "safe behavior", "valid tool path"], 21, C.ink, 760, 45)}${caveat(385, 770, 830, "Outcome verification creates useful signal, but it does not certify the process that produced the answer.")}`);
}

function render4(s: Slide) {
  return shell(`${header(s)}${node(75, 470, 220, "01", "generate rationale", C.cobalt, C.blueBg)}${arrow(295, 526, 365, 526, C.cobalt)}${node(365, 470, 220, "02", "check answer", C.teal, C.tealBg)}${arrow(585, 526, 675, 526, C.teal)}${node(675, 410, 250, "CORRECT", "retain example", C.green, C.tealBg)}${node(675, 590, 250, "WRONG", "add answer hint", C.red, C.redBg)}${arrow(925, 466, 1040, 526, C.green)}${arrow(925, 646, 1040, 580, C.maroon)}${node(1040, 470, 220, "03", "training set", C.brown, C.amberBg)}${arrow(1260, 526, 1330, 526, C.brown)}${node(1330, 470, 190, "04", "fine-tune", C.maroon, C.redBg)}${curve("M1425 582 C1450 800 185 805 185 582", C.maroon, 4, "10 8")}${txt(800, 800, ["REPEAT WITH THE UPDATED MODEL"], 19, C.maroon, 900, 23, "middle", true)}`);
}

function render5(s: Slide) {
  return shell(`${header(s)}${node(90, 500, 260, "FAILED ATTEMPT", "no verified answer", C.red, C.redBg)}${arrow(350, 556, 480, 556, C.maroon)}${card(480, 455, 290, 200, C.brown, C.amberBg)}${txt(625, 500, ["ANSWER HINT"], 19, C.brown, 900, 23, "middle", true)}${txt(625, 555, ["condition on y*"], 25, C.ink, 900, 30, "middle", true)}${txt(625, 610, ["try again"], 18, C.muted, 700, 22, "middle")}${arrow(770, 556, 900, 556, C.brown)}${node(900, 500, 270, "NEW RATIONALE", "answer now correct", C.teal, C.tealBg)}${arrow(1170, 556, 1300, 556, C.teal)}${card(1300, 455, 220, 200, C.green, C.tealBg)}${txt(1410, 500, ["USEFUL"], 19, C.green, 900, 23, "middle", true)}${txt(1410, 548, ["training"], 21, C.ink, 800, 25, "middle")}${txt(1410, 580, ["example"], 21, C.ink, 800, 25, "middle")}${card(885, 705, 650, 95, C.red, C.redBg)}${txt(1210, 743, ["CORRECT ANSWER"], 17, C.red, 900, 21, "middle", true)}${txt(1210, 775, ["does not prove a faithful explanation"], 19, C.ink, 760, 23, "middle")}`);
}

function render6(s: Slide) {
  const dots = (cx: number, cy: number, color: string, spread: number, n: number) => Array.from({ length: n }, (_, i) => { const a = (i * 2.4) % 6.28; const r = 18 + (i % 5) * spread; return `<circle cx="${cx + Math.cos(a) * r}" cy="${cy + Math.sin(a) * r * 0.55}" r="${5 + (i % 3)}" fill="${color}" opacity="0.72"/>`; }).join("");
  return shell(`${header(s)}${card(90, 425, 610, 315, C.cobalt, C.blueBg)}${txt(395, 468, ["BEFORE"], 18, C.cobalt, 900, 22, "middle", true)}${dots(360, 585, C.cobalt, 14, 16)}${card(510, 510, 130, 150, C.red, C.redBg)}${txt(575, 558, ["OOD"], 18, C.red, 900, 22, "middle", true)}${txt(575, 603, ["?"], 38, C.red, 900, 44, "middle", true)}${card(820, 425, 610, 315, C.teal, C.tealBg)}${txt(1125, 468, ["AFTER SELF-TRAINING"], 18, C.teal, 900, 22, "middle", true)}${dots(1050, 585, C.teal, 8, 28)}${card(1240, 510, 130, 150, C.red, C.redBg)}${txt(1305, 558, ["OOD"], 18, C.red, 900, 22, "middle", true)}${txt(1305, 603, ["?"], 38, C.red, 900, 44, "middle", true)}${arrow(700, 582, 820, 582, C.brown, 5)}${caveat(350, 775, 900, "Lecture hypothesis, not a theorem: absent strategies may require new data, tools, curricula, or search.")}`);
}

function render7(s: Slide) {
  const stack = [[100, 450, "01", "CODE MODEL", "initialization", C.cobalt, C.blueBg], [390, 450, "02", "120B TOKENS", "math-related", C.teal, C.tealBg], [680, 450, "03", "SFT", "worked examples", C.brown, C.amberBg], [970, 450, "04", "GRPO", "relative rewards", C.maroon, C.redBg]] as const;
  const blocks = stack.map(([x, , n, a, b, c, f], i) => `${card(x, 450, 240, 220, c, f)}${txt(x + 30, 492, [n], 15, c, 900, 19, "start", true)}${txt(x + 30, 545, [a], 20, c, 900, 24)}${txt(x + 30, 595, [b], 18, C.ink, 720, 22)}${i < 3 ? arrow(x + 240, 560, x + 280, 560, C.teal, 3) : ""}`).join("");
  return shell(`${header(s)}${blocks}${card(1260, 420, 260, 300, C.green, C.tealBg)}${txt(1390, 466, ["PRIMARY SOURCE"], 17, C.green, 900, 21, "middle", true)}${txt(1390, 530, ["51.7%"], 36, C.ink, 930, 42, "middle", true)}${txt(1390, 565, ["MATH"], 20, C.green, 900, 24, "middle", true)}${txt(1390, 625, ["60.9%"], 30, C.ink, 930, 36, "middle", true)}${txt(1390, 657, ["MATH SC@64"], 17, C.green, 900, 21, "middle", true)}${card(1020, 755, 500, 70, C.red, C.redBg)}${txt(1270, 798, ["SOURCE CORRECTION: NOT AIME"], 20, C.red, 920, 24, "middle", true)}`);
}

function render8(s: Slide) {
  const samples = [0.1, 1, 0.4, 0.9].map((r, i) => `${card(480 + i * 155, 470, 125, 110, r > 0.5 ? C.green : C.red, r > 0.5 ? C.tealBg : C.redBg)}${txt(542 + i * 155, 510, [`o${i + 1}`], 17, C.ink, 850, 21, "middle", true)}${txt(542 + i * 155, 550, [`r=${r}`], 18, r > 0.5 ? C.green : C.red, 850, 22, "middle", true)}`).join("");
  return shell(`${header(s)}${node(80, 470, 260, "PROMPT", "sample a group", C.cobalt, C.blueBg)}${arrow(340, 526, 460, 526, C.cobalt)}${samples}${arrow(1070, 526, 1170, 526, C.teal)}${card(1170, 435, 350, 260, C.teal, C.tealBg)}${txt(1345, 480, ["GROUP BASELINE"], 18, C.teal, 900, 22, "middle", true)}${txt(1345, 535, ["A_i = r_i - mean(r)"], 22, C.ink, 900, 27, "middle", true)}${pill(1245, 600, 200, "UPDATE POLICY", C.maroon, C.paper)}${card(470, 700, 500, 90, C.red, C.paper)}${txt(720, 738, ["NO SEPARATE LEARNED CRITIC"], 18, C.red, 900, 22, "middle", true)}${txt(720, 768, ["relative group signal replaces that component"], 17, C.muted, 700, 21, "middle")}`);
}

function render9(s: Slide) {
  const group = (x: number, title: string, rewards: number[], color: string, fill: string, signal: string) => `${card(x, 430, 430, 300, color, fill)}${txt(x + 215, 474, [title], 18, color, 900, 22, "middle", true)}${rewards.map((r, i) => `<circle cx="${x + 85 + i * 85}" cy="555" r="30" fill="${r ? C.green : C.red}" opacity="0.88"/>${txt(x + 85 + i * 85, 562, [String(r)], 17, C.paper, 900, 20, "middle", true)}`).join("")}${txt(x + 215, 635, [signal], 22, C.ink, 850, 27, "middle")}${txt(x + 215, 680, [rewards.every(r => r === rewards[0]) ? "advantages collapse" : "nonzero advantages"], 17, C.muted, 700, 21, "middle")}`;
  return shell(`${header(s)}${group(75, "ALL WRONG", [0,0,0,0], C.red, C.redBg, "NO SIGNAL")}${group(585, "MIXED", [0,1,0,1], C.teal, C.tealBg, "LEARNING SIGNAL")}${group(1095, "ALL CORRECT", [1,1,1,1], C.green, C.tealBg, "NO SIGNAL")}${caveat(360, 775, 880, "Dynamic sampling restores variation but also changes which prompts define the effective training distribution.")}`);
}

function render10(s: Slide) {
  const candidates = ["A", "A", "A", "B", "C*", "D"];
  const row = (y: number) => candidates.map((a, i) => `${card(120 + i * 145, y, 110, 70, a === "C*" ? C.green : a === "A" ? C.cobalt : C.line, a === "C*" ? C.tealBg : C.paper)}${txt(175 + i * 145, y + 44, [a], 21, a === "C*" ? C.green : C.ink, 900, 25, "middle", true)}`).join("");
  return shell(`${header(s)}${card(80, 430, 920, 300, C.cobalt, C.blueBg)}${txt(120, 475, ["SAME SIX CANDIDATES"], 18, C.cobalt, 900, 22, "start", true)}${row(525)}${txt(540, 650, ["A is modal; C* is the only correct answer"], 19, C.muted, 700, 23, "middle")}${arrow(1000, 515, 1115, 515, C.cobalt)}${arrow(1000, 645, 1115, 645, C.teal)}${card(1115, 440, 405, 135, C.cobalt, C.blueBg)}${txt(1317, 480, ["MAJORITY@k"], 18, C.cobalt, 900, 22, "middle", true)}${txt(1317, 530, ["returns A  -> wrong"], 22, C.ink, 850, 27, "middle")}${card(1115, 610, 405, 135, C.teal, C.tealBg)}${txt(1317, 650, ["PASS@k"], 18, C.teal, 900, 22, "middle", true)}${txt(1317, 700, ["finds C*  -> success"], 22, C.ink, 850, 27, "middle")}${txt(800, 805, ["CONSENSUS  !=  COVERAGE"], 20, C.maroon, 900, 24, "middle", true)}`);
}

function render11(s: Slide) {
  const controls = [[75, "01", "CLIP-HIGHER", "protect exploration", C.cobalt, C.blueBg], [375, "02", "DYNAMIC SAMPLE", "keep reward variation", C.teal, C.tealBg], [675, "03", "TOKEN LOSS", "balance response lengths", C.brown, C.amberBg], [975, "04", "OVERLONG SHAPE", "bound truncation", C.maroon, C.redBg]] as const;
  const blocks = controls.map(([x, n, a, b, c, f]) => `${card(x, 440, 260, 240, c, f)}${txt(x + 28, 480, [n], 15, c, 900, 19, "start", true)}${txt(x + 28, 535, wrap(a, 18), 19, c, 900, 23)}${txt(x + 28, 620, wrap(b, 22), 17, C.ink, 720, 21)}`).join("");
  return shell(`${header(s)}${blocks}${card(1280, 410, 240, 300, C.green, C.tealBg)}${txt(1400, 455, ["PAPER SETUP"], 17, C.green, 900, 21, "middle", true)}${txt(1400, 525, ["30 -> 50"], 33, C.ink, 930, 39, "middle", true)}${txt(1400, 570, ["AIME24 avg@32"], 16, C.green, 900, 20, "middle", true)}${txt(1400, 620, ["Qwen2.5-32B"], 16, C.muted, 750, 20, "middle", true)}${txt(1400, 670, ["cumulative recipe"], 16, C.muted, 750, 20, "middle")}${caveat(300, 760, 1000, "Setup-specific cumulative result; it is not a universal threshold or an isolated effect of one control.")}`);
}

function render12(s: Slide) {
  const gates = [[75, "01", "VERIFIER", "target checkable?", C.teal, C.tealBg], [375, "02", "SUPPORT", "useful samples?", C.cobalt, C.blueBg], [675, "03", "VARIATION", "relative signal?", C.brown, C.amberBg], [975, "04", "UPDATE", "stable learning?", C.maroon, C.redBg]] as const;
  const body = gates.map(([x, n, a, b, c, f], i) => `${card(x, 445, 260, 230, c, f)}${txt(x + 28, 485, [n], 15, c, 900, 19, "start", true)}${txt(x + 130, 545, [a], 20, c, 900, 24, "middle", true)}${txt(x + 130, 600, [b], 18, C.ink, 720, 22, "middle")}${i < 3 ? arrow(x + 260, 560, x + 290, 560, C.teal, 3) : ""}`).join("");
  return shell(`${header(s)}${body}${arrow(1235, 560, 1310, 560, C.green, 5)}${card(1310, 445, 210, 230, C.green, C.tealBg)}${txt(1415, 510, ["SCALE"], 24, C.green, 930, 29, "middle", true)}${txt(1415, 565, ["or"], 17, C.muted, 700, 21, "middle")}${txt(1415, 610, ["REDESIGN"], 22, C.red, 930, 27, "middle", true)}${card(330, 755, 940, 80, C.red, C.paper)}${txt(800, 790, ["A FAILED GATE IS AN ENGINEERING RESULT"], 20, C.red, 920, 24, "middle", true)}${txt(800, 820, ["Add supervision, widen exploration, repair rewards, or stop."], 17, C.muted, 700, 21, "middle")}`);
}

const renderers = [render1, render2, render3, render4, render5, render6, render7, render8, render9, render10, render11, render12];

function prompt(slide: Slide, index: number) {
  return `# Slide ${index + 1}: ${slide.title.join(" ")}\n\n## Production method\nRendered locally as an original 1600x900 SVG for exact text fidelity, then converted to PNG. Do not reproduce Stanford course frames, logos, or diagrams.\n\n## Style\nAged-cream academic technical briefing, faint engineering grid, crisp vector diagrams, near-black type, cobalt generation, teal verification, warm-brown training, maroon constraints, 8px card corners, no gradients, no decorative imagery.\n\n## On-slide content\n- Stage: ${slide.stage}\n- Headline: ${slide.title.join(" ")}\n- Subtitle: ${slide.subtitle}\n- Supporting labels: ${slide.labels.join("; ")}\n- Lecture evidence: CS329A Part 6, ${slide.evidence}\n- Primary-paper basis: ${slide.paper}\n\n## Visual direction\n${slide.visual}\n\n## Teaching objective\n${slide.objective}\n\n## Speaker notes\n${slide.notes}\n`;
}

function contactSheet() {
  const thumbW = 480, thumbH = 270, gap = 26, margin = 34, cols = 3;
  const rows = Math.ceil(slides.length / cols), cw = margin * 2 + cols * thumbW + (cols - 1) * gap;
  const ch = margin * 2 + rows * (thumbH + 42) + (rows - 1) * gap;
  const images = slides.map((slide, i) => {
    const x = margin + (i % cols) * (thumbW + gap), y = margin + Math.floor(i / cols) * (thumbH + 42 + gap);
    const data = readFileSync(join(DIR, `${slide.file}.png`)).toString("base64");
    return `<image href="data:image/png;base64,${data}" x="${x}" y="${y}" width="${thumbW}" height="${thumbH}"/><text class="ui" x="${x}" y="${y + thumbH + 28}" font-size="17" font-weight="750" fill="${C.ink}">${String(i + 1).padStart(2, "0")}  ${esc(slide.title.join(" "))}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}" viewBox="0 0 ${cw} ${ch}"><style>.ui{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}</style><rect width="100%" height="100%" fill="#E8E2D7"/>${images}</svg>`;
}

ensure(SVG_DIR); ensure(PROMPT_DIR);
slides.forEach((slide, i) => {
  const svgPath = join(SVG_DIR, `${slide.file}.svg`), pngPath = join(DIR, `${slide.file}.png`);
  writeFileSync(svgPath, renderers[i](slide));
  writeFileSync(join(PROMPT_DIR, `${slide.file}.md`), prompt(slide, i));
  const result = Bun.spawnSync(["sips", "-s", "format", "png", svgPath, "--out", pngPath], { stdout: "pipe", stderr: "pipe" });
  if (result.exitCode !== 0) throw new Error(`sips failed for ${slide.file}: ${result.stderr.toString()}`);
});
const sheetSvg = join(DIR, "contact-sheet.svg");
writeFileSync(sheetSvg, contactSheet());
const sheet = Bun.spawnSync(["sips", "-s", "format", "png", sheetSvg, "--out", join(DIR, "contact-sheet.png")], { stdout: "pipe", stderr: "pipe" });
if (sheet.exitCode !== 0) throw new Error(`sips failed for contact sheet: ${sheet.stderr.toString()}`);
console.log(`Rendered ${slides.length} slides and prompts in ${DIR}`);
