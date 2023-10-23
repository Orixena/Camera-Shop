import { activeProductData, clearActiveProduct, dropSendingStatusReview } from './active-product-data.slice';
import { fetchActiveProduct, fetchSimilarProducts, fetchReviews, postReview } from '../api-actions';
import { RequestStatus } from '../../const';
import { makeFakeCamera, makeFakeProducts, makeFakeComments, makeFakeComment, makeFakeUserComment } from '../../utils/mocks';

describe('ActiveProductData Slice', () => {
  const initialState = {
    activeProduct: null,
    fetchingStatusActiveProduct: RequestStatus.Unsent,
    similarProducts: null,
    fetchingStatusSimilarProducts: RequestStatus.Unsent,
    reviews: [],
    fetchingStatusReviews: RequestStatus.Unsent,
    sendingStatusReview: RequestStatus.Unsent,
  };

  const mockCamera = makeFakeCamera();
  const mockProducts = makeFakeProducts();
  const mockComments = makeFakeComments();

  it('should return initial state empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = { ...initialState};

    const result = activeProductData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState};

    const result = activeProductData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "null" to "activeProduct" with "clearActiveProduct"', () => {
    const expectedState = { ...initialState};
    const state = { ...initialState, activeProduct: mockCamera};

    const result = activeProductData.reducer(state, clearActiveProduct);

    expect(result).toEqual(expectedState);
  });

  it('should set "UNSENT" to "sendingStatusReview" with "dropSendingStatusReview "', () => {
    const expectedState = { ...initialState};
    const state = { ...initialState, sendingStatusReview: RequestStatus.Success};

    const result = activeProductData.reducer(state, dropSendingStatusReview);

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusActiveProduct" to "PENDING" with "fetchActiveProduct.pending"', () => {
    const expectedState = { ...initialState, fetchingStatusActiveProduct: RequestStatus.Pending };

    const result = activeProductData.reducer(undefined, fetchActiveProduct.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "activeProduct" to object with data, "fetchingStatusActiveProduct" to "SUCCESS" with "fetchActiveProduct.fulfilled"', () => {
    const mockActiveProduct = makeFakeCamera();
    const expectedState = { ...initialState, activeProduct: mockActiveProduct, fetchingStatusActiveProduct: RequestStatus.Success};

    const result = activeProductData.reducer(undefined, fetchActiveProduct.fulfilled(mockActiveProduct, '',mockActiveProduct.id));

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusActiveProduct" to "ERROR" with "fetchActiveProduct.rejected"', () => {
    const expectedState = { ...initialState, fetchingStatusActiveProduct: RequestStatus.Error };

    const result = activeProductData.reducer(undefined, fetchActiveProduct.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusSimilarProducts" to "PENDING" with "fetchSimilarProducts.pending"', () => {
    const expectedState = { ...initialState, fetchingStatusSimilarProducts: RequestStatus.Pending };

    const result = activeProductData.reducer(undefined, fetchSimilarProducts.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "similarProducts" to array with similarProducts data, "fetchingStatusSimilarProducts" to "SUCCESS" with "fetchSimilarProducts.fulfilled"', () => {
    const expectedState = { ...initialState, similarProducts: mockProducts, fetchingStatusSimilarProducts: RequestStatus.Success};

    const result = activeProductData.reducer(undefined, fetchSimilarProducts.fulfilled(mockProducts, '', mockCamera.id));

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusSimilarProducts" to "ERROR" with "fetchSimilarProducts.pending"', () => {
    const expectedState = { ...initialState, fetchingStatusSimilarProducts: RequestStatus.Error };

    const result = activeProductData.reducer(undefined, fetchSimilarProducts.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusReviews" to "PENDING" with "fetchReviews.pending"', () => {
    const expectedState = { ...initialState, fetchingStatusReviews: RequestStatus.Pending };

    const result = activeProductData.reducer(undefined, fetchReviews.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with reviews data, "fetchingStatusReviews" to "SUCCESS" with "fetchReviews.fulfilled"', () => {
    const expectedState = { ...initialState, reviews: mockComments, fetchingStatusReviews: RequestStatus.Success};

    const result = activeProductData.reducer(undefined, fetchReviews.fulfilled(mockComments, '', mockCamera.id));

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusReviews" to "ERROR" with "fetchReviews.rejected"', () => {
    const expectedState = { ...initialState, fetchingStatusReviews: RequestStatus.Error};

    const result = activeProductData.reducer(undefined, fetchReviews.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "sendingStatusReview" to "PENDING" with "postReview.pending"', () => {
    const expectedState = { ...initialState, sendingStatusReview: RequestStatus.Pending };

    const result = activeProductData.reducer(undefined, postReview.pending);

    expect(result).toEqual(expectedState);
  });

  it('should add "comment" to array with reviews data, "sendingStatusReview" to "SUCCESS" with "postReview.fulfilled"', () => {
    const mockReview = makeFakeComment();
    const mockUserReview = makeFakeUserComment();
    const expectedState = { ...initialState, reviews: [mockReview], sendingStatusReview: RequestStatus.Success};

    const result = activeProductData.reducer(undefined, postReview.fulfilled(mockReview, '', mockUserReview));

    expect(result).toEqual(expectedState);
  });

  it('should set "sendingStatusReview" to "ERROR" with "postReview.rejected"', () => {
    const expectedState = { ...initialState, sendingStatusReview: RequestStatus.Error };

    const result = activeProductData.reducer(undefined, postReview.rejected);

    expect(result).toEqual(expectedState);
  });
});
