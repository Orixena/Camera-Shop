import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Main from './main';
import { makeFakeStore } from '../../utils/mocks';


describe('Component: Main', () => {
  it('should render correct', () => {

    const expectedText = 'Каталог фото- и видеотехники';
    const { withStoreComponent } = withStore(<Main />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
