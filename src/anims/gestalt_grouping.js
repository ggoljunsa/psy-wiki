// ============================================================
// gestalt_grouping — 전경-배경과 집단화의 세 원리 (4장 p.28–30)
// 시간축(초): 0 게슈탈트 정의 → 1.5 전경-배경(꽃병 ↔ 두 얼굴) → 4.5 근접성(12점 → 세 묶음)
//   → 7 연속성(교차한 두 선) → 9.5 폐쇄(끊어진 원) → 11.5 타고난 원리 → 13 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["gestalt_grouping"] = {
  title: "게슈탈트 — 전경-배경과 집단화의 세 원리 13초",
  desc: "[[전경-배경]] 분리(꽃병 ↔ 마주 보는 두 얼굴) → [[집단화]]의 세 원리: '''근접성'''(가까운 것끼리) · '''연속성'''(부드럽게 이어진 선) · '''폐쇄'''(끊어진 부분을 메꿈). [[게슈탈트 심리학|전체는 부분의 합 이상]]",
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
    function glow(from, to, dur) {
      return '<animate attributeName="stroke-width" values="2;2;4;4;2;2" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';' + (to / dur) + ';' + Math.min(1, to / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    var D = 13;
    var s = '<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="게슈탈트 지각 원리 애니메이션">';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "게슈탈트(Gestalt): 전체는 단순한 부분의 총합 그 이상"],
      [1.5, 4.5, "① 전경-배경: 대상(전경)을 배경과 분리 — 주의에 따라 전경과 배경이 바뀜"],
      [4.5, 7, "② 집단화 · 근접성: 가까이 있는 사물을 묶어서 지각"],
      [7, 9.5, "③ 집단화 · 연속성: 부드럽게 연속된 패턴을 하나로 지각"],
      [9.5, 11.5, "④ 집단화 · 폐쇄: 완전한 형태를 위해 끊어진 부분을 메꿈"],
      [11.5, 13, "게슈탈트 원리는 내재된, 타고난 것 (Wertheimer, 1912) — 유아도 사용"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 네 패널 틀 ----
    var P = [[14, "전경-배경", 1.5, 4.5], [202, "근접성", 4.5, 7], [390, "연속성", 7, 9.5], [578, "폐쇄", 9.5, 11.5]];
    P.forEach(function (p) {
      s += '<g>' + box(p[0], 46, 168, 236, "#fff", "#c9c2d6") + '<animate attributeName="stroke" values="#c9c2d6;#c9c2d6;' + C.c + ';' + C.c + ';#c9c2d6;#c9c2d6" keyTimes="0;' + (p[2] / D) + ';' + (p[2] / D + 0.02) + ';' + (p[3] / D) + ';' + (p[3] / D + 0.02) + ';1" dur="' + D + 's" fill="freeze"/>' + glow(p[2], p[3], D) + '</g>';
      s += txt(p[0] + 84, 68, p[1], 14, C.n, ' font-weight="700"');
    });

    // ---- ① 전경-배경: 꽃병 / 두 얼굴 ----
    var cx = 98, y0 = 84;
    var prof = [[0, 48], [18, 40], [40, 22], [50, 34], [62, 28], [72, 34], [88, 25], [110, 40], [132, 47], [150, 47]];
    var d = "M" + (cx - prof[0][1]) + "," + y0;
    prof.forEach(function (q) { d += " L" + (cx - q[1]) + "," + (y0 + q[0]); });
    for (var i = prof.length - 1; i >= 0; i--) d += " L" + (cx + prof[i][1]) + "," + (y0 + prof[i][0]);
    d += " z";
    s += '<rect x="34" y="' + y0 + '" width="128" height="150" fill="#fff" stroke="' + C.n + '" stroke-width="1.5">' +
      '<animate attributeName="fill" values="#fff;#fff;' + C.cL + ';#fff" keyTimes="0;' + (1.5 / D) + ';' + (3 / D) + ';' + (4.5 / D) + '" calcMode="discrete" dur="' + D + 's" fill="freeze"/></rect>';
    s += '<path d="' + d + '" fill="' + C.n + '" stroke="' + C.n + '" stroke-width="1.5" stroke-linejoin="round">' +
      '<animate attributeName="fill" values="' + C.n + ';' + C.a + ';#fff;' + C.n + '" keyTimes="0;' + (1.5 / D) + ';' + (3 / D) + ';' + (4.5 / D) + '" calcMode="discrete" dur="' + D + 's" fill="freeze"/></path>';
    s += '<g opacity="0">' + txt(98, 256, "전경 = 꽃병", 12, C.a, ' font-weight="700"') + txt(98, 272, "얼굴은 배경", 11, C.m) + show(1.5, 3, D) + '</g>';
    s += '<g opacity="0">' + txt(98, 256, "전경 = 마주 보는 두 얼굴", 12, C.c, ' font-weight="700"') + txt(98, 272, "꽃병은 배경", 11, C.m) + show(3, 4.5, D) + '</g>';
    s += '<g opacity="0">' + txt(98, 256, "한 번에 하나만 보인다", 12, C.n, ' font-weight="700"') + txt(98, 272, "(가역적 전경-배경)", 11, C.m) + show(4.5, 13, D) + '</g>';

    // ---- ② 근접성: 12점 → 세 묶음 ----
    var gx = 287, gy = 160;
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 4; c++) {
        var x0 = gx + (c - 1.5) * 28, y1 = gy + (r - 1) * 28;
        var x1 = gx + (c - 1.5) * 16, y2 = gy + (r - 1) * 46;
        s += '<circle cx="' + x0 + '" cy="' + y1 + '" r="6" fill="' + C.a + '">' +
          '<animate attributeName="cx" from="' + x0 + '" to="' + x1 + '" begin="5s" dur="1s" fill="freeze"/>' +
          '<animate attributeName="cy" from="' + y1 + '" to="' + y2 + '" begin="5s" dur="1s" fill="freeze"/></circle>';
      }
    }
    s += '<g opacity="0">';
    for (r = 0; r < 3; r++) s += '<ellipse cx="' + gx + '" cy="' + (gy + (r - 1) * 46) + '" rx="44" ry="14" fill="none" stroke="' + C.c + '" stroke-width="2" stroke-dasharray="5 3"/>';
    s += txt(287, 256, "12개 점 → 세 묶음(가로줄)", 12, C.a, ' font-weight="700"') + txt(287, 272, "간격이 가까운 것끼리 묶임", 11, C.m);
    s += show(6, 13, D) + '</g>';
    s += '<g>' + txt(287, 256, "같은 간격의 점 12개", 12, C.m) + show(0, 6, D) + '</g>';

    // ---- ③ 연속성: 교차하는 두 선 ----
    var wavy = "M410,160 C430,100 455,100 475,160 S520,220 540,160";
    var straight = "M410,215 L540,105";
    s += '<path d="' + wavy + '" fill="none" stroke="#999" stroke-width="4"/>';
    s += '<path d="' + straight + '" fill="none" stroke="#999" stroke-width="4"/>';
    s += '<path d="' + wavy + '" pathLength="100" fill="none" stroke="' + C.a + '" stroke-width="5" stroke-dasharray="100" stroke-dashoffset="100">' +
      '<animate attributeName="stroke-dashoffset" from="100" to="0" begin="7.5s" dur="1s" fill="freeze"/></path>';
    s += '<path d="' + straight + '" pathLength="100" fill="none" stroke="' + C.b + '" stroke-width="5" stroke-dasharray="100" stroke-dashoffset="100">' +
      '<animate attributeName="stroke-dashoffset" from="100" to="0" begin="8.3s" dur="1s" fill="freeze"/></path>';
    s += '<g opacity="0">' + txt(400, 98, "곡선", 11, C.a, ' font-weight="700" text-anchor="start"') + txt(552, 98, "직선", 11, C.b, ' font-weight="700" text-anchor="end"') + show(8.5, 13, D) + '</g>';
    s += '<g>' + txt(475, 256, "꺾인 네 조각?", 12, C.m) + show(0, 7.5, D) + '</g>';
    s += '<g opacity="0">' + txt(475, 256, "이어진 두 선으로 지각", 12, C.a, ' font-weight="700"') + txt(475, 272, "(부드러운 연속을 선택)", 11, C.m) + show(7.5, 13, D) + '</g>';

    // ---- ④ 폐쇄: 끊어진 원 ----
    s += '<circle cx="662" cy="160" r="50" fill="none" stroke="' + C.n + '" stroke-width="5" pathLength="100" stroke-dasharray="19 6"/>';
    s += '<g opacity="0"><circle cx="662" cy="160" r="50" fill="none" stroke="' + C.c + '" stroke-width="3" pathLength="100" stroke-dasharray="0 19 6 0"/>' +
      '<animate attributeName="opacity" values="0;0;1;0.3;1;1" keyTimes="0;' + (10 / D) + ';' + (10.3 / D) + ';' + (10.6 / D) + ';' + (10.9 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += '<g opacity="0">' + txt(662, 165, "원!", 15, C.c, ' font-weight="700"') + show(10.5, 13, D) + '</g>';
    s += '<g>' + txt(662, 256, "끊어진 호 네 개", 12, C.m) + show(0, 10, D) + '</g>';
    s += '<g opacity="0">' + txt(662, 256, "빈틈을 메꿔 '원'으로", 12, C.c, ' font-weight="700"') + txt(662, 272, "(완전한 형태 구성)", 11, C.m) + show(10, 13, D) + '</g>';

    // ---- 집단화 묶음 표시 ----
    s += '<g opacity="0"><path d="M206,292 L206,298 L742,298 L742,292" fill="none" stroke="' + C.c + '" stroke-width="2"/>' +
      txt(474, 312, "집단화의 세 원리 (배경에서 분리된 전경을 의미 있는 형태로 조직화)", 11, C.c, ' font-weight="700"') + show(4.5, 11.5, D) + '</g>';

    // ---- 아래 요점 ----
    s += '<g opacity="0">' + txt(380, 318, "전체는 부분의 합 이상 — 전경-배경 분리 → 근접성·연속성·폐쇄로 집단화", 12.5, C.m) + show(11.5, 13, D) + '</g>';
    s += '<g>' + txt(380, 318, "전체는 부분의 합 이상 — 지각은 입력을 그대로 표상하지 않고 해석을 더해 구성한다", 12.5, C.m) + show(0, 4.5, D) + '</g>';
    s += '</svg>';
    return s;
  }
};
