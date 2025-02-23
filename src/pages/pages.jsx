import {useRoutes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../utils/routes.jsx";

const Pages = () => {
  const token = localStorage.getItem('Token')
  return (
    <div className="w-full nim-h-[100%]">
      {useRoutes(token ? privateRoutes : publicRoutes)}
    </div>
  );
};

export default Pages;
