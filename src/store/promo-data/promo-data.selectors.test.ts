import { FetchingNameSpace, RequestStatus } from '../../const';
import { makeFakePromos } from '../../utils/mocks';
import { getPromo, getFetchingStatusPromo } from './promo-data.selectors';

describe('PromoData Selectors', () => {
  const mockPromos = makeFakePromos();
  const state = {
    [FetchingNameSpace.Promo]: {
      promo: mockPromos,
      fetchingStatusPromo: RequestStatus.Unsent
    }
  };

  it('should return promos from state', () => {
    const { promo } = state[FetchingNameSpace.Promo];
    const result = getPromo(state);
    expect(result).toEqual(promo);
  });

  it('should return "fetchingStatusPromo" from state', () => {
    const fetchingStatusPromo = RequestStatus.Unsent;
    const result = getFetchingStatusPromo(state);
    expect(result).toEqual(fetchingStatusPromo);
  });
});
