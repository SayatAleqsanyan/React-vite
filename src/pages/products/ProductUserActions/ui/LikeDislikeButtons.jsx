import {useProductUserActions} from "../logic/useProductUserActions.jsx";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

export const LikeDislikeButtons = ({ product, userName, onActionComplete }) => {
  const { performAction } = useProductUserActions();
  const isLiked = product.like.includes(userName);
  const isDisliked = product.dislike.includes(userName);

  const handleLike = async () => {
    const result = await performAction(product, userName, 'ADD_LIKE');
    if (onActionComplete) onActionComplete(result);
  };

  const handleDislike = async () => {
    const result = await performAction(product, userName, 'ADD_DISLIKE');
    if (onActionComplete) onActionComplete(result);
  };

  return (
    <div className="flex items-center space-x-3">

      <div className="flex items-center space-x-1">
        <span>{product.like.length}</span>
        {!isLiked ? <BiLike
          size={30}
          onClick={handleLike}
          className={`border-none cursor-pointer text-white/50 hover:text-green-500`}
        />
        : <BiSolidLike
            size={30}
            onClick={handleLike}
            className={`border-none cursor-pointer text-green-500/50 hover:text-green-500`}
          />
        }
      </div>

      <div className="flex items-center space-x-1">
        <span>{product.dislike.length}</span>
        {!isDisliked ? <BiDislike
            size={30}
            onClick={handleDislike}
            className={`border-none cursor-pointer text-white/70 hover:text-red-500`}
          />
          : <BiSolidDislike
            size={30}
            onClick={handleDislike}
            className={`border-none cursor-pointer text-red-500/70 hover:text-red-500`}
          />
        }
      </div>
    </div>
  );
};