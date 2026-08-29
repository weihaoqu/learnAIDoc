# CS329A Part 9 Evidence Report: Future Research Areas

## Source Record

- Official video: [Stanford CS329A Self-Improving AI Agents | Part 9 | Future Research Areas](https://www.youtube.com/watch?v=AyO6wyu4DEg)
- Video ID: `AyO6wyu4DEg`
- Duration: `1:07:42`
- Course: [Stanford CS329A: Self-Improving AI Agents, Autumn 2025](https://cs329a.stanford.edu/)
- Method: full native-caption transcript read from beginning to end, followed by targeted inspection of 25 visual cues.
- Transcript completeness: captions span the full recording. Some questions are faint, but the instructors' answers and the full prepared lecture are intelligible.
- Official schedule mapping: "Future Research Areas." The official schedule does not list assigned papers for this session; the four primary works below are identified directly from the lecture sections and verified at their first-party paper records.

Evidence hierarchy: primary papers govern empirical claims; the lecture governs the chosen future-directions narrative; inspected frames govern visual descriptions. The final synthesis links the four works but is an instructional interpretation.

## Primary Works Discussed

1. Vighnesh Subramaniam, Yilun Du, Joshua B. Tenenbaum, Antonio Torralba, Shuang Li, and Igor Mordatch, [Multiagent Finetuning: Self Improvement with Diverse Reasoning Chains](https://arxiv.org/abs/2501.05707), ICLR 2025. Official [project page](https://llm-multiagent-ft.github.io/).
2. Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, et al., [DeepSeekMath-V2: Towards Self-Verifiable Mathematical Reasoning](https://arxiv.org/abs/2511.22570), 2025.
3. Andrew Zhao, Daniel Huang, Quentin Xu, Matthieu Lin, Yong-Jin Liu, et al., [Absolute Zero: Reinforced Self-play Reasoning with Zero Data](https://arxiv.org/abs/2505.03335), NeurIPS 2025.
4. Jon Saad-Falcon, Avanika Narayan, Hakki Orhun Akengin, J. Wes Griffin, Herumb Shandilya, et al., [Intelligence per Watt: Measuring Intelligence Efficiency of Local AI](https://arxiv.org/abs/2511.07885), 2025.

## Timestamped Conceptual Outline

| Time | Conceptual development |
|---|---|
| `00:00-04:38` | The instructors recap agents as systems that plan, act, receive environmental feedback, and control workflows involving tools, verifiers, critics, and routing. |
| `04:38-06:51` | Four future bottlenecks emerge: maintaining diverse training data, robust verification and meta-verification, self-selected curricula, and intelligence efficiency. |
| `06:51-09:55` | Multiagent Finetuning starts from the observation that iterative self-training with one generator can lose diversity and plateau. |
| `09:55-14:47` | Specialized generators and critics debate, summarize, and vote. The paper reports preserved reasoning-chain diversity and continued gains over more rounds in its evaluated reasoning settings. |
| `14:47-18:03` | DeepSeekMath-V2 argues that a correct final answer is insufficient for mathematical proof: local reasoning steps also need scrutiny. |
| `18:03-22:35` | A verifier finds and scores proof issues; a meta-verifier checks the verifier; generator and verifier improve iteratively through scaled verification. |
| `22:35-25:45` | Absolute Zero removes an external task dataset from the loop: one model proposes program-grounded tasks and also learns to solve them. |
| `25:45-29:16` | Deduction, abduction, and induction define task families. Executable checks supply correctness signals. |
| `29:16-33:07` | Learnability reward favors tasks that are valid and neither trivial nor impossible; a growing buffer creates an evolving curriculum. |
| `33:07-39:59` | Discussion tests the boundary of verification in science, design, chip simulation, and creativity. Learned rewards are possible but vulnerable to error and reward hacking. |
| `39:59-42:03` | Intelligence per Watt reframes progress around capability delivered per unit of power, motivated by rapidly growing inference demand. |
| `42:03-48:51` | The study benchmarks more than 20 local models on eight accelerators and defines intelligence per watt as average task accuracy divided by average power draw. |
| `48:51-51:53` | Study results suggest many selected single-turn queries can be handled locally and that local intelligence efficiency improved rapidly from 2023 to 2025, while cloud accelerators remain more efficient per query in reported comparisons. |
| `51:53-58:41` | Future systems connect pretraining, online/continual learning, and test-time experience; they need low-latency infrastructure, local/cloud routing, efficient kernels, and more granular metrics. |
| `58:41-65:23` | Q&A contrasts memory/context updates with weight updates: memory is convenient for facts, while learned skills may require parameter adaptation. Environment quality matters more than who generated the task. |
| `65:23-67:42` | The course closes by returning to self-improvement as a system problem spanning learning algorithms, verification, environments, and infrastructure. |

## 12-Slide Teaching Narrative

| Slide | Title | Teaching job | Evidence anchor | Visual concept |
|---:|---|---|---|---|
| 1 | The Self-Improvement Stack | Recap the agent loop and locate four bottlenecks. | `00:00-06:51` | Layered loop: data, generator, verifier, environment, hardware. |
| 2 | Why One Model Collapses Diversity | Explain self-training homogenization and plateau risk. | `06:51-09:55`; Multiagent Finetuning | Many initial paths narrowing to one repeated pattern. |
| 3 | Specialize Generators and Critics | Show multiagent debate, summarization, and voting. | `09:55-12:37`; Multiagent Finetuning | Agent roles connected over rounds. |
| 4 | Measure Diversity, Not Just Accuracy | Explain why preserved reasoning variation can support later learning. | `12:37-14:47` | Accuracy curve paired with diversity curves. |
| 5 | Correct Answer, Invalid Proof | Separate outcome verification from process verification. | `14:47-18:03`; DeepSeekMath-V2 | Correct endpoint with a broken intermediate step. |
| 6 | Verifier and Meta-Verifier | Teach the recursive trust problem and iterative training cycle. | `18:03-22:35`; DeepSeekMath-V2 | Generator -> verifier -> meta-verifier loop. |
| 7 | Let the Model Propose Tasks | Introduce proposer-solver self-play without an external problem set. | `22:35-25:45`; Absolute Zero | One model with propose and solve heads. |
| 8 | Build a Learnable Curriculum | Explain task families, executable checks, difficulty reward, and buffer dynamics. | `25:45-33:07`; Absolute Zero | Curriculum frontier between trivial and impossible. |
| 9 | Verification Is the Boundary | Test transfer to experiments, simulations, writing, and creativity. | `33:07-39:59` | Verifiability spectrum from unit test to subjective judgment. |
| 10 | Intelligence per Watt | Define accuracy divided by power draw and clarify its study scope. | `39:59-48:51`; Intelligence per Watt | Accuracy/power fraction beside hardware stack. |
| 11 | Local, Cloud, or Hybrid? | Show routing as a systems optimization, not an ideological choice. | `48:51-57:00` | Router sends queries by capability, privacy, latency, and energy. |
| 12 | The Research Agenda | Unite diversity, verification, curriculum, continual learning, and infrastructure. | `51:53-67:42` | Closed improvement loop with five monitored constraints. |

## Claim-Evidence Ledger

| ID | Claim | Evidence type | Lecture time | Primary source | Calibration |
|---|---|---|---|---|---|
| P9-C01 | Iterative fine-tuning from a single model can reduce reasoning-chain diversity and plateau in the paper's evaluated settings. | Paper-supported | `06:51-09:55` | [Multiagent Finetuning](https://arxiv.org/abs/2501.05707) | Not a claim that every single-model synthetic-data pipeline collapses. |
| P9-C02 | The method assigns specialized generation and critique roles and aggregates multiagent interaction through debate/summarization/voting. | Paper-supported | `09:55-12:37` | [Multiagent Finetuning](https://arxiv.org/abs/2501.05707) | Exact protocol varies by experiment; "agent" means model role in a training workflow. |
| P9-C03 | Multiagent finetuning preserves more measured response diversity over iterative rounds than the compared single-agent baseline. | Paper-supported | `12:37-14:47` | [Multiagent Finetuning](https://arxiv.org/abs/2501.05707) | Diversity metrics are likelihood and embedding based; they are proxies, not semantic completeness. |
| P9-C04 | A mathematically correct final answer can accompany invalid intermediate reasoning. | Lecture + paper premise | `14:47-18:03` | [DeepSeekMath-V2](https://arxiv.org/abs/2511.22570) | Strongest for proof-style tasks where step validity matters. |
| P9-C05 | DeepSeekMath-V2 trains a verifier to identify proof issues and a meta-verifier to assess verifier feedback. | Paper-supported | `18:03-20:02` | [DeepSeekMath-V2](https://arxiv.org/abs/2511.22570) | A meta-verifier reduces but does not eliminate recursive trust problems. |
| P9-C06 | Generator and verifier are improved iteratively using scaled verification and generated harder proofs. | Paper-supported | `20:02-22:35` | [DeepSeekMath-V2](https://arxiv.org/abs/2511.22570) | Evidence is mathematical and benchmark-specific; transfer to open domains is unknown. |
| P9-C07 | Absolute Zero jointly trains a model to propose and solve tasks without an external task dataset. | Paper-supported | `22:35-25:45` | [Absolute Zero](https://arxiv.org/abs/2505.03335) | "Zero data" means no external task data for this self-play loop, not no pretraining or prior knowledge. |
| P9-C08 | The task space uses executable program-input-output relations for deduction, abduction, and induction. | Paper-supported | `25:45-27:40` | [Absolute Zero](https://arxiv.org/abs/2505.03335) | This structure supplies unusually cheap objective verification. |
| P9-C09 | A learnability reward favors valid tasks of intermediate difficulty rather than trivial or unsolved tasks. | Paper-supported | `27:40-29:50` | [Absolute Zero](https://arxiv.org/abs/2505.03335) | Difficulty is estimated from solver rollouts and can inherit solver bias. |
| P9-C10 | Validated tasks enter buffers that condition future proposals, producing an evolving curriculum. | Paper-supported | `29:50-33:07` | [Absolute Zero](https://arxiv.org/abs/2505.03335) | Curriculum quality depends on validation, buffer policy, and coverage. |
| P9-C11 | Learned reward models can extend feedback beyond executable domains but introduce misspecification and reward-hacking risks. | Lecture interpretation | `33:07-39:59` | Video; papers provide adjacent context | The lecture discusses this as an open direction, not a resolved method. |
| P9-C12 | Intelligence per watt is defined in the study as mean task accuracy divided by mean power draw. | Paper-supported | `42:03-46:27` | [Intelligence per Watt](https://arxiv.org/abs/2511.07885) | A benchmark metric; results depend on task mix, model, hardware, and measurement setup. |
| P9-C13 | The study evaluates more than 20 local models, eight accelerators, and about one million single-turn chat/reasoning queries. | Paper-supported | `42:03-48:00` | [Intelligence per Watt](https://arxiv.org/abs/2511.07885) | Scope excludes many long-horizon, multimodal, and tool-using workloads. |
| P9-C14 | Under the study's routing and accuracy-threshold setup, selected local systems met the benchmark criterion for 88.7% of its query distribution. | Paper-supported | `48:00-49:35` | [Intelligence per Watt](https://arxiv.org/abs/2511.07885) | Not 88.7% of all user requests; the value depends on the sampled distribution, threshold, models, and routing assumptions. |
| P9-C15 | The paper reports a 5.3x improvement in local intelligence per watt from 2023 to 2025. | Paper-supported | `48:51-50:35` | [Intelligence per Watt](https://arxiv.org/abs/2511.07885) | Historical study result, not a guaranteed future trend. |
| P9-C16 | Reported cloud accelerators remain about 1.4-7.4x more energy-efficient per query in direct comparisons, despite local-system gains. | Paper-supported | `49:35-51:20` | [Intelligence per Watt](https://arxiv.org/abs/2511.07885) | Hardware/workload-specific; total-system and network energy boundaries matter. |
| P9-C17 | The study's measurements motivate evaluating hybrid local/cloud routing because models and hardware differ by capability and energy; privacy and latency add deployment objectives. | Paper + teaching synthesis | `48:51-57:00` | [Intelligence per Watt](https://arxiv.org/abs/2511.07885) | Research direction and modeled opportunity, not a demonstrated universal deployment benefit or optimal router. |
| P9-C18 | Future self-improvement research must jointly address diversity, trustworthy verification, curriculum generation, continual learning, and efficient serving. | Teaching synthesis | `51:53-67:42` | All four works | Course-level integration, not a single paper's empirical result. |

## Caveats and Non-Claims

- The official schedule lists no assigned readings for Part 9. The four papers are primary works explicitly named and taught in the video.
- Multiagent role diversity does not guarantee independent errors; agents initialized from similar models may remain highly correlated.
- Embedding dissimilarity and likelihood are partial diversity measures. More variation can also produce more low-quality outputs.
- Verifier performance is itself a learned capability. A meta-verifier moves the trust boundary but cannot create certainty.
- Absolute Zero is not literally learning from nothing: the base model is pretrained, and executable program semantics provide structure and feedback.
- Program-grounded self-play transfers most directly to domains with reliable, cheap validation. Science, social reasoning, and creative work have slower or contested feedback.
- Intelligence-per-watt values are conditional on task distribution, accuracy thresholds, hardware, quantization, power measurement, and system boundary.
- Local inference may improve privacy and latency in some deployments, but local execution alone does not guarantee privacy, security, or lower total energy.
- Teaching synthesis: the four directions form one stack, but the papers do not experimentally evaluate the complete integrated stack.

## Visual Cue Log

| Time | Observed visual | Teaching use or caution |
|---|---|---|
| `02:30` | Agent diagram shows human, LLM call, environment, action, feedback, and stop. | Good recap; do not imply all agents have this exact topology. |
| `03:34` | Workflow slide lists prompt chaining, routing, parallelization, orchestrator, judges, and verifiers. | Use to distinguish fixed workflows from adaptive control. |
| `04:57` | Future-loop slide lists train-time generalization, robust/meta verification, and task-selection data barriers. | Core framing cue. |
| `06:51` | Agenda highlights Multiagent Finetuning. | Section divider. |
| `08:47` | Slide describes lost diversity and specialized generator/critic roles. | Strong problem/solution setup; label as paper hypothesis. |
| `11:52` | Multiagent debate diagram shows rounds, summaries, and majority vote. | Redraw roles and information flow. |
| `12:37` | Diversity plots compare multiagent and single-agent fine-tuning over iterations. | Explain proxy metrics and axes before conclusions. |
| `14:47` | Agenda highlights DeepSeekMath-V2. | Section divider. |
| `17:07` | Training-verifiable-reasoning slide separates issue identification, proof validity, and verification effort. | Useful process-vs-answer distinction. |
| `18:03` | Architecture slide names verifier, meta-verifier, generator, and their cycle. | Best recursive-verification visual. |
| `20:02` | Evaluation slide lists GRPO, iterative optimization, and math-proof benchmarks. | Shows empirical scope; avoid generic-domain claims. |
| `23:14` | Agenda highlights Absolute Zero. | Section divider. |
| `24:30` | Proposer-solver diagram shows one model proposing and solving with environmental feedback. | Core self-play visual. |
| `25:45` | Pipeline diagram shows deduction, abduction, induction, learnability and accuracy rewards. | Best mechanism visual; redraw. |
| `27:07` | Learnability-reward slide favors moderately difficult tasks. | Use a difficulty curve rather than formula unless sourced exactly. |
| `29:16` | Validation/buffer slide lists execution, safety, determinism, seed triplet, and evolving buffers. | Important guardrail cue; note that filters are not complete safety proofs. |
| `33:13` | Self-improvement-loop recap returns to generalization, verification, and task selection. | Transition to boundary discussion. |
| `40:28` | Intelligence per Watt title slide and author list. | Section divider and provenance. |
| `42:03` | Demand slide claims rapidly rising cloud token processing and infrastructure requirements. | Motivation only; avoid repeating uncited forecast numbers from the slide. |
| `45:50` | Question slide asks how local inference can redistribute demand. | Good transition from problem to metric. |
| `46:27` | Metric slide defines mean task accuracy divided by mean power draw. | Core equation; preserve measurement caveat. |
| `48:51` | Results slide shows 88.7%, 3.1x accuracy gain, and 5.3x intelligence-efficiency gain. | Cite the paper and its 2023-2025 study scope. |
| `51:58` | Research-directions slide links pretraining, continual/online learning, and test time. | Good systems synthesis. |
| `52:25` | Same research-directions slide remains on screen. | Duplicate cue; no additional evidence. |
| `57:00` | Final efficiency slide calls for serving engines, co-designed architectures/kernels, and granular metrics. | Closing research agenda, not demonstrated results. |

## Glossary

- **Self-improvement loop:** repeated generation, feedback, selection, and learning that changes future performance.
- **Reasoning-chain diversity:** variation among solution paths, measured here through likelihood- and embedding-based proxies.
- **Generator agent:** role that proposes candidate solutions or reasoning chains.
- **Critic agent:** role that evaluates or revises generated candidates.
- **Multiagent debate:** iterative exchange in which model roles inspect others' responses before aggregation.
- **Process verification:** checking intermediate reasoning steps rather than only a final answer.
- **Verifier:** model or mechanism that identifies errors and scores a candidate.
- **Meta-verifier:** mechanism that evaluates the verifier's own feedback.
- **Proposer-solver:** model that both creates training tasks and attempts to solve them.
- **Deduction:** infer output from program and input in Absolute Zero's task construction.
- **Abduction:** infer an input given a program and output.
- **Induction:** infer a program or relation from examples.
- **Learnability reward:** reward that favors tasks yielding useful learning signal, often at intermediate difficulty.
- **Curriculum buffer:** retained tasks used to condition or sample future training challenges.
- **Reward hacking:** optimizing a proxy signal in a way that violates the intended objective.
- **Intelligence per watt:** study metric dividing average task accuracy by average power draw.
- **Hybrid routing:** deciding whether a query should run on local or cloud models based on system objectives.
- **Continual learning:** updating a system from experience after initial training, through memory, weights, or both.

## Teaching Questions

1. Why might a single-model synthetic-data loop become less diverse over rounds?
2. When does multiagent debate add information, and when might it amplify correlated errors?
3. Is embedding dissimilarity sufficient evidence of meaningfully different reasoning?
4. Give an example of a correct final answer supported by an invalid proof step.
5. Who verifies the meta-verifier, and what practical stopping rule could avoid infinite regress?
6. Why does "zero data" in Absolute Zero not mean zero prior knowledge?
7. What makes a proposed task learnable rather than merely difficult?
8. How could a curriculum buffer narrow instead of expand task coverage?
9. Place unit-tested coding, theorem proving, scientific experimentation, and creative writing on a verifiability spectrum.
10. What workload and system-boundary choices can change intelligence-per-watt rankings?
11. Design a local/cloud router that balances privacy, latency, accuracy, and energy. Which objective conflicts are unavoidable?
12. Which two research directions should be integrated first, and what experiment would falsify your proposed benefit?

## Teaching Synthesis

Interpretation: Part 9 treats self-improvement as a coupled systems problem. Diverse generators are useless without selectors; selectors are dangerous without verification; verification cannot drive open-ended learning without suitable tasks; and all of this is constrained by serving cost and energy. The strongest research program therefore co-designs the data flywheel, verifier hierarchy, curriculum, continual-learning mechanism, and deployment infrastructure, while measuring where each component fails rather than assuming a closed loop will improve itself indefinitely.
