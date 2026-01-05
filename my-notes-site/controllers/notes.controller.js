// 控制器層：接收 req/res，負責狀態碼、回應格式、參數整理

const notesService = require("../services/notes.service");

// 取得全部
function getAll(req, res) {
  const notes = notesService.getAllNotes();
  return res.status(200).json(notes); // 200 OK
}

// 新增
function create(req, res) {
  try {
    const { title, content } = req.body;

    const result = notesService.createNote({ title, content });

    // service 會回傳 { ok, status, data/message }
    if (!result.ok) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(201).json(result.data); // 201 Created
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" }); // 500
  }
}

module.exports = {
  getAll,
  create
};
