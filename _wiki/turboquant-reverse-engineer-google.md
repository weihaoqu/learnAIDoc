---
title: "TurboQuant — Former Google Engineer Reverse-Engineers Google's Algorithm in 36 Hours with Claude"
date: 2026-04-05
category: AI Research
tags: [llm, inference, kv-cache, compression, llama-cpp, claude-code, local-ai, gpu, open-source, google]
related: ["Karpathy's MicroGPT — A Complete GPT in 200 Lines of Pure Python", "AI Quant Tools — Kronos and Midas for Financial Market Research"]
icon: "⚡"
image: "/assets/images/turboquant-reverse-engineer-google.png"
---

Google published a paper at ICLR 2026 on **TurboQuant** — a technique that compresses the KV cache (the memory bottleneck for running large language models) by 6x with zero precision loss. A former Google engineer, Tom Turney, read the paper and decided to implement it himself. Using Claude for coding assistance, he wrote the core algorithm in **141 lines of C** with Metal GPU kernels and had it running in **36 hours**. The result: 35B+ parameter models running on consumer hardware.

*Source: [硅基生命贾克斯 on Bilibili](https://www.bilibili.com/video/BV1mpXqB2EjV/) | [GitHub — TheTom/turboquant_plus](https://github.com/TheTom/turboquant_plus) | [llama.cpp Discussion #20969](https://github.com/ggml-org/llama.cpp/discussions/20969)*

## Why This Matters

Running large LLMs locally hits a wall: the **KV cache**. Every token the model generates needs to store key-value pairs for all previous tokens across all attention layers. A 35B model at 32K context can eat 20+ GB of memory just for the cache — often more than the model weights themselves.

```
The KV Cache Problem:

Model weights:     ~20 GB (fixed)
KV cache at 32K:   ~22 GB (grows with context)
Total VRAM needed: ~42 GB  ← doesn't fit on consumer GPUs

With TurboQuant (6x compression):
KV cache at 32K:   ~3.7 GB
Total VRAM needed: ~24 GB  ← fits on M4 Pro / RTX 4090
```

## The 36-Hour Sprint

### Day 1: 90 Commits

Tom read Google's TurboQuant paper and started implementing in llama.cpp:

| Phase | What Happened |
|---|---|
| **Read paper** | Understood the compression algorithm: quantize KV cache entries at runtime without retraining |
| **C implementation** | Core algorithm in 141 lines — quantization + dequantization for key-value pairs |
| **Metal GPU kernels** | Wrote Apple Silicon GPU shaders for hardware-accelerated cache compression |
| **Debugging** | Found a silent Metal compiler bug — shader was falling back to CPU without warning |
| **Validation** | Tested across 8 models, 50 rounds each — zero measurable precision loss |

Claude assisted with the coding throughout — generating C implementations, debugging Metal shaders, and iterating on performance optimizations.

### Beyond the Paper: Sparse V Dequant

Tom didn't just reproduce the paper — he improved on it. His **Sparse V Dequant** technique skips dequantization for attention positions with weights below 1e-6 (effectively zero). Result: **+22.8% decode speed** at 32K context with no perplexity change.

## Results

| Metric | Result |
|---|---|
| **KV cache compression** | 6x (turbo3 mode) |
| **Precision loss** | Zero across 8 models, 50 test rounds |
| **Largest model tested** | 104B at 128K context on MacBook M5 Max (74 GB peak memory) |
| **Decode speed improvement** | +22.8% at 32K context (with Sparse V) |
| **Implementation size** | 141 lines core algorithm |
| **Development time** | 36 hours |
| **Total commits (6 days)** | 174 |
| **GitHub stars (6 days)** | 1,274 |

### How to Use It

```bash
# Clone the fork
git clone https://github.com/TheTom/turboquant_plus
cd turboquant_plus && make

# Run any model with TurboQuant cache compression
./llama-server -m your-model.gguf \
  --cache-type-k turbo3 \
  --cache-type-v turbo3

# That's it — same model files, compressed cache at runtime
```

Supports `turbo2` (4x), `turbo3` (6x), and `turbo4` (8x) compression levels. Works on Apple Silicon (Metal) and NVIDIA GPUs.

## What This Tells Us

### 1. Claude Code for Systems Programming

This isn't "vibe coding" a web app. Tom used Claude to write **C code and GPU shaders** — low-level systems programming where bugs are silent and crashes are common. The Metal compiler silently falling back to CPU is exactly the kind of bug that's nearly impossible to catch without understanding the hardware stack. Claude helped write the code, but Tom's expertise caught the subtle failures.

### 2. Papers → Open Source in Hours, Not Months

The traditional path: paper published → months of community reimplementation → maybe gets into a framework. Tom's path: paper published → 36 hours → working implementation with GPU kernels → PR to llama.cpp. AI-assisted coding compresses the paper-to-implementation cycle from months to days.

### 3. Running 35B+ Models on Consumer Hardware Is Real

With TurboQuant, the hardware requirements for running large models drop dramatically:

| Model Size | Without TurboQuant | With TurboQuant (turbo3) |
|---|---|---|
| 7B at 32K | ~12 GB | ~8 GB |
| 35B at 32K | ~42 GB | ~24 GB |
| 70B at 32K | ~80 GB | ~50 GB |
| 104B at 128K | ~150 GB | ~74 GB (tested on MacBook) |

This matters for privacy-sensitive applications (medical, legal, financial) where sending data to cloud APIs isn't an option.

## Links

- **GitHub:** [TheTom/turboquant_plus](https://github.com/TheTom/turboquant_plus)
- **llama.cpp discussion:** [TurboQuant — Extreme KV Cache Quantization](https://github.com/ggml-org/llama.cpp/discussions/20969)
- **Tom Turney on X:** [@no_stp_on_snek](https://x.com/no_stp_on_snek)
- **Bilibili video:** [141行核心代码 35B模型在消费级硬件上完整运行](https://www.bilibili.com/video/BV1mpXqB2EjV/)
- **XDA coverage:** [TurboQuant tackles the hidden memory problem](https://www.xda-developers.com/turboquant-tackles-hidden-memory-problem-local-llms/)
