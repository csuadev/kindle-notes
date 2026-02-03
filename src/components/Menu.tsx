import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Menu = (): JSX.Element => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  }

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  }

  return (
    <header className='flex items-center justify-between'>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <a href='/'>
          <h1 className='text-3xl font-bold flex items-baseline leading-none'>
            {[
              <span className="inline-block leading-none" key="k">K</span>,
              <span
                className={`inline-block overflow-hidden whitespace-nowrap leading-none transition-all duration-500 ease-out motion-reduce:transition-none ${
                  isHovered ? 'max-w-[5ch] opacity-100' : 'max-w-0 opacity-0'
                }`}
                key="indle"
              >
                {'indle'}
              </span>,
              <span className="inline-block leading-none" key="n">N</span>,
              <span
                className={`inline-block overflow-hidden whitespace-nowrap leading-none transition-all duration-500 ease-out motion-reduce:transition-none ${
                  isHovered ? 'max-w-[4ch] opacity-100' : 'max-w-0 opacity-0'
                }`}
                key="otes"
              >
                {'otes'}
              </span>,
            ]}
          </h1>
        </a> 
      </div>
      <div className='flex'>
        <button
          type="button"
          className='cursor-pointer bg-transparent border-0 p-0'
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌚' : '🌞'}
        </button>
      </div>
    </header>
  );
}

export default Menu
