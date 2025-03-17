import {useProductUserActions} from "./useProductUserActions.jsx";

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
    <div className="flex items-center space-x-2">
      <button
        onClick={handleLike}
        className={`px-2 py-1 rounded flex items-center ${isLiked ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
      >
        <span className="mr-1">👍</span>
        <span>{isLiked ? 'Հավանված' : 'Հավանել'}</span>
      </button>

      <button
        onClick={handleDislike}
        className={`px-2 py-1 rounded flex items-center ${isDisliked ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
      >
        <span className="mr-1">👎</span>
        <span>{isDisliked ? 'Հակահավանված' : 'Հակահավանել'}</span>
      </button>
    </div>
  );
};