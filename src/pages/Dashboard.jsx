import { useEffect, useState } from "react";
import { dashboardData } from "../data/dashboard";

import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardMatches from "../components/dashboard/DashboardMatches";
import DashboardGoal from "../components/dashboard/DashboardGoal";
import DashboardNotes from "../components/dashboard/DashboardNotes";
import DashboardEditModal from "../components/dashboard/DashboardEditModal";

function Dashboard() {
  const [stats, setStats] = useState(dashboardData.stats);
  const [matches, setMatches] = useState(dashboardData.matches);
  const [notes, setNotes] = useState(dashboardData.notes);
  const [isNotesLoaded, setIsNotesLoaded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        await fetch("http://localhost:5000/api/opendota/sync-matches", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await fetch("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message || "Ошибка загрузки dashboard");
          return;
        }

        setStats(data.stats);
        setMatches(data.matches);
        setNotes(data.notes);
        setIsNotesLoaded(true);
      } catch (error) {
        console.log("Сервер не отвечает");
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    if (!isNotesLoaded) return;

    const saveTimer = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const content = Array.isArray(notes) ? notes.join("\n") : notes;

        await fetch("http://localhost:5000/api/notes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        });
      } catch (error) {
        console.log("Ошибка сохранения заметок");
      }
    }, 700);

    return () => clearTimeout(saveTimer);
  }, [notes, isNotesLoaded]);

  const handleSaveStats = async (newStats) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/stats", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_mmr: newStats.mmr,
          goal_mmr: newStats.goal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Ошибка сохранения");
        return;
      }

      setStats((prevStats) => ({
        ...prevStats,
        mmr: newStats.mmr,
        goal: newStats.goal,
        remaining: newStats.goal - newStats.mmr,
      }));

      setIsEditOpen(false);
    } catch (error) {
      alert("Сервер не отвечает");
    }
  };

  return (
    <main className="dashboard-page">
      <div className={`dashboard-blur-layer ${isEditOpen ? "is-blurred" : ""}`}>
        <div className="container">
          <section className="dashboard">
            <div className="dashboard__stats">
              <DashboardStats
                stats={stats}
                onEdit={() => setIsEditOpen(true)}
              />
            </div>

            <div className="dashboard__matches">
              <DashboardMatches matches={matches} />
            </div>

            <div className="dashboard__goal">
              <DashboardGoal stats={stats} />
            </div>

            <div className="dashboard__notes">
              <DashboardNotes notes={notes} onChange={setNotes} />
            </div>
          </section>
        </div>
      </div>

      {isEditOpen && (
        <DashboardEditModal
          stats={stats}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSaveStats}
        />
      )}
    </main>
  );
}

export default Dashboard;