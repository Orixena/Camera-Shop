import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { ActiveProductData } from '../../types/types';
import { FetchingNameSpace } from '../../const';

export const getActiveProduct = createSelector(
  (state: State) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.activeProduct
);

export const getSimilarProducts = createSelector(
  (state: State) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.similarProducts
);

export const getReviews = createSelector(
  (state: State) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.reviews
);

