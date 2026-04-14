---
title: "litellm Supply Chain Attack: How a Poisoned PyPI Package Nearly Compromised the AI Ecosystem"
date: 2026-03-26
category: AI Research
tags: [security, supply-chain, litellm, pypi, karpathy, dependencies, credentials, trivy, teampcp]
related: ["How AI Agents Cheat Benchmarks — Berkeley's Wake-Up Call"]
icon: "🚨"
image: "/assets/images/litellm-supply-chain-attack.png"
---

On March 24, 2026, one of the most widely-used Python libraries in the AI ecosystem — **litellm** (97M downloads/month, 40K+ GitHub stars) — was poisoned with credential-stealing malware on PyPI. The attack was live for about 3 hours. Andrej Karpathy called it "basically the scariest thing imaginable in modern software." If the attacker hadn't accidentally introduced a bug that crashed machines, it could have gone undetected for days or weeks.

*Source: [FutureSearch: litellm PyPI Supply Chain Attack](https://futuresearch.ai/blog/litellm-pypi-supply-chain-attack/) | [Snyk: How a Poisoned Security Scanner Backdoored LiteLLM](https://snyk.io/articles/poisoned-security-scanner-backdooring-litellm/) | [Kaspersky: Trojanization of Trivy, Checkmarx, and LiteLLM](https://www.kaspersky.com/blog/critical-supply-chain-attack-trivy-litellm-checkmarx-teampcp/55510/) | [litellm Security Update](https://docs.litellm.ai/blog/security-update-march-2026)*

## What Happened

### The Kill Chain

```
March 19: TeamPCP compromises Trivy (security scanner)
    │      ↓ steals PyPI tokens via Trivy's CI/CD
March 23: TeamPCP compromises Checkmarx KICS
    │      ↓ lateral movement through stolen credentials
March 24: TeamPCP publishes poisoned litellm to PyPI
    │
    ├── 10:39 UTC: litellm 1.82.7 (malicious source injection)
    ├── 10:52 UTC: litellm 1.82.8 (malicious .pth file)
    │
    ~3 hours later: PyPI quarantines the package
```

### Two Different Attack Vectors

| Version | Technique | Trigger |
|---------|-----------|---------|
| **1.82.7** | Base64-encoded payload in `proxy_server.py` | Fires when anything imports `litellm.proxy` |
| **1.82.8** | `litellm_init.pth` file in site-packages | Fires on **every Python process start** — no import needed. Even `pip`, `python -c`, or IDE language servers trigger it |

The `.pth` technique is especially terrifying: it runs automatically every time Python starts, creating a fork-bomb-like effect that's nearly impossible to avoid once installed.

### What the Malware Stole

The malicious code systematically collected **everything** on the host:

- SSH keys
- AWS/GCP/Azure cloud credentials
- Kubernetes configs
- Environment variables (all your API keys)
- Shell history
- Crypto wallets
- SSL private keys
- CI/CD secrets
- Database passwords

All collected data was encrypted and sent to attacker-controlled domains. In Kubernetes environments, the malware also **deployed privileged pods on every node** for lateral spread across the entire cluster.

## How It Was Discovered

The attacker made a mistake. The `.pth` file in version 1.82.8 triggered on every Python subprocess, creating exponential process spawning — essentially a **fork bomb**. Callum McMahon at FutureSearch was using an MCP plugin in Cursor that pulled litellm as a transitive dependency. When 1.82.8 installed, his machine ran out of RAM and crashed.

Without this bug, Karpathy noted:

> "If the attacker didn't vibe code this attack, it could have been undetected for many days or weeks."

## The Silencing Attempt

After community members reported the issue on GitHub (#24512):
- Within **102 seconds**, the attacker used **73 stolen accounts** to post 88 spam comments to bury the discussion
- Then used a **stolen maintainer account** to close the issue entirely
- The community had to open a new issue and move discussion to Hacker News

## Why This Is So Dangerous

litellm is the unified API proxy that lets you call any LLM (OpenAI, Anthropic, Google, etc.) through one interface. **2,000+ packages** depend on it, including DSPy, MLflow, and Open Interpreter.

```
You install Tool X
    └── Tool X depends on Framework Y
            └── Framework Y depends on litellm
                    └── litellm 1.82.8 installs
                            └── Every Python process now steals your credentials
```

You may never have typed `pip install litellm` — but if any tool in your dependency tree depends on it, you were vulnerable.

## What To Do Right Now

```bash
# Check if litellm is installed and which version
pip show litellm

# Safe version: 1.82.6 (last clean release)
# Compromised: 1.82.7 or 1.82.8
```

**If you had 1.82.7 or 1.82.8 installed at any point:**
1. Assume **all credentials on that machine are compromised**
2. Rotate all API keys, SSH keys, cloud credentials immediately
3. Check Kubernetes clusters for unauthorized privileged pods
4. Review CI/CD pipeline logs for unusual activity
5. Scan all systems reachable from the compromised machine

## Karpathy's Takeaway

Karpathy used this incident to reinforce his growing skepticism of dependency culture:

> "Supply chain attacks are the scariest thing in modern software. Every time you install a dependency, you could be pulling a poisoned package deep inside its dependency tree."

His recommendation: increasingly prefer using LLMs to **generate simple functionality as code** rather than importing external dependencies. When it's simple enough and possible, write it yourself — or have your AI write it — instead of adding another link to the supply chain.

> "Classical software engineering would have you believe that dependencies are good (we're building pyramids from bricks), but this has to be re-evaluated."
