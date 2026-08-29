# Deck Analysis, Evidence Ledger, and Production Checklist

## Configuration

- Topic: Stanford CS329A Part 5, Planning and Multi-Step Reasoning
- Style: `intuition-machine`, following Part 2 structure without copying diagrams
- Audience: Q and technically curious learners
- Language: English
- Slide count: 12
- Aspect ratio: 16:9 at 1600x900
- Production: original local SVG diagrams rendered to PNG
- Cover: documented slide-1 fallback plus a dedicated cover prompt

## Message Hierarchy

**Core message:** Diagnose whether an agent needs search, parallel scheduling, or a better learned step policy.

**Supporting ideas:**

1. Planning is a trajectory under feedback, not a static checklist.
2. LATS searches alternatives but depends on heuristic values, budget, and action reversibility.
3. SPRINT exposes dependency-safe concurrency but does not eliminate total work.
4. SWiRL learns intermediate decisions but depends on process judges and representative offline feedback.
5. Evaluator quality and operational constraints bound all three methods.

**Learner action:** Identify the bottleneck, the evidence signal, and the safety boundary before choosing a planning method.

## Audience Decision

| Question | Decision |
|---|---|
| Primary audience | Learners with basic agent and LLM familiarity |
| Likely prior belief | “Planning” is one generic feature or a longer chain of thought |
| Desired shift | Separate search, dependency scheduling, and policy learning |
| Main barriers | MCTS jargon, parallelism metric confusion, overtrust in model judges |
| Convincing evidence | Original causal diagrams, exact timestamps, paper links, visible caveats |

## Claims Ledger

| Slide | Claim | Evidence | Type | Confidence |
|---|---|---|---|---|
| 1 | Planning is repeated trajectory choice under observations and consequences | Lecture 00:37-03:39; LATS, arXiv:2310.04406 | sourced synthesis | high |
| 2 | LATS, SPRINT, and SWiRL intervene at different bottlenecks | Lecture 00:05-00:37, 23:29-25:57, 50:29-54:34 | teaching synthesis | high as framework |
| 3 | LATS combines six MCTS-style operations, environment feedback, and reflection | Lecture 07:11-16:07; arXiv:2310.04406 | sourced | high |
| 4 | LATS value inputs are heuristic estimates, not correctness guarantees | Lecture 10:00-16:07; arXiv:2310.04406 | sourced interpretation | high |
| 5 | Search usefulness is bounded by compute, evaluation, safety, and reversibility | Lecture 17:14-23:29; arXiv:2310.04406 | sourced | high |
| 6 | A sequential trace can encode independent work as a dependency DAG | Lecture 23:29-29:20; arXiv:2506.05745 | sourced | high |
| 7 | SPRINT constructs staged examples through trace decomposition and dependency labeling | Lecture 27:13-31:03; arXiv:2506.05745 | sourced | high |
| 8 | SPRINT needs an external runtime to execute and synchronize tagged branches | Lecture 31:03-36:30 | sourced | high |
| 9 | Sequential critical path is not total work or guaranteed wall-clock speed | Lecture 33:00-49:46; arXiv:2506.05745 | sourced | high |
| 10 | SWiRL uses offline synthetic tool trajectories and step-wise RL | Lecture 50:29-63:21; arXiv:2504.04736 | sourced | high |
| 11 | Process and outcome signals have distinct false-positive modes | Lecture 54:34-63:21, 66:16-73:47; arXiv:2504.04736 | sourced synthesis | high |
| 12 | Search, parallelism, and policy learning form a bottleneck diagnostic | whole-lecture synthesis | teaching synthesis | high as framework |

## Claim Calibrations

- LATS uses an LM judge and self-consistency as value signals. Neither is a correctness oracle.
- UCT is the search-selection rule; it does not make a weak value estimate accurate.
- Search assumes candidate actions can be explored without unacceptable side effects.
- SPRINT reduces a sequential-token critical path in reported setups. It does not prove lower total tokens, cost, energy, or latency in every runtime.
- The SPRINT paper's “up to” results are model-, task-, and benchmark-specific.
- SWiRL's process labels are model-judged and can inherit evaluator bias.
- Reusing stored observations stabilizes training but can create stale or off-policy feedback.
- ADaPT and Wider or Deeper / AB-MCTS are official readings, not substantively taught in this recording or deck.

## Visual Opportunity Map

| Concept | Original visual treatment |
|---|---|
| Agent planning | closed state-action-observation loop with consequence trail |
| Three levers | same trajectory split across search, dependency, and policy layers |
| LATS | six-stage tree-search loop with reflection memory |
| Heuristic value | UCT router fed by two warning-tagged gauges |
| Reversibility | sandbox branch versus irreversible external action gate |
| SPRINT DAG | linear trace unfolded into dependency-safe branches |
| Synthetic staging | five-step compiler pipeline |
| Orchestrator | planner tags, concurrent executors, synchronization barrier |
| Critical path | total-work blocks contrasted with highlighted critical chain |
| SWiRL | offline collection and step-wise RL loop |
| Process vs outcome | 2x2 evidence matrix with two false-positive examples |
| Diagnostic | bottleneck router with verifier and reversibility gates |

## Complete Production Checklist

### Source and design

- [x] `source-cs329a-part-05-planning-multistep-reasoning.md`
- [x] `analysis.md` with claim ledger and calibrations
- [x] `outline.md` with exactly 12 slides
- [x] `teaching-guide.md`
- [x] `render-slides.ts`

### Reproducible slide artifacts

- [x] exactly 12 sequential `prompts/NN-slide-*.md`
- [x] every prompt contains the exact lecture interval and paper basis where applicable
- [x] speaker notes explicitly repeat the evidence boundary for Slides 4, 5, 9, 10, and 11
- [x] exactly 12 sequential `svgs/NN-slide-*.svg`
- [x] exactly 12 sequential `NN-slide-*.png`, each 1600x900 and nonblank
- [x] `contact-sheet.svg` and `contact-sheet.png`, all 12 slides in order
- [x] contact sheet and selected full-resolution slides visually inspected for fit and overlap

### Export artifacts

- [x] deck PPTX contains 12 slides and 12 prompt-based notes
- [x] deck PDF contains 12 pages
- [x] PDF pages are 16:9 and visually match PNGs
- [x] `assets/decks/...` PPTX, PDF, and contact sheet checksums match source artifacts

### Wiki and cover

- [x] wiki front matter parses and uses canonical `Learning Resources`
- [x] wiki image path and three deck links resolve to created artifacts
- [x] wiki separates taught papers, assigned-only papers, and teaching synthesis
- [x] wiki includes homework, questions, ASCII diagrams, deck links, and source-versus-synthesis
- [x] cover source note and prompt exist
- [x] cover uses the documented slide-1 fallback and is visually inspected
- [x] cover checksum matches `assets/images/cs329a-part-05-planning-multistep-reasoning.png`

### Scope and review

- [x] no Stanford logo, copied frame, or copied lecture diagram
- [x] Slide 12 does not introduce ADaPT or AB-MCTS as taught content
- [x] no files outside the five approved Part 5 path groups
- [x] bounded independent Codex deck review returns PASS
- [x] bounded independent Codex wiki review returns PASS
