// ============================================================
// biopsychosocial — 서막 p.22–24 생물심리사회적 접근법 (분노 예)
// 시간축(초): 0 가운데 "분노" → 1.5 생물학적 수준 → 4 심리적 수준 → 6.5 사회문화적 수준
//   → 9 세 원이 겹친 벤 다이어그램 강조 → 11 요점 "어느 하나의 요인만으로는 설명할 수 없다"
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["biopsychosocial"] = {
  title: "생물심리사회적 접근법 — '분노' 하나를 세 수준에서 보는 13초",
  desc: "같은 분노를 [[분석 수준|생물학적]](두뇌 회로·Fight or Flight) · 심리적(상황의 해석·기대) · 사회문화적(문화별 분노 표현) 수준에서 차례로 설명하고, 세 원이 겹치는 [[생물심리사회적 접근법]]으로 묶는다",
  duration: 13,
  build: function () {
    var C = {
      a: "#1d65b3", aL: "#dbe8f7", b: "#2e9e4f", bL: "#dff3e4",
      c: "#e09a40", cL: "#fdeec2", n: "#3b2f4a", nL: "#efe9f6",
      r: "#d6465f", rL: "#fbe0e5", muted: "#777", line: "#b9c4d8"
    };
    function box(x, y, w, h, fill, stroke, extra) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' + (extra || "") + '/>';
    }
    function txt(x, y, s, size, fill, extra) {
      return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || "#222") + '" text-anchor="middle"' + (extra || "") + '>' + s + '</text>';
    }
    function txtL(x, y, s, size, fill, extra) {
      return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || "#222") + '"' + (extra || "") + '>' + s + '</text>';
    }
    function show(from, to, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';' + (to / dur) + ';' + Math.min(1, to / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function on(from, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    var D = 13;
    var B = ' font-weight="700"';
    var s = '<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="생물심리사회적 접근법 애니메이션">';
    s += '<defs><marker id="bps_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "같은 '분노'를 세 가지 분석 수준에서 바라보면?"],
      [1.5, 4, "① 생물학적 수준: 유전자·자연선택·적응적 특질 — 두뇌 회로, Fight or Flight"],
      [4, 6.5, "② 심리적 수준: 정서·인지 처리 및 해석·내면의 기대 — 개인 내면의 기제"],
      [6.5, 9, "③ 사회문화적 수준: 타인의 기대·소속 집단·대중 매체 — 개인 외부의 환경"],
      [9, 11, "세 수준은 중점의 차이일 뿐 — 겹쳐서 하나의 행동을 만든다"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "생물심리사회적 접근법: 어느 하나의 요인만으로는 설명할 수 없다", 14, "#222", B) + on(11, D) + '</g>';

    // ---- 세 수준 원 (벤 다이어그램) ----
    var circ = [
      [348, 150, C.n, C.nL, "생물학적", 1.5, 322, 126],
      [412, 150, C.a, C.aL, "심리적", 4, 440, 126],
      [380, 205, C.b, C.bL, "사회문화적", 6.5, 380, 246]
    ];
    circ.forEach(function (k) {
      s += '<g opacity="0"><circle cx="' + k[0] + '" cy="' + k[1] + '" r="60" fill="' + k[3] + '" fill-opacity="0.45" stroke="' + k[2] + '" stroke-width="2.5"/>' +
        on(k[5], D) + '</g>';
    });
    circ.forEach(function (k) {
      s += '<g opacity="0">' + txt(k[6], k[7], k[4], 12, k[2], B) + on(k[5], D) + '</g>';
    });
    // 가운데 분노 (항상 보임, 마지막에 강조)
    s += '<g>' + box(350, 156, 60, 26, C.cL, C.c) + txt(380, 174, "분노", 14, "#8a6000", B) + '</g>';
    s += '<rect x="344" y="150" width="72" height="38" rx="10" fill="none" stroke="' + C.c + '" stroke-width="3" opacity="0">' +
      '<animate attributeName="opacity" values="0;0;1;0.2;1;0.2;1;1" keyTimes="0;0.69;0.71;0.76;0.81;0.86;0.9;1" dur="' + D + 's" fill="freeze"/></rect>';

    // ---- 생물학적 수준 (왼쪽) ----
    s += '<g opacity="0">' + box(14, 74, 248, 128, C.nL, C.n) +
      txt(138, 96, "생물학적 수준", 14, C.n, B) +
      txtL(26, 120, "· 유전자·자연선택·적응적 특질", 12, "#222") +
      txtL(26, 144, "· 신경과학: 흥분을 유발하는 두뇌 회로", 12, "#222") +
      txtL(26, 168, "· 진화론: Fight or Flight 반응", 12, "#222") +
      txtL(26, 190, "생물·진화심리학·신경과학", 11, C.muted) +
      '<line x1="262" y1="140" x2="290" y2="166" stroke="' + C.n + '" stroke-width="2.5" marker-end="url(#bps_arrow)"/>' +
      on(1.5, D) + '</g>';

    // ---- 심리적 수준 (오른쪽 위) ----
    s += '<g opacity="0">' + box(498, 50, 248, 112, C.aL, C.a) +
      txt(622, 72, "심리적 수준", 14, C.a, B) +
      txtL(510, 96, "· 정서·인지 처리 및 해석·기대", 12, "#222") +
      txtL(510, 120, "· 인지: 상황의 해석이 분노에 영향", 12, "#222") +
      txtL(510, 144, "· 정신역동: 무의식적 적대감의 방출", 12, "#222") +
      '<line x1="498" y1="110" x2="470" y2="128" stroke="' + C.a + '" stroke-width="2.5" marker-end="url(#bps_arrow)"/>' +
      on(4, D) + '</g>';

    // ---- 사회문화적 수준 (오른쪽 아래) ----
    s += '<g opacity="0">' + box(498, 178, 248, 104, C.bL, C.b) +
      txt(622, 200, "사회문화적 수준", 14, C.b, B) +
      txtL(510, 224, "· 타인의 기대·소속 집단·대중 매체", 12, "#222") +
      txtL(510, 248, "· 문화 맥락에 따라 분노 표현이 다름", 12, "#222") +
      txtL(510, 270, "개인 외부의 환경적 요인", 11, C.muted) +
      '<line x1="498" y1="230" x2="438" y2="220" stroke="' + C.b + '" stroke-width="2.5" marker-end="url(#bps_arrow)"/>' +
      on(6.5, D) + '</g>';

    // ---- 마지막: 통합 라벨 ----
    s += '<g opacity="0">' + box(40, 236, 200, 48, "#fff", C.c) +
      txt(140, 256, "생물심리사회적 접근법", 13, "#8a6000", B) +
      txt(140, 274, "= 세 수준의 통합된 결과물", 12, "#222") +
      '<line x1="240" y1="258" x2="322" y2="200" stroke="' + C.c + '" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#bps_arrow)"/>' +
      on(9, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 322, "중점의 차이일 뿐, 사람의 심리를 어느 하나의 요인만으로는 설명할 수 없다", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
