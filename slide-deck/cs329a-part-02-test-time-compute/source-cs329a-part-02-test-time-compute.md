# Stanford CS329A Part 2: Test-Time Compute Scaling

Primary source: [Stanford CS329A Self-Improving AI Agents | Part 2 | Test-Time Compute Scaling](https://www.youtube.com/watch?v=-Ggc37xLj_Y)

- Course: Stanford CS329A, Self-Improving AI Agents
- Video duration: 1:03:20
- Evidence collected: complete manual-caption transcript plus 22 inspected frames at conceptual transitions
- Scope: repeated sampling, inference scaling laws, verification, compute-optimal search, and inference architecture search

## Core Thesis

More inference compute can increase the chance that a system generates a good solution. It does not by itself make the returned answer more reliable. Reliability depends on how the budget is allocated and how candidates are verified or selected.

```text
fixed model + inference budget
            |
            v
 generate / revise / search
            |
            v
 candidate coverage
            |
      verifier or selector
            |
            v
 returned-answer reliability
```

## Lecture Map

### 1. Repeated Sampling and Coverage (01:11-05:27)

The lecture starts with the simplest test-time scaling strategy: sample many independent-looking attempts from a fixed model. Coverage asks whether at least one candidate solves the problem.

For a problem with single-attempt success probability `p`, the idealized independent-attempt calculation is:

```text
pass@k = 1 - (1 - p)^k
```

The Large Language Monkeys paper observes coverage gains over large sample ranges on selected reasoning, coding, and formal-verification tasks. The important metric qualification is that oracle coverage is not the same as a deployable system choosing the correct candidate.

### 2. Why Aggregate Scaling Can Look Like a Power Law (05:27-12:20)

Each fixed problem has an exponential failure curve under the independence model. A benchmark average can still exhibit an approximate power law because the problem set contains a heavy tail of extremely difficult problems with very low single-attempt success probability.

This distributional explanation matters because it turns an empirical curve into a forecastable object. It does not imply every individual problem follows a power law.

### 3. The Generation-Verification Gap (12:20-26:55)

Repeated sampling is operationally useful only when the system can identify success. Verification varies by domain:

- code can often execute specified tests that reject candidates violating those checks;
- formalized proofs can be checked by a proof assistant;
- mathematics may use exact answers or formal rules;
- open-ended writing and science often require incomplete reward models or expensive human judgment.

Majority voting and learned reward models can plateau as the sample budget grows. More candidates can amplify selector failure when the verifier is weak.

### 4. Parallel Sampling Versus Sequential Revision (26:55-37:58)

The lecture compares two ways to spend a fixed test-time budget:

- **parallel sampling**: generate multiple stochastic candidate solutions, often with correlated failures;
- **sequential revision**: improve one or more candidates using feedback over several steps.

It also distinguishes:

- **outcome reward models (ORMs)**, which score final answers;
- **process reward models (PRMs)**, which score intermediate reasoning steps.

Beam search can use a process reward model to retain promising branches. The experiments discussed in the lecture find that the best mix depends on estimated problem difficulty and the model-task setup.

### 5. Compute-Optimal Allocation (34:40-45:47)

The Snell et al. study estimates problem difficulty from the base model's success rate and allocates compute adaptively. In its experimental setup, different difficulty bands favor different search strategies, and a compute-optimal policy is more efficient than a uniform best-of-N baseline.

The paper also compares test-time and pretraining compute under FLOPs-matched conditions. This comparison is not a universal economic result: pretraining cost is amortized across requests, while test-time compute is paid again for each task.

### 6. Inference Architectures and Archon (45:47-63:00)

Archon treats inference-time design as an architecture-search problem. Inputs include target benchmarks, a compute or token budget, available models, and operators. Operators can include:

- generators;
- fusers;
- critics;
- rankers;
- verifiers;
- unit-test generators and evaluators.

A search procedure finds compositions tailored to the target benchmark and budget. The course video and the inspected arXiv revision use different headline result framing. This deck therefore teaches the architecture-search mechanism and does not use a single headline percentage as a general claim.

## Durable Mental Model

Test-time scaling has four separable questions:

1. **Candidate production:** How are alternatives generated?
2. **Budget allocation:** Which problems and branches receive more compute?
3. **Verification:** What evidence distinguishes success from persuasive error?
4. **Stopping:** When is another sample or revision no longer worth its cost?

The bottleneck can move. More generation helps until verification, correlation, latency, or cost becomes dominant.

## Key Terms

- **Test-time compute:** computation spent while solving a particular request with fixed model weights.
- **Repeated sampling:** generating multiple candidates from the same model and prompt.
- **Coverage / pass@k:** whether any of `k` candidates is correct.
- **Returned-answer reliability:** whether the deployed selector returns a correct answer.
- **Oracle verifier:** an evaluation device that knows which candidate is correct; useful for measurement but often unavailable in deployment.
- **Outcome reward model:** a learned scorer for final answers.
- **Process reward model:** a learned scorer for intermediate reasoning steps.
- **Parallel search:** spending compute across multiple candidates.
- **Sequential revision:** spending compute improving a candidate over multiple steps.
- **Compute-optimal policy:** a policy that allocates a fixed budget according to problem difficulty and expected marginal benefit.
- **Inference operator:** a modular generation, scoring, fusion, critique, or verification component.
- **Inference architecture:** an organized composition of models and inference operators.

## Primary References

- [Official course website](https://cs329a.stanford.edu/)
- [Official lecture video](https://www.youtube.com/watch?v=-Ggc37xLj_Y)
- Bradley Brown et al., [Large Language Monkeys: Scaling Inference Compute with Repeated Sampling](https://arxiv.org/abs/2407.21787)
- Charlie Snell et al., [Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters](https://arxiv.org/abs/2408.03314)
- Jon Saad-Falcon et al., [Archon: An Architecture Search Framework for Inference-Time Techniques](https://arxiv.org/abs/2409.15254)
- Rylan Schaeffer et al., [How Do Large Language Monkeys Get Their Power (Laws)?](https://arxiv.org/abs/2502.17578)
- [Archon official implementation](https://github.com/ScalingIntelligence/Archon)
