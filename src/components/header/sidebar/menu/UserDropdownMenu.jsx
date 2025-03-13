import Styles from "../Sidebar.module.scss";
import {useNavigate} from "react-router-dom";

const UserDropdownMenu = ({ isOpen, setIsOpen, isCollapsed }) => {
  const navigator = useNavigate()
  const token = localStorage.getItem('Token')

  const handleLogout = () => {
    localStorage.removeItem('Token');
    window.location.reload();
  };

  return (
    <div
      className={` 
      ${!isCollapsed ? "right-55" : "right-15"}
      ${Styles.dropDownProfile} ${isOpen ? Styles.open : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <div className={`${Styles.menuContainer} bg-gray-200 dark:bg-gray-950 `}>
        <ul className={Styles.menuList}>
          <li
            onClick={(e) => {
              e.stopPropagation();
              navigator(`profile/${token}`)
            }}
            className={Styles.menuItem}>Profile</li>
          <li className={Styles.menuItem}>Settings</li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className={Styles.menuItem}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdownMenu;