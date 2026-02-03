import type { Note } from '../types/notes';

type NotesProps = {
  notes: Note[];
  selectedTitle: string;
};

const Notes = ({ notes, selectedTitle }: NotesProps): JSX.Element => (
  <div className='mt-10'>
    {selectedTitle && (
      <div className='text-center text-xl font-bold'>{selectedTitle}</div>
    )}
    {notes.map((note, index) => (
      <div className='my-6' key={index}>
        <h4 className='pb-1'>{note.highlight}</h4>
        <p className='text-italic text-gray-500 text-sm'>{`- ${note.title}`}</p>
      </div>
    ))}
  </div>
);

export default Notes
