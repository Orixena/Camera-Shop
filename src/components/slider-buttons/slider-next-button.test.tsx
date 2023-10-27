import { render, screen } from '@testing-library/react';
import SlideNextButton from './slider-next-button';

describe('Component: SlideNextButton', () => {
  it('should render correct', () => {
    const loadingElementTestId = 'next-button';

    render(<SlideNextButton />);
    const loadingElement = screen.getByTestId(loadingElementTestId);

    expect(loadingElement).toBeInTheDocument();
  });
});
