import styled from 'styled-components';
import { useState } from 'react';

function App() {
  const [highlights, setHighlights] = useState(null);

  const handleChange = (e) => {
    e.preventDefault()
    const reader = new FileReader();
    reader.onloadend = async (e) => {
      const text = (e.target.result);
      setHighlights(text);
    }
    reader.readAsText(e.target.files[0]);
  };
  
  const notes = highlights?.split('==========') || [];

  return (
    <Layout className="App">
      <Container>
        <span>Kindle Notes</span>
        <div>
          <form>
            <input type="file" onChange={e => handleChange(e)} />
          </form>
        </div>

        {notes && notes.map((note, index) => {
          const info = note.split(/\r?\n/) || [];
          const title = info[0]?.length > 0 ? info[0] : info[1];
          const highlight = info[3]?.length > 0 ? info[3] : info[4];

          return (
            <div key={index}>
              {
                (title && highlight) && (
                  <Note key={index}>
                    <h4>{highlight}</h4>
                    <em>{`- ${title}`}</em>
                  </Note>
                )
              }
            </div>
          )
          
        })}
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  background: #282c34;
  color: #fff;
  min-height: 100vh;
`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`

const Note = styled.article`
  margin: 40px 0;
`

export default App;
