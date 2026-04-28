const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, dota_id } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Заполни все обязательные поля" });
    }

    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Пользователь уже существует" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (username, email, password_hash, dota_id)
       VALUES (?, ?, ?, ?)`,
      [username, email, passwordHash, dota_id || null]
    );

    await db.query(
      `INSERT INTO user_stats (user_id, current_mmr, goal_mmr, session_mmr, winrate)
       VALUES (?, 0, 0, 0, 0)`,
      [result.insertId]
    );

    await db.query(
      `INSERT INTO notes (user_id, content)
       VALUES (?, '')`,
      [result.insertId]
    );

    res.status(201).json({ message: "Пользователь зарегистрирован" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Ошибка регистрации", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Вход выполнен",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        dota_id: user.dota_id,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Ошибка входа", error: error.message });
  }
});

module.exports = router;