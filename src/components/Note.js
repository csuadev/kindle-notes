import React from 'react'
import styled from 'styled-components'

const Note = ({ index, title, highlight }) => {
  return (
    <NoteContainer index={index}>
      <h4>{highlight}</h4>
      <em>{`- ${title}`}</em>
    </NoteContainer>
  )
}

const NoteContainer = styled.article`
  margin: 40px 0;
`

export default Note