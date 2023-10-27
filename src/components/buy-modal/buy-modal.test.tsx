import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import BuyModal from './buy-modal';
import { makeFakeStore } from '../../utils/mocks';


describe('Component: BuyModal', () => {
  it('should render correct', () => {
    const expectedProps = {
      isActive: true,
      onOverlayOrExitClick: vi.fn(),
    };
    const { isActive, onOverlayOrExitClick } = expectedProps;
    const expectedText = 'Добавить товар в корзину';
    const { withStoreComponent } = withStore(<BuyModal isActive={isActive} onOverlayOrExitClick={onOverlayOrExitClick}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
