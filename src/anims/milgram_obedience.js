// ============================================================
// milgram_obedience — 10장 p.18–19 밀그램의 복종 실험 (Milgram, 1963, 1974)
// 시간축(초): 0–1.5 장면 소개(실험자·교사·학습자) → 1.5–11.5 전압 8단계(1.25초씩): 스위치 점등 +
//   실험자 "계속하십시오" + 해당 단계 복종 비율 막대가 자람 → 11.5–14 결론("대다수가 끝까지 복종", 사전 응답 대비)
// 막대 높이는 p.18 그래프 눈금을 읽은 값(100·97·80·80·73·70·68·65 %). 숫자 라벨은 처음(100%)과 끝(약 65%)만.
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["milgram_obedience"] = {
  title: "밀그램의 복종 실험 — 15V에서 450V까지 14초",
  desc: "실험자의 “계속하십시오”에 따라 전압이 한 단계씩 오를 때 복종 비율이 어떻게 남는지 — p.18 그래프 모양(대다수가 끝까지 복종). [[밀그램의 복종 실험]] · [[복종]] (10장 p.18–19). 막대 높이는 그래프 눈금 근사.",
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
    function person(cx, cy, color, light) {
      return '<circle cx="' + cx + '" cy="' + cy + '" r="14" fill="' + light + '" stroke="' + color + '" stroke-width="2"/>' +
        '<path d="M' + (cx - 19) + ',' + (cy + 46) + ' Q' + (cx - 19) + ',' + (cy + 18) + ' ' + cx + ',' + (cy + 18) + ' Q' + (cx + 19) + ',' + (cy + 18) + ' ' + (cx + 19) + ',' + (cy + 46) + ' z" fill="' + light + '" stroke="' + color + '" stroke-width="2"/>';
    }
    var D = 14;
    var B = ' font-weight="700"';
    var steps = [
      ["경미함", "15~60", 100], ["보통", "75~120", 97], ["강함", "135~180", 80], ["매우 강함", "195~240", 80],
      ["강력함", "255~300", 73], ["극도로 강력함", "315~360", 70], ["위험: 극심함", "375~420", 68], ["XXX", "435~450", 65]
    ];
    var T0 = 1.5, DT = 1.25;
    function tk(k) { return T0 + DT * k; }

    var s = '<svg viewBox="0 0 760 372" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="밀그램의 복종 실험 애니메이션">';
    s += '<defs><marker id="mo_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, T0, "교사(참가자)는 학습자가 틀릴 때마다 전기 충격 버튼을 누른다 — 15V부터 시작"],
      [T0, tk(2), "전압이 한 단계씩 오른다 — 처음엔 아무렇지 않은 작은 단계(문 안에 발 들여놓기)"],
      [tk(2), tk(5), "망설이면 실험자(권위자)가 지시한다: “계속하십시오”"],
      [tk(5), 11.5, "위험: 극심함, 그리고 XXX(435~450V)까지…"],
      [11.5, D, "대다수의 실험참가자들이 끝까지 복종함 — 복종은 특질보다 상황"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 24, c[2], 15, "#222", B) + show(c[0], c[1], D) + '</g>';
    });

    // ---- 위: 실험자 · 교사 + 발생기 · 벽 · 학습자 ----
    s += person(70, 62, C.c, C.cL) + txt(70, 140, "실험자(권위자)", 12, "#8a6000", B);
    s += person(220, 62, C.a, C.aL) + txt(220, 140, "교사 = 참가자", 12, C.a, B);
    // 전기 충격 발생기
    s += box(262, 66, 250, 56, "#f4f4f4", "#555");
    s += txt(387, 82, "전기 충격 발생기", 11, "#555");
    for (var k = 0; k < 8; k++) {
      var sx = 278 + 30 * k;
      s += '<rect x="' + sx + '" y="92" width="20" height="20" rx="3" fill="#ddd" stroke="#888" stroke-width="1.2"/>';
      s += '<g opacity="0"><rect x="' + sx + '" y="92" width="20" height="20" rx="3" fill="' + C.r + '" stroke="#a52f2f" stroke-width="1.2"/>' + on(tk(k), D) + '</g>';
    }
    // 현재 전압 표시
    steps.forEach(function (st, i) {
      var end = i < 7 ? tk(i + 1) : D;
      s += '<g opacity="0">' + txt(387, 138, "지금: " + st[0] + " (" + st[1] + "V)", 12, "#a52f2f", B) + show(tk(i), end, D) + '</g>';
    });
    // 벽과 학습자
    s += '<line x1="560" y1="40" x2="560" y2="140" stroke="#999" stroke-width="3" stroke-dasharray="6 4"/>';
    s += txt(574, 136, "벽", 11, C.muted);
    s += person(650, 62, C.n, C.nL) + txt(650, 140, "학습자 (옆방)", 12, C.n, B);
    s += '<line x1="514" y1="94" x2="626" y2="80" stroke="' + C.r + '" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#mo_arrow)" opacity="0">' +
      '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (T0 / D).toFixed(4) + ';' + (T0 / D + 0.02).toFixed(4) + ';1" dur="' + D + 's" fill="freeze"/></line>';
    s += '<g opacity="0">' + txt(690, 54, "⚡", 18, C.r) + on(tk(2), D) + '</g>';
    s += '<g opacity="0">' + box(676, 34, 70, 24, C.rL, C.r) + txt(711, 51, "아악!", 12, "#a52f2f", B) + on(tk(4), D) + '</g>';
    // 실험자 말풍선 (단계 2 이후 매 단계 깜박)
    for (var j = 2; j < 8; j++) {
      s += '<g opacity="0">' + box(96, 34, 104, 24, C.cL, C.c) + txt(148, 51, "계속하십시오", 12, "#8a6000", B) + show(tk(j), tk(j) + 0.9, D) + '</g>';
    }
    s += '<g opacity="0">' + box(96, 34, 104, 24, C.cL, C.c) + txt(148, 51, "계속하십시오", 12, "#8a6000", B) + on(11.5, D) + '</g>';

    // ---- 아래: 복종 비율 막대 (p.18 그래프) ----
    var X0 = 60, BW = 64, GAP = 84, BASE = 300, HMAX = 110;
    s += '<line x1="' + (X0 - 10) + '" y1="' + BASE + '" x2="' + (X0 + GAP * 8) + '" y2="' + BASE + '" stroke="#555" stroke-width="1.5"/>';
    s += '<line x1="' + (X0 - 10) + '" y1="' + (BASE - HMAX) + '" x2="' + (X0 + GAP * 8) + '" y2="' + (BASE - HMAX) + '" stroke="#ccc" stroke-width="1" stroke-dasharray="4 4"/>';
    s += '<line x1="' + (X0 - 10) + '" y1="' + (BASE - HMAX / 2) + '" x2="' + (X0 + GAP * 8) + '" y2="' + (BASE - HMAX / 2) + '" stroke="#ccc" stroke-width="1" stroke-dasharray="4 4"/>';
    s += '<text x="' + (X0 - 14) + '" y="' + (BASE - HMAX + 4) + '" font-size="10" fill="#777" text-anchor="end">100%</text>';
    s += '<text x="' + (X0 - 14) + '" y="' + (BASE - HMAX / 2 + 4) + '" font-size="10" fill="#777" text-anchor="end">50%</text>';
    s += '<text x="' + (X0 - 14) + '" y="' + (BASE - HMAX - 8) + '" font-size="11" fill="#555" text-anchor="start">복종 비율 (p.18 그래프)</text>';
    steps.forEach(function (st, i) {
      var x = X0 + GAP * i, h = (HMAX * st[2] / 100).toFixed(1), y = (BASE - HMAX * st[2] / 100).toFixed(1);
      var col = i < 2 ? C.b : (i < 5 ? C.c : C.r);
      s += '<rect x="' + x + '" y="' + BASE + '" width="' + BW + '" height="0" fill="' + col + '" opacity="0.85">' +
        '<animate attributeName="height" from="0" to="' + h + '" begin="' + tk(i) + 's" dur="0.5s" fill="freeze"/>' +
        '<animate attributeName="y" from="' + BASE + '" to="' + y + '" begin="' + tk(i) + 's" dur="0.5s" fill="freeze"/></rect>';
      s += txt(x + BW / 2, BASE + 15, st[0], 10, "#333", B);
      s += txt(x + BW / 2, BASE + 28, st[1] + "V", 10, C.muted);
    });
    s += '<g opacity="0">' + txt(X0 + BW / 2, BASE - HMAX + 17, "100%", 13, "#fff", B) + on(tk(0) + 0.5, D) + '</g>';
    s += '<g opacity="0">' + txt(X0 + GAP * 7 + BW / 2, BASE - HMAX * 0.65 + 17, "약 65%", 13, "#fff", B) + on(tk(7) + 0.5, D) + '</g>';

    // ---- 결론 상자 ----
    s += '<g opacity="0">' + box(232, 152, 400, 50, "#fff", "#a52f2f") +
      txt(432, 172, "대다수의 실험참가자들이 끝까지 복종함 (p.18 그림)", 13, "#a52f2f", B) +
      txt(432, 192, "사전 응답: 대부분 “나는 부당한 명령에 저항할 수 있다”", 12, "#333") +
      on(11.5, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 362, "인간의 복종 행위는 특질보다는 상황에 의해 발생할 수 있다 (10장 p.18) — 막대 높이는 그래프 눈금 근사", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
