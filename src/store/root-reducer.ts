import { combineReducers } from '@reduxjs/toolkit';
import { FetchingNameSpace } from '../const';
import { productsData } from './products-data/products-data.slice';
import { promoData } from './promo-data/promo-data.slice';

export const rootReducer = combineReducers({
  [FetchingNameSpace.Products]: productsData.reducer,
  [FetchingNameSpace.Promo]: promoData.reducer,
});
