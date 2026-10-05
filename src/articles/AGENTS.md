<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-10-05 | Updated: 2026-10-05 -->

# articles

## Purpose
The 229 wiki articles, one per file. File name = `{정렬번호}_{key}.wiki`; the sort prefix groups them: 00 안내, 10 서막, 20 1장, 30 2장, 40 3장, 50 4장, 60 5장, 70 6장, E 시험 대비. Each chapter has `{d}0_` = chapter main and `{d}1`–`{d}W` = dictionary entries (36-base suffix, max 36 per chapter).

## Key Files
| File | Description |
|------|-------------|
| `00_main.wiki`, `01_읽는 순서.wiki`, `02_시험 정보.wiki` | Guide pages: front page with the anim/sim index, reading order (full course, 2-hour course, 단답형 course), exam facts mirrored from `../../../_시험정보.md`. |
| `10_`, `20_`, `30_`, `40_`, `50_`, `60_`, `70_*.wiki` | Chapter mains: 개요 → `== 0. ==` cross-chapter table → `== p.N ==` per slide → `== 🎙 ==` recording notes → `== 시험 대비 핵심 요약 ==` → `== 관련 문서 ==`. |
| `E0_자주 틀리는 함정 모음.wiki` | 147 traps by chapter (함정 / 맞는 것 / 문서) + the 5 pairs the professor called confusing. |
| `E1_모의고사 복기.wiki` | All 104 mock-exam items (SA 27 · MC 77) mapped to answer, slide page and wiki article. |
| `E2_명칭 암기표.wiki` | Name dictionary for the 단답형 (설명 / 명칭 / 영어 / 문서), ~450 names, top-30 table first. |

## For AI Agents
- Header is `key:` / `title:` / `category:` / `---`. `category` first item must be one of the 9 nav group names in CONTRACT §2.
- Link only to §5 keys; absorbed names (§5-9) link as `[[호스트|명칭]]` and the host has a `=== 명칭 ===` subsection with a `{def}`.
- Every non-guide article: ≥1 `{analogy}`, ≥1 visual (`[[img:]]`, `[[sim:]]`, `[[anim:]]`, table or `<pre class="ascii">`). Chapter mains: ≥3 captures + the anims/sims listed in CONTRACT §6/§7.
- Block tags (`[[img:]]`, `[[sim:]]`, `[[anim:]]`) stand alone on a line; an anim caption must not contain another `[[link]]` (the `]]` closes the tag early).
- After editing: `python3 build.py` (broken links 0) and `node src/test_render.js index.html`.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
