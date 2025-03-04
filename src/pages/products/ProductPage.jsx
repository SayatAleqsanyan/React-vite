import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {fetchProducts} from '../../redux/slices/productsSlice';

const ProductPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="h-hull flex justify-center items-center">
      <div className="flex flex-col bg-white dark:bg-gray-700 dark:text-white shadow-sm border border-slate-200 dark:border-slate-900 rounded-lg my-6 w-96">
        <div className="p-6 text-center">
          <h1 className="mb-1 text-xl font-semibold text-slate-800 dark:text-white">{product.name}</h1>
        </div>
        <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
          <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
        </div>
        <div className="p-6 text-center">
          <p className="text-base text-slate-600 dark:text-white mt-4 font-light">Price: ${product.price}</p>
          <p className="text-base text-slate-600 dark:text-white mt-4 font-light">{product.description}</p>
        </div>
        <button
          onClick={goBack}
          className="bg-blue-500 hover:bg-blue-700 text-white border-none font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProductPage;