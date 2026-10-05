// ============================================================
// split_brain — 2장 p.29–30 분할 뇌 실험(Gazzaniga) + 4장 p.25 슬라이드 오류 교정
// 시간축(초): 0 응시점 → 1.5 HE(좌시야)·ART(우시야) 제시 → 3.5 좌시야→우반구, 우시야→좌반구
//   → 5.5 뇌량 절단 ✂ → 7 "무엇을 보았나?" → "ART"(좌반구 언어) → 9.5 왼손이 HE 를 가리킴(우반구) → 11.5 요점
// 위에서 내려다본 그림: 화면이 위, 사람의 왼쪽이 그림의 왼쪽.
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["split_brain"] = {
  title: "분할 뇌 실험 — 좌시야는 우반구로, 우시야는 좌반구로 13초",
  desc: "[[뇌량]]이 끊어진 환자에게 HE•ART 를 응시점 기준으로 나눠 제시: 말로는 우시야의 ART(좌반구=언어)만 보고하고, 왼손으로는 좌시야의 HE(우반구)를 가리킨다 — [[분할 뇌]], 기능의 편재화. 4장 p.25 의 '우시야→우반구' 는 슬라이드 오류",
  duration: 13,
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
    var D = 13;
    var B = ' font-weight="700"';
    function kt(t) { return (t / D).toFixed(4); }
    var s = '<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="분할 뇌 실험 애니메이션">';
    s += '<defs><marker id="sb_arrowA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.a + '"/></marker>' +
      '<marker id="sb_arrowC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.c + '"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "뇌량이 끊어진 환자에게 \"가운데 점을 응시하세요\""],
      [1.5, 3.5, "점을 기준으로 단어를 잘라 제시: HE 는 좌시야, ART 는 우시야"],
      [3.5, 5.5, "좌시야 → 우반구, 우시야 → 좌반구 (반대쪽 반구로 전달)"],
      [5.5, 7, "뇌량(Corpus Callosum) 절단 → 두 반구가 정보를 공유하지 못함"],
      [7, 9.5, "\"무슨 단어를 보았나요?\" → \"ART\" — 말(언어)은 좌반구 담당"],
      [9.5, 11.5, "\"본 단어를 왼손으로 가리키세요\" → HE — 왼손은 우반구가 조종"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "좌시야→우반구, 우시야→좌반구 — 좌우반구의 기능 차이(기능의 편재화)", 14, "#222", B) + on(11.5, D) + '</g>';

    // ---- 화면 ----
    s += box(250, 46, 260, 54, "#fff", "#555");
    s += '<circle cx="380" cy="73" r="4" fill="' + C.r + '"/>';
    s += '<g opacity="0">' + txt(330, 81, "HE", 24, C.c, B) + txt(436, 81, "ART", 24, C.a, B) + on(1.5, D) + '</g>';
    s += txt(300, 118, "좌시야", 12, C.c, B) + txt(460, 118, "우시야", 12, C.a, B);
    s += '<line x1="380" y1="100" x2="380" y2="122" stroke="#bbb" stroke-dasharray="3 3"/>';

    // ---- 눈 + 뇌 (위에서 본 모습) ----
    s += '<ellipse cx="362" cy="152" rx="9" ry="6" fill="#fff" stroke="#555" stroke-width="1.5"/><circle cx="362" cy="152" r="3" fill="#555"/>';
    s += '<ellipse cx="398" cy="152" rx="9" ry="6" fill="#fff" stroke="#555" stroke-width="1.5"/><circle cx="398" cy="152" r="3" fill="#555"/>';
    s += '<ellipse cx="342" cy="232" rx="36" ry="54" fill="' + C.aL + '" stroke="' + C.a + '" stroke-width="2.5"/>';
    s += '<ellipse cx="418" cy="232" rx="36" ry="54" fill="' + C.cL + '" stroke="' + C.c + '" stroke-width="2.5"/>';
    s += txt(336, 300, "좌반구", 13, C.a, B) + txt(424, 300, "우반구", 13, "#8a6000", B);
    s += txt(336, 316, "(언어)", 11, C.a) + txt(424, 316, "(왼손 조종)", 11, "#8a6000");
    // 뇌량
    s += '<rect x="372" y="208" width="16" height="48" rx="4" fill="' + C.nL + '" stroke="' + C.n + '" stroke-width="2"/>';

    // ---- 시각 경로 (교차) ----
    // 좌시야 HE → 우반구 (주황), 우시야 ART → 좌반구 (파랑)
    s += '<path d="M330,90 L362,152 L414,214" fill="none" stroke="' + C.c + '" stroke-width="3" stroke-dasharray="150" stroke-dashoffset="150" marker-end="url(#sb_arrowC)">' +
      '<animate attributeName="stroke-dashoffset" values="150;150;0;0" keyTimes="0;' + kt(3.5) + ';' + kt(4.6) + ';1" dur="' + D + 's" fill="freeze"/></path>';
    s += '<path d="M436,90 L398,152 L346,214" fill="none" stroke="' + C.a + '" stroke-width="3" stroke-dasharray="150" stroke-dashoffset="150" marker-end="url(#sb_arrowA)">' +
      '<animate attributeName="stroke-dashoffset" values="150;150;0;0" keyTimes="0;' + kt(3.5) + ';' + kt(4.6) + ';1" dur="' + D + 's" fill="freeze"/></path>';
    // 반구 안의 단어
    s += '<g opacity="0">' + txt(342, 244, "ART", 15, C.a, B) + txt(418, 244, "HE", 15, "#8a6000", B) + on(4.6, D) + '</g>';
    s += '<g opacity="0">' + txtL(150, 160, "좌시야 → 우반구", 13, "#8a6000", B) + txtL(150, 180, "우시야 → 좌반구", 13, C.a, B) +
      box(140, 140, 136, 50, "none", "#bbb") + on(4.6, D) + '</g>';

    // ---- 뇌량 절단 ----
    s += '<g opacity="0"><line x1="364" y1="232" x2="396" y2="232" stroke="' + C.r + '" stroke-width="4"/>' +
      txt(380, 202, "✂", 18, C.r, B) + '<rect x="364" y="226" width="32" height="12" fill="none" stroke="' + C.r + '" stroke-width="0"/>' +
      on(5.5, D) + '</g>';
    s += '<g opacity="0">' + txtL(462, 210, "뇌량 절단 ✗", 13, C.r, B) + txtL(462, 228, "정보 공유 불가", 12, C.r) +
      '<line x1="458" y1="214" x2="392" y2="228" stroke="' + C.r + '" stroke-width="1.5"/>' + on(5.5, D) + '</g>';

    // ---- 말로 보고: ART ----
    s += '<g opacity="0">' + box(170, 214, 112, 44, "#fff", C.a) + txt(226, 242, "\"ART\"", 18, C.a, B) +
      '<path d="M282,236 L306,236" stroke="' + C.a + '" stroke-width="2.5"/>' +
      txt(226, 276, "말로 보고", 12, C.a, B) + on(7, D) + '</g>';

    // ---- 왼손이 HE 를 가리킴 ----
    s += '<g opacity="0"><path d="M454,250 C492,300 476,350 390,350 L276,334" fill="none" stroke="' + C.c + '" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#sb_arrowC)"/>' +
      '<path d="M250,320 l-22,0 q-6,0 -6,6 q0,6 6,6 l22,0 l0,8 l20,0 l0,-20 z" fill="' + C.cL + '" stroke="#8a6000" stroke-width="1.8"/>' +
      txt(248, 312, "왼손", 12, "#8a6000", B) +
      box(140, 312, 66, 30, "#fff", C.c) + txt(173, 333, "HE", 16, "#8a6000", B) +
      on(9.5, D) + '</g>';

    // ---- 오른쪽: 좌우반구 기능 차이 ----
    s += '<g opacity="0">' + box(560, 140, 188, 150, "#fff", C.line) +
      txt(654, 162, "좌우반구의 기능 차이", 13, "#222", B) +
      txtL(572, 188, "좌반구", 13, C.a, B) + txtL(572, 206, "언어 정보 처리, 수학 계산", 12, "#222") +
      txtL(572, 236, "우반구", 13, "#8a6000", B) + txtL(572, 254, "추론, 자기 자신에 대한 자각,", 12, "#222") +
      txtL(572, 272, "말하기 조율", 12, "#222") + on(7, D) + '</g>';

    // ---- 슬라이드 오류 경고 ----
    s += '<g opacity="0">' + box(560, 300, 188, 44, "#ffd9d9", "#a52f2f") +
      txt(654, 318, "⚠ 4장 p.25 '우시야→우반구'", 12, "#a52f2f", B) + txt(654, 336, "는 오류 → 우시야→좌반구", 12, "#a52f2f", B) +
      on(11.5, D) + '</g>';

    // ---- 요점 ----
    s += '<g>' + txtL(560, 70, "Gazzaniga 분할 뇌 실험", 13, C.n, B) + txtL(560, 90, "(2장 p.29–30)", 12, C.muted) + '</g>';
    s += txt(380, 372, "말은 좌반구(우시야의 ART), 왼손은 우반구(좌시야의 HE) — 뇌량이 끊기면 두 반구가 서로 모른다", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
