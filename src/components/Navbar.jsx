import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import exitIcon from "../assets/images/exit.svg";

function Navbar({ user: userFromProps = null }) {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = userFromProps || (storedUser ? JSON.parse(storedUser) : null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-row">
          <Link to="/" className="logo">
            <img src={logo} alt="ELO Tracker logo" />
          </Link>

          <ul className="nav-list">
            <li className="nav-list__item">
              <a href="/#home" className="nav-list__link">
                Главная
              </a>
            </li>

            <li className="nav-list__item">
              <a href="/#reviews" className="nav-list__link">
                Отзывы
              </a>
            </li>

            <li className="nav-list__item">
              <a href="/#career" className="nav-list__link">
                Карьера
              </a>
            </li>

            <li className="nav-list__item">
              {user ? (
                <div className="nav-user">
                  <img
                    src={
                      user.avatar ||
                      "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png"
                    }
                    alt={user.username || user.name}
                    className="nav-user__avatar"
                  />

                  <span className="nav-user__name">
                    {user.username || user.name}
                  </span>

                  <button
                    type="button"
                    className="nav-user__logout"
                    onClick={handleLogout}
                    aria-label="Выйти из аккаунта"
                  >
                    <img src={exitIcon} alt="" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="nav-list__link-login">
                  Авторизация
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;