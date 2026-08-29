# Stanford CS329A Part 5: Planning and Multi-Step Reasoning

Primary source: [Stanford CS329A Self-Improving AI Agents | Part 5 | Planning and Multi-Step Reasoning](https://www.youtube.com/watch?v=Ml_fp9XkB8Y)

- Course: Stanford CS329A, Self-Improving AI Agents
- Session: Multi-step Reasoning/Planning, October 6, 2025
- Video duration: 1:14:55
- Evidence collected: complete manual-caption transcript plus 28 inspected visual cues
- Production basis: `slide-deck/cs329a-series/research/part-05-planning-multistep-reasoning.md`
- Scope taught in the recording: LATS, SPRINT, and SWiRL
- Additional official readings not substantively taught: ADaPT and Wider or Deeper / AB-MCTS

Generated publication artifacts verified on August 29, 2026:

- `/assets/decks/cs329a-part-05-planning-multistep-reasoning/cs329a-part-05-planning-multistep-reasoning.pdf`
- `/assets/decks/cs329a-part-05-planning-multistep-reasoning/cs329a-part-05-planning-multistep-reasoning.pptx`
- `/assets/decks/cs329a-part-05-planning-multistep-reasoning/contact-sheet.png`
- `/assets/images/cs329a-part-05-planning-multistep-reasoning.png`

The PDF has 12 pages, the PPTX has 12 slides with 12 prompt-based notes, and the contact sheet contains all 12 slides in sequence. The published copies were checksum-matched to the source deck artifacts.

## Core Thesis

Planning quality is not one problem. An agent may need better search over uncertain choices, better scheduling of independent work, or a better learned policy for choosing each next action.

```text
goal + current observation
          |
          v
   choose next action
          |
          v
 environment response
          |
          +------------------+
                             |
                             v
                   updated state / plan
```

Part 5 teaches three different interventions:

1. **LATS** spends inference compute exploring and evaluating alternative trajectories.
2. **SPRINT** identifies independent subproblems so a runtime can execute them concurrently.
3. **SWiRL** changes the step policy using synthetic tool trajectories and step-wise reinforcement learning.

They are complementary, not interchangeable.

## 1. LATS: Search Over Agent Trajectories (00:37-23:29)

Language Agent Tree Search combines language-model reasoning with an MCTS-style loop and environment feedback. The lecture describes six operations:

```text
selection -> expansion -> evaluation -> simulation
    ^                                      |
    |                                      v
    +---------- backpropagation <----------+
                       |
                    reflection
```

The search policy uses a UCT-style balance between estimated value and exploration. Value is not observed truth. LATS uses language-model judgments and self-consistency as heuristic signals, so a polished but wrong branch can be overvalued.

LATS is most credible when candidate actions can be evaluated safely and cheaply. Its assumptions become fragile when actions are irreversible, expensive, or externally consequential.

## 2. SPRINT: Expose the Dependency Graph (23:29-50:29)

A long reasoning trace can look sequential even when several subproblems are independent. SPRINT transforms a trace into a staged dependency structure:

```text
reasoning trace
      |
      v
decomposed steps
      |
      v
dependency DAG
      |
      v
parallel execution stages
      |
      v
supervised fine-tuning
```

At inference, the model emits tagged plans and execution branches. An external orchestrator launches independent branches, waits at dependency barriers, and feeds merged results back for replanning.

The method targets the **sequential critical path**, not necessarily total generated tokens, compute, energy, or cost. Parallel gains depend on dependency width, executor balance, scheduling overhead, and task length. Short tasks can become slower.

## 3. SWiRL: Learn From Intermediate Tool Decisions (50:29-74:50)

SWiRL addresses a different bottleneck: the policy choosing each tool action. Its two-stage pipeline is:

```text
Stage 1: generate offline tool-use trajectories
         -> label process and outcome quality
         -> filter synthetic data

Stage 2: reuse stored observations
         -> propose next tool action/query
         -> judge the proposed step
         -> update with step-wise RL
```

Stored environment responses avoid live tool instability during every training rollout. They also create an offline-distribution risk: a current policy or deployment tool may reach states not represented in the stored data.

Process and outcome signals answer different questions. A correct final answer does not prove every step was sound. A plausible action does not prove a live tool will execute successfully or safely.

## Durable Diagnostic

Before adding a planning method, locate the bottleneck:

| Bottleneck | Candidate intervention | Required evidence |
|---|---|---|
| Uncertain choice among trajectories | LATS-style search | A usable evaluator, bounded budget, reversible exploration |
| Independent subproblems hidden in a sequence | SPRINT-style staging | A valid dependency graph and concurrent runtime |
| Weak next-action/tool policy | SWiRL-style step learning | Reliable step feedback and representative environment data |
| No reliable verifier or unsafe actions | No added autonomy yet | Better checks, sandboxing, or human approval |

## Key Terms

- **Agent trajectory:** a sequence of decisions, actions, observations, and later decisions.
- **MCTS:** search that allocates effort among branches through selection, expansion, evaluation or simulation, and return propagation.
- **UCT:** a tree-selection score balancing estimated branch value against exploration.
- **Reflection:** textual feedback derived from failed or weak trajectories and supplied to later attempts.
- **Dependency DAG:** a directed acyclic graph encoding which steps require earlier results.
- **Critical path:** the longest dependency-constrained chain limiting ideal parallel completion time.
- **Process supervision:** feedback about intermediate actions or steps.
- **Outcome supervision:** feedback based on the final result.
- **Offline environment response:** a stored tool observation reused during training.

## Primary References

### Taught in the recording and used by the deck

- [Official course website](https://cs329a.stanford.edu/)
- [Official Part 5 lecture video](https://www.youtube.com/watch?v=Ml_fp9XkB8Y)
- Andy Zhou et al., [Language Agent Tree Search Unifies Reasoning Acting and Planning in Language Models](https://arxiv.org/abs/2310.04406)
- Emil Biju et al., [SPRINT: Enabling Interleaved Planning and Parallelized Execution in Reasoning Models](https://arxiv.org/abs/2506.05745)
- Anna Goldie et al., [Synthetic Data Generation & Multi-Step RL for Reasoning & Tool Use](https://arxiv.org/abs/2504.04736)

### Official readings not substantively taught in this recording

- Archiki Prasad et al., [ADaPT: As-Needed Decomposition and Planning with Language Models](https://arxiv.org/abs/2311.05772)
- Yuichi Inoue et al., [Wider or Deeper? Scaling LLM Inference-Time Compute with Adaptive Branching Tree Search](https://arxiv.org/abs/2503.04412)
