---
type: conceptual
palette: cool
rendering: flat-vector
text: title-only
mood: balanced
font: clean
aspect: 16:9
language: en
---

# Cover prompt — Beyond /goal · Orchestrator + Headless

**Title (display exactly):** Beyond /goal

## Concept
Flat-vector cover for a wiki entry teaching Eric Tech's Orchestrator + Headless pattern for long-running Claude Code sessions. The single visual idea: one small clean "orchestrator" box delegating to multiple short-lived "headless worker" boxes that come and go without polluting the orchestrator's state.

## Visual
- A central elevated tile labeled "Orchestrator" (slightly larger, lifted with a soft shadow) — clean, calm, small.
- Below it, three smaller worker tiles fanning out, connected by slim arrows; one of them carries a small terracotta accent dot indicating it is "active."
- Each worker tile has a small `↻` (refresh) glyph indicating "fresh context each iteration" — they spin up, do work, and disappear.
- Faint dashed outlines around two empty slots beside the workers, hinting that more workers are spawned/torn down dynamically.
- Below the workers, a thin horizontal line representing the *external state file / GitHub project* — the actual memory.
- Optional: a barely-visible "context wall" line crossed out behind the orchestrator, hinting at the problem being solved.

## Color palette (cool)
- Tile fill: pale ice (#E7F0F5 / #CFE0EA), border steel-blue (#5B89A6)
- Orchestrator: slightly stronger fill, deeper border
- Active worker accent: terracotta (#C97B5A) — single dot
- Background: pale ice top (#F2F7FB) fading to steel teal (#3F6E8C)
- Text: deep navy (#1F3445)

## Typography
- Title text — render exactly as: `Beyond /goal`
- Clean modern sans-serif (Inter / Söhne), lower-center, balanced weight
- No subtitle; tiny labels on tiles are OK but keep them legible only at projector distance

## Composition
- 50-60% whitespace
- Orchestrator centered upper-third
- Workers in a row mid-canvas
- Title bottom band, lower-center
- 16:9

## Avoid
- Realistic humans / photos
- Specific brand logos (Anthropic, Claude, GitHub Octocat, etc.)
- More than one accent color
- Cluttered infographic look
- Aggressive imagery
