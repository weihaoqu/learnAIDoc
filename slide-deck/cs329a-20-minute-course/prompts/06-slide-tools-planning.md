# Slide 6: Tools Turn Answers into Trajectories

## Production method
Original 1600x900 local SVG rendered to PNG for exact text fidelity. No copied Stanford frames, figures, logos, or paper graphics.

## Style
Aged cream academic briefing, subtle engineering grid, near-black type, cobalt generation, teal verification, green persistence, warm-brown budget, maroon constraints, red risks, no gradients.

## Claim calibration
- Claim type: TEACHING SYNTHESIS
- This deck is an independent teaching companion.
- Evidence map: CS329A Parts 4-5: Tools/Code Feedback; Planning and Multi-Step Reasoning

## On-slide content
- Stage: tools and planning
- Headline: Tools Turn Answers into Trajectories
- Subtitle: Planning exposes dependencies, parallel work, critical paths, and recovery points.
- Planned speaking time: 2:15

## Visual direction
Task dependency graph with parallel branches, critical path, verification checkpoints, and a retry edge.

## Teaching objective
Show how environment interaction changes the unit of analysis from answer to trajectory.

## Speaker notes (2:15)
Once an agent uses tools, the unit of analysis is no longer one answer. It is a trajectory: a sequence of actions, observations, and decisions. Planning determines which steps depend on others, which can run in parallel, and where failure should trigger recovery. In the graph, source search and data collection can proceed independently, but the synthesis step depends on both. Verification sits after intermediate artifacts, not only at the end. The highlighted path is the critical path: delays or errors there determine completion. This matters because simply adding more agents or more tool calls may increase total work without reducing the critical path. A good plan also distinguishes reversible and irreversible actions. Searching or drafting can usually be retried. Sending an email, publishing a result, deleting data, or assigning a grade requires stronger authorization and review. Tool observations are still feedback rather than truth. A successful command only proves that the command ran under its environment; it does not prove the overall task was correct. When designing a workflow, draw the dependency graph. Mark checkpoints, retry edges, stop conditions, and authority gates. Then ask whether parallel work genuinely shortens the path or merely produces more material for someone to reconcile.
