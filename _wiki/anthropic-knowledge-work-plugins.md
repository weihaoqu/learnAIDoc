---
title: "Anthropic Knowledge Work Plugins — Role-Based AI That Works Like Your Team"
date: 2026-03-31
category: Claude Code Engineering
redirect_from:
  - "/wiki/claude code/anthropic-knowledge-work-plugins/"
tags: [claude-code, plugins, knowledge-work, roles, anthropic, enterprise, mcp, organization]
related: ["Claude Code as Research Infrastructure — From Chatbot to AI Research Team", "Harness Engineering — The Real Bottleneck Isn't the Model"]
icon: "🏢"
image: "/assets/images/anthropic-knowledge-work-plugins.png"
---

## What It Is

Anthropic released **Knowledge Work Plugins**, an open-source repository of professional role-based plugins that transform Claude from a general-purpose assistant into a role-specific coworker. The official repository lives at [github.com/anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins).

The core idea: instead of Claude being "can talk about anything," these plugins make it "work like someone in your role." Each plugin packages together a persona, domain knowledge, tool connections, and workflows tailored to a specific professional function. The official product name is **Claude Cowork**, but the plugin format is fully compatible with **Claude Code**.

The key insight, as the source commentary puts it:

> "以前大家在调 prompt，现在开始调组织结构"
> Before everyone was tuning prompts, now they're tuning organizational structure.

**Source:** Weibo post by Simon的白日梦 (2026-03-31)

---

## The 11 Plugins

The first batch covers eleven professional roles:

| # | Plugin | What It Does |
|---|--------|-------------|
| 1 | **Productivity** | Task management, scheduling, daily planning, meeting prep |
| 2 | **Sales** | Lead research, call preparation, outbound copy, pipeline management |
| 3 | **Customer Support** | Ticket triage, response drafting, escalation workflows, knowledge base |
| 4 | **Product Management** | Spec writing, roadmap planning, research synthesis, feature prioritization |
| 5 | **Marketing** | Campaign planning, content strategy, audience analysis, copy generation |
| 6 | **Legal** | Contract review, compliance checks, legal research, document drafting |
| 7 | **Finance** | Financial analysis, reporting, forecasting, budget review |
| 8 | **Data** | SQL queries, statistical analysis, dashboard creation, data exploration |
| 9 | **Enterprise Search** | Cross-system search, knowledge retrieval, document discovery |
| 10 | **Bio Research** | Literature review, experiment planning, data analysis for life sciences |
| 11 | **Plugin Manager** | Install, configure, and manage other plugins |

---

## Plugin Architecture

Every plugin follows the same file-based structure. There is no extra code or build step — it is ALL files, mainly markdown and JSON:

```
.claude-plugin/
├── plugin.json          # Manifest — name, version, description, role persona
├── .mcp.json            # Tool connections — which external services to wire up
├── commands/            # Slash commands — explicit actions the user can trigger
│   ├── research.md
│   ├── draft-spec.md
│   └── ...
└── skills/              # Auto-triggered knowledge and workflows
    ├── terminology.md
    ├── process-guide.md
    └── ...
```

**plugin.json** — The manifest file defines the plugin identity: name, version, role description, and persona instructions. This is what turns Claude into "a sales rep who knows your pipeline" instead of "a chatbot that can discuss sales."

**.mcp.json** — The connector layer. Each plugin declares which MCP (Model Context Protocol) servers it needs. Connectors bridge Claude to real workplace tools:

- **Slack** — team communication, channel monitoring
- **Notion** — docs, wikis, project databases
- **HubSpot** — CRM, deals, contacts
- **Linear** — issue tracking, sprint management
- **Snowflake** — data warehouse queries
- **Figma** — design files, component libraries
- **Amplitude** — product analytics, user behavior
- **Benchling** — biotech lab notebooks, experiments

**commands/** — Markdown files that define explicit slash commands. Each command is a structured prompt with context, instructions, and output format.

**skills/** — Markdown files that Claude auto-loads when relevant. These encode company terminology, standard processes, decision frameworks, and workflow patterns. Skills fire automatically based on context rather than requiring explicit invocation.

The low customization cost is the key design decision. Teams can fork a plugin, edit the markdown files to match their company's terminology, processes, and tool permissions, and deploy it without writing any code.

---

## Why It Matters: Organizational Structure Over Prompt Tuning

The real value of Knowledge Work Plugins is not "what can Claude do" but "how does Claude act like someone at your company." The shift is from capability to context:

1. **Role context** — Not just "write marketing copy" but "write marketing copy in our brand voice, using our approved messaging framework, targeting our ICP segments."

2. **Tool permissions** — Not just "Claude can access Slack" but "the sales plugin can read deal channels and CRM data; the support plugin can read ticket queues and knowledge bases; neither can access the other's tools."

3. **Org workflows** — Not just "draft a spec" but "draft a spec using our template, tag the right reviewers, link to the roadmap item in Linear, and post a summary to the product channel in Slack."

This signals the next phase of AI product competition. The frontier is no longer just about smarter models. It is about who can package **role context + tool permissions + org workflows** into real on-the-job work units. The companies that win will be the ones that treat AI deployment as an organizational design problem, not a prompting problem.

---

## How to Install and Use

### Claude Cowork (claude.com)

Browse and install plugins directly from the plugin marketplace:

```
claude.com/plugins → Search "knowledge-work" → Install
```

### Claude Code (CLI)

Install from the marketplace:

```bash
claude plugin marketplace add anthropics/knowledge-work-plugins
```

This pulls all eleven plugins. You can also install individual plugins by specifying the sub-path.

### Customizing for Your Team

1. Fork the repository
2. Edit the markdown files in `skills/` to match your company's terminology and processes
3. Update `.mcp.json` to point to your team's actual tool instances
4. Add custom `commands/` for your team's specific workflows
5. Distribute via your org's plugin registry or direct Git URL

The entire customization process is editing text files. No compilation, no deployment pipeline, no infrastructure changes.
