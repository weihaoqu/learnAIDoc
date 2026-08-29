# Slide 5: Feedback Is Evidence, Not Ground Truth

## Production method
Original 1600x900 local SVG rendered to PNG for exact text fidelity. No copied Stanford frames, figures, logos, or paper graphics.

## Style
Aged cream academic briefing, subtle engineering grid, near-black type, cobalt generation, teal verification, green persistence, warm-brown budget, maroon constraints, red risks, no gradients.

## Claim calibration
- Claim type: TEACHING SYNTHESIS
- This deck is an independent teaching companion.
- Evidence map: CS329A Parts 3-4: Robust Verification; Feedback with Tools and Code

## On-slide content
- Stage: verification
- Headline: Feedback Is Evidence, Not Ground Truth
- Subtitle: A test can accept wrong behavior or reject a valid alternative.
- Planned speaking time: 2:15

## Visual direction
Code patch and test suite showing false acceptance, false rejection, and verifier gaming.

## Teaching objective
Explain false acceptance, false rejection, and verifier gaming with one concrete example.

## Speaker notes (2:15)
Verification is the hinge of the improvement loop. A verifier may be a unit test, proof checker, reward model, critic, constitution, simulator, or human rating. Every verifier observes the task through a specification, and the specification can be incomplete. Use this code example. A patch passes all public tests, but the tests omit a boundary condition. The verifier accepts wrong behavior: a false acceptance. Another patch is correct but uses a different output order than the test expects. The verifier rejects valid behavior: a false rejection. Once the generator learns what the verifier rewards, a third risk appears: it may optimize the check rather than the real objective. That is verifier gaming or reward hacking. Stronger systems therefore do not treat one signal as truth. They may combine process checks with outcome checks, reserve private tests, inspect uncertainty, use adversarial cases, or escalate high-impact decisions to humans. However, adding a meta-verifier moves the trust boundary; it does not remove it. Ask two questions for every feedback source: what errors can this signal detect, and what errors is it blind to? Improvement driven by a blind verifier can make benchmark scores rise while real behavior becomes less trustworthy.
