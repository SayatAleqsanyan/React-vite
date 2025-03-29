import React from 'react';

const BuyAll = ({price, discount, onClick}) => {
  return (
    <div className='flex items-center justify-between w-full py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600'>
      <div className="flex-grow text-left">All Price</div>
      <div className="flex-grow text-center line-through decoration-red-600"> $ {price} </div>
      <div className="flex-grow"> $ {discount} </div>
      <div className="flex-grow text-center"> Saving </div>
      <div className="flex-grow"> $ {Math.round((price - discount)*100)/100} </div>
      <div className="flex-grow text-right">
        <button
          type="button"
          onClick={onClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          disabled={price === 0}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default BuyAll;