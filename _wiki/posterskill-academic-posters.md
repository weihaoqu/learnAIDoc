---
title: "Posterskill — AI-Generated Academic Conference Posters from Your Paper"
date: 2026-03-22
category: AI Education
tags: [claude-code, academic, poster, research, overleaf, latex, education]
related: ["Claude Code Skills: Resources & Repos", "Create Custom Course Materials with Claude", "Claude-Prism — Local-First Academic Writing Workspace with AI"]
icon: "📊"
image: "/assets/images/posterskill-academic-posters.png"
---

Posterskill is a [Claude Code skill](https://github.com/ethanweber/posterskill) that generates print-ready conference posters from your paper. Point it at your Overleaf source and project website — it extracts content, downloads figures, fetches logos, and builds an interactive poster you can edit in your browser. Single HTML file, no build step, no dependencies.

*Source: [GitHub - ethanweber/posterskill](https://github.com/ethanweber/posterskill) | [Claude Code Skills Docs](https://docs.anthropic.com/en/docs/claude-code)*

## The Problem It Solves

Making conference posters is tedious. You've already written the paper — why manually re-layout the content into PowerPoint or a LaTeX poster template? Posterskill reads your paper directly and generates a structured, visually coherent poster draft that you then refine interactively.

## How It Works

```
Your Overleaf Paper     Project Website URL
       ↓                       ↓
   /make-poster (Claude Code skill)
       ↓
   Extracts text, figures, tables, logos
       ↓
   Generates poster/index.html
       ↓
   Open in browser → drag, swap, resize
       ↓
   Copy Config JSON → paste back to Claude
       ↓
   Claude refines → repeat until perfect
       ↓
   Print to PDF (margins: none, background graphics: on)
```

## Quick Start

```bash
# Clone the skill and your paper
git clone git@github.com:ethanweber/posterskill.git poster && cd poster
git clone https://git.overleaf.com/YOUR_PROJECT_ID overleaf

# Optionally add reference posters for style matching
cp ~/some_poster.pdf references/

# Start Claude Code and run the skill
claude
/make-poster
```

## Interactive Editing Features

The poster is a **self-contained HTML file** with a built-in visual editor:

| Feature | How |
|---|---|
| Resize columns | Drag column dividers |
| Resize cards | Drag row dividers within columns |
| Swap cards | Click one diamond handle, then another |
| Move cards | Click handle, then click a drop zone |
| Adjust font size | A-/A+ buttons (global control) |
| Print preview | Preview mode shows exact print layout |
| Save layout | Export as JSON, reload later |
| Load layout | Paste JSON back to Claude for refinement |

## Programmatic API

Available in browser console or via [Playwright](https://playwright.dev/) automation:

```javascript
posterAPI.swapCards('method', 'results')   // swap two cards
posterAPI.moveCard('quant', 'col1', 2)     // move card to position
posterAPI.setColumnWidth('col1', 280)      // resize column (mm)
posterAPI.setFontScale(1.5)                // adjust text size
posterAPI.getWaste()                       // measure whitespace
posterAPI.getConfig()                      // get full config JSON
```

Claude uses Playwright under the hood to measure image aspect ratios, auto-optimize column widths, take screenshots for verification, and generate PDFs at full print resolution.

## Inputs

| Input | Source | Required |
|---|---|---|
| Paper | `overleaf/` directory | Yes |
| Project website | URL (asked at runtime) | Yes |
| [Reference posters](https://github.com/ethanweber/posterskill#inputs) | `references/` directory | No — for style matching |
| Author website | URL for brand/style matching | No |
| Formatting specs | Conference instructions URL | Asked if missing |
| Logos | Auto-downloaded from your website | Auto |

## Why This Matters for Academics and Students

**For researchers:** Conference poster deadlines are always tight. This turns a multi-hour layout task into a 15-minute refinement session. You focus on content decisions (what to emphasize, what to cut), not pixel-pushing.

**For students:** First-time poster presentations are intimidating. Posterskill generates a professional-looking draft automatically — students learn poster design by refining an AI-generated starting point rather than staring at a blank canvas.

**For courses:** Could be integrated into research methods courses where students present findings. The interactive editing teaches layout principles (column proportions, visual hierarchy, whitespace) through hands-on manipulation.

**For AI education research:** Demonstrates the "AI as collaborator" model — the AI generates a draft, the human refines it through an iterative feedback loop (edit in browser → copy JSON → Claude refines → repeat). This is exactly the kind of human-AI collaboration workflow that LAI research can study.

## Further Reading

- [Posterskill GitHub](https://github.com/ethanweber/posterskill)
- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Playwright Automation](https://playwright.dev/)
- [Other academic poster skills](https://agentskills.so/skills/davila7-claude-code-templates-latex-posters) — LaTeX-based alternatives
