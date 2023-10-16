import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { fetchActiveProduct, fetchSimilarProducts, fetchReviews } from '../../store/api-actions';
import { getActiveProduct, getSimilarProducts, getReviews, getFetchingStatusReviews, getFetchingStatusActiveProduct, getFetchingStatusSimilarProducts } from '../../store/active-product-data/active-product-data.selectors';
import { AppRoute, RequestStatus } from '../../const';
import Header from '../../components/header/header';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import BuyModal from '../../components/buy-modal/buy-modal';
import Footer from '../../components/footer/footer';
import classNames from 'classnames';
import RatingStars from '../../components/rating-stars/rating-stars';
import SimilarProductsList from '../../components/similar-products-list/similar-products-list';
import ReviewList from '../../components/review-list/review-list';
import LoadingScreen from '../loading-screen/loading-screen';

function Product(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      dispatch(fetchActiveProduct(Number(id))).catch(() => {
        navigate(AppRoute.NotFound);
      });
      dispatch(fetchSimilarProducts(Number(id)));
      dispatch(fetchReviews(Number(id)));
    }
  }, [dispatch, navigate, id]);

  const product = useAppSelector(getActiveProduct);
  const similarProducts = useAppSelector(getSimilarProducts);
  const reviews = useAppSelector(getReviews);
  const loadingActiveProduct = useAppSelector(getFetchingStatusActiveProduct);
  const loadingReviews = useAppSelector(getFetchingStatusReviews);
  const loadingSimilarProducts = useAppSelector(getFetchingStatusSimilarProducts);

  const [isActiveDescription, setIsActiveDescription] = useState(true);
  const [param, setParams] = useSearchParams();
  const [isModalBuyShow, setIsModalBuyShow] = useState(false);

  useEffect(() => {
    if(param.size === 0){
      setParams({about: 'description'});
    }
    const urlAbout = param.get('about');
    if(urlAbout === 'characteristic'){
      setIsActiveDescription(false);
      setParams({about: 'characteristic'});
    }
  }, [param, setParams]);

  const onCharacteristicButtonClick = () => {
    setIsActiveDescription(false);
    setParams({about: 'characteristic'});

  };

  const onDescriptionButtonClick = () => {
    setIsActiveDescription(true);
    setParams({about: 'description'});
  };

  const onBuyButtonClick = (i: number) => {
    setIsModalBuyShow(true);
    dispatch(fetchActiveProduct(i));
    document.body.style.overflow = 'hidden';
  };

  const onOverlayOrExitClick = () => {
    setIsModalBuyShow(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const onClickEsc = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onOverlayOrExitClick();
      }
    };
    document.addEventListener('keydown', onClickEsc);

    return () => {
      document.removeEventListener('keydown', onClickEsc);
    };
  }, []);

  if(loadingActiveProduct === RequestStatus.Pending || loadingReviews === RequestStatus.Pending || loadingSimilarProducts === RequestStatus.Pending){
    return <LoadingScreen />;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera Shop.Product page</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content">
          <BreadCrumbs />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x}`}
                    />
                    <img
                      src={`/${product.previewImg}`}
                      srcSet={`/${product.previewImg2x}`}
                      width={560}
                      height={480}
                      alt="Ретрокамера Das Auge IV"
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{product.name}</h1>
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount}/>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>
                    {product.price} ₽
                  </p>
                  <button className="btn btn--purple" type="button" onClick={() => {
                    onBuyButtonClick(product.id);
                  }}
                  >
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className={classNames({
                        'tabs__control': true,
                        'is-active': !isActiveDescription
                      })} type="button"
                      onClick={onCharacteristicButtonClick}
                      >
                        Характеристики
                      </button>
                      <button className={classNames({
                        'tabs__control': true,
                        'is-active': isActiveDescription
                      })} type="button" onClick={onDescriptionButtonClick}
                      >
                        Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className={classNames({
                        'tabs__element': true,
                        'is-active': !isActiveDescription,
                        'visually-hidden': isActiveDescription
                      })}
                      >
                        <ul className="product__tabs-list">
                          <li className="item-list">
                            <span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {product.vendorCode}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{product.category}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{product.type}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{product.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={classNames({
                        'tabs__element': true,
                        'is-active': isActiveDescription,
                        'visually-hidden': !isActiveDescription
                      })}
                      >
                        <div className="product__tabs-text">
                          <p>
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <SimilarProductsList similarProducts={similarProducts} onBuyButtonClick={onBuyButtonClick}/>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">
                    Оставить свой отзыв
                  </button>
                </div>
                <ReviewList reviews={reviews}/>
              </div>
            </section>
          </div>
        </div>
        <BuyModal isActive={isModalBuyShow} onOverlayOrExitClick={onOverlayOrExitClick}/>
      </main>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <Footer />
    </div>
  );
}

export default Product;
