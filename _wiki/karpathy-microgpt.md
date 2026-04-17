---
title: "Karpathy's MicroGPT — A Complete GPT in 200 Lines of Pure Python"
date: 2026-04-01
category: Learning Resources
redirect_from:
  - "/wiki/ai education/karpathy-microgpt/"
tags: [karpathy, gpt, transformer, education, from-scratch, python, assembly, microgpt, autograd, attention]
related: ["Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era", "TensorTonic — Learn Machine Learning by Implementing 200+ Algorithms from Scratch", "LLM Architecture Gallery — Visual Reference for Every Major Model"]
icon: "🔬"
image: "/assets/images/karpathy-microgpt.png"
---

A single file. 200 lines. No dependencies. No PyTorch, no NumPy, no tensors — just pure Python scalars. **MicroGPT** by Andrej Karpathy implements a complete GPT-style language model that trains and generates text, exposing every mechanism that powers ChatGPT in code you can read in one sitting.

*Source: [Karpathy's Blog Post](https://karpathy.github.io/2026/02/12/microgpt/) | [SNES-GPT — Assembly Port](https://github.com/vabruzzo/snes-gpt)*

## What MicroGPT Teaches

The 200 lines contain **six complete components** — the same six that exist in every production LLM:

```
1. Dataset        → 32K names, one per line
2. Tokenizer      → Character-level (a-z + BOS = 27 tokens)
3. Autograd       → Custom Value class with backward()
4. Architecture   → Embeddings → Attention → MLP → RMSNorm
5. Training       → Cross-entropy loss + Adam optimizer
6. Inference      → Autoregressive sampling with temperature
```

### The Autograd Engine

Every operation records its local derivative. One `loss.backward()` call chains them all via the multivariable chain rule:

```python
class Value:
    def __init__(self, data, children=(), local_grads=()):
        self.data = data
        self.grad = 0
        self._children = children
        self._local_grads = local_grads
```

### The Architecture (4,192 Parameters)

Same structure as GPT-2, miniaturized:

```
Input token
    ↓
Token Embedding (16-dim) + Position Embedding
    ↓
┌─────────────────────────────────┐
│  RMSNorm                        │
│  Multi-Head Attention (4 heads) │──→ residual connection
│  RMSNorm                        │
│  MLP (16 → 64 → 16)            │──→ residual connection
└─────────────────────────────────┘
    ↓
Output projection → 27 logits → softmax → next token
```

Key insight: **Attention is a token communication mechanism** (tokens look at each other). **MLP is computation** (each token thinks independently).

### Training

```python
# Tokenize: [BOS, e, m, m, a, BOS]
# Forward: feed tokens through model, build KV cache
# Loss: cross-entropy = -log(probability of correct token)
loss_t = -probs[target_id].log()
loss = (1 / n) * sum(losses)
loss.backward()  # One call computes ALL gradients
# Adam optimizer updates 4,192 parameters
```

Loss drops from ~3.3 (random guessing among 27 tokens) to ~2.37 over 1,000 steps.

### Inference

```python
temperature = 0.5
token_id = BOS
for pos_id in range(block_size):
    logits = gpt(token_id, pos_id, keys, values)
    probs = softmax([l / temperature for l in logits])
    token_id = random.choices(range(vocab_size), weights=probs)[0]
```

Generates plausible names: "kamon," "karai," "vialan" — not memorized from training data, but sampled from the learned distribution.

## MicroGPT vs Production LLMs

| Aspect | MicroGPT | Production (GPT-4, Claude) |
|---|---|---|
| Data | 32K names | Trillions of tokens |
| Tokenizer | 27 characters | 100K+ subword vocabulary |
| Compute | Python scalars | GPU/TPU tensor operations |
| Parameters | 4,192 | 100B+ |
| Layers | 1 | 100+ |
| Training time | ~1 minute | Months on thousands of GPUs |
| Post-training | None | SFT + RLHF + constitutional AI |

The difference is scale, not mechanism. The same six components exist in both.

## Community Example: SNES-GPT — MicroGPT on a Super Nintendo

Vincent Abruzzo ported MicroGPT to **65816 assembly** and runs it on actual SNES hardware — proving that a transformer is just math, executable even on a 3.58 MHz processor from 1990.

*Source: [github.com/vabruzzo/snes-gpt](https://github.com/vabruzzo/snes-gpt) (55 stars)*

### How It Works

| Aspect | Detail |
|---|---|
| **Processor** | 3.58 MHz 65816 CPU |
| **Arithmetic** | Q8.8 fixed-point (8 integer bits, 8 fractional bits) |
| **Multiplier** | SNES PPU hardware multiplier at $4202/$4203 |
| **RAM** | ~1KB WRAM for working buffers |
| **Weights** | 8KB stored directly in ROM cartridge |
| **Parameters** | 4,064 |
| **Output** | 20 generated names displayed via SNES graphics processor |

### The Build Pipeline

```bash
make
# 1. Trains model in Python (~500 steps)
# 2. Quantizes weights to Q8.8 fixed-point
# 3. Generates exp() and inverse sqrt lookup tables (256 entries each)
# 4. Assembles 65816 source files (ca65)
# 5. Links final ROM (ld65) → build/snes_gpt.sfc
# 6. Run in Snes9x emulator
```

### Assembly Source Structure

```
src/
├── main.asm       — SNES init, ROM header
├── gpt.asm        — Complete forward pass
├── math.asm       — Q8.8 arithmetic (multiply, divide, exp, rsqrt)
├── vector.asm     — Linear algebra primitives
├── inference.asm  — Generation loop + display
└── snes.inc       — Hardware register definitions
```

### Debugging War Stories

The assembly port surfaced bugs that would never appear in Python:

- **Register width mismatch** — `.a16` (16-bit accumulator) without `.i16` (16-bit index) caused 8-bit index instructions, misaligning the entire instruction stream
- **PRNG failure** — byte-swap (`xba`) substituted for left-shift produced a degenerate cycle where all 20 names were identical
- **Accumulator collision** — fixed-point multiply and dot product shared zero-page variables, erasing sums mid-computation

## The Philosophical Point

> "The model doesn't learn explicit rules, it learns a probability distribution."

MicroGPT reveals that LLMs perform no magic — they're a big math function mapping input tokens to a probability distribution over the next token. Understanding these 200 lines gives you genuine insight into how ChatGPT works. The SNES port proves the point further: if a 1990 game console can run a transformer, the mechanism really is just arithmetic.

## Links

- **MicroGPT blog post:** [karpathy.github.io/2026/02/12/microgpt](https://karpathy.github.io/2026/02/12/microgpt/)
- **SNES-GPT:** [github.com/vabruzzo/snes-gpt](https://github.com/vabruzzo/snes-gpt)
- **Related:** [Karpathy's "End of Coding" Talk](/learnAIDoc/wiki/karpathy-end-of-coding/)
