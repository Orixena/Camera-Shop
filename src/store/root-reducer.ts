import { combineReducers } from '@reduxjs/toolkit';
import { FetchingNameSpace } from '../const';
import { productsData } from './products-data/products-data.slice';

export const rootReducer = combineReducers({
  [FetchingNameSpace.Products]: productsData.reducer,
});
