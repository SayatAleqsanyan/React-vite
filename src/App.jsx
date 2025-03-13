import Header from "./components/header/Header.jsx";
import Pages from "./pages/pages.jsx";
import Footer from "./components/footer/Footer.jsx";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import PathNames from "./components/ui/PathNames.jsx";

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = PathNames(pathname) || "Home";
  }, [pathname]);

  const token = localStorage.getItem('Token')
  return (
    <div className="App bg-gray-400 dark:bg-gray-800 dark:text-white min-h-[100vh] grid grid-rows-[auto_1fr_auto]">
      {token && <Header/>}
      <Pages />
      <Footer />
    </div>
  )
}

export default App
