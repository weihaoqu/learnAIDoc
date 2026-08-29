# Deck Analysis and Full Claim Ledger

## Configuration

- Topic: Stanford CS329A Part 8, Agentic Evaluations and Long-Horizon Tasks
- Style reference: Part 2 `intuition-machine` vector deck
- Audience: Q and technically curious learners
- Language: English
- Slide count: 12
- Aspect ratio: 16:9
- Production: original local SVG diagrams; no copied course figures or logos

## Message Hierarchy

**Core message:** An agent needs an evaluation portfolio, not one capability number.

**Supporting ideas:**

1. Human-time horizons estimate reliability decay across task duration.
2. Threshold choice changes the reported horizon.
3. GDPval measures judged professional deliverables, not autonomous jobs.
4. DeepScholar-Bench separates synthesis, retrieval, and verifiability.
5. Paper revisions and aggregate definitions must remain visible.

**Learner action:** audit every evaluation claim for task distribution, threshold, context, version, and missing dimensions.

## Full Claim Ledger

| ID | Slide | Claim | Evidence | Type | Confidence and calibration |
|---|---:|---|---|---|---|
| P8-01 | 1 | One benchmark cannot certify agent capability. | Lecture `00:00-04:32`; cross-paper synthesis | synthesis | High as a diagnostic, not a paper theorem. |
| P8-02 | 2 | Duration, economic value, and evidence quality are distinct axes. | Lecture `00:00-04:32`, `61:03-68:20` | synthesis | High as course framing. |
| P8-03 | 3 | A time horizon is fitted from agent success versus skilled-human completion time. | Lecture `04:32-16:55`; METR v4 | sourced | High within selected software tasks. |
| P8-04 | 4 | A stricter 80% success threshold produces a shorter horizon than 50%. | Lecture `16:55-22:55`; METR | sourced | High; exact ratio is model/fit specific. |
| P8-05 | 5 | METR reports an approximate seven-month historical doubling and about 50 minutes for Claude 3.7's 50% horizon. | Lecture `16:55-22:10`; METR v4 | sourced | High for paper setup; extrapolation uncertain. |
| P8-06 | 6 | Failures include planning/tool choice, reasoning, abandonment, and repeated actions. | Lecture `22:55-27:21`; METR | sourced | High as sampled categories; not exhaustive causes. |
| P8-07 | 7 | GDPval asks experts to judge economically valuable deliverables. | Lecture `27:21-33:40`; GDPval v1 | sourced | High; not autonomous workflow evaluation. |
| P8-08 | 8 | GDPval covers 44 occupations in nine sectors and releases a 220-task open gold subset. | Lecture `33:40-38:50`; GDPval v1 | sourced | High; predominantly digital tasks. |
| P8-09 | 9 | GDPval's leading aggregate score approaches the expert parity line in the paper snapshot. | Lecture `35:40-44:55`; GDPval v1 | sourced | High as aggregate snapshot; not parity task-by-task or job replacement. |
| P8-10 | 9 | Performance varies by occupation, modality, duration, context, and scaffolding. | Lecture `38:50-51:34`; GDPval v1 | sourced | High; aggregate score hides heterogeneity. |
| P8-11 | 10 | DeepScholar-Bench evaluates synthesis, retrieval, and verifiability separately. | Lecture `51:34-55:20`; DeepScholar v1/v2 | sourced | High; one mean cannot localize failure. |
| P8-12 | 11 | Lecture-time slide states no system exceeded 19% across all metrics. | Lecture `55:20`; Autumn 2025 video | observed | High for visible lecture slide; aggregation tied to lecture version. |
| P8-13 | 11 | Current arXiv v2 states no system surpasses 31% geometric mean. | DeepScholar v2 abstract, 2026-02-09 | sourced | High for v2; not directly comparable with lecture 19%. |
| P8-14 | 11 | The 19% and 31% snapshots must not be interpreted as a trend. | Version analysis | inferred boundary | High because revisions/aggregation differ or are not established as identical. |
| P8-15 | 12 | Duration, value, and evidence quality should be used as an evaluation portfolio. | Whole-lecture synthesis | synthesis | High as teaching recommendation. |

## Claim Calibrations

- Human completion time depends on worker expertise, tools, and context.
- A fitted 50% horizon is not a hard maximum and does not guarantee all shorter tasks.
- The seven-month fit is historical and conditional; METR v4 explicitly discusses external validity.
- GDPval supplies rich prompts and judges selected digital deliverables; it does not measure discovery and autonomous execution of whole jobs.
- Pairwise expert preference remains subjective and can reward presentation quality.
- DeepScholar `19%` is a lecture-time statement; `31%` is current v2's geometric mean. They are separate snapshots, not a progress chart.
- Coherent writing does not establish retrieval completeness or citation support.

## Visual Opportunity Map

| Concept | Original visual treatment |
|---|---|
| Evaluation portfolio | three gauges feeding a decision boundary |
| Three axes | duration, value, evidence as independent rulers |
| Time horizon | success curve crossing a human-time axis |
| Threshold sensitivity | 50% and 80% intersections on one curve |
| Historical fit | dated points and uncertainty band, not extrapolation hype |
| Failure modes | four failure-state cards around a task trace |
| GDPval | professional brief to deliverable to pairwise judge |
| Dataset | sectors to occupations to tasks to experts |
| Aggregate/heterogeneity | parity line beside occupation small multiples |
| DeepScholar dimensions | synthesis, retrieval, verifiability triangle |
| Version boundary | two snapshot cards separated by a do-not-compare wall |
| Portfolio | matrix matching claims to tests and blind spots |

## Accessibility and Export Checks

- Body type target: at least 21 px at 1600x900.
- No empirical number appears without a version or denominator cue.
- The Part 8 discrepancy is visible on Slide 11, in notes, ledger, wiki, and source note.
- Color is reinforced by labels and geometry.
- PNG, SVG, PPTX, and PDF use the same 1600x900 rendered slide frames.

## Verification Record

- Verified 2026-08-29: 12 numbered PNGs, 12 SVGs, and 12 slide prompts.
- `pdfinfo` reports 12 pages at 1600 x 900 points.
- PPTX archive inspection reports 12 slides and 12 speaker-note parts.
- The PDF cover was rasterized with `pdftoppm` and compared with the source frame; the contact sheet and full-resolution Slides 1, 3, 8, and 11 were visually inspected.
- The frozen transcript and visual-cue report remains inspectable at `slide-deck/cs329a-series/research/part-08-agentic-evaluations-long-horizon.md`.
