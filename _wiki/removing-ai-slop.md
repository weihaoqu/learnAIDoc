---
title: "Killing AI Slop: avoid-ai-writing + stop-slop"
date: 2026-05-29
category: Prompting & Writing
tags: [ai-writing, ai-slop, humanizer, ai-detection, academic-integrity, writing, claude-code, skills, case-study]
related: ["Anti-AI Exam Designer — A Claude Code Skill for AI-Resistant Exams", "PaperSpine — Motivation-Driven Paper Writing Skill Suite for Codex and Claude Code"]
icon: "🧹"
image: "/assets/images/removing-ai-slop.png"
---

"AI slop" is a tell, the prose version of a poker giveaway. Em dashes everywhere, words like *delve* and *leverage*, ideas grouped in threes, and inanimate things doing human work ("the data tells us"). Two open-source agent skills clean it up from different angles: **avoid-ai-writing** by Conor Bronsdon is a large, configurable auditor, and **stop-slop** by Hardik Pandya is a short, blunt rulebook with a numeric score. Both are MIT-licensed and run as prompt-only skills in Claude Code or Codex. The avoid-ai-writing repo also ships an optional JavaScript detector, separate from the skill; stop-slop is pure prose rules. One caveat matters more than either tool: these patterns are signals, not proof of who wrote a text.

*Source: [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) | [stop-slop](https://github.com/hardikpandya/stop-slop) | [Stanford HAI on detector bias](https://hai.stanford.edu/news/ai-detectors-biased-against-non-native-english-writers) | [arXiv: evaluating AI text detectors](https://arxiv.org/pdf/2507.17944) | [Int'l Journal for Educational Integrity: detector accuracy](https://link.springer.com/article/10.1007/s40979-026-00213-1)*

## What counts as slop

Both skills hunt the same families of tell, and they agree on the load-bearing ones.

- **The em dash.** The most notorious tell, though avoid-ai-writing argues that structure is the stronger signal. Both target zero and tell you to use commas or periods instead.
- **Vocabulary.** Words that appear far more in AI text: delve, leverage, robust, comprehensive, seamless, tapestry, realm. avoid-ai-writing ranks about 109 of them in three tiers; stop-slop bans a tighter set plus all business jargon and every adverb.
- **Structure and rhythm.** The rule of three, uniform sentence length, and the "not X, it's Y" contrast. Both say break the pattern: two items beat three, and you state Y directly.
- **False agency.** This is stop-slop's sharpest catch. A complaint does not "become a fix"; a person fixes it. Name the actor, or put the reader in the seat with "you."
- **Passive voice and distance.** stop-slop wants a human subject in every sentence and the reader in the room, not a narrator floating above the scene.

## Two skills, two philosophies

| Dimension | avoid-ai-writing | stop-slop |
|-----------|------------------|-----------|
| Author / license | Conor Bronsdon · MIT · v3.8.0 | Hardik Pandya · MIT |
| Footprint | ~640-line ruleset; plugin-marketplace wrapper; optional JS detector | ~70-line SKILL.md + 3 reference files, no scripts |
| Vocabulary net | 3 tiers, ~109 words | banned phrases, business jargon, all adverbs |
| Configurable | 6 context + 5 voice profiles, 3 modes | one opinionated mode |
| Output | issues, rewrite, change log, second-pass audit; P0–P2 | rewrite + a 5-dimension 1–10 score (revise below 35/50) |
| Signature catch | tiered vocabulary, "signals not proof," anti-over-polishing | false agency, active voice, name the actor |
| Stance | nuanced, with carve-outs | absolutist |

avoid-ai-writing reads like a style manual with a research appendix. stop-slop reads like an editor who has run out of patience. The difference is deliberate: one gives you dials, the other gives you a verdict.

## How each one works

**avoid-ai-writing.** It runs in three modes (rewrite, detect, and edit-in-place on a file). A context profile sets strictness (blog, technical-blog, investor-email, docs, casual, linkedin), and a voice profile sets tone (casual, professional, technical, warm, blunt). It rates findings from P0 to P2 and runs a built-in second pass to catch tells the first edit missed. It also writes down its exceptions: curly quotes belong in finished documents, and a named contrast ("real revenue, not grants") is honest writing rather than a tell.

**stop-slop.** Eight rules, a quick-check list, and a score. You rate the draft 1 to 10 on five dimensions: directness, rhythm, trust, authenticity, density. Below 35 out of 50, you revise. The rules are absolute by design. Kill every adverb. Remove every passive construction. Restructure any sentence that opens with a Wh- word.

## Why a detector's verdict is not proof

avoid-ai-writing opens with a disclaimer the research supports. Pattern-matching tells you a text resembles AI output. It cannot prove a human did not write it, and real people pay for the mistake.

- A 2023 Stanford study (Liang, Zou, et al., in *Patterns*) found detectors flagged more than 61% of essays by non-native English speakers as AI, and almost none by native speakers. Non-native writers and AI both tend toward lower lexical variety, so the detector confuses one for the other. A detector vendor published a rebuttal, so read it as a warning rather than the last word.
- A 2025 arXiv study found paraphrasing cut detection rates by about 88% on average. DetectGPT dropped from 70.3% to 4.6%.
- A 2025 study of peer-review reports, some of the most controlled writing experts produce, still could not reliably separate the AI-written ones.

Use the patterns to improve a draft. Do not use them to accuse a writer.

## Using both together

The skills overlap on the basics and complement each other past that. One workflow uses each for its strength:

```
draft
  -> stop-slop pass      structure + false agency + adverbs; take the 5-dim score
  -> avoid-ai-writing    detect mode: vocabulary tiers + context-aware nuance, then rewrite
  -> re-read once        keep 1-2 "violations" on purpose; a spotless piece reads as machine-made
```

Or pick by job. Reach for stop-slop on short, punchy copy where you want a hard line and a number. Reach for avoid-ai-writing when you need its context profiles or an in-place file edit. Its integrity-aware framing also suits a piece about academic writing itself.

## Case study: scoring two drafts of the same essay

To see the skills work, we scored a graduate reflection on an education podcast. One draft came from ChatGPT off a short prompt. A second was a human revision built from the same notes. We then ran a stop-slop pass on that revision. Same task, same sources, three different scores on stop-slop's five dimensions. The before and after lines below are representative composites, not verbatim sentences from the essay.

| Draft | Direct | Rhythm | Trust | Authentic | Density | Total |
|---|---|---|---|---|---|---|
| ChatGPT, first pass | 4 | 3 | 3 | 2 | 4 | **16/50** |
| Human revision | 8 | 7 | 8 | 6 | 8 | **37/50** |
| After a stop-slop pass | 8 | 8 | 9 | 8 | 9 | **42/50** |

The ChatGPT draft failed the way slop usually does. It read as if written from the episode title, not the episode. A generic opener ("rapidly reshaping education"), section stamps ("One major takeaway... Another important theme... Personally..."), list padding, and a narrator at a distance ("the podcast emphasized"). Nothing in it showed the writer had listened.

The human revision already scored well, and its one weak axis carries the lesson: writing that is too polished can read as machine-assisted. Three tells survived careful editing.

**The aphoristic closer**, a line built to sound quotable, often with a lazy extreme.
- Before: "Careful adoption will *always* beat rushing in."
- After: "He compares it to crossing a minefield slowly rather than running through."

**The too-perfect seam**, where each section hands to the next in matched parallel.
- Before: "If bias is about what lives in the data, governance is about who controls it."
- After: "That raises a second question: who controls the data?"

**The parallel inversion used as a habit.** "Less X than Y" reads fine once and feels engineered by the third time.
- Before: "I read the policy less as a tripwire than as a diagnosis."
- After: "Now I treat the policy as a signal a student lacked support, not a trap."

The biggest gain came from something no tell list catches. The revision scored high marks on craft and still felt generic, because it argued about ideas with no person in the room. Two sentences of real experience, a named tool a school adopted in a hurry, lifted authenticity more than any single line edit.

The workflow that produced the 42: score the draft, fix the structural tells, then add the evidence that you were there.

## Install both

Both install as plain skill folders, so Claude Code and Codex pick them up:

```bash
# avoid-ai-writing (single SKILL.md)
mkdir -p ~/.claude/skills/avoid-ai-writing ~/.codex/skills/avoid-ai-writing
cp avoid-ai-writing/SKILL.md ~/.claude/skills/avoid-ai-writing/
cp avoid-ai-writing/SKILL.md ~/.codex/skills/avoid-ai-writing/

# stop-slop (copy the folder; SKILL.md links to references/)
cp -R stop-slop ~/.claude/skills/stop-slop
cp -R stop-slop ~/.codex/skills/stop-slop
```

Then invoke either in plain language: *"scan this for AI-isms"* or *"rewrite draft.md in a blunt voice"* for avoid-ai-writing, and *"stop-slop this and score it"* for stop-slop.

avoid-ai-writing is also published as a Claude plugin marketplace, so you can install it natively with `/plugin`. The folder copy above is what makes it work in Codex too, so I use it for both. stop-slop ships only as a skill folder.

## Things to know

- Both are English-centric and opinionated. Some flags are wrong for technical or second-language prose, which is why avoid-ai-writing reports *why* it flagged each item.
- stop-slop's "no adverbs, no passive, ever" is a forcing function, not grammar law. Sometimes the passive is correct, as when the actor is unknown ("the file was deleted during the migration").
- Over-polishing is its own tell. Strip every irregularity and the text drifts back toward the machine profile both skills try to escape.
- They agree on the basics that carry the most weight: kill the em dash, and swap vague boosters for the specific thing.
