// classical_conditioning — 5장 p.7–11 파블로프식 조건형성
// 표시용 예시값: 획득 20→40→60→75→85, 소거 70→50→30→15→5, 자발적 회복 40 (회복 < 85, > 5)
// backward(p.10): 최종 CR ≤ 10. higher_order(p.10): 불빛=CS2, 1차(85)보다 약함
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var FONT = "font-family:system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";

  var PHASE_COLOR = {
    "사전 검사": "#8b95a5", "획득": "#2f9e6b", "소거": "#d23f4c", "휴지기": "#b0b8c4",
    "자발적 회복": "#7a4fd0", "역순 짝짓기": "#e08a3c", "검사": "#7a4fd0", "고차 조건형성": "#3a6fd8"
  };

  // pts: [{label, cr (number|null), phase}]  — 지금까지의 trial
  function drawSvg(pts, total, title) {
    var W = 660, H = 250, L = 46, R = 640, T = 30, B = 196;
    function X(i) { return L + 14 + i * (R - L - 28) / Math.max(1, total - 1); }
    function Y(v) { return (B - v / 100 * (B - T)).toFixed(1); }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;' + FONT + '">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    o.push('<text x="' + L + '" y="16" font-size="12" font-weight="bold" fill="#334">' + title + '</text>');
    [0, 25, 50, 75, 100].forEach(function (v) {
      o.push('<line x1="' + L + '" y1="' + Y(v) + '" x2="' + R + '" y2="' + Y(v) + '" stroke="#ccd3de" stroke-opacity="0.6"/>');
      o.push('<text x="' + (L - 6) + '" y="' + (+Y(v) + 4) + '" font-size="11" fill="#667" text-anchor="end">' + v + '</text>');
    });
    o.push('<text x="' + (L - 6) + '" y="' + (T - 8) + '" font-size="11" fill="#667" text-anchor="end">CR%</text>');
    // 단계 띠
    var i0 = 0;
    for (var i = 1; i <= pts.length; i++) {
      if (i === pts.length || pts[i].phase !== pts[i0].phase) {
        var col = PHASE_COLOR[pts[i0].phase] || "#999";
        var xa = X(i0) - 10, xb = X(i - 1) + 10;
        o.push('<rect x="' + xa.toFixed(1) + '" y="' + B + '" width="' + (xb - xa).toFixed(1) + '" height="20" fill="' + col + '" fill-opacity="0.18"/>');
        o.push('<text x="' + ((xa + xb) / 2).toFixed(1) + '" y="' + (B + 14) + '" font-size="11" fill="' + col + '" text-anchor="middle">' + pts[i0].phase + '</text>');
        i0 = i;
      }
    }
    // 선
    var seg = [];
    pts.forEach(function (p, k) {
      if (p.cr === null) { if (seg.length > 1) o.push('<polyline points="' + seg.join(" ") + '" fill="none" stroke="#334" stroke-width="2"/>'); seg = []; return; }
      seg.push(X(k).toFixed(1) + "," + Y(p.cr));
    });
    if (seg.length > 1) o.push('<polyline points="' + seg.join(" ") + '" fill="none" stroke="#334" stroke-width="2"/>');
    pts.forEach(function (p, k) {
      var cur = k === pts.length - 1;
      if (p.cr === null) {
        o.push('<text x="' + X(k).toFixed(1) + '" y="' + (B - 6) + '" font-size="12" fill="#8b95a5" text-anchor="middle">…</text>');
      } else {
        o.push('<circle cx="' + X(k).toFixed(1) + '" cy="' + Y(p.cr) + '" r="' + (cur ? 6 : 4) + '" fill="' + (PHASE_COLOR[p.phase] || "#334") + '" stroke="#fff" stroke-width="1.5"/>');
        if (cur || p.mark) o.push('<text x="' + X(k).toFixed(1) + '" y="' + (+Y(p.cr) - 10) + '" font-size="12" font-weight="bold" fill="#223" text-anchor="middle">' + p.cr + '</text>');
      }
      o.push('<text x="' + X(k).toFixed(1) + '" y="' + (B + 34) + '" font-size="10" fill="#667" text-anchor="middle">' + p.label + '</text>');
    });
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#555"/>');
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["classical_conditioning"] = {
    title: "고전적 조건화: 획득 · 소거 · 자발적 회복",
    desc: "종소리(중성 자극)와 먹이(무조건 자극)를 짝지어 주면 종소리만으로 침이 나오게 된다. trial 마다 '''종소리에 대한 조건 반응(CR) 강도'''가 어떻게 변하는지 본다 (5장 p.7–11). CR 강도(%)는 '''표시용 예시값'''이다.",
    options: [
      { key: "scenario", label: "시나리오", values: [
        { value: "acquisition", label: "획득 → 소거 → 자발적 회복" },
        { value: "backward", label: "역순 (US 먼저 → NS)" },
        { value: "higher_order", label: "고차 조건형성 (불빛+종)" }
      ] }
    ],
    build: function (opts) {
      var sc = opts.scenario || "acquisition";
      var lines, steps = [], pts = [], total;
      function v(phase, trial, shown, sname, rname, cr) {
        return { "단계": phase, "시행": trial, "제시 자극": shown, "자극 이름": sname, "반응 이름": rname, "CR 강도(%)": cr };
      }
      function push(desc, pc, vars, ptLabel, status, note) {
        pts.push({ label: ptLabel, cr: typeof vars["CR 강도(%)"] === "number" ? vars["CR 강도(%)"] : null, phase: vars["단계"], mark: false });
        var snap = pts.map(function (p) { return { label: p.label, cr: p.cr, phase: p.phase, mark: p.mark }; });
        var t = sc === "higher_order" ? "검사 자극에 대한 CR 강도 (표시용 예시값)" : "종소리에 대한 CR 강도 (표시용 예시값)";
        steps.push({ desc: desc, pc: { proc: pc }, vars: vars, status: { proc: status }, note: note, svg: drawSvg(snap, total, t) });
      }

      var pre = [
        ["사전 검사 ①: '''먹이'''를 준다 → 개가 침을 흘린다. 먹이는 학습 없이 반응을 일으키는 [[무조건 자극]](US), 침은 [[무조건 반응]](UR)이다. (종소리 CR 은 아직 0)",
          1, v("사전 검사", "–", "먹이", "US", "UR (침)", 0), "US"],
        ["사전 검사 ②: '''종소리'''만 들려준다 → 침이 나오지 않는다. 지금 종소리는 [[중성 자극]](NS)이다.",
          2, v("사전 검사", "–", "종소리", "NS", "없음", 0), "NS"]
      ];

      if (sc === "backward") {
        lines = [
          "1. 사전 검사: 무조건 자극(US: 먹이) 제시 → 무조건 반응(UR: 침) 확인",
          "2. 사전 검사: 중성 자극(NS: 종소리)만 제시 → 반응 없음",
          "3. 역순 짝짓기: US(먹이)를 먼저 → 그다음 NS(종소리), 5회 반복",
          "4. 검사: 종소리만 제시 → 침이 나오나?",
          "5. 정리: US 가 NS 보다 먼저면 조건 형성은 거의 일어나지 않는다"
        ];
        total = 2 + 5 + 1;
        pre.forEach(function (p, i) { push(p[0], p[1], p[2], p[3], "사전", i === 0 ? "CR 강도(%)는 표시용 예시값이다(슬라이드에 수치 없음)." : undefined); });
        var bw = [2, 4, 6, 8, 8];
        bw.forEach(function (cr, i) {
          push("역순 짝짓기 " + (i + 1) + "회: '''먹이 먼저''', 그다음 종소리. 종소리가 먹이를 '''예고하지 못하므로''' 연합이 거의 생기지 않는다 → 종소리 CR " + cr + "%.",
            3, v("역순 짝짓기", i + 1, "먹이 → 종소리", "NS (US 뒤)", cr > 0 ? "아주 약한 반응" : "없음", cr), "역" + (i + 1), "역순");
        });
        push("검사: 종소리만 들려준다 → 침이 거의 나오지 않는다(CR 8%). 종소리는 [[조건 자극]]이 되지 못했다.",
          4, v("검사", "–", "종소리", "NS (CS 아님)", "거의 없음", 8), "검사", "검사");
        steps[steps.length - 1].note = "5장 p.10: \"무조건자극이 중립 자극 '''이전에''' 제시되면, 조건 형성은 거의 발생하지 않음\". 순서가 중요하다 — NS 가 먼저, US 가 뒤.";
        steps.push({ desc: "정리. 같은 5회를 짝지었는데도 순서가 '''US → NS''' 이면 CR 은 10% 이하에 머문다. 고전적 조건화의 핵심은 NS 가 US 를 '''예고'''하는 연합이다.",
          pc: { proc: 5 }, vars: v("검사", "–", "종소리", "NS (CS 아님)", "거의 없음", 8), status: { proc: "실패" },
          svg: steps[steps.length - 1].svg });
      } else if (sc === "higher_order") {
        lines = [
          "1. 사전 검사: 무조건 자극(US: 먹이) 제시 → 무조건 반응(UR: 침) 확인",
          "2. 사전 검사: 중성 자극(NS: 종소리)만 제시 → 반응 없음",
          "3. 1차 조건형성: 종소리 → 먹이, 5회 반복 → 종소리 = CS1",
          "4. 고차 조건형성: 불빛(새 NS) → 종소리(CS1), 먹이 없이 5회 반복",
          "5. 검사: 불빛만 제시 → 침이 나오나? (불빛 = CS2)",
          "6. 정리: 고차 조건형성은 1차보다 약하게 형성된다"
        ];
        total = 2 + 5 + 5 + 1;
        pre.forEach(function (p, i) { push(p[0], p[1], p[2], p[3], "사전", i === 0 ? "CR 강도(%)는 표시용 예시값이다(슬라이드에 수치 없음)." : undefined); });
        [20, 40, 60, 75, 85].forEach(function (cr, i) {
          push("1차 조건형성 " + (i + 1) + "회: 종소리 → 먹이. 종소리 CR " + cr + "%." + (i === 4 ? " 이제 종소리는 '''CS1''' (1차 [[조건 자극]])." : ""),
            3, v("획득", i + 1, "종소리 → 먹이", i === 4 ? "CS1" : "NS → CS", "CR (침)", cr), "1차" + (i + 1), "1차");
        });
        pts[pts.length - 1].mark = true;
        [10, 20, 30, 35, 40].forEach(function (cr, i) {
          push("고차 " + (i + 1) + "회: '''불빛 → 종소리'''(먹이 없음). 불빛이 CS1(종소리)과 연합되어 불빛 CR " + cr + "%.",
            4, v("고차 조건형성", i + 1, "불빛 → 종소리", "NS2 → CS2", "CR (침)", cr), "고" + (i + 1), "2차");
        });
        push("검사: 불빛만 보여 준다 → 침이 나온다(CR 40%). 먹이와 한 번도 짝지어진 적 없는 불빛이 '''CS2''' 가 되었다 → [[고차 조건형성]].",
          5, v("검사", "–", "불빛", "CS2", "CR (침)", 40), "검사", "CS2");
        steps.push({ desc: "정리. 불빛(CS2)의 CR 40% 는 1차 종소리(CS1)의 최대 85% 보다 '''약하다'''. 고차 조건형성은 1차보다 약하게 형성되지만, 일상 삶에 영향을 줄 수 있다 (p.10).",
          pc: { proc: 6 }, vars: v("검사", "–", "불빛", "CS2", "CR (침)", 40), status: { proc: "CS2" },
          note: "고차 조건형성 = 한 조건 자극(종)을 다른 중성 자극(불빛)과 연합시켜 조건화. 먹이(US)는 2차 단계에서 쓰지 않는다.",
          svg: steps[steps.length - 1].svg });
      } else {
        lines = [
          "1. 사전 검사: 무조건 자극(US: 먹이) 제시 → 무조건 반응(UR: 침) 확인",
          "2. 사전 검사: 중성 자극(NS: 종소리)만 제시 → 반응 없음",
          "3. 획득: NS(종소리) 제시 → 곧바로 US(먹이) 제시, 5회 반복",
          "4. 소거: CS(종소리)만 제시, US 없음, 5회 반복",
          "5. 휴지기: 일정 시간 아무것도 제시하지 않음",
          "6. 자발적 회복 검사: CS(종소리)만 다시 제시",
          "7. 정리: 소거는 제거가 아니라 억압에 가깝다"
        ];
        total = 2 + 5 + 5 + 1 + 1;
        pre.forEach(function (p, i) { push(p[0], p[1], p[2], p[3], "사전", i === 0 ? "CR 강도(%)는 표시용 예시값이다(슬라이드에 수치 없음)." : undefined); });
        [20, 40, 60, 75, 85].forEach(function (cr, i) {
          push("획득 " + (i + 1) + "회: 종소리 → 곧바로 먹이. " + (i === 0 ? "아직 종소리에 대한 반응은 약하다" : "반복할수록 연합이 강해진다") + " → 종소리 CR '''" + cr + "%'''." +
            (i === 4 ? " 이제 종소리는 [[조건 자극]](CS), 종소리에 흘리는 침은 [[조건 반응]](CR)이다." : ""),
            3, v("획득", i + 1, "종소리 → 먹이", i === 4 ? "CS" : "NS → CS", "CR (침)", cr), "획" + (i + 1), "획득");
        });
        pts[pts.length - 1].mark = true;
        [70, 50, 30, 15, 5].forEach(function (cr, i) {
          push("소거 " + (i + 1) + "회: 종소리'''만''' 들려주고 먹이는 주지 않는다 → CR '''" + cr + "%'''." + (i === 4 ? " 거의 사라졌다 — [[소거]]." : ""),
            4, v("소거", i + 1, "종소리 (먹이 없음)", "CS", cr <= 5 ? "거의 없음" : "CR (약해짐)", cr), "소" + (i + 1), "소거");
        });
        pts[pts.length - 1].mark = true;
        push("휴지기: 하루쯤 아무 자극도 주지 않고 쉰다.",
          5, v("휴지기", "–", "없음", "–", "–", "–"), "휴지", "휴지기");
        push("자발적 회복 검사: 다시 종소리만 들려준다 → 침이 '''다시 나온다'''(CR 40%). 소거 마지막(5%)보다 높지만 획득 최대(85%)보다는 낮다 — 부분적 회복, [[자발적 회복]].",
          6, v("자발적 회복", "–", "종소리", "CS", "CR (부분 회복)", 40), "회복", "회복");
        steps.push({ desc: "정리. 회복값 40% 는 '''5% < 40% < 85%'''. CR 이 완전히 지워졌다면 0 에서 다시 시작했어야 한다. 그래서 소거는 조건 반응을 '''제거'''하는 것이 아니라 '''억압'''하는 쪽에 가깝다 (p.11).",
          pc: { proc: 7 }, vars: v("자발적 회복", "–", "종소리", "CS", "CR (부분 회복)", 40), status: { proc: "억압" },
          note: "시험 함정: \"소거되면 조건 반응은 완전히 사라진다\" (✗). 휴지기 후 자발적 회복이 일어난다.",
          svg: steps[steps.length - 1].svg });
      }
      return {
        panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines }],
        vars: [
          { name: "단계", group: "trial" }, { name: "시행", group: "trial" },
          { name: "제시 자극", group: "자극" }, { name: "자극 이름", group: "자극" },
          { name: "반응 이름", group: "반응" }, { name: "CR 강도(%)", group: "반응" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
