// ============================================================
// brain_regions — 2장 p.21–28 뇌의 세부 구조 (안쪽 오래된 구조 → 대뇌 피질)
// 시간축(초): 0 전체 → 1.5 뇌간(연수·뇌교) → 3.5 시상(감각 관문, 후각만 우회) → 5.5 소뇌
//   → 7 변연계(편도체·해마·시상하부) → 9.5 대뇌 피질 4엽 → 11.5 연합 영역(전전두엽 등)
// 도식은 2장 p.25 오른쪽 그림처럼 정중앙 단면, 앞쪽(전두엽)이 왼쪽.
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["brain_regions"] = {
  title: "뇌의 세부 구조 — 뇌간에서 대뇌 피질까지 14초",
  desc: "[[뇌간]](연수: 심장·호흡) → [[시상]](감각 정보의 관문, 후각만 예외) → [[소뇌]](협응) → [[변연계]]([[편도체]]: 공포 / [[해마]]: 새 기억 / [[시상하부]]: 항상성) → [[대뇌 피질]] 4엽 → [[연합 영역]]",
  duration: 14,
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
    var D = 14;
    var B = ' font-weight="700"';
    var s = '<svg viewBox="0 0 760 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="뇌의 세부 구조 애니메이션">';
    s += '<defs><marker id="br_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.a + '"/></marker>' +
      '<marker id="br_arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.r + '"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "뇌의 세부 구조 — 가장 오래된 안쪽부터 바깥 대뇌 피질까지"],
      [1.5, 3.5, "뇌간(Brainstem): 연수·뇌교로 이루어진 가장 오래된 부분"],
      [3.5, 5.5, "시상(Thalamus): 후각을 제외한 모든 감각을 대뇌로 전달 — 감각 정보의 관문"],
      [5.5, 7, "소뇌(Cerebellum): 신체 운동과 다양한 활동 간의 협응"],
      [7, 9.5, "변연계(Limbic System): 정서·추동 — 편도체·해마·시상하부"],
      [9.5, 11.5, "대뇌 피질: 전두엽·두정엽·후두엽·측두엽 4가지 영역"],
      [11.5, 14, "연합 영역: 감각·운동 영역을 제외한 나머지 — 뇌 전 영역에 걸쳐 존재"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + (c[1] === D ? on(c[0], D) : show(c[0], c[1], D)) + '</g>';
    });

    // ---- 뇌 도식 (정중앙 단면, 왼쪽이 앞) ----
    var lobes = [
      ["전두엽", "M60,190 C40,120 90,55 190,48 L226,46 L206,148 L150,174 C118,190 88,200 60,190 Z", C.a, 110, 120],
      ["두정엽", "M226,46 C300,44 360,78 382,122 L300,140 L206,148 Z", C.b, 290, 92],
      ["후두엽", "M382,122 C402,170 392,214 352,236 L300,140 Z", C.c, 362, 172],
      ["측두엽", "M150,174 L206,148 L300,140 L352,236 L130,240 C120,214 132,190 150,174 Z", C.r, 160, 226]
    ];
    s += '<path d="M60,190 C40,120 90,55 190,48 C300,40 380,80 396,150 C404,200 384,232 352,238 L130,240 C92,238 66,220 60,190 Z" fill="#f3eef3" stroke="#a99" stroke-width="2.5"/>';
    lobes.forEach(function (l) { s += '<path d="' + l[1] + '" fill="none" stroke="#cbb" stroke-width="1.5" stroke-dasharray="4 3"/>'; });
    // 대뇌 피질 4엽 하이라이트
    lobes.forEach(function (l) {
      s += '<g opacity="0"><path d="' + l[1] + '" fill="' + l[2] + '" fill-opacity="0.28" stroke="' + l[2] + '" stroke-width="2"/>' +
        txt(l[3], l[4], l[0], 13, l[2], B) + show(9.5, 11.5, D) + '</g>';
    });
    // 연합 영역: 전전두엽 + 측두·두정 연합
    s += '<g opacity="0"><path d="M60,190 C40,120 90,55 160,50 L150,120 L110,180 C90,194 74,196 60,190 Z" fill="' + C.c + '" fill-opacity="0.45" stroke="' + C.c + '" stroke-width="2"/>' +
      txt(98, 122, "전전두엽", 12, "#8a6000", B) +
      '<path d="M260,52 C320,56 360,84 376,118 L310,128 Z" fill="' + C.c + '" fill-opacity="0.35" stroke="' + C.c + '" stroke-width="1.5"/>' +
      '<ellipse cx="180" cy="222" rx="34" ry="12" fill="' + C.c + '" fill-opacity="0.35" stroke="' + C.c + '" stroke-width="1.5"/>' +
      on(11.5, D) + '</g>';

    // 뇌량
    s += '<path d="M150,128 C190,98 270,96 312,124 C300,118 230,108 162,134 Z" fill="#e8e0d0" stroke="#a99" stroke-width="1.5"/>';
    // 소뇌
    s += '<ellipse cx="330" cy="262" rx="46" ry="28" fill="#f1e3dc" stroke="#a99" stroke-width="2"/>';
    for (var f = 0; f < 4; f++) s += '<path d="M' + (292 + f * 4) + ',' + (252 + f * 8) + ' Q330,' + (240 + f * 8) + ' ' + (370 - f * 4) + ',' + (252 + f * 8) + '" fill="none" stroke="#cba" stroke-width="1.2"/>';
    // 뇌간 (뇌교 + 연수)
    s += '<path d="M232,176 L268,176 L262,316 L244,316 Z" fill="#efe4da" stroke="#a99" stroke-width="2"/>';
    s += '<ellipse cx="256" cy="222" rx="20" ry="17" fill="#efe4da" stroke="#a99" stroke-width="2"/>';
    // 시상·시상하부·편도체·해마
    s += '<ellipse cx="232" cy="156" rx="26" ry="16" fill="#eee" stroke="#a99" stroke-width="2"/>';
    s += '<ellipse cx="210" cy="182" rx="11" ry="8" fill="#eee" stroke="#a99" stroke-width="1.5"/>';
    s += '<circle cx="182" cy="204" r="9" fill="#eee" stroke="#a99" stroke-width="1.5"/>';
    s += '<path d="M192,214 C210,226 240,224 262,204" fill="none" stroke="#bbb" stroke-width="7" stroke-linecap="round"/>';

    // ---- 하이라이트 ----
    // 뇌간
    s += '<g opacity="0"><path d="M232,176 L268,176 L262,316 L244,316 Z" fill="' + C.n + '" fill-opacity="0.55" stroke="' + C.n + '" stroke-width="2.5"/>' +
      '<ellipse cx="256" cy="222" rx="20" ry="17" fill="' + C.n + '" fill-opacity="0.55" stroke="' + C.n + '" stroke-width="2.5"/>' +
      txtL(282, 226, "뇌교", 12, C.n, B) + txtL(270, 296, "연수", 12, C.n, B) + show(1.5, 3.5, D) + '</g>';
    // 시상 + 감각 화살표
    s += '<g opacity="0"><ellipse cx="232" cy="156" rx="26" ry="16" fill="' + C.a + '" fill-opacity="0.55" stroke="' + C.a + '" stroke-width="2.5"/>' +
      txt(232, 161, "시상", 12, "#fff", B) +
      '<path d="M112,288 C150,250 190,200 212,168" fill="none" stroke="' + C.a + '" stroke-width="2.5" marker-end="url(#br_arrow)"/>' +
      '<path d="M152,300 C180,262 206,210 222,172" fill="none" stroke="' + C.a + '" stroke-width="2.5" marker-end="url(#br_arrow)"/>' +
      '<path d="M196,310 C210,272 226,220 232,174" fill="none" stroke="' + C.a + '" stroke-width="2.5" marker-end="url(#br_arrow)"/>' +
      txt(106, 304, "시각", 12, C.a, B) + txt(146, 318, "청각", 12, C.a, B) + txt(192, 330, "촉각", 12, C.a, B) +
      '<path d="M232,140 L232,70" fill="none" stroke="' + C.a + '" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#br_arrow)"/>' +
      '<path d="M256,150 L340,140" fill="none" stroke="' + C.a + '" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#br_arrow)"/>' +
      '<path d="M30,250 C40,220 60,205 92,196" fill="none" stroke="' + C.r + '" stroke-width="2.5" marker-end="url(#br_arrowR)"/>' +
      txtL(14, 270, "후각: 시상 우회", 12, C.r, B) + show(3.5, 5.5, D) + '</g>';
    // 소뇌
    s += '<g opacity="0"><ellipse cx="330" cy="262" rx="46" ry="28" fill="' + C.b + '" fill-opacity="0.5" stroke="' + C.b + '" stroke-width="2.5"/>' +
      txt(330, 302, "소뇌", 13, C.b, B) + show(5.5, 7, D) + '</g>';
    // 변연계 (편도체 → 해마 → 시상하부 순으로 켜짐)
    s += '<g opacity="0"><circle cx="182" cy="204" r="9" fill="' + C.r + '" stroke="' + C.r + '" stroke-width="2"/>' +
      txtL(84, 210, "편도체", 12, C.r, B) + '<line x1="124" y1="206" x2="170" y2="205" stroke="' + C.r + '" stroke-width="1.5"/>' + show(7, 9.5, D) + '</g>';
    s += '<g opacity="0"><path d="M192,214 C210,226 240,224 262,204" fill="none" stroke="' + C.n + '" stroke-width="8" stroke-linecap="round"/>' +
      txt(214, 248, "해마", 12, C.n, B) + show(7.6, 9.5, D) + '</g>';
    s += '<g opacity="0"><ellipse cx="210" cy="182" rx="11" ry="8" fill="' + C.c + '" stroke="#8a6000" stroke-width="2"/>' +
      txtL(120, 176, "시상하부", 12, "#8a6000", B) + '<line x1="170" y1="176" x2="198" y2="180" stroke="#8a6000" stroke-width="1.5"/>' + show(8.2, 9.5, D) + '</g>';

    // ---- 오른쪽 기능 카드 ----
    var cards = [
      [0, 1.5, "뇌의 세부 구조", C.muted, ["안쪽의 오래된 구조는 생존 기능,", "바깥의 대뇌 피질은 고차 정보 처리", "", "오른쪽 카드에 각 구조의 기능이 뜬다"]],
      [1.5, 3.5, "뇌간 (Brainstem)", C.n, ["연수: 심장 활동과 허파의 호흡 조절", "뇌교: 움직임 조절과 수면 제어", "연수와 뇌교 = 가장 오래된 부분", "(망상체: 각성 제어, 정보 필터링)"]],
      [3.5, 5.5, "시상 (Thalamus)", C.a, ["감각 정보의 관문", "후각을 제외한 모든 감각을 수용 →", "대뇌의 각 감각 피질에 전달", "두뇌의 명령을 연수와 소뇌에 전달"]],
      [5.5, 7, "소뇌 (Cerebellum)", C.b, ["신체 운동(정교한 움직임 포함)", "다양한 활동 간의 협응을 주관", "비언어적 학습과 기억에 관여", "시간 판별, 소리/질감 구분"]],
      [7, 9.5, "변연계 (Limbic System)", C.r, ["정서 및 추동을 담당", "편도체: 공격·공포·분노에 대한 인지", "해마: 의식적·명시적 기억 처리", "시상하부: 항상성 유지(섭식)"]],
      [9.5, 11.5, "대뇌 피질 (Cerebral Cortex)", C.a, ["운동: 전두엽 가장 뒷부분의 운동 피질", "시각: 후두엽의 시각 피질", "청각: 측두엽의 청각 피질", "체감각: 두정엽의 체감각 피질"]],
      [11.5, D, "연합 영역 (Association area)", "#8a6000", ["관찰 가능한 반응을 산출하지 않음", "전전두엽: 판단·계획·억제·사회적 상호작용", "측두엽: 얼굴 재인(Fusiform Face Area)", "두정엽: 수학 및 공간 추리"]]
    ];
    cards.forEach(function (k) {
      var g = '<g opacity="0">' + box(440, 60, 306, 196, "#fff", k[3]) + txt(593, 88, k[2], 15, k[3], B) +
        '<line x1="456" y1="100" x2="730" y2="100" stroke="#ddd" stroke-width="1.5"/>';
      k[4].forEach(function (line, i) { g += txtL(456, 128 + i * 32, line, 13, "#222"); });
      g += (k[1] === D ? on(k[0], D) : show(k[0], k[1], D)) + '</g>';
      s += g;
    });
    // 진행 표시 점
    var steps = ["뇌간", "시상", "소뇌", "변연계", "피질", "연합"];
    steps.forEach(function (n, i) {
      var x = 466 + i * 50, t = [1.5, 3.5, 5.5, 7, 9.5, 11.5][i];
      s += '<circle cx="' + x + '" cy="280" r="7" fill="#ddd"/>' +
        '<circle cx="' + x + '" cy="280" r="7" fill="' + C.n + '" opacity="0">' + on(t, D) + '</circle>' +
        txt(x, 302, n, 11, "#555");
    });

    // ---- 요점 ----
    s += txt(380, 360, "시상은 후각만 빼고 모든 감각의 관문 · 편도체=공포 · 해마=새 기억 · 시상하부=항상성", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
