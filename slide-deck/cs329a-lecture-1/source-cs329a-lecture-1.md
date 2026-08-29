# Stanford CS329A Lecture 1: Course Overview

Primary source: [Stanford CS329A Self-Improving AI Agents | Part 1 | Course Overview](https://www.youtube.com/watch?v=6YnLB0XbTnI)

- Instructors: Aakanksha Chowdhery and Azalia Mirhoseini
- Video duration: 1:09:42
- Evidence collected: full native-caption transcript plus 21 inspected frames at conceptual transitions
- Scope of this deck: substantive lecture content through approximately 1:00:38; course logistics are summarized but not taught in detail

## Core Thesis

A model can generate candidate answers. A useful agent must also select, verify, act, receive feedback, correct mistakes, and know when to stop.

## Lecture Map

### 1. Pretraining Scaling (02:23-10:49)

The lecture begins with the traditional scaling axes for language models:

- training compute
- data volume
- parameter count

The instructors connect scaling to lower test loss, few-shot learning, and observed chain-of-thought behavior in sufficiently capable models.

Calibration: the lecture presents chain-of-thought as an emergent behavior historically discovered in larger models. During the Q&A at 58:12-60:32, the instructors also acknowledge that modern reasoning behavior is shaped by curated data, instruction tuning, and reinforcement learning. Emergence versus learned behavior is not treated as settled.

### 2. Post-Training (11:20-19:25)

The lecture distinguishes a raw pretrained model from an assistant-like model:

1. Pretraining builds broad statistical capability through next-token prediction.
2. Fine-tuning on higher-quality data sharpens behavior.
3. Instruction tuning teaches question answering and instruction following.
4. RLHF or related preference optimization steers outputs toward selected human preferences.

Calibration: a preference model approximates evaluator preferences. It is not automatically a truth detector.

### 3. Test-Time Scaling (19:38-31:18)

The model weights remain fixed while the system spends more computation during inference. The lecture's repeated-sampling example generates many answers and uses a verifier or selector to choose a candidate.

The central distinction is:

- coverage or pass@k: at least one candidate is correct
- deployed reliability or pass@1 after selection: the system returns a correct candidate

For independent samples with identical success probability `p`, the intuitive coverage formula is:

```text
coverage = 1 - (1 - p)^k
```

Real model samples are correlated, and selectors are imperfect, so this is an intuition rather than a deployment guarantee.

### 4. Reasoning Models (31:22-40:43)

The lecture describes a reasoning process with:

- problem analysis
- task decomposition
- self-evaluation
- self-correction
- alternative proposals and backtracking

Reasoning models can spend additional compute on difficult problems and use feedback to revise a path. Their advantage is domain-dependent; the lecture contrasts strong math, code, and data-analysis performance with less consistent gains in personal writing and editing.

### 5. From LLMs to Agents (40:49-53:56)

The lecture's agent loop contains:

```text
goal -> plan -> environment action -> feedback -> correction -> stop
```

Tools and memory support the loop. The instructors distinguish an open-ended agent loop from practical agentic workflows built as predefined graphs, including:

- generator -> evaluator -> retry
- parallel workers -> aggregator
- planner/orchestrator -> workers -> verifier

These designs trade flexibility against control, observability, and reliability.

### 6. Applications and Open Questions (54:03-60:38)

Applications discussed include coding agents, customer-support assistance, research synthesis, and AI-scientist-style workflows. The instructors explicitly identify robust verification and the generator-verifier gap as active research problems.

Calibration: AI-scientist examples are forward-looking assistance workflows, not evidence that scientific judgment or validation has been solved.

## Durable Mental Model

```text
Pretrained capability
      + post-training behavior
      + test-time search
      + verifier feedback
      + orchestration
      = an agentic system that may become more reliable
```

The word `may` matters: additional loops and compute only help when feedback is informative and the system uses it correctly.

## Key Terms

- **Pretraining**: broad next-token learning over large datasets.
- **Post-training**: fine-tuning and preference optimization after pretraining.
- **Test-time compute**: computation spent while answering a specific request.
- **Verifier**: a mechanism that tests or scores a candidate result.
- **Coverage / pass@k**: whether any of `k` candidates succeeds.
- **Deployed reliability**: whether the system returns a correct result in practice.
- **Agent loop**: goal-directed action, observation, correction, and stopping.
- **Workflow graph**: a predefined orchestration of model calls, tools, and checks.
- **Within-run improvement**: correction during one task without durable learning.
- **Across-run improvement**: a persistent change to weights, memory, tools, policies, or external artifacts.

## Reference

- [Official course website](https://cs329a.stanford.edu/)
- [Lecture 1 video](https://www.youtube.com/watch?v=6YnLB0XbTnI)
- [Official playlist](https://www.youtube.com/playlist?list=PLangBM27OtEA)
