import React, { useEffect, useMemo, useState, useContext } from 'react';
import Layout from './components/Layout';
import Notes from './components/Notes';
import useNormalizeNotes from './hooks/useNormalizeNotes';
import { ThemeContext } from './context/ThemeContext';
import UploadFile from './components/UploadFile';
import usePersistedState from './hooks/usePersistedState';
import { STORAGE_KEYS } from './constants/storageKeys';
import type { Note } from './types/notes';

function App(): React.ReactElement {
  const [highlights, setHighlights] = usePersistedState<string[]>(STORAGE_KEYS.highlights, []);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [activeView, setActiveView] = useState<'all' | 'favorites' | 'book'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteIds, setFavoriteIds] = usePersistedState<string[]>(STORAGE_KEYS.favorites, []);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { notes, titles } = useNormalizeNotes(highlights || []);
  const normalizeTitle = (value: string) => value.replace(/\s+/g, ' ').trim().toLowerCase();

  useEffect(() => {
    setFavoriteIds(prev => prev.filter(id => notes.some(note => note.id === id)));
  }, [notes, setFavoriteIds]);

  useEffect(() => {
    if (selectedTitle && activeView !== 'book') {
      setActiveView('book');
    }
  }, [activeView, selectedTitle]);

  const sortedTitles = useMemo(
    () => [...titles].sort((a, b) => a.localeCompare(b)),
    [titles]
  );

  const titleCounts = useMemo(() => {
    return notes.reduce<Record<string, number>>((acc, note) => {
      acc[note.title] = (acc[note.title] ?? 0) + 1;
      return acc;
    }, {});
  }, [notes]);

  const favoriteCount = useMemo(
    () => notes.filter(note => favoriteIds.includes(note.id)).length,
    [notes, favoriteIds]
  );

  const filteredNotes = useMemo(() => {
    let filtered = notes;
    const normalizedSelectedTitle = normalizeTitle(selectedTitle);

    if (activeView === 'favorites') {
      filtered = filtered.filter(note => favoriteIds.includes(note.id));
    } else if (activeView === 'book' && selectedTitle) {
      filtered = filtered.filter(
        note => normalizeTitle(note.title) === normalizedSelectedTitle
      );
    }

    if (searchTerm.trim().length > 0) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) || note.highlight.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [notes, activeView, favoriteIds, selectedTitle, searchTerm]);

  const emptyStateNotes: Note[] = [
    {
      id: 'Atomic Habits::quote-1',
      highlight: '“You do not rise to the level of your goals. You fall to the level of your systems.”',
      title: 'Atomic Habits',
    },
    {
      id: 'Deep Work::quote-1',
      highlight: '“Clarity about what matters provides clarity about what does not.”',
      title: 'Deep Work',
    },
    {
      id: 'Sapiens::quote-1',
      highlight: '“Culture tends to argue that it forbids, but in fact it enables.”',
      title: 'Sapiens',
    },
  ];

  const handleSelectAll = () => {
    setActiveView('all');
    setSelectedTitle('');
  };

  const handleSelectFavorites = () => {
    setActiveView('favorites');
    setSelectedTitle('');
  };

  const handleSelectTitle = (title: string) => {
    setActiveView('book');
    setSelectedTitle(title);
  };

  const handleToggleFavorite = (noteId: string) => {
    setFavoriteIds(prev =>
      prev.includes(noteId) ? prev.filter(id => id !== noteId) : [...prev, noteId]
    );
  };

  const sectionTitle =
    activeView === 'favorites'
      ? 'Favorites'
      : selectedTitle
        ? selectedTitle
        : 'All Highlights';

  const sectionSubtitle =
    activeView === 'favorites'
      ? `${filteredNotes.length} favorites`
      : selectedTitle
        ? `${filteredNotes.length} highlights in this book`
        : `${filteredNotes.length} highlights across all books`;

  return (
    <div className={`${theme}`}>
      <Layout
        sidebar={
          <div className='flex h-full flex-col px-6 py-8'>
            <div className='flex items-center gap-3'>
              <div className='h-11 w-11 rounded-2xl bg-[#a85a32] text-white flex items-center justify-center'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3 3z' />
                  <path d='M4 4v16a3 3 0 0 1 3-3h12' />
                </svg>
              </div>
              <div>
                <div className='text-lg font-display font-semibold'>KNotes</div>
                <div className='text-xs text-slate-500 dark:text-slate-400'>
                  {notes.length} highlights
                </div>
              </div>
              <button
                type='button'
                onClick={toggleTheme}
                className='ml-auto rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs text-slate-600 dark:text-slate-300'
              >
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
            </div>

            <div className='mt-6'>
              <label className='relative block'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'
                  >
                    <circle cx='11' cy='11' r='7' />
                    <path d='M20 20l-3.5-3.5' />
                  </svg>
                </span>
                <input
                  type='search'
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                  placeholder='Search highlights...'
                  className='w-full rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/80 dark:bg-[#0f131a] py-2 pl-9 pr-3 text-sm text-slate-700 dark:text-slate-200 shadow-sm outline-none transition focus:border-[#a85a32]'
                />
              </label>
            </div>

            <div className='mt-6 space-y-2'>
              <button
                type='button'
                onClick={handleSelectAll}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${
                  activeView === 'all'
                    ? 'bg-[#efe2d6] text-[#7d3f20]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-[#1a202b]'
                }`}
              >
                <span>All Highlights</span>
                <span className='text-xs text-slate-500'>{notes.length}</span>
              </button>
              <button
                type='button'
                onClick={handleSelectFavorites}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${
                  activeView === 'favorites'
                    ? 'bg-[#efe2d6] text-[#7d3f20]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-[#1a202b]'
                }`}
              >
                <span>Favorites</span>
                <span className='text-xs text-slate-500'>{favoriteCount}</span>
              </button>
            </div>

            <div className='mt-8'>
              <div className='text-xs uppercase tracking-widest text-slate-400'>Books</div>
              <div className='mt-3 space-y-2'>
                {sortedTitles.length === 0 && (
                  <div className='rounded-xl border border-dashed border-slate-200 dark:border-slate-700 px-3 py-4 text-xs text-slate-500 dark:text-slate-400'>
                    Add a file to see your library here.
                  </div>
                )}
                {sortedTitles.map(title => (
                  <button
                    key={title}
                    type='button'
                    onClick={() => handleSelectTitle(title)}
                    className={`flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                      activeView === 'book' && selectedTitle === title
                        ? 'bg-[#efe2d6] text-[#7d3f20]'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-[#1a202b]'
                    }`}
                  >
                    <span className='leading-snug'>{title}</span>
                    <span className='text-xs text-slate-500'>{titleCounts[title] ?? 0}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-auto pt-6 text-xs text-slate-400'>
              {sortedTitles.length} books in library
            </div>
          </div>
        }
      >
        <div className='space-y-8'>
          {!(activeView === 'book' && selectedTitle) && (
            <UploadFile setHighlights={setHighlights} />
          )}
          {notes.length === 0 ? (
            <div className='space-y-8'>
              <div>
                <h2 className='text-3xl font-display font-semibold text-slate-900 dark:text-white'>
                  Your Kindle highlights, in one place.
                </h2>
                <p className='mt-2 text-base text-slate-600 dark:text-slate-300'>
                  Read, organize, and favorite the notes that matter most.
                </p>
              </div>
                <div className='rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm bg-white/70 dark:bg-[#11141b]'>
                  <div className='text-sm uppercase tracking-wide text-slate-500'>Example highlights</div>
                  <div className='mt-4 space-y-4'>
                    {emptyStateNotes.map(note => (
                      <div key={`${note.title}-${note.highlight}`} className='border-l-2 border-slate-200 dark:border-slate-700 pl-4'>
                        <p className='text-base text-slate-700 dark:text-slate-200'>{note.highlight}</p>
                        <p className='text-xs text-slate-500 mt-1'>- {note.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          ) : (
            <Notes
              notes={filteredNotes}
              title={sectionTitle}
              subtitle={sectionSubtitle}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
