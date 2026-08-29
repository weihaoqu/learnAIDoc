# Stanford CS329A Part 4: Learning from Feedback with Tools/Code

Primary source: [Stanford CS329A Self-Improving AI Agents | Part 4 | Learning from Feedback with Tools/Code](https://www.youtube.com/watch?v=Lxh9RF5S-K0)

- Course: Stanford CS329A, Self-Improving AI Agents
- Official schedule: https://cs329a.stanford.edu/
- Video duration: 1:11:13
- Evidence collected: complete native-caption transcript plus 28 inspected visual cues
- Scope: ReAct, reinforcement learning from execution feedback (RLEF), and Constitutional AI
- Assigned papers: ReAct, RLEF, and Constitutional AI

## Core Thesis

An agent does not improve merely because feedback exists. It improves only when the feedback exposes useful information, aligns with the intended objective, and reaches the right decision at the right time.

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

The three papers teach three distinct feedback contracts. They should not be collapsed into one generic reward loop.

## Lecture Map

### 1. ReAct: Reasoning Interleaved with Action (01:48-22:46)

ReAct alternates explicit reasoning with actions and environmental observations.

```text
Thought -> Action -> Observation -> Thought -> ... -> Finish
```

The thought identifies what information or operation is needed. The action invokes a constrained tool. The observation changes what the model can reason about next.

This loop addresses complementary limits:

- reasoning without tools can remain ungrounded;
- action without explicit deliberation can be myopic;
- interleaving lets evidence revise the trajectory.

The HotpotQA and FEVER setups use a small action space such as search, lookup, and finish. This constraint is part of why the interaction is executable and evaluable. It is not evidence that unrestricted browser or device agents inherit the same reliability.

Tool use changes failure modes rather than eliminating them. An observation can be irrelevant, incomplete, stale, or correctly retrieved but misinterpreted. Errors can compound across long trajectories.

### 2. Designing an Action Contract (12:54-27:32)

A deployable tool-using agent needs more than tool names:

1. valid actions and argument schemas;
2. observation formatting;
3. stop conditions and budgets;
4. behavior after invalid syntax or empty results;
5. recovery, backtracking, or escalation rules;
6. permission boundaries and audit logs.

The lecture discussion considers reflection, repeated trials, task decomposition, parallel approaches, and memory. More deliberation can help, but it can also cause overthinking or amplify a misleading observation.

### 3. RLEF: Program Execution as Feedback (27:32-46:30)

Code synthesis offers an unusually concrete feedback source: generated code can be executed.

```text
problem -> code attempt -> public tests -> textual feedback -> repair
                                             |
                                             v
                              terminal public + private result
                                             |
                                             v
                                        PPO update
```

In the paper's Section 2 setup, public tests produce in-trajectory feedback. An episode ends when the public tests pass or a turn limit is reached. The terminal scalar reward records whether all public and private tests pass.

This creates two time scales:

- token-level actions generate code and commands;
- turn-level execution feedback arrives after a complete attempt.

The signal is objective relative to the test suite. That does not make it complete relative to the user's specification. Passing finite tests can coexist with security flaws, uncovered edge cases, inefficient algorithms, or incorrect behavior outside the tested inputs.

RLEF also presumes runnable code, useful tests, and a secure sandbox. Repository-scale software engineering adds search, dependency, context, and specification-management problems that the studied competitive-programming setup does not solve by itself.

### 4. Constitutional AI: Written Principles as Feedback (46:30-60:28)

Constitutional AI uses human-written natural-language principles to scale critique and preference feedback.

The supervised phase is:

```text
harmful response -> constitutional critique -> revised response -> supervised data
```

The reinforcement-learning phase is:

```text
response pair -> AI preference under a principle -> preference model -> RL reward
```

Section 4.3 of the paper states that preference-label generation uses 16 prewritten principles; Appendix C records the principles used in the research.

The method relocates human judgment rather than removing it. Humans choose the constitution, supply helpfulness data, define evaluations, and decide whether the learned behavior is acceptable.

The reported results expose a helpfulness-harmlessness tradeoff. A policy can become safer by refusing more often and simultaneously become less useful. The paper also warns about overtraining and Goodhart-like boilerplate behavior.

### 5. The Feedback-Contract Audit (60:28-71:06)

The lecture's three feedback sources can be audited with six questions:

| Dimension | Question |
|---|---|
| Source | Who or what produces the signal? |
| Observability | Which failure information reaches the learner? |
| Coverage | Which intended behaviors remain untested or unlabeled? |
| Corruption | Can the signal be noisy, biased, stale, or manipulated? |
| Incentives | Which proxy will optimization actually maximize? |
| Guardrails | What budgets, sandboxes, held-out checks, and human review remain? |

This six-part audit is a teaching synthesis. It organizes the papers' different limitations; it is not presented by the authors as a named unified framework.

## Three Feedback Contracts

| Method | Feedback source | Immediate use | Strength | Boundary |
|---|---|---|---|---|
| ReAct | Tool/environment observation | Change the current trajectory | Adds external evidence and actions | Observation may mislead; reasoning may misuse it |
| RLEF | Program execution and tests | Repair code and train a policy | Objective relative to executable checks | Tests are incomplete; execution requires containment |
| Constitutional AI | Principle-guided critique/preferences | Revise responses and train a preference-guided policy | Scales explicit normative feedback | Principles and evaluators encode human choices and blind spots |

## Durable Mental Model

```text
feedback quality
    = signal relevance
    x signal coverage
    x resistance to manipulation
    x ability to assign credit

self-improvement quality
    <= feedback quality + system guardrails
```

The equations are conceptual, not measured identities. Their purpose is to prevent the vague claim that “more feedback” necessarily means “better learning.”

## Key Terms

- **Action:** Structured command sent to a tool or environment.
- **Action space:** Allowed actions and argument formats.
- **Observation:** Information returned after an action.
- **Trajectory:** Ordered sequence of states, thoughts, actions, observations, and outputs.
- **Grounding:** Connecting generated reasoning to external evidence or state.
- **Execution feedback:** Output, exception, timeout, or test result obtained by running code.
- **Public test:** Test result shown to the agent during repair.
- **Private test:** Held-out test used in the terminal correctness/reward signal.
- **Constitution:** Written set of principles used to critique or rank outputs.
- **RLAIF:** Reinforcement learning from AI-generated preference feedback under human-specified guidance.
- **Preference model:** Learned evaluator predicting which response better satisfies target preferences.
- **Proxy objective:** Measurable signal that incompletely represents the intended goal.
- **Reward hacking:** Improving the proxy while violating the intended objective.
- **Sandbox:** Isolated execution environment that limits generated-code effects.

## Primary References

- [Official CS329A course website](https://cs329a.stanford.edu/)
- [Official Part 4 lecture video](https://www.youtube.com/watch?v=Lxh9RF5S-K0)
- Shunyu Yao et al., [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- Jonas Gehring et al., [RLEF: Grounding Code LLMs in Execution Feedback with Reinforcement Learning](https://arxiv.org/abs/2410.02089)
- Yuntao Bai et al., [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
