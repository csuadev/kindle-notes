import React, { useState, useContext } from 'react';
import Layout from './components/Layout';
import Notes from './components/Notes';
import Titles from './components/Titles';
import useNormalizeNotes from './hooks/useNormalizeNotes';
import { ThemeContext } from './context/ThemeContext';
import UploadFile from './components/UploadFile';

function App(): React.ReactElement {
  const [highlights, setHighlights] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const { theme } = useContext(ThemeContext);

  const { notes, titles } = useNormalizeNotes(highlights || []);

  const handleNotes = () => {
    if (!selectedTitle) return notes;

    return notes.filter(note => note.title === selectedTitle);
  }

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
                <Notes notes={handleNotes()} selectedTitle={selectedTitle} />
              </>
            ) : (
              <div className='flex justify-center items-center flex-col h-full'>
                <h2 className='text-3xl'>Your Kindle highlights, <strong>in one place</strong>.</h2>
                <h2 className='pt-2 pb-20 text-3xl'>Read, organize and filter all the notes from your favorite books.</h2>
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
