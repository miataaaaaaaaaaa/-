// 文件名: server.js (个人版公开访问方案)

const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// --- ⚠️ 关键改动在这里 ---
// 把下面这行引号里的令牌，换成你在第一步中获取的个人访问令牌 (PAT)
const PERSONAL_ACCESS_TOKEN = 'pat_IzCXE4VcwtM9rOE59bfrM6gEblzf23xFbmwWPGO1T8X7M8dIeCda45gYe9BR1hOu'; // 你的PAT，绝对不能泄露！
// -----------------------------------------

// 1. 提供主页 (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. 提供一个API接口，让前端来获取你的PAT
// 这个接口是整个方案的核心
app.get('/api/get-pat', (req, res) => {
    if (PERSONAL_ACCESS_TOKEN) {
        res.json({ token: PERSONAL_ACCESS_TOKEN });
    } else {
        res.status(500).json({ error: 'Server PAT not configured.' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`网站已启动！`);
    console.log(`- 本地访问: http://localhost:${port}`);
    console.log(`- 如果你正在使用ngrok，请通过你的公共网址访问。`);
});