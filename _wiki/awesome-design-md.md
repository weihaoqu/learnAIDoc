---
title: "Awesome DESIGN.md — Install Design Taste Into Your AI Coding Agent"
date: 2026-04-06
category: Tools
tags: [design-system, ui, ai-coding, claude-code, cursor, markdown, frontend, open-source]
related: ["Gstack — Garry Tan's AI Software Factory for Claude Code", "Pretext, Refero & UI Tools — Visual Intelligence for Claude Code", "Taste Skill — Teaching AI Agents Design Taste for Frontend Code"]
icon: "🎨"
image: "/assets/images/awesome-design-md.png"
---

AI writes code fast, but the UI it generates is often generic — Material Design defaults or featureless "clean" layouts. It's hard to get the premium feel of Apple, Linear, or Spotify. Awesome DESIGN.md solves this by reverse-engineering 58 top companies' design systems into plain Markdown files that any AI agent can read instantly.

*Source: [GitHub - VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)*

## The Core Idea

Drop a `DESIGN.md` file into your project root. Tell your AI agent (Claude Code, Cursor, etc.) to "reference this design file when building UI." The AI instantly understands the brand's colors, typography, spacing, components, and visual hierarchy — generating pixel-level matching UI instead of generic defaults.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Pick a brand │ ──▶ │  Copy its    │ ──▶ │  AI generates │
│  (e.g. Linear)│     │  DESIGN.md   │     │  matching UI  │
│              │     │  to project  │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

Why Markdown? Because **LLMs read Markdown best** — no Figma plugins, no JSON schemas, no parsing needed. It's the format AI agents already understand natively.

## What's Inside Each DESIGN.md

Every file follows a standardized 9-section structure:

| Section | What It Defines |
|---------|----------------|
| Visual Theme & Atmosphere | Overall aesthetic direction and brand feel |
| Color Palette & Roles | Semantic colors (primary, surface, danger, etc.) |
| Typography Rules | Font families, sizes, weights, line heights |
| Component Stylings | Buttons, inputs, cards, modals, navigation |
| Layout Principles | Grid systems, spacing scale, alignment rules |
| Depth & Elevation | Shadows, borders, layering, blur effects |
| Do's and Don'ts | Brand guardrails the AI must follow |
| Responsive Behavior | Breakpoints, mobile-first adaptations |
| Agent Prompt Guide | Instructions for how the AI should apply the system |

Each brand folder also includes `preview.html` and `preview-dark.html` for visual reference.

## 58 Design Systems Covered

| Category | Brands |
|----------|--------|
| **AI & ML** | Claude, Cohere, ElevenLabs, Mistral AI, Ollama, Replicate, RunwayML, Together AI, xAI |
| **Dev Tools** | Cursor, Expo, Linear, Lovable, Mintlify, PostHog, Raycast, Resend, Sentry, Supabase, Vercel, Warp |
| **Design & Productivity** | Airtable, Cal.com, Figma, Framer, Intercom, Miro, Notion, Pinterest, Webflow |
| **Infrastructure** | ClickHouse, HashiCorp, MongoDB, Sanity, Stripe |
| **Fintech** | Coinbase, Kraken, Revolut, Wise |
| **Enterprise & Consumer** | Airbnb, Apple, IBM, NVIDIA, SpaceX, Spotify, Uber |
| **Automotive** | BMW, Ferrari, Lamborghini, Renault, Tesla |

## How to Use

```bash
# 1. Browse the repo and pick a design system
# 2. Copy DESIGN.md to your project root
cp path/to/awesome-design-md/sites/linear/DESIGN.md ./DESIGN.md

# 3. Tell your AI agent
"Build a dashboard page. Follow the design system in DESIGN.md."
```

Works with Claude Code, Cursor, Windsurf, GitHub Copilot — any agent that reads project files.

## Why This Matters

This turns "design taste" from a subjective skill into **a replicable dependency**. Independent developers who can't afford a design director can now produce brand-quality UI by referencing a curated `.md` file. It's the design equivalent of importing a library.

## Companion Approach: taste-skill (Claude Code Skills Bundle)

Where **Awesome DESIGN.md** gives you specific brand styles to match (Linear, Apple, etc.), [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) takes the **general aesthetic principles** approach — a bundle of 7 installable Claude Code skills that teach AI design taste without being tied to a specific brand.

*Source: [默庵·超级个体 on Weibo](https://weibo.com/) (2026-04)*

### The 7 Skills

| Skill | What It Does |
|---|---|
| **taste-skill** | Main design skill — layout, typography, colors, spacing, motion |
| **redesign-skill** | Audits and fixes design problems in existing projects |
| **soft-skill** | Expensive-looking UIs with premium fonts, whitespace, spring animations |
| **output-skill** | Prevents lazy AI outputs — no placeholder comments, no half-finished blocks |
| **minimalist-skill** | Editorial interfaces à la Notion and Linear — monochrome, crisp borders |
| **brutalist-skill** | (Beta) Swiss typography + CRT terminal aesthetics |
| **stitch-skill** | Google Stitch-compatible semantic rules — includes DESIGN.md export |

### Install

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
```

Works with Claude Code, Cursor, Antigravity — any tool that reads `SKILL.md` files.

### The Three Dials

`taste-skill` exposes 3 adjustable settings (1-10 scale):

- **DESIGN_VARIANCE** — how experimental the layout should be
- **MOTION_INTENSITY** — how much animation to add
- **VISUAL_DENSITY** — how much content per screen

This makes it more flexible than brand-specific DESIGN.md files — you can dial in taste without committing to one style.

### Which to Use When

| Situation | Tool |
|---|---|
| "Build me a dashboard that looks like Linear" | Awesome DESIGN.md (Linear file) |
| "Make this generic AI UI look premium" | taste-skill + redesign-skill |
| "I want a specific aesthetic (minimalist/brutalist)" | taste-skill variant |
| "Stop Claude from writing lazy code" | output-skill |
| "Export semantic design rules for Google Stitch" | stitch-skill |

Use both together: `DESIGN.md` for brand identity + `taste-skill` for general polish and output quality.
