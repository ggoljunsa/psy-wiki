// ============================================================
// atkinson_shiffrin — 다중 저장고 모형: 감각 → 단기/작업 → 장기 (6장 p.5–6, 14–18)
// 시간축(초): 0 모형 소개 → 1.5 감각 기억에 입력 → 3.5 대부분 사라지고 주의받은 것만 부호화
//   → 5.5 단기/작업 기억(되뇌기) → 8 장기 기억으로 부호화 → 10 인출 → 12 정리 → 14 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["atkinson_shiffrin"] = {
  title: "앳킨슨-시프린 모형 — 정보가 기억에 들어가고 나오기까지 14초",
  desc: "[[감각 기억]](0.5~1초, 3~4개) → 주의받은 것만 부호화 → [[단기 기억|단기/작업 기억]](되뇌기 없으면 약 12초, 7±2개) → 부호화 → 장기 기억(반영속적 저장) → 인출로 다시 단기/작업 기억에. '''부호화 → 저장 → 인출''' — [[앳킨슨-시프린 모형]]",
  duration: 14,
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
    function glow(from, to, dur) {
      return '<animate attributeName="stroke-width" values="2;2;4.5;4.5;2;2" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';' + (to / dur) + ';' + Math.min(1, to / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    var D = 14;
    var s = '<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="앳킨슨-시프린 기억 모형 애니메이션">';
    s += '<defs><marker id="as_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "앳킨슨 &amp; 시프린(1968)의 정보처리 모형 = 다중 저장고 모형"],
      [1.5, 3.5, "① 감각 기억: 감각 정보를 매우 짧게 기록 — 0.5~1초, 용량 3~4개 (Sperling)"],
      [3.5, 5.5, "② 대부분은 사라지고, 주의받은 정보만 부호화되어 단기/작업 기억으로"],
      [5.5, 8, "③ 단기/작업 기억: 되뇌기 없으면 약 12초, 용량 7±2개 — 되뇌기로 유지"],
      [8, 10, "④ 부호화: 단기/작업 기억 → 장기 기억에 저장 (반영속적으로 파지)"],
      [10, 12, "⑤ 인출: 장기 기억의 정보 일부가 단기/작업 기억으로 소환"],
      [12, 14, "부호화 → 저장 → 인출, 세 과정으로 정보를 처리"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 감각 입력 ----
    s += txt(56, 104, "감각 입력", 12, C.a, ' font-weight="700"');
    s += txt(56, 120, "(빛·소리·촉감)", 10.5, C.m);

    // ---- 세 저장고 ----
    var B = [[120, 150, "감각 기억", "0.5~1초", "3~4개", C.a, C.aL, 1.5, 4.2],
      [330, 180, "단기/작업 기억", "약 12초 (되뇌기 없을 때)", "7±2개 (Miller, 1956)", C.c, C.cL, 4.2, 8.6],
      [580, 166, "장기 기억", "의미·사건·지식", "반영속적 저장", C.n, C.nL, 8.6, 14]];
    B.forEach(function (b) {
      s += '<g>' + box(b[0], 100, b[1], 130, b[6], b[5]) + glow(b[7], b[8], D) + '</g>';
      s += txt(b[0] + b[1] / 2, 122, b[2], 14, b[5], ' font-weight="700"');
      s += txt(b[0] + b[1] / 2, 206, b[3], 11.5, "#333");
      s += txt(b[0] + b[1] / 2, 222, b[4], 11.5, "#333");
    });
    // 장기 기억에 이미 있는 정보
    [[610, 150], [640, 160], [670, 148], [700, 162], [625, 178], [690, 182], [720, 150]].forEach(function (p) {
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="#b7b0c4"/>';
    });

    // ---- 화살표 ----
    s += '<line x1="272" y1="165" x2="326" y2="165" stroke="#555" stroke-width="2.5" marker-end="url(#as_arrow)"/>';
    s += txt(300, 156, "부호화", 11, C.m);
    s += txt(300, 182, "(주의)", 10.5, C.m);
    s += '<line x1="512" y1="165" x2="576" y2="165" stroke="#555" stroke-width="2.5" marker-end="url(#as_arrow)"/>';
    s += txt(544, 156, "부호화", 11, C.m);
    // 되뇌기 고리
    s += '<g><path d="M392,98 C392,58 488,58 488,98" fill="none" stroke="' + C.c + '" stroke-width="2.5" marker-end="url(#as_arrow)"/>' + glow(5.5, 8, D) + '</g>';
    s += txt(440, 62, "되뇌기", 12, C.c, ' font-weight="700"');
    // 인출 곡선
    s += '<g><path d="M650,232 C620,282 470,282 430,234" fill="none" stroke="' + C.b + '" stroke-width="2.5" marker-end="url(#as_arrow)"/>' + glow(10, 12, D) + '</g>';
    s += txt(540, 292, "인출", 12, C.b, ' font-weight="700"');

    // ---- 정보 점 ----
    var keep = { 1: [395, 156], 2: [445, 156] };
    for (var i = 0; i < 8; i++) {
      var sx = 40 + (i % 2) * 30, sy = 140 + Math.floor(i / 2) * 18;
      var tx = i < 4 ? 145 + i * 33 : 104, ty = i < 4 ? 160 : 132 + (i - 4) * 18;
      var col = C.a;
      var el = '<circle cx="0" cy="0" r="7" fill="' + col + '" opacity="0">';
      el += '<animateMotion begin="1.6s" dur="1s" fill="freeze" path="M' + sx + ',' + sy + ' L' + tx + ',' + ty + '"/>';
      if (keep[i]) {
        var k = keep[i];
        el += '<animate attributeName="fill" values="' + C.a + ';' + C.c + '" keyTimes="0;' + (3.7 / D) + '" calcMode="discrete" dur="' + D + 's" fill="freeze"/>';
        el += '<animateMotion begin="4.2s" dur="1s" fill="freeze" path="M' + tx + ',' + ty + ' L' + k[0] + ',' + k[1] + '"/>';
        el += '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (1.5 / D) + ';' + (1.55 / D) + ';1" dur="' + D + 's" fill="freeze"/>';
      } else {
        el += '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;' + (1.5 / D) + ';' + (1.55 / D) + ';' + (i < 4 ? 3.7 : 2.6) / D + ';' + (i < 4 ? 4.3 : 3.0) / D + ';1" dur="' + D + 's" fill="freeze"/>';
      }
      s += el + '</circle>';
    }
    s += '<g opacity="0">' + txt(195, 92, "대부분 사라짐 (주의받은 것만 넘어감)", 12, C.r, ' font-weight="700"') + show(3.7, 5.5, D) + '</g>';
    // 되뇌기: 점이 고리를 돈다
    s += '<circle r="6" fill="' + C.c + '" opacity="0"><animateMotion begin="5.8s" dur="0.9s" repeatCount="2" path="M392,98 C392,58 488,58 488,98"/>' + show(5.8, 7.6, D) + '</circle>';
    // 장기 기억으로 부호화되는 점
    s += '<circle r="7" fill="' + C.n + '" stroke="#fff" stroke-width="1.5" opacity="0"><animateMotion begin="8.3s" dur="1.2s" fill="freeze" path="M445,156 L655,175"/>' + show(8.3, 14, D) + '</circle>';
    s += '<g opacity="0">' + txt(663, 92, "저장", 12, C.n, ' font-weight="700"') + show(9.4, 14, D) + '</g>';
    // 인출되는 점
    s += '<circle r="7" fill="' + C.b + '" stroke="#fff" stroke-width="1.5" opacity="0"><animateMotion begin="10.3s" dur="1.4s" fill="freeze" path="M690,182 L650,232 C620,282 470,282 430,234 L420,184"/>' + show(10.3, 14, D) + '</circle>';

    // ---- 아래 요점 ----
    s += txt(380, 318, "부호화(넣기) → 저장(파지) → 인출(불러오기) — 감각 → 단기/작업 → 장기", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
