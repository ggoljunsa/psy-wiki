// working_memory_span — 6장 p.18 매직 넘버 7(±2) 숫자 폭 과제 + p.19 청크 만들기
// 슬라이드 p.18 예시 그대로: 2148 → 37542 → 84301 → 629758 → 91430985
// off: 4·5·5·6 = 용량 안, 8자리 = 7±2 상한 근처(경계). on: 91430985 → 914·309·85 = 3청크 → 용량 안
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var FONT = "font-family:system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";
  var SEQ = ["2148", "37542", "84301", "629758", "91430985"];

  function chunk3(s) { var out = []; for (var i = 0; i < s.length; i += 3) out.push(s.slice(i, i + 3)); return out; }
  function verdict(n) { return n <= 7 ? "용량 안" : (n <= 9 ? "경계 (7±2 상한 근처)" : "초과"); }

  function drawSvg(rows, cur) {
    // rows: [{seq, units:[...], n}] — 지금까지 제시한 것
    var W = 640, H = 60 + 5 * 40 + 30, L = 150, R = 600, T = 40;
    var maxN = 10;
    function X(n) { return L + n / maxN * (R - L); }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;' + FONT + '">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    o.push('<text x="' + L + '" y="18" font-size="12" font-weight="bold" fill="#334">기억해야 할 단위 수 vs 단기 기억 용량 7±2</text>');
    // 7±2 띠
    o.push('<rect x="' + X(5) + '" y="' + (T - 6) + '" width="' + (X(9) - X(5)) + '" height="' + (5 * 40 + 4) + '" fill="#e08a3c" fill-opacity="0.12"/>');
    o.push('<line x1="' + X(7) + '" y1="' + (T - 6) + '" x2="' + X(7) + '" y2="' + (T + 5 * 40 - 2) + '" stroke="#e08a3c" stroke-dasharray="5,4"/>');
    o.push('<text x="' + X(7) + '" y="' + (T - 10) + '" font-size="11" fill="#c06a1c" text-anchor="middle">7±2 (5~9)</text>');
    for (var g = 0; g <= maxN; g += 1) {
      o.push('<text x="' + X(g) + '" y="' + (T + 5 * 40 + 14) + '" font-size="10" fill="#8b95a5" text-anchor="middle">' + g + '</text>');
    }
    rows.forEach(function (r, i) {
      var y = T + i * 40;
      var isCur = i === cur;
      o.push('<text x="' + (L - 10) + '" y="' + (y + 20) + '" font-size="12" font-family="ui-monospace,Menlo,monospace" font-weight="' + (isCur ? "bold" : "normal") + '" fill="#223" text-anchor="end">' + r.units.join("·") + '</text>');
      var col = r.n <= 7 ? "#2f9e6b" : (r.n <= 9 ? "#e08a3c" : "#d23f4c");
      for (var k = 0; k < r.n; k++) {
        o.push('<rect x="' + (X(k) + 2).toFixed(1) + '" y="' + (y + 6) + '" width="' + (X(1) - X(0) - 4).toFixed(1) + '" height="22" rx="4" fill="' + col + '" fill-opacity="' + (isCur ? 0.9 : 0.45) + '"/>');
        o.push('<text x="' + ((X(k) + X(k + 1)) / 2).toFixed(1) + '" y="' + (y + 22) + '" font-size="11" fill="#fff" text-anchor="middle">' + r.units[k] + '</text>');
      }
    });
    o.push('<text x="' + L + '" y="' + (H - 4) + '" font-size="11" fill="#667">막대 1칸 = 기억 단위 1개 (낱자 또는 청크)</text>');
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["working_memory_span"] = {
    title: "숫자 폭 과제와 청크화",
    desc: "슬라이드 p.18 의 숫자 폭 과제 예시를 차례로 외운다. [[단기 기억]] 용량은 [[매직 넘버 7|7±2개 항목]](밀러, 1956). 청크를 켜면 같은 8자리도 3덩어리로 줄어든다 (p.19 [[청크화]]).",
    options: [
      { key: "chunk", label: "청크 만들기", values: [
        { value: "off", label: "끔 (숫자 하나 = 1단위)" },
        { value: "on", label: "켬 (세 자리씩 묶기, 전화번호식)" }
      ] }
    ],
    build: function (opts) {
      var on = opts.chunk === "on";
      var lines = [
        "1. 숫자열을 1초에 한 자리씩 들려준다",
        on ? "2. 들으면서 세 자리씩 의미 있는 덩어리(청크)로 묶는다" : "2. 숫자 하나하나를 그대로 붙잡고 있는다",
        "3. 기억 단위 수를 센다 (낱자 수 또는 청크 수)",
        "4. 단기 기억 용량 7±2 와 비교: ≤7 용량 안 / 8~9 경계 / ≥10 초과",
        "5. 더 긴 숫자열로 반복",
        "6. 정리"
      ];
      var steps = [], rows = [];
      function v(seq, units, n, ver) {
        return { "제시 숫자열": seq, "자릿수": seq === "–" ? "–" : seq.length, "기억 단위": units, "단위 수": n, "용량 7±2 판정": ver };
      }
      steps.push({
        desc: "숫자 폭 과제: 숫자열을 듣고 그대로 따라 말한다. 단기 기억이 한 번에 붙잡을 수 있는 양은 '''7±2개 항목''' 정도다. " + (on ? "이번에는 세 자리씩 '''청크'''로 묶어서 외운다." : "이번에는 숫자를 하나씩 그대로 외운다."),
        pc: { proc: 1 }, vars: v("–", "–", "–", "–"),
        note: "⚠ PPTX 원본의 \"72개\" 는 '''7±2''' 를 잘못 적은 것이다. 시험 답은 7±2.",
        svg: drawSvg([], -1)
      });
      SEQ.forEach(function (s, i) {
        var units = on ? chunk3(s) : s.split("");
        var n = units.length;
        var ver = verdict(n);
        rows.push({ seq: s, units: units, n: n });
        var desc = "'''" + s + "''' (" + s.length + "자리). ";
        if (on) desc += "세 자리씩 묶으면 '''" + units.join("·") + "''' → " + n + "청크. ";
        desc += "기억 단위 " + n + "개 → '''" + ver + "'''.";
        if (!on && n === 8) desc += " 7±2 범위(5~9) 안이긴 하지만 상한 근처라 틀리기 시작하는 길이다.";
        if (on && i === SEQ.length - 1) desc += " 같은 8자리가 3덩어리로 줄었다 — 전화번호를 010-xxxx-xxxx 로 끊어 외우는 것과 같다.";
        steps.push({
          desc: desc, pc: { proc: i === 0 ? (on ? 2 : 3) : (i === SEQ.length - 1 ? 4 : 5) },
          status: { proc: ver.indexOf("경계") === 0 ? "경계" : ver },
          vars: v(s, units.join("·"), n, ver), svg: drawSvg(rows.slice(), i)
        });
      });
      var last = rows[rows.length - 1];
      steps.push({
        desc: on
          ? "정리. 청크를 쓰면 8자리 91430985 도 '''3청크'''로 용량 안에 들어온다. 의미 있는 단위로 체제화하면 알려진 단기 기억 용량보다 '''더 많은 정보'''를 저장할 수 있다 (p.19)."
          : "정리. 4·5·5·6 자리는 용량 안, 8자리는 7±2 '''상한 근처(경계)'''다. 단기 기억 용량은 '''7±2개 항목''' (밀러, 1956). 철자·단어는 보통 5~6개 (Baddeley et al., 1985).",
        pc: { proc: 6 }, status: { proc: on ? "청크" : "7±2" },
        vars: v(last.seq, last.units.join("·"), last.n, verdict(last.n)),
        note: on ? undefined : "옵션에서 청크 만들기를 켜 보자 — 91430985 → 914·309·85.",
        svg: drawSvg(rows.slice(), rows.length - 1)
      });
      return {
        panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines }],
        vars: [
          { name: "제시 숫자열", group: "자극" }, { name: "자릿수", group: "자극" },
          { name: "기억 단위", group: "부호화" }, { name: "단위 수", group: "부호화" },
          { name: "용량 7±2 판정", group: "판정" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
