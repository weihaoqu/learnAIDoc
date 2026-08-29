# CS329A Part 7 Evidence Report: Self-Improvement and Deep Research Agents

## Source Record

- Official video: [Stanford CS329A Self-Improving AI Agents | Part 7 | Self-Improvement and Deep Research Agents](https://www.youtube.com/watch?v=Uni9dqyuuDM)
- Video ID: `Uni9dqyuuDM`
- Duration: `1:12:26`
- Course: [Stanford CS329A: Self-Improving AI Agents, Autumn 2025](https://cs329a.stanford.edu/)
- Method: full native-caption transcript read from beginning to end, followed by targeted visual inspection at 14 conceptual cues.
- Transcript completeness: captions span the full recording. A few student comments are indistinct; the instructor's substantive presentation is clear.
- Schedule mapping: the official schedule separates open-ended self-improvement from search/deep-research agents. This recording concentrates on AlphaCode, AlphaCode 2, and Search-o1. It mentions Search-R1 near the end but does not teach it in depth.

Evidence hierarchy used below: primary papers and technical reports govern empirical claims; the lecture governs interpretation and pedagogy; inspected frames govern visual descriptions. Claims labeled "teaching synthesis" are interpretations, not paper findings.

## Primary Readings

1. Yujia Li, David Choi, Junyoung Chung, Nate Kushman, Julian Schrittwieser, et al., [Competition-Level Code Generation with AlphaCode](https://arxiv.org/abs/2203.07814), Science 2022. The official schedule assigns this paper.
2. AlphaCode Team, Google DeepMind, [AlphaCode 2 Technical Report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf), 2023. The official schedule assigns this report.
3. Xiaoxi Li, Guanting Dong, Jiajie Jin, Yuyao Zhang, Yujia Zhou, et al., [Search-o1: Agentic Search-Enhanced Large Reasoning Models](https://arxiv.org/abs/2501.05366), 2025. The official schedule assigns this paper.

## Timestamped Conceptual Outline

| Time | Conceptual development |
|---|---|
| `00:00-01:11` | The lecture frames code generation and deep research as search problems: a model may be capable of producing a useful candidate, but the system must generate, test, and select it. |
| `01:11-04:30` | Competitive programming is introduced as substantially harder than short code completion because solutions must interpret long statements, select algorithms, and pass hidden tests. |
| `04:30-09:40` | AlphaCode pipeline: pretraining and contest-specific fine-tuning feed large-scale sampling; execution filtering and behavioral clustering reduce the candidate set. |
| `09:40-16:35` | Evaluation distinguishes generating any correct sample (`pass@k`) from selecting a small submission set (`10@k`). Diversity and selection both matter. |
| `16:35-24:38` | Scaling model size, sample count, and clustering improves results, but the lecture surfaces diminishing diversity, costly sampling, weak loss-based selection, and limited multi-step repair. |
| `24:38-30:20` | AlphaCode 2 replaces a single policy with a family of fine-tuned Gemini Pro policies, then executes, filters, clusters, scores, and reranks candidates. |
| `30:20-39:25` | The AlphaCode 2 comparison emphasizes stronger performance at lower sample budgets, while retaining high inference cost and a heavily code-specific verification loop. |
| `39:25-46:33` | Class discussion generalizes the pipeline: allocate compute by difficulty, expose reasoning traces, decompose tasks, use tree search or backtracking, and retain human help for unfamiliar patterns. |
| `46:33-50:40` | Search-o1 begins from a different failure: a reasoning model encounters missing knowledge, guesses, and compounds the mistake over a long chain. |
| `50:40-55:50` | Single-shot retrieval is contrasted with agentic retrieval. The latter lets the model decide when and what to search during reasoning. |
| `55:50-61:20` | Reason-in-Documents asks the model to extract and reason over relevant evidence before inserting it into the ongoing chain, limiting raw-document overload. |
| `61:20-68:15` | Results are discussed across difficult science and multi-hop QA benchmarks. The mechanism helps in the paper's tested setting, but retrieval quality and context management remain bottlenecks. |
| `68:15-68:58` | Search-R1 is identified as a reinforcement-learning direction, but the lecturer explicitly does not cover its method. |
| `68:58-72:26` | Closing Q&A focuses on confidence and calibration: a model's token probability is not a trustworthy certificate that its reasoning or retrieved answer is correct. |

## 12-Slide Teaching Narrative

| Slide | Title | Teaching job | Evidence anchor | Visual concept |
|---:|---|---|---|---|
| 1 | Search Is More Than Sampling | Establish the lecture's central problem: useful inference requires generation plus selection. | `00:00-01:11` | Funnel from model distribution to tested answer. |
| 2 | Why Contest Code Is Hard | Contrast full problem solving with autocomplete and short function benchmarks. | `01:11-04:30`; AlphaCode paper | Long problem statement leading to algorithm, code, tests. |
| 3 | The AlphaCode Pipeline | Explain training, million-scale sampling, filtering, clustering, and submission. | `04:30-09:40`; AlphaCode paper | Recreate the pipeline, not the original figure. |
| 4 | Generation vs Selection | Teach `pass@k` and `10@k` as different questions. | `09:40-16:35` | Two-axis grid: coverage and selection precision. |
| 5 | Where Brute-Force Search Breaks | Show cost, duplicated candidates, poor ranking proxies, and lack of repair. | `16:35-24:38` | Saturating diversity curve beside rising compute. |
| 6 | AlphaCode 2: Better Policies, Better Ranking | Show how policy diversity and a learned scorer improve the pipeline. | `24:38-30:20`; AlphaCode 2 report | Several policy streams merging into filter/cluster/ranker. |
| 7 | Results Need a Denominator | Calibrate headline percentiles against sample budget, contests, and system design. | `30:20-39:25`; AlphaCode 2 report | Evidence card with metric, population, and cost. |
| 8 | From Flat Sampling to Adaptive Search | Generalize toward decomposition, backtracking, traces, and difficulty-aware budgets. | `39:25-46:33` | Search tree with verifier and budget controller. |
| 9 | The Knowledge-Gap Failure | Demonstrate how an unfamiliar fact can derail otherwise coherent reasoning. | `46:33-50:40` | Reasoning chain interrupted by an uncertainty marker. |
| 10 | Agentic Retrieval | Contrast one retrieval call with search triggered inside reasoning. | `50:40-55:50`; Search-o1 paper | Static RAG pipeline versus recurrent search loop. |
| 11 | Reason in Documents | Explain evidence extraction before reinsertion into the main context. | `55:50-61:20`; Search-o1 paper | Documents -> focused evidence -> reasoning state. |
| 12 | A Teaching Abstraction: One Search Loop | Synthesize, without claiming empirical equivalence: diversify, execute or retrieve, verify, select, and repeat under a budget. | `61:20-72:26` | Unified loop with explicit uncertainty and human stop. |

## Claim-Evidence Ledger

| ID | Claim | Evidence type | Lecture time | Primary source | Calibration |
|---|---|---|---|---|---|
| P7-C01 | Competitive programming tests long-form problem interpretation, algorithm choice, implementation, and hidden-test correctness rather than autocomplete alone. | Lecture + paper | `01:11-04:30` | [AlphaCode](https://arxiv.org/abs/2203.07814) | This is a task-characterization claim, not proof that contests capture all software engineering. |
| P7-C02 | AlphaCode combines large-scale sampling with execution filtering and behavioral clustering. | Paper-supported | `04:30-09:40` | [AlphaCode](https://arxiv.org/abs/2203.07814) | Pipeline details are specific to the evaluated contest setting. |
| P7-C03 | The original system sampled up to roughly one million candidates per problem. | Paper-supported | `06:40-08:10` | [AlphaCode](https://arxiv.org/abs/2203.07814) | A scale figure, not a recommended default inference budget. |
| P7-C04 | `pass@k` measures whether a correct candidate appears; `10@k` additionally tests whether the system can choose a small submission set. | Lecture interpretation of evaluation | `09:40-16:35` | [AlphaCode](https://arxiv.org/abs/2203.07814) | Exact metric definitions should be read from the paper when reproducing results. |
| P7-C05 | AlphaCode reached an estimated average rank in the top 54.3% of participating competitors in the paper's selected contests. | Paper-supported | `19:00-21:10` | [AlphaCode](https://arxiv.org/abs/2203.07814) | Historical, contest-specific result; it does not imply general professional coding competence. |
| P7-C06 | Scaling samples helps only if candidates retain useful diversity and the selector can identify them. | Teaching synthesis | `16:35-24:38` | [AlphaCode](https://arxiv.org/abs/2203.07814) | Inference from the pipeline and ablations, not a universal theorem. |
| P7-C07 | AlphaCode 2 uses a family of fine-tuned policies, execution filtering, clustering, and a scoring model. | Report-supported | `24:38-30:20` | [AlphaCode 2 report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf) | The report is a technical report, not a peer-reviewed archival paper. |
| P7-C08 | The AlphaCode 2 report gives 43% solved versus 25% for AlphaCode and estimates performance around the 85th percentile. | Report-supported | `30:20-38:20` | [AlphaCode 2 report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf) | The lecture visual appears to mark about 87%; this report uses the primary report's 85th-percentile wording. |
| P7-C09 | AlphaCode 2 remains expensive and discards most generated candidates. | Lecture + report | `35:10-39:25` | [AlphaCode 2 report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf) | Cost comparisons depend on implementation and hardware not fully disclosed in the lecture. |
| P7-C10 | Search-o1 lets a reasoning model initiate searches during an unfolding reasoning trace. | Paper-supported | `50:40-55:50` | [Search-o1](https://arxiv.org/abs/2501.05366) | "Agentic" here describes controlled search actions, not unrestricted autonomy. |
| P7-C11 | Reason-in-Documents extracts relevant evidence from retrieved documents before returning it to the main reasoning context. | Paper-supported | `55:50-61:20` | [Search-o1](https://arxiv.org/abs/2501.05366) | It can reduce noise but cannot guarantee source correctness or complete retrieval. |
| P7-C12 | Search-o1 improves results over the compared baselines on the paper's tested reasoning and multi-hop QA benchmarks. | Paper-supported | `61:20-68:15` | [Search-o1](https://arxiv.org/abs/2501.05366) | Benchmark-relative claim only; it is not evidence of universal research reliability. |
| P7-C13 | Search-R1 is mentioned but not substantively taught in this recording. | Direct observation | `68:15-68:58` | Video only | It should not become a core slide claim without separate research. |
| P7-C14 | Model confidence or token probability is not, by itself, a calibrated guarantee of correctness. | Lecture Q&A + interpretation | `68:58-72:26` | Video only | Broadly plausible, but the lecture does not present a calibration experiment here. |

## Caveats and Non-Claims

- AlphaCode and AlphaCode 2 exploit unusually strong executable feedback. Their pipelines do not transfer unchanged to open-ended writing, policy, or research synthesis.
- Large candidate counts improve coverage but may be economically or environmentally impractical. The lecture does not provide a normalized cost comparison.
- The AlphaCode 2 percentile shown on a lecture slide is visually closer to 87%, while the technical report states 85th percentile. The primary report controls this document.
- Search-o1 can retrieve irrelevant or incomplete evidence. Reason-in-Documents is context management, not a truth oracle.
- Benchmark gains do not establish robust deployment behavior under changing tools, adversarial sources, or long-running tasks.
- Search-R1 is outside the taught scope despite being named.
- Teaching synthesis: the shared loop is "diversify -> obtain external feedback -> select/refine." This is a useful abstraction across the examples, not a formal equivalence between code execution and web evidence.

## Visual Cue Log

| Time | Observed visual | Teaching use or caution |
|---|---|---|
| `01:15` | A full competitive-programming statement ("Backspace") fills the slide. | Use to establish task length and hidden structure; do not reproduce copyrighted problem text. |
| `04:00` | AlphaCode overview runs from data and learning through large-scale sampling, filtering, clustering, and evaluation. | Best pipeline reference. Redraw as an original schematic. |
| `07:00` | Slide states one million diverse samples, high temperature, Python/C++, and randomized metadata. | Useful scale cue; label as the paper system, not current best practice. |
| `15:40` | `10@k` validation/test table compares model sizes and clustering variants. | Supports selection discussion; exact cells should come from the paper if quoted. |
| `24:45` | Section transition to AlphaCode 2. | Clean narrative divider. |
| `29:00` | AlphaCode 2 diagram shows multiple models, execution/filtering, clustering, reranking, and scoring. | Strong systems visual; redraw rather than screenshot. |
| `30:20` | Solve-rate curve compares sampling budgets and claims far better sample efficiency. | Use qualitatively unless values are copied from the report. |
| `38:00` | Estimated percentile comparison for AlphaCode 2, AlphaCode, and humans. | Caution: slide marker and report wording differ slightly; cite the report. |
| `46:35` | Section transition to Search-o1. | Narrative divider from executable to knowledge feedback. |
| `50:40` | Vanilla reasoning chain guesses an unfamiliar chemistry fact and reaches a wrong answer. | Useful failure-case visual; paraphrase the example. |
| `55:00` | Agentic RAG loop includes search-trigger tokens and iterative evidence injection. | Best visual for recurrent retrieval. |
| `59:25` | Camera view; projected material is not legible. | Do not use as evidence. |
| `61:20` | GPQA extended result table for Search-o1. | Treat values as paper-specific and avoid human-expert generalizations. |
| `67:25` | Camera view; no additional legible evidence. | Do not use as evidence. |

## Glossary

- **Candidate sampling:** drawing multiple possible solutions from a model rather than using one deterministic output.
- **Behavioral clustering:** grouping programs by observed execution behavior to reduce redundant submissions.
- **Executable feedback:** a machine-checkable signal produced by running code or tests.
- **`pass@k`:** probability-style evaluation of whether at least one of `k` generated samples passes, under the paper's estimator.
- **`10@k`:** AlphaCode selection setting that asks a system to choose ten submissions from a larger candidate pool.
- **Policy family:** multiple generators or fine-tuned variants used to increase candidate diversity.
- **Scoring model:** model trained or configured to rank candidate solutions.
- **Static RAG:** retrieval performed once before or around generation.
- **Agentic retrieval:** retrieval actions initiated during an evolving reasoning process.
- **Knowledge gap:** information the model needs but does not reliably contain or recall.
- **Reason-in-Documents:** Search-o1 stage that reasons over retrieved sources and extracts focused evidence.
- **Calibration:** correspondence between expressed confidence and empirical correctness.

## Teaching Questions

1. Why is producing one correct program different from selecting ten programs that a contestant may submit?
2. What does behavioral clustering contribute that syntax-level deduplication does not?
3. Under what conditions should an adaptive system spend more samples on a problem?
4. Why can training loss or model likelihood be a weak proxy for program correctness?
5. Which parts of AlphaCode's loop depend on code being executable?
6. How does AlphaCode 2 use specialization to increase diversity?
7. What evidence would you need before claiming AlphaCode 2 is cheaper, rather than merely more sample-efficient?
8. Why can one-shot RAG fail during a long reasoning chain?
9. How does Reason-in-Documents trade context breadth for focus?
10. Design a stopping rule for repeated search that balances answer quality, latency, and source redundancy.
11. What new failure appears if the retrieval system repeatedly returns mutually reinforcing but wrong sources?
12. Which parts of the unified loop are observations from the papers, and which are our teaching abstraction?

## Teaching Synthesis

Interpretation: Part 7 is best taught as a progression from brute-force coverage to feedback-guided search. AlphaCode shows that sampling can expose latent capability; AlphaCode 2 shows that generator diversity and ranking make that search more efficient; Search-o1 shows that the same broad control problem appears when the missing object is evidence rather than code. The transferable lesson is not "sample more," but "design the candidate space, feedback channel, selector, and stopping budget together."
