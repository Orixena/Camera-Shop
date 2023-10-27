import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import SimilarProductsList from './similar-products-list';
import { makeFakeProducts, makeFakeStore } from '../../utils/mocks';


describe('Component: SimilarProductsList', () => {
  it('should render correct', () => {
    const expectedProps = {
      similarProducts: makeFakeProducts(),
      onBuyButtonClick: vi.fn(),
    };
    const { similarProducts, onBuyButtonClick} = expectedProps;
    const expectedText = 'Похожие товары';
    const { withStoreComponent } = withStore(<SimilarProductsList similarProducts={similarProducts} onBuyButtonClick={onBuyButtonClick}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
