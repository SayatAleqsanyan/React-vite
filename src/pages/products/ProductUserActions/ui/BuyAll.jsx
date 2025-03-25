import React from 'react';

const BuyAll = ({price, onClick}) => {
  return (
      <tr className='hover:bg-gray-200 dark:hover:bg-gray-600'>
        <td className='py-2 px-4 border-b'></td>
        <td className='py-2 px-4 border-b'>All Price</td>
        <td className='py-2 px-4 border-b'></td>
        <td className='py-2 px-4 border-b'> $ {price} </td>
        <td className='py-2 px-4 border-b'></td>
        <td className='py-2 px-4 border-b'>
          <button type="button" onClick={onClick}> Buy </button>
        </td>
      </tr>
  );
};

export default BuyAll;