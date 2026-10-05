// ============================================================
// binocular_cues — 망막 부등과 수렴 (4장 p.34)
// 시간축(초): 0 먼 물체 → 2 가까워짐(부등·수렴 ↑) → 5.5 다시 멀어짐(↓) → 7.5 한 눈 감고 볼펜 맞추기 실패
//   → 10.5 정리 → 12 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["binocular_cues"] = {
  title: "양안 단서 — 가까울수록 두 눈의 차이가 커진다 12초",
  desc: "위에서 본 두 눈. 물체가 가까워지면 두 망막 상의 차이([[망막 부등]])와 두 시선의 내각(수렴)이 함께 커진다. 한 눈을 감으면 볼펜 끝 맞추기가 빗나간다 — [[양안 단서]]는 두 눈을 써야 얻는 [[깊이 지각|깊이 단서]]",
  duration: 12,
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
    var D = 12;
    // 물체 거리 시간표: 멀다(0–2) → 가깝다(4–5.5) → 멀다(7–)
    var KT = "0;" + (2 / D) + ";" + (4 / D) + ";" + (5.5 / D) + ";" + (7 / D) + ";1";
    function along(attr, far, near) {
      return '<animate attributeName="' + attr + '" values="' + far + ';' + far + ';' + near + ';' + near + ';' + far + ';' + far + '" keyTimes="' + KT + '" dur="' + D + 's" fill="freeze"/>';
    }
    var FY = 86, NY = 200, LX = 170, RX = 250, EY = 272, OX = 210;
    var s = '<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="양안 단서 애니메이션">';
    s += '<defs><marker id="bc_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#888"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 2, "위에서 본 두 눈 — 멀리 있는 물체: 두 망막의 상 차이가 작다"],
      [2, 5.5, "물체가 가까워짐 → 망막 부등(두 망막 이미지의 차이)↑ · 수렴(두 눈의 내각)↑"],
      [5.5, 7.5, "다시 멀어짐 → 망막 부등도, 수렴도 작아짐"],
      [7.5, 10.5, "한 눈을 감고 볼펜 끝 맞추기 → 양안 단서가 없어 빗나감"],
      [10.5, 12, "양안 단서(Binocular cue): 양안 사용에 의존하는 깊이 단서"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 왼쪽: 위에서 본 장면 ----
    s += box(14, 44, 392, 250, "#fff", "#ccc");
    s += txt(396, 64, "위에서 본 모습", 11, C.m, ' text-anchor="end"');
    s += '<line x1="60" y1="210" x2="60" y2="90" stroke="#bbb" stroke-width="2" marker-end="url(#bc_arrow)"/>';
    s += txt(60, 82, "멀다", 11, C.m) + txt(60, 226, "가깝다", 11, C.m);
    // 수렴 삼각형 (두 시선 사이 내각)
    s += '<polygon points="' + LX + ',' + EY + ' ' + RX + ',' + EY + ' ' + OX + ',' + FY + '" fill="' + C.cL + '" opacity="0.8">' +
      '<animate attributeName="points" values="' + [FY, FY, NY, NY, FY, FY].map(function (y) { return LX + ',' + EY + ' ' + RX + ',' + EY + ' ' + OX + ',' + y; }).join(";") + '" keyTimes="' + KT + '" dur="' + D + 's" fill="freeze"/>' +
      '<animate attributeName="opacity" values="0.8;0.8;0;0;0.8;0.8" keyTimes="0;' + (7.5 / D) + ';' + (7.52 / D) + ';' + (10.5 / D) + ';' + (10.52 / D) + ';1" dur="' + D + 's" fill="freeze"/></polygon>';
    // 시선 두 개
    s += '<line x1="' + LX + '" y1="' + EY + '" x2="' + OX + '" y2="' + FY + '" stroke="' + C.a + '" stroke-width="2.5">' + along("y2", FY, NY) + '</line>';
    s += '<line x1="' + RX + '" y1="' + EY + '" x2="' + OX + '" y2="' + FY + '" stroke="' + C.a + '" stroke-width="2.5">' + along("y2", FY, NY) +
      '<animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;' + (7.5 / D) + ';' + (7.52 / D) + ';' + (10.5 / D) + ';' + (10.52 / D) + ';1" dur="' + D + 's" fill="freeze"/></line>';
    // 수렴각 라벨
    s += '<g>' + txt(OX, 258, "수렴(내각)", 11, C.c, ' font-weight="700"') + '<animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;' + (7.5 / D) + ';' + (7.52 / D) + ';' + (10.5 / D) + ';' + (10.52 / D) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    // 물체
    s += '<circle cx="' + OX + '" cy="' + FY + '" r="12" fill="' + C.r + '" stroke="#fff" stroke-width="2">' + along("cy", FY, NY) + '</circle>';
    s += '<text x="' + (OX + 20) + '" y="' + (FY + 4) + '" font-size="12" fill="' + C.r + '" font-weight="700">물체' + along("y", FY + 4, NY + 4) + '</text>';
    // 두 눈
    s += '<circle cx="' + LX + '" cy="' + EY + '" r="14" fill="#fff" stroke="' + C.n + '" stroke-width="2"/><circle cx="' + LX + '" cy="' + (EY - 7) + '" r="5" fill="' + C.n + '"/>';
    s += '<circle cx="' + RX + '" cy="' + EY + '" r="14" fill="#fff" stroke="' + C.n + '" stroke-width="2"/><circle cx="' + RX + '" cy="' + (EY - 7) + '" r="5" fill="' + C.n + '"/>';
    s += txt(LX - 34, EY + 4, "왼눈", 11, C.n) + txt(RX + 36, EY + 4, "오른눈", 11, C.n);
    // 오른눈 감음 + 볼펜 (7.5–10.5)
    s += '<g opacity="0"><circle cx="' + RX + '" cy="' + EY + '" r="15" fill="' + C.n + '"/>' + txt(RX + 36, EY - 14, "감음", 11, C.r, ' font-weight="700"') + show(7.5, 10.5, D) + '</g>';
    s += '<g opacity="0"><g><rect x="70" y="146" width="110" height="8" rx="3" fill="' + C.a + '"/><path d="M180,146 L194,150 L180,154 z" fill="#333"/>' +
      '<animateTransform attributeName="transform" type="translate" from="-60 0" to="0 0" begin="7.6s" dur="1s" fill="freeze"/></g>' +
      '<g><rect x="262" y="170" width="110" height="8" rx="3" fill="' + C.b + '"/><path d="M262,170 L248,174 L262,178 z" fill="#333"/>' +
      '<animateTransform attributeName="transform" type="translate" from="60 0" to="0 0" begin="7.6s" dur="1s" fill="freeze"/></g>' +
      show(7.5, 10.5, D) + '</g>';
    s += '<g opacity="0"><path d="M212,152 L232,172 M232,152 L212,172" stroke="' + C.r + '" stroke-width="4"/>' +
      txt(222, 136, "끝이 엇갈림 (앞뒤 판단 실패)", 12, C.r, ' font-weight="700"') + show(8.8, 10.5, D) + '</g>';

    // ---- 오른쪽: 두 망막의 상 ----
    s += box(420, 44, 326, 250, "#fff", "#ccc");
    s += txt(583, 66, "두 망막에 맺힌 상 (물체 vs 먼 배경)", 12, C.n, ' font-weight="700"');
    [[503, "왼눈의 상", 1], [663, "오른눈의 상", -1]].forEach(function (e) {
      s += box(e[0] - 70, 78, 140, 76, C.nL, C.n);
      s += txt(e[0], 170, e[1], 11, C.n);
      s += '<path d="M' + (e[0] - 14) + ',112 L' + e[0] + ',90 L' + (e[0] + 14) + ',112 z" fill="#b7b0c4"/>';
      s += '<line x1="' + e[0] + '" y1="84" x2="' + e[0] + '" y2="148" stroke="#999" stroke-dasharray="3 3"/>';
      s += '<circle cx="' + (e[0] + e[2] * 8) + '" cy="132" r="9" fill="' + C.r + '">' + along("cx", e[0] + e[2] * 8, e[0] + e[2] * 48) + '</circle>';
    });
    s += '<g opacity="0">' + box(593, 78, 140, 76, C.n, C.n) + txt(663, 121, "눈을 감음 — 상 없음", 12, "#fff", ' font-weight="700"') + show(7.5, 10.5, D) + '</g>';
    // 막대: 망막 부등, 수렴
    s += txt(436, 206, "망막 부등", 12, C.r, ' font-weight="700" text-anchor="start"');
    s += '<rect x="516" y="194" width="200" height="16" rx="4" fill="#f2f2f2"/>';
    s += '<rect x="516" y="194" width="30" height="16" rx="4" fill="' + C.r + '">' + along("width", 30, 190) + '</rect>';
    s += txt(436, 244, "수렴 (내각)", 12, C.c, ' font-weight="700" text-anchor="start"');
    s += '<rect x="516" y="232" width="200" height="16" rx="4" fill="#f2f2f2"/>';
    s += '<rect x="516" y="232" width="40" height="16" rx="4" fill="' + C.c + '">' + along("width", 40, 180) + '</rect>';
    s += '<g>' + txt(583, 276, "차이 작음 → 멀다", 13, C.m, ' font-weight="700"') + show(0, 2.8, D) + '</g>';
    s += '<g opacity="0">' + txt(583, 276, "차이 큼 → 가깝다", 13, C.r, ' font-weight="700"') + show(2.8, 6.3, D) + '</g>';
    s += '<g opacity="0">' + txt(583, 276, "차이 작음 → 멀다", 13, C.m, ' font-weight="700"') + show(6.3, 7.5, D) + '</g>';
    s += '<g opacity="0">' + txt(583, 276, "한 눈만으로는 비교할 상이 없다", 13, C.r, ' font-weight="700"') + show(7.5, 10.5, D) + '</g>';
    s += '<g opacity="0">' + txt(583, 276, "두 눈의 차이를 계산해 깊이를 지각", 13, C.b, ' font-weight="700"') + show(10.5, 12, D) + '</g>';

    // ---- 아래 요점 ----
    s += txt(380, 318, "망막 부등·수렴 = 양안 단서 — 차이가 클수록(내각이 클수록) 가까이 있는 사물", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
