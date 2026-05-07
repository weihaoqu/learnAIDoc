---
title: "Toonflow — The AI Factory That Turns Novels Into Short Dramas"
date: 2026-04-10
category: Creative & Media
redirect_from:
  - "/wiki/creative/toonflow-ai-short-drama/"
tags: [video-generation, ai-agents, creative-writing, open-source, docker, pipeline, novel-to-video, chinese, agent-orchestration]
related: ["WebNovel Writer — How AI Writes 2M+ Word Novels Without Forgetting", "Harness Engineering — The Real Bottleneck Isn't the Model", "Novel to Multimedia Pipeline — From Chapter Draft to Douyin in One Session"]
icon: "🎬"
image: "/assets/images/toonflow-ai-short-drama.png"
---

You've written a novel with AI. Now what? **Toonflow** takes the next step — it's an open-source AI Agent workbench that converts novels into short dramas automatically. Text goes in, video comes out. No manual storyboarding, no frame-by-frame prompting. The AI handles character extraction, script writing, visual generation, and video synthesis in one pipeline.

*Source: [GitHub — HBAI-Ltd/Toonflow-app](https://github.com/HBAI-Ltd/Toonflow-app) (6.4k stars, Apache 2.0) | [Official Site](https://www.toonflow.ai/)*

## Why This Matters Beyond Video

If you care about AI Agent orchestration — how to coordinate multiple specialized AI models to complete a complex creative task — Toonflow's architecture is worth studying:

| Challenge | How Most Tools Fail | How Toonflow Solves It |
|---|---|---|
| **Multi-model coordination** | Manual handoff between text/image/video models | Three-layer agent system auto-orchestrates |
| **Character consistency** | Characters look different in every frame | Structured character profiles + Nano Banana Pro face consistency |
| **Story coherence** | Each scene generated in isolation | Event Graph extraction preserves narrative structure |
| **Vendor lock-in** | Hardcoded to one provider | Vercel AI SDK + programmable vendor system |

## The Pipeline

```
Novel Text (e.g., 探花书房, 48,000 words)
       │
       ▼
┌─────────────────────────────────────────┐
│  [1] Event Extraction (LLM)             │
│      Characters → profiles (appearance, │
│      personality, relationships)         │
│      Plot → structured event graph       │
├─────────────────────────────────────────┤
│  [2] Script Generation (ScriptAgent)    │
│      Dialogue + scene descriptions +     │
│      stage directions                    │
├─────────────────────────────────────────┤
│  [3] Storyboard (LLM + Image Gen)       │
│      Visual prompts → AI frames          │
│      Camera angles, composition, props   │
├─────────────────────────────────────────┤
│  [4] Video Synthesis (Sora / Doubao)     │
│      5-20 second clips per scene         │
├─────────────────────────────────────────┤
│  [5] Production Assembly                 │
│      Editing + refinement + export       │
└─────────────────────────────────────────┘
```

## Three-Layer Agent Architecture

This is the most interesting part from an engineering perspective:

1. **Decision Layer** — Plans the overall production: how many scenes, what style, pacing decisions. Think of it as the "director."
2. **Execution Layer** — Runs individual tasks: write this script, generate this image, synthesize this clip. Think of it as the "crew."
3. **Supervision Layer** — Quality checks: is the character consistent? Does the dialogue match the scene? Is the pacing right? Think of it as the "editor."

Each layer can use different models. The Decision layer benefits from a strong reasoning model (Claude, GPT-4o), while the Execution layer can use faster/cheaper models for bulk generation.

**Persistent Agent Memory**: Agents maintain context across sessions using local ONNX vector retrieval — similar to how [WebNovel Writer](/learnAIDoc/wiki/creative/webnovel-writer-long-context/) uses RAG-over-chapters.

## Supported AI Providers

| Role | Options |
|---|---|
| **LLM** (script/characters) | OpenAI, Claude, DeepSeek V3, Qwen, Zhipu, MiniMax, xAI |
| **Image Generation** | Nano Banana Pro (recommended for 4K + face consistency) |
| **Video Generation** | Sora (OpenAI) or Doubao (ByteDance) |

The **Programmable Vendor System** lets you write custom vendor logic in settings — no code changes needed to add new providers.

## Installation

```bash
# Option 1: Docker (recommended)
git clone https://github.com/HBAI-Ltd/Toonflow-app.git
cd Toonflow-app
yarn docker:local
# → http://localhost:10588  |  Login: admin / admin123

# Option 2: Desktop app
# Download from GitHub Releases (Windows/Mac/Linux)

# Option 3: Server deployment
yarn install && yarn build
pm2 start pm2.json
```

## Cost Per Episode

| Component | Cost |
|---|---|
| LLM (script + character extraction) | $0.50-2.00 |
| Image generation (20-50 frames) | $1.00-5.00 |
| Video generation (20-50 clips) | $10.00-50.00 |
| **Total per episode** | **~$12-57** |

## What This Teaches About AI Agent Systems

The same patterns apply to any multi-model AI pipeline:

1. **Separate orchestration from execution** — The Decision layer doesn't generate images; it decides *what* to generate. Same principle as [harness engineering](/learnAIDoc/wiki/claude%20code/harness-engineering-agents/).
2. **Structured intermediate representations** — Character profiles and event graphs are the "glue" between pipeline stages. Without them, each stage operates blind.
3. **Vendor abstraction is critical** — The Vercel AI SDK layer means swapping from Sora to Doubao is a config change, not a rewrite. Design for model portability.
4. **Persistent memory enables iteration** — Without cross-session memory, every run starts from scratch. The ONNX vector store is lightweight but sufficient.
5. **Quality supervision must be automated** — The Supervision layer catches inconsistencies that would otherwise require human review. This is the difference between "demo quality" and "production quality."

## Case Study: 探花书房 → Short Drama (Completed)

We used Toonflow to convert our AI-written literary novella [《探花书房》](https://github.com/weihaoqu/tanhua-bookshop) (48,000 words, 12 chapters) into a 3-episode short drama with 16-frame storyboard. The novel was created entirely using the [webnovel-writer](/learnAIDoc/wiki/creative/webnovel-writer-long-context/) Claude Code skill — making this an end-to-end AI creative pipeline: **idea → novel → video**.

### Pipeline Results

| Step | Tool | Model | Result |
|---|---|---|---|
| Event extraction | Toonflow | Gemini 2.5 Flash | 3 chapters → characters + plot events |
| Script generation | Toonflow | GPT-4o | 3 episode scripts with scene breakdowns |
| Character design | baoyu-image-gen | Gemini 3 Pro Image | 2 character sheets from real photos |
| Storyboard art | baoyu-image-gen (batch) | Gemini 3 Pro Image | 16 frames, Chinese watercolor anime style |
| Director review | Toonflow Production Agent | GPT-4o | B+ rating, passed supervision |

### Practical Lessons

1. **Gemini + Vercel AI SDK tool calling is fragile** — Toonflow's Script Agent failed repeatedly with Gemini due to TypeValidationError in streaming tool call responses. Switched to OpenAI for reliable tool calling.
2. **Toonflow's DB has undocumented tables** — `o_scriptAssets`, `o_assetsRole2Audio`, `memories` tables were missing and had to be created manually. The init script has a SQLite bug that silently skips table creation.
3. **Bypass vendor image generation** — Toonflow's built-in image generation through vendor `imageRequest` is unreliable with Google. Direct batch generation via `baoyu-image-gen` was faster and more reliable (16 frames in ~5 minutes).
4. **The three-layer agent system works** — Decision/Execution/Supervision agents caught real issues (missing assets, pacing problems). The B+ score was earned, not inflated.
5. **Total cost: under $1** — $0.50 OpenAI (scripts) + $0 Google free tier (event extraction + images). Far cheaper than the $12-57/episode estimate.

### 3 Episodes Produced

- **EP01**: 姑苏初遇，心动萌芽 (First meeting at the bookshop)
- **EP02**: 故地重游，情愫渐浓 (Return visit, deepening feelings)
- **EP03**: 情归所向，真心觉醒 (Emotional awakening on Pingjiang Road)

## How LearnAI Team Could Use This

- Study Toonflow as a reference architecture for multi-agent creative pipelines: decision, execution, and supervision layers.
- Use the novel-to-video workflow as a demo path for LearnAI content production.
- Turn the documented failure points into training material on tool-calling reliability and vendor abstraction.

## Real-World Use Cases

- Convert AI-written webnovel chapters into short-drama pilots or Douyin/TikTok storyboard packages.
- Prototype visual treatments for IP development before hiring a full production team.
- Teach agent orchestration using a concrete media pipeline with structured intermediate outputs.

## Links

- **GitHub:** [HBAI-Ltd/Toonflow-app](https://github.com/HBAI-Ltd/Toonflow-app)
- **Official Site:** [toonflow.ai](https://www.toonflow.ai/)
- **Tutorial:** [Bilibili 8-min quickstart](https://www.bilibili.com/video/BV1na6wB6Ea2/)
- **Discord:** [Community](https://discord.gg/HEjKmpNpAZ)
- **Version:** Latest release on GitHub
