import { createSlice } from '@reduxjs/toolkit';
import { fetchPromoAction } from '../api-actions';
import { PromoData } from '../../types/types';
import { RequestStatus, FetchingNameSpace } from '../../const';

const initialState: PromoData = {
  promo: [],
  fetchingStatusPromo: RequestStatus.Unsent
};

export const promoData = createSlice({
  name: FetchingNameSpace.Promo,
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.fetchingStatusPromo = RequestStatus.Pending;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.fetchingStatusPromo = RequestStatus.Success;
        state.promo = action.payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.fetchingStatusPromo = RequestStatus.Error;
      });
  }
});
