import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Pagination from './pagination';
import { makeFakeStore } from '../../utils/mocks';


describe('Component: Pagination', () => {
  it('should render correct', () => {
    const expectedProps = {
      pageCount: 3,
      currentPage: 1,
    };
    const { pageCount, currentPage } = expectedProps;
    const expectedPAginationTestId = 'pagination-container';
    const { withStoreComponent } = withStore(<Pagination pageCount={pageCount} currentPage={currentPage}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(expectedPAginationTestId)).toBeInTheDocument();
  });
});
