import React from 'react';
import {useRoutes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../utils/routes.jsx";

const Pages = () => {
  const token = localStorage.getItem('Token')
  return (
    <div className="w-full min-h-[80vh] bg-blue-500">
      {useRoutes(token ? privateRoutes : publicRoutes)}
    </div>
  );
};

export default Pages;