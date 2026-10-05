// ============================================================
// correlation_not_causation — 1장 p.22 상관 ≠ 인과 (아이스크림·식중독, 제3의 변인=기온)
// 시간축(초): 0 빈 산점도 → 1 점이 하나씩 찍힘 → 4 정적 상관 추세선 → 5.5 "아이스크림 → 식중독?"
//   → 7 빨간 ✗ → 8.5 '기온(여름)' 상자가 내려와 두 변인으로 화살표 = 제3의 변인 → 10.5 요점
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["correlation_not_causation"] = {
  title: "상관은 인과가 아니다 — 아이스크림과 식중독 사이의 '기온' 12초",
  desc: "아이스크림 소비와 식중독 발병이 함께 증가하는 정적 [[상관]]을 보고 인과로 착각하기 쉽지만, 두 변인 모두에 영향을 주는 [[제3의 변인]](기온)이 있다 — 상관은 예측은 하지만 인과를 입증하지 않는다",
  duration: 12,
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
    var D = 12;
    var B = ' font-weight="700"';
    var s = '<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="상관과 인과 애니메이션">';
    s += '<defs><marker id="cnc_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker>' +
      '<marker id="cnc_arrowO" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.c + '"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1, "두 변인을 함께 측정한다: 아이스크림 소비량 × 식중독 발병"],
      [1, 4, "점 하나 = 한 시기의 (아이스크림 소비, 식중독 발병)"],
      [4, 5.5, "둘이 함께 증가 → 정적 상관 (상관: 두 변인이 함께 변하는 정도, -1~1)"],
      [5.5, 7, "그렇다면 아이스크림이 식중독의 원인일까?"],
      [7, 8.5, "✗ 상관은 연관성을 보여줄 뿐, 인과성을 입증하지 않는다"],
      [8.5, 10.5, "두 변인 모두에 영향을 주는 제3의 변인: 기온(여름)"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "상관 → 예측은 할 수 있지만, 설명(인과)은 할 수 없다", 14, "#222", B) + on(10.5, D) + '</g>';

    // ---- 산점도 ----
    s += box(30, 48, 320, 262, "#fff", C.line);
    s += '<line x1="70" y1="280" x2="330" y2="280" stroke="#555" stroke-width="2" marker-end="url(#cnc_arrow)"/>';
    s += '<line x1="70" y1="280" x2="70" y2="62" stroke="#555" stroke-width="2" marker-end="url(#cnc_arrow)"/>';
    s += txt(200, 300, "아이스크림 소비량 →", 12, C.a, B);
    s += txt(50, 170, "식중독 발병 →", 12, C.r, B + ' transform="rotate(-90 50 170)"');
    var pts = [[92, 262], [110, 250], [128, 256], [150, 232], [170, 238], [190, 214], [208, 204], [230, 190], [250, 196], [268, 162], [290, 150], [308, 126]];
    pts.forEach(function (p, i) {
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="' + C.a + '" stroke="#fff" stroke-width="1.5" opacity="0">' + on(1 + i * 0.25, D) + '</circle>';
    });
    s += '<g opacity="0"><line x1="84" y1="270" x2="318" y2="124" stroke="' + C.b + '" stroke-width="3" stroke-dasharray="7 5"/>' +
      box(90, 70, 128, 26, "#cdefd2", "#1d6b2a") + txt(154, 88, "정적 상관 (+)", 13, "#1d6b2a", B) + on(4, D) + '</g>';

    // ---- 오른쪽: 두 변인 상자 ----
    s += '<g opacity="0">' + box(386, 196, 150, 50, C.aL, C.a) + txt(461, 226, "아이스크림 소비", 14, C.a, B) +
      box(604, 196, 140, 50, C.rL, C.r) + txt(674, 226, "식중독 발병", 14, C.r, B) + on(5.5, D) + '</g>';
    s += '<g opacity="0"><line x1="538" y1="221" x2="600" y2="221" stroke="#555" stroke-width="3" marker-end="url(#cnc_arrow)"/>' +
      txt(569, 190, "원인?", 13, "#555", B) + on(5.5, D) + '</g>';
    // 빨간 X
    s += '<g opacity="0"><line x1="555" y1="204" x2="585" y2="238" stroke="' + C.r + '" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="585" y1="204" x2="555" y2="238" stroke="' + C.r + '" stroke-width="5" stroke-linecap="round"/>' +
      box(474, 262, 190, 26, "#ffd9d9", "#a52f2f") + txt(569, 280, "인과 아님 — 연관성일 뿐", 12, "#a52f2f", B) + on(7, D) + '</g>';

    // ---- 제3의 변인: 기온(여름) — 위에서 내려옴 ----
    s += '<g opacity="0"><g>' + box(490, 64, 158, 52, C.cL, C.c) + txt(569, 86, "☀ 기온 (여름)", 14, "#8a6000", B) +
      txt(569, 106, "제3의 변인", 12, "#8a6000") +
      '<animateTransform attributeName="transform" type="translate" values="0,-70;0,-70;0,0;0,0" keyTimes="0;0.708;0.77;1" dur="' + D + 's" fill="freeze"/></g>' +
      on(8.5, D) + '</g>';
    s += '<g opacity="0"><line x1="530" y1="118" x2="472" y2="192" stroke="' + C.c + '" stroke-width="3" marker-end="url(#cnc_arrowO)"/>' +
      '<line x1="608" y1="118" x2="666" y2="192" stroke="' + C.c + '" stroke-width="3" marker-end="url(#cnc_arrowO)"/>' +
      txt(478, 150, "더우면 ↑", 12, "#8a6000", B) + txt(662, 150, "더우면 ↑", 12, "#8a6000", B) + on(9.3, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 330, "상관은 예측은 하지만 인과를 입증하지 않는다 — 제3의 변인이 있을 수 있기 때문 (인과는 실험법으로)", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
