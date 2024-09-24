import { useState, useContext } from 'react';
import Layout from './components/Layout';
import Notes from './components/Notes';
import Titles from './components/Titles';
import useNormalizeNotes from './hooks/useNormalizeNotes';
import { ThemeContext } from './context/ThemeContext';
import UploadFile from './components/UploadFile';

function App() {
  const [highlights, setHighlights] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const { theme } = useContext(ThemeContext);

  console.log('high', highlights);

  const { notes, titles } = useNormalizeNotes(highlights || []);

  const handleNotes = () => {
    if (!selectedTitle) return notes;

    return notes.filter(note => note.title === selectedTitle);
  }

  return (
    <div className={`${theme}`}>
      <Layout title="Kindle Notes">
        {
          highlights.length > 0 ? (
            <>
              <Titles
                titles={titles}
                selectedTitle={selectedTitle}
                setSelectedTitle={setSelectedTitle}
              />
              <Notes notes={handleNotes()} />
            </>
          ) : (
            <div className='flex justify-center items-center flex-col'>
              <UploadFile setHighlights={setHighlights} />
            </div>
          )
        }
      </Layout>
    </div>
  );
}

export default App;
