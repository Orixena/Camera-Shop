import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import ProductCard from '../product-card/product-card';
import SlideNextButton from '../slider-buttons/slider-next-button';
import SlidePrevButton from '../slider-buttons/slider-prev-button';
import { Product } from '../../types/types';
import './similar-products-list.css';

type SimilarProductsListProps = {
  similarProducts: Product[] | null;
  onBuyButtonClick: (id: number) => void;
};

function SimilarProductsList({ similarProducts, onBuyButtonClick,}: SimilarProductsListProps): JSX.Element {

  if (!similarProducts) {
    return <div></div>;
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={3}
              slidesPerGroup={3}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next'
              }}
              style={{
                position: 'unset',
              }}
            >
              <SlidePrevButton />
              {similarProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} onBuyButtonClick={onBuyButtonClick} isSimilarActive/>
                </SwiperSlide>
              ))}
              <SlideNextButton />
            </Swiper>
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProductsList;
