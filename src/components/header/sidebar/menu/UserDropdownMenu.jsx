import Styles from "../Sidebar.module.scss";
import {useNavigate} from "react-router-dom";
import {LogOut, UserPen} from "lucide-react"

const UserDropdownMenu = ({ isOpen, setIsOpen, isCollapsed }) => {
  const navigator = useNavigate()
  const token = localStorage.getItem('Token')

  const handleLogout = () => {
    localStorage.removeItem('Token');
    window.location.reload();
  };

  return (
    <div
      className={` z-999
      ${!isCollapsed ? "right-55" : "right-15"}
      ${Styles.dropDownProfile} ${isOpen ? Styles.open : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <div className={`${Styles.menuContainer} bg-blue-700  dark:bg-gray-950 `}>
        <ul className={Styles.menuList}>
          <li
            onClick={(e) => {
              e.stopPropagation();
              navigator(`profile/${token}`)
            }}
            className={`${Styles.menuItem} hover:bg-gray-700/50`}><UserPen /> Profile</li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className={`${Styles.menuItem} hover:bg-gray-700/50`}
          >
            <LogOut />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdownMenu;