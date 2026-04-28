const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.put("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    await db.query(
      `INSERT INTO notes (user_id, content)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content)`,
      [userId, content || ""]
    );

    res.json({ message: "Заметки сохранены" });
  } catch (error) {
    console.error("NOTES SAVE ERROR:", error);
    res.status(500).json({
      message: "Ошибка сохранения заметок",
      error: error.message,
    });
  }
});

module.exports = router;