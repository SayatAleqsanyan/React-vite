import ModalWindow from "../ui/modal/ModalWindow.jsx";

const Shop = ({ modalActive, setModalActive }) => {
  return (
    <div>
      <ModalWindow active={modalActive} setActive={setModalActive} >
        <h1> Shop </h1>
      </ModalWindow>
    </div>
  );
};

export default Shop;