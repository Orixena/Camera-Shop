import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ReviewModal from './review-modal';
import { makeFakeCamera, makeFakeStore } from '../../utils/mocks';


describe('Component: ReviewModal', () => {
  it('should render correct', () => {
    const expectedProps = {
      isActive: true,
      onOverlayOrExitClick: vi.fn(),
      id: makeFakeCamera().id,
      handleSuccessModalShow: vi.fn(),
    };
    const { isActive, onOverlayOrExitClick, id, handleSuccessModalShow } = expectedProps;
    const expectedText = 'Оставить отзыв';
    const { withStoreComponent } = withStore(<ReviewModal isActive={isActive} onOverlayOrExitClick={onOverlayOrExitClick} id={id} handleSuccessModalShow={handleSuccessModalShow}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
