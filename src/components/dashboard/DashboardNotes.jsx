function DashboardNotes({ notes, onChange }) {
  const notesText = Array.isArray(notes) ? notes.join("\n") : notes || "";

  return (
    <section className="dashboard-card dashboard-card--notes">
      <h2 className="dashboard-notes__title">Заметки</h2>

      <textarea
        className="dashboard-notes__inner dashboard-notes__textarea"
        value={notesText}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Напишите заметки..."
      />
    </section>
  );
}

export default DashboardNotes;