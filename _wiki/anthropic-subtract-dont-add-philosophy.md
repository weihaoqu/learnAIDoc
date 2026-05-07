---
title: "Don't Make Too Many Decisions for AI — Anthropic's 3 Core Development Philosophies"
date: 2026-04-08
category: Claude Code Engineering
redirect_from:
  - "/wiki/claude code/anthropic-subtract-dont-add-philosophy/"
tags: [claude-code, anthropic, chris-olah, development-philosophy, harness-engineering, skills, context-management, agents, bitter-lesson]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Claude Code Source Analysis — What Makes It Work & How to Actually Learn From It", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Boris Cherny on Claude Code — Origin Story, Product Philosophy & the End of Manual Coding"]
icon: "➖"
image: "/assets/images/anthropic-subtract-dont-add-philosophy.png"
---

Chris Olah (Anthropic co-founder) and engineer Lance Martin published a blog post that inverts everything most developers believe about building AI applications. Their thesis: **as models get stronger, developers should continue subtracting, not adding.** Every layer of "protection," every "helpful" framework, every extra function can become a bottleneck that limits the model's real capabilities.

*Source: [默庵·超级个体 on Weibo](https://weibo.com/) (2026-04) analyzing Chris Olah & Lance Martin's Anthropic blog post | Referenced: ["The Bitter Lesson" by Rich Sutton](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)*

## The Core Thesis

> **"Grown AI" (长出来的 AI) vs "Built AI" (帮出来的 AI)** — The best framework isn't one that tries to help Claude with every decision. It's one that continuously evolves with the model and constantly trims itself.

This sounds counterintuitive. We're trained to think "more layers of protection = better, more functions = better." But in AI applications, **over-developing and over-helping reverse and limit the model's power**. The article repeatedly asks a single question every developer should ask themselves: **"What things can we stop doing?"**

## The 7 Core Insights

### 1. Use Tools Claude Already Knows Well

The first and simplest recommendation: build apps using tools Claude already understands deeply.

**The evidence:** At the end of 2024, Claude 3.5 Sonnet scored **49% on SWE-bench** — top of the field. Its toolkit? Just two tools: **bash** (command-line) and **a text editor**. Claude Code itself is built on these two.

Bash wasn't designed for AI agents. But Claude is extremely familiar with it from training data, so it performs progressively better as models improve. Anthropic observed: Claude will combine general-purpose tools in flexible patterns to solve different problems (Agent Skills, programmatic tool calls, memory tools).

**The principle:** Instead of giving Claude many specialized tools, give it a **few truly versatile general-purpose tools**. A person who's mastered a hammer can solve more problems than one with an unused toolbox of 50 specialty items.

### 2. Ask "What Can We Stop Doing?"

The most illuminating insight. Developers habitually replace Claude's decisions when building Agent frameworks.

**Example:** Every tool call result gets dumped back into Claude's context before the next step. Slow, expensive, often unnecessary.

**Concrete case:** Suppose you want Claude to read a large spreadsheet to analyze one column. Traditional approach:
1. Stuff the entire table into context
2. Claude filters it row by row
3. Maybe add filters at the tool layer

But this misses the root issue. **The framework is trying to make a "compiler decision" for Claude when Claude is better suited for that decision.**

**Solution:** Give Claude a code execution tool, let it write code to call other tools. It decides which results to process, filter, or pass to the next step.

**Result:** On the **BrowseComp** web browsing benchmark, letting Opus 4.6 filter its own tool output increased accuracy from **45.3% → 61.6%** — a 16-point jump from *removing* a safety layer.

### 3. Let It Manage Its Own Context

Another common pattern: stuffing all task instructions into the system prompt. The problem: every extra token consumes Claude's attention budget, wasting context on instructions rarely used.

**Anthropic's approach:** The **Skills mechanism**. Each skill has a short description in the context — like a table of contents. Only when Claude actually needs one does it actively load the full content.

**The analogy:** You don't need to memorize the entire dictionary — you just need to know where the dictionary is and how to flip to it when needed.

### 4. Let It Decide What to Remember

Long-running Agents will overflow the context window. Traditional approach: build an inspection system around the model to manage memory. Anthropic's approach: give Claude simple tools and let it decide what to keep.

**The Pokemon experiment:** Different Claude versions played Pokémon Red:

| Model | Files Created | Pattern |
|---|---|---|
| **Sonnet 3.5** | 31 files in 14,000 steps | Water-account style — recorded everything NPCs said. Two nearly-identical notes about caterpillars. Got stuck in the second castle. |
| **Opus 4.6** | 10 files in 14,000 steps | Organized by purpose into 3 city halls. Focused on key experience and failure lessons. E.g., *"Turn up flute urgency alert"*, *"Use hypnotic hit to kill quickly, don't let them blow you up"*. |

The evolution from "water-account notes" to "tactical notes" is profound. The ability to *decide what to record* separates models that can extract useful signal from experience from models that just record details.

**Benchmark data (BrowseComp):**

| Model | Accuracy |
|---|---|
| Sonnet 4.5 (any compression strategy) | **43%** |
| Opus 4.5 | **68%** |
| Opus 4.6 | **84%** |

Same mechanism, different models, vastly different results.

### 5. Set Boundaries Carefully

Although the theme is "manage Claude less," Anthropic also stresses: **the parts that need managing should still be managed.** Agent frameworks need to set boundaries in three dimensions:

#### Cost Dimension
- Design context structure to maximize caching efficiency
- Claude's API is stateless — every turn re-sends all historical info
- Cached tokens cost only **10%** of normal input
- **Key principles:** put stable content in front, don't switch tools mid-conversation, carefully add tool definitions

#### Safety Dimension
- Turn **high-risk operations into specialized tools**
- `bash` gives great flexibility, but the framework just sees a command string — no way to distinguish risk
- Specialized tools give the framework structured parameters to block, review, or audit

#### The Judgment Criterion

**Is the operation reversible?**

| Operation Type | Approach |
|---|---|
| Reversible (read, local edits) | Let bash handle it |
| Hard to revoke (external API calls, destructive) | Specialized tools with user confirmation, preventing overwrites |

Claude Code's **auto mode** uses a clever alternative: let another Claude review commands for safety. This reduces the need for specialized tools for medium-risk operations, but high-risk ops still need specialized tools.

### 6. Outdated Assumptions Become Performance Bottlenecks

The article's most convincing example, at the end.

**The story:** Anthropic built an Agent for long-period tasks. They found Sonnet 4.5 would **rush to wrap things up when feeling context would fill up** — a kind of "context anxiety." So they added a context reset mechanism to compensate.

**But by Opus 4.5, this anxiety disappeared on its own.** The previous reset logic became **dead code in the framework** — not only useless, but actively dragging the system down.

The article quotes Rich Sutton's classic paper **"The Bitter Lesson"**: *these outdated compensation mechanisms become bottlenecks, limiting Claude's true abilities.*

**The broader truth:** We accumulate many processes, rules, and habits in work and life — they all had reasons at the time. But environments change, capabilities grow, and if you don't periodically clean up outdated "patches," they become obstacles to progress.

### 7. The Anthropic Philosophy: Subtract, Don't Add

> **As models get stronger, developers should continue subtracting.**

This sounds counterintuitive. We're used to "add things" thinking — more protection layers, more functions, more safeguards. But in AI applications, **over-developing and over-helping limit the model's power**.

The best framework is one that can **continuously evolve with the model and trim itself**. Every developer should ask:

> "Which things, at what times, can I stop doing?"

## ASCII Summary: The Two Paradigms

```
┌────────────────────────────────────────┐
│  "Built AI" (帮出来的) — Traditional    │
│                                        │
│  Many specialized tools                │
│  Framework makes most decisions         │
│  Fixed memory/context management        │
│  Long system prompts                    │
│  Rigid safety layers                    │
│                                        │
│  Problem: becomes bottleneck as model  │
│  gets stronger                         │
└────────────────────────────────────────┘

              ↓ evolves into ↓

┌────────────────────────────────────────┐
│  "Grown AI" (长出来的) — Anthropic      │
│                                        │
│  Few general-purpose tools             │
│  Claude makes most decisions            │
│  Skills loaded on-demand                │
│  Minimal system prompts                 │
│  Boundaries only where reversibility    │
│    is at risk                          │
│                                        │
│  Benefit: capability grows with model  │
└────────────────────────────────────────┘
```

## Why This Matters for Harness Engineering

This entry is the **philosophical companion** to [harness engineering](/learnAIDoc/wiki/claude%20code/harness-engineering-agents/). Harness engineering teaches the 6 pillars of reliable agent design. But this entry answers the question the pillars leave open: **as the model improves, which pillars should you remove?**

The answer: all the ones that compensated for weaknesses the model no longer has. Test them periodically. Measure their value. Remove the ones that no longer earn their cost.

## For Your Own Projects

Practical questions to ask about any AI framework you build:

1. **Tool audit** — Could I replace 5 specialized tools with 1 general-purpose tool?
2. **Decision audit** — What decisions am I making for the model that it could make better itself?
3. **Context audit** — What's in my system prompt that's rarely used and could be a Skill instead?
4. **Memory audit** — Am I filtering/managing what the model remembers when I should let it decide?
5. **Boundary audit** — Which safety checks compensate for weaknesses the current model may have outgrown?
6. **Dead code audit** — What compensation mechanisms were added for older models that are no longer needed?
7. **The recurring question** — What can I stop doing?

## Links

- **The Bitter Lesson** — [Rich Sutton](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) (the foundational essay this philosophy builds on)
- **Chris Olah** — [Anthropic co-founder, Transformer Circuits researcher](https://colah.github.io/)
- **Lance Martin** — LangChain/Anthropic engineer
- **BrowseComp benchmark** — Web browsing evaluation for agents
