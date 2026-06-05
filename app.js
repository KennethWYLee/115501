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
  ],
  "ui": {
    "eyebrow": "校園雲端管理",
    "primaryNav": "資源申請",
    "capabilityNav": "資源治理",
    "flowNav": "開課部署",
    "actionLabel": "批次開通",
    "capabilityTitle": "雲端資源與治理",
    "flowTitle": "開課部署步驟",
    "recordTitle": "近期資源動態",
    "operationNotice": "已定位到課程資源申請區，可建立 VM/LXC 與網路配置。"
  }
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
    operate: project.ui?.operationNotice || "已定位到主要工作區。",
    deploy: "課程資源批次已建立。",
    audit: "課後統一診斷已完成。",
    start: "低衝擊訓練已開始。",
    pain: "已記錄疼痛回饋並降低今日強度。"
  };
  notice.textContent = map[action] || "作業已完成。";
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    pulse += 10;
    showNotice(button.dataset.action);
    if (button.dataset.action === "operate") {
      document.getElementById("functionLab")?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    draw();
  });
});

if (project.layout === "care") {
  setInterval(() => { pulse += 1; draw(); }, 900);
}

draw();

// functional-enhancement-start
(function featureEnhancement() {
  const featureRoot = document.getElementById("featureApp");
  if (!featureRoot || typeof project === "undefined") return;

  const storeKey = "ntub-feature-" + project.id;
  const defaults = {
    infra: () => ({ requests: [{ course: "資安實作", template: "Kali LXC", count: 38, status: "待開通" }], aiQueue: ["影像辨識課程 API", "期末專題 vLLM"], diagnostics: ["linux-12: nginx 未啟動"], network: "上課時間開放" }),
    language: () => ({ words: [{ jp: "駅", kana: "えき", zh: "車站", level: "N5" }], chat: [{ role: "ai", text: "請選擇場景後開始日語對話。" }], points: 120, group: 62, badges: ["連續登入 7 天"] }),
    consulting: () => ({ analyses: [{ title: "新人訓練回饋", tag: "教材清楚", risk: "時間不足" }], template: "請依正向、負向、建議三類整理回饋，並提出課程改善方向。" }),
    mood: () => ({ moods: [{ mood: "平穩", note: "完成今天待辦", date: "今天" }], tasks: [{ text: "散步 15 分鐘", done: false }], photos: 2, friends: ["家人共享摘要"], music: "Lo-fi 陪伴歌單" }),
    impact: () => ({ proposals: [{ grant: "長照據點補助", title: "偏鄉陪伴服務計畫", status: "草稿" }], donations: 56000, citations: 8 }),
    care: () => ({ events: [{ room: "浴室", state: "活動異常", risk: "高", notified: true }], accuracy: 72, devices: 12 }),
    admission: () => ({ applicants: [{ name: "王小明", stage: "審查中", paid: true, score: 82, checked: false }], code: "UP-4286", exported: 0 }),
    fitness: () => ({ sessions: [{ exercise: "超慢跑", minutes: 12, accuracy: 91, pain: "低" }], points: 320, badges: ["連續訓練 6 週"], reports: [] }),
    study: () => ({ tasks: [{ time: "20:00", text: "英文單字複習", type: "具時限" }], notes: ["極限題型圖解"], mistakes: [{ subject: "微積分", topic: "極限", count: 3 }], chat: ["AI：我可以直接依目前題目補充詳解。"] }),
    game: () => ({ hp: 82, stamina: 64, enemy: 76, enemyState: "追擊", log: ["載入存檔：城門前營火"], saved: false })
  };

  let state = loadState();

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) || "null");
      if (saved) return saved;
    } catch (_) {}
    return defaults[project.layout] ? defaults[project.layout]() : {};
  }

  function saveState() {
    localStorage.setItem(storeKey, JSON.stringify(state));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  }

  function button(action, text, extra = "") {
    return '<button class="feature-button ' + extra + '" data-feature="' + action + '">' + text + '</button>';
  }

  function kpis(items) {
    return '<div class="feature-kpis">' + items.map(([label, value, note]) => '<article class="feature-kpi"><span>' + label + '</span><strong>' + value + '</strong><small>' + note + '</small></article>').join("") + '</div>';
  }

  function item(title, meta, action, label) {
    return '<article class="feature-item"><strong>' + escapeHtml(title) + '</strong><small>' + escapeHtml(meta) + '</small>' + (action ? '<div class="feature-row" style="margin-top:8px">' + button(action, label || "處理", "secondary") + '</div>' : '') + '</article>';
  }

  function renderInfra() {
    return '<div class="feature-grid"><section class="feature-form"><h3>VM/LXC 批次開通</h3><label>課程<select id="infraCourse"><option>資安實作</option><option>機器學習</option><option>Linux Server</option></select></label><label>模板<select id="infraTemplate"><option>Kali LXC</option><option>PostgreSQL VM</option><option>n8n Automation</option><option>vLLM GPU 節點</option></select></label><label>數量<input id="infraCount" type="number" min="1" max="80" value="24"></label><div class="feature-row">' + button("infra-create", "建立資源申請") + button("infra-diagnose", "批次診斷", "secondary") + button("infra-network", "套用網路時間窗", "ghost") + '</div></section><section class="feature-output">' + kpis([["申請批次", state.requests.length, "VM/LXC"], ["AI 申請", state.aiQueue.length, "待審"], ["網路策略", state.network, "Gateway/DNS"]]) + '<h3>申請與診斷</h3><div class="feature-list">' + state.requests.map((r) => item(r.course + " / " + r.template, r.count + " 台，狀態：" + r.status, "infra-approve", "核准開通")).join("") + state.diagnostics.map((d) => item("診斷結果", d)).join("") + state.aiQueue.map((q) => item("AI API 申請", q, "infra-ai", "核准 API")).join("") + '</div></section></div>';
  }

  function renderLanguage() {
    return '<div class="feature-grid"><section class="feature-form"><h3>即拍即學與 AI 對話</h3><label>拍攝場景<select id="langScene"><option>車站</option><option>便利商店</option><option>餐廳</option><option>房間</option></select></label><div class="feature-row">' + button("lang-recognize", "AI 辨識單字") + button("lang-settle", "結算小組點數", "secondary") + '</div><label>日語訊息<input id="langMessage" value="これは何ですか？"></label>' + button("lang-chat", "送出 AI 對話") + '</section><section class="feature-output">' + kpis([["收藏單字", state.words.length, "上限可擴充"], ["J-Pts", state.points, "點數"], ["小組進度", state.group + "%", "週任務"]]) + '<h3>單字卡</h3><div class="feature-list">' + state.words.map((w) => item(w.jp + "（" + w.kana + "）", w.zh + " / " + w.level)).join("") + '</div><h3>AI 對話</h3><div class="feature-chat">' + state.chat.map((m) => '<div class="' + m.role + '">' + escapeHtml(m.text) + '</div>').join("") + '</div></section></div>';
  }

  function renderConsulting() {
    return '<div class="feature-grid"><section class="feature-form"><h3>問卷文字 AI 分析</h3><label>回饋內容<textarea id="consultText">老師講解清楚，但實作時間不足，希望增加案例與課後練習。</textarea></label><label>Prompt 模板<textarea id="consultPrompt">' + escapeHtml(state.template) + '</textarea></label><div class="feature-row">' + button("consult-analyze", "執行 TF-IDF + 語意分類") + button("consult-template", "儲存模板", "secondary") + button("consult-export", "輸出摘要", "ghost") + '</div></section><section class="feature-output">' + kpis([["分析專案", state.analyses.length, "已保存"], ["Prompt", "1", "可調整"], ["輸出", "Word/Excel", "可匯出"]]) + '<div class="feature-table">' + state.analyses.map((a) => '<div class="feature-table-row"><strong>' + escapeHtml(a.title) + '</strong><span class="feature-badge">' + escapeHtml(a.tag) + '</span><small>風險：' + escapeHtml(a.risk) + '</small></div>').join("") + '</div></section></div>';
  }

  function renderMood() {
    return '<div class="feature-grid"><section class="feature-form"><h3>情緒、待辦與成就</h3><label>今日情緒<select id="moodValue"><option>平穩</option><option>開心</option><option>焦慮</option><option>低落</option><option>疲憊</option></select></label><label>備註<input id="moodNote" value="今天想被理解"></label>' + button("mood-add", "新增心情") + '<label>待辦<input id="taskText" value="喝水與散步"></label>' + button("mood-task", "新增待辦", "secondary") + button("mood-album", "加入相簿回憶", "ghost") + '</section><section class="feature-output">' + kpis([["心情紀錄", state.moods.length, "筆"], ["待辦完成", state.tasks.filter(t=>t.done).length + "/" + state.tasks.length, "今日"], ["相簿", state.photos, "張"]]) + '<h3>心情歷程</h3><div class="feature-list">' + state.moods.map((m) => item(m.date + "：" + m.mood, m.note)).join("") + '</div><h3>待辦</h3><div class="feature-list">' + state.tasks.map((t,i) => '<article class="feature-item"><strong>' + (t.done ? "完成 " : "待辦 ") + escapeHtml(t.text) + '</strong><div class="feature-row" style="margin-top:8px"><button class="feature-button secondary" data-feature="mood-done" data-index="' + i + '">切換完成</button></div></article>').join("") + '</div></section></div>';
  }

  function renderImpact() {
    return '<div class="feature-grid"><section class="feature-form"><h3>補助企劃生成</h3><label>補助案<select id="impactGrant"><option>長照據點補助</option><option>偏鄉兒少陪伴</option><option>食物銀行設備</option><option>企業 CSR 合作</option></select></label><label>服務構想<textarea id="impactIdea">協助偏鄉長者每週共餐、健康關懷與交通接送。</textarea></label><div class="feature-row">' + button("impact-generate", "生成企劃草稿") + button("impact-donation", "新增捐款", "secondary") + button("impact-citation", "補上法規引用", "ghost") + '</div></section><section class="feature-output">' + kpis([["企劃草稿", state.proposals.length, "份"], ["捐款金額", "$" + state.donations, "已累計"], ["RAG 引用", state.citations, "條"]]) + '<div class="feature-list">' + state.proposals.map((p) => item(p.grant + " / " + p.title, "狀態：" + p.status + "，含目標、預算、KPI 與官方依據")).join("") + '</div></section></div>';
  }

  function renderCare() {
    return '<div class="feature-grid"><section class="feature-form"><h3>Wi-Fi CSI 事件判讀</h3><label>房間<select id="careRoom"><option>浴室</option><option>臥室</option><option>客廳</option></select></label><label>CSI 狀態<select id="careState"><option>正常走動</option><option>快速下墜</option><option>長時間靜止</option><option>夜間頻繁起身</option></select></label><div class="feature-row">' + button("care-detect", "AI 判讀風險") + button("care-notify", "發送照護通知", "secondary") + button("care-device", "新增 CSI 節點", "ghost") + '</div></section><section class="feature-output">' + kpis([["CSI 節點", state.devices, "ESP32"], ["模型準確", state.accuracy + "%", "可再訓練"], ["事件", state.events.length, "筆"]]) + '<div class="feature-list">' + state.events.map((e) => item(e.room + "：" + e.state, "風險：" + e.risk + "，通知：" + (e.notified ? "已發送" : "未發送"))).join("") + '</div></section></div>';
  }

  function renderAdmission() {
    return '<div class="feature-grid"><section class="feature-form"><h3>報名、審查與簽到</h3><label>申請者<input id="applicantName" value="新申請者"></label><label>評分<input id="applicantScore" type="number" value="76" min="0" max="100"></label><div class="feature-row">' + button("admission-add", "建立報名") + button("admission-code", "產生防偽碼", "secondary") + button("admission-export", "匯出榜單", "ghost") + '</div></section><section class="feature-output">' + kpis([["申請者", state.applicants.length, "人"], ["防偽碼", state.code, "現場簽到"], ["匯出", state.exported, "次"]]) + '<div class="feature-table">' + state.applicants.map((a,i) => '<div class="feature-table-row"><strong>' + escapeHtml(a.name) + '</strong><span>' + escapeHtml(a.stage) + '</span><small>分數 ' + a.score + ' / 付款 ' + (a.paid ? "是" : "否") + '</small><div class="feature-row"><button class="feature-button secondary" data-feature="admission-advance" data-index="' + i + '">推進</button><button class="feature-button ghost" data-feature="admission-check" data-index="' + i + '">簽到</button></div></div>').join("") + '</div></section></div>';
  }

  function renderFitness() {
    return '<div class="feature-grid"><section class="feature-form"><h3>AI 姿勢訓練</h3><label>運動<select id="fitExercise"><option>超慢跑</option><option>深蹲</option><option>伸展</option></select></label><label>分鐘<input id="fitMinutes" type="number" value="10" min="1" max="60"></label><label>疼痛回饋<select id="fitPain"><option>低</option><option>中</option><option>高</option></select></label><div class="feature-row">' + button("fit-start", "完成訓練紀錄") + button("fit-badge", "檢查徽章", "secondary") + button("fit-report", "產生統計", "ghost") + '</div></section><section class="feature-output">' + kpis([["訓練紀錄", state.sessions.length, "次"], ["點數", state.points, "可兌換"], ["徽章", state.badges.length, "枚"]]) + '<div class="feature-list">' + state.sessions.map((s) => item(s.exercise + " " + s.minutes + " 分鐘", "姿勢準確率 " + s.accuracy + "%，疼痛：" + s.pain)).join("") + state.badges.map((b) => item("徽章", b)).join("") + '</div></section></div>';
  }

  function renderStudy() {
    return '<div class="feature-grid"><section class="feature-form"><h3>時間軸、題庫與 AI 伴學</h3><label>時間<select id="studyTime"><option>08:00</option><option>12:30</option><option>16:00</option><option>20:00</option></select></label><label>任務<input id="studyTask" value="整理錯題筆記"></label><div class="feature-row">' + button("study-add", "加入時間軸") + button("study-quiz", "錯題分析", "secondary") + '</div><label>問 AI<input id="studyAsk" value="這題為什麼要先因式分解？"></label>' + button("study-ai", "AI 補充詳解") + button("study-share", "一鍵分享", "ghost") + '</section><section class="feature-output">' + kpis([["任務", state.tasks.length, "項"], ["筆記", state.notes.length, "則"], ["錯題單元", state.mistakes.length, "個"]]) + '<h3>時間軸</h3><div class="feature-list">' + state.tasks.map((t) => item(t.time + " " + t.text, t.type)).join("") + '</div><h3>AI 與錯題</h3><div class="feature-list">' + state.chat.map((c) => item(c, "伴學回應")).join("") + state.mistakes.map((m) => item(m.subject + "：" + m.topic, "錯題 " + m.count + " 題")).join("") + '</div></section></div>';
  }

  function renderGame() {
    return '<div class="feature-grid"><section class="feature-form"><h3>戰鬥系統操作台</h3><label>戰鬥姿態<select id="gameStyle"><option>穩健格擋</option><option>高風險連擊</option><option>翻滾迂迴</option></select></label><label>敵人難度<select id="gameDifficulty"><option>一般</option><option>精英</option><option>Boss</option></select></label><div class="feature-row">' + button("game-attack", "攻擊") + button("game-block", "格擋", "secondary") + button("game-roll", "翻滾", "ghost") + button("game-heal", "回血", "ghost") + button("game-save", "存檔", "secondary") + '</div></section><section class="feature-output">' + kpis([["玩家 HP", state.hp + "%", "HUD"], ["體力", state.stamina + "%", "動作消耗"], ["敵人", state.enemyState, state.enemy + "%"]]) + '<div class="feature-list">' + state.log.map((l) => item("戰鬥紀錄", l)).join("") + '</div></section></div>';
  }

  function render() {
    const map = { infra: renderInfra, language: renderLanguage, consulting: renderConsulting, mood: renderMood, impact: renderImpact, care: renderCare, admission: renderAdmission, fitness: renderFitness, study: renderStudy, game: renderGame };
    featureRoot.innerHTML = (map[project.layout] || renderInfra)();
  }

  function value(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
  }

  featureRoot.addEventListener("click", (event) => {
    const target = event.target.closest("[data-feature]");
    if (!target) return;
    const action = target.dataset.feature;
    const index = Number(target.dataset.index || 0);

    if (action === "infra-create") state.requests.unshift({ course: value("infraCourse"), template: value("infraTemplate"), count: Number(value("infraCount") || 1), status: "待審核" });
    if (action === "infra-approve" && state.requests[0]) state.requests[0].status = "已開通";
    if (action === "infra-ai") state.aiQueue.shift();
    if (action === "infra-diagnose") state.diagnostics.unshift("批次診斷完成：" + (state.requests[0]?.course || "課程") + " 有 2 台服務需重啟");
    if (action === "infra-network") state.network = state.network === "上課時間開放" ? "校外 FRP 開放" : "上課時間開放";

    if (action === "lang-recognize") {
      const sceneWords = { "車站": [["切符","きっぷ","車票"],["出口","でぐち","出口"]], "便利商店": [["弁当","べんとう","便當"],["支払い","しはらい","付款"]], "餐廳": [["注文","ちゅうもん","點餐"],["水","みず","水"]], "房間": [["机","つくえ","桌子"],["窓","まど","窗戶"]] };
      (sceneWords[value("langScene")] || sceneWords["車站"]).forEach(([jp,kana,zh]) => state.words.unshift({ jp, kana, zh, level: "N5" }));
      state.points += 8; state.group = Math.min(100, state.group + 6);
    }
    if (action === "lang-chat") { const msg = value("langMessage"); state.chat.push({ role: "me", text: msg }); state.chat.push({ role: "ai", text: "文法建議：句子自然。可以再補上「お願いします」讓語氣更完整。" }); }
    if (action === "lang-settle") { state.points += state.group >= 80 ? 60 : 20; state.badges.push("小組週任務結算"); }

    if (action === "consult-analyze") { const txt = value("consultText"); state.analyses.unshift({ title: "回饋分析 " + (state.analyses.length + 1), tag: txt.includes("清楚") ? "正向：講解清楚" : "建議：需再分類", risk: txt.includes("不足") ? "時間不足" : "低" }); }
    if (action === "consult-template") state.template = value("consultPrompt");
    if (action === "consult-export") state.analyses.unshift({ title: "已輸出摘要", tag: "Excel / Word", risk: "無" });

    if (action === "mood-add") state.moods.unshift({ mood: value("moodValue"), note: value("moodNote"), date: "剛剛" });
    if (action === "mood-task") state.tasks.unshift({ text: value("taskText"), done: false });
    if (action === "mood-done") state.tasks[index].done = !state.tasks[index].done;
    if (action === "mood-album") state.photos += 1;

    if (action === "impact-generate") state.proposals.unshift({ grant: value("impactGrant"), title: value("impactIdea").slice(0, 18) || "公益服務計畫", status: "AI 草稿完成" });
    if (action === "impact-donation") state.donations += 5000;
    if (action === "impact-citation") state.citations += 2;

    if (action === "care-detect") { const raw = value("careState"); const high = raw.includes("下墜") || raw.includes("靜止"); state.events.unshift({ room: value("careRoom"), state: raw, risk: high ? "高" : "中", notified: false }); state.accuracy = Math.min(94, state.accuracy + 2); }
    if (action === "care-notify" && state.events[0]) state.events[0].notified = true;
    if (action === "care-device") state.devices += 1;

    if (action === "admission-add") state.applicants.unshift({ name: value("applicantName"), stage: "已報名", paid: false, score: Number(value("applicantScore") || 0), checked: false });
    if (action === "admission-advance") { const stages = ["已報名","審查中","錄取","備取"]; const a = state.applicants[index]; a.stage = stages[Math.min(stages.length - 1, stages.indexOf(a.stage) + 1)]; a.paid = true; }
    if (action === "admission-check") state.applicants[index].checked = true;
    if (action === "admission-code") state.code = "UP-" + Math.floor(1000 + Math.random() * 9000);
    if (action === "admission-export") state.exported += 1;

    if (action === "fit-start") { const pain = value("fitPain"); state.sessions.unshift({ exercise: value("fitExercise"), minutes: Number(value("fitMinutes") || 1), accuracy: pain === "高" ? 72 : 88 + Math.floor(Math.random() * 8), pain }); state.points += 20; }
    if (action === "fit-badge") state.badges.push(state.sessions.length >= 3 ? "穩定訓練者" : "新手暖身");
    if (action === "fit-report") state.reports.push("本週平均準確率已更新");

    if (action === "study-add") state.tasks.unshift({ time: value("studyTime"), text: value("studyTask"), type: "具時限" });
    if (action === "study-quiz") state.mistakes.unshift({ subject: "英文", topic: "關係代名詞", count: 2 });
    if (action === "study-ai") state.chat.unshift("AI：" + value("studyAsk") + " 可先拆成已知條件、目標與關鍵公式三步。");
    if (action === "study-share") state.notes.unshift("已分享筆記、題庫與今日歷程到共學群");

    if (action === "game-attack" && state.stamina >= 12) { const bonus = value("gameStyle") === "高風險連擊" ? 8 : 0; state.enemy = Math.max(0, state.enemy - 14 - bonus); state.stamina -= value("gameDifficulty") === "Boss" ? 18 : 12; state.enemyState = state.enemy < 35 ? "硬直" : "反擊"; state.log.unshift("[" + value("gameDifficulty") + "/" + value("gameStyle") + "] 玩家攻擊命中，敵人 HP -" + (14 + bonus)); }
    if (action === "game-block") { state.stamina = Math.max(0, state.stamina - 8); state.hp = Math.min(100, state.hp + 2); state.log.unshift("格擋成功，開啟盾反窗口"); }
    if (action === "game-roll") { state.stamina = Math.max(0, state.stamina - 18); state.enemyState = "失去目標"; state.log.unshift("翻滾迴避，AI 重新搜尋玩家"); }
    if (action === "game-heal") { state.hp = Math.min(100, state.hp + 15); state.log.unshift("使用補血道具，狀態已更新至 HUD"); }
    if (action === "game-save") { state.saved = true; state.log.unshift("SaveGame 已序列化玩家位置、HP、體力與敵人狀態"); }

    saveState();
    render();
  });

  render();
})();
// functional-enhancement-end
