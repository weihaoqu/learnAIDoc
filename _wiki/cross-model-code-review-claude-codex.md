---
title: "Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs"
date: 2026-03-24
category: Claude Code
tags: [claude-code, codex, code-review, multi-model, ai-coding, testing, bugs, codex-plugin-cc, adversarial-review]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Claude Code Auto Mode — The Middle Path for Permissions", "Frustration Shifts Upward — How AI Coding Changes What's Hard", "oh-my-claudecode — Multi-AI Orchestration Plugin for Claude Code"]
icon: "🔍"
image: "/assets/images/cross-model-code-review-claude-codex.png"
---

Sterling Crispin shared a brutal discovery: **Claude Opus 4.6 is an excellent programmer, but consistently produces serious bugs that it cannot find no matter how many times it self-reviews.** The solution? Use a completely different model — OpenAI's Codex CLI (GPT 5.4) — to review every submission, with 4+ review passes. The insight that's making developers rethink AI coding workflows: "passing tests" doesn't mean "no bugs" — it means the AI got really good at writing code that passes tests.

*Source: [爱可可-爱生活 Weibo analysis](https://weibo.com) | [Chandler Nguyen: Dual-Wielding AI Coding Tools](https://chandlernguyen.com/blog/2026/03/13/codex-gpt-5-4-vs-claude-code-opus-4-6-dual-wielding-ai-coding-tools/) | [SmartScope: Automating the Claude × Codex Review Loop](https://smartscope.blog/en/blog/claude-code-codex-review-loop-automation-2026/) | [GitHub: openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)*

## The Problem: Self-Review Blindness

AI models have a blind spot: they can't reliably catch their own bugs. This isn't about model quality — it's about **cognitive homogeneity**. When the same model writes code and reviews it, it applies the same reasoning patterns, assumptions, and blind spots to both tasks.

```
Claude writes code → Claude reviews code
  Same reasoning      Same blind spots
  Same assumptions    Same missed patterns
  = Bugs persist through unlimited review rounds
```

Sterling's experience: no matter how many times he asked Claude to self-review, the same class of bugs survived. The bugs weren't in syntax or logic — they were **deep-layer misunderstandings** about system behavior that the model's own reasoning couldn't detect.

## Why "Passing Tests" Is a Trap

This is the most counterintuitive finding:

> "AI's favorite thing is writing code that passes its own tests. 'Passing tests' doesn't mean no bugs — it means the AI got optimized to write code that passes tests."

| What You Expect | What Actually Happens |
|----------------|----------------------|
| Tests catch bugs | AI writes code *and* tests with the same assumptions |
| Green = safe | Green = model successfully fooled itself |
| More tests = more safety | More tests = more sophisticated self-deception |
| Linting catches the rest | Linting catches syntax, not semantic bugs |

The subtle bugs that survive: code runs perfectly, all tests green, but hides **deep-layer misunderstandings** that can destroy entire systems. Traditional validators (linters, type checkers, unit tests) can't catch them because the model has been optimized to produce code that passes exactly those checks.

## The Solution: Cross-Model Review

Use a **different model** to review. Different training data, different reasoning patterns, different blind spots = different bugs caught.

```
Claude (Opus 4.6)          Codex (GPT 5.4)
┌──────────────┐           ┌──────────────┐
│ Write code   │──────────>│ Review code  │
│ Write tests  │           │ Find bugs    │
│ Fast, daily  │           │ Rigorous     │
│ driver       │<──────────│ "Academic    │
│              │  feedback │  advisor"    │
└──────────────┘           └──────────────┘

Different model = different blind spots
= Bugs that Claude can't see, Codex catches
```

### Why Not Just Use Codex for Everything?

Sterling's answer: Codex is like an **academic advisor** — too focused on "correct code," loses sight of the system's actual purpose (telos). It over-engineers. It's also more expensive. Claude is better for daily driving — fast, practical, good at understanding what you actually want. But it needs Codex's rigorous review eye.

| Model | Strength | Weakness |
|-------|----------|----------|
| **Claude** | Fast execution, practical, understands intent | Can't catch its own deep bugs |
| **Codex** | Rigorous review, catches subtle issues | Over-engineers, expensive, loses system purpose |
| **Both** | Write with Claude, review with Codex | Best of both worlds |

## Emerging Patterns

### Pattern 1: Plan-with-Codex

```
1. Claude writes implementation plan
2. Codex reviews plan for architectural issues
3. Claude revises based on Codex feedback
4. Loop until Codex approves
5. Claude implements the approved plan
6. Codex reviews the implementation
```

### Pattern 2: Multi-Model Review Loop

Run reviews back and forth between models:

> "Having Opus critically review a plan from GPT-5.4, and then having GPT-5.4 review the revised plan from Opus — running this back and forth for a few rounds — produces significantly better results."

### Pattern 3: Role-Based Multi-Model

| Role | Model | Why |
|------|-------|-----|
| Architecture | Opus 4.6 | Best at system-level thinking |
| Implementation | Claude Code | Fast, practical daily driver |
| Code Review | Codex 5.4 | Catches bugs Claude misses |
| Security Audit | Either (cross-review) | Different model = fresh eyes |

## For Educators

This has direct implications for teaching software engineering:

- **"Passing tests ≠ correct"** is now a *foundational principle*, not an edge case
- Students need to learn **adversarial review** — the habit of having a different perspective check their work
- Cross-model review is the AI-era equivalent of **code review culture** — you never review your own code in production

## Now Official: codex-plugin-cc

On March 30, 2026, OpenAI released **codex-plugin-cc** — an official plugin that brings Codex directly into Claude Code. No more switching terminals. Cross-model review is now a slash command away.

### Install

```bash
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

Requires: ChatGPT subscription (including Free tier) or OpenAI API key + Node.js 18.18+.

### Slash Commands

| Command | What It Does |
|---|---|
| `/codex:review` | Standard read-only code review on uncommitted changes. Supports `--base main` for branch diffs |
| `/codex:adversarial-review` | Devil's advocate review — challenges design tradeoffs, hidden assumptions, failure modes |
| `/codex:rescue` | Hand off entire task to Codex (bug investigation, fixes, continuing work) |
| `/codex:status` | Show running/recent Codex jobs |
| `/codex:result` | Display completed job output + session ID for resuming in Codex |
| `/codex:cancel` | Kill active background jobs |
| `/codex:setup` | Verify installation, manage review gate |

### Background Execution

All review commands support `--background` for async execution:

```bash
/codex:review --background      # Runs in background
/codex:status                   # Check progress
/codex:result                   # Get findings when done
```

### Review Gate (Optional)

Enable with `/codex:setup --enable-review-gate`. Uses Stop hooks to auto-run Codex review after every Claude response. Blocks if issues found — Claude must fix before proceeding.

**Warning:** Can trigger Claude/Codex loops that drain usage limits fast. Only enable during active monitoring.

### Architecture

```
Claude Code session
    │
    ├── /codex:review ──→ Local Codex CLI ──→ OpenAI API
    │                      (reuses your auth,    (GPT 5.4)
    │                       MCP config, repo)
    │
    └── /codex:rescue ──→ Codex subagent (full write access)
```

No separate runtime — wraps your machine's global `codex` binary with existing auth and config.

---

## Real-World Walkthrough: Building a REST API with Cross-Model Review

Here's a concrete example of the Claude + Codex workflow in practice — building a task management API from scratch.

### Step 1: Claude Code Writes the Implementation

```
You: Build a REST API for managing tasks with Express.
     Include CRUD endpoints, SQLite persistence, and input validation.
```

Claude Code generates:
- `server.js` — Express app with routes
- `db.js` — SQLite connection + schema
- `middleware/validate.js` — Input validation
- `tests/api.test.js` — Jest test suite

All tests pass. Linting clean. Looks good... right?

### Step 2: Codex Standard Review

```bash
/codex:review
```

Codex (GPT 5.4) examines the diff with fresh eyes and reports:

```
⚠️  SQL Injection in db.js:34
    Template literal used in query: `WHERE id = ${id}`
    → Use parameterized query: db.get("WHERE id = ?", [id])

⚠️  Race condition in PATCH /tasks/:id
    Read-then-write without transaction. Concurrent PATCHes
    can overwrite each other.
    → Wrap in db.run("BEGIN") ... db.run("COMMIT")

⚠️  Missing rate limiting
    No rate limiter on POST /tasks — trivial to DoS.

ℹ️  test coverage gap
    No test for malformed JSON body (triggers unhandled 500)
```

Claude's own tests passed. Claude's own review found nothing. Codex caught **4 issues** in seconds — including a SQL injection that would have shipped to production.

### Step 3: Claude Code Fixes Based on Codex Feedback

```
You: Fix the issues Codex found — SQL injection, race condition,
     rate limiting, and add the missing test.
```

Claude Code applies all fixes. Tests updated and passing.

### Step 4: Codex Adversarial Review

```bash
/codex:adversarial-review Focus on security and error handling
```

Codex pushes harder:

```
🔴  Error messages leak internals
    DELETE /tasks/999 returns: {"error": "SQLITE_ERROR: no such row"}
    → Return generic 404, log details server-side only

🔴  No authentication
    All endpoints are public. Even if "auth comes later,"
    the route structure should enforce middleware now.

🟡  db.js opens connection at import time
    If SQLite file is missing/corrupt, server crashes on startup
    with unhelpful error. Add connection validation + retry.

🟡  Timestamps use Date.now() (epoch ms)
    API returns milliseconds but no timezone. Use ISO 8601 strings.
```

### Step 5: Claude Revises Again

Claude fixes the error messages, adds auth middleware placeholder, connection validation, and ISO timestamps. One more review:

```bash
/codex:review
```

```
✅  No issues found. LGTM.
```

### Step 6: Codex Reviews the Plan (Not Just the Code)

Before shipping, use Codex to review the architecture:

```bash
/codex:adversarial-review Challenge the overall design decisions
```

```
🟡  SQLite for a REST API?
    Fine for prototype, but no concurrent write support.
    If this grows beyond single-server, you'll need to migrate.
    Consider abstracting db.js behind a repository pattern now.

🟡  No pagination on GET /tasks
    Returns all tasks. Will become a problem at ~1000 rows.
    Add ?page=1&limit=20 with Link headers.

ℹ️  No health check endpoint
    Add GET /health for deployment monitoring.
```

These aren't bugs — they're **architectural feedback** that prevents future pain.

### The Full Loop

```
Claude Code                          Codex (via plugin)
┌─────────────┐                      ┌─────────────────────┐
│ 1. Implement│─── /codex:review ──→ │ 2. Standard review  │
│             │←── findings ─────────│    (4 bugs found)   │
│ 3. Fix bugs │                      │                     │
│             │─── /codex:adversarial│ 4. Adversarial      │
│             │←── deeper issues ────│    (4 more issues)  │
│ 5. Fix all  │                      │                     │
│             │─── /codex:review ──→ │ 6. LGTM ✅          │
│             │                      │                     │
│             │─── /codex:adversarial│ 7. Architecture     │
│             │←── design feedback ──│    review            │
│ 8. Refactor │                      │                     │
│ 9. Ship 🚀  │                      │                     │
└─────────────┘                      └─────────────────────┘

Total: 8 issues caught that Claude's self-review missed.
```

---

## The Harness Engineering Connection

Cross-model review is a harness mechanism. It maps to **Pillar 2 (Architectural Constraints)** — instead of asking the model to follow a "review your own code" prompt (which it can ignore or apply with the same blind spots), you enforce review through a structurally different system. Code enforcement > prompt suggestions.

The codex-plugin-cc makes this **zero-friction** — no terminal switching, no copy-paste, no workflow interruption. The cross-model review thesis now has an official tool.

## Evolution: From 2-Agent to 4-Agent Consensus Review

The next step beyond Claude + Codex pairing: **4 parallel agents with iterative consensus**. A custom `/cross-review` skill orchestrates Claude Code, Codex, CodeRabbit, and an Integration Impact agent — all reviewing the same PR in parallel, then exchanging opinions and cross-validating until they agree.

*Source: [硅谷陈源博士 on Weibo](https://weibo.com/) (2026-04)*

```
        PR #251
           │
           ▼
  /cross-review launches 4 agents in parallel
           │
    ┌──────┼──────┬──────────┬─────────────┐
    ▼      ▼      ▼          ▼              ▼
┌────────┐ ┌────┐ ┌────────┐ ┌──────────────┐
│ Claude │ │Codex│ │CodeRabbit│ │  Integration │
│ Code   │ │     │ │         │ │  Impact     │
│(full   │ │(caller│ │(integra-│ │ (versions,  │
│ review)│ │analysis)│tion chk)│ │  CI, build) │
└────┬───┘ └───┬─┘ └────┬────┘ └──────┬──────┘
     │         │         │            │
     └─────────┴─────────┴────────────┘
                       │
                       ▼
         Exchange opinions → Cross-validate
                       │
                       ▼
         Up to 3 rounds until consensus
                       │
                       ▼
         ┌─────────────────────────────────┐
         │ Confirmed Issues (2+ reviewers) │
         │ Integration Findings             │
         │ Dismissed Findings (with why)   │
         └─────────────────────────────────┘
```

### What Each Agent Brings

| Agent | Specialty |
|---|---|
| **Claude Code** | Full code review — logic, patterns, best practices |
| **Codex** | Consumer/caller analysis — who uses this code and how |
| **CodeRabbit** | Integration checks — API contracts, backward compat |
| **Integration Impact** | Cross-cutting analysis — versions, CI, build, .gitignore |

### The Output: Three Categories

1. **Confirmed Issues** — agreed by 2+ reviewers, with severity (Critical/Major/Minor/Info)
2. **Integration Findings** — cross-cutting impact the individual reviewers missed
3. **Dismissed Findings** — what the consensus rejected, with justification (e.g., "Docker is a system dependency, not a Flox package")

### The Real Insight

> "The value isn't in three independent opinions — it's in the **mutual validation through iterative discussion**."

A single reviewer's opinion is cheap. Four independent reviewers give you breadth but leave you to resolve conflicts yourself. **Iterative consensus** forces the reviewers to confront each other's findings: false positives get dismissed with reasons, genuine issues get confirmed by cross-checking, and cross-cutting impacts emerge that no single reviewer would have seen.

### How It Compares

| Approach | Agents | Cost | Value |
|---|---|---|---|
| Self-review | 1 | 1x | Low (same blind spots) |
| Cross-model (Claude + Codex) | 2 | 2x | High (different reasoning patterns) |
| 4-agent consensus | 4 | ~5x (3 rounds) | Highest (mutual validation) |

Use single cross-model for daily work. Use 4-agent consensus for **high-stakes PRs** — release branches, security-sensitive code, architectural changes. The cost is worth it when a missed bug costs more than the review tokens.
