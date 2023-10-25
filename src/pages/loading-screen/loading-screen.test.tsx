import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correct', () => {
    const loadingElementTestId = 'loading-element';

    render(<LoadingScreen />);
    const loadingElement = screen.getByTestId(loadingElementTestId);

    expect(loadingElement).toBeInTheDocument();
  });
});
