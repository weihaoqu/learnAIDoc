---
title: "Yao Bayesian Decision Skill — Structured Decision-Making for Claude Code"
date: 2026-04-26
category: Skills & Plugins
tags: [decision-making, bayesian, claude-code, skill, reasoning, uncertainty]

icon: "🎯"
image: "/assets/images/yao-bayesian-decision-skill.png"
---

The Yao Bayesian Decision Skill transforms complex, uncertain decisions into structured, iterative judgment processes. Instead of asking AI for a single answer, it guides you through multi-round dialogue where each round updates probability estimates based on new evidence. The output is a bilingual (Chinese/English) Markdown + HTML decision report showing the reasoning trail, judgment changes, and recommended actions.

*Source: [GitHub - yaojingang/yao-open-skills](https://github.com/yaojingang/yao-open-skills)*

## How It Works

```
Incomplete input (your messy, real-world question)
       ↓
Initial assessment (establish weak prior assumptions)
       ↓
Prior selection (pick 3-5 relevant heuristics from 20 judgment principles)
       ↓
  ┌────────────────────┐
  │ Iterative rounds:  │
  │  Ask questions      │ ← Multi-round dialogue
  │  Gather evidence    │
  │  Update estimates   │
  │  Track what changed │
  └────────┬───────────┘
           ↓
Decision readiness check (confidence level assessment)
       ↓
Final report (Markdown + bilingual HTML)
```

The key insight: it doesn't wait for perfect information. It starts from incomplete input, builds weak priors, and iteratively strengthens the judgment through structured questioning — tracking exactly which evidence changed which estimates.

## What Makes It Different

| Traditional AI Decision | Bayesian Skill |
|------------------------|---------------|
| Single prompt → single answer | Multi-round dialogue → evolving judgment |
| Black box reasoning | Evidence attribution (which fact changed which estimate) |
| Assumes complete info | Starts from incomplete input |
| One format | Bilingual Markdown + interactive HTML |
| Static | Iterative refinement with confidence tracking |

## Output Format

The skill generates:
- **Markdown report** — decision process, judgment changes, and action items
- **Bilingual HTML** (Chinese/English) — interactive with sticky navigation, language switching
- **Print-friendly PDF** — exportable from browser
- **Evidence trail** — which round introduced which information and how it shifted the judgment

## Use Cases

The skill is designed for decisions where information is incomplete and risk is non-trivial:

- **Product decisions** — Should we ship this feature this quarter?
- **Growth strategy** — Which market should we enter first?
- **Career choices** — Should I take this job offer?
- **Investment decisions** — Is this startup worth investing in?
- **Personal decisions** — Should I relocate? Buy or rent?
- **Research direction** — Which hypothesis is worth pursuing?

## Installation

```bash
# Add to Claude Code via skills protocol
npx skills add yaojingang/yao-open-skills
```

## How LearnAI Team Could Use This

- **Teaching decision analysis** — the iterative Bayesian framework is itself a pedagogical tool
- **Research planning** — use it to systematically evaluate which research directions to pursue
- **Grant decisions** — structure the "should we apply for this grant?" analysis
- **Student advising** — help students work through career and academic decisions systematically

## Real-World Use Cases

- **Startup founders** — structured pivot vs persist decisions
- **Product managers** — feature prioritization under uncertainty
- **Researchers** — hypothesis selection with explicit evidence tracking
- **Anyone facing a complex decision** — the process forces you to articulate what you know, what you don't, and what would change your mind
