import { render, screen } from '@testing-library/react';
import BreadCrumbs from './bread-crumbs';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';


describe('Component: BreadCrumbs', () => {
  it('should render correct', () => {

    const { withStoreComponent } = withStore(<BreadCrumbs />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
