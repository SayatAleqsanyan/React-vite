import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from '../../redux/slices/productsSlice';

const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);
  const [editValues, setEditValues] = useState({
    name: '',
    price: '',
    discount: '',
    description: '',
    image: '',
    users: [],
    like: [],
    dislike: [],
    favorites: []
  });

  const product = products.find((product) => product.id === id);

  useEffect(() => {
    if (product) {
      setEditValues({
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        image: product.image,
        users: product.users || [],
        like: product.like || [],
        dislike: product.dislike || [],
        favorites: product.favorites || []
      });
    }
  }, [product]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (product) {
      try {
        const updatedProduct = {
          ...product,
          name: editValues.name,
          price: editValues.price,
          discount: editValues.discount || 0,
          discountPrice: Math.ceil((editValues.price - (editValues.price * editValues.discount)/100)*100)/100 || editValues.price,
          description: editValues.description,
          image: editValues.image
        };

        await dispatch(updateProduct({
          id: product.id,
          updatedProduct
        })).unwrap();
        navigate(-1);
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='mt-4 p-4 bg-white border rounded max-w-[800px] w-full min-w-[300px] dark:bg-gray-800'>
      <form onSubmit={handleUpdateProduct}>
        <label className=""> Product Name
          <input
            className='w-full p-2 border rounded mb-2 dark:bg-gray-500'
            type="text"
            value={editValues.name}
            onChange={e => setEditValues({ ...editValues, name: e.target.value })}
            required
          />
        </label>
        <label className=""> Product Price <span className='text-blue-500 font-bold text-sm ml-5'> $ </span>
          <input
            className='w-full p-2 border rounded mb-2 dark:bg-gray-500'
            type="number"
            value={editValues.price}
            onChange={e => setEditValues({ ...editValues, price: e.target.value })}
            required
          />
        </label>
        <label className=""> Product Discount <span className='text-blue-500 font-bold text-sm ml-5'> % </span>
          <input
            className='w-full p-2 border rounded mb-2 dark:bg-gray-500'
            type="number"
            value={editValues.discount}
            onChange={e => setEditValues({ ...editValues, discount: e.target.value })}
          />
        </label>
        <label className=""> Product Description
          <textarea
            className='w-full p-2 border rounded mb-2 dark:bg-gray-500'
            value={editValues.description}
            onChange={e => setEditValues({
              ...editValues,
              description: e.target.value
            })}
            required
            rows={4}
          />
        </label>
        <label className=""> Product Image URL
          <input
            className='w-full p-2 border rounded mb-2 dark:bg-gray-500'
            type="text"
            value={editValues.image}
            onChange={e => setEditValues({ ...editValues, image: e.target.value })}
            required
          />
        </label>
        <button
          type="submit"
          className='px-3 py-1 bg-green-500 text-white rounded mr-2'
        >
          Update
        </button>
        <button
          type="button"
          className='px-3 py-1 bg-gray-500 text-white rounded'
          onClick={handleCancelEdit}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;