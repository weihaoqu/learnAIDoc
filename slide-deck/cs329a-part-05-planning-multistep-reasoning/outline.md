# Slide Deck Outline

**Topic**: Stanford CS329A Part 5 - Planning and Multi-Step Reasoning
**Style**: intuition-machine
**Dimensions**: paper + cool technical + geometric + balanced
**Audience**: learners
**Language**: English
**Slide Count**: 12 slides
**Generated**: 2026-08-29

---

<STYLE_INSTRUCTIONS>
Design Aesthetic: Academic technical briefing on aged paper, matching the structural discipline of the Part 2 deck while using original trajectory, tree, DAG, runtime, and training diagrams. Every slide presents one causal relationship and places its evidence boundary beside the diagram.

Background:
  Texture: subtle warm paper grain with a faint engineering grid
  Base Color: Aged Cream (#F5F0E6)

Typography:
  Headlines: bold geometric sans-serif with stable line lengths
  Body: clean sans-serif at presentation-readable sizes
  Data labels: monospace for states, actions, stages, and evidence tags

Color Palette:
  Primary Text: Near Black (#171717)
  Background: Aged Cream (#F5F0E6)
  Search / Generation: Cobalt (#2563EB)
  Verified / Dependency-Safe Flow: Teal (#2F7373)
  Runtime / Budget: Warm Brown (#8B7355)
  Constraints / Risk: Maroon (#722F37) and Red (#B42318)
  Success: Green (#16803C)

Visual Elements:
  - original state loops, search trees, dependency DAGs, orchestration barriers, and learning pipelines
  - timestamp and primary-paper evidence tags
  - visible “estimate”, “assumption”, and “caveat” boundaries
  - faint technical grid with no decorative imagery

Density Guidelines:
  - one teachable claim per slide
  - two to four support labels
  - one dominant diagram or comparison
  - no logos, slide numbers, or copied lecture imagery

Style Rules:
  Do: use narrative headlines, exact mechanism names, visible dependencies, and operational constraints.
  Don't: call heuristic values truth, equate critical path with total work, or present offline tool feedback as live execution proof.
</STYLE_INSTRUCTIONS>

---

## Slide 1 of 12
**Type**: Cover
**Filename**: 01-slide-cover.png
**Headline**: Planning Is Choosing a Trajectory, Not Writing a List
**Sub-headline**: Stanford CS329A Part 5 - search, dependency-aware execution, and step-wise learning
**Visual**: A state-action-observation loop crosses a sequence of consequences toward a goal.
**Evidence**: Lecture 00:37-03:39; LATS, arXiv:2310.04406

---

## Slide 2 of 12
**Type**: Content
**Filename**: 02-slide-three-levers.png
**Headline**: Three Levers Improve Three Different Bottlenecks
**Body**: LATS searches uncertain trajectories; SPRINT exposes independent work; SWiRL changes the next-action policy.
**Visual**: One trajectory passes through three intervention layers.
**Evidence**: Lecture 00:05-00:37, 23:29-25:57, 50:29-54:34

---

## Slide 3 of 12
**Type**: Content
**Filename**: 03-slide-lats-loop.png
**Headline**: LATS Searches Over Agent Behavior
**Body**: Selection, expansion, evaluation, simulation, backpropagation, and reflection combine search with environment feedback.
**Visual**: Six-stage loop wrapped around a branching trajectory tree.
**Evidence**: Lecture 07:11-16:07; LATS, arXiv:2310.04406

---

## Slide 4 of 12
**Type**: Content
**Filename**: 04-slide-value-estimate.png
**Headline**: Value Is Estimated, Not Known
**Body**: UCT allocates search using heuristic branch values. LM judgment and self-consistency are signals, not correctness guarantees.
**Visual**: A UCT router fed by two gauges behind a visible “HEURISTIC ONLY” boundary.
**Evidence**: Lecture 10:00-16:07; LATS, arXiv:2310.04406

---

## Slide 5 of 12
**Type**: Content
**Filename**: 05-slide-search-boundary.png
**Headline**: Search Stops at Cost, Safety, and Reversibility
**Body**: Branching is useful only when candidates can be evaluated under a bounded budget without causing unacceptable side effects.
**Visual**: Reversible sandbox branch beside an approval-gated irreversible action.
**Evidence**: Lecture 17:14-23:29; LATS, arXiv:2310.04406

---

## Slide 6 of 12
**Type**: Content
**Filename**: 06-slide-trace-dag.png
**Headline**: A Sequential Trace Can Hide a Dependency DAG
**Body**: Independent subproblems can execute concurrently once their true dependencies are explicit.
**Visual**: A six-step chain unfolds into two parallel branches and a join.
**Evidence**: Lecture 23:29-29:20; SPRINT, arXiv:2506.05745

---

## Slide 7 of 12
**Type**: Content
**Filename**: 07-slide-sprint-compiler.png
**Headline**: SPRINT Compiles Demonstrations Into Parallel Stages
**Body**: Trace decomposition, plan/execution labeling, dependency inference, stage packing, and SFT create staged behavior.
**Visual**: Five-step compiler pipeline with a warning at dependency inference.
**Evidence**: Lecture 27:13-31:03; SPRINT, arXiv:2506.05745

---

## Slide 8 of 12
**Type**: Content
**Filename**: 08-slide-orchestrator.png
**Headline**: Parallel Execution Needs an Orchestrator
**Body**: The model emits tagged branches; an external runtime launches executors, waits at barriers, and returns merged results for replanning.
**Visual**: Planner, three executors, synchronization barrier, and feedback loop.
**Evidence**: Lecture 31:03-36:30; SPRINT, arXiv:2506.05745

---

## Slide 9 of 12
**Type**: Content
**Filename**: 09-slide-critical-path.png
**Headline**: Critical Path Is Not Total Work
**Body**: Parallel stages can shorten sequential depth while total tokens, scheduling overhead, stragglers, and short-task latency remain.
**Visual**: Same work blocks shown as aggregate work and highlighted critical chain.
**Evidence**: Lecture 33:00-49:46; SPRINT, arXiv:2506.05745

---

## Slide 10 of 12
**Type**: Content
**Filename**: 10-slide-swirl-loop.png
**Headline**: SWiRL Learns at the Step Level
**Body**: Offline synthetic tool trajectories feed process labeling and step-wise RL without a live tool call in every rollout.
**Visual**: Two-stage collection and learning loop with stored observations.
**Evidence**: Lecture 50:29-63:21; SWiRL, arXiv:2504.04736

---

## Slide 11 of 12
**Type**: Content
**Filename**: 11-slide-signal-matrix.png
**Headline**: Process and Outcome Signals Fail Differently
**Body**: A correct outcome can hide bad steps; a plausible step can still fail in the live environment.
**Visual**: Process/outcome 2x2 matrix with two distinct false-positive cells.
**Evidence**: Lecture 54:34-63:21, 66:16-73:47; SWiRL, arXiv:2504.04736

---

## Slide 12 of 12
**Type**: Back Cover
**Filename**: 12-slide-bottleneck-diagnostic.png
**Headline**: Choose the Bottleneck Before You Choose the Method
**Body**: Diagnose uncertainty, dependency width, policy weakness, evaluator quality, and reversibility.
**Visual**: A diagnostic router with search, parallelism, policy learning, and “no added autonomy” exits.
**Evidence**: Whole-lecture teaching synthesis grounded in LATS, SPRINT, and SWiRL
