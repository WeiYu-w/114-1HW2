// 商業邏輯層：放規則（驗證、去重、流程）
// controller 不要寫規則，model 不要寫規則

const notesModel = require("../models/notes.model");

// 取得全部
function getAllNotes() {
  return notesModel.readAll();
}

// 新增 note（含驗證 + 去重）
function createNote({ title, content }) {
  // 1) 基本驗證
  if (!title || !content) {
    return { ok: false, status: 400, message: "title 和 content 都必填" }; // 400 Bad Request
  }

  // 2) 去重規則：title 不能重複（示範 409 Conflict）
  const all = notesModel.readAll();
  const exists = all.some((n) => n.title.trim() === title.trim());
  if (exists) {
    return { ok: false, status: 409, message: "title 已存在（重複）" }; // 409 Conflict
  }

  // 3) 建立資料
  const newNote = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString()
  };

  notesModel.insert(newNote);

  return { ok: true, status: 201, data: newNote };
}

module.exports = {
  getAllNotes,
  createNote
};
