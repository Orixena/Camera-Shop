import { FetchingNameSpace, RequestStatus } from '../../const';
import { makeFakeProducts } from '../../utils/mocks';
import { getProducts, getFetchingStatusProducts, getPageNumber } from './products-data.selectors';

describe('ProductsData Selectors', () => {
  const mockProducts = makeFakeProducts();
  const state = {
    [FetchingNameSpace.Products]: {
      products: mockProducts,
      fetchingStatusProducts: RequestStatus.Unsent,
      page: 0,
    }
  };

  it('should return products from state', () => {
    const { products } = state[FetchingNameSpace.Products];
    const result = getProducts(state);
    expect(result).toEqual(products);
  });

  it('should return "fetchingStatusProducts" from state', () => {
    const fetchingStatusProducts = RequestStatus.Unsent;
    const result = getFetchingStatusProducts(state);
    expect(result).toEqual(fetchingStatusProducts);
  });

  it('should return "page" from state', () => {
    const { page } = state[FetchingNameSpace.Products];
    const result = getPageNumber(state);
    expect(result).toBe(page);
  });
});
