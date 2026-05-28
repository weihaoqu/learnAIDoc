---
title: "OpenShorts — Open Source AI Video Platform"
date: 2026-04-26
category: Creative & Media
tags: [video-generation, ai-video, ugc, youtube, self-hosted, content-creation, open-source]
related: ["Pixelle-Video — AI Fully Automated Short Video Engine"]
icon: "📹"
image: "/assets/images/openshorts-ai-video-platform.png"
---

OpenShorts is a self-hosted, open-source AI video platform that combines three tools: a clip generator that finds viral moments in long-form video, an AI UGC creator that produces marketing videos with AI actors, and a YouTube Studio for thumbnail/title/description generation with one-click publishing. No watermarks, no usage limits, completely free — you only pay for the AI APIs you use. ~1.4k GitHub stars.

*Source: [GitHub - mutonby/openshorts](https://github.com/mutonby/openshorts)*

## Three Core Tools

### 1. Clip Generator
Finds 3-15 high-potential moments from long-form videos:
- Google Gemini analyzes transcripts and scene boundaries
- Intelligent 9:16 vertical cropping (MediaPipe/YOLOv8 face tracking or blurred backgrounds)
- Auto-generated subtitles via faster-whisper
- AI voiceover dubbing across 30+ languages

### 2. AI Shorts (UGC Creator)

```
Product URL or description
    ↓
Web scraping / manual input analysis
    ↓
Viral script generation (hooks + CTAs)
    ↓
AI actor creation (Flux 2 Pro or gallery)
    ↓
Voiceover (ElevenLabs)
    ↓
Talking-head video (Hailuo 2.3 Fast + VEED Lipsync)
    ↓
B-roll with Ken Burns effects
    ↓
Final composite (FFmpeg + subtitles)
```

### 3. YouTube Studio
- 10 viral title suggestions per video
- AI thumbnails with custom face overlays
- Auto-generated descriptions with chapter timestamps
- One-click publishing to YouTube

## Cost Structure

The platform is free. External API costs are minimal:

| Service | Cost |
|---------|------|
| Google Gemini (clip analysis) | < $0.01 per 10-min video |
| fal.ai (AI Shorts) | ~$0.50–1.50 per video |
| ElevenLabs (voice) | Free tier available |
| Upload-Post (multi-platform publish) | 10 free monthly uploads |

## Self-Hosting

```bash
git clone https://github.com/mutonby/openshorts.git
cd openshorts
# Configure .env (optional AWS S3 for cloud backup)
docker compose up --build
# Dashboard at localhost:5175
```

**Stack:** FastAPI (Python 3.11) + React 18 + Vite + Tailwind CSS. YOLOv8, MediaPipe, faster-whisper, FFmpeg under the hood. API keys encrypted client-side, containers run as non-root.

## How LearnAI Team Could Use This

- **Educational content** — clip long lectures into short-form highlights for social media
- **Marketing** — generate UGC-style videos for course/tool promotion
- **Compare with Pixelle-Video** — different approach (clip existing vs generate from scratch)
- **Self-hosted pipeline** — own the entire video workflow with no vendor lock-in

## Real-World Use Cases

- **Content creators** — repurpose long YouTube videos into TikTok/Reels/Shorts
- **E-commerce** — generate product marketing videos with AI actors
- **SaaS companies** — create feature demo shorts from product walkthroughs
- **Local businesses** — produce promotional content without hiring videographers
