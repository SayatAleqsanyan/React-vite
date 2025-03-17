import { useState } from "react";
import { Menu } from "./menu/Menu";
import Styles from "./Sidebar.module.scss";
import { X, List } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`bg-blue-600 dark:bg-gray-900 z-20 
    ${Styles.sidebar} ${isCollapsed ? Styles.collapsed : Styles.expanded}`}>
      <button
        className={Styles.toggle}
        onClick={handleToggle}
      >
        {isCollapsed ? <List /> : <X />}
      </button>
      <Menu isCollapsed={isCollapsed} />
    </aside>
  );
};

export default Sidebar;
