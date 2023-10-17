import { Review } from '../../types/types';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';

type ReviewCardProps = {
  review: Review;
}

function ReviewCard({review}: ReviewCardProps): JSX.Element {

  const RATING_REVIEW_GRADES = [1,2,3,4,5];

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={review.createAt}>
          {dayjs(review.createAt).locale('ru').format('DD MMMM')}
        </time>
      </div>
      <div className="rate review-card__rate">
        {RATING_REVIEW_GRADES.map((el) => (
          <svg key={el} width={17} height={16} aria-hidden="true">
            <use xlinkHref={el <= review.rating ? '#icon-full-star' : '#icon-star'} />
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {review.advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review.review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;

