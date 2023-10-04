import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import Main from '../../pages/main/main';
import Product from '../../pages/product/product';
import Basket from '../../pages/basket/basket';
import Page404 from '../../pages/page404/page404';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main />}
          />
          <Route path={AppRoute.Product}>
            <Route
              path=':id'
              element={
                <Product />
              }
            />
          </Route>
          <Route
            path={AppRoute.Basket}
            element={<Basket />}
          />
          <Route
            path='not-found'
            element={<Page404 />}
          />
          <Route
            path='*'
            element={<Page404 />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
