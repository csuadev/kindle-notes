import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';

const Menu = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTheme = () => {
    setTheme(prevState => prevState === 'light' ? 'dark' : 'light');
  }

  return (
    <MenuContainer>
      <div>
        <Title>Kindle Notes</Title>
      </div>
      <div>
        <span>About</span>
        <span onClick={handleTheme}>{
          theme === 'light' ? '🌚' : '🌞'
        }</span>
      </div>
    </MenuContainer>
  )
}

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  & span {
    cursor: pointer;
    padding-left: 20px;
  }
`

const Title = styled.h1`
  padding: 30px 0 20px 0;
  margin: 0;
`

export default Menu