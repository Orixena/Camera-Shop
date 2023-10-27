import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import App from './app';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AppRoute } from '../../const';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {

    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });
});
