---
title: "Beyond /goal — The Orchestrator + Headless Pattern for Long-Running Claude Sessions"
date: 2026-05-15
category: Claude Code Engineering
tags: [claude-code, slash-goal, autonomous-agents, orchestrator, headless-mode, context-management, super-skill, github-projects, agentic-engineering, gstack, eric-tech]
related: ["What is Agentic Engineering? A Teaching Primer", "Harness Engineering — The Real Bottleneck Isn't the Model", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Agents Need Control Flow — Brian's Case for Code Over Prompts", "Gstack — Garry Tan's AI Software Factory for Claude Code", "Autoresearch: 100 Autonomous ML Experiments Overnight", "Ralph — Bun's Autonomous Dev Loop"]
icon: "🎯"
image: "/assets/images/goal-orchestrator-headless-pattern.png"
---

Anthropic shipped **`/goal`** in Claude Code 2.1.139 (May 12, 2026): you state a completion condition, and the agent keeps working across turns until a supervisor model (Haiku, by default) confirms the goal is met. It's the closest Claude Code has come to a "set it and walk away" mode. But the agent's iterations all share **one conversation context window** — and once that window fills, accuracy collapses, the agent hallucinates, and the supervisor can falsely declare success. This entry teaches what `/goal` does, why it isn't sufficient for hour-scale or day-scale runs, and the **Orchestrator + Headless** pattern (popularized in a May 15, 2026 walkthrough by **Eric Tech**) that puts the autonomy where the context wall can't reach it.

*Source: [Eric Tech — "Stop Using Claude's /goal Feature \| Here's What Works" (YouTube, May 15, 2026)](https://www.youtube.com/watch?v=XzlSn1M6WKw) | [Claude Code 2.1.139 release notes summary (explainx.ai)](https://explainx.ai/blog/claude-code-goal-command-long-running-agents-2026) | [Joe Njenga, "I Tested (New) Claude Code /goal Command" (Medium, May 2026)](https://medium.com/@joe.njenga/i-tested-new-claude-code-goal-command-it-turned-into-a-self-driving-coding-agent-8ed1ac87e3d1)*

## What `/goal` is, in one minute

You type `/goal` inside Claude Code's terminal and provide a completion condition, e.g.:

```
/goal Migrate all legacy Auth components to the new design system,
      and ensure tests pass.
```

Claude then:

1. **Plans** how to satisfy the condition
2. **Executes** edits, tool calls, test runs
3. **Evaluates** whether the condition is met (a separate Haiku supervisor reads the transcript)
4. **Loops** — if not met, planning starts again

It tracks elapsed time, turns, and tokens; when the supervisor agrees the goal is satisfied, the goal clears and you get your terminal back. Available in interactive mode, programmatic mode (`-p`), and Remote Control.

## The fundamental problem — the *context wall*

> *"The slash-goal here typically stays in the same active conversation context window — meaning it will absolutely hit the context wall as the conversation progresses."* — Eric Tech

Each plan → execute → evaluate cycle of `/goal` adds to the **same** context window. The longer the run, the more the LLM's effective accuracy drops. At some point — and you can't predict exactly when — the agent:

- Mis-plans a step because earlier decisions have drifted out of focused attention
- Hallucinates a tool output or a file's contents
- **Worst case:** during the *evaluation* step, hallucinates that the condition is met when it isn't

This is the failure mode `/goal` cannot solve from inside its own conversation: the system that's about to make a critical "are we done?" decision is precisely the system whose attention is being eroded.

```
┌─ One growing context window ─────────────────────────────┐
│                                                          │
│  plan ─▶ execute ─▶ evaluate ─▶ plan ─▶ execute ─▶ ...   │
│                                                          │
│              ◀─── context fills, accuracy drops ───▶     │
│                                                          │
│  ⚠ false "condition met" possible near the wall          │
└──────────────────────────────────────────────────────────┘
```

## The pattern: Orchestrator + Headless

The fix is mundane: **stop doing the work inside the orchestrator's own context window**. Split the system into two roles:

```
┌─────────────────────────┐
│  Orchestrator session   │   ← stays small, low context %
│  (single Claude Code    │   ← decides "what's next"
│   conversation; you     │   ← reads state; dispatches
│   keep this clean)      │
└────────────┬────────────┘
             │  for each iteration:
             ▼
┌─────────────────────────┐
│  Headless worker        │   ← fresh context each time
│  (claude -p ...)        │   ← does the real work
│                         │   ← can spawn its OWN subagents
│  Reports terse result.  │   ← *terminates* when done
└─────────────────────────┘
             │
             ▼
   state file / GitHub project
   (the actual memory)
```

**Why this works:**

- The **orchestrator** only sees terse iteration results — small, structured handoffs (e.g., "QA found 3 bugs; bug IDs in GitHub project"). Its context stays well below the wall.
- Each **headless worker** is born with a clean context, does its iteration, writes state externally, and dies. There's no accumulating drift across iterations.
- The "memory of the project" lives in a **state file or GitHub project**, *not* in any LLM's conversation.

**Why not just use subagents?** A subagent reports its findings back to the parent — that means everything it produced ends up consumed in the parent's context. Eric's argument: for *hour-* or *day-scale* autonomous work, you want the orchestrator to stay so clean that subagents are a luxury it can't afford. The headless worker can spawn *its own* subagents without polluting the orchestrator.

## State: where the project actually lives

Eric's recommended substrate: **GitHub Projects** columns. Anything else works — a `.md` file, a SQLite DB — but GitHub Projects has two practical wins:

| Why GitHub Projects | Detail |
|---|---|
| **Free** | No new infrastructure |
| **`gh` CLI built into Claude Code** | The agent can read/write tickets without an MCP server |
| **Visible to humans** | You can watch the run unfold in a browser, intervene, re-prioritize |
| **Per-ticket history** | Each ticket carries its own audit trail |

Eric uses six columns:

| Column | Meaning |
|---|---|
| **queue** | Items pending — the orchestrator pops from here |
| **testing** | Item currently in flight |
| **done** | Spec passing |
| **bug** | Test failed; needs the build worker |
| **flaky** | Only works on retry |
| **skip** | Out of scope |

The orchestrator's job each iteration is essentially: *"pop one from queue, dispatch the right headless skill, move the result to the right column."* That's it. The interesting work is in the skills.

## Worked example: Super-QA + Super-Build cycling on an app

Eric's walkthrough demonstrates the pattern with two **headless skills** orchestrated by a third **super-orchestrator** skill:

```
super-orchestrator  ─▶  super-QA      ─▶  finds bugs ─▶  GitHub bug column
        ▲                                                       │
        │                                                       ▼
        └─◀──  super-build  ◀──  fixes bugs  ◀──  GitHub bug column
```

### `super-QA` (find bugs)

- Traverses the app's pages using **breadth-first search**
- Visited set keeps it from re-testing pages it already covered
- Writes **Playwright** end-to-end tests for each page
- If a test fails → opens a ticket in the *bug* column
- If a page has child pages → adds them to *queue*
- Terminates the headless session, returns "found N bugs"

### `super-build` (fix bugs)

- Reads from the *bug* column
- Uses the **Superpower** TDD framework: write failing test → implement → refactor → verify
- For non-obvious design decisions, invokes **[Gstack](/learnAIDoc/wiki/gstack-ai-software-factory/)** — Garry Tan's auto-plan skill that votes across CEO / engineer / security / designer / QA roles
- Terminates with "fixed M bugs"

### The loop terminates when

There are no items left in *queue* AND no items left in *bug*. That's the completion condition the orchestrator monitors — *external* to any single LLM conversation.

## Why this is "Agentic Engineering" rather than "prompt engineering"

The Orchestrator + Headless pattern is a small case study in the [Agentic Engineering primer](/learnAIDoc/wiki/what-is-agentic-engineering/)'s five-layer framing:

| Layer | What this pattern does |
|---|---|
| **Prompt** | Iteration prompts are short and structured ("here's ticket #N, do super-QA on it") |
| **Agent** | Two roles — orchestrator (long-lived, clean) + worker (short-lived, fresh). Memory lives in **state**, not context. |
| **LLM** | Same model; the win is *how* it's invoked, not which model |
| **MCP** | Tools are normal — `gh` CLI, Playwright, file edits |
| **Tools** | Workers spawn freely; no parent-context pollution |

The diagnostic question shifts from "is my prompt good?" to "**is my orchestrator's context window staying small?**"

## Teaching Mode — for CS-310 students

A two-week classroom unit, paired with the [What is Agentic Engineering?](/learnAIDoc/wiki/what-is-agentic-engineering/) primer:

### Week 1 — `/goal` in isolation (~2 hr)

| Activity | Output |
|---|---|
| Read this entry; watch the Eric Tech video | Students can articulate the context-wall problem in their own words |
| In pairs, run a short `/goal` task on a sample repo and **measure the context-usage line** as it runs | A graph of context % vs. turn for a single `/goal` run — usually a smooth climb |

### Week 2 — Refactor into Orchestrator + Headless (~4 hr lab)

| Activity | Output |
|---|---|
| Provided starter: an orchestrator skill that calls `claude -p` for each iteration, plus a GitHub project with the six columns | Students wire up a single iteration end-to-end |
| Replace the in-context loop from Week 1 with the orchestrator pattern; re-run on the same sample repo | The same task, now with a *flat* orchestrator context line because the work happens in fresh `claude -p` sessions |
| 1-page reflection: when is plain `/goal` actually fine? | Forces the student to name the threshold (short, single-pass, low-stakes tasks) — not every problem needs the orchestrator pattern |

### Assessment

- **Practical**: provide a buggy app + a target spec; the student must build an orchestrator that drives it to green
- **Conceptual**: given a transcript with a "false complete," identify *which iteration* drifted and *why* the context-wall caused it

## How LearnAI Team Could Use This

- **Production-style autonomous-agent demonstrations** — the orchestrator + headless pattern is the most defensible way LearnAI can show off "AI building software overnight" without students drawing the wrong lesson (that `/goal` alone is sufficient).
- **Onboarding senior students** to long-running agent workflows — the orchestrator-vs-worker split is exactly the abstraction modern AI-engineering interviews now ask about.
- **Security teaching (CS-336)** — the false-completion failure mode is a security topic: an evaluator under context pressure can be *adversarially induced* into declaring success. Worth a 1-hour lecture on its own.
- **Companion to existing entries** — pair with [Gstack](/learnAIDoc/wiki/gstack-ai-software-factory/) (decision-voting), [Harness Engineering](/learnAIDoc/wiki/harness-engineering-agents/) (why the runtime layer matters), and [Autoresearch](/learnAIDoc/wiki/autoresearch-autonomous-ml/) (an earlier autonomous-loop pattern).

## Real-World Use Cases

| Scenario | How to use the pattern |
|---|---|
| **Overnight bug-fix sweep on a legacy module** | Orchestrator + super-QA + super-build; goal: "queue is empty AND bug column is empty" |
| **Migrating a UI component library** | Orchestrator drives one component per iteration; state in GitHub project; each iteration handled headlessly |
| **Mass API documentation backfill** | Orchestrator iterates over endpoints from a state file; worker writes + verifies docs per endpoint |
| **Long-form research synthesis** | Orchestrator iterates over a reading-list state file; worker reads + summarizes one paper at a time |
| **Course-grading automation** (LearnAI use case) | Orchestrator iterates over student submissions; worker runs the rubric + writes a feedback artifact per student |

## Important things to know

- **`/goal` alone is fine for short, single-pass tasks.** The point isn't that `/goal` is broken — it's that the context-wall failure mode is invisible until it bites you. Use `/goal` for one-shot 5-15 minute jobs; reach for the orchestrator pattern when the task plausibly runs hour-scale or longer.
- **The supervisor is not a safety net.** Anthropic's Haiku-supervisor design helps, but it reads the *transcript* — which is also the part being eroded. Don't trust "condition met" as ground truth on long runs; check the actual repo state.
- **Subagents are not a substitute.** Subagent results flow back into the parent's context, defeating the point. The headless `claude -p` invocation is what keeps the orchestrator clean.
- **State must live outside any LLM conversation.** A `.md` file, a SQLite DB, or GitHub Projects — pick one and commit. The orchestrator should be able to crash and restart without losing progress.
- **Cost is real.** Hour- and day-scale runs incur hour- and day-scale token bills. Set hard limits at the orchestrator layer (max iterations, max tokens), not inside `/goal`.
- **The orchestrator skill is the highest-leverage thing to write well.** Most of the engineering happens here: queue management, retry policy, the "is this iteration good enough to commit?" check, escalation to humans when stuck.
- **Companion deep-dives** in this wiki:
  - [What is Agentic Engineering? A Teaching Primer](/learnAIDoc/wiki/what-is-agentic-engineering/) — the 5-layer framework that contextualizes this pattern
  - [Harness Engineering — The Real Bottleneck Isn't the Model](/learnAIDoc/wiki/harness-engineering-agents/) — orchestrator design as a discipline
  - [Claude Code · CLAUDE.md Practices](/learnAIDoc/wiki/claude-code-context-claudemd-practices/) — how to manage what *does* live in context
  - [Agents Need Control Flow](/learnAIDoc/wiki/agents-need-control-flow/) — argument for code over prompts in the orchestrator layer
  - [Gstack — Garry Tan's AI Software Factory](/learnAIDoc/wiki/gstack-ai-software-factory/) — the decision-voting layer Eric's super-build uses
  - [Autoresearch — Autonomous ML Experiments Overnight](/learnAIDoc/wiki/autoresearch-autonomous-ml/) — an earlier instance of the same idea, applied to ML training loops
