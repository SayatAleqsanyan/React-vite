import style from "./ModalWindow.module.css";

const ModalWindow = ({ active, setActive, children }) => {

  return (
    <div className= {`${active ? `${style.active} ${style.modal}` : style.modal} dark:bg-black bg-white`} onClick={()=>setActive(false)}>
      <div className={style.modal_content} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;