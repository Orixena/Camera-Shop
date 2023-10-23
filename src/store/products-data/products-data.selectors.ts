import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { ProductsData } from '../../types/types';
import { FetchingNameSpace } from '../../const';

export const getProducts = createSelector(
  (state: Pick<State, FetchingNameSpace.Products>) => state[FetchingNameSpace.Products],
  (state: ProductsData) => state.products
);

export const getFetchingStatusProducts = createSelector(
  (state: Pick<State, FetchingNameSpace.Products>) => state[FetchingNameSpace.Products],
  (state: ProductsData) => state.fetchingStatusProducts
);

export const getPageNumber = createSelector(
  (state: Pick<State, FetchingNameSpace.Products>) => state[FetchingNameSpace.Products],
  (state: ProductsData) => state.page
);

