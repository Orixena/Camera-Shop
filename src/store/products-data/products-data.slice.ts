import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsAction } from '../api-actions';
import { ProductsData } from '../../types/types';
import { RequestStatus, FetchingNameSpace } from '../../const';

const initialState: ProductsData = {
  products: [],
  fetchingStatusProducts: RequestStatus.Unsent,
};

export const productsData = createSlice({
  name: FetchingNameSpace.Products,
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.fetchingStatusProducts = RequestStatus.Pending;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.fetchingStatusProducts = RequestStatus.Success;
        state.products = action.payload;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.fetchingStatusProducts = RequestStatus.Error;
      });
  }
});