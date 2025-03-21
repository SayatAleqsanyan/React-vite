import { Trash2, Plus, Minus } from "lucide-react";
import { useProductUserActions } from "../logic/useProductUserActions.jsx";
import { useEffect } from "react";

export const ShopProductQuantity = ({ product, userName, onActionComplete }) => {
  const { performAction } = useProductUserActions();

  const userProduct = product.users.find(item =>
    typeof item === 'object' && item.user === userName
  );

  const quantity = userProduct ? userProduct.quantity : 0;

  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1) {
      if (userProduct) {
        const result = await performAction(product, userName, 'ADD_SHOP_PRODUCT');
        if (onActionComplete) onActionComplete(result);
      }
      return;
    }

    if (quantity === 0) {
      // Add to cart first
      const result = await performAction(product, userName, 'ADD_SHOP_PRODUCT');
      if (result.success && onActionComplete) onActionComplete(result);
    } else {
      // Update quantity of existing cart item
      const result = await performAction(
        product,
        userName,
        'UPDATE_QUANTITY',
        newQuantity
      );
      if (onActionComplete) onActionComplete(result);
    }
  };

  const removeFromCart = async () => {
    const result = await performAction(product, userName, 'ADD_SHOP_PRODUCT');
    if (onActionComplete) onActionComplete(result);
  };

  if (quantity === 0) {
    return null;
  }

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => updateQuantity(quantity - 1)}
        className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-400"
      >
        <Minus size={18} />
      </button>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
        className="min-w-8 w-12 text-center border rounded px-1"
      />
      <button
        onClick={() => updateQuantity(quantity + 1)}
        className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-400"
      >
        <Plus size={18} />
      </button>
      <button
        onClick={removeFromCart}
        className="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none"
        title="Հեռացնել զամբյուղից"
      >
        <Trash2 />
      </button>
    </div>
  );
};