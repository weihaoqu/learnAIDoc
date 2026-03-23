---
title: "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure"
date: 2026-03-22
category: Claude Code
tags: [claude-code, context-management, claude-md, cost-control, citadel, planning, best-practices]
related: ["Claude Code Tips & Context Engineering — From 45 Tips to Six-Layer Architecture", "Claude Code: Isolate Heavy Tasks with context: fork", "Harness Engineering — The Real Bottleneck Isn't the Model"]
icon: "🏗️"
image: "/assets/images/claude-code-context-claudemd-practices.png"
---

A practical guide to the two biggest Claude Code pain points: **context window management** and **CLAUDE.md bloat**. Draws from a widely-shared Chinese-language analysis by 爱可可-爱生活, the open-source Citadel orchestration framework, and community discussions on Reddit about what happens when you stop adding rules and start building infrastructure instead.

*Source: [Claude Code Best Practice (shanraisshan)](https://github.com/shanraisshan/claude-code-best-practice) | [Citadel — Agent Orchestration (SethGammon)](https://github.com/SethGammon/Citadel) | [Reddit: What happens when you stop adding rules](https://reddit.com/r/ClaudeAI/comments/1rz2oo3/what_happens_when_you_stop_adding_rules_to) | [claude-md-management plugin](https://github.com/anthropics/claude-code-plugins)*

## Context Management Is the Core Battlefield

The original article's opening line: **"上下文管理是核心战场"** — context management is the core battlefield. Once your context window hits ~50% capacity, Claude starts compressing earlier messages, and quality drops. The key insight:

> The smaller each task, the more likely it finishes within 50% context. The smaller the task, the more stable Claude is.

```
┌─────────────────────────────────────────────┐
│           Context Window (200K)              │
│                                             │
│  ┌─────────┐  Sweet spot: each task         │
│  │ Task A  │  completes in <50% context     │
│  └─────────┘                                │
│  ┌─────────┐                                │
│  │ Task B  │  After 50%: compression kicks  │
│  └─────────┘  in, Claude loses earlier info │
│  ┌─────────────────────────────────────┐    │
│  │ Task C (too large)         ⚠️ RISK  │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### Five Rules from the Trenches

| Rule | Why |
|------|-----|
| **Always start in plan mode** | Let Claude understand what to do before it touches code. Finish one task, then commit — don't batch |
| **Use iTerm, not IDE terminals** | IDE built-in terminals crash more easily with heavy Claude Code sessions |
| **Voice input multiplies efficiency** | Dictating context is 2-3× faster than typing; great for initial specs |
| **Use git worktrees** | Handle multiple branches simultaneously without context-switching |
| **Run `compact` manually at ~50%** | Don't wait for auto-compression; take control of what gets kept |

## The Three-Role Architecture

The article describes Claude Code's architecture as three distinct roles working together:

```
┌──────────────────────────────────────────────────┐
│                Claude Code Architecture           │
├──────────────┬──────────────┬────────────────────┤
│   Commands   │    Agents    │      Skills        │
│  (Entry &    │ (Orchestrate │  (Domain           │
│  Interaction)│  & Route)    │  Knowledge)        │
├──────────────┼──────────────┼────────────────────┤
│ CLI input    │ Subagents    │ Preloaded specs    │
│ Slash cmds   │ Task routing │ Workflows          │
│ User prompts │ Parallel ops │ Best practices     │
└──────────────┴──────────────┴────────────────────┘
         ↓              ↓              ↓
    "What to do"   "How to route"  "What to know"
```

This is a **progressive disclosure design** — Claude loads domain knowledge only when needed, avoiding context overload from the start.

## Debugging: Observe, Don't Guess

Two underrated debugging techniques from the article:

1. **Watch the terminal as a log observer** — Run Claude's background task output in a visible terminal. Watching the raw flow reveals patterns you'd miss by just reading the final answer.

2. **Use MCP to connect Claude to your browser** — Instead of copy-pasting error messages, let Claude read browser console output directly. Much more efficient than the "copy → paste → describe" loop.

## The CLAUDE.md Bloat Problem

The community consensus: **bloated CLAUDE.md files are a rite of passage**. Everyone's first instinct is to add more rules. The result?

- Claude starts ignoring rules because there are too many
- Cost per session increases (more prompt tokens loaded every time)
- Rules contradict each other
- Adding "don't do X" rules creates a negative instruction spiral

### The Solution: Infrastructure, Not More Rules

The Reddit thread captures this insight perfectly: the answer isn't more rules — it's **building the right infrastructure**.

| Instead of... | Build this... |
|---------------|---------------|
| "Always run tests before committing" | A pre-commit hook that runs tests automatically |
| "Use the right model for simple tasks" | An agent layer that routes by complexity |
| "Don't exceed budget" | Budget enforcement with automatic model downgrade |
| "Follow our coding style" | A linter config that Claude reads and respects |
| "Check these files before editing" | Skills that preload relevant context |

### Practical CLAUDE.md Guidelines

| Guideline | Detail |
|-----------|--------|
| **Keep it under 200 lines** | For each line, ask: "Would removing this cause Claude to make mistakes?" If not, cut it |
| **Use progressive disclosure** | Put domain-specific knowledge in skills, not CLAUDE.md |
| **Use sub-folder CLAUDE.md files** | `/frontend/CLAUDE.md`, `/backend/CLAUDE.md` for scoped instructions |
| **Audit regularly** | Use the `claude-md-management` plugin (76,000+ installs) to audit quality |
| **Treat it like code** | Review it, prune it, test changes by observing behavior shifts |

## Cost Control: The Agent Layer Approach

The article highlights a real-world example: someone burned $15 in 8 minutes because they had no cost controls. Adding "don't use Opus for this task" as a rule doesn't work — Claude has 30+ model selection rules and ignores them.

The effective approach is an **agent layer** that:

```
User Request
    ↓
┌─────────────────────┐
│   Complexity Router  │
│                     │
│  Simple? → Haiku    │
│  Medium? → Sonnet   │
│  Complex? → Opus    │
│                     │
│  Budget remaining?  │
│  Yes → proceed      │
│  No  → downgrade    │
└─────────────────────┘
    ↓
Execution with enforced budget
```

This moves cost control from "prompt suggestions" to "infrastructure decisions."

## Citadel: A Full Implementation

[Citadel](https://github.com/SethGammon/Citadel) by Seth Gammon is an open-source framework that implements these ideas as a complete system:

| Tier | Role | When to use |
|------|------|-------------|
| **Skills** | Domain experts | Single-task, specific knowledge |
| **Marshal** | Session coordinator | Multi-step within one session |
| **Archon** | Autonomous strategist | Cross-session campaigns |
| **Fleet** | Parallel agents | Independent tasks in isolated worktrees |

Key features: campaign persistence across sessions, parallel agent coordination with discovery sharing, lifecycle hooks for quality enforcement, and a universal `/do` router that classifies intent and dispatches to the cheapest capable tier.

## Key Takeaway

The article's closing line sums it up: using AI coding tools well isn't about finding the perfect configuration — it's about **understanding how the tool works, then building systems that flow with it**.
