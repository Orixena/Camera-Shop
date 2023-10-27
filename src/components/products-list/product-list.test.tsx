import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ProductsList from './products-list';
import { makeFakeProducts, makeFakeStore } from '../../utils/mocks';


describe('Component: ProductsList', () => {
  it('should render correct', () => {
    const expectedProps = {
      products: makeFakeProducts(),
      onBuyButtonClick: vi.fn()
    };
    const { products, onBuyButtonClick } = expectedProps;
    const expectedPAginationTestId = 'product-list-container';
    const { withStoreComponent } = withStore(<ProductsList products={products} onBuyButtonClick={onBuyButtonClick}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(expectedPAginationTestId)).toBeInTheDocument();
  });
});
