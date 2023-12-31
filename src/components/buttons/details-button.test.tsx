import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import DetailsButton from './details-button';


describe('Component: DetailsButton', () => {
  it('should render correct', () => {
    const expectedProps = {
      id: 1,
      type:'btn--transparent'
    };
    const { id, type } = expectedProps;
    const expectedText = 'Подробнее';
    const { withStoreComponent } = withStore(<DetailsButton id={id} type={type}/>, {});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
