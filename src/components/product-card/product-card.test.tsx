import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ProductCard from './product-card';
import { makeFakeCamera, makeFakeStore } from '../../utils/mocks';


describe('Component: ProductCard', () => {
  it('should render correct', () => {
    const expectedProps = {
      product: makeFakeCamera(),
      onBuyButtonClick:vi.fn(),
      isSimilarActive: true
    };
    const { product, onBuyButtonClick, isSimilarActive } = expectedProps;
    const expectedText = 'Цена:';
    const { withStoreComponent } = withStore(<ProductCard product={product} onBuyButtonClick={onBuyButtonClick} isSimilarActive={isSimilarActive}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
