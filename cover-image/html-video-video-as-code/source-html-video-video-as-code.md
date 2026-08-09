---
title: "html-video — Video-as-Code for Agentic Media Workflows"
date: 2026-08-09
category: Creative & Media
tags: [html-video, video-as-code, agentic-media, hyperframes, chromium, ffmpeg, html, creative-media]
related: ["AI Slide Generation with Claude Code — Tool Comparison & Guide", "Teaching Videos with Manim + Remotion — Two Engines for Code-Driven Explainers", "video-use — Editing Video by Reading Transcripts, Not Dumping Frames", "html-anything — Claude Outputs Any Document Type as a Self-Contained HTML File, Zero Config", "The Unreasonable Effectiveness of HTML — Thariq's Case for Output Format Engineering"]
icon: "🎞️"
image: "/assets/images/html-video-video-as-code.png"
---

**html-video** is an open-source project that renders video locally and explores **video-as-code for coding agents**: an agent turns a prompt, article link, or GitHub repo into multi-frame HTML scenes, then renders those scenes to MP4 through headless Chromium and `ffmpeg`. The important signal is not that this repo is a finished replacement for video editing. The signal is that some AI media workflows may become more useful when the model produces an editable program that renders media, not only opaque pixels.

*Source: [nexu-io/html-video GitHub](https://github.com/nexu-io/html-video) | [html-video issue #30](https://github.com/nexu-io/html-video/issues/30) | [HeyGen HyperFrames research note](https://www.heygen.com/research/html-to-video)*

## The Core Idea

Most text-to-video tools hide the intermediate representation:

```text
prompt -> opaque model process -> video
```

If the result is wrong, the normal repair loop is to prompt again. That is powerful for cinematic generation, but weak for repeatable explainers, product demos, technical education, and repo walkthroughs.

html-video points in the opposite direction:

```text
prompt / article / repo
        |
        v
source fetch + flattening
        |
        v
agent-written storyboard / content graph
        |
        v
self-contained animated HTML scenes
        |
        v
headless Chromium capture
        |
        v
ffmpeg encode + concat + optional audio mix
        |
        v
MP4
```

The agent is not asked to output only a final opaque video artifact. It is assembling editable scenes: text, data, layout, timing, animation, template slots, and optional narration / soundtrack instructions. That gives the human a surface to inspect before rendering.

## What It Actually Ships Today

As checked on August 9, 2026, the GitHub repo described html-video as an Apache-2.0 open-source project from the nexu-io / Open Design team. GitHub repo metadata showed roughly 4.3k stars / 540 forks, with recent repository activity visible on the same day. Treat those counts as point-in-time metadata, not durable product facts.

| Area | Current state |
|---|---|
| Rendering path | Headless Chromium records animated HTML; `ffmpeg` encodes MP4 |
| Default engine | Hyperframes is the shipped / wired engine |
| Templates | README describes 21 curated templates |
| Inputs | Prompt, article link, or GitHub repo, according to README |
| Interface | Local browser studio plus CLI utilities |
| Audio | Optional MiniMax background music and narration, mixed at export |
| License | Apache-2.0 |
| Package shape | Monorepo, clone/build workflow; `npm view html-video` returned 404 when checked |

The README also lists Remotion, Motion Canvas / Revideo, and Manim as planned or researching adapter directions. That is a design signal, not a runnable guarantee. For now, the practical question is whether the Hyperframes path is good enough for your use case.

## Why HTML Is a Useful Video Substrate

HTML is not a video format, but it is a strong authoring surface for agents because it is structured, inspectable, and easy to edit.

| Need | Why HTML helps |
|---|---|
| Inspectability | You can read the scene source instead of only watching pixels |
| Precise edits | Change one headline, data point, or frame without regenerating the whole video |
| Template control | Templates can expose named slots, schemas, and timing expectations |
| Local rendering | Browser + `ffmpeg` avoids a per-render vendor bill |
| Agent compatibility | Coding agents already know how to write HTML/CSS/JS |
| Reproducibility | A scene file can be versioned, reviewed, and re-rendered |

This makes html-video especially interesting for **agentic media production**. The agent's job becomes:

```text
understand source material
choose a template
write a storyboard
fill structured scene slots
render
inspect
revise
```

That is much closer to a software workflow than a prompt-only media workflow.

## When It Fits

html-video is most plausible when the video has structure.

| Good fit | Why |
|---|---|
| Product explainers | Clear sections, screenshots, value props, outro |
| Data-viz clips | Charts and annotations can be generated from structured data |
| Technical education | Concepts can be broken into frames and captions |
| Article walkthroughs | Source text can become scenes with traceable claims |
| Repo demos | README, file tree, and architecture summary map naturally to frames |
| Social shorts | Templates can enforce pacing, title cards, and motion style |

It is a weaker fit for film-like generative video, cinematic footage, characters, physically realistic scenes, or anything where the hard part is visual realism rather than structure. For those jobs, Runway / Pika / Kling-style text-to-video tools are the more natural category.

## Setup Shape

The repo is not an npm install-and-go package named `html-video`; `npm view html-video` returned 404 when checked. The README / package metadata point to a clone-and-build monorepo workflow.

Minimum requirements from the repo:

| Requirement | Minimum |
|---|---|
| Node.js | 20+ |
| pnpm | 9+ |
| ffmpeg | recent version |
| Chromium / Playwright browser | installed locally |

README setup shape as checked:

```bash
git clone https://github.com/nexu-io/html-video
cd html-video
pnpm install
pnpm -r build
node packages/cli/dist/bin.js studio
```

The studio opens locally, lets you pick templates or describe a video, and then exports MP4 through the local render pipeline. Before using it for real work, run the repo's `doctor` or smoke checks and test with non-sensitive source material.

## Maturity Caveats

This is the part to keep honest.

The project is promising, but it should not be framed as mature one-click video automation yet. Open issues visible during checking included rendering bugs, audio preview issues, template text-field issues, and a request for direct rendered video examples. Issue #30 is especially telling: for a video-generation project, prospective users reasonably want to see a rendered MP4/WebM/GIF before installing the whole stack.

Practical caveats:

| Caveat | Consequence |
|---|---|
| Clone/build setup | More friction than a hosted tool or npm package |
| Hyperframes is the runnable path | Multi-engine architecture is partly roadmap |
| Open rendering/audio/template issues | Expect debugging, especially on first project |
| Local render stack | Chromium and `ffmpeg` can fail differently across machines |
| Source material | Articles, repos, and prompts may contain private or licensed content |
| AI audio | MiniMax key and rights/voice considerations matter if you publish |

The right adoption posture is: test it on a small non-sensitive explainer first, inspect the generated HTML, render a short MP4, and only then decide whether it belongs in a production workflow.

## The Bigger Signal

The reason html-video deserves a wiki entry is not only the tool. It is the pattern:

```text
AI media generation may split into two paths:

1. generate pixels directly
2. generate an editable program that renders media
```

For many practical videos, path 2 may be more controllable.

That aligns with the broader LearnAI theme: good agent workflows expose better intermediate representations. For video editing, `video-use` exposes transcripts and timestamps instead of raw frames. For documents, `html-anything` exposes a self-contained HTML artifact. For explainers, Manim and Remotion expose code. html-video extends that logic to short-form agent-generated media.

The educational takeaway is simple:

```text
If the AI produces code before it produces media,
the human gets a chance to inspect the idea before accepting the pixels.
```

That is why "video-as-code" matters.
