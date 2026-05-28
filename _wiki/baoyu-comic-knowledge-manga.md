---
title: "baoyu-comic — Turn Any Knowledge Into a Manga"
date: 2026-05-21
category: Creative & Media
tags: [comic, manga, visual-learning, skill-files, claude-code, image-generation, educational-content, baoyu, hermes-agent]
related: ["Claude Code Top 20 Skills — A Curated Map of the Power Skills Ecosystem", "Non-Coding Skills in Claude Code — The Overlooked Half of Agentic AI", "Vibe Coding 新手指南 — The Open-Source Primer for Non-Technical AI-Assisted Development"]
icon: "🎭"
image: "/assets/images/baoyu-comic-knowledge-manga.png"
---

**`baoyu-comic` is a Claude Code skill that converts any topic — a concept, biography, or tutorial — into a multi-page knowledge manga with consistent characters, a storyboard, and exported pages.** It ships with six art styles, seven tones, seven layouts, and five named presets, making it a full visual-content pipeline inside an AI agent. (The original baoyu-skills version can merge pages into a PDF; the Hermes port output format varies — see repo for current behavior.)

*Source: Nous Research (@NousResearch, May 2026) | Original skill: github.com/JimLiu/baoyu-skills | Hermes port: github.com/NousResearch/hermes-agent*

## Who Built This

The skill was created by **JimLiu**, known online as 宝玉 (Baoyu), Twitter `@dotey`, based in Chicago (site: baoyu.io). His `baoyu-skills` repo has 19,100+ GitHub stars and 2,200+ forks. baoyu-skills is a widely-used Claude Code skill collection (github.com/JimLiu/baoyu-skills). The skills are written in TypeScript and run via Bun.

The skill was ported into **Nous Research's Hermes Agent** (open-source) as a built-in bundled skill. Hermes runs on 200+ models via OpenRouter/Anthropic/OpenAI and compatible local backends; `baoyu-comic` is included as a built-in skill (see hermes-agent.nousresearch.com for current skill catalog and version details).

## Installation

```bash
# Via baoyu-skills (original — standalone install)
npx skills add https://github.com/jimliu/baoyu-skills --skill baoyu-comic

# Via Hermes Agent (bundled built-in — no install needed)
# Trigger keywords: "知识漫画", "教育漫画", "biography comic", "tutorial comic", "Logicomix-style"
```

Install via Hermes Agent directly (bundled built-in skill); for standalone use, install from the baoyu-skills collection via npx.

**Requires:** an image generation API key — OpenAI, Azure OpenAI, Google, OpenRouter, DashScope, or Replicate.

## The Six Art Styles

| Style | Description |
|-------|-------------|
| `ligne-claire` *(default)* | Clean outlines, minimal shading — Franco-Belgian comics (Tintin aesthetic) |
| `manga` | Japanese manga aesthetic — expressive characters, speed lines |
| `realistic` | Photorealistic rendering |
| `ink-brush` | Traditional ink brush painting style |
| `chalk` | Chalk or pastel drawing feel |
| `minimalist` | Stripped-down, simple shapes — highest clarity |

## The Seven Tones & Seven Layouts

**Tones:** `neutral` (default), `warm`, `dramatic`, `romantic`, `energetic`, `vintage`, `action`

**Layouts:** `standard` (default), `cinematic`, `dense`, `splash`, `mixed`, `webtoon`, `four-panel`

## Five Named Presets

Presets combine style + tone + layout into a single opinionated package:

| Preset | Style + Tone | Best For |
|--------|-------------|----------|
| `ohmsha` | ligne-claire + neutral | Technical textbook style; visual metaphors, no talking heads, gadget reveals |
| `wuxia` | ink-brush + action | Martial-arts narratives; qi effects, combat choreography |
| `shoujo` | manga + romantic | Character-driven stories; decorative elements, expressive eyes |
| `concept-story` | manga + warm | Concept explainers; visual symbol systems, growth arcs |
| `four-panel` | minimalist + neutral + four-panel | 起承转合 structure; B&W with spot color accents |

## CLI Flags

```
--art          Art style (see table above)
--tone         Emotional tone
--layout       Panel layout
--aspect       Image ratio: 3:4 portrait (default), 4:3, 16:9
--lang         Output language
--ref          Reference image for character consistency
--batch-size   Pages per batch render
--storyboard-only   Stop after storyboard generation
--prompts-only      Generate image prompts but skip rendering
--images-only       Skip storyboard, render from existing prompts
--regenerate N      Re-render page N
```

## The Full Pipeline

```
1. Load user preferences from EXTEND.md (custom style rules)
2. Analyze content + confirm style with user
3. Generate storyboard + character definitions
4. Write image prompts as .md files (one per panel — reproducibility record)
5. Generate a character sheet PNG (ensures consistent appearance across pages)
6. Batch-render pages via the image generation backend
7. Merge all pages into a final PDF
```

**Output folder:** `comic/{topic-slug}/` containing source markdown, content analysis, storyboard, character definitions, per-panel image prompt files, PNGs, and the final PDF (original version). The Hermes port emphasizes PNG downloads and a completion report; PDF merging behavior may differ.

## Hermes Port vs. Original

| Aspect | Original (baoyu-skills) | Hermes Port |
|--------|------------------------|-------------|
| Image tool | Configurable backend (OpenAI/Azure/etc.) | Hermes built-in `image_generate` tool |
| Character consistency | Optional `--ref` image passing | Text descriptions in `characters/characters.md` |
| Image paths | Relative paths | Must download to absolute paths (explicit requirement) |
| Trigger | Slash command | Natural language keywords |

## How LearnAI Team Could Use This

- **AI Education outreach** — convert a complex topic (e.g., "what is a transformer?") into a 6-page manga that non-technical audiences actually want to read and share
- **Course material previews** — create a manga teaser for a new module to boost enrollment interest and social reach
- **Research communication** — turn a paper's key findings into a Logicomix-style narrative for conference posters or X/LinkedIn posts
- **Student assignments** — ask students to generate a knowledge manga as a synthesis project; the storyboard phase forces structured conceptual thinking
- **Showcasing Claude Code capabilities** — live-demo the skill to show how far agent workflows have come beyond text output

## Real-World Use Cases

| Scenario | How to use |
|----------|------------|
| Explain a CS concept (e.g., "garbage collection") | `baoyu-comic "how garbage collection works" --art manga --preset concept-story` |
| Biography of a historical figure | `baoyu-comic "Alan Turing biography" --art ligne-claire --tone warm` |
| Tutorial for a library or tool | `baoyu-comic "How to use Pandas DataFrames" --preset ohmsha` |
| Chinese-language educational content | Add `--lang zh` to any command; four-panel layout works well for social media |
| Fast explainer for a blog post | `--storyboard-only` first to review narrative before spending image credits |
| Wuxia-style CS allegory | `--preset wuxia` — concept as martial art, bugs as enemies |

## Important Things to Know

- **Image generation costs money.** Each page is a separate API call. Use `--storyboard-only` or `--prompts-only` to preview before committing to a full render.
- **Character consistency is the hard problem.** The skill addresses this with a dedicated character sheet PNG and text descriptions, but photorealistic styles show more drift across pages than manga or minimalist.
- **The storyboard is the real work.** A good storyboard means a good comic. The text analysis + storyboard phase is where the AI does the most valuable structuring — worth reviewing before auto-rendering.
- **`--regenerate N` is your friend.** If one panel doesn't land, regenerate just that page rather than re-running the whole batch.
- **EXTEND.md is your customization hook.** Drop persistent style rules, character defaults, or brand preferences into `EXTEND.md` and the skill picks them up automatically on each run.
