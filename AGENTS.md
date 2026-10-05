<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-10-05 | Updated: 2026-10-05 -->

# 위키 (심리위키, Psych Wiki)

## Purpose
A self-contained, 나무위키-style single-page study wiki for 심리학으로의 여행 midterm scope (서막–6장, 1장 is p.1–29 only). It is its **own git repository** (remote `github.com/ggoljunsa/psy-wiki`, live at https://ggoljunsa.github.io/psy-wiki/), nested inside the OneDrive course folder. Everything the reader sees is generated into `index.html` from `src/` by `build.py`. Engine, renderer, build and tests are copied from 운체위키 (`../../../운영체제/중간고사/위키`); only the content and branding differ.

Three kinds of "visual" content exist, each with its own syntax and engine:

| Kind | Syntax in `.wiki` | Source | Engine |
|---|---|---|---|
| Real slide capture | `[[img:L4-19.png\|캡션\|medium]]` | `_slides/` → copied to `images/` | none (plain `<figure>`) |
| Step simulator | `[[sim:signal_detection]]` | `src/sims/*.js` (10) | `src/sims/_engine.js` (SimEngine) |
| Animated diagram (SVG+SMIL) | `[[anim:pavlov_dog\|캡션]]` | `src/anims/*.js` (20) | `src/anims/_anim_engine.js` (AnimEngine) |

Counts at first release (2026-10-05): 229 articles (6 guide/exam + 7 chapter mains + 216 dictionary), 10 sims, 20 anims, 218 slide captures.

## Key Files
| File | Description |
|------|-------------|
| `build.py` | `src/*` → `index.html`. Copies only referenced slide PNGs into `images/`, reports broken `[[links]]`, missing `[[sim:]]`/`[[anim:]]`, unused anims. |
| `index.html` | **Generated. Never edit by hand.** CSS + article data + all engines inline (~1.6 MB). |
| `shot.sh` | `./shot.sh <anim> <sec> [out.png]` — headless-Chrome screenshot of one animation frozen at a time. |
| `README.md` | Human-facing overview, build commands, source attribution. |
| `.gitignore` | Excludes `.omc/`, `_slides/`, `_text/`, `_pdf/`, `.DS_Store`. |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `src/` | All authored sources: contract, CSS/layout, renderer, articles, sims, anims, tests (see `src/AGENTS.md`) |
| `images/` | Build output: slide captures actually referenced by articles |
| `_pdf/` | `L{장}.pdf` exported from the professor's PPTX via PowerPoint (AppleScript `save as PDF`). Git-ignored. 장 0=서막 … 6=6장. |
| `_slides/` | `L{장}-{pp}.png` from `pdftoppm -r 90 -png _pdf/L4.pdf _slides/L4`. Page = printed slide number (no hidden slides). Git-ignored; **do not delete** — `build.py` copies new `[[img:]]` from here. |
| `_text/` | `L{장}.txt` from `pdftotext -layout`, pages separated by `\f`. Git-ignored. |

## For AI Agents

### Working In This Directory
- Read `src/CONTRACT.md` before writing anything; it is the authority on syntax, canonical article keys (§5, 229 keys + §5-9 absorbed names), the sim API (§6) and the anim API (§7).
- Edit sources under `src/`, then run `python3 build.py`. Commit both sources and the regenerated `index.html`.
- New material arriving in the course folder (10/6 recording for 6장, 9/29 second-half recording) should be reflected here first (`== 🎙 ==` sections of the chapter mains, `02_시험 정보`, `E0`/`E2`), then in `../정리본/`.
- Prose is Korean; `{def}` boxes run **description → name** because the exam's 단답형 only asks for names.
- Known slide errors are taught as `{warn}`, never as answers: 4장 p.25 우반구→좌반구, 6장 p.18 "72개"→7±2, 5장 "Operational"→operant.

### Testing Requirements
```sh
python3 build.py                       # BUILD OK, broken links 0, missing 0
node src/test_sims.js                  # every sim × every option combo
node src/test_anims.js                 # every anim: contract + tag balance + timing
node src/test_render.js index.html     # all articles render with no raw markup left
./shot.sh <anim> <sec> out.png         # then open the PNG and look at it
```
Headless Chrome: new `--user-data-dir` per run + a watchdog, or the second run hangs. Phone-width check: CDP `Emulation.setDeviceMetricsOverride` at 420px (mobile:false) and list elements whose right edge exceeds the viewport.

## Dependencies
- `../강의자료/*.pptx` (read-only) → `_pdf/` → `_slides/`, `_text/`.
- `../정리본/*.md`, `../문제풀이/중간고사_모의/bank_ch*.py`, `../../_시험정보.md` — content reused in articles, `{exam}` boxes, `E1_모의고사 복기`, `E2_명칭 암기표`.
- Python 3, Node ≥ 18, Google Chrome, poppler (`pdftoppm`, `pdftotext`), Microsoft PowerPoint (PPTX→PDF). KaTeX from jsDelivr at runtime.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
