---
title: "guizang-ppt-skill — The Cross-Agent HTML Slide Generation Skill"
date: 2026-05-21
category: AI Tools & Workflows
tags: [html-slides, presentation, agent-skill, model-agnostic, claude-code, cursor, codex, vibe-coding, open-source, slides]
related: ["HTML PPT Studio — AI-Powered Presentation Skill for Claude Code", "GPT Image 2 水墨风 Slide Prompt — Structured Template for Ink-Wash Style Slides", "open-slide — The Slide Framework Built for AI Coding Agents", "Claude Code 必装/进阶十大 Skill — A Community-Curated Map of 20 Power Skills", "AI Slide Generation with Claude Code — Tool Comparison & Guide"]
icon: "📊"
image: "/assets/images/guizang-ppt-skill.png"
---

**guizang-ppt-skill is an open-source agent skill for generating self-contained HTML slide decks — horizontal-swipe presentations viewable in any browser. Its defining characteristic is broad agent compatibility: the skill is documented to work across Claude Code, Codex, Cursor, and similar agentic coding tools. It reached 10,000 GitHub stars in approximately 25 days as of May 2026, a signal that structured slide generation remains a high-demand unsolved problem even with many competing tools available.**

*Source: [GitHub — op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) | [Weibo post by 歸藏的AI工具箱](https://weibo.com) (May 2026)*

## What Makes This Different from Other Slide Skills

The crowded slide-generation landscape (Gamma, Beautiful.ai, Tome, platform-specific agent skills) mostly targets one agent ecosystem or produces proprietary formats. guizang-ppt-skill is positioned differently:

| Dimension | guizang-ppt-skill | Typical slide AI tools |
|---|---|---|
| Output format | Self-contained HTML (browser-viewable) | Proprietary format or single-platform |
| Agent support | Claude Code, Codex, Cursor, and similar tools | Usually one agent/platform |
| Agent integration | Drop-in skill file | Platform-specific |
| Approach | Skill/prompt engineering | SaaS product |

The author explicitly prioritized cross-agent consistency: "I did a lot of work to ensure it has very, very good results on any model, any agent." This is harder than it sounds — slide structure, layout logic, and visual hierarchy are areas where different models diverge significantly.

## How It Works

guizang-ppt-skill is a SKILL.md-style agent instruction file. You install it into your agent's skill/rules directory and invoke it with a topic or outline:

```bash
# Claude Code example
/install guizang-ppt-skill

# Then invoke
/guizang-ppt Create a 10-slide deck on "Transformer Architecture for Beginners"
```

The skill instructs the agent on slide structure, content density, visual layout principles, and output formatting — producing a complete self-contained HTML slide deck viewable in any browser.

## Rapid Adoption Signal

Reaching 10,000 GitHub stars in roughly 25 days in May 2026 — in a category with many established competitors — is a meaningful signal. The author's own reflection on this:

> "In a market with so many PPT generation skills already, it still reached this milestone in under a month. Quality and experience are still the deciding factors."

This is worth noting for the AI education context: it illustrates that execution quality (not just functionality) determines adoption even when the problem space is crowded.

## Distinction from HTML PPT Studio

The wiki already has an entry for HTML PPT Studio, which generates HTML-based slide decks optimized for Claude Code. Both tools produce HTML output, so they are more similar than different — the key distinction is scope and community:

| | guizang-ppt-skill | HTML PPT Studio |
|---|---|---|
| Format | Self-contained HTML (horizontal-swipe) | HTML/web-based |
| Agent scope | Claude Code, Codex, Cursor, and more | Claude Code focused |
| Editing after | Browser / code editor | Browser / code editor |
| Best for | Cross-agent portability, broad adoption | Deep Claude Code integration |

Both are good choices for HTML slide generation. Choose guizang when you want a skill that travels across different agents or want the benefit of its large community. Choose HTML PPT Studio when you are Claude Code-only and want tighter ecosystem integration.

## How LearnAI Team Could Use This

- **Rapid course material prototyping** — generate a 15-slide module outline as an HTML deck for instructor review before investing in polished design
- **Cross-tool teaching demos** — use it to demonstrate how the same agent skill works across Claude Code, Codex, and Cursor; directly relevant to "cross-agent skill design" as a concept
- **Student capstone presentations** — have students use the skill to generate an initial deck, then refine it — teaching AI-assisted workflow rather than starting from blank slides
- **Comparing output quality across agents** — run the same prompt through Claude Code and Cursor using this skill; analyze differences as an AI literacy exercise
- **Skill file design study** — the source SKILL.md is a good example of how to write agent instructions that generalize across different agentic coding tools

## Real-World Use Cases

| Scenario | How to use |
|---|---|
| Professor needs a guest lecture deck by tomorrow | Prompt with outline; refine 20% manually; open HTML in browser — done in under an hour |
| Student group project presentation | Generate structure with guizang; each student fills in their section |
| AI course demo: "same skill, different agents" | Run identical prompt on Claude Code and Cursor; compare slides side by side |
| Workshop facilitator needs shareable slides | Output HTML deck → share link or host statically → distribute |
| Researcher summarizing a paper into slides | Paste abstract + key findings; generate a 6-slide HTML summary deck |

## Important Things to Know

- **"Works across all agents" has limits** — the skill is documented for Claude Code, Codex, and Cursor; actual output quality will vary by agent capability; test on your target tool before relying on it for important deliverables
- **Output is HTML, not .pptx** — the generated deck is a self-contained HTML file for browser viewing; if you need a traditional PowerPoint file, this is not the right tool
- **Star counts are volatile** — 10,000 stars as of May 2026; GitHub stars reflect hype as much as production utility
- **Output needs review** — AI-generated slides routinely have layout inconsistencies, overly dense text, or misplaced emphasis; treat the output as a first draft
- **Skill file format matters** — how you install and invoke it depends on your agent; Claude Code, Cursor, and Codex each have slightly different skill/rule integration paths
- **Compare with your existing workflow** — if your team already uses HTML PPT Studio, evaluate guizang on cross-agent portability and community size rather than output format (both produce HTML)
- **Open source and forkable** — the SKILL.md source is available; you can customize the instructions for your specific domain (CS education, research presentations, etc.)
