---
title: "ElatoAI — Realtime Voice AI on ESP32"
date: 2026-04-26
category: Creative & Media
tags: [voice-ai, esp32, iot, hardware, edge-computing, realtime, speech-to-speech]
related: []
icon: "🔊"
image: "/assets/images/elatoai-voice-esp32.png"
---

ElatoAI puts realtime voice AI on an ESP32 chip — supporting 100+ voice AI models with sub-2-second latency globally. It's an end-to-end solution for building AI toys, voice assistants, and IoT devices without dealing with hardware compatibility issues, audio processing complexity, or multi-provider integration. ~1.6k GitHub stars, MIT licensed.

*Source: [GitHub - akdeb/ElatoAI](https://github.com/akdeb/ElatoAI)*

## How It Works

```
User speaks
    ↓
ESP32 captures + Opus compresses audio
    ↓
WebSocket → Edge function (Deno/Cloudflare)
    ↓
LLM API processes (OpenAI/Gemini/Grok/ElevenLabs/Hume)
    ↓
Audio response generated
    ↓
ESP32 decompresses → Speaker playback
    ↓
< 2 second round-trip
```

## Three-Layer Architecture

| Layer | Technology | Role |
|-------|-----------|------|
| **Frontend** | Next.js on Vercel | Create agents, manage devices |
| **Edge** | Deno Edge / Cloudflare Workers | WebSocket connections, LLM API calls |
| **IoT Client** | ESP32-S3 + PlatformIO/Arduino | Audio capture, processing, playback |

## Supported Providers

**Via Deno Edge:**
- OpenAI Realtime API
- Google Gemini Live API
- xAI Grok Voice Agent API
- ElevenLabs Conversational AI
- Hume AI EVI-4

**Via Cloudflare Workers:**
- 80+ LLM models
- 10+ TTS models
- 5 STT models

## Key Features

- **No PSRAM required** — runs on standard ESP32-S3
- **Button + capacitive touch** control
- **WiFi management** via captive portal
- **OTA firmware updates** — update devices remotely
- **Conversation history** stored in Supabase
- **Custom AI agents** with personalized voices and tool-calling
- **Opus compression** — 12kbps at 24kHz sampling

## Performance

| Metric | Value |
|--------|-------|
| Round-trip latency | < 2 seconds globally |
| Continuous conversation | Tested up to 17+ minutes |
| Cold start | 3-4 seconds |
| Audio quality | Opus 12kbps / 24kHz |

## How LearnAI Team Could Use This

- **Educational IoT projects** — build voice-powered learning assistants for CS courses
- **Hardware + AI integration** — demonstrates full-stack IoT architecture (firmware → edge → cloud)
- **Research prototype** — rapid prototyping of voice-based research tools
- **Teaching edge computing** — concrete example of edge functions handling real-time AI workloads

## Real-World Use Cases

- **AI toys** — children's interactive voice companions
- **Voice assistants** — custom home assistants without cloud vendor lock-in
- **Accessibility devices** — voice-controlled tools for users with motor disabilities
- **Smart home** — voice-activated IoT controllers with custom AI personalities
