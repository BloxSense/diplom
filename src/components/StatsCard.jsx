function StatsCard({ mmr, session }) {
  const sessionValue = session > 0 ? `+${session}` : session;

  return (
    <section className="stats-card">
      <p className="stats-card__label">MMR:</p>
      <p className="stats-card__value numbers">{mmr}</p>

      <p className="stats-card__label">Сессия:</p>
      <p className="stats-card__value numbers">{sessionValue}</p>

      <button className="stats-card__button">Редактировать</button>
    </section>
  );
}

export default StatsCard;