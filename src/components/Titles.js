import styled from 'styled-components';

const Titles = ({ titles }) => (
  <TitlesContainer>
    {titles.map((title, index) => (
      <Title key={index}>
        <span>{title}</span>
      </Title>
    ))}
  </TitlesContainer>
);

const TitlesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Title = styled.div`
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  margin: 3px;
`

export default Titles