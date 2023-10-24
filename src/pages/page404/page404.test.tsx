import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Page404 from './page404';

describe('Component: Page404', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<Page404 />);

    render(preparedComponent);

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Извините, нам не удается найти такую страницу')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
