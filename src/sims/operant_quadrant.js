// operant_quadrant — 5장 p.19(강화 유형), p.24(처벌), p.27(타임 아웃)
// 사례마다 3질문(제시/제거 · 보상/혐오 · 증가/감소) → 2×2 칸 배치.
// slide 세트: 각 칸 1개. trap 세트: 과속 벌금 = 정적 처벌(p.24 그림), 면허 취소 = 부적 처벌(p.24 그림),
//   알람·경고음 끄기 = 부적 강화(p.19 그림), 시험 망친 학생 = 정적·부적 강화 동시(p.19)
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var FONT = "font-family:system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";
  var CELLS = {
    PR: { name: "정적 강화", row: 0, col: 0, color: "#2f9e6b", key: "정적 강화" },
    NR: { name: "부적 강화", row: 1, col: 0, color: "#3a6fd8", key: "부적 강화" },
    PP: { name: "정적 처벌", row: 0, col: 1, color: "#e08a3c", key: null },
    NP: { name: "부적 처벌", row: 1, col: 1, color: "#d23f4c", key: "부적 처벌" }
  };

  var SETS = {
    slide: [
      { short: "숙제→초콜릿", text: "숙제를 끝내자 초콜릿을 받고 칭찬을 들었다 → 숙제를 더 자주 한다", pres: "제시", kind: "보상", beh: "증가", cell: "PR", src: "p.19 그림" },
      { short: "약물 금단 제거", text: "약물을 복용하면 괴로운 금단 증상이 사라진다 → 복용이 늘어난다", pres: "제거", kind: "혐오", beh: "증가", cell: "NR", src: "p.19 (Baker et al., 2004)" },
      { short: "체벌", text: "잘못된 행동을 하자 체벌(아픈 자극)을 받았다 → 그 행동이 줄어든다", pres: "제시", kind: "혐오", beh: "감소", cell: "PP", src: "p.24 정의" },
      { short: "타임 아웃", text: "떼쓰는 아이를 잠시 혼자 있게 해 부모의 관심(보상)을 뺀다 → 떼쓰기가 줄어든다", pres: "제거", kind: "보상", beh: "감소", cell: "NP", src: "p.27" }
    ],
    trap: [
      { short: "과속 벌금", text: "과속하다 단속되어 범칙금(벌금) 10만 원 딱지를 받았다 → 과속이 줄어든다", pres: "제시", kind: "혐오", beh: "감소", cell: "PP", src: "p.24 그림",
        trap: "\"돈이 나가니까 '빼앗김' = 부적 처벌?\" (✗) — 슬라이드 p.24 그림은 과속 딱지(벌금) 부과를 '''불쾌한 자극 추가 = 정적 처벌'''의 예로 든다. 딱지라는 혐오 자극이 '''주어진''' 것이다." },
      { short: "면허 취소", text: "과속이 반복되자 운전면허가 취소되었다 → 과속이 줄어든다", pres: "제거", kind: "보상", beh: "감소", cell: "NP", src: "p.24 그림",
        trap: "원하는 자극(면허, 운전 권리)을 '''제거'''해 행동을 줄였으므로 부적 처벌. 같은 '과속' 사례라도 무엇이 제시/제거되는지로 갈린다." },
      { short: "알람 끄기", text: "아침 알람 소리(시끄러움)를 끄면 소음이 사라진다 → 알람 끄는 행동이 늘어난다 (안전벨트 경고음도 같은 구조)", pres: "제거", kind: "혐오", beh: "증가", cell: "NR", src: "p.19 그림",
        trap: "'''부적 강화는 처벌이 아니다''' (p.19 밑줄). '부적' = 빼기, '강화' = 행동 증가. 불쾌한 것이 사라져 행동이 '''늘어나면''' 부적 강화." },
      { short: "시험 망친 학생 ①", text: "시험을 망쳐 불안한 학생이 공부를 했더니 좋은 성적(보상)을 얻었다 → 공부가 늘어난다", pres: "제시", kind: "보상", beh: "증가", cell: "PR", src: "p.19",
        trap: undefined },
      { short: "시험 망친 학생 ②", text: "같은 학생이 공부를 하자 불안(혐오)이 줄었다 → 공부가 늘어난다", pres: "제거", kind: "혐오", beh: "증가", cell: "NR", src: "p.19",
        trap: "\"두 강화는 동시에 발생할 수 있음 — Ex) 시험을 망쳐서 불안한 학생\" (p.19). 한 행동(공부)에 정적 강화(성적)와 부적 강화(불안 감소)가 함께 작용한다." }
    ]
  };

  function drawSvg(placed, cur, phase) {
    // placed: [{short, cell}], cur: 현재 사례 {short, pres, kind, beh} + phase(0..3)
    var W = 600, H = 300, L = 110, T = 46, CW = 230, CH = 110;
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;' + FONT + '">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    o.push('<text x="' + (L + CW / 2) + '" y="' + (T - 12) + '" font-size="13" font-weight="bold" fill="#2f6b4f" text-anchor="middle">③ 행동 증가 → 강화</text>');
    o.push('<text x="' + (L + CW * 1.5) + '" y="' + (T - 12) + '" font-size="13" font-weight="bold" fill="#a0442c" text-anchor="middle">③ 행동 감소 → 처벌</text>');
    o.push('<text x="' + (L - 10) + '" y="' + (T + CH / 2) + '" font-size="13" font-weight="bold" fill="#334" text-anchor="end">① 제시</text>');
    o.push('<text x="' + (L - 10) + '" y="' + (T + CH / 2 + 16) + '" font-size="11" fill="#667" text-anchor="end">(정적, +)</text>');
    o.push('<text x="' + (L - 10) + '" y="' + (T + CH * 1.5) + '" font-size="13" font-weight="bold" fill="#334" text-anchor="end">① 제거</text>');
    o.push('<text x="' + (L - 10) + '" y="' + (T + CH * 1.5 + 16) + '" font-size="11" fill="#667" text-anchor="end">(부적, −)</text>');
    var curCell = null;
    if (cur && phase >= 3) curCell = cur.cell;
    Object.keys(CELLS).forEach(function (k) {
      var c = CELLS[k];
      var x = L + c.col * CW, y = T + c.row * CH;
      var hl = curCell === k;
      // 가능 칸 표시: ①, ③ 답이 나온 만큼 좁혀 간다
      var possible = true;
      if (cur && phase >= 1) possible = possible && ((c.row === 0) === (cur.pres === "제시"));
      if (cur && phase >= 3) possible = possible && ((c.col === 0) === (cur.beh === "증가"));
      o.push('<rect x="' + x + '" y="' + y + '" width="' + CW + '" height="' + CH + '" fill="' + c.color + '" fill-opacity="' + (hl ? 0.28 : (cur && !possible ? 0.03 : 0.10)) + '" stroke="' + (hl ? c.color : "#9aa6b8") + '" stroke-width="' + (hl ? 3 : 1) + '"/>');
      o.push('<text x="' + (x + 10) + '" y="' + (y + 20) + '" font-size="14" font-weight="bold" fill="' + c.color + '">' + c.name + '</text>');
      var stim = (c.row === 0) === (c.col === 0) ? "보상 자극" : "혐오 자극";
      o.push('<text x="' + (x + CW - 10) + '" y="' + (y + 20) + '" font-size="11" fill="#667" text-anchor="end">② ' + stim + '</text>');
      var n = 0;
      placed.forEach(function (p) {
        if (p.cell !== k) return;
        o.push('<text x="' + (x + 14) + '" y="' + (y + 44 + n * 18) + '" font-size="12" fill="#223">• ' + p.short + '</text>');
        n++;
      });
    });
    if (cur) {
      var ans = [cur.pres + "?", cur.kind + "?", cur.beh + "?"];
      var shown = [];
      for (var i = 0; i < 3; i++) shown.push(i < phase ? ["①", "②", "③"][i] + " " + ans[i].replace("?", "") : ["①", "②", "③"][i] + " …");
      o.push('<text x="' + (W / 2) + '" y="' + (H - 12) + '" font-size="12" fill="#334" text-anchor="middle">지금 사례: ' + cur.short + '   ' + shown.join("   ") + '</text>');
    }
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["operant_quadrant"] = {
    title: "강화·처벌 2×2 판정기",
    desc: "사례마다 세 질문을 순서대로 묻는다: ① 자극이 '''제시'''되나 '''제거'''되나 ② 그 자극은 '''보상'''인가 '''혐오'''인가 ③ 행동이 '''증가'''하나 '''감소'''하나. ①이 정적/부적, ③이 강화/처벌을 정한다 (5장 p.19, p.24, p.27). [[정적 강화와 부적 강화]] · [[처벌]]",
    options: [
      { key: "set", label: "사례 세트", values: [
        { value: "slide", label: "슬라이드 기본 4사례" },
        { value: "trap", label: "함정 사례 (벌금·면허·알람·시험)" }
      ] }
    ],
    build: function (opts) {
      var setName = SETS[opts.set] ? opts.set : "slide";
      var cases = SETS[setName];
      var lines = [
        "① 행동 뒤에 자극이 제시되나(+, 정적) 제거되나(−, 부적)?",
        "② 그 자극은 보상(좋은 것)인가 혐오(싫은 것)인가?",
        "③ 그 결과 행동이 증가하나(강화) 감소하나(처벌)?",
        "④ ①×③ 으로 2×2 칸에 배치 (②는 검산: 제시+보상·제거+혐오 = 강화)",
        "⑤ 정리: 정적/부적 = 더하기/빼기, 강화/처벌 = 행동 증가/감소"
      ];
      var placed = [];
      var count = { PR: 0, NR: 0, PP: 0, NP: 0 };
      var steps = [];
      function v(c, q1, q2, q3, verdict) {
        return {
          "사례": c ? c.short : "–",
          "① 제시/제거": q1, "② 보상/혐오": q2, "③ 행동 증가/감소": q3,
          "판정": verdict,
          "정적 강화": count.PR, "부적 강화": count.NR, "정적 처벌": count.PP, "부적 처벌": count.NP
        };
      }
      steps.push({
        desc: "빈 2×2 표. 가로는 행동이 늘었나(강화)/줄었나(처벌), 세로는 자극을 더했나(정적)/뺐나(부적). '''\"부적\" 은 \"나쁜\" 이 아니라 \"빼기\"''' 라는 뜻이다.",
        pc: { proc: 4 }, vars: v(null, "–", "–", "–", "–"), svg: drawSvg([], null, 0)
      });
      cases.forEach(function (c, i) {
        var tag = "사례 " + (i + 1) + "/" + cases.length;
        steps.push({ desc: "'''" + tag + "''': " + c.text + " ① 행동 뒤에 자극이 '''" + c.pres + "'''된다 → " + (c.pres === "제시" ? "정적(+)" : "부적(−)") + ".",
          pc: { proc: 1 }, status: { proc: c.short }, vars: v(c, c.pres, "?", "?", "?"), svg: drawSvg(placed.slice(), c, 1) });
        steps.push({ desc: "② " + (c.pres === "제시" ? "주어진" : "사라진") + " 자극은 '''" + c.kind + "''' 자극이다.",
          pc: { proc: 2 }, status: { proc: c.short }, vars: v(c, c.pres, c.kind, "?", "?"), svg: drawSvg(placed.slice(), c, 2) });
        steps.push({ desc: "③ 그 결과 행동이 '''" + c.beh + "'''한다 → " + (c.beh === "증가" ? "강화" : "처벌") + ".",
          pc: { proc: 3 }, status: { proc: c.short }, vars: v(c, c.pres, c.kind, c.beh, "?"), svg: drawSvg(placed.slice(), c, 3) });
        placed.push({ short: c.short, cell: c.cell });
        count[c.cell]++;
        var cellName = CELLS[c.cell].name;
        var key = CELLS[c.cell].key;
        steps.push({ desc: "④ " + c.pres + " × 행동 " + c.beh + " → '''" + (key ? "[[" + key + "]]" : cellName) + "''' 칸. (근거: 5장 " + c.src + ")",
          pc: { proc: 4 }, status: { proc: cellName }, vars: v(c, c.pres, c.kind, c.beh, cellName),
          note: c.trap, svg: drawSvg(placed.slice(), c, 3) });
      });
      steps.push({
        desc: "정리. 최종 칸 개수 — 정적 강화 " + count.PR + " · 부적 강화 " + count.NR + " · 정적 처벌 " + count.PP + " · 부적 처벌 " + count.NP + ". 강화는 무엇을 더하든 빼든 '''행동을 늘리고''', 처벌은 '''행동을 줄인다'''.",
        pc: { proc: 5 }, vars: v(null, "–", "–", "–", "–"), status: { proc: "완료" },
        note: "'''부적 강화 ≠ 처벌''' (p.19). 부적 강화는 혐오 자극을 '''없애서''' 행동을 늘리는 것, 처벌은 행동을 줄이는 것. 정적 처벌 = 제1유형(혐오 자극 가하기), [[부적 처벌]] = 제2유형(보상 자극 철회) (p.24).",
        svg: drawSvg(placed.slice(), null, 0)
      });
      return {
        panels: [{ id: "proc", title: "판정 절차", lang: "txt", lines: lines }],
        vars: [
          { name: "사례", group: "현재 사례" },
          { name: "① 제시/제거", group: "현재 사례" }, { name: "② 보상/혐오", group: "현재 사례" },
          { name: "③ 행동 증가/감소", group: "현재 사례" }, { name: "판정", group: "현재 사례" },
          { name: "정적 강화", group: "2×2 칸 개수" }, { name: "부적 강화", group: "2×2 칸 개수" },
          { name: "정적 처벌", group: "2×2 칸 개수" }, { name: "부적 처벌", group: "2×2 칸 개수" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
