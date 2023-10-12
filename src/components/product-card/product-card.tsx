import DetailsButton from '../buttons/details-button';
import BuyButton from '../buy-button/buy-button';
import { Product } from '../../types/types';
import classNames from 'classnames';

type ProductCardProps = {
  product: Product;
  onBuyButtonClick: (id: number) => void;
  isSimilarActive?: boolean;
}

function ProductCard({product,onBuyButtonClick, isSimilarActive = false}: ProductCardProps):JSX.Element {

  const { id, name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, rating, reviewCount } = product;

  return (
    <div className={classNames({
      'product-card': true,
      'is-active': isSimilarActive,
    })}
    >
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x}`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <BuyButton onBuyButtonClick={onBuyButtonClick} id={id} />
        <DetailsButton type='btn--transparent' id={id}/>
      </div>
    </div>
  );
}

export default ProductCard;
