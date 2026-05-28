---
title: "SubQ — The First Subquadratic LLM: 12M Token Context at 5% of Opus Cost"
date: 2026-05-08
category: AI for Research
tags: [llm-architecture, attention, sparse-attention, subquadratic, long-context, efficiency, transformer-alternative]
related: ["Claude Code Session Management & 1M Context — The Official Decision Framework", "Caveman — Token Compression for AI Coding Agents"]
icon: "🔬"
image: "/assets/images/subq-subquadratic-sparse-attention.png"
---

SubQ is a new LLM from Miami startup Subquadratic that claims to be the first model built on a fully subquadratic attention architecture. Instead of comparing every token to every other token (quadratic cost), its Subquadratic Sparse Attention (SSA) mechanism selects only the positions that matter based on content — achieving a 12-million-token context window with 52x speed gains and costs under 5% of Opus. The benchmarks are strong but unverified: no weights, no independent evaluation, and significant community skepticism.

*Source: [Subquadratic Official](https://subq.ai/introducing-subq) | [VentureBeat Analysis](https://venturebeat.com/technology/miami-startup-subquadratic-claims-1-000x-ai-efficiency-gain-with-subq-model-researchers-demand-independent-proof) | [The New Stack](https://thenewstack.io/subquadratic-12-million-context-window/) | [Hacker News Discussion](https://news.ycombinator.com/item?id=48023079)*

## The Core Idea: Why Most Attention Is Wasted

Standard transformer attention is quadratic: every token attends to every other token. For a 1M-token context, that's 1 trillion attention computations — most of which produce near-zero weights.

SSA's insight: **if most attention weights are near zero, don't compute them.** For each query, SSA selects a small subset of positions based on *content relevance* (not fixed patterns), then computes exact attention only over those positions.

```
Standard Attention (Quadratic):
  Every token ↔ Every token = O(n²)
  1M tokens = 1,000,000,000,000 comparisons

SSA (Subquadratic):
  Every token → Select relevant positions → Attend only those = O(n)
  1M tokens = comparisons grow linearly with selected positions
```

## Three Key Properties of SSA

| Property | What It Means | Why It Matters |
|----------|---------------|----------------|
| **Linear scaling** | Compute grows with the number of selected positions, not the full sequence | Context doubles → cost doubles (not quadruples) |
| **Content-dependent routing** | The model decides *where to look* based on meaning, not position | Token 3 or token 11,000,000 — if it's relevant, SSA finds it |
| **Precise retrieval** | Unlike recurrent models that compress into fixed state, SSA computes exact attention over selected positions | Can retrieve from arbitrary positions without the lossy compression of state-space models |

## Benchmark Claims

| Benchmark | SubQ 1M-Preview | Opus 4.6 | GPT 5.4 | Gemini 3.1 Pro |
|-----------|----------------|----------|---------|----------------|
| **RULER 128K** | 95-97% | 94.8% | — | — |
| **SWE-Bench Verified** | 81.8-82.4 | 80.8-81.4 | — | 80.6 |
| **MRCR v2** | 65.9 (prod) / 83 (research) | 78% | 39% | 26.3% |

### Efficiency Numbers

| Context Length | SSA vs FlashAttention-2 Speedup |
|----------------|-------------------------------|
| 128K tokens | 7.2x faster |
| 256K tokens | 13.2x faster |
| 512K tokens | 23x faster |
| 1M tokens | 52.2x faster |
| 12M tokens | ~1,000x compute reduction |

**Cost comparison:** On RULER 128K, SubQ costs ~$8 vs Opus's ~$2,600 — a 300x cost difference.

## The Team

| Person | Role | Background |
|--------|------|------------|
| Justin Dangel | CEO | Five-time founder (health tech, insurance tech) |
| Alex Whedon | CTO | Former Meta engineer, ex-Head of Gen AI at TribeAI |
| + 11 PhD researchers | Research | From Meta, Google, Oxford, Cambridge, ByteDance, Adobe, Microsoft |

Raised **$29M seed round** from investors including Justin Mateen (Tinder co-founder).

## Why You Should Be Skeptical

This is where critical thinking matters. The claims are extraordinary, and several red flags exist:

| Concern | Detail |
|---------|--------|
| **No weights released** | Cannot independently verify architecture claims |
| **No full technical report** | Blog post and benchmark results, but no paper with methodology |
| **Single-run benchmarks** | Each model run only once due to "high inference cost" — no confidence intervals |
| **Cherry-picked evals** | Only long-context retrieval and coding benchmarks shown — areas where SSA should have max advantage |
| **Historical precedent** | Magic.dev made similar 1000x efficiency claims in 2024 with $500M raised; no public evidence of delivery |
| **"AI Theranos" debate** | AI commentator Dan McAteer: "SubQ is either the biggest breakthrough since the Transformer... or it's AI Theranos" |

Not all reactions are negative. AI researcher John Rysana pushed back: "This is just subquadratic attention done well, which is very meaningful for long context workloads — odds of it being BS are extremely low."

Prominent AI engineer Will Depue initially suggested SubQ may be "a sparse attention finetune of Kimi or DeepSeek." CTO Alex Whedon later confirmed SubQ uses weights from open-source models as a starting point — meaning the architecture innovation is the SSA attention layer, not the base weights.

**Bottom line:** The architectural idea (sparse, content-dependent attention) is sound and well-established in research. Whether *this specific implementation* delivers on the headline numbers requires independent verification that doesn't exist yet.

## What This Means for the Field

SubQ is part of a broader trend toward more efficient attention mechanisms. Multiple research threads are exploring alternatives to dense attention:

- **Linear attention variants** (Mamba, RWKV, Kimi Linear) — State-space and linear recurrence approaches
- **Fixed-pattern sparse attention** (Longformer, BigBird) — Predefined sparsity patterns
- **Content-dependent sparse attention** (SSA, DeepSeek Sparse) — Dynamic selection based on meaning

Whether any of these approaches fully replaces dense attention in production remains to be seen — previous claims of similar magnitude (e.g., Magic.dev's LTM-2-mini in 2024) have not yet been publicly validated. But the research direction is real and well-funded.

## Products Available

| Product | What It Does | Status |
|---------|-------------|--------|
| **SubQ API** | 12M token context window via API | Private beta |
| **SubQ Code** | Coding agent (CLI) | Private beta |
| **SubQ Search** | Deep research tool | Private beta |

## Real-World Use Cases

- **Entire codebase analysis** — Load millions of lines of code into context without truncation or RAG.
- **Legal document review** — Process complete contract sets, case law, and regulatory filings in a single pass.
- **Long-running agent state** — Agents that maintain months of interaction history without forgetting.
- **Scientific literature synthesis** — Analyze dozens of full papers simultaneously for systematic reviews.

## How LearnAI Team Could Use This

- **Critical evaluation exercise** — Use SubQ as a case study in evaluating AI claims: what evidence would you need to believe these benchmarks? What's the difference between marketing and peer-reviewed results?
- **Attention mechanism deep-dive** — Compare standard attention, sparse attention, linear attention, and SSA in a lecture on transformer architecture evolution.
- **Cost-performance analysis** — Teach students to evaluate AI tools not just on accuracy but on cost/token, availability, and verification status.

## Links

- **Official site:** [subq.ai](https://subq.ai/)
- **Launch post:** [Introducing SubQ](https://subq.ai/introducing-subq)
- **Architecture post:** [How SSA Makes Long Context Practical](https://subq.ai/how-ssa-makes-long-context-practical)
- **VentureBeat analysis:** [Researchers demand independent proof](https://venturebeat.com/technology/miami-startup-subquadratic-claims-1-000x-ai-efficiency-gain-with-subq-model-researchers-demand-independent-proof)
- **Hacker News:** [Discussion thread](https://news.ycombinator.com/item?id=48023079)
