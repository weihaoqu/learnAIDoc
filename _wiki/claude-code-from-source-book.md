---
title: "Claude Code from Source — The Architecture Book That Treats Claude Code Like an OS"
date: 2026-04-13
category: Claude Code Engineering
redirect_from:
  - "/wiki/claude code/claude-code-from-source-book/"
tags: [claude-code, architecture, book, source-analysis, agent-loop, tools, multi-agent, open-source, patterns]
related: ["Claude Code Source Analysis — What Makes It Work & How to Actually Learn From It", "CC Unpacked — Visual Guide to Claude Code's Internals", "Claude Code Cheat Sheet, Everything-Claude-Code & Claude How-To — Complete Reference Kit"]
icon: "📕"
image: "/assets/images/claude-code-from-source-book.png"
---

When Claude Code's source leaked via an npm source map in March 2026, most people skimmed for secrets. **Alejandro Balderas** did something better — he deployed 36 AI agents across 6 hours to reverse-engineer the architecture into an 18-chapter book. No proprietary code, only original pseudocode illustrating patterns. The result is a free, structured guide to how the most widely used AI coding agent actually works — and how to apply those patterns to your own systems.

*Source: [claude-code-from-source.com](https://claude-code-from-source.com/) | [GitHub](https://github.com/alejandrobalderas/claude-code-from-source) (1.3k stars) | [Medium Analysis](https://medium.com/data-science-collective/everyone-analyzed-claude-codes-features-nobody-analyzed-its-architecture-1173470ab822)*

## The 18 Chapters (7 Parts)

| Part | Chapters | What You Learn |
|------|----------|----------------|
| **I: Foundations** | 1-4 | Agent architecture, bootstrap pipeline, two-tier state, API layer |
| **II: Core Loop** | 5-7 | The agent loop (~1,700 lines), tool system, concurrent execution |
| **III: Multi-Agent** | 8-10 | Sub-agents, fork agents, prompt cache, task coordination, swarms |
| **IV: Persistence** | 11-12 | Memory (3 levels), skills, hooks (27 events) |
| **V: Interface** | 13-14 | Terminal UI (React-based), input handling |
| **VI: Connectivity** | 15-16 | MCP protocol, remote/cloud execution |
| **VII: Performance** | 17-18 | Token optimization, latency, epilogue |

## 6 Core Abstractions Discovered

```
┌─────────────────────────────────────────────────┐
│              CLAUDE CODE ARCHITECTURE            │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Query   │  │  Tool    │  │  Tasks   │      │
│  │  Loop    │→ │  System  │→ │ (agents) │      │
│  │ (1700 ln)│  │ (self-   │  │ state    │      │
│  │ async gen│  │ describing│  │ machine  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  State   │  │  Memory  │  │  Hooks   │      │
│  │ (2-tier) │  │ (3-level)│  │ (27 evts)│      │
│  │ infra +  │  │ project/ │  │ 4 exec   │      │
│  │ UI store │  │ user/team│  │ types    │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

| Abstraction | Key Insight |
|-------------|-------------|
| **Query Loop** | Async generator with backpressure — streams responses, collects tool calls, executes, loops |
| **Tool System** | Tools declare their own concurrency safety — no god-object orchestrator |
| **Tasks** | Sub-agents as state machines: pending → running → completed/failed/killed |
| **State** | Two-tier: mutable infra singleton (~80 fields) + reactive UI store (34 lines) |
| **Memory** | Three levels: project, user, team — with 200-line cap and silent truncation |
| **Hooks** | 27 lifecycle events across 4 execution types |

## Surprising Hidden Details

| Discovery | Implication |
|-----------|-------------|
| 200-line memory cap with **silent truncation** | Your CLAUDE.md can be ignored if too long |
| Auto-compaction destroys context after ~167K tokens | Long sessions lose early context silently |
| 2,000-line file read ceiling | Large files are only partially read |
| Silent model downgrade (Opus → Sonnet) after server errors | Quality drops without notification |
| KAIROS: internal continuous operation system | Claude Code behaves like a team, not a single assistant |

## How It Was Made

36 AI agents, 4 phases, ~6 hours total:

1. **Exploration** (6 agents) — examined ~2,000 TypeScript files
2. **Analysis** (12 agents) — produced 494KB of documentation
3. **Writing** (15 agents) — authored narrative chapters from scratch
4. **Review** (3 reviewers + 3 revision agents) — editorial polish

Zero proprietary code in the final book — all pseudocode is original.

## How LearnAI Team Could Use This

- **Software architecture course material** — Each chapter's "Apply This" section extracts 5 transferable patterns (generator loops, self-describing tools, permission enums). Perfect for CS architecture courses.
- **Agent development reference** — Students building their own AI agents can follow the same patterns Claude Code uses: the agent loop, tool registration, sub-agent spawning.
- **Research on AI tool design** — The book reveals real engineering tradeoffs (state management, context limits, performance) that are relevant to program analysis and formal verification research.
- **Understanding your own tools** — If the team uses Claude Code daily, knowing its hidden limits (memory truncation, context compaction, model downgrades) prevents mysterious failures.

## Real-World Use Cases

1. **Building custom agents** — Engineers use the book's patterns (async generator loop, self-describing tools) to build their own coding agents without starting from scratch.
2. **Debugging Claude Code** — Understanding the 167K compaction threshold and 200-line memory cap helps developers debug unexpected behavior.
3. **Architecture interviews** — The 6 core abstractions serve as a study guide for systems design interviews focused on AI infrastructure.
4. **Open-source agent projects** — Projects like Hermes Agent and OpenClaw can benchmark their architecture against Claude Code's patterns.

## vs. Existing Wiki Entries

| Entry | Focus |
|-------|-------|
| **This (from Source book)** | Full 18-chapter structured book, transferable patterns, hidden limits |
| [Claude Code Source Analysis](../wiki/claude-code-source-analysis-learning/) | Broader source leak analysis, learning approaches |
| [CCUnpacked](../wiki/ccunpacked-claude-code-internals/) | Internals explained, community deep-dives |
