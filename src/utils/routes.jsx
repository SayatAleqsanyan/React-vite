import { House, PackageSearch, ShieldUser, FileSliders, Contact, MessagesSquare, MonitorPlay, ReceiptText} from "lucide-react"
import LogInForm from "../pages/loginForm/LogInForm";
import Home from "../pages/home/Home";
import Posts from "../pages/posts/Posts";
import {Navigate} from "react-router-dom";
import ProductsList from "../pages/products/ProductsList";
import ProductPage from "../pages/products/ProductPage";
import ProductControl from "../pages/admin/ProductControl";
import UsersList from "../pages/admin/UsersControl";
import ProductEdit from "../pages/admin/ProductEdit";
import ContactPage from "../pages/contact/Contact";
import Forum from "../pages/forum/Forum"
import VideoPage from "../pages/videos/VideoPage";
import UserPage from "../pages/userPage/profile/Profile";
import EditMyPage from "../pages/userPage/myProfile/EditMyProfile";

export const LOGINFORM_Page = "/loginForm";
export const HOME_Page = "/";
export const POSTS_Page = "/posts";
export const PRODUCTS_Page = "/products";
export const PRODUCT_CONTROL_Page = "/productControl";
export const PRODUCT_ITEM_Page = "/products/:id";
export const USER_LIST_PAGE = "/userList"
export const PRODUCT_EDIT_PAGE = "/products/:id/edit"
export const IMAGES_PAGE = "/images"
export const FORUM_PAGE = "/forum"
export const VIDEO_PAGE = "/video"
export const PROFILE_PAGE = "/profile/:user_name"
export const MY_PROFILE_PAGE = "/EditProfile/:user_name"

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
    icon: House,
    name: "Home",
    menu: true
  },
  {
    path: POSTS_Page,
    element: <Posts/>,
    icon: ReceiptText,
    name: "Posts",
    menu: true
  },
  {
    path: PRODUCTS_Page,
    element: <ProductsList/>,
    icon: PackageSearch,
    name: "Products",
    menu: true
  },
  {
    path: VIDEO_PAGE,
    element: <VideoPage/>,
    icon: MonitorPlay,
    name: "Video",
    menu: true
  },
  {
    path: FORUM_PAGE,
    element: <Forum/>,
    icon: MessagesSquare,
    name: "forum",
    menu: true
  },
  {
    path: IMAGES_PAGE,
    element: <ContactPage/>,
    icon: Contact,
    name: "Contact",
    menu: true
  },
  {
    path: PRODUCT_ITEM_Page,
    element: <ProductPage/>,
    name: "Product Item",
    menu: false
  },
  {
    path: PROFILE_PAGE,
    element: <UserPage/>,
    name: "Profile",
    menu: false
  },
  {
    path: MY_PROFILE_PAGE,
    element: <EditMyPage/>,
    name: "EditMyPage",
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
    icon: FileSliders,
    name: "Products Control",
    type: "admin",
    menu: true
  },
  {
    path: USER_LIST_PAGE,
    element: <UsersList/>,
    icon: ShieldUser,
    name: "Users Control",
    type: "admin",
    menu: true
  },
  {
    path: PRODUCT_EDIT_PAGE,
    element: <ProductEdit/>,
    name: "Product Edit",
    type: "none"
  }
]
