// ============================================================
// emotion_roads — 8장 p.32 정서의 이원화된 신경 회로 (Ochsner et al., 2009; LeDoux & Brown, 2017)
// 시간축(초): 0 공포 자극 → 시상 · 2 두 신호 출발 → 3.5 아랫길 신호가 편도체 도착 → 4 신체 "움찔"
//   → 4.5–6 윗길 신호가 피질에서 분석·명명 → 7.5 편도체 도착 → 8.5 "막대기다" 판단·의식적 경험 → 10 요점 유지
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["emotion_roads"] = {
  title: "정서의 신경 회로 — 빠른 아랫길과 신중한 윗길 12초",
  desc: "같은 공포 자극이 [[시상]]에서 두 길로 갈라진다. '''빠른 아랫길'''(시상 → [[편도체]])은 피질을 건너뛰어 먼저 몸을 움직이고, '''신중한 윗길'''(시상 → 두뇌 피질 → 편도체 → 신체)은 늦게 도착하지만 자극을 분석·명명한다 → [[정서의 신경 회로]]",
  duration: 12,
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
    var D = 12;
    var B = ' font-weight="700"';
    var s = '<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="정서의 신경 회로 윗길과 아랫길 애니메이션">';
    s += '<defs><marker id="er_arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.r + '"/></marker>' +
      '<marker id="er_arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.a + '"/></marker>' +
      '<marker id="er_arrowG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 2, "공포 자극(뱀 같은 것)이 들어온다 — 정보는 먼저 시상으로"],
      [2, 4.5, "빠른 아랫길: 시상 → 편도체 — 피질을 건너뛰어 즉각 반응 (움찔!)"],
      [4.5, 7.5, "신중한 윗길: 시상 → 두뇌 피질 — 자극을 분석하고 명명한다"],
      [7.5, 10, "피질의 판단이 편도체 → 신체로 전달 — 의식적 경험은 그 뒤에"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "아랫길 = 빠르지만 의식 못 할 수 있음 · 윗길 = 느리지만 신중(복잡한 감정)", 14, "#222", B) + on(10, D) + '</g>';

    // ---- 상자들 ----
    s += box(20, 150, 130, 56, C.rL, C.r) + txt(85, 174, "🐍? 공포 자극", 13, "#a52f2f", B) + txt(85, 193, "뱀 같은 것", 11, "#a52f2f");
    s += box(200, 150, 110, 56, C.nL, C.n) + txt(255, 183, "시상", 15, C.n, B);
    s += box(330, 50, 200, 66, C.aL, C.a) + txt(430, 76, "두뇌 피질 (감각피질·전전두엽)", 12, C.a, B) + txt(430, 96, "분석 · 명명", 12, C.a);
    s += box(560, 150, 110, 56, C.nL, C.n) + txt(615, 183, "편도체", 15, C.n, B);
    s += box(560, 236, 170, 44, C.bL, C.b) + txt(645, 263, "신체 반응", 13, "#1d6b2a", B);

    // ---- 경로 ----
    s += '<line x1="152" y1="178" x2="196" y2="178" stroke="#555" stroke-width="2.5" marker-end="url(#er_arrowG)"/>';
    s += '<line x1="312" y1="192" x2="556" y2="192" stroke="' + C.r + '" stroke-width="3" marker-end="url(#er_arrowR)"/>';
    s += txt(434, 214, "빠른 아랫길 (피질 우회)", 13, C.r, B);
    s += '<path d="M270,150 L430,116 L590,150" fill="none" stroke="' + C.a + '" stroke-width="3" stroke-dasharray="7 5" marker-end="url(#er_arrowB)"/>';
    s += txt(300, 124, "신중한 윗길", 13, C.a, B);
    s += '<line x1="615" y1="208" x2="630" y2="232" stroke="#555" stroke-width="2.5" marker-end="url(#er_arrowG)"/>';

    // ---- 신호 점: 자극 → 시상 ----
    s += '<circle r="7" fill="#555" opacity="0"><animateMotion path="M150,178 L200,178" dur="' + D + 's" keyPoints="0;0;1;1" keyTimes="0;0.0667;0.1667;1" calcMode="linear" fill="freeze"/>' + show(0.8, 2.0, D) + '</circle>';
    // 아랫길 점 (빠름): 2 → 3.5
    s += '<circle r="8" fill="' + C.r + '" opacity="0"><animateMotion path="M310,192 L560,192" dur="' + D + 's" keyPoints="0;0;1;1" keyTimes="0;0.1667;0.2917;1" calcMode="linear" fill="freeze"/>' + show(2.0, 3.6, D) + '</circle>';
    // 윗길 점 (느림, 피질에서 멈춤): 2 → 4.5 피질 도착, 6 까지 분석, 7.5 편도체 도착
    s += '<circle r="8" fill="' + C.a + '" opacity="0"><animateMotion path="M270,150 L430,116 L590,150" dur="' + D + 's" keyPoints="0;0;0.5;0.5;1;1" keyTimes="0;0.1667;0.375;0.5;0.625;1" calcMode="linear" fill="freeze"/>' + show(2.0, 7.6, D) + '</circle>';

    // ---- 결과 표시 ----
    s += '<g opacity="0">' + box(560, 112, 110, 30, "#ffd9d9", "#a52f2f") + txt(615, 132, "① 먼저 도착", 12, "#a52f2f", B) + on(3.5, D) + '</g>';
    s += '<g opacity="0">' + txt(645, 302, "움찔! 몸부터 피함 (의식 전)", 13, "#1d6b2a", B) + on(4.0, D) + '</g>';
    s += '<g opacity="0">' + box(540, 56, 210, 44, "#fdeec2", "#8a6000") + txt(645, 76, "\"다시 보니 막대기다\"", 13, "#8a6000", B) + on(4.6, D) + '</g>';
    s += '<g opacity="0">' + txt(645, 93, "분석·명명 중…", 11, "#8a6000") + show(4.6, 7.6, D) + '</g>';
    s += '<g opacity="0">' + txt(645, 93, "판단 완료 → 편도체로", 11, "#8a6000") + on(7.6, D) + '</g>';
    s += '<g opacity="0">' + box(20, 236, 260, 62, "#cdefd2", "#1d6b2a") + txt(150, 260, "② 윗길 도착 → 의식적 판단", 13, "#1d6b2a", B) +
      txt(150, 282, "안도 (복잡한 감정은 이 길로)", 12, "#1d6b2a") + on(7.6, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 334, "두 길 모두 시상에서 출발해 편도체를 거친다 — 차이는 대뇌 피질을 거치느냐(윗길) 건너뛰느냐(아랫길)", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
