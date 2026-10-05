// ============================================================
// object_permanence — 3장 p.10–11 대상 영속성과 유아 물리학
// 시간축(초): 0 장난감 → 1.5 천으로 가림 → 3 6개월 이전: 시선 돌림 / 이후: 천을 들춰 찾음
//   → 5 정의 → 7 유아 물리학: 가능한 사건 vs 불가능한 사건 → 9.5 응시 시간 비교 → 12 요점
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["object_permanence"] = {
  title: "대상 영속성 — 가려도 거기 있다는 걸 아는가 14초",
  desc: "장난감을 천으로 가리면 생후 6개월 이전 아기는 시선을 돌리고, 이후 아기는 천을 들춰 찾는다([[대상 영속성]]). 유아 물리학: 대상 영속성을 위배한 사건을 더 오래 응시한다 — [[감각 운동 단계]]",
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
    var s = '<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="대상 영속성 애니메이션">';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "아기 앞에 장난감 — 두 아기 모두 장난감을 본다"],
      [1.5, 3, "장난감을 천으로 가린다"],
      [3, 5, "6개월 이전: 시선을 돌린다 / 6개월 이후: 천을 들춰 찾는다"],
      [5, 7, "대상 영속성: 대상이 물리적으로 지각되지 않아도 존재함을 아는 것"],
      [7, 9.5, "유아 물리학: 가려진 공이 그대로 있는 사건 vs 사라진 사건"],
      [9.5, 12, "유아는 대상 영속성을 위배한 사물을 더 오래 응시한다"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "감각 운동 단계(출생~2세)에 형성 — 현대에는 점진적·연속적 발달로 본다", 14, "#222", B) + on(12, D) + '</g>';

    function baby(x) {
      return '<ellipse cx="' + (x + 58) + '" cy="182" rx="26" ry="20" fill="' + C.aL + '" stroke="' + C.a + '" stroke-width="2"/>' +
        '<circle cx="' + (x + 60) + '" cy="142" r="22" fill="#fde3cf" stroke="#c98a5a" stroke-width="2"/>' +
        '<circle cx="' + (x + 70) + '" cy="138" r="3" fill="#333"/>' +
        '<path d="M' + (x + 66) + ',152 q5,3 9,0" fill="none" stroke="#c98a5a" stroke-width="1.5"/>';
    }
    function panel(x, title) {
      return box(x, 48, 360, 170, "#fff", C.line) + txtL(x + 12, 68, title, 13, "#222", B) +
        '<line x1="' + (x + 10) + '" y1="202" x2="' + (x + 350) + '" y2="202" stroke="#ccc" stroke-width="2"/>' + baby(x) +
        '<circle cx="' + (x + 260) + '" cy="186" r="15" fill="' + C.r + '" stroke="#a52f2f" stroke-width="2"/>';
    }
    function cloth(x, lift) {
      // 위에서 떨어져 공을 덮음; lift 이면 3.5~4.5초에 다시 들림
      var vals = lift ? "0,-110;0,-110;0,0;0,0;0,-46;0,-46" : "0,-110;0,-110;0,0;0,0";
      var kts = lift ? '0;' + kt(1.5) + ';' + kt(2.4) + ';' + kt(3.5) + ';' + kt(4.3) + ';1' : '0;' + kt(1.5) + ';' + kt(2.4) + ';1';
      return '<g opacity="0"><g><path d="M' + (x + 232) + ',202 Q' + (x + 236) + ',160 ' + (x + 260) + ',158 Q' + (x + 284) + ',160 ' + (x + 288) + ',202 Z" fill="' + C.cL + '" stroke="#8a6000" stroke-width="2"/>' +
        '<animateTransform attributeName="transform" type="translate" values="' + vals + '" keyTimes="' + kts + '" dur="' + D + 's" fill="freeze"/></g>' +
        on(1.5, D) + '</g>';
    }
    // ---- 패널: 6개월 이전 ----
    var L = 14, R = 386;
    s += panel(L, "생후 6개월 이전");
    s += cloth(L, false);
    s += '<g><line x1="' + (L + 74) + '" y1="140" x2="' + (L + 244) + '" y2="182" stroke="' + C.a + '" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;' + kt(3.2) + ';' + kt(3.3) + ';1" dur="' + D + 's" fill="freeze"/></g>';
    s += '<g opacity="0"><line x1="' + (L + 74) + '" y1="136" x2="' + (L + 150) + '" y2="100" stroke="' + C.a + '" stroke-width="2" stroke-dasharray="5 4"/>' +
      txtL(L + 156, 104, "다른 곳을 봄", 12, C.a, B) + on(3.3, D) + '</g>';
    s += '<g opacity="0">' + box(L + 190, 56, 156, 26, "#ffd9d9", "#a52f2f") + txt(L + 268, 74, "대상 영속성 ✗", 13, "#a52f2f", B) + on(4.2, D) + '</g>';

    // ---- 패널: 6개월 이후 ----
    s += panel(R, "생후 6개월 이후");
    s += cloth(R, true);
    s += '<line x1="' + (R + 74) + '" y1="140" x2="' + (R + 244) + '" y2="182" stroke="' + C.a + '" stroke-width="2" stroke-dasharray="5 4"/>';
    s += '<g opacity="0"><path d="M' + (R + 80) + ',176 Q' + (R + 160) + ',160 ' + (R + 230) + ',150" fill="none" stroke="#c98a5a" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="' + (R + 232) + '" cy="150" r="7" fill="#fde3cf" stroke="#c98a5a" stroke-width="2"/>' + show(3, 5, D) + '</g>';
    s += '<g opacity="0">' + box(R + 190, 56, 156, 26, "#cdefd2", "#1d6b2a") + txt(R + 268, 74, "대상 영속성 ✓", 13, "#1d6b2a", B) + on(4.2, D) + '</g>';
    s += '<g opacity="0">' + txtL(R + 100, 100, "천을 들춰 찾음", 12, C.b, B) + on(3.5, D) + '</g>';

    // ---- 아래: 유아 물리학 ----
    s += '<g opacity="0">' + box(14, 228, 732, 102, "#fff", C.line) +
      txtL(26, 248, "유아 물리학", 13, C.n, B) + txtL(110, 248, "(Shuarwairi &amp; Johnson, 2013)", 11, C.muted) +
      // 가능한 사건
      txt(110, 320, "가능한 사건", 12, C.b, B) +
      '<line x1="40" y1="300" x2="180" y2="300" stroke="#ccc" stroke-width="2"/>' +
      '<circle cx="110" cy="286" r="12" fill="' + C.r + '" stroke="#a52f2f" stroke-width="2"/>' +
      // 불가능한 사건
      txt(290, 320, "불가능한 사건", 12, C.r, B) +
      '<line x1="220" y1="300" x2="360" y2="300" stroke="#ccc" stroke-width="2"/>' +
      on(7, D) + '</g>';
    // 불가능: 공이 사라짐 (가림막 뒤에서)
    s += '<g opacity="0"><circle cx="290" cy="286" r="12" fill="' + C.r + '" stroke="#a52f2f" stroke-width="2"/>' + show(7, 8.2, D) + '</g>';
    s += '<g opacity="0">' + txt(290, 290, "뿅! (없음)", 13, C.r, B) + on(8.9, D) + '</g>';
    // 가림막 (둘 다 7.6 에 올라왔다가 8.6 에 내려감)
    [110, 290].forEach(function (cx) {
      s += '<g opacity="0"><rect x="' + (cx - 30) + '" y="262" width="60" height="38" fill="#999" stroke="#555" stroke-width="1.5">' +
        '<animate attributeName="height" values="38;38;0;0" keyTimes="0;' + kt(8.4) + ';' + kt(8.9) + ';1" dur="' + D + 's" fill="freeze"/>' +
        '<animate attributeName="y" values="262;262;300;300" keyTimes="0;' + kt(8.4) + ';' + kt(8.9) + ';1" dur="' + D + 's" fill="freeze"/></rect>' +
        show(7.6, 9.2, D) + '</g>';
    });
    // 응시 시간 막대
    s += '<g opacity="0">' + txtL(400, 248, "응시 시간", 13, "#222", B) +
      txtL(400, 278, "가능한 사건", 12, C.b, B) + txtL(400, 308, "불가능한 사건", 12, C.r, B) + on(9.5, D) + '</g>';
    s += '<rect x="490" y="267" width="0" height="16" fill="' + C.b + '"><animate attributeName="width" values="0;0;80;80" keyTimes="0;' + kt(9.6) + ';' + kt(10.4) + ';1" dur="' + D + 's" fill="freeze"/></rect>';
    s += '<rect x="490" y="297" width="0" height="16" fill="' + C.r + '"><animate attributeName="width" values="0;0;220;220" keyTimes="0;' + kt(9.6) + ';' + kt(11) + ';1" dur="' + D + 's" fill="freeze"/></rect>';
    s += '<g opacity="0">' + txtL(590, 280, "짧게 봄", 12, C.b) + txtL(600, 248, "→ 더 오래 응시 = 놀람", 12, C.r, B) + on(11, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 350, "대상 영속성 = 안 보여도 존재함을 아는 것 — 생후 6개월 이후 형성(감각 운동 단계)", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
