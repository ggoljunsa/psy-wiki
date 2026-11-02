// ============================================================
// language_hierarchy — 언어의 구조: 음소 → 형태소 → 단어 → 문장, 그리고 생산성 (7장 p.24)
// 시간축(초): 0 질문 → 1 음소 블록 등장 → 3.5 형태소로 묶임 → 5.5 단어
//   → 7 문장(통사론·의미론) → 9.5 생산성: 유한한 기호 → 무한한 문장 → 12 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["language_hierarchy"] = {
  title: "언어의 구조 — 소리 조각이 문장이 되기까지 12초",
  desc: "[[음소]](소리를 구분하는 최소 단위) → [[형태소]](의미를 구성하는 최소 단위) → 단어 → 문장. 문법 = 의미론(소리 → 의미) + 통사론(단어 배열 → 문장). 제한된 기호(자음 19 · 모음 21)로 무한한 메시지 = [[언어의 구조|언어의 생산성]]",
  duration: 12,
  build: function () {
    var C = {
      a: "#1d65b3", aL: "#dbe8f7", b: "#2e9e4f", bL: "#dff3e4",
      c: "#e09a40", cL: "#fdeec2", n: "#3b2f4a", nL: "#efe9f6",
      r: "#d6465f", rL: "#fbe0e5", m: "#777"
    };
    var D = 12;
    function box(x, y, w, h, fill, stroke, extra) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="7" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' + (extra || "") + '/>';
    }
    function txt(x, y, s, size, fill, extra) {
      return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || "#222") + '"' + (/text-anchor/.test(extra || "") ? "" : ' text-anchor="middle"') + (extra || "") + '>' + s + '</text>';
    }
    function show(from, to, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';' + (to / dur) + ';' + (to / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function from(t, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (t / dur) + ';' + (t / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }

    var s = '<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="언어의 구조 위계 애니메이션">';
    s += '<defs><marker id="lh_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#888"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1, "언어는 구어 기준 음소 · 형태소 · 문법 3가지로 구성 (7장 p.24)"],
      [1, 3.5, "① 음소: 소리를 구분할 수 있는 최소 단위 — 그 자체로는 뜻이 없다"],
      [3.5, 5.5, "② 형태소: 의미를 구성하는 최소 단위 — 먹- (먹다) · -었- (과거) · -다 (서술)"],
      [5.5, 7, "③ 형태소가 모여 단어가 된다"],
      [7, 9.5, "④ 문법: 통사론(단어의 배열로 문장 구성) + 의미론(소리로부터 의미 도출)"],
      [9.5, 12, "⑤ 언어의 생산성: 제한된 기호의 조합으로 무한한 메시지를 생성"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 24, c[2], 14, "#222", ' font-weight="700"') + (c[1] >= D ? from(c[0], D) : show(c[0], c[1], D)) + '</g>';
    });

    // ---- 왼쪽 층 이름 ----
    var rows = [["음소", "Phoneme", 70, C.a, 1], ["형태소", "Morpheme", 140, C.b, 3.5], ["단어", "Word", 200, C.c, 5.5], ["문장", "문법 Grammar", 260, C.n, 7]];
    rows.forEach(function (r) {
      s += '<g opacity="0.25">' + txt(60, r[2] + 4, r[0], 15, r[3], ' font-weight="700"') + txt(60, r[2] + 20, r[1], 10.5, C.m) +
        '<animate attributeName="opacity" values="0.25;0.25;1;1" keyTimes="0;' + (r[4] / D) + ';' + (r[4] / D + 0.02) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    });

    // ---- ① 음소 블록 8개 ----
    var ph = ["ㅁ", "ㅓ", "ㄱ", "ㅇ", "ㅓ", "ㅆ", "ㄷ", "ㅏ"];
    ph.forEach(function (p, i) {
      var x = 150 + i * 44;
      s += '<g opacity="0">' + box(x, 52, 36, 36, C.aL, C.a) + txt(x + 18, 77, p, 18, C.a, ' font-weight="700"') + from(1 + i * 0.2, D) + '</g>';
    });
    s += '<g opacity="0">' + txt(530, 76, "뜻 없음, 소리 구분만", 12, C.m, ' text-anchor="start"') + show(2.8, 9.4, D) + '</g>';

    // ---- ② 형태소 3개 (음소 묶음) ----
    var mo = [["먹-", "먹다", 150, 124], ["-었-", "과거", 282, 124], ["-다", "서술", 414, 80]];
    mo.forEach(function (m, i) {
      var t = 3.5 + i * 0.4;
      s += '<g opacity="0"><path d="M' + (m[2] + 4) + ',94 L' + (m[2] + m[3] / 2) + ',118 L' + (m[2] + m[3] - 4) + ',94" fill="none" stroke="' + C.b + '" stroke-width="1.5"/>' +
        box(m[2], 120, m[3], 40, C.bL, C.b) + txt(m[2] + m[3] / 2, 140, m[0], 16, "#1d6b2a", ' font-weight="700"') +
        txt(m[2] + m[3] / 2, 155, m[1], 10.5, C.m) + from(t, D) + '</g>';
    });
    s += '<g opacity="0">' + txt(530, 144, "각각 뜻이 있는 최소 조각", 12, "#1d6b2a", ' text-anchor="start"') + show(4.6, 9.4, D) + '</g>';

    // ---- ③ 단어 ----
    s += '<g opacity="0"><line x1="320" y1="162" x2="320" y2="180" stroke="#888" stroke-width="1.5" marker-end="url(#lh_arrow)"/>' +
      box(250, 182, 140, 34, C.cL, C.c) + txt(320, 205, "먹었다", 17, "#8a6000", ' font-weight="700"') + from(5.5, D) + '</g>';

    // ---- ④ 문장 + 통사론·의미론 ----
    s += '<g opacity="0"><line x1="320" y1="218" x2="320" y2="238" stroke="#888" stroke-width="1.5" marker-end="url(#lh_arrow)"/>' +
      box(170, 240, 300, 38, C.nL, C.n) + txt(320, 265, "나는 · 밥을 · 먹었다", 17, C.n, ' font-weight="700"') + from(7, D) + '</g>';
    s += '<g opacity="0">' + box(500, 200, 240, 34, "#fff", C.n) + txt(620, 222, "통사론: 단어 배열 → 문장 구성", 12, C.n) + from(7.6, D) + '</g>';
    s += '<g opacity="0">' + box(500, 244, 240, 34, "#fff", C.n) + txt(620, 266, "의미론: 소리 → 의미 도출", 12, C.n) + from(8.2, D) + '</g>';

    // ---- ⑤ 생산성 ----
    s += '<g opacity="0">' + box(500, 52, 240, 110, "#fff", C.r) +
      txt(620, 76, "한국어 자모 = 자음 19 + 모음 21", 12.5, C.r, ' font-weight="700"') +
      txt(620, 98, "나는 밥을 먹었다", 11.5, "#444") + txt(620, 116, "너는 빵을 먹겠다", 11.5, "#444") +
      txt(620, 134, "우리는 시험을 잘 봤다 …", 11.5, "#444") + txt(620, 154, "→ 무한한 문장", 13, C.r, ' font-weight="700"') + from(9.5, D) + '</g>';

    // ---- 아래 요점 ----
    s += txt(380, 320, "음소 = 소리 최소 단위 · 형태소 = 의미 최소 단위 · 문법 = 의미론 + 통사론 · 생산성 = 유한 → 무한", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
