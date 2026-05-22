---
title: "SpecOps — Spec-Driven Development with AI Coding Agents"
date: 2026-04-17
category: Claude Code Workflows
redirect_from:
  - "/wiki/claude code/specops-spec-driven-development/"
tags: [specops, spec-driven, ai-coding, claude-code, development-workflow, requirements, design-docs]
related: ["Harness Engineering — The Real Bottleneck Isn't the Model", "Karpathy Skills — Four Rules That Fix LLM Coding's Worst Habits", "Using /goal for Wiki Management — Spec-Driven Autonomous Wiki Sessions"]
icon: "📋"
image: "/assets/images/specops-spec-driven-development.png"
---

AI coding agents are fast. They're also reckless. Hand one a vague prompt and it will generate 500 lines of code built on silent assumptions, skip edge cases, and create something that *looks* right but doesn't match what you actually needed. **SpecOps** fixes this by forcing a mandatory spec-first workflow: understand the codebase, write detailed specifications, implement against those specs, then verify with adversarial evaluation. Every spec is Git-tracked markdown — no cloud accounts, no vendor lock-in, persistent across sessions and tools.

*Source: [GitHub — sanmak/specops](https://github.com/sanmak/specops) (MIT, v1.8.0) | [DeepLearning.AI — Spec-Driven Development with Coding Agents](https://www.deeplearning.ai/short-courses/spec-driven-development-with-coding-agents/) | [爱可可-爱生活 Weibo post](https://weibo.com)*

## Why Spec-First Beats Code-First

The core problem: when you tell an AI agent "add user authentication," it makes dozens of invisible decisions — OAuth vs. JWT, session storage, token refresh strategy, error handling — without telling you. You discover the mismatch after 400 lines are already written.

Spec-first flips this. The agent writes a **requirements doc** before touching any code. You review the spec (5 minutes), catch misalignment early, and the implementation follows a verified plan. This is the difference between "prompt and pray" and disciplined engineering.

| Approach | What Happens | Failure Mode |
|----------|-------------|-------------|
| **Vibe coding** | Prompt → Agent codes → You review output | Silent assumptions, scope creep, rework loops |
| **Spec-driven** | Prompt → Agent writes spec → You review spec → Agent codes → Adversarial verify | Misalignment caught at spec stage, not after implementation |

The DeepLearning.AI course (taught by Paul Everitt of JetBrains, 1h20m, free) frames it well: "Vibe coding is fast, but it often produces code that doesn't match what you asked for."

## The 4-Phase Workflow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  UNDERSTAND  │───>│    SPEC      │───>│  IMPLEMENT   │───>│  COMPLETE    │
│              │    │              │    │              │    │              │
│ Analyze code │    │ requirements │    │ Code per     │    │ Adversarial  │
│ Map domain   │    │ design.md    │    │ task list    │    │ evaluation   │
│ Load context │    │ tasks.md     │    │ Follow spec  │    │ Drift check  │
│              │    │ EARS format  │    │ Dep. govern. │    │ Verify pass  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      Phase 1            Phase 2            Phase 3            Phase 4
```

### Phase 1: Understand

The agent scans your codebase, identifies architecture patterns, maps domain context, and loads any previous specs or production learnings. No code is written yet.

### Phase 2: Spec

Three Git-tracked markdown files are generated:

- **`requirements.md`** — Uses EARS notation (`WHEN [event] THE SYSTEM SHALL [behavior]`) for precise, testable criteria
- **`design.md`** — Architecture decisions, component interactions, constraints
- **`tasks.md`** — Ordered implementation steps with acceptance criteria

An **adversarial evaluator** scores the spec against hard quality thresholds before proceeding. The evaluator is structurally separated from the spec author — the agent can't self-validate.

### Phase 3: Implement

Code follows the task list. Every new dependency must pass a 5-criteria governance check:

1. Scope match (does this dependency solve the actual need?)
2. Maintenance health (active maintainers, recent commits?)
3. Size proportionality (not pulling in 50MB for one function?)
4. Security surface (known CVEs, attack vectors?)
5. License compatibility

No bypass — always enforced.

### Phase 4: Complete

Adversarial evaluation again, this time scoring implementation against the spec. Five automated drift-detection checks ensure the code matches what was specified. If drift is found, reconciliation is triggered before completion.

## Installation

**One-line install (any platform):**
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/sanmak/specops/main/scripts/remote-install.sh)
```

**From source:**
```bash
git clone https://github.com/sanmak/specops.git && cd specops && bash setup.sh
```

**Claude Code marketplace:**
```
/plugin marketplace add sanmak/specops
/plugin install specops@specops-marketplace
/reload-plugins
```

## Usage

**Create a spec for a new feature:**
```
/specops Add user authentication with OAuth
```

**Capture production learnings:**
```
/specops learn batch-processing
→ Learning: "Concurrent writes above 500 connections degrade P99"
→ Prevention: "Design docs must include concurrency limits"
```

**Multi-spec initiative (large features):**
```
/specops initiative oauth-payments
→ Detects 2 bounded contexts (auth, payments)
→ Creates Spec 1: oauth-authentication (wave 1)
→ Creates Spec 2: payment-processing (wave 2, depends on spec 1)
→ Creates Initiative: oauth-payments (orchestrates both)
```

## Platform Support

| Platform | Trigger |
|----------|---------|
| Claude Code | `/specops [description]` |
| Cursor | `Use specops to [description]` |
| GitHub Copilot | `Use specops to [description]` |
| OpenAI Codex | `Use specops to [description]` |

One spec, portable across all your AI coding tools. The `.specops/` directory is the single source of truth.

## Configuration

Create `.specops.json` in your project root:

```json
{
  "specsDir": ".specops",
  "vertical": "backend",
  "team": {
    "conventions": ["Use TypeScript", "Write tests for business logic"],
    "reviewRequired": true
  }
}
```

## Domain Verticals

SpecOps ships seven templates tuned to different project types:

| Vertical | What It Adds to Specs |
|----------|----------------------|
| **Backend** | API contracts, data models, error handling |
| **Frontend** | Component hierarchy, state management, accessibility |
| **Infrastructure** | Rollback steps, resource definitions, cost estimates |
| **Data Pipeline** | Data contracts, backfill strategy, schema evolution |
| **Library/SDK** | Public API surface, versioning, backward compatibility |
| **Fullstack** | End-to-end flows, API-to-UI mapping |
| **Builder** | Plugin architecture, extensibility points |

## Key Differentiators

### Production Learning Loop

Most tools stop at implementation. SpecOps closes the feedback loop: after deployment, you capture what actually happened in production, and future specs touching the same files automatically load those learnings.

```
Deploy → Discover issue → /specops learn → Stored as prevention rule
                                              ↓
                              Future specs auto-load this context
```

This is the only tool in the spec-driven ecosystem that does this.

### Adversarial Evaluation

The evaluator is **structurally separated** from the spec writer. This matters because LLMs are notoriously bad at evaluating their own output — they'll rate their work highly regardless. SpecOps uses a separate evaluation pass with independent scoring criteria and hard fail thresholds.

### Cross-Session Persistence

Specs persist in Git. When you start a new session tomorrow, the agent recovers full context from `.specops/` — no re-explaining what you're building, no context loss, no "let me re-read the codebase."

## Spec-Driven Development Ecosystem (2026)

SpecOps isn't the only player. The broader ecosystem is maturing fast:

| Tool | Approach | Best For |
|------|----------|----------|
| **SpecOps** | Living specs + production feedback loop | Teams wanting end-to-end spec lifecycle |
| **GitHub SpecKit** | GitHub-native spec workflow | Teams already deep in GitHub ecosystem |
| **Kiro (AWS)** | Agent-driven spec generation | AWS-centric teams |
| **BMAD-METHOD** | Multi-agent spec decomposition | Complex multi-team projects |
| **Cursor + .cursorrules** | Static spec via rules files | Solo developers, quick setup |

## How LearnAI Team Could Use This

1. **Course project scaffolding** — Students describe a feature in plain English. SpecOps generates the requirements, design, and task list. Students learn to read and critique specs before writing code — a skill more valuable than coding itself.

2. **Research prototype discipline** — When building research tools (type checkers, program analyzers), spec-first prevents the classic "I built something but can't explain what it does" problem. The spec *is* the explanation.

3. **Assignment design** — Use SpecOps to generate spec templates for programming assignments. Students implement against the spec and are graded against the acceptance criteria. Consistent, fair, automated.

4. **AI coding literacy** — Teach students the difference between vibe coding and spec-driven development. This is the meta-skill: knowing *how* to direct AI agents, not just *that* they can code.

5. **Cross-session lab continuity** — Students working on multi-week projects lose context between lab sessions. Git-tracked specs solve this — the agent picks up exactly where the student left off.

## Real-World Use Cases

- **Startup MVP development** — Founder describes the product. SpecOps generates specs for each feature. Non-technical founder can review requirements in plain English before any code is written. Prevents the "I paid $50k and got the wrong thing" scenario.

- **Legacy codebase modernization** — The DeepLearning.AI course specifically covers this: use the Understand phase to map an existing codebase, generate specs for modernization work, then implement incrementally with verification at each step.

- **Multi-team feature coordination** — The multi-spec initiative feature decomposes a large feature into bounded-context specs with dependency tracking. Team A builds auth (wave 1), Team B builds payments (wave 2, depends on wave 1). The initiative orchestrates both.

- **Compliance-driven development** — Industries requiring audit trails (finance, healthcare) get Git-tracked requirements → design → implementation → verification chains for free. Every decision is documented, every spec is versioned.

- **Open source contribution onboarding** — New contributors run `/specops` to understand the codebase, then generate specs for their proposed changes. Maintainers review the spec (fast) before the contributor writes code (slow). Catches misalignment early.

## The Deeper Point

Spec-driven development isn't about slowing AI down — it's about making the 5 minutes you spend reviewing a spec save the 2 hours you'd spend debugging wrong assumptions in code. The agents are fast enough. The bottleneck is **alignment between what you want and what the agent builds**. SpecOps attacks that bottleneck directly.

## Resources

- [GitHub — sanmak/specops](https://github.com/sanmak/specops) — Source code, docs, `.specops/` examples
- [DeepLearning.AI — Spec-Driven Development with Coding Agents](https://www.deeplearning.ai/short-courses/spec-driven-development-with-coding-agents/) — Free course, 1h20m, Paul Everitt (JetBrains)
- [Augment Code — What Is Spec-Driven Development?](https://www.augmentcode.com/guides/what-is-spec-driven-development) — Practitioner's guide
- [GitHub Blog — Spec-Driven Development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) — GitHub's take on the ecosystem
