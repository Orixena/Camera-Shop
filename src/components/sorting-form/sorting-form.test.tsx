import { render, screen } from '@testing-library/react';
import SortingForm from './sorting-form';

describe('Component: SortingForm', () => {
  it('should render correctly', () => {

    render(<SortingForm />);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});
