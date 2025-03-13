// Pages.jsx
import { useRoutes } from "react-router-dom";
import { privateRoutes, publicRoutes, adminRoutes } from "../utils/routes.jsx";

const Pages = () => {
  const token = localStorage.getItem('Token');
  const isAdmin = token === 'Admin';

  const allPrivateRoutes = isAdmin
    ? [...privateRoutes, ...adminRoutes]
    : privateRoutes;

  return (
    <div className="flex justify-between p-10">
        {useRoutes(token ? allPrivateRoutes : publicRoutes)}
    </div>
  );
};

export default Pages;