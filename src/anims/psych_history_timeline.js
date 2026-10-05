// ============================================================
// psych_history_timeline — 서막 p.8–15 심리학의 역사 연표
// 시간축(초): 0 빈 연표 → 1.5 분트·구조주의(반응 0.1 vs 0.2초) → 3.5 제임스·기능주의
//   → 5 행동주의 → 6.5 정신분석·인본주의 → 8 인지혁명(컴퓨터 메타포) → 9.5 인지신경과학 → 11 요점
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["psych_history_timeline"] = {
  title: "심리학의 역사 — 마음에서 행동으로, 다시 마음(+뇌)으로 13초",
  desc: "1879 [[빌헬름 분트]]의 실험실([[구조주의]]·[[내성법]]) → [[윌리엄 제임스]]의 [[기능주의]] → [[행동주의]](관찰 가능한 행동만) ∥ [[정신분석]]·[[인본주의 심리학]] → 1960년대 [[인지혁명]]([[컴퓨터 메타포]]) → [[인지신경과학]]",
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
    var s = '<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="심리학의 역사 연표 애니메이션">';
    s += '<defs><marker id="ph_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "심리학의 역사 — 마음을 과학으로 연구하기까지"],
      [1.5, 3.5, "1879 분트의 최초 실험실 → 구조주의: 내성법(introspection)으로 마음의 구성 요소 분리"],
      [3.5, 5, "기능주의(윌리엄 제임스): 다윈의 영향 — 마음 = 생존을 위한 적응적 기능"],
      [5, 6.5, "행동주의(왓슨·스키너): 심리학은 '관찰 가능한' 행동의 과학이어야 한다"],
      [6.5, 8, "같은 시기 정신분석(프로이트: 무의식) ∥ 인본주의(로저스·매슬로: 자아실현)"],
      [8, 9.5, "1960년대 인지혁명: 컴퓨터 메타포(정보 처리 접근) — 마음으로의 회귀"],
      [9.5, 11, "인지심리학 + 뇌과학 → 인지신경과학 (뇌전도·뇌영상으로 연구)"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "연구 대상의 흐름: 마음 → 행동 → 다시 마음(+뇌)", 14, "#222", B) + on(11, D) + '</g>';

    // ---- 연표 축 ----
    s += '<line x1="20" y1="184" x2="740" y2="184" stroke="' + C.line + '" stroke-width="4" marker-end="url(#ph_arrow)"/>';
    var ticks = [[85, "1879"], [235, "1890년대"], [385, "1910~50년대"], [535, "1960년대"], [685, "현재"]];
    ticks.forEach(function (t) {
      s += '<circle cx="' + t[0] + '" cy="184" r="5" fill="#fff" stroke="#555" stroke-width="2"/>';
      s += txt(t[0], 202, t[1], 11, C.muted);
    });

    // ---- 위쪽 카드: 주류 흐름 ----
    // [cx, 제목, 영어, 학자, 줄1, 줄2, 대상, 색, 연한색, 등장]
    var cards = [
      [85, "구조주의", "Structuralism", "분트·티치너", "내성법(introspection)", "구성 요소로 분리", "마음", C.n, C.nL, 1.5],
      [235, "기능주의", "Functionalism", "윌리엄 제임스", "다윈 진화론의 영향", "적응적 기능", "마음", C.n, C.nL, 3.5],
      [385, "행동주의", "Behaviorism", "왓슨·스키너", "'관찰 가능한' 행동만", "고전적·조작적 조건화", "행동", C.b, C.bL, 5],
      [535, "인지혁명", "Cognitive Revolution", "1960년대", "컴퓨터 메타포", "정보 처리 접근", "마음", C.n, C.nL, 8],
      [685, "인지신경과학", "Cognitive Neuroscience", "인지심리학+뇌과학", "뇌전도·뇌영상", "생물학적 접근", "마음+뇌", C.n, C.nL, 9.5]
    ];
    cards.forEach(function (k) {
      var x = k[0] - 68;
      s += '<g opacity="0">' + box(x, 44, 136, 122, k[8], k[7]) +
        txt(k[0], 64, k[1], 14, k[7], B) + txt(k[0], 79, k[2], 11, C.muted) +
        txt(k[0], 98, k[3], 12, "#222", B) + txt(k[0], 116, k[4], 11, "#222") + txt(k[0], 132, k[5], 11, "#222") +
        box(k[0] - 34, 140, 68, 18, "#fff", k[7]) + txt(k[0], 153, "대상: " + k[6], 11, k[7], B) +
        '<line x1="' + k[0] + '" y1="166" x2="' + k[0] + '" y2="179" stroke="' + k[7] + '" stroke-width="2"/>' +
        on(k[9], D) + '</g>';
    });

    // ---- 아래: 분트 반응 시간 실험 ----
    s += '<g opacity="0">' + box(17, 214, 136, 104, "#fff", C.c) +
      txt(85, 232, "분트의 반응 시간 실험", 11, C.c, B) +
      txtL(26, 252, "① 듣자마자 누름", 11, "#222") +
      txtL(26, 284, "② 자각한 뒤 누름", 11, "#222") +
      '<rect x="26" y="258" width="0" height="10" fill="' + C.a + '"><animate attributeName="width" values="0;0;50;50" keyTimes="0;0.13;0.2;1" dur="' + D + 's" fill="freeze"/></rect>' +
      '<rect x="26" y="290" width="0" height="10" fill="' + C.n + '"><animate attributeName="width" values="0;0;70;70" keyTimes="0;0.13;0.25;1" dur="' + D + 's" fill="freeze"/></rect>' +
      '<g opacity="0">' + txtL(82, 267, "0.1초", 11, C.a, B) + on(2.6, D) + '</g>' +
      '<g opacity="0">' + txtL(102, 299, "0.2초", 11, C.n, B) + on(3.2, D) + '</g>' +
      txt(85, 314, "(Hunt, 1993)", 11, C.muted) +
      on(1.5, D) + '</g>';

    // ---- 아래: 정신분석 ∥ 인본주의 (행동주의와 같은 시기) ----
    s += '<g opacity="0">' + box(170, 214, 140, 104, C.rL, C.r) +
      txt(240, 234, "정신분석", 14, C.r, B) + txt(240, 252, "프로이트", 12, "#222", B) +
      txt(240, 272, "무의식적 사고·아동기 경험", 11, "#222") + txt(240, 290, "방어 기제", 11, "#222") +
      txt(240, 308, "대상: 무의식", 11, C.r, B) + on(6.5, D) + '</g>';
    s += '<g opacity="0">' + box(320, 214, 140, 104, C.cL, C.c) +
      txt(390, 234, "인본주의 심리학", 14, "#8a6000", B) + txt(390, 252, "로저스·매슬로", 12, "#222", B) +
      txt(390, 272, "정신분석·행동주의 비판", 11, "#222") + txt(390, 290, "자아실현·성장 잠재력", 11, "#222") +
      txt(390, 308, "대상: 주체적 인간", 11, "#8a6000", B) + on(6.9, D) + '</g>';

    // ---- 아래: 컴퓨터 메타포 입력→처리→산출 ----
    s += '<g opacity="0">' + box(478, 214, 270, 104, C.nL, C.n) +
      txt(613, 234, "컴퓨터 메타포 (Computer Metaphor)", 12, C.n, B) +
      box(492, 250, 66, 36, C.aL, C.a) + txt(525, 273, "입력", 13, C.a, B) +
      box(580, 250, 66, 36, "#fff", C.n) + txt(613, 273, "처리", 13, C.n, B) +
      box(668, 250, 66, 36, C.bL, C.b) + txt(701, 273, "산출", 13, C.b, B) +
      '<line x1="558" y1="268" x2="578" y2="268" stroke="#555" stroke-width="2" marker-end="url(#ph_arrow)"/>' +
      '<line x1="646" y1="268" x2="666" y2="268" stroke="#555" stroke-width="2" marker-end="url(#ph_arrow)"/>' +
      txt(525, 304, "외부 정보", 11, C.muted) + txt(613, 304, "주의·기억·계획", 11, C.muted) + txt(701, 304, "행동 반응", 11, C.muted) +
      on(8, D) + '</g>';
    // 정보 흐름 점
    s += '<circle r="5" fill="' + C.a + '" opacity="0"><animateMotion begin="8.3s" dur="1.2s" repeatCount="3" path="M500,256 L725,256"/>' +
      '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.64;0.65;0.98;0.99;1" dur="' + D + 's" fill="freeze"/></circle>';

    // ---- 마지막: 마음 → 행동 → 마음(+뇌) 곡선 ----
    s += '<g opacity="0"><path d="M85,40 Q235,34 385,40 Q535,34 685,40" fill="none" stroke="' + C.c + '" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#ph_arrow)"/>' + on(11, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 346, "마음(구조·기능주의) → 행동(행동주의) → 다시 마음(인지혁명) + 뇌(인지신경과학)", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
