// ============================================================
// misinformation_effect — 질문 방식이 기억을 바꾼다 (6장 p.38–39)
// 시간축(초): 0 차 사고 장면 → 2.5 두 집단 질문('접촉' vs '충돌') → 5 '충돌' 집단이 더 과장해 보고
//   → 7.5 재응고화: 인출 → 취약 → 수정된 기억으로 재저장 → 11 정리 → 13 끝
//   (슬라이드에 없는 수치는 쓰지 않는다 — 막대는 상대 비교만)
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["misinformation_effect"] = {
  title: "오정보 효과 — '접촉'과 '충돌' 한 단어 차이 13초",
  desc: "같은 차 사고 장면을 보고도 \"접촉했을 때\" 대신 \"충돌했을 때\" 속도를 물으면 더 과장해 보고한다(Loftus와 Palmer, 1974). 인출 직후 취약해진 기억에 질문의 정보가 섞여 다시 저장되는 [[재응고화]] 때문 — [[오정보 효과]]",
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
    function from(t, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (t / dur) + ';' + (t / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function car(x, y, col, flip) {
      var g = '<rect x="' + x + '" y="' + y + '" width="44" height="18" rx="5" fill="' + col + '"/>';
      g += '<rect x="' + (x + (flip ? 6 : 14)) + '" y="' + (y - 9) + '" width="24" height="11" rx="4" fill="' + col + '"/>';
      g += '<circle cx="' + (x + 10) + '" cy="' + (y + 18) + '" r="5" fill="#333"/><circle cx="' + (x + 34) + '" cy="' + (y + 18) + '" r="5" fill="#333"/>';
      return g;
    }
    function spark(x, y, k) {
      k = k || 1;
      var p = [];
      for (var i = 0; i < 16; i++) {
        var ang = i * Math.PI / 8, r = (i % 2 ? 7 : 16) * k;
        p.push((x + r * Math.cos(ang)).toFixed(1) + "," + (y + r * Math.sin(ang)).toFixed(1));
      }
      return '<polygon points="' + p.join(" ") + '" fill="' + C.c + '" stroke="' + C.r + '" stroke-width="1.5"/>';
    }
    // 기억 카드 (작은 장면 그림)
    function card(x, y, crashed, dashed) {
      var g = '<rect x="' + x + '" y="' + y + '" width="130" height="62" rx="8" fill="#fff" stroke="' + C.n + '" stroke-width="2"' + (dashed ? ' stroke-dasharray="6 4"' : '') + '/>';
      g += '<line x1="' + (x + 8) + '" y1="' + (y + 46) + '" x2="' + (x + 122) + '" y2="' + (y + 46) + '" stroke="#ccc" stroke-width="2"/>';
      if (crashed) {
        g += '<g transform="translate(' + (x + 18) + ',' + (y + 26) + ') scale(0.6)">' + car(0, 0, C.a) + '</g>';
        g += '<g transform="translate(' + (x + 52) + ',' + (y + 22) + ') scale(0.6) rotate(-12)">' + car(0, 0, C.b, true) + '</g>';
        g += spark(x + 50, y + 26, 0.9);
      } else {
        g += '<g transform="translate(' + (x + 14) + ',' + (y + 26) + ') scale(0.6)">' + car(0, 0, C.a) + '</g>';
        g += '<g transform="translate(' + (x + 70) + ',' + (y + 26) + ') scale(0.6)">' + car(0, 0, C.b, true) + '</g>';
      }
      return g;
    }
    var D = 13;
    var s = '<svg viewBox="0 0 760 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="오정보 효과와 재응고화 애니메이션">';
    s += '<defs><marker id="me_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 2.5, "① 두 차가 부딪히는 짧은 장면을 보여 줌 (Loftus &amp; Palmer, 1974)"],
      [2.5, 5, "② 두 집단에 질문 방식만 달리함: '접촉'했을 때 vs '충돌'했을 때"],
      [5, 7.5, "③ '충돌' 질문 집단이 속도를 더 과장해 보고 — 질문 방식에 따라 보고가 변화"],
      [7.5, 11, "④ 재응고화: 인출 직후 취약해진 기억에 질문의 정보가 섞여 다시 저장됨"],
      [11, 13, "오정보 효과: 잘못된 정보를 받으면, 목격한 것과 달라도 맞다고 보고"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- ① 사고 장면 ----
    s += box(14, 44, 236, 146, "#fff", "#ccc");
    s += txt(30, 64, "목격한 장면", 12, C.n, ' font-weight="700" text-anchor="start"');
    s += '<line x1="24" y1="160" x2="240" y2="160" stroke="#bbb" stroke-width="3"/>';
    s += '<g>' + car(28, 136, C.a) + '<animateTransform attributeName="transform" type="translate" from="0 0" to="58 0" begin="0.4s" dur="1.2s" fill="freeze"/></g>';
    s += '<g>' + car(192, 136, C.b, true) + '<animateTransform attributeName="transform" type="translate" from="0 0" to="-56 0" begin="0.4s" dur="1.2s" fill="freeze"/></g>';
    s += '<g opacity="0">' + spark(133, 136, 1.2) + txt(133, 104, "쿵!", 15, C.r, ' font-weight="700"') + from(1.6, D) + '</g>';

    // ---- ② 두 집단의 질문 ----
    s += '<g opacity="0">';
    s += box(262, 44, 262, 146, "#fff", "#ccc");
    s += txt(278, 64, "질문 (단어 하나만 다름)", 12, C.n, ' font-weight="700" text-anchor="start"');
    s += box(276, 76, 234, 44, C.aL, C.a);
    s += txt(286, 95, "집단 1", 11, C.a, ' font-weight="700" text-anchor="start"');
    s += '<text x="286" y="112" font-size="12.5" fill="#222">두 차가 <tspan font-weight="700" fill="' + C.a + '">접촉했을 때</tspan> 속도는?</text>';
    s += box(276, 132, 234, 44, C.rL, C.r);
    s += txt(286, 151, "집단 2", 11, C.r, ' font-weight="700" text-anchor="start"');
    s += '<text x="286" y="168" font-size="12.5" fill="#222">두 차가 <tspan font-weight="700" fill="' + C.r + '">충돌했을 때</tspan> 속도는?</text>';
    s += from(2.5, D) + '</g>';

    // ---- ③ 보고 ----
    s += '<g opacity="0">';
    s += box(536, 44, 210, 146, "#fff", "#ccc");
    s += txt(552, 64, "보고한 속도 (상대 비교)", 12, C.n, ' font-weight="700" text-anchor="start"');
    s += txt(552, 96, "집단 1", 11, C.a, ' font-weight="700" text-anchor="start"');
    s += '<rect x="552" y="102" width="0" height="16" rx="4" fill="' + C.a + '"><animate attributeName="width" from="0" to="80" begin="5.2s" dur="0.8s" fill="freeze"/></rect>';
    s += txt(552, 152, "집단 2", 11, C.r, ' font-weight="700" text-anchor="start"');
    s += '<rect x="552" y="158" width="0" height="16" rx="4" fill="' + C.r + '"><animate attributeName="width" from="0" to="150" begin="5.6s" dur="1s" fill="freeze"/></rect>';
    s += '<g opacity="0">' + txt(700, 152, "더 빠르다고!", 11.5, C.r, ' font-weight="700"') + from(6.6, D) + '</g>';
    s += from(5, D) + '</g>';

    // ---- ④ 재응고화 띠 ----
    s += '<g opacity="0.3">' + box(14, 200, 732, 112, C.nL, C.n) + '<animate attributeName="opacity" values="0.3;0.3;1;1" keyTimes="0;' + (7.5 / D) + ';' + (7.55 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += txt(28, 218, "재응고화 (인출과 부호화의 반복)", 12, C.n, ' font-weight="700" text-anchor="start"');
    // 원래 기억
    s += '<g opacity="0.3">' + card(40, 240, false, false) + '<animate attributeName="opacity" values="0.3;0.3;1;1" keyTimes="0;' + (7.5 / D) + ';' + (7.55 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += txt(105, 236, "원래 기억", 11, C.n);
    // 인출 화살표
    s += '<g opacity="0"><line x1="176" y1="271" x2="290" y2="271" stroke="#555" stroke-width="2.5" marker-end="url(#me_arrow)"/>' + txt(233, 264, "인출", 12, C.n, ' font-weight="700"') + from(7.8, D) + '</g>';
    // 취약 상태 (흔들리는 점선 카드)
    s += '<g opacity="0"><g>' + card(296, 240, false, true) +
      '<animateTransform attributeName="transform" type="translate" values="0 0;2 0;-2 0;2 0;-2 0;0 0" begin="8.6s" dur="0.8s"/></g>' +
      txt(361, 236, "취약한 상태 (변형되기 쉬움)", 11, C.r, ' font-weight="700"') + from(8.1, D) + '</g>';
    // 질문 정보가 섞여 들어옴
    s += '<g opacity="0"><g>' + box(330, 168, 76, 22, C.rL, C.r) + txt(368, 184, "'충돌'", 12, C.r, ' font-weight="700"') +
      '<animateTransform attributeName="transform" type="translate" from="0 0" to="0 70" begin="8.7s" dur="0.7s" fill="freeze"/></g>' + show(8.6, 9.5, D) + '</g>';
    // 재저장 화살표
    s += '<g opacity="0"><line x1="432" y1="271" x2="546" y2="271" stroke="#555" stroke-width="2.5" marker-end="url(#me_arrow)"/>' + txt(489, 264, "다시 저장", 12, C.n, ' font-weight="700"') + from(9.5, D) + '</g>';
    // 수정된 기억
    s += '<g opacity="0">' + card(552, 240, true, false) + txt(617, 236, "수정된 기억", 11, C.r, ' font-weight="700"') + from(9.9, D) + '</g>';
    s += '<g opacity="0">' + txt(718, 266, "인출될", 10.5, C.m) + txt(718, 280, "때마다", 10.5, C.m) + txt(718, 294, "반복", 10.5, C.m) + from(10.4, D) + '</g>';

    // ---- 아래 요점 ----
    s += txt(380, 336, "질문 방식(오정보)이 기억을 바꾼다 — 목격자 진술의 신빙성 문제, '소문이 와전되는 이유'", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
