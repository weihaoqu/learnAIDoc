---
title: "Claude Auto Mode Unlock — Using Auto Mode with Any API Provider"
date: 2026-04-13
category: Claude Code
tags: [claude-code, auto-mode, openrouter, aws-bedrock, binary-patch, hack, third-party-api]
related: ["Claude Code Auto Mode — The Shift+Tab Workflow That Changes Everything"]
icon: "🔓"
image: "/assets/images/claude-auto-mode-unlock.png"
---

Claude Code's auto mode is powerful — it lets Claude execute tools without asking permission for each one. But Anthropic locks it to their first-party API and Claude Opus/Sonnet 4.6 only. If you use OpenRouter, AWS Bedrock, or bigmodel.cn, you're locked out. **claude-auto-mode-unlock** is a Node.js binary patcher that removes this restriction, letting auto mode work with any API provider and any model. The safety classifier still runs — it only removes the access gate, not the safety layer.

*Source: [GitHub — zzturn/claude-auto-mode-unlock](https://github.com/zzturn/claude-auto-mode-unlock) | [Auto Mode Official Blog](https://claude.com/blog/auto-mode)*

## What Gets Patched

The patcher modifies 6 functions in the compiled Claude Code binary using equal-length byte replacement:

| Function | What It Does |
|----------|-------------|
| `modelSupportsAutoMode` (provider) | Bypasses first-party API check |
| `modelSupportsAutoMode` (model) | Removes Opus/Sonnet 4.6 model name restriction |
| `isAutoModeGateEnabled` | Forces `true` always |
| `isAutoModeCircuitBroken` | Forces `false` always |
| `verifyAutoModeGateAccess` | Forces happy-path execution |
| `carouselAvailable` | Enables Shift+Tab mode toggle in UI |

**Important:** The runtime safety classifier that evaluates each tool call **still runs**. This only removes the "you can't use auto mode with this provider" gate.

## Supported Providers

| Provider | Works? |
|----------|--------|
| OpenRouter | Yes |
| AWS Bedrock (non-managed) | Yes |
| bigmodel.cn | Yes |
| Self-hosted (vLLM etc.) | Yes |
| Any `ANTHROPIC_BASE_URL` compatible | Yes |

## Installation

```bash
git clone https://github.com/zzturn/claude-auto-mode-unlock.git
cd claude-auto-mode-unlock

node claude-auto-mode-patcher.mjs        # Patch auto mode
node claude-auto-mode-patcher.mjs --check    # Check status
node claude-auto-mode-patcher.mjs --restore  # Revert to original
```

Requirements: Node.js 18+, macOS or Linux, Claude Code **v2.1.96** specifically.

## Risks and Caveats

| Risk | Severity | Detail |
|------|----------|--------|
| **Version-locked** | High | Only works with v2.1.96. Every CLI update breaks the patch. |
| **ToS violation** | Medium | Modifying the binary likely violates Anthropic's terms. |
| **Non-Claude models** | Medium | Safety classifier was tuned for Claude. Other models may produce unpredictable permission decisions. |
| **No auto-watch** | Low | Must re-patch after every Claude Code update manually. |
| **Codesigning** | Low | Patcher handles macOS codesigning, but could interact with Gatekeeper. |

## How It Works Technically

Claude Code compiles via Bun into a standalone binary with JavaScript source embedded as plaintext. The patcher:

1. Locates target functions via string signature anchors
2. Validates with structural checks (bracket balancing)
3. Generates equal-length replacement code (preserves binary structure)
4. Creates automatic backup before patching
5. Re-signs the binary on macOS

## How LearnAI Team Could Use This

- **Cost-effective auto mode** — Use Claude Code auto mode through OpenRouter (access to Claude via cheaper routing or alternative models) instead of paying for Anthropic's direct API.
- **AWS Bedrock integration** — If the university has AWS credits or an existing Bedrock setup, unlock auto mode without needing a separate Anthropic API subscription.
- **Teaching binary patching** — The patcher itself is an excellent case study for a security course: binary modification, function signature matching, equal-length replacement, codesigning. Students learn both offensive (how patches work) and defensive (how to detect them) perspectives.
- **Understanding access control** — The 6 patched functions illustrate how software implements feature gating: provider checks, model allowlists, circuit breakers, UI toggles. Great for software engineering courses.

## Real-World Use Cases

1. **Budget-conscious developers** — Use auto mode through OpenRouter's free tier or cheaper model routing instead of Anthropic's direct pricing.
2. **Enterprise Bedrock users** — Companies with existing AWS Bedrock contracts who want auto mode without adding another vendor relationship.
3. **China-based developers** — Access auto mode via bigmodel.cn when Anthropic's direct API isn't available in their region.
4. **Self-hosted deployments** — Teams running Claude-compatible models locally (vLLM) who want the auto mode workflow.

## The Bigger Picture

This tool highlights a tension in AI product design: **should capabilities be gated by provider, or by safety?** Anthropic gates auto mode by provider (only their API), arguing their safety classifier infrastructure is required. But the patcher proves the safety classifier runs regardless of provider — the gate is access control, not safety. Whether this distinction matters depends on your perspective on vendor lock-in vs. responsible deployment.

## Related Tools

| Tool | Purpose |
|------|---------|
| **This (auto-mode-unlock)** | Unlock auto mode for any API provider |
| roman01la's prompt patcher | Rebalance system prompts to reduce corner-cutting |
| claudecode-buddy-crack | Cosmetic buddy pet customization |
