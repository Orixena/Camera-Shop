import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Product } from '../types/types.js';
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
