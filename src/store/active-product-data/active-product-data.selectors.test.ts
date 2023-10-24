import { FetchingNameSpace, RequestStatus } from '../../const';
import { makeFakeCamera, makeFakeProducts, makeFakeComments } from '../../utils/mocks';
import { getActiveProduct, getSimilarProducts, getReviews, getFetchingStatusActiveProduct, getFetchingStatusSimilarProducts, getFetchingStatusReviews, getSendingStatusReview } from './active-product-data.selectors';

describe('ActiveProductData Selectors', () => {

  const mockActiveProduct = makeFakeCamera();
  const mockSimilarProducts = makeFakeProducts();
  const mockComments = makeFakeComments();

  const state = {
    [FetchingNameSpace.Product]: {
      activeProduct: mockActiveProduct,
      fetchingStatusActiveProduct: RequestStatus.Unsent,
      similarProducts: mockSimilarProducts,
      fetchingStatusSimilarProducts: RequestStatus.Unsent,
      reviews: mockComments,
      fetchingStatusReviews: RequestStatus.Unsent,
      sendingStatusReview: RequestStatus.Unsent,
    }
  };

  it('should return "activeProduct" from state', () => {
    const { activeProduct } = state[FetchingNameSpace.Product];
    const result = getActiveProduct(state);
    expect(result).toEqual(activeProduct);
  });

  it('should return "similarProducts" from state', () => {
    const { similarProducts } = state[FetchingNameSpace.Product];
    const result = getSimilarProducts(state);
    expect(result).toEqual(similarProducts);
  });

  it('should return "reviews" from state', () => {
    const { reviews } = state[FetchingNameSpace.Product];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return "fetchingStatusActiveProduct" from state', () => {
    const fetchingStatusActiveProduct = RequestStatus.Unsent;
    const result = getFetchingStatusActiveProduct(state);
    expect(result).toEqual(fetchingStatusActiveProduct);
  });

  it('should return "fetchingStatusSimilarProducts" from state', () => {
    const fetchingStatusSimilarProducts = RequestStatus.Unsent;
    const result = getFetchingStatusSimilarProducts(state);
    expect(result).toEqual(fetchingStatusSimilarProducts);
  });

  it('should return "fetchingStatusReviews" from state', () => {
    const fetchingStatusReviews = RequestStatus.Unsent;
    const result = getFetchingStatusReviews(state);
    expect(result).toEqual(fetchingStatusReviews);
  });

  it('should return "sendingStatusReview" from state', () => {
    const sendingStatusReview = RequestStatus.Unsent;
    const result = getSendingStatusReview(state);
    expect(result).toEqual(sendingStatusReview);
  });
});
