import {CircleUser} from "lucide-react"
import Styles from "../Sidebar.module.scss";
import UserDropdownMenu from "./UserDropdownMenu.jsx";
import {useEffect, useRef, useState} from "react";

const UserPage = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("Token");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`border-l-4 border-l-transparent hover:bg-gray-700/50 ${Styles.menuItem}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CircleUser />
        <span className={isCollapsed ? '' : Styles.hidden}>{token}</span>
      </div>
      <div ref={dropdownRef}>
        <UserDropdownMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isCollapsed={isCollapsed}
        />
      </div>
    </>
  );
};

export default UserPage;