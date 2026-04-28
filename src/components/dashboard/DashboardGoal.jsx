function DashboardGoal({ stats }) {
  return (
    <section className="dashboard-card dashboard-card--goal">
      <div className="dashboard-goal-card__group">
        <p className="dashboard-goal-card__label">Цель:</p>
        <p className="dashboard-goal-card__value dashboard-number">
          {stats.goal}
        </p>
      </div>

      <div className="dashboard-goal-card__group">
        <p className="dashboard-goal-card__label">Осталось:</p>
        <p className="dashboard-goal-card__value dashboard-number">
          {stats.remaining}
        </p>
      </div>

      <div className="dashboard-goal-card__group">
        <p className="dashboard-goal-card__label">WR:</p>
        <p className="dashboard-goal-card__value dashboard-number">
          {stats.winRate}
        </p>
      </div>
    </section>
  );
}

export default DashboardGoal;