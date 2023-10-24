import { render, screen } from '@testing-library/react';
import PriceFilter from './price-filter';

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    render(<PriceFilter />);

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });
});
