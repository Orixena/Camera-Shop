import PriceFilter from '../../components/catalog-filters/price-filter';
import CategoryFilter from '../../components/catalog-filters/category-filter';
import TypeFilter from '../../components/catalog-filters/type-filter';
import LevelFilter from '../../components/catalog-filters/level-filter';

function FilterForm(): JSX.Element {
  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceFilter />
        <CategoryFilter />
        <TypeFilter />
        <LevelFilter />
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default FilterForm;
