---
title: "SentrySearch — Natural Language Search Over Video Footage"
date: 2026-04-01
category: Tools
tags: [video-search, multimodal, embeddings, gemini, qwen, dashcam, semantic-search, vector-database, open-source]
related: ["Vision Agents: Real-Time AI with Multimodal Models"]
icon: "🎥"
image: "/assets/images/sentrysearch-video-search.png"
---

Find "the frame where a red car ran a stop sign" in hours of dashcam footage. **SentrySearch** is an open-source CLI that searches video content with natural language — no transcription, no frame-by-frame captioning. It projects raw video pixels into the same vector space as text, then matches by similarity.

*Source: [GitHub — ssrajadh/sentrysearch](https://github.com/ssrajadh/sentrysearch) (2.4K stars) | [宝玉 xp on Weibo](https://weibo.com/) (2026-03-31) | Also available as a [Claude Code skill](https://clawhub.ai/ssrajadh/natural-language-video-search)*

## How It Works

```
Video file (MP4)
       │
       ▼
┌──────────────────┐
│ 1. Segment       │  Split into 30s chunks (5s overlap)
│    Downsample     │  → 480p, 5fps (95% fewer pixels)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. Embed         │  Gemini Embedding 2 (cloud, $2.84/hr)
│                  │  OR Qwen3-VL (local, free)
└────────┬─────────┘
         │ vectors
         ▼
┌──────────────────┐
│ 3. Store         │  ChromaDB (local vector database)
└──────────────────┘

Search:
  "red car running stop sign"
         │
         ▼  encode to same vector space
  similarity match → extract matching clip → save MP4
```

The key insight: **no transcription, no OCR, no frame captions**. Multimodal embedding models (Gemini Embedding 2, Qwen3-VL-Embedding) natively understand video frames and text in the same vector space. You compare directly.

## Quick Start

```bash
# Install
curl -LsSf https://astral.sh/uv/install.sh | sh
git clone https://github.com/ssrajadh/sentrysearch.git
cd sentrysearch && uv tool install .

# Configure (sets up Gemini API key or local model)
sentrysearch init

# Index footage
sentrysearch index /path/to/dashcam/

# Search
sentrysearch search "red truck running a stop sign"
```

Output:
```
#1 [0.87] front_2024-01-15_14-30.mp4 @ 02:15-02:45
#2 [0.74] left_2024-01-15_14-30.mp4 @ 02:10-02:40
Saved clip: ./match_front_2024-01-15_14-30_02m15s-02m45s.mp4
```

## Two Backends: Cloud vs Local

| | Gemini (Cloud) | Qwen3-VL (Local) |
|---|---|---|
| **Cost** | ~$2.84 per hour of video | Free |
| **Quality** | Highest | Good |
| **Privacy** | Video sent to Google | Everything stays local |
| **Requires** | Free Gemini API key | 24GB+ RAM or NVIDIA GPU |
| **Speed** | Fast | 2-8s per chunk |

### Local Model Selection by Hardware

| Hardware | Model | Memory |
|---|---|---|
| Apple Silicon, 24GB+ RAM | qwen8b | Full float16 via MPS |
| Apple Silicon, 16GB RAM | qwen2b | ~6GB usage |
| NVIDIA, 18GB+ VRAM | qwen8b | Full bf16 precision |
| NVIDIA, 8-16GB VRAM | qwen8b (4-bit) | Quantized |

```bash
# Install with local model support
uv tool install ".[local]"

# Or with quantization for limited VRAM
uv tool install ".[local-quantized]"
```

## Performance Optimizations

| Technique | Impact |
|---|---|
| Downsample to 480p @ 5fps | ~95% fewer pixels processed |
| Max 32 frames per 30s chunk | Bounded compute per segment |
| Matryoshka dimension truncation | Only 768 embedding dimensions kept |
| Auto 4-bit quantization | Fits 8B model in 6-8GB VRAM |
| Still-frame detection | Skips static scenes (JPEG size comparison) |

## Tesla Dashcam Integration

Special adapter for Tesla footage — overlays telemetry on extracted clips:

```bash
uv tool install ".[tesla]"
sentrysearch search "accident" --overlay
```

Displays speed, GPS location, timestamp, and road name on the clip. Requires Tesla firmware 2025.44.25+ with HW3+.

## Use Cases Beyond Dashcams

| Use Case | Search Query Example |
|---|---|
| Security footage | "person entering through back door at night" |
| Sports analysis | "goalkeeper diving to the left" |
| Wildlife cameras | "deer crossing the clearing" |
| Lecture recordings | "the slide about backpropagation" |
| Manufacturing QC | "defective part on conveyor belt" |
| Body cameras | "suspect reaching into pocket" |

Works with **any MP4 video** — recursively indexes all files in a directory.

## Why This Matters

Video is the largest untapped data source. Hours of footage sit on hard drives because scrubbing manually is impractical. SentrySearch makes video as searchable as text — and the fact that it works locally with no API key (via Qwen3-VL) means sensitive footage never leaves your machine.

The underlying technique — multimodal embedding without intermediate text — is the same approach powering next-gen search engines. Understanding it now prepares you for where retrieval is heading.

## Links

- **GitHub:** [github.com/ssrajadh/sentrysearch](https://github.com/ssrajadh/sentrysearch)
- **Claude Code skill:** [clawhub.ai/ssrajadh/natural-language-video-search](https://clawhub.ai/ssrajadh/natural-language-video-search)
