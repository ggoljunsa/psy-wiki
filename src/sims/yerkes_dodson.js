// yerkes_dodson — 8장 p.5–6 여키스-닷슨 법칙 (Yerkes & Dodson, 1908): 적당한 각성 → 최적 수행, 역U자
// 기대: 각성 1→9 단계. 수행 = 100·exp(-(a-opt)^2 / (2·s^2)) (표시용 예시값).
//   easy 최적점 a=6 (수행 100), hard 최적점 a=4 (수행 100). hard 는 높은 각성(8–9)에서 easy 보다 수행이 낮다.
//   검증: easy 최대 step = 각성 6, hard 최대 step = 각성 4 → "어려운 과제는 낮은 각성이 더 수행이 높음"(p.6, Hembree, 1988)
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var TASKS = {
    easy: { label: "쉬운 과제", opt: 6, s: 2.2, color: "#2e9e4f" },
    hard: { label: "어려운 과제", opt: 4, s: 1.7, color: "#d6465f" }
  };

  function perf(task, a) {
    var t = TASKS[task];
    return Math.round(100 * Math.exp(-((a - t.opt) * (a - t.opt)) / (2 * t.s * t.s)));
  }
  function zone(a) {
    if (a <= 3) return "저각성 (지루함)";
    if (a <= 6) return "적정 각성";
    return "고각성 (불안)";
  }

  function drawSvg(tasks, upto) {
    var W = 640, H = 260, L = 50, R = 620, T = 24, B = 210;
    function X(a) { return (L + (a - 0.5) / 9 * (R - L)).toFixed(1); }
    function Y(p) { return (B - p / 100 * (B - T)).toFixed(1); }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;font-family:system-ui,-apple-system,\'Apple SD Gothic Neo\',\'Malgun Gothic\',sans-serif">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    // 구간 배경
    o.push('<rect x="' + X(0.5) + '" y="' + T + '" width="' + (X(3.5) - X(0.5)).toFixed(1) + '" height="' + (B - T) + '" fill="#dbe8f7" opacity="0.45"/>');
    o.push('<rect x="' + X(3.5) + '" y="' + T + '" width="' + (X(6.5) - X(3.5)).toFixed(1) + '" height="' + (B - T) + '" fill="#dff3e4" opacity="0.6"/>');
    o.push('<rect x="' + X(6.5) + '" y="' + T + '" width="' + (X(9.5) - X(6.5)).toFixed(1) + '" height="' + (B - T) + '" fill="#fbe0e5" opacity="0.5"/>');
    o.push('<text x="' + X(2) + '" y="' + (T + 14) + '" font-size="11" fill="#1d65b3" text-anchor="middle">저각성(지루함)</text>');
    o.push('<text x="' + X(5) + '" y="' + (T + 14) + '" font-size="11" fill="#1d6b2a" text-anchor="middle">적정 각성</text>');
    o.push('<text x="' + X(8) + '" y="' + (T + 14) + '" font-size="11" fill="#a52f2f" text-anchor="middle">고각성(불안)</text>');
    // 축
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#555"/>');
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + L + '" y2="' + T + '" stroke="#555"/>');
    LEVELS.forEach(function (a) {
      o.push('<text x="' + X(a) + '" y="' + (B + 15) + '" font-size="11" fill="#445" text-anchor="middle">' + a + '</text>');
    });
    o.push('<text x="' + ((L + R) / 2) + '" y="' + (B + 32) + '" font-size="12" fill="#333" text-anchor="middle">각성 수준 (Arousal Level) →</text>');
    o.push('<text x="' + (L - 8) + '" y="' + Y(100) + '" font-size="11" fill="#667" text-anchor="end">100</text>');
    o.push('<text x="' + (L - 8) + '" y="' + Y(50) + '" font-size="11" fill="#667" text-anchor="end">50</text>');
    o.push('<text x="' + (L - 8) + '" y="' + (B + 4) + '" font-size="11" fill="#667" text-anchor="end">0</text>');
    o.push('<text x="' + (L + 4) + '" y="' + (T - 8) + '" font-size="11" fill="#667">수행(%)</text>');
    // 곡선 (연속, 옅게) + 지금까지 찍은 점
    tasks.forEach(function (task) {
      var t = TASKS[task];
      var d = "";
      for (var a = 0.6; a <= 9.4; a += 0.1) {
        d += (d ? " L" : "M") + X(a) + "," + Y(100 * Math.exp(-((a - t.opt) * (a - t.opt)) / (2 * t.s * t.s)));
      }
      o.push('<path d="' + d + '" fill="none" stroke="' + t.color + '" stroke-width="2" stroke-opacity="0.25"/>');
      var pts = "";
      for (var i = 0; i < upto && i < LEVELS.length; i++) {
        var aa = LEVELS[i];
        pts += (pts ? " L" : "M") + X(aa) + "," + Y(perf(task, aa));
        o.push('<circle cx="' + X(aa) + '" cy="' + Y(perf(task, aa)) + '" r="4.5" fill="' + t.color + '"/>');
      }
      if (pts) o.push('<path d="' + pts + '" fill="none" stroke="' + t.color + '" stroke-width="2.5"/>');
      if (upto >= LEVELS.length) {
        o.push('<line x1="' + X(t.opt) + '" y1="' + Y(100) + '" x2="' + X(t.opt) + '" y2="' + B + '" stroke="' + t.color + '" stroke-dasharray="4,3"/>');
        o.push('<text x="' + X(t.opt) + '" y="' + (+Y(100) - 6) + '" font-size="11" font-weight="bold" fill="' + t.color + '" text-anchor="middle">' + t.label + ' 최적</text>');
      }
    });
    // 범례
    var lx = L + 10;
    tasks.forEach(function (task, k) {
      var t = TASKS[task];
      o.push('<rect x="' + (lx + k * 120) + '" y="' + (H - 14) + '" width="10" height="10" fill="' + t.color + '"/>');
      o.push('<text x="' + (lx + k * 120 + 14) + '" y="' + (H - 5) + '" font-size="11" fill="#333">' + t.label + '</text>');
    });
    o.push('<text x="' + R + '" y="' + (H - 5) + '" font-size="10" fill="#777" text-anchor="end">수행 값은 표시용 예시값</text>');
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["yerkes_dodson"] = {
    title: "여키스-닷슨 법칙: 각성을 한 칸씩 올리면 수행은?",
    desc: "8장 p.5–6. 각성 수준을 1(지루함)부터 9(불안)까지 올리며 수행을 찍으면 '''역U자'''가 된다 — 적당한 각성이 최적의 수행([[여키스-닷슨 법칙]]). 과제를 '어려운 과제'로 바꾸면 최적점이 '''왼쪽(낮은 각성)'''으로 옮겨 간다(Hembree, 1988). 수행 % 는 슬라이드에 없는 '''표시용 예시값'''이다.",
    options: [
      { key: "task", label: "과제", values: [
        { value: "easy", label: "쉬운 과제" },
        { value: "hard", label: "어려운 과제" },
        { value: "both", label: "둘 다 비교" }
      ] }
    ],
    build: function (opts) {
      var mode = opts.task === "hard" ? "hard" : (opts.task === "both" ? "both" : "easy");
      var tasks = mode === "both" ? ["easy", "hard"] : [mode];
      var lines = [
        "1. 각성 수준을 가장 낮은 1(지루함)에서 시작",
        "2. 각성을 한 단계 올리고 수행을 측정",
        "3. 구간 판정: 저각성(1–3) / 적정(4–6) / 고각성(7–9)",
        "4. 9 까지 반복해 각성-수행 곡선을 그림",
        "5. 정리: 최적점 = 적당한 각성 (어려운 과제는 더 낮은 쪽)"
      ];
      function vars(a) {
        var v = { "각성 수준": a === null ? "–" : a, "구간": a === null ? "–" : zone(a) };
        v["쉬운 과제 수행(%)"] = (a !== null && tasks.indexOf("easy") >= 0) ? perf("easy", a) : "–";
        v["어려운 과제 수행(%)"] = (a !== null && tasks.indexOf("hard") >= 0) ? perf("hard", a) : "–";
        return v;
      }
      var steps = [];
      steps.push({
        desc: "시작: 아직 측정 전. 가로축은 각성 수준(1 = 지루함, 9 = 불안), 세로축은 수행. 회색 곡선이 앞으로 찍힐 모양의 예고다.",
        pc: { proc: 1 }, vars: vars(null),
        note: "수행 % 는 슬라이드에 없는 표시용 예시값이다. 외울 것은 모양(역U자)과 최적점의 이동 방향뿐.",
        svg: drawSvg(tasks, 0)
      });
      LEVELS.forEach(function (a, i) {
        var parts = tasks.map(function (t) { return TASKS[t].label + " " + perf(t, a) + "%"; }).join(", ");
        var desc;
        if (a <= 3) desc = "각성 " + a + " — '''저각성(지루함)'''. 동기 부족·집중력 저하로 수행이 낮다: " + parts + ".";
        else if (a <= 6) desc = "각성 " + a + " — '''적정 각성'''. 집중력 향상·효율적 정보 처리: " + parts + ".";
        else desc = "각성 " + a + " — '''고각성(불안)'''. 긴장 과다·주의력 분산으로 수행이 다시 떨어진다: " + parts + ".";
        var note;
        if (mode !== "easy" && a === TASKS.hard.opt) note = "어려운 과제는 각성 " + a + " 에서 최고 — 쉬운 과제보다 '''낮은 각성'''에서 정점(p.6, Hembree, 1988).";
        if (mode !== "hard" && a === TASKS.easy.opt) note = (note ? note + " " : "") + "쉬운 과제는 각성 " + a + " 에서 최고.";
        if (a === 9) note = (note ? note + " " : "") + "각성이 가장 높아도 수행은 최고가 아니다 → '''정비례 아님, 역U자'''.";
        steps.push({
          desc: desc, pc: { proc: i === 0 ? 2 : 3 }, vars: vars(a),
          status: { proc: zone(a).split(" ")[0] },
          note: note, svg: drawSvg(tasks, i + 1)
        });
      });
      var sum;
      if (mode === "easy") sum = "정리. 쉬운 과제의 수행은 각성 " + TASKS.easy.opt + " 근처에서 최고 — '''적당한 각성이 최적의 수행을 유도'''([[여키스-닷슨 법칙]]). 옵션을 '어려운 과제'로 바꿔 최적점이 어디로 가는지 보라.";
      else if (mode === "hard") sum = "정리. 어려운 과제의 최적점은 각성 " + TASKS.hard.opt + " — '''어려운 과제는 오히려 낮은 각성이 더 수행이 높다'''(p.6, Hembree, 1988).";
      else sum = "정리. 두 곡선 모두 역U자. 최적점: 쉬운 과제 " + TASKS.easy.opt + " > 어려운 과제 " + TASKS.hard.opt + " → 과제가 어려울수록 최적 각성이 '''낮아진다'''. 각성 8–9 에서는 어려운 과제의 수행이 더 크게 무너진다.";
      steps.push({
        desc: sum, pc: { proc: 5 }, vars: vars(mode === "hard" ? TASKS.hard.opt : TASKS.easy.opt),
        status: { proc: "정리" },
        note: "⚠ \"각성이 높을수록 수행이 좋다\" ✗ / \"어려운 과제일수록 각성을 높여라\" ✗",
        svg: drawSvg(tasks, LEVELS.length)
      });
      return {
        panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines }],
        vars: [
          { name: "각성 수준", group: "각성" }, { name: "구간", group: "각성" },
          { name: "쉬운 과제 수행(%)", group: "수행" }, { name: "어려운 과제 수행(%)", group: "수행" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
