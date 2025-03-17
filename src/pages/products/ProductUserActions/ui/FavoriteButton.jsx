import {Star} from "lucide-react";
import {useProductUserActions} from "../useProductUserActions.jsx";

export const FavoriteButton = ({ product, userName, onActionComplete }) => {
  const { performAction } = useProductUserActions();
  const isFavorite = product.favorites.includes(userName);

  const toggleFavorite = async () => {
    const result = await performAction(product, userName, 'TOGGLE_FAVORITE');
    if (onActionComplete) onActionComplete(result);
  };

  return (
    <Star
      onClick={toggleFavorite}
      className={`border-none cursor-pointer hover:text-yellow-500" ${isFavorite ? "hover:text-yellow-500/50"  : 'bg-gray-200'}`}
    />
  );
};