// 路由層：只負責「路徑」對應到 controller，不放商業邏輯

const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes.controller");

// GET /api/notes -> 取得全部 notes
router.get("/", notesController.getAll);

// POST /api/notes -> 新增 note
router.post("/", notesController.create);

module.exports = router;
