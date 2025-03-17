import {useProductUserActions} from "../logic/useProductUserActions.jsx";
import { ThumbsDown, ThumbsUp} from "lucide-react"

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
        <ThumbsUp
          onClick={handleLike}
          className={`border-none cursor-pointer " ${isLiked ? "text-green-500/50"  : 'text-white/50'} hover:text-green-500`}
        />
      </div>

      <div className="flex items-center space-x-1">
        <span>{product.dislike.length}</span>
        <ThumbsDown
          onClick={handleDislike}
          className={`border-none cursor-pointer " ${isDisliked ? "text-red-500/50"  : 'text-white/50'} hover:text-red-500`}
        />
      </div>
    </div>
  );
};