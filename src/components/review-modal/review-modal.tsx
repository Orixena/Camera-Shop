import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postReview } from '../../store/api-actions';
import StarItem from '../star-item/star-item';
import { getSendingStatusReview } from '../../store/active-product-data/active-product-data.selectors';
import { dropSendingStatusReview } from '../../store/active-product-data/active-product-data.slice';
import { RequestStatus } from '../../const';

type ReviewModalProps = {
  isActive: boolean;
  onOverlayOrExitClick: () => void;
  id: number;
};

function ReviewModal({isActive, onOverlayOrExitClick, id}: ReviewModalProps): JSX.Element {

  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(getSendingStatusReview);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userName, setUserName] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleUserNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.target.value);
  };

  const handleAdvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAdvantage(evt.target.value);
  };

  const handleDisadvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setDisadvantage(evt.target.value);
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const ratingStars = [5, 4, 3, 2, 1].map((star) => (
    <StarItem
      key={star}
      star={star}
      disabled={isSubmitting}
      checked={Number(rating) === star}
      onChange={handleRatingChange}
    />
  ));

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>){
    evt.preventDefault();
    dispatch(
      postReview({reviewData: {cameraId: id, userName, advantage, disadvantage, review, rating}})
    );
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      switch (sendingStatus) {
        case RequestStatus.Success:
          setUserName('');
          setAdvantage('');
          setDisadvantage('');
          setReview('');
          setRating(0);
          dispatch(dropSendingStatusReview());
          setIsSubmitting(false);
          onOverlayOrExitClick();
          break;
        case RequestStatus.Pending:
          setIsSubmitting(true);
          break;
        case RequestStatus.Error:
          toast.warn('Комментарий не отправлен');
          setIsSubmitting(false);
          break;
        default:
          setIsSubmitting(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [sendingStatus, dispatch]);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div
          onClick={() => {
            onOverlayOrExitClick();
          }}
          className="modal__overlay"
        />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleFormSubmit}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">{ratingStars}</div>
                    <div className="rate__progress">
                      <span className="rate__stars">0</span> <span>/</span>{' '}
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      value={userName}
                      disabled={isSubmitting}
                      onChange={handleUserNameChange}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      value={advantage}
                      disabled={isSubmitting}
                      onChange={handleAdvantageChange}
                      required
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать достоинства
                  </p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      value={disadvantage}
                      onChange={handleDisadvantageChange}
                      required
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать недостатки
                  </p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      value={review}
                      disabled={isSubmitting}
                      onChange={handleReviewChange}
                    />
                  </label>
                  <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
          >
            <svg
              onClick={() => {
                onOverlayOrExitClick();
              }}
              width={10}
              height={10}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
