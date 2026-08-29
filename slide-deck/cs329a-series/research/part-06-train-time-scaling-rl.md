# CS329A Part 6 Evidence Report: Train-Time Scaling and Scaling RL

## Source and consumption record

- **Official title:** Stanford CS329A Self-Improving AI Agents | Part 6 | Train Time Scaling/Scaling RL
- **Official video:** https://www.youtube.com/watch?v=yVnmHSAy3ck
- **Duration:** 1:12:38 (4,358 seconds)
- **Course session:** Train Time Scaling/Scaling RL, Friday, October 10, 2025
- **Official course page:** https://cs329a.stanford.edu/
- **Consumption method:** The complete manually authored English YouTube caption track was read from 00:00 through 1:12:34. Then 29 targeted frames were inspected around section transitions, algorithms, equations, comparison slides, ablations, and caveats. The final four seconds contain no additional teaching claim.
- **Caption provenance:** YouTube manual English captions, track `en-j3PyPqV-e1s`, retrieved with `yt-dlp`. A fresh `--list-subs` check confirmed that Stanford's Part 5 and Part 6 uploads both expose this same CC track identifier; it is not a copied video ID. Manual captions are not guaranteed verbatim; several student questions are partially inaudible.
- **Evidence policy:** Timestamps document the lecture. Primary papers control method definitions and reported metrics. Classroom speculation and slide inconsistencies are not elevated to paper claims.

## Official readings

| Reading | Primary source | Lecture segment |
|---|---|---|
| STaR: Bootstrapping Reasoning With Reasoning | https://arxiv.org/abs/2203.14465 | 16:08-40:53 |
| DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models | https://arxiv.org/abs/2402.03300 | 40:53-53:05 |
| DAPO: An Open-Source LLM Reinforcement Learning System at Scale | https://arxiv.org/abs/2503.14476 | 53:05-61:49, then synthesis |

The course page warns that readings may be updated near the class date. This report records the schedule visible during verification on August 28, 2026.

## Critical source correction

At approximately 01:15, an early lecture slide labels **DeepSeekMath-RL 7B: 51.7%** as an AIME result. The primary DeepSeekMath paper reports **51.7% on the MATH benchmark**, with 60.9% under self-consistency, not 51.7% on AIME 2024. A later slide around 28:30 also visually mixes this DeepSeekMath metric into the STaR discussion. This report treats those as slide-level attribution/labeling errors and uses the primary paper's benchmark definition. Confidence: **high**, because the discrepancy is directly observable and the paper abstract is explicit.

## Full timestamped outline

This outline covers the entire recording without unexplained gaps.

| Time | Content consumed | Evidence or teaching significance |
|---|---|---|
| 00:00-01:11 | Opening and agenda | The lecture frames train-time scaling as closing a loop among generation, verification, feedback, and parameter updates; STaR, DeepSeekMath, and DAPO are announced. |
| 01:11-03:07 | AIME motivation and model comparison | The lecture argues that training implementation details matter. The 51.7% DeepSeekMath benchmark label on the slide conflicts with the primary paper and is corrected above. |
| 03:07-05:43 | Train-time scaling loop | A model samples outputs, a verifier or filter selects useful signals, and training changes the model before the next round. |
| 05:43-07:40 | Train-time versus test-time compute | The lecture contrasts spending compute during optimization with spending it on longer or multiple inference trajectories. o1-style curves are motivational, not a controlled causal result in this lecture. |
| 07:40-11:31 | Reasoning behaviors | Analysis, decomposition, self-evaluation, correction, and trying alternatives are presented as useful generated behaviors, especially in domains with checkable answers. |
| 11:31-16:08 | Discussion of compute and verification | The class distinguishes pass@1, repeated sampling, train/test allocation, and overthinking. One slide source is jokingly questioned by the instructor, so it should not be treated as rigorous evidence. |
| 16:08-17:53 | STaR motivation | High-quality rationale datasets are scarce even when many answer-labeled problems exist. |
| 17:53-20:07 | STaR bootstrap and rationalization | Generate rationales, retain those leading to correct answers, and fine-tune. For failures, reveal the answer and ask the model to rationalize it, then train without the hint. Repeat the loop. |
| 20:07-25:13 | STaR assumptions and class questions | Final-answer correctness is only a proxy for rationale quality; rationalization can be invalid; improvement depends on the base model being able to produce useful paths. The original procedure does not independently filter every rationalized chain. |
| 25:13-27:17 | STaR algorithm and setup | The lecture formalizes the iterative data-generation and fine-tuning procedure. |
| 27:17-30:49 | STaR experiments | GPT-J, dataset choices, iteration behavior, plateaus, and human assessment of rationales are discussed. The 28:30 slide contains the metric-attribution problem noted above. |
| 30:49-33:54 | STaR limitations | Simple tasks may gain little; rationale style can inherit prompt bias; answer correctness does not constitute a rationale evaluator. |
| 33:54-37:34 | Related variants and distillation discussion | The lecture situates V-STaR and Quiet-STaR as later directions and discusses self-training versus distillation. |
| 37:34-40:53 | STaR exercise and synthesis | The class identifies a capability ceiling: bootstrap quality depends on what the base model can already produce or reconstruct with an answer hint. |
| 40:53-43:49 | DeepSeekMath data and model stack | DeepSeekMath starts from a code-pretrained 7B model, continues training on carefully curated web math data, and then applies supervised and reinforcement learning stages. |
| 43:49-46:25 | PPO memory and GRPO | PPO's policy/reference/critic/reward components are contrasted with GRPO, which removes the separate critic and estimates a relative baseline from a group of sampled outputs. |
| 46:25-47:46 | Algorithm comparison and results | STaR, rejection-style fine-tuning, and online group-relative RL differ in whether the sampled policy is current and how feedback becomes a parameter update. |
| 47:46-52:17 | Reward variation and group difficulty | If every sample in a group is correct or every sample is wrong, normalized relative advantages carry little or no useful signal. KL and sampling questions are discussed. |
| 52:17-53:05 | Majority@k versus pass@k | The lecture argues that online RL may improve consistency/majority outcomes without necessarily increasing the chance that at least one sample can solve a problem. This is a diagnostic distinction, not a universal theorem. |
| 53:05-54:04 | DAPO motivation | Naive large-scale GRPO can become unstable through entropy collapse, length growth, and batches with weak learning signal. |
| 54:04-55:21 | Clip-Higher | Asymmetric clipping gives selected positive updates more room, intended to preserve exploration rather than prematurely collapsing the policy. |
| 55:21-57:32 | Dynamic sampling | Oversample candidate groups and exclude all-correct/all-wrong groups so the retained batch contains relative reward variation. |
| 57:32-58:41 | Token-level policy-gradient loss | Token-level normalization changes how long and short responses contribute, addressing pathological response-length weighting. |
| 58:41-59:43 | Soft overlong punishment | A gradual penalty near the context limit reduces noise from a hard truncation boundary that may punish otherwise useful long reasoning. |
| 59:43-61:49 | Ablations and operational monitoring | The lecture shows the paper's cumulative DAPO result table and recommends monitoring response length, entropy, the fraction of fully correct groups, and reward saturation rather than loss alone. Exact thresholds on the slide are implementation-specific. |
| 61:49-63:12 | Choosing among STaR, GRPO, and DAPO | Method choice depends on rationale data, verifier quality, task difficulty, model quality, compute, and RL infrastructure. |
| 63:12-65:11 | Capability ceiling debate | The lecture frames observed gains mainly as improved consistency, formatting, and coherent multi-step behavior, while questioning whether these methods expand fundamental out-of-distribution capability. |
| 65:11-67:58 | Verifier dependence and open problems | Reward hacking, noisy verification, pass@k, learning from failures, emergent versus amplified reasoning, and combinations of methods remain open. |
| 67:58-72:34 | Final questions and close | The instructor cautions against repeating speculative percentages about commercial training mixes as facts. Discussion returns to base-model capability, scarce data, hill-climbing signal, and verifier ensembles before closing. |
| 72:34-72:38 | End of recording | No additional instructional content. |

## Twelve-slide teaching narrative

| Slide | Teaching title | Core teaching claim | Evidence anchor | Suggested visual |
|---|---|---|---|---|
| 1 | Train-Time Scaling Closes the Loop | Generate candidates, verify outcomes, convert feedback into a learning signal, update parameters, and repeat. | Video 00:00-05:43 | Circular generate -> verify -> update loop |
| 2 | Keep Four Compute Regimes Separate | Pretraining, supervised fine-tuning, test-time search, and train-time self-improvement spend compute at different stages and solve different bottlenecks. | Video 03:07-07:40, 11:31-16:08 | Lifecycle with four compute locations |
| 3 | Verifiability Is the Feedback Bottleneck | Self-improvement requires a signal that distinguishes better from worse outputs; math is attractive because final answers are often mechanically checkable. | Video 05:43-11:31; all three papers | Verifier funnel |
| 4 | STaR Bootstraps Rationales | STaR iterates generate, retain correct-answer rationales, fine-tune, and regenerate to convert answer-labeled problems into rationale training data. | Video 16:08-20:07; https://arxiv.org/abs/2203.14465 | STaR outer loop |
| 5 | Rationalization Helps and Can Mislead | Showing the answer can help recover a reasoning path, but post-hoc explanations may be invalid even when the final answer matches. | Video 17:53-25:13, 30:49-33:54; STaR paper | Answer hint removed between data creation and training |
| 6 | Self-Training Has a Capability Ceiling | A bootstrap loop can amplify behavior the model occasionally produces; it does not guarantee support for genuinely absent strategies or robust OOD reasoning. | Video 37:34-40:53, 63:12-67:58 | Support distribution before/after training |
| 7 | DeepSeekMath Is a Full Stack | Its reported gains combine code-model initialization, curated math pretraining data, supervised training, and GRPO; they cannot be attributed to GRPO alone. | Video 40:53-46:25; https://arxiv.org/abs/2402.03300 | Layered training stack |
| 8 | GRPO Uses Relative Group Feedback | GRPO samples a group, normalizes rewards relative to that group, and avoids a separate critic, reducing memory requirements compared with PPO. | Video 43:49-47:46; DeepSeekMath paper | PPO components versus GRPO group |
| 9 | Relative Learning Needs Reward Variation | All-correct and all-wrong groups provide weak or zero within-group advantage signal; task difficulty and sampling policy determine effective learning. | Video 47:46-52:17 | Three groups: all wrong, mixed, all correct |
| 10 | Majority@k Is Not Pass@k | Better consistency can raise majority accuracy while leaving the probability that any one of k samples contains a solution largely unchanged. | Video 52:17-53:05, 63:12-65:11 | Two sampling distributions with same support |
| 11 | DAPO Stabilizes Large-Scale RL | DAPO combines Clip-Higher, dynamic sampling, token-level loss, and soft overlong penalties to preserve exploration, signal, and length control. | Video 53:05-61:49; https://arxiv.org/abs/2503.14476 | Four-control RL pipeline |
| 12 | Choose by Signal, Not Fashion | STaR fits scarce rationale supervision and modest infrastructure; GRPO fits verifiable online sampling; DAPO addresses scale instabilities. Every choice remains bounded by the base model and verifier. | Video 61:49-72:34; all three papers | Decision matrix and open-problem footer |

## Claim-evidence ledger

| ID | Calibrated claim | Video evidence | Primary evidence | Confidence and boundary |
|---|---|---|---|---|
| P6-C01 | Train-time scaling repeatedly samples model outputs, evaluates them, and updates model parameters using the resulting signal. | 03:07-05:43 | https://arxiv.org/abs/2203.14465, https://arxiv.org/abs/2402.03300, https://arxiv.org/abs/2503.14476 | High as a shared abstraction; implementations differ materially. |
| P6-C02 | Verifiable tasks make self-training easier because a checker can supply frequent outcome feedback. | 05:43-11:31 | All three primary readings | High as motivation; verification of an answer does not verify every reasoning step. |
| P6-C03 | STaR bootstraps reasoning by generating rationales, retaining successful ones, rationalizing failures with an answer hint, fine-tuning, and iterating. | 16:08-27:17 | https://arxiv.org/abs/2203.14465 | High; central paper algorithm. |
| P6-C04 | STaR assumes final-answer correctness is a useful proxy, but a correct answer can accompany a flawed rationale. | 20:07-25:13, 30:49-33:54 | https://arxiv.org/abs/2203.14465 | High as a limitation; rationale validity requires a stronger evaluator or human check. |
| P6-C05 | STaR is bounded by the base model's ability to generate or answer-conditioned rationalize useful paths and can plateau. | 27:17-30:49, 37:34-40:53 | https://arxiv.org/abs/2203.14465 | Medium to high; the broader capability-ceiling interpretation is partly inferential. |
| P6-C06 | DeepSeekMath combines a code-pretrained base, 120B math-related web tokens, supervised training, and RL. | 40:53-43:49 | https://arxiv.org/abs/2402.03300 | High from the paper abstract; causal contribution of each stage is not isolated by this statement. |
| P6-C07 | DeepSeekMath reports 51.7% on MATH and 60.9% with 64-sample self-consistency. | Lecture slide at 01:15 labels the first metric incorrectly; 40:53-47:46 provides the proper paper context | https://arxiv.org/abs/2402.03300 | High from the primary paper. Do not relabel 51.7% as AIME. |
| P6-C08 | GRPO estimates a group-relative baseline without training a separate critic, reducing the memory burden relative to PPO. | 43:49-47:46 | https://arxiv.org/abs/2402.03300 | High for method motivation; total memory depends on the implementation. |
| P6-C09 | A group with identical rewards yields no useful normalized relative advantage among its samples. | 47:46-52:17 | https://arxiv.org/abs/2402.03300, https://arxiv.org/abs/2503.14476 | High mathematically within the group-relative formulation. |
| P6-C10 | Better majority@k can reflect improved consistency without increasing pass@k or introducing a new solution mode. | 52:17-53:05, 63:12-65:11 | The three readings provide context but do not establish this as a universal theorem | Medium; useful diagnostic hypothesis that requires direct evaluation. |
| P6-C11 | DAPO introduces Clip-Higher, dynamic sampling, token-level policy-gradient loss, and soft overlong reward shaping. | 53:05-59:43 | https://arxiv.org/abs/2503.14476 | High; central paper techniques. |
| P6-C12 | DAPO reports a cumulative improvement from naive GRPO to 50 on AIME 2024 average@32 for its Qwen2.5-32B setup. | 59:43-61:49 | https://arxiv.org/abs/2503.14476 | High as a reported setup-specific result; additions interact and should not be treated as universal increments. |
| P6-C13 | Dynamic sampling retains groups with mixed outcomes to maintain effective gradient signal. | 55:21-57:32 | https://arxiv.org/abs/2503.14476 | High for the method; it also changes the sampled training distribution. |
| P6-C14 | Token-level loss and soft overlong punishment are intended to control pathological response-length behavior. | 57:32-59:43 | https://arxiv.org/abs/2503.14476 | High for intent and reported method; ideal normalization can vary by task. |
| P6-C15 | Reward, response length, entropy, and the fraction of informative groups are useful joint diagnostics; loss alone is insufficient. | 59:43-61:49 | https://arxiv.org/abs/2503.14476 | Medium to high. Exact target ranges shown in the lecture are implementation-specific, not general laws. |
| P6-C16 | Verifier quality and reward hacking remain central limitations for scaling self-improvement. | 65:11-72:34 | All three papers, especially https://arxiv.org/abs/2503.14476 | High as an open systems risk; the best mitigation remains task-dependent. |

## Caveats and source conflicts

1. **DeepSeekMath metric conflict:** The visible 01:15 slide says 51.7% on AIME, while the DeepSeekMath paper says 51.7% on MATH. The paper is authoritative. The 28:30 slide also appears misplaced or misattributed during the STaR section.
2. **Motivational graph caution:** During 11:31-16:08, the instructor explicitly questions a copied graph. Do not use that graph as evidence for a quantitative train-versus-test compute law.
3. **Caption fidelity:** Manual captions can omit punctuation or mishear technical names. Partly inaudible audience questions are not reconstructed.
4. **Verification is partial:** Exact final answers are easier to check than free-form reasoning, but a passing answer does not prove a valid derivation, safe behavior, or general understanding.
5. **STaR rationalization risk:** Supplying the answer can produce a plausible post-hoc story rather than the causal route by which the answer should be derived.
6. **STaR selection bias:** Failed rationales are discarded unless rationalization recovers them, so the learner gets weak information about why failures occurred.
7. **Base-model dependence:** All three methods depend on the starting model placing useful behaviors within reachable sampling probability. More sampling is not a literal guarantee of novel capability.
8. **DeepSeekMath attribution:** Its performance reflects data curation, code initialization, continued pretraining, SFT, and RL. A result from the full system is not evidence that GRPO alone caused the gain.
9. **Group-relative signal:** GRPO requires within-group reward variation. All-correct or all-wrong groups consume generation compute without useful relative discrimination.
10. **Sampling-distribution shift:** DAPO dynamic sampling intentionally removes very easy and currently impossible groups from updates. That improves signal efficiency but changes what the optimizer sees.
11. **Metric distinction:** Majority@k measures voting/consistency; pass@k measures whether at least one candidate succeeds. Improvements in one do not imply equal improvements in the other.
12. **Entropy is a proxy:** Low token entropy may indicate policy collapse, but entropy alone does not measure semantic exploration or correctness. The numeric range on the lecture slide is not a universal target.
13. **Length controls interact with reasoning:** Penalizing long answers can suppress waste, but it can also punish genuinely necessary reasoning. Soft penalties reduce, not eliminate, this tradeoff.
14. **DAPO result scope:** The cumulative ablation is tied to a particular 32B model, AIME 2024 protocol, sample budget, and implementation. The components may interact non-additively elsewhere.
15. **Commercial-model speculation:** Near the end, speculative fractions for how proprietary models divide training compute are discussed and cautioned against. They are excluded from the evidence ledger.
16. **Capability claim remains unresolved:** The lecture's distinction between elicitation/consistency and fundamental capability is valuable, but deciding whether support expanded requires controlled pass@k, distribution-shift, and strategy-diversity tests.

## Visual cue index

| Time | Visible cue | Teaching use |
|---|---|---|
| 00:35 | Agenda: STaR, DeepSeekMath, DAPO | Lecture map |
| 01:15 | AIME comparison slide with 51.7% label | Use only to teach source correction; do not reproduce as fact |
| 03:30 | Train-time scaling loop and implementation-details message | Core loop |
| 06:20 | Train/test compute curves attributed to an external paper | Motivation with explicit non-causal caveat |
| 08:15 | Reasoning behavior list | Observable behavior taxonomy |
| 18:00 | STaR: examples -> generation -> retain correct -> fine-tune -> repeat | Bootstrap loop |
| 18:45 | STaR rationalization with answer hint | Rationalization mechanism and risk |
| 25:20 | STaR formal problem setup | Technical framing |
| 27:20 | GPT-J experimental protocol and outer loop | Experimental context |
| 28:30 | Slide visually mixing 51.7% DeepSeekMath metric into STaR segment | Attribution warning, not teaching evidence |
| 32:00 | Rationalization and few-shot limitations | STaR caveats |
| 42:00 | DeepSeekMath data and practical RL framing | Full-stack perspective |
| 44:00 | PPO policy/reference/critic/reward memory burden | Why remove the critic? |
| 45:05 | GRPO group sampling and reward normalization | GRPO mechanism |
| 46:25 | STaR, GRPO, and online rejection-fine-tuning comparison | Method distinctions |
| 52:20 | Majority@k versus pass@k claim | Consistency/capability diagnostic |
| 54:10 | DAPO Clip-Higher | Exploration-preserving update |
| 55:30 | Dynamic sampling: remove all-correct/all-wrong groups | Gradient-signal filter |
| 57:35 | Token-level loss: weight tokens rather than samples | Length normalization |
| 58:45 | Soft overlong punishment near context limit | Smooth length control |
| 59:45 | DAPO cumulative result table, naive GRPO 30 to DAPO 50 | Setup-specific ablation |
| 60:25 | Scaling RL monitoring: length, entropy, fully correct groups | Operational dashboard with threshold caveat |
| 61:50 | STaR versus DeepSeekMath GRPO comparison | Selection criteria; slide is partly cropped at this frame |
| 63:15 | Claimed improvements and non-improvements | Hypothesis about consistency versus capability, not settled fact |
| 66:37 | Instructor during open-problem discussion | No useful slide content; use transcript for this segment |

## Glossary

| Term | Working definition for this lecture |
|---|---|
| Train-time scaling | Spending additional compute to generate feedback-bearing data and update model parameters. |
| Test-time scaling | Spending additional compute at inference through longer reasoning, repeated samples, search, or verification without updating weights. |
| Self-training | Training a model on examples generated wholly or partly by that model. |
| Rationale | A written intermediate explanation or derivation connecting a problem to an answer. |
| Rationalization | Generating a rationale while given the correct answer, then using that rationale without the answer hint during training. |
| Rejection sampling | Generate candidates, reject those that fail a criterion, and retain accepted examples for training or selection. |
| Policy | The model distribution that generates actions or tokens. |
| Critic | A learned value estimator used to predict expected return, as in PPO-style actor-critic training. |
| PPO | Proximal Policy Optimization, a policy-gradient method using clipped updates and commonly a learned critic. |
| GRPO | Group Relative Policy Optimization, which estimates relative advantages from rewards within a sampled group rather than a separate critic. |
| Relative advantage | A centered and often normalized score indicating whether one sampled response is better or worse than its group. |
| Clip-Higher | DAPO's asymmetric clipping scheme intended to give selected positive updates more room and preserve exploration. |
| Dynamic sampling | Oversampling and retaining groups with mixed rewards so an update has comparative signal. |
| Token-level loss | A policy-gradient aggregation that normalizes at token level rather than giving every response equal sample-level weight. |
| Soft overlong penalty | A gradual reward penalty near the maximum sequence length rather than an abrupt cutoff-only punishment. |
| Entropy collapse | A reduction in output-distribution diversity that can make the policy prematurely deterministic. |
| Majority@k | Accuracy after aggregating or voting among k generated candidates. |
| Pass@k | Probability that at least one of k candidates succeeds. |
| Reward hacking | Improving the measured reward by exploiting verifier weaknesses instead of accomplishing the intended task. |

## Teaching questions

### Check understanding

1. Draw the train-time scaling loop and identify where STaR, GRPO, and DAPO create their learning signals.
2. Why can an answer checker validate an outcome without validating its rationale?
3. What does rationalization add to STaR, and what new error mode does it introduce?
4. Which PPO component does GRPO avoid, and what replaces its baseline estimate?
5. Why does an all-correct group give no relative advantage signal?
6. Explain the difference between majority@k and pass@k with a four-sample example.

### Apply the ideas

7. You have 50 human-written rationales and 10,000 answer-labeled algebra questions but no distributed RL stack. Which method would you begin with, and what verifier audit would you run first?
8. Your GRPO run's reward rises, entropy falls sharply, and pass@64 stays flat. Give two plausible diagnoses and the evidence needed to distinguish them.
9. Design a dynamic-sampling rule for a coding agent. What should count as correct, partially correct, and unverifiable?
10. A response is truncated after a long valid derivation. Compare a hard zero reward with a soft overlong penalty in terms of bias and variance.

### Challenge the methods

11. Construct a correct-answer but invalid-rationale example that STaR would mistakenly retain. How could a process verifier catch it?
12. If DAPO removes all-wrong problems, how can the model ever learn genuinely difficult tasks? Propose a curriculum or auxiliary signal.
13. Which experiment would show that RL expanded problem-solving support rather than merely made an existing solution more likely?
14. How could a reward model's stylistic preference cause apparent reasoning improvement without better correctness?
15. The lecture offers practical entropy ranges. Why should those numbers not be transferred unchanged to another tokenizer, task, model size, or decoding setup?
16. Audit the claim "51.7% on AIME" using the primary paper. What does this error teach about evidence hierarchy when converting lectures into teaching material?

## Primary references

- Stanford CS329A course and schedule: https://cs329a.stanford.edu/
- Official Part 6 recording: https://www.youtube.com/watch?v=yVnmHSAy3ck
- Zelikman et al., *STaR: Self-Taught Reasoner Bootstrapping Reasoning With Reasoning*: https://arxiv.org/abs/2203.14465
- Shao et al., *DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models*: https://arxiv.org/abs/2402.03300
- Yu et al., *DAPO: An Open-Source LLM Reinforcement Learning System at Scale*: https://arxiv.org/abs/2503.14476
