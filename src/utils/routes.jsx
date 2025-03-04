import LogInForm from "../pages/loginForm/LogInForm.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import {Navigate} from "react-router-dom";
import ProductsList from "../pages/products/ProductsList.jsx";
import ProductPage from "../pages/products/ProductPage.jsx";
import ProductControl from "../pages/admin/ProductControl.jsx";
import UsersList from "../pages/admin/UsersControl.jsx";

export const LOGINFORM_Page = "/loginForm";
export const HOME_Page = "/";
export const ABOUT_Page = "/about";
export const PRODUCTS_Page = "/products";
export const PRODUCT_CONTROL_Page = "/product_control";
export const PRODUCT_ITEM_Page = "/products/:id";
export const USER_LIST_PAGE = "/userList"

export const publicRoutes = [
  {
    path: LOGINFORM_Page,
    element: <LogInForm/>
  },
  {
    path: "*",
    element: <Navigate to={LOGINFORM_Page}/>
  }
]

export const privateRoutes = [
  {
    path: HOME_Page,
    element: <Home/>,
    name: "Home",
    menu: true
  },
  {
    path: ABOUT_Page,
    element: <About/>,
    name: "About",
    menu: true
  },
  {
    path: PRODUCTS_Page,
    element: <ProductsList/>,
    name: "Products",
    menu: true
  },
  {
    path: PRODUCT_ITEM_Page,
    element: <ProductPage/>,
    name: "Product Item",
    menu: false
  },

  {
    path: "*",
    element: <Navigate to={HOME_Page}/>
  }
]


export const adminRoutes = [
  {
    path: PRODUCT_CONTROL_Page,
    element: <ProductControl/>,
    name: "Product Control",
    type: "admin"
  },
  {
    path: USER_LIST_PAGE,
    element: <UsersList/>,
    name: "User List",
    type: "admin"
  },



]
