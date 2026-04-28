const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.put("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { current_mmr, goal_mmr } = req.body;

    if (current_mmr === undefined || goal_mmr === undefined) {
      return res.status(400).json({ message: "MMR и цель обязательны" });
    }

    await db.query(
      `UPDATE user_stats
       SET current_mmr = ?, goal_mmr = ?
       WHERE user_id = ?`,
      [current_mmr, goal_mmr, userId]
    );

    res.json({
      message: "Статистика сохранена",
      stats: {
        current_mmr,
        goal_mmr,
        remaining: goal_mmr - current_mmr,
      },
    });
  } catch (error) {
    console.error("UPDATE STATS ERROR:", error);
    res.status(500).json({
      message: "Ошибка сохранения статистики",
      error: error.message,
    });
  }
});

module.exports = router;