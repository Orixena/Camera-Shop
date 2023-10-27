import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ModalSuccess from './modal-success';
import { makeFakeStore } from '../../utils/mocks';


describe('Component: ModalSuccess', () => {
  it('should render correct', () => {
    const expectedProps = {
      onOverlayOrExitClick: vi.fn(),
    };
    const { onOverlayOrExitClick } = expectedProps;
    const expectedText = 'Спасибо за отзыв';
    const { withStoreComponent } = withStore(<ModalSuccess onOverlayOrExitClick={onOverlayOrExitClick}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
