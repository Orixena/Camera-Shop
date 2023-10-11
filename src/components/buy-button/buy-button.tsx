type BuyButtonProps = {
  onBuyButtonClick: (id: number) => void;
  id: number;
}

function BuyButton({onBuyButtonClick, id}: BuyButtonProps): React.JSX.Element {

  return (
    <button
      className="btn btn--purple product-card__btn"
      type="button"
      onClick={() => {
        onBuyButtonClick(id);
      }}
    >
      Купить
    </button>
  );
}
export default BuyButton;
