import {Star} from "lucide-react";
import {useProductUserActions} from "../logic/useProductUserActions.jsx";
import {FaRegStar, FaStar} from "react-icons/fa";

export const FavoriteButton = ({product, userName, onActionComplete}) => {
  const {performAction} = useProductUserActions();
  const isFavorite = product.favorites.includes(userName);

  const toggleFavorite = async () => {


    const result = await performAction(product, userName, 'TOGGLE_FAVORITE');
    if (onActionComplete) onActionComplete(result);
  };

  return (
    // <Star
    //   onClick={toggleFavorite}
    //   className={`border-none cursor-pointer " ${isFavorite ? "text-yellow-500/50 "  : 'text-white/50'} hover:text-yellow-500`}
    // />
    <div>
      {!isFavorite &&
        <FaRegStar
          onClick={toggleFavorite}
          className={`border-none cursor-pointer text-white/80 hover:text-yellow-500`}
          size={28}
        />
      }
      {isFavorite &&
        <FaStar
          onClick={toggleFavorite}
          className={`border-none cursor-pointer text-yellow-500/80 hover:text-yellow-500`}
          size={28}
        />
      }
    </div>
//
//

  );
};