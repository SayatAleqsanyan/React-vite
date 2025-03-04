import { FaUserCircle } from 'react-icons/fa'
import Menu from './Menu'
import { useState, useEffect } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const Header = () => {
  const token = localStorage.getItem('Token')
  const savedDarkMode = localStorage.getItem('darkMode') === 'true'
  const [isDarkMode, setIsDarkMode] = useState(savedDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

    localStorage.setItem('darkMode', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prevState => !prevState)
  }

  return (
    <header id="header">
      <div className="w-[100%] min-h-[100px] bg-gray-500 dark:bg-gray-900 text-center flex items-center justify-between px-10">
        <Menu />
        {token && (
          <h1 className="text-2xl font-bold text-black dark:text-white flex items-center">
            <span
              className="cursor-pointer hover:text-red-200"
              onClick={() => {
                localStorage.removeItem('Token')
                window.location.reload()
              }}
            >
              {token}
            </span>

            <FaUserCircle
              onClick={() => {
                localStorage.removeItem('Token')
                window.location.reload()
              }}
              className="text-7xl cursor-pointer text-slate-700 dark:text-slate-500  active:text-green-600 hover:text-slate-900 dark:hover:text-slate-300 ml-5"
            />

            <div className='absolute right-1 top-1'>
            {!isDarkMode ? (
              <MdDarkMode
                onClick={toggleDarkMode}
                className="text-3xl cursor-pointer text-gray-900 dark:text-gray-300   hover:text-gray-500 transition-all duration-[0.3s]"
              />
            ) : (
              <MdLightMode
                onClick={toggleDarkMode}
                className="text-3xl cursor-pointer text-gray-900 dark:text-gray-300   dark:hover:text-yellow-500 transition-all duration-[0.3s]"
              />
            )}
            </div>
          </h1>
        )}
      </div>
    </header>
  )
}

export default Header
