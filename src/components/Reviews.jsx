import { reviews } from "../data/reviews";

function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="reviews__container">
        {reviews.map((review) => (
          <article className="reviews__card" key={review.id}>
            <div className="reviews__avatar">
              <img src={review.avatar} alt={`Аватар ${review.name}`} />
            </div>

            <h3 className="reviews__name">{review.name}</h3>
            <p className="reviews__text">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;