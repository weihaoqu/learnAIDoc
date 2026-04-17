---
title: "Codex + Claude Code for Research — A Practical Tutorial"
date: 2026-04-16
category: Claude Code
tags: [claude-code, codex, research-workflow, formal-verification, program-analysis, adversarial-review, coq, rocq, type-systems, pcsat, relational-verification]
related: ["Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs", "Claude Code as Research Infrastructure — From Chatbot to AI Research Team", "Harness Engineering — The Real Bottleneck Isn't the Model"]
icon: "🔬"
image: "/assets/images/codex-claude-code-research-tutorial.png"
---

The companion entry ([Cross-Model Code Review](/learnAIDoc/wiki/cross-model-code-review-claude-codex/)) explains *why* cross-model review works and walks through a REST-API example. This entry is the **research-work tutorial** — how to use `codex-plugin-cc` as a daily driver for formal verification, type-systems research, program analysis, and paper writing, where "looks right" is not good enough and adversarial rigor pays for itself.

*Source: [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) | [Cross-Model Code Review setup entry](/learnAIDoc/wiki/cross-model-code-review-claude-codex/) | Codex CLI 0.121.0 docs*

## The Core Mental Model

Claude (Opus 4.6) and Codex (GPT-5.4) have different training data, different reasoning patterns, and different blind spots. For research work — where correctness is non-negotiable and novelty has to be defensible — that asymmetry is the whole point:

```
Claude (the practitioner)          Codex (the adversary)
  - Broad synthesis                  - Rigorous, skeptical
  - Drafts, explains, refactors      - Hunts counterexamples
  - Fast iteration                   - Challenges framings
  - Wants to help you ship           - Wants to prove you wrong
```

You drive Claude. You summon Codex when "this has to actually be true."

## Command Cheat-Sheet

| Command | When to use |
|---|---|
| `/codex:review` | Standard second-pair-of-eyes on uncommitted work — proofs, encodings, analyzers |
| `/codex:adversarial-review` | Devil's-advocate pass — challenges problem framing, hunts counterexamples |
| `/codex:rescue` | Hand the whole task to Codex (run a tool, investigate a bug, fix the proof) |
| `/codex:review --base main` | Review a feature branch's diff against `main` |
| `/codex:review --background` | Async review; check with `/codex:status`, fetch with `/codex:result` |
| `/codex:cancel` | Kill a runaway background job |

Keep the review gate **off**. Manual invocation beats the auto-gate because the gate triggers on every Claude response and quickly burns usage in a Claude↔Codex loop.

## The Research Loop

```
            ┌────────────────────────────────────────────────┐
            │                                                │
            ▼                                                │
  ┌─────────────────┐                                        │
  │  Claude drafts  │   proof / encoding / type rule /       │
  │  (practitioner) │   problem statement / paper section    │
  └────────┬────────┘                                        │
           │ uncommitted changes                             │
           ▼                                                 │
  ┌─────────────────┐     /codex:review                      │
  │  Codex reviews  │ or  /codex:adversarial-review          │
  │   (adversary)   │     /codex:rescue (executes tools)     │
  └────────┬────────┘                                        │
           │ findings: gaps, counter-examples, open admits   │
           ▼                                                 │
  ┌─────────────────┐                                        │
  │  Disagreement?  │ ── No ──► commit                       │
  └────────┬────────┘                                        │
           │ Yes                                             │
           ▼                                                 │
   slow down, resolve, repeat ──────────────────────────────┘
```

**Rule of thumb:** Cross-model *disagreement* is the signal. Whenever Claude says "done" and Codex says "no", that's exactly where your research contribution lives — either your proof has a real gap, or your framing is unclear enough that two strong models read it differently.

---

## Pattern 1 — Sharpening a Research Problem Statement

You have a vague intuition for a new result. Claude helps you articulate it; Codex tries to demolish it.

### Step 1 — Claude drafts

Open the repo containing your draft (e.g., `~/research/relcost-hol/problem.md`) and ask Claude:

```
Draft a one-page problem statement for proving non-interference for
a higher-order relational cost language, targeting POPL 2027. Include:
motivation, informal statement, why existing techniques don't suffice.
```

### Step 2 — Codex attacks

With the draft uncommitted, run:

```
/codex:adversarial-review Focus on novelty and related-work overlap.
Assume you are Reviewer 2. Challenge every contribution claim.
```

Typical Codex output:

```
🔴 Contribution overlap — RelCost (Çiçek et al., POPL 2017) already
   handles non-interference for a fragment of this language. Your
   delta (higher-order + effects) needs an explicit worked example
   showing where their system fails.

🟡 Motivation is abstract — the "security-critical" framing is
   generic. Name one concrete program where cost-preserving
   non-interference matters and existing tools cannot prove it.

🟡 "Novel type-and-effect system" — Barthe, Grégoire, Zanella-Béguelin
   (CSF 2013) and Rajani & Garg (POPL 2020) both have relational
   refinement systems with cost. Cite and differentiate.
```

### Step 3 — Iterate

Feed Codex's findings back to Claude:

```
Revise the problem statement to: (a) include a concrete failing
example vs. RelCost, (b) cite Barthe/Rajani and draw the delta
explicitly, (c) replace "security-critical" with the concrete scenario.
```

Re-run `/codex:adversarial-review`. Two to three rounds typically converge on a framing that survives a hostile read.

> **Budget:** 3–5 Codex calls per session. If you hit 10, you're rewriting the paper with Codex's voice — stop and think.

---

## Pattern 2 — Reviewing a Proof Script (Coq / Rocq / Lean)

Proof assistants accept incomplete proofs silently if you use `admit`, `Admitted`, `shelve`, or `sorry`. Self-review frequently misses these. Codex does not.

### Step 1 — Claude writes the proof

```
Prove `preservation` for the STLC fragment in Stlc.v. Use induction
on the typing derivation; handle E_App and E_Abs explicitly.
```

Claude produces `Lemma preservation : ...` with a tactic script.

### Step 2 — Codex reviews

```
/codex:review Focus on completeness of the proof: any admit,
Admitted, sorry, shelve, or uses of `eauto` / `firstorder`
that may silently discharge the wrong goal. Also verify the
induction principle matches the typing judgment structure.
```

Typical findings:

```
🔴 Stlc.v:87 — `admit.` in case E_App with applied function.
   The induction hypothesis is there; try `eapply IHHt1; eauto`
   after strengthening the context.

🟡 Stlc.v:104 — uses `eauto 7` as closer. This succeeds, but a
   weaker lemma (wrong quantifier) would also satisfy it. Replace
   with explicit `apply substitution_lemma; eauto.`

ℹ️  The induction is on the term, but the typing judgment is
   mutual with values. Consider `dependent induction Ht` for
   the well-typed case.
```

### Step 3 — Claude patches, Codex re-verifies

```
Address all three findings. Remove admit, tighten the eauto, switch
to dependent induction in the second branch.
```

Re-run `/codex:review`. When it returns `✅ No issues found`, commit.

---

## Pattern 3 — Probing a New Type Rule for Soundness

You've proposed a new typing rule in a draft. Before formalizing, you want to know if a well-typed-but-stuck term exists.

### Step 1 — Claude drafts

In `rules.tex` (or a markdown inference-rule file):

```
Add a typing rule T-Select for non-blocking channel select, with
premises for each branch's guard type and result type. State it
in the same style as the existing T-Send / T-Recv rules.
```

### Step 2 — Codex hunts counterexamples

```
/codex:adversarial-review Construct a program that type-checks under
T-Select but gets stuck during evaluation. If you find one, show the
derivation and the stuck configuration. If you can't, explain
which premise of T-Select rules out each candidate attack.
```

Codex might reply:

```
🔴 Counterexample:
   select { true => !c1; true => !c2 } where c1, c2 : !unit
   Both guards are `true`, type-checks via T-Select with unit result.
   Evaluation: nondeterministic commit to one branch; if the scheduler
   is adversarial both sends are published to different receivers,
   violating linearity.

   Root cause: T-Select doesn't require branch guards to be disjoint,
   but your operational semantics picks one branch and consumes the
   prefix of both. Fix options:
   (a) Require mutually exclusive guards in T-Select.
   (b) Change the operational semantics to commit atomically.
```

### Step 3 — Claude revises the rule or semantics

Feed the counterexample back. Either tighten the rule or change the operational semantics. This is the core research loop — Codex plays the role an anonymous reviewer would, months earlier.

---

## Pattern 4 — PCSAT Encoding Sanity Check (Relational Verification)

This one is straight from Q's pipeline. You've encoded a relational property as CHC constraints in a `.clp` file for PCSAT. Did you faithfully capture the source program's semantics?

### Step 1 — Claude writes the encoding

```
Encode the `merged_scheduler` function from scheduler.ml as CHC
constraints in scheduler.clp. Preserve the relational cost invariant
from Section 3 of the paper. Use the predicate naming scheme in
existing .clp files.
```

### Step 2 — Codex executes and verifies

Unlike `/codex:review` (read-only), `/codex:rescue` can actually *run* tools. This is how you close the loop:

```
/codex:rescue Run pcsat on scheduler.clp and report the verdict.
Then, independently, check whether the encoding faithfully represents
scheduler.ml: for each predicate in the .clp, show which ML construct
it abstracts, and flag any case where the abstraction drops
information (e.g., overapproximating loops, non-linear assertions
reduced to linear ones).
```

Codex will run `pcsat scheduler.clp`, collect the result, read `scheduler.ml`, and produce a report:

```
Verdict: pcsat returned SAT (property violated)

Encoding audit:
  ✅ merge_step → sched_step predicate: faithful
  ✅ relational cost pair (c₁, c₂) → sched_cost predicate: faithful
  🔴 loop_invariant: your encoding drops the tuple-length constraint
     from line 47 of scheduler.ml. As encoded, PCSAT considers traces
     of any length — which is why it finds a "counterexample" at
     length 0 that doesn't exist in the real program.
  🟡 non-linear cost aggregation encoded as linear sum. This is a
     known PCSAT limitation, but the paper's Theorem 4.2 requires the
     quadratic bound — you need to justify the linearization.
```

### Step 3 — Claude tightens the encoding

```
Add the tuple-length invariant to the relevant predicate in
scheduler.clp. Document the linearization assumption and cite
Theorem 4.2 explicitly as a side condition.
```

Re-run `/codex:rescue`. When the verdict matches the paper claim and the audit is clean, commit.

---

## Pattern 5 — Literature-Gap Hunt for "Related Work"

Reviewer 2's favorite rejection reason is "you missed X". Catch it before submission.

### Step 1 — Claude drafts Related Work

```
Draft the Related Work section for our paper on ownership types for
async Rust. Cover: linear types, session types, existing Rust borrow
checker work, and async-specific verification tools.
```

### Step 2 — Codex hunts gaps

```
/codex:adversarial-review Read related-work.tex and contribution.tex.
For each contribution claim, find at least one recent (2022+)
published paper that overlaps. If the overlap is partial, say exactly
what's different. If no overlap, say so and why you're confident.
```

Typical output:

```
🔴 Contribution C2 ("first relational proof of cancel-safety") —
   Jung et al. (OOPSLA 2023, "RustBelt goes async") prove a related
   safety property for tokio primitives. Your delta is the
   *relational* formulation; state that explicitly in Related Work.

🟡 You cite Pony's reference capabilities but miss Verona (Parkinson
   et al.). Verona is more recent (2024) and has a formal ownership
   calculus that overlaps with your § 4.

✅ Session types coverage is complete (Honda, Gay, Hu et al. all
   cited with correct differentiation).
```

### Step 3 — Claude folds in the fixes

Now you cite Jung et al. and Verona, and reframe C2 with the relational delta explicit. You can also chain into `/lit-scout` for a fuller literature pass:

```
Run /lit-scout on "relational ownership types async" to confirm
I'm not missing anything else.
```

---

## Working Async on Long Tasks

Proofs and big encodings can take minutes. Don't block:

```
/codex:review --background
# keep writing in Claude Code
/codex:status          # check if done
/codex:result          # pull findings when ready
```

`/codex:status` shows all active/recent jobs. `/codex:result` shows the latest (or pass a session ID).

This pattern pairs well with background theorem provers — kick off Codex to audit one proof while you write the next.

## When NOT to Use It

| Situation | Why skip Codex |
|---|---|
| Exploratory prototyping | Review tax > value; you're going to rewrite it anyway |
| Fixing a typo / rename | No semantic content to review |
| Claude just wrote tests that are failing | Fix the code first; Codex can't help until the thing runs |
| You're stuck on *understanding* a library | Use `/codex:rescue` as **reader**, not reviewer — different use case |
| Mid-refactor, half-finished state | Commit the intermediate step or `--base` against a checkpoint; otherwise Codex's feedback is noise |

## Cost & Usage Discipline

- **Budget 3–5 Codex calls per research session.** More than that usually means you're letting Codex write the paper.
- **Prefer `/codex:review` over `/codex:adversarial-review`** for routine checks; save adversarial for design decisions, problem statements, and pre-submission reads.
- **Keep the review gate off.** It auto-invokes Codex after every Claude response and is a known loop hazard.
- **Use `--background`** for anything over a few files or a big proof — don't waste wall-clock time blocking.

## Model Complementarity — The Disagreement Rule

```
Claude says "LGTM" + Codex says "LGTM" → ship
Claude says "LGTM" + Codex raises issues → slow down, investigate
Claude raises issues + Codex says "LGTM" → usually Claude's caution is real; re-ask Codex with specifics
Both raise issues → trivially: fix
```

The most valuable case is **Claude-LGTM / Codex-flags** — that's where research bugs hide. Self-review missed it; a different reasoning style caught it. Treat these as signal, not noise.

---

## How LearnAI Team Could Use This

- **CS305 / formal methods courses:** Students pair Claude (to draft proofs, explain tactics) with Codex (to hunt `admit`s, verify induction principles). Makes adversarial review a habit — the same cognitive move PhD students need in their own work.
- **PCSAT pipeline:** The relational-verification research workflow (merged scheduler, cell morphing, relational cost) is exactly Pattern 4. Replace "manually audit the encoding" with a `/codex:rescue` call that runs PCSAT and diffs the abstraction against the source program.
- **Paper drafts:** Every contribution claim gets an adversarial pass before internal review. Cuts the "Reviewer 2 missed X" rejection path by a meaningful fraction.
- **Thesis chapters / grant proposals:** Pattern 1 (problem-statement sharpening) catches weak framings before advisor/PM time is spent on them.
- **AI-ed research artifacts:** When LAI ships tutorials or autograders that students will rely on, cross-model review catches the silent-failure bugs Claude's self-tests miss.

## Real-World Use Cases (Recap)

| # | Pattern | Codex command | Research payoff |
|---|---|---|---|
| 1 | Problem-statement sharpening | `/codex:adversarial-review` | Defensible novelty claim; fewer weak-framing rejections |
| 2 | Proof-script review (Coq/Rocq) | `/codex:review` | No hidden `admit`s, correct induction |
| 3 | Type-rule soundness probe | `/codex:adversarial-review` | Counterexamples before formalization |
| 4 | PCSAT encoding sanity check | `/codex:rescue` | Faithful CHC abstractions, verdicts that match paper claims |
| 5 | Literature-gap hunt | `/codex:adversarial-review` + `/lit-scout` | Fewer missed citations, sharper deltas |

---

## One-Screen Summary

```
Before Codex:
  Claude writes → Claude reviews → "LGTM" → hidden bug ships
After Codex:
  Claude writes → /codex:review → gaps surface → Claude patches
                → /codex:review → clean → commit
                → /codex:adversarial-review (before submission)

For research: correctness matters more than throughput.
The review tax is the work.
```

The setup entry (linked above) covers installation. This entry covers the muscle memory. Run it on a real proof this week and see which pattern fits your workflow.
