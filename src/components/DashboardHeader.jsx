import logo from "../assets/images/logo.svg";

function DashboardHeader({ user }) {
  return (
    <header className="dashboard-header">
      <a href="/" className="dashboard-header__logo">
        <img src={logo} alt="EloTracker logo" />
      </a>

      <nav className="dashboard-header__nav">
        <a href="/" className="dashboard-header__link">Главная</a>
        <a href="#" className="dashboard-header__link">Контакты</a>
        <a href="#" className="dashboard-header__link">Отзывы</a>
      </nav>

      <div className="dashboard-header__user">
        <img
          src={user.avatar}
          alt={user.name}
          className="dashboard-header__avatar"
        />
        <span className="dashboard-header__name">{user.name}</span>
      </div>
    </header>
  );
}

export default DashboardHeader;