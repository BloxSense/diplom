function MatchesList({ matches }) {
  return (
    <section className="matches-list">
      {matches.map((match) => (
        <article className="match-row" key={match.id}>
          <img className="match-row__hero" src={match.hero} alt="Hero" />

          <span
            className={`match-row__result ${
              match.result === "В"
                ? "match-row__result--win"
                : "match-row__result--lose"
            }`}
          >
            {match.result}
          </span>

          <span className="match-row__kda numbers">{match.kda}</span>
          <span className="match-row__gpm numbers">{match.gpm}</span>
          <span className="match-row__xpm numbers">{match.xpm}</span>
          <span className="match-row__damage numbers">{match.damage}</span>
          <span className="match-row__date numbers">{match.date}</span>
        </article>
      ))}
    </section>
  );
}

export default MatchesList;