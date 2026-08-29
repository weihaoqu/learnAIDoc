# Stanford CS329A Part 7: Self-Improvement and Deep Research Agents

Primary source: [official Part 7 video](https://www.youtube.com/watch?v=Uni9dqyuuDM)

- Course: [Stanford CS329A, Self-Improving AI Agents, Autumn 2025](https://cs329a.stanford.edu/)
- Video duration: `1:12:26`
- Evidence collected: complete native-caption transcript and 14 inspected visual cues
- Frozen evidence report: `slide-deck/cs329a-series/research/part-07-self-improvement-deep-research.md`
- Accessed: 2026-08-29
- Scope: AlphaCode, AlphaCode 2, Search-o1, and the shared problem of feedback-guided search
- Production rule: primary papers control empirical claims; lecture timestamps control teaching sequence; cross-paper connections are labeled synthesis

## Core Thesis

Search helps only when the system can produce useful diversity, obtain relevant feedback, and select under a finite budget.

```text
candidate generator
       |
       v
diverse possibilities -- budget --> execute or retrieve evidence
       |                                  |
       +------------ verify / rank <------+
                         |
                         v
                 return or refine
```

Code execution and document retrieval are not empirically equivalent. The diagram is a teaching abstraction that exposes their common systems questions.

## Lecture Map

### 1. Competitive Programming as Search (00:00-04:30)

The lecture begins with competitive programming, where a system must interpret a long problem, choose an algorithm, write code, and pass hidden tests. This is a stronger search-and-selection setting than short autocomplete tasks.

### 2. AlphaCode: Coverage Before Selection (04:30-24:38)

AlphaCode combines contest-specific training with large-scale candidate sampling. It executes public tests, filters invalid programs, clusters candidates by behavior, and submits a small set. The distinction between `pass@k` and `10@k` matters: generating a correct candidate is not the same as selecting a small useful submission set.

The paper reports an average top-54.3% rank in simulated Codeforces competitions with more than 5,000 participants. This is a historical contest result, not evidence of general professional software-engineering competence.

### 3. AlphaCode 2: Better Diversity and Ranking (24:38-39:25)

AlphaCode 2 uses a family of Gemini Pro-based policy models, massive sampling, execution filtering, behavioral clustering, and a learned scoring model. The technical report states 43% solved versus 25% for AlphaCode and estimates average performance at the 85th percentile.

These results remain contest-, budget-, and pipeline-specific. Up to one million candidates per problem still makes the system expensive, and most samples are discarded.

### 4. Beyond Flat Sampling (39:25-46:33)

The class discussion asks how to spend compute adaptively. Possible extensions include difficulty-aware budgets, reasoning traces, decomposition, tree search, backtracking, and human intervention for unfamiliar patterns. These are discussion directions rather than evaluated AlphaCode 2 components.

### 5. Search-o1: Retrieve During Reasoning (46:33-68:15)

Search-o1 starts from a knowledge-gap failure: a reasoning model guesses an unfamiliar fact and compounds the error. Static one-shot retrieval may not know every future information need. Agentic retrieval lets the model trigger search during the reasoning trace.

Reason-in-Documents asks the model to extract focused evidence from retrieved documents before reinserting it into the main context. The paper reports benchmark improvements against its compared baselines. This is not a guarantee of comprehensive retrieval, source correctness, or reliable open-web research.

### 6. Calibration and Stopping (68:15-72:26)

Search-R1 is mentioned but not taught in detail. The closing Q&A returns to uncertainty: token probability or verbal confidence is not a correctness certificate. A search system needs a stopping rule as well as a retrieval mechanism.

## Durable Mental Model

Audit any search-enhanced agent with five questions:

1. What creates non-redundant candidate diversity?
2. What feedback channel rejects or enriches candidates?
3. How does the system rank or select under a budget?
4. What happens when the verifier or retriever is wrong?
5. What stopping rule bounds cost and latency?

## Key Terms

- **Behavioral clustering:** grouping programs by observed execution behavior.
- **Executable feedback:** feedback obtained by running code or tests.
- **`pass@k`:** whether at least one of `k` generated candidates succeeds under the paper's estimator.
- **`10@k`:** AlphaCode selection setting that chooses ten submissions from a larger pool.
- **Policy family:** several generator variants used to increase diversity.
- **Agentic retrieval:** search actions triggered during an evolving reasoning process.
- **Reason-in-Documents:** Search-o1 stage that extracts focused evidence from retrieved sources.
- **Calibration:** correspondence between stated confidence and empirical correctness.

## Primary References

1. Stanford, [CS329A course schedule](https://cs329a.stanford.edu/), Autumn 2025, accessed 2026-08-29.
2. Stanford Online, [Part 7 official video](https://www.youtube.com/watch?v=Uni9dqyuuDM), accessed 2026-08-29.
3. Yujia Li et al., [Competition-Level Code Generation with AlphaCode](https://arxiv.org/abs/2203.07814v1), arXiv v1, 2022.
4. AlphaCode Team, Google DeepMind, [AlphaCode 2 Technical Report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf), 2023-12-06.
5. Xiaoxi Li et al., [Search-o1: Agentic Search-Enhanced Large Reasoning Models](https://arxiv.org/abs/2501.05366), 2025, version inspected 2026-08-29.
