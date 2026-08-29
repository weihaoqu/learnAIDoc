# Deck Analysis and Full Claim Ledger

## Configuration

- Topic: Stanford CS329A Part 7, Self-Improvement and Deep Research Agents
- Style reference: Part 2 `intuition-machine` vector deck
- Audience: Q and technically curious learners
- Language: English
- Slide count: 12
- Aspect ratio: 16:9
- Production: original local SVG diagrams; no copied Stanford imagery or logos

## Message Hierarchy

**Core message:** Search works when diversity, feedback, selection, and stopping are designed together.

**Supporting ideas:**

1. AlphaCode exposes latent code capability through massive candidate generation.
2. Selection metrics matter because coverage is not the returned result.
3. AlphaCode 2 improves policy diversity and ranking but remains expensive and domain-specific.
4. Search-o1 turns retrieval into an action inside reasoning rather than a one-time preface.
5. Code execution and document evidence share a control pattern but not the same reliability guarantees.

**Learner action:** audit a search agent by naming its candidate space, feedback channel, selector, budget, and stopping rule.

## Full Claim Ledger

| ID | Slide | Claim | Evidence | Type | Confidence and calibration |
|---|---:|---|---|---|---|
| P7-01 | 1 | Search needs generation plus feedback-guided selection. | Lecture `00:00-01:11`; cross-paper synthesis | synthesis | High as a teaching framework; not a single-paper theorem. |
| P7-02 | 2 | Contest problems require problem interpretation, algorithm choice, implementation, and hidden-test correctness. | Lecture `01:11-04:30`; AlphaCode v1 | sourced | High for the benchmark task; not all software engineering. |
| P7-03 | 3 | AlphaCode samples at very large scale, then filters and behaviorally clusters programs. | Lecture `04:30-09:40`; AlphaCode v1 | sourced | High for the reported pipeline. |
| P7-04 | 4 | `pass@k` and `10@k` test coverage and small-set selection differently. | Lecture `09:40-16:35`; AlphaCode v1 | sourced interpretation | High; formal definitions remain in the paper. |
| P7-05 | 5 | More samples help only while useful diversity and selection keep pace. | Lecture `16:35-24:38`; AlphaCode ablations | inferred | Medium-high; not a universal scaling law. |
| P7-06 | 6 | AlphaCode 2 uses a policy family, execution filtering, clustering, and a scoring model. | Lecture `24:38-30:20`; technical report pp. 1-3 | sourced | High; report is first-party, not archival peer review. |
| P7-07 | 7 | AlphaCode 2 reports 43% solved vs 25% and an estimated 85th percentile. | Lecture `30:20-38:20`; technical report pp. 1, 3 | sourced | High for 77 problems and reported procedure; not general coding competence. |
| P7-08 | 8 | Difficulty-aware budgets, traces, decomposition, and backtracking are candidate extensions beyond flat sampling. | Lecture discussion `39:25-46:33` | observed | Medium; discussion directions, not AlphaCode 2 results. |
| P7-09 | 9 | A missing fact can derail an otherwise coherent reasoning chain. | Lecture example `46:33-50:40`; Search-o1 motivation | sourced | High as a demonstrated failure mode; frequency not estimated. |
| P7-10 | 10 | Search-o1 lets a model trigger retrieval during reasoning. | Lecture `50:40-55:50`; Search-o1 | sourced | High in the paper's controlled method. |
| P7-11 | 11 | Reason-in-Documents extracts focused evidence before reinserting it into the reasoning context. | Lecture `55:50-61:20`; Search-o1 | sourced | High for mechanism; no guarantee of source completeness or truth. |
| P7-12 | 11 | Search-o1 improves the paper's tested benchmarks over compared baselines. | Lecture `61:20-68:15`; Search-o1 | sourced | High within tested benchmarks only. |
| P7-13 | 12 | Confidence is not a correctness certificate, and search needs a stopping rule. | Q&A `68:58-72:26`; deck synthesis | observed + synthesis | Medium-high; lecture presents no calibration experiment here. |
| P7-14 | 12 | Code execution and retrieval can be compared as feedback loops but are not empirically equivalent. | Whole-lecture synthesis | synthesis | High as a boundary statement. |

## Claim Calibrations

- AlphaCode's top-54.3% result is from simulated competition evaluation with more than 5,000 participants.
- AlphaCode 2's 43%, 25%, and 85th-percentile figures are from its first-party technical report and selected Codeforces contests.
- The lecture visual appears near 87%; the report text states 85th percentile, so the deck uses 85th.
- Up to one million samples is a system scale fact, not a recommended default budget.
- Public tests reject candidates that fail specified examples; they do not prove hidden-test correctness.
- Search-o1 benchmark gains do not establish comprehensive, truthful, or safe web research.
- Search-R1 is named but outside this deck's taught mechanism.

## Visual Opportunity Map

| Concept | Original visual treatment |
|---|---|
| Search control problem | generator-feedback-selector loop |
| Contest complexity | statement-to-algorithm-to-code-to-hidden-tests pipeline |
| AlphaCode | million-scale candidate fan through filter and clusters |
| Metrics | coverage pool versus selected submission tray |
| Diversity saturation | diversity curve flattening while compute rises |
| AlphaCode 2 | policy family merging into filter, cluster, scorer |
| Reported result | three metric cards with denominator strip |
| Adaptive search | difficulty router into flat sampling, tree search, human review |
| Knowledge gap | reasoning chain broken by an uncertainty node |
| Agentic retrieval | recurrent search inside reasoning |
| Reason-in-Documents | documents to evidence extraction to context |
| Diagnostic | five-question bounded search loop |

## Accessibility and Export Checks

- Minimum body type target: 21 px at 1600x900.
- Color is reinforced by labels and geometry.
- Every empirical slide carries a timestamp and/or primary-paper identifier.
- One dominant diagram per slide; no copied figures.
- PNG, SVG, PPTX, and PDF retain identical framing.
