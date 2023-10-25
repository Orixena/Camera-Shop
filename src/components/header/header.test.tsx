import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const basketLogoTestId = 'basket-logo';
    const searchElementTestId = 'search-element';

    render(<Header />);
    const basketLogo = screen.getByTestId(basketLogoTestId);
    const searchElement = screen.getByTestId(searchElementTestId);

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
    expect(basketLogo).toBeInTheDocument();
    expect(searchElement).toBeInTheDocument();

  });
});
