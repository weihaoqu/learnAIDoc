# Slide Deck Analysis

**Topic**: Agent AI Survey - Multimodal and Embodied Agents Beyond Chatbots
**Purpose**: Teaching deck based on Q's grill-learning path
**Audience**: Learners, teachers, and LearnAI readers
**Language**: English
**Recommended Style**: intuition-machine
**Slide Count**: 10
**Generated**: 2026-08-28

## Canonical Build

`build-accessible-deck.py` is the canonical classroom build. It defines the ten slides once and generates:

- a native-text, editable PPTX;
- a semantic HTML deck;
- a tagged PDF generated with WeasyPrint's PDF/UA-1 option; and
- a rendered contact sheet.

The earlier SVG/PNG renderer remains for provenance. Its image-only PPTX/PDF workflow is not the classroom publication path because it does not preserve selectable slide text or a useful reading order.

Accessibility boundary: the PPTX has native visible text and logical source order, but PowerPoint accessibility conformance has not been independently certified. The PDF is generated with PDF/UA and tagging options; formal validator conformance has not been independently certified.

Local build requirements: Python 3 with `python-pptx`, `PyMuPDF`, and `Pillow`, plus the `weasyprint` command-line tool. Run `python3 build-accessible-deck.py` from any directory; the script publishes the four classroom artifacts to the wiki assets folder.

## Content Signals

- Educational explanation
- Research survey summary
- AI agents and multimodal systems
- College/classroom policy implications
- Conceptual distinction between multimodal ability and agentic ability

## Design Decision

Use a clean technical briefing style with diagram-heavy slides, high text fidelity, and reproducible native-text rendering. This deck is designed for reading and sharing, not only live presentation.

## Scope Boundary

The deck summarizes a grill-derived learning lens on the paper. It does not claim to be a complete 2026 state-of-the-art review of Agent AI.
