---
title: "Slide Image to Editable PPTX — Tested Agent Workflow for Rebuilding Slide Screenshots"
date: 2026-08-09
category: Creative & Media
tags: [slides, pptx, powerpoint, codex-skill, agent-workflow, image-to-ppt, editable-decks, pptxgenjs]
related: ["AI Slide Generation with Claude Code — Tool Comparison & Guide", "HTML PPT Studio — AI-Powered Presentation Skill for Claude Code", "open-slide — The Slide Framework Built for AI Coding Agents", "Make Slides: AI-Powered Interactive Teaching Slides", "GPT Image 2 水墨风 Slide Prompt — Structured Template for Ink-Wash Style Slides"]
icon: "🧩"
image: "/assets/images/slide-image-to-editable-pptx.png"
---

**slide-image-to-editable-pptx** is a Codex skill for rebuilding slide screenshots as editable PowerPoint decks. The important idea is not "OCR a slide and paste it back." It is to decompose the screenshot into visual assets, editable structure, and editable text before generating the `.pptx`.

The public repo is best understood as a Codex skill/specification with examples, not a packaged one-click CLI or app.

*Source: [GitHub — w1163222589-coder/slide-image-to-editable-pptx](https://github.com/w1163222589-coder/slide-image-to-editable-pptx) | [Repo SKILL.md](https://github.com/w1163222589-coder/slide-image-to-editable-pptx/blob/main/SKILL.md) | [PptxGenJS](https://github.com/gitbrent/PptxGenJS)*

## Why This Matters

There is a common dead end in AI slide workflows: the model can generate a good-looking slide image, but the result is just pixels. You cannot edit the title, move a card, fix one bullet, or translate a label without regenerating the whole image.

This skill points at a better intermediate representation:

```
source slide screenshot
        ↓
pixel-level element inventory
        ↓
Layer A: complex visuals as replaceable images
Layer B: cards, lines, arrows, badges as PPT shapes
Layer C: readable text as PPT text boxes
        ↓
editable .pptx + render/structure validation
```

That makes it part of a broader LearnAI pattern: agents become more useful when they produce editable artifacts, not only final renderings.

## The Three-Layer Model

The repo's core rule is simple and useful:

| Layer | What Goes Here | PPTX Implementation | Editability |
|---|---|---|---|
| **A. Visual assets** | photos, maps, complex illustrations, scientific figures, decorative imagery | image assets, ideally clean generated PNGs with no text | replaceable, moveable, resizeable |
| **B. Structure** | rectangles, cards, circles, lines, arrows, dividers, badges | native PowerPoint shapes | directly editable |
| **C. Content** | titles, labels, bullets, captions, page numbers, table text | native PowerPoint text boxes | directly editable |

The non-negotiable rule is: **do not use the full slide screenshot as the background.** That would preserve visual fidelity but lose the whole reason to rebuild the deck.

## What We Tested Locally

We tested the workflow locally on three example slide sources from the repo materials. This was a semi-manual reconstruction test: I wrote a small PptxGenJS rebuild script from the element inventory. It was not an automatic image-to-PPTX pipeline.

The generated deck passed a structural editability check:

| Slide | Text runs | Native shapes | Pictures | Largest picture coverage |
|---|---:|---:|---:|---:|
| 1 | 13 | 22 | 3 | 15.4% |
| 2 | 45 | 55 | 2 | 20.2% |
| 3 | 32 | 50 | 1 | 38.6% |

The largest image covered less than 40% of any slide, so the generated output we inspected was not a deck of full-slide screenshots. Keynote opened the PPTX and exported a 3-page PDF successfully, and all three pages rendered to PNG.

This proves something narrower than the repo headline: **for these three example slides, the three-layer pattern can produce a PPTX with editable text and shape objects while preserving complex visuals as separate assets.** It does not prove broad reliability across arbitrary slide images.

## Practical Workflow

The repo recommends a staged agent workflow rather than one large prompt:

1. **Analyze first** — inspect each screenshot, list every visible element, classify it into Layer A/B/C, and run a completeness pass for small icons and decorations.
2. **Prepare visual assets** — generate or preserve complex visuals as separate images. In the ideal version, generated assets contain no text, labels, numbers, or letters.
3. **Assemble the PPTX** — use PptxGenJS or a presentation skill to place images, native shapes, and native text in the correct z-order.
4. **Validate** — render the deck, inspect object counts, check for text overflow, and verify that no picture covers most of the slide.

The workflow is slower than "paste screenshot into PowerPoint," but it creates an artifact a human can keep editing.

## When It Is Useful

| Use Case | Why This Skill Helps |
|---|---|
| Recover old slide screenshots | Reconstructs a new, mostly editable PowerPoint from screenshot-only material |
| Convert AI-generated slide images | Keeps the visual concept while making text and layout editable |
| Rebuild social-media slide references | Useful when a screenshot has a strong design worth adapting |
| Clean up inherited decks | Separates background visuals from titles, bullets, badges, and cards |
| Teach output-format engineering | Shows students why "final pixels" are often the wrong artifact |

For LearnAI, the strongest teaching angle is that this is not just a slide utility. It is a concrete example of **representation choice**: asking an agent for a layered editable artifact changes the quality of the human review loop.

## Limitations

Treat this as a promising workflow, not a mature converter.

- The public repo is a skill specification and examples, not a packaged one-command app.
- Our test used a custom/manual rebuild script, so it does not prove automated Phase 1 and Phase 2 quality.
- Visual fidelity was acceptable for feasibility, not pixel-perfect.
- Some complex visuals still contain baked text if they are preserved as cropped images. In our test, the map crop kept labels inside the image.
- The third clean test source was lower resolution because it came from a repo gallery screenshot.
- Structural editability was checked through PPTX XML counts and app export, not by manually editing every object in PowerPoint.
- `npm audit` reported two high-severity advisories through `image-size` as a transitive dependency of `pptxgenjs`; for offline/local reconstruction on trusted inputs this is dependency hygiene risk, while server-side processing of untrusted files would need review before deployment.

## How It Fits with Other Slide Tools

Most LearnAI slide tools generate new decks. This one solves a different problem: **reconstruction**.

| Tool | Best For | Output |
|---|---|---|
| [HTML PPT Studio](/learnAIDoc/wiki/html-ppt-studio-skill/) | quick agent-generated presentation websites | static HTML |
| [Make Slides](/learnAIDoc/wiki/make-slides-interactive-teaching/) | interactive CS teaching decks | HTML + Canvas |
| [open-slide](/learnAIDoc/wiki/open-slide-agent-native-presentations/) | agent-native React slide authoring | HTML/PDF |
| [GPT Image 2 水墨风](/learnAIDoc/wiki/gpt-image-2-ink-style-slide-prompt/) | stylized image-based slide concepts | images |
| **slide-image-to-editable-pptx** | screenshot/image-based slide reconstruction | editable PPTX |

Use it when the starting point is already visual and the final artifact must remain PowerPoint-editable.
