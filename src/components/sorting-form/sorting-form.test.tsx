import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import SortingForm from './sorting-form';

describe('Component: SortingForm', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<SortingForm />);

    render(preparedComponent);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});
