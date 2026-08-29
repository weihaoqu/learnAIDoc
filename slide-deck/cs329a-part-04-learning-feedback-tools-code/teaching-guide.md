# Teaching Guide: CS329A Part 4 - Learning from Feedback with Tools/Code

Use this guide with the 12-slide deck. The objective is not to memorize three agent methods. It is to learn how to inspect the feedback contract that makes correction possible, and to recognize when that contract is incomplete.

## Slide 1: Feedback Changes Learning

ReAct, RLEF, and Constitutional AI all create feedback loops, but their signals mean different things. A search observation adds information, a test reports executable behavior, and a constitutional preference represents a normative judgment.

**Checkpoint:** Which of the three signals can directly prove a claim is true? Recommended answer: none in general. Each is evidence relative to a source, test suite, or evaluator.

## Slide 2: The ReAct Loop

ReAct alternates Thought, Action, and Observation. The important design move is that new evidence can change the next decision rather than merely decorate a plan written in advance.

**Misconception to challenge:** readable thoughts are useful traces, but they are not guaranteed faithful access to internal model computation.

## Slide 3: Observations Are Evidence

Tool output can be irrelevant, incomplete, stale, or misinterpreted. Grounding is therefore not a binary property produced by attaching search. The system must track provenance, relevance, and uncertainty.

**Teaching example:** A search tool returns a true paragraph about the wrong person with the same name. Retrieval succeeded; task grounding failed.

## Slide 4: The Action Contract

**Teaching synthesis:** A tool-enabled agent needs a typed operating boundary:

1. allowed actions and argument schemas;
2. observation format;
3. stop and budget rules;
4. invalid-action behavior;
5. recovery and escalation;
6. permissions and logs.

**Challenge:** What happens when a tool returns no result? “Try again” is not a complete policy because repetition can loop or amplify cost.

## Slide 5: Trajectory Risk

Longer trajectories create more opportunities to recover and more opportunities to compound error. A bad observation can contaminate the state, trigger a bad action, and generate further misleading evidence.

**Checkpoint:** Name one recovery mechanism and its failure mode. Example: backtracking can recover from a bad branch, but only if the system can detect which state should be restored.

## Slide 6: RLEF Repairs Code

RLEF differs from independent resampling. The next attempt is conditioned on concrete execution feedback from the previous attempt. The model is trained to make targeted repairs over turns.

**Evidence boundary:** The reported gains come from competitive-programming tasks, specific models, test suites, and budgets. Do not translate them into a universal coding-agent claim.

## Slide 7: Public and Private Tests

Public tests are visible in the interaction and can teach a repair. Private tests remain hidden from the trajectory and contribute to the terminal correctness/reward signal.

**Critical distinction:** Hiding private tests reduces direct optimization against every evaluation case. It does not prove the benchmark is uncontaminated or the specification is complete.

## Slide 8: Two Time Scales

The model produces code token by token, but execution feedback arrives after a full attempt. The policy must assign delayed turn-level evidence back across many token decisions.

**Challenge:** Why is a passing terminal reward weak process supervision? It identifies a successful trajectory but may not identify which implementation choices were necessary.

## Slide 9: Objective, but Narrow

Execution is objective relative to the machine and test suite. The test suite may still omit important behavior.

```text
passes tests
    does not imply
complete specification satisfaction
    does not imply
secure deployment
```

**Teaching example:** A function passes all positive-input tests but crashes on negative input because that case was never specified.

## Slide 10: Constitution as Specification

A constitution makes normative instructions inspectable and reusable. Humans still choose the principles, decide whose values count, and resolve conflicts or omissions.

The paper reports using 16 prewritten principles for preference labels. That number belongs to the research setup; it is not a universal requirement.

## Slide 11: Two CAI Phases

The supervised phase critiques and revises responses under constitutional principles. The RLAIF phase generates AI preference labels, trains a preference model, and uses that model for reinforcement learning.

**Critical distinction:** Constitutional AI reduces some direct harmlessness labeling. It does not remove human input because humans author the constitution, supply helpfulness data, and define evaluation.

**Tradeoff:** A policy can become less harmful by refusing more often and also become less helpful.

## Slide 12: Feedback-Contract Audit

Ask six questions before trusting a self-improving loop:

1. **Source:** Who or what generates the signal?
2. **Observability:** What failure detail reaches the learner?
3. **Coverage:** What remains untested or unlabeled?
4. **Corruption:** Can the signal be noisy, biased, stale, or manipulated?
5. **Incentives:** Which proxy will optimization maximize?
6. **Guardrails:** What budgets, sandboxes, held-out checks, and human review remain?

This audit is a teaching synthesis grounded in the three papers' limitations.

## Short Homework: Design a Student Coding Feedback Contract

Design an AI coding assistant for a university assignment. Specify:

| Requirement | Your design |
|---|---|
| Allowed tools and actions | |
| Public feedback shown during work | |
| Hidden/private checks | |
| Code-execution sandbox | |
| Token, time, and retry budgets | |
| Prompt and action logs | |
| Student disclosure requirement | |
| Human escalation condition | |
| One uncovered specification risk | |
| One way the reward could be exploited | |

Conclude whether the assistant should be allowed to edit code, only suggest changes, or only explain test failures. Defend the decision using the six-part feedback-contract audit.

## Suggested Discussion Questions

1. When does a tool observation increase uncertainty rather than reduce it?
2. How would you detect a repeated-action loop before it consumes the budget?
3. What is the smallest useful public test, and what can it accidentally reveal?
4. Can private tests remain meaningful if the model has seen public benchmark solutions during pretraining?
5. Which coding properties are difficult to test automatically?
6. Who should be allowed to edit a deployed constitution?
7. How would you test whether an AI preference model shares the policy model's blind spot?
8. Which feedback contract is easiest to audit after an incident, and why?
