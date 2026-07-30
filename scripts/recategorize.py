#!/usr/bin/env python3
"""Recategorize all wiki entries and add redirect_from for old URLs."""
import os
import re
import sys

WIKI_DIR = "/Users/oreo/Dropbox/learnAIDoc/_wiki"

# Old category → URL slug (Jekyll lowercases categories in permalinks)
OLD_CAT_SLUGS = {
    "Claude Code": "claude code",
    "AI Education": "ai education",
    "AI Research": "ai research",
    "Skills & Plugins": "skills & plugins",
    "Tools": "tools",
    "Creative": "creative",
    "Programming": "programming",
}

# filename (without .md) → new category
MAPPING = {
    # === Claude Code Basics ===
    "claude-code-auto-mode": "Claude Code Basics",
    "claude-auto-mode-unlock": "Claude Code Basics",
    "claude-code-sandbox": "Claude Code Basics",
    "claude-code-statusline": "Claude Code Basics",
    "claude-howto-learning-path": "Claude Code Basics",
    "claude-code-plugins": "Claude Code Basics",
    "claude-code-custom-agents": "Claude Code Basics",
    "claude-code-import-syntax": "Claude Code Basics",
    "claude-code-non-programmers-shipping": "Claude Code Basics",
    "claude-code-route-to-cheaper-models": "Claude Code Basics",

    # === Claude Code Engineering ===
    "claude-code-tips-engineering": "Claude Code Engineering",
    "claude-code-context-claudemd-practices": "Claude Code Engineering",
    "claude-code-context-fork": "Claude Code Engineering",
    "claude-code-hooks": "Claude Code Engineering",
    "claude-code-token-costs-rtk": "Claude Code Engineering",
    "claude-code-five-levels-mastery": "Claude Code Engineering",
    "claude-code-source-analysis-learning": "Claude Code Engineering",
    "claude-code-cheatsheet-everything": "Claude Code Engineering",
    "ccunpacked-claude-code-internals": "Claude Code Engineering",
    "harness-engineering-agents": "Claude Code Engineering",
    "anthropic-subtract-dont-add-philosophy": "Claude Code Engineering",
    "karpathy-skills-claude-code": "Claude Code Engineering",
    "anthropic-knowledge-work-plugins": "Claude Code Engineering",
    "claude-code-from-source-book": "Claude Code Engineering",
    "claude-code-agent-teams-vs-subagents": "Claude Code Engineering",
    "anthropic-teams-use-claude-code": "Claude Code Engineering",

    # === Claude Code Workflows ===
    "cross-model-code-review-claude-codex": "Claude Code Workflows",
    "codex-claude-code-research-tutorial": "Claude Code Workflows",
    "claude-code-git-worktree": "Claude Code Workflows",
    "claude-code-loop-command": "Claude Code Workflows",
    "claude-code-research-infrastructure": "Claude Code Workflows",
    "claude-code-handover-skill": "Claude Code Workflows",
    "specops-spec-driven-development": "Claude Code Workflows",
    "obsidian-cli-claude-code": "Claude Code Workflows",

    # === Skills & Plugins (merge old Skills & Plugins + most of old Tools) ===
    "follow-builders-ai-digest-skill": "Skills & Plugins",
    "taste-skill-ai-frontend-design": "Skills & Plugins",
    "beads-graph-memory-for-agents": "Skills & Plugins",
    "gstack-ai-software-factory": "Skills & Plugins",
    "non-coding-skills-claude-code": "Skills & Plugins",
    "markdown-viewer-skills-diagrams": "Skills & Plugins",
    "make-slides-interactive-teaching": "Skills & Plugins",
    "pua-skill-ai-persistence": "Skills & Plugins",
    "paper2code-arxiv-to-implementation": "Skills & Plugins",
    "unsloth-studio-llm-training": "Skills & Plugins",
    "browser-use-cli-automation": "Skills & Plugins",
    "oh-my-claudecode-orchestration": "Skills & Plugins",
    "ralph-autonomous-dev-loop": "Skills & Plugins",
    "understand-anything-plugin": "Skills & Plugins",
    "fireworks-tech-graph-diagrams": "Skills & Plugins",
    "alphaxiv-mcp-arxiv-search": "Skills & Plugins",
    "prompt-master-skill": "Skills & Plugins",
    "mdpdf-skill": "Skills & Plugins",
    "kepano-obsidian-skills-agents": "Skills & Plugins",
    "obsidian-web-clipper-ai": "Skills & Plugins",
    "supermemory-ai-context-engine": "Skills & Plugins",
    "ui-sh-design-for-agents": "Skills & Plugins",
    "pretext-refero-ui-tools": "Skills & Plugins",
    "code-review-graph-knowledge-graph": "Skills & Plugins",
    "ai-website-cloner-template": "Skills & Plugins",
    "claude-for-word-office-integration": "Skills & Plugins",
    "ai-health-vault-obsidian": "Skills & Plugins",
    "claude-interactive-diagram-tools": "Skills & Plugins",
    "posterskill-academic-posters": "Skills & Plugins",

    # === AI for Research ===
    "ai-agent-benchmark-cheating": "AI for Research",
    "litellm-supply-chain-attack": "AI for Research",
    "autoresearch-autonomous-ml": "AI for Research",
    "metagpt-foundation-agents": "AI for Research",
    "hermes-agent-self-improving-ai": "AI for Research",
    "meta-harness-self-optimizing-agent": "AI for Research",
    "anthropic-managed-agents-architecture": "AI for Research",
    "ai-agent-academic-research-writing": "AI for Research",
    "feynman-ai-research-agent": "AI for Research",
    "vision-agents-realtime-ai": "AI for Research",
    "karpathy-llm-knowledge-bases": "AI for Research",
    "turboquant-reverse-engineer-google": "AI for Research",
    "claude-use-cases-directory": "AI for Research",
    "claude-prism-academic-writing": "AI for Research",
    "anthropic-automated-alignment-researchers": "AI for Research",
    "ai-quantitative-finance-tools": "AI for Research",

    # === AI for Teaching ===
    "ai-education-teacher-factory": "AI for Teaching",
    "claude-teacher-setup": "AI for Teaching",
    "claude-custom-course-materials": "AI for Teaching",
    "claude-nagdy-interactive-learning": "AI for Teaching",
    "openmaic-multi-agent-classroom": "AI for Teaching",
    "notebooklm-grading-education-paradox": "AI for Teaching",
    "frustration-shifts-upward-ai-coding": "AI for Teaching",
    "ai-brain-fry-cognitive-fatigue": "AI for Teaching",
    "ai-mastery-games": "AI for Teaching",
    "researcher-llm-use-boundaries": "AI for Teaching",
    "socratic-prompting-method": "AI for Teaching",
    "learning-effectively-ai-era": "AI for Teaching",
    "ai-fluency-index": "AI for Teaching",
    "resume-dead-claude-folder-career": "AI for Teaching",

    # === Learning Resources ===
    "ai-learning-courses-youtube-2026": "Learning Resources",
    "anthropic-academy-free-courses": "Learning Resources",
    "tensortonic-learn-ml-code": "Learning Resources",
    "karpathy-microgpt": "Learning Resources",
    "math-foundations-reinforcement-learning": "Learning Resources",
    "claude-certified-architect": "Learning Resources",
    "mujing-learn-english-movies": "Learning Resources",
    "critical-paper-reading-five-questions": "Learning Resources",
    "learnai-knowledge-base-guide": "Learning Resources",
    "core-learning-prompts-deep-understanding": "Learning Resources",
    "bilingual-prompting-technique": "Learning Resources",
    "lawyer-won-hackathon-problem-definition": "Learning Resources",
    "agentic-ai-engineer-roadmap-2026": "Learning Resources",
    "llm-architecture-gallery": "Learning Resources",
    "pull-requests-explained": "Learning Resources",

    # === Prompting & Writing ===
    "seven-framework-prompts-thinking-partner": "Prompting & Writing",
    "shortest-prompt-lines-that-work": "Prompting & Writing",
    "claude-three-hidden-quality-prompts": "Prompting & Writing",

    # === Creative & Media ===
    "novel-to-multimedia-pipeline": "Creative & Media",
    "toonflow-ai-short-drama": "Creative & Media",
    "webnovel-writer-long-context": "Creative & Media",
    "recordly-open-source-screen-recorder": "Creative & Media",
    "infinitetalk-unlimited-ai-video": "Creative & Media",

    # === Industry & Trends ===
    "accio-work-ai-agent-business": "Industry & Trends",
    "vibe-marketing": "Industry & Trends",
    "karpathy-end-of-coding": "Industry & Trends",
    "career-ops-ai-job-search": "Industry & Trends",
}


def get_slug(filepath):
    return os.path.basename(filepath).replace(".md", "")


def get_old_category(content):
    m = re.search(r'^category:\s*(.+)$', content, re.MULTILINE)
    if m:
        return m.group(1).strip().strip('"').strip("'")
    return None


def compute_old_url(old_category, slug):
    cat_slug = OLD_CAT_SLUGS.get(old_category, old_category.lower())
    return f"/wiki/{cat_slug}/{slug}/"


def process_file(filepath):
    slug = get_slug(filepath)
    new_cat = MAPPING.get(slug)
    if not new_cat:
        print(f"  UNMAPPED: {slug}")
        return False

    with open(filepath, 'r') as f:
        content = f.read()

    old_cat = get_old_category(content)
    if not old_cat:
        print(f"  NO CATEGORY: {slug}")
        return False

    old_url = compute_old_url(old_cat, slug)

    # Update category
    content = re.sub(
        r'^category:\s*.+$',
        f'category: {new_cat}',
        content,
        count=1,
        flags=re.MULTILINE
    )

    # Add redirect_from if not already present
    if 'redirect_from' not in content:
        # Insert redirect_from after the category line
        content = re.sub(
            r'^(category:\s*.+)$',
            f'\\1\nredirect_from:\n  - "{old_url}"',
            content,
            count=1,
            flags=re.MULTILINE
        )

    with open(filepath, 'w') as f:
        f.write(content)

    changed = old_cat != new_cat
    if changed:
        print(f"  {slug}: {old_cat} → {new_cat}")
    else:
        print(f"  {slug}: (unchanged, redirect added)")
    return True


def main():
    files = sorted([f for f in os.listdir(WIKI_DIR) if f.endswith('.md')])
    print(f"Processing {len(files)} entries...")

    processed = 0
    unmapped = []
    for f in files:
        filepath = os.path.join(WIKI_DIR, f)
        slug = get_slug(filepath)
        if slug not in MAPPING:
            unmapped.append(slug)
            continue
        process_file(filepath)
        processed += 1

    print(f"\nProcessed: {processed}")
    if unmapped:
        print(f"Unmapped ({len(unmapped)}):")
        for u in unmapped:
            print(f"  - {u}")


if __name__ == "__main__":
    main()
