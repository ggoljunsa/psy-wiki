// ============================================================
// selective_attention — 2장 p.32–33 선택적 주의 세 장면
// 시간축(초): 0 정의 → 1.5 칵테일 파티 효과(내 이름만 들림) → 4.5 패스 세기 → 6 사람이 지나감
//   → 7.5 "봤어?" ✗ = 부주의적 맹시 → 9 장면 A → 가림 → 장면 B → 11 "같은 장면" ✗ = 변화맹 → 12.5 요점
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["selective_attention"] = {
  title: "선택적 주의 — 칵테일 파티·부주의적 맹시·변화맹 14초",
  desc: "[[선택적 주의]]: ① 소음 속 내 이름만 들리는 [[칵테일 파티 효과]] ② 패스를 세느라 지나가는 사람을 못 보는 [[부주의적 맹시]] ③ 잠깐 가린 사이 바뀐 것을 못 알아채는 [[변화맹]]",
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
    var s = '<svg viewBox="0 0 760 352" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="선택적 주의 애니메이션">';
    s += '<defs><marker id="sa_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.a + '"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "선택적 주의: 경험하는 모든 것 중 일부분에만 초점을 맞추게 하는 심리 기제"],
      [1.5, 4.5, "① 칵테일 파티 효과: 여러 말소리 중 하나의 목소리에만 주의 — 내 이름은 들린다"],
      [4.5, 6, "② 흰 팀의 패스 횟수를 세는 데 집중하는 동안…"],
      [6, 7.5, "… 한 사람이 화면을 가로질러 지나간다"],
      [7.5, 9, "\"지나간 사람 봤어?\" → 못 봤다 = 부주의적 맹시"],
      [9, 11, "③ 장면 A → 잠깐 가림 → 장면 B (한 요소가 바뀜)"],
      [11, 12.5, "\"달라진 점은?\" → \"같은 장면인데요\" = 변화맹 (부주의적 맹시의 한 유형)"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "의식적 자각은 선택적 주의를 통해 성립 — 주의 밖의 것은 놓친다", 14, "#222", B) + on(12.5, D) + '</g>';

    // ======== 패널 1: 칵테일 파티 효과 ========
    s += '<g opacity="0">' + box(14, 50, 236, 232, "#fff", C.line);
    var bub = [[40, 74], [150, 70], [26, 128], [156, 124], [44, 182], [150, 180]];
    bub.forEach(function (b, i) {
      if (i === 3) return;
      s += '<g>' + box(b[0], b[1], 84, 30, "#eee", "#bbb") + txt(b[0] + 42, b[1] + 20, "웅성웅성", 12, "#999") +
        '<animate attributeName="opacity" values="1;1;0.3;0.3" keyTimes="0;' + kt(2.5) + ';' + kt(2.8) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    });
    // 내 이름 말풍선
    s += '<g>' + box(156, 124, 84, 30, "#eee", "#bbb") + txt(198, 144, "웅성웅성", 12, "#999") +
      '<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;' + kt(2.5) + ';' + kt(2.6) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += '<g opacity="0">' + box(150, 120, 96, 38, C.aL, C.a) + txt(198, 144, "\"민준아!\"", 14, C.a, B) +
      '<path d="M190,160 L150,226" fill="none" stroke="' + C.a + '" stroke-width="2.5" marker-end="url(#sa_arrow)"/>' + on(2.5, D) + '</g>';
    // 나
    s += '<circle cx="132" cy="236" r="11" fill="#fff" stroke="#555" stroke-width="2"/><path d="M114,272 Q132,244 150,272 Z" fill="#fff" stroke="#555" stroke-width="2"/>';
    s += txtL(154, 262, "나", 12, "#555", B);
    s += on(1.5, D) + '</g>';
    s += '<g opacity="0">' + txt(132, 302, "칵테일 파티 효과", 14, C.a, B) + on(2.5, D) + '</g>';

    // ======== 패널 2: 부주의적 맹시 ========
    s += '<g opacity="0">' + box(262, 50, 236, 232, "#fff", C.line);
    // 두 선수 (흰 팀)
    function player(x) {
      return '<circle cx="' + x + '" cy="132" r="10" fill="#fff" stroke="#333" stroke-width="2"/>' +
        '<rect x="' + (x - 11) + '" y="144" width="22" height="34" rx="6" fill="#fff" stroke="#333" stroke-width="2"/>';
    }
    s += player(300) + player(460);
    s += txt(380, 200, "흰 팀", 12, "#555", B);
    // 공
    s += '<circle cx="0" cy="0" r="7" fill="' + C.c + '" stroke="#8a6000" stroke-width="1.5">' +
      '<animateMotion begin="4.5s" dur="1s" repeatCount="3.5" fill="freeze" path="M314,150 Q380,110 446,150 Q380,110 314,150"/></circle>';
    // 패스 카운터
    s += box(286, 220, 188, 28, C.cL, C.c);
    for (var n = 0; n <= 7; n++) {
      var a = 4.5 + n * 0.5, b = n === 7 ? D : a + 0.5;
      s += '<g opacity="0">' + txt(380, 239, "패스 세는 중: " + n, 13, "#8a6000", B) + (n === 7 ? on(a, D) : show(a, b, D)) + '</g>';
    }
    // 지나가는 사람 (회색)
    s += '<g opacity="0"><g><circle cx="0" cy="112" r="10" fill="#bbb"/><rect x="-11" y="124" width="22" height="40" rx="6" fill="#bbb"/>' +
      '<path d="M-22,104 Q0,84 22,104 Z" fill="#888"/>' +
      '<animateTransform attributeName="transform" type="translate" values="262,0;262,0;498,0;498,0" keyTimes="0;' + kt(6) + ';' + kt(7.5) + ';1" dur="' + D + 's" fill="freeze"/></g>' +
      show(6, 7.5, D) + '</g>';
    // 봤어? ✗
    s += '<g opacity="0">' + box(300, 62, 160, 32, "#ffd9d9", "#a52f2f") + txt(380, 83, "봤어? → 못 봤다 ✗", 13, "#a52f2f", B) +
      '<path d="M276,100 L484,100" stroke="#bbb" stroke-dasharray="4 4"/>' + txt(380, 268, "지나간 사람이 있었다", 12, C.r, B) + on(7.5, D) + '</g>';
    s += on(4.5, D) + '</g>';
    s += '<g opacity="0">' + txt(380, 302, "부주의적 맹시", 14, C.r, B) + on(7.5, D) + '</g>';
    s += '<g opacity="0">' + txt(380, 318, "(Neisser &amp; Cervone, 1983)", 11, C.muted) + on(7.5, D) + '</g>';

    // ======== 패널 3: 변화맹 ========
    s += '<g opacity="0">' + box(510, 50, 236, 232, "#fff", C.line);
    // 장면: 집 + 나무 + 해
    s += '<rect x="540" y="160" width="70" height="60" fill="' + C.cL + '" stroke="#8a6000" stroke-width="2"/>' +
      '<path d="M532,162 L575,124 L618,162 Z" fill="' + C.r + '" stroke="#a52f2f" stroke-width="2"/>' +
      '<rect x="566" y="190" width="18" height="30" fill="#fff" stroke="#8a6000" stroke-width="1.5"/>';
    s += '<circle cx="710" cy="86" r="14" fill="#f6c343"/>';
    s += '<line x1="520" y1="220" x2="736" y2="220" stroke="#8b6" stroke-width="3"/>';
    // 나무 (장면 B 에서 사라짐)
    s += '<g><rect x="676" y="180" width="10" height="40" fill="#8a6000"/><circle cx="681" cy="166" r="24" fill="' + C.b + '"/>' +
      '<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;' + kt(10.1) + ';' + kt(10.12) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    // 장면 라벨
    s += '<g>' + txtL(522, 74, "장면 A", 13, "#222", B) + '<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;' + kt(10.1) + ';' + kt(10.12) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += '<g opacity="0">' + txtL(522, 74, "장면 B", 13, "#222", B) + on(10.3, D) + '</g>';
    // 가림막
    s += '<g opacity="0"><rect x="512" y="52" width="232" height="228" rx="8" fill="#555"/>' + txt(628, 172, "(잠깐 가림)", 13, "#fff", B) + show(9.7, 10.4, D) + '</g>';
    // 답과 정답
    s += '<g opacity="0">' + box(530, 232, 196, 32, "#ffd9d9", "#a52f2f") + txt(628, 253, "\"같은 장면인데요\" ✗", 13, "#a52f2f", B) +
      '<circle cx="681" cy="180" r="34" fill="none" stroke="' + C.r + '" stroke-width="2.5" stroke-dasharray="5 4"/>' +
      txt(681, 130, "나무가 사라짐", 12, C.r, B) + on(11, D) + '</g>';
    s += on(9, D) + '</g>';
    s += '<g opacity="0">' + txt(628, 302, "변화맹", 14, C.r, B) + on(11, D) + '</g>';
    s += '<g opacity="0">' + txt(628, 318, "(부주의적 맹시의 한 유형)", 11, C.muted) + on(11, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 344, "주의를 준 것만 의식에 들어온다 — 이름은 들리고(칵테일 파티), 지나간 사람·바뀐 장면은 놓친다", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
