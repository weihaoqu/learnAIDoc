---
title: "Agent Framework Explosion — Superpowers, DeerFlow, NOMAD & TradingAgents"
date: 2026-04-01
category: AI for Research
redirect_from:
  - "/wiki/ai research/agent-framework-weekly-hot-four/"
tags: [agents, frameworks, superpowers, deerflow, nomad, trading-agents, github, multi-agent, bytedance, open-source]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Agentic AI Engineer Roadmap 2026 — Eight Pillars from Prompt to Production", "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook", "Claude Code: Agent Teams vs Subagents", "oh-my-claudecode — Multi-AI Orchestration Plugin for Claude Code"]
icon: "🏆"
image: "/assets/images/agent-framework-weekly-hot-four.png"
---

The week of March 20-26, 2026 saw an unusual concentration of new AI agent frameworks on GitHub. Four projects dominated the trending charts during that week. Each represents a different philosophy of what agents should do — from disciplined software development to deep research to offline survival to financial trading.

> **Note on numbers in this entry:** weekly and total star counts throughout are as reported by 星探AI's weekly "Agent 新战场" social-media posts at the time of each snapshot. They reflect a community ranking, not independently audited GitHub Star History data. For verification, look up each repo on [Star History](https://star-history.com/).

*Source: [星探AI — Agent Weekly Hot List](https://www.xiaohongshu.com/) | [旭哥AI笔记 — DeerFlow 2.0](https://www.xiaohongshu.com/) | [Superpowers on GitHub](https://github.com/obra/superpowers) | [DeerFlow on GitHub](https://github.com/bytedance/deer-flow) | [Project NOMAD on GitHub](https://github.com/Crosstalk-Solutions/project-nomad) | [TradingAgents on GitHub](https://github.com/TauricResearch/TradingAgents)*

## The Leaderboard

| Rank | Project | Weekly Stars | Total Stars | What It Does |
|------|---------|-------------|-------------|--------------|
| #1 | **Superpowers** | +17,540 | 130K+ | Disciplined software development methodology for coding agents |
| #2 | **DeerFlow** | +13,951 | 56K+ | Long-horizon SuperAgent harness (research, code, create) |
| #3 | **NOMAD** | +13,848 | 13K+ | Offline survival computer with local AI |
| #4 | **TradingAgents** | +8,939 | — | Multi-agent LLM financial trading framework |

```
Stars gained (week of 3/20-3/26):

Superpowers  ████████████████████████████████████  +17,540
DeerFlow     ████████████████████████████████      +13,951
NOMAD        ███████████████████████████████       +13,848
TradingAgents ████████████████████               +8,939
```

## #1 Superpowers — Teaching Agents Discipline

**Creator:** Jesse Vincent (Prime Radiant) | **License:** MIT | **Stars:** 130K+

Most agent frameworks focus on *what* tools an agent can use. Superpowers focuses on *how* an agent should work — enforcing a structured software development methodology instead of letting agents freestyle code.

### The 7-Stage Workflow

```
1. Brainstorm     → Refine ideas through questioning, not coding
2. Git Worktrees  → Create isolated workspaces
3. Write Plans    → Break into 2-5 min tasks with exact specs
4. Implement      → Subagent-driven or batch execution
5. TDD            → RED → GREEN → REFACTOR (enforced, not optional)
6. Code Review    → Assess against the plan
7. Branch Complete → Merge/PR options + cleanup
```

### Why It Went Viral

The key insight: **agents don't fail because they can't code — they fail because they skip the steps that make code work.** Superpowers prevents agents from jumping straight to implementation, forcing brainstorming, planning, and test-driven development first.

Works with Claude Code, Cursor, Gemini CLI, and other coding agents. Ships with 14+ composable skills including systematic debugging (root-cause tracing, not guessing), parallel agent dispatching, and verification-before-completion.

## #2 DeerFlow 2.0 — ByteDance's SuperAgent Harness

**Creator:** ByteDance | **License:** MIT | **Stars:** 56K+ | **Tech:** Python + LangGraph + LangChain

DeerFlow (Deep Exploration and Efficient Research Flow) is ByteDance's open-source SuperAgent framework — a ground-up rewrite from v1 that hit #1 on GitHub Trending the day it launched.

### Architecture

```
┌─────────────────────────────────────────────────┐
│              DeerFlow 2.0 SuperAgent             │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Planner  │  │ Sub-     │  │ Skills &     │  │
│  │ (task    │  │ agents   │  │ Tools        │  │
│  │  decomp) │  │ (delegated│  │ (extensible) │  │
│  └────┬─────┘  │  tasks)  │  └──────────────┘  │
│       │        └──────────┘                      │
│       ▼                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Memory   │  │ Sandbox  │  │ Message      │  │
│  │ (long-   │  │ (Docker/ │  │ Gateway      │  │
│  │  term)   │  │  K8s)    │  │ (Slack/TG/   │  │
│  └──────────┘  └──────────┘  │  Feishu)     │  │
│                               └──────────────┘  │
│                                                  │
│  Models: Doubao-Seed-2.0, DeepSeek v3.2,        │
│          Kimi 2.5, OpenAI, Claude                │
└─────────────────────────────────────────────────┘
```

### Key Features

| Feature | Detail |
|---|---|
| **Sandbox execution** | Code runs in isolated Docker/K8s containers, not your machine |
| **Long-term memory** | Persists context across tasks and sessions |
| **Sub-agent orchestration** | Planner decomposes tasks, spawns specialized workers |
| **MCP integration** | Model Context Protocol for external tool access |
| **IM channels** | Control via Telegram, Slack, or Feishu with `/new`, `/status`, `/models` commands |
| **Extensible skills** | Add custom capabilities beyond the built-in set |

### Use Cases Beyond Research

The community has extended DeerFlow for data pipeline automation, presentation generation, dashboard creation, and content workflow management — far beyond its original research focus.

```bash
# Quick start
git clone https://github.com/bytedance/deer-flow.git
cd deer-flow && make config    # Configure models
make docker-start              # Launch with Docker
```

## #3 NOMAD — Offline Survival AI

**Creator:** Chris Sherwood (Crosstalk Solutions) | **License:** Apache-2.0 | **Stars:** 13K+

Project N.O.M.A.D is the most unusual entry — a self-contained, offline survival computer. It bundles local AI, 99.6GB of Wikipedia, and critical tools into a Docker-based system that works with zero internet.

### What's Inside

| Component | Purpose |
|---|---|
| **Ollama** | Local LLM runtime (run models offline) |
| **Open WebUI** | AI chat interface |
| **Qdrant** | Vector database for semantic search |
| **Kiwix** | Offline Wikipedia (99.6GB) |
| **Tools** | Maps, radio, medical references, survival guides |

### Why It's Trending

In a world increasingly dependent on cloud AI, NOMAD asks: *what if the cloud isn't there?* It packages everything you'd need for AI-assisted decision-making into a system that runs on commodity hardware with no network. The intersection of prepper culture and AI captured developers' imagination.

## #4 TradingAgents — Wall Street in a Repo

**Creator:** Tauric Research | **License:** Apache-2.0

TradingAgents simulates a professional trading firm using LLM-powered agents with specialized roles:

```
┌─────────────────────────────────────────┐
│         TradingAgents Framework          │
│                                          │
│  Analysts:                               │
│  ├── Fundamental Analyst (financials)    │
│  ├── Sentiment Analyst (news/social)     │
│  └── Technical Analyst (charts/signals)  │
│                                          │
│  Decision Layer:                         │
│  ├── Researcher (synthesize analysis)    │
│  ├── Traders (diverse risk profiles)     │
│  └── Risk Manager (position sizing)      │
│                                          │
│  Models: GPT-5.x, Gemini 3.x,           │
│          Claude 4.x, Grok 4.x, Ollama   │
└─────────────────────────────────────────┘
```

Supports multi-provider LLM backends (OpenAI, Google, Anthropic, xAI, OpenRouter, Ollama), backtesting with historical data, and a five-tier rating scale for trade recommendations. Treat it as a research and simulation framework, not financial, investment, or trading advice.

## What This Wave Tells Us

### 1. Agents Are Specializing

The era of "general-purpose agent framework" is splitting into verticals: software development (Superpowers), research (DeerFlow), survival/offline (NOMAD), finance (TradingAgents). Each domain has unique requirements that generic frameworks can't serve well.

### 2. Methodology > Tooling

Superpowers' dominance (#1 with 130K+ stars) shows that developers care more about *how agents work* than *what tools they have*. The most impactful improvement isn't adding more tools — it's enforcing disciplined processes.

### 3. Open Source Is the Default

All four projects are open source. ByteDance (DeerFlow) open-sourcing their internal agent framework signals that even big companies see more value in community adoption than proprietary lock-in.

### 4. Offline AI Is a Real Category

NOMAD's 13K+ star surge shows genuine demand for AI that works without internet — not just for preppers, but for edge deployment, privacy-sensitive use cases, and regions with unreliable connectivity.

## May 2026 Update — Week of 5/02–5/08 Leaderboard (per 星探AI)

Six weeks later, the leaderboard had rotated. 星探AI published their agent-category top 5 for the week of May 2–8, 2026 (Episode #7 of their weekly "Agent 新战场" series). Numbers below are **as reported by 星探AI's social post** and reflect their internal ranking method; treat as a community snapshot rather than independently audited GitHub Star History data.

| Rank | Project | Total Stars (per 星探AI) | Weekly Stars (per 星探AI) | Category |
|------|---------|--------------------------|--------------------------|----------|
| #1 | **TradingAgents** | ~70K | ~+15K | Finance |
| #2 | **Warp** | ~56K | ~+14K | Agentic Terminal |
| #3 | **ruflo** (Claude Flow) | ~45K | ~+2.6K | Multi-Agent Orchestration |
| #4 | **Scrapling** | ~47K | ~+2.6K | Web Scraping |
| #5 | **Skills** (mattpocock/skills) | ~63K | ~+21K | Agent Discipline Skills |

*Theme captured by 星探AI: "终端 + 金融 + 爬虫 + 编排" (Terminal + Finance + Crawler + Orchestration).*

> Note on ranking: 星探AI's order isn't pure weekly-gain — by that metric Skills (+~21K) would be first and TradingAgents (+~15K) second. Their published order seems to weight total + weekly together. For verifiable star history, check each repo on [Star History](https://star-history.com/).

### What Each Project Is

**TradingAgents** — already profiled above. Still gaining stars six weeks later according to 星探AI's snapshot. ([repo](https://github.com/TauricResearch/TradingAgents))

**Warp** ([github.com/warpdotdev/warp](https://github.com/warpdotdev/warp)) — open-sourced its terminal client on April 30, 2026 under AGPL-3.0, with OpenAI listed as the founding sponsor. Marketed as an **Agentic Development Environment (ADE)** with native support for Claude Code, Codex, and Gemini CLI. The companion **Oz** platform orchestrates cloud agents from the terminal. Product site: [warp.dev](https://www.warp.dev/).

**ruflo** ([github.com/ruvnet/ruflo](https://github.com/ruvnet/ruflo)) — previously named **Claude Flow**, renamed to ruflo by creator rUv. Multi-agent orchestration platform on top of Claude Code; ships with a large suite of MCP tools and pre-defined agent roles. The project's own README claims notable SWE-bench numbers and API cost savings — useful as a marketing reference, not as an independent benchmark.

**Scrapling** ([github.com/D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling)) — Karim Shoair's adaptive Python web-scraping framework. Its agent-category interest comes from a **built-in MCP server** that lets Claude/Cursor agents extract structured content from web pages before LLM ingestion (cutting tokens and cost). The framework also advertises anti-detection features for sites with strong bot defenses — use responsibly and within each site's terms of service.

**Skills** — `mattpocock/skills` (covered in its own wiki entry: *Matt Pocock's Skills — Claude Code for Real Engineers*). Discipline skills for coding agents — TDD, structured debugging, architecture review. The largest weekly gain in the May snapshot.

### What Changed Between March and May

| Dimension | March 20–26 | May 2–8 |
|-----------|-------------|---------|
| **Top by total stars** | Superpowers | TradingAgents |
| **Top by weekly gain** | Superpowers | Skills (mattpocock/skills) |
| **Vertical mix** | Software / research / survival / finance | Finance / terminal / orchestration / scraping / discipline |
| **New category** | Survival AI (NOMAD) | Agentic terminals (Warp's open-source pivot) |

Three signals worth noting:

1. **Multi-agent orchestration is emerging as an infrastructure layer** — ruflo's traction suggests teams want a "swarm conductor" on top of Claude Code, not just better skills inside it.
2. **Terminal is becoming a primary agent surface** — Warp's open-source pivot bets that the agentic future runs in the terminal as much as in the IDE. Aligns with Boris Cherny's phone-based workflow direction.
3. **Skills/discipline repos keep ranking high** — six weeks apart, two different skill repos (Superpowers, mattpocock/skills) lead by weekly gains. The discipline-skills category isn't a one-week story.

## Links

- **Superpowers:** [github.com/obra/superpowers](https://github.com/obra/superpowers)
- **DeerFlow:** [github.com/bytedance/deer-flow](https://github.com/bytedance/deer-flow)
- **NOMAD:** [github.com/Crosstalk-Solutions/project-nomad](https://github.com/Crosstalk-Solutions/project-nomad)
- **TradingAgents:** [github.com/TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)
- **DeerFlow 2.0 coverage:** [byteiota.com](https://byteiota.com/deerflow-2-0-bytedance-ai-agent-framework-hits-1-github/)

## How LearnAI Team Could Use This

- Use Superpowers-style workflows as a template for coding-agent lesson plans: brainstorm, plan, test, review, and finish branches deliberately.
- Use DeerFlow as a case study for long-horizon research agents with planning, memory, sandboxes, and messaging surfaces.
- Use NOMAD to discuss local-first AI, offline knowledge bases, and resilience for low-connectivity environments.
- Use TradingAgents as a cautionary finance-agent example focused on simulation, research, evaluation, and risk controls rather than investment advice.

## Real-World Use Cases

- **Software teams:** Enforce repeatable agent development workflows with planning, TDD, review, and branch hygiene.
- **Research and content teams:** Coordinate long-running research, report generation, data analysis, and presentation drafts.
- **Field and offline deployments:** Run local AI plus offline reference libraries where internet access is unreliable or unavailable.
- **Finance education and research:** Simulate multi-agent market analysis for backtesting and decision-process study, with clear non-advice disclaimers.

<!-- Note on numbers: leaderboard figures are as reported by 星探AI's weekly social-media post; treat as community ranking, not independently audited GitHub Star History data. Verify via star-history.com for each repo. -->
