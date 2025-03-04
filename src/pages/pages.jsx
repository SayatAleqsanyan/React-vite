// Pages.jsx
import { useRoutes } from "react-router-dom";
import { privateRoutes, publicRoutes, adminRoutes } from "../utils/routes.jsx";

const Pages = () => {
  const token = localStorage.getItem('Token');
  const isAdmin = true; // Փոխարինել իրական ստուգմամբ (օր.՝ ստուգելով role-ը token-ից)

  // Միավորել privateRoutes-ը և adminRoutes-ը, եթե օգտատերը ադմին է
  const allPrivateRoutes = isAdmin
    ? [...privateRoutes, ...adminRoutes]
    : privateRoutes;

  return (
    <div className="w-full min-h-[100%]">
      {useRoutes(token ? allPrivateRoutes : publicRoutes)}
    </div>
  );
};

export default Pages;