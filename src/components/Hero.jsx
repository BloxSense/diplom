import dotaImage from "../assets/images/dota1.png";
import { Link } from "react-router-dom";

function Hero() {
  const targetLink = localStorage.getItem("token")
    ? "/dashboard"
    : "/login";

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__image">
          <img
            src={dotaImage}
            alt="Dota 2 header"
            className="header__image-pic"
          />
        </div>

        <div className="header__content">
          <p className="header__text">
            EloTracker — команда энтузиастов киберспорта, которая создаёт удобный
            сервис для отслеживания и анализа матчей в соревновательных играх.
            Мы начинаем с Dota 2 и собираем данные из каждого вашего матча, чтобы
            превращать их в наглядную статистику, графики и подсказки для развития.
            EloTracker помогает игрокам разбирать свои игры, находить ошибки и
            сильные стороны, а также уверенно расти по рейтингу.
          </p>

          <Link to={targetLink} className="header__button">
            Попробовать
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Hero;