---
title: "Towards a Medical AI Scientist — Full Auto Clinical Research from Idea to Paper"
date: 2026-05-08
category: AI Research
tags: [ai-research, medical-ai, clinical-research, automated-science, multi-agent, paper-writing, benchmark]
related: ["AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook", "AI Health Vault — Private Family Health Management with Obsidian + Claude"]
icon: "🏥"
image: "/assets/images/medical-ai-scientist.png"
---

Can AI run a complete clinical research pipeline — from generating research ideas to running experiments to writing the paper? "Towards a Medical AI Scientist" demonstrates a three-agent system that does exactly this across 19 clinical tasks and 6 data modalities. In the authors' benchmark, generated manuscripts scored near MICCAI level, and they report one system-generated manuscript was accepted at the non-archival ICAIS 2025 AI Scientist venue after peer review. The system outperformed GPT-5 in idea quality across the reported evaluation dimensions.

*Source: [arXiv 2603.28589](https://huggingface.co/papers/2603.28589) | [Project Homepage](https://cuhk-aim-group.github.io/Med-AI-Scientist-Homepage/)*

## The Three-Agent Pipeline

```
┌─────────────────────┐
│   Idea Proposer      │  Generates research hypotheses from clinical
│                      │  literature + real datasets
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ Experimental Executor│  Writes Python scripts, runs experiments,
│                      │  handles errors, iterates until results
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ Manuscript Composer  │  Writes structured medical paper following
│                      │  publication norms and ethics guidelines
└─────────────────────┘
```

### Idea Proposer

Combines clinical domain knowledge with engineering reasoning. Unlike generic LLM brainstorming, it:
- Grounds ideas in real clinical literature
- Uses federated reasoning from both clinicians and engineers
- Generates testable hypotheses with clear experimental designs
- Enhances traceability and reduces AI "hallucinated" research directions

### Experimental Executor

A general-purpose execution engine that:
- Connects to domain-specific medical tool chains
- Handles heterogeneous clinical data formats
- Self-debugs through iterative error correction
- Achieves high end-to-end execution success rates

### Manuscript Composer

Follows structured medical writing conventions:
- Embeds ethics review mechanisms
- Outputs papers following structured medical writing conventions with ethics/data-use checks
- Directly produces initial drafts suitable for journal submission

## Med-AI Bench: The Benchmark

| Dimension | Coverage |
|-----------|----------|
| **Clinical tasks** | 19 tasks across clinical research |
| **Data modalities** | 6 types: medical images, video, EHR, physiological signals, text, multimodal |
| **Cases** | 171 benchmark cases |
| **Evaluation** | Double-blind human expert review + automated assessment |

## Results

| Metric | Performance |
|--------|------------|
| **Idea quality** | Authors report it outperforms GPT-5 across 6 dimensions: novelty, maturity, ethicality, generalizability, utility, interpretability |
| **Execution success** | High end-to-end success rate with iterative debugging |
| **Paper quality** | In diabetic retinopathy evaluation, scored near MICCAI and above ISBI/BIBM baselines |
| **Peer review** | Authors report one manuscript accepted at non-archival ICAIS 2025 AI Scientist venue |

## Three Modes for Different Research Needs

| Mode | What It Does | Best For |
|------|-------------|----------|
| **Paper-based Reproduction** | Faithfully re-implements target papers or specified hypotheses with validation checks | Verifying results, learning methodology |
| **Literature-inspired Innovation** | Finds research gaps in existing literature and generates original approaches | Identifying novel directions |
| **Task-driven Exploration** | From a single user question, auto-discovers literature, plans experiments, runs them, writes up results | End-to-end research from scratch |

## Why This Matters Beyond Medicine

The pattern — Propose → Execute → Write — generalizes to any empirical research domain:

- **Computer science** — Generate, implement, and write up ML experiments
- **Social science** — Design surveys, analyze data, draft papers
- **Engineering** — Propose designs, simulate, document results

The medical domain is just the hardest test case because it requires domain expertise, ethical compliance, reproducibility, and adherence to strict reporting standards.

## Real-World Use Cases

- **Clinical researchers** — Accelerate the tedious parts of research (literature review, experiment scripting, first draft) while keeping human judgment for interpretation and ethics.
- **Medical institutions** — Screen research ideas at scale before committing wet-lab resources.
- **Pharmaceutical R&D** — Generate and evaluate hypotheses for drug repurposing or biomarker discovery.
- **Research education** — Demonstrate the full research pipeline to medical students with working examples.

## How LearnAI Team Could Use This

- **AI research ethics case study** — When AI can write papers that pass peer review, what does authorship mean? What are the ethical boundaries?
- **Automated science curriculum** — Use as an example of the "AI scientist" trend: where AI handles execution while humans guide strategy.
- **Benchmark design exercise** — Med-AI Bench is a model for how to evaluate AI research agents — students can design similar benchmarks for their own domains.

## Links

- **Paper:** [arXiv 2603.28589](https://huggingface.co/papers/2603.28589)
- **Homepage:** [Med-AI Scientist](https://cuhk-aim-group.github.io/Med-AI-Scientist-Homepage/)
- **From:** CUHK AIM Group
