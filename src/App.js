import React, { useState } from 'react';
import useNormalizeNotes from './hooks/useNormalizeNotes';
import Layout from './components/Layout';
import Note from './components/Note';

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

  const { notes } = useNormalizeNotes(highlights || []);

  return (
    <Layout title="Kindle Notes">
        <span>Kindle Notes</span>
        {
          !highlights && (
            <div>
              <form>
                <input type="file" onChange={e => handleFileContent(e)} />
              </form>
            </div>
          )
        }

        {
          highlights && 
            notes.map((note, index) => (
              <Note
                key={index}
                title={note.title}
                highlight={note.highlight}
              />
            )
          )
        }
    </Layout>
  );
}




export default App;
