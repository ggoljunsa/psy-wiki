// ============================================================
// intelligence_theories — 지능 5입장 비교 (7장 p.32–39)
// 시간축(초): 0 스피어만 g(1) → 2.8 서스톤 7(상관선 + 희미한 g = 중간 입장)
//   → 5.8 가드너 8(선 없음 = 독립) → 8.6 스턴버그 3 → 11 정서 지능 4 → 14 끝
// 아래 숫자 줄 1 · 7 · 8 · 3 · 4 가 차례로 켜진다.
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["intelligence_theories"] = {
  title: "지능 이론 5입장 — 1 · 7 · 8 · 3 · 4 를 14초에",
  desc: "[[일반 지능]](스피어만, g 하나) → [[1차 심적 능력]](서스톤 7, 능력 간 상관 → g 영향 인정 = 중간 입장) → [[다중 지능]](가드너 8, 독립) → [[삼원 이론]](스턴버그 3: 분석·창의성·현실) → [[정서 지능]](4성분: 지각·이해·관리·사용). 교수가 두 번 정리한 p.39 비교표의 그림판",
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
      return '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';' + (to / dur) + ';' + (to / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function from(t, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (t / dur) + ';' + (t / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function win(a, b) { return b >= D ? from(a, D) : show(a, b, D); }
    // 가운데 무대 중심
    var CX = 380, CY = 152;
    function ring(n, R, labels, col, fill, links, gFaint) {
      var pts = [], g = "";
      for (var i = 0; i < n; i++) {
        var th = -Math.PI / 2 + i * 2 * Math.PI / n;
        pts.push([CX + R * Math.cos(th), CY + R * 0.62 * Math.sin(th)]);
      }
      if (links) {
        for (var p = 0; p < n; p++) for (var q = p + 1; q < n; q++) {
          g += '<line x1="' + pts[p][0].toFixed(1) + '" y1="' + pts[p][1].toFixed(1) + '" x2="' + pts[q][0].toFixed(1) + '" y2="' + pts[q][1].toFixed(1) + '" stroke="' + col + '" stroke-width="1.2" opacity="0.45"/>';
        }
      }
      if (gFaint) g += '<circle cx="' + CX + '" cy="' + CY + '" r="26" fill="' + C.nL + '" stroke="' + C.n + '" stroke-width="1.5" stroke-dasharray="4 3"/>' + txt(CX, CY + 6, "g", 18, C.n, ' font-style="italic" font-weight="700"');
      pts.forEach(function (pt, i) {
        g += box((pt[0] - 52).toFixed(1), (pt[1] - 15).toFixed(1), 104, 30, fill, col) + txt(pt[0].toFixed(1), (pt[1] + 5).toFixed(1), labels[i], 12, "#222");
      });
      return g;
    }

    var s = '<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="지능 이론 다섯 입장 비교 애니메이션">';
    s += '<defs><marker id="it_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.r + '"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 2.8, "① 스피어만(1904) 일반 지능: 지능을 단일 지표(g 요인)로 — 요인 분석으로 산출"],
      [2.8, 5.8, "② 서스톤 1차 심적 능력: 7가지로 분류, 그러나 능력 간 정적 상관 → g 영향 인정 (중간 입장)"],
      [5.8, 8.6, "③ 가드너 다중 지능: 상대적으로 독립적인 8개 영역 — 한 영역이 손상돼도 다른 영역은 유지"],
      [8.6, 11, "④ 스턴버그 삼원 이론: 분석 · 창의성 · 현실 지능의 3영역 — 실세계 성공 예측"],
      [11, 14, "⑤ 정서 지능: 사회 지능의 일환 — 정서 지각 → 이해 → 관리 → 사용 (4성분)"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 24, c[2], 13.5, "#222", ' font-weight="700"') + win(c[0], c[1]) + '</g>';
    });

    // ---- ① 스피어만 ----
    var sp = '<circle cx="' + CX + '" cy="' + CY + '" r="46" fill="' + C.nL + '" stroke="' + C.n + '" stroke-width="3"/>' +
      txt(CX, CY + 10, "g", 34, C.n, ' font-style="italic" font-weight="700"');
    var tasks = [["언어", 200, 90], ["수리", 560, 90], ["공간", 200, 230], ["기억", 560, 230]];
    tasks.forEach(function (t) {
      sp += '<line x1="' + CX + '" y1="' + CY + '" x2="' + t[1] + '" y2="' + t[2] + '" stroke="' + C.n + '" stroke-width="2" opacity="0.6"/>' +
        box(t[1] - 40, t[2] - 15, 80, 30, C.aL, C.a) + txt(t[1], t[2] + 5, t[0], 12, "#222");
    });
    sp += txt(CX, 275, "모든 지적 행동은 g 하나에서 비롯", 12, C.n, ' font-weight="700"');
    s += '<g opacity="0">' + sp + win(0, 2.8) + '</g>';

    // ---- ② 서스톤 7 ----
    var th7 = ["언어 이해", "단어 유창성", "수", "공간", "지각 속도", "기억", "추리"];
    s += '<g opacity="0">' + ring(7, 150, th7, C.a, C.aL, true, true) +
      txt(CX, 292, "선 = 능력 간 정적 상관 → 단일 지표는 아니지만 g 의 영향력 인정", 12, C.a, ' font-weight="700"') + win(2.8, 5.8) + '</g>';

    // ---- ③ 가드너 8 ----
    var g8 = ["언어", "논리-수학", "음악", "공간", "신체운동", "대인", "개인 내", "자연주의"];
    s += '<g opacity="0">' + ring(8, 160, g8, C.b, C.bL, false, false) +
      txt(CX, CY - 2, "선 없음", 13, "#1d6b2a", ' font-weight="700"') + txt(CX, CY + 16, "= 독립", 13, "#1d6b2a", ' font-weight="700"') +
      txt(CX, 292, "개수(7 vs 8)가 아니라 '독립성'이 핵심 · 현자 증후군", 12, "#1d6b2a", ' font-weight="700"') + win(5.8, 8.6) + '</g>';

    // ---- ④ 스턴버그 3 ----
    var st = "";
    [["분석 지능", "하나의 답 → 학업 성적", 170], ["창의성 지능", "새로운 아이디어", 380], ["현실 지능", "다중 해법의 일상 문제", 590]].forEach(function (k) {
      st += box(k[2] - 92, 120, 184, 76, C.cL, C.c) + txt(k[2], 152, k[0], 15, "#8a6000", ' font-weight="700"') + txt(k[2], 176, k[1], 11.5, "#444");
    });
    st += txt(CX, 240, "장점: 측정 상의 신뢰도 높음 · 비판: 세 영역이 독립적이지 않을 수 있음", 12, "#8a6000", ' font-weight="700"');
    s += '<g opacity="0">' + st + win(8.6, 11) + '</g>';

    // ---- ⑤ 정서 지능 4 ----
    var em = "";
    var steps4 = [["정서 지각", "재인·확인"], ["정서 이해", "예측·완화"], ["정서 관리", "표현·대처"], ["정서 사용", "사고 촉진"]];
    steps4.forEach(function (k, i) {
      var x = 110 + i * 180;
      em += box(x - 70, 125, 140, 66, C.rL, C.r) + txt(x, 153, k[0], 14, C.r, ' font-weight="700"') + txt(x, 175, k[1], 11.5, "#444");
      if (i < 3) em += '<line x1="' + (x + 74) + '" y1="158" x2="' + (x + 104) + '" y2="158" stroke="' + C.r + '" stroke-width="2" marker-end="url(#it_arrow)"/>';
    });
    em += txt(CX, 92, "사회 지능(손다이크, 1920) ⊃ 정서 지능", 12, C.m);
    em += txt(CX, 240, "비판: 지능 개념이 과하게 확대될 수 있음 (Waterhouse)", 12, C.r, ' font-weight="700"');
    s += '<g opacity="0">' + em + win(11, 14) + '</g>';

    // ---- 아래 숫자 줄 ----
    var nums = [["스피어만", "1", C.n, 0], ["서스톤", "7", C.a, 2.8], ["가드너", "8", "#1d6b2a", 5.8], ["스턴버그", "3", "#8a6000", 8.6], ["정서", "4", C.r, 11]];
    s += '<line x1="40" y1="306" x2="720" y2="306" stroke="#ddd"/>';
    nums.forEach(function (k, i) {
      var x = 100 + i * 140;
      s += '<g opacity="0.25">' + txt(x, 332, k[0], 12, "#444") + txt(x + 42, 336, k[1], 22, k[2], ' font-weight="700"') +
        '<animate attributeName="opacity" values="0.25;0.25;1;1" keyTimes="0;' + (k[3] / D) + ';' + (k[3] / D + 0.02) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    });
    s += txt(380, 354, "서스톤 = 7, 상관 있음(중간 입장) vs 가드너 = 8, 독립 — 교수가 두 번 정리한 p.39 표", 11.5, C.m);
    s += '</svg>';
    return s;
  }
};
