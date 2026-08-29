# CS329A Part 8 Evidence Report: Agentic Evaluations and Long-Horizon Tasks

## Source Record

- Official video: [Stanford CS329A Self-Improving AI Agents | Part 8 | Agentic Evaluations and Long Horizon Tasks](https://www.youtube.com/watch?v=8JAqLnTaZu4)
- Video ID: `8JAqLnTaZu4`
- Duration: `1:15:17`
- Course: [Stanford CS329A: Self-Improving AI Agents, Autumn 2025](https://cs329a.stanford.edu/)
- Method: full native-caption transcript read from beginning to end, followed by targeted inspection of 18 visual cues.
- Transcript completeness: captions cover the full recording. Some audience questions are faint; the lecturer restates enough context to follow the substantive discussion.
- Official schedule mapping: "Agentic Evaluations & Long-Horizon Tasks," with readings on long software tasks, GDPval, and DeepScholar-Bench.

Evidence hierarchy: current primary papers control empirical claims; the lecture controls pedagogical framing; inspected frames control visual descriptions. Current arXiv versions may differ from the versions available when the Autumn 2025 lecture was recorded.

## Primary Readings

1. Thomas Kwa, Ben West, Joel Becker, Amy Deng, Katharyn Garcia, et al., [Measuring AI Ability to Complete Long Software Tasks](https://arxiv.org/abs/2503.14499), NeurIPS 2025. The course schedule uses the shorter label "Long Tasks."
2. Tejal Patwardhan, Kevin Liu, Ryan Liu, Melanie Lam, Andreas Harnack, et al., [GDPval: Evaluating AI Model Performance on Real-World Economically Valuable Tasks](https://arxiv.org/abs/2510.04374), 2025.
3. Liana Patel, Siddharth Karamcheti, Shyamal Buch, Jordan Ash, Diyi Yang, and Christopher D. Manning, [DeepScholar-Bench: A Live Benchmark and Automated Evaluation for Generative Research Synthesis](https://arxiv.org/abs/2508.20033), 2025; current arXiv revision dated 2026.

## Timestamped Conceptual Outline

| Time | Conceptual development |
|---|---|
| `00:00-04:32` | The lecture motivates evaluation for economic and safety forecasting and warns that traditional benchmarks saturate. Capability and economic value are related but distinct. |
| `04:32-06:45` | METR-style time horizons are introduced: task difficulty is anchored to the time a skilled human takes, then agent success is measured across durations. |
| `06:45-12:37` | SWAA, HCAST, and RE-Bench supply tasks ranging from seconds to many hours. Human runs estimate time; agent runs estimate success. |
| `12:37-16:55` | A fitted success-versus-human-time curve yields a 50% time horizon. Longer human tasks correlate with lower agent success in the evaluated suites. |
| `16:55-22:55` | Historical model releases are plotted against horizon. The paper reports an approximate seven-month doubling trend, with substantial uncertainty and external-validity caveats. |
| `22:55-27:21` | Failure analysis highlights planning/tool-choice errors, incorrect reasoning, premature abandonment, and repeated failed actions. Benchmark construction and contamination are discussed. |
| `27:21-33:40` | GDPval shifts the target from elapsed task duration to economically valuable deliverables produced across occupations and sectors. |
| `33:40-38:50` | Dataset construction uses 44 occupations in nine sectors, expert-created tasks and references, and pairwise expert judgments. The lecture describes 1,320 tasks and a 220-task open gold subset. |
| `38:50-44:55` | Results show a roughly linear frontier trend in the lecture snapshot, uneven performance by occupation and modality, and sensitivity to task duration and context. |
| `44:55-51:34` | Failure modes include ignored references, instruction-following failures, and formatting problems. Rich benchmark context means GDPval is not equivalent to autonomous workplace deployment. |
| `51:34-55:20` | DeepScholar-Bench defines research synthesis along three dimensions: synthesis quality, retrieval quality, and verifiability. |
| `55:20-61:03` | Lecture-time results show low joint performance, missing foundational sources and facts, and a quality-verifiability tradeoff. Oracle-source tests still reveal extraction limits. |
| `61:03-68:20` | The three benchmarks are synthesized: duration, economic value, and evidence quality expose different bottlenecks. Long horizon does not imply dependable output. |
| `68:20-75:17` | Q&A addresses forecasting, scientific copilots, long-tail reliability, data bottlenecks, and the gap between a benchmark task and sustained work. |

## 12-Slide Teaching Narrative

| Slide | Title | Teaching job | Evidence anchor | Visual concept |
|---:|---|---|---|---|
| 1 | What Does Agent Progress Mean? | Separate benchmark score, task horizon, economic usefulness, and trustworthiness. | `00:00-04:32` | Four non-overlapping gauges. |
| 2 | Human Time as a Difficulty Scale | Explain the 50% and 80% time-horizon concepts. | `04:32-06:45`; METR paper | Success curve intersecting two thresholds. |
| 3 | Building the Long-Task Suite | Introduce SWAA, HCAST, and RE-Bench across six orders of magnitude. | `06:45-12:37` | Log-scale task timeline. |
| 4 | Fit a Horizon, Do Not Read a Maximum | Explain why the metric comes from a fitted curve rather than the longest lucky success. | `12:37-16:55` | Scatter and logistic curve. |
| 5 | The Seven-Month Trend | Present the historical doubling estimate with confidence and scope caveats. | `16:55-22:55`; METR paper | Trend line surrounded by uncertainty band. |
| 6 | Long-Task Failure Taxonomy | Move from aggregate score to planning, reasoning, abandonment, and loops. | `22:55-27:21` | Failure-state transition diagram. |
| 7 | GDPval Changes the Question | Ask whether outputs have workplace value, not merely whether tasks run long. | `27:21-33:40`; GDPval paper | Duration axis crossed with economic-value axis. |
| 8 | How GDPval Is Built | Explain occupations, sectors, expert tasks, reference outputs, and pairwise judging. | `33:40-38:50` | Dataset construction flow. |
| 9 | Progress Is Uneven | Show occupation, modality, duration, context, and instruction-following variation. | `38:50-51:34` | Small multiples rather than one leaderboard. |
| 10 | Research Synthesis Needs Three Scores | Define synthesis, retrieval, and verifiability. | `51:34-55:20`; DeepScholar-Bench | Three-axis radar used conceptually, not for ranking. |
| 11 | Good Prose Can Still Miss the Literature | Explain missed key facts, weak source coverage, and citation support. | `55:20-61:03` | Polished report with evidence gaps highlighted. |
| 12 | Use an Evaluation Portfolio | Conclude that horizon, value, and evidence quality must be measured together. | `61:03-75:17` | Evaluation matrix with deployment boundary. |

## Claim-Evidence Ledger

| ID | Claim | Evidence type | Lecture time | Primary source | Calibration |
|---|---|---|---|---|---|
| P8-C01 | A time horizon is the human task duration at which a model reaches a chosen success probability, commonly 50% or 80% in this work. | Paper-supported | `04:32-06:45` | [Long Software Tasks](https://arxiv.org/abs/2503.14499) | It is a fitted benchmark statistic, not a hard maximum duration. |
| P8-C02 | The evaluated suite combines 66 SWAA, 97 HCAST, and 7 RE-Bench tasks in the lecture, totaling 170. | Lecture visual + paper context | `05:42-08:00` | [Long Software Tasks](https://arxiv.org/abs/2503.14499) | Use the current paper's tables for exact reproduction; dataset revisions may alter counts. |
| P8-C03 | Across these suites, agent success tends to fall as skilled-human completion time rises. | Paper-supported | `12:37-16:55` | [Long Software Tasks](https://arxiv.org/abs/2503.14499) | Correlation within selected tasks; human time is an imperfect difficulty proxy. |
| P8-C04 | The paper estimates that the 50% horizon doubled about every seven months over the studied historical period. | Paper-supported | `16:55-22:10` | [Long Software Tasks](https://arxiv.org/abs/2503.14499) | Extrapolation is uncertain; current arXiv text explicitly warns about external validity. |
| P8-C05 | Claude 3.7 Sonnet's 50% horizon is about 50 minutes in the paper's task distribution. | Paper-supported | `18:50-20:30` | [Long Software Tasks](https://arxiv.org/abs/2503.14499) | Model- and suite-specific historical estimate, not a claim about all 50-minute work. |
| P8-C06 | The 80% horizon is materially shorter than the 50% horizon. | Paper-supported | `20:30-22:55` | [Long Software Tasks](https://arxiv.org/abs/2503.14499) | Illustrates reliability sensitivity; exact ratio varies by model and fit. |
| P8-C07 | Observed failures include poor planning/tool choice, faulty reasoning, premature abandonment, and repeated failed actions. | Paper/lecture-supported | `22:55-25:30` | [Long Software Tasks](https://arxiv.org/abs/2503.14499) | Manual categories on sampled failures, not an exhaustive causal taxonomy. |
| P8-C08 | GDPval covers 44 occupations across nine high-GDP U.S. sectors. | Paper-supported | `29:00-35:40` | [GDPval](https://arxiv.org/abs/2510.04374) | Coverage is broad but limited to predominantly digital tasks selected by the benchmark. |
| P8-C09 | GDPval uses experienced professionals to create tasks/reference deliverables and judge model outputs pairwise. | Paper-supported | `31:00-38:50` | [GDPval](https://arxiv.org/abs/2510.04374) | Pairwise preference captures professional judgment but remains subjective. |
| P8-C10 | The lecture reports a roughly linear improvement pattern across the compared frontier models; its displayed aggregate pairwise score for the leading model approaches the industry-expert parity line. | Lecture + paper | `35:40-40:20` | [GDPval](https://arxiv.org/abs/2510.04374) | Aggregate snapshot across selected tasks and models; it does not establish parity task-by-task, a universal scaling law, or job replacement. |
| P8-C11 | GDPval performance varies by occupation, task duration, and modality. | Paper-supported | `40:20-44:55` | [GDPval](https://arxiv.org/abs/2510.04374) | Aggregate win rates conceal this heterogeneity. |
| P8-C12 | Instruction following, reference use, and formatting are prominent output failure modes. | Paper/lecture-supported | `44:55-48:40` | [GDPval](https://arxiv.org/abs/2510.04374) | Relative prevalence varies by model; labels are not independent. |
| P8-C13 | GDPval supplies substantial task context, so its results do not directly measure a system's ability to discover and execute work autonomously. | Lecture interpretation + paper caveat | `48:40-51:34` | [GDPval](https://arxiv.org/abs/2510.04374) | Important deployment-boundary statement. |
| P8-C14 | DeepScholar-Bench evaluates synthesis, retrieval, and verifiability separately. | Paper-supported | `51:34-55:20` | [DeepScholar-Bench](https://arxiv.org/abs/2508.20033) | No single score explains which dimension failed. |
| P8-C15 | The lecture-time slide says no evaluated system exceeded 19% across all metrics. | Lecture-version result | `55:20-57:10` | [DeepScholar-Bench](https://arxiv.org/abs/2508.20033) | Current arXiv v2 abstract says no system surpasses 31% geometric mean. Likely version/metric drift; do not merge the numbers. |
| P8-C16 | Systems may produce coherent prose while missing key facts, important papers, or citation support. | Paper-supported | `55:20-61:03` | [DeepScholar-Bench](https://arxiv.org/abs/2508.20033) | Benchmark-specific evidence, but the dimensions are useful for audits. |
| P8-C17 | Even with oracle sources, evidence extraction remains incomplete in the benchmark. | Paper/lecture-supported | `58:10-61:03` | [DeepScholar-Bench](https://arxiv.org/abs/2508.20033) | Separates retrieval failure from reading/synthesis failure; exact score depends on version. |
| P8-C18 | Task horizon, economic value, and evidence quality are distinct evaluation axes. | Teaching synthesis | `61:03-68:20` | All three readings | A course-level framework, not a theorem asserted by one paper. |

## Caveats and Non-Claims

- Human completion time is a noisy proxy for task difficulty and depends on worker expertise, tooling, instructions, and familiarity.
- A fitted 50% horizon does not mean an agent can reliably perform every task shorter than that horizon.
- Historical exponential fits should not be extrapolated mechanically. The current METR paper explicitly discusses task-suite and external-validity limitations.
- GDPval tests supplied, predominantly digital tasks with rich context. It does not by itself show autonomous occupation-level performance or labor displacement.
- Pairwise expert preference is valuable but can reflect style and presentation as well as factual utility.
- DeepScholar-Bench's lecture-time `19%` and current arXiv v2 `31%` figures belong to different paper versions and possibly different aggregate definitions. Both are recorded; neither is silently substituted for the other.
- High-quality prose is not evidence of comprehensive retrieval or claim-level support.
- Teaching synthesis: an evaluation portfolio is recommended because each benchmark leaves a different blind spot. That recommendation is an interpretation across the readings.

## Visual Cue Log

| Time | Observed visual | Teaching use or caution |
|---|---|---|
| `02:45` | Slide lists benchmark saturation and the need for capability and economic-impact assessment. | Opening motivation; present as lecture framing. |
| `04:00` | Slide contrasts task length/complexity with real-world economic work and names METR and GDPval. | Clean two-axis setup. |
| `05:42` | Task-suite slide lists SWAA, HCAST, RE-Bench, ranges, and 170 total tasks. | Useful scale visual; current paper controls exact counts. |
| `06:45` | Diagram connects human runs, agent success, fitted horizon, model dates, and doubling time. | Best method overview; redraw. |
| `12:37` | Success rate versus human completion time scatter with fitted relation. | Explain variance around the trend, not only the line. |
| `14:00` | Historical 50% horizon chart labels seven-month doubling. | Include uncertainty and period labels. |
| `20:30` | 80% horizon chart shows much shorter durations and a 213-day fit. | Use to teach reliability thresholds. |
| `22:55` | Failure table compares planning, reasoning, abandonment, repeated actions, and other. | Use categories, not raw counts without paper context. |
| `27:53` | Agenda transition highlights GDPval. | Section divider. |
| `29:00` | Nine-sector occupation grid. | Illustrates breadth while showing the benchmark's digital-work framing. |
| `33:40` | GDPval construction slide: nine sectors, 44 occupations, 1,320 tasks, 220 open gold. | Record as lecture/paper-version figures. |
| `35:40` | Pairwise expert-preference bars show a roughly linear frontier trend. | Avoid converting the snapshot into a scaling law. |
| `38:50` | Failure chart emphasizes instruction following, formatting, and accuracy by model. | Good heterogeneity visual; avoid implying mutually exclusive labels. |
| `51:35` | Agenda transition highlights DeepScholar-Bench. | Section divider. |
| `53:35` | Three-dimensional evaluation slide: synthesis, retrieval, verifiability. | Core conceptual visual. |
| `55:20` | Results slide states no system exceeds 19% and lists dimension-specific leaders. | Must be labeled "lecture-time result"; the current arXiv revision reports a different aggregate. |
| `61:03` | Implications slide says reachable duration does not imply good synthesis quality. | Strong synthesis cue; label as lecture interpretation. |
| `66:34` | Takeaways repeat seven-month trend, GDPval parity, and sub-19% research score. | Summary only; retain all caveats and version notes. |

## Glossary

- **Time horizon:** human-estimated task duration associated with a chosen model success probability.
- **50% horizon:** fitted duration where model success is estimated at 50%.
- **80% horizon:** stricter fitted duration where model success is estimated at 80%.
- **HCAST:** diverse agentic software/research tasks ranging from minutes to hours in this evaluation.
- **SWAA:** short, atomic actions derived from software-engineering work.
- **RE-Bench:** longer AI research-engineering tasks used in the combined suite.
- **External validity:** whether benchmark results generalize to the target real-world setting.
- **GDPval:** benchmark of professional, economically valuable deliverables across selected occupations.
- **Pairwise evaluation:** expert chooses between two anonymized deliverables rather than assigning an absolute score.
- **Open gold subset:** publicly released GDPval subset with expert reference outputs.
- **Nugget coverage:** coverage of key facts or information units expected in a synthesis.
- **Citation precision:** proportion of citations that actually support the associated claims.
- **Claim coverage:** extent to which substantive claims receive supporting citations.
- **Oracle sources:** experiment where the system is supplied the target references, isolating reading/synthesis from retrieval.

## Teaching Questions

1. Why is the longest task an agent happened to finish a poor measure of its horizon?
2. What assumptions make skilled-human completion time a useful difficulty proxy?
3. How would contractor context differ from a repository maintainer's context?
4. Why does an 80% horizon answer a different deployment question from a 50% horizon?
5. Which observed failure modes are likely to compound over long trajectories?
6. Why does GDPval measure something METR's task horizon does not?
7. What can pairwise expert preference capture, and what can it obscure?
8. Why does rich prompt context limit claims about workplace autonomy?
9. Can a research report be coherent but score poorly on retrieval quality? Give a concrete example.
10. How does an oracle-source experiment distinguish retrieval from synthesis failure?
11. Design an evaluation dashboard for a university research agent using all three benchmark dimensions.
12. Which result in this report is most vulnerable to version drift, and how should a slide disclose it?

## Teaching Synthesis

Interpretation: Part 8 is a warning against compressing agent capability into one leaderboard number. METR asks how task success decays with human task duration; GDPval asks whether supplied deliverables satisfy professional judges; DeepScholar-Bench asks whether a research product retrieves the right sources and supports its claims. A deployment decision needs all three kinds of evidence plus interaction, cost, safety, and long-tail failure tests that these benchmarks do not fully supply.
