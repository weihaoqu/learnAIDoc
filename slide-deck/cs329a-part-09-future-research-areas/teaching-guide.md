# Teaching Guide: CS329A Part 9 - Future Research Areas

Use this deck to teach self-improvement as a coupled systems problem. Every improvement mechanism needs an evidence source, a trust boundary, and a resource boundary.

## Slide 1: The Stack

Five layers constrain one another: diverse experience, verification, curriculum, adaptation, and infrastructure. Improving one layer can expose the next bottleneck.

## Slide 2: Diversity Collapse

Repeated outputs from one model can become increasingly similar in the paper's evaluated settings. The claim is conditional, not universal.

**Checkpoint:** What could make ten samples behave like one sample repeated ten times?

## Slide 3: Specialized Roles

Multiagent Finetuning independently specializes model roles and learns from interaction data. Debate creates a communication protocol; voting is an aggregation rule, not a truth guarantee.

## Slide 4: Diversity Metrics

Accuracy measures whether answers work. Likelihood and embedding diversity estimate whether paths differ. Neither proxy proves meaningful conceptual coverage.

## Slide 5: Correct Endpoint, Broken Path

Final-answer reward can approve invalid proofs. Process verification asks whether each transition is justified and the proof is complete.

## Slide 6: Meta-Verification

The verifier identifies proof issues; the meta-verifier assesses verifier feedback. This improves the training signal but moves the recursive trust boundary one level outward.

**Checkpoint:** What evidence would make you stop adding verifier levels?

## Slide 7: Proposer-Solver

Absolute Zero lets a pretrained model propose and solve program-grounded tasks. "Zero data" means no external task dataset in this loop, not no pretraining or environment structure.

## Slide 8: Learnable Curriculum

A useful task must be valid and informative. Trivial tasks add little; impossible tasks produce no progress signal. Buffers can preserve progress or narrow coverage.

## Slide 9: Verification Boundary

Unit tests and proof checkers are cheap and objective. Experiments are slower. Creative and social judgments are contested. Learned rewards extend reach while increasing misspecification risk.

## Slide 10: Intelligence per Watt

IPW combines capability and power. Current v5 studies a bounded distribution of single-turn chat and reasoning queries. `88.7%` is best-of-local routing coverage across a pool of 20+ models. The separate `71.3%` figure is the 2025 endpoint of a longitudinal win/tie-rate statistic that began at `23.2%` in 2023. Neither means all user requests; `5.3x` is historical; lower IPW for local accelerators means less intelligence delivered per watt in that comparison.

## Slide 11: Routing

Local can help privacy and latency; cloud can supply stronger models and higher efficiency in some comparisons. A router should optimize explicit objectives and abstain when neither path meets the requirement.

## Slide 12: Research Audit

Ask five questions: What creates difference? What verifies it? What task is learnable? What persists? What does it cost to serve?

## Short Homework

Design a university self-improving study assistant.

| Layer | Your design | Required falsification test |
|---|---|---|
| Diversity | Define at least two genuinely different learner or critic roles. | Show whether their errors remain correlated. |
| Verification | Define outcome and process checks. | Construct a correct answer with invalid reasoning. |
| Curriculum | Define who proposes the next task. | Detect trivial, impossible, and coverage-narrowing tasks. |
| Adaptation | Choose memory, weights, or both. | Test catastrophic forgetting and stale memory. |
| Infrastructure | Define local/cloud routing objectives. | Measure accuracy, latency, privacy exposure, energy, and cost. |

Conclude which layer is the limiting factor and what evidence would change your conclusion.
