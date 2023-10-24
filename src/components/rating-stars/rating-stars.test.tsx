import { render, screen } from '@testing-library/react';
import RatingStars from './rating-stars';

describe('Component: RatingStars', () => {
  it('should render correct', () => {
    const expectedRating = 3;
    const expectedReviewsCount = 10;
    const ratingStarsContainerTestId = 'rating-stars-container';
    const ratingStarTestId = 'rating-star';

    render(<RatingStars rating={expectedRating} reviewCount={expectedReviewsCount} />);
    const ratingStarsContainer = screen.getByTestId(ratingStarsContainerTestId);
    const ratingStars = screen.getAllByTestId(ratingStarTestId);

    expect(ratingStarsContainer).toBeInTheDocument();
    expect(ratingStars.filter((star) => star.getAttribute('xlink:href') === '#icon-full-star')).toHaveLength(expectedRating);

  });
});
