# Teaching Guide: CS329A Part 2 - Test-Time Compute Scaling

Use this guide with the 12-slide deck. The goal is not to memorize benchmark numbers. It is to learn how to audit any claim that “more thinking” or “more inference” improves an agent.

## Slide 1: Options Are Not Guarantees

Test-time compute operates after training. More attempts can expose capability that a one-shot answer misses, but a deployed system still needs to identify the useful attempt.

**Checkpoint:** If one of 100 candidates is correct but the system returns a wrong one, what improved and what did not?

## Slide 2: Three Compute Frontiers

Pretraining changes the model's broad capability. Post-training changes behavior and response preferences. Test-time scaling keeps weights fixed and spends compute on the current task.

**Why this matters:** test-time cost recurs for every request, while training cost can be amortized over many requests.

## Slide 3: Repeated Sampling

Repeated sampling is the simplest test-time strategy. It generates several candidates under stochastic decoding. An oracle verifier can measure whether any is right, but that does not mean a real system can select it.

**Challenge:** What kinds of tasks give you a real oracle-like verifier?

## Slide 4: Coverage Versus Reliability

Coverage is a property of the candidate set. Returned-answer reliability is a property of the entire deployed pipeline, including the selector. This distinction prevents a common benchmark-to-product mistake.

## Slide 5: The Per-Problem Formula

For independent attempts with constant success probability `p`, failure after `k` attempts is `(1-p)^k`, so coverage is `1-(1-p)^k`.

**Challenge:** Why might two samples from the same model fail in correlated ways?

## Slide 6: Heavy-Tailed Difficulty

Each individual problem can have exponential failure decay while a benchmark average looks power-law scaled. The reason is a long tail of problems with tiny single-attempt success probabilities.

**Mental model:** easy problems disappear from the failure pool quickly; very hard problems dominate what remains.

## Slide 7: The Verification Gap

Executable tests can cheaply reject candidates that violate specified checks; they do not prove general correctness. Proof assistants can check formalized proofs. Open-ended writing, policy, and scientific claims lack complete executable checks. Learned selectors can become the bottleneck and may plateau.

**Prompt for Q:** In your university work, which outputs can be verified mechanically and which still require teacher judgment?

## Slide 8: Breadth Versus Depth

Parallel sampling spends budget on multiple stochastic candidates, whose failures can remain correlated. Sequential revision spends budget following and repairing a path. The right balance depends on model quality, feedback quality, and task difficulty.

## Slide 9: Outcome and Process Reward Models

An outcome reward model scores the final answer. A process reward model scores intermediate steps, enabling pruning or beam search. Both are learned evaluators; both can reward the wrong thing or fail out of distribution.

## Slide 10: Difficulty-Aware Routing

Compute-optimal allocation means estimating which strategy offers the highest marginal gain for this problem under this budget. It does not mean one universal routing policy has been discovered.

**Checkpoint:** Why might an extremely hard problem receive less test-time compute rather than more in the studied setup?

## Slide 11: Archon

Archon raises the unit of optimization from one answer to an inference architecture. A search process composes available models with generators, fusers, critics, rankers, verifiers, and test operators for a target benchmark and budget.

**Caveat:** benchmark-specific architecture search can overfit the benchmark or available operator set.

## Slide 12: The Four-Question Diagnostic

Before accepting a test-time scaling claim, ask:

1. What creates candidate diversity?
2. How is the finite budget allocated?
3. What evidence verifies success?
4. What stopping rule controls cost and latency?

Bridge to Part 3: robust verification matters because generation gains become usable only when the system can recognize success reliably.

## Short Homework

Choose one task from university teaching, research writing, or coding. Design two systems with the same token budget:

- System A uses parallel sampling.
- System B uses sequential revision.

For each system, specify its candidate generator, verifier, stopping rule, expected failure correlation, and privacy cost. Conclude which system you would deploy and what evidence would change your decision.
