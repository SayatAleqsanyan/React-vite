import { ShoppingCart, ArrowUpFromLine } from "lucide-react"
import {useEffect, useState} from "react";
import Shop from "../../../shop/Shop.jsx";
import Styles from "../Sidebar.module.scss";

const UiMenu = ({ isCollapsed }) => {
  const [modalActive, setModalActive] = useState(false);
  const [backToTop, setBackToTop] = useState(false);
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
    <div>
      <Shop modalActive={modalActive} setModalActive={setModalActive} />

      <div
        onClick={() => setModalActive(!modalActive)}
        className={`border-l-4 border-l-transparent ${Styles.menuItem}`}
      >
        <ShoppingCart />
        <span className={isCollapsed ? '' : Styles.hidden}> Shop </span>
      </div>

      {backToTop && <div
        onClick={scrollToTop}
        className={`border-l-4 border-l-transparent ${Styles.menuItem}`}
      >
        <ArrowUpFromLine />
        <span className={isCollapsed ? '' : Styles.hidden}> To Top </span>
      </div>}
    </div>
  );
};

export default UiMenu;