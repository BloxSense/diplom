import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

function Navbar() {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-row">
          <Link to="/" className="logo">
            <img src={logo} alt="EloTracker logo" width="176" height="50" />
          </Link>

          <ul className="nav-list">
            <li className="nav-list__item">
              <Link to="/" className="nav-list__link">
                Главная
              </Link>
            </li>
            <li className="nav-list__item">
              <a href="#reviews" className="nav-list__link">
                Отзывы
              </a>
            </li>
            <li className="nav-list__item">
              <a href="#career" className="nav-list__link">
                Карьера
              </a>
            </li>
            <li className="nav-list__item">
              <Link to="/login" className="nav-list__link-login">
                Авторизация
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;