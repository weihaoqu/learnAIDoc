import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = import.meta.dir;
const SVG_DIR = join(DIR, "svgs");
const PROMPT_DIR = join(DIR, "prompts");
const W = 1600;
const H = 900;

const C = {
  bg: "#EEEAE1",
  paper: "#FFFEF8",
  ink: "#172027",
  muted: "#52606B",
  line: "#CFD3CE",
  blue: "#145DA0",
  blueBg: "#EDF6FF",
  teal: "#087E73",
  tealBg: "#ECFAF7",
  green: "#287A45",
  greenBg: "#EFF9F1",
  amber: "#A86500",
  amberBg: "#FFF6DD",
  red: "#B3342D",
  redBg: "#FFF0EE",
  violet: "#6853A6",
  violetBg: "#F5F1FF",
};

type Claim = "TEACHING SYNTHESIS" | "REPORTED EVIDENCE" | "BOUNDARY" | "CLASSROOM LAB";
type Slide = {
  file: string;
  stage: string;
  title: string[];
  subtitle: string;
  claim: Claim;
  time: string;
  source: string;
  objective: string;
  visual: string;
  notes: string;
  kind: string;
};

const slides: Slide[] = [
  {
    file: "01-slide-cover",
    stage: "60-minute classroom lab",
    title: ["Engineering Agent", "Improvement Loops"],
    subtitle: "From self-critique to verified revision.",
    claim: "TEACHING SYNTHESIS",
    time: "1 min",
    source: "Independent teaching companion; research map on Slide 4",
    objective: "Establish the lesson promise and the evidence-first principle.",
    visual: "A bounded loop moves from contract to attempt, verification, revision, and human handoff.",
    notes: `Today we will not learn a magic prompt. We will learn how to decide whether an agent should iterate at all, how to make errors visible, and how to stop. The viral idea is to ask a model to revise until it awards itself 95 points. That can produce a more polished answer, but the score is not proof. Our replacement principle is simple: revise until externally checkable criteria pass, or hand the task to a person when evidence or authority runs out. The first twenty-eight minutes build the framework and one worked case. The next twenty-two minutes compare three workflows. The final ten minutes assess the evidence and transfer the pattern to a new task.`,
    kind: "cover",
  },
  {
    file: "02-slide-seductive-95",
    stage: "opening case",
    title: ["The Seductive", "95-Point Prompt"],
    subtitle: "Keep the loop. Reject the self-awarded score as proof.",
    claim: "TEACHING SYNTHESIS",
    time: "2 min",
    source: "Opening case supplied by Q; conceptual analysis",
    objective: "Separate useful iterative revision from unsupported certification.",
    visual: "A self-score gauge is contrasted with an evidence checklist.",
    notes: `The prompt contains a real design pattern: define criteria, draft, critique, revise, and repeat. The weak part is the stopping signal. A model can raise its own score because wording improved, because it adapted to its rubric, or simply because the prompt asks for progress. None of those outcomes establishes truth. Treat self-critique as a way to propose defects. Treat tests, source support, calculations, explicit constraints, and qualified review as evidence. The important distinction is between an output that looks better and an output whose relevant claims or behavior have been checked.`,
    kind: "score",
  },
  {
    file: "03-slide-prompt-vs-agent",
    stage: "system distinction",
    title: ["A Prompt Is Not Yet", "an Agent"],
    subtitle: "An improvement system adds state, tools, feedback, control, and handoff.",
    claim: "TEACHING SYNTHESIS",
    time: "2 min",
    source: "Teaching synthesis; state depends on implementation",
    objective: "Define the system properties that turn a request into a bounded agent loop.",
    visual: "One-shot prompt flow beside a multi-step agent system with optional task state.",
    notes: `A prompt requests behavior within an interaction. An agent system may preserve task or session state across steps through files, traces, orchestration, tool context, or memory. It can take actions, observe results, and follow software-owned stopping and handoff rules. State is not automatic, and persistence across sessions is a separate design choice. The benefit is not autonomy by itself. The benefit is that the system can collect better evidence, connect feedback to a specific defect, and control what happens next.`,
    kind: "compare",
  },
  {
    file: "04-slide-research-map",
    stage: "research map",
    title: ["Four Research Patterns", "Define the Opportunity and Limit"],
    subtitle: "Refinement improves some tasks; external feedback changes reliability.",
    claim: "REPORTED EVIDENCE",
    time: "3 min",
    source: "Madaan et al.; Shinn et al.; Gou et al.; Huang et al.",
    objective: "Ground the teaching pattern in primary research without overgeneralizing.",
    visual: "Four research cards compare feedback source, persistence, and main lesson.",
    notes: `Self-Refine uses the same model to generate, critique, and revise. The paper reported improvements on several preference and constrained-generation tasks, but almost no math gain in its reported table; external oracle feedback helped more. Reflexion converts task feedback into a textual lesson retained for later trials. CRITIC uses external tools to provide stronger verification signals. Huang and colleagues studied intrinsic self-correction and found that reconsideration without external feedback did not reliably improve reasoning and could degrade it. These are results from particular models and benchmarks. They do not guarantee classroom or high-stakes performance.`,
    kind: "research",
  },
  {
    file: "05-slide-suitability-gate",
    stage: "design decision",
    title: ["Use the", "Four-Question Gate"],
    subtitle: "Specification, verification, repairability, and boundedness come before iteration.",
    claim: "TEACHING SYNTHESIS",
    time: "3 min",
    source: "Independent teaching framework",
    objective: "Give students a preflight decision for whether an agent loop is appropriate.",
    visual: "Four labeled gates lead either to a bounded loop or human-led assistance.",
    notes: `Before building the loop, ask four questions. Can the desired result be specified? Can quality be checked independently of the draft's confidence? Can a detected defect be repaired safely? Can attempts, cost, data exposure, and authority be bounded? If specification or verification is weak, the agent may assist exploration but should not certify completion. If repairability or boundedness is weak, narrow the task and keep a person in control. This gate prevents us from treating every difficult problem as a request for more autonomous retries.`,
    kind: "gate",
  },
  {
    file: "06-slide-seven-step-loop",
    stage: "core workflow",
    title: ["Build the", "Seven-Step Loop"],
    subtitle: "Contract, attempt, verify, diagnose, revise, stop, and hand off.",
    claim: "TEACHING SYNTHESIS",
    time: "4 min",
    source: "Independent teaching framework; related to Harness/Loop/Graph Engineering",
    objective: "Teach the complete workflow and the evidence carried across each transition.",
    visual: "Seven nodes form a bounded improvement trajectory with one retry edge.",
    notes: `First, the contract defines the goal, constraints, allowed tools, evidence, budget, and human authority. Second, the agent produces an inspectable attempt. Third, verification runs checks that can reveal task-relevant defects. Fourth, diagnosis ties each failure to evidence and a location. Fifth, revision changes only defects supported by that audit. Sixth, the system stops when checks pass, budget ends, progress stalls, evidence conflicts, or risk rises. Seventh, a person interprets ambiguity and authorizes consequential action. Preserve the criteria, attempt, checks, revision log, costs, unresolved uncertainty, and final decision. Without that trace, students cannot tell whether the loop improved the work or merely rewrote it.`,
    kind: "loop",
  },
  {
    file: "07-slide-verifier-ladder",
    stage: "feedback design",
    title: ["Climb the", "Verifier Ladder"],
    subtitle: "Independence can reduce correlated error; authority remains separate.",
    claim: "TEACHING SYNTHESIS",
    time: "3 min",
    source: "Synthesis of Self-Refine, Reflexion, CRITIC, and classroom review",
    objective: "Match evidence strength to task risk and distinguish independence from authority.",
    visual: "Five ascending verification levels from self-critique to qualified human authority.",
    notes: `The cheapest verifier is same-model self-critique. It can catch omissions but shares blind spots. An explicit instructor rubric makes expectations concrete. A separate reviewer role or model adds another perspective, but independence is not truth; models can share assumptions and training biases. External tools, tests, calculations, and primary sources provide observable evidence, although their specifications may still be incomplete. Qualified human review interprets context and owns decisions. Strong workflows combine levels. The verifier should be chosen by the defect it must detect, not by how impressive the reviewer sounds.`,
    kind: "ladder",
  },
  {
    file: "08-slide-stop-handoff",
    stage: "control boundary",
    title: ["Stop Before the Loop", "Becomes the Problem"],
    subtitle: "Every retry needs new evidence, a budget, and an escalation path.",
    claim: "BOUNDARY",
    time: "2 min",
    source: "Teaching synthesis; bounded loop design",
    objective: "Make terminal conditions and human authority explicit.",
    visual: "A retry loop is surrounded by five stop conditions and a human authority gate.",
    notes: `More iterations can add cost and introduce new defects. Stop when all required checks pass, the attempt budget ends, the latest cycle creates no material improvement, verification signals conflict, or the next action crosses a permission or risk boundary. The loop should hand off before publishing, grading, spending money, contacting people, or changing consequential records unless explicit authority was granted. A numerical self-score is not an adequate terminal state unless the scoring system has been independently calibrated for this task.`,
    kind: "stop",
  },
  {
    file: "09-slide-situation-matrix",
    stage: "transfer map",
    title: ["Match the Loop", "to the Situation"],
    subtitle: "Different defects require different evidence and different human roles.",
    claim: "TEACHING SYNTHESIS",
    time: "3 min",
    source: "Independent teaching matrix",
    objective: "Show where verified iteration is strong, conditional, or inappropriate for autonomous use.",
    visual: "A six-row matrix covers code, research, slides, writing, creativity, and high-stakes decisions.",
    notes: `Code is often a strong fit because executable tests expose behavior, although tests can be incomplete. Research summaries need primary-source checks and human interpretation of source quality. Slides can use source mapping, link checks, dimensions, and render inspection. Structured writing uses an instructor rubric but still needs judgment about meaning and voice. Creativity can benefit from alternatives and critique, but the creator retains taste and authorship. Sensitive or high-stakes decisions should keep the agent in a narrow analytical role under domain evidence and qualified human authority.`,
    kind: "matrix",
  },
  {
    file: "10-slide-worked-case",
    stage: "worked example",
    title: ["Worked Case:", "Lecture to Eight Slides"],
    subtitle: "Fidelity, citations, legibility, and layout become observable checks.",
    claim: "TEACHING SYNTHESIS",
    time: "5 min",
    source: "Classroom case designed for this lesson",
    objective: "Trace one complete agent loop with realistic evidence and limits.",
    visual: "A source-to-slide production pipeline with verification checkpoints and a two-cycle limit.",
    notes: `The contract requires eight slides, source fidelity, coherent flow, working citations, readable text, and no overflow. The agent extracts claims, builds a source-to-slide map, drafts the narrative, renders the deck, then checks claims, links, dimensions, and visual collisions. Every failed criterion is recorded with a slide number and evidence. Only failed slides are revised, then rendered and inspected again. The loop stops when required checks pass or after two cycles. The student approves the final educational interpretation because no layout checker can determine whether the teaching argument is appropriate. Source checks reduce unsupported claims but do not guarantee complete or high-quality interpretation.`,
    kind: "case",
  },
  {
    file: "11-slide-comparative-lab",
    stage: "22-minute lab",
    title: ["Compare Three", "Conditions"],
    subtitle: "Single pass, self-score to 95, and an evidence-verified loop.",
    claim: "CLASSROOM LAB",
    time: "22 min",
    source: "Prepared comparative classroom activity",
    objective: "Let students measure the pattern rather than accept it on authority.",
    visual: "Three experimental lanes feed one common evidence table and timeline.",
    notes: `Teams receive the same task, source packet, rubric, starter artifact, checklist, and log template. Condition A submits one model response. Condition B uses the self-score-to-95 pattern and records each score and revision. Condition C uses the contract, evidence checks, targeted revision, two-cycle limit, and handoff. Compare objective correctness where ground truth exists, rubric coverage, unsupported claims, new defects, iterations, elapsed time, model or tool calls, and human preference. Do not assume Condition C wins. A simple task may not justify verification overhead, and an honest negative result is part of the lesson.`,
    kind: "lab",
  },
  {
    file: "12-slide-evidence-rubric",
    stage: "7-minute assessment",
    title: ["Submit Evidence,", "Not Just Polish"],
    subtitle: "Grade the contract, verifier, revisions, stopping, evidence, and reflection.",
    claim: "CLASSROOM LAB",
    time: "7 min",
    source: "Assessment design for this lesson",
    objective: "Make the student deliverables and grading priorities explicit.",
    visual: "A weighted rubric and seven-item evidence package replace final-output-only grading.",
    notes: `Students submit the problem contract, initial output, verifier specification, evidence, revision log, final result or handoff decision, cost and iteration counts, and reflection. The rubric assigns twenty percent to the contract, twenty-five to verifier design, twenty to revision discipline, fifteen to stop and handoff rules, ten to evaluation evidence, and ten to reflection. The final artifact matters, but it does not dominate the grade. Students should distinguish improved appearance from supported correctness and identify one situation where their loop should not be used.`,
    kind: "rubric",
  },
  {
    file: "13-slide-closing-checklist",
    stage: "3-minute transfer",
    title: ["The Closing", "Design Checklist"],
    subtitle: "Loop on evidence, not confidence.",
    claim: "TEACHING SYNTHESIS",
    time: "3 min",
    source: "Whole-lesson synthesis",
    objective: "Give students a reusable design and reflection checklist.",
    visual: "Four suitability questions surround the evidence-first improvement equation.",
    notes: `Before using an agent improvement loop, ask whether the result is specifiable, independently checkable, safely repairable, and bounded in cost, data, attempts, and authority. Then inspect the system: what evidence can expose defects, what changes after a failed check, when does the loop stop, and who owns the final decision? Better agent work comes from a clear contract, useful attempts, discriminating feedback, targeted repair, explicit stopping, and appropriate human authority. The transferable lesson is not to make an agent try harder. It is to engineer feedback that can prove something relevant and control what happens when it cannot.`,
    kind: "closing",
  },
];

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
}

function ensure(path: string): void {
  mkdirSync(path, { recursive: true });
}

function text(x: number, y: number, lines: string[], size = 22, color = C.ink, weight = 700, lineHeight = Math.round(size * 1.18), anchor: "start" | "middle" | "end" = "start"): string {
  return lines.map((line, i) => `<text x="${x}" y="${y + i * lineHeight}" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="0">${esc(line)}</text>`).join("");
}

function rect(x: number, y: number, w: number, h: number, stroke = C.line, fill = C.paper, radius = 8, strokeWidth = 2): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

function pill(x: number, y: number, w: number, label: string, color: string, fill: string): string {
  return `${rect(x, y, w, 48, color, fill)}${text(x + w / 2, y + 31, [label.toUpperCase()], 16, color, 850, 19, "middle")}`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, color = C.teal, width = 4): string {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 12;
  const p1x = x2 - head * Math.cos(angle - Math.PI / 6);
  const p1y = y2 - head * Math.sin(angle - Math.PI / 6);
  const p2x = x2 - head * Math.cos(angle + Math.PI / 6);
  const p2y = y2 - head * Math.sin(angle + Math.PI / 6);
  return `<path d="M ${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}"/><path d="M ${x2} ${y2} L ${p1x} ${p1y} L ${p2x} ${p2y} Z" fill="${color}"/>`;
}

function header(s: Slide): string {
  const claimColors: Record<Claim, [string, string, number]> = {
    "TEACHING SYNTHESIS": [C.teal, C.tealBg, 230],
    "REPORTED EVIDENCE": [C.blue, C.blueBg, 230],
    "BOUNDARY": [C.red, C.redBg, 150],
    "CLASSROOM LAB": [C.violet, C.violetBg, 190],
  };
  const [claimColor, claimFill, claimWidth] = claimColors[s.claim];
  return `${pill(72, 58, 275, s.stage, C.teal, C.tealBg)}${pill(365, 58, claimWidth, s.claim, claimColor, claimFill)}${pill(1380, 58, 148, s.time, C.amber, C.amberBg)}${text(76, 182, s.title, 52, C.ink, 900, 60)}${text(78, s.title.length > 1 ? 316 : 260, [s.subtitle], 22, C.muted, 650)}`;
}

function footer(s: Slide, index: number): string {
  return `<line x1="72" y1="826" x2="1528" y2="826" stroke="${C.line}" stroke-width="2"/>${text(76, 855, [`SOURCE MAP  ${s.source}`], 13, C.muted, 700)}${text(1524, 855, [`${String(index + 1).padStart(2, "0")} / ${slides.length}`], 13, C.muted, 850, 16, "end")}`;
}

function shell(s: Slide, index: number, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="#E7E8E1" stroke-width="1"/></pattern></defs><rect width="${W}" height="${H}" fill="${C.bg}"/><rect x="28" y="28" width="1544" height="844" rx="8" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/><rect x="28" y="28" width="1544" height="844" rx="8" fill="url(#grid)" opacity="0.64"/>${header(s)}${body}${footer(s, index)}</svg>`;
}

function visual(s: Slide, index: number): string {
  const step = (x: number, y: number, w: number, label: string, color: string, fill: string) => `${rect(x, y, w, 72, color, fill)}${text(x + w / 2, y + 44, [label], 18, color, 850, 22, "middle")}`;

  if (s.kind === "cover") {
    return shell(s, index, `${step(110, 500, 210, "CONTRACT", C.blue, C.blueBg)}${arrow(320, 536, 385, 536, C.blue)}${step(385, 500, 210, "ATTEMPT", C.blue, C.paper)}${arrow(595, 536, 660, 536, C.teal)}${step(660, 500, 210, "VERIFY", C.teal, C.tealBg)}${arrow(870, 536, 935, 536, C.teal)}${step(935, 500, 210, "REVISE", C.amber, C.amberBg)}${arrow(1145, 536, 1210, 536, C.green)}${step(1210, 500, 270, "STOP / HANDOFF", C.green, C.greenBg)}<path d="M 1040 572 C 1040 705 490 705 490 572" fill="none" stroke="${C.teal}" stroke-width="4" stroke-dasharray="10 8"/>${text(765, 726, ["BOUNDED RETRY WITH NEW EVIDENCE"], 18, C.teal, 850, 22, "middle")}${pill(465, 392, 670, "revise until checkable criteria pass", C.ink, C.paper)}`);
  }

  if (s.kind === "score") {
    return shell(s, index, `${rect(85, 410, 610, 335, C.red, C.redBg)}${text(390, 458, ["SELF-AWARDED SCORE"], 19, C.red, 900, 23, "middle")}<circle cx="390" cy="588" r="90" fill="${C.paper}" stroke="${C.red}" stroke-width="12"/><path d="M 330 625 A 75 75 0 1 1 453 620" fill="none" stroke="${C.amber}" stroke-width="16"/><line x1="390" y1="588" x2="445" y2="545" stroke="${C.red}" stroke-width="8"/><circle cx="390" cy="588" r="10" fill="${C.red}"/>${text(390, 605, ["95"], 32, C.red, 900, 38, "middle")}${text(390, 700, ["looks improved"], 22, C.ink, 750, 26, "middle")}${arrow(695, 577, 820, 577, C.ink, 5)}${rect(820, 410, 695, 335, C.green, C.greenBg)}${text(1168, 458, ["EVIDENCE CHECK"], 19, C.green, 900, 23, "middle")}${pill(875, 510, 235, "tests", C.blue, C.blueBg)}${pill(1140, 510, 310, "source support", C.teal, C.tealBg)}${pill(875, 590, 235, "constraints", C.amber, C.amberBg)}${pill(1140, 590, 310, "qualified review", C.violet, C.violetBg)}${text(1168, 700, ["supported within a boundary"], 22, C.ink, 750, 26, "middle")}`);
  }

  if (s.kind === "compare") {
    return shell(s, index, `${rect(85, 405, 590, 350, C.amber, C.amberBg)}${text(380, 458, ["PROMPT"], 22, C.amber, 900, 26, "middle")}${pill(165, 545, 430, "request  ->  model  ->  response", C.amber, C.paper)}${text(380, 660, ["behavior inside", "one interaction"], 22, C.ink, 700, 28, "middle")}${rect(750, 405, 765, 350, C.teal, C.tealBg)}${text(1132, 458, ["AGENT IMPROVEMENT SYSTEM"], 22, C.teal, 900, 26, "middle")}${pill(800, 525, 155, "state", C.blue, C.blueBg)}${pill(980, 525, 155, "tools", C.violet, C.violetBg)}${pill(1160, 525, 155, "feedback", C.teal, C.paper)}${pill(1340, 525, 125, "control", C.red, C.redBg)}${pill(925, 630, 260, "bounded retry", C.amber, C.amberBg)}${pill(1210, 630, 235, "human handoff", C.green, C.greenBg)}${arrow(1185, 654, 1210, 654, C.green)}${text(1132, 730, ["task state depends on implementation"], 17, C.muted, 700, 21, "middle")}`);
  }

  if (s.kind === "research") {
    const researchCard = (x: number, y: number, title: string, feedback: string, lesson: string, color: string, fill: string) => `${rect(x, y, 700, 155, color, fill)}${text(x + 28, y + 40, [title], 20, color, 900)}${text(x + 28, y + 78, [`Feedback: ${feedback}`], 18, C.ink, 700)}${text(x + 28, y + 116, [lesson], 18, C.muted, 650)}`;
    return shell(s, index, `${researchCard(75, 405, "SELF-REFINE", "same model", "Can improve some generation tasks; errors persist.", C.blue, C.blueBg)}${researchCard(825, 405, "REFLEXION", "task result + memory", "Carries textual lessons into later trials.", C.violet, C.violetBg)}${researchCard(75, 600, "CRITIC", "external tools", "Grounds revision in observable tool feedback.", C.teal, C.tealBg)}${researchCard(825, 600, "INTRINSIC CORRECTION LIMIT", "none external", "Can fail or degrade studied reasoning.", C.red, C.redBg)}`);
  }

  if (s.kind === "gate") {
    const gate = (x: number, y: number, n: string, title: string, question: string, color: string, fill: string) => `${rect(x, y, 680, 145, color, fill)}${pill(x + 25, y + 25, 80, n, color, C.paper)}${text(x + 130, y + 55, [title], 21, color, 900)}${text(x + 130, y + 99, [question], 19, C.ink, 650)}`;
    return shell(s, index, `${gate(75, 405, "01", "SPECIFICATION", "Can success be stated?", C.blue, C.blueBg)}${gate(845, 405, "02", "VERIFICATION", "Can quality be checked?", C.teal, C.tealBg)}${gate(75, 600, "03", "REPAIRABILITY", "Can defects be repaired safely?", C.amber, C.amberBg)}${gate(845, 600, "04", "BOUNDEDNESS", "Can cost, data, and authority be limited?", C.red, C.redBg)}${pill(600, 770, 400, "four yes answers -> bounded loop", C.green, C.greenBg)}`);
  }

  if (s.kind === "loop") {
    const labels = [
      [75, 435, 185, "1 CONTRACT", C.blue, C.blueBg],
      [300, 435, 185, "2 ATTEMPT", C.blue, C.paper],
      [525, 435, 185, "3 VERIFY", C.teal, C.tealBg],
      [750, 435, 185, "4 DIAGNOSE", C.teal, C.paper],
      [975, 435, 185, "5 REVISE", C.amber, C.amberBg],
      [1200, 435, 145, "6 STOP", C.red, C.redBg],
      [1385, 435, 145, "7 HANDOFF", C.green, C.greenBg],
    ] as const;
    return shell(s, index, `${labels.map(([x, y, w, label, color, fill]) => step(x, y, w, label, color, fill)).join("")}${labels.slice(0, -1).map(([x, y, w], i) => arrow(x + w, y + 36, labels[i + 1][0], y + 36, i < 2 ? C.blue : i < 4 ? C.teal : i === 4 ? C.red : C.green, 3)).join("")}<path d="M 1070 507 C 1070 650 390 650 390 507" fill="none" stroke="${C.teal}" stroke-width="4" stroke-dasharray="10 8"/>${text(730, 681, ["RETRY ONLY WITH A SPECIFIC DEFECT + NEW EVIDENCE"], 18, C.teal, 850, 22, "middle")}${pill(205, 735, 275, "criteria + permissions", C.blue, C.blueBg)}${pill(515, 735, 240, "checks + trace", C.teal, C.tealBg)}${pill(790, 735, 240, "targeted repair", C.amber, C.amberBg)}${pill(1065, 735, 330, "terminal state + authority", C.red, C.redBg)}`);
  }

  if (s.kind === "ladder") {
    const levels = [
      [170, 705, 280, "1  SAME-MODEL CRITIQUE", C.red, C.redBg],
      [340, 635, 340, "2  EXPLICIT RUBRIC", C.amber, C.amberBg],
      [510, 565, 400, "3  SEPARATE REVIEWER", C.violet, C.violetBg],
      [680, 495, 460, "4  TOOLS / TESTS / SOURCES", C.teal, C.tealBg],
      [850, 425, 520, "5  QUALIFIED HUMAN AUTHORITY", C.green, C.greenBg],
    ] as const;
    return shell(s, index, `${levels.map(([x, y, w, label, color, fill]) => `${rect(x, y, w, 58, color, fill)}${text(x + 22, y + 37, [label], 17, color, 850)}`).join("")}${text(1420, 455, ["stronger", "evidence"], 18, C.green, 750, 23, "middle")}${arrow(1420, 610, 1420, 490, C.green, 4)}${text(230, 650, ["cheap", "shared", "blind spots"], 18, C.red, 750, 23, "middle")}${text(800, 790, ["Independence may reduce correlated error. It does not create ground truth."], 20, C.ink, 800, 24, "middle")}`);
  }

  if (s.kind === "stop") {
    return shell(s, index, `${rect(570, 500, 460, 130, C.teal, C.tealBg)}${text(800, 550, ["ATTEMPT -> CHECK -> REVISE"], 22, C.teal, 900, 26, "middle")}${text(800, 592, ["bounded retry"], 19, C.ink, 700, 23, "middle")}${pill(95, 420, 350, "all required checks pass", C.green, C.greenBg)}${pill(95, 510, 350, "attempt budget exhausted", C.red, C.redBg)}${pill(95, 600, 350, "no material progress", C.amber, C.amberBg)}${pill(1155, 420, 350, "verification conflicts", C.red, C.redBg)}${pill(1155, 510, 350, "permission boundary", C.violet, C.violetBg)}${pill(1155, 600, 350, "risk threshold crossed", C.red, C.redBg)}${arrow(445, 560, 570, 560, C.red)}${arrow(1030, 560, 1155, 560, C.red)}${pill(600, 710, 400, "stop or hand off to a person", C.green, C.greenBg)}`);
  }

  if (s.kind === "matrix") {
    const rows = [
      ["CODE", "tests + review", "OFTEN STRONG", C.green, C.greenBg],
      ["RESEARCH", "primary sources + interpretation", "CONDITIONAL", C.amber, C.amberBg],
      ["SLIDES", "source map + render checks", "OFTEN STRONG", C.green, C.greenBg],
      ["WRITING", "instructor rubric + judgment", "CONDITIONAL", C.amber, C.amberBg],
      ["CREATIVITY", "creator / audience preference", "HUMAN-LED", C.violet, C.violetBg],
      ["HIGH STAKES", "domain evidence + authority", "NARROW ROLE", C.red, C.redBg],
    ] as const;
    const rowSvg = rows.map(([task, verifier, fit, color, fill], i) => { const y = 405 + i * 62; return `${rect(85, y, 1430, 52, i % 2 ? C.line : "#E1E4DF", i % 2 ? C.paper : "#F8F8F3", 4, 1)}${text(115, y + 34, [task], 18, C.ink, 850)}${text(410, y + 34, [verifier], 18, C.muted, 700)}${pill(1200, y + 2, 270, fit, color, fill)}`; }).join("");
    return shell(s, index, `${text(115, 383, ["SITUATION"], 15, C.muted, 850)}${text(410, 383, ["PRIMARY VERIFIER"], 15, C.muted, 850)}${text(1335, 383, ["AGENT ROLE"], 15, C.muted, 850, 18, "middle")}${rowSvg}${text(800, 805, ["Easy to score is not the same as valuable to optimize."], 18, C.red, 850, 22, "middle")}`);
  }

  if (s.kind === "case") {
    return shell(s, index, `${pill(85, 405, 250, "lecture + sources", C.blue, C.blueBg)}${arrow(335, 429, 390, 429, C.blue)}${pill(390, 405, 260, "claim-to-slide map", C.blue, C.paper)}${arrow(650, 429, 705, 429, C.blue)}${pill(705, 405, 220, "draft deck", C.amber, C.amberBg)}${arrow(925, 429, 980, 429, C.teal)}${pill(980, 405, 220, "render", C.violet, C.violetBg)}${arrow(1200, 429, 1255, 429, C.teal)}${pill(1255, 405, 260, "verify", C.teal, C.tealBg)}${rect(105, 540, 1390, 170, C.line, C.paper)}${text(150, 585, ["CHECKS"], 18, C.teal, 900)}${pill(300, 555, 235, "source fidelity", C.teal, C.tealBg)}${pill(565, 555, 205, "working links", C.teal, C.tealBg)}${pill(800, 555, 220, "readable text", C.teal, C.tealBg)}${pill(1050, 555, 210, "no overflow", C.teal, C.tealBg)}${pill(1290, 555, 160, "flow", C.teal, C.tealBg)}${text(150, 675, ["CONTROL"], 18, C.red, 900)}${pill(300, 645, 310, "two revision cycles", C.red, C.redBg)}${pill(650, 645, 420, "student approves interpretation", C.green, C.greenBg)}${pill(1110, 645, 340, "report unresolved limits", C.amber, C.amberBg)}<path d="M 1385 453 C 1385 500 815 500 815 453" fill="none" stroke="${C.teal}" stroke-width="4" stroke-dasharray="9 8"/>`);
  }

  if (s.kind === "lab") {
    const lane = (x: number, title: string, process: string[], color: string, fill: string) => `${rect(x, 410, 450, 260, color, fill)}${text(x + 225, 458, [title], 21, color, 900, 25, "middle")}${process.map((line, i) => `${pill(x + 55, 505 + i * 62, 340, line, color, C.paper)}`).join("")}`;
    return shell(s, index, `${lane(70, "A  SINGLE PASS", ["one prompt", "one submission"], C.blue, C.blueBg)}${lane(575, "B  SELF-SCORE", ["revise to 95", "record scores"], C.red, C.redBg)}${lane(1080, "C  VERIFIED LOOP", ["checks + evidence", "two-cycle limit"], C.teal, C.tealBg)}${pill(160, 730, 1280, "compare correctness | coverage | unsupported claims | new defects | time | calls | preference", C.ink, C.paper)}${text(800, 800, ["Use prepared rubrics, starter artifacts, sources, checklists, and logs."], 18, C.muted, 750, 22, "middle")}`);
  }

  if (s.kind === "rubric") {
    const bars = [
      ["CONTRACT", 20, C.blue, C.blueBg],
      ["VERIFIER", 25, C.teal, C.tealBg],
      ["REVISION", 20, C.amber, C.amberBg],
      ["STOP / HANDOFF", 15, C.red, C.redBg],
      ["EVIDENCE", 10, C.green, C.greenBg],
      ["REFLECTION", 10, C.violet, C.violetBg],
    ] as const;
    let x = 90;
    const barSvg = bars.map(([label, value, color, fill]) => { const w = value * 13.6; const out = `${rect(x, 430, w, 82, color, fill, 4)}${text(x + w / 2, 466, [label], 14, color, 850, 17, "middle")}${text(x + w / 2, 494, [`${value}%`], 18, C.ink, 900, 22, "middle")}`; x += w; return out; }).join("");
    return shell(s, index, `${barSvg}${rect(90, 560, 1360, 165, C.line, C.paper)}${text(130, 605, ["EVIDENCE PACKAGE"], 18, C.ink, 900)}${pill(360, 575, 220, "problem contract", C.blue, C.blueBg)}${pill(610, 575, 190, "baseline", C.blue, C.paper)}${pill(830, 575, 215, "verifier spec", C.teal, C.tealBg)}${pill(1075, 575, 300, "revision log", C.amber, C.amberBg)}${pill(360, 650, 220, "final / handoff", C.green, C.greenBg)}${pill(610, 650, 240, "time + call count", C.red, C.redBg)}${pill(880, 650, 240, "uncertainty", C.violet, C.violetBg)}${pill(1150, 650, 225, "reflection", C.violet, C.paper)}${text(800, 785, ["The polished artifact is evidence, but it is not the whole grade."], 19, C.red, 850, 23, "middle")}`);
  }

  return shell(s, index, `${rect(530, 500, 540, 150, C.ink, C.paper)}${text(800, 555, ["BETTER AGENT WORK"], 22, C.ink, 900, 26, "middle")}${text(800, 605, ["evidence + repair + control"], 20, C.teal, 800, 24, "middle")}${pill(90, 420, 330, "can success be specified?", C.blue, C.blueBg)}${pill(90, 680, 330, "can defects be repaired?", C.amber, C.amberBg)}${pill(1180, 420, 330, "can quality be checked?", C.teal, C.tealBg)}${pill(1180, 680, 330, "can risk be bounded?", C.red, C.redBg)}${arrow(420, 444, 530, 520, C.blue)}${arrow(420, 704, 530, 630, C.amber)}${arrow(1180, 444, 1070, 520, C.teal)}${arrow(1180, 704, 1070, 630, C.red)}${pill(555, 725, 490, "loop on evidence, not confidence", C.green, C.greenBg)}`);
}

function prompt(s: Slide, index: number): string {
  return `# Slide ${index + 1}: ${s.title.join(" ")}\n\n## Production method\nOriginal 1600x900 local SVG rendered to PNG for exact text fidelity.\n\n## Claim calibration\n- Claim type: ${s.claim}\n- Evidence map: ${s.source}\n- This is an independent teaching companion, not a reproduction of a paper figure.\n\n## On-slide content\n- Stage: ${s.stage}\n- Headline: ${s.title.join(" ")}\n- Subtitle: ${s.subtitle}\n- Class time: ${s.time}\n\n## Teaching objective\n${s.objective}\n\n## Accessibility description\n${s.visual} Labels repeat all color-coded meaning.\n\n## Speaker notes (${s.time})\n${s.notes}\n`;
}

function contactSheet(): string {
  const thumbW = 350;
  const thumbH = 197;
  const gap = 22;
  const margin = 30;
  const labelH = 38;
  const columns = 4;
  const rows = Math.ceil(slides.length / columns);
  const width = margin * 2 + columns * thumbW + (columns - 1) * gap;
  const height = margin * 2 + rows * (thumbH + labelH) + (rows - 1) * gap;
  const images = slides.map((s, i) => {
    const col = i % columns;
    const row = Math.floor(i / columns);
    const x = margin + col * (thumbW + gap);
    const y = margin + row * (thumbH + labelH + gap);
    const data = readFileSync(join(DIR, `${s.file}.png`)).toString("base64");
    return `<image href="data:image/png;base64,${data}" x="${x}" y="${y}" width="${thumbW}" height="${thumbH}"/>${text(x, y + thumbH + 25, [`${String(i + 1).padStart(2, "0")}  ${s.title.join(" ")}`], 12, C.ink, 750)}`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${C.bg}"/>${images}</svg>`;
}

ensure(SVG_DIR);
ensure(PROMPT_DIR);

slides.forEach((slide, index) => {
  const svgPath = join(SVG_DIR, `${slide.file}.svg`);
  const pngPath = join(DIR, `${slide.file}.png`);
  writeFileSync(svgPath, visual(slide, index));
  writeFileSync(join(PROMPT_DIR, `${slide.file}.md`), prompt(slide, index));
  const result = Bun.spawnSync(["sips", "-s", "format", "png", svgPath, "--out", pngPath], { stdout: "pipe", stderr: "pipe" });
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
});

const contactSvg = join(DIR, "contact-sheet.svg");
writeFileSync(contactSvg, contactSheet());
const contactResult = Bun.spawnSync(["sips", "-s", "format", "png", contactSvg, "--out", join(DIR, "contact-sheet.png")], { stdout: "pipe", stderr: "pipe" });
if (contactResult.exitCode !== 0) throw new Error(contactResult.stderr.toString());

console.log(`Rendered ${slides.length} slides, prompts, SVGs, and contact sheet in ${DIR}`);
