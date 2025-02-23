import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const DropMenu = ({menu, pathname}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeGroup, setActiveGroup] = useState(null)
  const menuItemsGroups = ['cards', 'paginate']

  return (
      <li>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="font-bold text-2xl cursor-pointer text-black dark:text-white"

            onClick={e => setIsOpen(!isOpen)}
            style={{
              padding: '0 20px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              gap: '8px',
            }}
          >
            {isOpen ? 'Close Menu' : 'Open Menu'}
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
              left: '0',
              marginTop: '8px',
              minWidth: '160px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              borderRadius: '4px',
              opacity: isOpen ? 1 : 0,
              visibility: isOpen ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {menuItemsGroups.map(group => (
                <li
                  key={group}
                  style={{
                    position: 'relative',
                    width: '100%',
                    backgroundColor: activeGroup === group ? '#888' : 'transparent',
                  }}
                  onMouseEnter={() => setActiveGroup(group)}
                  onMouseLeave={() => setActiveGroup(null)}
                >
                  <div
                    style={{
                      position: 'relative',
                      padding: '12px 16px',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ textTransform: 'capitalize' }}>{group}</span>
                      <span
                        style={{
                          transition: 'transform 0.3s',
                          transform: `rotate(${activeGroup === group ? 180 : 0}deg)`,
                        }}
                      >
                        ▼
                      </span>
                    </div>

                    {activeGroup === group && (
                      <ul
                        className="bg-white dark:bg-gray-900 text-black dark:text-white"
                        style={{
                          position: 'absolute',
                          left: '100%',
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
                        {menu
                        .filter(page => page.type === group)
                        .map(page => (
                          <li key={page.path}>
                            <NavLink
                              to={page.path}
                              className={`font-bold text-xl
                                  ${pathname === page.path ? 'text-[#B91F47]' : 'text-black dark:text-white'}
                                  ${pathname !== page.path && 'hover:text-blue-700'}`}
                              style={{
                                display: 'block',
                                padding: '8px 16px',
                                textDecoration: 'none',
                              }}
                            >
                              {page.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>

  );
};

export default DropMenu;