# CS329A Part 4 Evidence Research: Learning from Feedback with Tools/Code

## Source and coverage record

- **Official video title:** Stanford CS329A Self-Improving AI Agents | Part 4 | Learning from Feedback with Tools/Code
- **Official video:** https://www.youtube.com/watch?v=Lxh9RF5S-K0
- **Uploader:** Stanford Online
- **Duration:** 1:11:13
- **Official course schedule:** https://cs329a.stanford.edu/
- **Course schedule entry:** Lecture 4, "Learning from feedback with tools/code," with three assigned readings.
- **Accessed:** 2026-08-28 (America/New_York)
- **Transcript evidence:** Native English YouTube captions, 1,856 timestamped segments. The complete caption stream from 00:07 through 1:11:06 was read. There is no substantive speech before 00:07; the final answer ends at approximately 1:11:06.
- **Visual evidence:** 28 full-resolution cue frames were inspected across the complete lecture. They cover each paper, the main method diagrams, representative results, transitions, the recap, and the final Q&A. Frames that show only the speaker are identified rather than treated as slide evidence.
- **Evidence convention:** "Lecture" means directly observed in the official video/captions. "Paper" means supported by an assigned paper's primary arXiv record or PDF. "Teaching synthesis" means an inference or instructional framing added here.
- **Confidence:** High for the lecture structure, assigned readings, method descriptions, and central comparisons. Medium for isolated classroom remarks because audience audio is occasionally indistinct. The official YouTube metadata reports 1:11:13, while the downloaded media container rounds to 1:11:12; this report uses the official duration.

## Official assigned readings

1. **ReAct: Synergizing Reasoning and Acting in Language Models** — Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, and Yuan Cao. https://arxiv.org/abs/2210.03629
2. **RLEF: Grounding Code LLMs in Execution Feedback with Reinforcement Learning** — Jonas Gehring, Kunhao Zheng, Jade Copet, Vegard Mella, Quentin Carbonneaux, Taco Cohen, and Gabriel Synnaeve. https://arxiv.org/abs/2410.02089
3. **Constitutional AI: Harmlessness from AI Feedback** — Yuntao Bai et al. https://arxiv.org/abs/2212.08073

The official schedule provides these three readings. Together they span three different feedback channels: observations returned by external tools, objective signals from program execution, and preference feedback generated under an explicit written constitution. That grouping is a teaching synthesis; the papers do not claim to form one unified taxonomy.

## Complete timestamped conceptual outline

### 00:07-01:48 — Three ways an agent can obtain feedback

- **00:07-00:42:** Connects the lecture to self-improving agents and introduces feedback from tools, code execution, and model-generated critiques or preferences.
- **00:42-01:48:** Previews ReAct, RLEF, and Constitutional AI. The framing question is not merely whether a model can produce an answer, but what information can correct its trajectory during inference or improve its policy during training.

### 01:48-07:27 — ReAct: combining reasoning and action

- **01:48-03:20:** Contrasts chain-of-thought-style reasoning with acting through an external environment. Reasoning can decompose a task, while actions can obtain current or otherwise unavailable information.
- **03:20-04:49:** Describes the gap in prior approaches: chain-of-thought can remain ungrounded, while action-only systems may lack explicit deliberation about what to do next.
- **04:49-07:27:** Introduces the ReAct trajectory: interleave **Thought**, **Action**, and **Observation**. The language model acts as a controller in language space, and the environment returns observations that condition later reasoning.

### 07:27-12:54 — What a ReAct trace looks like

- **07:27-09:07:** Separates three modes shown in the paper: reason-only, act-only, and combined reasoning-and-acting trajectories.
- **09:07-12:03:** Walks through a HotpotQA example. A thought identifies an information need, a search action queries Wikipedia, an observation returns text, and later steps refine the search before answering.
- **12:03-12:54:** Discusses uncertainty and calibration. A useful agent should recognize when available evidence is insufficient, but a verbal expression of confidence is not itself proof of calibrated probability.

### 12:54-18:37 — Action spaces, task structure, and benchmark evidence

- **12:54-15:41:** Emphasizes sequential interleaving: observations can change the next thought and action. This differs from writing a complete plan once and executing it without revision.
- **15:41-17:39:** Defines restricted action spaces for HotpotQA and FEVER, such as search, lookup, and finish. Constraining syntax makes actions executable and easier to evaluate.
- **17:39-18:37:** Reviews benchmark comparisons. ReAct improves grounding and interpretability in the reported tasks, while a combined strategy can fall back to chain-of-thought when ReAct does not finish.

### 18:37-22:46 — ReAct failure modes and decision-making tasks

- **18:37-20:04:** Examines error categories. ReAct reduces some hallucination errors but can fail because search returns unhelpful evidence or because reasoning misuses an observation.
- **20:04-21:22:** Moves to WebShop, where the agent must navigate a simulated shopping site and choose actions that satisfy a natural-language request.
- **21:22-22:46:** Notes that errors compound across long trajectories. A larger action space requires more demonstrations and context, and repeated tool calls increase inference cost.

### 22:46-27:32 — Classroom synthesis: designing feedback loops

- **22:46-24:20:** Discusses noisy environmental feedback and the need to distinguish a bad action from a misleading observation.
- **24:20-25:37:** Considers reflection, backtracking, confidence estimates, and repeated trials as recovery mechanisms.
- **25:37-27:32:** Expands to task decomposition, parallel candidate approaches, memory, and compound systems. The discussion warns that more deliberation can also produce overthinking rather than reliable progress.

### 27:32-31:57 — RLEF: code execution as a learning signal

- **27:32-28:53:** Introduces code generation as a domain with unusually concrete feedback: generated programs can be executed against tests.
- **28:53-30:02:** Describes the RLEF loop. The model generates code, observes execution feedback, and revises its solution over multiple turns.
- **30:02-31:57:** Uses a palindrome example in which an initial implementation times out and feedback helps target a repair. Public tests provide immediate observations; under the paper's Section 2 formulation, the terminal reward records whether all public and private tests pass.

### 31:57-36:20 — Training with multi-turn execution feedback

- **31:57-33:40:** Explains the hybrid reinforcement-learning formulation. Tokens are language-model actions, but execution feedback arrives at turn boundaries, so the value/reward structure spans token-level generation and turn-level interaction.
- **33:40-34:36:** Clarifies that test outcomes come from actual program execution rather than another model's judgment. This makes the signal objective relative to the test suite, not necessarily complete relative to the user's intent.
- **34:36-36:20:** Presents solve-rate improvements as the test-time sample budget grows. The model learns targeted repairs instead of merely sampling unrelated replacements.

### 36:20-41:29 — What RLEF demonstrates, and what it does not

- **36:20-37:47:** Reviews ablations on turns, code changes, and errors. Execution feedback is useful when it identifies a repairable failure.
- **37:47-39:12:** Discusses binary rewards and difficult tasks. Sparse pass/fail signals may be inadequate when no sampled revision passes the tests.
- **39:12-40:16:** Compares reinforcement learning with supervised fine-tuning and discusses terminology around private-test leakage. The lecture does not establish a universal definition of leakage; it distinguishes using public feedback during interaction from reserving private tests for reward/evaluation.
- **40:16-41:29:** Notes that test execution is domain-specific. The method presumes runnable code, useful tests, and a sandbox, conditions not automatically available in other domains.

### 41:29-46:30 — From small programs to repositories

- **41:29-44:01:** Summarizes RLEF: feedback can teach a model to repair code over a trajectory, but the reported setting is narrower than unrestricted software engineering.
- **44:01-46:30:** Classroom discussion considers large codebases, where agents also need search, summaries, dependency structure, retrieval, or graph representations. These are adjacent engineering concerns, not assigned evidence for RLEF's reported results.

### 46:30-50:42 — Constitutional AI: scaling normative feedback

- **46:30-47:49:** Motivates Constitutional AI from the cost of collecting human preference labels for harmlessness.
- **47:49-49:16:** Introduces a written constitution of natural-language principles. In the paper's supervised phase, the model critiques and revises harmful responses using those principles.
- **49:16-50:42:** Introduces the reinforcement-learning phase: AI-generated preference comparisons train a preference model, which supplies rewards for policy optimization. Section 4.3 of the paper says preference-label generation ensembles 16 prewritten constitutional principles; Appendix C records the principles used. The lecture displays examples concerning harm, gender bias, and age appropriateness.

### 50:42-55:44 — Critique, revision, and the helpfulness tradeoff

- **50:42-52:10:** Reviews supervised-learning results. Constitutional critique and revision improve the measured harmlessness-oriented objective, while helpfulness can decline.
- **52:10-53:20:** Frames this as a helpfulness-harmlessness tradeoff rather than a single score that captures alignment.
- **53:20-55:44:** Reviews scaling results across reinforcement-learning sequences. The approach reduces the amount of direct human harmlessness labeling, but the constitution and helpfulness data still originate from humans.

### 55:44-60:28 — Limits of constitutions and AI feedback

- **55:44-57:14:** Discusses whether a constitution can be updated as norms or deployment requirements change. Continual maintenance is presented as an open problem rather than a solved mechanism.
- **57:14-58:52:** Argues that human validation remains useful even when an AI preference model scales annotation. A model-generated preference is only as trustworthy as the principles, evaluator, and distribution on which it is applied.
- **58:52-60:28:** Shows the helpfulness-harmlessness Pareto comparison. The classroom discussion notes that self-critique can be weaker than an external critic and that dependable self-correction remains open.

### 60:28-63:20 — Lecture recap

- **60:28-62:29:** Recaps the three feedback mechanisms: observations from acting, executable tests for code, and constitutional critique/preferences.
- **62:29-63:20:** Connects them through a common loop: produce a trajectory, obtain a signal, and use that signal either to alter the current trajectory or train a future policy.

### 63:20-71:06 — Final discussion and open research questions

- **63:20-65:07:** Draws a cautious analogy to cognitive science and human learning. The analogy is illustrative, not empirical evidence that model learning follows human cognition.
- **65:07-66:47:** Discusses search over reasoning trajectories and how feedback changes the effective search space.
- **66:47-68:25:** Considers transfer across agents and domains. Tool interfaces, action spaces, and workflows are often domain-specific, limiting direct transfer.
- **68:25-69:37:** Treats context as a partial representation of state and revisits the ReAct formalism.
- **69:37-71:06:** Ends with data filtering and feedback-quality questions. More feedback is not automatically better when it is noisy, misspecified, exploitable, or correlated with the learner's errors.

## Twelve-slide teaching narrative

### Slide 1 — Feedback changes what an agent can learn

- A generator alone maps context to output.
- An agent loop maps **state -> thought/action -> observation/reward -> updated state**.
- The key design decision is the feedback source: tool observation, executable test, or normative evaluator.
- **Teaching claim:** Feedback is not interchangeable; each source exposes different information and failure modes.
- **Evidence:** Lecture 00:07-01:48; official three-paper schedule.

### Slide 2 — ReAct interleaves reasoning and acting

- Chain-of-thought decomposes a problem but may remain disconnected from the world.
- Tool use grounds the trajectory but action-only behavior may be myopic.
- ReAct alternates Thought, Action, and Observation instead of completing either process in isolation.
- **Visual:** ReAct method diagram at 07:01.
- **Evidence:** Lecture 01:48-07:27; ReAct, https://arxiv.org/abs/2210.03629.

### Slide 3 — Tool observations are evidence, not truth

- Search results can be irrelevant, incomplete, stale, or misread.
- The next reasoning step must interpret the observation and decide whether more evidence is needed.
- Verbal confidence is not the same as calibrated uncertainty.
- **Teaching synthesis:** A tool call reduces epistemic uncertainty only when the returned evidence is relevant and correctly interpreted.
- **Evidence:** Lecture 09:07-12:54 and 18:37-20:04.

### Slide 4 — An agent needs an explicit action contract

- Define valid actions and arguments.
- Define how observations enter context.
- Define stop conditions, budgets, and recovery behavior.
- Define what happens after invalid syntax, empty results, or contradictory evidence.
- **Visual:** HotpotQA/FEVER action space at 17:29.
- **Evidence:** Lecture 12:54-17:39; ReAct paper.

### Slide 5 — ReAct improves grounding but creates trajectory risk

- Reported gains are task- and setup-dependent.
- Tool use can reduce hallucination yet introduce search errors.
- Early mistakes can cascade through later decisions.
- Larger action spaces require more demonstrations/context and more inference compute.
- **Evidence:** Lecture 17:39-22:46; ReAct paper Sections 4-5 and appendices.

### Slide 6 — RLEF turns program execution into feedback

- Generate code, execute it, observe failures, and revise.
- Execution is an external signal rather than a language-model opinion.
- A failing test can localize behavior that should change.
- **Visual:** Palindrome repair trajectory at 30:45 and 31:33.
- **Evidence:** Lecture 27:32-31:57; RLEF, https://arxiv.org/abs/2410.02089.

### Slide 7 — Public and private tests play different roles

- Public tests provide observations during the repair trajectory.
- Private tests provide a held-out reward or evaluation signal.
- Separating them reduces direct optimization against every evaluation case.
- Passing tests proves conformance to the tested properties, not full semantic correctness.
- **Evidence:** Lecture 30:02-34:36; RLEF paper.

### Slide 8 — Multi-turn code learning spans two time scales

- Token actions produce code and commands.
- Turn-level execution returns delayed feedback.
- The policy must assign credit across both the generated program and later repairs.
- **Visual:** Hybrid token/turn-level PPO formulation at 32:18.
- **Evidence:** Lecture 31:57-34:36; RLEF paper.

### Slide 9 — Execution feedback is powerful because it is narrow

- **Teaching synthesis:** The strength and boundary of the signal come from the same source: executable tests.
- It is objective relative to a test suite.
- It requires runnable artifacts, informative tests, and a secure sandbox.
- Sparse binary rewards fail when no attempt reaches a passing state.
- Repository-scale engineering adds search, dependency, and context-management problems.
- **Evidence:** Lecture 36:20-46:30; RLEF limitations.

### Slide 10 — A constitution is a written feedback specification

- Natural-language principles tell an evaluator what kinds of responses to prefer.
- The specification makes some normative assumptions inspectable.
- It does not remove human values; humans choose and interpret the principles.
- **Visual:** Example principles at 49:36.
- **Evidence:** Lecture 46:30-50:42; Constitutional AI, https://arxiv.org/abs/2212.08073.

### Slide 11 — Constitutional AI uses two learning phases

- **Supervised phase:** generate a response, critique it under a principle, and revise it.
- **RLAIF phase:** generate response pairs, use AI feedback to label preferences, train a preference model, and optimize a policy.
- Human helpfulness labels remain part of the reported pipeline.
- **Visual:** SL and RLAIF pipeline at 48:43 and 49:21.
- **Evidence:** Lecture 47:49-55:44; Constitutional AI paper.

### Slide 12 — Audit the feedback contract, not just the model

- **Teaching synthesis:** Treat feedback design as a system-level audit problem.
- **Source:** Who or what produces the signal?
- **Observability:** What failure information can the learner see?
- **Coverage:** Which intended behaviors are not tested or labeled?
- **Corruption:** Can the signal be noisy, biased, stale, or manipulated?
- **Incentives:** What proxy will the policy optimize?
- **Guardrails:** What budgets, sandboxes, held-out checks, and human review remain?
- **Teaching synthesis:** Self-improvement is bounded by the quality and governance of the feedback loop.
- **Evidence:** Synthesis of lecture 22:46-27:32, 36:20-46:30, and 55:44-71:06.

## Claim-to-evidence ledger

| ID | Claim | Basis | Lecture timestamp | Primary source |
|---|---|---|---|---|
| P4-C01 | ReAct interleaves reasoning traces with actions and environmental observations. | Observed + sourced | 04:49-07:27 | https://arxiv.org/abs/2210.03629 |
| P4-C02 | ReAct is presented as a response to the complementary limits of ungrounded reasoning and action without explicit reasoning traces. | Observed + sourced | 01:48-04:49 | https://arxiv.org/abs/2210.03629 |
| P4-C03 | The HotpotQA/FEVER setup constrains the agent to a small executable action space. | Observed + sourced | 15:41-17:39 | https://arxiv.org/abs/2210.03629 |
| P4-C04 | Tool access can reduce some hallucination failures but also introduces failures from uninformative retrieval and faulty reasoning over observations. | Observed + sourced | 18:37-20:04 | https://arxiv.org/abs/2210.03629 |
| P4-C05 | ReAct's reported benefits do not imply unrestricted-agent reliability; longer trajectories can compound errors. | Observed + sourced | 20:04-22:46 | https://arxiv.org/abs/2210.03629 |
| P4-C06 | RLEF trains code models to use execution feedback over iterative generation-and-repair turns. | Observed + sourced | 27:32-31:57 | https://arxiv.org/abs/2410.02089 |
| P4-C07 | In RLEF, public tests provide in-trajectory feedback; at episode end, a scalar reward records whether all public and private tests pass. | Observed + sourced | 30:02-34:36 | https://arxiv.org/abs/2410.02089, Sections 2.1-2.2 |
| P4-C08 | RLEF combines token-level language-model decisions with turn-level values or rewards from execution. | Observed + sourced | 31:57-33:40 | https://arxiv.org/abs/2410.02089 |
| P4-C09 | Actual execution makes feedback objective relative to the test suite, not complete relative to the intended program behavior. | Observed + teaching inference | 33:40-34:36 | https://arxiv.org/abs/2410.02089 |
| P4-C10 | RLEF improves the reported solve rate and encourages targeted repairs as the allowed sample budget grows. | Observed + sourced | 34:36-37:47 | https://arxiv.org/abs/2410.02089 |
| P4-C11 | RLEF depends on executable tests and does not by itself solve repository navigation or specification coverage. | Observed + sourced | 37:47-46:30 | https://arxiv.org/abs/2410.02089 |
| P4-C12 | Constitutional AI uses a human-written set of natural-language principles to guide model critique and revision; the reported preference-label procedure ensembles 16 prewritten principles. | Observed + sourced | 46:30-50:42 | https://arxiv.org/abs/2212.08073, Section 4.3 and Appendix C |
| P4-C13 | Its reinforcement-learning phase uses AI-generated preferences to train a preference model and optimize a policy. | Observed + sourced | 49:16-55:44 | https://arxiv.org/abs/2212.08073 |
| P4-C14 | The reported Constitutional AI pipeline still uses human input, including the constitution and helpfulness labels. | Observed + sourced | 53:20-55:44 | https://arxiv.org/abs/2212.08073 |
| P4-C15 | Harmlessness improvements can trade off against helpfulness, so no single reported score establishes universal alignment. | Observed + sourced | 50:42-53:20, 58:52-60:28 | https://arxiv.org/abs/2212.08073 |
| P4-C16 | Updating constitutions, validating AI preferences, and obtaining dependable self-correction remain open problems. | Observed + sourced | 55:44-60:28 | https://arxiv.org/abs/2212.08073 |
| P4-C17 | The three papers instantiate distinct feedback contracts rather than one generally substitutable self-improvement method. | Teaching synthesis | 00:07-01:48, 60:28-63:20 | https://arxiv.org/abs/2210.03629; https://arxiv.org/abs/2410.02089; https://arxiv.org/abs/2212.08073 |
| P4-C18 | More feedback can worsen learning when the signal is noisy, incomplete, biased, or exploitable. | Teaching synthesis grounded in limitations | 63:20-71:06 | https://arxiv.org/abs/2210.03629; https://arxiv.org/abs/2410.02089; https://arxiv.org/abs/2212.08073 |

## Caveats and limitations

### Lecture and evidence limitations

- Native captions are complete enough to reconstruct the lecture, but student questions are occasionally garbled. This report paraphrases those exchanges and does not treat unclear audience wording as an exact quotation.
- Timestamp boundaries are conceptual rather than frame-exact. Topics overlap during questions and transitions.
- Several sampled visual cues show the classroom camera or a lecturer standing in front of a slide. Numerical claims are included only when the slide was readable or the primary paper supported them.
- The lecture simplifies each paper for teaching. Paper-level claims should be interpreted under the paper's own benchmarks, model versions, prompts, and evaluation protocols.
- The final discussion contains research hypotheses and analogies. It is not experimental evidence that the methods generalize to every agent or domain.

### ReAct limitations

- ReAct does not guarantee factuality. Its observations may be irrelevant or misleading, and its reasoning can misuse valid evidence.
- Long trajectories compound early errors. The paper reports both reasoning errors and search failures; adding tools changes the error distribution rather than eliminating error.
- Prompted ReAct can underperform chain-of-thought on some tasks or settings. The paper reports that fine-tuning improves results, so the headline behavior is setup-dependent.
- Large action spaces require more demonstrations, context, and inference. The paper explicitly notes that this can exceed input limits.
- The principal experiments use bounded benchmarks and older model/tool settings. They do not establish reliability for unrestricted browser or device control.
- Human-readable thoughts improve trace visibility, but they are not guaranteed faithful explanations of the model's internal computation.

### RLEF limitations

- RLEF requires executable programs, meaningful tests, and a secure sandbox. Those conditions are not available for many open-ended tasks.
- Passing a finite test suite is only evidence for the covered behavior. A model can still produce incorrect, insecure, inefficient, or specification-violating code outside the tests.
- Binary pass/fail rewards are sparse. When no rollout succeeds, the training signal may not identify how to improve a hard solution.
- The paper focuses on improving a single solution through feedback. Decomposed, multi-component, and repository-scale tasks remain open extensions.
- The method executes generated code locally. Real deployment requires isolation, resource limits, network controls, and auditability beyond the learning algorithm.
- Public feedback and private evaluation reduce direct test overfitting only if the split is protected. They do not eliminate benchmark contamination or indirect leakage.
- Reported solve-rate gains are tied to the studied languages, tasks, test suites, models, and interaction budgets; they are not a general proof that reinforcement learning always beats supervised repair data.

### Constitutional AI limitations

- Constitutional AI relocates human judgment rather than removing it. Humans choose the principles, produce helpfulness data, and determine what evaluations count.
- A natural-language constitution can be incomplete, internally conflicting, culturally narrow, or ambiguous in novel situations.
- The reported approach still uses human helpfulness labels; it is not a fully human-free alignment pipeline.
- Optimizing an AI preference model can inherit that evaluator's blind spots and biases. Human validation and adversarial testing remain necessary.
- The paper reports a helpfulness-harmlessness tradeoff. A safer refusal pattern can also become less useful, and aggregate scores may conceal subgroup failures.
- The authors identify robustness to red-teaming and natural-language feedback as areas for further study. Less human testing may allow unforeseen failures.
- The method has dual-use risk: scalable behavioral steering can be applied toward harmful as well as beneficial principles.
- The paper does not solve continual constitutional revision, legitimate disagreement over values, or governance of who may change the principles.

### Cross-cutting limitations

- Feedback quality sets an upper bound on useful self-improvement. A learner can optimize a proxy without satisfying the underlying objective.
- Tool observations, test outcomes, and preference scores differ in semantics. Treating all three as a generic scalar "reward" can hide missing information and governance requirements.
- A successful benchmark result does not establish deployment safety. Real agents also need permission boundaries, rollback, monitoring, rate limits, and human escalation.
- Self-improvement can amplify systematic evaluator error. Repeated optimization is especially risky when the learner and evaluator share the same blind spot.

## Visual cue inspection log

| Timestamp | Observed visual | Teaching use / evidential value |
|---|---|---|
| 00:40 | Lecturer on camera; no readable result slide | Opening context only; not used for a technical claim. |
| 04:04 | Comparison of chain-of-thought reasoning and WebGPT-style acting | Motivates why reasoning and acting are complementary. |
| 07:01 | ReAct method diagram with reason-only, act-only, and combined loops | Primary visual for the Thought-Action-Observation pattern. |
| 09:41 | HotpotQA example comparing reasoning and action traces | Demonstrates how a query is selected from a thought. |
| 11:56 | Continuation of the HotpotQA ReAct trajectory | Shows observations conditioning later searches and the final answer. |
| 17:29 | HotpotQA/FEVER action-space slide | Supports the claim that benchmark actions are constrained. |
| 19:38 | Error-analysis table and prompting/fine-tuning charts | Supports task-dependent results and multiple failure categories. |
| 20:29 | WebShop environment and task example | Shows ReAct applied to an interactive decision-making benchmark. |
| 22:10 | Lecturer and partially obscured transition slide | Marks transition to discussion; not used for numerical evidence. |
| 27:32 | Lecturer at RLEF transition | Topic boundary only. |
| 28:37 | Lecturer with partial RLEF framing slide | Topic setup; transcript supplies the claim. |
| 30:45 | RLEF palindrome example with execution/test feedback | Shows an initial program receiving actionable failure evidence. |
| 31:33 | Continuation of palindrome repair and public/private tests | Illustrates multi-turn correction and the two-tier test design. |
| 32:18 | Hybrid token-level/turn-level PPO equation and diagram | Supports the two-time-scale learning explanation. |
| 35:24 | Solve-rate curves over test-time sample budget | Supports the reported budget-dependent performance trend. |
| 36:53 | RLEF ablation/error/turn/code-change results | Supports claims about targeted repair behavior and failure analysis. |
| 46:30 | Lecturer at Constitutional AI transition | Topic boundary only. |
| 48:43 | Constitutional AI supervised critique/revision pipeline | Primary visual for the supervised phase. |
| 49:21 | Constitutional AI SL plus RLAIF pipeline | Primary visual for AI preference generation and RL. |
| 49:36 | Three example constitutional principles | Demonstrates that the feedback specification is explicit natural language. |
| 50:43 | Lecturer on camera | Discussion transition; not used for a quantitative claim. |
| 51:13 | Supervised-learning harmlessness/helpfulness results | Supports the observed improvement/tradeoff framing. |
| 53:52 | Constitutional AI scaling results across RL sequences | Supports the reported scaling discussion within the paper's setup. |
| 58:28 | Helpfulness-harmlessness Pareto plot | Supports the claim that alignment quality is multi-objective. |
| 1:00:28 | Lecturer during final Constitutional AI discussion | Transition; no independent quantitative evidence. |
| 1:02:29 | Three-paper recap slide | Confirms the lecture's final synthesis of feedback sources. |
| 1:09:30 | Lecturer answering a final discussion question; no readable slide content | Confirms continued Q&A coverage; transcript supplies the conceptual content. |
| 1:10:45 | Lecturer concluding the final answer; no readable slide content | Confirms visual inspection through the lecture's closing minute; not used for a technical claim. |

## Glossary

- **Action:** A structured command an agent sends to an environment or tool.
- **Action space:** The set of actions and argument formats an agent is allowed to use.
- **Agent trajectory:** Ordered sequence of states, thoughts, actions, observations, and outputs during a task.
- **Calibration:** Agreement between a model's expressed confidence and its empirical correctness frequency.
- **Chain of thought (CoT):** Generated intermediate reasoning text used before an answer.
- **Constitution:** A written set of normative principles used to critique or rank model outputs.
- **Constitutional AI (CAI):** Training approach that uses constitutional critique/revision and AI-generated preference feedback to improve harmlessness.
- **Credit assignment:** Determining which earlier decisions contributed to a later reward or failure.
- **Environment:** External system that executes actions and returns observations.
- **Execution feedback:** Information produced by running generated code, such as output, exception, timeout, or test result.
- **Grounding:** Connecting generated reasoning or claims to observations from an external environment.
- **Held-out/private test:** Test not exposed as an in-trajectory observation and reserved for reward or evaluation.
- **Observation:** Information returned by the environment after an action.
- **Pareto frontier:** Set of solutions for which improving one objective requires worsening another.
- **Preference model:** Learned evaluator that predicts which of two responses better satisfies a target preference.
- **Proxy objective:** Measurable signal used for optimization that may incompletely represent the true goal.
- **Public test:** Test whose result is exposed to the agent during iterative repair.
- **ReAct:** Framework that interleaves reasoning traces with actions and environmental observations.
- **Reinforcement learning from AI feedback (RLAIF):** Reinforcement learning in which an AI system supplies some preference labels or rewards under human-specified guidance.
- **Reinforcement learning from execution feedback (RLEF):** Learning approach that uses results from executing generated code to improve multi-turn code generation.
- **Reward hacking:** Improving a measured reward through behavior that violates the intended objective.
- **Sandbox:** Isolated execution environment intended to limit the effects of generated code.
- **Self-correction:** Revising a response or trajectory after detecting a possible failure; reliable self-correction is not guaranteed merely by prompting for critique.
- **Tool call:** Agent action invoking an external function, search service, interpreter, database, or application.

## Teaching questions

1. Draw the ReAct loop and identify where new information can enter the model's context.
2. Why does adding a search tool reduce some hallucinations without guaranteeing factual answers?
3. Give an example of a valid observation that an agent could interpret incorrectly.
4. What should an action contract specify besides the names of available tools?
5. How would you distinguish an agent's reasoning failure from an environment's retrieval failure?
6. Why can a longer trajectory be less reliable even when every individual step looks plausible?
7. In RLEF, why expose public tests but reserve private tests?
8. Construct a program that passes an incomplete test suite while violating the actual specification.
9. Why is an executable test an objective signal but not necessarily a complete signal?
10. What additional infrastructure is required before generated code can be executed safely?
11. How does delayed turn-level feedback complicate credit assignment across generated tokens?
12. Which parts of RLEF would fail when applied to essay writing, and what substitute feedback might be used?
13. Who chooses a constitution, and how should disagreement between principles be resolved?
14. Why does Constitutional AI reduce some labeling costs without removing humans from the system?
15. Give an example where maximizing harmlessness could reduce helpfulness.
16. How would you test whether an AI preference model shares the policy model's blind spot?
17. Compare the corruption risks of search observations, test outcomes, and constitutional preferences.
18. Design a feedback contract for a student coding agent: specify tools, tests, hidden checks, permissions, budgets, logs, and human escalation.
