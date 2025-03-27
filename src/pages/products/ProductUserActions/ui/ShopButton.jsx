import {ShoppingCart} from "lucide-react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { TbShoppingCartCopy } from "react-icons/tb";
import {useProductUserActions} from "../logic/useProductUserActions.jsx";
import {notify} from "../../../../utils/notify.js";

export const ShopButton = ({ product, userName, onActionComplete }) => {
  const { performAction } = useProductUserActions();

  const isShop = product.users.some(item =>
    (typeof item === 'object' && item.user === userName) || item === userName
  );

  const toggleShop = async () => {
    if (!isShop)
      notify(`Product added to cart`, 'green');
    else
      notify(`Product removed from cart`, 'red')

    const result = await performAction(product, userName, 'ADD_SHOP_PRODUCT');
    if (onActionComplete) onActionComplete(result);
  };

  return (
    <>
      {isShop
        ? <TbShoppingCartCopy
            size={35}
            onClick={toggleShop}
            className={`border-none cursor-pointer text-blue-500/70 hover:text-blue-500`}
          />
        : <TbShoppingCartPlus
            size={35}
            onClick={toggleShop}
            className={`border-none cursor-pointer text-white/50 hover:text-blue-500`}
          />
      }
    </>
  );
};
