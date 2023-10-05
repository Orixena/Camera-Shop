import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import FilterForm from '../../components/filter-form/filter-form';
import SortingForm from '../../components/sorting-form/sorting-form';
import ProductsList from '../../components/products-list/products-list';
import Pagination from '../../components/pagination/pagination';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../components/hooks';
import { getProducts } from '../../store/products-data/products-data.selectors';
import { Product } from '../../types/types';
import { PRODUCTS_PRO_PAGE } from '../../const';

function Main(): JSX.Element {

  const products = useAppSelector(getProducts);
  const sortedByPriceProducts = products.slice().sort((a: Product, b: Product) => a.price - b.price);
  const renderedProducts = sortedByPriceProducts.slice(0,PRODUCTS_PRO_PAGE);

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
                  <ProductsList products={renderedProducts}/>
                  <Pagination />
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
