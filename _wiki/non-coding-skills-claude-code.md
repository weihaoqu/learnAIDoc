---
title: "Non-Coding Skills for Claude Code — Automating Business & Life"
date: 2026-03-17
category: Skills & Plugins
redirect_from:
  - "/wiki/skills & plugins/non-coding-skills-claude-code/"
tags: [claude-code, skills, automation, business, video-editing, personal-workflows, skill-design]
related: ["Claude Code Skills: Resources & Repos", "Skill Seekers: Auto-Generate Claude Skills", "Karpathy Skills — Four Rules That Fix LLM Coding's Worst Habits"]
icon: "🧩"
image: "/assets/images/non-coding-skills-claude-code.png"
---

Most Claude Code skills focus on engineering — building apps, running tests, deploying code. Shaw Talebi's **non-coding-skills** repo flips that assumption: what if you used Claude Code's agent architecture to automate *everything else* in your work life — emails, sales outreach, video editing, CRM, business strategy?

The key insight from Shaw himself: **"Using them as-is probably won't be as helpful to you as they are to me. The value is in the patterns and ideas."** This isn't a plug-and-play toolkit — it's a masterclass in skill architecture for personal workflows.

*Source: [GitHub Repo](https://github.com/ShawhinT/non-coding-skills) | [Shaw Talebi's YouTube](https://youtube.com/@ShawhinTalebi) | [AI Builder Academy](https://aibuilder.academy)*

## Who Built This

**Shaw Talebi** — PhD from UT Dallas, 8+ years in AI, former data scientist at Toyota. Now runs AI Builder Academy, training teams at Google, Microsoft, Meta, AWS, and others. Active YouTuber with millions of viewers. This repo is his personal automation stack, open-sourced as a learning resource.

## The 15 Skills at a Glance

| Skill | Category | What It Does |
|-------|----------|-------------|
| `email-writer` | Communication | Drafts emails matching Shaw's exact voice/style with tone markers |
| `3-way-intro` | Communication | Three-way introduction emails |
| `linkedin-post-writer` | Content | LinkedIn post creation with personal branding |
| `linkedin-lead-gatherer` | Sales | Browser automation to gather LinkedIn leads |
| `outreach-campaign` | Sales | Multi-step outreach pipeline via Notion + Gmail MCPs |
| `pre-call-research` | Research | Pre-meeting research prep |
| `crm` | Business Ops | CRM management |
| `business-strategy` | Strategy | Business strategy analysis and planning |
| `executive-briefing` | Communication | Executive-level briefings |
| `training-proposal` | Sales | AI training proposals for enterprise teams |
| `validate-saas-idea` | Strategy | SaaS idea validation framework |
| `notion-research-documentation` | Research | Structured research docs in Notion |
| `keynote` | Content | Keynote/presentation creation |
| `video-editor` | Content | YouTube video editing → FCPXML for Final Cut Pro |
| `skill-updater` | Meta | Edit and repackage existing skills |

## Two Tiers of Skills

```
┌─────────────────────────────────────────────────┐
│           NON-CLAUDE CODE SKILLS                │
│  (Work with standard Claude + MCPs)             │
│                                                 │
│  email-writer, linkedin-post-writer,            │
│  business-strategy, executive-briefing,         │
│  crm, training-proposal, validate-saas-idea     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           CLAUDE CODE SKILLS                    │
│  (Require Claude Code CLI + tool access)        │
│                                                 │
│  video-editor (FFmpeg + AssemblyAI + FCPXML),   │
│  linkedin-lead-gatherer (browser automation),   │
│  keynote (file generation),                     │
│  skill-updater (meta: edits other skills)       │
└─────────────────────────────────────────────────┘
```

## Standout Skill: `video-editor`

The most technically impressive skill in the collection. It runs a multi-phase pipeline:

```
Recording (MP4)
    │
    ▼
┌──────────────────┐
│  Phase 1: Analyze │  FFmpeg extracts audio
│                    │  AssemblyAI transcribes
│                    │  Detects filler words,
│                    │  long pauses, false starts
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Phase 2: Propose │  5-pass edit processing
│                    │  Identifies cut points
│                    │  Preserves context
│                    │  Human reviews proposals
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Phase 3: Export  │  Generates FCPXML
│                    │  → Import into Final Cut Pro
│                    │  Non-destructive editing
└──────────────────┘
```

This is a genuinely novel use of Claude Code — it doesn't try to replace Final Cut Pro, it acts as an **intelligent pre-editor** that does the tedious first pass.

## Standout Skill: `email-writer` — Voice Cloning

The `email-writer` skill is a masterclass in encoding personal voice for AI. The `SKILL.md` includes:

- **Tone markers** — specific adjectives describing Shaw's writing voice
- **Greeting rules** — when to use "Hey" vs "Hi" vs formal greetings
- **Paragraph structure** — preferred length, sentence cadence
- **Reference examples** — actual emails Shaw has written, categorized by type
- **Gmail API quirks** — e.g., emoji reactions breaking thread replies

This pattern is directly transferable to anyone building a "write like me" skill.

## Standout Skill: `skill-updater` — Meta-Skill

A skill for editing skills. It solves a real problem: Claude Code's skill filesystem is read-only at runtime. The `skill-updater` handles this by:

1. Reading the current skill from the read-only path
2. Applying edits in a working directory
3. Repackaging and reinstalling the updated skill

Its philosophy sections are worth reading even if you never use the skill itself:
- **"Principles over rules"** — teach the AI *why*, not just *what*
- **"Less is more"** — shorter skills are more reliable than verbose ones

## How to Install

```bash
# Install any individual skill
claude skill add --url https://github.com/ShawhinT/non-coding-skills/tree/main/<skill-name>

# Example: install the video editor
claude skill add --url https://github.com/ShawhinT/non-coding-skills/tree/main/video-editor
```

## Patterns Worth Stealing

If you're building your own skills, here's what to learn from this repo:

### 1. Consistent Skill Structure
Every skill follows: `SKILL.md` (core logic) + `references/` (examples, templates). This separation keeps the main skill focused while providing rich context.

### 2. Voice Encoding Pattern
The `email-writer` approach — tone markers, greeting rules, reference examples — is the best pattern available for "write like me" skills. Copy this structure, swap in your own voice samples.

### 3. Multi-Tool Chaining
The `video-editor` chains FFmpeg → AssemblyAI → custom logic → FCPXML generation. This shows how Claude Code skills can orchestrate multiple external tools into a cohesive pipeline.

### 4. MCP Integration for Business Ops
The `outreach-campaign` skill chains Notion MCP (contact data) → Gmail MCP (sending) into an automated sales pipeline. This is the model for any "read from X, act on Y" business workflow.

### 5. Meta-Skills
The `skill-updater` proves that skills can be self-modifying. If you maintain a large skill collection, a meta-skill for editing them is invaluable.

## How LearnAI Team Could Use This

- **Teaching skill architecture** — Use the repo as a case study for "how to structure Claude Code skills" in workshops
- **Email/communication automation** — Adapt the `email-writer` pattern for academic correspondence (recommendation letters, grant emails, student communications)
- **Research documentation** — The `notion-research-documentation` skill pattern could be adapted for Obsidian-based research workflows
- **Presentation generation** — The `keynote` skill could be adapted for lecture slide generation
- **Video editing for lectures** — The `video-editor` pipeline could streamline editing recorded lectures and tutorials

## Real-World Use Cases

- **Solopreneurs** automating sales outreach, CRM, and client communication
- **Content creators** using the video-editor pipeline to speed up YouTube editing by 3-5x
- **AI educators** using this repo as teaching material for "building with Claude Code"
- **Teams** adapting the voice-cloning pattern for brand-consistent communications
- **Skill builders** studying the architecture patterns before building their own
