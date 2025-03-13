import {Link} from "react-router-dom";

const Product = ({ product }) => {
  const token = localStorage.getItem('Token')

  return (
    <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-96 dark:text-white dark:bg-gray-700">
      <div className="p-6 text-center">
        <h1 className="mb-1 text-xl font-semibold text-slate-800 dark:text-white dark:bg-gray-700">{product.name}</h1>
      </div>
      <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
        <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
      </div>
      <div className="p-6 text-center">
        <p className="text-base text-slate-600 mt-4 font-light dark:text-white dark:bg-gray-700" >Price: ${product.price}</p>
        <p className="text-base text-slate-600 mt-4 font-light dark:text-white dark:bg-gray-700">{product.description}</p>
      </div>
      {token === 'Admin' && <div className="flex justify-center mb-10">
        <Link to={ product.id + "/edit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Edit </Link>
      </div>}
      {token !== 'Admin' && <div className="flex justify-center mb-10">
        <Link to={product.id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Add </Link>
        </div>}
    </div>
  );
};

export default Product;
