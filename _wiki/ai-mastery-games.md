---
title: "AI Mastery Games — Teaching AI Literacy Through Interactive Games"
date: 2026-04-04
category: AI Education
tags: [ai-literacy, gamification, teaching, interactive-games, ai-education, hallucination-detection, prompt-engineering, critical-thinking]
related: ["AI in Education — Teacher's Factory, Not Student's Cheat Tool", "AI Tools for High-Engagement Learning", "Anthropic Academy — 13 Free AI Courses with Certificates"]
icon: "🎮"
image: "/assets/images/ai-mastery-games.png"
---

AI Mastery Games is an open-source platform of 9 interactive web games that teach AI literacy through hands-on play. Instead of lectures about hallucinations, bias, and prompt engineering, students learn by investigating AI failures as a detective, defending ML pipelines from attacks, and running AI startups. Every game session measures 5 skill dimensions — prompting, concepts, tools, critical thinking, and ethics — giving both students and instructors concrete data on learning gaps.

*Source: [Gamifying Learning with AI (Taylor & Francis)](https://www.tandfonline.com/doi/full/10.1080/02568543.2024.2421974) | [AI Literacy Through Games (Wiley)](https://onlinelibrary.wiley.com/doi/10.1111/jcal.13009) | [Games for AI/ML Education (ResearchGate)](https://www.researchgate.net/publication/344351163_Games_for_Artificial_Intelligence_and_Machine_Learning_Education_Review_and_Perspectives)*

## Why Games for AI Literacy?

Research shows that gamified approaches promote AI literacy by creating competitive, motivating environments with immediate feedback and visual simulations of complex concepts. Students develop critical thinking naturally — spotting hallucinations in a shooting gallery or weighing ethical tradeoffs in a narrative game engages different cognitive skills than reading about them.

The "Hallucination Detective" approach — where students investigate how AI chatbots produce incorrect information — is emerging as a key pedagogical pattern across universities. AI Mastery Games formalizes this into a full curriculum tool.

## The 9 Games

| Game | Mechanic | AI Skill Taught |
|------|----------|----------------|
| **AI Detective** | Interactive scene investigation with zoomable hotspots | Diagnosing AI failures — hallucination, bias, prompt injection, ethics |
| **Prompt Arena** | Critique / Battle / Optimize modes | Prompt engineering and evaluation |
| **AI or Human?** | Swipe-based guessing (Turing test) | Distinguishing AI-generated vs human content |
| **AI Escape Room** | Timed puzzle rooms | Applied AI knowledge under pressure |
| **Hallucination Hunter** | Shooting gallery with CRT monitor theme | Spotting AI hallucinations in real time |
| **AI Ethics Quest** | Narrative dilemmas with 4 meters | Ethical decision-making (Trust / Profit / Safety / Equity) |
| **AI Startup Tycoon** | 8-quarter business simulation | AI business strategy and regulatory tradeoffs |
| **Pipeline Defense** | Tower defense | ML pipeline security — bias, drift, adversarial attacks |
| **Token Tumble** | Drag-and-drop puzzle with timer | Token ordering, sequencing, and AI architecture |

Each game has **4 difficulty tiers** (beginner → expert) and supports **5 languages** (EN, ZH, ES, DE, IT).

## 5-Dimension Skill Model

Every game session produces a score across 5 dimensions:

```
              Prompting
                 /\
                /  \
    Ethics ----    ---- Concepts
                \  /
                 \/
          Critical     Tools
          Thinking
```

- **Prompting** — Can the student craft effective prompts and evaluate prompt quality?
- **Concepts** — Does the student understand how AI models work and their limitations?
- **Tools** — Can the student use AI tools appropriately in real workflows?
- **Critical Thinking** — Can the student evaluate AI outputs and spot errors?
- **Ethics** — Does the student consider fairness, safety, and societal impact?

**Mastery levels:** Novice → Apprentice → Practitioner → Expert → Master

## For Instructors

The **admin dashboard** provides class-wide analytics:

- **Skill Gaps** — horizontal bars showing average scores per dimension, sorted weakest-first. Red/yellow/green coding instantly shows which skills need more teaching time.
- **Score Distribution** — histogram showing how students cluster across score ranges.
- **Per-Game Performance** — which games are hardest for students, sorted by average score.
- **CSV Export** — download all session data for external analysis.

The **student profile** page gives learners their own radar chart, progression over time, and personalized recommendations ("Your weakest area is Ethics — try AI Ethics Quest").

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind v4 + Framer Motion |
| Charts | Chart.js (radar + line) |
| i18n | next-intl (5 locales) |
| Data | JSONL file store (no database) |
| Deploy | AWS EC2 + Docker |

## Try It

- **Play:** [monmouthaiteaching.com/ai-games](https://monmouthaiteaching.com/ai-games)
- **Student Profile:** [/ai-games/en/profile](https://monmouthaiteaching.com/ai-games/en/profile)
