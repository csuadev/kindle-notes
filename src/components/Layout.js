import React, { useContext } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import { ThemeContext } from '../context/ThemeContext';

const Layout = ({ title = 'Title', children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <LayoutContainer theme={theme}>
      <LayoutContent>
        <Menu />
        {children}
      </LayoutContent>
    </LayoutContainer>
  )
}

const LayoutContainer = styled.div`
  background: ${props => props.theme === 'light' ? '#fff' : '#282c34'};
  min-height: 100vh;
  color: ${props => props.theme === 'light' ? '#333' : '#fff'}};
  transition: all 0.5s ease;
`
  
const LayoutContent = styled.div`
  width: 80%;
  margin: 0 auto;
`

export default Layout