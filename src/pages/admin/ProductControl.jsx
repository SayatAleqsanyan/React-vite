import {useState} from "react";
import {useDispatch} from "react-redux";
import {notify} from "../../utils/notify.js";
import {addProduct} from "../../redux/slices/productsSlice.js";


const ProductControl = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();




  function handleAddProduct(event) {
    event.preventDefault();
    if (!productName || !price || !description || !imageUrl) {
      notify("Please fill in all fields", "red");
      return;
    }

    const product = {
      name: productName,
      price: price,
      description: description,
      image: imageUrl,
    };
    dispatch(addProduct(product))
    .unwrap()
    .then(() => {
      notify("Add successful!", "green");
    })
    .catch((error) => {
      notify(`Error: ${error}`, "red");
    });
  }
  return (
    <div className='min-h-full w-full flex justify-center items-center'>
      <form onSubmit={handleAddProduct} className="h-[500px] w-1/2 flex flex-col justify-center items-center gap-4
    bg-blue-600 p-4 rounded-3xl  ">
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          placeholder="Product name"/>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price"/>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"/>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
          placeholder="Image URL"/>
        <button type="submit">Add New Product</button>
      </form>
    </div>

  );
};

export default ProductControl;