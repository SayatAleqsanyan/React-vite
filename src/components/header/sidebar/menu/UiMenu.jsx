import { GoMoveToTop } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import {useEffect, useState} from "react";
import Shop from "../shop/Shop.jsx";

const UiMenu = () => {
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
    <div className='fixed bottom-0 right-2'>
      <Shop modalActive={modalActive} setModalActive={setModalActive} />
      {backToTop && <GoMoveToTop
        onClick={scrollToTop}
        className="mx-10 size-[55px] text-black dark:text-white hover:text-green-500 dark:hover:text-green-500 cursor-pointer"
      />}
      <GiShoppingCart
        onClick={() => setModalActive(!modalActive)}
        className="mx-10 size-[55px] text-black dark:text-white hover:text-green-500 dark:hover:text-green-500 cursor-pointer mb-10"
      />
    </div>
  );
};

export default UiMenu;