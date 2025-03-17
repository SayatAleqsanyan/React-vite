import {useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts} from '../../redux/slices/productsSlice';
import ProductItem from "./ProductItem.jsx";
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import { Filter, FilterX } from "lucide-react"


const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [sort, setSort] = useState("default");
  const [value, setValue] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filterFavorites, setFilterFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const min = Math.min(...products.map(p => p.price));
      const max = Math.max(...products.map(p => p.price));

      setMinPrice(Math.floor(min));
      setMaxPrice(Math.ceil(max));
      setValue([min, max]);
    }
  }, [products]);

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    switch(sort) {
      case "name":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case "price":
        return copy.sort((a, b) => a.price - b.price);
      case "favorites":
        return copy.sort((a, b) => b.favorites.length - a.favorites.length );
      default:
        return products;
    }
  }, [products, sort]);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) =>
      product.price >= value[0] &&
      product.price <= value[1] &&
      (!filterFavorites || product.favorites.length > 0)
    );
  }, [sortedProducts, value, filterFavorites]);

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold py-6 text-center">Products List</h1>

      <div className="px-30 flex flex-col justify-center items-center">
        <RangeSlider
          className='p w-[80%] my-5'
          min={minPrice}
          max={maxPrice}
          step={(maxPrice - minPrice) / 100}
          value={value}
          onInput={setValue}
        />

        <p className='text-lg font-semibold'>
          Filtered Price Range: ${value[0]} - ${value[1]}
        </p>

        <select
          id='sort'
          onChange={e => setSort(e.target.value)}
          className='w-[200px] p-2 border rounded mt-5 dark:bg-gray-500'
        >
          <option value='default'>Sort by</option>
          <option value='favorites'>favorites</option>
          <option value='price'>Price</option>
          <option value='name'>Name</option>
        </select>

        <label htmlFor="favorites" className="inline-flex items-cente justify-between w-[250px] px-10 py-2 mt-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
          <input
            className="hidden peer"
            id="favorites"
            type="checkbox"
            required=""
            checked={filterFavorites}
            onChange={(e) => setFilterFavorites(e.target.checked)}
          />
          {filterFavorites ? <Filter/> : <FilterX/> }
            Filter Favorites
        </label>
      </div>

      <ul className="flex flex-wrap justify-center py-10 gap-10">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};


export default ProductsList;
