---
title: "Stanford CS329A Part 4 — Learning from Feedback with Tools and Code"
date: 2026-08-29
category: Learning Resources
tags: [cs329a, ai-agents, react, tool-use, execution-feedback, rlef, constitutional-ai, rlaif]
related: ["Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path", "Stanford CS329A Part 3 — Robust Verification", "Stanford CS329A Part 5 — Planning and Multi-Step Reasoning", "CS329A Agent-System Literacy — The Next Layer of AI Education", "Harness / Loop / Graph Engineering — Environment, Feedback, Flow"]
icon: "🔁"
image: "/assets/images/cs329a-part-04-learning-feedback-tools-code.png"
---

An agent does not improve merely because feedback exists. It improves only when the feedback exposes useful information, aligns with the intended objective, and reaches the right decision at the right time. Stanford CS329A Part 4 makes that idea concrete through three different feedback contracts: ReAct tool observations, RLEF code execution, and Constitutional AI preferences.

This teaching companion is based on the complete 1:11:13 official lecture, 28 inspected visual cues, the official course schedule, and the three assigned primary papers. The six-part **feedback-contract audit** used below is a teaching synthesis derived from the papers' limitations; it is not a named framework proposed by the lecturers or authors.

*Source: [official CS329A course site](https://cs329a.stanford.edu/) | [official Part 4 video](https://www.youtube.com/watch?v=Lxh9RF5S-K0) | [ReAct](https://arxiv.org/abs/2210.03629) | [RLEF](https://arxiv.org/abs/2410.02089) | [Constitutional AI](https://arxiv.org/abs/2212.08073)*

## Download the Slides

| Format | Link | Note |
|---|---|---|
| PDF | [cs329a-part-04-learning-feedback-tools-code.pdf](/learnAIDoc/assets/decks/cs329a-part-04-learning-feedback-tools-code/cs329a-part-04-learning-feedback-tools-code.pdf) | Best for reading and classroom sharing. |
| PPTX | [cs329a-part-04-learning-feedback-tools-code.pptx](/learnAIDoc/assets/decks/cs329a-part-04-learning-feedback-tools-code/cs329a-part-04-learning-feedback-tools-code.pptx) | Image-based slides with speaker notes; text and diagrams are not individually editable. |
| Contact sheet | [view all 12 slides](/learnAIDoc/assets/decks/cs329a-part-04-learning-feedback-tools-code/contact-sheet.png) | Quick visual overview. |

![CS329A Part 4 slide contact sheet](/learnAIDoc/assets/decks/cs329a-part-04-learning-feedback-tools-code/contact-sheet.png)

## The Core Idea: Feedback Is a Contract

The three papers share a loop but not a signal semantics.

```text
current state
    |
    v
reason / act / generate
    |
    v
feedback source
    |-- tool observation
    |-- executable test
    `-- constitutional preference
    |
    v
update this trajectory or a future policy
```

| Method | Feedback source | What it can change | Strongest advantage | Critical boundary |
|---|---|---|---|---|
| ReAct | Tool or environment observation | The current trajectory | Adds external evidence and actions | Observation may mislead; reasoning may misuse it |
| RLEF | Program execution and tests | The current code repair and future policy | Objective relative to executable checks | Tests are incomplete and execution requires containment |
| Constitutional AI | Principle-guided critique and AI preference | Revised responses and a preference-guided policy | Scales explicit normative feedback | Principles and evaluators encode human choices and blind spots |

Calling all three signals “reward” hides important engineering and governance differences.

## 1. ReAct Interleaves Reasoning and Acting

[ReAct](https://arxiv.org/abs/2210.03629) addresses complementary limits in prior prompting patterns:

- chain-of-thought-style reasoning can remain ungrounded;
- action-only behavior can lack explicit deliberation;
- interleaving lets an observation alter the next decision.

```text
Thought
   |
   v
Action --------> environment or tool
   ^                    |
   |                    v
   `------------- Observation
                        |
                        v
                   updated state
```

In the HotpotQA and FEVER experiments, the agent uses a small action space such as search, lookup, and finish. Constraining actions makes them executable and easier to evaluate.

This is an important boundary. A bounded Wikipedia interface is not the same as an unrestricted browser, shell, cloud account, or student device. The paper's evidence supports the studied action spaces and benchmarks; it does not establish general device-agent reliability.

## 2. A Tool Observation Is Evidence, Not Truth

Tool access can reduce some hallucination failures by adding external information. It also introduces new failure modes.

| Failure | Example | Required response |
|---|---|---|
| Irrelevant retrieval | Correct paragraph about the wrong person with the same name | Check entity identity and relevance |
| Stale evidence | Old policy page conflicts with a current rule | Track source date and authority |
| Incomplete evidence | Search excerpt omits a qualifying paragraph | Inspect the primary source |
| Misinterpretation | Correct tool output is mapped to the wrong conclusion | Preserve provenance and reason over the result |
| Tool error | Empty result, timeout, malformed response | Retry under a budget or escalate |

A verbal expression of confidence is not evidence of calibrated probability. A readable reasoning trace is also not guaranteed faithful access to the model's internal computation.

## 3. Tool Use Needs an Action Contract

The six-part contract below is a **teaching synthesis** grounded in the lecture's discussion of bounded actions, recovery, budgets, and permissions. It is not a named framework from the ReAct paper.

A tool schema is necessary but not sufficient. A deployable agent needs an explicit operating contract.

```text
ACTION CONTRACT
  |
  |-- allowed actions and argument schemas
  |-- observation format and provenance
  |-- time, token, retry, and money budgets
  |-- invalid-action and empty-result behavior
  |-- recovery, backtracking, and escalation
  `-- permission boundaries and audit logs
```

The contract controls both capability and failure. For example, a search agent should know whether it may follow links, submit forms, download files, or expose retrieved data to another service.

“Try again” is not a complete recovery rule. Repetition can create loops, increase cost, or amplify a misleading observation.

## 4. Longer Trajectories Add Failure Surface

ReAct can reduce some hallucination errors in the reported tasks while adding search and reasoning-over-observation failures. These errors can compound.

```text
good question
    -> bad retrieval
    -> contaminated state
    -> wrong action
    -> confirming but irrelevant evidence
    -> confident wrong answer
```

Recovery mechanisms include backtracking, reflection, repeated trials, decomposition, and parallel candidate paths. Each mechanism has its own precondition:

- backtracking needs a recoverable state and a signal that identifies where the trace went wrong;
- reflection needs an evaluator that can detect the error rather than rationalize it;
- repeated trials need diversity rather than correlated repetition;
- decomposition needs subproblems whose outputs can be checked and composed.

More deliberation can help, but it can also cause overthinking or spend more compute reinforcing a bad state.

## 5. RLEF Uses Execution to Teach Repair

[RLEF](https://arxiv.org/abs/2410.02089) studies code synthesis, where generated programs can be executed and tested.

```text
problem
   |
   v
code attempt t
   |
   v
public tests -- fail / error / timeout
   |
   v
textual execution feedback
   |
   v
targeted code repair t+1
```

The important difference from independent sampling is that the next attempt is conditioned on concrete failure evidence from the previous attempt. The paper reports improved solve rates and more targeted repair behavior in its competitive-programming setup.

Those results are specific to the studied models, tasks, test suites, and interaction budgets. They should not be converted into the general claim that reinforcement learning from execution always beats supervised repair data or independent sampling.

## 6. Public and Private Tests Play Different Roles

RLEF uses two levels of test visibility.

| Test type | Visible to the agent during repair? | Role |
|---|---:|---|
| Public tests | Yes | Return pass/fail cases, runtime errors, and other execution feedback to the trajectory |
| Private tests | No | Contribute to terminal correctness/reward after the public tests pass or the turn limit is reached |

Sections 2.1-2.2 of the paper define the terminal scalar reward using whether all public and private tests pass.

```text
agent <---- public-test feedback
  |
  | episode ends: public pass OR turn limit
  v
private-test gate ----> terminal reward
```

Keeping tests private reduces direct optimization against every evaluation case. It does not prove:

- the benchmark was absent from pretraining;
- the implementation satisfies an unstated requirement;
- the test suite covers security, efficiency, or all edge cases;
- the model learned a generally reusable repair strategy.

## 7. Credit Assignment Spans Tokens and Turns

RLEF operates at two time scales.

```text
TURN 1: token token token ... complete program
              |
              v
          execute tests
              |
              v
TURN 2: token token token ... repaired program
              |
              v
        delayed terminal reward
```

The model makes many token-level decisions before receiving execution feedback at a turn boundary. The learner must propagate that delayed signal across the trajectory.

A passing reward is still weak process supervision. It identifies a successful trajectory but may not reveal which implementation choices were necessary, which were accidental, or which untested choices remain unsafe.

## 8. Executable Feedback Is Objective, but Narrow

Execution feedback is objective relative to the machine and test suite. It is not complete relative to the intended specification.

```text
passes all available tests
          does not imply
complete specification satisfaction
          does not imply
secure and maintainable deployment
```

RLEF depends on:

- runnable code;
- informative tests;
- a secure sandbox;
- resource and network limits;
- deterministic enough feedback for useful diagnosis.

Large repositories introduce additional problems: finding relevant files, tracking dependencies, managing context, reconciling specifications, and validating cross-module behavior. The competitive-programming experiments do not solve those problems by themselves.

## 9. A Constitution Is a Written Feedback Specification

[Constitutional AI](https://arxiv.org/abs/2212.08073) replaces some direct harmlessness labeling with human-written natural-language principles used by an AI critic or preference labeler.

The specification becomes inspectable:

```text
human-authored principles
          |
          v
AI critic or preference labeler
          |
          v
critique / revision / comparison
```

Section 4.3 reports using 16 prewritten principles when generating preference labels, and Appendix C records the principles used in the research. The count belongs to that setup; it is not a universal constitutional design rule.

The method relocates human judgment rather than removing it. Humans still:

- choose and word the principles;
- decide which values and stakeholders are represented;
- supply helpfulness comparison data;
- define evaluation and acceptable tradeoffs;
- decide who may revise the constitution.

Natural-language principles can be incomplete, conflicting, culturally narrow, or ambiguous in novel situations.

## 10. Constitutional AI Has Two Training Phases

The supervised phase creates revised responses:

```text
initial response
      -> critique under a principle
      -> revised response
      -> supervised training data
```

The RLAIF phase creates a learned reward:

```text
response pair
      -> AI preference under a principle
      -> preference model
      -> reinforcement-learning reward
      -> updated policy
```

This can scale preference generation, but the AI evaluator can share the policy's blind spots. Human validation and adversarial testing remain necessary.

The reported results also expose a helpfulness-harmlessness tradeoff. A model can become less harmful by refusing more often and simultaneously become less useful. The paper discusses overtraining behavior in which responses become overly harsh or repeat boilerplate language.

## 11. The Six-Part Feedback-Contract Audit

Before trusting a self-improving loop, audit six dimensions.

| Dimension | Audit question | Typical failure |
|---|---|---|
| Source | Who or what produces the signal? | Shared blind spot between learner and evaluator |
| Observability | What failure detail reaches the learner? | Binary reward gives no repair direction |
| Coverage | Which intended behavior is untested or unlabeled? | Passing tests misses an edge case |
| Corruption | Can the signal be noisy, biased, stale, or manipulated? | Retrieval poisoning or reward hacking |
| Incentives | Which measurable proxy will optimization maximize? | Harmlessness score produces blanket refusal |
| Guardrails | What contains mistakes and limits authority? | Generated code runs with network and filesystem access |

The audit is deliberately system-level. A better base model cannot compensate for a feedback channel that rewards the wrong behavior or exposes unsafe authority.

## The Lecture in 12 Teaching Moves

| Slide | Teaching move |
|---|---|
| 1 | Feedback sources have different meanings. |
| 2 | ReAct lets observations change the next decision. |
| 3 | A tool observation is evidence, not truth. |
| 4 | Reliable tool use starts with an action contract. |
| 5 | One early error can contaminate a trajectory. |
| 6 | RLEF teaches targeted repair rather than independent resampling. |
| 7 | Public feedback and private reward need different visibility. |
| 8 | Credit assignment spans token and turn time scales. |
| 9 | Executable feedback is objective because it is narrow. |
| 10 | A constitution makes normative feedback inspectable. |
| 11 | Constitutional AI combines supervised revision with RLAIF. |
| 12 | Audit the feedback contract, not just the model. |

## Teaching Questions

1. Which of the three feedback sources can directly prove a model's final claim is true?
2. Give a true tool observation that would still mislead an agent.
3. What should an action contract define besides tool names?
4. Why can a longer trajectory be less reliable even when each step sounds plausible?
5. How is targeted repair different from independent resampling?
6. Why expose public tests while reserving private tests?
7. Construct a program that passes an incomplete test suite while violating the real specification.
8. Why is execution objective but not complete?
9. Who chooses a constitution, and how should conflicting principles be resolved?
10. Why does Constitutional AI reduce some labeling work without becoming human-free?
11. How would you detect that an AI preference model shares the policy's blind spot?
12. Which feedback contract is easiest to audit after an incident, and why?

## Homework: Design a Student Coding Feedback Contract

Design an AI coding assistant for a university assignment.

| Requirement | Your design |
|---|---|
| Allowed tools and actions | Specify |
| Public feedback shown during work | Specify |
| Hidden/private checks | Specify |
| Code-execution sandbox | Specify |
| Token, time, and retry budgets | Specify |
| Prompt and action logs | Specify |
| Student disclosure requirement | Specify |
| Human escalation condition | Specify |
| One uncovered specification risk | Explain |
| One way the reward could be exploited | Explain |

Conclude whether the assistant should be allowed to edit code, only suggest changes, or only explain test failures. Defend the decision with the six-part audit.

## Three Assigned Papers

1. Shunyu Yao et al. (2022), [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629), arXiv:2210.03629.
2. Jonas Gehring et al. (2024; revised 2025), [RLEF: Grounding Code LLMs in Execution Feedback with Reinforcement Learning](https://arxiv.org/abs/2410.02089), arXiv:2410.02089.
3. Yuntao Bai et al. (2022), [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073), arXiv:2212.08073.

## Source Versus Teaching Synthesis

Directly sourced from the lecture and papers:

- ReAct's Thought-Action-Observation interleaving and bounded benchmark action spaces;
- tool-use benefits and reported retrieval/reasoning failure modes;
- RLEF's iterative execution-feedback setup and public/private test roles;
- token-level generation with turn-level execution reward;
- Constitutional AI's critique/revision and RLAIF phases;
- the continued use of human-written principles and helpfulness data;
- helpfulness-harmlessness tradeoffs and method-specific limitations.

Teaching synthesis in this page:

- the phrase “three feedback contracts” as the organizing taxonomy;
- the six-part feedback-contract audit;
- the student coding-assistant homework and classroom examples;
- the principle that self-improvement must be evaluated as a full feedback-and-guardrail system.

## Related Reading

- [Stanford CS329A — Self-Improving AI Agents: Public Lecture Learning Path](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Stanford CS329A Part 3 — Robust Verification](/learnAIDoc/wiki/cs329a-part-03-robust-verification/)
- [Stanford CS329A Part 5 — Planning and Multi-Step Reasoning](/learnAIDoc/wiki/cs329a-part-05-planning-multistep-reasoning/)
- [Stanford CS329A Part 2 — Test-Time Compute Scaling](/learnAIDoc/wiki/cs329a-part-02-test-time-compute-scaling/)
- [CS329A Agent-System Literacy — The Next Layer of AI Education](/learnAIDoc/wiki/cs329a-agent-system-literacy/)
- [Harness / Loop / Graph Engineering — Environment, Feedback, Flow](/learnAIDoc/wiki/harness-loop-graph-engineering/)
