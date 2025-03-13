import Styles from "../Sidebar.module.scss";
import {Link, useLocation} from "react-router-dom";

const MenuItem = ({ item, isCollapsed }) => {
  const { pathname } = useLocation()

  return (
    <Link className={`${Styles.menuItem} 
                ${pathname === item.path 
      ? 'border-l-4 border-l-green-500' 
      : 'border-l-4 border-l-transparent'}`}
          to={item.path}
    >
      <item.icon className="inline-block" />
      <span className={isCollapsed ? '' : Styles.hidden}>{item.name}</span>
    </Link>
  );
};

export default MenuItem;
