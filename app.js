const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  view: "dashboard",
  selectedResource: "vm-2401",
  resourceFilter: "all",
  nodes: [
    { id: "pve-01", name: "PVE-01 教學節點", role: "VM/LXC", cpu: 62, ram: 71, storage: 58, gpu: 0, status: "healthy" },
    { id: "pve-02", name: "PVE-02 GPU 節點", role: "AI/vLLM", cpu: 78, ram: 84, storage: 66, gpu: 71, status: "watch" },
    { id: "pve-03", name: "PVE-03 備援節點", role: "批次與快照", cpu: 43, ram: 49, storage: 52, gpu: 0, status: "healthy" }
  ],
  courses: [
    { name: "資安攻防實作", teacher: "林老師", members: 42, resources: 42, window: "週二 13:00-16:00", status: "已排程" },
    { name: "Linux 系統管理", teacher: "王老師", members: 36, resources: 36, window: "週三 09:00-12:00", status: "執行中" },
    { name: "AI 模型微服務", teacher: "陳老師", members: 24, resources: 8, window: "週四 14:00-17:00", status: "審核中" }
  ],
  resources: [
    { id: "vm-2401", type: "VM", name: "sec-lab-kali-01", course: "資安攻防實作", node: "pve-01", cpu: 4, ram: 8, disk: 80, ip: "10.51.24.11", status: "running", gpu: false, owner: "第 1 組", uptime: "2h 14m" },
    { id: "vm-2402", type: "VM", name: "sec-lab-target-01", course: "資安攻防實作", node: "pve-01", cpu: 2, ram: 4, disk: 40, ip: "10.51.24.21", status: "running", gpu: false, owner: "第 1 組", uptime: "2h 12m" },
    { id: "lxc-3301", type: "LXC", name: "linux-api-12", course: "Linux 系統管理", node: "pve-03", cpu: 2, ram: 3, disk: 24, ip: "10.51.33.12", status: "paused", gpu: false, owner: "王同學", uptime: "0m" },
    { id: "vm-5201", type: "VM", name: "vllm-lab-a100-share", course: "AI 模型微服務", node: "pve-02", cpu: 8, ram: 32, disk: 160, ip: "10.51.52.7", status: "running", gpu: true, owner: "AI 課程池", uptime: "6h 41m" },
    { id: "lxc-4106", type: "LXC", name: "web-fullstack-06", course: "Web 全端專題", node: "pve-03", cpu: 2, ram: 4, disk: 32, ip: "10.51.41.6", status: "running", gpu: false, owner: "第 6 組", uptime: "1h 05m" }
  ],
  jobs: [
    { id: "JOB-8021", title: "資安攻防實作批次部署", type: "deploy", progress: 78, status: "running", owner: "林老師", at: "11:20" },
    { id: "JOB-8018", title: "Linux 課程快照回復", type: "snapshot", progress: 100, status: "done", owner: "王老師", at: "10:45" },
    { id: "JOB-8017", title: "AI GPU 節點遷移預檢", type: "migrate", progress: 36, status: "running", owner: "系統", at: "10:18" }
  ],
  apiKeys: [
    { name: "ai-course-shared", owner: "AI 模型微服務", limit: "60 rpm", used: 72, status: "正常" },
    { name: "teacher-rubric", owner: "教師評分表", limit: "20 rpm", used: 31, status: "正常" },
    { name: "student-sandbox", owner: "學生實驗", limit: "8 rpm", used: 88, status: "接近上限" }
  ],
  networkRules: [
    { domain: "kali-demo.skylab.example.edu", target: "sec-lab-kali-01", service: "HTTPS 443", status: "已發布" },
    { domain: "ai-api.skylab.example.edu", target: "vllm-lab-a100-share", service: "HTTPS 443", status: "已發布" },
    { domain: "linux-shell.skylab.example.edu", target: "linux-api-12", service: "SSH 22", status: "限制來源" }
  ],
  audits: [
    { actor: "林老師", action: "核准批次部署", target: "資安攻防實作", level: "info", at: "11:20:14" },
    { actor: "系統", action: "套用 Placement 建議", target: "pve-01 / pve-03", level: "info", at: "11:20:18" },
    { actor: "陳老師", action: "申請 AI API 額度", target: "ai-course-shared", level: "warn", at: "10:58:41" },
    { actor: "Gateway", action: "同步 DNS 與反向代理", target: "ai-api.skylab.example.edu", level: "info", at: "10:42:02" }
  ]
};

const viewTitles = {
  dashboard: "營運總覽",
  deploy: "課程部署",
  resources: "資源池",
  advisor: "AI 顧問",
  network: "網路閘道",
  audit: "工作稽核"
};

const templates = [
  { name: "Ubuntu Lab VM", spec: "2 vCPU / 4GB / 40GB", fit: "Linux、Web、資料庫課程", risk: "低" },
  { name: "Kali Security VM", spec: "4 vCPU / 8GB / 80GB", fit: "資安攻防、封閉網段演練", risk: "中" },
  { name: "LXC Python API", spec: "2 vCPU / 3GB / 24GB", fit: "API、資料處理、微服務", risk: "低" },
  { name: "vLLM GPU Endpoint", spec: "8 vCPU / 32GB / GPU share", fit: "AI 推論、OpenAI-compatible API", risk: "高" }
];

function pct(value) {
  return `${Math.max(0, Math.min(100, Math.round(value)))}%`;
}

function pill(text, type = "info") {
  return `<span class="pill ${type}">${text}</span>`;
}

function statusType(status) {
  if (["running", "healthy", "正常", "執行中", "已發布", "done"].includes(status)) return "good";
  if (["watch", "接近上限", "審核中", "限制來源"].includes(status)) return "warn";
  if (["paused", "stopped"].includes(status)) return "info";
  return "bad";
}

function toast(message) {
  const box = qs("#toast");
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => box.classList.remove("show"), 2600);
}

function addAudit(actor, action, target, level = "info") {
  state.audits.unshift({
    actor,
    action,
    target,
    level,
    at: new Date().toLocaleTimeString("zh-TW", { hour12: false })
  });
  state.audits = state.audits.slice(0, 18);
}

function renderStatus() {
  const avgCpu = Math.round(state.nodes.reduce((sum, node) => sum + node.cpu, 0) / state.nodes.length);
  const pending = state.courses.filter((course) => course.status === "審核中").length;
  qs("#statusLine").innerHTML = [
    pill("叢集正常", "good"),
    pill(`CPU ${avgCpu}%`, avgCpu > 75 ? "warn" : "info"),
    pill(`待審 ${pending}`, pending ? "warn" : "good"),
    pill("AI Gateway 開放", "ai")
  ].join("");
}

function renderMetrics() {
  const running = state.resources.filter((item) => item.status === "running").length;
  const gpuUsed = state.nodes.find((node) => node.gpu)?.gpu || 0;
  const activeJobs = state.jobs.filter((job) => job.status === "running").length;
  const apiUsed = Math.round(state.apiKeys.reduce((sum, key) => sum + key.used, 0) / state.apiKeys.length);
  qs("#metricGrid").innerHTML = [
    ["運作中資源", running, "VM/LXC 正在提供課程環境"],
    ["GPU 使用率", `${gpuUsed}%`, "vLLM 與模型課程共用池"],
    ["背景工作", activeJobs, "部署、遷移、快照佇列"],
    ["AI API 平均用量", `${apiUsed}%`, "依課程與個人額度控管"]
  ].map(([label, value, note]) => `
    <article class="metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <p class="meta">${note}</p>
    </article>
  `).join("");
}

function renderNodes() {
  qs("#nodeList").innerHTML = state.nodes.map((node) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${node.name}<small>${node.role}</small></div>
        ${pill(node.status === "healthy" ? "健康" : "觀察", statusType(node.status))}
      </div>
      <div class="bar-set">
        ${barLine("CPU", node.cpu, node.cpu > 75 ? "var(--amber)" : "var(--blue)")}
        ${barLine("RAM", node.ram, node.ram > 80 ? "var(--amber)" : "var(--green)")}
        ${barLine("Storage", node.storage, "var(--violet)")}
        ${node.gpu ? barLine("GPU", node.gpu, node.gpu > 75 ? "var(--amber)" : "var(--red)") : ""}
      </div>
    </article>
  `).join("");
}

function barLine(label, value, color) {
  return `
    <div class="bar-line">
      <span>${label}</span>
      <div class="bar" style="--bar:${color};--value:${pct(value)}"><span></span></div>
      <strong>${pct(value)}</strong>
    </div>
  `;
}

function renderCourses() {
  qs("#courseList").innerHTML = state.courses.map((course) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${course.name}<small>${course.teacher} · ${course.window}</small></div>
        ${pill(course.status, statusType(course.status))}
      </div>
      <div class="bar-line">
        <span>部署率</span>
        <div class="bar" style="--bar:var(--green);--value:${pct((course.resources / course.members) * 100)}"><span></span></div>
        <strong>${course.resources}/${course.members}</strong>
      </div>
    </article>
  `).join("");
}

function renderJobs(target = "#jobPreview", limit = 3) {
  qs(target).innerHTML = state.jobs.slice(0, limit).map((job) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${job.title}<small>${job.id} · ${job.owner} · ${job.at}</small></div>
        ${pill(job.status === "done" ? "完成" : "執行中", statusType(job.status))}
      </div>
      <div class="bar" style="--bar:${job.status === "done" ? "var(--green)" : "var(--blue)"};--value:${pct(job.progress)}"><span></span></div>
    </article>
  `).join("");
}

function renderRisks() {
  const risks = [
    { title: "GPU 節點接近尖峰", text: "AI 模型微服務課程與學生沙盒共用同一 GPU 池，建議下週課前預留 20% 緩衝。", type: "warn" },
    { title: "資安課程對外入口需限縮", text: "Kali 與靶機服務應套用課程網段 ACL，外部入口僅保留教師核准的 HTTPS。", type: "bad" },
    { title: "快照保留策略正常", text: "近期 24 小時快照完整，批次回復工作平均 4 分 20 秒完成。", type: "good" }
  ];
  qs("#riskList").innerHTML = risks.map((risk) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${risk.title}<small>${risk.text}</small></div>
        ${pill(risk.type === "good" ? "穩定" : risk.type === "warn" ? "注意" : "需處理", risk.type)}
      </div>
    </article>
  `).join("");
}

function placementAdvice(formData) {
  const count = Number(formData?.get("count") || 36);
  const gpu = formData?.get("gpu") || "none";
  const template = formData?.get("template") || "Ubuntu Lab VM";
  const node = gpu === "dedicated" || template.includes("vLLM") ? "PVE-02 GPU 節點" : count > 40 ? "PVE-01 + PVE-03 混合部署" : "PVE-03 備援節點";
  const risk = gpu === "dedicated" ? "高" : count > 50 ? "中" : "低";
  const steps = [
    `建議放置：${node}`,
    `部署批次：${Math.ceil(count / 12)} 批，每批保留 90 秒健康檢查`,
    `網路策略：課程 VLAN 隔離，僅 Gateway 代管對外入口`,
    `回滾策略：課前建立 golden snapshot，課後保留 7 天`
  ];
  if (gpu !== "none") steps.push("GPU 策略：啟用共享配額與模型佇列，避免學生沙盒佔滿推論服務。");
  return { risk, steps };
}

function renderPlacement() {
  const data = new FormData(qs("#deployForm"));
  const advice = placementAdvice(data);
  qs("#placementPanel").innerHTML = `
    <strong>${pill(`風險 ${advice.risk}`, advice.risk === "高" ? "bad" : advice.risk === "中" ? "warn" : "good")}</strong>
    <ul>${advice.steps.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
  qs("#templateList").innerHTML = templates.map((template) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${template.name}<small>${template.spec} · ${template.fit}</small></div>
        ${pill(`風險 ${template.risk}`, template.risk === "高" ? "bad" : template.risk === "中" ? "warn" : "good")}
      </div>
    </article>
  `).join("");
}

function submitDeploy(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const courseName = data.get("course");
  const template = data.get("template");
  const count = Number(data.get("count"));
  const advice = placementAdvice(data);
  const job = {
    id: `JOB-${Math.floor(9000 + Math.random() * 800)}`,
    title: `${courseName} · ${template} 批次部署`,
    type: "deploy",
    progress: 12,
    status: "running",
    owner: "全權限展示",
    at: new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })
  };
  state.jobs.unshift(job);
  const existing = state.courses.find((course) => course.name === courseName);
  if (existing) {
    existing.status = "執行中";
    existing.members = count;
    existing.resources = Math.min(existing.resources + Math.ceil(count / 3), count);
  }
  addAudit("全權限展示", "建立課程部署工作", `${courseName} / ${advice.steps[0]}`);
  renderAll();
  toast("課程部署工作已建立，Placement Advisor 已套用建議。");
}

function renderResources() {
  const list = state.resources.filter((resource) => {
    if (state.resourceFilter === "all") return true;
    if (state.resourceFilter === "gpu") return resource.gpu;
    if (state.resourceFilter === "lxc") return resource.type === "LXC";
    return resource.status === state.resourceFilter;
  });
  qs("#resourceList").innerHTML = list.map((resource) => `
    <article class="row resource-item ${resource.id === state.selectedResource ? "active" : ""}" data-resource="${resource.id}">
      <div class="row-head">
        <div class="row-title">${resource.name}<small>${resource.id} · ${resource.course} · ${resource.ip}</small></div>
        ${pill(resource.status === "running" ? "執行中" : "暫停", statusType(resource.status))}
      </div>
      <div class="meta">${resource.type} · ${resource.cpu} vCPU · ${resource.ram}GB RAM · ${resource.disk}GB Disk · ${resource.node}</div>
    </article>
  `).join("");
  qsa("[data-resource]").forEach((item) => {
    item.addEventListener("click", () => {
      state.selectedResource = item.dataset.resource;
      renderResources();
      renderResourceDetail();
    });
  });
  renderResourceDetail();
}

function renderResourceDetail() {
  const resource = state.resources.find((item) => item.id === state.selectedResource) || state.resources[0];
  if (!resource) return;
  qs("#resourceDetail").innerHTML = `
    <h3>${resource.name}</h3>
    <div class="detail-kv">
      <div><span>狀態</span><strong>${resource.status === "running" ? "執行中" : "暫停"}</strong></div>
      <div><span>課程</span><strong>${resource.course}</strong></div>
      <div><span>節點</span><strong>${resource.node}</strong></div>
      <div><span>IP</span><strong>${resource.ip}</strong></div>
      <div><span>規格</span><strong>${resource.cpu} vCPU / ${resource.ram}GB</strong></div>
      <div><span>擁有者</span><strong>${resource.owner}</strong></div>
    </div>
    <div class="row-actions">
      <button data-control="start">啟動</button>
      <button data-control="stop">停止</button>
      <button data-control="reboot">重啟</button>
      <button data-control="snapshot">建立快照</button>
      <button data-control="migrate">遷移預檢</button>
    </div>
  `;
  qs("#consolePanel").textContent = [
    `skylab@${resource.name}:~$ systemctl status skylab-agent`,
    `resource=${resource.id} node=${resource.node} ip=${resource.ip}`,
    `course="${resource.course}" owner="${resource.owner}"`,
    resource.status === "running" ? "agent: active, websocket console: ready" : "agent: paused, console waiting for start",
    "audit: every lifecycle action is recorded in the job center"
  ].join("\n");
  qsa("[data-control]").forEach((button) => {
    button.addEventListener("click", () => controlResource(resource.id, button.dataset.control));
  });
}

function controlResource(id, action) {
  const resource = state.resources.find((item) => item.id === id);
  if (!resource) return;
  const labels = { start: "啟動", stop: "停止", reboot: "重啟", snapshot: "建立快照", migrate: "遷移預檢" };
  if (action === "start") resource.status = "running";
  if (action === "stop") resource.status = "paused";
  if (action === "reboot") resource.status = "running";
  const job = {
    id: `JOB-${Math.floor(9100 + Math.random() * 700)}`,
    title: `${labels[action]} · ${resource.name}`,
    type: action,
    progress: action === "snapshot" ? 52 : action === "migrate" ? 28 : 100,
    status: action === "snapshot" || action === "migrate" ? "running" : "done",
    owner: "全權限展示",
    at: new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })
  };
  state.jobs.unshift(job);
  addAudit("全權限展示", labels[action], resource.name, action === "migrate" ? "warn" : "info");
  renderAll();
  toast(`${resource.name} 已送出「${labels[action]}」工作。`);
}

function advisorResponse(kind, silent = false) {
  const prompt = qs("#advisorPrompt").value.trim();
  const responses = {
    placement: [
      "建議先將靶機與 Kali VM 拆成兩個批次，Kali 放在 PVE-01，靶機分散到 PVE-03。",
      "40 台以上部署應啟用三階段 provisioning：建立、健康檢查、課程標籤回寫。",
      "需要對外服務的 6 組應使用 Gateway 發布，不直接暴露 VM IP。"
    ],
    capacity: [
      "PVE-02 GPU 使用率已偏高，AI 模型課程不建議和資安課程同時做大批量快照。",
      "Storage 平均仍低於 70%，但快照保留策略需要限制為 7 天。",
      "若下一週同時開兩門 40 人課程，建議預先關閉閒置 VM 並搬移 LXC 到 PVE-03。"
    ],
    api: [
      "AI API 建議使用課程級 key 與學生級 rate limit 雙層控管。",
      "OpenAI-compatible Gateway 應記錄 model、tokens、latency、status 與課程來源。",
      "對教師 Rubric 分析可給較高 rpm，學生沙盒維持低速率以保護 vLLM。"
    ],
    audit: [
      "最近的高風險事件集中在 DNS 發布與 GPU 額度申請。",
      "建議把遷移、快照回復、API key 輪替列為必查事件。",
      "匯出 CSV 時保留 actor、action、target、timestamp 與來源 IP 欄位。"
    ]
  };
  qs("#advisorResult").innerHTML = `
    <h3>${kind === "placement" ? "部署建議" : kind === "capacity" ? "容量風險" : kind === "api" ? "AI API 設計" : "稽核摘要"}</h3>
    <p class="meta">分析輸入：${prompt || "使用目前營運狀態"}</p>
    <ul>${responses[kind].map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
  if (!silent) {
    addAudit("AI 顧問", "產生營運建議", kind);
    renderAudit();
    toast("AI 顧問已產生建議。");
  }
}

function renderApi() {
  qs("#apiUsage").innerHTML = state.apiKeys.map((key) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${key.name}<small>${key.owner} · ${key.limit}</small></div>
        ${pill(key.status, statusType(key.status))}
      </div>
      <div class="bar" style="--bar:${key.used > 80 ? "var(--amber)" : "var(--violet)"};--value:${pct(key.used)}"><span></span></div>
    </article>
  `).join("");
  qs("#apiKeys").innerHTML = `
    <article class="row">
      <div class="row-head">
        <div class="row-title">Key 輪替策略<small>ccai_xxx prefix · 30 天有效 · 可撤銷</small></div>
        ${pill("建議啟用", "ai")}
      </div>
    </article>
    <article class="row">
      <div class="row-head">
        <div class="row-title">vLLM 模型池<small>qwen2.5-7b-instruct · llama3.1-8b · teacher-rubric</small></div>
        ${pill("3 models", "info")}
      </div>
    </article>
  `;
  qs("#rubricPanel").innerHTML = [
    ["Rubric 解析", "將教師上傳的評分表整理成項目、權重、等第描述。"],
    ["作業助理", "依課程模板產生環境檢查清單與學生回饋摘要。"],
    ["審核紀錄", "保留提示詞版本、模型、輸出摘要與教師確認狀態。"]
  ].map(([title, text]) => `
    <article class="row">
      <div class="row-title">${title}<small>${text}</small></div>
    </article>
  `).join("");
}

function renderNetwork() {
  qs("#networkTarget").innerHTML = state.resources.map((resource) => `<option value="${resource.name}">${resource.name}</option>`).join("");
  qs("#networkRules").innerHTML = state.networkRules.map((rule) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${rule.domain}<small>${rule.target} · ${rule.service}</small></div>
        ${pill(rule.status, statusType(rule.status))}
      </div>
    </article>
  `).join("");
  renderTopology();
}

function renderTopology() {
  const nodes = [
    { label: "校園網路", sub: "教室 / VPN / 教師端", x: 12, y: 14 },
    { label: "Gateway", sub: "Traefik / HAProxy / frp", x: 42, y: 38 },
    { label: "PVE Cluster", sub: "VM/LXC 資源池", x: 68, y: 16 },
    { label: "vLLM API", sub: "OpenAI-compatible", x: 68, y: 66 },
    { label: "Audit DB", sub: "PostgreSQL / Redis", x: 18, y: 70 }
  ];
  const edges = [[0,1], [1,2], [1,3], [1,4], [2,3]];
  const edgeHtml = edges.map(([a, b]) => {
    const from = nodes[a];
    const to = nodes[b];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return `<span class="edge" style="left:${from.x}%;top:${from.y}%;width:${length}%;transform:rotate(${angle}deg)"></span>`;
  }).join("");
  qs("#topology").innerHTML = `
    ${edgeHtml}
    ${nodes.map((node) => `
      <article class="topology-node" style="left:${node.x - 8}%;top:${node.y - 5}%">
        <strong>${node.label}</strong>
        <span>${node.sub}</span>
      </article>
    `).join("")}
  `;
}

function submitNetwork(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const rule = {
    domain: data.get("domain"),
    target: data.get("target"),
    service: data.get("service"),
    status: "已發布"
  };
  state.networkRules.unshift(rule);
  addAudit("Gateway", "新增對外發布規則", `${rule.domain} -> ${rule.target}`, "warn");
  renderNetwork();
  renderAudit();
  toast("Gateway 規則已新增並同步。");
}

function renderAudit() {
  qs("#auditList").innerHTML = state.audits.map((item) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${item.action}<small>${item.actor} · ${item.target} · ${item.at}</small></div>
        ${pill(item.level === "warn" ? "注意" : "紀錄", item.level === "warn" ? "warn" : "info")}
      </div>
    </article>
  `).join("");
  qs("#jobTable").innerHTML = state.jobs.map((job) => `
    <article class="row">
      <div class="row-head">
        <div class="row-title">${job.id}<small>${job.title} · ${job.owner}</small></div>
        ${pill(job.status === "done" ? "完成" : "執行中", statusType(job.status))}
      </div>
      <div class="bar" style="--bar:${job.status === "done" ? "var(--green)" : "var(--blue)"};--value:${pct(job.progress)}"><span></span></div>
    </article>
  `).join("");
}

function exportAudit() {
  const header = "actor,action,target,level,time";
  const rows = state.audits.map((item) => [item.actor, item.action, item.target, item.level, item.at]
    .map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","));
  const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "skylab-audit-demo.csv";
  a.click();
  URL.revokeObjectURL(url);
  toast("稽核 CSV 已產生。");
}

function switchView(view) {
  state.view = view;
  qsa(".nav button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  qsa(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `${view}View`));
  qs("#viewTitle").textContent = viewTitles[view];
}

function renderAll() {
  renderStatus();
  renderMetrics();
  renderNodes();
  renderCourses();
  renderJobs("#jobPreview", 3);
  renderJobs("#deployJobs", 6);
  renderRisks();
  renderPlacement();
  renderResources();
  renderApi();
  renderNetwork();
  renderAudit();
}

qsa(".nav button").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

qs("#deployForm").addEventListener("input", renderPlacement);
qs("#deployForm").addEventListener("submit", submitDeploy);
qs("#networkForm").addEventListener("submit", submitNetwork);
qs("#exportAuditBtn").addEventListener("click", exportAudit);

qsa("[data-advisor]").forEach((button) => {
  button.addEventListener("click", () => advisorResponse(button.dataset.advisor));
});

qsa("#resourceFilters button").forEach((button) => {
  button.addEventListener("click", () => {
    state.resourceFilter = button.dataset.filter;
    qsa("#resourceFilters button").forEach((item) => item.classList.toggle("active", item === button));
    renderResources();
  });
});

renderAll();
advisorResponse("placement", true);
