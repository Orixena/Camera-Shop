import { render, screen } from '@testing-library/react';
import LevelFilter from './level-filter';

describe('Component: LevelFilter', () => {
  it('should render correctly', () => {
    render(<LevelFilter />);

    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Нулевой')).toBeInTheDocument();
    expect(screen.getByText('Любительский')).toBeInTheDocument();
    expect(screen.getByText('Профессиональный')).toBeInTheDocument();
  });
});
