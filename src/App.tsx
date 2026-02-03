import React, { useMemo, useState, useContext } from 'react';
import Layout from './components/Layout';
import Notes from './components/Notes';
import Titles from './components/Titles';
import useNormalizeNotes from './hooks/useNormalizeNotes';
import { ThemeContext } from './context/ThemeContext';
import UploadFile from './components/UploadFile';
import usePersistedState from './hooks/usePersistedState';
import { STORAGE_KEYS } from './constants/storageKeys';
import type { Note } from './types/notes';

function App(): React.ReactElement {
  const [highlights, setHighlights] = usePersistedState<string[]>(STORAGE_KEYS.highlights, []);
  const [selectedTitle, setSelectedTitle] = useState('');
  const { theme } = useContext(ThemeContext);

  const { notes, titles } = useNormalizeNotes(highlights || []);

  const filteredNotes = useMemo(() => {
    if (!selectedTitle) return notes;

    return notes.filter(note => note.title === selectedTitle);
  }, [notes, selectedTitle]);

  const emptyStateTitles = [
    'Atomic Habits',
    'Deep Work',
    'Sapiens',
    'The Pragmatic Programmer',
  ];

  const emptyStateNotes: Note[] = [
    {
      highlight: '“You do not rise to the level of your goals. You fall to the level of your systems.”',
      title: 'Atomic Habits',
    },
    {
      highlight: '“Clarity about what matters provides clarity about what does not.”',
      title: 'Deep Work',
    },
    {
      highlight: '“Culture tends to argue that it forbids, but in fact it enables.”',
      title: 'Sapiens',
    },
  ];

  return (
    <div className={`${theme}`}>
      <Layout title="Kindle Notes">
        <div className='flex-1'>
          {
            highlights.length > 0 ? (
              <>
                <Titles
                  titles={titles}
                  selectedTitle={selectedTitle}
                  setSelectedTitle={setSelectedTitle}
                />
                <Notes notes={filteredNotes} selectedTitle={selectedTitle} />
              </>
            ) : (
              <div className='flex flex-col h-full gap-10'>
                <div className='flex justify-center items-center flex-col'>
                  <h2 className='text-3xl'>Your Kindle highlights, <strong>in one place</strong>.</h2>
                  <h2 className='pt-2 text-3xl'>Read, organize and filter all the notes from your favorite books.</h2>
                  <p className='pt-4 text-sm text-slate-500'>Upload your <em>My Clippings.txt</em> to see your library come alive.</p>
                </div>
                <div className='grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start'>
                  <div className='rounded-2xl border border-dashed border-slate-300/70 dark:border-slate-700 p-6'>
                    <div className='text-sm uppercase tracking-wide text-slate-500'>Example bookshelf</div>
                    <div className='mt-4 flex flex-wrap gap-2'>
                      {emptyStateTitles.map(title => (
                        <span
                          key={title}
                          className='px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300'
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm bg-white/60 dark:bg-zinc-900/60'>
                    <div className='text-sm uppercase tracking-wide text-slate-500'>Example highlights</div>
                    <div className='mt-4 space-y-4'>
                      {emptyStateNotes.map(note => (
                        <div key={`${note.title}-${note.highlight}`} className='border-l-2 border-slate-200 dark:border-slate-700 pl-4'>
                          <p className='text-base'>{note.highlight}</p>
                          <p className='text-xs text-slate-500 mt-1'>- {note.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <UploadFile setHighlights={setHighlights} />
              </div>
            )
          }
        </div>
      </Layout>
    </div>
  );
}

export default App;
