# Slide Deck Outline

**Topic**: Stanford CS329A Part 7 - Self-Improvement and Deep Research Agents
**Style**: intuition-machine
**Dimensions**: paper + cool technical + geometric + balanced
**Audience**: learners
**Language**: English
**Slide Count**: 12 slides
**Generated**: 2026-08-29

---

<STYLE_INSTRUCTIONS>
Design Aesthetic: Academic technical briefing on aged paper with crisp original vector diagrams, evidence tags, and visible caveats. Each slide teaches one causal relationship through a dominant system schematic.

Background:
  Texture: subtle warm paper field with faint engineering grid
  Base Color: Aged Cream (#F5F0E6)

Typography:
  Headlines: bold geometric sans-serif with stable line lengths
  Body: clean sans-serif at presentation-readable sizes
  Evidence: compact monospace labels

Color Palette:
  Primary Text: Near Black (#171717)
  Background: Aged Cream (#F5F0E6)
  Generation: Cobalt (#2563EB)
  Verification: Teal (#2F7373)
  Constraints: Maroon (#722F37)
  Budget: Warm Brown (#8B7355)
  Risk: Red (#B42318)

Visual Elements:
  - original candidate fans, filters, clusters, reasoning chains, retrieval loops, and budget routes
  - source/timestamp tags and adjacent caveat boxes
  - no course frames, logos, gradients, or decorative AI imagery

Density Guidelines:
  - one teachable claim per slide
  - two to four support labels
  - one dominant diagram or comparison

Style Rules:
  Do: state denominators, distinguish sourced results from synthesis, and keep feedback channels visible.
  Don't: equate coverage with selected reliability, generalize contest results to software engineering, or treat retrieval as truth.
</STYLE_INSTRUCTIONS>

---

## Slide 1 of 12
**Type**: Cover
**Filename**: 01-slide-cover.png
**Headline**: Search Needs More Than More Samples
**Sub-headline**: Stanford CS329A Part 7 - diversity, feedback, selection, and stopping
**Visual**: Candidate branches pass through execution and evidence feedback into one bounded selector.
**Evidence**: Lecture `00:00-01:11`; teaching synthesis

---

## Slide 2 of 12
**Type**: Content
**Filename**: 02-slide-contest-problem.png
**Headline**: Contest Code Requires a Whole Problem-Solving Chain
**Body**: Interpret the statement, choose an algorithm, implement it, and survive hidden tests.
**Visual**: Four-stage pipeline with failure gates.
**Evidence**: Lecture `01:11-04:30`; AlphaCode v1

---

## Slide 3 of 12
**Type**: Content
**Filename**: 03-slide-alphacode-pipeline.png
**Headline**: AlphaCode Searches a Million-Scale Candidate Space
**Body**: Sample broadly, execute public tests, cluster behavior, and submit a small set.
**Visual**: Candidate fan narrowing through filter and clusters.
**Evidence**: Lecture `04:30-09:40`; arXiv:2203.07814v1

---

## Slide 4 of 12
**Type**: Content
**Filename**: 04-slide-coverage-selection.png
**Headline**: Finding One Correct Program Is Not the Same as Selecting Ten
**Body**: `pass@k` asks whether success exists; `10@k` also tests selection.
**Visual**: Candidate pool beside a ten-slot submission tray.
**Evidence**: Lecture `09:40-16:35`; AlphaCode v1

---

## Slide 5 of 12
**Type**: Content
**Filename**: 05-slide-diversity-saturation.png
**Headline**: Compute Keeps Rising After Useful Diversity Starts Flattening
**Body**: Redundant samples and weak ranking can turn additional compute into diminishing return.
**Visual**: Rising compute bars beside a saturating diversity curve.
**Evidence**: Lecture `16:35-24:38`; AlphaCode arXiv:2203.07814v1 ablations; sourced interpretation

---

## Slide 6 of 12
**Type**: Content
**Filename**: 06-slide-alphacode2-system.png
**Headline**: AlphaCode 2 Improves Both the Candidate Supply and the Ranker
**Body**: A family of Gemini policies feeds execution, clustering, and a scoring model.
**Visual**: Policy family converging into a multi-stage selector.
**Evidence**: Lecture `24:38-30:20`; AlphaCode 2 report

---

## Slide 7 of 12
**Type**: Content
**Filename**: 07-slide-results-denominator.png
**Headline**: The Headline Result Needs Its Denominator
**Body**: 43% vs 25%; estimated 85th percentile; 77 selected problems; up to one million candidates each.
**Visual**: Metric cards anchored to a denominator strip.
**Evidence**: Lecture `30:20-38:20`; AlphaCode 2 report pp. 1-3

---

## Slide 8 of 12
**Type**: Content
**Filename**: 08-slide-adaptive-search.png
**Headline**: Harder Problems Need Adaptive Search, Not Just a Wider Fan
**Body**: Route by difficulty toward sampling, decomposition, tree search, or human review.
**Visual**: Difficulty router and four search paths.
**Evidence**: Lecture discussion `39:25-46:33`

---

## Slide 9 of 12
**Type**: Content
**Filename**: 09-slide-knowledge-gap.png
**Headline**: One Missing Fact Can Corrupt the Rest of a Reasoning Chain
**Body**: Fluent continuation can hide the moment uncertainty became an unsupported guess.
**Visual**: Reasoning chain with a red knowledge-gap break.
**Evidence**: Lecture `46:33-50:40`; Search-o1 motivation

---

## Slide 10 of 12
**Type**: Content
**Filename**: 10-slide-agentic-retrieval.png
**Headline**: Agentic Retrieval Searches When the Reasoning Process Needs It
**Body**: Search becomes a recurrent action instead of a one-time preface.
**Visual**: Reasoning loop that triggers and consumes searches.
**Evidence**: Lecture `50:40-55:50`; arXiv:2501.05366

---

## Slide 11 of 12
**Type**: Content
**Filename**: 11-slide-reason-documents.png
**Headline**: Search-o1 Compresses Documents Into Focused Evidence
**Body**: Retrieve documents, reason within them, extract evidence, then resume the main chain.
**Visual**: Three documents through an evidence extractor into context.
**Evidence**: Lecture `55:50-68:15`; arXiv:2501.05366

---

## Slide 12 of 12
**Type**: Back Cover
**Filename**: 12-slide-search-diagnostic.png
**Headline**: Audit the Loop Before Trusting the Answer
**Body**: Diversity; feedback; selection; failure handling; stopping.
**Visual**: Five diagnostic cards around a bounded search loop.
**Evidence**: Whole-lecture teaching synthesis; Q&A `68:58-72:26`
