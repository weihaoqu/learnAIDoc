# CS329A Part 3 Evidence Research: Robust Verification

## Source and coverage record

- **Official video title:** Stanford CS329A Self-Improving AI Agents | Part 3 | Robust Verification
- **Official video:** https://www.youtube.com/watch?v=p7TdPUcPoik
- **Uploader:** Stanford Online
- **Duration:** 1:12:58
- **Official course schedule:** https://cs329a.stanford.edu/
- **Course schedule entry:** Lecture 3, "Robust Verification," with four assigned readings.
- **Accessed:** 2026-08-28 (America/New_York)
- **Transcript evidence:** Native English YouTube captions, 1,493 timestamped segments. The complete caption stream from 00:09 through 1:12:50 was read. There is no substantive speech before 00:09; the final question ends at approximately 1:12:50.
- **Visual evidence:** 26 full-resolution cue frames inspected across the complete lecture. The video alternates between direct slide capture and a classroom camera; several transition frames show only the speaker, so claims are anchored primarily to the transcript and to readable slide frames listed below.
- **Evidence convention:** "Lecture" means directly observed in the official video/captions. "Paper" means supported by the assigned paper's current primary arXiv record or PDF. "Teaching synthesis" means an inference or instructional framing added here and not attributed to the lecturer or authors.
- **Confidence:** High for the lecture structure, assigned readings, and central methods. Medium for isolated words in student questions because the classroom captions are occasionally garbled. Numerical claims are retained only when readable on a slide or supported by a primary paper.

## Official assigned readings

1. **Shrinking the Generation-Verification Gap with Weak Verifiers** — Jon Saad-Falcon, E. Kelly Buchanan, Mayee F. Chen, Tzu-Heng Huang, Brendan McLaughlin, Tanvir Bhathal, Shang Zhu, Ben Athiwaratkun, Frederic Sala, Scott Linderman, Azalia Mirhoseini, and Christopher Ré. The paper names its method **Weaver**. https://arxiv.org/abs/2506.18203
2. **Training Verifiers to Solve Math Word Problems** — Karl Cobbe, Vineet Kosaraju, Mohammad Bavarian, Mark Chen, Heewoo Jun, Lukasz Kaiser, Matthias Plappert, Jerry Tworek, Jacob Hilton, Reiichiro Nakano, Christopher Hesse, and John Schulman. https://arxiv.org/abs/2110.14168
3. **Let's Verify Step by Step** — Hunter Lightman, Vineet Kosaraju, Yura Burda, Harri Edwards, Bowen Baker, Teddy Lee, Jan Leike, John Schulman, Ilya Sutskever, and Karl Cobbe. https://arxiv.org/abs/2305.20050
4. **Math-Shepherd: Verify and Reinforce LLMs Step-by-step without Human Annotations** — Peiyi Wang, Lei Li, Zhihong Shao, R. X. Xu, Damai Dai, Yifei Li, Deli Chen, Y. Wu, and Zhifang Sui. https://arxiv.org/abs/2312.08935

The course schedule and lecture present the papers in a pedagogical chronology: outcome verification, human-labeled process verification, automatically labeled process verification, and ensembles of imperfect verifiers. The schedule lists Weaver first, but the lecture discusses it last.

## Complete timestamped conceptual outline

### 00:09-01:15 — Why verification is the bottleneck

- **00:09-00:52:** Connects Part 2's test-time scaling to the generation-verification gap. Repeated sampling may contain a correct answer, but a system still needs to select it or guide generation toward it.
- **00:55-01:15:** Introduces the four-paper progression and begins with the 2021 verifier work.

### 01:15-21:17 — Outcome verification and GSM8K

- **01:15-03:18:** Motivates verifier training through confident but wrong multi-step solutions. Introduces GSM8K as 8.5K diverse grade-school math word problems with natural-language, multi-step solutions.
- **03:18-05:07:** Defines a verifier as a model that estimates whether a candidate solution is correct. Training data pair a question and generated solution with a binary label; the generator produces 100 solutions per problem.
- **05:07-07:57:** Explains test-time reranking and the verifier architecture: an LM plus a scalar prediction head, trained with correctness and language-modeling objectives. The question tokens are masked from the correctness loss.
- **07:57-10:55:** Compares token-, sentence-, and solution-level labeling. The lecture describes using the last token's verifier score as the score for the full solution and shows token-level confidence visualizations.
- **10:55-12:15:** Shows verification versus supervised fine-tuning. Verification becomes more effective as verifier training data grows; with small datasets it can provide little benefit.
- **12:27-14:19:** Classroom clarification and model-size ablation: in the reported setup, a larger generator plus smaller verifier beats a smaller generator plus larger verifier. The lecturer frames the optimal generator/verifier allocation as an open research problem.
- **14:19-18:24:** Test-time sample scaling rises and then falls after roughly 400 candidates in the displayed experiment. This is selection accuracy, not oracle coverage: as the candidate pool grows, the imperfect verifier can assign its maximum score to a false positive.
- **18:39-21:17:** Questions on repeated sampling, labels, scaling the verifier, and verification versus fine-tuning. The lecturer emphasizes that a separate verifier can preserve a general generator rather than specializing its weights to one task.

### 21:17-37:51 — Human-labeled process reward models

- **21:17-22:39:** Introduces outcome reward models (ORMs) versus process reward models (PRMs). ORMs score a completed solution; PRMs score intermediate steps.
- **22:39-25:06:** Explains human step-level annotation and the product of per-step probabilities as the lecture's aggregation example. Process supervision provides more precise credit assignment.
- **25:06-26:11:** Argues that process supervision can expose a wrong chain that accidentally reaches a correct final answer and can encourage a human-endorsed, inspectable solution process.
- **26:11-28:32:** Introduces PRM800K and active learning for label collection, including "convincing wrong" solutions. The lecture reports the paper's estimated 2.6x annotation efficiency gain from active selection.
- **28:32-31:04:** Describes training and results: PRM outperforms ORM and majority voting in the paper's MATH setup, with the gap increasing as more candidates are reranked.
- **31:04-31:43:** Shows a small out-of-distribution STEM evaluation where PRM outperforms ORM and majority vote. This is evidence of moderate, not universal, transfer.
- **31:43-37:51:** Extended Q&A exposes caveats: step labels can misassign credit; PRM/ORM annotation budgets are hard to compare; thresholds add hyperparameters; skipped reasoning may receive a high score; and human labels determine what counts as an acceptable step. The lecturer notes that modern systems may combine process and outcome signals.

### 37:51-51:51 — Automatic process supervision with Math-Shepherd

- **37:51-39:03:** Reframes the problem: PRMs are useful but expensive to label. Math-Shepherd attempts automatic step annotation and then uses the reward model for both reranking and reinforcement learning.
- **39:03-40:42:** Defines a step's quality by rollout potential: from a prefix, sample continuations and estimate whether they reach the correct final answer. A hard label is positive if any continuation succeeds; a soft label is the fraction that succeed.
- **40:42-43:27:** Classroom critique identifies two failures: rare but valid paths can be labeled bad when the rollout budget misses them, and hard problems can yield no positive signal. A wrong intermediate step can also be labeled good if a later continuation reaches the right answer.
- **43:27-44:49:** Uses the automatically trained PRM to rerank candidates and as a PPO reward. The lecture reports that the paper ultimately uses the simpler hard estimate in its chosen configuration.
- **44:49-47:41:** Shows gains over self-consistency, ORM, and the human-annotated PRM800K baseline in the paper's reported setups, then shows PPO improvements. These are benchmark- and model-specific comparisons.
- **47:41-51:51:** Q&A covers self-correction rubrics, tool use, compute allocation between generation and verification, training-data comparability, greedy decoding, and possible iterative retraining. The lecturer explicitly says she is unsure whether one comparison controls test-time compute.

### 51:51-66:37 — Weighted ensembles of weak verifiers (Weaver)

- **51:51-53:05:** Introduces Weaver. "Weak" means imperfect, not intentionally poor. The approach combines reward models and LM judges rather than training a single new verifier from scratch.
- **53:05-55:43:** Shows that unweighted ensembles do not improve monotonically as more verifiers are added. Supervised weighting can perform better because verifier accuracies differ.
- **55:43-57:36:** Presents the score-weight-select pipeline: normalize heterogeneous scores, filter low-quality verifiers, estimate reliability with limited labeled data, and combine weighted scores to select a response.
- **57:36-59:29:** Explains weak supervision at a high level. The lecture states an independence assumption across verifier signals; agreement and disagreement patterns help estimate reliability.
- **59:29-60:07:** Compares Weaver with naive ensembles and reports larger gains on harder evaluated datasets.
- **60:07-62:12:** Enumerates verification-compute axes: more candidate generations, larger generator/verifier models, more verifier models, and more total FLOPs. Distinguishes oracle pass@k from deployable selected-answer accuracy.
- **62:12-64:18:** Reports selected-answer gains from scaling generations and verifier aggregation. The lecture emphasizes these are end-system accuracy results rather than coverage alone.
- **64:18-66:37:** Shows distillation from a verifier ensemble into a 400M cross-encoder and an accuracy-compute plot. Current arXiv v3 reports different exact headline numbers than the recorded lecture; see limitations below.

### 66:37-1:12:50 — Recap and open research questions

- **66:37-68:13:** Recaps four stages: outcome verification, human process labels, automatic process labels, and weak-verifier aggregation. Suggests combining ORM and PRM signals.
- **68:15-69:15:** Discusses domains beyond math, especially code, where executable unit tests can become verifiers.
- **69:27-70:23:** Explains that reasoning models can still benefit from repeated sampling and reward-guided trajectories, both for test-time selection and for generating training data.
- **70:33-71:44:** Considers whether test-time sampling might eventually move mostly into training. The lecturer notes a counter-pressure: sharpening one answer too strongly may reduce solution diversity and creativity.
- **71:48-1:12:50:** Final question asks whether generator/verifier family similarity matters. The lecturer labels this a good research question and says she is not aware of a controlled study resolving it.

## 12-slide teaching narrative

### Slide 1 — A generator is only as useful as its selector

- **Teaching goal:** Establish verification as the control plane for test-time scaling.
- **Core content:** Candidate generation can increase coverage while selected-answer accuracy stays flat or falls.
- **Evidence:** Lecture 00:09-00:52 and 14:19-18:24.
- **Visual:** Two curves: oracle coverage rising; imperfect-selector accuracy rising then declining.
- **Caveat:** Do not label pass@k coverage as deployed reliability.

### Slide 2 — The basic verifier loop

- **Teaching goal:** Show the 2021 generate-label-train-rerank pipeline.
- **Core content:** Generate many candidate solutions, label by final-answer correctness, train a verifier, rank new candidates at inference.
- **Evidence:** Lecture 03:18-07:57; Cobbe et al., https://arxiv.org/abs/2110.14168.
- **Visual:** Question -> generator -> candidates -> verifier scores -> selected answer.

### Slide 3 — More candidates create more false-positive opportunities

- **Teaching goal:** Explain why best-of-N can reverse.
- **Core content:** The maximum of noisy verifier scores becomes less trustworthy as N grows unless verifier precision scales too.
- **Evidence:** Lecture 14:19-18:24.
- **Visual:** One correct candidate and many increasingly extreme false positives.
- **Caveat:** The displayed peak near 400 is specific to that experiment, not a universal optimum.

### Slide 4 — Outcome supervision versus process supervision

- **Teaching goal:** Define ORM and PRM precisely.
- **Core content:** ORM labels a whole trajectory; PRM labels intermediate reasoning steps and reduces credit-assignment ambiguity.
- **Evidence:** Lecture 21:17-25:06; Lightman et al., https://arxiv.org/abs/2305.20050.
- **Visual:** Same reasoning chain with one terminal score versus step-by-step scores.

### Slide 5 — Process labels are richer, but they encode a rubric

- **Teaching goal:** Prevent the misconception that PRM scores are objective truth.
- **Core content:** Human annotators decide whether each step is correct, relevant, and sufficiently justified.
- **Evidence:** Lecture 25:06-28:32 and 31:43-37:51.
- **Visual:** A step with three annotation dimensions: correctness, relevance, sufficiency.
- **Caveat:** Process supervision may reward one endorsed reasoning style and penalize valid shortcuts.

### Slide 6 — PRM800K: active learning targets informative mistakes

- **Teaching goal:** Explain why annotation selection matters.
- **Core content:** Surface convincing wrong solutions and uncertain steps rather than uniformly label everything.
- **Evidence:** Lecture 26:11-30:14; Lightman et al.
- **Visual:** Uniform sampling versus active selection around a decision boundary.
- **Caveat:** Active selection changes the training distribution and complicates direct ORM/PRM label-budget comparisons.

### Slide 7 — Automatic labels trade human cost for rollout compute

- **Teaching goal:** Derive hard and soft Math-Shepherd labels.
- **Core content:** From a prefix, sample N continuations. Hard label = any success; soft label = success frequency.
- **Evidence:** Lecture 37:51-40:42; Wang et al., https://arxiv.org/abs/2312.08935.
- **Visual:** Prefix branching into successful and failed completions.

### Slide 8 — Rollout labels inherit search failures

- **Teaching goal:** Make the automatic-supervision limitation memorable.
- **Core content:** A good prefix can be mislabeled when the rollout policy cannot finish it; wrong steps may be rescued by later luck.
- **Evidence:** Lecture 40:42-43:27; Math-Shepherd limitations section.
- **Visual:** Two counterexamples: rare valid branch missed; invalid branch accidentally repaired.

### Slide 9 — Verification can train the generator too

- **Teaching goal:** Connect inference-time reranking to train-time RL.
- **Core content:** A PRM can select candidates at inference and provide a reward for PPO-style policy updates.
- **Evidence:** Lecture 43:27-47:41; Math-Shepherd paper.
- **Visual:** PRM feeding both a selector and an RL update loop.
- **Caveat:** Optimizing against an imperfect reward model introduces reward-hacking risk.

### Slide 10 — Diversity across verifiers can be a resource

- **Teaching goal:** Introduce Weaver without implying simple voting is enough.
- **Core content:** LM judges and reward models have different errors; normalize, filter, weight, then select.
- **Evidence:** Lecture 51:51-57:36; Saad-Falcon et al., https://arxiv.org/abs/2506.18203.
- **Visual:** Score -> weight -> select pipeline.

### Slide 11 — Weak supervision needs assumptions and quality gates

- **Teaching goal:** Explain where ensemble strength comes from.
- **Core content:** Correlated or below-random verifiers can break naive reliability estimation; low-quality filtering and some development labels matter.
- **Evidence:** Lecture 57:36-60:07; Weaver paper discussion and appendix.
- **Visual:** Independent complementary errors versus correlated shared error.
- **Caveat:** An ensemble cannot recover a correct answer that the generator never produced.

### Slide 12 — Design verification as a budgeted system

- **Teaching goal:** Give a reusable engineering checklist.
- **Core content:** Allocate compute across candidate count, generator strength, verifier strength/count, and distillation. Evaluate selection accuracy, calibration, compute, and transfer.
- **Evidence:** Lecture 60:07-66:37 and recap 66:37-68:13.
- **Visual:** Four budget dials around an end-to-end selected-answer metric.
- **Exit question:** Which bottleneck dominates your task: candidate coverage, verifier discrimination, distribution shift, or cost?

## Claim-to-evidence ledger

| ID | Claim | Evidence class | Lecture timestamp | Primary source | Qualification |
|---|---|---|---|---|---|
| P3-C01 | For deployed selected-answer accuracy, repeated sampling requires a selector that can identify a good candidate. | Lecture + teaching synthesis | 00:09-00:52 | https://arxiv.org/abs/2506.18203 | Coverage and selected-answer accuracy are different metrics. |
| P3-C02 | GSM8K contains 8.5K linguistically diverse grade-school math word problems. | Paper | 02:17-03:18 | https://arxiv.org/abs/2110.14168 | Dataset scale and domain are specific. |
| P3-C03 | The Cobbe verifier ranks many generated candidates and improves GSM8K performance with enough verifier data. | Lecture + paper | 03:18-12:15 | https://arxiv.org/abs/2110.14168 | The paper reports little benefit at small dataset sizes. |
| P3-C04 | Selected-answer accuracy can decline as candidate count grows because an imperfect verifier selects a high-scoring false positive. | Lecture | 14:19-18:24 | https://arxiv.org/abs/2110.14168 | The approximately 400-candidate peak is setup-specific. |
| P3-C05 | In the Cobbe ablation, increasing generator size helped more than increasing verifier size. | Lecture + paper | 13:07-14:19 | https://arxiv.org/abs/2110.14168 | Not a universal generator/verifier sizing law. |
| P3-C06 | Process supervision labels intermediate steps; outcome supervision labels final results. | Lecture + paper | 21:17-25:06 | https://arxiv.org/abs/2305.20050 | Real systems may combine both. |
| P3-C07 | The Lightman paper reports stronger MATH reranking from its PRM than its ORM and releases PRM800K. | Paper | 26:11-30:14 | https://arxiv.org/abs/2305.20050 | Human labels are costly and active-learning-selected. |
| P3-C08 | The Lightman active-learning procedure is estimated to be about 2.6x more data-efficient than uniform sampling. | Lecture + paper | 26:25-27:19 | https://arxiv.org/abs/2305.20050 | Estimate depends on the study's selection and labeling setup. |
| P3-C09 | The reported PRM transfers better than ORM/majority vote on a small fresh STEM set. | Lecture + paper | 31:04-31:43 | https://arxiv.org/abs/2305.20050 | Evidence supports moderate OOD transfer, not broad domain generality. |
| P3-C10 | Math-Shepherd creates step labels by rolling out continuations from reasoning prefixes. | Lecture + paper | 37:51-40:42 | https://arxiv.org/abs/2312.08935 | Label quality depends on rollout count and rollout policy. |
| P3-C11 | Automatic process annotation is noisy and compute-intensive. | Lecture + paper | 40:42-43:27 | https://arxiv.org/abs/2312.08935 | These limitations are explicit in the paper. |
| P3-C12 | Math-Shepherd uses its PRM for both candidate reranking and PPO-style reinforcement learning. | Lecture + paper | 43:27-47:41 | https://arxiv.org/abs/2312.08935 | Reward optimization can amplify PRM errors. |
| P3-C13 | Weaver combines heterogeneous imperfect verifiers with normalization, filtering, and learned/estimated weights. | Lecture + paper | 51:51-59:29 | https://arxiv.org/abs/2506.18203 | Adding verifiers naively is not monotonically beneficial. |
| P3-C14 | Weaver's weak-supervision estimation relies on assumptions about verifier quality and dependence. | Lecture + paper | 57:36-59:29 | https://arxiv.org/abs/2506.18203 | Correlated or below-random verifiers can undermine estimation. |
| P3-C15 | Verification compute can be scaled through candidate count, model size, verifier count, or total inference FLOPs. | Lecture | 60:07-62:12 | https://arxiv.org/abs/2506.18203 | These resources are not interchangeable at a fixed cost. |
| P3-C16 | A distilled small cross-encoder can approximate the weighted ensemble at much lower inference cost in the Weaver experiments. | Lecture + paper | 64:18-66:20 | https://arxiv.org/abs/2506.18203v3, Section 6 and Figure 6 | Current arXiv v3 reports 98.2% retained performance and 99.97% FLOP savings; the recorded lecture states earlier rounded figures. |
| P3-C17 | Better pass@1 is desirable, but excessive sharpening may reduce useful solution diversity. | Lecture hypothesis | 70:33-71:44 | N/A | This is a research concern raised in Q&A, not a demonstrated result of the four papers. |

## Exact caveats and limitations

### Cross-cutting

1. **Coverage is not reliability.** Oracle pass@k asks whether any candidate is correct. A real system must select one without oracle labels.
2. **Verifier scaling can reverse.** More candidates increase both the chance of a correct answer and the chance of an extreme verifier false positive.
3. **No verifier creates missing solutions.** If the generator produces no correct candidate, reranking cannot recover one.
4. **Reasoning benchmarks dominate the evidence.** Most reported experiments are math/reasoning tasks with checkable final answers. Transfer to open-ended writing, policy, or social judgment is not established.
5. **A reward model is not a truth oracle.** It encodes training data, annotation policy, model biases, calibration errors, and distribution shift.

### Training Verifiers to Solve Math Word Problems

1. Verification was not beneficial at low verifier-data sizes in the paper's experiments; the authors attribute this to overfitting before learning general properties of correct reasoning.
2. Generator fine-tuning can collapse solution diversity and become overconfident; the study separates generator and verifier partly to limit this.
3. The headline results use GSM8K and 2021-era model families. They should not be generalized into a fixed modern sizing law.
4. The lecture's approximately 400-candidate peak is an observed curve, not a recommended global sample budget.

### Let's Verify Step by Step

1. PRM and ORM training sets are not directly comparable: active learning biases the PRM set toward informative mistakes, and step labels have different annotation cost from outcome labels.
2. Final-answer grading can label spurious reasoning as correct, especially on MATH; this makes some outcome-supervision baselines unusually vulnerable to false positives.
3. The OOD evaluation is a small collection of STEM exam questions, so "generalizes well" should be read as moderate transfer within nearby reasoning domains.
4. Test contamination cannot be ruled out completely, despite filtering and fresh-test checks.
5. The paper explicitly says it is unknown how broadly the process-supervision result generalizes beyond math.
6. Human step labels encode an endorsed process and may penalize valid shortcuts or alternative reasoning styles.

### Math-Shepherd

1. Automatic labels require N continuation rollouts per step; larger N improves estimates but consumes substantial compute.
2. Rare valid paths and very hard problems may receive no positive rollout signal.
3. A wrong step can receive a positive label if subsequent sampling reaches the right final answer.
4. The paper explicitly states that automatic process annotations contain noise and that their impact on PRM performance remains incompletely determined.
5. PPO against the PRM can optimize the verifier's preferences rather than underlying correctness if the reward is misspecified.

### Weaver

1. Weak-supervision estimation depends on verifier quality and error structure. The paper notes a common assumption that a majority of verifiers are better than random; poor verifiers must be filtered.
2. Score normalization and binarization are consequential design choices, not neutral preprocessing.
3. Weaver struggles on very hard datasets when the generator produces too few correct candidates.
4. LM judges can exhibit position, verbosity, and self-enhancement biases; fixed prompts leave prompt optimization as future work.
5. The strongest results are averages over the paper's selected reasoning/math benchmarks and verifier pool; they are not evidence of universal superiority over frontier models.
6. **Version drift:** the video records an earlier paper state and cites rounded figures such as roughly 97% retained accuracy and 99%+ compute savings. Section 6 and Figure 6 of the version reviewed here, arXiv v3 (updated 2026-08-06), report 98.2% retained Weaver performance and 99.97% FLOP savings; Table 1 reports 87.7% average accuracy for the Weaver 70B-verifier setup. Future slides should cite the paper version next to any exact number: https://arxiv.org/abs/2506.18203v3.

## Visual cue log

| Timestamp | Observed visual | Teaching use / caution |
|---|---|---|
| 00:58 | Four-paper lecture agenda | Establish chronology; schedule order differs. |
| 03:23 | Verifier outputs probability of solution correctness | Define verifier output as a score, not truth. |
| 04:58 | Three-stage generator/sample-label/verifier diagram | Core outcome-verifier pipeline. |
| 09:54 | Token-colored verifier examples with predicted and actual labels | Show local confidence can fluctuate before a final score. |
| 11:34 | Verification versus fine-tuning curves for 6B/175B | Read as historical, dataset-specific scaling evidence. |
| 13:07 | Generator/verifier size ablation | Do not turn one ablation into a universal allocation rule. |
| 14:24 | Test solve rate peaks then declines with candidate count | Strong visual for selection failure at large N. |
| 21:21 | Transition to process supervision | The frame is partly obscured; use transcript for title. |
| 22:39 | ORM versus PRM methodology transition | Frame is classroom camera; use later readable result slides. |
| 26:11 | PRM800K discussion | Frame partly obscured; paper confirms 800K step labels. |
| 29:22 | PRM versus ORM result curve | PRM advantage grows with N in the paper's setting. |
| 31:04 | OOD STEM result table | Small domain-adjacent evaluation, not universal transfer. |
| 37:51 | Math-Shepherd transition | Frame partly obscured; transcript provides exact title. |
| 39:03 | Hard and soft automatic annotation formulas | Primary diagram for rollout labels. |
| 44:49 | Shepherd versus self-consistency/ORM/PRM800K curves | Comparison is tied to listed models and benchmarks. |
| 46:29 | PPO results table | Distinguish greedy RL result from reranking result. |
| 51:51 | Weaver paper transition | Slide shows the fourth-paper title. |
| 53:48 | Weighted versus naive verifier ensemble bars | Adding verifiers without weighting is not monotonic. |
| 55:43 | "Score, Weight, Select" pipeline | Best visual summary of Weaver. |
| 57:36 | Weak-supervision setup | Motivates assumptions and minimal labels. |
| 59:29 | Naive ensemble versus Weaver bars | Dataset-specific deltas; avoid averaging without source version. |
| 1:00:07 | Four verification-compute scaling axes | Useful system-design checklist. |
| 1:02:12 | Success versus repeated generations | Separates oracle, Weaver, naive ensemble, voting, MAV. |
| 1:04:18 | Weaver distillation, 70B ensemble to 400M model | Training cost remains; inference is compressed. |
| 1:05:54 | Accuracy-compute trade-off plots | Exact values differ from current arXiv v3. |
| 1:06:37 | Four-paper recap | Close on progression, not a winner-take-all method ranking. |

## Glossary

- **Candidate / completion:** One generated answer or solution trajectory.
- **Coverage / pass@k:** Probability that at least one of k candidates is correct; usually requires oracle knowledge to measure.
- **Selected-answer accuracy:** Accuracy of the one answer returned after a real selector ranks candidates.
- **Generation-verification gap:** Difference between what a generator can produce somewhere in a candidate set and what a practical verifier can identify.
- **Verifier:** A model or executable procedure that scores candidate correctness or quality.
- **Reward model (RM):** A learned model that maps an output or trajectory to a scalar reward.
- **Outcome reward model (ORM):** Scores a complete solution, commonly using final correctness.
- **Process reward model (PRM):** Scores intermediate reasoning steps or prefixes.
- **Credit assignment:** Determining which decisions or steps caused success or failure.
- **Self-consistency / majority voting:** Generate multiple answers and return the most frequent final answer without a learned verifier.
- **Reranking:** Ordering generated candidates by a verifier score and returning the top candidate.
- **Active learning:** Select the most informative samples for annotation instead of labeling uniformly.
- **Rollout:** Continue generation from a partial trajectory to estimate its future success.
- **Hard rollout label:** Positive when at least one sampled continuation succeeds.
- **Soft rollout label:** Fraction of sampled continuations that succeed.
- **Weak verifier:** An imperfect verifier whose output correlates with correctness.
- **Weak supervision:** Statistical aggregation of noisy labeling sources to estimate latent labels or source reliability.
- **LM judge:** A language model prompted to assess another model's response.
- **Distillation:** Train a smaller model to approximate a larger model or ensemble.
- **Distribution shift:** Difference between verifier training data and deployment data.
- **Reward hacking:** Optimizing the proxy reward while violating the intended objective.

## Teaching questions

1. Why can pass@k rise while selected-answer accuracy falls?
2. Construct a toy example where adding candidates makes the maximum verifier score less reliable.
3. When would fine-tuning the generator be preferable to keeping a separate verifier?
4. What information does a process label contain that a final-answer label does not?
5. Give a valid reasoning shortcut that a rigid step-level rubric might incorrectly penalize.
6. Why is annotation-count matching insufficient for a fair ORM-versus-PRM cost comparison?
7. Derive hard and soft rollout labels for a prefix with five continuations, two of which succeed.
8. How can a wrong intermediate step receive a positive automatic process label?
9. Which is more damaging for a verifier: independent random error or correlated systematic error? Why?
10. What development labels does Weaver still need, despite being described as weakly supervised?
11. How would you allocate a fixed inference budget across generator size, candidate count, and verifier count?
12. Design an evaluation that reports both oracle coverage and deployable selected-answer accuracy.
13. What evidence would be needed before claiming a math-trained PRM generalizes to student essay grading?
14. How could optimizing a generator against a PRM lead to reward hacking?
15. When does distillation reduce serving cost without reducing total training cost?
16. Propose a verifier ensemble where every component shares the same blind spot. What would weighting accomplish?
17. How would you detect that a verifier's confidence is uncalibrated under distribution shift?
18. Which claim in this lecture is most likely to age poorly, and what source/version should future teaching material record?
