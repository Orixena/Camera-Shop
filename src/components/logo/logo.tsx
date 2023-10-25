import { AppRoute } from '../../const';

function Logo():JSX.Element {
  return (
    <a
      className="header__logo"
      href={AppRoute.Main}
      aria-label="Переход на главную"
      data-testid="logo-element"
    >
      <svg width={100} height={36} aria-hidden="true">
        <use xlinkHref="#icon-logo" />
      </svg>
    </a>
  );
}

export default Logo;

