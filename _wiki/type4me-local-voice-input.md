---
title: "Type4Me & Voice-Input-Src: Local Voice Input Tools for macOS"
date: 2026-03-26
category: AI Research
tags: [voice-input, speech-to-text, local-ai, sherpaonnx, macos, privacy, dictation, llm, vibe-coding, open-source]
related: ["Voice-Pro: Local AI Dubbing and Voice Cloning Tool"]
icon: "🎙️"
image: "/assets/images/type4me-local-voice-input.png"
---

Voice input tools on the market are either expensive ($12/month), send your data to the cloud, or don't let you customize prompts. **Type4Me** solves all three: it's a free, local-first macOS voice input app built on SherpaOnnx — no API key needed, no internet required, and with a unique "processing mode" that pipes speech through LLMs before output.

*Source: [GitHub — joewongjc/type4me](https://github.com/joewongjc/type4me)*

## How It Works

```
Voice Input (microphone)
       │
       ▼
┌──────────────────┐
│ SherpaOnnx Engine│  ← Local, no internet
│ (Apple Silicon   │
│  optimized)      │
└────────┬─────────┘
         │ Raw text
         ▼
┌──────────────────┐
│ Processing Mode  │  ← Optional LLM post-processing
│ (Prompt-driven)  │
└────────┬─────────┘
         │ Refined text
         ▼
    Paste / Output
```

## Key Features

### Local Speech Recognition
- Built on **SherpaOnnx** (next-gen Kaldi + ONNX Runtime) — runs entirely offline
- Fast on Apple Silicon, no API key or internet required
- Optional cloud engines (Volcengine, Deepgram) for higher accuracy
- Plugin architecture: OpenAI Whisper, Google, AWS interfaces pre-defined

### Processing Mode — The Killer Feature
Speech recognition outputs raw text, which you can then route through LLM post-processing:

| Built-in Mode | What It Does |
|---------------|-------------|
| Quick Dictation | Fast transcription, minimal processing |
| Dual-Channel High Precision | Higher accuracy transcription |
| Chinese-English | Bilingual recognition |
| Prompt Optimization | Clean up grammar, punctuation, formatting |
| Custom Prompt | Write your own processing pipeline |

You can define **any processing flow** with custom prompts — turn messy speech into formatted notes, translate on the fly, or extract action items from spoken paragraphs.

### Command Mode
This is where it gets interesting:

1. **Select text** in any app
2. **Press hotkey** and speak
3. Speech becomes an **instruction**, selected text becomes **context**
4. LLM executes the instruction and outputs the result

> Essentially turns speech into an LLM command line. Select a paragraph → say "summarize this in 3 bullets" → done.

### Privacy-First Data
- All credentials and recognition history stored **locally** (SQLite + JSON)
- No telemetry, no cloud sync
- History records support CSV export
- MIT license

## Requirements

- macOS 14+
- Apple Silicon recommended (Intel supported but slower)
- No API key needed for local mode
- Optional: API keys for cloud engines or LLM processing

## Plugin Architecture

Adding new speech recognition services requires only two protocol implementations then registration. Interfaces for OpenAI Whisper, Google Speech, and AWS Transcribe are already pre-defined — the community can contribute adapters.

## Also Worth Knowing: Voice-Input-Src

Another open-source Mac voice input project taking a different approach — **voice-input-src** focuses on the *prompt* rather than the engine.

*Source: [GitHub — yetone/voice-input-src](https://github.com/yetone/voice-input-src) | [Vibe Coding dist](https://github.com/yetone/voice-input-dist) | [宝玉 xp on Weibo](https://weibo.com/) (2026-03-29)*

| | Type4Me | Voice-Input-Src |
|---|---------|----------------|
| **Focus** | Full-featured voice input app | Open-source prompt for voice-to-code |
| **Key value** | Local recognition + LLM processing modes | The *prompt design* is the real IP — reproducible by anyone |
| **Vibe coding** | Supported via command mode | Core use case — voice → code generation |
| **Engine** | SherpaOnnx (local) + cloud options | Uses external STT + LLM |
| **License** | MIT | Open source |

The author (宝玉 xp) notes: "What's open-sourced is the Prompt — the code generated afterward has more value than a pile of vibe coding output, because you can reproduce it yourself." The companion repo `voice-input-dist` contains the generated code output for reference.
