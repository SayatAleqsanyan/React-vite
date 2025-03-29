import style from "./ModalWindow.module.css";

const ModalWindow = ({ active, setActive, children }) => {
  if (active)
    document.body.classList.add('modal-open');
  else
    document.body.classList.remove('modal-open');

  return (
    <div className= {`${active ? `${style.active} ${style.modal}` : style.modal} dark:bg-black bg-white`} onClick={()=>setActive(false)}>
      <div className={style.modal_content} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;