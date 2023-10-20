import { useState, useContext } from 'react';
import Layout from './components/Layout';
import Notes from './components/Notes';
import Titles from './components/Titles';
import useNormalizeNotes from './hooks/useNormalizeNotes';
import { ThemeContext } from './context/ThemeContext';
import UploadFile from './components/UploadFile';

function App() {
  const [highlights, setHighlights] = useState(null);
  const { theme } = useContext(ThemeContext);

  const { notes, titles } = useNormalizeNotes(highlights || []);

  return (
    <div className={`${theme}`}>
      <Layout title="Kindle Notes">
        {
          highlights ? (
            <>
              <Titles titles={titles} />
              <Notes notes={notes} />
            </>
          ) : (
            <UploadFile setHighlights={setHighlights} />
          )
        }
      </Layout>
    </div>
  );
}




export default App;
