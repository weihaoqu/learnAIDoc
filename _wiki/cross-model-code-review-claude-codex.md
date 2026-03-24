---
title: "Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs"
date: 2026-03-24
category: Claude Code
tags: [claude-code, codex, code-review, multi-model, ai-coding, testing, bugs]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Claude Code Auto Mode — The Middle Path for Permissions", "Frustration Shifts Upward — How AI Coding Changes What's Hard"]
icon: "🔍"
image: "/assets/images/cross-model-code-review-claude-codex.png"
---

Sterling Crispin shared a brutal discovery: **Claude Opus 4.6 is an excellent programmer, but consistently produces serious bugs that it cannot find no matter how many times it self-reviews.** The solution? Use a completely different model — OpenAI's Codex CLI (GPT 5.4) — to review every submission, with 4+ review passes. The insight that's making developers rethink AI coding workflows: "passing tests" doesn't mean "no bugs" — it means the AI got really good at writing code that passes tests.

*Source: [爱可可-爱生活 Weibo analysis](https://weibo.com) | [Chandler Nguyen: Dual-Wielding AI Coding Tools](https://chandlernguyen.com/blog/2026/03/13/codex-gpt-5-4-vs-claude-code-opus-4-6-dual-wielding-ai-coding-tools/) | [SmartScope: Automating the Claude × Codex Review Loop](https://smartscope.blog/en/blog/claude-code-codex-review-loop-automation-2026/)*

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

## The Harness Engineering Connection

Cross-model review is a harness mechanism. It maps to **Pillar 2 (Architectural Constraints)** — instead of asking the model to follow a "review your own code" prompt (which it can ignore or apply with the same blind spots), you enforce review through a structurally different system. Code enforcement > prompt suggestions.
