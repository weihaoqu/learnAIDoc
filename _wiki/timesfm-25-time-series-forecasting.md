---
title: "TimesFM 2.5 — Google's Zero-Shot Time Series Forecasting"
date: 2026-04-17
category: Learning Resources
tags: [timesfm, time-series, forecasting, google, machine-learning, zero-shot, foundation-model, python]
related: ["AI Quant Tools — Kronos and Midas for Financial Market Research"]
icon: "📈"
image: "/assets/images/timesfm-25-time-series-forecasting.png"
---

Google Research's foundation model for time series forecasting — a 200M-parameter decoder-only transformer pre-trained on 400 billion real-world time points. Feed it historical data, get predictions out of the box. No fine-tuning, no feature engineering, no algorithm PhD required. Think "GPT for time series": the same pattern-learning that powers language models, applied to sales figures, stock prices, energy demand, and anything else that changes over time.

*Source: [TimesFM GitHub](https://github.com/google-research/timesfm) | [HuggingFace Model](https://huggingface.co/google/timesfm-2.5-200m-pytorch) | [Google Research Blog](https://research.google/blog/a-decoder-only-foundation-model-for-time-series-forecasting/) | [ICML 2024 Paper](https://arxiv.org/abs/2310.10688)*

## Why This Matters

Traditional time series forecasting requires domain expertise, careful feature engineering, and model tuning per dataset. TimesFM flips this: one pre-trained model handles diverse forecasting tasks zero-shot. For teams that have historical data but not a dedicated ML engineer, this is the fastest path from "raw CSV" to "actionable forecast."

## Model Specs at a Glance

| Detail | Value |
|--------|-------|
| Version | 2.5 (released Sept 2025) |
| Parameters | **200M** (down from 500M in v2.0) |
| Architecture | Decoder-only patch-based transformer |
| Context Length | **16,384 time points** (8x increase from v2.0's 2,048) |
| Max Forecast Horizon | **1,000 steps** (with continuous quantile head) |
| Pre-training Data | **400 billion time points** — Google Trends, Wikipedia views, financial markets, retail sales, IoT sensors |
| Quantile Head | Optional 30M parameter add-on for probabilistic forecasts |
| License | Apache 2.0 |
| GitHub Stars | 18,000+ |
| Backends | PyTorch, Flax/JAX |
| Hardware | CPU, GPU, TPU, Apple Silicon |

## What Changed from v2.0 to v2.5

- **60% smaller** (500M to 200M parameters) — runs comfortably on a laptop
- **8x longer context** (2K to 16K time points) — captures seasonal patterns spanning years
- **Probabilistic forecasting** — not just a point estimate, but quantile ranges ("90% chance sales land between 800-1,200")
- **No frequency indicator needed** — model auto-detects data granularity
- **Covariate support** (Oct 2025 XReg update) — incorporate external variables like holidays, promotions
- **Fine-tuning support** (Apr 2026) — LoRA via HuggingFace Transformers + PEFT

## How It Works

```
Historical Time Series Data
        │
        ▼
┌──────────────────────────┐
│  Patch-Based Tokenizer   │  Chunks continuous data into
│                          │  fixed-length patches (like
│                          │  vision transformers do with
│                          │  image patches)
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Decoder-Only Transformer│  Autoregressive prediction —
│  (200M params)           │  learns temporal patterns,
│                          │  seasonality, trends from
│                          │  400B training time points
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Quantile Forecast Head  │  Outputs point forecast +
│  (optional 30M params)   │  confidence intervals
│                          │  (10th–90th percentiles)
└──────────────────────────┘
```

## Quick Start

### Installation

```bash
git clone https://github.com/google-research/timesfm.git
cd timesfm

# Using uv (recommended)
uv venv && source .venv/bin/activate
uv pip install -e .[torch]

# Or via pip
pip install timesfm
```

### Basic Forecasting (PyTorch)

```python
import torch
import numpy as np
import timesfm

torch.set_float32_matmul_precision("high")

# Load pre-trained model from HuggingFace
model = timesfm.TimesFM_2p5_200M_torch.from_pretrained(
    "google/timesfm-2.5-200m-pytorch"
)

# Configure forecasting behavior
model.compile(
    timesfm.ForecastConfig(
        max_context=1024,       # how far back to look
        max_horizon=256,        # how far ahead to predict
        normalize_inputs=True,
        use_continuous_quantile_head=True,  # probabilistic output
        force_flip_invariance=True,
        infer_is_positive=True,
        fix_quantile_crossing=True,
    )
)

# Forecast — pass any list of time series arrays
point_forecast, quantile_forecast = model.forecast(
    horizon=12,
    inputs=[
        np.linspace(0, 1, 100),           # trend series
        np.sin(np.linspace(0, 20, 67)),   # seasonal series
    ],
)

# point_forecast shape: (2, 12) — 2 series, 12 steps ahead
# quantile_forecast shape: (2, 12, 10) — mean + percentiles
```

### Enterprise: SQL-Based Forecasting via BigQuery

```sql
-- No Python needed — TimesFM 2.5 is available natively in BigQuery ML
SELECT *
FROM ML.FORECAST(
  MODEL `project.dataset.timesfm_model`,
  STRUCT(30 AS horizon, 0.9 AS confidence_level)
)
```

## Comparison: TimesFM vs Other Forecasting Approaches

| Approach | Setup Time | Training | Multivariate | Probabilistic | Best For |
|----------|-----------|----------|-------------|--------------|----------|
| **TimesFM 2.5** | Minutes | Zero-shot | Via XReg covariates | Yes (quantile head) | Quick validation, diverse domains |
| **ARIMA/SARIMA** | Hours | Per-series | No | Limited | Single well-understood series |
| **Prophet** | Hours | Per-series | Limited | Yes | Business metrics with holidays |
| **Chronos-2** (Amazon) | Minutes | Zero-shot | Native multivariate | Yes | Multivariate out of the box |
| **MOIRAI-2** (Salesforce) | Minutes | Zero-shot | Any-variate attention | Yes | Complex multi-sensor data |
| **DeepAR** | Days-weeks | Full training | Yes | Yes | When you have massive labeled data |
| **PatchTST** | Days | Full training | Yes | No | Long-horizon academic benchmarks |
| **Kronos** | Hours | Zero-shot/fine-tune | Financial focus | Yes | Financial K-line data specifically |

### Head-to-Head: TimesFM 2.5 vs Key Competitors

- **vs ARIMA**: TimesFM reduced MAE by 15-25% on retail datasets (car parts, restaurant visitors) with zero manual tuning
- **vs DeepAR/PatchTST**: Matched performance on 96-192 step horizons — without the weeks of per-domain training those models require
- **vs Chronos-2** (Amazon, Feb 2026): Chronos-2 claims superiority on some multivariate benchmarks; TimesFM wins on enterprise integration (BigQuery, Vertex AI)
- **vs MOIRAI-2** (Salesforce): MOIRAI-2's MoE architecture achieves comparable accuracy with 65x fewer activated parameters, but lacks TimesFM's Google Cloud ecosystem

**Bottom line**: If you're already in Google Cloud, TimesFM is the obvious choice. If you need native multivariate support, look at Chronos-2 or MOIRAI-2. If you need financial-specific forecasting, consider Kronos.

## Real-World Use Cases

| Domain | Application | How TimesFM Helps |
|--------|------------|-------------------|
| **E-commerce** | Sales forecasting, demand planning | Feed daily/weekly sales data, get next-month forecast with confidence intervals |
| **Supply Chain** | Inventory optimization | Predict stockout risk per SKU without building per-product models |
| **Energy** | Grid demand forecasting, peak alerts | 16K context captures yearly seasonality in power consumption |
| **Finance** | Price movement validation, volatility estimation | Quick directional check before building a full trading model |
| **Data Centers** | Power/cooling capacity planning | Probabilistic forecasts flag "95th percentile demand will exceed capacity by Thursday" |
| **Retail** | Foot traffic, staffing optimization | Combine with holiday covariates (XReg) for accurate seasonal planning |
| **Crypto** | Trend detection, volatility alerts | Zero-shot works on high-frequency data without retraining |

## How LearnAI Team Could Use This

1. **Course demand forecasting** — Predict enrollment trends for upcoming semesters using historical registration data. Feed 3-5 years of weekly enrollment numbers, get probabilistic forecasts for next semester's capacity needs.

2. **Teaching tool for ML courses** — TimesFM is an excellent pedagogical example of foundation models beyond NLP. Students can see transfer learning in action: one model, many domains, zero fine-tuning. The 3-line usage pattern makes it accessible for homework assignments.

3. **Research project starter** — Any faculty or student project involving time series data (sensor readings, usage logs, survey trends) can use TimesFM as a strong baseline before investing in custom models. "Can a zero-shot model already solve this?" is a valuable first question.

4. **Lab infrastructure planning** — Predict compute cluster usage, storage growth, or API call volumes to plan hardware purchases and cloud budgets with confidence intervals instead of gut feelings.

5. **Comparative study material** — The foundation model vs. classical methods comparison (TimesFM vs ARIMA vs Prophet) maps directly to curriculum on when to use statistical vs. deep learning approaches. Run both on the same dataset and compare — students learn the tradeoffs hands-on.

## Getting Started Checklist

- [ ] Have historical time series data (CSV, database, or API)
- [ ] Install: `pip install timesfm` or clone from GitHub
- [ ] Load model: `timesfm.TimesFM_2p5_200M_torch.from_pretrained("google/timesfm-2.5-200m-pytorch")`
- [ ] Run forecast: `model.forecast(horizon=N, inputs=[your_data])`
- [ ] Evaluate: compare point forecasts and quantile ranges against held-out actuals
- [ ] Optional: add covariates via XReg, fine-tune with LoRA for domain-specific boost

## Links

- [GitHub Repository](https://github.com/google-research/timesfm) (18K+ stars, Apache 2.0)
- [HuggingFace Model Card](https://huggingface.co/google/timesfm-2.5-200m-pytorch)
- [ICML 2024 Paper](https://arxiv.org/abs/2310.10688)
- [Google Research Blog Post](https://research.google/blog/a-decoder-only-foundation-model-for-time-series-forecasting/)
- [BigQuery ML Integration Docs](https://docs.google.com/bigquery/docs/timesfm-model)
- [Hands-On Tutorial (Substack)](https://aihorizonforecast.substack.com/p/timesfm-25-hands-on-tutorial-with)
