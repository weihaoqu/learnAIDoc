---
title: "AI Health Vault — Private Family Health Management with Obsidian + Claude"
date: 2026-04-02
category: Skills & Plugins
redirect_from:
  - "/wiki/tools/ai-health-vault-obsidian/"
tags: [obsidian, health, claude-code, skills, privacy, templates, family, apple-watch, medical-records]
related: ["Claude Code Hooks — Automate Your Workflow with Event-Driven Scripts", "Non-Coding Superpowers — 50 Things Claude Code Can Do That Aren't Programming"]
icon: "🏥"
image: "/assets/images/ai-health-vault-obsidian.png"
---

Your parents' medical reports are scattered across hospitals. Nobody tracks medication changes or follow-up dates. Commercial health apps want your data on their servers. **AI Health Vault** solves this with a different approach: an Obsidian vault with templates, prompts, and 8 Claude Code skills that turn your local folder into a private, AI-powered health archive for your whole family.

*Source: [GitHub — runesleo/ai-health-vault](https://github.com/runesleo/ai-health-vault)*

## Why This Exists

The problem is real and personal:

- Medical reports scattered across hospitals — no one tracks trends for you
- Parents can't remember their own medications, dosages, or follow-up dates
- Commercial health apps require uploading private health data to their servers
- You just need **local templates** where the data stays on your machine

## How It Works

```
Photo of medical report
        │
        ▼
Claude Code skill: extract
        │
        ▼
Structured Obsidian note
(per-person, per-checkup)
        │
        ▼
┌───────────────────────────────────┐
│  AI Health Vault (local Obsidian) │
│                                   │
│  📁 Family Member A               │
│  ├── Checkup 2026-03-15          │
│  ├── Checkup 2026-01-10          │
│  └── Medications (CSV)           │
│                                   │
│  📁 Family Member B               │
│  ├── Surgery Record              │
│  ├── Condition History           │
│  └── Apple Watch Data            │
│                                   │
│  📊 Trend Analysis               │
│  📅 Follow-up Calendar           │
│  💊 Medication Recognition       │
└───────────────────────────────────┘
```

## 8 Pre-Built Claude Code Skills

The vault ships with 8 skills in `.claude/skills/` that auto-load when you open Claude Code in the vault directory:

| Skill | What It Does |
|---|---|
| **Report Extraction** | Photograph a medical report → structured note with all values, ranges, and flags |
| **Medication Recognition** | Photo of pill box → drug names, dosages, interactions |
| **Trend Analysis** | Compare multiple checkups → spot anomalies and changes over time |
| **Doctor Visit Prep** | Generate pre-visit checklist: questions to ask, records to bring, history summary |
| **Apple Watch Analysis** | Parse health data exports → actionable insights on heart rate, sleep, activity |
| **Plain Language Conversion** | Convert medical jargon into family-friendly explanations |
| **Calendar Generation** | Extract follow-up dates → Obsidian calendar entries with reminders |
| **Daily Health Plan** | Personalized daily plan based on conditions, medications, and lifestyle |

## 30-Minute Setup

```bash
# Clone the vault
git clone https://github.com/runesleo/ai-health-vault.git
cd ai-health-vault

# Open in Obsidian
# File → Open Vault → select vault/ folder

# Fill in family member names in the central hub
# Then: photograph a report → send to Claude → done
```

For Claude Code users:
```bash
cd ai-health-vault
claude
> "Help me analyze this checkup report" (attach photo)
```

The 8 skills auto-load — no manual prompt copy-paste needed.

## Privacy Model

| Approach | Privacy Level | How |
|---|---|---|
| **Anthropic API** | High | Anthropic does not use API inputs for model training |
| **ChatGPT (training off)** | Medium | Disable training in settings |
| **Local models (Ollama/LM Studio)** | Maximum | Nothing leaves your machine |

All data lives in your local Obsidian vault. The AI only sees what you explicitly send it (e.g., a photo of a report). No persistent cloud storage, no account, no data harvesting.

## What Makes This Interesting

This isn't a complex engineering project — it's **8 well-crafted prompts + a folder structure**. But that's exactly why it matters:

1. **Skills as the product** — The entire value is in the Claude Code skills and Obsidian templates. No backend, no database, no deployment. This is what "software is prompts" looks like in practice.
2. **Family-scale AI** — Most AI tools target individual productivity. This targets family health — a use case where data privacy and long-term continuity matter more than features.
3. **Obsidian as platform** — Shows Obsidian's potential as more than a note-taking app: with the right templates + AI skills, it becomes a domain-specific application.

## How LearnAI Team Could Use This

- Build an internal privacy-first health-record demo showing how local vaults, templates, and AI skills can become a practical domain app.
- Use the project as a case study for prompt-packaged workflows: skills, folder structure, and repeatable outputs instead of a traditional SaaS backend.
- Adapt the pattern for other sensitive-document workflows such as insurance, elder care, school records, or legal paperwork where local-first storage matters.

## Real-World Use Cases

- Adult children organizing parents' checkups, medication lists, follow-up dates, and doctor-visit notes in one local vault.
- Families comparing lab reports over time to spot changes worth discussing with a clinician.
- Caregivers preparing concise visit summaries and question lists before appointments.
- Privacy-conscious users extracting structured notes from medical reports without storing a full health history in a commercial app.

## Links

- **GitHub:** [runesleo/ai-health-vault](https://github.com/runesleo/ai-health-vault)
- **Chinese README:** [README_CN.md](https://github.com/runesleo/ai-health-vault/blob/main/README_CN.md)
