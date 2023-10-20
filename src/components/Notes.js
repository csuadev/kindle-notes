const Notes = ({ notes }) => (
  <>
    {notes.map((note, index) => (
      <div className='my-6' index={index}>
        <h4>{note.highlight}</h4>
        <em>{`- ${note.title}`}</em>
      </div>
    ))}
  </>
);

export default Notes