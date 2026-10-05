// reinforcement_schedules — 5장 p.22–23 강화 계획 (연속 vs 부분, 고정/변동 × 비율/간격)
// 기대: FR·VR 반응 50 → 강화 5, CRF 반응 50 → 강화 50, FI 가리비(보상 직전 몰림), VI 느리지만 꾸준
(function (global) {
  "use strict";
  global.SIMS = global.SIMS || {};

  var FONT = "font-family:system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";
  var N = 50;

  var INFO = {
    FR: { name: "고정 비율(FR 10)", ex: "커피 쿠폰: 10번 사면 1잔 무료", ratio: true },
    VR: { name: "변동 비율(VR 평균 10)", ex: "슬롯 머신 · 낚시꾼", ratio: true, gaps: [7, 13, 9, 11, 10] },
    FI: { name: "고정 간격(FI 10틱)", ex: "정기 할인 행사", ratio: false },
    VI: { name: "변동 간격(VI 평균 10틱)", ex: "SNS 좋아요 알람 확인하기", ratio: false, gaps: [6, 14, 9, 11, 10] },
    CRF: { name: "연속 강화(CRF)", ex: "반응할 때마다 매번 보상", ratio: true }
  };

  // FI 한 주기(10틱) 안 위치별 반응 수: 보상 직후 쉬고, 보상 시점이 가까워질수록 급증 (표시용 예시값)
  var FI_CYCLE = [0, 0, 0, 1, 0, 1, 1, 2, 3, 4];

  function drawSvg(rec, sched, upto) {
    // rec: [{t, cum, rein}] 길이 N (0..N-1 은 step 1..N)
    var W = 640, H = 260, L = 48, R = 620, T = 28, B = 214;
    var maxCum = 0;
    rec.forEach(function (p) { if (p.cum > maxCum) maxCum = p.cum; });
    var ymax = Math.max(10, Math.ceil(maxCum / 10) * 10);
    function X(t) { return (L + t / N * (R - L)).toFixed(1); }
    function Y(c) { return (B - c / ymax * (B - T)).toFixed(1); }
    var o = [];
    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;' + FONT + '">');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    o.push('<text x="' + L + '" y="16" font-size="12" font-weight="bold" fill="#334">누적 반응 기록 — ' + INFO[sched].name + '  (▼ = 강화)</text>');
    for (var g = 0; g <= ymax; g += (ymax > 40 ? 20 : 10)) {
      o.push('<line x1="' + L + '" y1="' + Y(g) + '" x2="' + R + '" y2="' + Y(g) + '" stroke="#ccd3de" stroke-opacity="0.6"/>');
      o.push('<text x="' + (L - 6) + '" y="' + (+Y(g) + 4) + '" font-size="11" fill="#667" text-anchor="end">' + g + '</text>');
    }
    for (var t = 0; t <= N; t += 10) {
      o.push('<text x="' + X(t) + '" y="' + (B + 16) + '" font-size="11" fill="#667" text-anchor="middle">' + t + '</text>');
    }
    o.push('<text x="' + R + '" y="' + (B + 32) + '" font-size="11" fill="#667" text-anchor="end">' + (INFO[sched].ratio ? "반응 번호(1회 = 1틱) →" : "경과 시간(틱) →") + '</text>');
    o.push('<text x="' + (L - 6) + '" y="' + (T - 10) + '" font-size="11" fill="#667" text-anchor="end">누적 반응</text>');
    // 계단
    var d = "M" + X(0) + "," + Y(0);
    var prev = 0;
    for (var i = 0; i <= upto && i < rec.length; i++) {
      var p = rec[i];
      d += " L" + X(p.t) + "," + Y(prev) + " L" + X(p.t) + "," + Y(p.cum);
      prev = p.cum;
    }
    o.push('<path d="' + d + '" fill="none" stroke="#223" stroke-width="2"/>');
    for (var j = 0; j <= upto && j < rec.length; j++) {
      if (rec[j].rein && (sched !== "CRF" || j % 5 === 4 || j === upto)) {
        o.push('<text x="' + X(rec[j].t) + '" y="' + (+Y(rec[j].cum) - 4) + '" font-size="' + (sched === "CRF" ? 10 : 13) + '" fill="#d23f4c" text-anchor="middle">▼</text>');
      }
    }
    if (sched === "CRF") o.push('<text x="' + L + '" y="' + (B + 32) + '" font-size="11" fill="#d23f4c">(매 반응 강화 — ▼는 5회마다만 표시)</text>');
    o.push('<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#555"/>');
    o.push('</svg>');
    return o.join("");
  }

  global.SIMS["reinforcement_schedules"] = {
    title: "강화 계획: 언제 보상을 줄까?",
    desc: "같은 50번(또는 50틱) 동안 보상을 주는 규칙만 바꿔 본다. 비율 계획은 '''반응 수''', 간격 계획은 '''시간''' 기준이고, 고정/변동은 그 기준이 일정한지 무작위인지다 (5장 p.22–23). [[강화 계획]]",
    options: [
      { key: "schedule", label: "강화 계획", values: [
        { value: "FR", label: "고정 비율 FR 10 (커피 쿠폰)" },
        { value: "VR", label: "변동 비율 VR 10 (슬롯 머신)" },
        { value: "FI", label: "고정 간격 FI 10 (정기 할인)" },
        { value: "VI", label: "변동 간격 VI 10 (SNS 좋아요)" },
        { value: "CRF", label: "연속 강화 CRF" }
      ] }
    ],
    build: function (opts) {
      var sched = INFO[opts.schedule] ? opts.schedule : "FR";
      var info = INFO[sched];
      var steps = [], rec = [];
      var cum = 0, rein = 0, since = 0, lines, vars;

      if (info.ratio) {
        lines = sched === "CRF" ? [
          "1. 규칙: 반응할 때마다 매번 강화 (연속 강화계획)",
          "2. 반응 1회 발생 → 누적 반응 + 1",
          "3. 강화 제공 (매번)",
          "4. 정리: 학습은 빠르지만, 보상이 끊기면 소거도 빠르다"
        ] : [
          "1. 규칙: " + (sched === "FR" ? "정확히 10번 반응할 때마다 강화" : "평균 10번, 매번 다른(무작위) 반응 수 후 강화"),
          "2. 반응 1회 발생 → 누적 반응 + 1, 마지막 강화 후 반응 + 1",
          "3. 마지막 강화 후 반응 수가 목표에 도달? → 아니면 2번으로",
          "4. 도달 → 강화 제공, 카운트 0 으로, 다음 목표 설정",
          "5. 정리: 부분 강화 = 학습 느림 · 소거 저항 높음"
        ];
        vars = [
          { name: "계획", group: "규칙" }, { name: "이번 목표(반응 수)", group: "규칙" },
          { name: "누적 반응", group: "기록" }, { name: "누적 강화", group: "기록" },
          { name: "마지막 강화 후 반응 수", group: "기록" }
        ];
        var gi = 0;
        function target() { return sched === "CRF" ? 1 : (sched === "FR" ? 10 : info.gaps[gi % info.gaps.length]); }
        function snap(tg) {
          return { "계획": info.name, "이번 목표(반응 수)": tg, "누적 반응": cum, "누적 강화": rein, "마지막 강화 후 반응 수": since };
        }
        steps.push({
          desc: info.name + " — 예: " + info.ex + ". " + (sched === "VR" ? "목표 반응 수는 7·13·9·11·10 처럼 바뀌지만 평균은 10이다. 다음 보상이 언제 올지 모른다." : sched === "FR" ? "10번째 반응마다 보상이 나온다." : "반응할 때마다 보상이 나온다."),
          pc: { proc: 1 }, vars: snap(target()), status: { proc: sched },
          note: sched === "VR" ? "VR 간격 7·13·9·11·10 은 재현을 위한 고정 시드(표시용)." : undefined,
          svg: drawSvg(rec, sched, -1)
        });
        for (var i = 1; i <= N; i++) {
          var tg = target();
          cum++; since++;
          var hit = since >= tg;
          var desc, pc;
          if (hit) {
            rein++;
            desc = (sched === "CRF")
              ? "반응 " + cum + "회 → '''바로 강화''' (누적 강화 " + rein + ")."
              : "반응 " + cum + "회 — 마지막 강화 후 " + since + "번째 반응이 목표 " + tg + " 에 도달 → '''강화 ▼''' (누적 강화 " + rein + ").";
            pc = sched === "CRF" ? 3 : 4;
            rec.push({ t: i, cum: cum, rein: true });
            var sn = snap(tg); sn["마지막 강화 후 반응 수"] = since;
            since = 0; gi++;
            steps.push({ desc: desc, pc: { proc: pc }, vars: sn, status: { proc: "강화" }, svg: drawSvg(rec.slice(), sched, rec.length - 1) });
          } else {
            desc = "반응 " + cum + "회. 마지막 강화 후 " + since + "번 / 목표 " + tg + " — 아직 보상 없음.";
            rec.push({ t: i, cum: cum, rein: false });
            steps.push({ desc: desc, pc: { proc: sched === "CRF" ? 2 : (since === 1 ? 2 : 3) }, vars: snap(tg), status: { proc: "반응" }, svg: drawSvg(rec.slice(), sched, rec.length - 1) });
          }
        }
      } else {
        lines = [
          "1. 규칙: " + (sched === "FI" ? "강화 후 정확히 10틱이 지난 뒤 첫 반응에 강화" : "강화 후 매번 다른(평균 10틱) 시간이 지난 뒤 첫 반응에 강화"),
          "2. 1틱 경과 → 이번 틱의 반응 수 기록",
          "3. 정해진 시간이 지났고 반응이 있었나? → 아니면 2번으로",
          "4. 그렇다 → 강화 제공, 시계 0 으로",
          "5. 정리: 부분 강화 = 학습 느림 · 소거 저항 높음"
        ];
        vars = [
          { name: "계획", group: "규칙" }, { name: "이번 간격(틱)", group: "규칙" },
          { name: "경과 시간(틱)", group: "기록" }, { name: "이번 틱 반응", group: "기록" },
          { name: "누적 반응", group: "기록" }, { name: "누적 강화", group: "기록" },
          { name: "마지막 강화 후 경과 시간", group: "기록" }
        ];
        var gj = 0;
        function interval() { return sched === "FI" ? 10 : info.gaps[gj % info.gaps.length]; }
        function snap2(t, now, iv) {
          return { "계획": info.name, "이번 간격(틱)": iv, "경과 시간(틱)": t, "이번 틱 반응": now, "누적 반응": cum, "누적 강화": rein, "마지막 강화 후 경과 시간": since };
        }
        steps.push({
          desc: info.name + " — 예: " + info.ex + ". " + (sched === "FI" ? "보상 시점이 정해져 있으므로, 그 시점이 가까워질수록 반응이 몰린다." : "간격 6·14·9·11·10 틱처럼 언제 보상이 올지 모르므로, 느리지만 꾸준히 확인한다."),
          pc: { proc: 1 }, vars: snap2(0, 0, interval()), status: { proc: sched },
          note: (sched === "FI" ? "틱당 반응 수(가리비 모양)는 표시용 예시값." : "VI 간격 6·14·9·11·10 과 틱당 반응 1회는 표시용 예시값(고정 시드)."),
          svg: drawSvg(rec, sched, -1)
        });
        for (var t = 1; t <= N; t++) {
          var iv = interval();
          since++;
          var now = sched === "FI" ? FI_CYCLE[(since - 1) % 10] : 1;
          cum += now;
          var hit2 = since >= iv && now > 0;
          var d2;
          if (hit2) {
            rein++;
            d2 = t + "틱: 간격 " + iv + "틱이 지났고 반응이 " + now + "번 있었다 → '''강화 ▼''' (누적 강화 " + rein + ").";
            var s2 = snap2(t, now, iv);
            rec.push({ t: t, cum: cum, rein: true });
            steps.push({ desc: d2, pc: { proc: 4 }, vars: s2, status: { proc: "강화" }, svg: drawSvg(rec.slice(), sched, rec.length - 1) });
            since = 0; gj++;
          } else {
            d2 = t + "틱: 이번 틱 반응 " + now + "번 (누적 " + cum + "). " +
              (sched === "FI" ? (since <= 3 ? "보상 직후라 거의 반응하지 않는다." : since >= 8 ? "보상 시점이 다가오자 반응이 '''급증'''한다." : "조금씩 반응이 늘어난다.") : "언제 올지 모르니 일정하게 확인한다.");
            rec.push({ t: t, cum: cum, rein: false });
            steps.push({ desc: d2, pc: { proc: since === 1 ? 2 : 3 }, vars: snap2(t, now, iv), status: { proc: "대기" }, svg: drawSvg(rec.slice(), sched, rec.length - 1) });
          }
        }
      }

      var last = steps[steps.length - 1];
      var summary = {
        FR: "반응 50회 → 강화 '''5회'''. 10번마다 정확히 한 번씩 계단처럼 보상이 나왔다.",
        VR: "반응 50회 → 강화 '''5회''' (FR 과 같은 수). 하지만 언제 나올지 몰라 계속 반응하게 되므로 '''소거가 잘 이루어지지 않는다''' — 슬롯 머신.",
        FI: "50틱 동안 강화 '''5회''', 반응 " + cum + "회. 보상 직후에는 쉬다가 보상 시점이 가까워질수록 빠르게 반응 — 그래프가 '''가리비(급증) 모양'''이다.",
        VI: "50틱 동안 강화 '''5회''', 반응 " + cum + "회. 그래프가 '''완만하지만 일정한 직선''' — 느리지만 매우 꾸준한 반응.",
        CRF: "반응 50회 → 강화 '''50회'''. 매번 보상하므로 학습은 가장 빠르다."
      }[sched];
      steps.push({
        desc: "정리. " + summary,
        pc: { proc: lines.length }, vars: JSON.parse(JSON.stringify(last.vars)), status: { proc: sched },
        note: sched === "CRF"
          ? "연속 강화계획은 학습이 빠르지만, 보상이 끊기면 소거도 빠르다. 부분(간헐적) 강화 = 학습은 느리지만 '''소거 저항도가 높음''' (p.22)."
          : "부분(간헐적) 강화계획: 연속 계획에 비해 '''학습이 느리지만 소거 저항도가 높다''' (p.22).",
        svg: drawSvg(rec.slice(), sched, rec.length - 1)
      });
      return {
        panels: [{ id: "proc", title: "절차", lang: "txt", lines: lines }],
        vars: vars,
        steps: steps
      };
    }
  };
})(typeof window !== "undefined" ? window : this);
