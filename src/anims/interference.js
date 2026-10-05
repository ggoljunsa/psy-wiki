// ============================================================
// interference — 순행 간섭·역행 간섭과 Jenkins & Dallenbach(1924) (6장 p.36–37)
// 시간축(초): 0 간섭 소개 → 2 순행 간섭(옛 → 새, →) → 5.5 역행 간섭(새 → 옛, ←)
//   → 9 수면 vs 각성 회상률 → 12 정리 → 14 끝
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["interference"] = {
  title: "간섭 — 옛 것과 새 것이 서로 회상을 막는다 14초",
  desc: "[[순행 간섭]]: 먼저 배운 것이 새 정보의 회상을 방해(→). [[역행 간섭]]: 새로 배운 것이 옛 정보의 회상을 방해(←). Jenkins와 Dallenbach(1924): 학습 후 바로 잔 집단의 회상률이 더 높다 — 수면 중엔 새 정보 유입이 없어 역행 간섭이 적기 때문. 망각 = 소멸 + 간섭",
  duration: 14,
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
    // from 초부터 끝까지 보이기
    function from(t, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (t / dur) + ';' + (t / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function lit(t, dur) {
      return '<animate attributeName="opacity" values="0.35;0.35;1;1" keyTimes="0;' + (t / dur) + ';' + (t / dur + 0.02) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function cross(x, y) {
      return '<path d="M' + (x - 10) + ',' + (y - 10) + ' L' + (x + 10) + ',' + (y + 10) + ' M' + (x + 10) + ',' + (y - 10) + ' L' + (x - 10) + ',' + (y + 10) + '" stroke="' + C.r + '" stroke-width="4" stroke-linecap="round"/>';
    }
    var D = 14;
    var s = '<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="순행 간섭과 역행 간섭 애니메이션">';
    s += '<defs><marker id="if_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.r + '"/></marker>' +
      '<marker id="if_arrowG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#888"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 2, "인출 실패의 원인, 간섭: 옛 정보와 새 정보 간의 상호작용"],
      [2, 5.5, "① 순행 간섭: 기존 학습 내용이 새로운 정보의 회상을 방해 (→ 방향)"],
      [5.5, 9, "② 역행 간섭: 새로운 학습이 기존 정보의 회상을 방해 (← 방향)"],
      [9, 12, "③ Jenkins &amp; Dallenbach(1924): 학습 후 바로 잔 집단의 회상률이 더 높음"],
      [12, 14, "수면 중엔 추가 정보 유입이 없어 역행 간섭이 적다 → 망각 = 소멸 + 간섭"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", ' font-weight="700"') + show(c[0], c[1], D) + '</g>';
    });

    // ---- 두 줄: 순행 / 역행 ----
    function row(y, title, ink, t0, target, pro) {
      var g = '<g opacity="0.35">';
      g += box(14, y, 456, 116, "#fff", ink);
      g += txt(26, y + 109, title, 13, ink, ' font-weight="700" text-anchor="start"');
      g += '<line x1="236" y1="' + (y + 104) + '" x2="450" y2="' + (y + 104) + '" stroke="#bbb" stroke-width="1.5" marker-end="url(#if_arrowG)"/>';
      g += txt(440, y + 98, "시간", 10, C.m, ' text-anchor="end"');
      g += box(36, y + 38, 120, 46, C.nL, C.n) + txt(96, y + 57, "먼저 배운 것", 11, C.m) + txt(96, y + 75, "일본어 단어", 13, C.n, ' font-weight="700"');
      g += box(186, y + 38, 120, 46, C.aL, C.a) + txt(246, y + 57, "나중에 배운 것", 11, C.m) + txt(246, y + 75, "영어 단어", 13, C.a, ' font-weight="700"');
      g += box(340, y + 38, 116, 46, C.cL, C.c) + txt(398, y + 57, "회상 시험", 11, C.m) + txt(398, y + 75, target, 12, "#8a6000", ' font-weight="700"');
      g += lit(t0, D) + '</g>';
      // 방해 화살표
      var a = pro
        ? '<path d="M120,' + (y + 36) + ' C170,' + (y + 18) + ' 300,' + (y + 18) + ' 360,' + (y + 34) + '" fill="none" stroke="' + C.r + '" stroke-width="3" marker-end="url(#if_arrow)"/>'
        : '<path d="M270,' + (y + 36) + ' C240,' + (y + 18) + ' 140,' + (y + 18) + ' 110,' + (y + 34) + '" fill="none" stroke="' + C.r + '" stroke-width="3" marker-end="url(#if_arrow)"/>';
      g += '<g opacity="0">' + a + txt(pro ? 240 : 190, y + 16, pro ? "옛 것이 끼어듦 →" : "← 새 것이 덮음", 12, C.r, ' font-weight="700"') + from(t0 + 1, D) + '</g>';
      // 회상 대상에 ✗
      g += '<g opacity="0">' + (pro ? cross(440, y + 46) : cross(146, y + 46)) + from(t0 + 2, D) + '</g>';
      // 회상 시험을 옛 정보로 연결 (역행)
      if (!pro) g += '<g opacity="0"><path d="M340,' + (y + 61) + ' L160,' + (y + 61) + '" stroke="' + C.c + '" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#if_arrowG)"/>' + from(t0 + 0.5, D) + '</g>';
      else g += '<g opacity="0"><path d="M310,' + (y + 61) + ' L336,' + (y + 61) + '" stroke="' + C.c + '" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#if_arrowG)"/>' + from(t0 + 0.5, D) + '</g>';
      return g;
    }
    s += row(44, "① 순행 간섭 (Proactive)", C.r, 2, "새 것(영어)?", true);
    s += row(170, "② 역행 간섭 (Retroactive)", C.r, 5.5, "옛 것(일본어)?", false);

    // ---- 오른쪽: Jenkins & Dallenbach ----
    s += '<g opacity="0.35">' + box(482, 44, 264, 242, "#fff", "#ccc") + lit(9, D) + '</g>';
    s += txt(614, 64, "Jenkins &amp; Dallenbach (1924)", 12, C.n, ' font-weight="700"');
    var X = function (t) { return 528 + t * 25; }, Y = function (p) { return 250 - p * 1.65; };
    s += '<line x1="528" y1="' + Y(100) + '" x2="528" y2="250" stroke="#555"/><line x1="528" y1="250" x2="734" y2="250" stroke="#555"/>';
    s += txt(510, Y(90) + 4, "높음", 10, C.m) + txt(510, 248, "낮음", 10, C.m);
    s += '<text x="500" y="160" font-size="11" fill="' + C.m + '" text-anchor="middle" transform="rotate(-90 500 160)">회상률</text>';
    s += txt(631, 268, "철자 학습 후 경과 시간 →", 10.5, C.m);
    function line(pts, col, t0) {
      var d = pts.map(function (p, i) { return (i ? "L" : "M") + X(p[0]) + "," + Y(p[1]); }).join(" ");
      return '<path d="' + d + '" pathLength="100" fill="none" stroke="' + col + '" stroke-width="4" stroke-linejoin="round" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" from="100" to="0" begin="' + t0 + 's" dur="1.5s" fill="freeze"/></path>';
    }
    s += line([[0, 90], [1, 66], [2, 55], [4, 57], [8, 55]], C.c, 9.3);
    s += line([[0, 90], [1, 52], [2, 35], [4, 22], [8, 15]], C.a, 9.8);
    s += '<g opacity="0">' + txt(X(5.5), Y(55) - 10, "취침 후", 12, "#b06a10", ' font-weight="700"') + from(10.6, D) + '</g>';
    s += '<g opacity="0">' + txt(X(5), Y(15) + 18, "기상 후 (깨어 있음)", 12, C.a, ' font-weight="700"') + from(11.1, D) + '</g>';
    s += '<g opacity="0"><line x1="' + X(7) + '" y1="' + (Y(55) + 6) + '" x2="' + X(7) + '" y2="' + (Y(16) - 6) + '" stroke="' + C.r + '" stroke-width="2"/>' +
      txt(X(7) - 6, Y(43), "새 정보 유입", 10.5, C.r, ' font-weight="700" text-anchor="end"') +
      txt(X(7) - 6, Y(43) + 14, "→ 역행 간섭", 10.5, C.r, ' font-weight="700" text-anchor="end"') + from(12, D) + '</g>';

    // ---- 아래 요점 ----
    s += txt(380, 314, "순행: 옛 것이 새 것을 방해(→) · 역행: 새 것이 옛 것을 방해(←) — 망각은 소멸만이 아니라 간섭의 결과", 12.5, C.m);
    s += '</svg>';
    return s;
  }
};
