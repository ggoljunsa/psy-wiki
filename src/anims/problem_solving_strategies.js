// ============================================================
// problem_solving_strategies — 알고리즘 vs 발견법 vs 통찰 (7장 p.4–6, p.21)
// 시간축(초): 0 문제 제시 → 2 ① 알고리즘(모든 배열을 하나씩, 느림·보장)
//   → 6 ② 발견법(후보 단어만 검토, 빠름·오류 가능) → 9 ③ 통찰(성냥개비 → 삼각뿔, 아하!)
//   → 12 정리 '정확한 사고 vs 효율적인 사고' → 14 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["problem_solving_strategies"] = {
  title: "문제 해결 전략 — 알고리즘 · 발견법 · 통찰 14초",
  desc: "같은 철자 재배열 문제(S L O Y O C H Y G)를 [[알고리즘]](모든 배열을 단계적으로: 해결 보장·느림·인지 자원 많이)과 [[발견법]](그럴듯한 후보만: 신속·오류 가능)으로 풀고, 성냥개비 6개 문제를 [[통찰]](갑작스러운 깨달음)으로 푼다. 요점: '정확한 사고' vs '효율적인 사고'",
  duration: 14,
  build: function () {
    var C = {
      a: "#1d65b3", aL: "#dbe8f7", b: "#2e9e4f", bL: "#dff3e4",
      c: "#e09a40", cL: "#fdeec2", n: "#3b2f4a", nL: "#efe9f6",
      r: "#d6465f", rL: "#fbe0e5", m: "#777"
    };
    var D = 14;
    function box(x, y, w, h, fill, stroke, extra) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' + (extra || "") + '/>';
    }
    function txt(x, y, s, size, fill, extra) {
      return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || "#222") + '"' + (/text-anchor/.test(extra || "") ? "" : ' text-anchor="middle"') + (extra || "") + '>' + s + '</text>';
    }
    function show(from, to, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.01) + ';' + (to / dur) + ';' + Math.min(1, to / dur + 0.01) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function from(t, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (t / dur) + ';' + (t / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function lit(t, dur) {
      return '<animate attributeName="opacity" values="0.3;0.3;1;1" keyTimes="0;' + (t / dur) + ';' + (t / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    // 시간 막대: t0 부터 d 초 동안 0 → w 로 자람
    function bar(x, y, w, col, t0, d) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="10" rx="5" fill="#eee"/>' +
        '<rect x="' + x + '" y="' + y + '" width="0" height="10" rx="5" fill="' + col + '">' +
        '<animate attributeName="width" from="0" to="' + w + '" begin="' + t0 + 's" dur="' + d + 's" fill="freeze"/></rect>';
    }

    var s = '<svg viewBox="0 0 760 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="알고리즘, 발견법, 통찰 비교 애니메이션">';

    // ---- 단계 자막 ----
    var caps = [
      [0, 2, "문제: 철자 S L O Y O C H Y G 로 단어 만들기 · 성냥개비 6개로 삼각형 4개 만들기"],
      [2, 6, "① 알고리즘: 시행착오를 최소화하는 단계적 절차 — 모든 배열을 하나씩 (해결 보장 · 느림)"],
      [6, 9, "② 발견법(어림법·추단법): 그럴듯한 후보만 빠르게 검토 (신속 · 오류 가능)"],
      [9, 12, "③ 통찰: 문제의 해결책을 갑작스레 깨닫는 현상 — “아하!” (즉각적 · 발생 안 할 수도)"],
      [12, 14, "정확한 사고(알고리즘) vs 효율적인 사고(발견법) — 실제로는 두 방식을 혼용한다"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 24, c[2], 13.5, "#222", ' font-weight="700"') + (c[1] >= D ? from(c[0], D) : show(c[0], c[1], D)) + '</g>';
    });

    // ---- 세 줄(lane) ----
    var lanes = [
      { y: 40, name: "① 알고리즘", sub: "algorithm", col: C.a, fill: C.aL, t0: 2 },
      { y: 136, name: "② 발견법", sub: "heuristics", col: C.b, fill: C.bL, t0: 6 },
      { y: 232, name: "③ 통찰", sub: "insight", col: C.c, fill: C.cL, t0: 9 }
    ];
    lanes.forEach(function (L) {
      s += '<g opacity="0.3">' + box(12, L.y, 736, 86, "#fff", L.col) +
        box(20, L.y + 8, 112, 70, L.fill, L.col) +
        txt(76, L.y + 40, L.name, 15, L.col, ' font-weight="700"') +
        txt(76, L.y + 60, L.sub, 11, C.m) + lit(L.t0, D) + '</g>';
    });

    // ---- ① 알고리즘: 배열을 하나씩 ----
    var perms = ["SLOYOCHYG", "LSOYOCHYG", "OLSYOCHYG", "YLOSOCHYG", "SOLYOCHYG", "SLYOOCHYG", "CHYGSLOYO", "… 수만 가지 …"];
    perms.forEach(function (p, i) {
      var t = 2 + i * 0.45;
      s += '<g opacity="0">' + txt(250, 82, p, 17, C.a, ' font-family="monospace" font-weight="700"') + show(t, t + 0.45, D) + '</g>';
    });
    s += '<g opacity="0">' + txt(250, 82, "psychology ✓", 17, C.b, ' font-family="monospace" font-weight="700"') + from(5.6, D) + '</g>';
    s += '<g opacity="0">' + txt(250, 106, "시도 1 → 2 → 3 → … 결국 반드시 찾음", 11.5, C.m) + from(2.3, D) + '</g>';
    s += txt(510, 58, "걸린 시간", 11, C.m, ' text-anchor="start"');
    s += bar(510, 66, 140, C.a, 2, 3.8);
    s += '<g opacity="0">' + txt(600, 102, "보장 ✓ · 느림 · 인지 자원 많이", 12, C.a, ' font-weight="700"') + from(5.8, D) + '</g>';

    // ---- ② 발견법: 후보 단어만 ----
    var cands = [["sociology", "✗ (l 없음)", C.r, 6.3], ["cyclohogs", "✗ (s 2개 필요)", C.r, 6.9], ["psychology", "✓ 모든 철자 사용", C.b, 7.5]];
    cands.forEach(function (c, i) {
      var y = 160 + i * 20;
      s += '<g opacity="0">' + txt(170, y, c[0], 14, "#222", ' font-family="monospace" text-anchor="start"') +
        txt(272, y, c[1], 12, c[2], ' font-weight="700" text-anchor="start"') + from(c[3], D) + '</g>';
    });
    s += txt(510, 154, "걸린 시간", 11, C.m, ' text-anchor="start"');
    s += bar(510, 162, 46, C.b, 6, 1.6);
    s += '<g opacity="0">' + txt(600, 198, "신속 · 효율적 · 오류 위험", 12, "#1d6b2a", ' font-weight="700"') + from(7.8, D) + '</g>';
    s += '<g opacity="0">' + txt(600, 214, "(“자주 쓰이는 단어부터” — 가짓수를 먼저 줄임)", 10.5, C.m) + from(8.1, D) + '</g>';

    // ---- ③ 통찰: 성냥개비 → 삼각뿔 ----
    var sticks = "";
    for (var k = 0; k < 6; k++) {
      var x = 150 + k * 16;
      sticks += '<line x1="' + x + '" y1="252" x2="' + x + '" y2="300" stroke="#c9a46a" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="' + x + '" cy="250" r="4" fill="' + C.r + '"/>';
    }
    s += '<g opacity="0.3">' + sticks + lit(9, D) + '</g>';
    s += '<g opacity="0">' + txt(320, 280, "평면에선 안 되는데…", 12, C.m) + show(9.2, 10.6, D) + '</g>';
    s += '<g opacity="0">' + txt(320, 300, ". . .", 16, C.m) + show(9.6, 10.6, D) + '</g>';
    // 아하 + 삼각뿔
    var pyr = '<g stroke="#c9a46a" stroke-width="4" stroke-linecap="round" fill="none">' +
      '<line x1="280" y1="306" x2="360" y2="306"/><line x1="280" y1="306" x2="330" y2="290"/><line x1="360" y1="306" x2="330" y2="290"/>' +
      '<line x1="320" y1="246" x2="280" y2="306"/><line x1="320" y1="246" x2="360" y2="306"/><line x1="320" y1="246" x2="330" y2="290"/></g>' +
      '<circle cx="320" cy="246" r="4" fill="' + C.r + '"/><circle cx="280" cy="306" r="4" fill="' + C.r + '"/><circle cx="360" cy="306" r="4" fill="' + C.r + '"/><circle cx="330" cy="290" r="4" fill="' + C.r + '"/>';
    s += '<g opacity="0">' + pyr + txt(374, 272, "아하! 삼각뿔", 15, "#8a6000", ' font-weight="700" text-anchor="start"') +
      txt(374, 292, "(바닥 1 + 옆면 3)", 10.5, C.m, ' text-anchor="start"') + from(10.6, D) + '</g>';
    // 전구
    s += '<g opacity="0"><circle cx="252" cy="262" r="12" fill="#ffe27a" stroke="' + C.c + '" stroke-width="2"/>' +
      '<rect x="246" y="274" width="12" height="7" fill="' + C.m + '"/>' + from(10.6, D) + '</g>';
    s += txt(510, 250, "걸린 시간", 11, C.m, ' text-anchor="start"');
    s += '<rect x="510" y="258" width="140" height="10" rx="5" fill="#eee"/>';
    s += '<g opacity="0"><rect x="510" y="258" width="14" height="10" rx="5" fill="' + C.c + '"/>' + from(10.6, D) + '</g>';
    s += '<g opacity="0">' + txt(660, 268, "순간!", 11, "#8a6000", ' font-weight="700" text-anchor="start"') + from(10.6, D) + '</g>';
    s += '<g opacity="0">' + txt(610, 302, "즉각적 · 발생하지 않을 수 있음", 12, "#8a6000", ' font-weight="700"') + from(11, D) + '</g>';

    // ---- 아래 요점 ----
    s += txt(380, 340, "알고리즘 = 보장·느림 / 발견법 = 빠름·오류 위험 / 통찰 = 갑작스러운 깨달음 (직전 전두엽 → 직후 우반구 측두엽)", 12, C.m);
    s += '</svg>';
    return s;
  }
};
