---
title: "Claude Code Source Analysis — What Makes It Work & How to Actually Learn From It"
date: 2026-04-01
category: Claude Code Engineering
redirect_from:
  - "/wiki/claude code/claude-code-source-analysis-learning/"
tags: [claude-code, architecture, source-code, harness, prompt-cache, subagents, learning-methodology, reverse-engineering, open-source]
related: ["CC Unpacked — Visual Guide to Claude Code's Internals", "Claw Code — Clean-Room Python Rewrite of Claude Code's Agent Harness", "The Five Levels of Claude Code — From Prompting to Orchestration", "Boris Cherny on Claude Code — Origin Story, Product Philosophy & the End of Manual Coding"]
icon: "🔬"
image: "/assets/images/claude-code-source-analysis-learning.png"
---

When Claude Code's source was accidentally leaked on March 31, 2026, the community immediately started reverse-engineering. Two standout analyses emerged: **Sebastian Raschka** dissected *what* makes Claude Code work (spoiler: it's the harness, not the model), and **宝玉 xp** explained *how* to actually learn from reading source code — a 4-step method applicable to any large open-source project.

*Source: [Sebastian Raschka — Claude Code's Real Secret Sauce](https://sebastianraschka.com/blog/2026/claude-code-secret-sauce.html) | [宝玉 xp on Weibo](https://weibo.com/) (2026-04-01) | [Latent.Space — The Claude Code Source Leak](https://www.latent.space/p/ainews-the-claude-code-source-leak)*

## Part 1: The 6 Architectural Secrets (Raschka's Analysis)

Raschka's thesis: **Claude Code's core advantage is the software harness, not the model.** Swap in DeepSeek, MiniMax, or Kimi with the same harness → potentially strong coding performance.

```
┌─────────────────────────────────────────────────────────────┐
│                   Claude Code Architecture                   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ 1. Live  │  │ 2. Prompt│  │ 3. Real  │  │ 4. Context│   │
│  │ Repo     │  │ Cache    │  │ Tools    │  │ Bloat     │   │
│  │ Context  │  │ (Static/ │  │ (not     │  │ Control   │   │
│  │          │  │ Dynamic) │  │ bash)    │  │           │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────────┐     │
│  │ 5. Structured        │  │ 6. Forks & Subagents     │     │
│  │    Session Memory    │  │    (shared cache,         │     │
│  │    (title, tasks,    │  │     parallel work)        │     │
│  │     errors, logs)    │  │                           │     │
│  └──────────────────────┘  └──────────────────────────┘     │
│                                                              │
│            ┌──────────────────────────┐                      │
│            │      LLM (Claude)       │ ← swappable          │
│            └──────────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

### 1. Live Repo Context

When you start prompting, Claude Code loads real-time repository state — main branch, current branch, recent commits, and CLAUDE.md — before the model sees your question. This is why it "knows" your codebase without you explaining it.

### 2. Aggressive Prompt Cache

A boundary marker separates **static** content (system prompt, tool definitions, CLAUDE.md) from **dynamic** content (conversation). Static parts are cached globally across turns, avoiding the cost of rebuilding the full prompt every iteration.

### 3. Real Tools, Not "Chat with Files"

Claude Code doesn't shell out to `grep` or `cat`. It uses dedicated tools:

| Tool | Advantage over Bash |
|---|---|
| **Grep** | Better permission handling, structured results |
| **Glob** | Intelligent file discovery with patterns |
| **LSP** | Semantic code understanding — call hierarchy, references |

This is code more like a structured IDE, less like a chatbot pasting terminal output.

### 4. Minimizing Context Bloat

The biggest challenge for coding agents: context windows fill up fast. Claude Code fights this with:

- **File-read deduplication** — skip re-reading unchanged files
- **Compressed disk previews** — summaries instead of full content
- **Auto-truncate + smart summarization** — tool outputs capped with intelligent truncation
- **Automatic context compression** — triggered when approaching window limits

### 5. Structured Session Memory

Each conversation maintains a structured Markdown document:

```
Session Title
Current Status
Task Description
Files & Functions
Workflow
Errors & Fixes
Codebase & System Docs
Learnings
Key Results
Work Log
```

This mirrors how humans take notes while coding — it's not a flat chat log but an organized working document.

### 6. Forks & Subagents

Forked agents **reuse the parent's prompt cache** — a byte-identical copy of the parent context. This means:

- Parallel subagents cost almost nothing extra (shared cache)
- Background analysis (summarization, memory extraction) doesn't pollute the main agent loop
- State awareness lets subagents see mutable state while operating independently

## Part 2: How to Actually Learn From Source Code (宝玉's Method)

宝玉 argues that the leak's value for *learning* is limited if you just skim the code. Most people get stuck at "reading" and never reach "understanding." His 4-step method applies to **any** large open-source project:

```
┌──────────────────────────────────────────────────┐
│  Step 1: RUN IT           "Code is dead,         │
│  Don't read. Execute.      running is alive."    │
├──────────────────────────────────────────────────┤
│  Step 2: FOLLOW A THREAD  Pick one feature,      │
│  Trace end-to-end.        not the whole system.  │
├──────────────────────────────────────────────────┤
│  Step 3: MODIFY IT        Secondary development. │
│  Write code, leave marks. Minimize AI help.      │
├──────────────────────────────────────────────────┤
│  Step 4: REBUILD          From imitation to       │
│  Ask "why this design?"   transcendence.         │
└──────────────────────────────────────────────────┘
```

### Step 1: Run It First

> "Code is dead. Running code is alive."

Don't open files and start reading. Clone a runnable fork, get it executing, and observe behavior. Add `console.log`, set breakpoints, trace what happens live. Two reasons:

1. You see **results** — "this function probably does X" becomes certainty after one run
2. You can add **logging and breakpoints** — then analyze specific tool functions in their live execution context

Runnable forks were available at repos like `claude-code-best/claude-code`.

### Step 2: Follow a Thread, Not the Whole Codebase

> "Don't try to read 50,000 lines top to bottom. You'll quit in three days."

Pick **one specific feature** and trace it end-to-end:

- **Agent Loop** → Print all API requests. See the prompt, model response, tool calls, and results in sequence. One conversation gives you a direct understanding of "how an agent decomposes tasks and calls tools."
- **Memory system** → How does it store and retrieve? What triggers a memory save?
- **Tool dispatch** → Input comes in, what routing happens, which tool fires?

Previously, `claude-trace` could do this. Now with the source, you can add logging yourself for much finer detail.

### Step 3: Modify the Code

> "Reading → 'I think I understand.' Writing → actually understanding."

Don't just read. Do **secondary development** on a mature codebase:

- Implement a new slash command (like `/buddy`)
- Add a feature to an existing system (extend memory, create a new tool)
- Research how a subsystem works, then reimplement it yourself

**Critical:** Minimize AI assistance here. The point is to struggle with "why is this module here? Why this interface?" — that friction is where understanding forms. When you build a feature end-to-end, your understanding shifts from "seen it" to "done it."

### Step 4: From Imitation to Transcendence

Once you know the architecture, ask the hardest question: **"Why was it designed this way?"**

Architecture decisions have invisible context:
- Historical baggage and prior iterations
- Team size and skill constraints
- Deadlines and time pressure
- Technical limitations at the time of writing

You see "chose A" but can't see "why not B or C." The best way to understand: **rebuild from scratch**, reference the original, and make your own design decisions. When your hand reaches a point where the original made a choice that now feels "obvious," you've truly understood.

## On the Leak Itself

宝玉's take on why Anthropic won't open-source Claude Code:

| Reason | Detail |
|---|---|
| **Hide implementation hacks** | Internal shortcuts that would invite criticism if public |
| **Anti-distillation** | Logic to prevent model extraction/cloning |
| **User tracking** | Telemetry and user identification markers |
| **Release control** | Open source means you can't hide unfinished features (buddy, buddy mode, Kairos, etc.) |

Anthropic's response was notable — Boris Cherny (VP Eng) credited team culture: *"Mistakes happen. The real question is process, team design, and infrastructure."* No individual blame. The issue was a manual deployment step that should have been automated.

## Part 3: 5 Agent Design Patterns — "Treat AI as an Untrustworthy Contractor" (爱可可's Analysis)

爱可可-爱生活 distilled the leak into a production-grade agent design philosophy: **don't treat AI as a trustworthy contractor — build audit, rollback, and verification mechanisms as if it will fail.**

*Source: [爱可可-爱生活 on Weibo](https://weibo.com/) (2026-04) | [Reddit discussion](https://reddit.com/r/artificial/comments/1s9jprb/the_claude_code_leak_accidentally_published_the)*

### Pattern 1: Skeptical Memory (怀疑式记忆)

Most agent developers default-trust the model's prior outputs. This causes **error compounding** — each bad output becomes "fact" for the next turn, drifting the agent further off course.

Claude Code's fix: treat stored memory as **"hints, not facts."** Before acting on recalled information, verify against the real world first. This is like adding a validation unit in the pipeline — prevents corrupted instructions from polluting the entire state machine.

> The logic: treat memory as "suggestions" not "truth." Before acting, verify against reality.

### Pattern 2: autoDream — Background Memory Consolidation

When idle, the agent runs **background consolidation** — deduplicating, compressing, and cleaning messy observations from the session. Like human sleep: active defragmentation prevents context bloat and information noise from accumulating.

This prevents the #1 killer of long-running agents: **context window filled with garbage** that degrades response quality over time.

### Pattern 3: KAIROS — Guardian Daemon Process

KAIROS gives the agent **background session capability** — it can work autonomously while a daemon constrains its behavior:

- Risk-tiered actions: routine operations proceed automatically, high-risk operations require human approval
- Subscribes to external events (GitHub Webhooks)
- Includes the "dream" consolidation mechanism for long-term memory

### Pattern 4: Constraint-Driven Architecture

The architecture isn't clever design — it's the **inevitable result of constraints**. If you want an agent that works autonomously without losing control, there's only one way to build it:

- Risk classification for all actions
- Human audit gates for high-risk operations
- KAIROS-style guardian processes
- Verification before completion

A Reddit commenter noted: *"Everyone independently converged on this same architecture."* When developers build agents independently, they all arrive at these same patterns — meaning the path to production-grade agents has essentially one road.

### Pattern 5: The Core Philosophy

> **Don't treat AI as a trustworthy contractor. Treat it as an untrustworthy contractor and build a complete system of audit, rollback, and verification around it.**

This reframes the entire agent design space. Instead of pursuing "better AI that doesn't make mistakes," build **systems that assume mistakes and handle them gracefully**.

## Why This Matters

### The Harness Thesis

Raschka's analysis confirms what many suspected: **the model is necessary but not sufficient**. Claude Code's edge comes from the 99% of code that isn't the model call — context management, tool design, caching, memory, and agent orchestration. This is why Cursor, Windsurf, and other competitors with the same underlying models deliver different results. The harness is the product.

### Learning Method for AI-Era Developers

宝玉's 4-step method directly addresses the most common failure mode in the AI era: **"I've seen a lot, but haven't built anything."** Many developers use AI to quickly skim code and architecture, getting a false sense of understanding. The antidote is deliberate friction — run, trace, modify, rebuild.

> "AI code analysis can give you an 'architecture panorama' in seconds. But that understanding is borrowed. It can't survive follow-up questions."

## Deep-Dive Reference Materials

### "Deep Dive Claude Code" — The 25-Chapter Book

[sawzhang/deep-dive-claude-code](https://github.com/sawzhang/deep-dive-claude-code) is the most thorough technical dissection of Claude Code available — a full book modeled after classic tech references like *"Elasticsearch Source Code Analysis"* and *"Understanding the Linux Kernel."*

| Metric | Detail |
|---|---|
| **Chapters** | 25 + 2 appendices |
| **Words** | ~120,000 |
| **Mermaid diagrams** | 101 (architecture, sequence, state machines, flows) |
| **TypeScript code blocks** | 467 with syntax highlighting |
| **License** | CC BY-NC-SA 4.0 |

Covers 10 sections:

```
Foundation (Ch 1-3)    → Overview, initialization, type systems
Core Engine (Ch 4-6)   → Query processing, messaging, streaming
Tool System (Ch 7-9)   → Tool interfaces, built-ins, execution pipelines
Agent System (Ch 10-12)→ Agent models, fork/resume, skills
Security (Ch 13-14)    → Permission architecture, shell safety
MCP Protocol (Ch 15-16)→ Transport layers, authentication
State (Ch 17-18)       → Store management, session compression
Terminal UI (Ch 19-20) → React+Ink rendering, REPL
Engineering (Ch 21-23) → Optimization, testing, build systems
Philosophy (Ch 24-25)  → Design patterns, engineering principles
```

Available as online reading, mdBook build, or PDF export.

### Claude Code as "Agent Operating System" (默庵's Analysis)

默庵 frames Claude Code not as a coding tool but as a full **Agent Operating System** — with a platform entry layer, composable prompt system, managed tool pipeline, specialized agent roles, and four extension mechanisms (Skills, Plugins, Hooks, MCP).

The [tvytlx/claude-code-deep-dive](https://github.com/tvytlx/claude-code-deep-dive) repo contains the analysis report (PDF) plus a minimal teaching agent implementation in Python that strips the architecture down to its essentials — useful for understanding the core patterns without 500K lines of TypeScript.

**5 actionable takeaways for agent builders:**

1. **Decompose the system prompt** into modular, composable pieces — don't put everything in one giant prompt
2. **Wrap tool calls** with validation and permission management — not raw function calls
3. **Package high-frequency tasks** into standardized Skills
4. **Spell out in the prompt** what NOT to do — explicit constraints prevent drift
5. **Add a standalone verification step** after every critical task completion

> "These methods don't need to be perfect from day one. Add one layer at a time — each layer makes the agent more stable."

## Links

- **Raschka's full analysis:** [Claude Code's Real Secret Sauce](https://sebastianraschka.com/blog/2026/claude-code-secret-sauce.html)
- **Latent.Space coverage:** [The Claude Code Source Leak](https://www.latent.space/p/ainews-the-claude-code-source-leak)
- **Deep Dive book (25 chapters):** [sawzhang/deep-dive-claude-code](https://github.com/sawzhang/deep-dive-claude-code)
- **Agent OS analysis + teaching impl:** [tvytlx/claude-code-deep-dive](https://github.com/tvytlx/claude-code-deep-dive)
- **Reverse-engineering repo:** [ComeOnOliver/claude-code-analysis](https://github.com/ComeOnOliver/claude-code-analysis)
- **Runnable fork:** [beita6969/claude-code](https://github.com/beita6969/claude-code)
- **Learn by rebuilding:** [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) — nano Claude Code agent built from scratch
