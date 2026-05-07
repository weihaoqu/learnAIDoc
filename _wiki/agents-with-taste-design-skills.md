---
title: "Agents with Taste — Encoding Design Judgment as Skill Files"
date: 2026-04-26
category: Skills & Plugins
tags: [design-engineering, skills, ui-design, animations, claude-code, taste, emil-kowalski]
related: ["Taste Skill — Teaching AI Agents Design Taste for Frontend Code", "Awesome DESIGN.md — Install Design Taste Into Your AI Coding Agent", "ui.sh — Tailwind Creator's Design Toolkit for AI Coding Agents", "Addy Osmani's agent-skills — Senior Engineering Practices as SKILL.md Files"]
icon: "🎨"
image: "/assets/images/agents-with-taste-design-skills.png"
---

Emil Kowalski argues that the hardest part of UI quality isn't code — it's aesthetic judgment. His solution: encode design taste into skill files that coding agents can follow. Instead of hoping AI "gets it," you describe the rules explicitly and hand them to your agent. The skill has more than 1,000 GitHub stars and has inspired adjacent projects that package design judgment for AI agents.

*Source: [Agents with Taste (article)](https://emilkowal.ski/ui/agents-with-taste) | [emilkowalski/skill (GitHub)](https://github.com/emilkowalski/skill) | [Emil's X thread](https://x.com/emilkowalski/status/2013613078240198929)*

## The Core Insight

AI agents can write code, but they can't tell if the result *feels* right. The gap isn't technical ability — it's taste. Kowalski's approach: if you know what great feels like, describe the rules, then give them to your agent.

```
Traditional approach:
  Developer → "Make this animation smooth" → Agent guesses → Result looks off

Skill-based approach:
  Designer encodes rules → Agent follows spec → Result matches design intent

  Example rule: "Start from scale(0.95), not scale(0) — elements shouldn't
  vanish completely, mimicking real-world physics where deflated objects
  retain visible form."
```

## What the Skill Encodes

The `emil-design-eng` skill file packages years of design engineering experience into executable rules:

### Animation Decisions

| Context | Easing | Why |
|---------|--------|-----|
| Element entering/exiting viewport | `ease-out` | Quick start, gentle stop |
| On-screen movement | `ease-in-out` | Smooth acceleration and deceleration |
| Hover state changes | `ease` | Natural, subtle feedback |
| Constant motion (loaders) | `linear` | Continuous, predictable |

### Duration Guidelines

| Interaction Type | Duration | Rule |
|-----------------|----------|------|
| Micro-interactions | 100–150ms | Instant feedback |
| Standard UI transitions | 150–250ms | Noticeable but not slow |
| Modals / drawers | 200–300ms | Substantial but not sluggish |
| **Hard limit** | **< 300ms** | UI animations must stay under this |

### Typography Rules
- Body text capped at **65 characters** per line for readability
- Use `tabular-nums` for price/number alignment
- Underlines reserved **exclusively** for links

### Scale Animations
- Start from `scale(0.95)`, never `scale(0)` — objects don't vanish in the real world
- Exit animations: reverse the entrance, slightly faster

## Installation

```bash
# One command for any compatible agent
npx skills add emilkowalski/skill
```

Works with Claude Code, Cursor, Windsurf, Copilot, and any agent that supports the skills protocol.

## Why This Matters Beyond Animation

The broader principle: **any domain expert can encode their judgment as a skill file**. Kowalski did it for UI design, but the pattern applies to:

- **Code review standards** — encode what "clean code" means for your team
- **Writing style** — encode tone, structure, and formatting rules
- **Architecture decisions** — encode when to use which pattern
- **Accessibility** — encode WCAG compliance checks

As shadcn noted: "Design engineering became about animations and slick demos. In reality, it's mostly deciding what *not* to animate." The skill file captures exactly these judgment calls.

## The Ecosystem Effect

Kowalski's skill has inspired others to package their expertise:
- **[design-motion-principles](https://github.com/kylezantos/design-motion-principles)** — Motion audit skill trained on multiple designers (Emil Kowalski, Jakub Krehel, Jhey Tompkins)
- The pattern validates that taste is teachable — not to humans in this case, but to agents

## How LearnAI Team Could Use This

- **Template for encoding expertise** — follow the pattern to create skill files for teaching-specific design judgment
- **Teaching design thinking** — use the skill as a case study in how to decompose aesthetic judgment into rules
- **Improve AI-generated UIs** — install the skill when building web tools to get better default animations and typography

## Real-World Use Cases

- **Frontend teams** — install once, every agent-generated component follows consistent animation rules
- **Design systems** — encode your design system's motion and typography spec as a skill file
- **Solo developers** — get designer-level polish without hiring a designer
- **Course projects** — students learn that "taste" can be decomposed into learnable, explicit rules
