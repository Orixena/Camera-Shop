import ProductCard from '../product-card/product-card';
import { Product } from '../../types/types';

type ProductListProps = {
  products: Product[];
}

function ProductsList({products}: ProductListProps):JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductsList;
