---
title: "Feynman AI Research Agent & Claude as Lab Partner — Promise and Pitfalls"
date: 2026-03-31
category: AI for Research
redirect_from:
  - "/wiki/ai research/feynman-ai-research-agent/"
tags: [ai-research, feynman, agents, literature-review, physics, hallucination, academic, reproducibility]
related: ["Claude Code as Research Infrastructure — From Chatbot to AI Research Team", "AI Agents for Academic Research & Writing — From KatmerCode to the Nature Playbook", "Paper2Code: Turn ArXiv Papers into Citation-Anchored Code", "AI-Assisted Research Workflow: Formulate → Find → Judge → Verify → Execute → Monitor → Record", "Awesome-Auto-Research-Tools — A Curated Map of Automated-Science Projects", "academic-research-skills — Imbad0202's 4-Skill Claude Code Pipeline for Academic Research"]
icon: "🔬"
image: "/assets/images/feynman-ai-research-agent.png"
---

This entry combines two separate lessons that should not be conflated. **Feynman** is a current open-source research agent for paper search, cited research briefs, reviews, audits, drafts, and replication planning. The physics story below is a saved methodology anecdote about supervising LLM-assisted scientific work; it is useful as a caution, but it is not a verified Feynman case study.

*Sources for Feynman tool claims: [Feynman official site](https://www.feynman.is/) | [companion-inc/feynman on GitHub](https://github.com/companion-inc/feynman). The physics anecdote and commander framework were saved from social-source notes without durable permalinks; treat them as methodology prompts, not independently verified reporting.*

## Feynman: Open-Source AI Research Agent

Feynman is a local research agent and science workbench. You can ask it a research question from the terminal, run workflows such as `deepresearch`, `lit`, `rank`, `audit`, `replicate`, or `draft`, or open the local workbench with `feynman serve`. Its official framing is simple: it reads papers, searches the web, writes research drafts, plans experiments, and cites research claims.

```
User: /deepresearch "transformer attention mechanisms"
         ↓
┌──────────────────────────────────────────────┐
│            Feynman Agent Orchestra            │
├────────────┬────────────┬────────────────────┤
│ Literature │  Critical  │    Experiment      │
│  Search    │  Review    │   Replication      │
│            │            │                    │
│ AlphaXiv   │ Methodology│ Code generation    │
│ parsing    │ audit      │ + execution        │
│ + ranking  │ + gaps     │ + validation       │
└────────────┴────────────┴────────────────────┘
         ↓
Cited report with precise references + linked code
```

### Key Commands

| Command | What It Does |
|---------|-------------|
| `feynman "<question>"` | Paper/web search with a cited research brief |
| `feynman deepresearch <topic>` or `/deepresearch <topic>` | Source-heavy multi-agent investigation with synthesis and verification |
| `feynman lit <topic>` or `/lit <topic>` | Literature review from paper search and primary sources |
| `feynman rank <topic>` | PaperRank-style triage for deciding what to read first |
| `feynman audit <paper-or-item>` or `/audit <item>` | Paper-to-code mismatch audit for reproducibility claims |
| `feynman replicate <paper-or-claim>` or `/replicate <paper>` | Replication plan; execution is gated on an explicit environment choice |
| `feynman serve` | Local science workbench for projects, chat, artifacts, notebooks, compute, provenance, and settings |

### Features at a Glance

| Feature | Details |
|---------|---------|
| **Architecture** | Pi-based runtime with bundled research agents |
| **Bundled agents** | Researcher, Reviewer, Writer, Verifier |
| **Interfaces** | Terminal CLI and local science workbench |
| **Research workflows** | Deep research, literature review, paper ranking, paper/code audit, replication planning, draft generation |
| **Execution options** | Replication and benchmark workflows require an explicit environment choice; docs mention Docker, Modal, and RunPod-style execution options |
| **Citation policy** | Research claims are intended to link to papers, docs, or repos with direct URLs |
| **Target users** | Scientists, engineers, research teams, and students learning auditable research workflows |
| **License** | MIT |

The design direction is the useful part for this wiki: claims should connect to sources, paper claims should connect to code where possible, and experiments should preserve provenance.

## The Physics Case Study: Claude as Grad Student

A saved anecdote described a professor using Claude on a theoretical-physics reproduction task. Because the original durable permalink is not preserved in this repo, use this section as a workflow warning, not as a citable case report. The lesson still matters: LLMs can accelerate computation, drafting, and code scaffolding, but a domain expert has to verify every coefficient, citation, and statistical claim.

### What Worked — Spectacularly

| Metric | Result |
|--------|--------|
| **Paper draft** | 20 pages in 3 days |
| **Iterations** | 110+ standalone versions in 2 weeks |
| **Token consumption** | 36 million tokens |
| **CPU simulation time** | 40+ hours of local computation |
| **Self-organization** | AI set its own plan, built structure, split into 102 subtasks |

The tasks that make human grad students miserable — writing Fortran interfaces, tuning Python plots, computing integrals — AI did in seconds, without complaint, without fatigue. It self-organized its workflow: set milestones, built document structure, progressively reasoned through sub-problems, and split 102 subtasks in orderly fashion.

### What Went Wrong — Dangerously

Mid-experiment, Claude exposed AI's fatal weakness in scientific work: **it tried to wing it.**

```
What the AI fabricated:
├── Made-up coefficients (looked plausible, were wrong)
├── Fabricated citation tables with real-sounding terminology
├── Statistical errors buried in calculations
└── "Plausible bullshitting" — correct form, wrong substance
```

In theoretical physics, this kind of confident fabrication is catastrophic. A wrong coefficient doesn't just give you a bad number — it can make your predictions **diverge enormously** from reality while still looking mathematically reasonable. The paper would have passed a casual review.

### The Save

The professor caught it. He forced point-by-point verification — every coefficient checked against source material, every citation confirmed, every statistical method validated. Once caught, Claude corrected the key errors and completed the full recalculation in **5 minutes**. A human grad student doing the same corrections? Roughly **2 weeks**.

```
AI Research Workflow (what actually works):

  AI generates ──→ Human verifies ──→ AI corrects ──→ Human validates
  (fast, broad)    (slow, precise)    (fast, targeted)  (final check)
      │                  │                  │                │
   3 days            catches errors      5 minutes       publishable
   110 drafts        fabrications         fixed           result
```

## Lessons Learned

### AI as Tireless Research Assistant

The physics case study proves AI can compress **weeks of tedious work into hours**: literature synthesis, code generation, integral computation, plot generation, document structuring. These are real, valuable capabilities for any research team.

### But: Verification Is Non-Negotiable

| AI Strength | AI Weakness |
|------------|-------------|
| Speed (seconds vs. weeks) | Fabricates when uncertain |
| Never tired, never complains | Cannot assess its own confidence |
| Handles 102 subtasks systematically | "Plausible bullshitting" — correct form, wrong substance |
| Self-organizes complex workflows | Won't tell you when it's guessing |
| Writes Fortran, Python, LaTeX fluently | Statistical errors look like real results |

### The "Taste" That Remains Human

The professor's final answer to "will physicists lose their jobs?" — **No.** Computing power and knowledge are becoming cheap as water. What remains uniquely human is **taste**: the judgment to choose which problems are worth pursuing among infinite paths. AI can explore any direction you point it toward, but it cannot tell you which direction matters.

## The Reusable Methodology: From Executor to Commander

The saved social notes extracted the professor's approach into a replicable framework. The core shift: **stop being an executor, become a commander.** Don't rely on AI's memory — give it searchable structured documents.

*Source note: original social-source summary, 2026-04; durable permalink not preserved. Keep the method if useful, but do not treat the numbers in the anecdote as independently verified facts.*

### Three Core Principles

| Principle | What It Means |
|---|---|
| **Clear I/O per task** | Every subtask has explicit input and output definitions — don't let AI guess your intent |
| **One-conversation granularity** | Each subtask should be completable within a single conversation |
| **Result persistence** | After completing a task, immediately save results as input for the next task — AI reads documents, not memory |

### The 7-Phase Execution Model

This is how the professor decomposed a year of work into 102 subtasks across 7 phases:

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ 1. Needs │──▶│ 2. Arch  │──▶│ 3. Module│──▶│ 4. Impl  │
│ Analysis │   │ Design   │   │ Decompose│   │ (one by  │
│          │   │          │   │          │   │  one)    │
│• Define  │   │• Problem │   │• Break   │   │• Priority│
│  problem │   │  structure│  │  into    │   │  order   │
│• Success │   │• Tech    │   │  subtasks│   │• Verify  │
│  criteria│   │  roadmap │   │• Clear   │   │  each    │
│• Key     │   │• Verify  │   │  I/O per │   │• Record  │
│  limits  │   │  approach│   │  subtask │   │  issues  │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
       │                                            │
       ▼                                            ▼
┌──────────┐   ┌──────────┐   ┌──────────┐
│ 5. Integ │──▶│ 6. Opt   │──▶│ 7. Docs  │
│ Testing  │   │ Iterate  │   │          │
│          │   │          │   │• Process │
│• Combine │   │• Test-   │   │  docs    │
│  modules │   │  based   │   │• Final   │
│• End-to- │   │  optimize│   │  paper   │
│  end test│   │• Adjust  │   │• Publish │
│• Fix     │   │  params  │   │  prep    │
│  issues  │   │          │   │          │
└──────────┘   └──────────┘   └──────────┘

Every phase ends with a CHECKPOINT — verify direction before continuing.
```

### Key Techniques

- **Incremental verification** — After each task, immediately check results. If problems found, adjust your prompts — **don't let AI self-correct** (it will rationalize errors instead of fixing them)
- **Structured documents** — All intermediate results saved as searchable files. AI doesn't need to remember what happened before — just reads documents to continue working
- **Error isolation** — One subtask failure doesn't affect others. Easy to locate and fix issues without cascading damage
- **Checkpoint design** — Every phase boundary has a verification gate. Ensures the project doesn't drift off course

### Three Tips for Anyone Replicating This

1. **Learn to decompose tasks** — Break big problems into small ones. AI handles one deterministic task at a time.
2. **Learn to design prompts with clear I/O** — Every prompt needs explicit input/output definitions. Don't let AI guess your intent.
3. **Learn to verify results** — AI output needs your judgment. This is not a burden — **it's your core competitive advantage.**

> "AI is ready to be your 'second-year grad student.' Are you ready to be the 'commander'?"

## Practical Guidance for Researchers

### Using Feynman or Similar Research Agents

1. **Start with `/lit`** to survey a field before committing to a direction
2. **Use `/audit`** on key papers before building on their results
3. **Run `/replicate`** in Docker isolation — never trust generated code on bare metal
4. **Cross-check citations** — even citation-focused tools can hallucinate references

### Using Claude/LLMs for Research Computation

1. **Assign structured tasks** — "reproduce this specific calculation" beats "explore this topic"
2. **Demand intermediate outputs** — check every step, not just the final result
3. **Watch for confident fabrication** — the more fluent the output, the more carefully you should verify
4. **Use it for drudge work** — Fortran interfaces, plotting, integral computation, formatting
5. **Never skip human verification** — especially for coefficients, citations, and statistical claims

### The Research Team of 2026

```
┌─────────────────────────────────────────┐
│         Modern Research Workflow          │
├─────────────────────────────────────────┤
│                                         │
│  Human researcher (taste + judgment)    │
│       │                                 │
│       ├── Feynman: literature + review  │
│       ├── Claude: computation + drafts  │
│       ├── Docker: safe code execution   │
│       └── Point-by-point verification   │
│                                         │
│  Output: faster research, same rigor    │
└─────────────────────────────────────────┘
```

For academic faculty: this is the emerging workflow. AI handles volume; you supply direction and verification. The professor who caught Claude's fabrications didn't need less expertise — he needed *more*. AI research tools don't replace domain knowledge; they make it more valuable than ever.

## How LearnAI Team Could Use This

- **Research workflow training** — Teach students how to decompose research projects into verifiable AI-assisted subtasks.
- **Literature review support** — Use Feynman-style agents to build citation-grounded paper maps before seminars or projects.
- **Replication assignments** — Have students audit or reproduce selected papers with Docker-isolated code execution.
- **Faculty research acceleration** — Use agents for first-pass synthesis, code scaffolding, and draft generation while keeping expert verification mandatory.

## Real-World Use Cases

1. **Academic labs** — Speed up literature review, experiment planning, and reproducibility checks.
2. **Graduate research** — Break thesis or paper work into small AI-assisted tasks with checkpoints.
3. **Industry R&D** — Evaluate papers before deciding whether to implement or benchmark new methods.
4. **Scientific writing** — Generate structured drafts while preserving human review for claims, citations, and statistics.
