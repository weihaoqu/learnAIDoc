---
title: "How Anthropic Uses Skills — Thariq's 9-Category Framework & the Gotchas Pattern"
date: 2026-05-10
category: Skills & Plugins
tags: [claude-code, skills, anthropic, thariq-shihipar, skill-design, progressive-disclosure, gotchas, context-engineering, internal-tools, hooks]
related: ["Addy Osmani's agent-skills — Senior Engineering Practices as SKILL.md Files", "Matt Pocock's Skills — Claude Code for Real Engineers", "Karpathy Skills — Four Rules That Fix LLM Coding's Worst Habits", "kepano/obsidian-skills — Agent Skills That Let AI Edit Your Vault", "Seeing Like an Agent — How Anthropic Designs Tools for Claude Code", "Claude Code Skills: Resources & Repos", "grill-me — When AI Interviews You Before Writing Code"]
icon: "🧩"
image: "/assets/images/anthropic-skills-thariq-framework.png"
---

Thariq Shihipar (Claude Code team, Anthropic) published a concrete primary-source account of how Anthropic uses Skills internally — many of them, in production, across teams. The article proposes a **nine-category taxonomy** that the skills he's seen tend to fall into, names the **Gotchas section** as the highest-signal block in any SKILL.md, and reframes skills as **folders, not files** — turning the filesystem into a progressive-disclosure mechanism for context engineering. It reads as a practitioner manual for the Skills abstraction Anthropic introduced last year.

*Source: [Thariq on X — original thread](https://x.com/trq212/status/2033949937936085378) | [LinkedIn: Lessons from Building Claude Code — How We Use Skills](https://www.linkedin.com/pulse/lessons-from-building-claude-code-how-we-use-skills-thariq-shihipar-iclmc) | [DEV.to summary — 9-Category Framework](https://dev.to/minatoplanb/how-anthropic-actually-uses-skills-in-claude-code-a-9-category-framework-1kel) | [Threads mirror](https://www.threads.com/@sung.kim.mw/post/DV_2IojkmM7/)*

## The Headline Reframe

> "A skill is a folder, not just a markdown file."

Most teams write skills as a single SKILL.md and stop. Thariq's argument: the filesystem *is* the skill. References live in `references/`, templates live in `assets/`, helper scripts live alongside the markdown. The agent discovers and reads them at the right time. This turns a skill from a static prompt into a **structured workspace** the agent can navigate.

## The 9-Category Framework

After cataloging the skills in active use on Thariq's team, he observed they cluster into nine recurring categories. The best skills fit cleanly into one; confused ones straddle several. Treat the list as a useful working taxonomy, not a fixed standard.

| # | Category | Purpose | Example Skill Names |
|---|----------|---------|--------------------|
| 1 | **Library & API Reference** | Teach Claude how to use a library or CLI — with gotchas | `billing-lib`, `frontend-design`, `auth-sdk` |
| 2 | **Product Verification** | End-to-end check that a feature still works | `signup-flow-driver`, `checkout-verifier` |
| 3 | **Data Fetching & Analysis** | Hook into the data/monitoring stack | `funnel-query`, `cohort-compare` |
| 4 | **Business Process & Team Automation** | Recurring workflow with shared output | `standup-post`, `ticket-create` |
| 5 | **Code Scaffolding & Templates** | Generate framework-conformant boilerplate | `new-migration`, `create-app` |
| 6 | **Code Quality & Review** | Enforce house style and review standards | `adversarial-review`, `code-style` |
| 7 | **CI/CD & Deployment** | Babysit PRs, push, deploy, roll back | `babysit-pr`, `deploy-service` |
| 8 | **Runbooks** | Multi-tool investigation: symptom → structured report | Incident triage, customer-issue dispatch |
| 9 | **Infrastructure Operations** | Routine ops with safety guardrails | Orphan-resource cleanup, dependency bumps |

**Why this matters:** Most external teams only use 2–3 of these categories — usually 1, 5, and 6 (libraries, scaffolding, code quality). The other six are where the long-tail productivity gains live. Read the list as a checklist for what your team is *not yet* automating.

## The Gotchas Pattern — The Highest-Signal Block

The single most quoted line in the article:

> "The highest-signal content in any skill is the Gotchas section."

Example structure (from a `billing-lib` skill):

```markdown
---
name: billing-lib
description: Use when working with invoicing, proration, or Stripe webhooks.
---

# Billing Library

## Gotchas

- Proration rounds DOWN, not nearest cent.
- test-mode skips invoice.finalized hook.
- refunds need charge ID, not invoice ID.
- idempotency keys expire after 24h.
```

Gotchas capture **what the docs don't say** — undocumented edge cases, rate-limit surprises, environment-specific quirks, lessons learned from real failures. They're built iteratively: every time Claude trips on a new edge case, you append it. This is the loop that makes skills compound over time.

Practical rule: if your skill has no Gotchas section, you haven't used it long enough.

## Progressive Disclosure as Context Engineering

Context is finite. Don't burn it on content Claude doesn't need right now.

```
billing-lib/
├── SKILL.md              # entry point — high-signal only
├── references/
│   ├── api.md            # full method reference (loaded on demand)
│   ├── webhooks.md       # webhook event catalog
│   └── error-codes.md    # error → meaning mapping
├── assets/
│   ├── invoice.tmpl.json # copy-and-fill templates
│   └── retry.tmpl.ts
└── scripts/
    └── reconcile.ts      # run when reconciliation needed
```

The SKILL.md tells Claude what's in the folder and *when* to read each file. Claude pulls deeper context only when the task demands it. The pattern: keep the entry point small and high-signal; push detail into `references/` files that load on demand. The savings show up as fewer tokens spent on context the agent doesn't need for the current task.

## The Description Field Is a Trigger, Not a Summary

> "The description field is not a summary — it's a description of *when to trigger* this skill."

Anthropic uses descriptions as routing signals. At session startup, Claude reads every skill's description and decides which are relevant. A bad description sinks even a great skill.

| Bad Description | Good Description |
|-----------------|------------------|
| "Library for working with payments" | "Use when modifying anything in `src/billing/`, when reasoning about Stripe webhook payloads, or when invoices/refunds/proration logic is being touched." |
| "Helps with deployment" | "Use when shipping a PR — runs preflight, monitors deploy, alerts on regressions." |

Write descriptions like *trigger conditions*, not catalog blurbs.

## Three Anti-Patterns to Avoid

### 1. Railroading
Don't write step-by-step procedures. Give Claude the information and let it adapt to the situation. Overly prescriptive skills break the moment context shifts.

### 2. Stating the Obvious
Don't tell Claude what it already knows about coding. Skills are valuable when they push Claude *out* of its default behavior — into your team's specific patterns, your stack's specific gotchas, your domain's specific terminology.

### 3. Vague Descriptions
Already covered above — but worth repeating. If two skills have overlapping descriptions, Claude won't know which to use, and both will quietly underperform.

## Patterns Worth Stealing

| Pattern | What It Does |
|---------|--------------|
| **Config.json + AskUserQuestion** | Skills define structured config; use `AskUserQuestion` to fill it interactively the first time |
| **Append-only memory logs** | `standups.log`, `decisions.log` — skills both read and write these, building team memory over time |
| **PreToolUse hooks for adoption tracking** | Wrap skill invocations to measure which skills actually get used, then prune the dead ones |
| **Composable helper scripts** | Don't ask Claude to write reconciliation logic every time — give it a `scripts/reconcile.ts` to call |
| **On-demand safety hooks** | `/careful` (blocks destructive commands), `/freeze` (restricts edits to safe directories) — load only when needed |

## Distribution Strategy

- **Small teams:** Check skills into the repo at `./.claude/skills/`. Version control = audit trail.
- **Large orgs:** Internal plugin marketplace (Anthropic's own pattern). Skills get curated, deprecated, and rated.
- **Open source:** GitHub repos like `addyosmani/agent-skills`, `mattpocock/skills`, `kepano/obsidian-skills` — install via `npx skills add`.

Curation matters more than creation. Skills almost always start simple and improve as gotchas accumulate.

## Where This Fits in the Skills Landscape

| Source | Angle |
|--------|-------|
| **Karpathy** | Four rules in a CLAUDE.md to fix LLM coding's worst habits |
| **Addy Osmani** | 20 senior-engineering practices as SKILL.md files (lifecycle-focused) |
| **Matt Pocock** | Discipline skills for real engineers (TDD, debugging, requirements grilling) |
| **Kepano** | Skills as knowledge-work tools (Obsidian-style) |
| **Thariq (this entry)** | Anthropic's own internal taxonomy + the Gotchas/progressive-disclosure patterns |

Thariq's piece is an unusually concrete primary-source view from the team that designed the abstraction. The other resources show patterns; this one shows the working taxonomy behind them.

## How LearnAI Team Could Use This

- **Skill-design curriculum** — teach the 9 categories as a working taxonomy. Students audit any skill repo and classify each skill into one of the 9; misclassifications expose poor scoping.
- **Gotchas-driven iteration** — make Gotchas-writing a required step in every student skill submission. "What broke when you used it?" becomes a graded artifact.
- **Progressive disclosure as a teaching tool** — students rewrite a single 50KB doc into a SKILL.md + references/ structure; compare context usage before/after.
- **Description-writing drills** — give students 5 skill names and have them write trigger descriptions; peer-rate for routing clarity.
- **Mapping LearnAI's own workflows** — which of the 9 categories does the LearnAI team already automate? Where are the gaps? Often the answer is categories 3, 4, and 8 (data fetching, business process, runbooks).

## Real-World Use Cases

- **Internal libraries with non-obvious behavior** — every team has one. Wrap it in a skill, document the gotchas, and stop re-explaining proration semantics in every PR review.
- **Onboarding playbooks** — new hires use skills 2 and 4 (product verification + business process) to learn the system by running it.
- **Incident response** — category 8 (runbooks) turns symptom-to-resolution from tribal knowledge into a callable skill.
- **Customer-facing product teams** — combine categories 1, 3, and 6 to give support engineers a Claude that knows the product, the data warehouse, and the review standards.
- **Solo developers** — even one person benefits: a Gotchas section in your personal `notes/` skill compounds across projects.

## Links

- **Thariq's X thread:** [@trq212](https://x.com/trq212/status/2033949937936085378)
- **LinkedIn article:** [Lessons from Building Claude Code: How We Use Skills](https://www.linkedin.com/pulse/lessons-from-building-claude-code-how-we-use-skills-thariq-shihipar-iclmc)
- **Thariq's earlier piece on tool design:** [Seeing Like an Agent](https://x.com/trq212/status/2027463795355095314)
- **Companion entries in this wiki:** Addy Osmani, Matt Pocock, Karpathy, Kepano on skills
