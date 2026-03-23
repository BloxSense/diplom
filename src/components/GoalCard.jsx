function GoalCard({ goal, remaining, winRate }) {
  return (
    <section className="goal-card">
      <p className="goal-card__label">Цель:</p>
      <p className="goal-card__value numbers">{goal}</p>

      <p className="goal-card__label">Осталось:</p>
      <p className="goal-card__value numbers">{remaining}</p>

      <p className="goal-card__label">WR:</p>
      <p className="goal-card__value numbers">{winRate}</p>
    </section>
  );
}

export default GoalCard;