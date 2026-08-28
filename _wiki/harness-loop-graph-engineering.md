---
title: "Harness / Loop / Graph Engineering — Environment, Feedback, Flow"
date: 2026-08-28
category: Claude Code Engineering
tags: [harness-engineering, loop-engineering, graph-engineering, agents, claude-code, codex, workflow, verification]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Graph Engineering — From Prompting AI to Managing AI Workflows", "Agents Need Control Flow — Brian's Case for Code Over Prompts", "12-Factor Agents — Engineering Principles for Production AI", "What is Agentic Engineering? A Teaching Primer"]
icon: "🧭"
image: "/assets/images/harness-loop-graph-engineering.png"
---

Reliable AI agents need more than a strong model. They need an **environment** that lets the model act safely, a **feedback loop** that checks whether the work is improving, and a **flow** that makes complex branching visible. The useful teaching shortcut is: **harness = environment, loop = feedback, graph = flow**.

These are diagnostic lenses, not competing architectures. The same agent system can use all three at once.

*Source basis: [rari — LOOP vs GRAPH vs HARNESS ENGINEERING](https://x.com/0xwhrrari/article/2082096897964306572) | [OpenAI — Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) | [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | [Addy Osmani — Loop Engineering](https://addyosmani.com/blog/loop-engineering/) | [HumanLayer — 12-Factor Agents](https://www.humanlayer.dev/blog/12-factor-agents) | [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview) | [Complete Cyclic Subtask Graphs for Tool-Using LLM Agents](https://arxiv.org/abs/2604.22820)*

The X Article may require sign-in, so this entry treats it as the framing prompt and uses the public sources above for the durable engineering claims.

## The Three Layers

The framing's main value is not that it invents new terms. Its value is that it separates three problems teams often mix together:

| Layer | Short version | What it owns | Typical failure |
|---|---|---|---|
| **Harness** | Environment | Tools, files, memory, permissions, sandboxes, checkpoints, traces, human approvals | The agent cannot access the right thing, loses state, or acts too broadly |
| **Loop** | Feedback | Build-check-retry cycles, graders, test signals, reviewer comments, stopping rules | The first attempt is close but unreliable, or the agent keeps trying without new evidence |
| **Graph** | Flow | Nodes, branches, joins, parallel work, routing conditions, approvals, recovery paths | The process has hidden branches, unclear ownership, or impossible-to-debug multi-step failure |

```text
model output
   |
   v
HARNESS: where can the model act?
   |
   v
LOOP: what evidence tells it to retry or stop?
   |
   v
GRAPH: what path is allowed to run next?
```

The same agent system can contain all three. A coding assistant has a harness because it can read files, run commands, and use a sandbox. It has a loop when it implements, tests, fixes, and tests again. It has a graph when separate planner, coder, reviewer, tester, and human approval steps run in a controlled route.

## Harness: Environment

Harness engineering asks: **what machinery surrounds the model so it can do useful work safely?**

For a coding agent, the harness includes:

- system instructions and project rules
- available tools and APIs
- file access and shell access
- workspace state, session state, and memory
- cost, token, and timeout limits
- approval gates for risky actions
- logs, traces, diffs, screenshots, and test output

OpenAI's Codex harness writeup frames the engineer's job as designing environments, specifying intent, and building feedback loops so agents can do reliable work. Anthropic's long-running-agent work makes the same point from another angle: agents spanning multiple context windows need initializer steps, progress artifacts, and structured handoffs so a later session does not have to guess what happened.

A practical harness rule:

```text
If the agent lacks safe capability, durable state, or observable evidence,
fix the harness before blaming the model.
```

## Loop: Feedback

Loop engineering asks: **what repeats, what checks the result, and what stops the retry?**

A useful loop has a bounded shape:

```text
attempt
  -> check against evidence
  -> if pass: stop
  -> if fail: return specific feedback
  -> retry with a limit
```

Addy Osmani's loop-engineering framing is useful because it moves the human from "prompting every next turn" to "designing the system that prompts, checks, and re-enters work." HumanLayer's 12-Factor Agents makes the same engineering point: good agents are mostly software, with LLM steps placed inside code-owned control flow rather than one giant prompt.

Good loop signals are concrete:

- tests pass or fail
- a schema validates
- a link resolves
- a number reconciles
- a reviewer flags a scoped issue
- a human approves a risky action

Bad loop signals are vague:

- "the model says it is done"
- "the answer sounds confident"
- "try again until it feels better"
- "self-review says the self-generated work is excellent"

The strongest teaching rule:

```text
Loop on evidence, not confidence.
```

## Graph: Flow

Graph engineering asks: **what is allowed to happen next?**

Use a graph when work has meaningful branches, parallel specialists, explicit joins, approvals, or recovery routes:

```text
request
  -> plan
  -> research
  -> draft
  -> fact check
       |-- fail -> research
       `-- pass -> editorial review
                    |-- fail -> draft
                    `-- pass -> human approval
```

LangGraph describes this as low-level orchestration for long-running, stateful agents, with a key benefit: deterministic hand-coded steps and LLM-driven steps can live in the same graph. That distinction matters. The graph does not make the answer true; it gives you places to put checks, state, retries, and human gates.

The abstract of recent work on cyclic subtask graphs makes a similar caution: extra workflow flexibility can help with recovery and exploration, but it can also add coordination overhead and inference cost. The right graph is usually **sparser** than the first diagram you draw.

Graph structure only helps reliability when the nodes expose state and checks. A graph with weak node-level evidence is still just weak evidence in a nicer shape.

## Diagnose the Failure First

Before changing the architecture, name the failure layer.

| Symptom | Start with | Better fix |
|---|---|---|
| The agent cannot access the right data safely | Harness | Narrow tool contract, permissions, sandbox, context injection |
| The agent forgets progress between sessions | Harness | Durable state, checkpoints, progress file, git commits |
| The first attempt is close but unreliable | Loop | External grader, deterministic tests, actionable feedback, bounded retry |
| The agent continues after success or stops before proof | Loop | Evidence-based terminal state and budget-aware stop rule |
| Specialists need controlled order or parallel work | Graph | Explicit nodes, edges, routing conditions, joins |
| A multi-step failure is impossible to locate | Graph + harness | Node-aligned traces and state snapshots |
| The process changes too quickly for a fixed diagram | Simpler harness | Trace first; formalize stable paths later |

This is the main reason to teach the three terms together. They prevent the common mistake of solving every failure by adding another agent.

## Expensive Mistakes

### Building the graph too early

Do not turn an imagined business process into a large graph before watching a strong agent try the work. Trace first. Formalize second.

### Letting the maker grade itself

Self-review can be useful, but it may share blind spots with the original attempt. Prefer deterministic checks where possible and separate reviewer context where judgment is needed.

### Defining the loop as "keep trying"

An unbounded retry loop is not reliability. It is a cost leak. Every loop needs new evidence, a maximum attempt count, and an escalation path.

### Turning the harness into a warehouse

More tools do not automatically make a better agent. Broad permissions increase risk, noisy context increases confusion, and crowded tool lists increase selection errors.

### Blaming the model first

A stronger model cannot reliably repair stale state, broken APIs, ambiguous tool schemas, or missing exit conditions. Check the harness, loop, and exit conditions before assuming the model is the bottleneck.

## LearnAI Teaching Use

This page is best used as a short diagnostic primer before students design or review agent workflows:

- **Week 2 agent foundations** — introduce the vocabulary: environment, feedback, flow.
- **Week 10 build loops** — teach loop engineering through build-test-fix evidence.
- **Week 12 advanced prompting** — show when a workflow should stay a loop and when it needs a graph.
- **Week 13 security review** — ask students whether a failure is a harness issue, a loop issue, or a graph issue before asking an agent for another answer.

A simple classroom exercise:

```text
1. Give students a failed agent trace.
2. Ask: what failed -- environment, feedback, or flow?
3. Require one fix at the owning layer.
4. Require evidence that the fix worked.
```

The learning outcome is not that students memorize new jargon. The outcome is that they stop treating agent reliability as a prompt-writing problem and start treating it as system design.

## References

- [rari — LOOP vs GRAPH vs HARNESS ENGINEERING](https://x.com/0xwhrrari/article/2082096897964306572)
- [OpenAI — Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Addy Osmani — Loop Engineering](https://addyosmani.com/blog/loop-engineering/)
- [HumanLayer — 12-Factor Agents](https://www.humanlayer.dev/blog/12-factor-agents)
- [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview)
- [Complete Cyclic Subtask Graphs for Tool-Using LLM Agents](https://arxiv.org/abs/2604.22820)

## Related Reading

- [Graph Engineering — From Prompting AI to Managing AI Workflows](/learnAIDoc/wiki/graph-engineering-karpathy-agent-memory/)
- [Harness Engineering — The Real Bottleneck Isn't the Model](/learnAIDoc/wiki/harness-engineering-agents/)
- [Agents Need Control Flow — Brian's Case for Code Over Prompts](/learnAIDoc/wiki/agents-need-control-flow/)
- [12-Factor Agents — Engineering Principles for Production AI](/learnAIDoc/wiki/12-factor-agents/)
- [What is Agentic Engineering? A Teaching Primer](/learnAIDoc/wiki/what-is-agentic-engineering/)
