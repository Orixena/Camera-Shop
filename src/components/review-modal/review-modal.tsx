import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { useAppDispatch } from '../hooks';
import { postReview } from '../../store/api-actions';
import { Comment } from '../../types/types';


type ReviewModalProps = {
  isActive: boolean;
  onOverlayOrExitClick: () => void;
  id: number;
  handleSuccessModalShow: (value: React.SetStateAction<boolean>) => void;
};

function ReviewModal({isActive, onOverlayOrExitClick, id, handleSuccessModalShow,}: ReviewModalProps): JSX.Element {
  const {register, handleSubmit, formState: { errors },} = useForm<Comment>();
  const [rate, setRate] = useState(0);

  const inputErrorClass = 'is-invalid custom-input form-review__item';
  const inputNoErrorClass = 'custom-input form-review__item';
  const textAreaErrorClass = 'is-invalid custom-textarea form-review__item';
  const textAreaNoErrorClass = 'custom-textarea form-review__item';

  const dispatch = useAppDispatch();

  const onSubmit = (data: Comment) => {
    dispatch(
      postReview({
        cameraId: id,
        userName: data.userName,
        advantage: data.advantage,
        disadvantage: data.disadvantage,
        review: data.review,
        rating: Number(data.rating),
      })
    );
    onOverlayOrExitClick();
    handleSuccessModalShow(true);
  };

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <FocusLock group='group-1'>
          <div
            onClick={() => {
              onOverlayOrExitClick();
            }}
            className="modal__overlay"
          />
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(onSubmit)(evt);
                }}
                method="post"
              >
                <div className="form-review__rate">
                  <fieldset className="rate form-review__item">
                    <legend className="rate__caption">
                      Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        <input
                          {...register('rating', { required: true })}
                          className="visually-hidden"
                          id="star-5"
                          name="rating"
                          type="radio"
                          value="5"
                          onClick={() => setRate(5)}
                        />
                        <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                        <input
                          {...register('rating', { required: true })}
                          className="visually-hidden"
                          id="star-4"
                          name="rating"
                          type="radio"
                          value="4"
                          onClick={() => setRate(4)}
                        />
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                        <input
                          {...register('rating', { required: true })}
                          className="visually-hidden"
                          id="star-3"
                          name="rating"
                          type="radio"
                          value="3"
                          onClick={() => setRate(3)}
                        />
                        <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                        <input
                          {...register('rating', { required: true })}
                          className="visually-hidden"
                          id="star-2"
                          name="rating"
                          type="radio"
                          value="2"
                          onClick={() => setRate(2)}
                        />
                        <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                        <input
                          {...register('rating', { required: true })}
                          className="visually-hidden"
                          id="star-1"
                          name="rating"
                          type="radio"
                          value="1"
                          onClick={() => setRate(1)}
                        />
                        <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                      </div>
                      <div className="rate__progress">
                        <span className="rate__stars">{rate}</span>
                        <span>/</span>
                        <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p style={{opacity: errors.rating ? 1 : 0}} className="rate__message">
                      Нужно оценить товар
                    </p>
                  </fieldset>
                  <div
                    className={
                      errors.userName ? inputErrorClass : inputNoErrorClass
                    }
                  >
                    <label>
                      <span className="custom-input__label">
                        Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        {...register('userName', { required: true, minLength:2, maxLength:160 })}
                        aria-invalid={errors.userName ? 'true' : 'false'}
                        type="text"
                        name="userName"
                        placeholder="Введите ваше имя"
                      />
                    </label>
                    <p className="custom-input__error">
                      Нужно указать имя
                    </p>
                  </div>
                  <div
                    className={
                      errors.advantage ? inputErrorClass : inputNoErrorClass
                    }
                  >
                    <label>
                      <span className="custom-input__label">
                        Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        {...register('advantage', { required: true, minLength:2, maxLength:160 })}
                        aria-invalid={errors.advantage ? 'true' : 'false'}
                        type="text"
                        name="advantage"
                        placeholder="Основные преимущества товара"
                      />
                    </label>
                    <p className="custom-input__error">
                      Нужно указать достоинства
                    </p>
                  </div>
                  <div
                    className={
                      errors.disadvantage ? inputErrorClass : inputNoErrorClass
                    }
                  >
                    <label>
                      <span className="custom-input__label">
                        Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        {...register('disadvantage', { required: true, minLength:2, maxLength:160 })}
                        aria-invalid={errors.disadvantage ? 'true' : 'false'}
                        type="text"
                        name="disadvantage"
                        placeholder="Главные недостатки товара"
                      />
                    </label>
                    <p className="custom-input__error">
                      Нужно указать недостатки
                    </p>
                  </div>
                  <div
                    className={
                      errors.review ? textAreaErrorClass : textAreaNoErrorClass
                    }
                  >
                    <label>
                      <span className="custom-textarea__label">
                        Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea
                        {...register('review', { required: true, minLength:2, maxLength:160 })}
                        aria-invalid={errors.review ? 'true' : 'false'}
                        name="review"
                        minLength={5}
                        placeholder="Поделитесь своим опытом покупки"
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
        </FocusLock>
      </div>
    </div>
  );
}

export default ReviewModal;
