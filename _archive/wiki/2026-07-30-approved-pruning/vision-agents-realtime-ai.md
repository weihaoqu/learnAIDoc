---
title: "Vision Agents: Real-Time AI That Watches, Listens, and Understands Video"
date: 2026-02-08
category: AI for Research
redirect_from:
  - "/wiki/ai research/vision-agents-realtime-ai/"
tags: [ai, agents, vision, video, mobile, real-time]

icon: "👁️"
image: "/assets/images/vision-agents.jpg"
---

Today I learned about [Vision Agents](https://github.com/GetStream/Vision-Agents) — an open-source framework by Stream for building real-time AI agents that process video and audio. It's particularly useful for mobile app development since it ships with SDKs for iOS, Android, React Native, and Flutter.

## What It Does

Vision Agents lets you build AI agents that can **watch a video stream, listen to audio, and respond in real-time** — all with ultra-low latency (~500ms join, <30ms audio/video latency) via Stream's edge network.

Think: a golf coach that watches your swing via phone camera and gives live feedback, or a security camera that detects packages and recognizes faces autonomously.

## Architecture

An agent combines four layers:

```
Edge Network (Stream) → ultra-low latency video/audio transport
        ↓
LLM (OpenAI / Gemini / Claude) → reasoning and conversation
        ↓
Processors (YOLO / Roboflow / custom) → frame analysis, object detection
        ↓
Speech (Deepgram STT / ElevenLabs TTS) → listen and speak
```

**Processors** are the key concept — they run between frames, handling real-time analysis (pose detection, object recognition, etc.) and managing agent state between interactions.

## Why It Matters for Mobile Development

Vision Agents provides native SDKs for all major mobile platforms:

- **iOS** (native Swift)
- **Android** (native Kotlin)
- **React Native**
- **Flutter**
- **Unity** (for AR/VR)

This means you can build mobile apps where the camera feed goes to an AI agent that sees, understands, and responds in real-time — without building the video infrastructure yourself.

## Quick Start

```bash
# Install
uv add vision-agents

# With common integrations
uv add "vision-agents[getstream, openai, elevenlabs, deepgram]"
```

Requires Stream API credentials (free tier: 333,000 participant minutes/month).

## Supported Models and Services

**LLMs:** OpenAI (Realtime API with WebRTC video), Google Gemini (including Gemini Live), Anthropic Claude, AWS Bedrock, xAI Grok, Mistral, Qwen, Hugging Face

**Vision/Detection:** Ultralytics YOLO (pose + object detection), Roboflow (hosted/local), Moondream (VLM), NVIDIA Cosmos 2

**Speech:** Deepgram (STT), ElevenLabs (TTS), AWS Polly, Cartesia, Fast-Whisper, Fish Audio

**Other:** Twilio (phone calls), TurboPuffer (RAG/vector search), HeyGen (avatars), Decart (video styling)

## Real-World Use Cases

### Golf Coach
Combines **YOLO pose detection** with **Gemini Live** — the agent watches your swing through the phone camera, analyzes body position frame-by-frame, and gives real-time coaching feedback through voice.

### Security Camera
Integrates **face recognition** + **YOLOv11 package detection** — detects unknown visitors, identifies packages left at the door, sends alerts, and can even generate "WANTED" posters automatically.

### Phone + RAG
Enables **inbound/outbound phone calls via Twilio** with vector search retrieval — build a customer support agent that can see screen shares and search your knowledge base simultaneously.

### Real-Time Video Styling
Uses **Decart's Mirage model** — transforms video frames in real-time with artistic styles, frame by frame.

## Key Features

- **Ultra-low latency** — join in ~500ms, audio/video latency under 30ms
- **Multi-model** — swap LLMs, vision models, and speech services freely
- **Turn detection** — natural conversation flow with speaker identification
- **Tool/function calling** — agents can execute code and APIs mid-conversation
- **Memory via Stream Chat** — context retention across turns and sessions
- **Text back-channel** — silent messaging during video calls (think: captions, metadata)

## When to Use Vision Agents

**Good fit:**
- Mobile apps that need real-time camera + AI (coaching, accessibility, AR)
- Video call apps with AI assistants
- Security/monitoring with intelligent detection
- Customer support with screen sharing + AI

**Not the right tool for:**
- Static image analysis (just use an LLM vision API directly)
- Offline processing (this is built for real-time streaming)
- Text-only agents (overkill if you don't need video/audio)

## How LearnAI Team Could Use This

- Build demos that show students how multimodal agents combine video, audio, tools, and reasoning.
- Use the golf-coach or accessibility patterns as project prompts for real-time AI app lessons.
- Compare when to use real-time video agents versus simpler static image or text-only AI workflows.
