---
title: "Opus 4.7 Thinking Effort — The Official Guide to Getting the Most from Claude Code"
date: 2026-04-17
category: Claude Code Engineering
tags: [claude-code, opus-4-7, thinking-effort, xhigh, adaptive-thinking, performance, configuration, best-practices]
related: ["Claude Code Session Management & 1M Context — The Official Decision Framework", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure"]
icon: "🧠"
image: "/assets/images/opus-47-thinking-effort-claude-code.png"
---

Anthropic published an official best-practices guide for using Opus 4.7 with Claude Code. The biggest change from Opus 4.6: **adaptive thinking** replaces fixed thinking budgets. The model decides when to think deeply and when to respond quickly — but you can steer it with effort levels and prompt phrasing. The default `xhigh` effort is the sweet spot for most work, but knowing when to dial up or down is the real skill.

*Source: [Best Practices for Using Claude Opus 4.7 with Claude Code](https://claude.com/blog/best-practices-for-using-claude-opus-4-7-with-claude-code) (Anthropic, April 2026)*

## The Effort Level Table

| Level | When to use | Tradeoff |
|---|---|---|
| **`low`** | Quick questions, simple lookups, trivial edits | Fastest, cheapest; still outperforms Opus 4.6 |
| **`medium`** | Cost/latency-sensitive work, concurrent sessions | Good balance for routine tasks |
| **`high`** | Multiple sessions running in parallel | Strong intelligence at lower cost than xhigh |
| **`xhigh`** (default) | Most coding and agentic work | Best setting for autonomy and complex tasks |
| **`max`** | Evaluation ceiling tests, research-grade problems | Diminishing returns; prone to **overthinking** |

**Key insight:** `max` is NOT always better. The model can overthink — spending tokens on analysis that doesn't improve the output. Use `xhigh` as your daily driver and only reach for `max` deliberately.

## How to Change Thinking Effort

### Method 1: Settings file

Add to your `~/.claude/settings.json`:

```json
{
  "preferences": {
    "thinkingEffort": "high"
  }
}
```

Or per-project in `.claude/settings.json`:

```json
{
  "preferences": {
    "thinkingEffort": "xhigh"
  }
}
```

### Method 2: Slash command (in-session)

Toggle effort mid-session without restarting:

```
/config
```

Then select "thinking effort" and pick your level. Changes take effect on the next message.

### Method 3: CLI flag

```bash
claude --thinking-effort medium
```

### Method 4: Prompt-level steering

Instead of changing the global setting, steer thinking per-message with natural language:

| Want more thinking | Want less thinking |
|---|---|
| "Think carefully and step-by-step" | "Prioritize responding quickly" |
| "Consider edge cases thoroughly" | "Quick answer, don't overthink" |
| "Analyze this deeply before acting" | "Just do it, no analysis needed" |

This works because Opus 4.7 uses **adaptive thinking** — thinking is optional at each step and the model decides based on context + your phrasing.

### Method 5: Environment variable

```bash
export CLAUDE_THINKING_EFFORT=high
claude
```

## Adaptive Thinking — What Changed from 4.6

Opus 4.6 used fixed thinking budgets — you set a token ceiling and the model used it. Opus 4.7 makes thinking **optional at each step**:

```
Opus 4.6 (fixed budget):
  Every step → [thinking: 2000 tokens] → response
  Even trivial steps burn the full budget

Opus 4.7 (adaptive):
  Trivial step → response (no thinking)
  Complex step → [thinking: as needed] → response
  Very hard step → [deep thinking: lots of tokens] → response
```

**What this means in practice:**
- You can't set a fixed `thinking_budget` anymore — it's ignored
- The model is smarter about when to think, so it's faster on easy steps
- But it might under-think on steps you consider important — that's when prompt steering kicks in

## Three Behavior Changes from 4.6

### 1. Shorter responses by default

Opus 4.7 calibrates response length to task complexity. A one-line question gets a one-line answer. If you want verbose output, say so:

```
"Give me a detailed explanation with examples"
"Include all edge cases in the implementation"
```

### 2. Fewer tool calls

The model "reasons more and calls tools less." It may think through a problem instead of immediately grepping or reading files. If you need it to actually look at the code:

```
"Read the file first before answering"
"Search the codebase — don't guess"
```

### 3. Fewer subagents

Opus 4.7 spawns fewer subagents by default. If you want parallel work, spell it out:

```
"Use subagents to run these 3 searches in parallel"
"Delegate the test run to a subagent"
```

## How to Structure Tasks for Opus 4.7

The post recommends treating Claude "like a capable engineer you're delegating to." Front-load your task spec:

```
Good:
  "Implement rate limiting on POST /tasks. Use express-rate-limit.
   Limit: 100 requests per 15 minutes per IP. Add tests.
   Files: server.js, tests/api.test.js"

Bad:
  "Add rate limiting"
  [wait for questions]
  "Use express-rate-limit"
  [wait for implementation]
  "Also add tests"
```

Each user interaction adds reasoning overhead. The fewer turns, the better — especially at `xhigh`, where the model is designed for autonomous multi-step execution.

**Practical tips:**
- Use auto mode for trusted execution without frequent check-ins
- Set up task completion notifications so you don't babysit
- Write acceptance criteria upfront so the model self-validates
- "See how far your first turn takes you" — Opus 4.7 excels at long-running tasks

## When Opus 4.7 Shines

| Task type | Why 4.7 excels |
|---|---|
| Complex multi-file changes | Adaptive thinking scales to the hard parts |
| Ambiguous debugging | Deep reasoning on the tricky steps, quick on the obvious ones |
| Code review across a service | Can reason about architectural patterns without over-tool-calling |
| Multi-step agentic work | Designed for sustained autonomous execution at `xhigh` |

## Effort Selection Cheat-Sheet

```
What are you doing?
│
├─ Quick question / lookup / trivial edit?
│  └─► low or medium
│
├─ Running multiple Claude sessions in parallel?
│  └─► high (saves cost, still strong)
│
├─ Normal coding / debugging / feature work?
│  └─► xhigh (default — leave it)
│
├─ Research-grade problem / need the absolute best answer?
│  └─► max (but watch for overthinking)
│
└─ Not sure?
   └─► xhigh. It's the default for a reason.
```

## How LearnAI Team Could Use This

- **CS305 students:** Set effort to `medium` for cost-conscious homework sessions; bump to `xhigh` for project work. Teaches resource-awareness alongside coding.
- **Research workflows:** Use `xhigh` for proof writing and formal verification. Only reach for `max` when debugging a genuinely hard soundness issue. The overthinking risk at `max` is real — the model may spend tokens analyzing alternatives instead of committing to the proof.
- **Concurrent sessions:** When running multiple Claude Code instances (e.g., one for coding, one for wiki writing), drop both to `high` to stay within usage limits.
- **Teaching adaptive thinking:** The fixed → adaptive shift is a good analogy for "know when to think deeply vs. act quickly" — a meta-cognitive skill students need.

## Real-World Use Cases

| Scenario | Effort | Why |
|---|---|---|
| Fixing a typo in README | `low` | Don't burn tokens thinking about a one-character change |
| Implementing a REST endpoint with tests | `xhigh` | Multi-step, needs autonomous judgment |
| Debugging a race condition | `xhigh` + "think step-by-step" | Hard problem, prompt-steer for deeper analysis |
| Running 3 Claude sessions in parallel | `high` | Save cost across concurrent sessions |
| Reviewing a 500-line PR for subtle bugs | `xhigh` | Needs attention but not overthinking |
| Proving a lemma in Coq, stuck on a case | `max` + "analyze all possible case splits" | Research-grade, worth the extra tokens |
| Quick codebase search | `low` + subagent | Delegate to child, minimal thinking needed |
