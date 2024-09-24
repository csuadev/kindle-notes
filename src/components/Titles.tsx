import React from 'react';

type TitlesProps = {
  titles: string[],
  selectedTitle: string,
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>,
}

const Titles = ({ titles, selectedTitle, setSelectedTitle }: TitlesProps) => {
  console.log(titles, selectedTitle)
  return (
  <div className='flex flex-wrap justify-center'>
    {titles.map((title, index) => (
      <div
        className={`px-4 py-2 my-1 rounded-full border border-blue-400 transition cursor-pointer hover:bg-blue-400 hover:text-white ${title === selectedTitle ? 'bg-blue-400 text-white' : ''}`}
        key={index}
        onClick={() => setSelectedTitle(title)}
      >
        <span>{title}</span>
      </div>
    ))}
  </div>
)};

export default Titles;
