const project = {
  "id": "115501",
  "layout": "infra",
  "title": "SkyLab 校園雲端實驗室營運平台",
  "short": "SkyLab",
  "accent": "#22c55e",
  "accent2": "#38bdf8",
  "dark": "#07111f",
  "modules": [
    "課程資源池",
    "VM/LXC 佈署",
    "AI 推論配額",
    "Gateway / DNS",
    "批次診斷",
    "稽核紀錄"
  ],
  "records": [
    "Linux 實作班：38 台 LXC 已開通",
    "機器學習課：GPU 配額排程完成",
    "資安課程：實驗環境已隔離"
  ]
};

const canvas = document.getElementById("visualCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let pulse = 0;

function cssVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function clear(bg = "#ffffff") {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function text(value, x, y, size = 20, color = "#172033", weight = 800) {
  ctx.fillStyle = color;
  ctx.font = weight + " " + size + "px Microsoft JhengHei, Segoe UI, sans-serif";
  ctx.fillText(value, x, y);
}

function rounded(x, y, w, h, color, stroke) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 8);
  ctx.fillStyle = color;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawGrid() {
  ctx.strokeStyle = "rgba(90,110,130,.15)";
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 34) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 34) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
}

function drawInfra() {
  clear("#f8fbff"); drawGrid();
  const a = cssVar("--accent"), b = cssVar("--accent2");
  const nodes = [[120,120,"課程"],[330,88,"資源池"],[560,130,"VM/LXC"],[300,300,"AI"],[610,330,"網路"],[790,210,"稽核"]];
  ctx.strokeStyle = "rgba(56,189,248,.45)"; ctx.lineWidth = 4;
  [[0,1],[1,2],[1,3],[2,4],[4,5],[3,5]].forEach(([i,j]) => { ctx.beginPath(); ctx.moveTo(nodes[i][0],nodes[i][1]); ctx.lineTo(nodes[j][0],nodes[j][1]); ctx.stroke(); });
  nodes.forEach((n,i) => { rounded(n[0]-48,n[1]-28,96,56,i%2?a:b,"#fff"); text(n[2],n[0]-28,n[1]+7,18,"#fff",900); });
  text("Campus Cloud Resource Topology", 26, 40, 22, "#0f172a", 900);
}

function drawLanguage() {
  clear("#fffdf8");
  rounded(34, 28, canvas.width - 68, 170, "#fef2f2", "#fecaca");
  text("即拍即學", 58, 76, 24, "#991b1b", 900);
  ["駅", "切符", "弁当", "出口"].forEach((word, i) => { rounded(58 + i * 70, 108, 54, 54, i % 2 ? cssVar("--accent2") : cssVar("--accent"), "#fff"); text(word, 71 + i * 70, 143, 20, "#fff", 900); });
  rounded(34, 228, canvas.width - 68, 120, "#eff6ff", "#bfdbfe");
  text("AI 會話：餐廳情境", 58, 270, 20, "#1d4ed8", 900);
  text("おすすめは何ですか？", 58, 312, 20, "#172033", 800);
  rounded(60, 380, canvas.width - 120, 54, "#fff7ed", "#fed7aa");
  text("小組進度 86%", 84, 414, 20, "#c2410c", 900);
}

function drawConsulting() {
  clear("#fbfbff"); drawGrid();
  text("Voice of Customer Analysis", 32, 48, 24, "#312e81", 900);
  const labels = ["正向", "風險", "需求", "建議"];
  labels.forEach((label, i) => {
    const x = 70 + (i % 2) * 390, y = 90 + Math.floor(i / 2) * 180;
    rounded(x, y, 320, 128, i === 1 ? "#fee2e2" : "#eef2ff", "#c7d2fe");
    text(label, x + 22, y + 42, 24, i === 1 ? "#b91c1c" : "#4338ca", 900);
    ctx.fillStyle = i === 1 ? "#ef4444" : cssVar("--accent");
    ctx.fillRect(x + 22, y + 72, 230 - i * 28, 12);
  });
}

function drawMood() {
  clear("#fffafc");
  const cx = canvas.width / 2, cy = 205;
  const colors = ["#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6"];
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, 130 - i * 24, -Math.PI / 2, Math.PI * (0.5 + i * .16));
    ctx.strokeStyle = colors[i]; ctx.lineWidth = 16; ctx.stroke();
  }
  text("本週心情羅盤", cx - 82, cy + 8, 24, "#34203d", 900);
  ["平穩", "疲憊", "期待", "焦慮"].forEach((label, i) => text(label, 54 + i * 132, 390, 18, colors[i], 900));
}

function drawImpact() {
  clear("#fffdf8");
  text("補助簡章解析 + 企劃書生成", 34, 48, 24, "#78350f", 900);
  rounded(42, 84, canvas.width * .42, 250, "#fff7ed", "#fed7aa");
  rounded(canvas.width * .5, 84, canvas.width * .43, 250, "#f0fdf4", "#bbf7d0");
  ["服務對象", "預算限制", "效益指標", "佐證資料"].forEach((label, i) => { text(label, 72, 136 + i * 46, 19, "#92400e", 800); ctx.fillStyle = "#f59e0b"; ctx.fillRect(190, 122 + i * 46, 160 + i * 26, 10); });
  ["RAG 引用", "段落改寫", "審查風險", "輸出草稿"].forEach((label, i) => { text(label, canvas.width * .54, 136 + i * 46, 19, "#047857", 800); });
}

function drawCare() {
  clear("#061522");
  const a = cssVar("--accent"), b = cssVar("--accent2");
  const cx = canvas.width / 2, cy = canvas.height / 2;
  for (let r = 70; r < 260; r += 45) { ctx.beginPath(); ctx.arc(cx, cy, r + Math.sin(pulse / 18) * 4, 0, Math.PI * 2); ctx.strokeStyle = "rgba(14,165,233,.24)"; ctx.lineWidth = 3; ctx.stroke(); }
  [[cx-170,cy-70],[cx+130,cy-92],[cx-70,cy+115],[cx+170,cy+88]].forEach((p,i)=>{ rounded(p[0]-38,p[1]-24,76,48,i===2?"#ef4444":b); text(i===2?"警報":"安全",p[0]-25,p[1]+7,17,"#fff",900); });
  text("Wi-Fi CSI 非影像感測", 34, 48, 24, "#ecfeff", 900);
}

function drawAdmission() {
  clear("#ffffff");
  text("Admissions / Event Pipeline", 32, 46, 24, "#1d4ed8", 900);
  const stages = [["報名", 184], ["付款", 128], ["審查", 96], ["錄取", 42]];
  stages.forEach((s, i) => {
    const x = 70 + i * 220, h = 250 - i * 42;
    rounded(x, 120 + i * 21, 150, h, i % 2 ? cssVar("--accent2") : cssVar("--accent"), "#fff");
    text(s[0], x + 48, 160 + i * 21, 22, "#fff", 900);
    text(String(s[1]), x + 48, 215 + i * 21, 34, "#fff", 900);
  });
}

function drawFitness() {
  clear("#fbfff7");
  const a = cssVar("--accent2");
  text("Pose Coach", 34, 46, 24, "#14532d", 900);
  ctx.strokeStyle = a; ctx.lineWidth = 10; ctx.lineCap = "round";
  const pts = { head:[180,100], neck:[180,158], hip:[185,260], lk:[130,360], la:[92,462], rk:[252,360], ra:[300,462], lh:[115,220], rh:[245,220] };
  ctx.beginPath(); ctx.arc(pts.head[0],pts.head[1],34,0,Math.PI*2); ctx.stroke();
  [["neck","hip"],["neck","lh"],["neck","rh"],["lh","rh"],["hip","lk"],["lk","la"],["hip","rk"],["rk","ra"]].forEach(([p,q])=>{ctx.beginPath();ctx.moveTo(...pts[p]);ctx.lineTo(...pts[q]);ctx.stroke();});
  rounded(32, 492, 300, 54, "#ecfccb", "#bef264"); text("姿勢準確率 91%", 76, 527, 22, "#365314", 900);
}

function drawStudy() {
  clear("#ffffff"); drawGrid();
  text("Study OS Workspace", 30, 44, 24, "#065f46", 900);
  rounded(44, 80, 210, 300, "#ecfdf5", "#a7f3d0");
  rounded(292, 80, 220, 300, "#eef2ff", "#c7d2fe");
  rounded(550, 80, 220, 300, "#fff7ed", "#fed7aa");
  text("時間軸", 84, 132, 22, "#047857", 900);
  text("筆記 + 圖解", 326, 132, 22, "#4338ca", 900);
  text("題庫盲點", 592, 132, 22, "#c2410c", 900);
  for (let i=0;i<5;i++) { ctx.fillStyle = i%2 ? cssVar("--accent2") : cssVar("--accent"); ctx.fillRect(92, 170+i*34, 120+i*12, 10); }
  ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(330,240); ctx.lineTo(390,184); ctx.lineTo(450,250); ctx.stroke();
  ["極限", "文法", "公式"].forEach((v,i)=>text(v, 610, 180+i*56, 20, "#9a3412", 900));
}

function drawGame() {
  clear("#07070b");
  const a = cssVar("--accent"), b = cssVar("--accent2");
  ctx.fillStyle = "#111827"; ctx.fillRect(0, canvas.height * .62, canvas.width, canvas.height * .38);
  for (let i=0;i<9;i++) { ctx.fillStyle = "rgba(255,255,255,.06)"; ctx.fillRect(90+i*120, 130+(i%3)*28, 54, 260); }
  rounded(230, 330, 58, 150, "#d97706"); rounded(640, 300, 72, 180, "#b91c1c");
  ctx.strokeStyle = b; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(170, 482); ctx.lineTo(canvas.width - 170, 482); ctx.stroke();
  rounded(250, 90, 280, 56, "rgba(255,255,255,.08)", "rgba(255,255,255,.16)");
  rounded(620, 90, 280, 56, "rgba(255,255,255,.08)", "rgba(255,255,255,.16)");
  text("玩家：格擋準備", 274, 124, 24, "#fff", 900); text("敵人 AI：追擊", 646, 124, 24, "#fff", 900);
  ctx.fillStyle = a; ctx.fillRect(274, 154, 180, 12); ctx.fillStyle = b; ctx.fillRect(646, 154, 190, 12);
}

function draw() {
  if (!ctx) return;
  if (project.layout === "infra") drawInfra();
  else if (project.layout === "language") drawLanguage();
  else if (project.layout === "consulting") drawConsulting();
  else if (project.layout === "mood") drawMood();
  else if (project.layout === "impact") drawImpact();
  else if (project.layout === "care") drawCare();
  else if (project.layout === "admission") drawAdmission();
  else if (project.layout === "fitness") drawFitness();
  else if (project.layout === "study") drawStudy();
  else drawGame();
}

function showNotice(action) {
  const notice = document.getElementById("notice");
  if (!notice) return;
  const map = {
    demo: "已切換為全權限公開展示，所有流程皆可瀏覽。",
    deploy: "已模擬批次開通課程資源。",
    audit: "已模擬完成課後統一診斷。",
    start: "已模擬開始低衝擊訓練。",
    pain: "已記錄疼痛回饋並降低今日強度。"
  };
  notice.textContent = map[action] || "已完成模擬操作。";
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    pulse += 10;
    showNotice(button.dataset.action);
    draw();
  });
});

if (project.layout === "care") {
  setInterval(() => { pulse += 1; draw(); }, 900);
}

draw();
