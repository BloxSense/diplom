const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await db.query(
      `SELECT id, username, email, avatar, dota_id
       FROM users
       WHERE id = ?`,
      [userId]
    );

    const [statsRows] = await db.query(
      `SELECT current_mmr, goal_mmr, session_mmr, winrate
       FROM user_stats
       WHERE user_id = ?`,
      [userId]
    );

    const [matchRows] = await db.query(
      `SELECT *
       FROM matches
       WHERE user_id = ?
       ORDER BY played_at DESC
       LIMIT 20`,
      [userId]
    );

    const [notesRows] = await db.query(
      `SELECT content
       FROM notes
       WHERE user_id = ?`,
      [userId]
    );

    const user = users[0];
    const stats = statsRows[0];

    const matches = matchRows.map((match) => ({
      id: match.id,
      hero: match.hero_image,
      heroName: match.hero_name,
      result: match.result === "win" ? "В" : "П",
      kda: `${match.kills}/${match.deaths}/${match.assists}`,
      gpm: match.gpm,
      xpm: match.xpm,
      damage: match.damage,
      date: formatDate(match.played_at),
    }));

const winsCount = matchRows.filter((match) => match.result === "win").length;
const losesCount = matchRows.filter((match) => match.result === "lose").length;
const totalGames = matchRows.length;

const sessionMmr = winsCount * 25 - losesCount * 25;
const winRate = totalGames > 0 ? Math.round((winsCount / totalGames) * 100) : 0;

    res.json({
      user,
      stats: {
        mmr: stats.current_mmr,
        goal: stats.goal_mmr,
        session: sessionMmr,
        winRate: `${winRate}%`,
        remaining: stats.goal_mmr - stats.current_mmr,
      },
      matches,
      notes: notesRows[0]?.content
        ? notesRows[0].content.split("\n")
        : [],
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({
      message: "Ошибка загрузки dashboard",
      error: error.message,
    });
  }
});

module.exports = router;