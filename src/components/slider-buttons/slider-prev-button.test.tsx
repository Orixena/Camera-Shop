import { render, screen } from '@testing-library/react';
import SlidePrevButton from './slider-prev-button';

describe('Component: SlidePrevButton', () => {
  it('should render correct', () => {
    const loadingElementTestId = 'prev-button';

    render(<SlidePrevButton />);
    const loadingElement = screen.getByTestId(loadingElementTestId);

    expect(loadingElement).toBeInTheDocument();
  });
});
