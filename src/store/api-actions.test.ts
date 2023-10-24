import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, makeFakeProducts, makeFakePromos, makeFakeCamera, makeFakeComments, extractActionsTypes } from '../utils/mocks';
import { State } from '../types/state';
import { APIRoute } from '../const';
import { fetchProductsAction, fetchPromoAction, fetchActiveProduct, fetchSimilarProducts, fetchReviews, postReview } from './api-actions';
import { Comment } from '../types/types';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      PRODUCTS: { products: []},
      PROMO: { promo: []},
      PRODUCT: {
        activeProduct: undefined,
        similarProducts: [],
        reviews:[]
      }});
  });

  describe('fetchProductsAction', () => {
    it('should dispatch "fetchProductsAction.pending", "fetchProductsAction.fulfilled" when server response 200', async () => {
      const mockCameras = makeFakeProducts();
      mockAxiosAdapter.onGet(APIRoute.Products).reply(200, mockCameras);

      await store.dispatch(fetchProductsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.fulfilled.type,
      ]);

      expect(fetchCamerasActionFulfilled.payload).toEqual(mockCameras);
    });

    it('should dispatch "fetchProductsAction.pending", "fetchProductsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Products).reply(400, []);

      await store.dispatch(fetchProductsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoAction', () => {
    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.fulfilled" when server response 200', async () => {
      const mockPromo = makeFakePromos();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromo);

      await store.dispatch(fetchPromoAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type,
      ]);

      expect(fetchPromoActionFulfilled.payload).toEqual(mockPromo);
    });

    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.rejected.type,
      ]);
    });
  });

  describe('fetchActiveProduct', () => {
    const mockProduct = makeFakeCamera();

    it('should dispatch "fetchActiveProduct.pending", "fetchActiveProduct.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.ActiveProduct}${mockProduct.id}`).reply(200, mockProduct);

      await store.dispatch(fetchActiveProduct(mockProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchActiveProductActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchActiveProduct.pending.type,
        fetchActiveProduct.fulfilled.type,
      ]);

      expect(fetchActiveProductActionFulfilled.payload).toEqual(mockProduct);
    });

    it('should dispatch "fetchActiveProduct.pending", "fetchActiveProduct.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.ActiveProduct}${mockProduct.id}`).reply(400, []);

      await store.dispatch(fetchActiveProduct(mockProduct.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchActiveProduct.pending.type,
        fetchActiveProduct.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarProducts', () => {
    const mockProduct = makeFakeCamera();

    it('should dispatch "fetchSimilarProducts.pending", "fetchSimilarProducts.fulfilled" when server response 200', async () => {
      const mockSimilarProducts = makeFakeProducts();
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}/similar`).reply(200, mockSimilarProducts);

      await store.dispatch(fetchSimilarProducts(mockProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchSimilarProductsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProducts.pending.type,
        fetchSimilarProducts.fulfilled.type,
      ]);

      expect(fetchSimilarProductsActionFulfilled.payload).toEqual(mockSimilarProducts);
    });

    it('should dispatch "fetchSimilarProducts.pending", "fetchSimilarProducts.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}/similar`).reply(400, []);

      await store.dispatch(fetchSimilarProducts(mockProduct.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarProducts.pending.type,
        fetchSimilarProducts.rejected.type,
      ]);
    });
  });

  describe('fetchReviews', () => {
    const mockProduct = makeFakeCamera();

    it('should dispatch "fetchReviews.pending", "fetchReviews.fulfilled" when server response 200', async () => {
      const mockComments = makeFakeComments();
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}/reviews`).reply(200, mockComments);

      await store.dispatch(fetchReviews(mockProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(mockComments);
    });

    it('should dispatch "fetchReviews.pending", "fetchReviews.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}/reviews`).reply(400, []);

      await store.dispatch(fetchReviews(mockProduct.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('postReview', () => {
    it('should dispatch "postReview.pending", "postReview.fulfilled" when server response 200', async() => {
      const mockComment: Comment = { cameraId: 1, userName: 'Anna', advantage: 'perfect', disadvantage: 'not found', review: 'perfect', rating: 5 };
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200, []);

      await store.dispatch(postReview(mockComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type,
      ]);
    });
  });
});


