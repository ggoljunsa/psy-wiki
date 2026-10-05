// ============================================================
// working_memory — 배들리 & 히치의 작업 기억 모형 (6장 p.6, 8)
// 시간축(초): 0 모형 소개 → 1.5 중앙 집행기(주의 할당·조율) → 3.5 음운 루프(저장소 + 조음 되뇌기)
//   → 7 시공간 잡기장(지도 심상) → 9 장기 기억에서 인출 → 11 정리 → 13 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["working_memory"] = {
  title: "작업 기억 — 저장만이 아니라 처리하는 기억 13초",
  desc: "배들리와 히치(Baddeley, Hitch, 1974): [[중앙 집행기]]가 주의를 할당·조율하며 두 하위 체계를 조정 — [[음운 루프]](음운 저장소 + 조음 되뇌기로 쇠잔 방지) / 시공간 잡기장(시각 심상 유지) — 그리고 장기 기억에서 정보를 인출. [[작업 기억]]",
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
    function glow(from, to, dur) {
      return '<animate attributeName="stroke-width" values="2;2;4.5;4.5;2;2" keyTimes="0;' + (from / dur) + ';' + (from / dur + 0.02) + ';' + (to / dur) + ';' + Math.min(1, to / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    var D = 13;
    var s = '<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="작업 기억 모형 애니메이션">';
    s += '<defs><marker id="wm_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "작업 기억 모형 (Baddeley &amp; Hitch, 1974): 단기 기억을 확장한 모형"],
      [1.5, 3.5, "① 중앙 집행기: 과제 수행의 집중 및 주의 분배, 두 하위 체계의 활동 조정"],
      [3.5, 7, "② 음운 루프: 음운 저장소가 정보를 유지, 조음 되뇌기가 정보의 쇠잔을 방지"],
      [7, 9, "③ 시공간 잡기장: 시각 심상에 기반한 기억 정보 유지 (예: 머릿속 지도)"],
      [9, 11, "④ 중앙 집행기가 장기 기억으로부터 정보를 인출"],
      [11, 13, "입력된 감각 정보와 인출된 정보를 적극적으로 처리하는 기억"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 중앙 집행기 ----
    s += '<g>' + box(270, 44, 220, 62, C.cL, C.c) + glow(1.5, 3.5, D) + '</g>';
    s += txt(380, 68, "중앙 집행기", 15, "#8a6000", ' font-weight="700"');
    s += txt(380, 86, "(Central Executive)", 11, C.m);
    s += txt(380, 100, "주의 할당/조율", 11, "#8a6000");
    // 지시 화살표
    s += '<g><path d="M300,106 L210,140" fill="none" stroke="' + C.c + '" stroke-width="2" marker-end="url(#wm_arrow)"/>' + glow(1.5, 3.5, D) + '</g>';
    s += '<g><path d="M460,106 L550,140" fill="none" stroke="' + C.c + '" stroke-width="2" marker-end="url(#wm_arrow)"/>' + glow(1.5, 3.5, D) + '</g>';
    s += '<circle r="5" fill="' + C.c + '" opacity="0"><animateMotion begin="1.8s" dur="0.8s" fill="freeze" path="M300,106 L210,140"/>' + show(1.8, 2.6, D) + '</circle>';
    s += '<circle r="5" fill="' + C.c + '" opacity="0"><animateMotion begin="2.4s" dur="0.8s" fill="freeze" path="M460,106 L550,140"/>' + show(2.4, 3.2, D) + '</circle>';

    // ---- 음운 루프 ----
    s += '<g>' + box(14, 140, 330, 112, C.aL, C.a) + glow(3.5, 7, D) + '</g>';
    s += txt(26, 160, "음운 루프", 14, C.a, ' font-weight="700" text-anchor="start"');
    s += txt(102, 160, "(Phonological loop)", 10.5, C.m, ' text-anchor="start"');
    s += box(30, 170, 176, 36, "#fff", C.a);
    s += txt(118, 185, "음운 저장소", 10.5, C.m);
    s += '<g opacity="0">' + txt(118, 201, "“8 4 3 0 1 …”", 13, C.a, ' font-weight="700"') + show(3.6, 13, D) + '</g>';
    // 쇠잔 막대 (되뇌기마다 다시 참)
    s += '<rect x="30" y="214" width="176" height="10" rx="3" fill="#fff"/>';
    var kt = [0, 3.6, 4.5, 4.7, 5.6, 5.8, 6.7, 13].map(function (t) { return t / D; }).join(";");
    s += '<rect x="30" y="214" width="176" height="10" rx="3" fill="' + C.b + '">' +
      '<animate attributeName="width" values="176;176;70;176;70;176;120;120" keyTimes="' + kt + '" dur="' + D + 's" fill="freeze"/></rect>';
    s += txt(118, 242, "유지 정도: 시간이 지나면 쇠잔 → 되뇌면 다시 참", 10.5, C.m);
    // 조음 되뇌기 고리
    var loop = "M206,182 C250,160 300,168 300,188 C300,208 250,216 210,198";
    s += '<path d="' + loop + '" fill="none" stroke="' + C.a + '" stroke-width="2.5" marker-end="url(#wm_arrow)"/>';
    s += txt(306, 232, "조음 되뇌기", 12, C.a, ' font-weight="700" text-anchor="end"');
    s += '<circle r="5" fill="' + C.b + '" opacity="0"><animateMotion begin="4.2s" dur="0.5s" fill="freeze" path="' + loop + '"/>' + show(4.2, 4.7, D) + '</circle>';
    s += '<circle r="5" fill="' + C.b + '" opacity="0"><animateMotion begin="5.3s" dur="0.5s" fill="freeze" path="' + loop + '"/>' + show(5.3, 5.8, D) + '</circle>';
    s += '<g opacity="0">' + txt(254, 160, "속으로 되뇜", 11, C.b, ' font-weight="700"') + show(4.2, 7, D) + '</g>';

    // ---- 시공간 잡기장 ----
    s += '<g>' + box(416, 140, 330, 112, C.bL, C.b) + glow(7, 9, D) + '</g>';
    s += txt(428, 160, "시공간 잡기장", 14, C.b, ' font-weight="700" text-anchor="start"');
    s += txt(526, 160, "(Visuospatial sketch pad)", 10.5, C.m, ' text-anchor="start"');
    s += box(440, 170, 282, 72, "#fff", "#9cc9a8");
    for (var gx = 480; gx <= 700; gx += 55) s += '<line x1="' + gx + '" y1="174" x2="' + gx + '" y2="238" stroke="#ddd" stroke-width="5"/>';
    s += '<line x1="444" y1="192" x2="718" y2="192" stroke="#ddd" stroke-width="5"/><line x1="444" y1="222" x2="718" y2="222" stroke="#ddd" stroke-width="5"/>';
    var route = "M480,222 L535,222 L535,192 L645,192 L645,222 L700,222";
    s += '<path d="' + route + '" pathLength="100" fill="none" stroke="' + C.b + '" stroke-width="4" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" from="100" to="0" begin="7.2s" dur="1.4s" fill="freeze"/></path>';
    s += '<circle cx="480" cy="222" r="6" fill="' + C.a + '"/>' + txt(470, 238, "출발", 10, C.a, ' text-anchor="end"');
    s += '<path d="M700,212 l3,7 l8,0 l-6,5 l2,8 l-7,-5 l-7,5 l2,-8 l-6,-5 l8,0 z" fill="' + C.c + '"/>' + txt(712, 186, "목적지", 10, "#8a6000", ' text-anchor="end"');
    s += '<g opacity="0">' + txt(590, 210, "머릿속 지도 심상", 11, C.b, ' font-weight="700" stroke="#fff" stroke-width="3" paint-order="stroke"') + show(7.4, 13, D) + '</g>';

    // ---- 장기 기억 ----
    s += '<g>' + box(14, 262, 732, 34, C.nL, C.n) + glow(9, 11, D) + '</g>';
    s += txt(380, 284, "장기 기억 (의미·사건·지식)", 13, C.n, ' font-weight="700"');
    s += '<g><path d="M380,260 L380,110" fill="none" stroke="' + C.n + '" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#wm_arrow)"/>' + glow(9, 11, D) + '</g>';
    s += txt(388, 200, "인출", 12, C.n, ' font-weight="700" text-anchor="start"');
    s += '<circle r="7" fill="' + C.n + '" stroke="#fff" stroke-width="1.5" opacity="0"><animateMotion begin="9.2s" dur="1.2s" fill="freeze" path="M380,280 L380,112"/>' + show(9.2, 11, D) + '</circle>';

    // ---- 아래 요점 ----
    s += txt(380, 318, "작업 기억 = 중앙 집행기 + 음운 루프 + 시공간 잡기장 — 저장만이 아니라 처리하는 기억", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
