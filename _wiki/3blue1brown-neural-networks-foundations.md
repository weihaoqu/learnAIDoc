---
title: "3Blue1Brown Neural Networks — Visual Foundations for ML, LLMs, and Diffusion"
date: 2026-08-06
category: Learning Resources
tags: [3blue1brown, neural-networks, machine-learning, llm, transformer, attention, diffusion, education, visual-learning]
related: ["Stanford CS336 — Language Modeling from Scratch: The Complete Free LLM Curriculum", "How to Train Your GPT — Interactive ML Textbook for Building a 151M-Parameter LLM from Zero", "Socratopia AI Science I — Learning Neural Networks Through Socratic Dialogue", "LLM Architecture Gallery — Visual Reference for Every Major Model", "Karpathy's MicroGPT — A Complete GPT in 200 Lines of Pure Python"]
---

3Blue1Brown's **Neural networks** playlist is a particularly useful AI foundations sequence: it works before the math is fully comfortable and still remains useful after you know the equations. It starts with neurons, gradient descent, and backpropagation, then includes later videos on LLMs, transformers, attention, factual memory, cross-entropy, and diffusion models. For students, this is the right bridge between "AI feels magical" and "I can trace the mechanism."

This is not a replacement for Stanford CS336 or a from-scratch PyTorch textbook. It is the visual prerequisite. Watch it first to build the mental model, then use the implementation resources to turn intuition into working code.

*Source: [3Blue1Brown Neural networks playlist](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) | [Video 10: But how do AI images and videos actually work?](https://www.youtube.com/watch?v=iv-5mZ_9CPY) | [3Blue1Brown channel](https://www.youtube.com/@3blue1brown)*

## Why it belongs in the wiki

Most LLM learning paths jump too quickly from "what is a neural network?" to transformer diagrams and API tutorials. That creates a weak foundation: students memorize attention formulas without understanding why gradient descent changes weights, why loss functions matter, or why a model's output is a probability distribution.

The 3Blue1Brown sequence fixes that by keeping every major idea tied to a picture:

```text
neurons -> activations -> loss -> gradients -> backprop
       -> language models -> transformers -> attention
       -> cross-entropy -> diffusion and generated media
```

That path matters because modern AI is not one topic. LLMs, image generation, and video generation all reuse the same deeper ideas: representation learning, differentiable optimization, probability, compression, conditioning, and high-dimensional geometry.

## The playlist map

Playlist order and durations from YouTube playlist metadata:

| # | Video | Duration | What to learn |
|---|---|---:|---|
| 1 | [But what is a neural network?](https://www.youtube.com/watch?v=aircAruvnKk) | 18:40 | Activations, layers, MNIST, why weights are the knobs |
| 2 | [Gradient descent, how neural networks learn](https://www.youtube.com/watch?v=IHZwWFHWa-w) | 20:33 | Loss surfaces, gradients, why learning is iterative |
| 3 | [Backpropagation, intuitively](https://www.youtube.com/watch?v=Ilg3gGewQ5U) | 12:47 | Credit assignment, local error signals, chain-rule intuition |
| 4 | [Backpropagation calculus](https://www.youtube.com/watch?v=tIeHLnjs5U8) | 10:18 | The actual derivatives behind the intuition |
| 5 | [Large Language Models explained briefly](https://www.youtube.com/watch?v=LPZh9BOjkQs) | 7:58 | Next-token prediction, embeddings, why scale changes behavior |
| 6 | [Transformers, the tech behind LLMs](https://www.youtube.com/watch?v=wjZofJX0v4M) | 27:14 | Transformer blocks, context mixing, sequence modeling |
| 7 | [Attention in transformers, step-by-step](https://www.youtube.com/watch?v=eMlx5fFNoYc) | 26:10 | Query-key-value attention and why attention is data-dependent routing |
| 8 | [How might LLMs store facts](https://www.youtube.com/watch?v=9-Jl0dxWQs8) | 22:43 | Parameters as memory, factual recall, what "stored" means in a model |
| 9 | [But what is cross-entropy?](https://www.youtube.com/watch?v=GlYgs6v2YfU) | 33:51 | Loss as compression, probability distributions, why prediction and compression meet |
| 10 | [But how do AI images and videos actually work?](https://www.youtube.com/watch?v=iv-5mZ_9CPY) | 37:20 | CLIP, shared embedding spaces, DDPM/DDIM, conditioning, guidance, negative prompts |

The first four videos are the classical deep learning spine. Videos 5-8 are the LLM bridge. Video 9 gives the probability/compression lens. Video 10 expands the same foundation into diffusion-based images and videos.

## How I would teach it

Do not assign the whole playlist as passive watching. Break it into four learning blocks and make students produce something after each one.

| Block | Watch | Student deliverable |
|---|---|---|
| Neural network basics | Videos 1-2 | Draw a one-hidden-layer network and explain which numbers change during training |
| Backprop | Videos 3-4 | Trace one output error backward through two weights by hand |
| LLM foundations | Videos 5-8 | Explain next-token prediction, attention, and factual memory without using the phrase "the model understands" |
| Probability and generation | Videos 9-10 | Compare cross-entropy loss with diffusion denoising as two ways of learning a distribution |

The deliverable matters. If a student only watches, they may feel fluent without being able to reason. A small drawing or hand-traced calculation exposes whether the visual intuition stuck.

## The learning sequence I recommend

Use this playlist as the first layer, then move students into implementation:

```text
3Blue1Brown Neural networks
  -> Socratopia AI Science I       guided dialogue and chapter structure
  -> Karpathy MicroGPT             minimal transformer code
  -> How to Train Your GPT         notebook-based implementation path
  -> Stanford CS336                full LLM systems curriculum
```

That order keeps the cognitive load sane. Students first understand the shapes, then read code, then train small models, then study the full production stack.

## Where the linked video fits

The final linked video, **But how do AI images and videos actually work?**, is useful because it stops treating diffusion as a separate magic trick. The chapter list from the video description gives the structure:

```text
CLIP
shared embedding space
diffusion models and DDPM
learning vector fields
DDIM
DALL-E 2
conditioning
guidance
negative prompts
```

The student takeaway is simple: image and video generation are not "drawing from text" in a literal sense. They combine learned representations, noisy-to-clean denoising dynamics, and conditioning signals that steer generation. That makes the topic feel connected to the earlier lessons instead of detached from neural networks.

## What this resource is not

- It is not enough for students who need to implement models.
- It does not replace linear algebra, probability, or PyTorch practice.
- It should not be treated as a complete diffusion course.
- It works best when paired with a coding assignment or Socratic discussion.

Its job is narrower and valuable: give students a stable mental image for the mechanics before they drown in notation.

## Use cases for LearnAI

- **Foundation module before LLM coding** — assign videos 1-8 before `MicroGPT` or `How to Train Your GPT`.
- **Bridge from LLMs to generative media** — use videos 9-10 before teaching diffusion tools or AI video workflows.
- **Concept repair** — when students confuse "weights store facts" with database lookup, send them to video 8 and ask for a short explanation of the difference.
- **Assessment prompt** — ask students to explain one model behavior using both the visual analogy and the corresponding mathematical object.

This page gives the wiki a beginner-friendly foundations track. CS336 is excellent, but it is not the first step for most students. This playlist is.
