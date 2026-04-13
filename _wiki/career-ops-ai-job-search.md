---
title: "Career-Ops — The AI Job Search System That Landed a Head of Applied AI Role"
date: 2026-04-13
category: Tools
tags: [claude-code, job-search, resume, career, automation, skill, open-source, interview-prep]
related: ["Claude Code Cheatsheet — Everything in One Place"]
icon: "💼"
image: "/assets/images/career-ops-ai-job-search.png"
---

Santiago Fernandez spent months applying to jobs the hard way after selling his 16-year business. So he engineered the system he wished he had: **Career-Ops**, a multi-agent job search pipeline built on Claude Code. Paste a job URL, get an A-F evaluation across 10 dimensions, a personalized ATS-optimized PDF resume, and a tracker entry — in minutes. He evaluated 740+ listings, generated 354 tailored CVs, and landed his target role as Head of Applied AI. Then he open-sourced everything.

*Source: [GitHub — santifer/career-ops](https://github.com/santifer/career-ops) (32.4k stars) | [santifer.io](https://santifer.io/career-ops-system)*

## How It Works

```
Paste job URL or description
         ↓
Archetype Detection (6 role types)
         ↓
A-F Evaluation (10 weighted dimensions)
         ↓
┌─────────────┬──────────────┬──────────────┐
│ Markdown    │ ATS-Optimized│ Tracker      │
│ Report      │ PDF Resume   │ Entry (TSV)  │
└─────────────┴──────────────┴──────────────┘
```

**Human-in-the-loop by design** — it automates analysis, not decisions. It never auto-submits applications. The creator read every report before applying.

## The 14 Skill Modes

| Command | What It Does |
|---------|-------------|
| `/career-ops {paste JD}` | Full pipeline: evaluate + PDF + tracker |
| `/career-ops scan` | Scan 45+ company portals for new listings |
| `/career-ops pdf` | Generate personalized ATS-optimized CV |
| `/career-ops batch` | Evaluate 122 URLs in parallel |
| `/career-ops tracker` | View application status dashboard |
| `/career-ops apply` | Fill application forms with AI |
| `/career-ops pipeline` | Process pending URLs |
| `/career-ops contacto` | LinkedIn outreach messaging |
| `/career-ops deep` | Deep company research |
| `/career-ops training` | Evaluate courses/certifications for career fit |
| `/career-ops project` | Evaluate portfolio projects |
| Interview Prep | STAR+Reflection story bank (5-10 master stories) |
| Negotiation Scripts | Salary frameworks, geographic pushback strategies |

## The PDF Engine

Not a template — generates a **different resume per job listing**:
- Injects JD keywords into your real experience
- Reorders sections by relevance to the specific role
- Typography: Space Grotesk + DM Sans
- Built with Playwright rendering HTML → PDF
- **354 unique PDFs** generated during the creator's search

## Production Results

| Metric | Number |
|--------|--------|
| Listings evaluated | 740+ |
| Full evaluations | 631 |
| Tailored CVs | 354 |
| Applications processed | 302 |
| Outcome | Landed Head of Applied AI |
| Cost | $0 marginal (ran on Claude Max $200/mo) |

## The 10 Evaluation Dimensions

Each job gets scored A-F across:
1. Role Match
2. Skills Alignment
3. Seniority Fit
4. Compensation
5. Company Stage
6. Growth Potential
7. Technical Depth
8. Industry Relevance
9. Location/Remote
10. Culture Signals

The system recommends against applying to anything below 4.0/5 — quality over quantity.

## Installation

```bash
git clone https://github.com/santifer/career-ops.git
cd career-ops && npm install
npx playwright install chromium
npm run doctor                     # Validates setup
cp config/profile.example.yml config/profile.yml
# Create cv.md with your CV, then:
claude                             # Open Claude Code
```

## How LearnAI Team Could Use This

- **Student career services** — Integrate into a career prep workshop. Students learn to evaluate job listings systematically (10 dimensions) instead of spray-and-pray.
- **CS capstone showcase** — The project itself is a masterclass in multi-agent architecture: skills, batch processing, PDF generation, terminal dashboard. Ideal for teaching agent system design.
- **Faculty job search** — Academic job searches benefit from the same pipeline: evaluate postings, tailor CVs, track applications. The `/career-ops deep` company research is especially useful for understanding department culture.
- **Teaching AI ethics** — Discuss the human-in-the-loop design: why the system deliberately doesn't auto-submit applications. What would go wrong if it did?
- **Resume workshops** — The ATS optimization approach (keyword injection, section reordering per JD) teaches students what actually matters for getting past automated screening.

## Real-World Use Cases

1. **Career changers** — The archetype detection (6 role types) helps people transitioning between fields understand which roles actually match their experience.
2. **Batch job market analysis** — Evaluate 100+ listings in parallel to understand market trends, salary ranges, and skill demands in your field.
3. **Portfolio proof** — The creator used the project itself as proof of competency — building a multi-agent system while searching for multi-agent roles. Meta-level career strategy.
4. **Recruitment teams** — Reverse the perspective: understand how candidates use AI to optimize applications, and what ATS-gaming looks like from the other side.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Agent | Claude Code + custom skills |
| PDF | Playwright + HTML templates |
| Scanner | Playwright + Greenhouse API |
| Dashboard | Go + Bubble Tea + Lipgloss |
| Data | Markdown + YAML + TSV |
