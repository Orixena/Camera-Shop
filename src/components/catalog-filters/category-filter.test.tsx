import { render, screen } from '@testing-library/react';
import CategoryFilter from './category-filter';

describe('Component: CategoryFilter', () => {
  it('should render correctly', () => {
    render(<CategoryFilter />);

    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Видеокамера')).toBeInTheDocument();
  });
});
