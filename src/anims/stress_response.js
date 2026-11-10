// ============================================================
// stress_response — 9장 p.2–3, p.8 스트레스 반응 시스템 (마음-신체 통합 시스템)
// 시간축(초): 0 스트레스원(어려운 수학시험, p.2 그림) → 1.5 평가(위협 vs 도전) → 3.5 뇌(시상하부) 경보
//   → 5–8 빠른 경로: 교감신경계 → 에피네프린/노르에피네프린 → 투쟁 or 도피 (Cannon, 1929)
//   → 8–11 느린 경로: 부신 피질 → 코르티솔 → 대처 전략 수립(다소 장기적) → 11–14 요점
// 시상하부·뇌하수체 경로 표기는 교재 보충(슬라이드는 교감신경계·부신 피질만 명시).
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["stress_response"] = {
  title: "스트레스 반응 시스템 — 평가에서 투쟁-도피·코르티솔까지 14초",
  desc: "[[스트레스원]]을 '''위협'''으로 평가하면 몸이 두 갈래로 반응한다: '''빠른 경로'''(교감신경계 → 에피네프린/노르에피네프린 → [[투쟁-도피 반응]], 즉각적 위협 대처)와 '''느린 경로'''(부신 피질 → [[코르티솔]], 다소 장기적 대처 준비) (9장 p.2–3, p.8). 시상하부·뇌하수체 표기는 교재 보충.",
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
    function dot(path, t0, t1, color) { // t0→t1 초 동안 path 를 따라 이동하는 신호 점
      var k0 = (t0 / D).toFixed(4), k1 = (t1 / D).toFixed(4);
      return '<circle r="7" fill="' + color + '" stroke="#fff" stroke-width="1.5" opacity="0"><animateMotion path="' + path + '" keyPoints="0;0;1;1" keyTimes="0;' + k0 + ';' + k1 + ';1" calcMode="linear" dur="' + D + 's" fill="freeze"/>' + show(t0, t1 + 0.1, D) + '</circle>';
    }
    var D = 14;
    var B = ' font-weight="700"';
    var s = '<svg viewBox="0 0 760 352" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="스트레스 반응 시스템 애니메이션">';
    s += '<defs><marker id="sr_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "스트레스원 등장 — 어려운 수학 시험"],
      [1.5, 3.5, "스트레스 평가: 위협(\"내 수준을 넘어\")인가, 도전(\"다 적용해 보자\")인가?"],
      [3.5, 5, "위협으로 평가 → 뇌(시상하부)가 경보를 울린다"],
      [5, 8, "빠른 경로: 교감신경계 → 에피네프린/노르에피네프린 → 투쟁 or 도피 반응"],
      [8, 11, "느린 경로: 부신 피질에서 코르티솔 → 대처 전략 수립, 다소 장기적 준비"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "스트레스 반응 = 마음-신체 통합 시스템: 즉각(투쟁-도피) + 장기(코르티솔)", 14, "#222", B) + on(11, D) + '</g>';

    // ---- 가운데 줄: 스트레스원 → 평가 → 시상하부 ----
    s += box(14, 145, 124, 62, C.rL, C.r) + txt(76, 170, "스트레스원", 14, "#a52f2f", B) + txt(76, 190, "어려운 수학 시험", 11, "#a52f2f");
    s += box(166, 145, 124, 62, C.cL, C.c) + txt(228, 170, "평가", 14, "#8a6000", B) + txt(228, 190, "위협? 도전?", 12, "#8a6000");
    s += box(318, 145, 112, 62, C.nL, C.n) + txt(374, 170, "뇌", 14, C.n, B) + txt(374, 190, "(시상하부)", 11, C.n);
    s += '<line x1="140" y1="176" x2="162" y2="176" stroke="#555" stroke-width="2.5" marker-end="url(#sr_arrow)"/>';
    s += '<line x1="292" y1="176" x2="314" y2="176" stroke="#555" stroke-width="2.5" marker-end="url(#sr_arrow)"/>';

    // 평가 갈림 (1.5–3.5 동안 위·아래 말풍선)
    s += '<g opacity="0">' + box(150, 72, 156, 52, "#ffd9d9", "#a52f2f") + txt(228, 93, "위협: \"내 수준을", 11, "#a52f2f", B) + txt(228, 110, "넘어서는 거야\" → 혼란", 11, "#a52f2f") + on(1.5, D) + '</g>';
    s += '<g opacity="0">' + box(150, 228, 156, 52, "#cdefd2", "#1d6b2a") + txt(228, 249, "도전: \"다 적용해", 11, "#1d6b2a", B) + txt(228, 266, "봐야지\" → 각성, 집중", 11, "#1d6b2a") + show(1.5, 3.6, D) + '</g>';
    s += '<g opacity="0">' + box(150, 228, 156, 52, "#f4f4f4", "#999") + txt(228, 249, "같은 사건도", 11, "#555", B) + txt(228, 266, "평가에 따라 반응이 바뀜", 11, "#555") + on(3.6, D) + '</g>';
    // 뇌 경보
    s += '<g opacity="0">' + '<rect x="314" y="141" width="120" height="70" rx="10" fill="none" stroke="' + C.r + '" stroke-width="3"><animate attributeName="stroke-opacity" values="1;0.2;1" dur="0.7s" repeatCount="indefinite"/></rect>' + show(3.5, 5.2, D) + '</g>';

    // ---- 위쪽 갈래 (빠른 경로) ----
    s += txt(598, 52, "빠른 경로 · 즉각적", 12, "#a52f2f", B);
    s += box(452, 60, 132, 50, C.nL, C.n) + txt(518, 82, "교감신경계", 13, C.n, B) + txt(518, 100, "작동 (부신 수질)", 11, C.n);
    s += box(604, 60, 146, 50, C.aL, C.a) + txt(677, 81, "에피네프린/", 12, C.a, B) + txt(677, 99, "노르에피네프린", 12, C.a, B);
    s += '<path d="M432,160 L452,88" fill="none" stroke="#555" stroke-width="2.5" marker-end="url(#sr_arrow)"/>';
    s += '<line x1="586" y1="85" x2="600" y2="85" stroke="#555" stroke-width="2.5" marker-end="url(#sr_arrow)"/>';
    s += '<line x1="677" y1="112" x2="677" y2="122" stroke="#555" stroke-width="2.5" marker-end="url(#sr_arrow)"/>';
    s += '<g opacity="0">' + box(586, 124, 166, 42, "#ffd9d9", "#a52f2f") + txt(669, 143, "투쟁 or 도피 반응", 13, "#a52f2f", B) + txt(669, 159, "가까운 즉각적 위협 대처", 10.5, "#a52f2f") + on(7.2, D) + '</g>';
    s += '<g opacity="0">' + txt(518, 132, "Cannon, 1929", 11, C.muted) + on(7.2, D) + '</g>';

    // ---- 아래쪽 갈래 (느린 경로) ----
    s += box(452, 244, 132, 50, C.nL, C.n) + txt(518, 265, "부신 피질", 13, C.n, B) + txt(518, 283, "(뇌하수체 경유·교재 보충)", 9.5, C.muted);
    s += box(604, 244, 146, 50, C.cL, C.c) + txt(677, 275, "코르티솔", 14, "#8a6000", B);
    s += '<path d="M432,192 L452,266" fill="none" stroke="#555" stroke-width="2.5" marker-end="url(#sr_arrow)"/>';
    s += '<line x1="586" y1="269" x2="600" y2="269" stroke="#555" stroke-width="2.5" marker-end="url(#sr_arrow)"/>';
    s += '<line x1="677" y1="242" x2="677" y2="232" stroke="#555" stroke-width="2.5" marker-end="url(#sr_arrow)"/>';
    s += '<g opacity="0">' + box(586, 188, 166, 42, "#fdeec2", "#8a6000") + txt(669, 207, "대처 전략 수립 촉진", 13, "#8a6000", B) + txt(669, 223, "다소 장기적인 준비", 10.5, "#8a6000") + on(10.2, D) + '</g>';
    s += txt(598, 314, "느린 경로 · 다소 장기적", 12, "#8a6000", B);

    // ---- 신호 점 ----
    s += dot("M138,176 L166,176", 0.6, 1.4, C.r);
    s += dot("M290,176 L318,176", 3.0, 3.5, C.r);
    s += dot("M430,160 L452,88 L518,88 L604,85 L677,85 L677,124", 5.0, 7.2, C.a);
    s += dot("M430,192 L452,266 L518,266 L604,269 L677,269 L677,230", 8.0, 10.2, C.c);

    // ---- 요점 ----
    s += txt(380, 344, "에피네프린/노르에피네프린 = 교감신경계 · 즉각적 투쟁-도피 / 코르티솔 = 부신 피질 · 장기적 대처 (9장 p.8)", 11.5, C.muted);
    s += '</svg>';
    return s;
  }
};
