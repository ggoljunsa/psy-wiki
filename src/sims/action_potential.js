// action_potential — 2장 p.6–7 활동 전위 · 역치 · 실무율 · 불응기 · 발화율
// 슬라이드에는 mV 수치가 없다 → 안정 −70 / 역치 −55 / 정점 +40mV 는 교과서 일반값(표시용).
// 기대(intensity): 역치 이상에서 스파이크 크기 항상 +40, 강도↑ → 발화율만↑ (실무율)
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var REST = -70, THR = -55, PEAK = 40;
  var FONT = "font-family:system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";

  // 강도별 표시용 예시값: 탈분극 최고치(역치 미만일 때), 발화율(회/초)
  var LEVELS = [
    { s: 0, depol: -70, rate: 0 },
    { s: 1, depol: -62, rate: 0 },
    { s: 2, depol: -55, rate: 10 },
    { s: 3, depol: -55, rate: 30 },
    { s: 4, depol: -55, rate: 60 },
    { s: 5, depol: -55, rate: 100 }
  ];

  function svgFrame(W, H, L, R, T, B, title) {
    function Y(mv) { return (B - (mv - (-90)) / (60 - (-90)) * (B - T)).toFixed(1); }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;' + FONT + '">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    [[PEAK, "+40 정점", "#d23f4c"], [0, "0", "#999"], [THR, "−55 역치", "#e08a3c"], [REST, "−70 안정", "#3a6fd8"]].forEach(function (g) {
      o.push('<line x1="' + L + '" y1="' + Y(g[0]) + '" x2="' + R + '" y2="' + Y(g[0]) + '" stroke="' + g[2] + '" stroke-opacity="0.55" stroke-dasharray="' + (g[0] === THR ? "6,4" : "2,4") + '"/>');
      o.push('<text x="' + (L - 6) + '" y="' + (+Y(g[0]) + 4) + '" font-size="11" fill="' + g[2] + '" text-anchor="end">' + g[1] + '</text>');
    });
    o.push('<text x="' + L + '" y="14" font-size="12" font-weight="bold" fill="#334">' + title + '</text>');
    o.push('<text x="' + R + '" y="' + (B + 16) + '" font-size="11" fill="#667" text-anchor="end">시간 →</text>');
    return { o: o, Y: Y };
  }

  // 스파이크 하나 경로 (x0 에서 시작, 폭 w)
  function spike(Y, x0, w) {
    return " L" + x0.toFixed(1) + "," + Y(THR) +
      " L" + (x0 + w * 0.25).toFixed(1) + "," + Y(PEAK) +
      " L" + (x0 + w * 0.55).toFixed(1) + "," + Y(-80) +
      " L" + (x0 + w).toFixed(1) + "," + Y(REST);
  }

  function drawIntensity(lv) {
    var W = 640, H = 240, L = 78, R = 620, T = 26, B = 210;
    var f = svgFrame(W, H, L, R, T, B, "막전위 기록 (1초 구간 · 표시용 예시값) — 자극 강도 " + lv.s);
    var o = f.o, Y = f.Y;
    var x0 = L + 10, x1 = R - 10;
    var d = "M" + L + "," + Y(REST) + " L" + x0 + "," + Y(REST);
    if (lv.rate === 0) {
      // 역치 미만: 작은 탈분극만 반복
      var bumps = lv.s === 0 ? 0 : 5;
      var span = (x1 - x0) / Math.max(1, bumps);
      for (var i = 0; i < bumps; i++) {
        var a = x0 + span * i;
        d += " L" + (a + span * 0.2).toFixed(1) + "," + Y(REST) + " L" + (a + span * 0.35).toFixed(1) + "," + Y(lv.depol) + " L" + (a + span * 0.6).toFixed(1) + "," + Y(REST);
      }
      d += " L" + R + "," + Y(REST);
    } else {
      var n = lv.rate / 10;           // 1초 동안 보여줄 스파이크 수(축소 표시)
      var gap = (x1 - x0) / n;
      var w = Math.min(22, gap * 0.8);
      for (var j = 0; j < n; j++) {
        var s0 = x0 + gap * j + (gap - w) / 2;
        d += " L" + s0.toFixed(1) + "," + Y(REST) + spike(Y, s0, w);
      }
      d += " L" + R + "," + Y(REST);
    }
    o.push('<path d="' + d + '" fill="none" stroke="#223" stroke-width="1.8"/>');
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#555"/>');
    o.push('<text x="' + ((L + R) / 2) + '" y="' + (H - 6) + '" font-size="12" fill="#334" text-anchor="middle">' +
      (lv.rate === 0 ? (lv.s === 0 ? "자극 없음 — 안정 전위 유지" : "역치(−55) 미만 — 발화 없음") : "스파이크 높이는 항상 +40 · 개수(발화율)만 증가: " + lv.rate + "회/초 (그림은 1/10 축소)") + '</text>');
    o.push('</svg>');
    return o.join("");
  }

  // 불응기 데모: 같은 강도(역치 이상) 자극 5번, 시각(ms)
  var REF_STIM = [0, 1, 3, 3.5, 6];
  var REF_LEN = 2; // 표시용 불응기 길이(ms)

  function drawRefractory(upto, fired) {
    var W = 640, H = 240, L = 78, R = 620, T = 26, B = 196;
    var f = svgFrame(W, H, L, R, T, B, "연속 자극과 불응기 (표시용 예시값, 0–8ms)");
    var o = f.o, Y = f.Y;
    function X(ms) { return L + 10 + ms / 8 * (R - L - 20); }
    // 불응기 음영
    fired.forEach(function (t, i) {
      if (i > upto) return;
      if (t === null) return;
      o.push('<rect x="' + X(t).toFixed(1) + '" y="' + T + '" width="' + (X(t + REF_LEN) - X(t)).toFixed(1) + '" height="' + (B - T) + '" fill="#e0525e" fill-opacity="0.10"/>');
      o.push('<text x="' + ((X(t) + X(t + REF_LEN)) / 2).toFixed(1) + '" y="' + (T + 12) + '" font-size="11" fill="#c0392b" text-anchor="middle">불응기</text>');
    });
    var d = "M" + L + "," + Y(REST);
    REF_STIM.forEach(function (t, i) {
      if (i > upto || fired[i] === null) return;
      var x = X(t);
      d += " L" + x.toFixed(1) + "," + Y(REST) + spike(Y, x, X(t + 1.6) - x);
    });
    d += " L" + R + "," + Y(REST);
    o.push('<path d="' + d + '" fill="none" stroke="#223" stroke-width="1.8"/>');
    // 자극 화살표
    REF_STIM.forEach(function (t, i) {
      if (i > upto) return;
      var x = X(t).toFixed(1), ok = fired[i] !== null;
      o.push('<text x="' + x + '" y="' + (B + 18) + '" font-size="13" fill="' + (ok ? "#2f9e6b" : "#c0392b") + '" text-anchor="middle">' + (ok ? "▲" : "✕") + '</text>');
      o.push('<text x="' + x + '" y="' + (B + 32) + '" font-size="11" fill="#556" text-anchor="middle">' + t + 'ms</text>');
    });
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#555"/>');
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["action_potential"] = {
    title: "활동 전위: 역치·실무율·발화율",
    desc: "자극을 조금씩 세게 한다. [[역치]]를 못 넘으면 아무 일도 없고, 넘으면 '''항상 같은 크기'''의 스파이크가 난다([[실무율]]). 자극이 강할수록 커지는 것은 스파이크 크기가 아니라 '''발화율'''이다 (2장 p.6–7).",
    options: [
      { key: "demo", label: "보여줄 것", values: [
        { value: "intensity", label: "자극 강도 0→5 (실무율·발화율)" },
        { value: "refractory", label: "연속 자극 (불응기)" }
      ] }
    ],
    build: function (opts) {
      var steps = [];
      if (opts.demo === "refractory") {
        var lines = [
          "1. 뉴런은 안정 전위(내부 음전하) 상태",
          "2. 역치 이상 자극 도착 → 탈분극 → 활동 전위 발화",
          "3. 발화 직후 불응기: 안정 전위로 돌아가기 전까지 발화 불가",
          "4. 불응기 중에 들어온 자극 → 무시됨",
          "5. 불응기가 끝난 뒤 들어온 자극 → 다시 같은 크기로 발화",
          "6. 정리: 불응기 때문에 발화 사이에 최소 간격이 생긴다"
        ];
        var fired = [];
        var lastFire = -Infinity, count = 0, ignored = 0;
        function rv(t, state, resp, size) {
          return { "시각(ms)": t, "자극 강도": "역치 이상(동일)", "뉴런 상태": state, "이번 자극 반응": resp, "스파이크 크기(mV)": size, "누적 스파이크": count, "무시된 자극": ignored };
        }
        steps.push({
          desc: "같은 세기(역치 이상)의 자극을 0, 1, 3, 3.5, 6ms 에 다섯 번 준다. 뉴런은 지금 '''안정 전위'''(−70mV) 상태다.",
          pc: { proc: 1 }, vars: rv("–", "안정 전위", "–", "–"),
          note: "−70 / −55 / +40mV 와 불응기 2ms 는 '''교과서 일반값(표시용)'''이다. 슬라이드에는 수치가 없다.",
          svg: drawRefractory(-1, fired)
        });
        REF_STIM.forEach(function (t, i) {
          var inRef = t < lastFire + REF_LEN;
          if (inRef) {
            fired.push(null); ignored++;
            steps.push({
              desc: t + "ms 자극 — 직전 발화(" + lastFire + "ms)의 '''불응기''' 안이다. 자극이 역치 이상인데도 활동 전위가 '''일어나지 않는다'''.",
              pc: { proc: 4 }, status: { proc: "불응기" },
              vars: rv(t, "불응기", "무시됨", "–"), svg: drawRefractory(i, fired.slice())
            });
          } else {
            fired.push(t); count++; lastFire = t;
            steps.push({
              desc: t + "ms 자극 — " + (i === 0 ? "역치를 넘어 탈분극, '''활동 전위 발화'''." : "불응기가 끝난 뒤라 다시 발화. 크기는 앞과 '''똑같이 +40mV'''.") + " 이어서 " + REF_LEN + "ms 동안 불응기.",
              pc: { proc: i === 0 ? 2 : 5 }, status: { proc: "발화" },
              vars: rv(t, "발화 → 불응기", "발화", "+" + PEAK), svg: drawRefractory(i, fired.slice())
            });
          }
        });
        steps.push({
          desc: "정리. 자극 5번 중 '''" + count + "번만''' 발화했고 " + ignored + "번은 불응기에 막혔다. 발화한 스파이크는 모두 같은 크기다. 불응기가 있으므로 발화율에는 상한이 있다.",
          pc: { proc: 6 }, vars: rv("–", "안정 전위", "–", "+" + PEAK), svg: drawRefractory(REF_STIM.length - 1, fired.slice())
        });
        return {
          panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines }],
          vars: [
            { name: "시각(ms)", group: "자극" }, { name: "자극 강도", group: "자극" },
            { name: "뉴런 상태", group: "뉴런" }, { name: "이번 자극 반응", group: "뉴런" },
            { name: "스파이크 크기(mV)", group: "뉴런" }, { name: "누적 스파이크", group: "합계" }, { name: "무시된 자극", group: "합계" }
          ],
          steps: steps
        };
      }

      var lines2 = [
        "1. 자극 강도 s 를 정한다 (0 → 5)",
        "2. 탈분극: 막전위가 안정 전위(−70)에서 올라간다",
        "3. 막전위가 역치(−55)에 못 미치면 → 발화 없음",
        "4. 역치에 도달하면 → 활동 전위 발화 (항상 같은 크기, +40)",
        "5. 자극이 셀수록 → 발화율(초당 발화 횟수) 증가",
        "6. 정리: 크기는 실무율, 강도 정보는 발화율로 전달"
      ];
      function iv(lv) {
        var fire = lv.rate > 0;
        return {
          "자극 강도": lv.s, "막전위 최고(mV)": fire ? PEAK : lv.depol,
          "역치 도달": fire ? "예" : "아니오",
          "스파이크 크기(mV)": fire ? "+" + PEAK : "없음",
          "발화율(회/초)": lv.rate
        };
      }
      LEVELS.forEach(function (lv, i) {
        var desc, pc, note = undefined;
        if (lv.s === 0) {
          desc = "자극 강도 '''0'''. 막전위는 안정 전위 −70mV 그대로. 뉴런 외부는 양전하, 내부는 음전하인 상태다.";
          pc = 1;
          note = "−70 / −55 / +40mV 와 발화율 숫자는 '''교과서 일반값·표시용 예시값'''이다(슬라이드에는 수치 없음).";
        } else if (lv.rate === 0) {
          desc = "자극 강도 '''" + lv.s + "'''. 양전하가 조금 들어와 " + lv.depol + "mV 까지 올라가지만 [[역치]](−55)에 못 미친다 → '''발화 없음'''. \"약하게 반쯤 발화\"하는 일은 없다.";
          pc = 3;
        } else if (i === 2) {
          desc = "자극 강도 '''" + lv.s + "''' — 드디어 역치 도달! [[활동 전위]]가 발화하고 막전위가 '''+40mV''' 까지 치솟는다. 발화율 " + lv.rate + "회/초.";
          pc = 4;
        } else {
          desc = "자극 강도 '''" + lv.s + "'''. 스파이크 높이는 여전히 '''+40mV''' (더 커지지 않음). 대신 발화율이 " + LEVELS[i - 1].rate + " → '''" + lv.rate + "회/초''' 로 늘었다. 뇌는 이 '''빈도'''로 자극의 세기를 판단한다.";
          pc = 5;
        }
        steps.push({
          desc: desc, pc: { proc: pc }, vars: iv(lv), note: note,
          status: { proc: lv.rate > 0 ? "발화" : "발화 없음" },
          svg: drawIntensity(lv)
        });
      });
      var top = LEVELS[LEVELS.length - 1];
      steps.push({
        desc: "정리. 역치 이상인 강도 2·3·4·5 에서 스파이크 크기는 '''모두 +40mV''' 로 같았고, 바뀐 것은 발화율(10 → 30 → 60 → 100회/초)뿐이다. 일어나면 전부, 아니면 전무 — 이것이 [[실무율]](All or None)이다.",
        pc: { proc: 6 }, vars: iv(top), status: { proc: "실무율" },
        note: "시험 함정: \"강한 자극은 더 큰 활동 전위를 만든다\" (✗) → 크기는 동일, '''발화율'''이 증가.",
        svg: drawIntensity(top)
      });
      return {
        panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines2 }],
        vars: [
          { name: "자극 강도", group: "자극" },
          { name: "막전위 최고(mV)", group: "뉴런" }, { name: "역치 도달", group: "뉴런" },
          { name: "스파이크 크기(mV)", group: "뉴런" }, { name: "발화율(회/초)", group: "뉴런" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
