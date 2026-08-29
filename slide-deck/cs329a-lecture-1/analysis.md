# Deck Analysis and Evidence Ledger

## Topic

Stanford CS329A Lecture 1: the progression from scaling language models to building self-improving agentic systems.

## Confirmed Configuration

- Style: `intuition-machine`
- Audience: learners
- Language: English
- Slide count: 12
- Aspect ratio: 16:9
- Outline review: skipped by Q
- Prompt review: skipped by Q

## Message Hierarchy

**Core message:** Generation creates possibilities; verification and feedback turn possibilities into reliable agent behavior.

**Supporting ideas:**

1. AI capability was first expanded mainly through pretraining scale.
2. Post-training shaped that capability into instruction-following behavior.
3. Test-time scaling searches over multiple possible solutions.
4. Reliable self-improvement depends on feedback and verification.
5. Practical agents often use controlled workflow graphs rather than unrestricted autonomy.

**Learner action:** Given an AI system, identify where improvement occurs, what persists, and how correctness is verified.

## Audience Decision Matrix

| Question | Decision |
|---|---|
| Primary audience | Q and technically curious learners familiar with LLMs but learning agent research systematically |
| Existing belief | Better models and more agent autonomy usually imply better performance |
| Desired change | Separate model capability, candidate coverage, selector quality, and deployed reliability |
| Main barrier | Terms such as reasoning, self-correction, and self-improvement sound more durable than they may be |
| Convincing evidence | Concrete loops, side-by-side comparisons, timestamped lecture claims, and one probability model with explicit assumptions |

## Visual Opportunity Map

| Concept | Visual treatment |
|---|---|
| Where compute is spent | Four-stage progression |
| Post-training stack | Layered process diagram |
| Test-time scaling | One-to-many candidate fan-out plus verifier |
| Coverage versus reliability | Formula plus paired metric cards |
| Generator-verifier gap | Wide generator funnel into a narrow verification gate |
| Reasoning | Circular correction loop |
| Two forms of improvement | Within-run versus persistent across-run comparison |
| Agent versus chatbot | Binary comparison |
| Agent loop versus workflow graph | Flexibility-control comparison |

## Claims Ledger

| Slide | Claim | Evidence | Type | Confidence |
|---|---|---|---|---|
| 1 | Verification and feedback are central to reliable agent behavior | 42:28-53:56 | synthesis from lecture | high |
| 2 | Progress shifts across pretraining, post-training, test time, and orchestration | 02:23-19:38; 28:53-30:12; 40:49-47:55 | deck interpretation | high |
| 3 | Scaling is associated with lower loss and observed new benchmark behaviors | 02:23-10:49 | lecture claim | high, with emergence caveat |
| 4 | Fine-tuning, instruction tuning, and preference optimization shape assistant behavior | 11:20-19:25 | lecture claim | high |
| 5 | Repeated sampling holds weights fixed and generates multiple candidates | 19:38-24:34 | lecture claim | high |
| 6 | Coverage is not the same as deployed reliability | 20:50-27:16; 36:33-37:04 | lecture-derived interpretation | high |
| 7 | Verification quality is domain-dependent and remains a bottleneck | 47:09-51:16 | lecture claim | high |
| 8 | Analysis, decomposition, feedback, correction, and alternatives form a useful operational view of reasoning-model behavior | 31:22-36:31 | lecture-derived interpretation | medium-high; not a claim about hidden cognition |
| 9 | Within-run refinement differs from durable system improvement | 28:53-30:12 plus persistence definition | deck interpretation | high |
| 10 | Agents add goals, environment actions, feedback, stopping, tools, and memory | 40:49-43:26 | lecture claim | high |
| 11 | Many deployed systems remain predefined workflow graphs | 43:30-47:55 | lecture claim | high |
| 12 | Coding, support, research, and AI-scientist workflows illustrate the opportunity and limits | 54:03-58:04 | lecture claim | high, with forward-looking caveat |

## Claim Calibrations

- Repeated-sampling comparisons apply to selected benchmarks, large sample budgets, and oracle or strong verification. They do not establish general model superiority.
- `1 - (1 - p)^k` assumes independent, identically distributed attempts. Real samples are correlated.
- Chain-of-thought emergence is presented historically in the lecture, while the instructors later describe modern reasoning as shaped by training and reinforcement.
- Within-run refinement does not become durable learning unless something persists across tasks.
- Open loops are not categorically better than graphs. The tradeoff is adaptability versus control and observability.
- AI-scientist workflows can assist ideation and execution, but hallucination and external validation remain unresolved.
- The four-frontier progression and the feedback-quality closing diagnostic are the deck's synthesis, not direct quotations or categorical claims from the lecturer.

## Accessibility and Export Checks

- Minimum body text target: 24 px in 1600x900 slide images.
- High-contrast near-black text on aged cream.
- No color-only distinctions: every colored element has a text label.
- Each slide has one narrative headline and one dominant visual.
- Source evidence appears as a timestamp tag, not an unlabeled footer.
- PNG, PPTX, and PDF exports must preserve the same framing and line breaks.
