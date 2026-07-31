---
title: "Claude Drafts, Codex Gates — An Interleaved Two-Model Review Loop for Hard Work"
date: 2026-06-09
category: Claude Code Workflows
tags: [claude-code, codex, external-review, code-review, verification, proof-engineering, research-workflow, two-model-review, gate, design-first, empirical-de-risking, human-in-the-loop]
related: ["Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs", "Codex + Claude Code for Research — A Practical Tutorial", "Harness Engineering — The Real Bottleneck Isn't the Model"]
icon: "⚖️"
image: "/assets/images/claude-codex-interleave.png"
---

A single model reviewing its own work has a blind spot: the same priors that produced a flaw tend to wave it through on review. The cheapest fix is not a bigger model or a longer prompt — it is a **second model from a different family as an adversarial gate**, with a human as arbiter. This entry documents the loop I (Q) actually run: **Claude Code authors and self-verifies; Codex reviews from the outside; I run Codex each round and relay the verdict.** It works best on hard, correctness-critical work — proofs, encodings, security-sensitive changes, anything where "looks right" is not good enough. The worked example at the end is a real episode: proving a *forward-soundness theorem* for a logic-to-CHC translation in an ongoing relational-verification paper, where the loop caught a better design, five calibration bugs, and one mislabeled proof step before any of it was committed.

*Source: Q's firsthand working practice on the relcm relational-verification project (2026-06). The mechanics live in my global `CLAUDE.md` "RULE #1 — Codex Review Gate"; this post is the teaching writeup of the pattern that emerged.*

This is a companion to two earlier entries: **[Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs](/learnAIDoc/wiki/cross-model-code-review-claude-codex/)** explains *why* two models beat one, and **[Codex + Claude Code for Research — A Practical Tutorial](/learnAIDoc/wiki/codex-claude-code-research-tutorial/)** is the pattern cheat-sheet (problem-sharpening, proof-script review, type-rule probing, PCSAT encoding checks). This entry adds the part those two leave implicit: the **disciplined loop** (what to gate, in what order) and a single **deep worked example** where every gate caught something real.

## Why two different models, not one model twice

Asking the same model to "review what you just wrote" mostly returns a confidence echo: the errors that survive are the ones consistent with its own reasoning. Two *different* model families (Claude and Codex/GPT) fail differently, so each is a genuine reviewer for the other. This is *practical* independence, not a guarantee: it reduces correlated errors, turning review from theater into a filter. (The fuller case for two-model review is in [Cross-Model Code Review](/learnAIDoc/wiki/cross-model-code-review-claude-codex/).)

The third party — you, the human — is not optional. You decide what gets gated, you run the reviewer, and you arbitrate when the two models disagree. The models never silently negotiate behind your back.

## The loop

```
        ┌─────────────────────────────────────────────────────────────┐
        │  Claude: draft / implement                                   │
        │     └─ self-verify cheaply (compile, run tests, solver probe)│
        └───────────────┬─────────────────────────────────────────────┘
                        │  emits a copyable review prompt
                        ▼
        ┌─────────────────────────────────────────────────────────────┐
        │  YOU run Codex on the diff/artifact, relay the verdict       │
        └───────────────┬─────────────────────────────────────────────┘
                        ▼
                 SHIP ──────────────▶ commit
                  │
                REVISE
                  │  Claude verifies each blocker against disk,
                  │  fixes, re-gates ONCE
                  └────────────▶ (back to Codex)
```

### What a good gate prompt contains
The prompt Claude hands you each round is reusable if it pins down five things:
- **Artifact + how to see it:** the file path and the exact diff command (e.g. `git -C <repo> diff <base> -- <file>`).
- **The exact claim under review:** the theorem or change in one line, so the reviewer checks *that*, not its own idea of it.
- **What is already verified:** the cheap checks you ran (compiled, tests pass, probe quad), so the reviewer spends effort on what those cannot catch.
- **Scope:** what to spend time on and what to skip.
- **A binary verdict:** end with "VERDICT: SHIP or REVISE (numbered blockers)" so the loop has a clear exit.

The defaults that make it more than a checkbox:

### 1. Design first, gate first
Send the **design** to Codex *before* writing the proof or touching any artifact: the approach, the obstruction you found, the fix you propose. The single highest-leverage moment is here — a reviewer that catches a bad direction at the design stage saves the entire downstream rewrite. In the example below, my first proposed fix worked but was heavier than necessary; Codex proposed a lower-blast-radius route at the design gate, before a single line of proof was written.

### 2. De-risk empirically before prose
If the change touches something *checkable* — an encoding, a build, a test — run the cheap empirical check first, on a **copy**, before writing the formal argument. A clean proof of a change that breaks the artifact is wasted. In the example, the encoding change was tested with a solver probe (a four-way sat/unsat quad) on a scratch copy *before* the theorem was drafted; only after it passed did the prose get written.

### 3. One artifact, one copyable prompt, one revision round
Claude drafts, self-verifies, then hands you a **bare, paste-ready prompt** (no shell wrapper — just the text and a one-line command to produce the diff). You run Codex, paste back the verdict. On REVISE, Claude fixes and re-gates **once**; if the two still diverge, it comes to you. This keeps the loop bounded — you are not refereeing an infinite argument.

### 4. Don't auto-defer — verify both directions
When Codex says REVISE, the author does **not** just comply. It checks Codex's line citations against the actual file first. (In the example, every Codex citation was accurate — but you only know that by checking.) And when Codex's recommendation would override a plan *you* already approved, the author surfaces the conflict to you instead of quietly switching. The reviewer is a gate, not a boss.

### 5. Concede fast when the reviewer is right
The flip side of "don't auto-defer" is "don't dig in." Several rounds in the example, Codex caught a genuine overclaim by Claude (e.g., asserting a result was "derivable by assembly" when it needed real new content). The correct move is: verify the objection, concede it plainly, apply the exact fix. Ego is not a reviewer's friend.

## Worked example: proving a forward-soundness theorem

The setting: a relational-verification paper translates derivations in a graded Hoare logic into Constrained Horn Clauses (CHC) solved by PCSAT. The existing translation theorem proved CHC *satisfiability* by exhibiting a hand-built over-approximation model. The new, referee-facing goal was stronger: for the direct-goal *Wit-completion* variant of the encoding, **any** satisfying model the solver returns should imply the source bound — i.e., a `sat` verdict actually *verifies*, not merely corroborates. (The distinction matters because the original corpus also has violation-head files, where an `unsat` is *not* a universal-bound proof.)

Here is how the loop played out, gate by gate:

| Stage | Claude does | Codex gate | Outcome |
|---|---|---|---|
| **Design** | Writes a design doc: the obstruction (the solver's least model is not "focus-complete") + a proposed fix clause (FC) | **SOUND PLAN**, but recommends a cleaner route (*Wit-completion*, which doesn't pollute the predicate the goal ranges over) | Route improved **before** any proof written |
| **Empirical** | Adds Wit-completion to a *copy* of the encoding; runs the solver probe quad | Solver sanity check, not a Codex pass | Positive goal stayed SAT, violation UNSAT, vacuity UNSAT: encoding de-risked before prose (corroboration, not proof) |
| **Theorem** | Drafts the theorem + 6-step proof; compiles it | **REVISE** — 5 calibration bugs (an inconsistent definition, a now-contradictory "future work" paragraph, a replace-vs-add ambiguity, a wrong mutable-case sentence, an over-claimed empirical line) | Caught 5 real calibration bugs |
| **Re-gate** | Fixes all 5; recompiles | **SHIP** | Theorem committed |
| **Corollaries** | Writes the mutable + two-array corollaries | **REVISE** — one mislabeled proof step (called the algebraic exit-bound "charge dominance"; the real bridge is a different inequality) | Caught a subtle mis-citation |
| **Re-gate** | Fixes the step; recompiles | **SHIP** | Corollaries committed |

Every one of those defects was caught **before commit**, by a reviewer that did not write the proof. None were caught by the LaTeX compiler (it built cleanly throughout) or by the author's own read. That is the whole value: the gate sees what the author's own priors hide.

A detail worth keeping: at the design gate Codex *changed the plan for the better*, and at a later round Codex *corrected an overclaim the author had made*. Both directions happened. The loop is symmetric — neither model is the authority; the human is.

## The human's job

You are doing three things, none of which a model does for you:

- **Deciding what to gate.** Not everything needs an external pass. A one-line edit you can read faster than waiting for a review does not. A proof, an encoding, a security change, anything you'll publish — does. (My `CLAUDE.md` tiers this explicitly: a "MUST review" list and a "MAY skip — announce it" list.)
- **Running the reviewer.** Claude hands you a paste-ready prompt; you run Codex and relay the verdict. This is deliberate — it keeps you in the loop and keeps the two models from forming a closed cycle you can't see.
- **Arbitrating.** When Codex disagrees with a plan you approved, you decide. When the two models would loop, you cut it.

## When to use it (and when not)

**Use it** for: machine-checked or paper proofs, solver/encoding changes, security-sensitive code, anything outward-facing, and any "plan for a multi-step task" before execution. The cost (one extra model pass) is trivial against the cost of shipping a wrong proof or a broken encoding.

**Skip it** for: single-line edits you can read at a glance, read-only summaries and status reports, and brainstorming with no artifact. Gating those is pure latency. Announce the skip so it's a decision, not an omission.

## Takeaways

1. **Independence beats horsepower for review.** Two different model families catch each other's errors precisely because they fail differently.
2. **Gate the design, not just the result.** The cheapest fix is the one applied before the proof is written.
3. **Empirics before prose** when the artifact is checkable.
4. **Bounded loop:** one artifact, one copyable prompt, one revision round, human arbitrates ties.
5. **Both models are fallible and both are useful** — verify the reviewer's objections, concede fast when it's right, and never let the two models negotiate without you.
