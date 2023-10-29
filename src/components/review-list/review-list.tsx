import { useState } from 'react';
import ReviewCard from '../review-card/review-card';
import { Review } from '../../types/types';
import classNames from 'classnames';

type ReviewListProps = {
  reviews: Review[] | null;
};

const showReviewsCount = 3;

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const [showReviews, setShowReviews] = useState(1);

  const onMoreReviewsButtonClick = () => {
    setShowReviews((prev) => prev + 1);
  };

  if(!reviews){
    return <div></div>;
  }
  const renderReviews = reviews.slice(0, showReviews * showReviewsCount);

  return (
    <>
      <ul className="review-block__list" data-testid="review-block">
        {renderReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
      <div className="review-block__buttons">
        <button className={classNames({
          'btn btn--purple': true,
          'visually-hidden': renderReviews.length === reviews.length
        })}
        type="button"
        onClick={onMoreReviewsButtonClick}
        >
          Показать больше отзывов
        </button>
      </div>
    </>
  );
}

export default ReviewList;
