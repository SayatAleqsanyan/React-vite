import ModalWindow from "../../../components/ui/modal/ModalWindow.jsx";

const Shop = ({ modalActive, setModalActive }) => {

  return (
    <div>
      <ModalWindow active={modalActive} setActive={setModalActive} >

      </ModalWindow>
    </div>
  );
};

export default Shop;