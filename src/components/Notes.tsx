type Note = {
  highlight: string;
  title: string;
};

const Notes = ({ notes }: { notes: Note[] }) => (
  <>
    {notes.map((note, index) => (
      <div className='my-6' key={index}>
        <h4>{note.highlight}</h4>
        <em>{`- ${note.title}`}</em>
      </div>
    ))}
  </>
);

export default Notes