---
title: "Engineering Agent Improvement Loops - From Self-Critique to Verified Revision"
date: 2026-08-29
category: Agent Engineering
tags: [agents, self-refine, reflexion, critic, verification, feedback-loops, education, teaching, assessment]
related: ["Harness / Loop / Graph Engineering - Environment, Feedback, Flow", "Stanford CS329A - Self-Improving AI Agents", "Graph Engineering - From Prompting AI to Managing AI Workflows", "Grill Me - Turn AI from an Answer Machine into a Thinking Partner"]
icon: "loop"
image: "/assets/decks/agent-improvement-loop/01-slide-cover.png"
---

The prompt sounds attractive: ask an AI to define five quality criteria, create a draft, score itself, revise the weakest section, and repeat until its score reaches 95. The useful idea is the **feedback loop**. The dangerous idea is treating the model's own score as proof that the work is now correct.

This lesson teaches a more defensible pattern:

> **Do not revise until the model says 95. Revise until externally checkable criteria pass.**

An agent improvement loop is a bounded process in which a system attempts a task, checks the result against evidence, diagnoses specific defects, revises those defects, and then stops or hands control to a human. Iterative revision can improve an output, but it is not a truth mechanism. Truth or correctness must come from evidence such as tests, source support, explicit constraints, calibrated rubrics, or qualified human review.

## Teaching Deck

[Download the 60-minute classroom deck as PDF](/learnAIDoc/assets/decks/agent-improvement-loop/engineering-agent-improvement-loops.pdf) | [Download the editable PPTX](/learnAIDoc/assets/decks/agent-improvement-loop/engineering-agent-improvement-loops.pptx) | [View the contact sheet](/learnAIDoc/assets/decks/agent-improvement-loop/contact-sheet.png)

[![Engineering Agent Improvement Loops slide contact sheet](/learnAIDoc/assets/decks/agent-improvement-loop/contact-sheet.png)](/learnAIDoc/assets/decks/agent-improvement-loop/engineering-agent-improvement-loops.pdf)

The deck supports a 60-minute class: 28 minutes of instruction and a worked example, 22 minutes of comparative lab work, 7 minutes of assessment and reflection, and a 3-minute closing checklist.

## Interactive Six-Question Learning Lab

[Open the interactive Agent Improvement Loop learning lab]({{ '/wiki/agent-improvement-loop-grill-lab/' | relative_url }}). Students first learn the bounded-loop model and inspect a worked lecture-to-slides example. They then answer the same six demanding questions used in the original coaching exercise, diagnose their own first attempt, compare it with an anonymized learner case, study the correction, and build a personal playbook from their revised answers. The static activity takes about 25 minutes, stores responses only in the learner's browser, and does not use automated AI grading.

## Prompt Versus Agent

A prompt asks a model to produce behavior within an interaction. An agent system may preserve task or session state across steps through orchestration, files, traces, tool context, or memory. It can call tools, observe results, repeat actions, and follow software-owned stopping and handoff rules.

```text
PROMPT
request -> model -> response

AGENT IMPROVEMENT LOOP
contract -> attempt -> verify -> diagnose -> revise
                ^                              |
                |--------- bounded retry ------|
                              |
                         stop / human handoff
```

The distinction is not autonomy for its own sake. The agent is valuable when the surrounding system gives it **better evidence and control** than one model call would have.

## What Research Supports

The viral prompt is closest to **Self-Refine**. Self-Refine uses the same model to generate an output, produce specific feedback, and revise iteratively. Its experiments reported improvements across several preference and constrained-generation tasks. The same study found very small gains on mathematical reasoning, larger gains when external oracle feedback identified errors, diminishing returns across iterations, and examples of incorrect feedback or revisions that introduced new problems. The evidence supports bounded refinement for some tasks, not a general rule that self-critique creates correctness. [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)

**Reflexion** extends the pattern across attempts. It converts task or environmental feedback into a textual reflection and stores that reflection in episodic memory for later trials. The important ingredient is not introspective language alone; it is feedback from an attempted task and a mechanism that carries the lesson forward. [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366)

**CRITIC** strengthens refinement by letting the model interact with external tools such as search or code execution before revising. This makes it a better model for factual, computational, and programming work than unsupported self-scoring. [CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing](https://arxiv.org/abs/2305.11738)

A complementary result warns against intrinsic self-correction. In reasoning experiments, asking a model to reconsider without external feedback did not reliably improve answers and could reduce performance. [Large Language Models Cannot Self-Correct Reasoning Yet](https://arxiv.org/abs/2310.01798)

### Scope of the evidence

These papers study particular models, prompts, benchmarks, and evaluation procedures. Their results do not automatically transfer to classroom grading, scientific research, legal or medical decisions, or every modern agent system. A classroom should treat the papers as design evidence and cautionary evidence, not as universal guarantees.

## The Four-Question Suitability Gate

Before building an improvement loop, answer four questions.

| Gate | Question | Evidence needed |
|---|---|---|
| **Specification** | Can the desired result be stated clearly? | Requirements, constraints, examples, or an instructor rubric |
| **Verification** | Can quality be checked independently of the draft's confidence? | Tests, sources, calculations, schema checks, rendering, or qualified review |
| **Repairability** | Can a detected defect be revised without creating unacceptable harm? | Reversible edits, version history, rollback, and scoped permissions |
| **Boundedness** | Can cost, attempts, data exposure, and authority be limited? | Retry budget, time or token budget, access controls, and a handoff rule |

If specification or verification is missing, the agent may still assist exploration, but it should not certify completion. If repairability or boundedness is missing, keep the human in control and narrow the task.

## The Seven-Step Improvement Loop

```text
1. CONTRACT
   goal + constraints + evidence + permissions + budget
          |
          v
2. ATTEMPT
   produce an inspectable draft or action plan
          |
          v
3. VERIFY
   run checks that can expose specific defects
          |
          v
4. DIAGNOSE
   connect each failure to evidence and location
          |
          v
5. REVISE
   change only defects supported by the audit
          |
          v
6. STOP
   pass, budget exhausted, no progress, or risk threshold
          |
          v
7. HAND OFF
   human interprets ambiguity and authorizes consequential action
```

Preserve a trace across the loop: the criteria, initial result, checks, defects, revisions, costs, unresolved uncertainty, and final decision. The trace makes improvement inspectable and gives students evidence for reflection.

### 1. Contract

Define what success means before generating the answer. Include prohibited actions and evidence requirements, not only positive goals.

```text
Goal: produce an eight-slide explanation of one lecture.
Required: source fidelity, coherent flow, citations, readable text, no overflow.
Prohibited: unsupported claims, invented quotations, unauthorized materials.
Evidence: source-to-slide map, link check, rendered-slide inspection.
Budget: two revision cycles.
Authority: the student approves interpretation before publication.
```

### 2. Attempt

Generate an initial artifact that is easy to inspect. Do not ask the system to hide every intermediate result in high-stakes work. A visible first attempt establishes a baseline and makes revision claims testable.

### 3. Verify

Use checks that are appropriate to the defect:

- code behavior: tests, type checking, static analysis, benchmarks
- factual claims: primary sources and claim-to-citation mapping
- calculations: independent computation, unit checks, reconciliation
- slides: source mapping, link checks, image dimensions, render inspection
- structured writing: instructor rubric plus evidence for each criterion
- consequential judgment: qualified human authority

Source checks reduce unsupported claims; they do not guarantee that the sources are complete, high quality, or correctly interpreted.

### 4. Diagnose

Feedback must be specific and actionable. "Improve this" is weak. "Slide 4 claims the study established causality, but the cited abstract describes an observational association" identifies the location, defect, and evidence.

### 5. Revise

Change only the parts connected to verified defects. Broad rewrites can remove correct content or introduce new errors. After revision, rerun the affected checks and any checks that the change could invalidate.

### 6. Stop

Every loop needs explicit terminal conditions:

- all required checks pass
- the attempt budget is exhausted
- the latest iteration produced no material improvement
- verification signals conflict
- the next action exceeds the agent's permissions or risk boundary

A self-awarded threshold such as 95 is not a useful stopping rule unless the scoring procedure has been independently calibrated for the task.

### 7. Hand Off

Independent feedback and authoritative approval are different. A second model may reduce some correlated errors, but it remains probabilistic and may share training data, assumptions, or blind spots with the generator. Human review is also imperfect, but qualified people hold the authority to interpret ambiguous goals and approve consequential actions.

## A Verifier Ladder

Move upward when the task requires stronger evidence.

| Level | Verifier | Value | Main limitation |
|---|---|---|---|
| 1 | Same-model self-critique | Cheap; can catch obvious omissions | Shares blind spots with the draft |
| 2 | Explicit user or instructor rubric | Makes expectations concrete | Rubric may still be vague or incomplete |
| 3 | Separate reviewer role or model | Adds another perspective | Independence is not truth or authority |
| 4 | External tools, tests, calculations, and sources | Grounds checks in observable evidence | Tools and specifications can still be incomplete |
| 5 | Qualified human review | Interprets context and owns decisions | Expensive, variable, and capacity-limited |

The strongest practical workflow combines levels rather than choosing only one.

## Situation Matrix

| Situation | Useful loop | Required verifier | Human role |
|---|---|---|---|
| Code implementation | implement -> test -> diagnose -> patch | automated tests plus review | approve design and consequential changes |
| Research summary | extract -> draft -> claim audit -> revise | primary sources and citation map | judge source quality and interpretation |
| Slide deck | outline -> render -> inspect -> revise | source map, links, dimensions, visual inspection | approve teaching argument |
| Structured writing | draft -> rubric audit -> targeted edit | instructor-defined criteria | judge meaning, voice, and tradeoffs |
| Open-ended creativity | generate alternatives -> critique -> select | audience or creator preference | retains authorship and taste |
| Sensitive or high-stakes decision | narrow analysis only | domain evidence and qualified reviewer | makes the decision; agent does not self-authorize |

Do not confuse a task that is easy to score with a task that is valuable to optimize. A weak rubric can create verifier gaming: the agent learns to satisfy the visible check while missing the real educational or social objective.

## Worked Case: Lecture to Eight Slides

### Contract

The student must produce eight slides that teach one lecture accurately. Every major claim maps to the transcript or an approved source. The deck needs a coherent sequence, working citations, readable text, and no overlap or overflow. The agent may revise twice. The student approves the final interpretation.

### Agent trajectory

1. Extract the lecture's claims and evidence.
2. Build a source-to-slide map.
3. Draft the narrative and slide outline.
4. Render the first deck.
5. Check citations, links, dimensions, text density, and visual collisions.
6. Record each failed criterion with slide number and evidence.
7. Revise only failed slides.
8. Render and inspect the affected slides again.
9. Stop after all required checks pass or the second revision cycle ends.
10. Present unresolved limitations to the student for approval.

The system cannot determine by itself whether the teaching interpretation is educationally appropriate. That judgment remains with the student or instructor.

## The 60-Minute Comparative Lab

Use the same task under three conditions:

| Condition | Process |
|---|---|
| A: Single pass | One prompt, one submitted answer |
| B: Self-score | Revise until the model claims 95 |
| C: Verified loop | Apply the contract, evidence checks, bounded revision, and handoff |

### Preparation

Provide students with the task, rubric, starter artifact, source packet, verification checklist, and logging template before the timed experiment. Otherwise, setup time will dominate the comparison.

### Class schedule

| Time | Activity |
|---|---|
| 0-8 minutes | Explain the first-draft problem and distinguish prompts from agents |
| 8-18 minutes | Introduce the research map and four-question suitability gate |
| 18-28 minutes | Walk through the loop, verifier ladder, and slide case |
| 28-50 minutes | Teams run or inspect the three conditions using prepared materials |
| 50-57 minutes | Compare results and complete the assessment table |
| 57-60 minutes | Submit the closing checklist and one unresolved risk |

### Comparison measures

- objective correctness where a ground truth exists
- rubric coverage with evidence
- unsupported or weakly supported claims
- new defects introduced during revision
- number of iterations and model/tool calls
- elapsed time and estimated cost
- human preference, reported separately from correctness

The experiment should not assume that Condition C wins. Students must report the observed outcome, including cases where a simple first attempt is sufficient or the verification overhead is not justified.

## Student Assignment

Design and test one bounded agent improvement loop for a real learning task.

### Deliverables

1. A one-page problem contract.
2. The initial output or baseline.
3. The verifier specification and evidence collected.
4. A revision log showing defect, evidence, change, and recheck.
5. The final output or handoff decision.
6. Iteration, time, tool, and model-use counts.
7. A reflection explaining one improvement, one remaining limitation, and one situation where the loop should not be used.

### Assessment rubric

| Criterion | Weight | Evidence of strong work |
|---|---:|---|
| Problem contract | 20% | Goal, constraints, permissions, evidence, and budget are testable |
| Verifier design | 25% | Checks can expose task-relevant defects and limitations are named |
| Revision discipline | 20% | Changes trace directly to evidence and are rechecked |
| Stop and handoff rules | 15% | Terminal conditions and human authority are explicit |
| Evaluation evidence | 10% | Baseline and final results are compared without hiding failures |
| Reflection | 10% | Student distinguishes improved appearance from supported correctness |

Grade the reasoning process and evidence, not only the polish of the final artifact.

## Common Failure Modes

### Self-grading bias

The writer and judge share blind spots. Treat self-critique as a source of hypotheses about defects, not final proof.

### Vague criteria

"High quality," "professional," and "95 points" do not tell the verifier what evidence to inspect.

### Verifier gaming

The agent optimizes the visible check rather than the real goal. Use hidden cases, multiple evidence types, and human review for consequential interpretation.

### Endless iteration

More attempts create cost and can introduce new errors. Require new evidence, an attempt limit, and a no-progress stop.

### Evidence contamination

If the verifier sees the expected answer, private tests, or grading key during generation, the evaluation no longer measures independent performance.

### Data and permission failures

Do not upload private student work, unauthorized teaching material, or sensitive data merely because a verifier could use it. Minimize data and follow institutional permissions.

### Premature autonomy

The ability to retry does not grant authority to publish, grade, spend money, contact people, or change records.

## Reusable Prompt Template

```text
You are operating a bounded improvement loop.

TASK CONTRACT
- Goal: [desired artifact or result]
- Required criteria: [observable requirements]
- Prohibited actions: [privacy, authority, or content boundaries]
- Allowed tools and sources: [list]
- Evidence of success: [tests, citations, checks, human approval]
- Maximum revision cycles: [number]
- Human handoff condition: [condition]

PROCESS
1. Produce an inspectable initial attempt.
2. Audit each criterion. Cite evidence for pass or identify the exact defect.
3. Use the allowed tools or sources for externally checkable claims.
4. Revise only defects supported by the audit.
5. Rerun affected checks after every revision.
6. Stop when checks pass, the budget is exhausted, progress stalls,
   evidence conflicts, or authority must return to a human.

RETURN
- Final artifact or handoff status
- Checks performed and results
- Revision log
- Unresolved uncertainties
- One important remaining limitation
```

This template is a starting structure, not a substitute for task-specific engineering.

## Teaching Takeaway

The important capability is not making an agent criticize itself. It is designing an environment in which errors can become visible, revisions remain bounded, and authority returns to a person when evidence runs out.

```text
better agent work
    = clear contract
    + useful attempts
    + discriminating feedback
    + targeted repair
    + explicit stopping
    + appropriate human authority
```

## References

- [Madaan et al. - Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
- [Shinn et al. - Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366)
- [Gou et al. - CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing](https://arxiv.org/abs/2305.11738)
- [Huang et al. - Large Language Models Cannot Self-Correct Reasoning Yet](https://arxiv.org/abs/2310.01798)

## Related Reading

- [Harness / Loop / Graph Engineering - Environment, Feedback, Flow](/learnAIDoc/wiki/harness-loop-graph-engineering/)
- [Stanford CS329A - Self-Improving AI Agents](/learnAIDoc/wiki/stanford-cs329a-self-improving-ai-agents/)
- [Graph Engineering - From Prompting AI to Managing AI Workflows](/learnAIDoc/wiki/graph-engineering-karpathy-agent-memory/)
- [Grill Me - Turn AI from an Answer Machine into a Thinking Partner](/learnAIDoc/wiki/grill-me-skill/)
