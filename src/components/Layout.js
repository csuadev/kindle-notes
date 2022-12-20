import React from 'react';
import styled from 'styled-components';

const Layout = ({ title = 'Title', children }) => {
  return (
    <LayoutContainer>
      <LayoutContent>
        <LayoutTitle>{title}</LayoutTitle>
        {children}
      </LayoutContent>
    </LayoutContainer>
  )
}

const LayoutContainer = styled.div`
  background: #282c34;
  min-height: 100vh;
`
  
const LayoutContent = styled.div`
  width: 80%;
  margin: 0 auto;
  color: #fff;
`

const LayoutTitle = styled.h1`
  text-align: center;
  padding: 20px 0;
  margin: 0;
`

export default Layout