// ============================================================
// top_down_faces — 4장 p.2, 9–10, 18–19 하향 처리와 지각 갖춤새
// 시간축(초): 0 도형 풍경(상향 처리) → 1.5 "얼굴이 몇 개?" → 2.8 기대가 생기자 얼굴이 하나씩 1…13
//   → 8 "정답 13개" → 9.5 중의적 그림: 먼저 본 그림(귀부인/할머니)에 따라 해석이 갈림 → 12.5 요점
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["top_down_faces"] = {
  title: "하향 처리 — 풍경 속 얼굴 13개가 보이기까지 14초",
  desc: "바위·나무·구름뿐인 풍경도 \"얼굴이 몇 개?\" 라는 기대가 생기면 얼굴로 체계화된다(정답 13개, 4장 p.18–19). 중의적 그림도 앞에 본 그림에 따라 귀부인/할머니로 갈린다 — [[하향 처리]], [[지각 갖춤새]]",
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
    var s = '<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="하향 처리 얼굴 찾기 애니메이션">';
    s += '<defs><marker id="tdf_arrowA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.a + '"/></marker>' +
      '<marker id="tdf_arrowC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.c + '"/></marker>' +
      '<marker id="tdf_arrowG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "도형으로 그린 풍경 — 감각 입력은 바위·나무·구름뿐 (상향 처리)"],
      [1.5, 2.8, "질문: \"이 그림에 얼굴이 몇 개 있을까?\""],
      [2.8, 8, "기대가 생기자 얼굴이 하나씩 보이기 시작한다 — 하향 처리"],
      [8, 9.5, "정답 13개 — 같은 그림인데, 찾으려는 기대가 지각을 바꿨다"],
      [9.5, 12.5, "중의적 그림: 앞에 본 그림(귀부인/할머니)에 따라 다르게 해석 = 지각 갖춤새"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "하향 처리(Top-down): 경험과 기대에 기반하여 감각 입력을 체계화", 14, "#222", B) + on(12.5, D) + '</g>';

    // ======== 왼쪽: 풍경 ========
    s += '<rect x="14" y="48" width="458" height="254" rx="8" fill="#eef5fb" stroke="' + C.line + '" stroke-width="2"/>';
    // 구름
    s += '<ellipse cx="90" cy="82" rx="38" ry="18" fill="#fff" stroke="#c8d6e6" stroke-width="1.5"/><ellipse cx="300" cy="74" rx="40" ry="17" fill="#fff" stroke="#c8d6e6" stroke-width="1.5"/>';
    // 시냇물·땅
    s += '<path d="M14,222 L472,222 L472,302 L14,302 Z" fill="#e7e2d6"/>';
    s += '<path d="M14,286 C90,270 150,296 230,282 C310,268 380,292 472,278" fill="none" stroke="#8fb8e0" stroke-width="10" opacity="0.8"/>';
    // 나무
    var trees = [[70, 132, 40], [150, 112, 34], [225, 124, 30], [350, 132, 32], [180, 192, 24]];
    trees.forEach(function (t) {
      s += '<rect x="' + (t[0] - 5) + '" y="' + t[1] + '" width="10" height="' + (222 - t[1]) + '" fill="#8a6a3a"/>' +
        '<circle cx="' + t[0] + '" cy="' + t[1] + '" r="' + t[2] + '" fill="#9fcf8f" stroke="#6a9a5a" stroke-width="1.5"/>';
    });
    // 바위
    var rocks = [[110, 252, 40, 24], [222, 262, 36, 22], [330, 250, 44, 26], [422, 262, 34, 20], [272, 204, 30, 18], [404, 192, 30, 20]];
    rocks.forEach(function (r) {
      s += '<ellipse cx="' + r[0] + '" cy="' + r[1] + '" rx="' + r[2] + '" ry="' + r[3] + '" fill="#c9c4bb" stroke="#999" stroke-width="1.5"/>';
    });
    // 얼굴 13개
    var faces = [[70, 132], [150, 110], [90, 82], [300, 74], [225, 122], [272, 204], [404, 192], [110, 252], [222, 262], [330, 250], [422, 262], [350, 132], [180, 192]];
    faces.forEach(function (f, i) {
      var t = 2.8 + i * 0.4, x = f[0], y = f[1];
      s += '<g opacity="0"><rect x="' + (x - 24) + '" y="' + (y - 20) + '" width="48" height="40" rx="4" fill="none" stroke="' + C.r + '" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<circle cx="' + (x - 8) + '" cy="' + (y - 4) + '" r="3" fill="' + C.n + '"/><circle cx="' + (x + 8) + '" cy="' + (y - 4) + '" r="3" fill="' + C.n + '"/>' +
        '<path d="M' + (x - 9) + ',' + (y + 7) + ' Q' + x + ',' + (y + 14) + ' ' + (x + 9) + ',' + (y + 7) + '" fill="none" stroke="' + C.n + '" stroke-width="2"/>' +
        on(t, D) + '</g>';
    });
    // 질문 + 카운터
    s += '<g opacity="0">' + box(356, 56, 108, 28, "#fff", C.c) + on(1.5, D) + '</g>';
    s += '<g opacity="0">' + txt(410, 75, "얼굴 몇 개?", 13, "#8a6000", B) + show(1.5, 2.8, D) + '</g>';
    for (var n = 1; n <= 13; n++) {
      var a = 2.8 + (n - 1) * 0.4, b = n === 13 ? 8 : a + 0.4;
      s += '<g opacity="0">' + txt(410, 75, "찾은 얼굴: " + n, 13, "#8a6000", B) + show(a, b, D) + '</g>';
    }
    s += '<g opacity="0">' + box(356, 56, 108, 28, "#ffd9d9", "#a52f2f") + txt(410, 75, "정답: 13개", 14, "#a52f2f", B) + on(8, D) + '</g>';

    // ======== 오른쪽 A: 상향 vs 하향 ========
    var A = '<g>' + box(486, 48, 260, 254, "#fff", C.line) +
      txt(616, 70, "상향 처리 vs 하향 처리", 13, "#222", B) +
      box(526, 84, 180, 40, C.cL, C.c) + txt(616, 102, "경험·기대", 13, "#8a6000", B) + txt(616, 118, "\"얼굴을 찾아라\"", 11, "#8a6000") +
      box(526, 156, 180, 40, C.nL, C.n) + txt(616, 174, "지각", 13, C.n, B) + txt(616, 190, "감각 정보를 체제화·해석", 11, C.n) +
      box(526, 228, 180, 40, C.aL, C.a) + txt(616, 246, "감각 입력", 13, C.a, B) + txt(616, 262, "바위·나무·구름의 모양", 11, C.a);
    // 상향 화살표
    A += '<g>' + '<line x1="560" y1="226" x2="560" y2="200" stroke="' + C.a + '" stroke-width="3" marker-end="url(#tdf_arrowA)"/>' +
      txtL(492, 290, "↑ 상향(Bottom-up)", 12, C.a, B) +
      '<animate attributeName="opacity" values="1;1;0.35;0.35" keyTimes="0;' + (2.8 / D) + ';' + (3 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    // 하향 화살표
    A += '<g opacity="0.35"><line x1="672" y1="126" x2="672" y2="152" stroke="' + C.c + '" stroke-width="4" marker-end="url(#tdf_arrowC)"/>' +
      '<line x1="706" y1="104" x2="720" y2="104" stroke="' + C.c + '" stroke-width="2" stroke-dasharray="4 3"/>' + '<line x1="720" y1="104" x2="720" y2="226" stroke="' + C.c + '" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#tdf_arrowC)"/>' +
      txtL(620, 290, "↓ 하향(Top-down)", 12, "#8a6000", B) +
      '<animate attributeName="opacity" values="0.35;0.35;1;1" keyTimes="0;' + (2.8 / D) + ';' + (3 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    A += '<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;' + (9.4 / D) + ';' + (9.6 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += A;

    // ======== 오른쪽 B: 중의적 그림 (지각 갖춤새) ========
    function amb(y, first, firstCol, firstL, result) {
      return box(494, y, 70, 46, firstL, firstCol) + txt(529, y + 20, "먼저 본", 11, firstCol) + txt(529, y + 37, first, 12, firstCol, B) +
        '<line x1="566" y1="' + (y + 23) + '" x2="582" y2="' + (y + 23) + '" stroke="#555" stroke-width="2" marker-end="url(#tdf_arrowG)"/>' +
        box(586, y, 70, 46, "#f4f4f4", "#555") + txt(621, y + 20, "중의적", 11, "#555") + txt(621, y + 37, "그림", 12, "#555", B) +
        '<line x1="658" y1="' + (y + 23) + '" x2="674" y2="' + (y + 23) + '" stroke="#555" stroke-width="2" marker-end="url(#tdf_arrowG)"/>' +
        box(678, y, 62, 46, "#cdefd2", "#1d6b2a") + txt(709, y + 20, result, 12, "#1d6b2a", B) + txt(709, y + 37, "로 보임", 11, "#1d6b2a");
    }
    s += '<g opacity="0">' + box(486, 48, 260, 254, "#fff", C.line) +
      txt(616, 72, "지각 갖춤새 (Perceptual set)", 13, "#222", B) +
      txt(616, 92, "경험에 근거해 형성되는 지각의 기대", 11, C.muted) +
      amb(112, "귀부인", C.a, C.aL, "귀부인") +
      amb(186, "할머니", C.c, C.cL, "할머니") +
      txt(616, 262, "같은 그림, 다른 지각", 13, C.r, B) +
      txt(616, 282, "(4장 p.10 중의적 그림)", 11, C.muted) +
      on(9.5, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 326, "상향 처리 = 감각 수용기 → 고차 인지 / 하향 처리 = 경험·기대 → 감각 입력 체계화", 12, C.muted);
    s += txt(380, 346, "얼굴 13개·중의적 그림 모두 하향 처리의 예 (지각 갖춤새가 대표 예시)", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
