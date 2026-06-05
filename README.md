# SkyLab 校園雲端實驗室營運平台

GitHub repository name: `115501`

115501 組「SkyLab 校園的高效雲端教學與實作基地」的專業化靜態展示版。

此版本根據學生 PDF 文件延伸設計，將原始的 Proxmox VE、VM/LXC、課程批次部署、AI 模板推薦、AI API、Gateway 與稽核概念，整理成可直接部署於 GitHub Pages 的中文展示系統。

## 展示原則

- 免登入，所有功能以全權限展示身分開放。
- 純前端靜態檔案，沒有後端、資料庫或真實 Proxmox 連線。
- 使用模擬資料展示正式系統該有的操作流程與營運視角。
- 公開版不放學生個資、帳密、內部網址或真實服務資訊。

## 檔案

- `index.html`
- `styles.css`
- `app.js`
- `.nojekyll`

## GitHub Pages

建立 repo 後推送到 `main` branch，於 Settings > Pages 設定：

- Source: Deploy from a branch
- Branch: main
- Folder: / (root)
