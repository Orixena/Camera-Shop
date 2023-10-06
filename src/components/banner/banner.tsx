import DetailsButton from '../buttons/details-button';
import { useAppSelector } from '../../components/hooks';
import { getPromo } from '../../store/promo-data/promo-data.selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Banner(): JSX.Element {

  const promo = useAppSelector(getPromo);

  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      loop
      modules={[Autoplay, Pagination]}
    >
      {promo.map((el) => (
        <SwiperSlide key={el.id}>
          <div className="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${el.previewImgWebp}, ${el.previewImgWebp2x} 2x`}
              />
              <img
                src={el.previewImg}
                srcSet={`${el.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{el.name}</span>
              <span className="banner__text">
                Профессиональная камера от&nbsp;известного производителя
              </span>
              <DetailsButton type='' id={el.id} />
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
