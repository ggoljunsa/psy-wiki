// signal_detection — 4장 p.6 신호 탐지 이론
// 소음 N(0,1) · 신호 N(d',1), 기준선 c 를 왼쪽(관대) → 오른쪽(엄격)으로 0.5씩 이동.
// Hit = 1 − Φ(c − d'), FA = 1 − Φ(c). 기대: d'=2, c=1.0 → .841/.159, c=0 → .977/.500, c=2.5 → .309/.006
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  // 표준정규 누적분포 Φ (Abramowitz–Stegun 7.1.26, 오차 < 1.5e-7)
  function erf(x) {
    var s = x < 0 ? -1 : 1;
    x = Math.abs(x);
    var t = 1 / (1 + 0.3275911 * x);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  function pdf(z) { return Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI); }
  function f3(p) { return p.toFixed(3).replace(/^0\./, ".").replace(/^1\.000$/, "1.000"); }

  var CS = [-0.5, 0, 0.5, 1.0, 1.5, 2.0, 2.5];

  function lean(c, d) {
    var mid = d / 2;
    if (c < mid - 0.01) return "관대 (신호 있다고 자주 답함)";
    if (c > mid + 0.01) return "엄격 (확실할 때만 있다고 답함)";
    return "중립 (두 분포의 교차점)";
  }

  function drawSvg(d, c) {
    var W = 640, H = 270, L = 40, R = 620, T = 34, B = 220;
    var xmin = -3.5, xmax = d + 3.5;
    function X(v) { return (L + (v - xmin) / (xmax - xmin) * (R - L)).toFixed(1); }
    var ymax = pdf(0) * 1.12;
    function Y(p) { return (B - p / ymax * (B - T)).toFixed(1); }
    function curve(mu) {
      var pts = [];
      for (var v = xmin; v <= xmax + 1e-9; v += 0.05) pts.push(X(v) + "," + Y(pdf(v - mu)));
      return pts.join(" ");
    }
    function area(mu, from) {
      var pts = [X(from) + "," + B];
      for (var v = from; v <= xmax + 1e-9; v += 0.05) pts.push(X(v) + "," + Y(pdf(v - mu)));
      pts.push(X(xmax) + "," + B);
      return pts.join(" ");
    }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;font-family:system-ui,-apple-system,\'Apple SD Gothic Neo\',\'Malgun Gothic\',sans-serif">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    // 축
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#555"/>');
    o.push('<text x="' + R + '" y="' + (B + 30) + '" font-size="12" fill="#555" text-anchor="end">감각 증거의 세기 →</text>');
    // 면적: 오경보(소음 중 c 오른쪽) / 적중(신호 중 c 오른쪽)
    if (c !== null) {
      o.push('<polygon points="' + area(d, Math.max(c, xmin)) + '" fill="#e0525e" fill-opacity="0.28"/>');
      o.push('<polygon points="' + area(0, Math.max(c, xmin)) + '" fill="#3a6fd8" fill-opacity="0.38"/>');
    }
    o.push('<polyline points="' + curve(0) + '" fill="none" stroke="#3a6fd8" stroke-width="2.4"/>');
    o.push('<polyline points="' + curve(d) + '" fill="none" stroke="#d23f4c" stroke-width="2.4"/>');
    o.push('<text x="' + X(0) + '" y="' + (T - 10) + '" font-size="13" font-weight="bold" fill="#3a6fd8" text-anchor="middle">잡음(소음) N(0,1)</text>');
    o.push('<text x="' + X(d) + '" y="' + (T + 6) + '" font-size="13" font-weight="bold" fill="#d23f4c" text-anchor="middle">신호 N(' + d + ',1)</text>');
    // d' 화살표
    var yd = T + 22;
    o.push('<line x1="' + X(0) + '" y1="' + yd + '" x2="' + X(d) + '" y2="' + yd + '" stroke="#333" stroke-width="1.5" marker-end="url(#sdArr)" marker-start="url(#sdArr)"/>');
    o.push('<defs><marker id="sdArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#333"/></marker></defs>');
    o.push('<text x="' + (+X(d / 2) - 8).toFixed(1) + '" y="' + (yd - 5) + '" font-size="12" font-weight="bold" fill="#333" text-anchor="end">d′ = ' + d + '</text>');
    // 기준선
    if (c !== null) {
      o.push('<line x1="' + X(c) + '" y1="' + (T - 4) + '" x2="' + X(c) + '" y2="' + B + '" stroke="#222" stroke-width="2" stroke-dasharray="6,4"/>');
      o.push('<text x="' + X(c) + '" y="' + (B + 16) + '" font-size="12" font-weight="bold" fill="#222" text-anchor="middle">기준선 c = ' + c + '</text>');
      var hit = 1 - Phi(c - d), fa = 1 - Phi(c);
      o.push('<text x="' + (L + 4) + '" y="' + (H - 6) + '" font-size="12" fill="#d23f4c">■ 적중(Hit) ' + f3(hit) + '</text>');
      o.push('<text x="' + (L + 150) + '" y="' + (H - 6) + '" font-size="12" fill="#3a6fd8">■ 오경보(FA) ' + f3(fa) + '</text>');
      o.push('<text x="' + (L + 310) + '" y="' + (H - 6) + '" font-size="12" fill="#666">← 관대 · 엄격 →</text>');
    }
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["signal_detection"] = {
    title: "신호 탐지 이론: 기준선을 옮기면?",
    desc: "잡음 분포와 신호 분포는 그대로 두고 기준선(편향성)만 왼쪽(관대) → 오른쪽(엄격)으로 옮긴다. 적중·오경보가 '''함께''' 줄고 민감도 d′ 는 변하지 않는다 (4장 p.6).",
    options: [
      { key: "dprime", label: "민감도 d′", values: [
        { value: "2", label: "d′ = 2 (구별 잘함)" },
        { value: "1", label: "d′ = 1 (구별 어려움)" }
      ] }
    ],
    build: function (opts) {
      var d = Number(opts.dprime || 2);
      var lines = [
        "1. 잡음 분포 N(0,1)과 신호 분포 N(d′,1)을 그린다 — 두 분포의 거리 = 민감도 d′",
        "2. 기준선 c 를 정한다: 증거가 c 보다 크면 \"신호 있다\"고 응답",
        "3. 적중(Hit) = 신호 분포 중 c 오른쪽 넓이 = 1 − Φ(c − d′)",
        "4. 오경보(FA) = 잡음 분포 중 c 오른쪽 넓이 = 1 − Φ(c)",
        "5. 놓침 = 1 − Hit,  정기각(정확한 거절) = 1 − FA",
        "6. 기준선을 오른쪽으로 0.5 이동(더 엄격) → 3번부터 다시 계산",
        "7. 정리: d′ 는 그대로, 기준선만 바뀌어 Hit·FA 가 같은 방향으로 움직인다"
      ];
      var steps = [];
      function vars(c) {
        if (c === null) return { "기준선 c": "–", "민감도 d′": d, "적중(Hit)": "–", "오경보(FA)": "–", "놓침(Miss)": "–", "정기각(CR)": "–", "판단 성향": "–" };
        var hit = 1 - Phi(c - d), fa = 1 - Phi(c);
        return {
          "기준선 c": c, "민감도 d′": d,
          "적중(Hit)": f3(hit), "오경보(FA)": f3(fa),
          "놓침(Miss)": f3(1 - hit), "정기각(CR)": f3(1 - fa),
          "판단 성향": lean(c, d)
        };
      }
      steps.push({
        desc: "청력 검사를 떠올리자. 소리가 없을 때 귀에 들어오는 것은 '''잡음'''(파란 곡선), 소리가 있을 때는 '''신호+잡음'''(빨간 곡선)이다. 두 곡선의 거리가 [[신호 탐지 이론|민감도 d′]] = " + d + " 이다. 아직 기준선을 정하지 않았다.",
        pc: { proc: 1 }, vars: vars(null),
        note: "Φ 는 표준정규분포의 누적확률. 분포 모양(정규분포·분산 1)은 이론 설명용 가정이며 슬라이드 그림과 같은 구조다.",
        svg: drawSvg(d, null)
      });
      CS.forEach(function (c, i) {
        var hit = 1 - Phi(c - d), fa = 1 - Phi(c);
        var desc;
        if (i === 0) {
          desc = "기준선을 '''c = " + c + "''' (아주 왼쪽, '''관대''')에 둔다. 조금만 소리 비슷해도 \"들린다\"고 답하는 사람이다. 적중 " + f3(hit) + " 로 신호를 거의 다 잡지만, 오경보도 " + f3(fa) + " 로 많다.";
        } else {
          desc = "기준선을 오른쪽으로 0.5 옮겨 '''c = " + c + "'''. 적중 " + f3(hit) + ", 오경보 " + f3(fa) + " — " +
            "이전보다 '''둘 다 감소'''했다. 놓침은 " + f3(1 - hit) + " 로 늘고, 정기각은 " + f3(1 - fa) + " 로 늘었다.";
          if (Math.abs(c - d / 2) < 0.01) desc += " 지금 기준선이 두 분포의 교차점(중립)이다.";
        }
        steps.push({
          desc: desc, pc: { proc: i === 0 ? 2 : 6 }, vars: vars(c),
          status: { proc: c < d / 2 - 0.01 ? "관대" : (c > d / 2 + 0.01 ? "엄격" : "중립") },
          svg: drawSvg(d, c)
        });
      });
      var last = CS[CS.length - 1];
      steps.push({
        desc: "정리. 기준선을 −0.5 → " + last + " 로 옮기는 동안 두 곡선은 한 번도 움직이지 않았다(d′ = " + d + " 불변). 바뀐 것은 '''응답 편향'''뿐이고, 그 결과 '''적중과 오경보가 같이 줄었다'''. 민감도를 올리려면 기준선이 아니라 두 분포 사이 거리(d′)가 커져야 한다.",
        pc: { proc: 7 }, vars: vars(last), status: { proc: "엄격" },
        note: "시험 함정: \"기준선이 오른쪽(엄격)으로 가면 적중은 줄고 오경보는 는다\" (✗). 오른쪽으로 가면 Hit·FA '''둘 다 감소''', 왼쪽(관대)으로 가면 둘 다 증가. 민감도 d′ 는 기준선과 무관.",
        svg: drawSvg(d, last)
      });
      return {
        panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines }],
        vars: [
          { name: "기준선 c", group: "설정" }, { name: "민감도 d′", group: "설정" },
          { name: "적중(Hit)", group: "신호 있음" }, { name: "놓침(Miss)", group: "신호 있음" },
          { name: "오경보(FA)", group: "신호 없음" }, { name: "정기각(CR)", group: "신호 없음" },
          { name: "판단 성향", group: "판정" }
        ],
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
