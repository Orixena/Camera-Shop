import { useAppSelector,useAppDispatch } from '../hooks';
import { getActiveProduct } from '../../store/active-product-data/active-product-data.selectors';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { getPageNumber } from '../../store/products-data/products-data.selectors';
import { useEffect } from 'react';
import { changePage } from '../../store/products-data/products-data.slice';


function BreadCrumbs(): JSX.Element {
  const product = useAppSelector(getActiveProduct);
  const activePage = useAppSelector(getPageNumber);


  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link" href={AppRoute.Main}>
              Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </a>
          </li>
          {product ? (
            <>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`${AppRoute.Main}?page=${activePage + 1}`}>
                  Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>

              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {product.name}
                </span>
              </li>
            </>
          ) : (
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BreadCrumbs;
