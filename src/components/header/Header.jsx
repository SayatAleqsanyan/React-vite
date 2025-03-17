import Sidebar from "./sidebar/Sidebar.jsx";
import {Moon, Sun} from "lucide-react";
import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import PathNames from "../ui/PathNames.jsx";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const { pathname } = useLocation();
  const [pathName, setPathName] = useState(PathNames(pathname));

  useEffect(() => {
    setPathName(PathNames(pathname));
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);


  }, [isDarkMode]);


  return (
    <header id="header" className=" ">
      <div className="w-full transition-all duration-300 min-h-[50px] bg-blue-600 text-white dark:bg-gray-900 text-center flex items-center justify-between">
        <Sidebar />

        <div className="flex justify-between w-full mx-5">
          <span className="text-2xl"> Logo </span>
          <span className="text-2xl"> {pathName} </span>
          <span
            className="cursor-pointer hover:text-blue-500 dark:hover:text-yellow-500"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
