import { Stars } from '../../const';

type RatingStarsProps = {
  star: number;
  checked: boolean;
  disabled: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function StarItem({star, checked, disabled, onChange}: RatingStarsProps): JSX.Element {
  return (
    <>
      <input
        className="visually-hidden"
        id={`star-${star}`}
        name="rate"
        type="radio"
        defaultValue={star}
        checked={checked}
        disabled={disabled}
        onChange={(evt) => onChange(evt)}
      />
      <label className="rate__label" htmlFor={`star-${star}`} title={Stars[star - 1]} />
    </>
  );
}

export default StarItem;
