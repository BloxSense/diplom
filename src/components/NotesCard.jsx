function NotesCard({ notes }) {
  return (
    <section className="notes-card">
      <p className="notes-card__title">Заметки</p>

      <div className="notes-card__box">
        {notes.map((note, index) => (
          <p className="notes-card__line" key={index}>
            {note}
          </p>
        ))}
      </div>
    </section>
  );
}

export default NotesCard;