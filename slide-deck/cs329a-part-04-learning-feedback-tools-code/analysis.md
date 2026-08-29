# Deck Analysis and Full Claim Ledger

## Configuration

- Topic: Stanford CS329A Part 4, Learning from Feedback with Tools/Code
- Style: Part 2-compatible `intuition-machine`
- Dimensions: paper + cool technical + geometric + balanced
- Audience: Q, instructors, and technically curious learners
- Language: English
- Slide count: 12
- Aspect ratio: 16:9, 1600x900
- Production: original local vector diagrams; no copied Stanford slide imagery or paper figures
- Factual base: complete lecture transcript, 28 inspected visual cues, official schedule, and three assigned primary papers

## Message Hierarchy

**Core message:** Feedback improves an agent only when the signal is informative, aligned, and governable.

**Supporting ideas:**

1. ReAct interleaves thought, action, and observation to ground a trajectory.
2. Tool observations add evidence but also add retrieval, interpretation, and trajectory failures.
3. RLEF uses executable tests to teach iterative code repair under a two-tier test design.
4. Constitutional AI scales normative critique and preference feedback without removing human value choices.
5. Every feedback loop needs an explicit contract covering source, coverage, corruption, incentives, and guardrails.

**Learner action:** Audit an agent by specifying what feedback it sees, what the signal omits, and how failure is contained.

## Audience Decision Matrix

| Question | Decision |
|---|---|
| What does the learner already know? | Basic agent vocabulary and Part 2's generation/verification distinction. |
| What misconception must change? | “A tool, test, or AI judge automatically makes an agent self-correcting.” |
| What should the learner be able to do? | Compare three feedback contracts and identify blind spots before deployment. |
| What evidence is persuasive? | Explicit loops, paper-grounded constraints, and counterexamples where feedback is incomplete. |
| What should remain out of scope? | Universal reliability claims, hidden-chain-of-thought claims, and unrestricted device-agent safety. |

## Full Claim-to-Source and Caveat Matrix

| ID | Claim | Evidence class | Lecture timestamp | Primary source | Deck destination | Wiki destination | Required qualification |
|---|---|---|---|---|---|---|---|
| P4-C01 | ReAct interleaves reasoning traces with actions and environmental observations. | observed + sourced | 04:49-07:27 | [ReAct](https://arxiv.org/abs/2210.03629) | Slides 1-2 | Sections 1-2 | Interleaving does not guarantee correct reasoning or useful actions. |
| P4-C02 | ReAct responds to complementary limits of ungrounded reasoning and action without explicit deliberation. | observed + sourced | 01:48-04:49 | [ReAct](https://arxiv.org/abs/2210.03629) | Slides 1-2 | Section 2 | This is the paper's framing, not proof that ReAct dominates every architecture. |
| P4-C03 | HotpotQA/FEVER constrain the agent to a small executable action space. | observed + sourced | 15:41-17:39 | [ReAct](https://arxiv.org/abs/2210.03629) | Slide 4 | Section 3 | Bounded benchmark actions do not establish unrestricted-agent reliability. |
| P4-C04 | Tool access can reduce some hallucination failures while adding uninformative retrieval and reasoning-over-observation failures. | observed + sourced | 18:37-20:04 | [ReAct](https://arxiv.org/abs/2210.03629) | Slides 3 and 5 | Sections 2 and 4 | Tool output is evidence, not ground truth. |
| P4-C05 | Longer ReAct trajectories can compound errors. | observed + sourced | 20:04-22:46 | [ReAct](https://arxiv.org/abs/2210.03629) | Slide 5 | Section 4 | The rate and form of compounding are task/setup dependent. |
| P4-C06 | RLEF trains code models to use execution feedback over iterative generation-and-repair turns. | observed + sourced | 27:32-31:57 | [RLEF](https://arxiv.org/abs/2410.02089) | Slide 6 | Section 5 | The studied domain is competitive code synthesis, not arbitrary software engineering. |
| P4-C07 | RLEF exposes public-test feedback in the trajectory; terminal reward records whether all public and private tests pass. | observed + sourced | 30:02-34:36 | [RLEF Sections 2.1-2.2](https://arxiv.org/abs/2410.02089) | Slide 7 | Section 6 | Test splitting reduces direct exposure but does not prove absence of contamination or overfitting. |
| P4-C08 | RLEF combines token-level language-model decisions with turn-level execution values or rewards. | observed + sourced | 31:57-33:40 | [RLEF](https://arxiv.org/abs/2410.02089) | Slide 8 | Section 7 | Credit assignment remains delayed and sparse. |
| P4-C09 | Execution feedback is objective relative to the test suite, not complete relative to intended behavior. | observed + teaching inference | 33:40-34:36 | [RLEF](https://arxiv.org/abs/2410.02089) | Slides 7 and 9 | Sections 6 and 8 | Passing tests is not proof of full correctness, security, or efficiency. |
| P4-C10 | RLEF improves reported solve rate and encourages targeted repairs as sample budget grows. | observed + sourced | 34:36-37:47 | [RLEF](https://arxiv.org/abs/2410.02089) | Slide 6 | Section 5 | Result is model-, benchmark-, test-, and budget-specific; no universal percentage appears in the deck. |
| P4-C11 | RLEF depends on executable tests and does not solve repository navigation or specification coverage by itself. | observed + sourced | 37:47-46:30 | [RLEF](https://arxiv.org/abs/2410.02089) | Slide 9 | Section 8 | Repository agents require additional retrieval, dependency, context, and security infrastructure. |
| P4-C12 | Constitutional AI uses human-written principles for critique/revision and uses 16 prewritten principles in the reported preference-label procedure. | observed + sourced | 46:30-50:42 | [Constitutional AI, Section 4.3 and Appendix C](https://arxiv.org/abs/2212.08073) | Slides 10-11 | Sections 9-10 | The number is paper/setup specific; principles were selected for research and are not a universal constitution. |
| P4-C13 | The Constitutional AI RL phase uses AI-generated preferences to train a preference model and optimize a policy. | observed + sourced | 49:16-55:44 | [Constitutional AI](https://arxiv.org/abs/2212.08073) | Slide 11 | Section 10 | AI feedback can inherit evaluator blind spots. |
| P4-C14 | The reported Constitutional AI pipeline retains human input, including the constitution and helpfulness labels. | observed + sourced | 53:20-55:44 | [Constitutional AI](https://arxiv.org/abs/2212.08073) | Slides 10-11 | Sections 9-10 | It reduces some direct harmlessness labeling; it is not human-free alignment. |
| P4-C15 | Harmlessness improvements can trade off against helpfulness. | observed + sourced | 50:42-53:20, 58:52-60:28 | [Constitutional AI](https://arxiv.org/abs/2212.08073) | Slide 11 | Section 10 | Aggregate evaluation may hide subgroup failures or over-refusal. |
| P4-C16 | Updating constitutions, validating AI preferences, and dependable self-correction remain open problems. | observed + sourced | 55:44-60:28 | [Constitutional AI](https://arxiv.org/abs/2212.08073) | Slides 10-12 | Sections 9-11 | Do not present the constitution as a complete governance mechanism. |
| P4-C17 | The three papers instantiate distinct feedback contracts rather than interchangeable self-improvement methods. | teaching synthesis | 00:07-01:48, 60:28-63:20 | [ReAct](https://arxiv.org/abs/2210.03629); [RLEF](https://arxiv.org/abs/2410.02089); [Constitutional AI](https://arxiv.org/abs/2212.08073) | Slides 1 and 12 | Core idea and Section 11 | Explicitly label this taxonomy as teaching synthesis. |
| P4-C18 | More feedback can worsen learning when the signal is noisy, incomplete, biased, or exploitable. | teaching synthesis grounded in limitations | 63:20-71:06 | [ReAct](https://arxiv.org/abs/2210.03629); [RLEF](https://arxiv.org/abs/2410.02089); [Constitutional AI](https://arxiv.org/abs/2212.08073) | Slides 5, 9, and 12 | Sections 4, 8, and 11 | Phrase as a risk/possibility, not a measured universal law. |

## Claim Calibration Rules

- Use **observed** only for content directly present in the complete official lecture transcript or inspected frame.
- Use **sourced** only for a primary assigned paper or official course record.
- Mark the three-contract taxonomy and six-question feedback audit as **teaching synthesis**.
- Do not imply that visible reasoning traces are faithful access to internal model computation.
- Do not call tool observations “truth.” They are external evidence with provenance and interpretation risk.
- Do not call passing tests “correctness” without saying “relative to the test suite.”
- Do not call Constitutional AI human-free; humans author principles, supply helpfulness data, and define evaluations.
- Do not reproduce benchmark percentages unless necessary; the deck teaches mechanisms and boundaries.
- Do not generalize HotpotQA, FEVER, WebShop, or competitive-programming results to unrestricted agents.

## Exact Limitation Inventory

### ReAct

1. Tool observations can be irrelevant, incomplete, stale, or misinterpreted.
2. Long trajectories compound errors and consume more inference context/compute.
3. Prompting versus fine-tuning results are setup dependent.
4. Large action spaces require demonstrations and can exceed context limits.
5. Bounded benchmarks do not establish unrestricted browser/device reliability.
6. Readable thoughts are not guaranteed faithful explanations of internal computation.

### RLEF

1. Requires runnable artifacts, informative tests, and a secure sandbox.
2. Passing finite tests does not establish full correctness, security, or efficiency.
3. Binary rewards are sparse when no attempt reaches a passing state.
4. The paper improves one solution over turns; decomposed repository-scale tasks remain open.
5. Executing generated code requires containment, resource limits, and auditability.
6. Public/private separation does not eliminate contamination or indirect leakage.

### Constitutional AI

1. Human judgment is relocated, not removed.
2. Natural-language principles can be incomplete, conflicting, culturally narrow, or ambiguous.
3. Human helpfulness labels remain in the reported pipeline.
4. AI preference models can inherit evaluator blind spots and biases.
5. Harmlessness can trade off against helpfulness; overtraining can produce evasive boilerplate.
6. Robustness to red-teaming, continual constitutional revision, and governance remain open.
7. Scalable behavioral steering is dual use.

## Visual Opportunity and Originality Map

| Slide concept | Original diagram | Avoid copying |
|---|---|---|
| Three feedback contracts | Three colored feedback ports around one update loop | Paper figures or lecture agenda layout |
| ReAct | Circular thought-action-observation loop with state spine | ReAct paper's exact example boxes |
| Observation limits | Evidence packet passing through provenance/interpretation gates | Search-result screenshot |
| Action contract | Six-part interface contract around a tool socket | Tool UI screenshots |
| Trajectory risk | Branching trace with one early error amplified downstream | Paper error table |
| RLEF repair | Code attempt/test/repair cycle with execution console symbols | Palindrome example code |
| Public/private tests | Split test firewall and terminal reward gate | Paper Figure 1 geometry |
| Two time scales | Token ribbon nested inside turn-level loop | PPO equation from lecture |
| Executable but incomplete | Test coverage window over larger specification field | Benchmark result chart |
| Constitution | Human-authored cards labeled as illustrative principle topics feeding critique | Verbatim paper principles or claims that the topic labels are the paper's exact wording |
| Two CAI phases | Original split-path teaching abstraction for supervised revision and RLAIF preference learning | Paper Figure 1 geometry or arrangement |
| Feedback audit | Six-port diagnostic ring with guardrail boundary | Generic checklist cards from Part 2 |

## Part 2 Style-Conformance Checklist

- [ ] 1600x900 canvas and 16:9 exports
- [ ] aged cream `#F5F0E6` base with faint engineering grid
- [ ] near-black text and consistent cobalt/teal/maroon/warm-brown roles
- [ ] 2px diagram strokes and 8px card corners
- [ ] bold geometric headlines; clean body; monospace system labels
- [ ] top-left stage badge and top-right lecture evidence badge
- [ ] stable 42px outer frame and at least 80px content margin
- [ ] one causal diagram per slide; no logos, slide numbers, gradients, or decoration
- [ ] headlines fit within two lines; supporting text remains presentation-readable
- [ ] caveats use explicit red outline/fill treatment

## Export and Acceptance Gates

- Exactly 12 SVGs, 12 PNGs, and 12 prompt files.
- Every PNG is exactly 1600x900 and has nontrivial pixel variance.
- No `TODO`, `TBD`, placeholder, copied source image, or off-canvas SVG text.
- Contact sheet shows all 12 slides in sequence and remains legible at overview scale.
- PDF has exactly 12 pages; PPTX archive has exactly 12 slide XML files.
- PPTX notes exist for all 12 slides.
- PDF-rendered thumbnails visually match source PNG framing.
- Deck and wiki review PASS means no factual contradiction, unsupported or misattributed claim, missing material caveat, traceability gap, unreadable density, source mismatch, or style/scope defect.
