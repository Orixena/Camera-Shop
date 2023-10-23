import { changePage, productsData } from './products-data.slice';
import { RequestStatus } from '../../const';
import { fetchProductsAction } from '../api-actions';
import { makeFakeCamera } from '../../utils/mocks';

describe('ProductsData Slice', () => {

  it('should return initial state empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = { products: [], fetchingStatusProducts: RequestStatus.Unsent, page: 1};

    const result = productsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { products: [], fetchingStatusProducts: RequestStatus.Unsent, page: 0, };

    const result = productsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change page with "changePage"', () => {
    const mockPage = 2;
    const expectedState = { products: [], fetchingStatusProducts: RequestStatus.Unsent, page: 2};

    const result = productsData.reducer(undefined,changePage(mockPage));

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusProducts" to "PENDING" with "fetchProductsAction.pending"', () => {
    const expectedState = { products: [], fetchingStatusProducts: RequestStatus.Pending, page: 0, };

    const result = productsData.reducer(undefined, fetchProductsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "products" to array with products data, "fetchingStatusProducts" to "SUCCESS" with "fetchProductsAction.fulfilled"', () => {
    const mockCamera = makeFakeCamera();
    const expectedState = { products: [mockCamera], fetchingStatusProducts: RequestStatus.Success, page: 0, };

    const result = productsData.reducer(undefined, fetchProductsAction.fulfilled([mockCamera], '',undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusProducts" to "ERROR" with "fetchProductsAction.rejected"', () => {
    const expectedState = { products: [], fetchingStatusProducts: RequestStatus.Error, page: 0, };

    const result = productsData.reducer(undefined, fetchProductsAction.rejected);

    expect(result).toEqual(expectedState);
  });
});

