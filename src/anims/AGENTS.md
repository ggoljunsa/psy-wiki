<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-10-05 | Updated: 2026-10-05 -->

# anims

## Purpose
"움직이는 그림" — 8–14 s SVG+SMIL animations (`[[anim:이름|캡션]]`). Each file registers `ANIMS["이름"] = {title, desc, duration, build()}`; `build()` returns a pure SVG string with `viewBox="0 0 760 H"`. `_anim_engine.js` drives time via `svg.setCurrentTime()` (play/pause/speed/scrubber), so only SMIL is allowed — no CSS animation, no JS timers.

## Key Files
| File | Shows |
|------|-------|
| `_anim_engine.js` | AnimEngine (shared). |
| `_reference_ctx_switch.js.txt` | 운체위키 reference implementation (`box()`, `txt()`, `show()` helpers). Not built. |
| `psych_history_timeline`, `biopsychosocial` | 서막: schools timeline; three levels of analysis converging on one behaviour. |
| `correlation_not_causation`, `experiment_design` | 1장: third variable (기온); 무선 표집 → 무선 할당 → 처치/가짜약/통제 → 이중 은폐. |
| `neuron_firing`, `brain_regions`, `split_brain`, `selective_attention` | 2장: 실무율 + synapse; region tour (olfaction bypasses 시상); HE•ART split-brain (좌시야→우반구); cocktail party / inattentional blindness / change blindness. |
| `object_permanence` | 3장: hidden toy, impossible-event looking time. |
| `top_down_faces`, `transduction_vision`, `gestalt_grouping`, `binocular_cues` | 4장: 13 faces; light → retina → 시상 → 후두엽; figure-ground / proximity / continuity / closure; retinal disparity + convergence. |
| `pavlov_dog`, `skinner_box`, `observational_learning` | 5장: acquisition → extinction → spontaneous recovery (partial); 2×2 reinforcement/punishment; Bobo doll. |
| `atkinson_shiffrin`, `working_memory`, `interference`, `misinformation_effect` | 6장: three-store model with slide numbers only; central executive + phonological loop + visuospatial sketchpad; proactive/retroactive + Jenkins & Dallenbach; Loftus & Palmer. |

## For AI Agents
- `txt()` already sets `text-anchor="middle"`; passing another `text-anchor` in `extra` is silently ignored — use `txtL()`/an anchor-free helper instead (bug found 2026-10-05).
- `begin + dur ≤ duration`, `fill="freeze"`, keyTimes monotone ending at 1, ids prefixed per anim, `<`/`>`/`&` escaped, ≤ 60 KB.
- Verify with `node src/test_anims.js` and `./shot.sh <name> <sec>` at 3 times; look at the PNGs.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
