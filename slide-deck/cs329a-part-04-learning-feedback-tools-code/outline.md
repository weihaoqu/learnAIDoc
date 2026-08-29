# Slide Deck Outline

**Topic**: Stanford CS329A Part 4 - Learning from Feedback with Tools/Code
**Style**: intuition-machine, matched to the established Part 2 deck
**Dimensions**: paper + cool technical + geometric + balanced
**Audience**: learners
**Language**: English
**Slide Count**: 12 slides
**Generated**: 2026-08-29

---

<STYLE_INSTRUCTIONS>
Design Aesthetic: Academic technical briefing on aged paper, using crisp vector system diagrams and visible evidence boundaries. Preserve Part 2's palette, grid, typography, badge placement, and compact caveat treatment while using entirely new Part 4 diagrams.

Background:
  Texture: subtle warm paper grain with faint engineering grid
  Base Color: Aged Cream (#F5F0E6)

Typography:
  Headlines: bold geometric sans-serif with stable line lengths
  Body: clean sans-serif at presentation-readable sizes
  System labels: monospace for actions, observations, tests, rewards, and principles

Color Palette:
  Primary Text: Near Black (#171717)
  Background: Aged Cream (#F5F0E6)
  Reasoning / Generation: Cobalt (#2563EB)
  Observation / Verification: Teal (#2F7373)
  Constraint / Risk: Maroon (#722F37)
  Human Specification: Warm Brown (#8B7355)
  Failure: Red (#B42318)
  Success: Green (#16803C)

Visual Elements:
  - original loops, feedback ports, tool contracts, test firewalls, and audit rings
  - top-left stage tags and top-right timestamp/paper evidence tags
  - explicit caveat strips when a proxy can be mistaken for truth
  - technical vectors only; no copied lecture frames, paper figures, or logos

Density Guidelines:
  - one teachable claim per slide
  - one headline, one short subtitle, and at most four support labels
  - one dominant diagram with generous internal spacing
  - keep evidence and qualifications visible but secondary

Style Rules:
  Do: distinguish observations, tests, and preferences; mark teaching synthesis; name the signal boundary.
  Don't: equate tool output with truth, passing tests with complete correctness, or AI feedback with human-free alignment.
</STYLE_INSTRUCTIONS>

---

## Slide 1 of 12
**Type**: Cover
**Filename**: 01-slide-cover.png
**Headline**: Feedback Changes What an Agent Can Learn
**Sub-headline**: Stanford CS329A Part 4 - tools, executable tests, and constitutional preferences as three distinct feedback contracts
**Visual**: One agent loop connected to three original feedback ports: tool observation, code execution, and constitutional preference.
**Evidence**: Lecture 00:07-01:48 and 60:28-63:20; teaching synthesis P4-C17

---

## Slide 2 of 12
**Type**: Content
**Filename**: 02-slide-react-loop.png
**Headline**: ReAct Lets Evidence Change the Next Decision
**Sub-headline**: Thought selects an action; the environment returns an observation; the trajectory updates.
**Visual**: Circular Thought -> Action -> Observation loop around a changing state register.
**Evidence**: Lecture 01:48-12:03; ReAct, arXiv:2210.03629; P4-C01-P4-C02

---

## Slide 3 of 12
**Type**: Content
**Filename**: 03-slide-observations-not-truth.png
**Headline**: A Tool Observation Is Evidence, Not Truth
**Sub-headline**: Retrieval can add facts while still being irrelevant, incomplete, stale, or misinterpreted.
**Visual**: Evidence packets pass through provenance and interpretation gates before updating state; one misleading packet is rejected.
**Evidence**: Lecture 09:07-12:54 and 18:37-20:04; ReAct; P4-C04

---

## Slide 4 of 12
**Type**: Content
**Filename**: 04-slide-action-contract.png
**Headline**: Tool Use Needs an Explicit Action Contract
**Sub-headline**: Valid actions, schemas, observations, budgets, recovery, and permissions define the operating boundary.
**Visual**: Six contract clauses surround a typed tool socket; invalid action is blocked before execution.
**Evidence**: Lecture 12:54-17:39 and 22:46-27:32; ReAct P4-C03 plus explicit teaching synthesis

---

## Slide 5 of 12
**Type**: Content
**Filename**: 05-slide-trajectory-risk.png
**Headline**: One Early Error Can Contaminate the Whole Trajectory
**Sub-headline**: Tool use reduces some hallucinations but adds retrieval, interpretation, and compounding-action failures.
**Visual**: A six-step trajectory with an early bad observation turning later branches red; a recovery branch shows backtracking.
**Evidence**: Lecture 18:37-27:32; ReAct; P4-C04-P4-C05 and P4-C18

---

## Slide 6 of 12
**Type**: Content
**Filename**: 06-slide-rlef-loop.png
**Headline**: RLEF Teaches Code Models to Repair, Not Just Resample
**Sub-headline**: Execute an attempt, expose failure evidence, revise the code, and train from the terminal result.
**Visual**: Original code-attempt -> public-test console -> repair loop with independent-resample path crossed out.
**Evidence**: Lecture 27:32-37:47; RLEF, arXiv:2410.02089; P4-C06 and P4-C10

---

## Slide 7 of 12
**Type**: Content
**Filename**: 07-slide-public-private-tests.png
**Headline**: Public Tests Teach the Repair; Private Tests Guard the Reward
**Sub-headline**: In RLEF, trajectory feedback and terminal correctness use different test visibility.
**Visual**: Public-test feedback lane separated by a firewall from a private-test terminal reward gate.
**Evidence**: Lecture 30:02-34:36; RLEF Sections 2.1-2.2; P4-C07 and P4-C09

---

## Slide 8 of 12
**Type**: Content
**Filename**: 08-slide-two-timescale-rl.png
**Headline**: Credit Assignment Spans Tokens and Turns
**Sub-headline**: Code is emitted token by token; execution feedback arrives only after a complete attempt.
**Visual**: Token ribbon nested inside three turn-level loops, ending in a delayed reward pulse.
**Evidence**: Lecture 31:57-34:36; RLEF; P4-C08

---

## Slide 9 of 12
**Type**: Content
**Filename**: 09-slide-executable-not-complete.png
**Headline**: Executable Feedback Is Objective, but Narrow
**Sub-headline**: Passing tests proves conformance to covered cases, not complete correctness, security, or intent.
**Visual**: A small green tested window overlays a larger specification field containing uncovered red zones.
**Evidence**: Lecture 33:40-46:30; RLEF; P4-C09 and P4-C11

---

## Slide 10 of 12
**Type**: Content
**Filename**: 10-slide-constitution-spec.png
**Headline**: A Constitution Makes Normative Feedback Inspectable
**Sub-headline**: Human-written principles specify what an AI critic should prefer, but they do not remove human judgment.
**Visual**: Human-authored cards labeled as illustrative principle topics feed an AI critic; a visible gap marks omitted or conflicting values. The geometry is an original teaching abstraction, not a recreation of a paper figure.
**Evidence**: Lecture 46:30-50:42 and 53:20-57:14; Constitutional AI, arXiv:2212.08073; P4-C12, P4-C14, P4-C16

---

## Slide 11 of 12
**Type**: Content
**Filename**: 11-slide-cai-two-phases.png
**Headline**: Constitutional AI Trains Through Revision and Preference
**Sub-headline**: Supervised critique revises responses; RLAIF turns AI comparisons into a learned reward.
**Visual**: An original split-path teaching abstraction: response -> critique -> revision on one path, and response pair -> AI preference -> preference model -> RL policy on another. Do not reproduce the geometry of the paper's Figure 1.
**Evidence**: Lecture 47:49-60:28; Constitutional AI; P4-C12-P4-C15

---

## Slide 12 of 12
**Type**: Back Cover
**Filename**: 12-slide-feedback-contract-audit.png
**Headline**: Audit the Feedback Contract, Not Just the Model
**Sub-headline**: Source, observability, coverage, corruption, incentives, and guardrails bound self-improvement.
**Visual**: Six-port diagnostic ring around a feedback loop, enclosed by a guardrail boundary.
**Evidence**: Whole-lecture teaching synthesis grounded in P4-C17-P4-C18
