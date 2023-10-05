import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { ProductsData } from '../../types/types';
import { FetchingNameSpace } from '../../const';

export const getProducts = createSelector(
  (state: State) => state[FetchingNameSpace.Products],
  (state: ProductsData) => state.products
);


export const getFetchingStatusProducts = createSelector(
  (state: State) => state[FetchingNameSpace.Products],
  (state: ProductsData) => state.fetchingStatusProducts
);
