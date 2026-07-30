---
title: "AI Website Cloner — Reverse-Engineer Any Site Into Clean Next.js Code"
date: 2026-04-06
category: Skills & Plugins
redirect_from:
  - "/wiki/tools/ai-website-cloner-template/"
tags: [website-cloning, next-js, reverse-engineering, claude-code, ai-coding, frontend, tailwind, shadcn]
related: ["Gstack — Garry Tan's AI Software Factory for Claude Code", "Agents with Taste — Encoding Design Judgment as Skill Files"]
icon: "🔄"
image: "/assets/images/ai-website-cloner-template.png"
---

Cloning a website's design used to mean manually inspecting HTML, extracting CSS, downloading assets, then rebuilding component by component. `ai-website-cloner-template` automates this process — give it a URL, and AI agents reverse-engineer the site into a clean, modern Next.js codebase.

*Source: [GitHub - JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)*

## How It Works: 5-Phase Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   Recon   │ ─▶│Foundation│ ─▶│  Comp.   │ ─▶│ Parallel │ ─▶│ Assembly │
│Screenshots│   │  Tokens  │   │  Specs   │   │  Build   │   │  & QA    │
│Interactions│  │  Assets  │   │CSS values│   │Worktrees │   │  Merge   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

1. **Reconnaissance** — Screenshots, design token extraction, interaction analysis (scroll, hover, click, responsive)
2. **Foundation** — Updates typography/color system, downloads all media assets
3. **Component Specs** — Generates detailed specs with exact `getComputedStyle()` values, behavior models, responsive breakpoints
4. **Parallel Build** — Launches independent builder agents in separate git worktrees (one per section)
5. **Assembly & QA** — Merges worktrees, integrates page, visual comparison against original

The key innovation: it extracts **exact computed CSS values** via `getComputedStyle()` instead of letting AI guess styles — ensuring high visual fidelity.

## Usage

```bash
# Clone the template
git clone https://github.com/JCodesMore/ai-website-cloner-template.git my-clone
cd my-clone && npm install

# Start your AI agent with browser access
claude --chrome

# Clone a website
/clone-website https://target-site.com
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 + App Router |
| UI | React 19 + TypeScript (strict) |
| Components | shadcn/ui + Radix primitives |
| Styling | Tailwind CSS v4 + oklch tokens |
| Icons | Lucide React |

## Supported AI Agents

The README recommends Claude Code with Opus 4.8 for best results and describes support for a variety of AI coding agents. Treat the agent list and model recommendation as fast-moving: verify the current README before turning this into a workshop handout.

## Real-World Use Cases

| Scenario | Description |
|----------|-------------|
| **Platform migration** | WordPress/Webflow/Squarespace → Next.js |
| **Source code recovery** | Rebuild a live site when source code is lost |
| **Learning** | Study how production sites structure their layouts and interactions |

## How LearnAI Team Could Use This

- **Rebuild legacy LearnAI pages** — migrate older pages or prototypes into maintainable Next.js components.
- **Create reference implementations** — study high-quality education, documentation, and tool sites to improve LearnAI UI patterns.
- **Prototype course microsites** — quickly generate first-pass layouts from approved reference sites, then rewrite copy and branding for LearnAI.

## Ethical Note

The project explicitly prohibits phishing, impersonation, or passing off designs as your own. Use it for legitimate migration, source-code recovery, learning, and reference implementation work — not cloning someone else's brand or evading license / ownership boundaries.
