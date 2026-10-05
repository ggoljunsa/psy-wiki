// ============================================================
// experiment_design — 1장 p.21, 23–24 실험법의 설계
// 시간축(초): 0 모집단 → 1.5 무선 표집(대표 표본) → 3.5 동전으로 무선 할당 → 실험·가짜약·통제 조건
//   → 6 이중 은폐(참가자·실험자 모두 모름) → 8.5 결과 막대 비교 → 11 요점
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["experiment_design"] = {
  title: "실험법 설계 — 표집에서 결과 비교까지 14초",
  desc: "모집단 → [[무선 표집]](대표 표본) → [[무선 할당]](개인차 최소화) → 실험 조건·[[가짜약 효과|가짜약 조건]]·통제 조건 → [[이중 은폐]] → 결과 비교. 조작·통제가 가능한 방법은 [[실험법]]뿐이다",
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
    var s = '<svg viewBox="0 0 760 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="실험법 설계 애니메이션">';
    s += '<defs><marker id="ed_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "모집단: 연구 대상이 되는 전체 집단 (사람마다 개인차가 있다)"],
      [1.5, 3.5, "① 무선 표집: 모두가 동등하게 뽑힐 기회 → 대표성 있는 표본"],
      [3.5, 6, "② 무선 할당: 확률(동전)로 조건에 배정 → 기존 개인차의 영향 최소화"],
      [6, 8.5, "③ 이중 은폐: 참가자도 실험자도 누가 가짜약 조건인지 모른다"],
      [8.5, 11, "④ 처치 변인만 조작, 나머지는 일정하게 → 조건끼리 결과 비교"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "조작·통제가 가능한 방법은 실험법뿐 → 인과성을 검증한다", 14, "#222", B) + on(11, D) + '</g>';

    // ---- 무대: 모집단 / 표본 / 조건 / 결과 ----
    s += '<ellipse cx="85" cy="172" rx="66" ry="112" fill="#f4f4f4" stroke="' + C.line + '" stroke-width="2"/>';
    s += txt(85, 300, "모집단", 13, "#555", B);
    s += '<g opacity="0">' + box(170, 92, 112, 150, C.aL, C.a) + txt(226, 112, "표본", 13, C.a, B) +
      txt(226, 260, "대표 표본", 12, C.a) + on(1.5, D) + '</g>';
    s += '<g opacity="0"><line x1="152" y1="172" x2="166" y2="172" stroke="#555" stroke-width="2" marker-end="url(#ed_arrow)"/>' + on(1.5, D) + '</g>';

    var conds = [
      [56, "실험 조건", "실제 처치", C.a, C.aL],
      [136, "가짜약 조건", "Placebo", C.c, C.cL],
      [216, "통제 조건", "처치 없음", C.n, C.nL]
    ];
    conds.forEach(function (k, i) {
      s += '<g opacity="0">' + box(352, k[0], 214, 70, k[4], k[3]) +
        txtL(364, k[0] + 26, k[1], 13, k[3], B) + txtL(364, k[0] + 46, k[2], 12, "#222") +
        on(3.5, D) + '</g>';
    });
    // 약 아이콘: 실험=진짜 약, 가짜약=겉모양이 같은 가짜 약
    s += '<g opacity="0"><rect x="452" y="64" width="30" height="14" rx="7" fill="#fff" stroke="' + C.a + '" stroke-width="2"/>' +
      txtL(486, 76, "약", 11, C.a, B) +
      '<rect x="452" y="144" width="30" height="14" rx="7" fill="#fff" stroke="' + C.c + '" stroke-width="2"/>' +
      txtL(486, 156, "가짜 약", 11, "#8a6000", B) + show(3.5, 6, D) + '</g>';
    s += '<g opacity="0"><rect x="452" y="64" width="30" height="14" rx="7" fill="#fff" stroke="#555" stroke-width="2"/>' +
      txtL(486, 76, "?", 13, "#555", B) +
      '<rect x="452" y="144" width="30" height="14" rx="7" fill="#fff" stroke="#555" stroke-width="2"/>' +
      txtL(486, 156, "?", 13, "#555", B) + on(6, D) + '</g>';
    s += '<g opacity="0"><line x1="282" y1="167" x2="346" y2="91" stroke="#555" stroke-width="2" marker-end="url(#ed_arrow)"/>' +
      '<line x1="282" y1="170" x2="346" y2="170" stroke="#555" stroke-width="2" marker-end="url(#ed_arrow)"/>' +
      '<line x1="282" y1="173" x2="346" y2="250" stroke="#555" stroke-width="2" marker-end="url(#ed_arrow)"/>' + on(3.5, D) + '</g>';

    // ---- 동전 (무선 할당) ----
    s += '<g opacity="0"><g transform="translate(314,130)"><g>' +
      '<circle r="15" fill="' + C.cL + '" stroke="' + C.c + '" stroke-width="2.5"/>' + txt(0, 5, "동전", 11, "#8a6000", B) +
      '<animateTransform attributeName="transform" type="scale" values="1,1;0.1,1;1,1" dur="0.5s" begin="3.5s" repeatCount="5"/></g></g>' +
      show(3.5, 6, D) + '</g>';

    // ---- 사람 점: 모집단 30명, 그중 12명이 뽑혀 표본 → 조건으로 ----
    var k = 0;
    for (var i = 0; i < 30; i++) {
      var ang = i * 2.39996, rr = Math.sqrt((i + 0.5) / 30);
      var px = Math.round(85 + Math.cos(ang) * rr * 54), py = Math.round(172 + Math.sin(ang) * rr * 96);
      var picked = (i % 5 === 0 || i % 5 === 2);
      if (!picked) {
        s += '<circle cx="' + px + '" cy="' + py + '" r="6" fill="#aaa"/>';
        continue;
      }
      var sx = 196 + (k % 4) * 20, sy = 140 + Math.floor(k / 4) * 28;
      var ci = k % 3, slot = Math.floor(k / 3);
      var cx = 500 + slot * 16, cy = conds[ci][0] + 50;
      var col = conds[ci][3];
      var t1 = 1.8 + k * 0.06, t2 = t1 + 0.9, t3 = 4 + k * 0.08, t4 = t3 + 0.9;
      var kts = '0;' + kt(t1) + ';' + kt(t2) + ';' + kt(t3) + ';' + kt(t4) + ';1';
      s += '<circle cx="' + px + '" cy="' + py + '" r="6" fill="#aaa">' +
        '<animate attributeName="cx" values="' + px + ';' + px + ';' + sx + ';' + sx + ';' + cx + ';' + cx + '" keyTimes="' + kts + '" dur="' + D + 's" fill="freeze"/>' +
        '<animate attributeName="cy" values="' + py + ';' + py + ';' + sy + ';' + sy + ';' + cy + ';' + cy + '" keyTimes="' + kts + '" dur="' + D + 's" fill="freeze"/>' +
        '<animate attributeName="fill" values="#aaa;#aaa;#555;#555;' + col + ';' + col + '" keyTimes="' + kts + '" dur="' + D + 's" fill="freeze"/>' +
        '</circle>';
      k++;
    }

    // ---- 이중 은폐: 눈가리개를 한 참가자·실험자 ----
    function person(x, label, sub) {
      return '<circle cx="' + x + '" cy="306" r="10" fill="#fff" stroke="#555" stroke-width="2"/>' +
        '<rect x="' + (x - 12) + '" y="301" width="24" height="6" rx="2" fill="#222"/>' +
        '<path d="M' + (x - 13) + ',336 Q' + x + ',312 ' + (x + 13) + ',336 Z" fill="#fff" stroke="#555" stroke-width="2"/>' +
        txtL(x + 20, 312, label, 12, "#222", B) + txtL(x + 20, 328, sub, 11, C.muted);
    }
    s += '<g opacity="0">' + person(366, "참가자", "자기 조건 모름") + person(470, "실험자", "누가 가짜약인지 모름") + on(6, D) + '</g>';

    // ---- 결과 막대 ----
    s += '<g opacity="0">' + box(590, 56, 156, 230, "#fff", C.line) + txt(668, 78, "결과 비교", 13, "#222", B) +
      '<line x1="602" y1="250" x2="736" y2="250" stroke="#555" stroke-width="2"/>' +
      txt(625, 268, "실험", 12, C.a, B) + txt(668, 268, "가짜약", 12, "#8a6000", B) + txt(712, 268, "통제", 12, C.n, B) +
      on(8.5, D) + '</g>';
    var bars = [[610, 140, C.a], [653, 84, C.c], [697, 40, C.n]];
    bars.forEach(function (b) {
      s += '<rect x="' + b[0] + '" y="250" width="30" height="0" fill="' + b[2] + '">' +
        '<animate attributeName="height" values="0;0;' + b[1] + ';' + b[1] + '" keyTimes="0;' + kt(8.8) + ';' + kt(10) + ';1" dur="' + D + 's" fill="freeze"/>' +
        '<animate attributeName="y" values="250;250;' + (250 - b[1]) + ';' + (250 - b[1]) + '" keyTimes="0;' + kt(8.8) + ';' + kt(10) + ';1" dur="' + D + 's" fill="freeze"/></rect>';
    });
    s += '<g opacity="0">' + txt(668, 306, "실험 vs 가짜약 = 처치 효과", 11, "#222") +
      txt(668, 322, "가짜약 vs 통제 = 가짜약 효과", 11, "#222") + on(10, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 358, "무선 표집은 대표성, 무선 할당은 개인차 통제 — 혼동 금지. 인과 검증은 실험법만 가능", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
