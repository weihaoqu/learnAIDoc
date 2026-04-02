---
title: "Claude Code Source Analysis — What Makes It Work & How to Actually Learn From It"
date: 2026-04-01
category: Claude Code
tags: [claude-code, architecture, source-code, harness, prompt-cache, subagents, learning-methodology, reverse-engineering, open-source]
related: ["CC Unpacked — Visual Guide to Claude Code's Internals", "Claw Code — Clean-Room Python Rewrite of Claude Code's Agent Harness", "The Five Levels of Claude Code — From Prompting to Orchestration"]
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

## Why This Matters

### The Harness Thesis

Raschka's analysis confirms what many suspected: **the model is necessary but not sufficient**. Claude Code's edge comes from the 99% of code that isn't the model call — context management, tool design, caching, memory, and agent orchestration. This is why Cursor, Windsurf, and other competitors with the same underlying models deliver different results. The harness is the product.

### Learning Method for AI-Era Developers

宝玉's 4-step method directly addresses the most common failure mode in the AI era: **"I've seen a lot, but haven't built anything."** Many developers use AI to quickly skim code and architecture, getting a false sense of understanding. The antidote is deliberate friction — run, trace, modify, rebuild.

> "AI code analysis can give you an 'architecture panorama' in seconds. But that understanding is borrowed. It can't survive follow-up questions."

## Links

- **Raschka's full analysis:** [Claude Code's Real Secret Sauce](https://sebastianraschka.com/blog/2026/claude-code-secret-sauce.html)
- **Latent.Space coverage:** [The Claude Code Source Leak](https://www.latent.space/p/ainews-the-claude-code-source-leak)
- **Reverse-engineering repo:** [ComeOnOliver/claude-code-analysis](https://github.com/ComeOnOliver/claude-code-analysis)
- **Runnable fork:** [beita6969/claude-code](https://github.com/beita6969/claude-code)
- **Learn by rebuilding:** [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) — nano Claude Code agent built from scratch
