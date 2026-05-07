---
title: "LLM Architecture Gallery — Visual Reference for Every Major Model"
date: 2026-03-22
category: Learning Resources
redirect_from:
  - "/wiki/ai research/llm-architecture-gallery/"
tags: [llm, architecture, reference, visualization, education, raschka, transformer]
related: ["TensorTonic — Learn Machine Learning by Implementing 200+ Algorithms from Scratch", "Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era", "Unsloth Studio — Train and Run LLMs Locally with 70% Less Memory"]
icon: "🏛️"
image: "/assets/images/llm-architecture-gallery.png"
---

Sebastian Raschka's [LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/) is a visual reference covering every major LLM architecture from GPT-2 to the present day. Each entry includes a detailed architecture diagram plus a fact sheet: scale, release date, decoder type (dense, sparse MoE, hybrid), attention mechanism, and key architectural innovation. Available as a [high-resolution poster](https://sebastianraschka.com/llm-architecture-gallery/) (14,570 x 12,490 px, 182 megapixels). 101K views in the first 24 hours.

*Source: [LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/) | [Adafruit: Visual Reference for LLM Architectures](https://blog.adafruit.com/2026/03/16/visual-reference-lets-you-trace-every-major-llm-architecture-decision-from-gpt-2-to-today/) | [GIGAZINE Coverage](https://gigazine.net/gsc_news/en/20260317-llm-architecture-gallery/) | [Hacker News Discussion](https://news.ycombinator.com/item?id=47388676) | [LLMs from Scratch - GitHub](https://github.com/rasbt/LLMs-from-scratch)*

## What's Included

Each model entry shows:

| Field | Example |
|---|---|
| **Architecture diagram** | Detailed block diagram showing layers, attention, normalization |
| **Scale** | Parameter count, training data size |
| **Release date** | When the model was released |
| **Decoder type** | Dense, Sparse MoE, Hybrid |
| **Attention mechanism** | Multi-head, grouped-query, multi-query, sliding window |
| **Key innovation** | What makes this architecture different from predecessors |

## Models Covered

The gallery spans the full history of decoder-only LLMs:

- **Foundational:** GPT-2, GPT-3
- **Open-weight pioneers:** LLaMA, Llama 2, Llama 3
- **Chinese models:** Qwen, Qwen 2.5, DeepSeek, DeepSeek-V3
- **Google:** Gemma, Gemma 2
- **xAI:** Grok
- **2026 additions:** MiniMax, Ling, Sarvam, Llama 4

Based on Raschka's deep-dive articles:
- [The Big LLM Architecture Comparison](https://sebastianraschka.com/llm-architecture-gallery/)
- [A Dream of Spring for Open-Weight LLMs](https://sebastianraschka.com/llm-architecture-gallery/)

## Why This Is a Must-Have Teaching Resource

**1. Visual comparison beats text.** Students can *see* the difference between multi-head attention and grouped-query attention instead of reading about it. Architecture diagrams make design decisions tangible.

**2. Traces the evolution.** The gallery shows how each model builds on predecessors — what changed from GPT-2 → GPT-3 → LLaMA → Llama 3 → Llama 4. Students learn architecture as a progression, not isolated designs.

**3. Fact sheets enable comparison exercises.** Give students the gallery and ask: "Why did Llama 3 switch from multi-head to grouped-query attention? What's the tradeoff?" The data is right there.

**4. Pairs with hands-on implementation.** Use the gallery diagrams as blueprints → implement key components on [TensorTonic](https://www.tensortonic.com/) → fine-tune with [Unsloth Studio](https://unsloth.ai/). Theory → visualization → implementation → practice.

**5. Poster for the lab.** The 182-megapixel poster can be printed and hung in a CS lab. Students reference it constantly. Physical artifacts in learning spaces drive retention.

## Raschka's Other Resources

Sebastian Raschka is also the author of:
- [LLMs from Scratch](https://github.com/rasbt/LLMs-from-scratch) — implement a ChatGPT-like LLM in PyTorch step by step (companion to his book)
- [Build a Large Language Model (From Scratch)](https://www.manning.com/books/build-a-large-language-model-from-scratch) — Manning book

These form a complete learning stack: **Gallery** (see architectures) → **Book/Repo** (implement from scratch) → **TensorTonic** (practice problems) → **Unsloth** (fine-tune your own).

## Further Reading

- [LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/)
- [LLMs from Scratch - GitHub](https://github.com/rasbt/LLMs-from-scratch)
- [Hacker News Discussion (101K views)](https://news.ycombinator.com/item?id=47388676)
- [Adafruit Coverage](https://blog.adafruit.com/2026/03/16/visual-reference-lets-you-trace-every-major-llm-architecture-decision-from-gpt-2-to-today/)
- [Hyperion Consulting: Strategic Resource](https://hyperion-consulting.io/en/insights/llm-architecture-gallery-a-strategic-resource-for-enterprise-ai-decision-makers)

## How LearnAI Team Could Use This

- Use the gallery as a visual anchor in lessons on transformer evolution and model design tradeoffs.
- Create comparison exercises where learners explain why architectures moved from dense attention to GQA, MoE, or hybrid designs.
- Pair architecture diagrams with implementation labs using LLMs from Scratch or fine-tuning exercises.

## Real-World Use Cases

- Educators can use the poster to teach architecture differences across GPT, Llama, Qwen, Gemma, DeepSeek, and other model families.
- AI teams can compare model design choices when selecting architectures for latency, context length, or deployment constraints.
- Learners can use the diagrams as references while implementing attention, normalization, and decoder blocks from scratch.
