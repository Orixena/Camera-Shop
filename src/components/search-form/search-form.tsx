import { useState } from 'react';
import Select from 'react-select';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../store/products-data/products-data.selectors';
import { Product } from '../../types/types';
import { AppRoute } from '../../const';

function SearchForm() {
  const products = useAppSelector(getProducts);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const searchProducts = (input: string): Product[] =>
    products.filter((product) =>
      product.name
        .toLocaleLowerCase()
        .includes(input.trim().toLocaleLowerCase())
    );

  const loadOptions = (input: string) => {
    if (input.length >= 3) {
      const searchResults = searchProducts(input);
      setOptions(searchResults);
    } else {
      setOptions([]);
    }
  };

  const handleChange = (id : number | undefined) => {
    if(id) {
      navigate(`${AppRoute.Product}${id?.toString()}`);
    }

  };

  return (
    <>
      <Select
        placeholder='Search Products'
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue)}
        options={loadOptions}
        onChange={handleChange}
        isClearable
        isSearchable
      />
      <div className={`form-search ${ inputValue.length > 2 ? 'list-opened' : ''}`}>
        <form>
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
              data-testid="search-element"
            />
          </label>
          <ul className="form-search__select-list">
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 8i
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 7i
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 6i
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 5i
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 4i
            </li>
          </ul>
        </form>
        <button className="form-search__reset" type="reset">
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      </div>
    </>
  );
}

export default SearchForm;
