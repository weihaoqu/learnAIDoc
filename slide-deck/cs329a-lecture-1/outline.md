# Slide Deck Outline

**Topic**: Stanford CS329A Lecture 1 - From Scaling to Self-Improving Agents
**Style**: intuition-machine
**Dimensions**: paper + cool technical + geometric + balanced
**Audience**: learners
**Language**: English
**Slide Count**: 12 slides
**Generated**: 2026-08-28

---

<STYLE_INSTRUCTIONS>
Design Aesthetic: Academic technical briefing style with an aged-paper surface, crisp vector diagrams, compact explanatory cards, and strong narrative headlines. Every slide should make one system relationship visible rather than decorate abstract AI concepts.

Background:
  Texture: subtle warm paper grain with a faint engineering grid
  Base Color: Aged Cream (#F5F0E6)

Typography:
  Headlines: bold geometric sans-serif with high contrast and stable line lengths
  Body: clean sans-serif with compact but comfortably readable explanatory text
  Data labels: monospace where formulas or system states appear

Color Palette:
  Primary Text: Near Black (#1A1A1A) - main text
  Background: Aged Cream (#F5F0E6) - full-slide ground
  Accent 1: Teal (#2F7373) - feedback and reliable paths
  Accent 2: Warm Brown (#8B7355) - training and historical context
  Accent 3: Maroon (#722F37) - central claims and constraints
  Accent 4: Cobalt (#2563EB) - model capability and generation
  Risk: Red (#B42318) - verification failures and caveats

Visual Elements:
  - original system diagrams using cards, gates, arrows, loops, and branching paths
  - evidence tags with lecture timestamps
  - assumption and caveat boxes adjacent to the relevant claim
  - faded grid and schematic marks that never reduce contrast

Density Guidelines:
  - one teachable claim per slide
  - two to four supporting points
  - a single dominant diagram or comparison
  - generous margins and no text smaller than the readability target

Style Rules:
  Do: use narrative headlines, exact labels, high contrast, visible assumptions, and original diagrams.
  Don't: reproduce Stanford slides, use photorealistic AI imagery, add logos, use decorative gradients, or imply that a benchmark result generalizes beyond its setup.
</STYLE_INSTRUCTIONS>

---

## Slide 1 of 12

**Type**: Cover
**Filename**: 01-slide-cover.png

// NARRATIVE GOAL
Open with the lecture's system-level thesis.

// TEACHING OBJECTIVE
State why a strong generator is not yet a reliable agent.

// KEY CONTENT
Headline: A Reliable Agent Needs More Than a Strong Model
Sub-headline: Stanford CS329A Lecture 1 - from scaling laws to feedback-driven agent loops
Body:
- Generate alternatives
- Verify outcomes
- Act and observe
- Correct or stop
Evidence: Lecture 1, 42:28-53:56

// VISUAL
A loop connecting Generate, Verify, Act, and Feedback around a central goal, with verification drawn as the narrow gate.

// LAYOUT
Layout: title-hero

---

## Slide 2 of 12

**Type**: Content
**Filename**: 02-slide-four-frontiers.png

// NARRATIVE GOAL
Show the historical progression in where AI systems spend compute and engineering effort.

// TEACHING OBJECTIVE
Distinguish pretraining, post-training, test-time computation, and agent orchestration.

// KEY CONTENT
Headline: One Way to Organize AI Progress: Four Compute Frontiers
Body:
- Pretraining builds broad capability
- Post-training shapes useful behavior
- Test-time compute searches possible solutions
- Agent orchestration closes the action-feedback loop
Evidence: Lecture 1, 02:23-19:38 and 40:49-47:55

// VISUAL
Four connected stages with a distinct question under each stage: What can it know? How should it behave? Which answer should it choose? What should it do next?

// LAYOUT
Layout: linear-progression

---

## Slide 3 of 12

**Type**: Content
**Filename**: 03-slide-scaling-capability.png

// NARRATIVE GOAL
Explain the scaling argument while containing the emergence claim.

// TEACHING OBJECTIVE
Describe what scaling evidence supports and what it does not establish.

// KEY CONTENT
Headline: Scaling Expanded Capability, but Emergence Is Not a Free Pass
Body:
- More compute, data, and parameters were associated with lower test loss
- Larger models showed stronger few-shot and chain-of-thought benchmark behavior
- Modern reasoning is also deliberately shaped by data and reinforcement
Caveat: Observed benchmark emergence is not proof of a universal law or a behavior absent from training data.
Evidence: Lecture 1, 02:23-10:49 and 58:12-60:32

// VISUAL
Three scaling dials feed a capability meter, while an adjacent evidence boundary separates observation from interpretation.

// LAYOUT
Layout: split-screen

---

## Slide 4 of 12

**Type**: Content
**Filename**: 04-slide-post-training.png

// NARRATIVE GOAL
Separate broad capability from assistant behavior.

// TEACHING OBJECTIVE
Explain the role of fine-tuning, instruction tuning, and preference optimization.

// KEY CONTENT
Headline: Post-Training Turns Capability into Assistant Behavior
Body:
- Fine-tuning sharpens the model on higher-quality data
- Instruction tuning teaches request-response patterns
- Preference optimization rewards selected human criteria
Caveat: A preference model approximates evaluator preferences; it is not automatically a truth detector.
Evidence: Lecture 1, 11:20-19:25

// VISUAL
A four-stage stack from pretraining to preference optimization, ending in an assistant behavior panel.

// LAYOUT
Layout: linear-progression

---

## Slide 5 of 12

**Type**: Content
**Filename**: 05-slide-test-time-scaling.png

// NARRATIVE GOAL
Define test-time scaling without conflating its methods.

// TEACHING OBJECTIVE
Recognize repeated sampling as one test-time strategy among several.

// KEY CONTENT
Headline: Test-Time Scaling Searches a Fixed Model
Body:
- The model weights remain unchanged during the task
- Repeated sampling generates multiple candidate solutions
- Search, longer reasoning, and tool use are related but distinct strategies
- A verifier or selector decides what reaches the user
Evidence: Lecture 1, 19:38-31:18

// VISUAL
One locked model fans out into candidate paths, then passes through a verification gate to one returned answer.

// LAYOUT
Layout: funnel

---

## Slide 6 of 12

**Type**: Content
**Filename**: 06-slide-coverage-reliability.png

// NARRATIVE GOAL
Teach the most important quantitative distinction in the lecture.

// TEACHING OBJECTIVE
Separate candidate coverage from deployed reliability.

// KEY CONTENT
Headline: Coverage Is Not Deployed Reliability
Body:
- Coverage asks whether any candidate is correct
- Reliability asks whether the system returns a correct candidate
- Under independent identical attempts: coverage = 1 - (1 - p)^k
Caveat: Real samples are correlated and real selectors are imperfect.
Evidence: Lecture 1, 20:50-27:16 and 36:33-37:04

// VISUAL
Two metric cards and a field of candidate dots where one correct candidate is present but may not be selected.

// LAYOUT
Layout: binary-comparison

---

## Slide 7 of 12

**Type**: Content
**Filename**: 07-slide-verifier-gap.png

// NARRATIVE GOAL
Name the main bottleneck exposed by test-time scaling.

// TEACHING OBJECTIVE
Explain why verification difficulty changes by domain.

// KEY CONTENT
Headline: Reliable Verification Often Scales More Slowly
Body:
- Code can run unit tests
- Mathematics can use rules or known answers
- Open-ended writing and science require expensive judgment
- Weak verification can select polished mistakes
Evidence: Lecture 1, 47:09-51:16

// VISUAL
A wide generator feeds a narrow verification gate, with domain cards showing different feedback costs.

// LAYOUT
Layout: funnel

---

## Slide 8 of 12

**Type**: Content
**Filename**: 08-slide-reasoning-loop.png

// NARRATIVE GOAL
Reframe reasoning as an iterative search process.

// TEACHING OBJECTIVE
Identify the feedback operations inside a reasoning model.

// KEY CONTENT
Headline: Reasoning Models Turn One Answer into a Search Process
Body:
- Analyze and decompose
- Try a path and inspect feedback
- Correct mistakes or backtrack
- Propose an alternative when the path fails
Caveat: A visible reasoning trace is not proof that the reasoning is correct.
Evidence: Lecture 1, 31:22-40:43

// VISUAL
A circular reasoning loop with a visible backtrack branch.

// LAYOUT
Layout: circular-flow

---

## Slide 9 of 12

**Type**: Content
**Filename**: 09-slide-two-improvements.png

// NARRATIVE GOAL
Prevent the word self-improvement from hiding a persistence distinction.

// TEACHING OBJECTIVE
Determine whether an improvement survives beyond one task.

// KEY CONTENT
Headline: Self-Improvement Has Two Different Meanings
Body:
- Within-run: retry, search, revise, and correct during one task
- Across-run: persist useful change in weights, memory, tools, policies, data, or artifacts
- No persistence means no durable learning
Evidence: Lecture 1, 28:53-30:12; persistence distinction is deck interpretation

// VISUAL
Side-by-side loops separated by a persistence boundary.

// LAYOUT
Layout: binary-comparison

---

## Slide 10 of 12

**Type**: Content
**Filename**: 10-slide-chatbot-agent.png

// NARRATIVE GOAL
Define the transition from response generation to goal-directed action.

// TEACHING OBJECTIVE
Distinguish a chatbot response from an agent task loop.

// KEY CONTENT
Headline: An Agent Owns a Goal-Directed Task Loop
Body:
- A chatbot mainly returns information
- An agent manages state and acts through tools
- Feedback changes the next action
- A stopping rule ends or escalates the task
Evidence: Lecture 1, 40:49-43:26

// VISUAL
A binary comparison: request-response versus goal-plan-act-observe-correct-stop.

// LAYOUT
Layout: binary-comparison

---

## Slide 11 of 12

**Type**: Content
**Filename**: 11-slide-loop-vs-graph.png

// NARRATIVE GOAL
Show why many practical agents are constrained graphs.

// TEACHING OBJECTIVE
Compare flexibility, control, observability, and reliability.

// KEY CONTENT
Headline: Workflow Graphs Trade Flexibility for Control
Body:
- Open loop: adapts to unexpected states but is harder to audit
- Workflow graph: predefined routes and checks improve observability
- Neither design is always better; task risk determines the tradeoff
Evidence: Lecture 1, 43:30-47:55

// VISUAL
Two equal-weight system diagrams with a tradeoff beam between them.

// LAYOUT
Layout: binary-comparison

---

## Slide 12 of 12

**Type**: Back Cover
**Filename**: 12-slide-closing.png

// NARRATIVE GOAL
Close with a reusable diagnostic for every self-improving agent claim.

// TEACHING OBJECTIVE
Apply the framework to a new system before accepting the self-improvement label.

// KEY CONTENT
Headline: A Useful Course Lens: Feedback Quality
Body:
- What generates alternatives?
- What verifies success?
- What persists after the task?
Applications: coding, support, research synthesis, AI-scientist-style assistance
Caveat: Assistance and automation do not remove the need for external validation.
Evidence: Lecture 1, 47:09-58:04

// VISUAL
Three large diagnostic questions arranged around a feedback signal, with a bridge to Lecture 2 on test-time compute scaling.

// LAYOUT
Layout: back-cover
