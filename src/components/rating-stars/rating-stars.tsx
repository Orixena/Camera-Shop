type RatingStarsProps = {
  rating: number;
  reviewCount: number;
}

const RATING_GRADES = [1,2,3,4,5];

function RatingStars({rating, reviewCount}: RatingStarsProps): JSX.Element {

  return (
    <div className="rate product-card__rate" data-testid="rating-stars-container">
      {RATING_GRADES.map((el) => (
        <svg key={el} width={17} height={16} aria-hidden="true">
          <use xlinkHref={el <= rating ? '#icon-full-star' : '#icon-star'} data-testid="rating-star"/>
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>
        {reviewCount}
      </p>
    </div>
  );
}

export default RatingStars;
