import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductsAction } from '../api-actions';
import { ProductsData } from '../../types/types';
import { RequestStatus, FetchingNameSpace } from '../../const';

const initialState: ProductsData = {
  products: [],
  fetchingStatusProducts: RequestStatus.Unsent,
  page: 0,
  paginationPages: [0,1,2],
};

export const productsData = createSlice({
  name: FetchingNameSpace.Products,
  initialState,
  reducers:{
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changePaginationPages: (state, action: PayloadAction<number[]>) => {
      state.paginationPages = action.payload;
    }
  },
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

export const { changePage, changePaginationPages } = productsData.actions;
