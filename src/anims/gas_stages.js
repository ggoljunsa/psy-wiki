// ============================================================
// gas_stages — 9장 p.9 일반 적응 증후군 (General Adaptation Syndrome, 한스 셀리에, 1936, 1976)
// 시간축(초): 0 정상 저항 수준 → 1.5 스트레스원 발생 → 1.5–4 1단계 경고 반응(살짝 떨어졌다 치솟음)
//   → 4–8 2단계 저항(높은 저항 유지, 자원 막대 감소) → 8–11 3단계 소진(급락, 자원 고갈) → 11–13 요점
// 저항력 곡선 모양은 p.9 그림(교재 그림)을 본뜬 것 — 세로축 값은 표시용(수치 없음).
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["gas_stages"] = {
  title: "일반 적응 증후군 — 경고 → 저항 → 소진 13초",
  desc: "스트레스원이 계속되면 몸의 저항력이 '''경고 반응'''(교감 신경계, 자원 동원) → '''저항'''(에피네프린/노르에피네프린 기반 저항 반응의 폭발) → '''소진'''(자원 고갈)으로 움직인다 — [[한스 셀리에]]의 [[일반 적응 증후군]] (9장 p.9). 곡선의 높이는 표시용.",
  duration: 13,
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
    var D = 13;
    var B = ' font-weight="700"';

    // ---- 그래프 좌표 ----
    var X0 = 70, X1 = 540, YT = 70, YB = 280, BASE = 200; // BASE = 정상 저항 수준
    var S1 = 150, S2 = 240, S3 = 430;                     // 스트레스원 발생 / 2단계 시작 / 3단계 시작
    // 저항력 곡선 y(x): 정상 → (경고) 살짝 하강 후 급상승 → (저항) 높은 고원 → (소진) 급락
    function yAt(x) {
      if (x <= S1) return BASE;
      if (x <= 185) { var t = (x - S1) / 35; return BASE + 28 * Math.sin(Math.PI / 2 * t); }
      if (x <= S2) { var u = (x - 185) / (S2 - 185); return BASE + 28 - (BASE + 28 - 112) * (1 - Math.pow(1 - u, 2)); }
      if (x <= S3) { var v = (x - S2) / (S3 - S2); return 112 - 8 * Math.sin(Math.PI * v); }
      var w = (x - S3) / (X1 - S3); return 112 + (265 - 112) * Math.pow(w, 1.6);
    }
    var pts = [], len = [0], total = 0;
    for (var x = X0; x <= X1; x += 5) pts.push([x, yAt(x)]);
    for (var i = 1; i < pts.length; i++) {
      var dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1];
      total += Math.sqrt(dx * dx + dy * dy); len.push(total);
    }
    function fracAt(xq) { // xq 지점까지의 곡선 길이 비율
      var k = Math.round((xq - X0) / 5); return (len[k] / total);
    }
    var d = "M" + pts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" L");
    // 시각 → 그려진 비율 (0–1.5 정상, 1.5–4 경고, 4–8 저항, 8–11 소진)
    var tk = [0, 1.5, 4, 8, 11, D].map(function (t) { return (t / D).toFixed(4); });
    var fr = [fracAt(X0 + 40), fracAt(S1), fracAt(S2), fracAt(S3), 1, 1];
    var dashVals = fr.map(function (f) { return (total * (1 - f)).toFixed(1); }).join(";");
    var kp = fr.map(function (f) { return f.toFixed(4); }).join(";");

    var s = '<svg viewBox="0 0 760 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="일반 적응 증후군 3단계 저항력 곡선 애니메이션">';
    s += '<defs><marker id="gs_arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker></defs>';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "평소 — 몸의 저항력은 정상 수준"],
      [1.5, 4, "1단계 경고 반응: 스트레스원 발생 → 교감 신경계가 경보, 자원을 동원한다"],
      [4, 8, "2단계 저항: 에피네프린/노르에피네프린 기반 저항 반응의 폭발 — 스트레스원에 대처"],
      [8, 11, "3단계 소진: 2단계에서 자원을 다 써 버려 고갈 — 질병에 취약해진다"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 14, "#222", B) + show(c[0], c[1], D) + '</g>';
    });
    s += '<g opacity="0">' + txt(380, 26, "일반 적응 증후군 (한스 셀리에): 경고 → 저항 → 소진", 15, "#222", B) + on(11, D) + '</g>';

    // ---- 단계 배경 (p.9 그림 색: 경고 붉은색 · 저항 노란색 · 소진 파란색) ----
    s += '<g opacity="0"><rect x="' + S1 + '" y="' + YT + '" width="' + (S2 - S1) + '" height="' + (YB - YT) + '" fill="' + C.rL + '"/>' + on(1.5, D) + '</g>';
    s += '<g opacity="0"><rect x="' + S2 + '" y="' + YT + '" width="' + (S3 - S2) + '" height="' + (YB - YT) + '" fill="' + C.cL + '"/>' + on(4, D) + '</g>';
    s += '<g opacity="0"><rect x="' + S3 + '" y="' + YT + '" width="' + (X1 - S3) + '" height="' + (YB - YT) + '" fill="' + C.aL + '"/>' + on(8, D) + '</g>';

    // ---- 축 ----
    s += '<line x1="' + X0 + '" y1="' + YB + '" x2="' + (X1 + 8) + '" y2="' + YB + '" stroke="#555" stroke-width="2" marker-end="url(#gs_arrow)"/>';
    s += '<line x1="' + X0 + '" y1="' + YB + '" x2="' + X0 + '" y2="' + (YT - 8) + '" stroke="#555" stroke-width="2" marker-end="url(#gs_arrow)"/>';
    s += txt(38, 66, "높음", 11, C.muted) + txt(38, 284, "낮음", 11, C.muted);
    s += '<text x="22" y="175" font-size="12" fill="#555" text-anchor="middle" transform="rotate(-90 22 175)">스트레스 저항력</text>';
    s += txt(570, 284, "시간", 11, C.muted);
    s += '<line x1="' + X0 + '" y1="' + BASE + '" x2="' + X1 + '" y2="' + BASE + '" stroke="#999" stroke-width="1.2" stroke-dasharray="5 4"/>';
    s += '<text x="' + (X0 + 6) + '" y="' + (BASE - 6) + '" font-size="11" fill="#777">정상 저항 수준</text>';

    // ---- 스트레스원 발생 표시 ----
    s += '<g opacity="0"><line x1="' + S1 + '" y1="' + YT + '" x2="' + S1 + '" y2="' + YB + '" stroke="' + C.r + '" stroke-width="2"/>' +
      txt(S1, 62, "⚡ 스트레스원 발생", 12, C.r, B) + on(1.5, D) + '</g>';

    // ---- 저항력 곡선 (그려지며 진행) ----
    s += '<path d="' + d + '" fill="none" stroke="' + C.a + '" stroke-width="4" stroke-linecap="round" stroke-dasharray="' + total.toFixed(1) + '" stroke-dashoffset="' + total.toFixed(1) + '">' +
      '<animate attributeName="stroke-dashoffset" values="' + dashVals + '" keyTimes="' + tk.join(";") + '" dur="' + D + 's" fill="freeze"/></path>';
    s += '<circle r="7" fill="' + C.a + '" stroke="#fff" stroke-width="2"><animateMotion path="' + d + '" keyPoints="' + kp + '" keyTimes="' + tk.join(";") + '" calcMode="linear" dur="' + D + 's" fill="freeze"/></circle>';

    // ---- 단계 라벨 (그래프 아래) ----
    s += '<g opacity="0">' + txt((S1 + S2) / 2, 300, "1단계 경고 반응", 12, "#a52f2f", B) + txt((S1 + S2) / 2, 316, "(자원을 동원함)", 11, "#a52f2f") + on(1.5, D) + '</g>';
    s += '<g opacity="0">' + txt((S2 + S3) / 2, 300, "2단계 저항", 12, "#8a6000", B) + txt((S2 + S3) / 2, 316, "(스트레스원에 대처함)", 11, "#8a6000") + on(4, D) + '</g>';
    s += '<g opacity="0">' + txt((S3 + X1) / 2, 300, "3단계 소진", 12, C.a, B) + txt((S3 + X1) / 2, 316, "(자원 고갈됨)", 11, C.a) + on(8, D) + '</g>';
    s += '<g opacity="0">' + box(250, 128, 170, 46, "#fff", "#8a6000") + txt(335, 147, "저항은 소진되기 전까지", 11, "#8a6000") + txt(335, 163, "유지될 수 있을 뿐이다", 11, "#8a6000") + on(5.5, D) + '</g>';

    // ---- 오른쪽: 적응 자원 막대 ----
    var GX = 600, GY = 90, GW = 70, GH = 170;
    s += txt(GX + GW / 2, 76, "적응 자원", 13, C.n, B);
    s += '<rect x="' + GX + '" y="' + GY + '" width="' + GW + '" height="' + GH + '" rx="6" fill="#f4f4f4" stroke="' + C.n + '" stroke-width="2"/>';
    // 높이: 0–1.5 100% → 4 100%(동원) → 8 40% → 11 4%
    var hv = [1, 1, 1, 0.4, 0.04, 0.04].map(function (f) { return (GH * f).toFixed(1); });
    var yv = [1, 1, 1, 0.4, 0.04, 0.04].map(function (f) { return (GY + GH - GH * f).toFixed(1); });
    s += '<rect x="' + (GX + 4) + '" y="' + GY + '" width="' + (GW - 8) + '" height="' + GH + '" rx="4" fill="' + C.b + '">' +
      '<animate attributeName="height" values="' + hv.join(";") + '" keyTimes="' + tk.join(";") + '" dur="' + D + 's" fill="freeze"/>' +
      '<animate attributeName="y" values="' + yv.join(";") + '" keyTimes="' + tk.join(";") + '" dur="' + D + 's" fill="freeze"/>' +
      '<animate attributeName="fill" values="' + C.b + ';' + C.b + ';' + C.b + ';' + C.c + ';' + C.r + ';' + C.r + '" keyTimes="' + tk.join(";") + '" dur="' + D + 's" fill="freeze"/></rect>';
    s += '<g opacity="0">' + txt(GX + GW / 2, 284, "총동원!", 12, "#1d6b2a", B) + show(1.5, 4, D) + '</g>';
    s += '<g opacity="0">' + txt(GX + GW / 2, 284, "계속 소모 중…", 12, "#8a6000", B) + show(4, 8, D) + '</g>';
    s += '<g opacity="0">' + txt(GX + GW / 2, 284, "바닥 → 질병 취약", 12, "#a52f2f", B) + on(8, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 342, "몸은 일시적 스트레스에는 잘 대처하지만, 스트레스가 만성화되면 소진에 이른다 (9장 p.9)", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
