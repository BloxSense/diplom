const express = require("express");
const axios = require("axios");
const db = require("../db");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/sync-matches", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await db.query(
      "SELECT dota_id FROM users WHERE id = ?",
      [userId]
    );

    const dotaId = users[0]?.dota_id;

    if (!dotaId) {
      return res.status(400).json({
        message: "У пользователя не указан dota_id",
      });
    }

    const matchesResponse = await axios.get(
      `https://api.opendota.com/api/players/${dotaId}/recentMatches`
    );

    const heroesResponse = await axios.get("https://api.opendota.com/api/heroes");

    const heroesMap = new Map(
      heroesResponse.data.map((hero) => [hero.id, hero])
    );

    const matches = matchesResponse.data.slice(0, 20);

    for (const match of matches) {
      const hero = heroesMap.get(match.hero_id);

      const heroName = hero?.localized_name || `Hero ${match.hero_id}`;
      const heroImageName = hero?.name?.replace("npc_dota_hero_", "");
      const heroImage = heroImageName
        ? `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroImageName}.png`
        : "";

      const playerSlot = match.player_slot;
      const isRadiant = playerSlot < 128;
      const isWin =
        (isRadiant && match.radiant_win) || (!isRadiant && !match.radiant_win);

      await db.query(
        `INSERT INTO matches (
          opendota_match_id,
          user_id,
          hero_name,
          hero_image,
          result,
          kills,
          deaths,
          assists,
          gpm,
          xpm,
          damage,
          played_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?))
        ON DUPLICATE KEY UPDATE
          hero_name = VALUES(hero_name),
          hero_image = VALUES(hero_image),
          result = VALUES(result),
          kills = VALUES(kills),
          deaths = VALUES(deaths),
          assists = VALUES(assists),
          gpm = VALUES(gpm),
          xpm = VALUES(xpm),
          damage = VALUES(damage),
          played_at = VALUES(played_at)`,
        [
          match.match_id,
          userId,
          heroName,
          heroImage,
          isWin ? "win" : "lose",
          match.kills || 0,
          match.deaths || 0,
          match.assists || 0,
          match.gold_per_min || 0,
          match.xp_per_min || 0,
          match.hero_damage || 0,
          match.start_time || Math.floor(Date.now() / 1000),
        ]
      );
    }

    res.json({
      message: "Матчи обновлены",
      count: matches.length,
    });
  } catch (error) {
    console.error("OPENDOTA SYNC ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "Ошибка загрузки матчей из OpenDota",
      error: error.message,
    });
  }
});

module.exports = router;