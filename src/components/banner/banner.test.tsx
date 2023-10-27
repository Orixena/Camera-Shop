import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakePromos } from '../../utils/mocks';
import { RequestStatus } from '../../const';


const mockPromoData = makeFakePromos();

describe('Component: Banner', () => {
  it('renders Swiper component with slides', () => {

    const { withStoreComponent } = withStore(<Banner />, {
      PROMO: {
        promo: mockPromoData,
        fetchingStatusPromo: RequestStatus.Unsent
      }
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByText(mockPromoData[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockPromoData[1].name)).toBeInTheDocument();
  });

});
