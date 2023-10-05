import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { PromoData } from '../../types/types';
import { FetchingNameSpace } from '../../const';

export const getPromo = createSelector(
  (state: State) => state[FetchingNameSpace.Promo],
  (state: PromoData) => state.promo
);

export const getFetchingStatusPromo = createSelector(
  (state: State) => state[FetchingNameSpace.Promo],
  (state: PromoData) => state.fetchingStatusPromo
);
