# Slide Deck Outline

**Topic**: Stanford CS329A - Self-Improving AI Agents in 20 Minutes
**Style**: intuition-machine, adapted to the established CS329A visual system
**Dimensions**: paper + cool technical + geometric + balanced
**Audience**: university educators and intermediate learners
**Language**: English
**Slide Count**: 10 slides
**Duration**: 20:00
**Generated**: 2026-08-29

---

<STYLE_INSTRUCTIONS>
Design Aesthetic: Restrained academic and technical briefing with crisp original vector diagrams. The design must match the detailed CS329A series without copying Stanford slides, logos, or paper figures.

Background:
  Texture: Subtle engineering grid on aged cream paper.
  Base Color: Aged Cream (#F5F0E6) with white paper panels (#FFFCF4).

Typography:
  Headlines: Bold geometric sans-serif with strong hierarchy and no negative letter spacing.
  Body: Clean geometric sans-serif with compact but readable line spacing.

Color Palette:
  Primary Text: Near Black (#171717)
  Background: Aged Cream (#F5F0E6)
  Generation / Search: Cobalt (#2563EB)
  Verification / Feedback: Teal (#2F7373)
  Persistence / Learning: Green (#16803C)
  Constraints / Risk: Maroon (#722F37) and Red (#B42318)
  Budget / Compute: Warm Brown (#8B7355)

Visual Elements:
  - Original flow diagrams, task graphs, evidence gates, and comparison panels
  - One dominant teaching diagram per slide
  - Visible claim-type badge: Teaching synthesis or Open research question; lecture evidence appears in the source map
  - Small source line connecting each overview slide to the relevant detailed lesson

Density Guidelines:
  - One main idea and one main diagram per slide
  - Maximum four short labels in the primary visual where possible
  - Speaker notes carry explanation that would overload the slide

Style Rules:
  Do: preserve generous margins, high contrast, original diagrams, and explicit uncertainty boundaries.
  Don't: use gradients, logos, decorative imagery, copied lecture frames, or imply that the teaching loop is Stanford's canonical architecture.
</STYLE_INSTRUCTIONS>

---

## Slide 1 of 10
**Type**: Cover
**Filename**: 01-slide-cover.png
**Time**: 0:45
**Claim type**: Teaching synthesis
**Headline**: Self-Improving AI Agents in 20 Minutes
**Sub-headline**: Nine CS329A lectures, one system model, four design questions.
**Visual**: A bounded agent loop surrounded by four question markers: generation, verification, persistence, and budget.

---

## Slide 2 of 10
**Type**: Content
**Filename**: 02-slide-model-vs-system.png
**Time**: 1:45
**Claim type**: Teaching synthesis with Part 1 evidence
**Headline**: A Stronger Model Is Not Yet a Self-Improving System
**Sub-headline**: Capability lives in the model; improvement depends on the surrounding loop.
**Visual**: Binary comparison between one model call and a bounded agent system with state, tools, feedback, and change.

---

## Slide 3 of 10
**Type**: Content
**Filename**: 03-slide-teaching-loop.png
**Time**: 2:30
**Claim type**: Teaching synthesis
**Headline**: One Teaching Loop Connects the Course
**Sub-headline**: Generate, plan, act, observe, verify, and learn under a budget.
**Visual**: Linear progression with a verification return path and a durable-learning branch. Explicitly label it as a teaching abstraction.

---

## Slide 4 of 10
**Type**: Content
**Filename**: 04-slide-test-time.png
**Time**: 2:00
**Claim type**: Teaching synthesis with Part 2 evidence
**Headline**: More Attempts Help Only When Selection Works
**Sub-headline**: Test-time compute expands candidate coverage; a verifier must still return the useful answer.
**Visual**: Candidate fan-out, verifier gate, and one selected answer, with coverage and returned-answer reliability shown separately.

---

## Slide 5 of 10
**Type**: Content
**Filename**: 05-slide-verification.png
**Time**: 2:15
**Claim type**: Teaching synthesis with Parts 3-4 evidence
**Headline**: Feedback Is Evidence, Not Ground Truth
**Sub-headline**: A test can accept wrong behavior or reject a valid alternative.
**Visual**: Code submission and test suite example showing false acceptance, false rejection, and verifier gaming.

---

## Slide 6 of 10
**Type**: Content
**Filename**: 06-slide-tools-planning.png
**Time**: 2:15
**Claim type**: Teaching synthesis with Parts 4-5 evidence
**Headline**: Tools Turn Answers into Trajectories
**Sub-headline**: Planning exposes dependencies, parallel work, critical paths, and recovery points.
**Visual**: Task dependency graph with two parallel branches, one critical path, feedback checkpoints, and a reversible retry edge.

---

## Slide 7 of 10
**Type**: Content
**Filename**: 07-slide-persistence.png
**Time**: 2:15
**Claim type**: Teaching synthesis
**Headline**: Correction Within a Run Is Not Durable Learning
**Sub-headline**: Search fixes the current trajectory; learning changes what happens next time.
**Visual**: Same failed task split into retry/context correction and memory/data/weight update across runs.

---

## Slide 8 of 10
**Type**: Content
**Filename**: 08-slide-long-horizon.png
**Time**: 2:00
**Claim type**: Teaching synthesis with Parts 7-8 evidence
**Headline**: Long-Horizon Work Exposes Evaluation Limits
**Sub-headline**: Judge the final artifact, trajectory, recovery, evidence, and cost together.
**Visual**: Deep-research trajectory feeding a five-part evaluation dashboard.

---

## Slide 9 of 10
**Type**: Content
**Filename**: 09-slide-frontier.png
**Time**: 2:00
**Claim type**: Open research question
**Headline**: The Frontier Is a Coupled Reliability Problem
**Sub-headline**: Diversity, meta-verification, curriculum, and efficiency constrain one another.
**Visual**: Four coupled frontier blocks around a bounded improvement loop, with an unresolved-boundary label.

---

## Slide 10 of 10
**Type**: Back Cover
**Filename**: 10-slide-design-checklist.png
**Time**: 2:15
**Claim type**: Teaching synthesis
**Headline**: Design the Loop with Four Questions
**Sub-headline**: Generation, verification, persistence, and budget turn “self-improving” into testable claims.
**Visual**: Four-question design checklist applied to a student research assistant, plus links to the nine detailed lessons.
