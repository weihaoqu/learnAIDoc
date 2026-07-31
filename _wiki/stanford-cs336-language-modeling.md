---
title: "Stanford CS336 — Language Modeling from Scratch: The Complete Free LLM Curriculum"
date: 2026-05-10
category: Learning Resources
tags: [stanford, course, llm, transformer, gpu, scaling-laws, alignment, rlhf, moe, triton, free-course]
related: ["AI Engineering from Scratch — Rohit Ghumare's 416-Lesson Math-to-MCP Curriculum", "Agentic AI Engineer Roadmap 2026 — Eight Pillars from Prompt to Production"]
icon: "🎓"
image: "/assets/images/stanford-cs336-language-modeling.png"
---

Stanford CS336 is a free, 17-lecture course that teaches you to build a language model from scratch — from byte-pair encoding tokenizers to RLHF alignment. Taught by Tatsunori Hashimoto and Percy Liang, it covers the entire LLM stack: data collection, transformer architectures, GPU optimization with Triton kernels, scaling laws, inference, and alignment. The Spring 2025 archive is fully available on YouTube (17 lectures), and Spring 2026 recordings are being posted as the course progresses. All assignments are on GitHub, and students build a working LLM by the end. This is the course that separates "API Callers" from "Architects."

*Source: [CS336 Official Site](https://cs336.stanford.edu/) | [YouTube Playlist (2025)](https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_) | [Stanford Online](https://online.stanford.edu/courses/cs336-language-modeling-scratch) | [GitHub Assignments](https://github.com/stanford-cs336)*

## Why This Course Matters

Most AI courses teach you to *use* models. CS336 teaches you to *build* them. The difference matters:

| | API Caller | Architect (CS336 grad) |
|---|---|---|
| **Understands** | Prompting, fine-tuning APIs | How transformers work at the GPU kernel level |
| **Can do** | Call models, build apps | Train models, optimize inference, design architectures |
| **Bottleneck** | API rate limits and pricing | Compute and data |
| **Replaceability** | High (low-leverage, automatable) | Low (deep systems knowledge) |
| **Career leverage** | Lower (commoditized) | Higher (scarce expertise) |

## Instructors

| Instructor | Role | Known For |
|-----------|------|-----------|
| **Tatsunori Hashimoto** | Stanford CS faculty | Language model evaluation, alignment, distribution shift |
| **Percy Liang** | Stanford CS faculty | HELM benchmark, CRFM, foundation model transparency |

Both are leading researchers at Stanford's Center for Research on Foundation Models (CRFM).

## Course Structure

**Format:** 17 core lectures + 2 guest lectures (Mon/Wed, 80 min each) + 5 implementation-heavy assignments
**Duration:** March 30 – June 3, 2026
**Prerequisites:** Python + PyTorch proficiency, linear algebra, probability, ML fundamentals
**Units:** 5 (Stanford credit)

## Complete Lecture Schedule

### Block 1: Foundations (Weeks 1-4)

| # | Date | Topic | Instructor | What You Learn |
|---|------|-------|-----------|---------------|
| 1 | Mar 30 | Overview, Tokenization | Percy | BPE tokenizer, course roadmap |
| 2 | Apr 1 | PyTorch, Resource Accounting | Percy | GPU memory, FLOP counting, profiling |
| 3 | Apr 6 | Architectures, Hyperparameters | Tatsu | Transformer variants, design choices |
| 4 | Apr 8 | Attention Alternatives, MoE | Tatsu | Linear attention, sparse attention, Mixture of Experts |

### Block 2: Systems (Weeks 5-8)

| # | Date | Topic | Instructor | What You Learn |
|---|------|-------|-----------|---------------|
| 5 | Apr 13 | GPUs, TPUs | Tatsu | Hardware architecture, memory hierarchy |
| 6 | Apr 15 | Kernels, Triton, XLA | Percy | Writing custom GPU kernels in Triton |
| 7 | Apr 20 | Parallelism I | Percy | Data parallelism, pipeline parallelism |
| 8 | Apr 22 | Parallelism II | Tatsu | Tensor parallelism, expert parallelism |

### Block 3: Scaling (Weeks 9-10)

| # | Date | Topic | Instructor | What You Learn |
|---|------|-------|-----------|---------------|
| 9 | Apr 27 | Scaling Laws | Tatsu | Chinchilla scaling, compute-optimal training |
| 10 | Apr 29 | Inference | Percy | KV caching, speculative decoding, quantization |
| 11 | May 4 | Scaling Laws II | Tatsu | Beyond Chinchilla, over-training |

### Block 4: Data (Weeks 11-12)

| # | Date | Topic | Instructor | What You Learn |
|---|------|-------|-----------|---------------|
| 12 | May 6 | Evaluation | Percy | Benchmarks, contamination, HELM |
| 13 | May 11 | Data: Sources, Transformation, Filtering | Percy | Common Crawl, deduplication, quality filtering |
| 14 | May 13 | Data: Mixing, Rewriting, SFT | Percy | Data recipes, instruction tuning data |

### Block 5: Alignment (Weeks 13-15)

| # | Date | Topic | Instructor | What You Learn |
|---|------|-------|-----------|---------------|
| 15 | May 18 | Alignment: RLHF/DPO | Tatsu | Reward models, PPO, Direct Preference Optimization |
| 16 | May 20 | Alignment: RL Algorithms | Tatsu | GRPO, online RL, reasoning via RL |
| 17 | May 27 | Alignment: RL Systems | Percy | Distributed RL training infrastructure |

**Guest Lectures:** Daniel Selsam (Jun 1), Dan Fu (Jun 3)

## The 5 Assignments

Each assignment is implementation-heavy — you write real code, not just answer questions.

### Assignment 1: Basics (Due Apr 15)

Build the core components from scratch:
- Byte-pair encoding (BPE) tokenizer
- Transformer language model architecture
- Cross-entropy loss function
- Training loop with optimizer
- Train a minimal working model

**What you learn:** The transformer isn't magic — it's matrix multiplications, attention masks, and positional encodings you can implement in PyTorch.

### Assignment 2: Systems (Due Apr 29)

Optimize the transformer for real hardware:
- Implement FlashAttention2 in Triton (custom GPU kernels)
- Profile GPU utilization and memory
- Set up distributed training across multiple GPUs

**What you learn:** The difference between "runs on GPU" and "runs efficiently on GPU" is 10-100x. Kernel-level optimization is where Architects separate from API Callers.

### Assignment 3: Scaling (Due May 6)

Predict before you train:
- Analyze how components (architecture, data, compute) affect performance
- Fit scaling law curves from experiments
- Project optimal model size for a given compute budget via API queries

**What you learn:** You don't need to train every model to know which one will work. Scaling laws let you predict performance from small experiments.

### Assignment 4: Data (Due May 20)

Build a real pre-training data pipeline:
- Process Common Crawl web data
- Implement quality filtering heuristics
- Deduplicate at document and paragraph level

**What you learn:** Data quality determines model quality. The best architecture trained on bad data loses to a mediocre architecture trained on clean data.

### Assignment 5: Alignment & RL (Due Jun 3)

Make the model useful and safe:
- Supervised fine-tuning (SFT) on instruction data
- Reinforcement learning for reasoning tasks
- Optional: DPO safety methods

**What you learn:** Pre-training gives the model capability. Alignment gives it behavior. RLHF/DPO is how you go from "predicts next token" to "follows instructions helpfully."

## Compute Resources

Students need GPU access. Sponsored and recommended options:

Prices listed on the CS336 site are for a single B200 GPU (as of March 28, 2026):

| Provider | Cost/hour | Notes |
|----------|-----------|-------|
| **Modal** (sponsor) | $6.25 | $30 free monthly credit |
| **Lambda Labs** | $6.69 | |
| **RunPod** | $4.99 | |
| **Nebius** | $5.50 (on-demand), $3.05 (preemptible) | Preemptible is cheapest |
| **Together AI** | $7.49 | 8-GPU minimum |

## How to Self-Study This Course

If you're not a Stanford student, here's the path:

```
1. Watch lectures on YouTube (free)
        ↓
2. Clone assignment repos from GitHub
        ↓
3. Get GPU access (Modal free tier or RunPod)
        ↓
4. Work through assignments 1-5 in order
        ↓
5. Compare your solutions with community repos
```

**Community solutions:** [YYZhang2025/Stanford-CS336](https://github.com/YYZhang2025/Stanford-CS336) has notes and solutions for self-study reference.

## What Makes This Course Unique

| Feature | CS336 | Most AI Courses |
|---------|-------|----------------|
| **Build from scratch** | BPE tokenizer, transformer, training loop — all your code | Use pre-built libraries |
| **GPU kernels** | Write FlashAttention in Triton | Call PyTorch functions |
| **Real data pipeline** | Process Common Crawl | Use pre-cleaned datasets |
| **Scaling laws** | Predict performance before training | Train and hope |
| **Full alignment** | SFT + RLHF + DPO | Maybe fine-tuning |
| **Instructors** | Percy Liang (CRFM director) + Tatsu Hashimoto (alignment/eval) | Varies |

## Academic Policies

- **Collaboration:** Study groups OK, individual code required, list group members
- **AI Tools:** LLMs allowed for conceptual questions, but not for direct problem-solving; IDE autocomplete discouraged
- **Late Days:** 6 total, max 3 per assignment

## Real-World Use Cases

- **ML engineers transitioning to LLM roles** — CS336 gives the systems-level understanding that distinguishes LLM specialists from general ML practitioners.
- **Startup founders** — Understanding the full stack (data → training → alignment) lets you make informed build-vs-buy decisions for model development.
- **Research scientists** — The assignments provide hands-on experience with scaling laws, data pipelines, and alignment techniques used in frontier model development.
- **Self-taught developers** — Free YouTube lectures + GitHub assignments make this accessible to anyone with PyTorch experience and $100-200 for GPU compute.

## How LearnAI Team Could Use This

- **Graduate-level AI curriculum supplement** — Assign CS336 lectures as required watching for an advanced AI course. Students work through assignments 1-3 as homework.
- **LLM architecture deep-dive** — Use lectures 3-4 (architectures, attention alternatives, MoE) as foundational material for understanding why models like SubQ and DeepSeek V4 make the architectural choices they do.
- **Systems literacy module** — Lectures 5-8 (GPUs, kernels, parallelism) fill the gap between "I can use PyTorch" and "I understand what the GPU is actually doing."
- **Research methodology** — Assignment 3 (scaling laws) teaches students to predict experimental results before running expensive experiments — a transferable research skill.

## Links

- **Course site:** [cs336.stanford.edu](https://cs336.stanford.edu/)
- **YouTube (2025 archive):** [Playlist](https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_)
- **2026 Lectures:** [Lecture 1](https://www.youtube.com/watch?v=JuoVZkPBiKk) | [Lecture 3](https://www.youtube.com/watch?v=lVynu4bo1rY) | [Lecture 4](https://www.youtube.com/watch?v=cKSwj_qZ8Jg) | [Lecture 5](https://www.youtube.com/watch?v=izZba4UA7iY) | [Lecture 9](https://www.youtube.com/watch?v=Q15rhEWPQ4)
- **Assignments:** [github.com/stanford-cs336](https://github.com/stanford-cs336)
- **Community solutions:** [YYZhang2025/Stanford-CS336](https://github.com/YYZhang2025/Stanford-CS336)
- **Stanford Online:** [online.stanford.edu](https://online.stanford.edu/courses/cs336-language-modeling-scratch)
