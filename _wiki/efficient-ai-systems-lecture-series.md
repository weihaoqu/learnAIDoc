---
title: "ML HW-SW Codesign / Efficient AI — 13 Free Lecture Pages on ML-Hardware-Software Co-Design"
date: 2026-05-19
category: Learning Resources
tags: [efficient-ai, ml-systems, hardware-software-codesign, pruning, quantization, compression, lecture-series, free, deep-learning, pytorch]
related: ["How to Train Your GPT — From-Scratch LLM Textbook with 12 Chapters and 28 Explainers", "Paper-Code Joint Analysis & Contract-Driven Skill Design", "Anthropic Academy — 13 Free AI Courses with Certificates"]
icon: "⚡"
image: "/assets/images/efficient-ai-systems-lecture-series.png"
---

Most ML courses teach you how to get better accuracy. This one teaches you why your model is too slow, too fat, and too expensive — and what to do about it at every level of the stack simultaneously. **ML HW-SW Codesign** (individual pages titled "Efficient AI Lecture …") is a free set of 13 published lecture pages on ML-hardware-software co-design, covering the full compression pipeline from algorithmic pruning and quantization to hardware-aware deployment. It is a valuable resource for engineers who want to ship models to the real world, not just publish benchmark numbers.

*Source: Weibo post by 蚁工厂 (May 2026; exact post URL not independently verified) | Course site: [ickma2311.github.io/ML/HW-SW-codesign/](https://ickma2311.github.io/ML/HW-SW-codesign/) | Note: the site nav lists Lecture 1 and Lectures 3–14 — 13 published pages; Lecture 2 is absent.*

## Why ML-HW-SW Co-Design Matters

The standard ML workflow treats hardware as an afterthought. You design a model for accuracy, then discover it runs too slowly on target hardware, then try to "optimize" it — usually by blindly applying a quantization library and hoping for the best. This may be acceptable in unconstrained research settings, but it falls apart on edge devices, mobile chips, embedded MCUs, and even cloud inference where latency and dollar-per-query are the actual performance metrics.

The ML-hardware-software co-design perspective flips this. It says: **the model's structure, the compression algorithm, and the hardware's arithmetic pipeline are one system.** You can't optimize one in isolation. A pruning strategy that creates unstructured sparsity might look great in FLOPs on paper but generate zero real speedup on hardware that can't exploit irregular memory access patterns. A quantization scheme that doesn't account for the target chip's supported numeric formats will slow inference, not accelerate it. This course teaches that unified perspective — drawing on foundational work including Deep Compression (Song Han et al.), EIE, MCUNetV3, and efficient language models such as Lite Transformer, SpAtten, and SmoothQuant/AWQ — so that every compression decision you make is grounded in what the hardware can actually exploit.

## Curriculum Overview

| # | Lecture Title | Notes |
|---|---------------|-------|
| 1 | Introduction | Co-design motivation; Deep Compression, EIE, MCUNetV3, efficient LMs survey |
| 2 | (Not present in site nav) | — |
| 3 | Pruning and Sparsity (Part 1) | L1/L2 magnitude, second-order, and regression-based pruning criteria; L0 hardware-aware sparsity |
| 4 | Pruning and Sparsity (Part II) | Layer-wise ratio assignment; AMC and NetAdapt automated pruning; converting sparsity to real speedup |
| 5 | Quantization (Part I) | K-means vs. linear quantization; numeric formats; range-precision tradeoffs |
| 6 | Quantization (Part II) | PTQ granularity; AdaRound; STE and QAT |
| 7 | Neural Architecture Search (Part I) | Automated architecture search for efficiency |
| 8 | Neural Architecture Search (Part II) | Once-for-all networks; hardware-aware NAS |
| 9 | Knowledge Distillation | Teacher-student training; response-based and feature-based distillation |
| 10 | MCUNet and TinyML | MCUNet/TinyML case study; TinyNAS, Flash/SRAM constraints, patch-based inference (MCUNetV3 is surveyed in Lecture 1) |
| 11 | TinyEngine | Inference engine for microcontrollers; memory and compute optimization |
| 12 | Transformer and LLM | Efficiency techniques applied to transformer architectures |
| 13 | LLM Deployment Techniques | Serving, quantization, and inference optimization for LLMs |
| 14 | LLM Post-Training | SFT, RLHF, DPO, PEFT methods, multimodal LLMs, prompting, CoT, RAG |

*Lecture titles verified from the course site nav. Lecture 2 is absent from the published nav. Topic summaries for Lectures 7–14 are drawn from the course overview cards; detailed lecture content should be verified at the course URL before curriculum use.*

## Key Technical Concepts Covered

**Pruning and Sparsity.** Pruning removes weights from a trained network to reduce parameter count and (ideally) inference cost. The course covers the full spectrum of pruning criteria — from simple L1/L2 magnitude thresholding to second-order methods (Hessian-based importance scoring) to regression-based criteria that preserve output fidelity. Critically, it addresses the hardware reality: unstructured pruning creates irregular sparsity that most accelerators can't exploit. The course covers L0-constraint formulations that push sparsity into structured patterns hardware can actually use. Automated methods like **AMC** (AutoML for Model Compression) and **NetAdapt** replace hand-tuned layer-wise ratios with policy-search and constraint-satisfaction approaches.

**Quantization.** Reducing weight and activation precision from float32 to int8, int4, or lower is one of the most practical efficiency levers available. The course covers both **post-training quantization (PTQ)** — no retraining, just calibrate and clip — and **quantization-aware training (QAT)** via the Straight-Through Estimator. The treatment of **AdaRound** (adaptive rounding of weights during PTQ) and per-channel vs. per-tensor granularity are particularly useful for practitioners who need quantized models that don't lose two accuracy points in production.

**Knowledge Distillation.** Compressing a large teacher model into a smaller student by transferring soft probability distributions and intermediate feature representations — a technique that pairs naturally with pruning and quantization pipelines.

**Neural Architecture Search (NAS).** Instead of compressing a fixed architecture, NAS searches for architectures that are inherently efficient for target hardware constraints. The course covers once-for-all networks and hardware-aware search (verified from course overview), which generate a family of models at different efficiency-accuracy operating points.

**Hardware Architecture Fundamentals.** The co-design perspective requires knowing what's happening inside an accelerator. The course addresses memory and data-movement costs, sparsity hardware support (e.g. EIE dataflow, Tensor Core 2:4 sparsity), and TinyEngine memory-aware kernels. Specific topics such as the roofline model and weight-stationary vs. output-stationary dataflow patterns may appear — verify at the course URL before citing.

## How LearnAI Team Could Use This

- **Pair with the AI Engineering from Scratch curriculum** as the systems-depth module. Where that curriculum teaches the full AI stack breadth, this lecture series provides the depth track for students who need to ship models to constrained hardware — edge, mobile, IoT.
- **Use in CS-336 (Program Analysis for Security) context** at Monmouth U. The course's techniques for analyzing model structure — pruning criteria, layer-wise sensitivity analysis, sparsity patterns — have direct parallels with program analysis: both involve finding what can be removed while preserving specified behavior. A cross-disciplinary lecture connecting static analysis intuitions to pruning analysis would be a novel teaching angle.
- **Run as a standalone reading group.** 13 published lecture pages is a manageable semester module. Assign one lecture per week as background reading, then workshop a hands-on compression exercise on a real model (ResNet, BERT, or a student's own project). The lecture series provides the theory; PyTorch's `torch.nn.utils.prune` and `bitsandbytes` are natural companion tools for implementation exercises.
- **Use Lecture 1's survey framing as a motivating hook** in any AI engineering course. The "why efficiency needs co-design" argument — illustrated with Deep Compression, EIE, and MCUNetV3 — is a compelling 15-minute opening for any session on model deployment.
- **Build a compression audit tool** inspired by the course's layer-wise analysis methods. A LearnAI tool that profiles a student's submitted model for pruning opportunities, quantization headroom, and estimated speedup on target hardware would be a concrete, high-value product.

## Real-World Use Cases

| Scenario | How This Applies |
|----------|-----------------|
| **Edge AI deployment** (embedded, IoT, mobile) | Lectures on MCUNetV3, structured pruning, and hardware-aware quantization directly address MCU-class constraints |
| **Cloud inference cost reduction** | Quantization (int8/int4) and pruning cut FLOPs and memory bandwidth; can reduce $/query on GPU inference when target kernels and hardware exploit lower precision or sparsity |
| **LLM serving optimization** | Lectures 13–14 cover SmoothQuant, AWQ, INT4 kernels, PagedAttention, FlashAttention, and speculative decoding — foundational techniques for production LLM serving |
| **Research reproducibility** | Understanding pruning criteria and quantization calibration helps reproduce compressed-model results from papers without black-boxing the process |
| **Hardware-software co-design teams** | Gives ML engineers enough hardware vocabulary to collaborate with chip architects on dataflow design and op-level optimization |
| **MLOps / model serving engineers** | LLM deployment and inference optimization content (lectures 12–13) covers serving, quantization, and deployment for production pipelines |
| **Academic courses on ML systems** | Free, GitHub Pages hosted, 13 published lecture pages — suitable supplemental material for graduate-level ML systems or efficient deep learning courses |

## Important Things to Know

**It is free and static.** Hosted on GitHub Pages, no login, no paywall, no cohort. No discussion forum, TA support, or certificate is advertised on the course page. The course is a structured set of lecture notes — high-density material you work through on your own or in a reading group.

**The course has 13 published lecture pages.** The site nav lists Lecture 1 and Lectures 3–14 — 13 pages total; Lecture 2 is absent. All lecture titles are verified from the site nav. The compression core (Lectures 1, 3–6) covers introduction, pruning, and quantization. Lectures 7–14 cover NAS, knowledge distillation, TinyML/MCUNet, TinyEngine, transformers, LLM deployment, and LLM post-training. Topic summaries are from the course overview cards; detailed lecture content should be verified at the course URL before building curriculum around it.

**The co-design framing is the differentiator.** Many courses cover pruning and quantization independently. This one explicitly grounds every technique in its hardware interaction — which techniques work on which hardware, and why. That framing is rare in free materials and is the reason to prefer this over a generic compression tutorial.

**Implementation framework.** The course pages include lecture notes, slides, and at least one Colab demo. PyTorch is a natural companion tool for hands-on exercises (e.g. `torch.nn.utils.prune`, `bitsandbytes`), but the course material itself does not mandate it — check individual lecture pages for code requirements before starting.

**Companion reading:** The course draws on foundational papers — Deep Compression (Han et al., ICLR 2016), EIE (Han et al., ISCA 2016), MCUNetV3, AMC (He et al., ECCV 2018), NetAdapt (Yang et al., ECCV 2018). Reading those papers alongside the lectures significantly deepens understanding and makes the course function as an annotated literature review, not just a tutorial.

**URL:** [ickma2311.github.io/ML/HW-SW-codesign/](https://ickma2311.github.io/ML/HW-SW-codesign/)
