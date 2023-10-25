import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import BuyButton from './buy-button';

describe('Component: BuyButton', () => {
  it('should render correctly', () => {
    const mockId = datatype.number();
    const mockHandleClick = vi.fn();

    render(<BuyButton onBuyButtonClick={mockHandleClick} id={mockId} />);

    expect(screen.getByRole('button')).toBeInTheDocument ();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });

  it('should call callback once', async () => {
    const mockId = datatype.number();
    const mockHandleClick = vi.fn();

    render(<BuyButton onBuyButtonClick={mockHandleClick} id={mockId} />);
    await userEvent.click(screen.getByRole('button'));

    expect(mockHandleClick).toBeCalledTimes(1);
  });
});
