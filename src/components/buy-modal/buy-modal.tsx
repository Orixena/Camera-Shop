import { useAppSelector } from '../hooks';
import FocusLock from 'react-focus-lock';
import { getActiveProduct } from '../../store/active-product-data/active-product-data.selectors';

type BuyModalProps = {
  isActive: boolean;
  onOverlayOrExitClick: () => void;
}

function BuyModal({isActive, onOverlayOrExitClick}:BuyModalProps): JSX.Element | null{

  const activeProduct = useAppSelector(getActiveProduct);

  if (!activeProduct) {
    return null;
  }

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <FocusLock group='group-2'>
          <div onClick={() => {
            onOverlayOrExitClick();
          }} className="modal__overlay"
          />
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`/${activeProduct.previewImgWebp}, /${activeProduct.previewImgWebp2x}`}
                  />
                  <img
                    src={activeProduct.previewImg}
                    srcSet={activeProduct.previewImg2x}
                    width={140}
                    height={120}
                    alt={activeProduct.name}
                  />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{activeProduct.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул:</span>{' '}
                    <span className="basket-item__number">{activeProduct.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{activeProduct.type}</li>
                  <li className="basket-item__list-item">{activeProduct.level}</li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>{activeProduct.price} ₽
                </p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
              >
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                Добавить в корзину
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => {
                onOverlayOrExitClick();
              }}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </FocusLock>
      </div>
    </div>
  );
}

export default BuyModal;

