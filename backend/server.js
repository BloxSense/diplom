const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const authRoutes = require("./routes/auth.routes");
const statsRoutes = require("./routes/stats.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const opendotaRoutes = require("./routes/opendota.routes");
const notesRoutes = require("./routes/notes.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/opendota", opendotaRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ message: "EloTracker API работает, база подключена" });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка подключения к базе",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});