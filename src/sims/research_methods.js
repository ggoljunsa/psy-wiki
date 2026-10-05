// research_methods — 1장 p.17–25 연구 방법 (기술적 방법 · 상관 · 실험) 비교
// 같은 연구 질문을 사례 연구 → 자연 관찰 → 사회조사 → 상관 연구 → 실험법 순으로 시도.
// 기대: 실험법에서만 처치 ✓ · 통제 ✓ · 무선 할당 ✓ · 인과 ✓ (p.25 표)
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var FONT = "font-family:system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";

  var METHODS = [
    { name: "사례 연구", key: "사례 연구", kind: "기술적 방법", goal: "기술", treat: "✗", ctrl: "✗", ra: "✗", cause: "✗",
      weak: "대표적이지 않은 개별 사례가 결과를 오도 · 일반화 어려움", page: "p.18" },
    { name: "자연 관찰", key: "자연 관찰", kind: "기술적 방법", goal: "기술", treat: "✗", ctrl: "✗", ra: "✗", cause: "✗",
      weak: "행동에 영향을 주는 요인을 통제하지 않음 · 설명은 어려움", page: "p.19" },
    { name: "사회조사", key: "사회조사", kind: "기술적 방법", goal: "기술", treat: "✗", ctrl: "✗", ra: "✗ (무선 표집은 함)", cause: "✗",
      weak: "사회적 바람직성 위장 · 말표현 효과 · 대표성 없는 표본", page: "p.20–21" },
    { name: "상관 연구", key: "상관", kind: "상관 연구", goal: "예측", treat: "✗", ctrl: "✗", ra: "✗", cause: "✗",
      weak: "원인과 결과를 명세하지 못함 (제3의 변인)", page: "p.22" },
    { name: "실험법", key: "실험법", kind: "실험", goal: "인과 (원인과 결과 탐색)", treat: "✓", ctrl: "✓", ra: "✓", cause: "✓",
      weak: "다른 상황에 일반화 못 할 수 있음 · 윤리적으로 처치 불가한 주제", page: "p.23" }
  ];

  var Q = {
    icecream: {
      q: "아이스크림을 많이 먹으면 식중독에 잘 걸리나?",
      d: [
        "식중독으로 입원한 환자 한 명을 깊이 면담했더니 전날 아이스크림을 세 개 먹었다고 한다. 흥미로운 단서지만 '''이 한 사람'''이 대표적인지 알 수 없다.",
        "여름 해수욕장에서 사람들이 무엇을 먹고 언제 배탈이 나는지 개입 없이 기록한다. 아이스크림을 먹는 사람이 많고 배탈 환자도 많다는 '''현상'''은 보이지만, 기온·위생 같은 요인을 통제하지 않았다.",
        "무선 표집한 1,000명에게 \"하루 아이스크림 몇 개?\", \"올해 식중독 경험?\" 을 묻는다. 데이터는 많이 모았지만 자기보고라 정확하지 않을 수 있다.",
        "월별 아이스크림 판매량과 식중독 환자 수의 [[상관]]을 계산하니 강한 '''정적 상관'''. 판매량으로 환자 수를 '''예측'''은 할 수 있다. 그러나 둘 다 '''기온'''이 오를 때 같이 늘어난다 — [[제3의 변인]].",
        "참가자를 [[무선 할당]]으로 두 집단에 나눠, 실험 집단은 아이스크림을 먹고 통제 집단은 먹지 않게 하고 '''기온·음식 위생·다른 음식'''은 똑같이 유지한다. 이제 두 집단 차이는 '''아이스크림(처치)''' 때문이라고 인과적으로 말할 수 있다."
      ],
      corrNote: "아이스크림 ↔ 식중독 상관은 '''예측은 되지만 설명은 못 한다'''. 기온(제3의 변인)이 둘 다 올린다. 상관 ≠ 인과."
    },
    memory: {
      q: "기억력 훈련 프로그램이 시험 성적을 올리나?",
      d: [
        "훈련 후 성적이 크게 오른 학생 한 명을 심층 분석한다. 설득력 있는 이야기지만, 그 학생만 특별했을 수 있다 — 일반화가 어렵다.",
        "학원 자습실에서 훈련 앱을 쓰는 학생과 안 쓰는 학생의 행동을 그대로 관찰·기록한다. 현상은 보이지만 동기·공부 시간 같은 요인을 통제하지 않았다.",
        "무선 표집한 학생 500명에게 \"훈련 앱을 쓰나요?\", \"성적은?\" 을 설문한다. 성적을 좋게 보고하려는 경향(사회적 바람직성)이 섞일 수 있다.",
        "훈련 시간과 성적의 [[상관]]이 정적으로 나온다. 훈련 시간으로 성적을 '''예측'''은 할 수 있지만, '''원래 성실한 학생'''이 훈련도 많이 하고 성적도 높을 수 있다 — [[제3의 변인]].",
        "지원한 학생들을 [[무선 할당]]으로 훈련 집단(실험 조건)과 비훈련 집단(통제 조건)에 나누고, 공부 시간·시험은 똑같이 맞춘다. 무선 할당으로 기존 개인차(성실성)가 두 집단에 고르게 퍼지므로, 성적 차이를 '''훈련의 효과'''라고 인과적으로 결론 낼 수 있다."
      ],
      corrNote: "훈련 시간 ↔ 성적 상관은 '''예측은 되지만 설명은 못 한다'''. 성실성(제3의 변인)이 둘 다 올릴 수 있다. 상관 ≠ 인과."
    }
  };

  function drawSvg(upto) {
    var W = 640, H = 236, L = 10, T = 30, RH = 34;
    var cols = [
      { t: "방법", w: 120 }, { t: "목적", w: 108 }, { t: "처치", w: 64 }, { t: "통제", w: 64 },
      { t: "무선 할당", w: 92 }, { t: "인과", w: 64 }
    ];
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;' + FONT + '">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    var x = L + 6;
    cols.forEach(function (c) {
      o.push('<text x="' + (x + c.w / 2) + '" y="' + (T - 10) + '" font-size="12" font-weight="bold" fill="#334" text-anchor="middle">' + c.t + '</text>');
      x += c.w;
    });
    var kindColor = { "기술적 방법": "#3a6fd8", "상관 연구": "#e08a3c", "실험": "#2f9e6b" };
    METHODS.forEach(function (m, i) {
      var y = T + i * RH;
      var on = i <= upto, cur = i === upto;
      o.push('<rect x="' + L + '" y="' + y + '" width="' + (W - 2 * L) + '" height="' + (RH - 4) + '" rx="4" fill="' + kindColor[m.kind] + '" fill-opacity="' + (cur ? 0.25 : on ? 0.08 : 0.03) + '" stroke="' + (cur ? kindColor[m.kind] : "none") + '" stroke-width="2"/>');
      var cells = [m.name, m.goal.split(" ")[0], m.treat, m.ctrl, m.ra.split(" ")[0], m.cause];
      var xx = L + 6;
      cells.forEach(function (c, k) {
        var col = !on ? "#c4cad4" : (c === "✓" ? "#2f9e6b" : c === "✗" ? "#d23f4c" : "#223");
        o.push('<text x="' + (xx + cols[k].w / 2) + '" y="' + (y + 20) + '" font-size="' + (k === 0 ? 13 : (c.length === 1 ? 16 : 12)) + '" font-weight="' + (k === 0 || cur ? "bold" : "normal") + '" fill="' + col + '" text-anchor="middle">' + (on || k === 0 ? c : "?") + '</text>');
        xx += cols[k].w;
      });
      o.push('<text x="' + (W - L - 8) + '" y="' + (y + 20) + '" font-size="11" fill="' + kindColor[m.kind] + '" text-anchor="end">' + m.kind + '</text>');
    });
    o.push('<text x="' + L + '" y="' + (H - 6) + '" font-size="11" fill="#667">1장 p.25 「연구 방법 간 비교」 표를 단계별로 채운 것</text>');
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["research_methods"] = {
    title: "연구 방법 사다리: 기술 → 예측 → 인과",
    desc: "같은 연구 질문을 다섯 가지 방법으로 차례로 시도한다. 처치·변인 통제·무선 할당을 모두 갖춘 [[실험법]]만 '''인과'''를 말할 수 있다 (1장 p.17–25). [[연구 방법 비교]]",
    options: [
      { key: "question", label: "연구 질문", values: [
        { value: "icecream", label: "아이스크림과 식중독" },
        { value: "memory", label: "기억력 훈련과 성적" }
      ] }
    ],
    build: function (opts) {
      var qk = Q[opts.question] ? opts.question : "icecream";
      var qq = Q[qk];
      var lines = [
        "0. 연구 질문: " + qq.q,
        "1. 사례 연구: 소수의 개인을 집중 관찰·심층 분석",
        "2. 자연 관찰: 자연 상황의 행동을 개입 없이 기록",
        "3. 사회조사: 무선 표집한 표본에 설문·인터뷰 (자기보고)",
        "4. 상관 연구: 두 변인을 측정해 함께 변하는 정도(−1~1) 계산",
        "5. 실험법: 독립변인 처치 + 다른 변인 통제 + 무선 할당 → 집단 비교",
        "6. 정리: 기술(기술적 방법) → 예측(상관) → 인과(실험)"
      ];
      var steps = [];
      function v(m) {
        if (!m) return { "방법": "–", "분류": "–", "목적": "–", "처치(조작)": "–", "변인 통제": "–", "무선 할당": "–", "인과 추론": "–", "약점": "–" };
        return { "방법": m.name, "분류": m.kind, "목적": m.goal, "처치(조작)": m.treat, "변인 통제": m.ctrl, "무선 할당": m.ra, "인과 추론": m.cause, "약점": m.weak };
      }
      steps.push({
        desc: "연구 질문: '''" + qq.q + "''' 이 질문에 다섯 가지 방법으로 답해 보며, 각 방법이 무엇까지 말해 줄 수 있는지 본다.",
        pc: { proc: 1 }, vars: v(null), svg: drawSvg(-1)
      });
      METHODS.forEach(function (m, i) {
        var note;
        if (i === 2) note = "함정: 사회조사의 '''[[무선 표집]]'''(모집단에서 표본을 고르게 뽑기)과 실험법의 '''[[무선 할당]]'''(참가자를 조건에 무작위 배정)은 다른 개념이다. 표본 수가 많아도 대표성이 없으면 좋은 표본이 아니다 (p.21).";
        else if (i === 3) note = qq.corrNote + " (p.22)";
        else note = undefined;
        steps.push({
          desc: "'''" + (m.key ? "[[" + m.key + "|" + m.name + "]]" : m.name) + "''' (" + m.kind + ", " + m.page + "). " + qq.d[i],
          pc: { proc: i + 2 }, status: { proc: m.kind },
          vars: v(m), note: note, svg: drawSvg(i)
        });
      });
      var last = METHODS[METHODS.length - 1];
      steps.push({
        desc: "정리. 기술적 방법(사례 연구·자연 관찰·사회조사)은 현상을 '''기술''', 상관 연구는 '''예측''', 실험은 '''원인과 결과'''를 탐색한다. 처치 ✓·통제 ✓·무선 할당 ✓·인과 ✓ 가 모두 나온 것은 '''실험법뿐'''이다.",
        pc: { proc: 7 }, status: { proc: "실험" }, vars: v(last),
        note: "실험법의 약점도 기억할 것(p.25): 결과를 다른 상황에 일반화하지 못할 수 있고, 윤리적 문제로 특정 변인에는 처치할 수 없다.",
        svg: drawSvg(METHODS.length - 1)
      });
      return {
        panels: [{ id: "proc", title: "연구 절차", lang: "txt", lines: lines }],
        vars: [
          { name: "방법", group: "현재 방법" }, { name: "분류", group: "현재 방법" }, { name: "목적", group: "현재 방법" },
          { name: "처치(조작)", group: "설계" }, { name: "변인 통제", group: "설계" }, { name: "무선 할당", group: "설계" },
          { name: "인과 추론", group: "결론" }, { name: "약점", group: "결론" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
