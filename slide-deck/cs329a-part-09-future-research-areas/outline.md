# Slide Deck Outline

**Topic**: Stanford CS329A Part 9 - Future Research Areas
**Style**: intuition-machine
**Dimensions**: paper + cool technical + geometric + balanced
**Audience**: learners
**Language**: English
**Slide Count**: 12 slides
**Generated**: 2026-08-29

---

<STYLE_INSTRUCTIONS>
Academic technical briefing on aged paper with crisp original vector diagrams. Background #F5F0E6; paper #FFFCF4; near-black type; cobalt proposals; teal verification; warm brown compute; maroon constraints; red risk. Faint engineering grid, 8px corners, no gradients, logos, course frames, or copied figures.
</STYLE_INSTRUCTIONS>

Rules: distinguish observed lecture content, primary-paper claims, and teaching synthesis. Keep "zero data" bounded to the self-play task loop. Treat diversity metrics as proxies. Treat IPW results as versioned and workload-specific.

---

## Slide 1 of 12
**Filename**: 01-slide-self-improvement-stack.png
**Headline**: The Self-Improvement Stack
**Body**: Diversity; verification; curriculum; adaptation; infrastructure.
**Visual**: Five monitored layers around an agent feedback loop.
**Evidence**: Lecture `00:00-06:51`, `65:23-67:42`

---

## Slide 2 of 12
**Filename**: 02-slide-diversity-collapse.png
**Headline**: Why One Model Collapses Diversity
**Body**: Repeated self-training can narrow generated reasoning in the evaluated settings.
**Visual**: Many solution paths converge into one repeated trace over rounds.
**Evidence**: Lecture `06:51-09:55`; Multiagent Finetuning v2

---

## Slide 3 of 12
**Filename**: 03-slide-specialized-roles.png
**Headline**: Specialize Generators and Critics
**Body**: Independent role updates preserve a society of different solution strategies.
**Visual**: Generator and critic roles debate, summarize, and vote.
**Evidence**: Lecture `09:55-12:37`; Multiagent Finetuning v2

---

## Slide 4 of 12
**Filename**: 04-slide-diversity-metrics.png
**Headline**: Measure Diversity, Not Just Accuracy
**Body**: Later learning needs useful variation, but likelihood and embedding diversity are only proxies.
**Visual**: Accuracy curve paired with proxy-diversity curves and a caveat wall.
**Evidence**: Lecture `12:37-14:47`; Multiagent Finetuning v2

---

## Slide 5 of 12
**Filename**: 05-slide-invalid-proof.png
**Headline**: Correct Answer, Invalid Proof
**Body**: Outcome correctness cannot certify the reasoning path.
**Visual**: A correct endpoint reached through a visibly broken intermediate step.
**Evidence**: Lecture `14:47-18:03`; DeepSeekMath-V2 v1

---

## Slide 6 of 12
**Filename**: 06-slide-meta-verification.png
**Headline**: Verifier and Meta-Verifier
**Body**: Check proofs, then check the feedback that judged those proofs.
**Visual**: Generator -> verifier -> meta-verifier -> hard-example loop.
**Evidence**: Lecture `18:03-22:35`; DeepSeekMath-V2 v1

---

## Slide 7 of 12
**Filename**: 07-slide-proposer-solver.png
**Headline**: Let the Model Propose Tasks
**Body**: Absolute Zero joins proposer and solver without an external task dataset.
**Visual**: One pretrained model with propose and solve roles connected to a code executor.
**Evidence**: Lecture `22:35-25:45`; Absolute Zero v3

---

## Slide 8 of 12
**Filename**: 08-slide-learnable-curriculum.png
**Headline**: Build a Learnable Curriculum
**Body**: Valid, intermediate-difficulty tasks feed an evolving buffer.
**Visual**: Curriculum frontier between trivial and impossible with deduction, abduction, induction.
**Evidence**: Lecture `25:45-33:07`; Absolute Zero v3

---

## Slide 9 of 12
**Filename**: 09-slide-verification-boundary.png
**Headline**: Verification Is the Boundary
**Body**: Cheap objective feedback shrinks from code to science to creative judgment.
**Visual**: Verifiability spectrum with cost and ambiguity rising together.
**Evidence**: Lecture `33:07-39:59`; discussion

---

## Slide 10 of 12
**Filename**: 10-slide-intelligence-per-watt.png
**Headline**: Intelligence per Watt
**Body**: Accuracy divided by power; results remain workload-, hardware-, and version-specific.
**Visual**: Metric fraction plus current-v5 scope and result cards.
**Evidence**: Lecture `39:59-51:53`; Intelligence per Watt v5

---

## Slide 11 of 12
**Filename**: 11-slide-local-cloud-router.png
**Headline**: Local, Cloud, or Hybrid?
**Body**: Route by capability, privacy, latency, energy, and cost.
**Visual**: Query router sends workloads to local, cloud, or abstain paths.
**Evidence**: Lecture `48:51-57:00`; IPW v5 + synthesis

---

## Slide 12 of 12
**Filename**: 12-slide-research-agenda.png
**Headline**: The Research Agenda
**Body**: Different experience; trustworthy feedback; learnable tasks; durable adaptation; efficient delivery.
**Visual**: Five-question audit surrounding a bounded improvement loop.
**Evidence**: Lecture `51:53-67:42`; whole-lecture synthesis
