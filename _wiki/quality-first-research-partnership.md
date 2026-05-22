---
title: "Quality-First Research Partnership: A Claude + Codex Working Agreement"
date: 2026-05-21
category: AI for Research
tags: [research-workflow, claude-code, codex, working-agreement, quality-first, thinking-partner, codex-review-gate, anti-sloppiness, claude-md]
related: ["AI-Assisted Research Workflow: Formulate → Find → Judge → Verify → Execute → Monitor → Record", "Anti-Sycophancy Prompt — Stop AI from Flattering You, Get Accurate Answers", "Claude Code Context Management & CLAUDE.md — From Pitfalls to Infrastructure"]
icon: "🤝"
---

When you collaborate with Claude on a multi-month research project — the kind where one wrong count in a paper, one stale claim in a talk, or one un-verified result in an audit can cost weeks of credibility — speed-first defaults work against you. This is a working agreement I established with Claude for my POPL/ARRAY 2026 paper on relational verification: six behavioral defaults, a Codex review step, four thinking-partner modes always on, and a list of anti-patterns Claude is instructed to refuse. Drop the template into your project `CLAUDE.md` and Claude will be instructed to push back, ask questions, and prefer evidence over speed.

*Throughout this entry I use **Q** as shorthand for the project owner (the human collaborator — myself, in my case). When adopting the template, substitute the appropriate role name.*

*Source: [AI-Assisted Research Workflow Pipeline](https://weihaoqu.github.io/learnAIDoc/wiki/ai-research-workflow-pipeline/) | [Anti-Sycophancy System Prompt](https://weihaoqu.github.io/learnAIDoc/wiki/anti-sycophancy-system-prompt/) | [Codex CLI (GitHub)](https://github.com/openai/codex) | [Sharma et al., Sycophancy in LMs (arXiv)](https://arxiv.org/abs/2310.13548)*

## Why a Working Agreement at All

Default Claude behavior is optimized for short tasks: fast, agreeable, ship-it. For research, those defaults are dangerous. After enough sessions you accumulate a pattern of mistakes:

- Claude cites a count it didn't verify
- Claude proposes a fix without naming the alternative
- Claude ships a draft a second reviewer would have caught
- Claude agrees with a weak claim instead of pushing back
- Claude marks "done" without evidence

A working agreement is a contract. Both sides agree to it before work starts. Claude reads it on every session (via project `CLAUDE.md`), the human references it when correcting drift, and a second-agent review step (Codex) adds an extra adversarial pass before the output reaches the human — which can catch errors Claude would otherwise ship. Codex is not infallible; it's a second pair of eyes from a different model family.

**Important caveat:** `CLAUDE.md` is **advisory** — Claude is *instructed* by it, not *bound* by it. For hard enforcement (e.g., "must run X before every commit"), use [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/settings#hooks). The agreement below relies on a mix of advisory instructions plus the discipline of a second-agent review.

## The Six Behavioral Defaults (in priority order)

These instructions OVERRIDE Claude's generic helpfulness:

| # | Rule | What it kills |
|---|---|---|
| 1 | Quality and confidence first, speed last | "Ship it, it's probably fine" |
| 2 | Ask, don't assume | Silent inference from incomplete signals |
| 3 | Challenge, don't agree | "You're absolutely right" sycophancy |
| 4 | Force deep thinking | One-option proposals; no tradeoff naming |
| 5 | No sloppiness on counts/paths/line numbers | "I think it's X" without evidence |
| 6 | Don't let the human be sloppy either | The human skipping a verification step, undetected |

Notice the priority order. **Quality is #1 — not asking, not challenging.** The other rules serve quality. If asking 5 questions delays the work but produces a confident result, that's a win. If skipping a verification step gets things shipped fast but introduces a stale claim, that's a loss.

## The Codex Review Step

[Codex CLI](https://github.com/openai/codex) is OpenAI's command-line agent. It runs independently of Claude Code and uses a different model — making it a useful second reviewer that catches what Claude might miss.

```
Workflow:
  Claude drafts → Codex reviews → Claude fixes → Codex reviews → SHIP → Q sees output
                  ↑___________________________________________↑
                  Loop until Codex says SHIP
```

The review is recommended for **every substantive output**: plan, code change, audit revision, slide edit, paper edit, analysis, summary. Not just code.

**Adversarial reviewer is a prompt pattern, not an intrinsic Codex behavior.** Codex behaves like a critic only when you prompt it to. The agreement assumes you write Codex prompts that explicitly demand adversarial review (e.g., "find what I missed, be hostile, end with SHIP/REVISE verdict").

### Invocation pattern

```bash
# Pipe the prompt via stdin (more robust than passing long prompts as argv)
codex exec --json --ephemeral < prompt.txt > output.jsonl 2>&1

# Or get just the final agent message (no JSONL parsing needed)
codex exec --ephemeral -o final-message.txt < prompt.txt
```

Flag meanings (verified against `codex exec --help` on codex CLI 0.132.0):

| Flag | What it does |
|---|---|
| `--json` | Print events to stdout as JSONL. Useful for parsing turn / tool-call / message events. NOT required for the agent to function. |
| `--ephemeral` | Do not persist session rollout files to disk. Plain `codex exec` is already a separate non-interactive run; `--ephemeral` controls whether you can `resume` it later. |
| `-o, --output-last-message <FILE>` | Write only the final agent message to a file. Easier than parsing JSONL if you just want the verdict. |
| `-m, --model <MODEL>` | Pick the model (e.g., `-m gpt-5.5`). |
| `-c key=value` | Override config values, e.g., `-c model_reasoning_effort=high`. There is **no** `--effort` flag — effort/reasoning depth is set via `-c` or a profile in `~/.codex/config.toml`. |
| `-p, --profile <NAME>` | Use a named configuration profile (`~/.codex/config.toml`). |

### Empirical note on long prompts

In our environment we observed `codex exec` with very long prompts passed as positional arguments occasionally hang on "Reading additional input from stdin…". Piping the prompt via stdin (`< prompt.txt`) resolved this in our case. We did not trace the root cause; it may be a shell/argv interaction, a quoting issue, or something else specific to our setup, so we report this as an empirical observation, not a known bug. **If your `codex exec` hangs, check stdin handling first — try `< /dev/null` or pipe the prompt — and search the [Codex issue tracker](https://github.com/openai/codex/issues) for current reports matching your symptoms.**

### Budget and effort

Substantive reviews at high reasoning effort take 5–15 minutes per round. Budget for it.

```bash
# Example: high reasoning effort via config override
codex exec --json --ephemeral -c model_reasoning_effort=high < prompt.txt > out.jsonl
```

### Showing the review trail to the human

After Codex finishes, Claude parses the output (`-o` makes this trivial: it's just the final message text) and surfaces the findings + which were fixed. The human sees the review trail — not "Codex said OK."

## Thinking Partner Mode (All Four ON)

Most prompts pick one of these. The agreement says all four are always on:

| Mode | When it fires | What it does |
|---|---|---|
| **Critical thinking** | Always | Challenge assumptions, surface risks, propose alternatives |
| **System decomposition** | Complex problems | Break into sub-problems; 2–3 approaches with tradeoffs |
| **First principles** | Learning a new topic | Fundamentals → build up → flag misconceptions |
| **Expert mode** | The human is executing | Practitioner-to-practitioner; skip beginner explanations |

The mode you *emphasize* changes with the task. The discipline never turns off.

## Anti-Patterns Claude Is Instructed to Refuse

This is the negative complement — what Claude is told to refuse, even if the human asks. CLAUDE.md doesn't *prevent* Claude from doing these things; it instructs Claude to refuse and explain why. If Claude does any of these, the human references the agreement and re-anchors.

```
1. Ship without verification evidence
2. "I'll send the next one to codex" (no — send THIS one)
3. "This is too simple to question" (no — question it)
4. Cite counts/timings without re-checking disk/git state in the same turn
5. Propose a solution without naming at least one alternative + the tradeoff
6. Mark anything "done" without evidence (test output, build log, manual repro)
7. Agree quickly to make the human happy. Disagreement is a feature.
```

If you (the human) find yourself reading Claude's output and thinking "this feels surprisingly smooth," check the agreement. **Unexpectedly frictionless responses on high-stakes work are a warning sign — they often signal a skipped verification step.** Friction is a feature.

## Session-Context Hygiene

Long projects span dozens of sessions. The agreement requires Claude to save a session-memory file on:
- Major milestone completion
- Before context compaction
- Before any break

Claude Code's auto-memory directory is derived from the project's path. To find yours, run a session and ask Claude to save a test memory; check where the file lands. (Don't hardcode paths from someone else's project — Claude Code derives the path automatically.)

Each save records: what was accomplished, current status with file:line refs, what to pick up next, blockers. This is the crash-resilience layer.

## What "Quality First" Means in Practice

The agreement defines five concrete tests for every claim:

1. **Citation:** every claim has a `file:line`, sweep timestamp, or commit hash
2. **Same-turn verification:** every count was verified in the same response that cited it
3. **Named alternative:** every plan named what it rejected and why
4. **Codex pass:** every artifact went through Codex before the human saw it
5. **Evidence-backed "done":** every completion came with a verifiable link

If any of these is missing, the work isn't done.

## How to Adopt This for Your Project

### Step 1 — Drop the agreement into your project `CLAUDE.md`

Append a "Working Agreement" section using the template at the bottom of this entry.

### Step 2 — Wire up Codex

Install [Codex CLI](https://github.com/openai/codex):

```bash
npm install -g @openai/codex@latest

# Verify
codex --version
codex exec --json --ephemeral <<< "Reply OK"
```

If `codex exec` hangs with a long prompt passed as a positional argument, switch to stdin piping (`< prompt.txt`).

### Step 3 — Run a first session under the agreement

Pick a small task. Watch for:
- Does Claude ask before assuming? (Should — rule 2)
- Does Claude name an alternative? (Should — rule 4)
- Does Claude send to Codex BEFORE reporting? (Should — review step)
- Does Claude push back on a weak claim? (Should — rule 3)

If any answer is no, copy the rule and paste it back: "Rule N says X — apply it."

### Step 4 — Refine via correction

The agreement evolves. When Claude makes a mistake, capture the failure mode AND the prevention rule. Add it to the agreement. Over weeks the agreement becomes increasingly load-bearing.

### Step 5 — Add hooks for hard enforcement

If you find yourself reminding Claude of the same rule repeatedly, that's a candidate for a [Claude Code hook](https://docs.anthropic.com/en/docs/claude-code/settings#hooks). Hooks fire deterministically on tool calls — unlike CLAUDE.md instructions, which Claude is free to interpret.

## When This Agreement Is Wrong

This is for **deep research work**. It is NOT appropriate for:
- Quick prototyping where speed > correctness
- Throwaway scripts
- Tasks where you actively want one quick answer, not a discussion
- Pair-programming a known-good pattern

For those, default Claude is better. The agreement is the heavy-duty version.

## Differences from Adjacent Approaches

| Approach | Focus | When to use |
|---|---|---|
| [AI Research Workflow Pipeline](/learnAIDoc/wiki/ai-research-workflow-pipeline/) | WHAT to do (7 stages) | When designing the research plan |
| [Anti-Sycophancy System Prompt](/learnAIDoc/wiki/anti-sycophancy-system-prompt/) | Tone (stop flattery) | Drop into any project |
| **This Working Agreement** | HOW to collaborate (6 rules + review step + modes + anti-patterns) | When the project is high-stakes and multi-session |

You can use all three. The pipeline tells you what stage you're at, anti-sycophancy bakes in the tone, and this agreement defines the moment-by-moment behavior at every stage.

## The Full Template

Copy this into your project `CLAUDE.md`:

```markdown
## Working Agreement (Quality-First Research Partnership)

> **Established:** YYYY-MM-DD. This is a research collaboration.
> The defaults below OVERRIDE generic speed-first behavior.

### Behavioral defaults (in priority order)

1. **Quality and confidence first, speed last.** Never rush.
2. **Ask, don't assume.** When intent is ambiguous, ask.
3. **Challenge, don't agree.** Default to disagreement when claims
   have weak evidence.
4. **Force deep thinking.** Decompose; offer 2–3 approaches with
   tradeoffs.
5. **No sloppiness.** Counts, paths, line numbers, timings must be
   verified against disk/git state in the same turn they're cited.
6. **Don't let me be sloppy either.** Surface what's missing.

### Codex review step

- Every substantive output goes through Codex BEFORE reporting.
- Invocation: pipe the prompt via stdin —
  `codex exec --json --ephemeral < prompt.txt > out.jsonl 2>&1`
  (passing long prompts as a positional argument can hit
  stdin/argv handling issues in some shells).
- For high reasoning effort: `-c model_reasoning_effort=high`
  (there is no `--effort` flag).
- For just the final message: `-o final.txt`.
- Loop: draft → codex → fix → codex → SHIP.
- Show me the codex findings, not just the verdict.

### Thinking partner mode (all four ON)

- Critical thinking, system decomposition, first principles,
  expert mode — all simultaneously active.

### Anti-patterns Claude is instructed to refuse

- Ship without verification evidence.
- "I'll send the next one to codex" — send THIS one.
- "This is too simple to question" — question it.
- Cite counts/timings without re-checking disk state same turn.
- Propose a solution without naming the rejected alternative.
- Mark anything "done" without evidence.
- Agree quickly to make me happy.

### Session-context hygiene

- Save memory file on milestone, before compaction, before break.
- Memory directory: auto-derived by Claude Code from the
  project's path (do not hardcode).

### "Quality first" tests for every claim

1. Citation (file:line, timestamp, or commit hash)
2. Same-turn verification
3. Named alternative + tradeoff
4. Codex pass logged
5. Evidence-backed "done"

### Hard enforcement (if a rule keeps getting skipped)

Use Claude Code hooks instead of relying on CLAUDE.md
instructions. Hooks fire on tool calls regardless of how
Claude interprets the agreement.
```

## Important Things to Know

- **The agreement evolves.** Treat it as a living document. When you correct Claude, capture the failure mode AND the prevention rule.
- **Codex is a reviewer, not an oracle.** Codex *can catch* different bugs than Claude (different model family), but it isn't infallible. The agreement says "loop until Codex says SHIP," not "Codex is right."
- **Friction is a feature.** If interactions feel smoother than usual, check whether Claude is skipping a step.
- **Show, don't tell.** When Claude pushes back, it should show you the evidence (file:line, sweep result, Codex finding) — not just an opinion.
- **CLAUDE.md is advisory.** For mandatory behavior, complement with hooks.
- **This works for serious projects.** For a quick prototype, default Claude is fine. The agreement is for the work where being wrong costs real time.

## Sources & Further Reading

- [AI-Assisted Research Workflow: Formulate → Find → Judge → Verify → Execute → Monitor → Record](https://weihaoqu.github.io/learnAIDoc/wiki/ai-research-workflow-pipeline/) — the WHAT-to-do counterpart to this WHAT-CLAUDE-DOES agreement
- [Anti-Sycophancy Prompt — Stop AI from Flattering You, Get Accurate Answers](https://weihaoqu.github.io/learnAIDoc/wiki/anti-sycophancy-system-prompt/) — the tone-level fix
- [Towards Understanding Sycophancy in Language Models (Sharma et al., arXiv 2023)](https://arxiv.org/abs/2310.13548) — academic background on why default LLMs flatter
- [Anthropic — Protecting User Wellbeing](https://www.anthropic.com/news/protecting-well-being-of-users) — Anthropic's published acknowledgment that sycophancy is a real problem
- [Codex CLI (GitHub)](https://github.com/openai/codex) — the Codex tool used as the review step
- [Claude Code Hooks documentation](https://docs.anthropic.com/en/docs/claude-code/settings#hooks) — for hard enforcement beyond CLAUDE.md advisory instructions
