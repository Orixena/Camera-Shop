import { createSlice } from '@reduxjs/toolkit';
import { fetchActiveProduct, fetchSimilarProducts, fetchReviews } from '../api-actions';
import { ActiveProductData } from '../../types/types';
import { RequestStatus, FetchingNameSpace } from '../../const';

const initialState: ActiveProductData = {
  activeProduct: null,
  fetchingStatusActiveProduct: RequestStatus.Unsent,
  similarProducts: null,
  fetchingStatusSimilarProducts: RequestStatus.Unsent,
  reviews: null,
  fetchingStatusReviews: RequestStatus.Unsent,
};

export const activeProductData = createSlice({
  name: FetchingNameSpace.Product,
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
      .addCase(fetchActiveProduct.pending, (state) => {
        state.fetchingStatusActiveProduct = RequestStatus.Pending;
      })
      .addCase(fetchActiveProduct.fulfilled, (state, action) => {
        state.fetchingStatusActiveProduct = RequestStatus.Success;
        state.activeProduct = action.payload;
      })
      .addCase(fetchActiveProduct.rejected, (state) => {
        state.fetchingStatusActiveProduct = RequestStatus.Error;
      })
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.fetchingStatusSimilarProducts = RequestStatus.Pending;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.fetchingStatusSimilarProducts = RequestStatus.Success;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state) => {
        state.fetchingStatusSimilarProducts = RequestStatus.Error;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.fetchingStatusReviews = RequestStatus.Pending;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.fetchingStatusReviews = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.fetchingStatusReviews = RequestStatus.Error;
      });
  }
});


