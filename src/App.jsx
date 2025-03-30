import Header from "./components/header/Header.jsx";
import Pages from "./pages/pages.jsx";
import Footer from "./components/footer/Footer.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import PathNames from "./components/ui/PathNames.jsx";
import {useDispatch} from "react-redux";
import {profileUser} from "./redux/slices/usersSlice.js";

function App() {
  const { pathname } = useLocation()
  const token = localStorage.getItem("Token")

  useEffect(() => {
    document.title = PathNames(pathname) || "Home";
  }, [pathname]);

  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!token) return;

    async function fetchUserInfo() {
      try {
        const userData = await dispatch(profileUser({ userName: token })).unwrap();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchUserInfo();
  }, [dispatch, token]);

  const LogOut = () => {
    localStorage.removeItem('Token')
    window.location.reload();
  }

  return (
    <div className="App transition-colors duration-1000 bg-radial from-orange-100  to-red-100  dark:from-sky-700 dark:to-slate-900 dark:text-white min-h-[100vh] grid grid-rows-[auto_1fr_auto]">

      {user?.isBlocked === true
        ? <div className="flex flex-col justify-center items-center min-h-[100vh]">
            <h1 className="text-7xl text-red-500">your account is blocked... </h1>
            <button className="text-5xl bg-red-200 hover:bg-red-400 w-[300px] h-[100px] mt-10" onClick={LogOut}>Logout </button>
          </div>
        : <>
          {token && <Header/>}
          <Pages />
          <Footer />
        </>
      }
    </div>
  )
}

export default App
