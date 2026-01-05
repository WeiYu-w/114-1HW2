// 伺服器入口：負責基本設定、掛載路由、啟動 server

const express = require("express");
const path = require("path");

const notesRoutes = require("./routes/notes.routes");

const app = express();
const PORT = 3000;

// 1) View Engine（前端頁面用 EJS）
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 2) Middleware：解析 JSON / 表單
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3) 靜態資源（public 放 CSS / JS）
app.use(express.static(path.join(__dirname, "public")));

// 4) 首頁：回傳前端頁面（View）
app.get("/", (req, res) => {
  res.render("index");
});

// 5) API 路由（分層：Route -> Controller -> Service -> Model）
app.use("/api/notes", notesRoutes);

// 6) 404（找不到路由）
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// 7) 啟動
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
