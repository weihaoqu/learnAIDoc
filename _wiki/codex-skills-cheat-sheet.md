---
title: "Codex Skills Cheat Sheet — When to Use Your Installed Skill Stack"
date: 2026-05-22
category: Skills & Plugins
tags: [codex, skills, plugins, workflow, testing, security, research, writing]
related: ["grill-me — When AI Interviews You Before Writing Code", "Matt Pocock's Skills — Claude Code for Real Engineers", "Best Claude Code Plugins", "Claude Code Skills: Resources & Repos", "Cross-Model Code Review — Why Claude Can't Catch Its Own Bugs"]
icon: "🧭"
image: "/assets/images/codex-skills-cheat-sheet.png"
---

This is the operating manual for the Codex skills installed in Q's local `~/.codex/skills` folder. Think of a skill as a task-specific playbook: Codex may infer relevant skills in some environments, but the reliable path is to invoke the skill explicitly with `$skill-name` or by saying `Use skill-name`.

*Sources: [OpenAI: Plugins and skills](https://openai.com/academy/codex-plugins-and-skills/) | [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills) | [mattpocock/skills](https://github.com/mattpocock/skills) | [trailofbits/skills](https://github.com/trailofbits/skills) | [voidful/academic-skills](https://github.com/voidful/academic-skills) | [RoggeOhta/awesome-codex-cli](https://github.com/RoggeOhta/awesome-codex-cli)*

## Quick chooser

Use this table when you know the job but not the skill name.

| Situation | Use this skill | Ask Codex like this |
|---|---|---|
| A web UI needs manual verification | `webapp-testing` | `Use webapp-testing to verify the main flow on localhost:3000.` |
| A bug is vague, flaky, or hard to isolate | `diagnose` | `Use diagnose on this failing test and build a repro loop before fixing.` |
| You do not understand a module yet | `zoom-out` | `Use zoom-out and map the relevant modules, callers, and data flow.` |
| A plan is underspecified | `grill-me` | `Use grill-me to stress-test this plan one question at a time.` |
| Architecture feels shallow or tangled | `improve-codebase-architecture` | `Use improve-codebase-architecture and propose deepening opportunities.` |
| You changed auth, crypto, external calls, or business logic | `differential-review` | `Use differential-review on my current git diff.` |
| Config might fail open in production | `insecure-defaults` | `Use insecure-defaults to audit env vars, secrets, and permissive defaults.` |
| GitHub Actions runs AI agents | `agentic-actions-auditor` | `Use agentic-actions-auditor on .github/workflows.` |
| Dependencies may be abandoned or takeover-prone | `supply-chain-risk-auditor` | `Use supply-chain-risk-auditor to audit this project's dependencies.` |
| Starting or modernizing Python code | `modern-python` | `Use modern-python to set up uv, ruff, ty, pytest, and security hooks.` |
| Turning commits into release notes | `changelog-generator` | `Use changelog-generator for commits since v1.2.0.` |
| Writing a sourced article or tutorial | `content-research-writer` | `Use content-research-writer to outline, research, and cite this article.` |
| Looking for research ideas | `idea-generation` | `Use idea-generation to brainstorm research ideas in this area.` |
| Designing experiments | `experiment-design` | `Use experiment-design to plan baselines, ablations, metrics, and compute budget.` |
| Evaluating an advisor or lab | `professor-fit-analyzer` (`professor-fit-analyser` folder) | `Use professor-fit-analyzer on this professor profile and my background.` |
| Writing or checking a proof | `proof-writer` | `Use proof-writer to formalize and prove this theorem in LaTeX.` |

## How skills fit together

Skills work best as a workflow, not as isolated magic words. Pick one skill for the current phase, then switch when the phase changes.

```text
New codebase or unfamiliar area
        |
        v
   zoom-out
        |
        v
grill-me or improve-codebase-architecture
        |
        v
implementation
        |
        v
webapp-testing or diagnose
        |
        v
differential-review / insecure-defaults / supply-chain-risk-auditor
```

The mental model:

| Phase | Goal | Best skill |
|---|---|---|
| Understand | Build the map before touching code | `zoom-out` |
| Decide | Force hidden requirements into the open | `grill-me` |
| Design | Find better seams and deeper modules | `improve-codebase-architecture` |
| Prove behavior | Make the app/test fail or pass deterministically | `webapp-testing`, `diagnose` |
| Review risk | Catch regressions, bad defaults, and dependency risk | Trail of Bits security skills |
| Explain or publish | Turn work into changelogs, articles, or research notes | Composio writing skills |

## Everyday coding flow

### `zoom-out`

Use this first when you are lost. It asks Codex to go up a layer of abstraction and map modules, callers, and vocabulary instead of immediately editing files.

Good prompts:

```text
Use zoom-out on the auth flow. I want a map before we change anything.
```

```text
Use zoom-out to explain how slide generation moves from upload to rendered output.
```

Use it when:

- You are new to a repository.
- A file has too many callers.
- You suspect a bug lives in system flow, not a single function.
- You need a diagram or module map before coding.

Avoid it when:

- The change is obvious and local.
- You already have a failing test and just need a fix loop; use `diagnose` instead.

### `grill-me`

Use this when the request is underdefined. The skill asks one question at a time, gives a recommended answer, and keeps going until the plan is concrete.

Good prompts:

```text
Use grill-me to stress-test this plan before we implement it:
[paste plan]
```

```text
Use grill-me on this new wiki feature. Ask one question at a time and recommend defaults.
```

Use it when:

- You are about to build a feature but requirements feel fuzzy.
- You want a pre-mortem before implementation.
- You are designing a course, paper outline, workflow, or architecture.

Avoid it when:

- You need speed more than clarity.
- The task is a tiny mechanical edit.
- You do not want to answer questions.

### `diagnose`

Use this for bugs. Its core rule is: build a fast, deterministic feedback loop before hypothesizing. That loop can be a failing test, curl script, CLI fixture, Playwright script, replayed trace, or throwaway harness.

Good prompts:

```text
Use diagnose. This test is flaky; build a loop that reproduces it before changing code.
```

```text
Use diagnose on this production-only error. Start by identifying what artifact we need to reproduce it.
```

Use it when:

- Something is broken, slow, flaky, or throwing.
- You are tempted to guess the root cause.
- You need a regression test after the fix.

Avoid it when:

- The issue is just a missing import or typo.
- You cannot access enough evidence to build any loop; in that case, first ask for logs, HAR files, screenshots, traces, or exact reproduction steps.

### `improve-codebase-architecture`

Use this for architecture review, not quick refactors. It looks for shallow modules, poor locality, bad seams, and places where a deeper module would make tests and maintenance easier.

Good prompts:

```text
Use improve-codebase-architecture on the slide export pipeline. Generate candidates only; do not edit code yet.
```

```text
Use improve-codebase-architecture to find modules that are shallow wrappers.
```

Use it when:

- You feel every change requires touching too many files.
- There are abstractions that do not buy leverage.
- Tests are hard because behavior is split across many small pieces.

Avoid it when:

- You need a hotfix.
- You cannot afford an architecture conversation.
- The project has no stable behavior yet; first make it work and test it.

## Testing and release notes

### `webapp-testing`

Use this for local web apps. It prefers native Python Playwright scripts, waits for `networkidle` on dynamic apps, and can use `scripts/with_server.py` to manage one or more local servers.

Good prompts:

```text
Use webapp-testing to verify the login-to-export flow on localhost:3000. Capture screenshots and console errors.
```

```text
Use webapp-testing with a dev server. First run the helper with --help, then write a minimal Playwright check.
```

Use it when:

- You need to prove a UI flow works.
- You need screenshots, browser logs, or DOM inspection.
- A frontend bug only appears after JavaScript renders.

Avoid it when:

- The app is pure static HTML and direct file inspection is enough.
- The issue is backend-only; use `diagnose` with a curl or CLI loop.

### `changelog-generator`

Use this only for changelogs and release notes. It turns git commits into user-facing categories like features, improvements, fixes, breaking changes, and security notes.

Good prompts:

```text
Use changelog-generator for commits since v2.4.0. Keep it user-facing and ignore internal refactors unless they changed behavior.
```

```text
Use changelog-generator to write this week's product update from git history.
```

Use it when:

- You are preparing a release.
- You need customer-facing release notes.
- You want to translate technical commits into plain language.

Avoid it when:

- You are writing a normal article or tutorial; use `content-research-writer`.
- The git history is messy and you have no product context; provide context first.

## Security review

### `differential-review`

Use this on diffs, PRs, or commits. It is risk-first: auth, crypto, value transfer, validation removal, external calls, and security-sensitive refactors get deeper review than comments or UI-only changes. The skill expects to produce a markdown report, not just a quick chat summary.

Good prompts:

```text
Use differential-review on my current git diff. Focus on auth, external calls, and missing tests.
```

```text
Use differential-review between main and this branch. Write the report to a markdown file.
```

Use it when:

- You changed security-sensitive code.
- You need a second-pass review before commit.
- You want blast radius and test coverage called out explicitly.

Avoid it when:

- You only need style cleanup.
- The change is greenfield scaffolding, docs-only, formatting-only, or linting-only.
- You need a full application penetration test; this is diff review, not runtime testing.

### `insecure-defaults`

Use this to find fail-open defaults: fallback secrets, default credentials, permissive CORS, weak crypto choices, debug flags, or environment variables that quietly fall back to unsafe values.

Good prompts:

```text
Use insecure-defaults to audit config, auth, env var handling, Docker, and deployment files.
```

```text
Use insecure-defaults before deployment. Distinguish test fixtures from production-reachable defaults.
```

Use it when:

- Preparing a deployment.
- Reviewing config management.
- Auditing auth, crypto, API keys, or environment variables.

Avoid it when:

- You only care about known CVEs; use dependency scanners too.
- The file is clearly a docs example, test fixture, or template.

### `agentic-actions-auditor`

Use this when a repository has GitHub Actions workflows that run AI agents such as Claude Code Action, Gemini CLI, OpenAI Codex, or GitHub AI Inference. It focuses on prompt injection paths, attacker-controlled event data, dangerous sandbox settings, wildcard user allowlists, and AI output passed into shell/eval paths.

Good prompts:

```text
Use agentic-actions-auditor on this repo's .github/workflows. Report risks only; do not modify workflows.
```

```text
Use agentic-actions-auditor on owner/repo and check pull_request_target, issue_comment, env intermediaries, and sandbox settings.
```

Use it when:

- CI runs coding agents.
- External contributors can trigger workflows.
- You see `pull_request_target`, `issue_comment`, agent prompts, or broad tool permissions.

Avoid it when:

- The repo has no AI-agent workflows.
- The CI system is not GitHub Actions.
- You need runtime exploitation testing; this is static analysis guidance.

### `supply-chain-risk-auditor`

Use this to assess dependency takeover risk: single maintainers, stale projects, low popularity, risky features, past CVEs, missing security contacts, and questionable alternatives. It is not a replacement for `npm audit`, `pip-audit`, or other vulnerability scanners.

Good prompts:

```text
Use supply-chain-risk-auditor to assess direct dependencies and produce a risk report.
```

```text
Use supply-chain-risk-auditor before this security engagement. Focus on abandoned or single-maintainer packages.
```

Use it when:

- You are preparing a security review.
- You are deciding whether to trust a package.
- You need a qualitative dependency health report.

Avoid it when:

- You only need license compliance.
- You need active vulnerability scanning.
- You cannot use `gh` or provide repository URLs for dependencies.

## Python projects

### `modern-python`

Use this when starting or modernizing Python projects. It prefers `uv`, `ruff`, `ty`, `pytest`, dependency groups, `uv run`, and modern security hooks.

Good prompts:

```text
Use modern-python to set up this new Python CLI with uv, ruff, ty, pytest, and pyproject.toml.
```

```text
Use modern-python to migrate this small script from requirements.txt to PEP 723 inline metadata.
```

Use it when:

- Creating a Python project or package.
- Writing standalone scripts with dependencies.
- Migrating from older tooling, if you want that migration.

Avoid it when:

- The project intentionally uses Poetry, pip-tools, mypy, or pyright and you want to preserve that.
- The project must support Python below 3.11.
- Python is not central to the repo.

## Writing and research

### `content-research-writer`

Use this for sourced prose: blog posts, tutorials, case studies, educational notes, and documentation with citations. It is a writing partner: outline, research, hook, draft, section feedback, and polish.

Good prompts:

```text
Use content-research-writer to outline a tutorial on Codex skills, then research sources and propose citations.
```

```text
Use content-research-writer to review this section for flow, clarity, and source support.
```

Use it when:

- Writing public-facing educational content.
- Adding citations and examples.
- Improving hooks, structure, or section flow.

Avoid it when:

- You are generating release notes from commits; use `changelog-generator`.
- You need academic proof writing; use `proof-writer`.

### Academic skills

The voidful academic skills are useful, but be explicit about output language. `professor-fit-analyzer` explicitly defaults to Traditional Chinese and switches to English when you write in English; `proof-writer` says explanations use Traditional Chinese. `idea-generation` and `experiment-design` are mostly written in Chinese, so request English if that is what you want.

| Skill | Use when | Good prompt |
|---|---|---|
| `idea-generation` | You need research directions or a 1-page proposal | `Use idea-generation in English. Generate 10 candidate ideas, search for novelty, then converge to 2.` |
| `experiment-design` | You need baselines, ablations, metrics, and compute planning | `Use experiment-design in English. Turn this hypothesis into baselines, ablations, metrics, and budget.` |
| `proof-writer` | You need a formal theorem/proof workflow | `Use proof-writer in English. Extract the theorem assumptions, choose a strategy, and write LaTeX.` |
| `professor-fit-analyzer` | You need to evaluate an advisor/lab from public evidence. Local folder: `professor-fit-analyser`. | `Use professor-fit-analyzer in English. Here is the professor site and my background.` |

Good research stack:

```text
idea-generation
    -> experiment-design
        -> proof-writer
            -> content-research-writer
```

Use this when:

- You are moving from a vague research direction to an experiment plan.
- You need to prove a claim before writing the paper around it.
- You are deciding whether a professor or lab is a good fit.

Avoid it when:

- You need a quick summary of a paper; this install intentionally skipped the heavier `paper-reading` route.
- You need verified citations; ask Codex to browse and cite sources explicitly.

## Prompt recipes

Copy these as starting points.

```text
Use zoom-out first. I am unfamiliar with this code path. Map the modules, callers, data flow, and likely change points. Do not edit code yet.
```

```text
Use grill-me to interview me about this feature plan one question at a time. For each question, give your recommended answer before waiting for mine.
```

```text
Use diagnose. Reproduce the bug with the fastest deterministic loop you can build, rank 3-5 hypotheses, then fix only after the loop proves the failure.
```

```text
Use webapp-testing. Start the local server if needed, run a Playwright check, capture console errors, and verify the user-visible flow.
```

```text
Use differential-review on the current git diff. Prioritize auth, crypto, validation, external calls, missing tests, and blast radius.
```

```text
Use insecure-defaults. Search production-reachable config and auth code for fail-open defaults, then separate real findings from test fixtures and docs examples.
```

```text
Use supply-chain-risk-auditor. Identify direct dependencies with takeover or abandonment risk, and suggest safer alternatives when useful.
```

```text
Use content-research-writer. Create an outline, research sources, add citations, and critique each section for clarity and flow.
```

```text
Use changelog-generator for commits since the last tag. Write customer-facing release notes and ignore internal-only churn unless it changed behavior.
```

## A few practical rules

1. **Name the skill explicitly when you care.** Codex may infer relevant skills in some environments, but `$diagnose` or `Use diagnose...` is clearer than hoping the right playbook triggers.
2. **One skill per phase.** Do not ask for `zoom-out`, `diagnose`, and `differential-review` all at once. Use them sequentially.
3. **Treat security skills as review aids.** They surface risks and reports; they do not replace tests, scanners, threat modeling, or deployment checks.
4. **Avoid skill hoarding.** `awesome-codex-cli` is useful as an index, but installing every skill creates noise and supply-chain risk.
5. **Restart after installing.** Codex needs a restart or new session before newly installed skills reliably appear.
6. **Keep project instructions in charge.** `AGENTS.md` still defines repo-specific rules. Skills should refine the workflow, not override project safety gates.

## What Q should use most often

For day-to-day Codex work, start with these five:

| Rank | Skill | Why it earns the slot |
|---|---|---|
| 1 | `zoom-out` | Prevents editing before understanding. |
| 2 | `grill-me` | Turns vague intentions into a real spec. |
| 3 | `diagnose` | Stops guess-and-check debugging. |
| 4 | `webapp-testing` | Gives visible proof that frontend behavior works. |
| 5 | `differential-review` | Catches security-sensitive regressions before commit. |

The rest are situational: `modern-python` for Python setup, `insecure-defaults` before deploys, `supply-chain-risk-auditor` before trusting dependencies, `content-research-writer` and `changelog-generator` for publishing, and the academic skills when the task is research-shaped.
