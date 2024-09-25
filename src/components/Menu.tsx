import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Menu = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className=''>Kindle Notes</h1>
      </div>
      <div className='flex'>
        <ul className='flex space-x-6 mr-6'>
          <li>
            <a href='#'>About</a>
          </li>
          <li>Contact</li>
        </ul>
        <span className='cursor-pointer' onClick={toggleTheme}>{
          theme === 'light' ? '🌚' : '🌞'
        }</span>
      </div>
    </div>
  )
}

export default Menu