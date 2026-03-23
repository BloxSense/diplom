import DashboardHeader from "../components/DashboardHeader";
import StatsCard from "../components/StatsCard";
import MatchesList from "../components/MatchesList";
import GoalCard from "../components/GoalCard";
import NotesCard from "../components/NotesCard";
import { dashboardData } from "../data/dashboard";

function Dashboard() {
  const { user, stats, matches, notes } = dashboardData;

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <DashboardHeader user={user} />

        <section className="dashboard-main">
          <StatsCard mmr={stats.mmr} session={stats.session} />
          <MatchesList matches={matches} />
        </section>

        <section className="dashboard-bottom">
          <GoalCard
            goal={stats.goal}
            remaining={stats.remaining}
            winRate={stats.winRate}
          />
          <NotesCard notes={notes} />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;