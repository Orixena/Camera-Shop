import { useSwiper } from 'swiper/react';

export default function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <button
      className="slider-controls slider-controls--prev"
      data-testid="prev-button"
      type="button"
      aria-label="Предыдущий слайд"
      onClick={() => swiper.slidePrev()}
    >
      <svg width={7} height={12} aria-hidden="true">
        <use xlinkHref="#icon-arrow" />
      </svg>
    </button>
  );
}
