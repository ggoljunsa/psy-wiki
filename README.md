# 심리위키 (Psych Wiki)

DGIST 교양 **심리학으로의 여행** (Prof. 이소영, 마이어스 심리학 개론 13판) 중간고사 범위(서막–6장)를 나무위키 스타일로 정리한 단일 페이지 위키.
개념마다 **설명→명칭** 정의 박스(단답형 대비), 학자·이론·실험 사전 문서, **실제 강의 슬라이드 캡처**, 실험 절차와 모형을 보여 주는 **움직이는 그림(SVG 애니메이션)**, 값이 한 단계씩 바뀌는 **스텝 시뮬레이터**가 들어 있고, 모든 용어는 사전 문서로 하이퍼링크된다.

**라이브**: https://ggoljunsa.github.io/psy-wiki/

## 범위 (중간고사 2026-10-13, 객관식 25 + 단답형 5)

0. 서막 — 심리학 이야기 (구조주의→기능주의→행동주의→인지혁명, 생물심리사회적 접근법)
1. 심리과학을 비판적으로 생각하기 — 연구 방법, 상관≠인과, 실험 설계, IRB (**슬라이드 30번 이후 제외**)
2. 마음의 생물학과 의식 — 뉴런·신경계·뇌 영역·분할 뇌·주의·의식
3. 일생에 걸친 발달 — 피아제·비고츠키·애착·양육·콜버그·에릭슨·노화
4. 감각과 지각 — 역치·신호 탐지·하향 처리·시각·게슈탈트·깊이 지각
5. 학습 — 고전적·조작적 조건화, 강화 계획, 관찰 학습
6. 기억 — 앳킨슨-시프린·작업 기억·부호화·인출·망각·오정보 효과
+ 모의고사 복기 · 명칭 암기표 · 자주 틀리는 함정 모음

## 구조

```
.
├── index.html        # 생성물 (단일 HTML — CSS/JS/문서/시뮬레이터 전부 인라인)
├── images/           # 참조된 강의 슬라이드 캡처
├── build.py          # src/ → index.html (슬라이드 PNG 원본은 _slides/, git 제외)
├── shot.sh           # 애니메이션 검증용 headless Chrome 스크린샷 (./shot.sh <anim> <초>)
└── src/
    ├── CONTRACT.md   # 문법·문서 키·시뮬레이터/애니메이션 API 규약
    ├── head.html     # CSS + 레이아웃
    ├── renderer.js   # 위키 문법 렌더러
    ├── sims/         # _engine.js + 시뮬레이터 (순수 데이터 + build())
    ├── anims/        # _anim_engine.js + 움직이는 그림 (SVG+SMIL, [[anim:이름]])
    └── articles/     # 문서 (.wiki, 파일당 1문서)
```

## 빌드

```sh
python3 build.py        # index.html 재생성, 깨진 링크/누락 이미지 보고
node src/test_sims.js   # 시뮬레이터 자동 검사
node src/test_anims.js  # 움직이는 그림 자동 검사 (태그 균형·SMIL·타이밍)
node src/test_render.js index.html   # 전 문서 렌더 → 원시 마크업 잔존 검사
```

슬라이드 PNG 재생성: PPTX → PDF(PowerPoint "save as PDF", `_pdf/L{장}.pdf`) → `pdftoppm -r 90 -png _pdf/L4.pdf _slides/L4`, 텍스트는 `pdftotext -layout`. 장 번호 0=서막 … 6=6장, 페이지 = 슬라이드 인쇄 번호.

문서 편집은 `src/articles/*.wiki`, 문법은 `src/CONTRACT.md` 참고.
애니메이션 하나만 특정 시각에 멈춰 보려면 `index.html?anim=pavlov_dog&animt=4`, 문서 안 전부를 멈추려면 `index.html?animt=4#문서키`.

## 출처

강의 슬라이드 이미지는 DGIST 심리학으로의 여행 (Prof. 이소영) 강의 자료의 캡처이며 교육 목적의 학습 정리용이다. 학습 목적 비상업적 사용. 저작권은 원저작자에게 있다.
