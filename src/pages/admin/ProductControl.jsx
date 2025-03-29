import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/notify.js";
import { fetchProducts, createProduct, removeProduct } from "../../redux/slices/productsSlice.js";
import {Link} from "react-router-dom";

const ProductControl = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [button, setButton] =useState(false)

  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteProduct = (product) => {
    dispatch(removeProduct(product.id))
    .unwrap()
    .then(() => {
      notify(`Product deleted: ${product.name}!`, 'red');
    })
    .catch((error) => {
      notify(`Error deleting product: ${error}`, 'red');
    });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    if (!productName || !price || !description || !imageUrl) {
      notify("Please fill in all fields", "red");
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(price),
      discount: parseFloat(discount),
      discountPrice: Math.ceil((parseFloat(price) - (parseFloat(price) * parseFloat(discount))/100)*100)/100 || parseFloat(price),
      description: description,
      image: imageUrl,
      users: [],
      like: [],
      dislike: [],
      favorites: []
    };

    dispatch(createProduct(newProduct))
    .unwrap()
    .then(() => {
      setProductName("");
      setPrice("");
      setDiscount("");
      setDescription("");
      setImageUrl("");
      notify("Product added successfully!", "green");
    })
    .catch((error) => {
      notify(`Error: ${error}`, "red");
    });
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className='min-h-full w-full flex flex-col justify-center items-center'>
      {
        button
          ? <form
            onSubmit={handleAddProduct}
            className="h-[500px] my-10  w-1/2 flex flex-col justify-center items-center gap-4 bg-gray-300 p-4 rounded-3xl mb-6 dark:bg-gray-700 dark:text-white"
          >
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              placeholder="Product name"
              className="w-full p-2 rounded"
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
              className="w-full p-2 rounded"
            />
            <input
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              type="number"
              placeholder="Discount"
              className="w-full p-2 rounded"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              className="w-full p-2 rounded"
            />
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="text"
              placeholder="Image URL"
              className="w-full p-2 rounded"
            />
            <div className="flex w-full max-w-[500px] justify-evenly">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Add New Product
              </button>
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
                onClick={()=>setButton(!button)}
              >
                Closed
              </button>
            </div>
          </form>
          : <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 mb-10"
            onClick={()=>setButton(!button)}
          > Add New Product </button>
      }

      <table className='w-full border text-center bg-white dark:bg-gray-700 text-black dark:text-white border-gray-200 dark:border-gray-600 '>
        <thead>
        <tr>
          <th className='py-2 px-4 border-b'>No</th>
          <th className='py-2 px-4 border-b'>Name</th>
          <th className='py-2 px-4 border-b'>Price</th>
          <th className='py-2 px-4 border-b'>Discount</th>
          <th className='py-2 px-4 border-b'>Description</th>
          <th className='py-2 px-4 border-b'>Action</th>
        </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
          <tr key={product.id} className='hover:bg-gray-200 dark:hover:bg-gray-600'>
            <td className='py-2 px-4 border-b'>{index + 1}</td>
            <td className='py-2 px-4 border-b'>{product.name}</td>
            {product.discount > 0
            ? <>
                <td className='py-2 px-4 border-b line-through decoration-red-600'>${product.price}</td>
                <td className='py-2 px-4 border-b'> ${ product.discountPrice } </td>
              </>
            : <>
                <td className='py-2 px-4 border-b'>${product.price}</td>
                <td className='py-2 px-4 border-b'> </td>
              </>
            }
            <td className='py-2 px-4 border-b'>{product.description}</td>
            <td className='py-2 px-4 border-b'>
              <Link to={`/products/${product.id}/edit`} className="text-center text-yellow-600 hover:text-yellow-800 w-[75px]"> Edit </Link>
              <button
                className='text-red-600 hover:text-red-800 w-[75px] text-center'
                onClick={() => handleDeleteProduct(product)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductControl;
