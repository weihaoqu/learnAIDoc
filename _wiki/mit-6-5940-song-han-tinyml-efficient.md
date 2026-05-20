---
title: "MIT 6.5940 — Song Han's TinyML & Efficient Deep Learning Course"
date: 2026-05-18
category: Learning Resources
tags: [tinyml, efficient-deep-learning, mit, song-han, pruning, quantization, neural-architecture-search, mcunet, deep-compression, llm-deployment, edge-ai, model-compression, course, free-resource, awq, smoothquant]
related: ["Anthropic Academy — 13 Free AI Courses with Certificates", "Codex Orange Book — 花叔's Bilingual Codex Reference", "LLM Architecture Gallery — Visual Reference for Every Major Model", "AI Engineering from Scratch — Karpathy's Build-Your-Own-LLM Curriculum", "AI Learning Courses on YouTube 2026", "Karpathy's LLM Knowledge Bases — Building a Personal Wiki with AI"]
icon: "🔬"
image: "/assets/images/mit-6-5940-song-han-tinyml-efficient.png"
---

**MIT 6.5940 (formerly 6.S965): TinyML and Efficient Deep Learning Computing**, taught by **Song Han** at MIT EECS, is the canonical graduate course on making deep learning fit on resource-constrained hardware — phones, microcontrollers, edge devices, and laptops. Song Han is the originator of **Deep Compression** (the pruning + quantization paper that defined the field) and the EIE accelerator that first put weight sparsity into modern AI chips; his lab also produced **MCUNet**, **AWQ**, and **SmoothQuant**. The course runs ~26 lectures across four chapters: efficient inference (pruning / quantization / NAS / knowledge distillation / MCUNet), domain-specific optimization (LLMs / diffusion / vision transformers / GANs), efficient training (distributed + on-device), and advanced topics. **Course is on hiatus** for Fall 2025 due to Prof. Han's sabbatical; the previous-year recordings, slides, and labs remain freely available — and are the most-cited free curriculum for anyone who wants to actually deploy modern models off the cloud.

*Source: [hanlab.mit.edu/courses/2024-fall-65940](https://hanlab.mit.edu/courses/2024-fall-65940) (official course page) | [efficientml.ai](https://efficientml.ai) (open-lecture portal) | [github.com/mit-han-lab](https://github.com/mit-han-lab) (code + supplementary) | [Song Han faculty page](https://hanlab.mit.edu/songhan) | [YouTube: MIT HAN Lab](https://www.youtube.com/c/MITHANLab)*

## Who Song Han is, and why it matters that this course is his

Song Han is an Associate Professor (with tenure) at MIT EECS who has spent over a decade producing the techniques the rest of the field now relies on for efficient inference:

| Contribution | What it gave the field |
|---|---|
| **Deep Compression** (ICLR 2016) | The original pruning + quantization + Huffman-coding pipeline; defined the model-compression vocabulary still used today |
| **EIE — Efficient Inference Engine** | First accelerator architecture to exploit weight sparsity; influenced modern AI chip design |
| **MCUNet** (NeurIPS 2020) | Tiny deep learning on microcontrollers; brought neural networks to <512 KB devices |
| **AWQ** (Activation-aware Weight Quantization) | Now-standard technique for 4-bit LLM quantization |
| **SmoothQuant** | Post-training quantization that makes LLM 8-bit / 4-bit deployment practical |

When Han teaches the course, he's teaching his own field. The course pulls from his lab's actual production work — not surveys of other people's papers.

## What the course covers (26 lectures, 4 chapters)

```
┌─────────────────────────────────────────────────────────────────┐
│ Chapter I — Efficient Inference (Lectures 1-11)                 │
│  • Introduction & Deep Learning Basics    (×2)                  │
│  • Pruning & Sparsity                     (×2)                  │
│  • Quantization                           (×2)                  │
│  • Neural Architecture Search             (×2)                  │
│  • Knowledge Distillation                 (×1)                  │
│  • MCUNet & TinyEngine                    (×2)                  │
├─────────────────────────────────────────────────────────────────┤
│ Chapter II — Domain-Specific Optimization (Lectures 12-18)      │
│  • Transformers & LLMs                                          │
│  • Efficient LLM Deployment                                     │
│  • LLM Post-Training                                            │
│  • Long-Context LLMs                                            │
│  • Vision Transformers                                          │
│  • GANs / Video / Point Clouds                                  │
│  • Diffusion Models                                             │
├─────────────────────────────────────────────────────────────────┤
│ Chapter III — Efficient Training (Lectures 19-21)               │
│  • Distributed Training                   (×2)                  │
│  • On-Device Training & Transfer Learning                       │
├─────────────────────────────────────────────────────────────────┤
│ Chapter IV — Advanced Topics + Projects (Lectures 22-26)        │
│  • Course Summary & Quantum ML            (×2)                  │
│  • Final Project Presentations            (×3)                  │
└─────────────────────────────────────────────────────────────────┘
```

The lecture ratio is the clue to the course's identity: it spends nearly half the semester on **inference-time optimization**, half on **LLM/diffusion-specific techniques**, and only a few lectures on training. This is intentional — Han's argument is that deployment, not training, is the bottleneck for real-world AI.

## The five labs (each worth 15% of the grade)

| Lab | What you do | What you learn |
|---|---|---|
| **Lab 1 — Pruning** | Implement magnitude pruning + iterative fine-tuning on a small CNN | Mechanical understanding of how sparsity actually changes a model |
| **Lab 2 — Quantization** | Post-training and quantization-aware training (PTQ + QAT) | Why 8-bit and 4-bit work in practice |
| **Lab 3 — Neural Architecture Search** | Implement a small NAS loop | The compute / search-space trade-off |
| **Lab 4 — LLM Compression** | Apply AWQ / SmoothQuant to a real LLM | Bridging "compression theory" to "LLM in deployment" |
| **Lab 5 — LLM Deployment on Laptop** | Deploy **Llama2-7B** on your laptop | End-to-end deployment story: model → compression → runtime → device |

By the end, students have hands-on experience running a 7B-parameter LLM on consumer hardware — which most ML courses don't teach.

## Prerequisites

The course assumes:

- **6.191 — Computation Structures** (MIT's intro to architecture)
- **6.390 — Intro to Machine Learning**

This is *not* an entry-level course. It assumes you can read PyTorch, you know what a tensor is, and you have at least passing familiarity with how CPUs / GPUs / memory hierarchies work. If you're brand-new to ML, do [Karpathy's Zero to Hero](/learnAIDoc/wiki/karpathy-llm-knowledge-bases/) or [AI Engineering from Scratch](/learnAIDoc/wiki/ai-engineering-from-scratch-curriculum/) first.

## How it positions against other Efficient AI / TinyML resources

| Resource | Strength | Where this course is different |
|---|---|---|
| Vendor-specific NVIDIA / Apple / Qualcomm tutorials | Hardware-specific | Vendor-neutral; teaches the underlying techniques |
| Generic Coursera / Udemy "Edge AI" courses | Broad introduction | Far deeper on the techniques; tied to working research code |
| Reading Deep Compression + AWQ papers directly | Authoritative | Same author, but with pedagogical scaffolding + labs you can actually run |
| Industry talks at NeurIPS workshops | Cutting edge | Curated and sequenced as a 4-month curriculum |
| LLM-deployment guides (e.g., HuggingFace docs) | Pragmatic | Adds the *why* (compression theory) under the *how* |

## How to use this course if you can't enroll

The course is offered at MIT to MIT students for credit, but the materials are *free and public*. Here's how to actually use them:

1. **Watch the lecture recordings** on the [MIT HAN Lab YouTube channel](https://www.youtube.com/c/MITHANLab). The 2023 / 2024 editions are complete and freely available.
2. **Download the slides** from the per-lecture Dropbox links on [the course site](https://hanlab.mit.edu/courses/2024-fall-65940).
3. **Run the labs** — they live on Google Colab and in [the mit-han-lab GitHub org](https://github.com/mit-han-lab). All five are doable on a laptop (Lab 5 requires ~16 GB RAM for Llama2-7B).
4. **Read the linked papers.** Each lecture cites 2-5 primary sources. The papers + the slides together are roughly a graduate-level reading list on efficient inference.
5. **Skip what you don't need.** If you only care about LLM deployment, jump straight to Chapter II (lectures 12-13) + Lab 5.

## Companion / derivative resources

The screenshot that surfaced this entry pointed to a **Chinese-language 知乎 column** (蚁工厂, 13-lecture restructure of Han's material). That's one of several community ports — others include:

- **classcentral.com** indexes the YouTube lectures with searchable titles
- **csdiy.wiki** has a Chinese-side guide for "self-studying" MIT 6.5940
- Various Bilibili re-uploads with Chinese subtitles

If you read Chinese, the 知乎 / Bilibili community has done substantial work translating and re-explaining the lectures. If you read English, the MIT-direct YouTube + slides are the authoritative source.

## How LearnAI Team Could Use This

- **Default recommendation for any LearnAI member who needs to deploy a model below the cloud line** — laptop / phone / browser / edge device. The labs are doable in a weekend if you have the prereqs.
- **Reading list for CS-336 (Program Analysis for Security)** if any student gravitates toward systems-level ML — pruning + quantization is a systems-and-program-analysis topic, not a pure ML topic.
- **Faculty workshop on "where does the AI hype actually need to land?"** — this course is the answer in one curriculum: it gets cut. Use Chapter I as a 90-minute intro for colleagues skeptical that small models matter.
- **Curriculum design model** — Han's "inference-first, training-last" sequencing is a defensible alternative to the standard "training-first" ML pedagogy. Worth studying for any LearnAI course module that touches deployment.
- **For research-KB integration** — the per-lecture paper list is a structured reading list ready to drop into the [Zotero / Obsidian KB pipeline](/learnAIDoc/wiki/research-kb-zotero-obsidian/).

## Real-World Use Cases

| Scenario | How to use the course |
|---|---|
| **Deploying an LLM on a laptop** | Lab 5 walks through Llama2-7B end-to-end; substitute your model of choice |
| **Compressing a model for an edge device** | Chapter I + Lab 1 / Lab 2 give you the compression toolkit |
| **Choosing a quantization scheme** for production LLM serving | Lecture on AWQ + SmoothQuant; Han's own techniques explained by Han |
| **Designing a hardware-aware ML system** | Chapter I's MCUNet + TinyEngine lectures explicitly cover hardware/software co-design |
| **Teaching graduate students about model compression** | The slide deck is among the most polished free graduate ML materials available |

## Limitations and honest caveats

- **Not currently being run live.** Prof. Han is on sabbatical, so Fall 2025 doesn't run; the 2026 status isn't yet announced. The previous editions' materials remain available, but you don't get current-cohort interaction (Piazza, project feedback).
- **Prereqs are real.** Students new to ML or to systems will struggle. Do the prereqs first.
- **Bias toward Han's own techniques.** Deep Compression, EIE, MCUNet, AWQ, SmoothQuant — all Han-lab work — get more coverage than competing techniques (e.g., GPTQ, ZeroQuant). Worth being aware of when comparing approaches.
- **No formal license stated** on the course page — slides and recordings are freely *available*, but reuse permissions aren't explicit. For derivative teaching materials, ask the lab.
- **Lab 5 requires substantial RAM** (~16 GB for Llama2-7B with the compression pipeline). Older laptops will struggle.
- **Heavily PyTorch.** If your stack is JAX / TensorFlow, you'll need to translate. The techniques themselves are framework-neutral; the labs aren't.

## Important things to know

- **The "efficiency stack" mental model** the course establishes — *compress the model, then schedule the compute, then pick the right runtime, then pick the right hardware* — is the most reusable takeaway. Use it as the framework for any deployment decision you have to make later.
- **AWQ is now the de facto 4-bit LLM quantization technique.** The lecture covering it explains *why* it works, not just how to call the library — invaluable when debugging.
- **MCUNet is the unique offering** in the course — almost no other free curriculum covers microcontroller-scale deep learning at this depth.
- **The Llama2-7B lab is doable on a Mac** with 16 GB RAM. Mid-2020s consumer hardware is enough.
- **Companion deep-dives** in this wiki:
  - [Anthropic Academy — 13 Free AI Courses](/learnAIDoc/wiki/anthropic-academy-free-courses/) — sibling free-curriculum entry
  - [Codex Orange Book — 花叔's Bilingual Codex Reference](/learnAIDoc/wiki/codex-orange-book-huashu/) — sibling free practitioner book
  - [LLM Architecture Gallery](/learnAIDoc/wiki/llm-architecture-gallery/) — visual reference for the model architectures this course teaches you to compress
  - [AI Engineering from Scratch — Karpathy's Curriculum](/learnAIDoc/wiki/ai-engineering-from-scratch-curriculum/) — the "build the model" complement to Han's "shrink the model"
  - [Building a Research KB — Zotero + Obsidian + Claude Code](/learnAIDoc/wiki/research-kb-zotero-obsidian/) — where to put the per-lecture reading lists
