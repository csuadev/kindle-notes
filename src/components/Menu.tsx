import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Menu = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <header className='flex items-center justify-between'>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <a href='/'>
          <h1 className='text-3xl font-bold transition-all transition-discrete duration-300'>
            K
            <span className={`inline-block ${isHovered ? 'w-fit opacity-100' : 'w-0 opacity-0'}`}>
              indle
            </span>
            N
            <span className={`inline-block ${isHovered ? 'w-fit opacity-100' : 'w-0 opacity-0'}`}>
              otes
            </span>
          </h1>
        </a> 
      </div>
      <div className='flex'>
        <span className='cursor-pointer' onClick={toggleTheme}>{
          theme === 'light' ? '🌚' : '🌞'
        }</span>
      </div>
    </header>
  )
}

export default Menu