import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Menu = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTheme = () => {
    setTheme(prevState => prevState === 'light' ? 'dark' : 'light');
  }

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
        <span className='cursor-pointer' onClick={handleTheme}>{
          theme === 'light' ? '🌚' : '🌞'
        }</span>
      </div>
    </div>
  )
}

export default Menu