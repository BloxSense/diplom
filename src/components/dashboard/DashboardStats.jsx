function DashboardStats({ stats, onEdit }) {
  const sessionValue =
    stats.session > 0 ? `+${stats.session}` : `${stats.session}`;

  return (
    <aside className="dashboard-sidebar">
      <article className="dashboard-mmr-card">
        <div className="dashboard-mmr-card__group">
          <p className="dashboard-mmr-card__label">MMR:</p>
          <p className="dashboard-mmr-card__value dashboard-number">
            {stats.mmr}
          </p>
        </div>

        <div className="dashboard-mmr-card__group">
          <p className="dashboard-mmr-card__label">Сессия:</p>
          <p className="dashboard-mmr-card__value dashboard-number">
            {sessionValue}
          </p>
        </div>
      </article>

      <button type="button" className="dashboard-edit-button" onClick={onEdit}>
        Редактировать
      </button>
    </aside>
  );
}

export default DashboardStats;