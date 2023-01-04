import { useState } from 'react';
import Layout from './components/Layout';
import Notes from './components/Notes';
import Titles from './components/Titles';
import useNormalizeNotes from './hooks/useNormalizeNotes';

function App() {
  const [highlights, setHighlights] = useState(null);

  const handleFileContent = (e) => {
    e.preventDefault()
    const reader = new FileReader();
    reader.onloadend = async (e) => {
      if (!e.target) return;
      const fileContent = (e.target.result);
      setHighlights((fileContent)?.split('=========='));
    }
    reader.readAsText(e.target.files[0])
  };

  const { notes, titles } = useNormalizeNotes(highlights || []);

  return (
    <Layout title="Kindle Notes" the>
      {
        highlights ? (
          <>
            <Titles titles={titles} />
            <Notes notes={notes} />
          </>
        ) : (
          <div>
            <form>
              <input type="file" onChange={e => handleFileContent(e)} />
            </form>
          </div>
        )
      }
    </Layout>
  );
}




export default App;
