---
title: "HTML PPT Studio — AI-Powered Presentation Skill for Claude Code"
date: 2026-04-17
category: Skills & Plugins
tags: [presentations, slides, html, agent-skills, claude-code, teaching, ppt, themes]
related: ["Claude Code Skills: Resources & Repos", "Non-Coding Skills for Claude Code — Automating Business & Life", "Make Slides: AI-Powered Interactive Teaching Slides"]
icon: "📊"
image: "/assets/images/html-ppt-studio-skill.png"
---

HTML PPT Studio is an AgentSkill that turns Claude Code into a full presentation design tool. One install command gives you **36 themes**, **31 page layouts**, **47 animations** (27 CSS + 20 canvas FX), **15 full-deck templates**, and a **presenter mode** with speaker scripts and timer — all pure static HTML/CSS/JS with zero build step. 2.9k+ stars on GitHub (and climbing fast since launch on April 15, 2026).

*Source: [GitHub — lewislulu/html-ppt-skill](https://github.com/lewislulu/html-ppt-skill) (2.9k+ stars, MIT license) | Originally surfaced via Xiaohongshu post by @冰雨学AI*

## Why This Matters

Most AI slide tools produce either bland PPTX files or require complex toolchains. HTML PPT Studio takes a different approach: every presentation is a self-contained HTML file you can open in any browser, host on any server, or print to PDF. The design system is token-driven (CSS custom properties), so swapping a single `<link>` tag reskins the entire deck. No PowerPoint, no Google Slides, no Keynote dependency.

## Installation

```bash
npx skills add https://github.com/lewislulu/html-ppt-skill
```

After install, any Claude Code session can generate presentations from natural language:

```
> "做一份 8 页的技术分享 slides，用 cyberpunk 主题"
> "turn this outline into a pitch deck"
> "create a 12-slide lecture on memory hierarchies, academic-paper theme"
```

## What's in the Box

| Category | Count | Details |
|---|---|---|
| Themes | 36 | From `minimal-white` to `cyberpunk-neon` to `academic-paper` |
| Full-deck templates | 15 | pitch-deck, tech-sharing, course-module, weekly-report, xhs-post, etc. |
| Single-page layouts | 31 | cover, timeline, mindmap, code, chart-bar, arch-diagram, gantt, comparison, etc. |
| CSS animations | 27 | fade, rise-in, glitch-in, typewriter, card-flip-3d, parallax-tilt, etc. |
| Canvas FX | 20 | particle-burst, matrix-rain, knowledge-graph, neural-net, galaxy-swirl, etc. |
| Presenter mode | Built-in | Press `S` — magnetic cards for current slide, next preview, speaker script, timer |

## Key Themes (Selected)

Themes span professional, academic, creative, and playful styles:

- **Professional:** `corporate-clean`, `pitch-deck-vc`, `swiss-grid`, `editorial-serif`
- **Academic:** `academic-paper`, `engineering-whiteprint`, `blueprint`
- **Dev-friendly:** `dracula`, `tokyo-night`, `nord`, `terminal-green`, `catppuccin-mocha`
- **Creative:** `cyberpunk-neon`, `vaporwave`, `neo-brutalism`, `glassmorphism`, `memphis-pop`
- **Chinese social:** `xiaohongshu-white` (小红书白底杂志风)

Each theme is a pure CSS token file — colors, fonts, shadows, radii. Change one `<link>`, the whole deck reflows.

## Presenter Mode

Press `S` on any deck to open a separate presenter window with four draggable, resizable cards:

1. **Current slide** — pixel-perfect iframe of what the audience sees
2. **Next slide preview** — same rendering engine, guaranteed color match
3. **Speaker script** — prompt-style notes, not full paragraphs to read
4. **Timer** — reset with `R`

The two windows sync via `BroadcastChannel`. Navigation sends `postMessage` to iframes — no reload, no flicker.

**Speaker script golden rules** (from the docs):
- Bold keywords, not full sentences — these are prompts, not scripts
- 150-300 words per slide (roughly 2-3 minutes of speaking)
- Write conversationally, not formally

## Full-Deck Templates

The 15 templates cover real scenarios out of the box:

| Template | Use Case |
|---|---|
| `pitch-deck` | Startup / VC pitch |
| `tech-sharing` | Internal tech talk or meetup |
| `course-module` | Lecture or workshop |
| `weekly-report` | Team status update |
| `product-launch` | Product announcement |
| `xhs-post` | 9-slide 3:4 social media carousel |
| `presenter-mode-reveal` | Full talk with 150-300 word speaker scripts per slide |

## Example Prompts by Use Case

**Lecture (professor preparing a class):**
```
Create a 15-slide lecture on "Introduction to Formal Verification"
using the academic-paper theme. Include: cover, learning objectives,
3 concept explanation slides with code examples, a comparison slide
(model checking vs theorem proving), a timeline of key milestones,
and a summary. Add speaker scripts for presenter mode.
```

**Conference talk:**
```
Turn this abstract into a 10-slide conference presentation using
the swiss-grid theme with rise-in animations. Include an arch-diagram
slide for system architecture and a chart-bar slide for benchmark results.
Generate speaker scripts at 200 words per slide.
```

**Startup pitch:**
```
Build a 12-slide pitch deck using the pitch-deck-vc template.
Slides: problem, solution, market size (stat-highlight layout),
product demo (image-hero), business model, traction (chart-line),
team, competitive landscape (comparison), financials (kpi-grid),
ask, and thanks.
```

## Keyboard Shortcuts

```
← → Space PgUp PgDn    Navigate slides
F                       Fullscreen
S                       Open presenter window
N                       Notes drawer
O                       Slide overview grid
T                       Cycle themes live
A                       Demo animation on current slide
```

## How LearnAI Team Could Use This

- **Lecture prep** — Q can generate full lecture decks from an outline in seconds. The `course-module` template and `academic-paper` theme are purpose-built for this. Presenter mode with speaker scripts means the deck doubles as lecture notes.
- **Student presentations** — Students install the skill and generate presentations for class projects. The constraint of 31 structured layouts prevents the "wall of text on every slide" problem.
- **Conference talks** — Generate a first draft of research presentation slides from a paper abstract. Iterate on individual slides without regenerating the whole deck (each slide is a standalone HTML section).
- **Teaching HTML/CSS** — The codebase itself is a teaching artifact. Each theme is a pure CSS token file, each layout is a self-contained HTML template. Students can learn design systems by reading how themes work.
- **Xiaohongshu content** — The `xhs-post` template (9 slides, 3:4 ratio) and `xiaohongshu-white` theme are ready-made for LearnAI social media posts.

## Real-World Use Cases

1. **University lectures** — Professors generate structured slide decks with speaker notes, then customize individual slides. The `presenter-mode-reveal` template ships with full speaker scripts as a reference.
2. **Developer meetups and tech talks** — The `tech-sharing` template with `terminal-green` or `dracula` theme produces developer-native slides with syntax-highlighted code blocks and architecture diagrams.
3. **Startup pitch decks** — VC-ready templates with KPI grids, traction charts, and competitive comparison layouts. The `pitch-deck-vc` theme uses the visual language investors expect.
4. **Internal reports** — Weekly reports and project updates with `corporate-clean` theme. Timeline and Gantt layouts visualize project progress without external tools.
5. **Social media carousels** — The `xhs-post` template generates 9-slide 3:4 ratio image sets for Xiaohongshu, Instagram, or LinkedIn carousels.
6. **Workshop materials** — Combine `course-module` template with interactive code slides and step-by-step process layouts for hands-on training sessions.

## Technical Details

- **Zero dependencies** — Pure HTML/CSS/JS. Optional CDN loads for webfonts (Noto Sans SC, Noto Serif SC), highlight.js, and chart.js.
- **Chinese + English first-class** — CJK fonts pre-imported. All templates render correctly in both languages.
- **Token-driven design** — All visual decisions (color, spacing, typography, shadows) live in CSS custom properties. Themes override tokens, not components.
- **Iframe isolation** — Showcase pages use `<iframe>` per slide so multiple themes render side-by-side without CSS collisions.
- **PNG export** — `./scripts/render.sh` uses headless Chrome to render any slide or deck to PNG.

## HTML PPT Studio vs Make Slides

If you're a teacher, you should also know about [Make Slides](/learnAIDoc/wiki/make-slides-interactive-teaching/) — a Claude Code skill built specifically for interactive teaching. Here's how they compare:

| Factor | HTML PPT Studio | Make Slides |
|---|---|---|
| **Optimized for** | General presentations | Teaching (interactive lectures) |
| **Interactivity** | Decorative animations (47 FX) | Step-through walkthroughs with Prev/Next |
| **Pedagogy** | None — generic design | Built-in rules (one idea/slide, state before prove, Canvas over ASCII) |
| **Themes** | 36 | 1 (dark slate) |
| **Presenter mode** | Yes (speaker scripts, timer) | No |
| **Input types** | Natural language prompt | PPTX, PDF, topic, existing HTML |
| **Quality control** | None | 5-agent review |
| **Proven scale** | New (April 2026) | 79+ decks across 5 courses |
| **Best for** | Pitch decks, tech talks, reports, social media | CS lectures with algorithms, proofs, automata |

**When to use which:**
- Need a themed pitch deck or conference talk → **HTML PPT Studio**
- Need step-through algorithm animation or interactive playground → **[Make Slides](/learnAIDoc/wiki/make-slides-interactive-teaching/)**
- Need presenter mode with speaker scripts → **HTML PPT Studio**
- Need pedagogically structured lecture with Canvas walkthroughs → **Make Slides**

## Compared to Other Alternatives

| Tool | Output | Build step | Themes | Presenter mode |
|---|---|---|---|---|
| **HTML PPT Studio** | Static HTML | None | 36 | Yes (magnetic cards) |
| **Make Slides** | Static HTML | None | 1 | No |
| frontend-slides | Static HTML | None | Fewer | No |
| Slidev | Vue-based HTML | Yes (npm) | Community | Yes |
| ppt-agent-skills | PPTX | Yes | Limited | N/A |
| reveal.js (manual) | Static HTML | Optional | ~10 built-in | Yes |

HTML PPT Studio's advantage is the combination of breadth (36 themes, 31 layouts, 47 animations) with zero-config AgentSkill installation. Make Slides' advantage is deep interactivity and pedagogical rigor.

Sources:
- [GitHub — lewislulu/html-ppt-skill](https://github.com/lewislulu/html-ppt-skill)
- [Claude Agent Skills Documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart)
