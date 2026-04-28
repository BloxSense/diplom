import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <a href="/" className="footer__logo">
            <img src={logo} alt="EloTracker logo" />
          </a>

          <p className="footer__copy">
            Copyright © 2026 EloTracker
            <br />
            All rights reserved.
          </p>
        </div>

        <div className="footer__right">
          <div className="footer__column">
            <h4 className="footer__title">Продукты</h4>
            <Link to="/login" className="footer__link">
            Dota 2
            </Link> 
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Компания</h4>
            <a
            href="https://docs.opendota.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Документация
          </a>
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Страницы</h4>
            <a href="#" className="footer__link">Главная</a>
            <a href="#" className="footer__link">Отзывы</a>
            <a href="#" className="footer__link">Карьера</a>
            <a href="#" className="footer__link">Авторизация</a>
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Ресурсы</h4>
            <Link to="/privacy" className="footer__link">
              Положение о конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;