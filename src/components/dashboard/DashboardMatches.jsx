function DashboardMatches({ matches = [] }) {
  return (
    <section className="dashboard-card dashboard-card--matches">
      <div className="dashboard-match-table">
        <div className="dashboard-match-head">
          <span className="dashboard-col dashboard-col--hero">HERO</span>
          <span className="dashboard-col dashboard-col--result">W/L</span>
          <span className="dashboard-col dashboard-col--kda">KDA</span>
          <span className="dashboard-col dashboard-col--gpm">GPM</span>
          <span className="dashboard-col dashboard-col--xpm">XPM</span>
          <span className="dashboard-col dashboard-col--damage">DMG</span>
          <span className="dashboard-col dashboard-col--date">DATE</span>
        </div>

        <div className="dashboard-match-list">
          {matches.map((match) => {
            const isWin = match.result === "В" || match.result === "win";

            return (
              <article className="dashboard-match-row" key={match.id}>
                <div className="dashboard-col dashboard-col--hero dashboard-match-hero-wrap">
                  <img
                    src={match.hero}
                    alt={match.heroName || "Hero"}
                    className="dashboard-match-row__hero"
                  />
                </div>

                <span
                  className={`dashboard-col dashboard-col--result dashboard-match-row__result ${
                    isWin
                      ? "dashboard-match-row__result--win"
                      : "dashboard-match-row__result--lose"
                  }`}
                >
                  {isWin ? "В" : "П"}
                </span>

                <span className="dashboard-col dashboard-col--kda dashboard-match-row__stat dashboard-number">
                  {match.kda}
                </span>

                <span className="dashboard-col dashboard-col--gpm dashboard-match-row__stat dashboard-number">
                  {match.gpm}
                </span>

                <span className="dashboard-col dashboard-col--xpm dashboard-match-row__stat dashboard-number">
                  {match.xpm}
                </span>

                <span className="dashboard-col dashboard-col--damage dashboard-match-row__stat dashboard-number">
                  {match.damage}
                </span>

                <span className="dashboard-col dashboard-col--date dashboard-match-row__date dashboard-number">
                  {match.date}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DashboardMatches;