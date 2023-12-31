import DetailsButton from '../buttons/details-button';
import BuyButton from '../buy-button/buy-button';
import RatingStars from '../rating-stars/rating-stars';
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
        <RatingStars rating={rating} reviewCount={reviewCount}/>
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
