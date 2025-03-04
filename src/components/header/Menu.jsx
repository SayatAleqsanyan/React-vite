import { NavLink, useLocation } from 'react-router-dom'
import DropMenu from "./DropMenu";
import {adminRoutes, privateRoutes, publicRoutes} from "../../utils/routes.jsx";

const ExampleMenu = ({ menu }) => {
  const token = localStorage.getItem('Token')
  const { pathname } = useLocation()

  return (
    <ul className="flex gap-2 justify-between ">
      <div className="flex gap-5">
        {menu.map( page => {
            return page.menu && (
              <li key={page.path}>
                <NavLink
                  to={page.path}
                  className={`font-bold text-2xl 
                ${pathname === page.path ? 'text-green-500 dark:text-green-500' : 'text-black dark:text-white'} 
                ${pathname !== page.path && 'hover:text-blue-500 dark:text-blue-500' }`}
                >
                  {page.name}
                </NavLink>
              </li>
            )
          }
        )}
      </div>

      <div className='mx-10'>{token === 'Admin' ? adminRoutes.length > 0 && <DropMenu /> : '' }</div>
    </ul>
  )
}

const My_Menu = () => {
  const token = localStorage.getItem('Token')

  return <div>
    <nav id="menu">{token ? <ExampleMenu menu={privateRoutes} /> : <ExampleMenu menu={publicRoutes} />}</nav>

  </div>
}

export default My_Menu
