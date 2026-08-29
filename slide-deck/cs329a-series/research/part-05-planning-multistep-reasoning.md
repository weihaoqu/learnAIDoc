# CS329A Part 5 Evidence Report: Planning and Multi-Step Reasoning

## Source and consumption record

- **Official title:** Stanford CS329A Self-Improving AI Agents | Part 5 | Planning and Multi-Step Reasoning
- **Official video:** https://www.youtube.com/watch?v=Ml_fp9XkB8Y
- **Duration:** 1:14:55 (4,495 seconds)
- **Course session:** Multi-step Reasoning/Planning, Monday, October 6, 2025
- **Official course page:** https://cs329a.stanford.edu/
- **Consumption method:** The complete manually authored English YouTube caption track was read from 00:00 through 1:14:50, then 28 targeted frames were inspected around slide transitions, algorithms, equations, result tables, and caveats. The final five seconds contain no additional teaching claim.
- **Caption provenance:** YouTube manual English captions, track `en-j3PyPqV-e1s`, retrieved with `yt-dlp`. A fresh `--list-subs` check confirmed that Stanford's Part 5 and Part 6 uploads both expose this same CC track identifier; it is not a copied video ID. Manual captions are stronger evidence than auto-captions but are not a verbatim transcript; some audience speech is marked inaudible.
- **Evidence policy:** Timestamps establish what was taught. Primary papers establish paper titles, methods, and reported results. Where a lecture paraphrase is broader than a paper, the paper controls.

## Official readings and lecture coverage

The course page lists five readings for this session. The lecture substantively teaches the first three; ADaPT and AB-MCTS are schedule readings but are not developed in this recording.

| Reading | Primary source | Role in this report |
|---|---|---|
| Synthetic Data Generation & Multi-Step RL for Reasoning & Tool Use (SWiRL) | https://arxiv.org/abs/2504.04736 | Substantively covered, 50:29-74:50 |
| Language Agent Tree Search Unifies Reasoning Acting and Planning in Language Models (LATS) | https://arxiv.org/abs/2310.04406 | Substantively covered, 00:37-23:29 |
| SPRINT: Enabling Interleaved Planning and Parallelized Execution in Reasoning Models | https://arxiv.org/abs/2506.05745 | Substantively covered, 23:29-50:29 |
| ADaPT: As-Needed Decomposition and Planning with Language Models | https://arxiv.org/abs/2311.05772 | Official reading; not substantively covered in the video |
| Wider or Deeper? Scaling LLM Inference-Time Compute with Adaptive Branching Tree Search (AB-MCTS) | https://arxiv.org/abs/2503.04412 | Official reading; not substantively covered in the video |

The course page notes that readings may be updated near the class date. This report records the schedule visible during verification on August 28, 2026.

## Full timestamped outline

This outline intentionally spans the complete recording without unexplained gaps.

| Time | Content consumed | Evidence or teaching significance |
|---|---|---|
| 00:00-00:37 | Opening and agenda | The lecture announces three focal papers: LATS, SPRINT, and SWiRL. |
| 00:37-03:39 | Why multi-step agent tasks are difficult | Reasoning, acting, search, and planning become coupled; early errors propagate through a trajectory. |
| 03:39-07:11 | LATS motivation and Hawaii planning example | Candidate action sequences can be explored as a tree, executed against an environment, scored, and expanded. MCTS provides an exploration/exploitation frame. |
| 07:11-08:16 | LATS intuition | The lecture connects chain-of-thought, tree search, ReAct-style environment interaction, and reflection. |
| 08:16-13:15 | LATS maze walkthrough | Six operations are introduced: selection, expansion, evaluation, simulation, backpropagation, and reflection. |
| 13:15-16:07 | LATS value and selection equations | A language-model judge and self-consistency contribute to value estimates; UCT balances current value against exploration. Returns are propagated upward. |
| 16:07-17:14 | Class discussion and reflection memory | Audience audio is partly inaudible. The observable teaching point is that failed trajectories can yield textual reflections appended to later context. |
| 17:14-19:09 | LATS results | HotPotQA and WebShop examples illustrate gains from more trajectories/test-time compute within the reported evaluation setups. |
| 19:09-20:35 | LATS summary and limitations | The lecture explicitly flags unanalysed compute cost and difficulty with irreversible actions. |
| 20:35-23:29 | LATS discussion | Alternative bandit methods, repeated actions, and the adequacy of a tree representation are discussed. Some audience questions are not fully audible. |
| 23:29-25:57 | SPRINT motivation | Long reasoning traces are sequential even when they contain independent subproblems that could run concurrently. |
| 25:57-27:13 | SPRINT architecture | A planner emits work for multiple executors; planning and parallel execution can alternate over several stages. |
| 27:13-31:03 | SPRINT synthetic-data construction | A reasoning trace is decomposed into steps, labeled as planning or execution, converted to a dependency DAG, and packed into stages before supervised fine-tuning. |
| 31:03-34:05 | SPRINT inference | Tagged execution branches may run concurrently, reducing the sequential critical path even though total generated work need not fall. |
| 34:05-36:30 | SPRINT questions | Replanning remains possible. The base model is still autoregressive; an external runtime interprets tagged branches and synchronizes their outputs. |
| 36:30-39:20 | SPRINT training and reported results | The lecture describes a roughly 6,000-trajectory recipe, filtering for useful parallelism, fine-tuning a 7B model, and benchmark-specific accuracy/sequential-token results. |
| 39:20-41:46 | SPRINT synthesis | Harder tasks can require more rounds of planning. Early stages may fan out, while later stages converge as dependencies accumulate. |
| 41:46-45:12 | Parallelism constraints | Tree width, task structure, synchronization, and stragglers determine whether concurrency produces real latency gains. |
| 45:12-49:46 | Length-dependent tradeoffs and runtime mechanics | Savings are largest for long traces. Short traces can regress after overhead. Discussion clarifies training layout and external execution orchestration. |
| 49:46-50:29 | SPRINT future work | The lecture identifies RL/GRPO, actual wall-clock systems, and tool integration as extensions rather than completed claims. |
| 50:29-53:15 | SWiRL motivation | Online multi-step tool training faces compounding errors and unstable or costly tool calls; single-step preference methods do not directly solve trajectory credit assignment. |
| 53:15-54:34 | SWiRL goals | The agent must choose tools and queries, preserve progress, recover from mistakes, stop appropriately, and generalize without live tools in every RL rollout. |
| 54:34-58:32 | SWiRL stage 1: synthetic trajectories | Tool-use trajectories are generated offline. A model judge labels step/process quality, while outcome filtering evaluates final answers. |
| 58:32-63:21 | SWiRL stage 2: step-wise RL | Training reuses stored environment responses. The judge evaluates a proposed tool action/query in its context, rather than verifying a fresh live tool result. |
| 63:21-66:16 | SWiRL objective and inference loop | The lecture defines state/action structure and shows iterative generation with tool tags and returned observations. |
| 66:16-68:18 | SWiRL setup and filtering comparison | In the reported setup, process-only filtering performs best for the RL stage; outcome-correct demonstrations serve a different role in SFT. |
| 68:18-71:05 | SWiRL transfer and scaling | Tables and curves report cross-task/tool transfer and improvement as the synthetic dataset grows, within the tested models and benchmarks. |
| 71:05-73:47 | Process reward and SFT comparison | The lecture distinguishes learning from judged proposed actions in RL from imitating complete successful trajectories in SFT. |
| 73:47-74:50 | Summary and close | The final captioned slide recaps generalization, transfer, process filtering, and data scaling. |
| 74:50-74:55 | End of recording | No additional captioned teaching claim; the recording ends. |

## Twelve-slide teaching narrative

Each proposed slide is a teaching unit, not a claim that the source deck used the same organization.

| Slide | Teaching title | Core teaching claim | Evidence anchor | Suggested visual |
|---|---|---|---|---|
| 1 | Planning Is Trajectory Choice | In an agent, planning is the repeated choice of actions under observations, uncertainty, and downstream consequences, not merely writing a static list. | Video 00:37-03:39; LATS paper | State-action-observation loop |
| 2 | Three Ways to Improve a Trajectory | LATS spends inference compute on search; SPRINT exposes independent work; SWiRL changes the step policy through synthetic data and RL. | Video 00:05-00:37, 23:29-25:57, 50:29-54:34 | Three-column comparison |
| 3 | LATS: Search Over Agent Behavior | LATS combines MCTS-style selection, expansion, evaluation, simulation, backpropagation, and reflection with environment feedback. | Video 07:11-16:07; https://arxiv.org/abs/2310.04406 | Six-stage search loop |
| 4 | Value Is Estimated, Not Known | LATS uses model-based judgments and self-consistency to guide UCT; these are useful signals but not truth guarantees. | Video 10:00-16:07; LATS paper | UCT equation with verifier warning |
| 5 | Search Has a Feasibility Boundary | More branches help only when actions can be evaluated, the budget is tolerable, and harmful or irreversible actions are controlled. | Video 17:14-23:29; LATS paper | Reversible sandbox vs irreversible action |
| 6 | SPRINT: A Trace Can Hide a DAG | A sequential reasoning trace may contain independent subproblems; dependency structure reveals its critical path. | Video 23:29-29:20; SPRINT paper | Sequence transformed into DAG |
| 7 | Compile Demonstrations Into Parallel Stages | SPRINT uses model-assisted decomposition and dependency labeling to create staged planner/executor training examples. | Video 27:13-31:03; https://arxiv.org/abs/2506.05745 | Trace -> steps -> DAG -> stages |
| 8 | Parallel Execution Needs a Runtime | The model emits tagged plans and branches, while an orchestrator launches independent executions and rejoins their results. | Video 31:03-36:30 | Planner, executors, synchronization barrier |
| 9 | Critical Path Is Not Total Work | SPRINT targets sequential tokens/latency. Total generated work, scheduling overhead, and stragglers can still rise, especially on short tasks. | Video 33:00-33:50, 41:46-49:46; SPRINT paper | Critical path versus aggregate work |
| 10 | SWiRL: Learn at the Step Level | SWiRL builds offline tool trajectories, judges intermediate actions, and applies step-wise RL without making every rollout depend on a live tool. | Video 50:29-63:21; https://arxiv.org/abs/2504.04736 | Two-stage data and RL pipeline |
| 11 | Process and Outcome Signals Differ | A correct final answer does not prove every step was sound, while a plausible step does not prove the live tool will succeed; the verifier defines what is learned. | Video 54:34-63:21, 66:16-73:47; SWiRL paper | Process/outcome 2x2 matrix |
| 12 | Choose the Bottleneck | Use search for uncertain choices, parallelization for independent dependencies, and step-wise training when the policy itself needs improvement. All three depend on evaluators and operational constraints. | Video 19:09-20:35, 41:46-50:29, 71:05-74:50 | Diagnostic decision tree |

## Claim-evidence ledger

| ID | Calibrated claim | Video evidence | Primary evidence | Confidence and boundary |
|---|---|---|---|---|
| P5-C01 | Multi-step agent tasks couple reasoning, action, feedback, and planning, so local errors can alter later states. | 00:37-03:39 | https://arxiv.org/abs/2310.04406 | High for lecture framing; conceptual, not a measured universal law. |
| P5-C02 | LATS integrates language-model reasoning with MCTS, environment feedback, and self-reflection. | 03:39-16:07 | https://arxiv.org/abs/2310.04406 | High; central paper method. |
| P5-C03 | LATS selection uses a UCT-style exploration/exploitation score and model-derived value estimates. | 10:00-16:07 | https://arxiv.org/abs/2310.04406 | High for method; estimated value can be miscalibrated. |
| P5-C04 | The lecture reports that additional LATS trajectories/test-time compute improve results in selected HotPotQA and WebShop setups. | 17:14-19:09 | https://arxiv.org/abs/2310.04406 | Medium outside those setups; not a claim of monotonic gains on every task. |
| P5-C05 | LATS can be expensive and is problematic when exploratory actions are irreversible. | 19:09-20:35 | https://arxiv.org/abs/2310.04406 | High as an explicit limitation. |
| P5-C06 | SPRINT represents decomposed reasoning as a dependency graph and trains interleaved planning with parallel execution. | 25:57-31:03 | https://arxiv.org/abs/2506.05745 | High; central paper method. |
| P5-C07 | SPRINT can reduce the sequential critical path without reducing total generated work. | 31:03-34:05, 41:46-49:46 | https://arxiv.org/abs/2506.05745 | High for distinction; actual latency requires a concurrent runtime. |
| P5-C08 | The SPRINT paper reports up to 39% fewer sequential tokens for long math problems and larger OOD token reductions on selected GPQA/Countdown evaluations while matching its fine-tuned baseline's accuracy. | 36:30-39:20 | https://arxiv.org/abs/2506.05745 | High as a reported, benchmark-specific result; not a universal speedup. |
| P5-C09 | SPRINT's advantage depends on available parallel width, dependency structure, scheduling overhead, and stragglers; short tasks may regress. | 39:20-49:46 | https://arxiv.org/abs/2506.05745 | High for lecture analysis; exact systems impact remains implementation-dependent. |
| P5-C10 | SWiRL creates synthetic multi-step tool-use data, filters trajectories, and applies step-wise RL. | 50:29-63:21 | https://arxiv.org/abs/2504.04736 | High; central paper method. |
| P5-C11 | SWiRL can train against stored environment responses instead of invoking a live tool for every RL step. | 58:32-63:21 | https://arxiv.org/abs/2504.04736 | High for method; this introduces an offline-distribution caveat. |
| P5-C12 | In the reported SWiRL experiments, process-only filtering was the strongest filtering choice for RL, while SFT benefited from successful complete demonstrations. | 66:16-73:47 | https://arxiv.org/abs/2504.04736 | Medium to high within the paper setup; the process label is itself model-judged. |
| P5-C13 | SWiRL reports transfer across selected tasks/tools and gains with more synthetic data. | 68:18-71:05 | https://arxiv.org/abs/2504.04736 | High as a paper result, low as evidence of universal transfer. |
| P5-C14 | The ADaPT primary abstract says the method recursively decomposes a subtask when the executor cannot handle it directly. | Not taught substantively | https://arxiv.org/abs/2311.05772 | High from the paper abstract; included only to characterize an official reading. |
| P5-C15 | The Wider or Deeper primary abstract names its method Adaptive Branching Monte Carlo Tree Search (AB-MCTS) and says it chooses wider expansion or deeper refinement using external feedback in coding/engineering tasks. | Not taught substantively | https://arxiv.org/abs/2503.04412 | High from the paper abstract; the acronym and method summary come from the paper, not the schedule title. |

## Caveats and unresolved questions

1. **Caption fidelity:** Manual captions are not guaranteed verbatim. Several audience questions between 16:07-17:14 and 20:35-23:29 are partly inaudible, so the report relies only on the instructor's audible response and visible slides there.
2. **Schedule is wider than the video:** ADaPT and AB-MCTS appear on the official reading list but are not substantively taught in Part 5. They should not be presented as lecture-covered methods.
3. **Search cost:** LATS spends multiple model calls on expansion, evaluation, simulation, and reflection. The lecture explicitly says the cost-benefit was not thoroughly analysed.
4. **Action reversibility:** Tree search presumes that candidate actions can be evaluated without unacceptable consequences. Purchases, messages, deletions, and physical actions may require a simulator, approval gate, or rollback mechanism.
5. **Evaluator dependence:** LATS and SWiRL use model-derived judgments. A model judge may reward persuasiveness, formatting, or familiar patterns instead of correctness.
6. **Parallelism metric:** SPRINT's sequential-token metric estimates a critical path. It is not identical to wall-clock latency, total tokens, total compute, energy use, or dollar cost.
7. **Synthetic dependency labels:** SPRINT's staged data depends on another model decomposing traces and identifying dependencies. Annotation errors can teach invalid concurrency.
8. **Task-dependent speedup:** Narrow graphs, synchronization barriers, executor imbalance, and short traces can erase or reverse parallel benefits.
9. **Offline tool feedback:** SWiRL stabilizes training by reusing stored responses, but those responses may become stale or differ from the policy's current state distribution.
10. **Action judgment versus execution:** Judging a proposed query does not prove that a live tool will accept it, return useful data, or avoid side effects.
11. **Reported results are scoped:** Benchmark improvements are observations under particular models, prompts, tools, judges, and budgets. They do not establish a general hierarchy among LATS, SPRINT, and SWiRL.
12. **Open design question:** The lecture does not provide one objective that jointly prices search quality, latency, total compute, tool risk, and verifier error. A production system must make those tradeoffs explicit.

## Visual cue index

These are the inspected frames most useful for building a later deck. Times are rounded to the nearest useful frame.

| Time | Visible cue | Teaching use |
|---|---|---|
| 00:30 | LATS title slide | Section divider and paper identity |
| 03:45 | Hawaii action tree and search idea | Concrete tree-search motivation |
| 07:15 | CoT, tree search, ReAct, and feedback synthesis | LATS mental model |
| 08:15 | Six LATS operations | Algorithm overview |
| 10:00 | Maze state evaluation with LM score and self-consistency | Value-estimation example |
| 14:00 | Value, UCT, and backpropagation equations | Technical mechanism |
| 17:15 | HotPotQA result table and setup | Result with evaluation-scope warning |
| 19:10 | LATS summary and limitations | Compute and irreversibility caveats |
| 23:30 | SPRINT title slide | Section divider |
| 25:00 | Reasoning accuracy and response-length trend | Motivation for long-trace optimization |
| 26:05 | Planner/executor framework | SPRINT architecture |
| 27:45 | Trace decomposition with GPT-4o | Synthetic-data step |
| 29:20 | Trace -> steps -> DAG -> packed stages -> SFT | Full SPRINT training pipeline |
| 33:00 | Overlapping execution branches and critical path | Sequential versus parallel work |
| 36:35 | Training recipe and accuracy/sequential-token results | Model-specific reported evidence |
| 38:20 | OOD results table | Transfer claim with benchmark boundary |
| 41:00 | Early width followed by convergence | Dependency-shape insight |
| 45:30 | Relative savings by sequence length | Short-task regression caveat |
| 50:30 | SWiRL title slide | Section divider |
| 54:40 | Stage 1 synthetic collection and process/outcome labels | Data pipeline |
| 58:45 | Stage 2 step-wise RL with stored environment response | Offline RL mechanism |
| 63:20 | State/action objective equation | Technical definition |
| 67:10 | Filtering comparison bar chart | Process-versus-outcome result |
| 68:20 | Generalization table | Cross-task/tool evidence |
| 70:10 | Dataset-scaling curves | Scaling observation |
| 71:10 | Process-correctness table | Verifier-dependent evidence |
| 73:50 | SWiRL summary slide | Closing synthesis |

## Glossary

| Term | Working definition for this lecture |
|---|---|
| Agent trajectory | A sequence of model decisions, actions, environment observations, and later decisions. |
| Planning | Selecting or revising actions with regard to future states and goals. |
| MCTS | Monte Carlo Tree Search, a family of methods that allocates search among branches using selection, expansion, rollout/evaluation, and return propagation. |
| UCT | Upper Confidence bounds applied to Trees; a score balancing estimated value and exploration. |
| Self-consistency | Estimating confidence from agreement among multiple sampled solutions or outcomes. |
| Reflection | Textual feedback derived from a failed or weak trajectory and placed in later context. |
| Dependency DAG | A directed acyclic graph whose edges encode which reasoning or execution steps require earlier results. |
| Critical path | The longest dependency-constrained chain; it limits ideal parallel completion time. |
| Planner | The component or generation mode that decomposes a goal and identifies work to perform. |
| Executor | A component or generation branch that carries out a planned subtask. |
| Process supervision | Feedback about intermediate steps or actions rather than only the final answer. |
| Outcome supervision | Feedback based on the final result, regardless of how it was reached. |
| Offline environment response | A previously recorded tool or environment observation reused during training. |
| Compounding error | A mistake that changes later context or state, increasing the chance of further mistakes. |
| Verifier | A rule, environment signal, model judge, or human assessment used to score behavior. |

## Teaching questions

### Check understanding

1. What are the six operations in the LATS loop, and which of them require model calls?
2. Why is a language-model value estimate not equivalent to knowing whether a branch is correct?
3. What information must be present before two reasoning steps can safely execute in parallel?
4. What is the difference between reducing sequential tokens and reducing total tokens?
5. In SWiRL, what exactly does the process judge score during step-wise RL?

### Apply the ideas

6. A research agent must search papers, extract methods, and compare results. Draw a dependency DAG and identify the critical path.
7. For an agent that may send email, which actions can be searched in a sandbox and which require human approval? Explain the boundary.
8. Design one process verifier and one outcome verifier for a web-research agent. What failure can each verifier miss?
9. Given a short two-step task, estimate when SPRINT-style orchestration overhead would exceed its parallel benefit.

### Challenge the methods

10. If the same model generates an action and judges that action, what correlated errors can arise? Propose an independent check.
11. Does stronger majority performance from more LATS branches demonstrate a new capability, or only better elicitation of existing behavior? What experiment would distinguish them?
12. SWiRL trains with stored tool responses. How would you detect that deployment behavior has drifted beyond the offline data distribution?
13. When would ADaPT's as-needed decomposition be preferable to always decomposing a task?
14. Build a decision rule for choosing LATS, SPRINT, SWiRL, or no added mechanism. Include quality, latency, compute, reversibility, and verifier reliability.

## Primary references

- Stanford CS329A course and schedule: https://cs329a.stanford.edu/
- Official Part 5 recording: https://www.youtube.com/watch?v=Ml_fp9XkB8Y
- Zhou et al., *Language Agent Tree Search Unifies Reasoning Acting and Planning in Language Models*: https://arxiv.org/abs/2310.04406
- Biju et al., *SPRINT: Enabling Interleaved Planning and Parallelized Execution in Reasoning Models*: https://arxiv.org/abs/2506.05745
- Goldie et al., *Synthetic Data Generation & Multi-Step RL for Reasoning & Tool Use*: https://arxiv.org/abs/2504.04736
- Prasad et al., *ADaPT: As-Needed Decomposition and Planning with Language Models*: https://arxiv.org/abs/2311.05772
- Inoue et al., *Wider or Deeper? Scaling LLM Inference-Time Compute with Adaptive Branching Tree Search*: https://arxiv.org/abs/2503.04412
