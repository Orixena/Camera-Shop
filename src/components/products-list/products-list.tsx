import ProductCard from '../product-card/product-card';
import { Product } from '../../types/types';

type ProductListProps = {
  products: Product[];
  onBuyButtonClick: (id: number) => void;
}

function ProductsList({products, onBuyButtonClick}: ProductListProps):JSX.Element {

  return (
    <div className="cards catalog__cards" data-testid="product-list-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyButtonClick={onBuyButtonClick}
        />
      ))}
    </div>
  );
}

export default ProductsList;
