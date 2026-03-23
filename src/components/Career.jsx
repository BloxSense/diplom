import careerImage from "../assets/images/image (2).png";
import { Link } from "react-router-dom";

function Career() {
  return (
    <section className="job" id="career">
      <div className="job__content">
        <div className="job__column">
          <p className="join__main-text">Присоединяйтесь</p>
          <p className="join__text">
            Присоединяйтесь к нам и 10 000 пользователям, которые доверяют нам.
          </p>
          <Link to="/login" className="job__btn job__btn--primary">
          Присоединиться
          </Link>
        </div>

        <div className="job__column">
          <p className="job__main-text">Карьера</p>
          <p className="job__text">
            Ищем специалистов в нашу команду для создания инновационных продуктов.
          </p>
          <button className="job__btn job__btn--secondary">В этом году</button>
        </div>
      </div>

      <div className="job__image">
        <img src={careerImage} alt="Dota 2 job" className="job__image-pic" />
      </div>
    </section>
  );
}

export default Career;