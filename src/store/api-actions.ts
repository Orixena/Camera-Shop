import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Product, Promo, ActiveProduct, Review, Comment } from '../types/types.js';
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

export const fetchSimilarProducts = createAsyncThunk<Product[] | null, number,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Product}/fetchSimilarProducts`,
  async (id, { extra: api}) => {
    const { data } = await api.get<Product[] | null>(`${APIRoute.Products}/${id}/similar`);

    return data;
  }
);

export const fetchReviews = createAsyncThunk<Review[], number,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Product}/fetchReviews`,
  async (id, { extra: api}) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Products}/${id}/reviews`);

    return data;
  }
);

export const postReview = createAsyncThunk<Review, Comment,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Product}/postReview`,
  async ({cameraId, userName, advantage, disadvantage, review, rating}, { extra:api}) => {
    const {data} = await api.post<Review>(APIRoute.Reviews,{cameraId, userName, advantage, disadvantage, review, rating});
    return data;
  }
);
