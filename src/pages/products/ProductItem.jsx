import {Link} from "react-router-dom";
import {LikeDislikeButtons} from "./ProductUserActions/ui/LikeDislikeButtons.jsx";
import {FavoriteButton} from "./ProductUserActions/ui/FavoriteButton.jsx";
import {ShopButton} from "./ProductUserActions/ui/ShopButton.jsx";

const ProductItem = ({ product }) => {
  const token = localStorage.getItem('Token')

  return (
    <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-96 dark:text-white dark:bg-gray-700">
      <div className="p-6 flex justify-around">
        <FavoriteButton
          product={product}
          userName={token}
        />
        <h1 className="mb-1 text-xl font-semibold text-slate-800 dark:text-white dark:bg-gray-700">{product.name}</h1>
        <LikeDislikeButtons
          product={product}
          userName={token}
        />
      </div>
      <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
        <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
      </div>
      <div className="p-6 text-center">
        <p className="text-base text-slate-600 mt-4 font-light dark:text-white dark:bg-gray-700" >
          Price:
          {product.discount > 0
            ? <><span className="line-through decoration-red-600"> ${product.price} </span> ${product.discountPrice}</>
            : <>${product.price}</>
          }
        </p>
        <p className="text-base text-slate-600 mt-4 font-light dark:text-white dark:bg-gray-700">{product.description}</p>
      </div>
      <div className="flex justify-center items-center mb-10 gap-10">
        <Link to={ product.id } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Add </Link>

        {token === 'Admin' &&
          <Link to={ product.id + "/edit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Edit </Link>
        }
          <ShopButton product={product} userName={token}/>
      </div>
    </div>
  );
};

export default ProductItem;
