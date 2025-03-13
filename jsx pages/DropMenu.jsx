import {useState} from 'react';
import {NavLink, useLocation } from "react-router-dom";
import {adminRoutes} from "../../utils/routes.jsx";

const DropMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  return (
      <li>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="font-bold text-2xl cursor-pointer text-black dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '0 20px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              gap: '8px',
            }}
          >
            Admin
            <span
              style={{
                transform: `rotate(${isOpen ? 180 : 0}deg)`,
                transition: 'transform 0.3s ease',
              }}
            >
              ▼
            </span>
          </button>

          <div
            className="bg-white dark:bg-gray-900 text-black dark:text-white"
            style={{
              position: 'absolute',
              top: '100%',
              left: '0%',
              marginTop: '8px',
              minWidth: '200px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              borderRadius: '4px',
              opacity: isOpen ? 1 : 0,
              visibility: isOpen ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {(
                      <ul
                        className="bg-white dark:bg-gray-800 text-black dark:text-white"
                        style={{
                          position: 'absolute',
                          left: '0%',
                          top: '-8px',
                          minWidth: '160px',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                          borderRadius: '4px',
                          margin: 0,
                          padding: '8px 0',
                          listStyle: 'none',
                          zIndex: 1000,
                        }}
                      >
                        {adminRoutes
                        .map(page => page.type === 'admin' && <li key={page.path} onClick={()=>{
                              }}>
                                <NavLink
                                  to={page.path}
                                  className={`font-bold text-xl
                                  ${pathname === page.path ? 'text-green-500 ' : 'text-black dark:text-white'}
                                  ${pathname !== page.path && 'hover:text-blue-500'}`}
                                  style={{
                                    display: 'block',
                                    padding: '8px 16px',
                                    textDecoration: 'none',
                                  }}
                                >
                                  {page.name}
                                </NavLink>
                              </li>
                        )}
                      </ul>
                    )}
            </ul>
          </div>
        </div>
      </li>

  );
};

export default DropMenu;
