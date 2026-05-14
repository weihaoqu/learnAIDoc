---
title: "Boris Cherny on Claude Code — Origin Story, Product Philosophy & the End of Manual Coding"
date: 2026-05-06
category: Claude Code Engineering
tags: [claude-code, boris-cherny, anthropic, product-philosophy, latent-demand, bitter-lesson, plan-mode, multi-quad, safety, co-work]
related: ["Don't Make Too Many Decisions for AI — Anthropic's 3 Core Development Philosophies", "Claude Code Tips — From the Engineering Trenches", "Claude Code Source Analysis — What Makes It Work & How to Actually Learn From It", "The Five Levels of Claude Code — From Prompting to Orchestration", "Building /review-wiki — A Batch AI Quality Pipeline from Scratch", "Claude Code 101 — Anthropic's Official Onboarding Course"]
icon: "🎙️"
image: "/assets/images/boris-cherny-claude-code-philosophy.png"
---

Boris Cherny, creator of Claude Code at Anthropic, gave a definitive first-person account of how Claude Code went from a two-like internal post to powering 4% of all GitHub commits — and why he believes coding is "largely solved, at least for the kind of programming that I do." This podcast on Lenny's Podcast covers the origin story, Anthropic's overarching thesis (coding → tool use → computer use), five product principles that shaped the tool, practical usage tips, and Anthropic's three-layer safety approach for AI agents.

*Source: [Lenny's Podcast — Head of Claude Code: What happens after coding is solved](https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens) | [Boris's Team Tips (Threads)](https://www.threads.com/@boris_cherny/post/DUMZr4VElyb/) | [How Boris Uses Claude Code](https://howborisusesclaudecode.com/)*

## The Origin Story

Boris joined Anthropic driven by the safety mission. He spent one month prototyping, one month doing post-training research ("you have to understand the layer under the layer"), then built what became Claude Code.

| Timeline | Milestone |
|----------|-----------|
| Summer 2024 | First prototype called "Claud CLI" — gave model a bash tool, it figured out how to check what music he was listening to |
| Internal post | Got **2 likes**. Nobody thought a terminal agent would work. |
| Feb 2025 | External launch — "not immediately a hit," took months for adoption |
| May 2025 | Opus 4 inflection — growth went exponential |
| Nov 2025 | Boris stopped writing code by hand entirely |
| At time of podcast | SemiAnalysis report: 4% of all public GitHub commits (higher for private repos), growth still accelerating |

```
Terminal choice wasn't intentional design — it was practical:
  Solo dev → easiest to build
  ↓
  Model improving too fast → only form factor that could keep up
  ↓
  Accidentally perfect: latent demand (engineers already live here)
```

The terminal stayed because no other interface could keep pace with how quickly the model improved. Every other form factor would have required constant redesign.

## Five Product Principles

### 1. Latent Demand (Most Important)

Watch how users *abuse* your product for things it wasn't designed for — that's where to build next.

| Product | Abuse Signal | Result |
|---------|-------------|--------|
| Facebook Groups | 40% of posts were buying/selling | Facebook Marketplace |
| Facebook Profiles | 60% of non-friend views were opposite-gender | Facebook Dating |
| Claude Code (terminal) | People growing tomatoes, analyzing genomes, analyzing MRIs, recovering wedding photos from corrupted hard drives | Co-work |

**New dimension for AI:** Latent demand *from the model itself*. Instead of boxing the model into workflows, observe what it's trying to do and build support for that. Anthropic calls this being "on distribution."

### 2. The Bitter Lesson

Always bet on the more general model. Rich Sutton's principle applied to product:

- Don't fine-tune when you can use the frontier model
- Scaffolding/orchestration may improve 10-20% — but these gains often get wiped by the next model
- Don't layer strict step-1-step-2-step-3 workflows
- Give the model tools + a goal → let it figure out the steps

### 3. Build for the Model 6 Months Out

The product won't have great PMF today, but when the next model drops, you hit the ground running.

```
Feb 2025 (launch):  Writing ~20% of Boris's code
May 2025:           ~30% of his code
Sonnet 3.5 era:     Model ran 15-30 seconds before going off rails
Opus 4 (May 2025):  First inflection, everyone started using Claude Code
Nov 2025:           Crossed 100% — Boris stopped writing code by hand
Opus 4.6 (current): Runs 10-30 minutes unattended, sometimes hours/days/weeks
```

### 4. Underfund Teams

Put one engineer on a project. Fewer people → forced to use AI → more creative solutions. The constraint drives adoption of the tool.

### 5. Speed

"If you can do something today, do it today." Early Claude Code's only advantage was speed — Boris would fix user feedback within minutes. This created a virtuous cycle: users felt heard → more feedback → faster improvement.

## How Boris Actually Codes Now

- **100% Claude Code since November 2025** — hasn't edited a single line by hand (but still reviews code and maintains human checkpoints for non-prototype work)
- Ships **10-30 PRs per day**, still one of Anthropic's most productive engineers
- **Split across interfaces:** ~1/3 terminal, ~1/3 desktop app, ~1/3 iOS app
- Always has **5+ agents running simultaneously**
- "There's no one right way to use Claude Code — developers are all different"
- CLAUDE.md tip *(from external sources, not this podcast)*: keep it ~100 lines; "Anytime Claude does something incorrectly, add it so it doesn't repeat"

### Three Practical Tips

| Tip | Why |
|-----|-----|
| Use the most capable model (Opus 4.6 + max effort) | Less capable models take MORE tokens for the same task due to correction loops |
| Start in plan mode (~80% of tasks) | Plan mode is just one injected sentence: "please don't write any code yet." After plan looks good, auto-accept edits — it one-shots correctly. |
| Run multiple sessions in parallel (multi-quad) | 3-5 git worktrees, each with its own Claude session. Desktop app makes this easy. |

## Three-Layer Safety Model

```
Layer 3: Real-world behavior
  └── Release early, observe, iterate (why Claude Code and Co-work are "research previews")

Layer 2: Evals
  └── Synthetic lab conditions — "model in a petri dish"

Layer 1: Alignment & Mechanistic Interpretability
  └── Neuron-level monitoring (Chris Olah's work)
  └── Superposition: single neuron → dozen concepts activated together
  └── Can detect deception-related neuron activation
```

At Anthropic, Claude reviews **100% of all pull requests** automatically, with human review after.

## Co-work: Built in 10 Days

Co-work emerged from latent demand — people were using Claude Code in terminals for non-coding tasks. The team tried various approaches for months, then someone said "what if we just take Claude Code and put it in the desktop app?"

- Built entirely with Claude Code in 10 days
- Includes a full virtual machine for sandboxing
- Immediately more popular than Claude Code was at its own launch
- Boris uses it daily: paying parking tickets, project management, responding to emails, canceling subscriptions

## The Printing Press Analogy

Boris's analogy for the current moment (his framing, not established historical consensus):

```
1450s Europe: <1% literacy (scribes only)
  → Gutenberg's printing press
  → 50 years: more printed material than prior 1000 years
  → 200 years: 70% global literacy
  → Renaissance, scientific revolution, everything we have today

2024: <1% can code (engineers only)
  → AI coding agents
  → 1 year: 4% of all commits are AI-written
  → Next few years: everyone can build software
  → ???
```

Historical footnote: Scribes in the 1400s were actually *excited* about the printing press — they hated the tedious copying work and could now focus on art and bookbinding. Boris draws the parallel to engineers who can now focus on design, user feedback, and systems thinking.

## Anthropic's Arc: Coding → Tool Use → Computer Use

From Anthropic's founding, the company has believed in a trajectory: model gets good at coding, then tool use, then computer use. Claude Code, MCP, the desktop app, and Co-work are all products along this arc. Boris emphasizes this isn't just a product roadmap — it's the path through which Anthropic learns about and improves safety at each capability level.

Claude Code was used internally at Anthropic for **4-5 months** before public release specifically to study agent safety. The team wanted to observe how the first broadly-used coding agent behaved in the wild before exposing it externally.

## Productivity & Token Economics

- Anthropic's engineering team grew ~4x since Claude Code launched, but **productivity per engineer increased ~200%** in terms of PRs
- Boris advises: **give engineers as many tokens as possible** — don't optimize cost early
- Some Anthropic engineers now spend hundreds of thousands per month in tokens
- Relative to salary, individual experimentation token cost is low; optimize only after an idea scales
- Unlimited tokens as a company perk is emerging at forward-thinking companies

## On the Future

- **Coding is "largely solved"** for the kind of programming Boris does (with more codebases following over the next few months)
- Next frontier: Claude coming up with ideas (analyzing feedback, proposing bug fixes, filing PRs autonomously)
- Adjacent roles (PM, design, data science) are next
- The "total software engineer" title may be replaced by "builder"
- Within 1-2 years, understanding the code layer below won't matter — like assembly today
- Be a **generalist**: strongest engineers cross PM/design/business boundaries; strongest PMs code; strongest designers code

## Career Advice

Boris's advice for succeeding in this transition:

1. Experiment with tools — be on the bleeding edge, don't be scared
2. Be a generalist more than in the past — cross multiple disciplines
3. On the Claude Code team: everyone codes (PM codes, engineering manager codes, designer codes, finance guy codes, data scientist codes)
4. The people rewarded most will be AI-native AND curious generalists who think about the broader problem, not just the engineering part

---

## How LearnAI Team Could Use This

1. **Adopt the latent demand lens** — monitor how students/faculty abuse AI tools in unexpected ways, then build curricula around those use cases
2. **Build for the model 6 months out** — design course projects assuming the model will be significantly more capable by semester's end
3. **Teach the printing press framing** — helps students contextualize why learning to work *with* AI matters more than learning to code *without* it
4. **Apply underfunding principle** — assign ambitious solo projects where students must leverage AI to deliver, rather than large teams doing manual work

## Real-World Use Cases

- **Engineering teams:** Use plan mode → auto-accept workflow for 1-shotting implementations
- **Non-technical staff:** Co-work for email triage, form filling, subscription management
- **Product managers:** Point Claude Code at feedback channels → it proposes and implements fixes
- **Educators:** The "layer under the layer" principle maps to teaching foundations before tools

## Lightning Round Picks

| Category | Pick |
|----------|------|
| Technical book | *Functional Programming in Scala* — "single best technical book I've ever read" |
| Sci-fi | *Accelerando* by Charles Stross — captures the pace of this moment |
| Sci-fi #2 | *The Wandering Earth* by Liu Cixin — Chinese sci-fi offers different perspective |
| Favorite product | Co-work (Chrome integration) |
| Life motto | "Use common sense" |
| Post-AGI plan | Making miso in rural Japan |
