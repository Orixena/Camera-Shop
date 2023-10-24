import { render, screen } from '@testing-library/react';
import TypeFilter from './type-filter';

describe('Component: TypeFilter', () => {
  it('should render correctly', () => {
    render(<TypeFilter />);

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByText('Цифровая')).toBeInTheDocument();
    expect(screen.getByText('Плёночная')).toBeInTheDocument();
    expect(screen.getByText('Моментальная')).toBeInTheDocument();
    expect(screen.getByText('Коллекционная')).toBeInTheDocument();
  });
});
