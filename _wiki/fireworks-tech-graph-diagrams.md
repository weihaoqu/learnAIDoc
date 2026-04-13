---
title: "Fireworks Tech Graph — Natural Language to Architecture Diagrams in Claude Code"
date: 2026-04-13
category: Skills & Plugins
tags: [claude-code, skill, diagrams, architecture, svg, visualization, multi-agent, open-source]
related: ["Taste Skill — Teaching AI Agents Design Taste for Frontend Code"]
icon: "🎆"
image: "/assets/images/fireworks-tech-graph-diagrams.png"
---

Describe a system in plain English, get a production-ready architecture diagram. **Fireworks Tech Graph** is a Claude Code skill that generates polished SVG + 1920px PNG diagrams from natural language — no Mermaid syntax, no draw.io GUI, no manual design. It understands AI/agent domain concepts natively: say "draw a RAG pipeline" and it knows what a vector store, embedding flow, and retrieval chain look like. 14 diagram types, 7 visual styles, 40+ product icons.

*Source: [GitHub — yizhiyanhua-ai/fireworks-tech-graph](https://github.com/yizhiyanhua-ai/fireworks-tech-graph) | [AgenticExamples](https://agenticexamples.co/agent/fireworks-tech-graph)*

## How It Works

```
"Draw a multi-agent collaboration diagram"
         ↓
Classify → Extract nodes/edges → Plan layout → Apply style
         ↓
    SVG (editable) + 1920px PNG
```

No DSL to learn. No GUI to navigate. Just describe what you want.

## Installation

```bash
npx skills add yizhiyanhua-ai/fireworks-tech-graph

# Dependency for PNG export
brew install librsvg          # macOS
sudo apt install librsvg2-bin # Linux
```

## 14 Diagram Types

| Type | Best For |
|------|---------|
| Architecture Diagram | Horizontal layers (client → gateway → services → storage) |
| Data Flow | Emphasizing data movement with labeled arrows |
| Flowchart | Sequential decisions with diamonds |
| **Agent Architecture** | LLM reasoning, memory, tools, iteration loops |
| **Memory Architecture** | Write/read paths, storage tiers (Mem0 pattern) |
| Sequence Diagram | Time-ordered messages between lifelines |
| Comparison Matrix | Side-by-side system comparison |
| Timeline / Gantt | Duration bars on time axis |
| Mind Map | Radial layout from central node |
| Class Diagram (UML) | Three-compartment boxes, inheritance |
| Use Case Diagram | Actors, ellipses, system boundary |
| State Machine | States, transitions with events/guards |
| ER Diagram | Entities with PK/FK and cardinality |
| Network Topology | Devices with connections |

## 7 Visual Styles

| Style | Background | Best For |
|-------|-----------|----------|
| **Flat Icon** (default) | White | Blogs, slides, docs |
| **Dark Terminal** | #0f0f1a | GitHub READMEs, dev articles |
| **Blueprint** | #0a1628 | Architecture docs |
| **Notion Clean** | White | Notion, Confluence, wikis |
| **Glassmorphism** | #0d1117 gradient | Product sites, keynotes |
| **Claude Official** | #f8f6f3 | Anthropic-style warm aesthetic |
| **OpenAI Official** | White | Modern minimalist |

## Smart Domain Awareness

The skill maps concepts to semantic shapes automatically:

| Concept | Shape |
|---------|-------|
| LLM / Model | Rounded rect + brain icon |
| Agent / Orchestrator | Hexagon |
| Vector Store | Cylinder with grid lines |
| Tool / Function | Gear rect |
| Memory (short-term) | Dashed rounded rect |
| Memory (long-term) | Database cylinder |
| User / Human | Stick figure |
| Queue / Stream | Horizontal tube |

Arrows encode meaning too: blue solid = primary data, orange = control, green = memory read, green dashed = memory write, purple curved = feedback loop.

## Built-in AI/Agent Patterns

```bash
# These just work — the skill knows the patterns
"Draw a RAG pipeline"
"Generate a Mem0 memory architecture"
"Create a multi-agent collaboration diagram"
"Visualize a tool call flow"
"Draw an agentic search architecture"
```

40+ product icons built in: OpenAI, Anthropic, Pinecone, Weaviate, Kafka, PostgreSQL, Redis, and more.

## vs. Alternatives

| | Fireworks | Mermaid | draw.io | scientific-schematics |
|---|---|---|---|---|
| **Input** | Natural language | DSL syntax | GUI | Natural language |
| **Visual styles** | 7 | 1 | Manual | AI-generated |
| **AI domain patterns** | Built-in | None | Manual | None |
| **Output** | SVG + 1920px PNG | SVG/PNG | Various | PNG |
| **No GUI** | Yes | Yes | No | Yes |

## How LearnAI Team Could Use This

- **Course slides** — Generate architecture diagrams for lectures in seconds. "Draw a client-server architecture with REST API" → polished diagram ready for slides.
- **Research papers** — System architecture figures for publications. The Blueprint or Notion Clean styles are publication-appropriate. SVG output is vector — scales to any resolution.
- **Student assignments** — Students describe their project architecture in English, the skill generates the diagram. Teaches architectural thinking without requiring Visio/draw.io skills.
- **Teaching agent architectures** — Built-in patterns for RAG, multi-agent, tool call flows are exactly what you'd teach in an AI systems course.
- **Wiki illustrations** — Generate diagrams for LearnAI wiki entries directly from Claude Code. Dark Terminal style matches the wiki aesthetic.

## Real-World Use Cases

1. **Technical documentation** — Engineering teams generate architecture diagrams from design docs without switching to a drawing tool.
2. **Blog posts / README** — Open-source projects generate polished architecture visuals for their GitHub READMEs.
3. **Architecture reviews** — Quickly visualize proposed system designs during design review meetings.
4. **Client presentations** — Consultants generate professional diagrams from whiteboard notes in minutes.
5. **Interview prep** — Practice system design by describing architectures and getting instant visual feedback.
