import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import FilterForm from '../../components/filter-form/filter-form';
import SortingForm from '../../components/sorting-form/sorting-form';
import ProductsList from '../../components/products-list/products-list';
import Pagination from '../../components/pagination/pagination';
import Footer from '../../components/footer/footer';
import { useAppSelector, useAppDispatch } from '../../components/hooks';
import {
  getProducts,
  getPageNumber
} from '../../store/products-data/products-data.selectors';
import { Product } from '../../types/types';
import { PRODUCTS_PRO_PAGE } from '../../const';
import { changePage } from '../../store/products-data/products-data.slice';

function Main(): JSX.Element {
  const products = useAppSelector(getProducts);
  const currentPage = useAppSelector(getPageNumber);
  const dispatch = useAppDispatch();

  const sortedByPriceProducts = products
    .slice()
    .sort((a: Product, b: Product) => a.price - b.price);

  const offset = currentPage * PRODUCTS_PRO_PAGE;
  const currentPageData = sortedByPriceProducts.slice(
    offset,
    offset + PRODUCTS_PRO_PAGE
  );
  const pageCount = Math.ceil(sortedByPriceProducts.length / PRODUCTS_PRO_PAGE);

  const [param, setParams] = useSearchParams();

  useEffect(() => {
    if (param.size === 0) {
      setParams({ page: '1' });
    } else {
      const urlPage = Number(param.get('page'));
      const newPage = !urlPage || urlPage > pageCount ? 0 : urlPage - 1;
      if (urlPage !== currentPage + 1) {
        dispatch(changePage(newPage));
        setParams({ page: String(newPage + 1) });
      }
    }
  }, [param, currentPage, dispatch, setParams, pageCount]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera Shop.Main page</title>
      </Helmet>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <BreadCrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <FilterForm />
                </div>
                <div className="catalog__content">
                  <SortingForm />
                  <ProductsList products={currentPageData} />
                  {pageCount > 1 && (
                    <Pagination
                      pageCount={pageCount}
                      currentPage={currentPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
