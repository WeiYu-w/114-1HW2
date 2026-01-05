// 資料存取層：只負責「讀寫資料」
// 這裡用 JSON 檔案當資料庫（demo 用）

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_PATH = path.join(DATA_DIR, "notes.json");

// 確保資料夾 & 檔案存在
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, "[]", "utf8");

// 讀取全部
function readAll() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

// 寫入全部（覆蓋）
function writeAll(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}

// 插入一筆
function insert(note) {
  const all = readAll();
  all.push(note);
  writeAll(all);
}

module.exports = {
  readAll,
  insert
};
