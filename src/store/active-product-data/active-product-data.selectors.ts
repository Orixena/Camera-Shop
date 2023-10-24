import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { ActiveProductData } from '../../types/types';
import { FetchingNameSpace } from '../../const';

export const getActiveProduct = createSelector(
  (state: Pick<State, FetchingNameSpace.Product>) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.activeProduct
);

export const getSimilarProducts = createSelector(
  (state: Pick<State, FetchingNameSpace.Product>) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.similarProducts
);

export const getReviews = createSelector(
  (state: Pick<State, FetchingNameSpace.Product>) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.reviews
);

export const getFetchingStatusReviews = createSelector(
  (state: Pick<State, FetchingNameSpace.Product>) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.fetchingStatusReviews
);

export const getFetchingStatusSimilarProducts = createSelector(
  (state: Pick<State, FetchingNameSpace.Product>) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.fetchingStatusSimilarProducts
);

export const getFetchingStatusActiveProduct = createSelector(
  (state: Pick<State, FetchingNameSpace.Product>) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.fetchingStatusActiveProduct
);

export const getSendingStatusReview = createSelector(
  (state: Pick<State, FetchingNameSpace.Product>) => state[FetchingNameSpace.Product],
  (state: ActiveProductData) => state.sendingStatusReview
);
