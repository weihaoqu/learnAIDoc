# Teaching Guide: CS329A Lecture 1

Use this guide with the generated 12-slide deck. Teach one slide at a time and ask the checkpoint before advancing when a question is present.

## Slide 1: A Reliable Agent Needs More Than a Strong Model

**Objective:** State the lecture's central problem in one sentence.

Explain that generation and reliability are different system properties. A model may contain useful capability but fail to expose it consistently. An agent needs a loop that can test actions and recover.

**Prompt for Q:** What part of the loop turns a plausible answer into a trustworthy action?

## Slide 2: One Way to Organize AI Progress: Four Compute Frontiers

**Objective:** Distinguish where improvement can occur.

Present this four-frontier structure explicitly as the deck's synthesis of the lecture. Walk through pretraining, post-training, test-time computation, and agent orchestration. Emphasize that these layers complement rather than replace one another.

## Slide 3: Scaling Expanded Capability, but Emergence Is Not a Free Pass

**Objective:** Explain the historical scaling argument without treating emergence as settled.

Scaling lowered test loss and exposed few-shot and chain-of-thought benchmark behavior. Modern reasoning models, however, are also deliberately trained to reason and self-correct.

**Challenge:** If a behavior appears only in a larger model, does that prove it was not present in the training data?

## Slide 4: Post-Training Turns Capability into Assistant Behavior

**Objective:** Separate knowledge acquisition from behavioral steering.

Pretraining develops broad capability. Fine-tuning and instruction tuning teach useful response patterns. Preference optimization rewards selected properties, but those preferences are not identical to truth.

## Slide 5: Test-Time Scaling Searches a Fixed Model

**Objective:** Define test-time scaling operationally.

The model weights do not change. The system spends additional inference compute on repeated sampling, search, longer reasoning, or tool-assisted exploration, then selects a result.

## Slide 6: Coverage Is Not Deployed Reliability

**Objective:** Distinguish pass@k from a correct returned answer.

The probability formula is an intuition under independence. Correlated mistakes reduce the benefit of repeated samples, and an imperfect selector may discard the correct candidate.

**Checkpoint:** A model generates 100 candidates and one is correct, but its selector cannot identify it. Did coverage improve? Did deployed reliability improve?

## Slide 7: Reliable Verification Often Scales More Slowly

**Objective:** Explain the generator-verifier gap.

Code and mathematics often provide executable or rule-based checks. Open-ended writing, science, medicine, and policy rely more heavily on expensive human judgment and incomplete evaluators.

**Prompt for Q:** Which tasks in your work have a cheap verifier, and which require expert judgment?

## Slide 8: Reasoning Models Turn One Answer into a Search Process

**Objective:** Recognize reasoning as a feedback loop rather than merely longer prose.

As an operational system view, analysis, decomposition, action, feedback, correction, and alternative proposals form a search process. This is not a guaranteed account of hidden model cognition, and visible reasoning text is not proof that the process is correct.

## Slide 9: Self-Improvement Has Two Different Meanings

**Objective:** Test whether an improvement persists.

Within-run correction disappears when the task ends. Across-run improvement requires persistent weights, memory, tools, policies, datasets, or artifacts.

**Checkpoint:** If an agent fixes a mistake and then forgets everything in the next session, in what sense did it improve?

## Slide 10: An Agent Owns a Goal-Directed Task Loop

**Objective:** Distinguish an agent from a chatbot.

A chatbot mainly returns information. An agent manages state, acts through tools, observes consequences, and decides whether to continue or stop. Autonomy can still be bounded by human approval.

## Slide 11: Workflow Graphs Trade Flexibility for Control

**Objective:** Compare open loops with predefined graphs without ranking them categorically.

Open loops adapt to unexpected states but are harder to audit. Workflow graphs constrain routes and checks, improving observability while reducing flexibility.

**Connection to Q:** Harness and graph engineering are system-level methods for making model capability inspectable and repeatable.

## Slide 12: A Useful Course Lens: Feedback Quality

**Objective:** Apply the lecture's framework to a new system.

Frame this as the deck's diagnostic lens rather than a direct claim from the lecturer. For any proposed self-improving agent, ask:

1. What generates alternatives?
2. What verifies success?
3. What persists after the task?

Use those questions as the bridge to Lecture 2 on test-time compute scaling.
