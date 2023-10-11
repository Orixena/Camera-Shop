import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Product, Promo, ActiveProduct } from '../types/types.js';
import { FetchingNameSpace, APIRoute } from '../const.js';

export const fetchProductsAction = createAsyncThunk<Product[], undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Products}/fetchProducts`,
  async (_arg, { extra: api}) => {
    const { data } = await api.get<Product[]>(APIRoute.Products);

    return data;
  }
);

export const fetchPromoAction = createAsyncThunk<Promo[], undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Promo}/fetchPromo`,
  async (_arg, { extra: api}) => {
    const { data } = await api.get<Promo[]>(APIRoute.Promo);

    return data;
  }
);

export const fetchActiveProduct = createAsyncThunk<ActiveProduct, number,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Product}/fetchActiveProduct`,
  async (id, { extra: api}) => {
    const { data } = await api.get<ActiveProduct>(`${APIRoute.ActiveProduct}${id}`);

    return data;
  }
);
