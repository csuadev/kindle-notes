import React from 'react';

type TitlesProps = {
  titles: string[],
  selectedTitle: string,
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>,
}

const Titles = ({ titles, selectedTitle, setSelectedTitle }: TitlesProps): JSX.Element => {
  const handleSelectTitle = (title: string) => {
    if (title !== selectedTitle) {
      setSelectedTitle(title);
    } else {
      setSelectedTitle('');
    }
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {selectedTitle && (
        <div
          className='px-4 py-2 my-1 rounded-full border border-slate-300 transition cursor-pointer hover:bg-slate-200 hover:border-transparent hover:text-slate-800'
          onClick={() => handleSelectTitle('')}
        >
          <span>All books</span>
          <span className='ml-2 text-sm'>({titles.length})</span>
        </div>
      )}
      {!selectedTitle && titles.map((title, index) => (
        <div
          className={`px-4 py-2 my-1 rounded-full border border-slate-300 transition cursor-pointer hover:bg-slate-200 hover:border-transparent hover:text-slate-800
            ${title === selectedTitle ? 'bg-slate-400 border-transparent text-white' : ''}`
          }
          key={index}
          onClick={() => handleSelectTitle(title)}
        >
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};

export default Titles;
