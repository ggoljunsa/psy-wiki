<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-10-05 | Updated: 2026-10-05 -->

# sims

## Purpose
Step-through simulators (`[[sim:이름]]`): pure data + `build(opts)` returning `{panels, vars, steps}`; `_engine.js` renders controls, the procedure panel with the current line highlighted, the variable table with diffs, and a per-step SVG.

## Key Files
| File | Shows |
|------|-------|
| `_engine.js` | SimEngine (shared, copied from 운체위키 — do not edit per sim). |
| `signal_detection.js` | Criterion c moves right → Hit and FA both fall, d′ unchanged (4장 p.6). Options d′ = 2 / 1. |
| `weber_law.js` | 100 → 110 → **121** → 133.1 … (ratio) vs the +10kg misconception (absolute). k = 10% / 2%. |
| `action_potential.js` | Stimulus intensity ↑ → same spike size, higher firing rate (실무율); refractory option. mV values are textbook defaults, flagged as such. |
| `classical_conditioning.js` | Trial-by-trial NS/US/CS/CR: acquisition → extinction → spontaneous recovery (40 < 85), backward and higher-order variants. |
| `reinforcement_schedules.js` | FR / VR / FI / VI / CRF cumulative-response graphs (5장 p.22–23). |
| `operant_quadrant.js` | Three-question sorting into the 2×2 (slide set / trap set). Speeding fine = **정적 처벌** per 5장 p.24; licence revocation = 부적 처벌. |
| `serial_position.js` | Immediate vs delayed recall; recency effect disappears with delay. |
| `working_memory_span.js` | Digit-span items from 6장 p.18, 7±2, chunking option (91430985 → 3 chunks). |
| `piaget_stages.js` | 4 months → 13 years: object permanence, conservation, egocentrism, theory of mind, hypothetical reasoning. |
| `research_methods.js` | Same question through 5 methods; only 실험법 gets 처치·통제·무선 할당·인과 ✓ (1장 p.25). |

## For AI Agents
- Every step carries a **full** `vars` snapshot; the engine diffs. `pc` indexes the procedure panel lines (1-based).
- No DOM access; `node src/test_sims.js` runs every option combination without a browser.
- Numbers that are not on a slide must be labelled "표시용 예시값" in a `note` or `desc`.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
