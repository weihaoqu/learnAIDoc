---
title: "Harness Engineering — The Real Bottleneck Isn't the Model"
date: 2026-03-22
category: Claude Code
tags: [harness-engineering, agents, claude-code, reliability, context-engineering, middleware, subagents, architecture]
related: ["Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure", "Claude Code: Agent Teams vs Subagents", "Claude Code Hooks", "Claude Code Tips & Context Engineering — From 45 Tips to Six-Layer Architecture"]
icon: "🏇"
image: "/assets/images/harness-engineering-agents.png"
---

If 2025 was the year of the agent, 2026 is the year of the **harness**. The hottest concept in AI agent development right now: the reliability bottleneck of AI agents isn't the model — it's the system *around* the model. Harness engineering is the discipline of designing environments, constraints, and feedback loops that make agents reliably useful. The metaphor: the model is the engine, but without a steering wheel and brakes, you can't reach the destination.

*Source: [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | [Anthropic: Harness Design for Long-Running Apps](https://www.anthropic.com/engineering/harness-design-long-running-apps) | [HumanLayer: Skill Issue — Harness Engineering](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents) | [learn-claude-code (30K+ stars)](https://github.com/shareAI-lab/learn-claude-code) | [NxCode: Complete Guide](https://www.nxcode.io/resources/news/harness-engineering-complete-guide-ai-agent-codex-2026)*

## What Is LangChain?

[LangChain](https://www.langchain.com/) is one of the most popular open-source frameworks for building applications with LLMs. Think of it as a toolkit that connects language models to real-world tools — databases, APIs, file systems, code interpreters. It provides the plumbing: chains (sequential steps), agents (autonomous decision-makers), memory (conversation state), and tools (external capabilities). If Claude is the brain, LangChain is the skeleton and nervous system that lets it actually *do* things.

Why it matters here: LangChain builds and maintains their own **coding agent** — an AI that writes, runs, and debugs code autonomously. They benchmark it on **Terminal Bench**, a standardized test suite for coding agents. Their result became the poster child for harness engineering.

## The Counterintuitive Evidence

LangChain's Coding Agent on Terminal Bench — **same model**, only harness optimizations — went from Top 30+ to **Top 5**:

| Harness Optimization | Impact |
|---------------------|--------|
| System prompt optimization | 85% of performance gain |
| Tool configuration optimization | 90% |
| Middleware hooks | 95% |

They didn't upgrade the model. They didn't fine-tune anything. They optimized three things around the model: (1) how they instructed it via system prompts, (2) which tools they exposed and how, and (3) automated middleware that caught errors before they compounded. The model was identical — only the harness changed.

This challenges a deeply-held assumption in AI development: that better results require better models. Often, they just require better harnesses.

## Agent = Model + Harness

```
┌─────────────────────┐     ┌──────────────────────┐
│   Model (Engine)    │     │ Harness (Steering +  │
│                     │     │        Brakes)        │
│ • Powerful          │     │                      │
│   intelligence      │     │ • System prompts     │
│ • Fast reasoning    │     │ • Tool constraints   │
│ • Doesn't know      │     │ • Verification loops │
│   where to go       │     │                      │
└────────┬────────────┘     └──────────┬───────────┘
         │                             │
         └──────────┐  ┌───────────────┘
                    ▼  ▼
              ┌────────────┐
              │   Agent    │
              └────────────┘

"The best engine, without steering and brakes,
 can't get anywhere useful."
```

## Context Engineering vs Harness Engineering

These are related but distinct disciplines:

| Dimension | Context Engineering | Harness Engineering |
|-----------|-------------------|-------------------|
| **Focus** | What to show the agent | How to constrain & verify the agent |
| **Concern** | Context window management | Prevention / measurement / repair |
| **Methods** | Information filtering & timing | Architectural constraints + verification loops |
| **Scope** | Single conversation | Across all sessions |
| **Goal** | Right info at right time | Reliability at scale |
| **Metaphor** | Choosing what the horse sees | Building the reins, saddle, and fences |

Context engineering is a *subset* of harness engineering — it's one of six pillars.

## The Six Pillars

### Pillar 1: Context Architecture — Less Is More

Agent performance vs. context utilization follows an **inverted U-curve**:

```
Agent
Performance
    │
    │        ╭──╮
    │      ╭╯    ╰╮
    │    ╭╯        ╰╮
    │  ╭╯            ╰╮
    │╭╯                ╰╮
    │╯                    ╰───
    └─────────────────────────
    10%  30%  40%  60%  80%
         Context Utilization

    Sweet spot: ~30-50%
    After 60%: sharp decline
```

The key: don't give the agent an encyclopedia. Load context **progressively** — only what's needed for the current task. Anthropic's Skills system embodies this: domain knowledge loads on demand, not upfront.

### Pillar 2: Architectural Constraints — Code Rules > Prompt Suggestions

| Prompt Rules (Suggestions) | Coded Constraints (Enforcement) |
|---------------------------|-------------------------------|
| Model may or may not follow | Linter runs automatically |
| Must repeat every session | Enforced across all sessions |
| Vercel found: too many tools → confusion | Remove 80% of tools → faster, more reliable |

**Counterintuitive insight:** constraining the solution space *increases* output quality. Leading teams use deterministic tools (linters, hooks, type-checkers) for mechanical enforcement, not prompt suggestions the model can ignore.

### Pillar 3: Reasoning Phases — Match Intelligence to Stage

Not every phase needs maximum reasoning. The optimal pattern:

| Phase | Reasoning Level | Why |
|-------|----------------|-----|
| 1. Planning | **Maximum** | Architecture decisions have cascading consequences |
| 2. Execution | **High** (not max) | Implementation follows the plan; save tokens |
| 3. Verification | **Maximum** | Catching errors requires the same rigor as planning |
| 4. Delivery | Standard | Packaging and cleanup |

Common failure: agents get stuck in death loops — editing the same file repeatedly without solving the problem. The fix: a middleware hook intercepts the agent before exit, pulling verification back to maximum reasoning to catch errors before delivery.

### Pillar 4: Subagents as Context Firewalls

Don't think of subagents as "helpers" — think of them as **context firewalls**:

```
         ┌─────────────┐
         │ Parent Agent │
         └──────┬──────┘
           ┌────┴────┐
     ┌─────┴──┐  ┌───┴─────┐
     │Child A  │  │ Child B │
     └────┬────┘  └────┬────┘
    ┌─────┴──┐    ┌────┴─────┐
    │Tool     │    │Intermediate│
    │Calls    │    │Products    │
    │(isolated)│   │(isolated)  │
    └─────────┘    └───────────┘

    Only FINAL RESULTS flow up to parent.
    Intermediate noise stays contained.
```

This prevents context pollution: tool calls, debugging traces, and intermediate outputs from child agents never enter the parent's context window.

### Pillar 5: Entropy Governance — Self-Maintaining Loops

The longer an agent runs, the more its environment drifts from its assumptions. Entropy governance means **documents that serve the agent should be maintained by the agent**:

```
         ┌──────────┐
    ┌────│ Outdated  │
    │    │   Docs    │
    │    └──────────┘
    │         ┌──────────┐
    ├─────────│Architecture│
    │         │  Drift    │
    │         └──────────┘
    ▼
┌──────────┐       ┌──────────┐
│ Document │◄──────│ Knowledge│
│ Curation │       │   Base   │
│  Agent   │       └──────────┘
└──────────┘       ┌──────────┐
    │    ├─────────│ Codebase │
    │    │         └──────────┘
    │    │    ┌──────────┐
    ├────┼────│ Auto     │
    │    │    │ Repair   │
    │    │    └──────────┘
    │    └────┐
    │    ┌────┴─────┐
    └────│Continuous │
         │ Scanning  │
         └───────────┘
```

### Pillar 6: Modular Middleware — Removable by Design

The best harness architecture is a **middleware stack** — modular layers that can be added or removed:

| Layer | Function | Removable? |
|-------|----------|------------|
| 1. Agent Core | Core reasoning | No |
| 2. Linter Middleware | Code quality enforcement | When model learns conventions |
| 3. Verification Middleware | Test execution, output validation | When model becomes self-verifying |
| 4. Edit Tracking Middleware | Track all file modifications | When model tracks reliably |
| 5. Safety Guards | Prevent destructive operations | Possibly never |

LangChain's middleware architecture is the best current reference. Each layer is designed to be **removable as models evolve** — today's harness compensates for today's model weaknesses, but tomorrow's model may not need the same guardrails.

## Practical Principle

> **Only invest in harness for errors the agent has actually made.**

Don't pre-engineer for hypothetical failures. Watch your agent work, identify real failure patterns, then build harness components that prevent those specific failures from recurring. Every harness addition should trace back to an observed error.

## Learn It Hands-On: learn-claude-code

[learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) (30K+ stars) is the best hands-on tutorial for harness engineering. It teaches all six pillars through **12 progressive lessons**, each adding exactly one mechanism:

| Step | Mechanism | Pillar It Teaches |
|------|-----------|-------------------|
| s01 | Agent Loop | Foundation |
| s02 | Tool Use | Architectural Constraints |
| s03 | TodoWrite (Planning) | Reasoning Phases |
| s04 | Subagents | Context Firewalls |
| s05 | Skills (on-demand knowledge) | Context Architecture |
| s06 | Context Compact | Context Architecture |
| s07 | File-based Tasks | Entropy Governance |
| s08 | Background Tasks | Modular Middleware |
| s09 | Agent Teams (JSONL mailboxes) | Modular Middleware |
| s10 | Team Protocols (FSM) | Modular Middleware |
| s11 | Autonomous Agents | Entropy Governance |
| s12 | Worktree Isolation | Context Firewalls |

**How to start:**
- **Interactive web** (no login): [learn.shareai.run](https://learn.shareai.run) — timelines, visualizations, step-by-step code walkthrough
- **Local**: `git clone github.com/shareAI-lab/learn-claude-code`, add your Anthropic API key to `.env`, run `python agents/s01_agent_loop.py`

The core design principle: **each step only adds one new capability, the core loop never changes**. By step 12, you've built a full multi-agent system with isolation, persistence, and self-healing — and you understand every layer because you added them one at a time.

## The Three-Agent Harness: Planner → Generator → Evaluator

Anthropic's engineering blog describes a full **three-agent scaffold** that ran autonomously for hours, producing production-quality frontend apps. The core insight, as analyzed by 爱可可-爱生活: Anthropic engineers borrowed from **GANs (Generative Adversarial Networks)** — one Claude generates, another Claude critiques. Don't let the same model be both athlete and referee.

*Additional source: [欧巴聊AI on Weibo](https://weibo.com/) (2026-03) | [爱可可-爱生活 on Weibo](https://weibo.com/) (2026-03-29) | [Anthropic: Harness Design for Long-Running Apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)*

### Why Multi-Claude? Two Stubborn Problems

Claude has two failure modes during long coding sessions:

1. **Context anxiety** — As the context window fills up, Claude starts cutting corners, rushing to finish, delivering half-baked results
2. **Self-review blindness** — Claude can't objectively evaluate its own code. Let it self-review and it always finds "looks good," even when the code is broken

The GAN-inspired fix: **separate the roles structurally**, not with prompts.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Planner    │────▶│  Generator   │────▶│  Evaluator   │
│  (规划者)     │     │  (生成者)     │◀────│  (评估者)     │
│              │     │              │feedback│             │
│ One sentence │     │ Writes code  │     │ Playwright   │
│ → full PRD   │     │ in chunks    │     │ MCP: clicks, │
│ with specs   │     │ with review  │     │ drags, tests │
└──────────────┘     │ checkpoints  │     │ like a human │
                     └──────────────┘     └──────────────┘
```

| Agent | Role | Key Detail |
|-------|------|-----------|
| **Planner** | Scope expander | From a one-sentence prompt, generates a detailed PRD covering animation systems, sound effects, AI-assisted design docs — prevents "forgot to build X" downstream |
| **Generator** | Code producer | Writes code in chunks. Before continuing, submits each chunk to the evaluator — like signing a detailed contract with a reviewer before proceeding |
| **Evaluator** | Quality gate | Equipped with **Playwright MCP** — can click buttons, drag elements, test UI in a real browser. Not just reading code, but *using* the output like a real person |

The evaluator scores across **4 dimensions**: design quality, originality, craftsmanship, and functionality. This quantitative evaluation breaks through AI's tendency toward mediocre, "flat" design.

### Real Example: Digital Audio Workstation

Using a 3-agent scaffold with this pattern, an AI team built a complete **browser-based DAW (Digital Audio Workstation)** in ~4 hours for $124. The final product could compose, edit, mix audio, and even use AI to help write melodies and rhythms. A single agent couldn't do this — but with the generator/evaluator loop plus a coordinator, the system produced production-quality output.

In earlier frontend experiments, the evaluator wrote 4 evaluation criteria (design quality, originality, craftsmanship, functionality) and scored pages directly. One run on a Dutch art museum website, after 10 iterations and 15 refinement rounds, the AI scrapped all previous approaches and created a 3D spatial experience with CSS perspective — a creative leap that single-pass generation would never produce.

### Benchmark: Single Claude vs Full Harness (Game Dev)

A head-to-head comparison on the same game development task:

| | Single Claude | Full Harness (3 agents) |
|---|---|---|
| **Time** | 20 minutes | 6 hours |
| **Cost** | $9 | $200 |
| **Core gameplay** | Broken — controls unresponsive | Fully playable |
| **Bonus features** | None | AI-assisted card design tool |
| **Quality** | Unusable | Shippable |

The single Claude was faster and cheaper but produced broken output. The harness was 22x more expensive but actually worked. As one commenter put it: *"Selling shovels tells you the way to solve shovel problems is to buy more shovels."* Fair criticism — but the benchmark speaks for itself.

## When the Model Upgrades, Re-Evaluate the Harness

> **Every harness component compensates for current model weaknesses. When the model upgrades, re-evaluate which pieces are still useful.**

After Opus 4.6 shipped, the author removed sprint-based segmentation ("reset context between sprints") and reduced evaluator overhead — the new model was strong enough that those guardrails became unnecessary friction. As the article honestly notes: as models get stronger, some harness components become unnecessary overhead and should be dropped timely.

### The Evaluator Judgment

One key heuristic worth remembering:

> **Whether the evaluator has value depends on whether the task exceeds what a single model can reliably complete alone.** Within the model's boundary, the evaluator is waste. At the boundary and beyond, it's the critical defense line.

The design space doesn't shrink as models improve — it **migrates**. Intentional harness design means only keeping components that add value, and continuously finding the next valuable combination. This is what AI engineers actually do: not just prompt engineering, but **discovering the right harness for the right model at the right time**.

## Awesome Harness Engineering — Curated Reading List

[walkinglabs/awesome-harness-engineering](https://github.com/walkinglabs/awesome-harness-engineering) (1.1K stars) is the best curated collection of harness engineering resources — papers, tools, benchmarks, and reference implementations organized into 8 categories:

| Category | Count | Highlights |
|---|---|---|
| **Foundations** | 8 | OpenAI Codex field report, Anthropic's harness design article, LangChain's "agent = model + harness" |
| **Context, Memory & Working State** | 7 | Context engineering patterns, memory architectures |
| **Constraints & Guardrails** | 8 | Safe autonomy, permission models, tool restrictions |
| **Specs & Agent Files** | 6 | AGENTS.md standard, agent.md, repo-local instructions |
| **Evals & Observability** | 10 | Evaluation frameworks, tracing, debugging agent behavior |
| **Benchmarks** | 38 | SWE-bench, WebArena, OSWorld, and 35 more |
| **Runtimes & Implementations** | 8 | SWE-agent, Claude Agent SDK, reference harnesses |

Scope rule: only includes resources that address **harness design, context management, evaluation, runtime control, or reliability-critical primitives** — not generic agent tooling.

## OpenHarness (oh) — Open-Source Agent Harness in Python

[HKUDS/OpenHarness](https://github.com/HKUDS/OpenHarness) from HKU's Data Intelligence Lab is an open-source Python implementation of the agent harness pattern — essentially a **research-friendly reimplementation** of Claude Code's architecture. Hit 1.9K stars in 2 days.

```bash
# One-command install
curl -fsSL https://raw.githubusercontent.com/HKUDS/OpenHarness/main/scripts/install.sh | bash
oh  # Launch
```

### 10 Subsystems

| Subsystem | What It Does |
|---|---|
| **Engine** | Agent loop with streaming, tool-call cycles, retry logic |
| **Tools** | 43+ built-in (file I/O, shell, search, web, notebooks) |
| **Skills** | On-demand knowledge from markdown files |
| **Plugins** | Extension ecosystem (commands, hooks, agents, MCP) |
| **Permissions** | Multi-level safety modes with path/command rules |
| **Hooks** | PreToolUse/PostToolUse lifecycle events |
| **Commands** | 54 CLI commands for workflow control |
| **MCP** | Model Context Protocol client integration |
| **Memory** | Persistent cross-session storage + auto-compression |
| **Tasks** | Background task lifecycle management |

Works with Anthropic, OpenAI, DeepSeek, Moonshot/Kimi, Ollama, and GitHub Copilot. Python 3.10+ required.

**Why it matters:** Turns Claude Code's architecture from a black box into a white box. You can read every line, modify every subsystem, and experiment with harness design without reverse-engineering TypeScript.

## Key Takeaway

> **Agent的可靠性瓶颈，不在模型，在模型周围的系统。**
> The reliability bottleneck of agents isn't the model — it's the system around the model.

Without steering and brakes, even the most powerful engine can't reach its destination.
