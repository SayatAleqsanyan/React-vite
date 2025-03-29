import ModalWindow from "../../components/ui/modal/ModalWindow.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {fetchProducts} from "../../redux/slices/productsSlice.js";
import {ShopProductQuantity} from "./ProductUserActions/ui/ShopProductQuantity.jsx";
import BuyAll from "./ProductUserActions/ui/BuyAll.jsx";
import {useProductUserActions} from "./ProductUserActions/logic/useProductUserActions.jsx";
import {notify} from "../../utils/notify.js";

const Shop = ({ modalActive, setModalActive }) => {
  const token = localStorage.getItem("Token")
  const [allPrice, setAllPrice] = useState(0);
  const [allDiscountPrice, setAllDiscountPrice] = useState(0);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { performAction } = useProductUserActions();

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
    setAllPrice(shopProducts?.reduce((acc, item) => {
      return Math.ceil((acc + item.price * item.users.find(u => u.user === token)?.quantity) * 100) / 100
    }, 0));

      setAllDiscountPrice(shopProducts?.reduce((acc, item) => {
      return Math.ceil((acc + item.discountPrice * item.users.find(u => u.user === token)?.quantity) * 100) / 100
    }, 0));
  }, [shopProducts]);

  const onClick = async () => {
    const userName = token;
    try {

      const updateResults = await Promise.all(
        shopProducts.map(async (product) => {
          const userProduct = product.users.find(
            (item) => typeof item === 'object' && item.user === userName
          );

          const quantity = userProduct ? userProduct.quantity : 0;

          if (quantity > 0) {
            try {
              const result = await performAction(product, userName, 'ADD_SHOP_PRODUCT');
              return result;
            } catch (productError) {
              console.error(`Error updating product ${product.id}:`, productError);
              return null;
            }
          }

          return null;
        })
      );

      const successfulUpdates = updateResults.filter(result => result !== null);

      if (successfulUpdates.length === shopProducts.length) {
        setModalActive(false);
      }
      notify(`Products successfully added to cart!`, 'green');
    } catch (error) {
      console.error('Oops! Something went wrong while adding products.', error);
      notify(`Oops! Something went wrong while adding products.`, 'red')
    }
  };

  return (
    <ModalWindow
      active={modalActive}
      setActive={setModalActive}
    >
      <div className="w-full h-full flex flex-col overflow-x-auto">
        <table className='w-full border text-center bg-white dark:bg-gray-700 text-black dark:text-white border-gray-200 dark:border-gray-600'>
          <thead>
          <tr>
            <th className='py-2 px-4 border-b w-[5%]'>No</th>
            <th className='py-2 px-4 border-b w-[15%]'>Image</th>
            <th className='py-2 px-4 border-b w-[20%]'>Name</th>
            <th className='py-2 px-4 border-b w-[15%]'>Price</th>
            <th className='py-2 px-4 border-b w-[35%]'>Description</th>
            <th className='py-2 px-4 border-b w-[10%]'>Action</th>
          </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-[400px]">
          <tr>
            <td colSpan="6" className="py-2 px-4">
              <BuyAll price={allPrice} discount={allDiscountPrice} onClick={onClick} />
            </td>
          </tr>
          {shopProducts && shopProducts.length
            ? shopProducts.map((product, index) => (<tr key={product.id} className='hover:bg-gray-200 dark:hover:bg-gray-600'><td className='py-2 px-4 border-b w-[5%]'>{index + 1}</td><td className='py-2 px-4 border-b w-[15%]'>
                <img
                  className="mx-auto object-cover max-w-full h-24"
                  src={product.image}
                  alt={product.name}
                />
            </td><td className='py-2 px-4 border-b w-[20%]'>{product.name}</td><td className='py-2 px-4 border-b w-[15%]'>${product.price}</td><td className='py-2 px-4 border-b w-[35%]'>{product.description}</td><td className='py-2 px-4 border-b w-[10%]'>
                <ShopProductQuantity
                  product={product}
                  userName={token}
                  price={product.price}
                />
            </td>
            </tr>))
            :  <tr>
              <td colSpan="6" className="py-2 px-4 h-[300px]">
                No Products
              </td>
          </tr>
          }
          <tr>
            <td colSpan="6" className="py-2 px-4">
              <BuyAll price={allPrice} discount={allDiscountPrice} onClick={onClick} />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </ModalWindow>
  );
};

export default Shop;
