---
title: "Paper2Code: Turn ArXiv Papers into Citation-Anchored Code"
date: 2026-04-06
category: Skills & Plugins
tags: [claude-code, skill, arxiv, paper-reproduction, research, code-generation, citation-anchoring]
related: ["alphaXiv MCP — Semantic ArXiv Search Directly in Claude Code", "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook", "Feynman AI Research Agent & Claude as Lab Partner — Promise and Pitfalls", "Karpathy: The End of Coding — Agents, AutoResearch, and the Loopy Era"]
icon: "📄"
image: "/assets/images/paper2code-arxiv-to-implementation.png"
---

Paper2Code is a Claude Code skill that transforms any ArXiv paper into a runnable, citation-anchored Python implementation. Every line of generated code traces back to the exact paper section it implements, and any detail the paper skips is explicitly flagged — never silently invented.

*Source: [GitHub - PrathamLearnsToCode/paper2code](https://github.com/PrathamLearnsToCode/paper2code) | [MCP Market Listing](https://mcpmarket.com/tools/skills/paper2code) | [Author's X Post](https://x.com/prathamgrv/status/2040057475542696309)*

## The Problem: Paper Reproduction is Painful

Anyone who's tried to reproduce a research paper knows the pain: key hyperparameters are buried in appendices or omitted entirely. You spend hours "guessing" what the authors actually did. Traditional LLM code generation makes this worse by confidently filling in the gaps without telling you.

Paper2Code solves this with a core philosophy of **honesty over completeness**.

## Three Core Mechanisms

| Mechanism | What It Does | Example |
|-----------|-------------|---------|
| **Citation Anchoring** | Every code line references its paper section | `# §3.2, Eq. 2 — softmax(QK^T / √d_k)` |
| **Ambiguity Auditing** | Classifies each detail as specified / partial / unspecified | `[UNSPECIFIED] Paper omits epsilon for LayerNorm` |
| **Transparent Defaults** | Uses reasonable defaults but marks them clearly | `eps=1e-6  # [UNSPECIFIED] Alternatives: 1e-5, 1e-8` |

### Citation Anchoring in Action

```python
# §3.2 — "We apply layer normalization before each sub-layer"
class TransformerBlock(nn.Module):
    def forward(self, x):
        # §3.2, Eq. 2 — attention_weights = softmax(QK^T / sqrt(d_k))
        attn_out = self.attention(self.norm1(x))
        x = x + attn_out  # §3.2 — residual connection
```

### Ambiguity Audit Labels

- **`[SPECIFIED]`** — Paper defines this explicitly
- **`[PARTIALLY_SPECIFIED]`** — Paper is ambiguous; quote and reasoning included
- **`[UNSPECIFIED]`** — Paper omits this; code uses reasonable default with alternatives listed
- **`[ASSUMPTION]`** — Inferred from context with explanation
- **`[FROM_OFFICIAL_CODE]`** — Taken from authors' reference implementation

## Installation & Usage

Install as a Claude Code skill via npx:

```bash
npx skills add PrathamLearnsToCode/paper2code/skills/paper2code
```

Then use with a simple slash command:

```bash
# Basic — just an ArXiv URL or ID
/paper2code https://arxiv.org/abs/1706.03762
/paper2code 1706.03762

# Specify framework
/paper2code https://arxiv.org/abs/2006.11239 --framework jax

# Full mode — includes training and data pipeline
/paper2code 2106.09685 --mode full

# Educational mode — extra comments, pedagogical notebook
/paper2code https://arxiv.org/abs/2010.11929 --mode educational
```

## Generated Project Structure

```
{paper_slug}/
├── README.md                  # Paper summary + quick-start
├── REPRODUCTION_NOTES.md      # Full ambiguity audit
├── requirements.txt           # Pinned dependencies
├── src/
│   ├── model.py              # Architecture  (§3.2 cited)
│   ├── loss.py               # Loss functions (Eq. refs)
│   ├── train.py              # Training loop  (§4.1 cited)
│   ├── data.py               # Dataset skeleton
│   ├── evaluate.py           # Metrics
│   └── utils.py              # Shared utilities
├── configs/
│   └── base.yaml             # All hyperparams (cited or flagged)
└── notebooks/
    └── walkthrough.ipynb     # CPU-runnable pedagogical notebook
```

The `walkthrough.ipynb` is especially useful: it maps "paper paragraph → corresponding code → shape check" in a closed loop, letting you verify each piece incrementally.

## Pipeline Under the Hood

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Paper Fetch │ ──▶ │   Parsing    │ ──▶ │  Ambiguity   │ ──▶ │    Code      │ ──▶ │ Walkthrough  │
│  (ArXiv URL) │     │  (sections,  │     │    Audit     │     │  Generation  │     │  Notebook    │
│              │     │  equations)  │     │              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

## What Paper2Code Won't Do

- **Guarantee correctness** — it faithfully implements what the paper says, even if the paper is wrong
- **Silently invent details** — unspecified choices are always flagged
- **Download datasets** — provides skeleton data loaders only
- **Reimplement standard components** — if the paper says "standard transformer encoder," it imports rather than rewrites

## Who Should Use This

- **Researchers** verifying whether a paper's claims hold up in code
- **Algorithm engineers** reproducing SOTA methods for their own projects
- **Students** learning how papers translate into implementations
- **Reviewers** checking if a paper's described method is internally consistent

## Related: PaperCoder (Academic Research)

A separate academic project called [PaperCoder](https://arxiv.org/abs/2504.17192) (arXiv 2504.17192) also tackles paper-to-code generation using a multi-agent framework with planning, analysis, and generation stages. It achieves strong results on the PaperBench benchmark. While different from this Claude Code skill, both address the same fundamental reproducibility challenge.
