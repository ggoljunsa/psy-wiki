// ============================================================
// observational_learning — 반두라의 오뚝이 실험과 대리 강화 (5장 p.31)
// 시간축(초): 0 실험 소개 → 1.5 방 1: 어른 모델이 오뚝이를 때림, 아이는 관찰 → 4.5 방 2: 아이 혼자
//   → 6 같은 동작 모방(모델링) → 8.5 대리 강화/대리 처벌 → 11.5 정리 → 13 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["observational_learning"] = {
  title: "오뚝이 실험 — 보기만 했는데 따라 한다 13초",
  desc: "Bandura et al.(1961) (교재 보충 절차): 어른 모델이 오뚝이 인형을 때리는 장면을 '''창 너머로 본''' 아이가, 혼자 남자 같은 동작을 모방한다(모델링). 아래 보조 패널은 같은 슬라이드의 별도 연구(Mobbs 2009)인 [[관찰 학습|대리 강화]]. 직접 경험 없이 관찰만으로 학습 — [[관찰 학습]], [[오뚝이 실험]]",
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
    // 사람: (x, 발 y, 키 배율, 색), 팔은 어깨 기준으로 휘두름
    function person(x, fy, k, col, hits, label, dir) {
      dir = dir || 1;
      var h = 90 * k, hr = 11 * k, sy = fy - h + 2 * hr + 6 * k;
      var g = '<circle cx="' + x + '" cy="' + (fy - h + hr) + '" r="' + hr + '" fill="#f3d9c0" stroke="#7a5a40" stroke-width="1.5"/>';
      g += '<rect x="' + (x - 12 * k) + '" y="' + (fy - h + 2 * hr + 2) + '" width="' + (24 * k) + '" height="' + (h * 0.45) + '" rx="' + (6 * k) + '" fill="' + col + '"/>';
      g += '<line x1="' + (x - 6 * k) + '" y1="' + (fy - h * 0.3) + '" x2="' + (x - 8 * k) + '" y2="' + fy + '" stroke="#555" stroke-width="' + (5 * k) + '" stroke-linecap="round"/>';
      g += '<line x1="' + (x + 6 * k) + '" y1="' + (fy - h * 0.3) + '" x2="' + (x + 8 * k) + '" y2="' + fy + '" stroke="#555" stroke-width="' + (5 * k) + '" stroke-linecap="round"/>';
      g += '<g><line x1="' + (x + dir * 10 * k) + '" y1="' + sy + '" x2="' + (x + (dir > 0 ? 36 : -10) * k) + '" y2="' + (sy + (dir > 0 ? 22 : 36) * k) + '" stroke="' + col + '" stroke-width="' + (6 * k) + '" stroke-linecap="round"/>';
      (hits || []).forEach(function (t) {
        g += '<animateTransform attributeName="transform" type="rotate" values="0 ' + (x + 8 * k) + ' ' + sy + ';-70 ' + (x + 8 * k) + ' ' + sy + ';10 ' + (x + 8 * k) + ' ' + sy + ';0 ' + (x + 8 * k) + ' ' + sy + '" keyTimes="0;0.4;0.7;1" begin="' + t + 's" dur="0.6s"/>';
      });
      g += '</g>';
      if (label) g += txt(x, fy + 16, label, 11, "#444");
      return g;
    }
    // 오뚝이: 바닥 중심 (x, fy) 기준으로 기울어짐
    function bobo(x, fy, hits) {
      var g = '<g><ellipse cx="' + x + '" cy="' + (fy - 24) + '" rx="22" ry="24" fill="' + C.rL + '" stroke="' + C.r + '" stroke-width="2"/>' +
        '<circle cx="' + x + '" cy="' + (fy - 62) + '" r="15" fill="#fff" stroke="' + C.r + '" stroke-width="2"/>' +
        '<circle cx="' + (x - 5) + '" cy="' + (fy - 64) + '" r="2" fill="#333"/><circle cx="' + (x + 5) + '" cy="' + (fy - 64) + '" r="2" fill="#333"/>' +
        '<path d="M' + (x - 6) + ',' + (fy - 56) + ' q6,5 12,0" fill="none" stroke="' + C.r + '" stroke-width="2"/>';
      hits.forEach(function (t) {
        g += '<animateTransform attributeName="transform" type="rotate" values="0 ' + x + ' ' + fy + ';0 ' + x + ' ' + fy + ';28 ' + x + ' ' + fy + ';-12 ' + x + ' ' + fy + ';6 ' + x + ' ' + fy + ';0 ' + x + ' ' + fy + '" keyTimes="0;0.25;0.45;0.65;0.85;1" begin="' + t + 's" dur="0.9s"/>';
      });
      return g + '</g>' + txt(x, fy + 16, "오뚝이 인형", 11, C.r);
    }
    var s = '<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="반두라의 오뚝이 실험 애니메이션">';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "Bandura et al.(1961)의 오뚝이 실험 (교재 보충 절차)"],
      [1.5, 4.5, "① 방 1 — 어른 모델이 오뚝이 인형을 때리고, 아이는 창 너머로 관찰"],
      [4.5, 6, "② 방 2 — 아이 혼자 오뚝이 인형과 남음 (아무도 시키지 않음)"],
      [6, 8.5, "③ 본 동작을 그대로 모방 — 모델링 (보상을 직접 받은 적 없음)"],
      [8.5, 11.5, "④ 별도 연구(Mobbs 2009) — 대리 강화: 모방↑ / 대리 처벌: 모방↓"],
      [11.5, 13, "관찰 학습(사회학습): 타 개체의 행동을 관찰·모방하여 학습"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 방 1 ----
    s += '<g>' + box(14, 44, 360, 192, "#fff", C.n) + '<animate attributeName="stroke-width" values="2;2;4;4;2;2" keyTimes="0;' + (1.5 / D) + ';' + (1.52 / D) + ';' + (4.5 / D) + ';' + (4.52 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += txt(60, 64, "방 1", 13, C.n, ' font-weight="700"');
    s += person(90, 206, 1.15, C.c, [2.0, 2.8, 3.6], "어른 모델");
    s += bobo(178, 206, [2.15, 2.95, 3.75]);
    // 관찰 창 + 아이
    s += '<rect x="262" y="70" width="10" height="150" fill="' + C.aL + '" stroke="' + C.a + '" stroke-width="1.5"/>';
    s += txt(267, 64, "창", 11, C.a);
    s += person(322, 206, 0.75, C.a, [], "관찰하는 아이", -1);
    s += '<g opacity="0"><path d="M312,140 L200,142" fill="none" stroke="' + C.a + '" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      txt(318, 104, "관찰 중", 11, C.a, ' font-weight="700"') + show(1.5, 4.5, D) + '</g>';
    s += '<g opacity="0">' + txt(132, 96, "퍽! 퍽!", 14, C.r, ' font-weight="700"') + show(2.1, 4.4, D) + '</g>';

    // ---- 방 2 ----
    s += '<g>' + box(388, 44, 358, 192, "#fff", C.n) + '<animate attributeName="stroke-width" values="2;2;4;4;2;2" keyTimes="0;' + (4.5 / D) + ';' + (4.52 / D) + ';' + (8.5 / D) + ';' + (8.52 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += txt(434, 64, "방 2", 13, C.n, ' font-weight="700"');
    s += '<g opacity="0.25">' + person(500, 206, 0.75, C.a, [6.3, 7.0, 7.7], "아이 (혼자)") + bobo(560, 206, [6.4, 7.1, 7.8]) +
      '<animate attributeName="opacity" values="0.25;0.25;1;1" keyTimes="0;' + (4.5 / D) + ';' + (4.55 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += '<g opacity="0">' + txt(510, 96, "퍽! 퍽!", 14, C.r, ' font-weight="700"') + show(6.4, 8.5, D) + '</g>';
    s += '<g opacity="0">' + box(610, 120, 124, 52, C.cL, C.c) + txt(672, 142, "같은 동작 모방", 12, "#8a6000", ' font-weight="700"') + txt(672, 160, "= 모델링", 12, "#8a6000", ' font-weight="700"') + show(6.6, 13, D) + '</g>';
    // 방1 → 방2 화살표
    s += '<g opacity="0"><path d="M352,232 C370,252 392,252 410,232" fill="none" stroke="#555" stroke-width="2"/><path d="M410,232 l-2,10 l-7,-6 z" fill="#555"/>' + show(4.5, 6, D) + '</g>';

    // ---- 아래 보조 패널: 대리 강화 ----
    s += '<g opacity="0">';
    s += box(14, 244, 732, 62, C.nL, C.n);
    s += txt(26, 266, "모델이 보상받는 장면을 본 아이", 12, C.n, ' font-weight="700" text-anchor="start"');
    s += txt(26, 292, "모델이 처벌받는 장면을 본 아이", 12, C.n, ' font-weight="700" text-anchor="start"');
    s += '<rect x="230" y="256" width="0" height="14" rx="4" fill="#1d6b2a"><animate attributeName="width" from="0" to="300" begin="8.8s" dur="1s" fill="freeze"/></rect>';
    s += '<rect x="230" y="282" width="0" height="14" rx="4" fill="#3c3c88"><animate attributeName="width" from="0" to="80" begin="9.3s" dur="0.8s" fill="freeze"/></rect>';
    s += txt(542, 268, "모방↑ = 대리 강화", 12, "#1d6b2a", ' font-weight="700" text-anchor="start"');
    s += txt(322, 294, "모방↓ = 대리 처벌", 12, "#3c3c88", ' font-weight="700" text-anchor="start"');
    s += show(8.5, 13, D) + '</g>';

    // ---- 아래 요점 ----
    s += txt(380, 328, "직접 경험(직접 강화) 없이 관찰만으로 학습 = 관찰 학습 — 인지 기능이 지원하는 인지학습의 일환", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
