---
title: "AI Website Cloner — Reverse-Engineer Any Site Into Clean Next.js Code"
date: 2026-04-06
category: Skills & Plugins
redirect_from:
  - "/wiki/tools/ai-website-cloner-template/"
tags: [website-cloning, next-js, reverse-engineering, claude-code, ai-coding, frontend, tailwind, shadcn]
related: ["Gstack — Garry Tan's AI Software Factory for Claude Code", "Awesome DESIGN.md — Install Design Taste Into Your AI Coding Agent"]
icon: "🔄"
image: "/assets/images/ai-website-cloner-template.png"
---

Cloning a website's design used to mean manually inspecting HTML, extracting CSS, downloading assets, then rebuilding component by component. `ai-website-cloner-template` automates this entire process — give it a URL, and AI agents reverse-engineer the site into a clean, modern Next.js codebase.

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

Works with **12+ agents**: Claude Code (recommended, Opus 4.6), GitHub Copilot, Cursor, Windsurf, Gemini CLI, Cline, Roo Code, Continue, Amazon Q, Augment Code, Aider, Codex CLI.

## Use Cases

| Scenario | Description |
|----------|-------------|
| **Platform migration** | WordPress/Webflow/Squarespace → Next.js |
| **Source code recovery** | Rebuild a live site when source code is lost |
| **Learning** | Study how production sites structure their layouts and interactions |

## Ethical Note

The project explicitly prohibits phishing, impersonation, or passing off designs as your own. It's meant for legitimate migration, recovery, and learning — not cloning someone else's brand.
