---
title: "Stanford CS329A Part 1 — From Scaling to Self-Improving Agents"
date: 2026-08-29
category: Learning Resources
tags: [cs329a, ai-agents, pretraining, post-training, test-time-compute, verification, orchestration, agent-workflows]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 2 — Test-Time Compute Scaling", "CS329A Agent-System Literacy — The Next Layer of AI Education", "Harness / Loop / Graph Engineering — Environment, Feedback, Flow"]
icon: "🧠"
image: "/assets/images/cs329a-course-overview.png"
---

Stanford CS329A Part 1 provides the map for the entire course. It connects four layers that are often discussed separately: pretraining capability, post-training behavior, test-time search, and agent orchestration. The central lesson is that a strong generator is not yet a reliable agent. Reliability comes from feedback, verification, action, correction, and stopping.

This page is the detailed teaching companion to [the public course-overview lecture](https://www.youtube.com/watch?v=6YnLB0XbTnI). It is separate from [CS329A Agent-System Literacy](/learnAIDoc/wiki/cs329a-agent-system-literacy/), which interprets the course for AI education. Here, the goal is to learn the lecture itself.

## Download the Slides

| Format | Link | Note |
|---|---|---|
| PDF | [cs329a-lecture-1.pdf](/learnAIDoc/assets/decks/cs329a-part-01-course-overview/cs329a-lecture-1.pdf) | Best for reading and classroom sharing. |
| PPTX | [cs329a-lecture-1.pptx](/learnAIDoc/assets/decks/cs329a-part-01-course-overview/cs329a-lecture-1.pptx) | Image-based slides with speaker notes. |
| Contact sheet | [view all 12 slides](/learnAIDoc/assets/decks/cs329a-part-01-course-overview/contact-sheet.png) | Quick visual overview. |

![CS329A Part 1 slide contact sheet](/learnAIDoc/assets/decks/cs329a-part-01-course-overview/contact-sheet.png)

## The Four Frontiers

One useful teaching synthesis is to organize the lecture by where compute and engineering effort are spent.

```text
pretraining
    -> post-training
        -> test-time search
            -> agent orchestration
```

| Frontier | Main role | Question |
|---|---|---|
| Pretraining | Build broad statistical capability | What can the model represent and predict? |
| Post-training | Shape assistant behavior | How should the model follow instructions and preferences? |
| Test-time compute | Search possible solutions with fixed weights | Which candidate should the system return? |
| Agent orchestration | Act, observe, correct, and stop | What should the system do next? |

These layers complement rather than replace one another.

## 1. Pretraining Expanded Capability

The lecture begins with the historical scaling axes:

- training compute;
- data volume;
- parameter count.

Scaling was associated with lower test loss and stronger few-shot and chain-of-thought benchmark behavior in selected model families.

The evidence needs a boundary. Observed benchmark emergence is not proof of a universal law, and it does not prove that the behavior was absent from training data. The lecture's later discussion also acknowledges that modern reasoning behavior is deliberately shaped by curated data, instruction tuning, and reinforcement learning.

## 2. Post-Training Shapes Assistant Behavior

A pretrained model and an assistant-like model are not the same object.

```text
pretraining
   -> fine-tuning on selected data
      -> instruction tuning
         -> preference optimization
```

| Stage | Function |
|---|---|
| Pretraining | Learn broad next-token patterns. |
| Fine-tuning | Sharpen behavior on selected examples. |
| Instruction tuning | Learn request-response and instruction-following patterns. |
| Preference optimization | Reward outputs that satisfy chosen evaluator preferences. |

A preference model approximates evaluator preferences. It is not automatically a truth detector.

## 3. Test-Time Scaling Searches a Fixed Model

At test time, model weights remain fixed while the system spends additional compute on a particular request.

Possible strategies include repeated sampling, longer reasoning, search over branches, and candidate selection. Tool use appears later as part of agent orchestration, though it can also consume inference-time compute in broader systems.

The simplest picture is:

```text
fixed model
   -> candidate A
   -> candidate B
   -> candidate C
          |
          v
      verifier
          |
          v
     returned answer
```

Repeated sampling is one test-time method, not a synonym for every kind of test-time compute.

## 4. Coverage Is Not Reliability

For independent attempts with constant single-attempt success probability `p`, the intuitive coverage formula is:

```text
coverage = 1 - (1 - p)^k
```

But coverage asks whether **any** candidate is correct. Deployed reliability asks whether the system **returns** a correct candidate.

| Situation | Coverage | Returned reliability |
|---|---|---|
| A correct candidate exists and the selector finds it | Improved | Improved |
| A correct candidate exists but the selector misses it | Improved | Not improved |
| No correct candidate exists | Not improved | Not improved |

Real model samples are correlated, and real selectors make errors. The formula is useful intuition, not a deployment guarantee.

## 5. Verification Is Domain-Dependent

The cost of checking an answer changes by domain.

| Domain | Possible verifier | Limitation |
|---|---|---|
| Code | Unit tests, type checks, runtime behavior | Passing specified tests does not prove general correctness. |
| Mathematics | Exact answers, rules, formal proofs | Informal reasoning may remain difficult to verify. |
| Research writing | Citation and contradiction checks | Quality and interpretation require judgment. |
| Science and medicine | Experiments, data, experts | Verification can be slow, expensive, and incomplete. |

A weak verifier can select a polished mistake. The source note identifies robust verification and the generator-verifier gap as active research problems.

## 6. Reasoning as a Search Process

The lecture presents reasoning operationally as an iterative process:

```text
analyze
   -> decompose
      -> try a path
         -> inspect feedback
            -> correct or backtrack
```

This system view is useful without claiming that visible reasoning text is a faithful account of hidden model cognition. A reasoning trace is not proof that the reasoning is correct.

## 7. Two Meanings of Self-Improvement

The phrase “self-improving” can hide a persistence distinction.

| Type | What changes | Does it survive the task? |
|---|---|---|
| Within-run correction | Retry, search, revise, backtrack | Usually no |
| Across-run learning | Weights, memory, tools, policy, data, or artifacts | Yes |

If an agent fixes a mistake and forgets it next session, it improved the current trajectory but did not acquire durable learning.

## 8. Chatbot Versus Agent

A chatbot mainly returns information. An agent owns a bounded goal-directed loop.

```text
chatbot
request -> response

agent
goal -> plan -> act -> observe -> correct -> stop
```

An agent typically needs:

- task state;
- tools or environment actions;
- feedback;
- memory or artifacts;
- a stopping or escalation rule.

Autonomy can remain bounded by human approval gates.

## 9. Open Loops Versus Workflow Graphs

The lecture distinguishes open-ended loops from practical workflow graphs.

| Design | Strength | Risk |
|---|---|---|
| Open loop | Adaptive to unexpected states | Harder to predict, audit, and contain |
| Workflow graph | Observable routes and explicit checks | Less flexible when reality falls outside the graph |

Neither is universally better. Choose by task risk, uncertainty, and audit requirements.

This connects directly to harness, loop, and graph engineering:

```text
harness = tools, memory, permissions, environment
loop    = feedback, retry, correction, stop
graph   = explicit routing through generation and checks
```

## Three Questions for Any Self-Improving Agent

Before accepting the label, ask:

1. What generates alternatives?
2. What verifies success?
3. What persists after the task?

These questions separate capability claims from system behavior.

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---|---|
| 1 | A reliable agent needs more than a strong model. |
| 2 | Organize progress across four compute frontiers. |
| 3 | Calibrate the scaling and emergence claim. |
| 4 | Separate capability from post-trained behavior. |
| 5 | Define test-time scaling with fixed weights. |
| 6 | Separate coverage from deployed reliability. |
| 7 | Expose the generator-verifier gap. |
| 8 | Treat reasoning as search with feedback. |
| 9 | Distinguish within-run from across-run improvement. |
| 10 | Distinguish a chatbot from an agent loop. |
| 11 | Compare open loops with workflow graphs. |
| 12 | Diagnose generation, verification, and persistence. |

## Teaching Questions

1. Which layer changes model weights: pretraining, post-training, or test-time search?
2. Why is preference optimization not equivalent to truth optimization?
3. What is the difference between coverage and returned reliability?
4. Which tasks in your work have cheap verifiers?
5. If an agent fixes an error and forgets it next session, what improved?
6. Which system properties turn a chatbot into an agent?
7. When should a workflow graph replace an open-ended loop?
8. What would count as durable self-improvement in a student study agent?

## Homework: Audit an Agent Claim

Choose one coding, research, study, or productivity agent.

Document:

| Question | Evidence |
|---|---|
| What is the base model? | Model or unknown |
| What is post-trained behavior? | Instructions, preferences, or policies |
| What test-time search occurs? | Sampling, reasoning, tools, or search |
| What verifies success? | Tests, rules, model judge, or human |
| What can the agent do? | Tools and permissions |
| What is the stopping rule? | Explicit, learned, or unknown |
| What persists across runs? | Memory, weights, files, data, or nothing |

Conclude whether “self-improving agent” is an accurate description or an overstatement.

## Source Versus Teaching Synthesis

Directly sourced:

- scaling, post-training, and test-time-compute progression;
- repeated sampling and verifier selection;
- reasoning and agent workflow examples;
- verification bottlenecks and applications such as coding agents, customer-support assistance, research synthesis, and AI-scientist-style workflows.

Teaching synthesis:

- the four-frontier structure;
- the persistence boundary;
- the three-question diagnostic;
- the homework and education examples.

## References

- [Official course site](https://cs329a.stanford.edu/)
- [Part 1 video](https://www.youtube.com/watch?v=6YnLB0XbTnI)
- [Official CS329A playlist](https://www.youtube.com/playlist?list=PLangBM27OtEA)

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 2 — Test-Time Compute Scaling](/learnAIDoc/wiki/cs329a-part-02-test-time-compute-scaling/)
- [Stanford CS329A Part 3 — Robust Verification](/learnAIDoc/wiki/cs329a-part-03-robust-verification/)
- [CS329A Agent-System Literacy — The Next Layer of AI Education](/learnAIDoc/wiki/cs329a-agent-system-literacy/)
- [Harness / Loop / Graph Engineering — Environment, Feedback, Flow](/learnAIDoc/wiki/harness-loop-graph-engineering/)
