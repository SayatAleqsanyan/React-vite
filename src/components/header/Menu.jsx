import { NavLink, useLocation } from 'react-router-dom'
import DropMenu from "./DropMenu";
import {privateRoutes, publicRoutes} from "../../utils/routes.jsx";

const ExampleMenu = ({ menu }) => {
  const { pathname } = useLocation()

  return (
    <ul className="flex gap-2">
      {menu.map(
        page =>
          page.menu && (
            <li key={page.path}>
              <NavLink
                to={page.path}
                className={`font-bold text-2xl text-black dark:text-white
                ${pathname === page.path ? 'text-[#B91F47]' : 'text-black'}
                ${pathname !== page.path && 'hover:text-blue-700'}`}
              >
                {page.name}
              </NavLink>
            </li>
          )
      )}

      {menu.filter(page => page.type === 'paginate').length > 0 && <DropMenu menu={menu} pathname={pathname}/>}
    </ul>
  )
}

const My_Menu = () => {
  const token = localStorage.getItem('Token')

  return <nav id="menu">{token ? <ExampleMenu menu={privateRoutes} /> : <ExampleMenu menu={publicRoutes} />}</nav>
}

export default My_Menu
