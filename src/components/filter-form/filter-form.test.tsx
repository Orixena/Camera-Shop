import { render, screen } from '@testing-library/react';
import FilterForm from './filter-form';

describe('Component: FilterForm', () => {
  it('should render correctly', () => {

    render(<FilterForm />);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
  });
});
