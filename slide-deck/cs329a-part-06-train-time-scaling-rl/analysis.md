# Deck Analysis, Evidence Ledger, and Production Checklist

## Configuration

- Topic: Stanford CS329A Part 6, Train-Time Scaling and Scaling RL
- Style: `intuition-machine`, following Part 2 structure with original diagrams
- Audience: Q and technically curious learners
- Language: English
- Slide count: 12
- Aspect ratio: 16:9 at 1600x900
- Production: original local SVG diagrams rendered to PNG
- Cover: documented slide-1 fallback plus a dedicated cover prompt

## Message Hierarchy

**Core message:** Self-improvement scales only when generated behavior, verifier signal, and optimization remain aligned.

**Supporting ideas:**

1. Train-time scaling changes weights; test-time scaling does not.
2. Verifiability is the bottleneck connecting outputs to learning signals.
3. STaR bootstraps rationales but can retain invalid post-hoc explanations.
4. GRPO reduces critic memory but needs within-group reward variation.
5. DAPO stabilizes scaled RL through interacting controls, not one universal trick.

**Learner action:** Choose a self-improvement method by data, verifier, base-model support, infrastructure, and observed training failure mode.

## Audience Decision

| Question | Decision |
|---|---|
| Primary audience | Learners who know basic LLM training concepts |
| Likely prior belief | More RL or more reasoning automatically creates new capability |
| Desired shift | Separate consistency, support, verification, and optimization signal |
| Main barriers | STaR rationalization, GRPO advantages, metric confusion, DAPO interactions |
| Convincing evidence | Explicit loops, group-reward diagrams, source correction, scoped ablations |

## Claims Ledger

| Slide | Claim | Evidence | Type | Confidence |
|---|---|---|---|---|
| 1 | Train-time scaling samples, verifies, updates weights, and repeats | Lecture 00:00-05:43; all three primary papers | sourced synthesis | high |
| 2 | Pretraining, SFT, test-time search, and train-time self-improvement spend compute differently | Lecture 03:07-07:40, 11:31-16:08 | teaching synthesis | high |
| 3 | Verifiable outcomes provide scalable feedback but do not validate rationales | Lecture 05:43-11:31; arXiv:2203.14465 | sourced | high |
| 4 | STaR bootstraps rationales through generation, filtering, rationalization, and iteration | Lecture 16:08-27:17; arXiv:2203.14465 | sourced | high |
| 5 | Answer-conditioned rationalization can create invalid post-hoc reasoning | Lecture 20:07-25:13, 30:49-33:54; arXiv:2203.14465 | sourced limitation | high |
| 6 | Self-training can amplify reachable behavior but does not guarantee new OOD strategies | Lecture 37:34-40:53, 63:12-67:58 | diagnostic synthesis | medium |
| 7 | DeepSeekMath combines code initialization, 120B math tokens, SFT, and GRPO | Lecture 40:53-46:25; arXiv:2402.03300 | sourced | high |
| 7 | DeepSeekMath reports 51.7% on MATH and 60.9% SC@64 on MATH | Primary paper; lecture slide near 01:15 is mislabeled | source correction | high |
| 8 | GRPO removes a separate critic and uses group-relative reward normalization | Lecture 43:49-47:46; arXiv:2402.03300 | sourced | high |
| 9 | Identical-reward groups provide no within-group relative discrimination | Lecture 47:46-52:17; arXiv:2402.03300 and 2503.14476 | sourced | high |
| 10 | Majority@k and pass@k distinguish consistency from support | Lecture 52:17-53:05, 63:12-65:11 | diagnostic synthesis | medium, not theorem |
| 11 | DAPO combines four stabilizers and reports 30 -> 50 AIME24 avg@32 cumulatively in one setup | Lecture 53:05-61:49; arXiv:2503.14476 | sourced | high within setup |
| 12 | Method choice depends on feedback signal, infrastructure, base-model support, and instability | Lecture 61:49-72:34; all three papers | teaching synthesis | high as framework |

## Claim Calibrations

- The lecture's `51.7% AIME` label is wrong; the primary DeepSeekMath paper says 51.7% on MATH.
- A mechanically checkable final answer does not validate the rationale or safety of the process.
- STaR's answer filter can retain invalid rationales and discard informative failures.
- The capability-ceiling framing is a diagnostic interpretation, not a proved universal theorem.
- DeepSeekMath gains combine data curation, code initialization, continued pretraining, SFT, and RL.
- GRPO's memory advantage depends on implementation details even though the separate critic is removed.
- All-correct and all-wrong groups lack within-group relative signal; filtering them changes the training distribution.
- Majority@k gains do not automatically imply pass@k gains or new solution support.
- DAPO's controls interact; its 30 -> 50 result belongs to Qwen2.5-32B and the AIME24 average@32 protocol.
- Entropy is only a proxy for exploration; lecture threshold ranges are not universal.
- Commercial-model training-fraction speculation and the questioned train/test graph are excluded.

## Visual Opportunity Map

| Concept | Original visual treatment |
|---|---|
| Train-time scaling | closed generate-verify-update parameter loop |
| Four compute regimes | lifecycle with weights-open/weights-locked markers |
| Verifiability | outcome checker versus opaque rationale channel |
| STaR | iterative bootstrap loop with correct-answer filter |
| Rationalization | answer-hint path and unsupported post-hoc bridge |
| Capability ceiling | support distribution with frequency shift but no guaranteed new region |
| DeepSeekMath | four-layer training stack plus source-correction card |
| GRPO | PPO component stack versus group-relative baseline |
| Reward variation | all-wrong, mixed, all-correct group comparison |
| Majority vs pass | one candidate set routed through voting and any-success evaluation |
| DAPO | four stabilizers plus a setup-specific Qwen2.5-32B base-model result card |
| Method choice | signal/infrastructure/failure-mode decision matrix |

## Complete Production Checklist

### Source and design

- [x] source note with one canonical metric-correction policy
- [x] `analysis.md` with claim ledger and calibrations
- [x] `outline.md` with exactly 12 slides
- [x] `teaching-guide.md`
- [x] `render-slides.ts`

### Reproducible slide artifacts

- [x] exactly 12 sequential `prompts/NN-slide-*.md`
- [x] every prompt and note includes exact lecture interval and primary-paper basis
- [x] no prompt states `51.7% on AIME` as fact
- [x] exactly 12 sequential `svgs/NN-slide-*.svg`
- [x] exactly 12 sequential `NN-slide-*.png`, each 1600x900 and nonblank
- [x] contact sheet SVG/PNG embeds all 12 slides in order
- [x] contact sheet and selected full-resolution slides visually inspected

### Export artifacts

- [x] PPTX contains 12 slides and 12 prompt-based notes
- [x] PDF contains 12 pages at 1600x900
- [x] rendered PDF page 12 visually matches its source PNG; page count and dimensions validate the full export
- [x] published PPTX, PDF, and contact sheet checksums match source artifacts

### Wiki and cover

- [x] front matter parses with canonical `Learning Resources`
- [x] image and three deck URLs resolve to created files
- [x] wiki includes source correction, homework, questions, ASCII diagrams, and source-versus-synthesis
- [x] cover source note and prompt exist
- [x] documented slide-1 fallback is visually inspected
- [x] cover and published image checksums match

### Scope and review

- [x] no Stanford logo, copied frame, or copied lecture diagram
- [x] no files outside the five approved Part 6 path groups
- [x] bounded independent deck review returns PASS
- [x] bounded independent wiki review returns PASS
