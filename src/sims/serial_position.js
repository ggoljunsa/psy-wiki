// serial_position — 6장 p.32 계열 위치 효과 (초두 효과 · 최신 효과)
// 표시용 예시값 즉시: .80 .70 .55 .45 .40 .40 .45 .60 .75 .85 (U자)
// delayed(30초 암산): 1–7번 동일, 8–10번 ≈ .40 → 초두 효과 유지·최신 효과 소멸
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var FONT = "font-family:system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";
  var WORDS = ["사과", "의자", "구름", "연필", "바다", "시계", "우산", "호랑이", "편지", "나무"];
  var IMM = [0.80, 0.70, 0.55, 0.45, 0.40, 0.40, 0.45, 0.60, 0.75, 0.85];
  var DEL = [0.80, 0.70, 0.55, 0.45, 0.40, 0.40, 0.45, 0.40, 0.40, 0.40];
  // 되뇌기 상한: 앞 단어일수록 되뇌기 여유가 많다 (표시용)
  var REH_CAP = [5, 4, 3, 2, 1, 1, 1, 1, 1, 1];

  function f2(p) { return p.toFixed(2).replace(/^0\./, "."); }
  function region(i) { return i < 3 ? "초두" : (i >= 7 ? "최신" : "중간"); }
  function avg(a, s, e) { var t = 0; for (var i = s; i < e; i++) t += a[i]; return t / (e - s); }

  // mode: "present"(되뇌기 막대, upto 까지 제시) / "recall"(회상 곡선, upto 까지 공개)
  function drawSvg(mode, upto, reh, probs, delayed) {
    var W = 640, H = 270, L = 48, R = 620, T = 30, B = 214;
    var cw = (R - L) / 10;
    function Xc(i) { return L + cw * (i + 0.5); }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;' + FONT + '">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    // 구간 배경
    o.push('<rect x="' + L + '" y="' + T + '" width="' + (cw * 3) + '" height="' + (B - T) + '" fill="#2f9e6b" fill-opacity="0.07"/>');
    o.push('<rect x="' + (L + cw * 7) + '" y="' + T + '" width="' + (cw * 3) + '" height="' + (B - T) + '" fill="#3a6fd8" fill-opacity="0.07"/>');
    o.push('<text x="' + (L + cw * 1.5) + '" y="' + (T + 14) + '" font-size="12" fill="#2f9e6b" text-anchor="middle">초두(1–3)</text>');
    o.push('<text x="' + (L + cw * 8.5) + '" y="' + (T + 14) + '" font-size="12" fill="#3a6fd8" text-anchor="middle">최신(8–10)</text>');
    for (var i = 0; i < 10; i++) {
      var on = i <= upto;
      o.push('<text x="' + Xc(i).toFixed(1) + '" y="' + (B + 16) + '" font-size="12" fill="' + (on ? "#223" : "#b4bcc8") + '" text-anchor="middle">' + WORDS[i] + '</text>');
      o.push('<text x="' + Xc(i).toFixed(1) + '" y="' + (B + 30) + '" font-size="10" fill="#8b95a5" text-anchor="middle">' + (i + 1) + '</text>');
    }
    if (mode === "present") {
      o.push('<text x="' + L + '" y="16" font-size="12" font-weight="bold" fill="#334">제시 단계 — 단어별 되뇌기 누적 횟수 (표시용)</text>');
      var ym = 6;
      function Yr(v) { return B - v / ym * (B - T - 22); }
      for (var j = 0; j <= upto && j < 10; j++) {
        var h = B - Yr(reh[j]);
        o.push('<rect x="' + (Xc(j) - 16).toFixed(1) + '" y="' + Yr(reh[j]).toFixed(1) + '" width="32" height="' + h.toFixed(1) + '" fill="' + (j === upto ? "#e08a3c" : "#9fb3d6") + '"/>');
        o.push('<text x="' + Xc(j).toFixed(1) + '" y="' + (Yr(reh[j]) - 4).toFixed(1) + '" font-size="12" fill="#223" text-anchor="middle">' + reh[j] + '</text>');
      }
    } else {
      o.push('<text x="' + L + '" y="16" font-size="12" font-weight="bold" fill="#334">회상 단계 — 위치별 회상 확률 (표시용 예시값)' + (delayed ? " · 30초 암산 후" : " · 즉시 회상") + '</text>');
      function Y(p) { return (B - p * (B - T - 22)).toFixed(1); }
      [0, 0.5, 1].forEach(function (g) {
        o.push('<line x1="' + L + '" y1="' + Y(g) + '" x2="' + R + '" y2="' + Y(g) + '" stroke="#ccd3de" stroke-opacity="0.6"/>');
        o.push('<text x="' + (L - 6) + '" y="' + (+Y(g) + 4) + '" font-size="11" fill="#667" text-anchor="end">' + (g === 0 ? "0" : g === 1 ? "1" : ".5") + '</text>');
      });
      if (delayed) {
        // 비교용 즉시 회상 곡선(점선)
        o.push('<polyline points="' + IMM.map(function (p, k) { return Xc(k).toFixed(1) + "," + Y(p); }).join(" ") + '" fill="none" stroke="#8b95a5" stroke-dasharray="4,4"/>');
        o.push('<text x="' + (R - 4) + '" y="' + (+Y(IMM[9]) - 6) + '" font-size="11" fill="#8b95a5" text-anchor="end">즉시 회상</text>');
      }
      var pts = [];
      for (var k = 0; k <= upto && k < 10; k++) pts.push(Xc(k).toFixed(1) + "," + Y(probs[k]));
      if (pts.length > 1) o.push('<polyline points="' + pts.join(" ") + '" fill="none" stroke="#d23f4c" stroke-width="2.4"/>');
      for (var m = 0; m <= upto && m < 10; m++) {
        o.push('<circle cx="' + Xc(m).toFixed(1) + '" cy="' + Y(probs[m]) + '" r="' + (m === upto ? 6 : 4) + '" fill="#d23f4c" stroke="#fff" stroke-width="1.5"/>');
        o.push('<text x="' + Xc(m).toFixed(1) + '" y="' + (+Y(probs[m]) - 10) + '" font-size="11" fill="#223" text-anchor="middle">' + f2(probs[m]) + '</text>');
      }
    }
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#555"/>');
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["serial_position"] = {
    title: "계열 위치 효과: 처음과 끝이 잘 기억난다",
    desc: "단어 10개를 하나씩 듣고 순서와 상관없이 회상한다. 앞 단어는 '''되뇌기 여유'''가 많아서(초두 효과), 끝 단어는 아직 '''단기/작업 기억'''에 남아 있어서(최신 효과) 잘 기억난다 (6장 p.32). 확률·되뇌기 횟수는 '''표시용 예시값'''. [[계열 위치 효과]]",
    options: [
      { key: "delay", label: "회상 시점", values: [
        { value: "immediate", label: "즉시 회상" },
        { value: "delayed", label: "30초 암산 후 회상" }
      ] }
    ],
    build: function (opts) {
      var delayed = opts.delay === "delayed";
      var probs = delayed ? DEL : IMM;
      var lines = [
        "1. 단어를 하나씩 제시 (1초에 1개, 총 10개)",
        "2. 새 단어가 들어올 때마다 앞 단어들을 마음속으로 되뇌기",
        delayed ? "3. 마지막 단어 직후 30초 동안 거꾸로 암산(되뇌기 차단)" : "3. 마지막 단어 직후 바로 회상 시작",
        "4. 생각나는 단어를 순서 상관없이 적기 (자유 회상)",
        "5. 위치별 회상 확률을 그린다",
        "6. 정리: 초두 효과 · 최신 효과"
      ];
      var steps = [];
      var reh = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      function v(pos, word, rehN, p, reg, prim, rec) {
        return { "위치": pos, "단어": word, "되뇌기 누적": rehN, "회상 확률": p, "구간": reg, "초두 평균(1–3)": prim, "최신 평균(8–10)": rec };
      }
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j <= i; j++) reh[j] = Math.min(i - j + 1, REH_CAP[j]);
        var snap = reh.slice();
        steps.push({
          desc: i + 1 + "번째 단어 '''" + WORDS[i] + "'''. " +
            (i === 0 ? "아직 머릿속에 이 단어 하나뿐이라 여러 번 되뇔 수 있다." :
              i < 4 ? "앞 단어들(" + WORDS.slice(0, i).join("·") + ")을 함께 되뇐다 — 앞 단어일수록 되뇌기 횟수가 쌓인다." :
              "이제 목록이 길어져 새 단어는 '''한 번'''밖에 되뇌지 못한다."),
          pc: { proc: i === 0 ? 1 : 2 }, status: { proc: "제시 " + (i + 1) + "/10" },
          vars: v(i + 1, WORDS[i], snap[i], "–", region(i), "–", "–"),
          note: i === 0 ? "되뇌기 횟수와 회상 확률은 교과서 그래프 모양을 따른 '''표시용 예시값'''이다(슬라이드에 수치 없음)." : undefined,
          svg: drawSvg("present", i, snap, probs, delayed)
        });
      }
      steps.push({
        desc: delayed
          ? "30초 동안 \"100에서 3씩 빼기\" 같은 암산을 시킨다. 되뇌기가 막히는 동안 '''단기/작업 기억'''에 있던 마지막 단어들이 사라진다."
          : "마지막 단어(" + WORDS[9] + ")가 끝나자마자 회상을 시작한다. 마지막 몇 단어는 아직 '''단기/작업 기억'''에 그대로 있다.",
        pc: { proc: 3 }, status: { proc: delayed ? "암산 30초" : "즉시" },
        vars: v("–", "–", "–", "–", "–", "–", "–"),
        svg: drawSvg("present", 9, reh.slice(), probs, delayed)
      });
      for (var k = 0; k < 10; k++) {
        var reg = region(k);
        var extra = "";
        if (k === 0) extra = " 되뇌기를 가장 많이 한 단어 → 장기 기억으로 넘어갔다(초두 효과).";
        else if (k === 4 || k === 5) extra = " 중간 단어는 되뇌기도 적고 단기 기억에서도 밀려나 '''가장 낮다'''.";
        else if (k >= 7) extra = delayed ? " 암산하는 동안 단기 기억에서 사라져 '''최신 효과가 없어졌다'''." : " 방금 들은 단어라 단기 기억에서 바로 꺼낸다(최신 효과).";
        steps.push({
          desc: (k + 1) + "번 '''" + WORDS[k] + "''' 회상 확률 " + f2(probs[k]) + "." + extra,
          pc: { proc: k === 0 ? 4 : 5 }, status: { proc: reg },
          vars: v(k + 1, WORDS[k], reh[k], f2(probs[k]), reg, k >= 2 ? f2(avg(probs, 0, 3)) : "–", k >= 9 ? f2(avg(probs, 7, 10)) : "–"),
          svg: drawSvg("recall", k, reh.slice(), probs, delayed)
        });
      }
      var pa = f2(avg(probs, 0, 3)), ra = f2(avg(probs, 7, 10));
      steps.push({
        desc: delayed
          ? "정리. 30초 지연 후: 초두 평균 " + pa + " 은 '''그대로''', 최신 평균은 " + f2(avg(IMM, 7, 10)) + " → '''" + ra + "''' 로 떨어졌다. 초두 효과(장기 기억)는 유지되고, 최신 효과(단기/작업 기억)는 일정 시간이 지나면 쇠퇴하여 사라진다."
          : "정리. 회상 곡선이 '''U자'''다. 초두 평균 " + pa + ", 최신 평균 " + ra + ", 가운데(5·6번)는 .40 으로 가장 낮다. 앞쪽 = [[계열 위치 효과|초두 효과]](되뇌기 여유 → 장기 기억), 뒤쪽 = 최신 효과(단기/작업 기억).",
        pc: { proc: 6 }, status: { proc: delayed ? "최신 효과 소멸" : "U자" },
        vars: v("–", "–", "–", "–", "–", pa, ra),
        note: delayed
          ? "시험 포인트(bank 6장): 지연 회상 → '''초두 효과 유지, 최신 효과 소멸'''. 최신 효과는 단기/작업 기억 영역에 가깝다 (p.32)."
          : "옵션을 \"30초 암산 후 회상\" 으로 바꿔 보면 오른쪽 끝이 무너진다.",
        svg: drawSvg("recall", 9, reh.slice(), probs, delayed)
      });
      return {
        panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines }],
        vars: [
          { name: "위치", group: "현재 단어" }, { name: "단어", group: "현재 단어" },
          { name: "되뇌기 누적", group: "현재 단어" }, { name: "회상 확률", group: "현재 단어" }, { name: "구간", group: "현재 단어" },
          { name: "초두 평균(1–3)", group: "요약" }, { name: "최신 평균(8–10)", group: "요약" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
