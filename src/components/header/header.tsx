import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { fetchActiveProduct } from '../../store/api-actions';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { useAppSelector, useAppDispatch } from '../hooks';
import { getProducts } from '../../store/products-data/products-data.selectors';
import { Product } from '../../types/types';
import { AppRoute } from '../../const';


const MIN_SEARCH_LENGTH = 3;

function Header(): JSX.Element{

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector(getProducts);
  const [isListOpened, setIsListOpened] = useState(false);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);

  const searchRef = useRef<HTMLInputElement>(null);
  const refList = useRef<Array<HTMLLIElement | null>>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const searchValue = evt.target.value;
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.trim().toLowerCase()));

    setFoundProducts(filteredProducts);

    if(filteredProducts.length === 0) {
      setIsListEmpty(true);
      setFocusedIndex(-1);
    } else {
      setIsListEmpty(false);
    }

    if(searchValue.length >= MIN_SEARCH_LENGTH) {
      setIsListOpened(true);
    } else {
      setIsListOpened(false);
    }
  };

  const onResetClick = () => {
    setIsListOpened(false);
    if(searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const onKeyDown = (evt: KeyboardEvent<HTMLFormElement>) => {
    if(evt.key === 'ArrowDown') {
      evt.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < foundProducts.length - 1 ? prevIndex + 1 : prevIndex);
    } else if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      if(focusedIndex === 0) {
        if (searchRef.current) {
          searchRef.current.focus();
        }
        setFocusedIndex(-1);
      } else {
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex);
      }
    } else if (evt.key === 'Enter' && focusedIndex !== -1) {
      evt.preventDefault();
      const selectedProduct = foundProducts[focusedIndex];
      dispatch(fetchActiveProduct(selectedProduct.id));
      navigate(`${AppRoute.Product}${selectedProduct.id.toString()}`);
    }
  };

  useEffect(() => {
    if (focusedIndex !== -1 && refList.current[focusedIndex]) {
      const element = refList.current[focusedIndex];
      if (element) {
        element.focus();
      }
    }
  }, [focusedIndex]);

  return (
    <header className="header" id="header">
      <div className="container">
        <Logo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Main}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${isListOpened ? 'list-opened' : ''}`}>
          <form onKeyDown={onKeyDown}>
            <label>
              <svg
                className="form-search__icon"
                width={16}
                height={16}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens" />
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                onChange={onChange}
                ref={searchRef}
              />
            </label>
            <ul className="form-search__select-list scroller">
              {isListEmpty ?
                <li
                  className="form-search__select-item"
                  style={{ pointerEvents: 'none' }}
                >
                  Ничего не найдено
                </li> :
                foundProducts.map((product, index) => (
                  <li
                    className="form-search__select-item"
                    tabIndex={0}
                    key={product.id}
                    onClick={() => {
                      dispatch(fetchActiveProduct(product.id));
                      navigate(`${AppRoute.Product}${product.id.toString()}`);
                    }}
                    onFocus={() => setFocusedIndex(index)}
                    ref={(element) => (refList.current[index] = element)}
                  >
                    {product.name}
                  </li>
                ))}
            </ul>
          </form>
          <button
            className="form-search__reset"
            type="reset"
            onClick={onResetClick}
            onBlur={() => {
              if (searchRef.current) {
                searchRef.current.focus();
              }
            }}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Header;
