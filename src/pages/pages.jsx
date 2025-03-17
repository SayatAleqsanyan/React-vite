// Pages.jsx
import { useRoutes} from "react-router-dom";
import { privateRoutes, publicRoutes, adminRoutes } from "../utils/routes.jsx";

const Pages = () => {
  const token = localStorage.getItem('Token');
  const isAdmin = token === 'Admin';

  const allPrivateRoutes = isAdmin
    ? [...privateRoutes, ...adminRoutes]
    : privateRoutes;

  return (
    <div className="flex justify-center py-10 pl-10 pr-20">
        {useRoutes(token ? allPrivateRoutes : publicRoutes)}
    </div>
  );
};

export default Pages;