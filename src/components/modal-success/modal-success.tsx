import FocusLock from 'react-focus-lock';

type ModalSuccessProps = {
  onOverlayOrExitClick: () => void;
};

function ModalSuccess({onOverlayOrExitClick}: ModalSuccessProps): JSX.Element {
  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <FocusLock group='group-3'>
          <div
            onClick={() => {
              onOverlayOrExitClick();
            }}
            className="modal__overlay"
          />
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg
              className="modal__icon"
              width={80}
              height={78}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-review-success" />
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={() => {
                  onOverlayOrExitClick();
                }}
                onKeyDown={(evt) => {
                  if (evt.code === '13'){
                    onOverlayOrExitClick();
                  }
                }}
              >
                Вернуться к покупкам
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

export default ModalSuccess;
