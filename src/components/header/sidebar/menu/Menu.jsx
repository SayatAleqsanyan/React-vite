import MenuItem from "./MenuItem";
import Styles from "../Sidebar.module.scss";
import {adminRoutes, privateRoutes, publicRoutes} from "../../../../utils/routes.jsx";
import UiMenu from "./UiMenu.jsx";
import UserPage from "./UserPage.jsx";

function My_Menu({ menu, isCollapsed }) {
  return (
    <nav>
      <ul className={Styles.menu}>
        <UserPage isCollapsed={isCollapsed} />
        {menu.map((page, index) => {
          return page.menu ? (
            <MenuItem
              isCollapsed={isCollapsed}
              key={index}
              item={page}
            />
          ) : null;
        })}
        <UiMenu isCollapsed={isCollapsed}/>
      </ul >
    </nav>
  );
}

export function Menu  ({ isCollapsed }) {
  const token = localStorage.getItem('Token')
  const isAdmin = token === 'Admin';

  const allPrivateRoutes = isAdmin
    ? [...privateRoutes, ...adminRoutes]
    : privateRoutes;

  return <div>
    <nav id="menu">{token
      ? <My_Menu menu={allPrivateRoutes} isCollapsed={isCollapsed} />
      : <My_Menu menu={publicRoutes} isCollapsed={isCollapsed} />}
    </nav>
  </div>
}
