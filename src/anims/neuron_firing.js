// ============================================================
// neuron_firing — 2장 p.5–9 활동 전위·실무율·신경전달물질·재흡수
// 시간축(초): 0 안정 전위 → 1.5 약한 자극(역치 미만, 발화 없음) → 3 역치 도달 → 활동 전위 이동
//   → 5.5 강한 자극(발화율↑, 크기 동일) → 8 신경전달물질 방출·수용체 결합 → 10 재흡수 → 12 요점
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["neuron_firing"] = {
  title: "뉴런의 발화 — 역치·실무율·신경전달물질·재흡수 14초",
  desc: "자극 → 막전위가 [[역치]]를 넘으면 [[활동 전위]]가 축색을 따라 이동([[실무율]]: 크기는 항상 같다) → 강한 자극은 발화율↑ → 축색 종말에서 [[신경전달물질]] 방출 → 수용체 결합 → 남은 것은 [[재흡수]]",
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
    function kt(t) { return (t / D).toFixed(4); }
    var s = '<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="뉴런의 발화 애니메이션">';
    s += '<defs><marker id="nf_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.a + '"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "뉴런: 수상돌기 → 세포체 → 축색 → 축색 종말 (지금은 안정 전위)"],
      [1.5, 3, "약한 자극: 막전위가 역치에 못 미침 → 활동 전위 없음"],
      [3, 5.5, "역치 도달 → 활동 전위가 축색을 따라 이동 (실무율: 전부 아니면 전무)"],
      [5.5, 8, "강한 자극 → 발화율↑ (활동 전위의 크기는 동일)"],
      [8, 10, "축색 종말에서 신경전달물질 방출 → 다음 뉴런의 수용체에 결합"],
      [10, 12, "수용력 이상의 신경전달물질은 재흡수(reuptake) → 방출한 뉴런으로"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "뉴런 안은 전기 신호(활동 전위), 뉴런 사이는 화학 신호(신경전달물질)", 14, "#222", B) + on(12, D) + '</g>';

    // ---- 뉴런 1 ----
    var Y = 132;
    // 수상돌기
    s += '<g stroke="' + C.n + '" stroke-width="4" stroke-linecap="round" fill="none">' +
      '<path d="M86,118 L58,96 L40,90"/><path d="M58,96 L52,76"/><path d="M84,146 L56,168 L40,176"/><path d="M56,168 L50,186"/><path d="M80,132 L48,132"/></g>';
    s += '<circle cx="112" cy="' + Y + '" r="30" fill="' + C.nL + '" stroke="' + C.n + '" stroke-width="2.5"/>';
    s += '<circle cx="112" cy="' + Y + '" r="9" fill="' + C.n + '" opacity="0.5"/>';
    // 축색 + 수초
    s += '<line x1="142" y1="' + Y + '" x2="560" y2="' + Y + '" stroke="' + C.n + '" stroke-width="6"/>';
    for (var m = 0; m < 6; m++) {
      s += '<rect x="' + (166 + m * 64) + '" y="' + (Y - 9) + '" width="48" height="18" rx="9" fill="#f6efe0" stroke="#b9a37a" stroke-width="1.5"/>';
    }
    // 축색 종말
    s += '<path d="M556,' + (Y - 4) + ' C570,' + (Y - 30) + ' 600,' + (Y - 26) + ' 602,' + Y + ' C600,' + (Y + 26) + ' 570,' + (Y + 30) + ' 556,' + (Y + 4) + ' Z" fill="' + C.nL + '" stroke="' + C.n + '" stroke-width="2.5"/>';
    // 뉴런 2 (수용 쪽)
    s += '<path d="M626,96 L700,96 Q740,96 748,80 M626,168 L700,168 Q740,168 748,184" fill="none" stroke="' + C.b + '" stroke-width="3"/>';
    s += '<rect x="626" y="96" width="80" height="72" fill="' + C.bL + '" stroke="' + C.b + '" stroke-width="2.5"/>';
    var rec = [110, 124, 140, 154];
    rec.forEach(function (ry) { s += '<path d="M626,' + (ry - 5) + ' L618,' + (ry - 5) + ' L618,' + (ry + 5) + ' L626,' + (ry + 5) + '" fill="none" stroke="' + C.b + '" stroke-width="2.5"/>'; });
    // 라벨
    s += txt(52, 66, "수상돌기", 12, C.n, B) + txt(112, 182, "세포체", 12, C.n, B) + txt(360, 114, "축색 (수초)", 12, C.n, B) +
      txt(568, 88, "축색 종말", 12, C.n, B) + txt(614, 70, "시냅스", 12, "#555", B) + '<line x1="612" y1="75" x2="612" y2="104" stroke="#999" stroke-width="1.5" stroke-dasharray="3 3"/>' + txt(686, 88, "다음 뉴런", 12, C.b, B) +
      txt(666, 136, "수용체", 11, C.b);

    // ---- 자극 화살표 (세기별) ----
    var stim = [[1.5, 3, 2, "약한 자극"], [3, 5.5, 4, "중간 자극"], [5.5, 8, 7, "강한 자극"]];
    stim.forEach(function (k) {
      s += '<g opacity="0"><line x1="2" y1="' + Y + '" x2="44" y2="' + Y + '" stroke="' + C.a + '" stroke-width="' + k[2] + '" marker-end="url(#nf_arrow)"/>' +
        txtL(2, Y + 24, k[3], 12, C.a, B) + show(k[0], k[1], D) + '</g>';
    });
    // 세포체 흥분 표시
    s += '<circle cx="112" cy="' + Y + '" r="30" fill="' + C.c + '" opacity="0">' +
      '<animate attributeName="opacity" values="0;0;0.15;0.05;0.35;0.35;0.5;0.5;0;0" keyTimes="0;' + kt(1.5) + ';' + kt(2.2) + ';' + kt(3) + ';' + kt(3.3) + ';' + kt(5.5) + ';' + kt(5.8) + ';' + kt(8) + ';' + kt(8.2) + ';1" dur="' + D + 's" fill="freeze"/></circle>';

    // ---- 활동 전위 펄스 (같은 크기) ----
    var pulses = [3.2, 4.2, 5.6, 6.0, 6.4, 6.8, 7.2];
    pulses.forEach(function (b) {
      s += '<g opacity="0"><ellipse cx="0" cy="0" rx="13" ry="12" fill="' + C.c + '" stroke="#8a6000" stroke-width="2"/>' +
        '<animateMotion begin="' + b + 's" dur="0.9s" fill="freeze" path="M146,' + Y + ' L552,' + Y + '"/>' + show(b, b + 0.9, D) + '</g>';
    });

    // ---- 신경전달물질 알갱이 ----
    // [시작x, 시작y, 결합x, 결합y, 재흡수?]
    var nt = [[574, 120, 612, 110, 0], [580, 132, 612, 124, 0], [574, 144, 612, 140, 0], [584, 150, 612, 154, 0],
      [586, 116, 612, 100, 1], [588, 140, 614, 168, 1]];
    s += '<g>';
    nt.forEach(function (p) {
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="' + C.b + '" stroke="#fff" stroke-width="1"/>';
    });
    s += '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + kt(5.4) + ';' + kt(5.6) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    nt.forEach(function (p, i) {
      var t1 = 8.2 + i * 0.1, t2 = t1 + 0.8;
      var ex = p[2], ey = p[3];
      var xs, ys, kts;
      if (p[4]) {
        xs = p[0] + ';' + p[0] + ';' + ex + ';' + ex + ';' + (p[0] - 6) + ';' + (p[0] - 6);
        ys = p[1] + ';' + p[1] + ';' + ey + ';' + ey + ';' + p[1] + ';' + p[1];
        kts = '0;' + kt(t1) + ';' + kt(t2) + ';' + kt(10.2) + ';' + kt(11.2) + ';1';
      } else {
        xs = p[0] + ';' + p[0] + ';' + ex + ';' + ex;
        ys = p[1] + ';' + p[1] + ';' + ey + ';' + ey;
        kts = '0;' + kt(t1) + ';' + kt(t2) + ';1';
      }
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.5" fill="' + C.b + '" opacity="0">' +
        '<animate attributeName="cx" values="' + xs + '" keyTimes="' + kts + '" dur="' + D + 's" fill="freeze"/>' +
        '<animate attributeName="cy" values="' + ys + '" keyTimes="' + kts + '" dur="' + D + 's" fill="freeze"/>' +
        on(8.1, D) + '</circle>';
    });
    s += '<g opacity="0"><path d="M640,190 Q600,214 576,166" fill="none" stroke="' + C.r + '" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#nf_arrow)"/>' +
      txt(668, 214, "재흡수 (reuptake)", 12, C.r, B) + on(10, D) + '</g>';

    // ---- 막전위 패널 ----
    s += box(20, 222, 280, 104, "#fff", C.line);
    s += txt(60, 242, "막전위", 12, C.n, B);
    s += '<rect x="46" y="250" width="28" height="66" fill="#f4f4f4" stroke="#bbb"/>';
    s += '<rect x="48" y="306" width="24" height="10" fill="' + C.n + '">' +
      '<animate attributeName="height" values="10;10;34;12;56;56;64;64;10;10" keyTimes="0;' + kt(1.5) + ';' + kt(2.3) + ';' + kt(3) + ';' + kt(3.4) + ';' + kt(5.5) + ';' + kt(5.8) + ';' + kt(8) + ';' + kt(8.4) + ';1" dur="' + D + 's" fill="freeze"/>' +
      '<animate attributeName="y" values="306;306;282;304;260;260;252;252;306;306" keyTimes="0;' + kt(1.5) + ';' + kt(2.3) + ';' + kt(3) + ';' + kt(3.4) + ';' + kt(5.5) + ';' + kt(5.8) + ';' + kt(8) + ';' + kt(8.4) + ';1" dur="' + D + 's" fill="freeze"/></rect>';
    s += '<line x1="40" y1="272" x2="82" y2="272" stroke="' + C.r + '" stroke-width="2" stroke-dasharray="4 3"/>';
    s += txtL(86, 276, "역치", 12, C.r, B);
    var st = [
      [0, 1.5, "안정 전위", "외부 +, 내부 −"],
      [1.5, 3, "역치 미만", "→ 발화 없음"],
      [3, 5.5, "탈분극화 → 역치 도달", "→ 활동 전위 발생"],
      [5.5, 8, "강한 자극", "→ 발화율↑, 크기 동일"],
      [8, D, "다시 안정 전위", "(발화 후 불응기)"]
    ];
    st.forEach(function (k) {
      s += '<g opacity="0">' + txtL(128, 284, k[2], 13, "#222", B) + txtL(128, 304, k[3], 12, "#555") +
        (k[1] === D ? on(k[0], D) : show(k[0], k[1], D)) + '</g>';
    });

    // ---- 활동 전위 기록 (발화율) ----
    s += box(316, 222, 430, 104, "#fff", C.line);
    s += txt(531, 242, "활동 전위 기록 — 막대 높이는 늘 같다(실무율)", 12, "#222", B);
    var rows = [[262, "약한 자극", []], [286, "중간 자극", [3.2, 4.2]], [310, "강한 자극", [5.6, 6.0, 6.4, 6.8, 7.2]]];
    rows.forEach(function (r) {
      s += txtL(326, r[0] + 4, r[1], 12, C.a, B);
      s += '<line x1="400" y1="' + r[0] + '" x2="734" y2="' + r[0] + '" stroke="#ddd" stroke-width="1.5"/>';
      if (!r[2].length) s += '<g opacity="0">' + txtL(410, r[0] + 4, "발화 없음", 12, C.muted) + on(2, D) + '</g>';
      r[2].forEach(function (t, j) {
        var x = r[2].length === 2 ? 430 + j * 150 : 420 + j * 66;
        s += '<line x1="' + x + '" y1="' + (r[0] + 6) + '" x2="' + x + '" y2="' + (r[0] - 14) + '" stroke="' + C.c + '" stroke-width="4" opacity="0">' + on(t + 0.1, D) + '</line>';
      });
    });

    // ---- 요점 ----
    s += txt(380, 348, "자극의 강도는 활동 전위의 '크기'가 아니라 '발화율'로 전달된다 — 실무율(All or None)", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
