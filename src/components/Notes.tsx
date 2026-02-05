import type { Note } from '../types/notes';

type NotesProps = {
  notes: Note[];
  title: string;
  subtitle?: string;
  favoriteIds: string[];
  onToggleFavorite: (noteId: string) => void;
};

const Notes = ({ notes, title, subtitle, favoriteIds, onToggleFavorite }: NotesProps): JSX.Element => (
  <section className='mt-10'>
    <div className='flex items-center gap-4'>
      <div className='h-10 w-10 rounded-2xl bg-[#f0e5d8] dark:bg-[#1b2029] flex items-center justify-center text-[#a85a32]'>
        <span className='text-lg'>///</span>
      </div>
      <div>
        <h2 className='text-2xl font-display font-semibold text-slate-900 dark:text-white'>{title}</h2>
        {subtitle && <p className='text-sm text-slate-500 dark:text-slate-400'>{subtitle}</p>}
      </div>
    </div>

    <div className='mt-6 space-y-4'>
      {notes.length === 0 && (
        <div className='rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-[#10141b]/60 p-8 text-center text-slate-500 dark:text-slate-400'>
          No highlights match this view yet.
        </div>
      )}
      {notes.map(note => {
        const isFavorite = favoriteIds.includes(note.id);
        return (
          <article
            key={note.id}
            className='rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-[#11141b] p-6 shadow-sm'
          >
            <div className='flex items-start justify-between gap-4'>
              <div>
                <div className='text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 flex items-center gap-2'>
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'
                  >
                    <path d='M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3 3z' />
                    <path d='M4 4v16a3 3 0 0 1 3-3h12' />
                  </svg>
                  <span>{note.title}</span>
                </div>
                <p className='mt-4 text-base leading-relaxed text-slate-800 dark:text-slate-100'>
                  {note.highlight}
                </p>
              </div>
              <button
                type='button'
                onClick={() => onToggleFavorite(note.id)}
                aria-pressed={isFavorite}
                className={`h-9 w-9 rounded-full border flex items-center justify-center transition ${
                  isFavorite
                    ? 'bg-[#a85a32] text-white border-[#a85a32]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-[#a85a32]'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M12 3.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17.8 6.6 20.3l1-6.1-4.4-4.3 6.1-.9z' />
                </svg>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default Notes
