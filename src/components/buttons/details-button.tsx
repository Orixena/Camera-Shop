import { Link } from 'react-router-dom';
import classNames from 'classnames';

type DetailsButtonProps = {
  type: string;
  id: number;
}

function DetailsButton({type, id}: DetailsButtonProps): JSX.Element {

  return (
    <Link className={classNames(`${type}`, 'btn')} to={`/product/${id}`}>
          Подробнее
    </Link>
  );
}

export default DetailsButton;
