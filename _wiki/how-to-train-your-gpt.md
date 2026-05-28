---
title: "How to Train Your GPT — Interactive ML Textbook for Building a 151M-Parameter LLM from Zero"
date: 2026-05-19
category: Learning Resources
tags: [llm, machine-learning, transformer, jupyter-notebook, interactive, open-source, gpt, llama, pytorch, fine-tuning, lora, moe, education, from-scratch]
related: ["Paper-Code Joint Analysis & Contract-Driven Skill Design", "Autoresearch: 100 Autonomous ML Experiments Overnight", "Claude Code 101 — Anthropic's Official Onboarding Course", "Anthropic Academy — 13 Free Claude Courses, 12-Week Roadmap"]
icon: "📚"
image: "/assets/images/how-to-train-your-gpt.png"
---

**How to Train Your GPT** by [raiyanyahya](https://github.com/raiyanyahya/how-to-train-your-gpt) is a 12-chapter interactive ML textbook that takes a Python developer from zero ML background to a fully operational 151M-parameter LLM — using nothing more than a Jupyter Notebook and a `pip install`. The resource distinguishes itself by pairing 3,900+ lines of heavily annotated, runnable code with kindergarten-style analogies for every major concept, so the gap between "I read about Transformers" and "I trained one" closes in a single sitting rather than a curriculum.

*Source: [github.com/raiyanyahya/how-to-train-your-gpt](https://github.com/raiyanyahya/how-to-train-your-gpt) | Surfaced via Weibo (爱可可-爱生活), May 2026*

## The problem it actually solves

Most LLM learning resources split into two failure modes: theory-only textbooks that explain attention mathematically but never produce a working model, and API tutorials that call `openai.chat.completions.create()` and call it a day. The result is an enormous cohort of developers who can describe Transformers in a job interview but cannot debug a training run, tune a learning rate schedule, or explain why KV cache exists.

How to Train Your GPT closes that gap by making the model itself the deliverable. Every chapter produces runnable output — not a diagram, not a quiz, but actual model weights doing actual inference. By Chapter 12, the reader has built and run a 151M-parameter LLM trained on real data, with a custom pipeline they assembled line by line.

## What's inside

The textbook spans 12 chapters, each a self-contained Jupyter Notebook cell sequence that builds on the previous one. The progression is linear: you cannot skip Chapter 5 and understand Chapter 6, which is the correct pedagogy for a topic this layered.

| Chapter | Topic | What you build |
|---|---|---|
| 1 | ML fundamentals | First tensor ops, loss functions, gradient descent by hand |
| 2 | Tokenization | BPE with tiktoken; vocabulary construction |
| 3 | Embeddings | Token + positional embeddings; intuition via analogy |
| 4 | Attention mechanism | Scaled dot-product attention, masking, multi-head assembly |
| 5 | Transformer block | Full encoder/decoder block; residual connections, LayerNorm |
| 6 | LLaMA architecture | Swapping standard Transformer for LLaMA design choices (RoPE, SwiGLU, RMSNorm) |
| 7 | Training pipeline | AdamW optimizer, cosine warmup schedule, mixed precision (fp16/bf16) |
| 8 | Inference & sampling | Temperature, top-k, top-p (nucleus), beam search; weight reset |
| 9 | KV cache | Why it exists; implementing and measuring the speedup |
| 10 | Fine-tuning with LoRA | Low-rank adapter injection; training a task-specific delta |
| 11 | Efficiency extensions | Flash Attention, Mixture of Experts (MoE) fundamentals |
| 12 | End-to-end run | 151M-parameter model: full train → eval → inference pipeline |

**Setup is intentionally minimal:**

```bash
pip install torch tiktoken
jupyter notebook
```

No cloud GPU required for the early chapters. The 151M training run benefits from a GPU but the code runs (slowly) on CPU so learners without hardware access can still follow along.

## Key technical concepts covered

The textbook's pedagogical signature is explaining each concept at two levels simultaneously: a "five-year-old" analogy that builds the mental model, then the actual implementation that reveals why the analogy holds. The Transformer's core mechanisms map cleanly to this treatment:

```
INPUT SEQUENCE
     │
     ▼
┌─────────────────────────────────────┐
│  Token Embeddings                   │
│  + Positional Embeddings (RoPE)     │   ← "give every word a GPS coordinate"
└───────────────────┬─────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│  Multi-Head Self-Attention          │
│  Q · K^T / √d_k → softmax → · V    │   ← "which words should talk to which"
│  KV Cache stores past K,V           │
└───────────────────┬─────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│  Feed-Forward (SwiGLU in LLaMA)     │   ← "process each word in private"
│  + RMSNorm + Residual Connection    │
└───────────────────┬─────────────────┘
                    │
                    ▼
              [Repeat × N layers]
                    │
                    ▼
┌─────────────────────────────────────┐
│  Language Model Head                │
│  Linear → softmax → sample token   │   ← temperature / top-k / top-p here
└─────────────────────────────────────┘
```

**Training pipeline concepts:**

| Concept | What the notebook teaches |
|---|---|
| **AdamW optimizer** | Why weight decay is separated from the momentum update; parameter group setup |
| **Cosine warmup** | Linear ramp + cosine decay schedule; why cold-starting at full LR causes loss spikes |
| **Mixed precision** | fp16/bf16 forward pass + fp32 master weights; gradient scaling to avoid underflow |
| **KV cache** | Caching past key/value matrices to avoid O(n²) recomputation at inference time |
| **LoRA** | Freezing base weights; injecting low-rank matrices A·B into attention projections |
| **MoE** | Routing tokens to sparse expert networks; compute-vs-capacity tradeoff |

## How LearnAI Team Could Use This

**CS coursework at Monmouth University** — this resource is a direct fit for Q's AI education research agenda and existing course portfolio:

- **CS-310 (OO Design):** The LLaMA architecture implementation is a clean case study in modular design — each Transformer component (attention head, FFN block, embedding layer) is a well-bounded class with a defined interface. Assign chapters 4–6 as a design-pattern reading; ask students to diagram the class hierarchy before they read the code, then compare.
- **CS-336 (Program Analysis for Security):** The attention mask and KV cache chapters are concrete examples of where an off-by-one or incorrect dtype coercion produces silent wrong answers rather than an exception. Use as a source for "find the latent bug" exercises; students practice reading annotated code for correctness properties.
- **AI education research (Q's LAI project):** The textbook's two-level explanation style — analogy first, implementation second — is a testable pedagogical intervention. Q could run a small study comparing student comprehension outcomes (quiz, code modification task) between this resource and a conventional textbook chapter on attention. The Jupyter format makes pre/post instrumentation straightforward.
- **Self-study assignment:** Assign Chapter 1–7 as a 2-week self-study module before a lab session that involves prompting or fine-tuning. Students who have built the training loop understand why changing a hyperparameter matters; students who haven't treat the model as a black box.
- **Formal verification angle (Q's research):** The training pipeline (optimizer state, gradient accumulation, mixed-precision invariants) is an underexplored domain for lightweight formal specifications. How to Train Your GPT's annotated code is readable enough to serve as a candidate artifact for a student verification project — e.g., specifying and checking the cosine warmup monotonicity property or the LoRA rank constraint.

## Real-World Use Cases

| Scenario | How to use |
|---|---|
| **Junior ML engineer ramp-up** | Assign chapters 1–7 as a 2-week onboarding track; by the end they can read and modify a real training script without hand-holding |
| **"I've used GPT but don't know how it works" developer** | Start at Chapter 3 (embeddings); the analogy style means no calculus background required for intuition-building |
| **Fine-tuning project prep** | Chapter 10 (LoRA) is a standalone reference — read it before applying LoRA to a domain-specific model so you understand what the adapter is actually doing |
| **Debugging a training run** | Chapters 7–9 (optimizer, sampling, KV cache) give enough mechanistic understanding to diagnose loss spikes, incoherent outputs, and inference slowdowns |
| **Course lab material** | Each chapter is a Jupyter Notebook — repackage individual chapters as graded lab exercises; the annotated code gives students enough scaffolding to modify without being lost |
| **Interview preparation** | Working through the full 12 chapters produces genuine "I built a 151M-parameter LLM" credentials that hold up under technical questioning |

## Important things to know

- **3,900+ lines of annotated code is the actual value.** The explanations are good, but what makes this resource different from a blog post is that every claim is demonstrated by runnable code in the same cell. If the annotation says "this prevents gradient underflow," the next cell shows the effect of removing it.
- **The LLaMA architecture choice is deliberate and current.** Most "build a GPT from scratch" tutorials implement the original 2017 Transformer. This textbook implements LLaMA design choices (RoPE, SwiGLU, RMSNorm) — closer to what production models actually look like in 2025–2026.
- **Chapter 12's 151M run requires real compute.** Chapters 1–11 are CPU-viable (slowly). The full end-to-end training run benefits from a CUDA GPU. Google Colab (free tier) can handle it with patience; a local GPU is faster. Plan accordingly before assigning as coursework.
- **The "five-year-old analogy" style is a feature, not a sign of shallowness.** The textbook uses plain-language analogies to bootstrap intuition, then immediately drops into real PyTorch. The analogies are scaffolding, not a substitute for the math. Students who want the derivations will need a supplementary resource (e.g., Karpathy's nanoGPT or the original Attention Is All You Need paper).
- **LoRA and MoE chapters are introductory.** Chapters 10–11 build genuine understanding of what LoRA and MoE are doing, but they are not production fine-tuning guides. For deployment-grade LoRA workflows, follow up with resources like Hugging Face PEFT or Axolotl.
- **No hosted version — everything runs locally.** There is no Colab link in the README; you clone the repo and run the notebooks yourself. This is intentional (the install is two packages), but instructors who want to run it in a managed lab environment will need to set up their own Jupyter server or containerize it.
- **Companion resources in this wiki:**
  - [Paper-Code Joint Analysis & Contract-Driven Skill Design](/learnAIDoc/wiki/paper-code-joint-analysis/) — how to pair a paper (like "Attention Is All You Need") with code like this textbook
  - [Autoresearch: 100 Autonomous ML Experiments Overnight](/learnAIDoc/wiki/autoresearch-ml-experiments/) — what to do with a working training pipeline once you have one
  - [Claude Code 101 — Anthropic's Official Onboarding Course](/learnAIDoc/wiki/claude-code-101/) — pairs well if you want to use Claude Code to extend or debug the notebooks
  - [Anthropic Academy — 13 Free Claude Courses, 12-Week Roadmap](/learnAIDoc/wiki/anthropic-academy-free-courses/) — broader curriculum context for AI learning resources
