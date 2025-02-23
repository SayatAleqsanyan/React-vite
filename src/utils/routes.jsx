import LogInForm from "../pages/loginForm/LogInForm.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import {Navigate} from "react-router-dom";


export const LOGINFORM_Page = "/loginForm";
export const HOME_Page = "/";
export const ABOUT_Page = "/about";


export const publicRoutes = [
  {
    path: LOGINFORM_Page,
    element: <LogInForm/>
  },
  {
    path: "*",
    element: <Navigate to={LOGINFORM_Page} />
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
    path: "*",
    element: <Navigate to={HOME_Page} />
      }
]