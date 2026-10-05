// ============================================================
// skinner_box — 강화와 처벌의 2×2 (5장 p.18–19, 24)
// 시간축(초): 0 스키너 상자 → 1.5 정적 강화(먹이 제시 ↑) → 4 부적 강화(전기 충격 제거 ↑)
//   → 6.5 정적 처벌(전기 충격 제시 ↓) → 9 부적 처벌(먹이 철회 ↓) → 11.5 정리 → 13 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["skinner_box"] = {
  title: "스키너 상자 — 강화와 처벌의 2×2 13초",
  desc: "쥐가 레버를 누른 '''뒤에''' 무엇이 오느냐: 먹이 제시 = [[정적 강화]](↑), 전기 충격 제거 = [[부적 강화]](↑), 전기 충격 제시 = 정적 [[처벌]](↓), 먹이 철회 = [[부적 처벌]](↓). '정적/부적' = 제시/제거, '강화/처벌' = 행동 증가/감소 — [[정적 강화와 부적 강화|부적 강화는 처벌이 아님]]",
  duration: 13,
  build: function () {
    var C = {
      a: "#1d65b3", aL: "#dbe8f7", b: "#2e9e4f", bL: "#dff3e4",
      c: "#e09a40", cL: "#fdeec2", n: "#3b2f4a", nL: "#efe9f6",
      r: "#d6465f", rL: "#fbe0e5", m: "#777"
    };
    function box(x, y, w, h, fill, stroke, extra) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' + (extra || "") + '/>';
    }
    function txt(x, y, s, size, fill, extra) {
      return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || "#222") + '"' + (/text-anchor/.test(extra || "") ? "" : ' text-anchor="middle"') + (extra || "") + '>' + s + '</text>';
    }
    function show(from, to, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';' + (to / dur) + ';' + Math.min(1, to / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    var D = 13;
    function zig(x, y) { return '<path d="M' + x + ',' + y + ' l6,-10 l2,7 l6,-12 l-2,12 l-6,-5 z" fill="' + C.r + '"/>'; }
    var s = '<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="스키너 상자 강화와 처벌 애니메이션">';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "스키너 상자: 레버를 누른 뒤 무엇이 오느냐에 따라 행동 빈도가 바뀐다"],
      [1.5, 4, "정적 강화: 보상(먹이)을 제공하여 행동을 증가시키는 것"],
      [4, 6.5, "부적 강화: 혐오 자극(전기 충격)을 제거하여 행동 빈도를 증가시키는 것"],
      [6.5, 9, "정적 처벌(제1유형 처벌): 혐오 자극을 가하여 행동 감소"],
      [9, 11.5, "부적 처벌(제2유형 처벌): 보상 자극을 철회하여 행동 감소"],
      [11.5, 13, "'정적/부적' = 제시/제거, '강화/처벌' = 행동 증가/감소"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 왼쪽: 스키너 상자 ----
    s += box(14, 46, 290, 214, "#fafafa", C.n);
    s += txt(60, 66, "스키너 상자", 11, C.m);
    // 바닥 격자 (전기 충격)
    for (var gx = 30; gx <= 290; gx += 16) s += '<line x1="' + gx + '" y1="244" x2="' + gx + '" y2="256" stroke="#999" stroke-width="2"/>';
    s += '<line x1="20" y1="244" x2="298" y2="244" stroke="#999" stroke-width="2"/>';
    // 레버
    s += '<rect x="290" y="150" width="10" height="30" fill="#bbb"/>';
    s += '<g><line x1="290" y1="166" x2="254" y2="166" stroke="' + C.n + '" stroke-width="6" stroke-linecap="round"/>';
    [2.0, 5.0, 7.0, 9.6].forEach(function (t) {
      s += '<animateTransform attributeName="transform" type="rotate" values="0 290 166;-14 290 166;0 290 166" begin="' + t + 's" dur="0.5s"/>';
    });
    s += '</g>';
    s += txt(262, 148, "레버", 11, C.n);
    // 먹이 그릇
    s += '<path d="M232,232 L284,232 L278,244 L238,244 z" fill="#ccc" stroke="#888"/>';
    // 쥐
    s += '<g><ellipse cx="170" cy="214" rx="46" ry="24" fill="#c8c0b8" stroke="#6b625a" stroke-width="2"/>' +
      '<ellipse cx="220" cy="204" rx="22" ry="15" fill="#c8c0b8" stroke="#6b625a" stroke-width="2"/>' +
      '<circle cx="212" cy="190" r="7" fill="#e7b9b9" stroke="#6b625a" stroke-width="1.5"/>' +
      '<circle cx="230" cy="200" r="2.5" fill="#222"/><circle cx="242" cy="206" r="3" fill="#d88"/>' +
      '<path d="M124,220 C100,230 86,212 70,224" fill="none" stroke="#6b625a" stroke-width="2.5"/>';
    [2.0, 5.0, 7.0, 9.6].forEach(function (t) {
      s += '<animateTransform attributeName="transform" type="translate" values="0 0;12 -18;0 0" begin="' + (t - 0.1) + 's" dur="0.6s"/>';
    });
    s += '</g>';
    // ① 먹이 제시
    s += '<g opacity="0"><circle cx="258" cy="228" r="6" fill="#b0743a"><animate attributeName="cy" from="120" to="228" begin="2.3s" dur="0.4s" fill="freeze"/></circle>' + show(2.3, 4, D) + '</g>';
    s += '<g opacity="0">' + txt(160, 98, "먹이 제시 (+)", 14, C.b, ' font-weight="700"') + show(2.3, 4, D) + '</g>';
    // ② 충격 중 → 레버 → 충격 제거
    var shock = "";
    for (var zx = 34; zx < 290; zx += 40) shock += zig(zx, 254);
    s += '<g opacity="0">' + shock + show(4, 5.2, D) + '</g>';
    s += '<g opacity="0">' + txt(160, 98, "바닥에 전기 충격 중…", 13, C.r, ' font-weight="700"') + show(4, 5.2, D) + '</g>';
    s += '<g opacity="0">' + txt(160, 98, "전기 충격 제거 (−)", 14, C.b, ' font-weight="700"') + show(5.2, 6.5, D) + '</g>';
    // ③ 레버 → 충격 제시
    s += '<g opacity="0">' + shock + show(7.3, 8.8, D) + '</g>';
    s += '<g opacity="0">' + txt(160, 98, "전기 충격 제시 (+)", 14, C.r, ' font-weight="700"') + show(7.3, 9, D) + '</g>';
    // ④ 먹이가 있음 → 레버 → 먹이 철회
    s += '<g opacity="0"><circle cx="258" cy="228" r="6" fill="#b0743a"/><circle cx="268" cy="229" r="5" fill="#c88a4a"/>' + show(9, 9.9, D) + '</g>';
    s += '<g opacity="0">' + txt(160, 98, "먹이(보상)가 있음", 13, C.m, ' font-weight="700"') + show(9, 9.9, D) + '</g>';
    s += '<g opacity="0">' + txt(160, 98, "먹이 철회 (−)", 14, C.r, ' font-weight="700"') + '<path d="M246,218 L272,240 M272,218 L246,240" stroke="' + C.r + '" stroke-width="3"/>' + show(9.9, 11.5, D) + '</g>';

    // 레버 누르기 빈도 막대
    s += txt(18, 286, "레버 누르기 빈도", 12, C.n, ' font-weight="700" text-anchor="start"');
    s += '<rect x="122" y="275" width="180" height="14" rx="4" fill="#eee"/>';
    var W0 = 80, UP = 170, DN = 24;
    var kt = [0, 1.5, 2.5, 3.6, 4, 5.4, 6.2, 6.5, 7.6, 8.6, 9, 10.1, 11.1, 13].map(function (t) { return t / D; }).join(";");
    var wv = [W0, W0, W0, UP, W0, W0, UP, W0, W0, DN, W0, W0, DN, DN].join(";");
    var cv = ["#999", "#999", "#999", "#2e9e4f", "#999", "#999", "#2e9e4f", "#999", "#999", "#3c3c88", "#999", "#999", "#3c3c88", "#3c3c88"].join(";");
    s += '<rect x="122" y="275" width="' + W0 + '" height="14" rx="4" fill="#999"><animate attributeName="width" values="' + wv + '" keyTimes="' + kt + '" dur="' + D + 's" fill="freeze"/>' +
      '<animate attributeName="fill" values="' + cv + '" keyTimes="' + kt + '" dur="' + D + 's" fill="freeze"/></rect>';

    // ---- 오른쪽: 2×2 ----
    s += txt(488, 66, "자극을 제시 (정적, +)", 12, C.n, ' font-weight="700"');
    s += txt(660, 66, "자극을 제거 (부적, −)", 12, C.n, ' font-weight="700"');
    s += txt(358, 128, "보상 자극", 12, C.b, ' font-weight="700"') + txt(358, 144, "(먹이)", 11, C.m);
    s += txt(358, 222, "혐오 자극", 12, C.r, ' font-weight="700"') + txt(358, 238, "(전기 충격)", 11, C.m);
    var cells = [
      [404, 78, "정적 강화", "먹이 제시", true, 1.5],
      [576, 78, "부적 처벌", "먹이(보상) 철회", false, 9],
      [404, 172, "정적 처벌", "전기 충격 제시", false, 6.5],
      [576, 172, "부적 강화", "전기 충격 제거", true, 4]
    ];
    cells.forEach(function (q) {
      var x = q[0], y = q[1], up = q[4], t = q[5];
      var fill = up ? "#cdefd2" : "#dcdcf2", ink = up ? "#1d6b2a" : "#3c3c88";
      s += '<g opacity="0.3">' + box(x, y, 168, 90, up ? C.bL : C.nL, ink) +
        txt(x + 84, y + 28, q[2], 15, ink, ' font-weight="700"') +
        txt(x + 84, y + 48, q[3], 12, "#333") +
        box(x + 34, y + 58, 100, 22, fill, ink) +
        txt(x + 84, y + 74, up ? "↑ 행동 증가" : "↓ 행동 감소", 12, ink, ' font-weight="700"') +
        '<animate attributeName="opacity" values="0.3;0.3;1;1" keyTimes="0;' + (t / D) + ';' + (t / D + 0.03) + ';1" dur="' + D + 's" fill="freeze"/></g>';
      s += '<g opacity="0"><rect x="' + (x - 3) + '" y="' + (y - 3) + '" width="174" height="96" rx="10" fill="none" stroke="' + C.c + '" stroke-width="4"/>' + show(t, t + 2.5, D) + '</g>';
    });
    // 정리: 강화 열 vs 처벌 — 대각선 강조
    s += '<g opacity="0"><text x="574" y="290" font-size="12.5" fill="' + C.r + '" font-weight="700" text-anchor="middle">⚠ 부적 강화(오른쪽 아래)는 처벌이 아니다 — 행동이 증가한다</text>' + show(11.5, 13, D) + '</g>';

    // ---- 아래 요점 ----
    s += txt(380, 318, "'부적' = 제거, '강화' = 행동 증가 → 부적 강화 ≠ 처벌", 13, C.m, ' font-weight="700"');
    s += '</svg>';
    return s;
  }
};
