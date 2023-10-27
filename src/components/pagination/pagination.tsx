import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../hooks';
import { changePage } from '../../store/products-data/products-data.slice';
import { MAX_PAGINATION_PAGES_COUNT } from '../../const';

type PaginationProps = {
  pageCount: number;
  currentPage: number;
}

function Pagination({pageCount, currentPage}: PaginationProps):JSX.Element {

  const dispatch = useAppDispatch();
  const [ , setParams] = useSearchParams();
  const [paginationPages, setPaginationPages] = useState([0,1,2]);

  const buttonsCount = Array.from(paginationPages.filter((item) => item < pageCount));

  const isNextButton = pageCount > paginationPages[2];
  const isPreviosButton = paginationPages[0] !== 0;

  useEffect(() => {

    if(currentPage > 0 && !paginationPages.includes(currentPage)){
      const nextPages = paginationPages.map((page) => page + MAX_PAGINATION_PAGES_COUNT);
      setPaginationPages(nextPages);
    }

  }, [dispatch, paginationPages, currentPage]);

  return (
    <div className="pagination" data-testid="pagination-container">
      <ul className="pagination__list">
        {isPreviosButton &&
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={'*'}
            onClick={(evt) => {
              evt.preventDefault();
              const previousPages = paginationPages.map((page) => page - MAX_PAGINATION_PAGES_COUNT);
              setPaginationPages(previousPages);
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
            <li className="pagination__item" key={keyValue} >
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
              const nextPages = paginationPages.map((page) => page + MAX_PAGINATION_PAGES_COUNT);
              setPaginationPages(nextPages);
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
