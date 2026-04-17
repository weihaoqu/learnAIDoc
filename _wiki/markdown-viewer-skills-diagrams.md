---
title: "Markdown Viewer Skills — 9,500 Icons and 14 Diagram Types for AI Agents"
date: 2026-04-13
category: Skills & Plugins
redirect_from:
  - "/wiki/skills & plugins/markdown-viewer-skills-diagrams/"
tags: [claude-code, skill, diagrams, plantuml, visualization, markdown, icons, cloud-architecture, open-source]
related: ["Fireworks Tech Graph — Natural Language to Architecture Diagrams in Claude Code", "ui.sh — Tailwind Creator's Design Toolkit for AI Coding Agents", "Taste Skill — Teaching AI Agents Design Taste for Frontend Code", "Pretext & Refero — Tools to Fix AI's Frontend Problem"]
icon: "📊"
image: "/assets/images/markdown-viewer-skills-diagrams.png"
---

Need a cloud architecture diagram? Network topology? Data pipeline visualization? **Markdown Viewer Skills** gives AI coding agents 14 diagram skills backed by 9,514 stencil icons across 60 libraries — AWS, Azure, GCP, Cisco, Kubernetes, and more. Install one package, and Claude Code can generate professional diagrams directly inside your markdown files using PlantUML, Vega-Lite, JSON Canvas, or inline HTML/CSS.

*Source: [GitHub — markdown-viewer/skills](https://github.com/markdown-viewer/skills) (1.5k stars) | [Markdown Viewer Extension](https://github.com/markdown-viewer/markdown-viewer-extension)*

## The 14 Skills Across 5 Engines

### PlantUML-Based (9 skills)

| Skill | Domain | Icon Library |
|-------|--------|-------------|
| **uml** | 14 UML diagram types | 9,514 mxgraph stencils |
| **cloud** | AWS, Azure, GCP, Alibaba, IBM, K8s | Cloud provider icons |
| **network** | Cisco, Citrix, device topology | Network device icons |
| **security** | IAM, encryption, firewalls, compliance | Security icons |
| **archimate** | Enterprise architecture notation | ArchiMate elements |
| **bpmn** | Business process, EIP, Lean Mapping | BPMN symbols |
| **data-analytics** | ETL, warehouses, streaming, ML pipelines | Data platform icons |
| **iot** | Sensors, edge computing, digital twins | IoT device icons |
| **mindmap** | Hierarchical mind maps | N/A |

### Standalone Engines (3 skills)

| Skill | Engine | Diagram Types |
|-------|--------|--------------|
| **vega** | Vega-Lite / Vega | Bar, line, scatter, heatmap, radar, word cloud |
| **infographic** | YAML-based | 70+ templates (KPIs, timelines, SWOT, funnels, org trees) |
| **canvas** | JSON Canvas | Spatial node-based diagrams |

### HTML/CSS Embedded (2 skills)

| Skill | What It Generates |
|-------|-------------------|
| **architecture** | 13 layouts x 12 color styles for layered system diagrams |
| **infocard** | 13 layouts x 14 styles for editorial information cards |

## The 9,514 Icons

Not 6,000 — the actual count is **9,514 stencil icons across 60 mxgraph categories**:

| Library | Icons | Library | Icons |
|---------|-------|---------|-------|
| AWS4 | 1,034 | Cisco Safe | 485 |
| Electrical | 642 | Rack | 487 |
| PID | 479 | Office | 449 |
| MSCAE | 368 | GCP2 | 322 |
| Alibaba Cloud | 310 | Veeam | 333 |

Plus: Azure, IBM Cloud, Kubernetes, SysML, iOS mockups, Bootstrap, Floorplan, and 48 more.

## Installation & Usage

```bash
# Install all 14 skills
npx skills add markdown-viewer/skills

# Then in Claude Code:
"Generate an AWS architecture diagram for a serverless API"
"Create a network topology with Cisco devices"
"Draw a data pipeline from Kafka to Snowflake"
```

Diagrams render via the companion **Markdown Viewer browser extension** (Chrome/Edge/Firefox/VS Code), which exports to Word (.docx) with editable content.

## How LearnAI Team Could Use This

- **Course materials** — Generate cloud architecture, UML, and data flow diagrams directly in markdown lecture notes. No separate drawing tool needed.
- **Student assignments** — Students describe a system → Claude Code generates the PlantUML diagram → renders in the browser extension. Teaches architecture thinking.
- **Research papers** — The architecture and infographic skills produce publication-quality visuals. SVG output via PlantUML scales to any resolution.
- **Wiki illustrations** — Generate diagrams for LearnAI wiki entries without leaving Claude Code. The vega skill handles data visualization charts.
- **Teaching UML** — 14 UML diagram types with examples. Students learn UML by generating diagrams from descriptions rather than manually drawing.

## Real-World Use Cases

1. **Architecture documentation** — Engineering teams maintain living architecture docs in markdown with auto-generated diagrams that update as the system evolves.
2. **Cloud migration planning** — Visualize current vs. target AWS/Azure/GCP architectures with proper provider icons.
3. **Security audits** — Generate security architecture diagrams showing IAM, encryption, and compliance boundaries.
4. **Data engineering** — ETL pipeline visualizations with proper icons for Kafka, Spark, Snowflake, dbt.
5. **Executive presentations** — The infographic skill's 70+ templates (KPIs, SWOT, funnels) generate boardroom-ready visuals.

## vs. Fireworks Tech Graph

| | Markdown Viewer Skills | Fireworks Tech Graph |
|---|---|---|
| **Input** | Natural language or direct syntax | Natural language only |
| **Output** | PlantUML/Vega/HTML in markdown | SVG + PNG files |
| **Icons** | 9,514 stencils (60 libraries) | 40+ product icons |
| **Diagram types** | 14 skills | 14 types |
| **Rendering** | Browser extension | rsvg-convert |
| **Best for** | Living docs in markdown | Standalone diagram files |
