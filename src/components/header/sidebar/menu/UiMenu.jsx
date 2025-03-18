import { ShoppingCart, ArrowUpFromLine } from "lucide-react"
import {useEffect, useState} from "react";
import Shop from "../../../../pages/products/shop/Shop.jsx";
import Styles from "../Sidebar.module.scss";

const UiMenu = ({ isCollapsed }) => {
  const [modalActive, setModalActive] = useState(false);
  const [backToTop, setBackToTop] = useState(true);

  useEffect( ()=> {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setBackToTop(true)
      } else {
        setBackToTop(false)
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <Shop modalActive={modalActive} setModalActive={setModalActive} />

      <div
        onClick={() => setModalActive(!modalActive)}
        className={`border-l-4 border-l-transparent hover:bg-gray-700/50 ${Styles.menuItem}`}
      >
        <ShoppingCart />
        <span className={isCollapsed ? '' : Styles.hidden}> Shop </span>
      </div>

      {backToTop && <div
        onClick={scrollToTop}
        className={`border-l-4 border-l-transparent hover:bg-gray-700/50 ${Styles.menuItem}`}
      >
        <ArrowUpFromLine />
        <span className={isCollapsed ? '' : Styles.hidden}> To Top </span>
      </div>}
    </>
  );
};

export default UiMenu;