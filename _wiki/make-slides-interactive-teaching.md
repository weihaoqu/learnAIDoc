---
title: "Make Slides: AI-Powered Interactive Teaching Slides"
date: 2026-04-14
category: Skills & Plugins
redirect_from:
  - "/wiki/skills & plugins/make-slides-interactive-teaching/"
tags: [claude-code, skills, teaching, slides, canvas, interactive, education, html]
related: ["Skill Seekers: Auto-Generate Claude Skills", "Claude Code Power User Tips", "AI Tools for High-Engagement Learning", "AI in Education — Teacher's Factory, Not Student's Cheat Tool", "HTML PPT Studio — AI-Powered Presentation Skill for Claude Code"]
icon: "🎓"
image: "/assets/images/make-slides-interactive-teaching.png"
---

Make Slides is a Claude Code skill that transforms lecture slides (PPTX, PDF, or plain topics) into self-contained, interactive HTML slide decks with Canvas visualizations, step-through animations, and challenge quizzes. No build system, no dependencies -- just one HTML file per deck.

*Source: [GitHub Repo](https://github.com/weihaoqu/make-slides-skill) | [Live Example - CS305 TM](https://monmouthaiteaching.com/research/slides/cs305/tm/tm-enhanced.html) | [Live Example - CS305 UTM](https://monmouthaiteaching.com/research/slides/cs305/utm/utm-enhanced.html)*

## What It Does

The skill takes any lecture source material and produces interactive HTML decks that students navigate with arrow keys. Each deck is a single self-contained file with embedded CSS and JavaScript -- no external dependencies, no build step, no server needed.

| Input | Output | Example |
|-------|--------|---------|
| PPTX file | Interactive HTML deck | `sorting.pptx` -> `sorting-enhanced.html` |
| PDF file | Interactive HTML deck | `chapter5.pdf` -> `chapter5-enhanced.html` |
| Topic description | Interactive HTML deck | "Turing Machines" -> `tm-enhanced.html` |
| Existing HTML deck | Enhanced version | `tm-explained.html` -> `tm-enhanced.html` |

## Architecture

The skill is actually two skills working together via a unified `/make-slides` command:

```
/make-slides <input>
      |
      v
+------------------+     +------------------+
| slide-generator  | --> | enhance-slides   |
| (Phase A)        |     | (Phase B)        |
| Extract content  |     | Add interactivity|
| Plan structure   |     | Canvas visuals   |
| Generate HTML    |     | Step-throughs    |
+------------------+     +------------------+
                               |
                               v
                    +------------------+
                    | Quality Audit    |
                    | (Phase C)        |
                    | 5-agent review   |
                    +------------------+
```

## Key Design Principles

### 1. Canvas Over Everything

All visualizations use the HTML5 Canvas API -- not SVG, not images, not ASCII art. Canvas provides:
- Smooth animations for step-through walkthroughs
- Color-coded states (green = accept, red = reject, amber = current)
- Interactive elements (click, hover, input-driven)

### 2. Step-Through Pattern

Complex concepts (algorithms, proofs, constructions) are presented as step-through walkthroughs with Prev/Next buttons:

```
+------------------------------------------+
|  Canvas visualization (changes each step)|
+------------------------------------------+
|  [<- Prev]  Step 3 / 5  [Next ->]       |
+------------------------------------------+
|  Plain-English explanation of this step   |
+------------------------------------------+
```

Each step shows both the **visual change** and a **plain-English explanation** of what happened and why. This is critical -- a visualization without explanation doesn't teach.

### 3. One Idea Per Slide

Dense slides get split. A slide should never contain both a definition AND its proof, or both a concept AND an exercise. Students process one thing at a time.

### 4. Dark Theme Framework

All decks share a consistent dark slate theme:

| Element | Color |
|---------|-------|
| Background | `#0f172a` |
| Panel/card | `#1e293b` |
| Primary text | `#e2e8f0` |
| Heading gradient | `#3b82f6` to `#8b5cf6` |
| Key idea (blue box) | `rgba(59,130,246,0.15)` |
| Warning (orange box) | `rgba(245,158,11,0.12)` |
| Analogy (green box) | `rgba(16,185,129,0.12)` |

## Enhancement Patterns

The skill matches content types to specific visualization patterns:

| Content Type | Enhancement | Priority |
|-------------|-------------|----------|
| Algorithm walkthrough | Step-through with Canvas animation | HIGH |
| Proof by contradiction | Canvas step-through (claim -> assume -> construct -> contradict -> conclude) | HIGH |
| Classification/hierarchy | Three-card layout + Venn diagram canvas | HIGH |
| Encoding/construction | Multi-step canvas walkthrough with color-coded transformations | HIGH |
| Automata diagram | Canvas state diagram + companion transition table | HIGH |
| Data structure operations | Interactive playground (user inputs values) | HIGH |
| Comparison | Side-by-side Canvas with toggle | HIGH |
| Definition | Static with `.key-idea` / `.warning` / `.analogy` callouts | LOW |

## Pedagogical Rules

These rules were refined through iterating on CS305 automata theory slides:

1. **Replace ASCII with Canvas** -- ASCII diagrams on dark backgrounds are unreadable
2. **State claims before proofs** -- "Theorem: HALT is undecidable" in a box BEFORE proof steps
3. **Explain jargon inline** -- brief callout box right where the term appears
4. **Add "In plain English" columns** -- technical tables need a human-readable column
5. **Three-card layouts for comparisons** -- side-by-side colored cards (green/amber/red)
6. **Cut overly advanced content** -- if prerequisites haven't been covered, remove it
7. **Canvas walkthroughs for constructions** -- concrete example with color-coded parts

## Self-Loop Fix (Automata Diagrams)

A critical Canvas rendering fix: self-loops on state diagrams must draw as nearly-complete circles, not small arc slivers.

```javascript
// WRONG: renders as invisible sliver
ctx.arc(x, y, r, 0.3*Math.PI, 0.7*Math.PI);

// CORRECT: nearly complete circle, opening faces the state
ctx.arc(x, y, r, 0.8*Math.PI, 0.2*Math.PI);
```

## Installation

```bash
# Clone the repo
git clone https://github.com/weihaoqu/make-slides-skill.git

# Run the installer (copies skills + command to ~/.claude/)
cd make-slides-skill && bash install.sh
```

## Usage

```bash
# From Claude Code:
/make-slides path/to/lecture.pptx
/make-slides path/to/chapter.pdf
/make-slides "Turing Machines for CS305"

# Enhance an existing deck:
/make-slides path/to/tm-explained.html
```

The skill follows a **plan-approve-build** workflow:
1. Reads source and proposes a slide-by-slide plan
2. Waits for approval
3. Builds in 3 parts with checkpoint approval after each

## Deployment

Enhanced decks are self-contained HTML files that can be served from anywhere:

```bash
# GitHub Pages
cp deck-enhanced.html /path/to/course-slides/cs305/
git add . && git commit && git push

# EC2 / any static host
scp deck-enhanced.html user@server:/path/to/slides/
```

## Make Slides vs HTML PPT Studio

Both are Claude Code skills that generate HTML slide decks, but they solve different problems:

| Factor | Make Slides | HTML PPT Studio |
|---|---|---|
| **Optimized for** | Teaching (interactive lectures) | General presentations |
| **Interactivity** | Step-through walkthroughs, playgrounds | Decorative animations |
| **Pedagogy** | Built-in rules (one idea/slide, state before prove) | None |
| **Themes** | 1 (dark slate) | 36 (cyberpunk to academic) |
| **Presenter mode** | No | Yes (speaker scripts, timer) |
| **Input types** | PPTX, PDF, topic, existing HTML | Natural language prompt |
| **Quality control** | 5-agent review | None |
| **Best for** | CS lectures with algorithms, proofs, automata | Pitch decks, tech talks, reports |

**When to use which:**
- Need step-through algorithm animation or interactive playground → **Make Slides**
- Need a quick pitch deck, conference talk, or themed presentation → **[HTML PPT Studio](/learnAIDoc/wiki/html-ppt-studio-skill/)**
- Need a lecture with Canvas walkthroughs and pedagogical structure → **Make Slides**
- Need presenter mode with speaker scripts → **HTML PPT Studio**

## Scale

Currently powering 79+ slide decks across 5 courses:
- CS205 Data Structures (15 decks)
- CS305 Theory of Computation (11 decks including TM, UTM, PnP)
- CS310 Advanced Programming
- CS336 Programming Languages
- BF422 Business Finance
