import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch } from '../hooks';
import { changePage } from '../../store/products-data/products-data.slice';
import { MAX_PAGINATION_PAGES_COUNT } from '../../const';
import { useState } from 'react';

type PaginationProps = {
  pageCount: number;
  currentPage: number;
}

function Pagination({pageCount, currentPage}: PaginationProps):JSX.Element {

  const dispatch = useAppDispatch();

  const [ coefficient, setCoefficient ] = useState(0);

  const buttonsCount = Array.from({length: pageCount}, (_,i) => i + 1);

  const showButtons = buttonsCount.slice(coefficient, coefficient + MAX_PAGINATION_PAGES_COUNT);

  const [ , setParams] = useSearchParams();

  const isPreviosButton = coefficient !== 0;
  const isNextButton = !(currentPage === buttonsCount.length - 1 || currentPage === buttonsCount.length - 2);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {isPreviosButton &&
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={'*'}
            onClick={(evt) => {
              evt.preventDefault();
              setCoefficient(coefficient - MAX_PAGINATION_PAGES_COUNT);
              setParams({page: `${showButtons[2]}`});
            }}
          >
            Назад
          </Link>
        </li>}
        {showButtons.map((page,i) => {
          const keyValue = `${page}-${i}`;

          return (
            <li className="pagination__item" key={keyValue}>
              <Link className={classNames({
                'pagination__link': true,
                'pagination__link--active': currentPage === i
              })}
              to={'*'}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(changePage(i));
                setParams({page: `${page}`});
              }}
              >
                {page}
              </Link>
            </li>
          );
        })}
        {isNextButton &&
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={'*'}
            // onClick={(evt) => {
            //   evt.preventDefault();
            //   setCoefficient(coefficient + MAX_PAGINATION_PAGES_COUNT);
            //   setParams({page: `${showButtons[0]}`});
            // }}
          >
            Вперед
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
