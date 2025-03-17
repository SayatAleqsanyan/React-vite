import {CircleUser} from "lucide-react"
import Styles from "../Sidebar.module.scss";
import UserDropdownMenu from "./UserDropdownMenu.jsx";
import {useState} from "react";

const UserPage = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("Token");

  return (
      <>
        <div
          className={`border-l-4 border-l-transparent hover:bg-gray-700/50 ${Styles.menuItem}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CircleUser />
          <span className={isCollapsed ? '' : Styles.hidden}>{token}</span>
        </div>
        <UserDropdownMenu isOpen={isOpen} setIsOpen={setIsOpen} isCollapsed={isCollapsed} />
      </>
  );
};

export default UserPage;