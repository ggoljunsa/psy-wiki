// ============================================================
// asch_conformity — 10장 p.15–16 애쉬의 동조 실험 (Asch, 1955)
// 시간축(초): 0–1.5 과제 제시(기준 선분 = 비교 선분 2) → 1.5–5.5 공모자 A–E 가 차례로 같은 오답 "1번"
//   → 5.5–7 참가자 망설임 → 7–9 참가자 "1번" (동조) + p.16 조건 ②③⑥ 체크
//   → 9–13 장면 2: E 한 명이 "2번" → ③ 만장일치 조건이 깨짐 → 참가자 "2번"
// 슬라이드에 동조율 수치가 없으므로 수치는 쓰지 않는다. 장면 2 는 p.16 조건 ③ 의 반대 상황.
// ============================================================
window.ANIMS = window.ANIMS || {};
ANIMS["asch_conformity"] = {
  title: "애쉬의 동조 실험 — 다섯 명이 같은 오답을 말할 때 13초",
  desc: "정답이 분명한 선분 판단에서도 공모자 다수가 같은 오답을 말하면 참가자가 [[동조]]한다. 한 명이라도 다른 답을 하면 p.16 조건 ③ '''집단이 만장일치일 때'''가 깨진다 — [[애쉬의 동조 실험]] (10장 p.15–16). 동조율 수치는 슬라이드에 없어 쓰지 않음.",
  duration: 13,
  build: function () {
    var C = {
      a: "#1d65b3", aL: "#dbe8f7", b: "#2e9e4f", bL: "#dff3e4",
      c: "#e09a40", cL: "#fdeec2", n: "#3b2f4a", nL: "#efe9f6",
      r: "#d6465f", rL: "#fbe0e5", muted: "#777"
    };
    function box(x, y, w, h, fill, stroke, extra) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' + (extra || "") + '/>';
    }
    function txt(x, y, s, size, fill, extra) {
      return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || "#222") + '" text-anchor="middle"' + (extra || "") + '>' + s + '</text>';
    }
    function show(from, to, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;' + (from / dur).toFixed(4) + ';' + (from / dur + 0.02).toFixed(4) + ';' + (to / dur).toFixed(4) + ';' + Math.min(1, to / dur + 0.02).toFixed(4) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function on(from, dur) {
      return '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + (from / dur).toFixed(4) + ';' + (from / dur + 0.02).toFixed(4) + ';1" dur="' + dur + 's" fill="freeze"/>';
    }
    function bubble(cx, label, stroke, fill, from, to) {
      return '<g opacity="0">' + box(cx - 26, 60, 52, 26, fill, stroke) +
        '<path d="M' + (cx - 5) + ',86 L' + cx + ',95 L' + (cx + 5) + ',86 z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>' +
        '<rect x="' + (cx - 4) + '" y="84" width="8" height="3" fill="' + fill + '"/>' +
        txt(cx, 78, label, 13, stroke, ' font-weight="700"') + show(from, to, D) + '</g>';
    }
    function person(cx, color, light, name) {
      return '<circle cx="' + cx + '" cy="114" r="15" fill="' + light + '" stroke="' + color + '" stroke-width="2"/>' +
        '<path d="M' + (cx - 20) + ',165 Q' + (cx - 20) + ',134 ' + cx + ',134 Q' + (cx + 20) + ',134 ' + (cx + 20) + ',165 z" fill="' + light + '" stroke="' + color + '" stroke-width="2"/>' +
        txt(cx, 186, name, 12, color, ' font-weight="700"');
    }
    var D = 13;
    var B = ' font-weight="700"';

    var s = '<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="애쉬의 동조 실험 애니메이션">';

    // ---- 단계 자막 ----
    var caps = [
      [0, 1.5, "과제: 기준 선분과 길이가 같은 비교 선분은? — 혼자라면 누구나 2번"],
      [1.5, 5.5, "공모자 다섯 명이 차례로 같은 오답 “1번”을 말한다"],
      [5.5, 7, "참가자 차례 — 내 눈엔 2번인데…"],
      [7, 9, "참가자도 “1번” — 행동·생각을 집단 기준에 맞춘다 = 동조"],
      [9, 13, "다시 해 보자: 이번엔 한 명(E)이 정답 “2번”을 말한다"]
    ];
    caps.forEach(function (c) {
      s += '<g opacity="0">' + txt(380, 26, c[2], 15, "#222", B) + show(c[0], c[1], D) + '</g>';
    });

    // ---- 왼쪽: 선분 카드 ----
    s += box(20, 48, 230, 180, "#fff", "#bbb");
    s += '<line x1="60" y1="70" x2="60" y2="190" stroke="#333" stroke-width="5"/>';
    s += '<line x1="130" y1="95" x2="130" y2="190" stroke="#333" stroke-width="5"/>';
    s += '<line x1="180" y1="70" x2="180" y2="190" stroke="#333" stroke-width="5"/>';
    s += '<line x1="230" y1="85" x2="230" y2="190" stroke="#333" stroke-width="5"/>';
    s += txt(60, 210, "기준 선분", 12, "#333", B);
    s += txt(130, 210, "1", 13, "#333", B) + txt(180, 210, "2", 13, "#333", B) + txt(230, 210, "3", 13, "#333", B);
    // 정답 표시 (초록 테두리)
    s += '<g opacity="0"><rect x="166" y="62" width="28" height="158" rx="6" fill="none" stroke="' + C.b + '" stroke-width="3"/>' +
      txt(180, 244, "정답 = 2", 13, C.b, B) + on(0.8, D) + '</g>';
    // 장면 1 에서 다수가 고른 1번 (빨간 점선)
    s += '<g opacity="0"><rect x="116" y="87" width="28" height="133" rx="6" fill="none" stroke="' + C.r + '" stroke-width="3" stroke-dasharray="5 3"/>' +
      txt(110, 244, "다수 = 1", 13, C.r, B) + show(2.2, 9, D) + '</g>';

    // ---- 오른쪽: 탁자와 사람들 ----
    var xs = [320, 380, 440, 500, 560], names = ["A", "B", "C", "D", "E"], PX = 660;
    s += '<ellipse cx="490" cy="176" rx="215" ry="22" fill="#efe6d8" stroke="#c9b48f" stroke-width="2"/>';
    xs.forEach(function (x, i) { s += person(x, C.n, C.nL, "공모자 " + names[i]); });
    s += person(PX, C.c, C.cL, "참가자");

    // 장면 1: A–E "1번"
    xs.forEach(function (x, i) { s += bubble(x, "1번", C.r, C.rL, 1.5 + 0.75 * i, 9); });
    // 참가자 망설임 → 동조
    s += bubble(PX, "2번…?", "#555", "#f4f4f4", 5.5, 7);
    s += bubble(PX, "…1번", C.r, C.rL, 7, 9);
    s += '<g opacity="0">' + box(PX - 34, 198, 68, 24, "#ffd9d9", "#a52f2f") + txt(PX, 215, "동조!", 13, "#a52f2f", B) + show(7, 9, D) + '</g>';

    // 장면 2: A–D "1번", E "2번", 참가자 "2번"
    xs.slice(0, 4).forEach(function (x, i) { s += bubble(x, "1번", C.r, C.rL, 9.2 + 0.3 * i, 13); });
    s += bubble(xs[4], "2번", C.b, C.bL, 10.2, 13);
    s += bubble(PX, "2번", C.b, C.bL, 11, 13);
    s += '<g opacity="0">' + box(PX - 44, 198, 88, 24, "#cdefd2", "#1d6b2a") + txt(PX, 215, "정답 유지", 13, "#1d6b2a", B) + on(11, D) + '</g>';
    s += '<g opacity="0"><circle cx="' + xs[4] + '" cy="114" r="21" fill="none" stroke="' + C.b + '" stroke-width="3"/>' + on(10.2, D) + '</g>';

    // ---- 아래: p.16 조건 판정 ----
    s += '<g opacity="0">' + box(270, 236, 470, 62, "#fff", "#a52f2f") +
      txt(505, 256, "p.16 동조가 발생하기 쉬운 조건 (애쉬, 1955)", 13, "#a52f2f", B) +
      txt(505, 278, "② 집단에 최소 3명 이상 ✓   ③ 집단이 만장일치 ✓   ⑥ 타인이 관찰 ✓", 12, "#333") +
      show(7, 9, D) + '</g>';
    s += '<g opacity="0">' + box(270, 236, 470, 62, "#fff", "#1d6b2a") +
      txt(505, 256, "③ 집단이 만장일치일 때 — 이번엔 ✗ (E 가 다른 답)", 13, "#1d6b2a", B) +
      txt(505, 278, "동조가 쉬운 조건 하나가 깨졌다 → 참가자가 자기 판단을 지킴", 12, "#333") +
      on(11, D) + '</g>';

    // ---- 요점 ----
    s += txt(380, 326, "동조 = 행동 혹은 생각을 집단 기준에 맞추는 것 — 만장일치·3명 이상·관찰될 때 쉬워진다 (10장 p.15–16)", 12, C.muted);
    s += '</svg>';
    return s;
  }
};
