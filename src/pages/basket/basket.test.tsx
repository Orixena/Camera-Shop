import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Basket from './basket';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Basket', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Basket />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Корзина')).toBeInTheDocument();
  });
});
