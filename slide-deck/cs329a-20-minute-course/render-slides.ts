import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  greenBg: "#F2FBF5",
};

type ClaimType = "TEACHING SYNTHESIS" | "OPEN RESEARCH QUESTION";
type Slide = {
  file: string;
  stage: string;
  title: string[];
  subtitle: string;
  claim: ClaimType;
  time: string;
  evidence: string;
  objective: string;
  notes: string;
  visual: string;
  kind: string;
};

const slides: Slide[] = [
  {
    file: "01-slide-cover",
    stage: "20-minute masterclass",
    title: ["Self-Improving AI Agents", "in 20 Minutes"],
    subtitle: "Nine CS329A lectures, one system model, four design questions.",
    claim: "TEACHING SYNTHESIS",
    time: "0:45",
    evidence: "Whole-series companion; official course: cs329a.stanford.edu",
    objective: "Set the promise and establish four questions for the entire lesson.",
    notes: `Welcome. In twenty minutes, I am not going to summarize nine lectures one by one. That would produce a list, not understanding. Instead, I will give you one system model and four questions that let you reconstruct the course. The questions are: where do useful alternatives come from, what verifies progress, what persists after the current run, and where does the system spend compute, time, human attention, and risk? The loop on this slide is our teaching synthesis, not a diagram quoted from Stanford. Use it as a map, then use the nine detailed lessons to inspect each component. By the end, you should be able to look at a product described as self-improving and ask what actually improved, what evidence supports that claim, and what can still fail.`,
    visual: "A bounded improvement loop surrounded by generation, verification, persistence, and budget questions.",
    kind: "cover",
  },
  {
    file: "02-slide-model-vs-system",
    stage: "core distinction",
    title: ["A Stronger Model Is Not Yet", "a Self-Improving System"],
    subtitle: "Capability lives in the model; improvement depends on the surrounding loop.",
    claim: "TEACHING SYNTHESIS",
    time: "1:45",
    evidence: "CS329A Part 1: Course Overview",
    objective: "Separate model capability from agent-system improvement.",
    notes: `Start with the most important distinction. A model maps an input to an output. A stronger model may know more, reason better, or follow instructions more reliably, but that alone does not make the surrounding application self-improving. An agent system adds state, tools, actions, observations, feedback, and some mechanism that changes later behavior. Imagine a student asking for help with a research question. A model can generate an answer. An agent system can search sources, record what it found, test whether citations support claims, revise weak sections, and preserve an approved research plan for the next session. The model is still central, but the quality of the result now depends on the loop around it. This matters because system failures can come from tool permissions, bad state, weak tests, or incorrect feedback even when the underlying model is capable. Conversely, a modest model can become more useful when the system allocates work and checks evidence well. Throughout the course, keep asking whether a reported gain is a model gain, a workflow gain, or a durable learning gain. Those are related, but they are not interchangeable.`,
    visual: "Side-by-side comparison of one model call and an agent system with state, tools, feedback, and change.",
    kind: "compare",
  },
  {
    file: "03-slide-teaching-loop",
    stage: "course map",
    title: ["One Teaching Loop", "Connects the Course"],
    subtitle: "Generate, plan, act, observe, verify, and learn under a budget.",
    claim: "TEACHING SYNTHESIS",
    time: "2:30",
    evidence: "Whole-series synthesis across Parts 1-9",
    objective: "Teach the loop while preserving its status as an abstraction.",
    notes: `Here is the map for the complete course. First, the system generates candidate actions, answers, plans, or hypotheses. Second, it spends inference-time compute on search or planning. Third, it acts through a tool or environment. Fourth, it observes what happened. Fifth, it verifies whether the observation is evidence of progress. Finally, it may learn by updating memory, data, tools, artifacts, a policy, or model weights. Notice two return paths. Verification can send the current run backward for another attempt. Durable learning can change what the system does in a later run. Those are different timescales. Also notice the budget around the loop. Sampling one hundred answers, running tools, calling human reviewers, and retraining a model all consume different resources and create different risks. This loop is deliberately broad. Not every method in CS329A uses every stage, and Stanford does not present this exact diagram as the single canonical architecture. Its purpose is diagnostic. If someone says an agent improved, locate the change in the loop. Did generation become more diverse? Did planning allocate compute better? Did a verifier become more accurate? Did the system merely retry, or did something durable change? The rest of this deck examines the loop from left to right, then asks how to evaluate the whole system.`,
    visual: "Linear agent loop with retry and durable-learning branches plus a budget boundary.",
    kind: "loop",
  },
  {
    file: "04-slide-test-time",
    stage: "test-time compute",
    title: ["More Attempts Help Only", "When Selection Works"],
    subtitle: "Test-time compute expands candidate coverage; a verifier must still return the useful answer.",
    claim: "TEACHING SYNTHESIS",
    time: "2:00",
    evidence: "CS329A Part 2: Test-Time Compute Scaling",
    objective: "Separate candidate coverage from returned-answer reliability.",
    notes: `Test-time compute asks how a fixed model can spend more computation on one problem. The simplest method is repeated sampling: generate several candidates instead of one. Search methods add structure by expanding, scoring, and revisiting partial solutions. This can improve coverage, meaning that at least one correct or useful candidate appears in the set. But the deployed system must still select and return that candidate. These are two different measurements. Pass-at-k asks whether success exists somewhere among k attempts. Returned-answer reliability asks whether the verifier or selection rule actually chooses it. Consider five proposed fixes for a program. One is correct, so coverage looks good. If the test suite misses an edge case and ranks a superficially clean but wrong patch first, the user still receives the wrong answer. More sampling has increased opportunity without guaranteeing reliability. Compute allocation also should depend on difficulty. Easy problems may need one attempt; hard problems may justify search, stronger verification, or human review. The practical lesson is to report generation and selection separately. When someone says that more inference compute improved performance, ask how candidates were generated, how they were selected, and whether the result survives changes in the verifier or task distribution.`,
    visual: "Candidate fan-out feeding a verifier gate, with separate coverage and selected-answer outcomes.",
    kind: "sampling",
  },
  {
    file: "05-slide-verification",
    stage: "verification",
    title: ["Feedback Is Evidence,", "Not Ground Truth"],
    subtitle: "A test can accept wrong behavior or reject a valid alternative.",
    claim: "TEACHING SYNTHESIS",
    time: "2:15",
    evidence: "CS329A Parts 3-4: Robust Verification; Feedback with Tools and Code",
    objective: "Explain false acceptance, false rejection, and verifier gaming with one concrete example.",
    notes: `Verification is the hinge of the improvement loop. A verifier may be a unit test, proof checker, reward model, critic, constitution, simulator, or human rating. Every verifier observes the task through a specification, and the specification can be incomplete. Use this code example. A patch passes all public tests, but the tests omit a boundary condition. The verifier accepts wrong behavior: a false acceptance. Another patch is correct but uses a different output order than the test expects. The verifier rejects valid behavior: a false rejection. Once the generator learns what the verifier rewards, a third risk appears: it may optimize the check rather than the real objective. That is verifier gaming or reward hacking. Stronger systems therefore do not treat one signal as truth. They may combine process checks with outcome checks, reserve private tests, inspect uncertainty, use adversarial cases, or escalate high-impact decisions to humans. However, adding a meta-verifier moves the trust boundary; it does not remove it. Ask two questions for every feedback source: what errors can this signal detect, and what errors is it blind to? Improvement driven by a blind verifier can make benchmark scores rise while real behavior becomes less trustworthy.`,
    visual: "Code patch and test suite showing false acceptance, false rejection, and verifier gaming.",
    kind: "verification",
  },
  {
    file: "06-slide-tools-planning",
    stage: "tools and planning",
    title: ["Tools Turn Answers", "into Trajectories"],
    subtitle: "Planning exposes dependencies, parallel work, critical paths, and recovery points.",
    claim: "TEACHING SYNTHESIS",
    time: "2:15",
    evidence: "CS329A Parts 4-5: Tools/Code Feedback; Planning and Multi-Step Reasoning",
    objective: "Show how environment interaction changes the unit of analysis from answer to trajectory.",
    notes: `Once an agent uses tools, the unit of analysis is no longer one answer. It is a trajectory: a sequence of actions, observations, and decisions. Planning determines which steps depend on others, which can run in parallel, and where failure should trigger recovery. In the graph, source search and data collection can proceed independently, but the synthesis step depends on both. Verification sits after intermediate artifacts, not only at the end. The highlighted path is the critical path: delays or errors there determine completion. This matters because simply adding more agents or more tool calls may increase total work without reducing the critical path. A good plan also distinguishes reversible and irreversible actions. Searching or drafting can usually be retried. Sending an email, publishing a result, deleting data, or assigning a grade requires stronger authorization and review. Tool observations are still feedback rather than truth. A successful command only proves that the command ran under its environment; it does not prove the overall task was correct. When designing a workflow, draw the dependency graph. Mark checkpoints, retry edges, stop conditions, and authority gates. Then ask whether parallel work genuinely shortens the path or merely produces more material for someone to reconcile.`,
    visual: "Task dependency graph with parallel branches, critical path, verification checkpoints, and a retry edge.",
    kind: "graph",
  },
  {
    file: "07-slide-persistence",
    stage: "two timescales",
    title: ["Correction Within a Run", "Is Not Durable Learning"],
    subtitle: "Search fixes the current trajectory; learning changes what happens next time.",
    claim: "TEACHING SYNTHESIS",
    time: "2:15",
    evidence: "CS329A Part 6: Train-Time Scaling and Reinforcement Learning",
    objective: "Contrast test-time correction with changes that persist across runs.",
    notes: `This slide gives the distinction most likely to be lost in casual discussions of self-improvement. On the top path, the agent fails, receives feedback, revises its context or plan, and succeeds within the same run. That is useful correction. When the session ends, the system may forget the lesson. On the bottom path, selected experience changes a durable component: model weights, a memory store, training data, a tool, a workflow policy, or an approved artifact. The next run begins differently. That is persistent learning, although each mechanism has different guarantees. Reinforcement learning and self-training use rewards or verified trajectories to update behavior, but they inherit verifier weaknesses. Memory can preserve useful facts while also preserving errors or sensitive information. Updating tools or prompts may improve the system without changing model weights. Therefore, do not use “learning” as a vague synonym for “the second answer was better.” Specify what changed, how it was selected, how long it persists, and whether performance transfers to new tasks. A clean experiment compares future runs with and without the update under the same evaluation. If the system only repaired the present trajectory, call it within-run improvement. If behavior reliably changes later, identify the durable mechanism and its boundary.`,
    visual: "Two lanes comparing retry/context correction with memory, data, policy, or weight updates across runs.",
    kind: "persistence",
  },
  {
    file: "08-slide-long-horizon",
    stage: "agentic evaluation",
    title: ["Long-Horizon Work Exposes", "Evaluation Limits"],
    subtitle: "Judge the final artifact, trajectory, recovery, evidence, and cost together.",
    claim: "TEACHING SYNTHESIS",
    time: "2:00",
    evidence: "CS329A Parts 7-8: Deep Research; Agentic Evaluations and Long-Horizon Tasks",
    objective: "Move evaluation from short answer accuracy to realistic work over time.",
    notes: `Short benchmarks test a bounded response. Real agent work unfolds over many steps, tools, and intermediate artifacts. Deep research is a useful example. The system must formulate queries, retrieve documents, distinguish strong from weak sources, reconcile conflicts, maintain citations, and produce a coherent final report. A plausible report can still be unsupported. A correct final statement can hide a fragile process that fails under small changes. Long-horizon evaluation therefore needs a portfolio. Measure the final artifact, but also inspect trajectory quality, recovery from mistakes, evidence support, and cost. Time horizon matters because a small per-step error rate compounds across many decisions. Version and environment matter because tool behavior, model behavior, and source availability can change. Human judgment may be necessary, but it introduces disagreement and expense. The question is not merely whether the agent completed a task once. Ask whether it completed representative tasks reliably, whether failures were observable and recoverable, and what resources were consumed per verified success. An evaluation that ignores cost can reward brute-force search; one that ignores process can miss unsafe or irreproducible success.`,
    visual: "Deep-research trajectory feeding a five-part evaluation dashboard: artifact, trajectory, recovery, evidence, cost.",
    kind: "evaluation",
  },
  {
    file: "09-slide-frontier",
    stage: "research frontier",
    title: ["The Frontier Is a Coupled", "Reliability Problem"],
    subtitle: "Diversity, meta-verification, curriculum, and efficiency constrain one another.",
    claim: "OPEN RESEARCH QUESTION",
    time: "2:00",
    evidence: "CS329A Part 9: Future Research Areas",
    objective: "Present open directions without implying a settled recursive-improvement recipe.",
    notes: `The final lecture points toward a coupled research agenda rather than one solved algorithm. First is diversity. Self-training can narrow the experience a system generates, so later learning may recycle correlated assumptions. Second is verification and meta-verification: how do we check solutions, then check the feedback that judged those solutions? Third is curriculum. A proposer can generate new tasks, but useful learning requires tasks that are valid, diverse, and neither trivial nor impossible. Fourth is efficiency. Capability must be delivered under limits on latency, energy, cost, privacy, and hardware. These components constrain one another. More diverse proposals increase verification load. Stronger verification can make new curricula possible. Larger search budgets may improve results while making deployment impractical. Learned rewards can extend beyond executable domains while increasing misspecification risk. This is why claims of recursive self-improvement should be calibrated carefully. The public course provides mechanisms and research directions, not evidence that a general system can improve itself without bound. The practical frontier is to make improvement measurable, bounded, and falsifiable: identify what changes, who or what verifies it, which distributions it transfers to, and what resource and safety constraints remain.`,
    visual: "Four coupled frontier blocks surrounding a bounded improvement loop with an unresolved-boundary marker.",
    kind: "frontier",
  },
  {
    file: "10-slide-design-checklist",
    stage: "transfer exercise",
    title: ["Design the Loop", "with Four Questions"],
    subtitle: "Generation, verification, persistence, and budget turn “self-improving” into testable claims.",
    claim: "TEACHING SYNTHESIS",
    time: "2:15",
    evidence: "Whole-series diagnostic; detailed lessons linked from the course hub",
    objective: "Apply the course model to one bounded education or research workflow.",
    notes: `Finish by applying the framework. Suppose we build a student research assistant. Generation asks where alternative questions, search plans, explanations, or drafts come from and whether they are meaningfully different. Verification asks what evidence distinguishes a supported claim from a plausible fabrication. We might require source-level citation checks, student explanation, and teacher review for consequential conclusions. Persistence asks what survives: an approved research plan, a citation library, a memory, a changed workflow, or updated model behavior. It also asks what must not persist, such as private student data or unauthorized course material. Budget asks where to spend model calls, search time, teacher attention, and risk. Not every step deserves maximum compute or autonomy. Now state one testable improvement claim: after using verified feedback from one project, the assistant should produce better-supported claims on a new project at similar cost. Then design a comparison that could disprove it. This is the core lesson of CS329A as organized in this companion: generation creates possibilities; verification gives bounded evidence; persistence determines whether improvement lasts; and budget determines whether the system is practical. Use the nine detailed posts when you need the mechanisms, papers, and caveats behind each box.`,
    visual: "Four-question checklist applied to a student research assistant, followed by a drill-down path to nine lessons.",
    kind: "checklist",
  },
];

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function ensure(path: string): void {
  mkdirSync(path, { recursive: true });
}

function txt(
  x: number,
  y: number,
  lines: string[],
  size: number,
  color = C.ink,
  weight = 700,
  lineHeight = Math.round(size * 1.15),
  anchor: "start" | "middle" | "end" = "start",
  uppercase = false,
): string {
  const normalized = lines.map((line) => uppercase ? line.toUpperCase() : line);
  return normalized.map((line, index) => `<text x="${x}" y="${y + index * lineHeight}" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="0">${esc(line)}</text>`).join("");
}

function card(x: number, y: number, w: number, h: number, line = C.line, fill = C.paper, radius = 8): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${line}" stroke-width="2"/>`;
}

function pill(x: number, y: number, w: number, label: string, color: string, fill = C.paper): string {
  return `${card(x, y, w, 48, color, fill, 8)}${txt(x + w / 2, y + 31, [label], 16, color, 850, 19, "middle", true)}`;
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
  const claimColor = s.claim === "OPEN RESEARCH QUESTION" ? C.maroon : C.teal;
  const claimFill = s.claim === "OPEN RESEARCH QUESTION" ? C.redBg : C.tealBg;
  const claimWidth = s.claim === "OPEN RESEARCH QUESTION" ? 290 : 235;
  return `${pill(72, 60, 270, s.stage, C.teal, C.tealBg)}${pill(360, 60, claimWidth, s.claim, claimColor, claimFill)}${pill(1390, 60, 138, s.time, C.brown, C.amberBg)}${txt(76, 185, s.title, 52, C.ink, 900, 58)}${txt(78, s.title.length > 1 ? 320 : 265, [s.subtitle], 22, C.muted, 650, 27)}`;
}

function footer(s: Slide, index: number): string {
  return `<line x1="72" y1="826" x2="1528" y2="826" stroke="${C.line}" stroke-width="2"/>${txt(76, 856, [`SOURCE MAP  ${s.evidence}`], 13, C.muted, 700, 16, "start", true)}${txt(1524, 856, [`${String(index + 1).padStart(2, "0")} / ${slides.length}`], 13, C.muted, 800, 16, "end")}`;
}

function shell(s: Slide, index: number, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="#EAE4D8" stroke-width="1"/></pattern></defs>
  <rect width="${W}" height="${H}" fill="${C.bg}"/><rect x="28" y="28" width="1544" height="844" rx="8" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/><rect x="28" y="28" width="1544" height="844" rx="8" fill="url(#grid)" opacity="0.62"/>
  ${header(s)}${body}${footer(s, index)}
  </svg>`;
}

function visualize(s: Slide, index: number): string {
  if (s.kind === "cover") {
    const nodes = [
      [340, 548, "GENERATE", C.cobalt],
      [610, 468, "PLAN", C.brown],
      [880, 468, "ACT", C.maroon],
      [1150, 548, "VERIFY", C.teal],
      [745, 710, "LEARN", C.green],
    ] as const;
    return shell(s, index, `${nodes.map(([x, y, label, color]) => `${card(x - 105, y - 42, 210, 84, color, C.paper)}${txt(x, y + 9, [label], 18, color, 900, 22, "middle", true)}`).join("")}${arrow(445, 530, 505, 495, C.cobalt)}${arrow(715, 468, 775, 468, C.brown)}${arrow(985, 495, 1045, 530, C.maroon)}${arrow(1100, 590, 850, 690, C.teal)}${arrow(650, 690, 390, 590, C.green)}${pill(155, 720, 250, "generation?", C.cobalt, C.blueBg)}${pill(430, 740, 250, "verification?", C.teal, C.tealBg)}${pill(920, 740, 250, "persistence?", C.green, C.greenBg)}${pill(1195, 720, 250, "budget?", C.brown, C.amberBg)}`);
  }

  if (s.kind === "compare") {
    return shell(s, index, `${card(90, 400, 620, 350, C.brown, C.amberBg)}${txt(400, 458, ["ONE MODEL CALL"], 20, C.brown, 900, 24, "middle", true)}${pill(205, 535, 390, "input  ->  model  ->  output", C.brown, C.paper)}${txt(400, 650, ["Capability may be strong", "but nothing necessarily changes"], 20, C.ink, 700, 27, "middle")}${card(780, 400, 730, 350, C.teal, C.tealBg)}${txt(1145, 458, ["IMPROVING AGENT SYSTEM"], 20, C.teal, 900, 24, "middle", true)}${pill(850, 525, 170, "state", C.cobalt, C.blueBg)}${pill(1080, 525, 170, "tools", C.maroon, C.redBg)}${pill(1310, 525, 150, "action", C.brown, C.amberBg)}${pill(955, 625, 190, "feedback", C.teal, C.paper)}${pill(1190, 625, 190, "change", C.green, C.greenBg)}${arrow(1020, 550, 1080, 550, C.cobalt)}${arrow(1250, 550, 1310, 550, C.maroon)}${arrow(1380, 585, 1330, 625, C.brown)}${arrow(1190, 650, 1145, 650, C.teal)}`);
  }

  if (s.kind === "loop") {
    const labels = [
      [80, "GENERATE", C.cobalt, C.blueBg],
      [330, "SEARCH / PLAN", C.brown, C.amberBg],
      [630, "ACT", C.maroon, C.redBg],
      [845, "OBSERVE", C.cobalt, C.blueBg],
      [1095, "VERIFY", C.teal, C.tealBg],
      [1335, "LEARN", C.green, C.greenBg],
    ] as const;
    return shell(s, index, `${labels.map(([x, label, color, fill]) => pill(x, 485, label === "SEARCH / PLAN" ? 240 : 185, label, color, fill)).join("")}${arrow(265, 509, 330, 509, C.cobalt)}${arrow(570, 509, 630, 509, C.brown)}${arrow(815, 509, 845, 509, C.maroon)}${arrow(1030, 509, 1095, 509, C.cobalt)}${arrow(1280, 509, 1335, 509, C.teal)}<path d="M 1185 533 C 1185 680 430 680 430 533" fill="none" stroke="${C.teal}" stroke-width="4" stroke-dasharray="10 8"/>${txt(805, 706, ["RETRY CURRENT RUN"], 17, C.teal, 900, 21, "middle", true)}<path d="M 1430 533 C 1430 750 210 750 210 533" fill="none" stroke="${C.green}" stroke-width="4"/>${txt(805, 772, ["DURABLE CHANGE ACROSS RUNS"], 17, C.green, 900, 21, "middle", true)}${card(110, 390, 1380, 60, C.brown, C.amberBg)}${txt(800, 428, ["BUDGET: COMPUTE  |  TIME  |  HUMAN ATTENTION  |  RISK"], 17, C.brown, 900, 21, "middle", true)}`);
  }

  if (s.kind === "sampling") {
    const ys = [400, 470, 540, 610, 680];
    return shell(s, index, `${card(75, 505, 220, 110, C.cobalt, C.blueBg)}${txt(185, 552, ["FIXED MODEL"], 18, C.cobalt, 900, 22, "middle", true)}${txt(185, 585, ["sample k times"], 16, C.ink, 700, 20, "middle")}${ys.map((y, i) => `${arrow(295, 560, 470, y + 25, C.cobalt, 3)}${pill(470, y, 205, `candidate ${i + 1}`, i === 3 ? C.green : C.cobalt, i === 3 ? C.greenBg : C.paper)}`).join("")}${ys.map((y) => arrow(675, y + 24, 900, 560, C.teal, 3)).join("")}${card(900, 480, 250, 160, C.teal, C.tealBg)}${txt(1025, 535, ["VERIFIER"], 19, C.teal, 900, 23, "middle", true)}${txt(1025, 580, ["rank / filter", "select"], 17, C.ink, 700, 22, "middle")}${arrow(1150, 560, 1250, 560, C.green)}${card(1250, 505, 280, 110, C.green, C.greenBg)}${txt(1390, 548, ["RETURNED ANSWER"], 17, C.green, 900, 21, "middle", true)}${txt(1390, 583, ["reliability"], 16, C.ink, 700, 20, "middle")}${pill(480, 755, 310, "coverage: success exists", C.cobalt, C.blueBg)}${pill(830, 755, 390, "selection: success is returned", C.teal, C.tealBg)}`);
  }

  if (s.kind === "verification") {
    return shell(s, index, `${card(80, 405, 300, 340, C.cobalt, C.blueBg)}${txt(230, 460, ["CODE PATCH"], 19, C.cobalt, 900, 23, "middle", true)}${txt(120, 525, ["if x <= 0:", "  return 0", "return 100 / x"], 20, C.ink, 700, 31)}${arrow(380, 570, 485, 570, C.cobalt)}${card(485, 405, 300, 340, C.teal, C.tealBg)}${txt(635, 460, ["TEST SUITE"], 19, C.teal, 900, 23, "middle", true)}${pill(535, 520, 200, "public tests", C.teal, C.paper)}${pill(535, 595, 200, "hidden cases", C.brown, C.amberBg)}${txt(635, 690, ["A specification", "with blind spots"], 17, C.ink, 700, 22, "middle")}${arrow(785, 570, 890, 570, C.teal)}${card(890, 405, 640, 340, C.line, C.paper)}${pill(930, 475, 250, "FALSE ACCEPT", C.red, C.redBg)}${txt(1200, 505, ["wrong behavior passes"], 17, C.ink, 700, 21)}${pill(930, 555, 250, "FALSE REJECT", C.brown, C.amberBg)}${txt(1200, 585, ["valid alternative fails"], 17, C.ink, 700, 21)}${pill(930, 635, 250, "GAMING", C.maroon, C.redBg)}${txt(1200, 665, ["optimize the check"], 17, C.ink, 700, 21)}${txt(1210, 775, ["Ask what the verifier cannot see."], 18, C.red, 900, 22, "middle")}`);
  }

  if (s.kind === "graph") {
    const node = (x: number, y: number, w: number, label: string, color: string, fill: string) => `${card(x, y, w, 74, color, fill)}${txt(x + w / 2, y + 45, [label], 16, color, 900, 20, "middle", true)}`;
    return shell(s, index, `${txt(800, 392, ["EXAMPLE CRITICAL PATH (ASSUMED DURATIONS)"], 16, C.maroon, 900, 20, "middle", true)}${node(80, 525, 190, "DEFINE TASK", C.cobalt, C.blueBg)}${node(375, 415, 220, "SEARCH SOURCES", C.cobalt, C.paper)}${node(375, 635, 220, "COLLECT DATA", C.brown, C.paper)}${node(735, 525, 220, "SYNTHESIZE", C.maroon, C.redBg)}${node(1080, 525, 220, "VERIFY", C.teal, C.tealBg)}${node(1370, 525, 160, "DELIVER", C.green, C.greenBg)}${arrow(270, 555, 375, 450, C.maroon, 6)}${arrow(270, 570, 375, 665, C.brown, 3)}${arrow(595, 450, 735, 545, C.maroon, 6)}${arrow(595, 665, 735, 580, C.brown, 3)}${arrow(955, 562, 1080, 562, C.maroon, 6)}${arrow(1300, 562, 1335, 562, C.maroon, 6)}<line x1="1340" y1="500" x2="1340" y2="625" stroke="${C.red}" stroke-width="6"/>${pill(1225, 430, 235, "authority gate", C.red, C.redBg)}${arrow(1345, 562, 1370, 562, C.maroon, 6)}<path d="M 1190 599 C 1190 750 835 750 835 599" fill="none" stroke="${C.teal}" stroke-width="4" stroke-dasharray="10 8"/>${txt(1015, 775, ["REVERSIBLE RETRY"], 16, C.teal, 900, 20, "middle", true)}`);
  }

  if (s.kind === "persistence") {
    return shell(s, index, `${card(80, 405, 1440, 155, C.teal, C.tealBg)}${txt(120, 448, ["WITHIN ONE RUN"], 18, C.teal, 900, 22, "start", true)}${pill(350, 455, 170, "fail", C.red, C.redBg)}${arrow(520, 479, 630, 479, C.teal)}${pill(630, 455, 240, "revise context", C.teal, C.paper)}${arrow(870, 479, 980, 479, C.teal)}${pill(980, 455, 190, "succeed", C.green, C.greenBg)}${txt(1360, 493, ["may forget"], 18, C.red, 800, 22, "middle")}${card(80, 610, 1440, 155, C.green, C.greenBg)}${txt(120, 653, ["ACROSS RUNS"], 18, C.green, 900, 22, "start", true)}${pill(350, 660, 190, "experience", C.cobalt, C.blueBg)}${arrow(540, 684, 630, 684, C.green)}${pill(630, 660, 270, "select + validate", C.teal, C.paper)}${arrow(900, 684, 990, 684, C.green)}${pill(990, 660, 310, "memory / data / weights", C.green, C.paper)}${txt(1410, 698, ["next run changes"], 17, C.green, 850, 21, "middle")}`);
  }

  if (s.kind === "evaluation") {
    return shell(s, index, `${card(70, 430, 620, 310, C.cobalt, C.blueBg)}${txt(380, 475, ["LONG-HORIZON TRAJECTORY"], 18, C.cobalt, 900, 22, "middle", true)}${pill(105, 550, 140, "query", C.cobalt, C.paper)}${arrow(245, 574, 285, 574, C.cobalt)}${pill(285, 550, 140, "retrieve", C.cobalt, C.paper)}${arrow(425, 574, 465, 574, C.cobalt)}${pill(465, 550, 170, "synthesize", C.maroon, C.redBg)}${txt(380, 665, ["Small errors compound", "across steps"], 20, C.red, 850, 26, "middle")}${arrow(690, 585, 790, 585, C.teal)}${card(790, 405, 740, 360, C.teal, C.tealBg)}${txt(1160, 455, ["EVALUATION PORTFOLIO"], 18, C.teal, 900, 22, "middle", true)}${pill(835, 520, 200, "final artifact", C.green, C.greenBg)}${pill(1080, 520, 200, "trajectory", C.cobalt, C.blueBg)}${pill(1325, 520, 160, "recovery", C.maroon, C.redBg)}${pill(955, 630, 200, "evidence", C.teal, C.paper)}${pill(1200, 630, 200, "cost", C.brown, C.amberBg)}`);
  }

  if (s.kind === "frontier") {
    return shell(s, index, `${card(610, 500, 380, 150, C.ink, C.paper)}${txt(800, 555, ["BOUNDED"], 18, C.ink, 900, 22, "middle", true)}${txt(800, 600, ["IMPROVEMENT LOOP"], 23, C.ink, 900, 28, "middle", true)}${card(120, 405, 330, 145, C.cobalt, C.blueBg)}${txt(285, 460, ["DIVERSITY"], 18, C.cobalt, 900, 22, "middle", true)}${txt(285, 505, ["different experience"], 17, C.ink, 700, 21, "middle")}${card(1150, 405, 330, 145, C.teal, C.tealBg)}${txt(1315, 460, ["META-VERIFICATION"], 18, C.teal, 900, 22, "middle", true)}${txt(1315, 505, ["check the checker"], 17, C.ink, 700, 21, "middle")}${card(120, 650, 330, 145, C.maroon, C.redBg)}${txt(285, 705, ["CURRICULUM"], 18, C.maroon, 900, 22, "middle", true)}${txt(285, 750, ["learnable next tasks"], 17, C.ink, 700, 21, "middle")}${card(1150, 650, 330, 145, C.brown, C.amberBg)}${txt(1315, 705, ["EFFICIENCY"], 18, C.brown, 900, 22, "middle", true)}${txt(1315, 750, ["capability per resource"], 17, C.ink, 700, 21, "middle")}${arrow(450, 485, 610, 545, C.cobalt)}${arrow(1150, 485, 990, 545, C.teal)}${arrow(450, 710, 610, 625, C.maroon)}${arrow(1150, 710, 990, 625, C.brown)}${pill(590, 720, 420, "not a solved recursive recipe", C.red, C.redBg)}`);
  }

  return shell(s, index, `${card(80, 405, 980, 360, C.line, C.paper)}${txt(570, 455, ["STUDENT RESEARCH ASSISTANT"], 19, C.ink, 900, 23, "middle", true)}${pill(120, 530, 210, "1  generation", C.cobalt, C.blueBg)}${txt(350, 560, ["different questions and plans"], 17, C.ink, 700, 21)}${pill(120, 610, 210, "2  verification", C.teal, C.tealBg)}${txt(350, 640, ["citations + student defense"], 17, C.ink, 700, 21)}${pill(600, 530, 210, "3  persistence", C.green, C.greenBg)}${txt(830, 560, ["approved plan, not private data"], 17, C.ink, 700, 21)}${pill(600, 610, 210, "4  budget", C.brown, C.amberBg)}${txt(830, 640, ["calls, time, review, risk"], 17, C.ink, 700, 21)}${card(1110, 405, 420, 360, C.maroon, C.redBg)}${txt(1320, 465, ["DRILL DOWN"], 18, C.maroon, 900, 22, "middle", true)}${txt(1320, 535, ["Overview first"], 23, C.ink, 850, 28, "middle")}${arrow(1320, 565, 1320, 615, C.maroon)}${txt(1320, 655, ["9 detailed lessons"], 23, C.ink, 850, 28, "middle")}${txt(1320, 715, ["mechanisms • papers • caveats"], 15, C.muted, 750, 19, "middle")}`);
}

function prompt(s: Slide, index: number): string {
  return `# Slide ${index + 1}: ${s.title.join(" ")}\n\n## Production method\nOriginal 1600x900 local SVG rendered to PNG for exact text fidelity. No copied Stanford frames, figures, logos, or paper graphics.\n\n## Style\nAged cream academic briefing, subtle engineering grid, near-black type, cobalt generation, teal verification, green persistence, warm-brown budget, maroon constraints, red risks, no gradients.\n\n## Claim calibration\n- Claim type: ${s.claim}\n- This deck is an independent teaching companion.\n- Evidence map: ${s.evidence}\n\n## On-slide content\n- Stage: ${s.stage}\n- Headline: ${s.title.join(" ")}\n- Subtitle: ${s.subtitle}\n- Planned speaking time: ${s.time}\n\n## Visual direction\n${s.visual}\n\n## Teaching objective\n${s.objective}\n\n## Speaker notes (${s.time})\n${s.notes}\n`;
}

function contactSheet(): string {
  const thumbWidth = 288;
  const thumbHeight = 162;
  const gap = 24;
  const margin = 32;
  const labelHeight = 42;
  const columns = 5;
  const rows = 2;
  const width = margin * 2 + columns * thumbWidth + (columns - 1) * gap;
  const height = margin * 2 + rows * (thumbHeight + labelHeight) + (rows - 1) * gap;
  const shortLabels = [
    "Course in 20 Minutes",
    "Model vs. System",
    "Teaching Loop",
    "Test-Time Compute",
    "Verification",
    "Tools and Planning",
    "Persistence",
    "Long-Horizon Evaluation",
    "Research Frontier",
    "Design Checklist",
  ];
  const images = slides.map((s, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = margin + column * (thumbWidth + gap);
    const y = margin + row * (thumbHeight + labelHeight + gap);
    const data = readFileSync(join(DIR, `${s.file}.png`)).toString("base64");
    return `<image href="data:image/png;base64,${data}" x="${x}" y="${y}" width="${thumbWidth}" height="${thumbHeight}"/>${txt(x, y + thumbHeight + 27, [`${String(index + 1).padStart(2, "0")}  ${shortLabels[index]}`], 13, C.ink, 750, 16)}`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#E8E2D7"/>${images}</svg>`;
}

ensure(SVG_DIR);
ensure(PROMPT_DIR);

slides.forEach((slide, index) => {
  const svg = visualize(slide, index);
  const svgPath = join(SVG_DIR, `${slide.file}.svg`);
  const pngPath = join(DIR, `${slide.file}.png`);
  writeFileSync(svgPath, svg);
  writeFileSync(join(PROMPT_DIR, `${slide.file}.md`), prompt(slide, index));
  const result = Bun.spawnSync(["sips", "-s", "format", "png", svgPath, "--out", pngPath], { stdout: "pipe", stderr: "pipe" });
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
});

const contactSvg = join(DIR, "contact-sheet.svg");
writeFileSync(contactSvg, contactSheet());
const contactResult = Bun.spawnSync(["sips", "-s", "format", "png", contactSvg, "--out", join(DIR, "contact-sheet.png")], { stdout: "pipe", stderr: "pipe" });
if (contactResult.exitCode !== 0) throw new Error(contactResult.stderr.toString());

console.log(`Rendered ${slides.length} slides, prompts, SVGs, and contact sheet in ${DIR}`);
