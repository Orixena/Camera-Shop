import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correct', () => {
    const logoElementTestId = 'logo-element';

    render(<Logo />);
    const logoElement = screen.getByTestId(logoElementTestId);

    expect(logoElement).toBeInTheDocument();
  });
});
