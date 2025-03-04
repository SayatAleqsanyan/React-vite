import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/notify.js";
import { fetchProducts, createProduct, removeProduct } from "../../redux/slices/productsSlice.js";

const ProductControl = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

    // Validate inputs
    if (!productName || !price || !description || !imageUrl) {
      notify("Please fill in all fields", "red");
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(price),
      description: description,
      image: imageUrl,
    };

    dispatch(createProduct(newProduct))
    .unwrap()
    .then(() => {
      // Reset form fields
      setProductName("");
      setPrice("");
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
      <form
        onSubmit={handleAddProduct}
        className="h-[500px] w-1/2 flex flex-col justify-center items-center gap-4 bg-blue-600 p-4 rounded-3xl mb-6"
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
        <button
          type="submit"
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
        >
          Add New Product
        </button>
      </form>

      <table className='min-w-full bg-white border text-black border-gray-200 text-center'>
        <thead>
        <tr>
          <th className='py-2 px-4 border-b'>No</th>
          <th className='py-2 px-4 border-b'>Name</th>
          <th className='py-2 px-4 border-b'>Price</th>
          <th className='py-2 px-4 border-b'>Description</th>
          <th className='py-2 px-4 border-b'>Action</th>
        </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
          <tr key={product.id} className='hover:bg-gray-100'>
            <td className='py-2 px-4 border-b'>{index + 1}</td>
            <td className='py-2 px-4 border-b'>{product.name}</td>
            <td className='py-2 px-4 border-b'>${product.price}</td>
            <td className='py-2 px-4 border-b'>{product.description}</td>
            <td className='py-2 px-4 border-b'>
              <button
                className='text-red-600 hover:text-red-800 w-[75px]'
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