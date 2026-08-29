# Teaching Guide: CS329A Part 5 - Planning and Multi-Step Reasoning

Use this guide with the 12-slide deck. The learning goal is to stop treating “planning” as one generic agent feature. Learners should be able to diagnose whether a system needs better search, better dependency scheduling, a better learned policy, or stronger safety and verification before any added autonomy.

## Slide 1: A Plan Is a Trajectory

An agent acts, observes what happened, and updates its next choice. A useful plan therefore includes feedback and downstream consequences, not just an initial list of steps.

**Checkpoint:** What changes between a checklist and a trajectory after the first tool call fails?

## Slide 2: Three Intervention Layers

LATS, SPRINT, and SWiRL do not compete on one axis:

- LATS spends inference compute choosing among trajectories.
- SPRINT changes the execution schedule of independent work.
- SWiRL changes the learned policy for selecting intermediate actions.

The same system could use more than one, but each adds a different evaluator and operational burden.

## Slide 3: The LATS Loop

Walk through selection, expansion, evaluation, simulation, backpropagation, and reflection. Environment observations ground the trajectory, while reflection carries information from failures into later attempts.

**Challenge:** Which operations require model calls, and which require an executable environment?

## Slide 4: UCT Cannot Repair a Bad Judge

UCT trades exploitation against exploration. Its branch values still come from heuristic signals such as an LM judge and self-consistency. UCT can allocate search coherently around a miscalibrated estimate; it does not convert that estimate into truth.

**Checkpoint:** If five samples agree on the same misconception, what does self-consistency measure?

## Slide 5: Search Has an Operational Boundary

A maze move can be simulated. Sending an email, buying an item, deleting a file, or moving a robot can have irreversible consequences. Production search needs sandboxes, approval gates, rollback, or a policy that forbids speculative execution.

## Slide 6: Find the Hidden DAG

A reasoning trace is written in token order, but token order is not always dependency order. Two evidence searches may be independent even if the model describes them one after another.

**Exercise:** Draw the dependency DAG for “find three papers, extract each method, then compare them.”

## Slide 7: SPRINT as a Compiler

The synthetic-data pipeline transforms demonstrations rather than merely collecting more of them. It decomposes traces, labels planning/execution, infers dependencies, packs independent work into stages, and fine-tunes the model on that staged representation.

The dependency annotation is load-bearing. A false independence label can create an invalid schedule.

## Slide 8: The Runtime Is Part of the Method

The language model remains autoregressive. Concurrency appears because an external orchestrator interprets tags, launches executors, joins results, and returns merged context for another planning stage.

**Checkpoint:** Which component owns retries, timeouts, and executor failure?

## Slide 9: Measure the Right Quantity

Sequential tokens approximate a critical path. They are not total tokens or measured latency by definition. Runtime overhead, narrow graphs, synchronization, and stragglers can erase gains; short tasks can regress.

## Slide 10: SWiRL's Two Stages

Stage 1 creates and filters offline tool-use trajectories. Stage 2 proposes the next tool action in context, scores that step, and updates the policy while reusing stored environment observations.

This avoids unstable live calls during every rollout but can train on stale or off-policy states.

## Slide 11: Two Kinds of False Confidence

Outcome-only feedback can accept a lucky answer reached by bad steps. Process-only feedback can approve a plausible query that a live tool rejects or that causes a side effect. A strong system needs to know what each signal actually certifies.

## Slide 12: The Bottleneck Diagnostic

Ask five questions:

1. Is the main uncertainty which trajectory to choose?
2. Does the task contain genuinely independent work?
3. Is the learned next-action policy itself weak?
4. Can success and intermediate quality be evaluated reliably?
5. Can candidate actions be explored safely and reversibly?

If questions 4 or 5 fail, “no added autonomy yet” is a valid engineering decision.

## Short Homework

Choose a university research task, such as producing a literature comparison.

1. Draw its state-action-observation trajectory.
2. Mark one decision that could benefit from search.
3. Draw a dependency DAG and identify its critical path.
4. Define one process signal and one outcome signal.
5. Mark every action that is irreversible or privacy-sensitive.
6. Decide whether to add LATS-style search, SPRINT-style staging, SWiRL-style learning, a combination, or none.

Defend the decision with evaluator quality, expected latency, total work, and safety evidence.
