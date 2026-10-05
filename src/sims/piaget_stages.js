// piaget_stages — 3장 p.8–18 피아제의 인지 발달 단계 (+ p.13 가상 놀이, p.18 마음 이론)
// step: 4개월 → 1세 → 3세 → 5세 → 8세 → 13세.
// 기대: 4개월 감각 운동·대상 영속성 ✗ → 1세 ✓ → 5세 전조작·보존 ✗ → 8세 구체적 조작·보존 ✓ → 13세 형식적 조작·가설 추리 ✓
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var FONT = "font-family:system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";
  var STAGES = [
    { name: "감각 운동", from: 0, to: 2, color: "#3a6fd8", key: "감각 운동 단계" },
    { name: "전조작", from: 2, to: 7, color: "#2f9e6b", key: "전조작 단계" },
    { name: "구체적 조작", from: 7, to: 12, color: "#e08a3c", key: "구체적 조작 단계" },
    { name: "형식적 조작", from: 12, to: 16, color: "#7a4fd0", key: "형식적 조작 단계" }
  ];

  // 연령별 상태: Y = ✓, N = ✗, "-" = 해당 없음
  var AGES = [
    { label: "4개월", age: 1 / 3, stage: 0, perm: "✗", cons: "–", ego: "–", pretend: "✗", tom: "✗", abs: "✗" },
    { label: "1세", age: 1, stage: 0, perm: "✓", cons: "–", ego: "–", pretend: "✗", tom: "✗", abs: "✗" },
    { label: "3세", age: 3, stage: 1, perm: "✓", cons: "✗", ego: "✓ (강함)", pretend: "✓", tom: "✗", abs: "✗" },
    { label: "5세", age: 5, stage: 1, perm: "✓", cons: "✗", ego: "✓ (남아 있음)", pretend: "✓", tom: "✓", abs: "✗" },
    { label: "8세", age: 8, stage: 2, perm: "✓", cons: "✓", ego: "✗ (벗어남)", pretend: "✓", tom: "✓", abs: "✗" },
    { label: "13세", age: 13, stage: 3, perm: "✓", cons: "✓", ego: "✗", pretend: "✓", tom: "✓", abs: "✓" }
  ];

  var TASK = {
    conservation: {
      name: "보존 과제 (주스 컵)",
      intro: "같은 양의 주스가 든 두 컵 중 하나를 '''좁고 긴 컵'''에 옮겨 붓는 것을 보여 주고 \"어느 쪽이 더 많아?\" 라고 묻는다.",
      res: [
        "과제를 이해하지 못함 (언어 이전)",
        "과제를 이해하지 못함 (언어 이전)",
        "\"긴 컵이 더 많아!\" — 수면 높이(시각)에 초점",
        "\"긴 컵이 더 많아!\" — 부은 과정을 거꾸로 생각(역전)하지 못함",
        "\"똑같아. 다시 부으면 원래대로잖아.\" — 보존 ✓",
        "\"똑같다\" + 부피 공식 같은 추상적 설명까지 가능"
      ]
    },
    object: {
      name: "대상 영속성 과제 (천 아래 장난감)",
      intro: "아기가 보는 앞에서 장난감을 '''천으로 덮는다'''. 아기가 천을 들춰 장난감을 찾는가?",
      res: [
        "찾지 않음 — 안 보이면 없는 것 (대상 영속성 ✗)",
        "천을 들춰 장난감을 찾는다 (대상 영속성 ✓)",
        "당연히 찾는다 + 숨바꼭질·가상 놀이",
        "당연히 찾는다",
        "당연히 찾는다",
        "당연히 찾는다"
      ]
    }
  };

  function drawSvg(idx, taskKey, result) {
    var W = 640, H = 230, L = 30, R = 610, T = 54, BH = 34;
    function X(a) { return L + a / 16 * (R - L); }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;' + FONT + '">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    o.push('<text x="' + L + '" y="18" font-size="12" font-weight="bold" fill="#334">피아제의 4단계 (연령은 대략)</text>');
    STAGES.forEach(function (s, i) {
      var cur = idx >= 0 && AGES[idx].stage === i;
      o.push('<rect x="' + X(s.from).toFixed(1) + '" y="' + T + '" width="' + (X(s.to) - X(s.from)).toFixed(1) + '" height="' + BH + '" fill="' + s.color + '" fill-opacity="' + (cur ? 0.85 : 0.22) + '"/>');
      o.push('<text x="' + ((X(s.from) + X(s.to)) / 2).toFixed(1) + '" y="' + (T + 22) + '" font-size="' + (s.to - s.from < 3 ? 11 : 13) + '" font-weight="bold" fill="' + (cur ? "#fff" : s.color) + '" text-anchor="middle">' + s.name + '</text>');
    });
    [0, 2, 7, 12, 16].forEach(function (a) {
      o.push('<text x="' + X(a).toFixed(1) + '" y="' + (T + BH + 15) + '" font-size="11" fill="#667" text-anchor="middle">' + (a === 16 ? "성인" : a + "세") + '</text>');
    });
    o.push('<line x1="' + X(4).toFixed(1) + '" y1="' + (T + BH + 3) + '" x2="' + X(5).toFixed(1) + '" y2="' + (T + BH + 3) + '" stroke="#7a4fd0" stroke-width="3"/>');
    o.push('<text x="' + X(4.5).toFixed(1) + '" y="' + (T + BH + 16) + '" font-size="10" fill="#7a4fd0" text-anchor="middle">마음 이론 4–5세</text>');
    if (idx >= 0) {
      var a = AGES[idx];
      var x = X(a.age).toFixed(1);
      o.push('<polygon points="' + x + ',' + (T - 2) + ' ' + (x - 7) + ',' + (T - 12) + ' ' + (+x + 7) + ',' + (T - 12) + '" fill="#d23f4c"/>');
      o.push('<text x="' + x + '" y="' + (T - 22) + '" font-size="12" font-weight="bold" fill="#d23f4c" text-anchor="middle">' + a.label + '</text>');
    }
    // 과제 결과 상자
    var by = T + BH + 34;
    o.push('<rect x="' + L + '" y="' + by + '" width="' + (R - L) + '" height="' + (H - by - 10) + '" rx="6" fill="#f3f6fb" stroke="#c9d3e3"/>');
    o.push('<text x="' + (L + 12) + '" y="' + (by + 22) + '" font-size="12" font-weight="bold" fill="#334">' + TASK[taskKey].name + '</text>');
    var msg = result || "연령을 넘기면서 결과를 보자.";
    // 긴 문장 줄바꿈 (약 40자)
    var parts = [];
    while (msg.length > 42) { var cut = msg.lastIndexOf(" ", 42); if (cut < 10) cut = 42; parts.push(msg.slice(0, cut)); msg = msg.slice(cut).replace(/^ /, ""); }
    parts.push(msg);
    parts.forEach(function (p, i) {
      o.push('<text x="' + (L + 12) + '" y="' + (by + 44 + i * 18) + '" font-size="13" fill="#223">' + p.replace(/&/g, "&amp;").replace(/</g, "&lt;") + '</text>');
    });
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["piaget_stages"] = {
    title: "피아제의 인지 발달 단계: 몇 살에 무엇이 되나",
    desc: "같은 아이를 4개월부터 13세까지 따라가며 [[대상 영속성]], [[보존 개념]], [[자기중심성]], 가상 놀이, [[마음 이론]], 추상·가설 추리가 언제 생기는지 본다 (3장 p.8–18). [[피아제의 인지 발달 단계]]",
    options: [
      { key: "task", label: "과제", values: [
        { value: "conservation", label: "보존 과제 (주스 컵)" },
        { value: "object", label: "대상 영속성 과제 (천 아래 장난감)" }
      ] }
    ],
    build: function (opts) {
      var taskKey = TASK[opts.task] ? opts.task : "conservation";
      var lines = [
        "1. 과제 제시: " + TASK[taskKey].name,
        "2. 4개월: 감각 운동 단계 (출생~2세)",
        "3. 1세: 감각 운동 단계 — 6개월 이후 대상 영속성 형성",
        "4. 3세: 전조작 단계 (2~6세) — 가상 놀이(3세 이후)",
        "5. 5세: 전조작 단계 — 보존 결여, 마음 이론(4~5세)",
        "6. 8세: 구체적 조작 단계 (7~11세) — 보존 이해",
        "7. 13세: 형식적 조작 단계 (12세~) — 추상·가설 추리",
        "8. 정리: 현대 연구의 재고찰"
      ];
      var steps = [];
      function v(a, res) {
        if (!a) return { "연령": "–", "단계": "–", "대상 영속성": "–", "보존": "–", "자기중심성": "–", "가상 놀이": "–", "마음 이론": "–", "추상·가설 추리": "–", "과제 결과": "–" };
        return {
          "연령": a.label, "단계": STAGES[a.stage].name, "대상 영속성": a.perm, "보존": a.cons,
          "자기중심성": a.ego, "가상 놀이": a.pretend, "마음 이론": a.tom, "추상·가설 추리": a.abs, "과제 결과": res
        };
      }
      steps.push({
        desc: TASK[taskKey].intro + " 같은 과제를 연령별로 해 본다. 피아제는 특정 연령의 아동이 '''비슷한 오류'''를 낸다는 점에 주목했다 (p.8).",
        pc: { proc: 1 }, vars: v(null), svg: drawSvg(-1, taskKey, null)
      });
      var DESC = [
        "'''4개월''' — [[감각 운동 단계]]. 신체 감각과 운동으로 세상을 받아들인다. 생후 6개월 이전이라 '''대상 영속성이 아직 없다''' — 눈앞에서 사라지면 없는 것.",
        "'''1세''' — 여전히 감각 운동 단계지만 6개월이 지나 '''대상 영속성이 형성'''되었다. 낯가림도 이 시기.",
        "'''3세''' — [[전조작 단계]]. 대상을 단어·이미지로 표상하고 '''가상 놀이'''를 한다(모형 방에 숨긴 인형을 실제 방에서 찾음, 주디 들로치, 1987). 그러나 심적 조작은 못 하고, '''자기중심성'''이 강하다. 틀린 믿음 과제에서 \"연필\" 이라고 답한다(마음 이론 ✗).",
        "'''5세''' — 아직 전조작 단계. '''보존 개념이 결여''' — 시각(수면 높이)에 초점을 맞춘다. 반면 4~5세를 기점으로 [[마음 이론]]이 급격히 발전해 \"반창고\" 라고 답한다(젠킨스 & 애스팅턴, 1996).",
        "'''8세''' — [[구체적 조작 단계]]. 구체적 물질에 대한 '''보존'''을 이해하고, 수학적 변형(거꾸로 붓기)을 머릿속으로 할 수 있다. 하지만 7세 아동은 명제에 대한 추론은 아직 못 한다(Suppes, 1982).",
        "'''13세''' — [[형식적 조작 단계]]. 추상적 사고가 확장되어 '''과학자처럼''' 가설적 명제에서 결론을 끌어내고 체계적으로 추리한다."
      ];
      AGES.forEach(function (a, i) {
        var res = TASK[taskKey].res[i];
        steps.push({
          desc: DESC[i] + " ▶ 과제: " + res,
          pc: { proc: i + 2 }, status: { proc: STAGES[a.stage].name },
          vars: v(a, res), svg: drawSvg(i, taskKey, res)
        });
      });
      var lastA = AGES[AGES.length - 1];
      steps.push({
        desc: "정리. 4개월 대상 영속성 ✗ → 1세 ✓ / 5세 보존 ✗ → 8세 ✓ / 13세 가설 추리 ✓. 피아제는 아동이 수동적 수용자가 아니라 '''적극적으로 상호작용'''하는 존재임을 보여 주었고, 발달의 인지적 이정표를 제공했다 (p.16).",
        pc: { proc: 8 }, status: { proc: "재고찰" },
        vars: v(lastA, TASK[taskKey].res[AGES.length - 1]),
        note: "재고찰할 점(p.16): 현대 연구에서는 발달이 '''훨씬 더 연속적'''으로 진행되고, 각 유형의 사고가 '''더 이른 시기'''에 발현되기도 한다. 예: 대상 영속성은 단계적이기보다 점진적·연속적 (Wang et al., 2004, p.10), 유아는 대상 영속성을 위배한 사물을 더 오래 응시 (p.11).",
        svg: drawSvg(AGES.length - 1, taskKey, TASK[taskKey].res[AGES.length - 1])
      });
      return {
        panels: [{ id: "proc", title: "연령별 관찰", lang: "txt", lines: lines }],
        vars: [
          { name: "연령", group: "아이" }, { name: "단계", group: "아이" },
          { name: "대상 영속성", group: "능력" }, { name: "보존", group: "능력" }, { name: "자기중심성", group: "능력" },
          { name: "가상 놀이", group: "능력" }, { name: "마음 이론", group: "능력" }, { name: "추상·가설 추리", group: "능력" },
          { name: "과제 결과", group: "과제" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
