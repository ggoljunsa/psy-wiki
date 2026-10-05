// ============================================================
// transduction_vision — 빛이 신경 신호가 되어 시각 피질까지 (4장 p.3, 20–25)
// 시간축(초): 0 빛(파장·진폭) → 2 동공·수정체 굴절, 거꾸로 맺힌 상 → 4 망막 확대(원추체·간상체)
//   → 6.5 변환: 광수용기 → 양극세포 → 시신경 → 8.5 맹점·시상·후두엽 시각 피질 → 11 정리 → 13 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["transduction_vision"] = {
  title: "시각의 변환 — 빛이 시각 피질에 닿기까지 13초",
  desc: "빛 에너지 → [[눈의 구조|동공·수정체]] 굴절 → 망막에 거꾸로 맺힌 상 → 중심와 [[원추체와 간상체|원추체]](색·세부, 핫라인) / 주변 간상체(명암, 합산) → 양극세포 → 시신경(맹점) → 시상 → 후두엽 시각 피질. '''[[변환]]''' = 수용 → 신경 신호 → 뇌로 전달",
  duration: 13,
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
    // 강조 테두리가 [from,to] 동안 굵어짐
    function glow(from, to, dur) {
      return '<animate attributeName="stroke-width" values="2;2;4;4;2;2" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';' + (to / dur) + ';' + Math.min(1, to / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function wave(x0, y0, len, wl, amp) {
      var d = "M" + x0 + "," + y0, hw = wl / 2, sgn = -1;
      for (var x = 0; x + hw <= len + 0.01; x += hw) { d += " q" + (hw / 2) + "," + (sgn * amp * 2) + " " + hw + ",0"; sgn = -sgn; }
      return d;
    }
    var D = 13;
    var s = '<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="시각 정보의 변환 애니메이션">';
    s += '<defs><marker id="tv_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker>' +
      '<marker id="tv_arrowC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.c + '"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 2, "빛 에너지: 장파장(=저주파)=붉은색, 단파장(=고주파)=푸른색, 진폭이 크면 밝다"],
      [2, 4, "① 동공으로 들어온 빛을 수정체가 굴절 → 망막에 상이 뒤집힌 형태로 맺힘"],
      [4, 6.5, "② 망막의 광수용기: 중심와엔 원추체(색상·세부), 주변엔 간상체(명암)"],
      [6.5, 8.5, "③ 변환(Transduction): 광수용기가 빛을 신경 신호로 → 양극세포 → 시신경"],
      [8.5, 11, "④ 시신경이 빠져나가는 자리 = 맹점 → 시상 → 후두엽의 시각 피질"],
      [11, 13, "수용기가 수용 → 신경 활동(전기/화학)으로 전환 → 두뇌로 전달"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 빛 패널 (왼쪽 위) ----
    s += '<g>' + box(14, 44, 200, 82, "#fff", "#ccc") + glow(0, 2, D) + '</g>';
    s += '<path d="' + wave(24, 66, 100, 50, 7) + '" fill="none" stroke="' + C.r + '" stroke-width="2.5"/>';
    s += txt(170, 70, "장파장=붉은색", 11, C.r, ' font-weight="700"');
    s += '<path d="' + wave(24, 98, 100, 20, 7) + '" fill="none" stroke="' + C.a + '" stroke-width="2.5"/>';
    s += txt(170, 102, "단파장=푸른색", 11, C.a, ' font-weight="700"');
    s += txt(114, 120, "진폭 큼=밝다 · 진폭 작음=어둡다", 10.5, C.m);

    // ---- 물체 (반사된 빛) ----
    s += '<line x1="120" y1="222" x2="120" y2="172" stroke="' + C.c + '" stroke-width="4" marker-end="url(#tv_arrowC)"/>';
    s += txt(120, 245, "물체", 12, C.c, ' font-weight="700"');
    s += txt(120, 260, "(빛을 반사)", 10.5, C.m);

    // ---- 눈 단면 ----
    s += '<circle cx="290" cy="195" r="75" fill="#fff" stroke="' + C.n + '" stroke-width="2"/>';
    // 망막 (오른쪽 호)
    s += '<g><path d="M327.5,130 A75,75 0 0 1 327.5,260" fill="none" stroke="' + C.n + '" stroke-width="6" opacity="0.55"/>' + glow(4, 6.5, D) + '</g>';
    // 홍채·동공
    s += '<line x1="218" y1="160" x2="218" y2="181" stroke="' + C.n + '" stroke-width="4"/><line x1="218" y1="209" x2="218" y2="230" stroke="' + C.n + '" stroke-width="4"/>';
    s += '<g><ellipse cx="226" cy="195" rx="7" ry="20" fill="' + C.aL + '" stroke="' + C.a + '" stroke-width="2"/>' + glow(2, 4, D) + '</g>';
    s += txt(196, 156, "동공", 11, C.m);
    s += txt(240, 238, "수정체", 11, C.a);
    s += txt(306, 160, "망막", 11, C.n);
    // 중심와 표시
    s += '<circle cx="365" cy="195" r="4" fill="' + C.c + '"/>';
    s += txt(395, 212, "중심와", 10.5, C.c, ' font-weight="700"');
    // 시신경 (맹점에서 나감)
    s += '<g><path d="M356,229 C380,245 400,262 420,272" fill="none" stroke="' + C.n + '" stroke-width="5"/>' + glow(8.5, 11, D) + '</g>';
    s += '<g opacity="0">' + txt(398, 244, "맹점", 12, C.r, ' font-weight="700"') +
      '<circle cx="357" cy="228" r="6" fill="none" stroke="' + C.r + '" stroke-width="2"/>' + show(8.5, 13, D) + '</g>';

    // ---- 광선 (굴절) ----
    s += '<g opacity="0"><path d="M120,172 L226,195 L355,232" fill="none" stroke="' + C.c + '" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      '<path d="M120,222 L226,195 L355,160" fill="none" stroke="' + C.c + '" stroke-width="1.5" stroke-dasharray="4 3"/>' + show(2, 13, D) + '</g>';
    // 망막에 거꾸로 맺힌 상
    s += '<g opacity="0"><line x1="349" y1="162" x2="349" y2="222" stroke="' + C.c + '" stroke-width="4" marker-end="url(#tv_arrowC)"/>' +
      txt(282, 112, "상이 뒤집힘", 11, C.c, ' font-weight="700"') + show(3, 13, D) + '</g>';
    // 빛 알갱이가 눈으로 들어옴
    s += '<circle r="5" fill="' + C.c + '" opacity="0"><animateMotion begin="1.5s" dur="1.5s" fill="freeze" path="M120,172 L226,195 L349,226"/>' + show(1.5, 3, D) + '</circle>';

    // ---- 망막 확대 패널 ----
    s += '<g opacity="0">';
    s += '<path d="M367,192 L430,120" fill="none" stroke="#aaa" stroke-width="1.5" stroke-dasharray="3 3"/>';
    s += box(430, 46, 316, 186, "#fff", C.n);
    s += txt(588, 64, "망막 확대 (빛 → 신경 신호)", 12, C.n, ' font-weight="700"');
    // 간상체 (왼쪽 · 오른쪽 주변)
    [[450, 470, 490], [686, 706, 726]].forEach(function (g, gi) {
      var bx = (g[0] + g[2]) / 2;
      g.forEach(function (x) {
        s += '<rect x="' + (x - 4) + '" y="84" width="8" height="26" rx="3" fill="' + C.nL + '" stroke="' + C.n + '" stroke-width="1.5"/>';
        s += '<line x1="' + x + '" y1="110" x2="' + bx + '" y2="150" stroke="' + C.n + '" stroke-width="1.5"/>';
      });
      s += '<circle cx="' + bx + '" cy="156" r="7" fill="#fff" stroke="' + C.m + '" stroke-width="1.5"/>';
      s += '<line x1="' + bx + '" y1="163" x2="' + bx + '" y2="200" stroke="' + C.n + '" stroke-width="2"/>';
      s += txt(bx, 132, "합산", 10.5, C.n, ' font-weight="700" stroke="#fff" stroke-width="4" paint-order="stroke"');
    });
    s += txt(470, 80, "간상체", 11, C.n, ' font-weight="700"');
    s += txt(706, 80, "간상체", 11, C.n, ' font-weight="700"');
    // 원추체 (가운데 · 중심와)
    [558, 588, 618].forEach(function (x) {
      s += '<path d="M' + (x - 7) + ',84 L' + (x + 7) + ',84 L' + x + ',110 z" fill="' + C.aL + '" stroke="' + C.a + '" stroke-width="1.5"/>';
      s += '<line x1="' + x + '" y1="110" x2="' + x + '" y2="149" stroke="' + C.a + '" stroke-width="1.5"/>';
      s += '<circle cx="' + x + '" cy="156" r="7" fill="#fff" stroke="' + C.m + '" stroke-width="1.5"/>';
      s += '<line x1="' + x + '" y1="163" x2="' + x + '" y2="200" stroke="' + C.a + '" stroke-width="2"/>';
    });
    s += txt(588, 80, "원추체 (중심와)", 11, C.a, ' font-weight="700"');
    s += txt(588, 132, "1:1 핫라인", 10.5, C.a, ' font-weight="700" stroke="#fff" stroke-width="4" paint-order="stroke"');
    s += txt(522, 160, "양극세포", 10.5, C.m);
    s += '<line x1="470" y1="200" x2="706" y2="200" stroke="' + C.n + '" stroke-width="3"/>';
    s += txt(588, 216, "시신경 (빛 에너지 → 신경 신호)", 11, C.n);
    s += txt(470, 226, "명암·석양 무렵", 10, C.m);
    s += txt(706, 226, "명암·석양 무렵", 10, C.m);
    s += show(4, 13, D) + '</g>';

    // ③ 신호 펄스: 광수용기 → 양극세포 → 시신경
    [[470, "M450,100 L470,150 L470,200 L540,200"], [588, "M588,100 L588,200 L620,200"], [558, "M558,100 L558,200"], [618, "M618,100 L618,200"], [706, "M726,100 L706,150 L706,200 L640,200"]].forEach(function (p, i) {
      s += '<circle r="5" fill="' + C.c + '" opacity="0"><animateMotion begin="6.6s" dur="1.6s" fill="freeze" path="' + p[1] + '"/>' + show(6.6, 8.3, D) + '</circle>';
    });

    // ---- 아래: 시신경 → 시상 → 후두엽 시각 피질 ----
    var path = [[430, "시신경", C.n, C.nL], [552, "시상", C.n, C.nL], [656, "후두엽 시각 피질", C.b, C.bL]];
    s += '<path d="M420,272 L430,272" stroke="' + C.n + '" stroke-width="5"/>';
    path.forEach(function (p, i) {
      var w = i === 2 ? 98 : 88, from = 8.5 + i * 0.8;
      s += '<g>' + box(p[0], 254, w, 34, p[3], p[2]) + glow(from, 13, D) + '</g>';
      s += txt(p[0] + w / 2, 276, p[1], 12, p[2], ' font-weight="700"');
    });
    s += '<line x1="518" y1="271" x2="550" y2="271" stroke="#555" stroke-width="2" marker-end="url(#tv_arrow)"/>';
    s += '<line x1="640" y1="271" x2="654" y2="271" stroke="#555" stroke-width="2" marker-end="url(#tv_arrow)"/>';
    s += '<g opacity="0"><line x1="588" y1="232" x2="475" y2="252" stroke="#555" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#tv_arrow)"/>' + show(4, 13, D) + '</g>';
    s += '<circle r="6" fill="' + C.c + '" opacity="0"><animateMotion begin="8.6s" dur="2.2s" fill="freeze" path="M380,245 L420,272 L520,272 L600,272 L700,272"/>' + show(8.6, 10.9, D) + '</circle>';

    // ---- 아래 요점 ----
    s += txt(380, 322, "변환: 전문화된 수용기가 수용 → 신경 신호(전기/화학)로 전환 → 두뇌로 전달", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
