import { createSlice } from '@reduxjs/toolkit';
import { fetchActiveProduct } from '../api-actions';
import { ActiveProductData } from '../../types/types';
import { RequestStatus, FetchingNameSpace } from '../../const';

const initialState: ActiveProductData = {
  activeProduct: null,
  fetchingStatusActiveProduct: RequestStatus.Unsent,
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
      });
  }
});


