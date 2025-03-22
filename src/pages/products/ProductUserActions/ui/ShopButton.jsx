import {ShoppingCart} from "lucide-react";
import {useProductUserActions} from "../logic/useProductUserActions.jsx";

export const ShopButton = ({ product, userName, onActionComplete }) => {
  const { performAction } = useProductUserActions();

  const isShop = product.users.some(item =>
    (typeof item === 'object' && item.user === userName) || item === userName
  );

  const toggleShop = async () => {
    const result = await performAction(product, userName, 'ADD_SHOP_PRODUCT');
    if (onActionComplete) onActionComplete(result);
  };

  return (
    <ShoppingCart
      onClick={toggleShop}
      className={`border-none cursor-pointer ${isShop ? "text-blue-500/50" : 'text-white/50'} hover:text-blue-500`}
    />
  );
};