import { useState } from "react";

function DashboardEditModal({ stats, onClose, onSave }) {
  const [currentMmr, setCurrentMmr] = useState(stats.mmr || "");
  const [goalMmr, setGoalMmr] = useState(stats.goal || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      mmr: Number(currentMmr),
      goal: Number(goalMmr),
    });
  };

  return (
    <div className="dashboard-modal">
      <form className="dashboard-modal__box" onSubmit={handleSubmit}>
        <button
          type="button"
          className="dashboard-modal__close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="dashboard-modal__row">
          <label className="dashboard-modal__label">Текущий MMR:</label>
          <input
            type="number"
            className="dashboard-modal__input dashboard-number"
            value={currentMmr}
            onChange={(event) => setCurrentMmr(event.target.value)}
          />
        </div>

        <div className="dashboard-modal__row">
          <label className="dashboard-modal__label">Цель:</label>
          <input
            type="number"
            className="dashboard-modal__input dashboard-number"
            value={goalMmr}
            onChange={(event) => setGoalMmr(event.target.value)}
          />
        </div>

        <button type="submit" className="dashboard-modal__save">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default DashboardEditModal;