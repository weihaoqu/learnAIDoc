---
title: "Stanford CS329A Part 5 — Planning and Multi-Step Reasoning"
date: 2026-08-29
category: Learning Resources
tags: [cs329a, ai-agents, planning, multi-step-reasoning, lats, sprint, swirl, tool-use]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 4 — Learning from Feedback with Tools and Code", "Stanford CS329A Part 6 — Train-Time Scaling and Scaling RL", "CS329A Agent-System Literacy — The Next Layer of AI Education", "Harness / Loop / Graph Engineering — Environment, Feedback, Flow"]
icon: "🧭"
image: "/assets/images/cs329a-part-05-planning-multistep-reasoning.png"
---

Planning in an AI agent is not just writing a list before work begins. The agent chooses an action, observes what happened, and changes its next choice. Stanford CS329A Part 5 is useful because it separates three different engineering problems that are often collapsed into one word: searching over trajectories, exposing dependency-safe parallel work, and learning a better next-action policy.

This page is a teaching companion to the complete 1:14:55 lecture session from October 6, 2025. The front-matter date is this wiki entry's publication date. The page combines the full manual-caption transcript, 28 inspected visual cues, and the primary papers. This page and its companion deck focus on the three methods substantively covered in the recording: LATS, SPRINT, and SWiRL. ADaPT and Wider or Deeper / AB-MCTS are listed separately as official readings that the video does not develop.

*Primary sources: [official course site](https://cs329a.stanford.edu/) | [Part 5 video](https://www.youtube.com/watch?v=Ml_fp9XkB8Y) | [LATS](https://arxiv.org/abs/2310.04406) | [SPRINT](https://arxiv.org/abs/2506.05745) | [SWiRL](https://arxiv.org/abs/2504.04736)*

## Download the Slides

| Format | Link | Note |
|---|---|---|
| PDF | [cs329a-part-05-planning-multistep-reasoning.pdf](/learnAIDoc/assets/decks/cs329a-part-05-planning-multistep-reasoning/cs329a-part-05-planning-multistep-reasoning.pdf) | Best for reading and classroom sharing. |
| PPTX | [cs329a-part-05-planning-multistep-reasoning.pptx](/learnAIDoc/assets/decks/cs329a-part-05-planning-multistep-reasoning/cs329a-part-05-planning-multistep-reasoning.pptx) | Image-based slides with prompt and speaker-note provenance. |
| Contact sheet | [view all 12 slides](/learnAIDoc/assets/decks/cs329a-part-05-planning-multistep-reasoning/contact-sheet.png) | Quick visual overview. |

![CS329A Part 5 slide contact sheet](/learnAIDoc/assets/decks/cs329a-part-05-planning-multistep-reasoning/contact-sheet.png)

## The Core Idea

An agent trajectory is a feedback loop:

```text
goal + current state
         |
         v
 choose next action
         |
         v
 environment response
         |
         v
 update state and plan
         |
         +----------> repeat until stop
```

Part 5 provides three levers for improving that loop:

| Lever | Bottleneck | What changes | Load-bearing requirement |
|---|---|---|---|
| LATS | Uncertainty about which trajectory to follow | Inference-time search allocation | A usable value signal, bounded budget, safe exploration |
| SPRINT | Independent work hidden inside a sequence | Dependency representation and runtime schedule | Correct dependency edges and an orchestrator |
| SWiRL | Weak policy for choosing each next action | Model parameters through step-wise RL | Reliable process feedback and representative observations |

These methods can be combined, but they do not solve the same problem.

## 1. Planning Means Choosing Under Feedback

A checklist says what should happen in advance. A trajectory records how action and observation change the next decision.

```text
checklist:   A -> B -> C -> D

trajectory: A -> observation
                  |
                  +-> B or repair or stop
```

This difference matters because multi-step agents change the environment. An early tool error, missing result, or unsafe action can alter every later state.

The engineering question is therefore not only, “Can the model produce a plan?” It is, “How does the system choose and revise actions after evidence arrives?”

## 2. LATS Searches Over Agent Behavior

[Language Agent Tree Search](https://arxiv.org/abs/2310.04406) combines language-model reasoning, environment feedback, self-reflection, and an MCTS-style search loop.

The lecture presents a search loop and highlights reflection as an additional LATS mechanism:

```text
selection -> expansion -> evaluation -> simulation
    ^                                      |
    |                                      v
    +---------- backpropagation <----------+

failed or weak trajectory -> textual reflection -> later context
```

| Operation | Role |
|---|---|
| Selection | Choose a branch to spend more compute on. |
| Expansion | Generate candidate next actions. |
| Evaluation | Estimate the promise of a new state or branch. |
| Simulation | Continue a candidate trajectory toward an outcome. |
| Backpropagation | Send the observed return back to earlier nodes. |
| Reflection | Convert a failed or weak attempt into textual context for a later attempt; it is not assumed to run after every backpropagation. |

The tree is not only a reasoning tree. Actions produce environment observations, so a branch represents agent behavior.

## 3. Value Is Estimated, Not Known

LATS uses a UCT-style rule to balance exploitation and exploration. The score may depend on language-model judgment and self-consistency.

```text
LM judgment --------+
                    |
self-consistency ---+--> estimated branch value --> UCT routing

estimated branch value != correctness guarantee
```

This boundary is critical. UCT can allocate search coherently around a bad estimate. If the judge rewards fluent mistakes, or many samples share one misconception, search can repeatedly expand the wrong region.

Self-consistency measures agreement among samples. It does not establish truth.

## 4. Search Has a Feasibility Boundary

The lecture explicitly identifies compute cost and irreversible actions as limitations.

| Action type | Can speculative search execute it directly? | Safer control |
|---|---|---|
| Maze move in a simulator | Usually | Reset or branch the simulator state. |
| Read-only database query | Sometimes | Rate limit, audit, and sanitize output. |
| Send email | No by default | Draft in a sandbox; require approval to send. |
| Purchase item | No by default | Simulate cart changes; approve payment. |
| Delete or overwrite data | No by default | Snapshot, stage, or require rollback-capable approval. |
| Physical robot action | Only under strict controls | Simulation, safety envelope, and human override. |

Tree search assumes that alternative actions can be evaluated. Real-world side effects make that assumption an engineering and governance problem.

## 5. SPRINT Finds a Dependency Graph Inside a Trace

[SPRINT](https://arxiv.org/abs/2506.05745) starts from a simple observation: a reasoning trace is written in token order, but token order is not always dependency order.

```text
linear trace

S1 -> S2 -> S3 -> S4 -> S5 -> S6

dependency structure

       +-> S2 -> S4 -+
S1 ----|             +-> S6
       +-> S3 -> S5 -+
```

The two middle branches can execute concurrently if neither depends on the other. The longest dependency-constrained chain is the **critical path**.

Dependency labeling is load-bearing. A false claim of independence can launch an action before its required evidence exists.

## 6. SPRINT Compiles Demonstrations Into Stages

The training-data pipeline transforms a sequential demonstration:

```text
trace
  -> decompose into steps
  -> label planning versus execution
  -> infer dependency DAG
  -> pack independent work into stages
  -> supervised fine-tuning
```

This is best understood as a compiler from one representation of reasoning to another. The model is taught to emit plans and groups of independent execution work rather than one undifferentiated chain.

The dependency inference step may use another model. Its errors become training errors.

## 7. Parallel Execution Needs a Runtime

The base language model remains autoregressive. Parallelism appears because an external runtime interprets the model's output.

```text
planner emits tagged branches
          |
          +-> executor A --+
          +-> executor B --+-> synchronization barrier
          +-> executor C --+          |
                                      v
                               merged result
                                      |
                                      +-> replan
```

The runtime must own:

- launch and cancellation;
- timeouts and retries;
- dependency barriers;
- executor failure;
- result merging;
- context returned for replanning.

The method is therefore not only a prompt or a fine-tuned model. It is a model-runtime contract.

## 8. Critical Path Is Not Total Work

SPRINT reports reductions in **sequential tokens** for selected long reasoning problems. That metric approximates the critical path. It is not automatically equivalent to lower total tokens or measured latency.

| Quantity | Meaning | Can parallelism reduce it? |
|---|---|---|
| Sequential depth | Longest dependency chain | Yes, when independent width exists. |
| Total generated tokens | Sum across all branches | Not necessarily. |
| Wall-clock latency | Measured elapsed time | Only after runtime overhead and stragglers. |
| Dollar or energy cost | Aggregate resource use | May stay flat or increase. |

The paper reports up to 39% fewer sequential tokens for long math problems in its setup and larger sequential-token reductions on selected out-of-distribution GPQA and Countdown evaluations. These are benchmark- and system-specific results, not a universal speed guarantee.

Short tasks may become slower because orchestration overhead exceeds the saved critical path.

## 9. SWiRL Learns at the Step Level

[Synthetic Data Generation & Multi-Step RL for Reasoning & Tool Use](https://arxiv.org/abs/2504.04736), referred to as SWiRL in the course, addresses weak intermediate tool decisions.

Its two stages are:

```text
Stage 1: offline collection
  synthetic tool trajectories
      -> process and outcome labels
      -> filtered training data

Stage 2: step-wise RL
  state + stored observation
      -> proposed next action/query
      -> process judgment
      -> policy update
```

The model does not need to call a live tool during every RL rollout. Stored responses stabilize training and control cost.

The tradeoff is distribution shift. The current policy or deployment tool may reach states not represented in the stored observations.

## 10. Process and Outcome Signals Fail Differently

Process feedback asks whether an intermediate action appears sound. Outcome feedback asks whether the final result is correct.

| Process signal | Outcome signal | Interpretation |
|---|---|---|
| Sound | Correct | Stronger evidence, still limited by the evaluator. |
| Weak or wrong | Correct | Lucky outcome or hidden bad reasoning. |
| Sound | Wrong | A later step failed or the process signal was incomplete. |
| Plausible | Live tool fails | Process false positive: the proposed action was not executable or safe. |

In the reported SWiRL setup, process-only filtering was the strongest filtering choice for the RL stage, while successful complete demonstrations played a different role in supervised fine-tuning. The process labels were themselves model-judged, so this result depends on that judge, the tasks, and the data pipeline.

## 11. Choose the Bottleneck Before the Method

Use this diagnostic:

```text
uncertain trajectory?
  -> search, if evaluation and reversibility are adequate

independent subproblems?
  -> parallelize, if dependencies and runtime are reliable

weak next-action policy?
  -> step-wise learning, if process feedback is trustworthy

unsafe actions or weak verifier?
  -> no added autonomy yet
```

“No added autonomy yet” is not a failure. It is the correct engineering choice when the system cannot evaluate candidate behavior or reverse harmful actions.

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---|---|
| 1 | Planning is trajectory choice under feedback. |
| 2 | Three levers address three different bottlenecks. |
| 3 | LATS searches over agent behavior. |
| 4 | Value is estimated, not known. |
| 5 | Search stops at cost, safety, and reversibility. |
| 6 | A sequential trace can hide a dependency DAG. |
| 7 | SPRINT compiles demonstrations into parallel stages. |
| 8 | Parallel execution needs an orchestrator. |
| 9 | Critical path is not total work. |
| 10 | SWiRL learns at the step level. |
| 11 | Process and outcome signals fail differently. |
| 12 | Choose the bottleneck before the method. |

## Teaching Questions

1. What changes between a checklist and an agent trajectory?
2. Which LATS operations require a model, and which require an environment?
3. Why can UCT allocate search well while the final choice remains wrong?
4. What makes an action unsuitable for speculative search?
5. Why is token order different from dependency order?
6. Which component creates concurrency in SPRINT?
7. What does a sequential-token reduction fail to measure?
8. What does the SWiRL process judge score during step-wise RL?
9. Give one outcome false positive and one process false positive.
10. When is “no added autonomy” the strongest design decision?

## Homework: Audit a University Research Agent

Choose a task such as creating a literature comparison, checking student code, or assembling evidence for a course policy.

Produce the following:

| Deliverable | Required content |
|---|---|
| Trajectory | States, actions, observations, and stopping condition |
| Search point | One uncertain decision and its candidate evaluator |
| Dependency DAG | Independent work, joins, and critical path |
| Process signal | What intermediate behavior it certifies and misses |
| Outcome signal | What final behavior it certifies and misses |
| Safety boundary | Irreversible, private, or approval-gated actions |
| Method decision | LATS-style search, SPRINT-style staging, SWiRL-style learning, a combination, or none |

Defend the decision using expected quality, total work, latency, evaluator reliability, and reversibility. State what evidence would cause you to reverse it.

## Official Reading Set

### Substantively taught in the recording and deck

1. Andy Zhou et al., [Language Agent Tree Search Unifies Reasoning Acting and Planning in Language Models](https://arxiv.org/abs/2310.04406), arXiv:2310.04406.
2. Emil Biju et al., [SPRINT: Enabling Interleaved Planning and Parallelized Execution in Reasoning Models](https://arxiv.org/abs/2506.05745), arXiv:2506.05745.
3. Anna Goldie et al., [Synthetic Data Generation & Multi-Step RL for Reasoning & Tool Use](https://arxiv.org/abs/2504.04736), arXiv:2504.04736.

### Official assigned readings not substantively taught in this recording

4. Archiki Prasad et al., [ADaPT: As-Needed Decomposition and Planning with Language Models](https://arxiv.org/abs/2311.05772), arXiv:2311.05772.
5. Yuichi Inoue et al., [Wider or Deeper? Scaling LLM Inference-Time Compute with Adaptive Branching Tree Search](https://arxiv.org/abs/2503.04412), arXiv:2503.04412.

ADaPT and Wider or Deeper provide useful surrounding context. They are not presented here as methods taught by this video or explained by the 12-slide deck.

## Source Versus Teaching Synthesis

Directly sourced from the lecture and the three taught papers:

- the LATS search loop, UCT-style allocation, reflection, and limitations;
- SPRINT trace decomposition, dependency staging, orchestrated execution, and reported sequential-token results;
- SWiRL offline trajectory collection, process/outcome filtering, step-wise RL, transfer, and scaling observations.

Teaching synthesis in this page:

- the three-lever comparison;
- the phrase “planning is choosing a trajectory, not writing a list”;
- the bottleneck diagnostic;
- university classroom and research examples;
- the homework and “no added autonomy yet” decision branch.

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 4 — Learning from Feedback with Tools and Code](/learnAIDoc/wiki/cs329a-part-04-learning-feedback-tools-code/)
- [Stanford CS329A Part 6 — Train-Time Scaling and Scaling RL](/learnAIDoc/wiki/cs329a-part-06-train-time-scaling-rl/)
- [CS329A Agent-System Literacy — The Next Layer of AI Education](/learnAIDoc/wiki/cs329a-agent-system-literacy/)
- [Harness / Loop / Graph Engineering — Environment, Feedback, Flow](/learnAIDoc/wiki/harness-loop-graph-engineering/)
- [Stanford CS329A Part 2 — Test-Time Compute Scaling](/learnAIDoc/wiki/cs329a-part-02-test-time-compute-scaling/)
