import { promoData } from './promo-data.slice';
import { RequestStatus } from '../../const';
import { fetchPromoAction } from '../api-actions';
import { makeFakePromos } from '../../utils/mocks';

describe('PromoData Slice', () => {
  it('should return initial state empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = { promo: [], fetchingStatusPromo: RequestStatus.Unsent};

    const result = promoData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { promo: [], fetchingStatusPromo: RequestStatus.Unsent };

    const result = promoData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusPromo" to "PENDING" with "fetchPromoAction.pending"', () => {
    const expectedState = { promo: [], fetchingStatusPromo: RequestStatus.Pending };

    const result = promoData.reducer(undefined, fetchPromoAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "promo" to arrays with promo data, "fetchingStatusPromo" to "SUCCESS" with "fetchPromoAction.fulfilled"', () => {
    const mockPromos = makeFakePromos();
    const expectedState = { promo: mockPromos, fetchingStatusPromo: RequestStatus.Success };

    const result = promoData.reducer(undefined, fetchPromoAction.fulfilled(mockPromos, '',undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchingStatusPromo" to "ERROR" with "fetchPromoAction.rejected"', () => {
    const expectedState = { promo: [], fetchingStatusPromo: RequestStatus.Error };

    const result = promoData.reducer(undefined, fetchPromoAction.rejected);

    expect(result).toEqual(expectedState);
  });
});

