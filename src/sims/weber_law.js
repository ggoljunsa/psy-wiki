// weber_law — 4장 p.7 차이 역치 · 베버의 법칙 (🎙 교수 예시: 100kg 가방, 10% → 110 → 121kg)
// 기대: k=10%, ratio: 100 → 110 → 121 → 133.1 → 146.41 (JND 10, 11, 12.1, 13.31). absolute: 110 → 120 (bank 오답 ③)
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  function r(x) { return Math.round(x * 10000) / 10000; }
  function kg(x) { return String(r(x)); }

  var ROUNDS = 4;

  function drawSvg(hist, mode, k) {
    // hist: [{w, jnd, next}] 지금까지의 단계
    var W = 640, H = 250, L = 56, R = 620, T = 22, B = 200;
    var maxW = 100;
    hist.forEach(function (h) { if (h.next > maxW) maxW = h.next; });
    var top = Math.max(150, Math.ceil(maxW / 10) * 10 + 10);
    var bot = 90;
    if (k <= 0.02) { top = 112; bot = 96; }
    function Y(v) { return (B - (v - bot) / (top - bot) * (B - T)).toFixed(1); }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;font-family:system-ui,-apple-system,\'Apple SD Gothic Neo\',\'Malgun Gothic\',sans-serif">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    // 눈금
    var stepTick = (top - bot) > 30 ? 10 : 2;
    for (var v = Math.ceil(bot / stepTick) * stepTick; v <= top; v += stepTick) {
      o.push('<line x1="' + L + '" y1="' + Y(v) + '" x2="' + R + '" y2="' + Y(v) + '" stroke="#ccd3de" stroke-opacity="0.6"/>');
      o.push('<text x="' + (L - 6) + '" y="' + (+Y(v) + 4) + '" font-size="11" fill="#667" text-anchor="end">' + v + '</text>');
    }
    o.push('<text x="' + (L - 6) + '" y="' + (T - 8) + '" font-size="11" fill="#667" text-anchor="end">kg</text>');
    var colW = (R - L) / (ROUNDS + 1);
    for (var i = 0; i < hist.length; i++) {
      var h = hist[i];
      var x = L + colW * (i + 0.5);
      // 현재 무게 막대
      o.push('<rect x="' + (x - 18) + '" y="' + Y(h.w) + '" width="36" height="' + (B - Y(h.w)).toFixed(1) + '" fill="#9fb3d6"/>');
      // JND 증가분
      o.push('<rect x="' + (x - 18) + '" y="' + Y(h.next) + '" width="36" height="' + (Y(h.w) - Y(h.next)).toFixed(1) + '" fill="' + (mode === "absolute" ? "#e08a3c" : "#2f9e6b") + '"/>');
      o.push('<text x="' + x + '" y="' + (+Y(h.next) - 5) + '" font-size="12" font-weight="bold" fill="#223" text-anchor="middle">' + kg(h.next) + '</text>');
      o.push('<text x="' + (x + 22) + '" y="' + ((+Y(h.w) + +Y(h.next)) / 2 + 4).toFixed(1) + '" font-size="11" fill="#555">+' + kg(h.jnd) + '</text>');
      o.push('<text x="' + x + '" y="' + (B + 16) + '" font-size="11" fill="#445" text-anchor="middle">' + kg(h.w) + 'kg에서</text>');
      if (i < hist.length - 1) {
        var x2 = L + colW * (i + 1.5);
        o.push('<path d="M' + (x + 18) + ',' + Y(h.next) + ' L' + (x2 - 18) + ',' + Y(h.next) + '" stroke="#888" stroke-dasharray="3,3" fill="none"/>');
      }
    }
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#555"/>');
    o.push('<text x="' + L + '" y="' + (H - 8) + '" font-size="12" fill="' + (mode === "absolute" ? "#e08a3c" : "#2f9e6b") + '">■ ' +
      (mode === "absolute" ? '매번 +' + kg(100 * k) + 'kg (오개념: 절대량)' : '차이 역치(JND) = 현재 무게 × ' + Math.round(k * 100) + '% (베버: 일정 비율)') + '</text>');
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["weber_law"] = {
    title: "베버의 법칙: 무거운 가방에 얼마를 더해야 '더 무겁다'?",
    desc: "4장 p.7 🎙 교수 예시. 100kg 가방이 10% 늘어야 무겁다고 느낀다면, 다음엔 10kg 이 아니라 110kg 의 10% = 11kg 이 더 필요하다. [[차이 역치]]는 절대량이 아니라 '''현재 자극의 일정 비율'''이다.",
    options: [
      { key: "k", label: "베버 비율 k", values: [
        { value: "10", label: "10% (교수 예시)" },
        { value: "2", label: "2%" }
      ] },
      { key: "mode", label: "계산 방식", values: [
        { value: "ratio", label: "비율 (베버의 법칙)" },
        { value: "absolute", label: "절대량 (오개념: 매번 같은 kg)" }
      ] }
    ],
    build: function (opts) {
      var k = Number(opts.k || 10) / 100;
      var mode = opts.mode === "absolute" ? "absolute" : "ratio";
      var pct = Math.round(k * 100);
      var fixed = 100 * k; // 절대량 모드에서 매번 더하는 양 (첫 JND)
      var lines = [
        "1. 기준 자극: 가방 무게 W = 100kg",
        mode === "ratio"
          ? "2. 차이 역치(JND) = 현재 무게 W × k   (k = " + pct + "%)"
          : "2. (오개념) 차이 역치 = 처음과 같은 " + kg(fixed) + "kg 을 매번 더함",
        "3. \"더 무겁다\"고 느끼는 최소 무게 = W + JND",
        "4. 그 무게를 새 기준 W 로 삼고 2번부터 반복",
        "5. 정리: ΔI / I = k (일정 비율)"
      ];
      var steps = [];
      var hist = [];
      var w = 100;
      function v(cur, jnd, next, weber) {
        return {
          "현재 무게 W(kg)": cur, "베버 비율 k": pct + "%",
          "JND(kg)": jnd, "최소 '더 무겁다' 무게(kg)": next,
          "ΔI / I": (jnd === "–") ? "–" : (Math.round(Number(jnd) / Number(cur) * 10000) / 100 + "%"),
          "베버 법칙 예측(kg)": weber
        };
      }
      steps.push({
        desc: "기준 가방은 '''100kg'''. 두 무게가 다르다는 것을 탐지할 확률이 0.5 가 되는 최소 차이가 [[차이 역치]](최소식별차이, JND)이다. 이 사람의 베버 비율은 k = " + pct + "% 라고 하자.",
        pc: { proc: 1 }, vars: v(100, "–", "–", "–"),
        note: pct === 10
          ? "k = 10% 는 교수 예시를 위한 값이다(감각마다 실제 비율은 다르다)."
          : "k = " + pct + "% 는 비교용 가상 값이다(교수 예시는 10%; 감각마다 실제 비율은 다르다).",
        svg: drawSvg([], mode, k)
      });
      var weberW = 100;
      for (var i = 0; i < ROUNDS; i++) {
        var jnd = mode === "ratio" ? w * k : fixed;
        var next = w + jnd;
        var weberNext = weberW * (1 + k);
        hist.push({ w: w, jnd: jnd, next: next });
        var desc, note = undefined;
        if (i === 0) {
          desc = "현재 " + kg(w) + "kg. JND = " + kg(w) + " × " + pct + "% = '''" + kg(jnd) + "kg''' → '''" + kg(next) + "kg''' 이 되어야 \"더 무겁다\"고 느낀다.";
        } else if (mode === "ratio") {
          desc = "이제 기준은 " + kg(w) + "kg. JND 는 처음의 " + kg(hist[0].jnd) + "kg 이 아니라 " + kg(w) + " × " + pct + "% = '''" + kg(jnd) + "kg''' → '''" + kg(next) + "kg''' 이 필요하다. 무거울수록 필요한 차이(절대량)가 커진다.";
        } else {
          desc = "(오개념) 기준 " + kg(w) + "kg 에 다시 같은 " + kg(jnd) + "kg 을 더해 " + kg(next) + "kg 이면 된다고 생각했다. 그러나 베버의 법칙대로라면 " + kg(weberW) + " × " + pct + "% 를 더한 '''" + kg(weberNext) + "kg''' 이 필요하다.";
        }
        if (mode === "absolute" && i === 1 && pct === 10) {
          note = "⚠ 120kg 은 bank 4장 객관식의 '''오답 보기 ③'''이다. 베버의 법칙은 절대량이 아니라 비율 → 110kg 의 10% = 11kg → 정답 ④ '''121kg'''.";
        } else if (mode === "absolute" && i === 1) {
          note = "⚠ 매번 같은 양을 더하는 것은 베버의 법칙이 아니다. 비율로 계산하면 " + kg(weberNext) + "kg.";
        } else if (mode === "ratio" && i === 1 && pct === 10) {
          note = "이 값 '''121kg''' 이 bank 4장 객관식 정답 ④ (오답 ③ 120kg 은 10kg 을 또 더한 절대량 계산).";
        }
        steps.push({
          desc: desc, pc: { proc: i === 0 ? 2 : 4 },
          vars: v(kg(w), kg(jnd), kg(next), kg(weberNext)),
          status: { proc: (i + 1) + "회차" },
          note: note,
          svg: drawSvg(hist.slice(), mode, k)
        });
        w = next;
        weberW = weberNext;
      }
      var lastH = hist[hist.length - 1];
      steps.push({
        desc: mode === "ratio"
          ? "정리. 필요한 차이는 " + hist.map(function (h) { return kg(h.jnd); }).join(" → ") + "kg 으로 '''점점 커지지만''', 현재 무게에 대한 비율 ΔI / I 는 언제나 " + pct + "% 로 '''일정'''하다. 이것이 [[베버의 법칙]]이다."
          : "정리. 절대량으로 더하면 비율 ΔI / I 가 " + hist.map(function (h) { return Math.round(h.jnd / h.w * 10000) / 100 + "%"; }).join(" → ") + " 로 점점 작아진다 — 무거울수록 차이를 '''못''' 느끼게 된다. 베버의 법칙은 이 비율이 일정해야 한다는 법칙이다.",
        pc: { proc: 5 },
        vars: v(kg(lastH.w), kg(lastH.jnd), kg(lastH.next), kg(weberW)),
        status: { proc: mode === "ratio" ? "베버" : "오개념" },
        note: mode === "absolute" ? "⚠ 오개념 모드였다. 시험에서는 비율(베버)로 계산할 것." : undefined,
        svg: drawSvg(hist.slice(), mode, k)
      });
      return {
        panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines }],
        vars: [
          { name: "현재 무게 W(kg)", group: "자극" }, { name: "베버 비율 k", group: "자극" },
          { name: "JND(kg)", group: "차이 역치" }, { name: "최소 '더 무겁다' 무게(kg)", group: "차이 역치" },
          { name: "ΔI / I", group: "차이 역치" }, { name: "베버 법칙 예측(kg)", group: "검산" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
