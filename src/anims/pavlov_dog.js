// ============================================================
// pavlov_dog — 고전적 조건화: 획득 → 소거 → 자발적 회복 (5장 p.7–11)
// 시간축(초): 0 먹이(US)→침(UR) → 2 종(NS)→반응 없음 → 3.5 종 먼저·먹이 나중 반복(획득)
//   → 6 종(CS)만→침(CR) → 7.5 소거(CS만 반복) → 9.5 휴지기간 → 10.5 자발적 회복(부분) → 12.5 정리 → 14
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["pavlov_dog"] = {
  title: "파블로프의 개 — 종소리가 침을 부르기까지 14초",
  desc: "[[무조건 자극]](먹이) → [[무조건 반응]](침). [[중성 자극]](종)을 '''먼저''', 먹이를 '''나중'''에 반복 제시하면 종이 [[조건 자극]]이 되어 [[조건 반응]]을 부른다. 먹이 없이 종만 반복하면 [[소거]], 휴지기간 뒤엔 [[자발적 회복]](부분) — 소거는 제거가 아니라 억압",
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
    var D = 14;
    // 여러 구간에 보이기 (구간 끝이 null 이면 끝까지 유지)
    function vis(iv) {
      var v = ["0"], k = ["0"];
      iv.forEach(function (p) { v.push("1"); k.push(p[0] / D); if (p[1] !== null) { v.push("0"); k.push(p[1] / D); } });
      return '<animate attributeName="opacity" values="' + v.join(";") + '" keyTimes="' + k.join(";") + '" calcMode="discrete" dur="' + D + 's" fill="freeze"/>';
    }
    function draw(path, color, from, to, extra) {
      return '<path d="' + path + '" pathLength="100" fill="none" stroke="' + color + '" stroke-width="4" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"' + (extra || "") + '>' +
        '<animate attributeName="stroke-dashoffset" from="100" to="0" begin="' + from + 's" dur="' + (to - from) + 's" fill="freeze"/></path>';
    }
    var s = '<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="파블로프의 고전적 조건화 애니메이션">';

    // ---- 단계 자막 ----
    var caps = [
      [0, 2, "① 먹이(무조건 자극, US) → 침(무조건 반응, UR): 학습과 무관한 자동 반응"],
      [2, 3.5, "② 종(중성 자극, NS)만 → 반응 없음: 조건 형성 전에는 침을 부르지 않음"],
      [3.5, 6, "③ 종(NS)을 먼저, 먹이(US)를 나중에 — 반복해서 짝지음 (획득)"],
      [6, 7.5, "④ 종만 → 침: 종이 조건 자극(CS)이 되어 조건 반응(CR)을 유발"],
      [7.5, 9.5, "⑤ 소거: 먹이(US) 없이 종(CS)만 반복 제시 → 조건 반응이 점차 감소"],
      [9.5, 10.5, "휴지기간 — 한동안 아무것도 제시하지 않음"],
      [10.5, 12.5, "⑥ 자발적 회복: 휴지기간 뒤 종(CS) → 조건 반응이 부분적으로 회복"],
      [12.5, 14, "소거는 조건 반응을 제거하는 것이 아니라 억압하는 쪽에 가까움"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 왼쪽: 장면 ----
    s += box(14, 44, 410, 252, "#fff", "#ccc");
    // 종 (자극)
    var rings = [2.2, 3.7, 4.5, 5.3, 6.2, 7.7, 8.3, 8.9, 10.7];
    s += '<g><g transform="translate(92,112)">';
    s += '<path d="M-22,14 C-22,-8 -14,-22 0,-22 C14,-22 22,-8 22,14 L27,20 L-27,20 z" fill="' + C.cL + '" stroke="' + C.c + '" stroke-width="2.5"/><circle cx="0" cy="24" r="5" fill="' + C.c + '"/><rect x="-3" y="-30" width="6" height="8" fill="' + C.c + '"/>';
    rings.forEach(function (t) {
      s += '<animateTransform attributeName="transform" type="rotate" values="0;-16;16;-16;16;0" begin="' + t + 's" dur="0.6s" additive="sum"/>';
    });
    s += '</g></g>';
    rings.forEach(function (t) {
      s += '<g opacity="0">' + txt(132, 96, "♪", 18, C.c, ' font-weight="700"') + txt(52, 96, "♪", 15, C.c) + show(t, t + 0.6, D) + '</g>';
    });
    s += '<g opacity="0">' + txt(92, 160, "종 = 중성 자극(NS)", 12, C.c, ' font-weight="700"') + show(2, 6, D) + '</g>';
    s += '<g opacity="0">' + txt(92, 160, "종 = 조건 자극(CS)", 12, C.r, ' font-weight="700"') + show(6, 14, D) + '</g>';

    // 먹이
    s += '<g opacity="0"><ellipse cx="92" cy="246" rx="32" ry="10" fill="' + C.a + '"/><path d="M60,240 C60,260 124,260 124,240 z" fill="' + C.a + '"/><circle cx="82" cy="236" r="7" fill="#b0743a"/><circle cx="96" cy="234" r="8" fill="#c88a4a"/><circle cx="106" cy="238" r="6" fill="#b0743a"/>' +
      txt(92, 280, "먹이 = 무조건 자극(US)", 12, C.a, ' font-weight="700"') +
      vis([[0.3, 2], [4.0, 4.4], [4.8, 5.2], [5.6, 6.0]]) + '</g>';
    // 순서 표시: 종 먼저 → 먹이 나중
    s += '<g opacity="0"><path d="M150,128 C176,170 176,200 150,232" fill="none" stroke="' + C.n + '" stroke-width="2" stroke-dasharray="4 3"/><path d="M150,232 l2,-11 l7,7 z" fill="' + C.n + '"/>' +
      show(3.5, 6, D) + '</g>';
    var cnt = [[3.7, 4.5, "짝짓기 ×1 (종 먼저 → 먹이 나중)"], [4.5, 5.3, "짝짓기 ×2 (종 먼저 → 먹이 나중)"], [5.3, 6, "짝짓기 ×3 … (종 먼저 → 먹이 나중)"]];
    cnt.forEach(function (q) { s += '<g opacity="0">' + txt(240, 72, q[2], 13, C.n, ' font-weight="700"') + show(q[0], q[1], D) + '</g>'; });

    // 개
    var dx = 300, dy = 170;
    s += '<g>';
    s += '<ellipse cx="' + (dx + 20) + '" cy="' + (dy + 30) + '" rx="62" ry="30" fill="#e8dccb" stroke="#8a6d4b" stroke-width="2"/>';
    s += '<rect x="' + (dx - 30) + '" y="' + (dy + 48) + '" width="10" height="34" rx="4" fill="#e8dccb" stroke="#8a6d4b" stroke-width="2"/><rect x="' + (dx + 54) + '" y="' + (dy + 48) + '" width="10" height="34" rx="4" fill="#e8dccb" stroke="#8a6d4b" stroke-width="2"/>';
    s += '<path d="M' + (dx + 80) + ',' + (dy + 20) + ' q22,-18 18,-34" fill="none" stroke="#8a6d4b" stroke-width="5" stroke-linecap="round"/>';
    s += '<circle cx="' + (dx - 40) + '" cy="' + (dy - 6) + '" r="30" fill="#e8dccb" stroke="#8a6d4b" stroke-width="2"/>';
    s += '<ellipse cx="' + (dx - 22) + '" cy="' + (dy - 30) + '" rx="10" ry="20" fill="#b89470" transform="rotate(25 ' + (dx - 22) + ' ' + (dy - 30) + ')"/>';
    s += '<ellipse cx="' + (dx - 70) + '" cy="' + (dy + 2) + '" rx="16" ry="11" fill="#e8dccb" stroke="#8a6d4b" stroke-width="2"/><circle cx="' + (dx - 83) + '" cy="' + (dy - 1) + '" r="4" fill="#333"/>';
    s += '<circle cx="' + (dx - 46) + '" cy="' + (dy - 14) + '" r="3.5" fill="#333">' + '<animate attributeName="r" values="3.5;3.5;0.8;0.8;3.5;3.5" keyTimes="0;' + (9.5 / D) + ';' + (9.52 / D) + ';' + (10.5 / D) + ';' + (10.52 / D) + ';1" dur="' + D + 's" fill="freeze"/></circle>';
    s += '</g>';
    // 휴지기간 표시
    s += '<g opacity="0">' + txt(dx - 10, dy - 52, "z z z", 15, C.m, ' font-weight="700"') + show(9.5, 10.5, D) + '</g>';
    // 침방울
    var mx = dx - 72, my = dy + 18;
    function drops(n, from, to) {
      var g = '<g opacity="0"><g>';
      for (var i = 0; i < n; i++) g += '<path d="M' + (mx + i * 9 - (n - 1) * 4.5) + ',' + (my + i * 4) + ' q-5,9 0,12 q5,-3 0,-12 z" fill="#4aa3e0" stroke="#fff" stroke-width="1"/>';
      g += '<animateTransform attributeName="transform" type="translate" from="0 0" to="0 10" begin="' + from + 's" dur="' + (to - from) + 's" fill="freeze"/></g>';
      return g + vis([[from, to]]) + '</g>';
    }
    s += drops(3, 0.8, 2) + drops(3, 4.1, 4.5) + drops(3, 4.9, 5.3) + drops(3, 5.7, 6.0);
    s += drops(3, 6.4, 7.5) + drops(3, 7.9, 8.25) + drops(2, 8.5, 8.85) + drops(1, 9.1, 9.45) + drops(2, 10.9, 12.5);
    s += '<g opacity="0">' + txt(310, 282, "침 = 무조건 반응(UR)", 12, C.b, ' font-weight="700"') + vis([[0.8, 2], [4.1, 6.0]]) + '</g>';
    s += '<g opacity="0">' + txt(310, 282, "반응 없음", 12, C.m, ' font-weight="700"') + show(2.4, 3.5, D) + '</g>';
    s += '<g opacity="0">' + txt(310, 282, "침 = 조건 반응(CR)", 12, C.r, ' font-weight="700"') + vis([[6.3, 9.5], [10.8, null]]) + '</g>';
    s += '<g opacity="0">' + txt(310, 268, "(점점 줄어듦)", 11, C.m) + show(7.8, 9.5, D) + '</g>';

    // ---- 오른쪽: 그래프 ----
    s += box(436, 44, 310, 252, "#fff", "#ccc");
    s += txt(591, 64, "조건 반응(CR)의 강도", 12, C.n, ' font-weight="700"');
    s += '<line x1="470" y1="84" x2="470" y2="258" stroke="#555" stroke-width="1.5"/><line x1="470" y1="258" x2="736" y2="258" stroke="#555" stroke-width="1.5"/>';
    s += txt(456, 96, "강", 11, C.m) + txt(456, 256, "약", 11, C.m) + txt(724, 276, "시간 →", 11, C.m);
    s += '<line x1="634" y1="84" x2="634" y2="258" stroke="#bbb" stroke-dasharray="4 3"/><line x1="660" y1="84" x2="660" y2="258" stroke="#bbb" stroke-dasharray="4 3"/>';
    s += txt(647, 276, "휴지기간", 10.5, C.m);
    s += draw("M472,254 C492,170 522,108 560,96", C.a, 3.6, 6);
    s += draw("M560,96 C580,150 602,222 632,252", C.a, 7.6, 9.5);
    s += '<g opacity="0"><circle cx="661" cy="166" r="5" fill="' + C.r + '"/>' + show(10.6, 14, D) + '</g>';
    s += draw("M661,166 C682,206 702,236 730,252", C.a, 11.1, 12.5);
    s += '<g opacity="0">' + txt(518, 196, "획득", 11.5, C.a, ' font-weight="700"') + txt(518, 210, "(NS + US)", 10.5, C.m) + show(4, 14, D) + '</g>';
    s += '<g opacity="0">' + txt(584, 236, "소거", 11.5, C.a, ' font-weight="700"') + txt(584, 250, "(CS만 제시)", 10.5, C.m) + show(8, 14, D) + '</g>';
    s += '<g opacity="0"><line x1="560" y1="96" x2="734" y2="96" stroke="' + C.r + '" stroke-dasharray="3 3"/>' +
      txt(700, 90, "획득 최대", 10.5, C.r) +
      '<line x1="676" y1="102" x2="676" y2="158" stroke="' + C.r + '" stroke-width="1.5"/>' +
      txt(682, 128, "자발적 회복", 11.5, C.r, ' font-weight="700" text-anchor="start"') + txt(682, 142, "(부분적)", 10.5, C.r, ' text-anchor="start"') + show(10.8, 14, D) + '</g>';

    // ---- 아래 요점 ----
    s += txt(380, 322, "NS 먼저 → US 나중 반복 ⇒ NS가 CS로 · 소거는 제거가 아니라 억압 (그래서 자발적 회복)", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
