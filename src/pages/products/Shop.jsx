import ModalWindow from "../../components/ui/modal/ModalWindow.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {fetchProducts, updateProduct} from "../../redux/slices/productsSlice.js";
import {ShopProductQuantity} from "./ProductUserActions/ui/ShopProductQuantity.jsx";
import BuyAll from "./ProductUserActions/ui/BuyAll.jsx";

const Shop = ({ modalActive, setModalActive }) => {
  const token = localStorage.getItem("Token")
  const [allPrice, setAllPrice] = useState(0);
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.users.findIndex(item =>
        (typeof item === 'object' && item.user === token) || item === token
      ) !== -1
    );
  }, [products, token]);

  const shopProducts = filteredProducts

    useEffect(() => {
    setAllPrice(shopProducts.reduce((acc, item) => {
      return Math.ceil((acc + item.price * item.users.find(u => u.user === token)?.quantity) * 100) / 100
    }, 0));
  }, [shopProducts]);

  const onClick = () => {

    if (products && Array.isArray(products.users)) {
      console.log('jihkjn')
      dispatch(updateProduct({
        id: products.id,
        updatedProduct: {
          ...products,
          users: products.users.filter(userObj => userObj.user !== token),
        }
      }));
    }

    setModalActive(false);
  };

  return (
      <ModalWindow active={modalActive} setActive={setModalActive} >
        <div className="w-full h-full flex flex-col overflow-y-auto">
          <div>
            <table className='w-full border text-center bg-white dark:bg-gray-700 text-black dark:text-white border-gray-200 dark:border-gray-600'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border-b'>No</th>
                  <th className='py-2 px-4 border-b'>Image</th>
                  <th className='py-2 px-4 border-b'>Name</th>
                  <th className='py-2 px-4 border-b'>Price</th>
                  <th className='py-2 px-4 border-b'>Description</th>
                  <th className='py-2 px-4 border-b'>Action</th>
                </tr>
              </thead>
              <tbody>
                <BuyAll price={allPrice} onClick={onClick} />

                {shopProducts.map((product, index) => (
                  <tr key={product.id} className='hover:bg-gray-200 dark:hover:bg-gray-600 overflow-y-auto'>
                    <td className='py-2 px-4 border-b'>{index + 1}</td>
                    <td><img width={120} className="object-cover" src={product.image} alt={product.name} /></td>
                    <td className='py-2 px-4 border-b'>{product.name}</td>
                    <td className='py-2 px-4 border-b'>${product.price}</td>
                    <td className='py-2 px-4 border-b'>{product.description}</td>

                    <td className='py-2 px-4 border-b'>
                      <ShopProductQuantity
                        product={product}
                        userName={token}
                        price={product.price}
                      />
                    </td>
                  </tr>
                ))}

                <BuyAll price={allPrice} onClick={onClick} />
              </tbody>
            </table>
          </div>
        </div>
      </ModalWindow>
  );
};

export default Shop;