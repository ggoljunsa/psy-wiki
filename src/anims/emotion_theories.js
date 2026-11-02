// ============================================================
// emotion_theories — 8장 p.29–33 정서 이론 4가지 (p.33 정리표)
// 시간축(초): 0 제목 → 1 제임스-랑게(자극 → 신체 반응 → 정서) → 4.2 캐넌-바드(자극 → 신체 ∥ 정서 동시)
//   → 7.4 샥터-싱어 2요인(각성 + 이름 붙이기 → 정서) → 10.6 자이언스·르두·라자루스(자극 → 즉시 정서)
//   → 12.4 네 줄 모두 유지 + 요점
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["emotion_theories"] = {
  title: "정서 이론 4가지 — 신체 반응과 정서, 무엇이 먼저인가 14초",
  desc: "[[제임스-랑게 이론]](신체 → 정서) · [[캐넌-바드 이론]](동시·독립) · [[샥터-싱어 2요인 이론]](각성 + 이름 붙이기) · [[자이언스·르두·라자루스의 입장]](의식적 평가 없이 즉각)을 같은 자극(곰)으로 한 줄씩 보여 준다 — p.33 정리표",
  duration: 14,
  build: function () {
    var C = {
      a: "#1d65b3", aL: "#dbe8f7", b: "#2e9e4f", bL: "#dff3e4",
      c: "#e09a40", cL: "#fdeec2", n: "#3b2f4a", nL: "#efe9f6",
      r: "#d6465f", rL: "#fbe0e5", muted: "#777"
    };
    function box(x, y, w, h, fill, stroke, extra) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' + (extra || "") + '/>';
    }
    function txt(x, y, s, size, fill, extra) {
      return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || "#222") + '" text-anchor="middle"' + (extra || "") + '>' + s + '</text>';
    }
    function show(from, to, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;' + (from / dur).toFixed(4) + ';' + (from / dur + 0.02).toFixed(4) + ';' + (to / dur).toFixed(4) + ';' + Math.min(1, to / dur + 0.02).toFixed(4) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function on(from, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (from / dur).toFixed(4) + ';' + (from / dur + 0.02).toFixed(4) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function arrow(x1, y1, x2, y2, color, t) {
      return '<g opacity="0"><line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '" stroke-width="2.5" marker-end="url(#et_arrow)"/>' + on(t, D) + '</g>';
    }
    var D = 14;
    var B = ' font-weight="700"';
    var s = '<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="정서 이론 4가지 비교 애니메이션">';
    s += '<defs><marker id="et_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1, "정서 이론 4가지 — 같은 자극(곰), 신체 반응과 정서 중 무엇이 먼저인가?"],
      [1, 4.2, "제임스-랑게: 신체 반응이 정서를 유발한다"],
      [4.2, 7.4, "캐넌-바드: 신체 반응과 정서는 독립적으로 동시에 발생"],
      [7.4, 10.6, "샥터-싱어 2요인: 신체적 각성 + 이름 붙이기(인지적 해석) = 정서"],
      [10.6, 12.4, "자이언스·르두·라자루스: 어떤 정서 반응은 의식적 평가 없이 즉각 발생"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "p.33 정리표 — 신체가 먼저 / 동시 / 해석이 더해져야 / 해석 없이 즉시", 14, "#222", B) + on(12.4, D) + '</g>';

    // ---- 행 공통: 이론 이름표 + 자극 ----
    var rows = [
      { y: 44, name: "제임스-랑게", t: 1.0 },
      { y: 122, name: "캐넌-바드", t: 4.2 },
      { y: 200, name: "샥터-싱어 2요인", t: 7.4 },
      { y: 278, name: "자이언스·르두·라자루스", t: 10.6 }
    ];
    rows.forEach(function (r) {
      s += '<g opacity="0">' + box(10, r.y + 8, 170, 50, C.nL, C.n) + txt(95, r.y + 38, r.name, 13, C.n, B) +
        box(196, r.y + 12, 84, 42, C.aL, C.a) + txt(238, r.y + 38, "🐻 자극(곰)", 12, C.a, B) + on(r.t, D) + '</g>';
    });

    // ---- 1. 제임스-랑게: 자극 → 신체 반응 → 정서 ----
    var y1 = rows[0].y;
    s += arrow(282, y1 + 33, 316, y1 + 33, "#555", 1.6);
    s += '<g opacity="0">' + box(320, y1 + 12, 150, 42, C.bL, C.b) + txt(395, y1 + 32, "① 신체 반응", 13, "#1d6b2a", B) + txt(395, y1 + 48, "심장↑ · 떨림", 11, "#1d6b2a") + on(1.8, D) + '</g>';
    s += arrow(472, y1 + 33, 506, y1 + 33, "#555", 2.6);
    s += '<g opacity="0">' + box(510, y1 + 12, 140, 42, C.cL, C.c) + txt(580, y1 + 32, "② 정서 (두려움)", 13, "#8a6000", B) + txt(580, y1 + 48, "몸을 느끼고 나서", 11, "#8a6000") + on(2.8, D) + '</g>';
    s += '<g opacity="0">' + txt(705, y1 + 38, "신체 → 정서", 12, C.n, B) + on(3.2, D) + '</g>';

    // ---- 2. 캐넌-바드: 자극 → (신체 ∥ 정서) ----
    var y2 = rows[1].y;
    s += '<g opacity="0"><path d="M282,' + (y2 + 33) + ' L300,' + (y2 + 33) + ' L300,' + (y2 + 17) + ' L316,' + (y2 + 17) + '" fill="none" stroke="#555" stroke-width="2.5" marker-end="url(#et_arrow)"/>' +
      '<path d="M300,' + (y2 + 33) + ' L300,' + (y2 + 51) + ' L316,' + (y2 + 51) + '" fill="none" stroke="#555" stroke-width="2.5" marker-end="url(#et_arrow)"/>' + on(4.8, D) + '</g>';
    s += '<g opacity="0">' + box(320, y2 + 4, 150, 28, C.bL, C.b) + txt(395, y2 + 23, "신체 반응 (심장↑)", 12, "#1d6b2a", B) +
      box(320, y2 + 38, 150, 28, C.cL, C.c) + txt(395, y2 + 57, "정서 (두려움)", 12, "#8a6000", B) + on(5.2, D) + '</g>';
    s += '<g opacity="0">' + box(486, y2 + 18, 160, 32, "#fdeec2", "#8a6000") + txt(566, y2 + 39, "∥ 동시 · 서로 독립", 13, "#8a6000", B) + on(5.8, D) + '</g>';
    s += '<g opacity="0">' + txt(705, y2 + 38, "신체 ∥ 정서", 12, C.n, B) + on(6.4, D) + '</g>';

    // ---- 3. 샥터-싱어 2요인: 각성 + 해석 → 정서 ----
    var y3 = rows[2].y;
    s += arrow(282, y3 + 33, 300, y3 + 33, "#555", 7.9);
    s += '<g opacity="0">' + box(302, y3 + 12, 118, 42, C.bL, C.b) + txt(361, y3 + 32, "① 신체적 각성", 12, "#1d6b2a", B) + txt(361, y3 + 48, "심장↑ (뭔지 모름)", 10, "#1d6b2a") + on(8.2, D) + '</g>';
    s += '<g opacity="0">' + txt(432, y3 + 39, "+", 20, "#555", B) + box(444, y3 + 12, 128, 42, C.nL, C.n) + txt(508, y3 + 32, "② 이름 붙이기", 12, C.n, B) + txt(508, y3 + 48, "\"곰 때문이야\"", 11, C.n) + on(9.0, D) + '</g>';
    s += arrow(574, y3 + 33, 590, y3 + 33, "#555", 9.6);
    s += '<g opacity="0">' + box(592, y3 + 12, 158, 42, C.cL, C.c) + txt(671, y3 + 32, "③ 정서 (두려움)", 13, "#8a6000", B) + txt(671, y3 + 48, "각성 + 해석 = 정서", 10, "#8a6000") + on(9.8, D) + '</g>';

    // ---- 4. 자이언스·르두·라자루스: 자극 → 즉시 정서 ----
    var y4 = rows[3].y;
    s += arrow(282, y4 + 33, 316, y4 + 33, C.r, 11.0);
    s += '<g opacity="0">' + box(320, y4 + 12, 150, 42, C.cL, C.c) + txt(395, y4 + 32, "정서 (즉각)", 13, "#8a6000", B) + txt(395, y4 + 48, "선호·공포가 먼저", 11, "#8a6000") + on(11.2, D) + '</g>';
    s += '<g opacity="0">' + box(486, y4 + 14, 264, 38, "#f4f4f4", "#999", ' stroke-dasharray="5 4"') +
      txt(618, y4 + 30, "의식적 평가 없이 (역치 하 점화)", 12, "#555", B) + txt(618, y4 + 45, "신경 근거: 빠른 아랫길 (시상 → 편도체)", 10, "#555") + on(11.7, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 370, "제임스-랑게 = 신체 → 정서 · 캐넌-바드 = 동시 · 2요인 = 각성 + 해석 · 자이언스·르두 = 해석 없이 즉각", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
