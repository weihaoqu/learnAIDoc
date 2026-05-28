---
title: "html-anything — Claude Outputs Any Document Type as a Self-Contained HTML File, Zero Config"
date: 2026-05-19
category: Skills & Plugins
tags: [html, claude-code, ai-tools, template, document-generation, open-source, sse-streaming, no-api-key, npm, agent-cli, multi-format]
related: ["The Unreasonable Effectiveness of HTML — Thariq's Case for Output Format Engineering", "What is Agentic Engineering? A Teaching Primer", "Prompt Master — Write Accurate Prompts for Any AI Tool, Zero Waste", "grill-me — When AI Interviews You Before Writing Code"]
icon: "🌐"
image: "/assets/images/html-anything-ai-generator.png"
---

**html-anything** is an open-source, local-first platform (Apache-2.0) that routes a content request through any of its supported AI agent CLIs — Claude Code, Codex, Cursor Agent, Gemini CLI, and others — and returns a single, share-ready HTML file. No API key is required beyond what your chosen agent CLI already uses; the platform runs entirely on your machine. With 75 skill templates spanning 9 deliverable surfaces and real-time SSE streaming so you watch the generation unfold, it collapses the gap between "I have content" and "I have a deliverable."

*Source: Weibo post by 爱可可-爱生活 (May 2026) | GitHub: [github.com/nexu-io/html-anything](https://github.com/nexu-io/html-anything) (Apache-2.0)*

## The core idea

The insight is simple but underexploited: every AI agent CLI already knows how to write HTML — html-anything makes that the *default* output format and gives it 75 concrete template shapes instead of leaving format choice to the prompt author. You pick a deliverable surface (poster, XHS card, data report, prototype, video frame…), supply your content, choose your agent CLI, and the platform returns a single `.html` file ready to open in any browser, export as a high-def PNG, or inline for WeChat using CSS inlining via `juice`.

The flow looks like this:

```
User picks template surface + supplies content
             │
             ▼
    ┌─────────────────────┐
    │    html-anything     │
    │  (template router)   │
    └────────┬────────────┘
             │  dispatches to chosen agent CLI
             ▼
  ┌──────────────────────────┐
  │  Claude Code / Codex /   │
  │  Cursor / Gemini / etc.  │
  └──────────┬───────────────┘
             │  streams HTML via SSE
             ▼
    Single-file HTML output
    (CSS inlined for export)
             │
             ├── Preview in sandboxed iframe
             ├── Export as .html or high-def .png
             └── Inline for WeChat / paste to Weibo / X
```

The platform also handles format conversion: feed it Markdown, CSV, JSON, SQL, or plain text and it converts to the appropriate template before handing off to the agent — so existing structured data becomes a visual document without a separate preprocessing step.

## What it can generate

75 skill templates organized across 9 deliverable surfaces:

| Surface | Template examples |
|---------|-------------------|
| **杂志文章 (Magazine articles)** | Long-form editorial layout, interview Q&A, featured story card, newsletter section |
| **PPT / Slides (Keynote-style decks)** | Title + content deck, comparison slides, step-by-step tutorial, executive summary |
| **海报 (Posters)** | Event announcement, product launch, academic conference poster, infographic poster |
| **小红书卡片 (XHS cards)** | Multi-image carousel card, single-text highlight card, lifestyle tip card, review card |
| **原型 (Web prototypes)** | Mobile app screen, dashboard UI wireframe, onboarding flow, settings page |
| **数据报告 (Data reports)** | KPI summary panel, chart + commentary report, weekly metrics digest, research findings |
| **视频帧 / Hyperframes (Video frames)** | Title card, chapter divider, credit sequence, thumbnail mockup |
| **简历 (Résumé)** | Single-page resume, portfolio page, skills grid layout |
| **推文卡片 (Tweet cards)** | Quote card, thread summary card, stat highlight card |

## The agent CLIs supported

html-anything currently supports 8 stable agent CLIs with one-key switching:

- Claude Code
- OpenAI Codex
- Cursor Agent
- Google Gemini CLI
- GitHub Copilot CLI
- OpenCode
- Qwen Coder
- Aider

The same template and content payload routes to whichever CLI is installed and authenticated locally. This is practically useful for comparing output quality across models or for organizations that standardize on one agent.

## Key technical features

- **No API key required** — html-anything works through the agent CLI's existing authentication. Zero additional API cost beyond what you already pay (or nothing, on free tiers).
- **SSE streaming** — output streams as text deltas/chunks via Server-Sent Events (`text/event-stream`); you watch the HTML page build in real time rather than waiting for a completed file.
- **Sandboxed iframe preview** — a sandboxed browser preview renders the generated HTML immediately so you can review before exporting.
- **HTML/PNG high-def export** — export to a standalone `.html` file or a high-resolution `.png`; the PNG path uses a headless render so CSS and fonts match exactly what you see in preview.
- **CSS inlining for platform publish** — when targeting WeChat, the platform uses `juice` to inline all CSS so styles survive the platform's HTML sanitizer; Zhihu has its own separate handling. For X, Weibo, and XHS, PNG export is the recommended path.
- **Multi-format input** — verified input types include Markdown, CSV/TSV, Excel, JSON, SQL, and plain text; the platform converts to the chosen template before dispatching to the agent CLI.
- **Local-first** — html-anything runs locally and delegates generation to your authenticated CLI. No cloud account or data upload is required on the platform's part.

## How LearnAI Team Could Use This

For Q's work at Monmouth University, html-anything addresses a recurring friction: converting structured course content into polished, shareable artifacts without design overhead.

- **CS-310 (Advanced OO Programming & Design) lab reports** — students submit design critiques as Markdown or JSON class diagrams; html-anything converts them to styled magazine-article or data-report layouts that are easier to present and discuss in class.
- **CS-336 (Program Analysis for Security) vulnerability reports** — security findings have a natural data-report shape; the data-report template turns a raw CSV or JSON finding list into a formatted single-page artifact students can walk through in presentations.
- **Lecture slide drafts** — feed a topic outline (Markdown or plain text) into the keynote-deck surface; Claude Code returns a browser-native slide deck that works without Keynote or PowerPoint.
- **LearnAI social cards for outreach** — course announcements, paper summaries, and AI tool spotlights can be exported as high-def PNGs for WeChat, Weibo, or XHS without a separate design tool.
- **Prototype demos for class** — for UI/UX or software engineering modules, the prototype templates let Claude Code generate interactive wireframes from a feature spec, giving students a concrete artifact to critique.
- **Comparative agent output demos** — because html-anything supports 8 CLIs with one-key switching, Q can demonstrate in real time how Claude Code, Codex, and Gemini differ on the same template task — a concrete teaching moment for the AI Engineering curriculum.

## Real-World Use Cases

| Context | Input | Surface | Output |
|---------|-------|---------|--------|
| Newsletter author | Markdown draft | Magazine article | Styled HTML for WeChat (CSS inlined via juice) |
| Startup team | JSON metrics | Data report | Weekly KPI page with charts, no designer needed |
| Conference organizer | Plain text agenda | Poster | Print-ready HTML exported to high-def PNG |
| Developer advocate | SQL schema | Data report | Visual summary card for documentation |
| Creator (小红书) | Product copy + key stats | XHS card | Multi-panel card exported as PNG for the platform |
| CS instructor | Plain text course outline | Keynote-style deck | Browser-native slide deck, no PowerPoint needed |
| Security researcher | CSV of CVEs | Data report | Filterable vulnerability summary page |
| Video producer | Script excerpt | Hyperframes / video frame | Title card and chapter dividers for editing timeline |

## Important things to know

- **Agent CLI must be installed separately** — html-anything is a template-routing layer, not an AI model. You need at least one of the 8 supported CLIs installed and authenticated locally before any generation runs.
- **Local setup required** — the platform runs via `pnpm install` and a local dev server (`pnpm -F @html-anything/next dev`). The SSE streaming and sandboxed preview features are not available by opening an HTML file directly from disk.
- **Output quality varies by CLI** — the 75 templates are prompt instructions; stronger models (Claude Sonnet, GPT-4o) follow layout constraints more reliably. For production use, Claude Code or Codex are the recommended defaults.
- **Single-file output, not always fully offline** — generated files aim to be self-contained but may reference inline fonts or scripts depending on the template. Review before assuming offline use.
- **PNG is the safe cross-platform export** — for Weibo, X, and XHS, exporting to PNG rather than pasting HTML avoids platform sanitizer issues. For WeChat and Zhihu, the `juice`-inlined HTML path works well.
- **Early-stage project** — as of May 2026 the repo is active but templates and CLI support are still expanding. Check the upstream README for the current list of stable surfaces and CLIs before building workflows around specific features.
- **Relationship to the "HTML over Markdown" thesis** — this tool is the industrialized version of Thariq Shihipar's argument in [The Unreasonable Effectiveness of HTML](/learnAIDoc/wiki/unreasonable-effectiveness-html-claude-code/): html-anything automates the decision to always produce HTML and gives it 75 concrete template shapes, removing the format-choice burden from the prompt author entirely.
