import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../hooks';
import { changePage, changePaginationPages } from '../../store/products-data/products-data.slice';
import { MAX_PAGINATION_PAGES_COUNT } from '../../const';

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  paginationsPages: number[];
}

function Pagination({pageCount, currentPage, paginationsPages }: PaginationProps):JSX.Element {

  const dispatch = useAppDispatch();
  const [ , setParams] = useSearchParams();

  const buttonsCount = Array.from(paginationsPages.filter((item) => item < pageCount));

  const isNextButton = pageCount > paginationsPages[2];
  const isPreviosButton = paginationsPages[0] !== 0;

  useEffect(() => {

    if(currentPage > 0 && !paginationsPages.includes(currentPage)){
      const nextPages = paginationsPages.map((page) => page + MAX_PAGINATION_PAGES_COUNT);
      dispatch(changePaginationPages(nextPages));
    }

  }, [dispatch, paginationsPages, currentPage]);

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
              const previousPages = paginationsPages.map((page) => page - MAX_PAGINATION_PAGES_COUNT);
              dispatch(changePaginationPages(previousPages));
              dispatch(changePage(previousPages[2]));
              setParams({page: `${previousPages[2] + 1}`});
            }}
          >
            Назад
          </Link>
        </li>}
        {buttonsCount.map((page) => {
          const keyValue = `${page}`;

          return (
            <li className="pagination__item" key={keyValue}>
              <Link className={classNames({
                'pagination__link': true,
                'pagination__link--active': currentPage === page
              })}
              to={'*'}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(changePage(page));
                setParams({page: `${page + 1}`});
              }}
              >
                {page + 1}
              </Link>
            </li>
          );
        })}
        {isNextButton &&
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={'*'}
            onClick={(evt) => {
              evt.preventDefault();
              const nextPages = paginationsPages.map((page) => page + MAX_PAGINATION_PAGES_COUNT);
              dispatch(changePaginationPages(nextPages));
              dispatch(changePage(nextPages[0]));
              setParams({page: `${nextPages[0] + 1}`});
            }}
          >
            Вперед
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
