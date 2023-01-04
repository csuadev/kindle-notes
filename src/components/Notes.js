import styled from 'styled-components';

const Notes = ({ notes }) => (
  <>
    {notes.map((note, index) => (
      <NoteContainer index={index}>
        <h4>{note.highlight}</h4>
        <em>{`- ${note.title}`}</em>
      </NoteContainer>
    ))}
  </>
);

const NoteContainer = styled.article`
  margin: 40px 0;
`

export default Notes