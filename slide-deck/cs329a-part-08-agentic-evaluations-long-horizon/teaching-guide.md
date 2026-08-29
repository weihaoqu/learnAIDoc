# Teaching Guide: CS329A Part 8 - Agentic Evaluations and Long-Horizon Tasks

Use this deck to prevent a common mistake: treating one benchmark number as a certificate of broad agent capability.

## Slide 1: One Benchmark Is Not a Certificate

An evaluation observes a task distribution under a protocol. Deployment adds interaction, cost, changing context, and long-tail failures.

## Slide 2: Three Axes

Task duration, economic value, and evidence quality answer different questions. A system can score well on one and fail another.

**Checkpoint:** Give an example of a long task with low economic value and a short task with high value.

## Slide 3: Time Horizons

Human completion time is used as a difficulty proxy. Agent success is fit across durations; the threshold intersection defines the horizon. It is not the longest task an agent happened to finish.

## Slide 4: Threshold Sensitivity

The 50% horizon describes a coin-flip success boundary. The 80% horizon asks where performance becomes substantially more reliable and is therefore shorter.

## Slide 5: Historical Trend

METR v4 reports roughly 50 minutes for Claude 3.7 Sonnet and an approximate seven-month historical doubling. The paper itself warns about external validity. Do not turn the fitted line into an unconditional forecast.

## Slide 6: Failure Trajectories

Planning mistakes, wrong tools, flawed reasoning, premature abandonment, and repeated failed actions can compound. Long-horizon evaluation must inspect traces, not only final outputs.

## Slide 7: GDPval

GDPval evaluates professional deliverables through expert pairwise judgment. It measures something closer to workplace output quality than elapsed task duration, but rich supplied context remains part of the protocol.

## Slide 8: Sampling Work

Forty-four occupations across nine sectors is broad coverage, not complete occupation simulation. The benchmark focuses on selected predominantly digital tasks and releases 220 open gold tasks.

## Slide 9: Aggregate Versus Heterogeneity

An aggregate score can approach an expert parity line while specific occupations, modalities, and longer tasks remain weaker. Aggregate near-parity is not task-by-task parity or job replacement.

## Slide 10: Research Evidence

DeepScholar-Bench separates coherent organization, source retrieval, and citation support. A polished report can fail retrieval or verifiability.

## Slide 11: Version Discipline

The lecture slide says `19%`; current arXiv v2 says `31% geometric mean`. The revision, system set, or aggregation may differ. These are not a time series.

**Required wording:** different version snapshots, not directly comparable, not evidence of a 12-point improvement.

## Slide 12: Evaluation Portfolio

Before accepting a deployment claim, record:

1. task distribution;
2. success threshold;
3. supplied context and scaffolding;
4. evidence and judging protocol;
5. paper/benchmark version;
6. omitted deployment dimensions.

## Short Homework

Evaluate a proposed university research agent. Build a three-part test:

| Axis | Task | Metric | Blind spot |
|---|---|---|---|
| Duration | Define a multi-step task with a skilled-human time estimate. | Choose 50% or 80% success and justify it. | Explain why time is an imperfect proxy. |
| Value | Define a real deliverable and expert pairwise rubric. | Preference or acceptance rate. | Explain what context is supplied. |
| Evidence | Require a cited related-work section. | Synthesis, retrieval, and citation support. | Explain how missing sources are detected. |

Conclude what the portfolio still cannot tell a university decision-maker.
